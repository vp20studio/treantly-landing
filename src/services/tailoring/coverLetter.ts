// ResuMatch v2 - Cover Letter Generator
// Voice-matched hybrid approach to minimize AI detection

import { getStrictCompletion } from '../ai/client';
import type { ParsedResume, JDAnalysis, CoverLetter, WritingStyle, TailoredBullet } from './types';
import { analyzeWritingStyle } from './utils';

const MAX_COVER_LETTER_WORDS = 200;

// Template fragments that sound human (not AI-generated)
const OPENING_TEMPLATES = [
  "I'm applying for the {title} role{company_phrase}.",
  "I'm writing about the {title} position{company_phrase}.",
  "I saw your {title} opening{company_phrase} and wanted to reach out.",
];

const COMPANY_PHRASES = {
  withCompany: " at {company}",
  withoutCompany: "",
};

const CLOSING_TEMPLATES = [
  "I'd welcome the chance to discuss how I can contribute.",
  "I look forward to discussing this opportunity.",
  "Happy to chat more about my background.",
];

/**
 * Generate a voice-matched cover letter
 * Strategy: Use templates + original resume phrases to minimize AI-generated content
 */
export async function generateCoverLetter(
  resume: ParsedResume,
  jdAnalysis: JDAnalysis,
  tailoredBullets: TailoredBullet[]
): Promise<CoverLetter> {
  // Analyze the candidate's writing style from their resume
  const writingStyle = analyzeWritingStyle(resume.bullets, resume.rawText);

  // Select the most relevant bullets to include (original phrasing)
  const topBullets = selectBulletsForCoverLetter(tailoredBullets, 3);

  // Generate using hybrid approach
  const content = await generateHybridCoverLetter(
    resume,
    jdAnalysis,
    writingStyle,
    topBullets
  );

  // Track which phrases came from the original resume
  const originalPhrases = extractOriginalPhrases(content, resume.bullets);

  // Estimate AI probability based on how much is templated vs generated
  const aiProbabilityEstimate = estimateAIProbability(content, originalPhrases);

  return {
    content,
    wordCount: countWords(content),
    aiProbabilityEstimate,
    originalPhrases,
  };
}

function selectBulletsForCoverLetter(
  tailoredBullets: TailoredBullet[],
  count: number
): TailoredBullet[] {
  // Prefer bullets that were relevant (matched keywords) but not heavily modified
  return tailoredBullets
    .filter(b => b.similarity >= 0.9) // High similarity = trustworthy
    .slice(0, count);
}

async function generateHybridCoverLetter(
  resume: ParsedResume,
  jdAnalysis: JDAnalysis,
  writingStyle: WritingStyle,
  topBullets: TailoredBullet[]
): Promise<string> {
  // Build the prompt that enforces voice matching
  const voiceMatchingPrompt = buildVoiceMatchingPrompt(writingStyle);

  // Extract phrases we want the LLM to incorporate
  const bulletPhrases = topBullets.map(b => b.original);

  const systemPrompt = `You are writing a cover letter that MUST match the candidate's writing voice exactly.

${voiceMatchingPrompt}

CRITICAL ANTI-AI RULES:
1. Use the candidate's EXACT phrases from their resume - do not paraphrase
2. NO flowery language (passionate, excited, thrilled, driven, eager)
3. NO corporate buzzwords (synergy, leverage, innovative, cutting-edge, best-in-class)
4. NO superlatives (exceptional, outstanding, remarkable, tremendous)
5. NO filler phrases (I believe, I am confident, It would be my pleasure)
6. Keep sentences SHORT - maximum 15 words each
7. Be DIRECT - get to the point quickly
8. Maximum ${MAX_COVER_LETTER_WORDS} words total

The cover letter should have 3 parts:
1. Opening (1 sentence): State the role you're applying for
2. Body (2-3 sentences): Include 1-2 specific achievements from the resume
3. Closing (1 sentence): Brief next step

OUTPUT: Return ONLY the cover letter text. No formatting, no "Dear Hiring Manager", no sign-off.`;

  const userPrompt = `Write a cover letter for ${resume.contact.name} applying to ${jdAnalysis.title}${jdAnalysis.company ? ` at ${jdAnalysis.company}` : ''}.

Resume highlights to include (use these EXACT phrases):
${bulletPhrases.map((b, i) => `${i + 1}. "${b}"`).join('\n')}

Relevant skills: ${resume.skills.slice(0, 5).join(', ')}

Write the cover letter now, matching the candidate's voice and using their exact phrases.`;

  try {
    const response = await getStrictCompletion({
      systemPrompt,
      userPrompt,
    });

    // Post-process to remove any AI-isms that slipped through
    const cleaned = removeAIPatterns(response.trim());

    // Enforce word limit
    const limited = enforceWordLimit(cleaned, MAX_COVER_LETTER_WORDS);

    return limited;
  } catch (error) {
    // Fallback to pure template-based generation
    console.error('Cover letter generation failed, using template fallback:', error);
    return generateTemplateCoverLetter(resume, jdAnalysis, topBullets);
  }
}

function buildVoiceMatchingPrompt(style: WritingStyle): string {
  const parts: string[] = [];

  parts.push(`Match this writing style exactly:`);
  parts.push(`- Average sentence length: ${style.avgSentenceLength} words`);
  parts.push(`- Formality level: ${style.formalityLevel}/5 (${getFormalityDescription(style.formalityLevel)})`);
  parts.push(`- Vocabulary: ${style.vocabularyLevel}`);

  if (style.usesContractions) {
    parts.push(`- Uses contractions (it's, don't, can't) - YOU SHOULD TOO`);
  } else {
    parts.push(`- Does NOT use contractions - YOU SHOULD NOT EITHER`);
  }

  if (style.actionVerbs.length > 0) {
    parts.push(`- Action verbs from resume (use these, not fancy synonyms): ${style.actionVerbs.slice(0, 8).join(', ')}`);
  }

  return parts.join('\n');
}

function getFormalityDescription(level: number): string {
  switch (level) {
    case 1: return 'very casual';
    case 2: return 'casual';
    case 3: return 'neutral';
    case 4: return 'formal';
    case 5: return 'very formal';
    default: return 'neutral';
  }
}

/**
 * Remove common AI-generated patterns from text
 */
function removeAIPatterns(text: string): string {
  let result = text;

  // Remove common AI phrases
  const aiPatterns = [
    /\bI am (passionate|excited|thrilled|eager) (about|to)\b/gi,
    /\bI would be (honored|thrilled|excited) to\b/gi,
    /\bI am confident (that|in)\b/gi,
    /\bI believe (that )?(I |my )/gi,
    /\bIt would be my pleasure to\b/gi,
    /\bI am (a |an )(highly |extremely )?(motivated|driven|dedicated)\b/gi,
    /\bproven track record of\b/gi,
    /\bleverage my (skills|experience)\b/gi,
    /\bbring value to\b/gi,
    /\bmake a (significant |meaningful )?impact\b/gi,
    /\bhit the ground running\b/gi,
    /\bteam player who\b/gi,
    /\bDear Hiring Manager,?\s*/gi,
    /\bSincerely,?\s*$/gi,
    /\bBest regards,?\s*$/gi,
    /\bThank you for (your )?(time|consideration)[.,]?\s*$/gi,
  ];

  for (const pattern of aiPatterns) {
    result = result.replace(pattern, '');
  }

  // Clean up any double spaces or leading/trailing whitespace
  result = result.replace(/\s+/g, ' ').trim();

  // Remove any sentences that start with "I am a" or "I am an" (often filler)
  result = result.replace(/I am an? [^.]+\.\s*/g, '');

  return result;
}

function enforceWordLimit(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;

  // Find a sentence boundary near the limit
  const truncated = words.slice(0, maxWords).join(' ');
  const lastPeriod = truncated.lastIndexOf('.');

  if (lastPeriod > truncated.length * 0.7) {
    return truncated.slice(0, lastPeriod + 1);
  }

  return truncated + '.';
}

/**
 * Pure template-based fallback (no LLM)
 */
function generateTemplateCoverLetter(
  resume: ParsedResume,
  jdAnalysis: JDAnalysis,
  topBullets: TailoredBullet[]
): string {
  // Select opening template
  const opening = OPENING_TEMPLATES[Math.floor(Math.random() * OPENING_TEMPLATES.length)]
    .replace('{title}', jdAnalysis.title)
    .replace('{company_phrase}', jdAnalysis.company
      ? COMPANY_PHRASES.withCompany.replace('{company}', jdAnalysis.company)
      : COMPANY_PHRASES.withoutCompany
    );

  // Body: Include actual resume achievements
  const bodyParts: string[] = [];

  if (topBullets.length > 0) {
    bodyParts.push(`In my recent role, I ${topBullets[0].original.toLowerCase()}.`);
  }

  if (topBullets.length > 1) {
    bodyParts.push(`I also ${topBullets[1].original.toLowerCase()}.`);
  }

  // Closing
  const closing = CLOSING_TEMPLATES[Math.floor(Math.random() * CLOSING_TEMPLATES.length)];

  return `${opening} ${bodyParts.join(' ')} ${closing}`;
}

function extractOriginalPhrases(coverLetter: string, originalBullets: string[]): string[] {
  const found: string[] = [];
  const coverLetterLower = coverLetter.toLowerCase();

  for (const bullet of originalBullets) {
    // Check for substantial phrase matches (at least 4 words)
    const words = bullet.split(/\s+/);
    for (let i = 0; i < words.length - 3; i++) {
      const phrase = words.slice(i, i + 4).join(' ').toLowerCase();
      if (coverLetterLower.includes(phrase)) {
        found.push(phrase);
      }
    }
  }

  return [...new Set(found)];
}

function estimateAIProbability(content: string, originalPhrases: string[]): number {
  // Base probability starts at 50%
  let probability = 0.5;

  // Reduce probability for each original phrase used (more human-like)
  probability -= originalPhrases.length * 0.05;

  // Check for AI indicators
  const aiIndicators = [
    /\bpassion/i, /\bexcited/i, /\bthrilled/i, /\beager/i,
    /\bsynergy/i, /\bleverage/i, /\binnovative/i,
    /\bexceptional/i, /\boutstanding/i, /\bremarkable/i,
    /\bI am confident/i, /\bI believe/i,
    /\bproven track record/i, /\bhit the ground running/i,
  ];

  for (const pattern of aiIndicators) {
    if (pattern.test(content)) {
      probability += 0.1;
    }
  }

  // Short content is more human-like
  const wordCount = countWords(content);
  if (wordCount < 150) probability -= 0.1;
  if (wordCount < 100) probability -= 0.1;

  // Contractions are more human-like
  const contractions = content.match(/\b(I'm|don't|can't|won't|it's|that's)\b/gi);
  if (contractions && contractions.length > 0) {
    probability -= 0.05 * Math.min(contractions.length, 3);
  }

  // Bound the probability
  return Math.max(0, Math.min(1, probability));
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}
