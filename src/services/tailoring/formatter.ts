// ResuMatch v2 - Bullet Formatter
// Formats bullets with STRICT anti-hallucination rules

import { getStrictCompletion } from '../ai/client';
import type { MatchResult, TailoredBullet, ParsedResume } from './types';
import {
  calculateCombinedSimilarity,
  validateMetrics,
  validateTechnologies,
  normalizeBullet,
} from './utils';

// STRICT similarity threshold - 85% minimum
const SIMILARITY_THRESHOLD = 0.85;

// Maximum number of keywords to add per bullet
const MAX_KEYWORDS_PER_BULLET = 2;

const FORMATTER_SYSTEM_PROMPT = `You are a resume bullet point formatter with STRICT rules. Your job is to MINIMALLY modify bullets to include relevant keywords.

CRITICAL RULES - VIOLATION = FAILURE:
1. DO NOT add any numbers, percentages, or metrics not in the original
2. DO NOT add company names, tools, or technologies not mentioned
3. DO NOT change action verbs (Led → Spearheaded is FORBIDDEN)
4. DO NOT add qualitative claims (significantly, dramatically, substantially)
5. DO NOT expand acronyms or add explanations
6. DO NOT change the meaning or implications of the bullet

ONLY ALLOWED MODIFICATIONS:
1. Add keywords in parentheses at the END of the bullet: "Built API (Python, REST)"
2. Minor word order changes WITHIN a clause (not between clauses)
3. Remove redundant words if needed for conciseness

OUTPUT FORMAT:
Return ONLY the modified bullet text. No explanations, no JSON, no formatting.

If you cannot safely add the keywords while following these rules, return the original bullet UNCHANGED.`;

/**
 * Format a single bullet with keyword additions
 * Returns original if modification exceeds similarity threshold
 */
export async function formatBullet(
  matchResult: MatchResult,
  originalResume: ParsedResume,
  fallbackToOriginal: boolean = true
): Promise<TailoredBullet> {
  const { originalBullet, suggestedKeywordAdditions } = matchResult;

  // If no keywords to add, return original
  if (suggestedKeywordAdditions.length === 0) {
    return {
      original: originalBullet,
      tailored: originalBullet,
      similarity: 1.0,
      addedKeywords: [],
      wasModified: false,
    };
  }

  // Limit keywords to add
  const keywordsToAdd = suggestedKeywordAdditions.slice(0, MAX_KEYWORDS_PER_BULLET);

  const userPrompt = `Original bullet: "${originalBullet}"

Keywords to add (ONLY if they can be added safely in parentheses at the end): ${keywordsToAdd.join(', ')}

Return the modified bullet or the original if keywords cannot be added safely.`;

  try {
    const response = await getStrictCompletion({
      systemPrompt: FORMATTER_SYSTEM_PROMPT,
      userPrompt,
    });

    const tailoredBullet = normalizeBullet(response.trim().replace(/^["']|["']$/g, ''));

    // Validate the output
    const validation = validateFormattedBullet(
      originalBullet,
      tailoredBullet,
      originalResume.rawText
    );

    if (!validation.isValid) {
      console.warn(`Formatter validation failed for bullet: ${validation.errors.join(', ')}`);

      if (fallbackToOriginal) {
        return {
          original: originalBullet,
          tailored: originalBullet,
          similarity: 1.0,
          addedKeywords: [],
          wasModified: false,
        };
      }
    }

    // Calculate actual keywords added
    const addedKeywords = keywordsToAdd.filter(kw =>
      tailoredBullet.toLowerCase().includes(kw.toLowerCase()) &&
      !originalBullet.toLowerCase().includes(kw.toLowerCase())
    );

    return {
      original: originalBullet,
      tailored: tailoredBullet,
      similarity: validation.similarity,
      addedKeywords,
      wasModified: tailoredBullet !== originalBullet,
    };
  } catch (error) {
    console.error('Formatter error:', error);

    // On error, return original
    return {
      original: originalBullet,
      tailored: originalBullet,
      similarity: 1.0,
      addedKeywords: [],
      wasModified: false,
    };
  }
}

/**
 * Format multiple bullets in parallel
 */
export async function formatBullets(
  matchResults: MatchResult[],
  originalResume: ParsedResume,
  fallbackToOriginal: boolean = true
): Promise<TailoredBullet[]> {
  const promises = matchResults.map(mr =>
    formatBullet(mr, originalResume, fallbackToOriginal)
  );

  return Promise.all(promises);
}

interface BulletValidation {
  isValid: boolean;
  similarity: number;
  errors: string[];
}

/**
 * Validate a formatted bullet against anti-hallucination rules
 */
function validateFormattedBullet(
  original: string,
  formatted: string,
  originalResumeText: string
): BulletValidation {
  const errors: string[] = [];

  // 1. Check similarity threshold
  const similarity = calculateCombinedSimilarity(original, formatted);
  if (similarity < SIMILARITY_THRESHOLD) {
    errors.push(`Similarity ${(similarity * 100).toFixed(1)}% below threshold ${SIMILARITY_THRESHOLD * 100}%`);
  }

  // 2. Check for hallucinated metrics
  const metricsValidation = validateMetrics(originalResumeText, formatted);
  if (!metricsValidation.valid) {
    errors.push(`New metrics found: ${metricsValidation.newMetrics.join(', ')}`);
  }

  // 3. Check for hallucinated technologies
  const techValidation = validateTechnologies(originalResumeText, formatted);
  if (!techValidation.valid) {
    errors.push(`New technologies found: ${techValidation.newTechnologies.join(', ')}`);
  }

  // 4. Check action verb wasn't changed
  const originalVerb = extractActionVerb(original);
  const formattedVerb = extractActionVerb(formatted);
  if (originalVerb && formattedVerb && originalVerb.toLowerCase() !== formattedVerb.toLowerCase()) {
    errors.push(`Action verb changed: ${originalVerb} → ${formattedVerb}`);
  }

  // 5. Check for forbidden qualitative additions
  const forbiddenWords = [
    'significantly', 'dramatically', 'substantially', 'tremendously',
    'exceptionally', 'remarkably', 'incredibly', 'massively',
    'passionate', 'excited', 'driven', 'proven', 'innovative',
    'synergy', 'leverage', 'cutting-edge', 'best-in-class',
  ];

  for (const word of forbiddenWords) {
    if (formatted.toLowerCase().includes(word) && !original.toLowerCase().includes(word)) {
      errors.push(`Forbidden word added: ${word}`);
    }
  }

  return {
    isValid: errors.length === 0,
    similarity,
    errors,
  };
}

function extractActionVerb(bullet: string): string | null {
  const firstWord = bullet.trim().split(/\s+/)[0];
  if (firstWord && /^[A-Z][a-z]+(?:ed|ing)?$/.test(firstWord)) {
    return firstWord;
  }
  return null;
}

/**
 * Simple keyword addition without LLM (fallback)
 * Adds keywords in parentheses at end of bullet
 */
export function addKeywordsSimple(
  bullet: string,
  keywords: string[]
): string {
  if (keywords.length === 0) return bullet;

  // Check if bullet already ends with parentheses
  const existingParenMatch = bullet.match(/\(([^)]+)\)$/);

  if (existingParenMatch) {
    // Add to existing parentheses
    const existingKeywords = existingParenMatch[1];
    const newKeywords = keywords.filter(
      k => !existingKeywords.toLowerCase().includes(k.toLowerCase())
    );

    if (newKeywords.length === 0) return bullet;

    const combined = `${existingKeywords}, ${newKeywords.join(', ')}`;
    return bullet.replace(/\([^)]+\)$/, `(${combined})`);
  }

  // Add new parentheses
  return `${bullet} (${keywords.join(', ')})`;
}

/**
 * Batch format with rate limiting
 */
export async function formatBulletsWithRateLimit(
  matchResults: MatchResult[],
  originalResume: ParsedResume,
  options: {
    fallbackToOriginal?: boolean;
    batchSize?: number;
    delayMs?: number;
  } = {}
): Promise<TailoredBullet[]> {
  const {
    fallbackToOriginal = true,
    batchSize = 5,
    delayMs = 100,
  } = options;

  const results: TailoredBullet[] = [];

  for (let i = 0; i < matchResults.length; i += batchSize) {
    const batch = matchResults.slice(i, i + batchSize);
    const batchResults = await formatBullets(batch, originalResume, fallbackToOriginal);
    results.push(...batchResults);

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < matchResults.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
