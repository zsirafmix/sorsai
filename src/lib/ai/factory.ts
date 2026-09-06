import { AIProvider } from './types';
import { MockAIProvider } from './providers/mock';
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';
import { AnthropicProvider } from './providers/anthropic';

export function getAIProvider(preferred?: string): AIProvider {
  const choice = preferred || process.env.AI_PROVIDER_DEFAULT || '';

  if (choice === 'openai' && process.env.OPENAI_API_KEY) {
    return new OpenAIProvider();
  }
  if (choice === 'gemini' && process.env.GEMINI_API_KEY) {
    return new GeminiProvider();
  }
  if (choice === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
    return new AnthropicProvider();
  }
  if (choice === 'mock') {
    return new MockAIProvider();
  }

  // Auto detection
  if (process.env.OPENAI_API_KEY) {
    return new OpenAIProvider();
  }
  if (process.env.GEMINI_API_KEY) {
    return new GeminiProvider();
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return new AnthropicProvider();
  }

  // Default demo provider (works 100% offline & out of the box)
  return new MockAIProvider();
}

/**
 * Resilient wrapper that calls the provider with automatic fallback to mock on network/API failure
 */
export async function executeAIWithFallback<T>(
  action: (provider: AIProvider) => Promise<T>,
  preferredProvider?: string
): Promise<{ result: T; isDemoFallback: boolean }> {
  const primary = getAIProvider(preferredProvider);
  try {
    const result = await action(primary);
    return { result, isDemoFallback: primary.name === 'mock' };
  } catch (error) {
    console.warn(`[AI Engine] ${primary.name} provider error, falling back to mock provider:`, error);
    const mock = new MockAIProvider();
    const result = await action(mock);
    return { result, isDemoFallback: true };
  }
}
