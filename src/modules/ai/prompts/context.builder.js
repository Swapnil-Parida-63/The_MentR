/**
 * @file context.builder.js
 * @description RAG Context Builder for Mentee AI Subsystem.
 * 
 * RESPONSIBILITY:
 * Merges, deduplicates, filters, and formats retrieved knowledge chunks into clean Markdown context strings
 * ready for system prompt injection.
 * 
 * FEATURES:
 * - Enforces minimum similarity score thresholds (`aiConfig.similarityThreshold`).
 * - Deduplicates overlapping chunk texts.
 * - Formats category metadata and source titles.
 * - Enforces maximum context document limits (`aiConfig.maxContextDocuments`).
 * 
 * CONNECTIONS:
 * - Used by `retrieval.service.js` and `prompt.builder.js`.
 */

const { aiConfig } = require('../config/ai.config');

class ContextBuilder {
  /**
   * Processes retrieved vector search chunks into a formatted Markdown string.
   * 
   * @param {Array<Object>} retrievedChunks - Array of { text, heading, metadata, score }.
   * @param {Object} [options] - Overrides for maxDocs, minScore, format.
   * @returns {Object} Result { formattedContext: string, contextDocsCount: number, docTitles: Array<string> }
   */
  buildContext(retrievedChunks = [], options = {}) {
    const minScore = options.minScore !== undefined ? options.minScore : aiConfig.similarityThreshold || 0.65;
    const maxDocs = options.maxDocs || aiConfig.maxContextDocuments || 5;

    if (!retrievedChunks || retrievedChunks.length === 0) {
      return {
        formattedContext: '',
        contextDocsCount: 0,
        docTitles: []
      };
    }

    // 1. Filter out low-confidence chunks below threshold
    const validChunks = retrievedChunks.filter((c) => (c.score || 0) >= minScore);

    // 2. Deduplicate exact duplicate text contents
    const seenTexts = new Set();
    const uniqueChunks = [];

    for (const chunk of validChunks) {
      const textKey = (chunk.text || '').trim();
      if (!seenTexts.has(textKey)) {
        seenTexts.add(textKey);
        uniqueChunks.push(chunk);
      }
    }

    // 3. Limit to maxDocs
    const selectedChunks = uniqueChunks.slice(0, maxDocs);

    if (selectedChunks.length === 0) {
      return {
        formattedContext: '',
        contextDocsCount: 0,
        docTitles: []
      };
    }

    // 4. Format into clean Markdown section string
    const docTitles = [];
    const blocks = selectedChunks.map((chunk, idx) => {
      const title = chunk.metadata?.title || 'Knowledge Base Document';
      const category = chunk.metadata?.category || 'general';
      const heading = chunk.heading ? ` > ${chunk.heading}` : '';

      if (!docTitles.includes(title)) {
        docTitles.push(title);
      }

      return `#### Document ${idx + 1}: ${title} [Category: ${category}${heading}]\n${chunk.text}`;
    });

    const formattedContext = blocks.join('\n\n---\n\n');

    return {
      formattedContext,
      contextDocsCount: selectedChunks.length,
      docTitles
    };
  }
}

const contextBuilder = new ContextBuilder();

module.exports = { ContextBuilder, contextBuilder };
