/**
 * @file ai-provider.factory.js
 * @description Factory for Instantiating AI Providers.
 * 
 * RESPONSIBILITY:
 * Decouples provider selection logic from application services. Instantiates the correct AI Provider
 * (OpenAIProvider, ClaudeProvider, GeminiProvider, LocalLLMProvider) based on configuration or runtime flags.
 * 
 * FUTURE PURPOSE:
 * Allows dynamic provider switching, A/B testing between LLM models, and mock provider injection for unit tests.
 * 
 * CONNECTIONS:
 * - Reads `aiConfig.provider`.
 * - Instantiates implementations of `BaseAIProvider`.
 */

const { OpenAIProvider } = require('./openai.provider');
const { aiConfig } = require('../config/ai.config');

class AIProviderFactory {
  constructor() {
    this.instances = new Map();
  }

  /**
   * Retrieves or creates the configured AI Provider instance.
   * 
   * @param {string} [providerName] - Optional provider override ('openai' | 'claude' | 'gemini' | 'local').
   * @param {Object} [customConfig] - Optional runtime parameters.
   * @returns {BaseAIProvider} Active provider instance.
   */
  getProvider(providerName = aiConfig.provider, customConfig = {}) {
    const key = providerName.toLowerCase();

    if (this.instances.has(key) && Object.keys(customConfig).length === 0) {
      return this.instances.get(key);
    }

    let provider;
    switch (key) {
      case 'openai':
        provider = new OpenAIProvider(customConfig);
        break;
      default:
        console.warn(`[AI Engine] Unknown provider "${providerName}". Falling back to OpenAIProvider.`);
        provider = new OpenAIProvider(customConfig);
        break;
    }

    if (Object.keys(customConfig).length === 0) {
      this.instances.set(key, provider);
    }

    return provider;
  }
}

const aiProviderFactory = new AIProviderFactory();

module.exports = { AIProviderFactory, aiProviderFactory };
