import { z } from 'zod';
import { AIProvider, AIProviderConfig } from '../types';

export class OpenAIProvider implements AIProvider {
  name = 'openai';
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(config?: AIProviderConfig) {
    this.apiKey = config?.apiKey || process.env.OPENAI_API_KEY || '';
    this.baseUrl = config?.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    this.model = config?.model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${err}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  async generateStructured<T>(prompt: string, schema: z.ZodSchema<T>, systemPrompt?: string): Promise<T> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const enhancedSystemPrompt = `${systemPrompt || ''}\n\nIMPORTANT: You must respond ONLY with a valid JSON object matching the requested schema. Do not enclose in markdown code fences. Respond purely with the raw JSON object.`;

    const rawText = await this.generateText(prompt, enhancedSystemPrompt);
    let parsedJson: unknown;
    try {
      // Clean possible markdown code fences
      const cleaned = rawText.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
      parsedJson = JSON.parse(cleaned);
    } catch {
      // Retry once if invalid JSON
      const retryPrompt = `Your previous response was not valid JSON. Please provide ONLY valid JSON:\n\n${prompt}`;
      const retryRaw = await this.generateText(retryPrompt, enhancedSystemPrompt);
      const cleanedRetry = retryRaw.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
      parsedJson = JSON.parse(cleanedRetry);
    }

    return schema.parse(parsedJson);
  }
}
