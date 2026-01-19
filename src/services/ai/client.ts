// ResuMatch v2 - OpenAI Client Configuration
// Temperature set to 0.0 for deterministic, non-hallucinating output

import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OpenAI API key not configured. Please set OPENAI_API_KEY in your .env.local file.\n' +
      'Example: OPENAI_API_KEY=sk-proj-...'
    );
  }

  if (!apiKey.startsWith('sk-')) {
    throw new Error(
      'Invalid OpenAI API key format. Key should start with "sk-".'
    );
  }

  openaiClient = new OpenAI({
    apiKey,
  });

  return openaiClient;
}

// Default model configuration for ResuMatch
export const MODEL_CONFIG = {
  model: 'gpt-4o-mini', // Fast and cost-effective for structured tasks
  temperature: 0.0, // CRITICAL: No creativity, only deterministic output
  maxTokens: 4096,
} as const;

// Stricter model config for formatting (where hallucination risk is highest)
export const STRICT_MODEL_CONFIG = {
  model: 'gpt-4o-mini',
  temperature: 0.0,
  maxTokens: 4096,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
} as const;

export interface CompletionOptions {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  responseFormat?: 'text' | 'json';
}

export async function getCompletion(options: CompletionOptions): Promise<string> {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model: MODEL_CONFIG.model,
    temperature: MODEL_CONFIG.temperature,
    max_tokens: options.maxTokens || MODEL_CONFIG.maxTokens,
    messages: [
      { role: 'system', content: options.systemPrompt },
      { role: 'user', content: options.userPrompt },
    ],
    ...(options.responseFormat === 'json' && {
      response_format: { type: 'json_object' },
    }),
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from OpenAI API');
  }

  return content;
}

export async function getStrictCompletion(options: CompletionOptions): Promise<string> {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    ...STRICT_MODEL_CONFIG,
    max_tokens: options.maxTokens || STRICT_MODEL_CONFIG.maxTokens,
    messages: [
      { role: 'system', content: options.systemPrompt },
      { role: 'user', content: options.userPrompt },
    ],
    ...(options.responseFormat === 'json' && {
      response_format: { type: 'json_object' },
    }),
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from OpenAI API');
  }

  return content;
}

// Test the API key is valid
export async function validateApiKey(): Promise<boolean> {
  try {
    const client = getOpenAIClient();
    await client.models.list();
    return true;
  } catch (error) {
    console.error('API key validation failed:', error);
    return false;
  }
}
