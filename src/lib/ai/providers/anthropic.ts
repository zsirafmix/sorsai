import { z } from 'zod';
import { AIProvider, AIProviderConfig } from '../types';

export class AnthropicProvider implements AIProvider {
  name = 'anthropic';
  private apiKey: string;
  private model: string;

  constructor(config?: AIProviderConfig) {
    this.apiKey = config?.apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.model = config?.model || process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest';
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API error (${res.status}): ${err}`);
    }

    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  async generateStructured<T>(prompt: string, schema: z.ZodSchema<T>, systemPrompt?: string): Promise<T> {
    const enhancedSystem = `${systemPrompt || ''}\nOutput ONLY raw JSON matching the schema, with no explanation or backticks.`;
    const text = await this.generateText(prompt, enhancedSystem);
    const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(cleaned);
    return schema.parse(parsed);
  }
}
