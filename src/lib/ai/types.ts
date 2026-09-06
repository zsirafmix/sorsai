import { z } from 'zod';

export interface AIProviderConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  timeoutMs?: number;
}

export interface AIProvider {
  name: string;
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  generateStructured<T>(prompt: string, schema: z.ZodSchema<T>, systemPrompt?: string): Promise<T>;
}
