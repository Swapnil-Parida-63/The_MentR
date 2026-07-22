/**
 * @file heading-section.chunker.js
 * @description Section & Heading-Based Markdown Document Chunker.
 * 
 * RESPONSIBILITY:
 * Splits documents logically by markdown headings (#, ##, ###) or paragraph blocks instead of arbitrary character cuts.
 * Preserves section titles, headings, document relationships, and metadata tags on every generated chunk.
 * 
 * FEATURES:
 * - Implements `ChunkGeneratorInterface`.
 * - Preserves Markdown headers for contextual semantic retention.
 */

const { ChunkGeneratorInterface } = require('../interfaces/chunk-generator.interface');

class HeadingSectionChunker extends ChunkGeneratorInterface {
  constructor() {
    super('HeadingSectionChunker');
  }

  /**
   * Splits a raw document into heading-oriented chunk objects.
   * 
   * @param {Object} document - Document object containing { metadata, content }.
   * @param {Object} [options] - Options (maxChunkTokens, overlapTokens).
   * @returns {Promise<Array<Object>>} Array of chunk objects [{ chunkIndex, heading, text, tokenCount, metadata }].
   */
  async generateChunks(document, _options = {}) {
    const { metadata = {}, content = '' } = document;

    if (!content || !content.trim()) {
      return [];
    }

    // Split document content by Markdown heading lines (#, ##, ###)
    const lines = content.split('\n');
    const sections = [];

    let currentHeading = metadata.title || 'Overview';
    let currentLines = [];

    for (const line of lines) {
      const isHeader = line.match(/^(#{1,3})\s+(.+)$/);
      if (isHeader) {
        if (currentLines.join('\n').trim().length > 0) {
          sections.push({
            heading: currentHeading,
            text: currentLines.join('\n').trim()
          });
          currentLines = [];
        }
        currentHeading = isHeader[2].trim();
      } else {
        currentLines.push(line);
      }
    }

    if (currentLines.join('\n').trim().length > 0) {
      sections.push({
        heading: currentHeading,
        text: currentLines.join('\n').trim()
      });
    }

    // Map sections into standardized chunk objects with attached metadata
    return sections.map((sec, index) => {
      const fullText = `### ${sec.heading}\n${sec.text}`;
      const approxTokens = Math.ceil(fullText.split(/\s+/).length * 1.3);

      return {
        chunkIndex: index,
        heading: sec.heading,
        text: fullText,
        tokenCount: approxTokens,
        metadata: {
          title: metadata.title || 'Untitled',
          slug: metadata.slug || 'untitled',
          category: metadata.category || 'general',
          tags: metadata.tags || [],
          heading: sec.heading,
          source: metadata.source || 'file_system'
        }
      };
    });
  }
}

module.exports = { HeadingSectionChunker };
