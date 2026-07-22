/**
 * @file format-parser.registry.js
 * @description Format Parser Registry for Extensible Document Ingestion.
 * 
 * RESPONSIBILITY:
 * Registers parser strategies for different document formats (`markdown`, `json`, `pdf`, `docx`, `html`, `cms`).
 * Allows developers to add new format support cleanly without modifying core loader code.
 * 
 * FUTURE PURPOSE:
 * Extracts metadata and body content from heterogeneous document sources.
 */

class FormatParserRegistry {
  constructor() {
    this.parsers = new Map();
    this.registerDefaultParsers();
  }

  /**
   * Registers default format parsers.
   */
  registerDefaultParsers() {
    // Markdown Parser Strategy
    this.register('markdown', async (rawContent) => {
      // Basic Frontmatter & Body splitting placeholder
      return {
        metadata: { format: 'markdown' },
        content: rawContent
      };
    });

    // JSON Document Parser Strategy
    this.register('json', async (rawContent) => {
      try {
        const parsed = JSON.parse(rawContent);
        return {
          metadata: parsed.metadata || { format: 'json' },
          content: parsed.content || rawContent
        };
      } catch (err) {
        throw new Error(`Invalid JSON document format: ${err.message}`);
      }
    });

    // HTML Document Parser Strategy Placeholder
    this.register('html', async (rawContent) => {
      return {
        metadata: { format: 'html' },
        content: rawContent.replace(/<[^>]*>?/gm, '') // Strip basic HTML tags
      };
    });

    // PDF / DOCX / CMS Extension Hooks
    this.register('pdf', async (_rawContent) => ({ metadata: { format: 'pdf' }, content: '[PDF PARSER PLACEHOLDER]' }));
    this.register('docx', async (_rawContent) => ({ metadata: { format: 'docx' }, content: '[DOCX PARSER PLACEHOLDER]' }));
    this.register('cms', async (_rawContent) => ({ metadata: { format: 'cms' }, content: '[CMS PARSER PLACEHOLDER]' }));
  }

  /**
   * Registers a new parser for a document format.
   * 
   * @param {string} format - Format extension or key ('markdown' | 'json' | 'pdf' | 'docx' | 'html' | 'cms').
   * @param {Function} parserFn - Async parser function receiving rawContent and returning { metadata, content }.
   */
  register(format, parserFn) {
    this.parsers.set(format.toLowerCase(), parserFn);
  }

  /**
   * Parses raw document content based on its format identifier.
   * 
   * @param {string} format - Format identifier.
   * @param {string} rawContent - Raw text or binary string.
   * @returns {Promise<Object>} Object { metadata, content }.
   */
  async parse(format, rawContent) {
    const key = (format || 'markdown').toLowerCase();
    const parser = this.parsers.get(key);

    if (!parser) {
      console.warn(`[KMS] Unregistered document format "${format}". Falling back to raw text.`);
      return { metadata: { format: key }, content: rawContent };
    }

    return await parser(rawContent);
  }
}

const formatParserRegistry = new FormatParserRegistry();

module.exports = { FormatParserRegistry, formatParserRegistry };
