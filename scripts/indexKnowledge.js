/**
 * @file indexKnowledge.js
 * @description CLI Script for Automated RAG Knowledge Document Ingestion & Vector Indexing.
 * 
 * RESPONSIBILITY:
 * Scans `knowledge/` category subfolders, parses markdown/JSON files, computes MD5 content hashes for
 * incremental re-indexing, splits documents via `HeadingSectionChunker`, generates vector embeddings via
 * `EmbeddingService`, and upserts vector chunks into MongoDB (`KmsDocument` & `KmsChunk`).
 * 
 * USAGE:
 *   npm run index:knowledge
 *   node scripts/indexKnowledge.js [--force] [--category=pricing]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { env } = require('../src/config/env');
const { aiConfig } = require('../src/modules/ai/config/ai.config');
const { KmsDocument } = require('../src/modules/knowledge/models/kms-document.model');
const { HeadingSectionChunker } = require('../src/modules/knowledge/chunkers/heading-section.chunker');
const embeddingService = require('../src/modules/ai/services/embedding.service');
const { MongoVectorRepository } = require('../src/modules/knowledge/vector/mongo-vector.repository');
const { formatParserRegistry } = require('../src/modules/knowledge/formatters/format-parser.registry');

function computeHash(content) {
  return crypto.createHash('md5').update(content || '').digest('hex');
}

async function runIndexingPipeline() {
  const startTime = Date.now();
  console.log('====================================================');
  console.log(' Mentee AI - Automated Knowledge Indexing Pipeline');
  console.log('====================================================');
  console.log(`[CONFIG] Vector Index: ${aiConfig.vectorIndex}`);
  console.log(`[CONFIG] Embedding Model: ${aiConfig.embeddingModel}`);
  console.log(`[CONFIG] Target Database: ${env.MONGODB_URI ? 'Connected to MongoDB' : 'Standalone'}`);

  // Connect to MongoDB if not already connected
  if (mongoose.connection.readyState === 0) {
    console.log('[DB] Connecting to MongoDB...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('[DB] MongoDB Connection Established.');
  }

  const knowledgeBaseDir = path.join(__dirname, '../knowledge');
  const chunker = new HeadingSectionChunker();
  const vectorRepo = new MongoVectorRepository();

  const categories = [
    'company',
    'services',
    'parents',
    'teachers',
    'students',
    'pricing',
    'policies',
    'methodology',
    'blogs',
    'faqs',
    'career',
    'workflows'
  ];

  let totalDocsProcessed = 0;
  let totalDocsSkipped = 0;
  let totalChunksIndexed = 0;

  for (const cat of categories) {
    const catDir = path.join(knowledgeBaseDir, cat);
    if (!fs.existsSync(catDir)) continue;

    const files = fs.readdirSync(catDir).filter((f) => !f.startsWith('.'));

    for (const fileName of files) {
      const filePath = path.join(catDir, fileName);
      const ext = path.extname(fileName).toLowerCase().replace('.', '') || 'markdown';
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      const contentHash = computeHash(rawContent);

      const parsed = await formatParserRegistry.parse(ext, rawContent);
      const title = parsed.metadata?.title || path.basename(fileName, path.extname(fileName)).replace(/[-_]/g, ' ');
      const slug = parsed.metadata?.slug || `${cat}-${path.basename(fileName, path.extname(fileName)).toLowerCase()}`;

      // Incremental Change Detection: Check if document exists with identical hash
      const existingDoc = await KmsDocument.findOne({ slug });
      if (existingDoc && existingDoc.source === contentHash && !process.argv.includes('--force')) {
        console.log(`[SKIP] Document "${title}" (${slug}) is unchanged. Skipping indexing.`);
        totalDocsSkipped++;
        continue;
      }

      console.log(`[INDEXING] Processing document: "${title}" [Category: ${cat}]...`);

      // Save/Update Document Record
      const kmsDoc = await KmsDocument.findOneAndUpdate(
        { slug },
        {
          title,
          slug,
          category: cat,
          tags: parsed.metadata?.tags || [cat],
          description: parsed.metadata?.description || '',
          content: parsed.content,
          format: ext === 'json' ? 'json' : 'markdown',
          source: contentHash,
          status: 'published'
        },
        { upsert: true, new: true }
      );

      // Generate Chunks via HeadingSectionChunker
      const chunks = await chunker.generateChunks({
        metadata: {
          title,
          slug,
          category: cat,
          tags: parsed.metadata?.tags || [cat]
        },
        content: parsed.content
      });

      if (chunks.length > 0) {
        // Extract texts for batch embedding generation
        const chunkTexts = chunks.map((c) => c.text);
        const embeddings = await embeddingService.generateBatchEmbeddings(chunkTexts);

        // Prepare chunk records for vector repository
        const vectorRecords = chunks.map((c, i) => ({
          documentId: kmsDoc._id,
          chunkIndex: c.chunkIndex,
          heading: c.heading,
          text: c.text,
          tokenCount: c.tokenCount,
          contentHash,
          vector: embeddings[i] || new Array(1536).fill(0.0),
          metadata: {
            title,
            slug,
            category: cat,
            tags: parsed.metadata?.tags || [cat],
            heading: c.heading,
            source: 'knowledge_file'
          }
        }));

        await vectorRepo.upsertVectors(vectorRecords);
        totalChunksIndexed += vectorRecords.length;
      }

      totalDocsProcessed++;
    }
  }

  const durationMs = Date.now() - startTime;
  console.log('====================================================');
  console.log(` [SUCCESS] Knowledge Indexing Pipeline Completed in ${durationMs}ms`);
  console.log(` - Documents Processed: ${totalDocsProcessed}`);
  console.log(` - Documents Skipped:   ${totalDocsSkipped}`);
  console.log(` - Chunks Indexed:      ${totalChunksIndexed}`);
  console.log('====================================================\n');
}

if (require.main === module) {
  runIndexingPipeline()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[ERROR] Knowledge indexing pipeline failed:', err);
      process.exit(1);
    });
}

module.exports = { runIndexingPipeline };
