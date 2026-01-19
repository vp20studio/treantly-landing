// ResuMatch v2 - Utility Functions
// Similarity checking, metrics extraction, writing style analysis

import type { WritingStyle } from './types';

// ==================== SIMILARITY FUNCTIONS ====================

/**
 * Calculate word-level Jaccard similarity between two strings
 */
export function calculateWordSimilarity(str1: string, str2: string): number {
  const words1 = new Set(normalizeText(str1).split(/\s+/).filter(w => w.length > 0));
  const words2 = new Set(normalizeText(str2).split(/\s+/).filter(w => w.length > 0));

  if (words1.size === 0 && words2.size === 0) return 1;
  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * Calculate character-level similarity using Levenshtein distance
 */
export function calculateCharSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);

  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);

  return 1 - distance / maxLength;
}

/**
 * Combined similarity score (weighted average of word and character similarity)
 * Special handling for parenthetical keyword additions
 */
export function calculateCombinedSimilarity(original: string, modified: string): number {
  // Check if modification is just adding parenthetical content at the end
  const originalBase = original.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const modifiedBase = modified.replace(/\s*\([^)]*\)\s*$/, '').trim();

  // If the base content is identical, only the parenthetical part differs
  if (originalBase === modifiedBase) {
    // High similarity for parenthetical-only additions
    return 0.95;
  }

  // If original had no parenthetical but modified does, and base is same
  if (!original.includes('(') && modified.includes('(')) {
    if (modifiedBase === original.trim() || modified.startsWith(original.trim())) {
      return 0.92;
    }
  }

  const wordSim = calculateWordSimilarity(original, modified);
  const charSim = calculateCharSimilarity(original, modified);

  // Weight word similarity more heavily (60%) as it captures semantic similarity
  return wordSim * 0.6 + charSim * 0.4;
}

/**
 * Find the best matching original bullet for a given output bullet
 */
export function findBestMatch(
  outputBullet: string,
  originalBullets: string[]
): { bullet: string; similarity: number } {
  let bestMatch = { bullet: '', similarity: 0 };

  for (const original of originalBullets) {
    const similarity = calculateCombinedSimilarity(original, outputBullet);
    if (similarity > bestMatch.similarity) {
      bestMatch = { bullet: original, similarity };
    }
  }

  return bestMatch;
}

function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ==================== METRICS EXTRACTION ====================

/**
 * Extract all numbers, percentages, and metrics from text
 */
export function extractMetrics(text: string): string[] {
  const metrics: string[] = [];

  // Match percentages (e.g., 25%, 150%)
  const percentages = text.match(/\d+(?:\.\d+)?%/g) || [];
  metrics.push(...percentages);

  // Match dollar amounts (e.g., $1M, $500K, $10,000)
  const dollars = text.match(/\$[\d,]+(?:\.\d+)?[KMB]?|\$\d+(?:\.\d+)?(?:\s*(?:million|billion|thousand))?/gi) || [];
  metrics.push(...dollars);

  // Match numbers with context (e.g., "10 engineers", "500 users")
  const numbersWithContext = text.match(/\d+(?:,\d{3})*(?:\.\d+)?\s*(?:users|customers|engineers|developers|team members|employees|projects|clients|orders|requests|transactions|records)/gi) || [];
  metrics.push(...numbersWithContext);

  // Match standalone significant numbers (likely metrics)
  const standaloneNumbers = text.match(/\b\d{2,}(?:,\d{3})*(?:\.\d+)?\b/g) || [];
  metrics.push(...standaloneNumbers);

  // Match time-based metrics (e.g., "2 years", "6 months")
  const timeMetrics = text.match(/\d+\+?\s*(?:years?|months?|weeks?|days?|hours?)/gi) || [];
  metrics.push(...timeMetrics);

  // Match multipliers (e.g., "3x", "10x")
  const multipliers = text.match(/\d+(?:\.\d+)?x\b/gi) || [];
  metrics.push(...multipliers);

  return [...new Set(metrics.map(m => m.toLowerCase().trim()))];
}

/**
 * Check if all metrics in output exist in original
 */
export function validateMetrics(originalText: string, outputText: string): {
  valid: boolean;
  newMetrics: string[];
} {
  const originalMetrics = extractMetrics(originalText);
  const outputMetrics = extractMetrics(outputText);

  const newMetrics = outputMetrics.filter(
    metric => !originalMetrics.some(
      orig => orig.includes(metric) || metric.includes(orig) || normalizeMetric(orig) === normalizeMetric(metric)
    )
  );

  return {
    valid: newMetrics.length === 0,
    newMetrics,
  };
}

function normalizeMetric(metric: string): string {
  return metric.replace(/[,\s]/g, '').toLowerCase();
}

// ==================== WRITING STYLE ANALYSIS ====================

/**
 * Analyze the writing style of the resume
 */
export function analyzeWritingStyle(bullets: string[], rawText: string): WritingStyle {
  return {
    avgSentenceLength: calculateAvgSentenceLength(bullets),
    usesContractions: detectContractions(rawText),
    formalityLevel: detectFormality(rawText),
    vocabularyLevel: analyzeVocabulary(rawText),
    actionVerbs: extractActionVerbs(bullets),
    sentencePatterns: extractSentencePatterns(bullets),
  };
}

function calculateAvgSentenceLength(bullets: string[]): number {
  if (bullets.length === 0) return 15; // Default

  const totalWords = bullets.reduce((sum, bullet) => {
    const words = bullet.split(/\s+/).filter(w => w.length > 0);
    return sum + words.length;
  }, 0);

  return Math.round(totalWords / bullets.length);
}

function detectContractions(text: string): boolean {
  const contractions = /\b(can't|won't|don't|didn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|couldn't|wouldn't|shouldn't|it's|that's|there's|here's|what's|who's|how's|let's|I'm|you're|we're|they're|I've|you've|we've|they've|I'll|you'll|we'll|they'll|I'd|you'd|we'd|they'd)\b/gi;
  return contractions.test(text);
}

function detectFormality(text: string): 1 | 2 | 3 | 4 | 5 {
  let score = 3; // Default to neutral

  // Informal indicators
  const informalWords = /\b(awesome|cool|great|nice|tons|lots|stuff|things|big|huge|super)\b/gi;
  const informalCount = (text.match(informalWords) || []).length;
  if (informalCount > 3) score -= 1;
  if (informalCount > 6) score -= 1;

  // Formal indicators
  const formalWords = /\b(implemented|orchestrated|facilitated|leveraged|optimized|architected|spearheaded|cultivated|streamlined|synthesized)\b/gi;
  const formalCount = (text.match(formalWords) || []).length;
  if (formalCount > 3) score += 1;
  if (formalCount > 6) score += 1;

  // Contractions reduce formality
  if (detectContractions(text)) score -= 1;

  return Math.max(1, Math.min(5, score)) as 1 | 2 | 3 | 4 | 5;
}

function analyzeVocabulary(text: string): 'simple' | 'moderate' | 'advanced' {
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;

  // Advanced vocabulary indicators
  const advancedWords = /\b(orchestrated|architected|synthesized|operationalized|institutionalized|conceptualized|systematized)\b/gi;
  const advancedCount = (text.match(advancedWords) || []).length;

  if (avgWordLength > 7 || advancedCount > 2) return 'advanced';
  if (avgWordLength > 5) return 'moderate';
  return 'simple';
}

function extractActionVerbs(bullets: string[]): string[] {
  const verbs: string[] = [];

  // Common resume action verbs
  const commonVerbs = new Set([
    'built', 'led', 'managed', 'developed', 'created', 'designed', 'implemented',
    'improved', 'reduced', 'increased', 'optimized', 'launched', 'delivered',
    'collaborated', 'coordinated', 'established', 'executed', 'analyzed',
    'achieved', 'accelerated', 'authored', 'automated', 'contributed',
    'directed', 'drove', 'engineered', 'enhanced', 'expanded', 'facilitated',
    'generated', 'grew', 'headed', 'identified', 'initiated', 'integrated',
    'mentored', 'modernized', 'negotiated', 'orchestrated', 'oversaw',
    'pioneered', 'produced', 'refactored', 'resolved', 'scaled', 'secured',
    'simplified', 'spearheaded', 'streamlined', 'supervised', 'transformed',
    'upgraded', 'utilized', 'validated', 'wrote',
  ]);

  for (const bullet of bullets) {
    // Extract first word (typically the action verb)
    const firstWord = bullet.trim().split(/\s+/)[0];
    if (firstWord) {
      // Check if it's a known action verb (case-insensitive)
      if (commonVerbs.has(firstWord.toLowerCase())) {
        verbs.push(firstWord);
      }
      // Also match words that look like past tense verbs
      else if (/^[A-Z][a-z]+(?:ed|t|d)$/.test(firstWord)) {
        verbs.push(firstWord);
      }
    }
  }

  return [...new Set(verbs)];
}

function extractSentencePatterns(bullets: string[]): string[] {
  const patterns: string[] = [];

  for (const bullet of bullets) {
    // Identify common patterns
    if (/^[A-Z][a-z]+ed\s/.test(bullet)) {
      patterns.push('PAST_VERB_START');
    }
    if (/^[A-Z][a-z]+ing\s/.test(bullet)) {
      patterns.push('PRESENT_PARTICIPLE_START');
    }
    if (/resulting in/i.test(bullet)) {
      patterns.push('RESULT_CLAUSE');
    }
    if (/by\s+\d+%/i.test(bullet)) {
      patterns.push('PERCENTAGE_IMPROVEMENT');
    }
    if (/\([\w\s,]+\)$/.test(bullet)) {
      patterns.push('PARENTHETICAL_END');
    }
  }

  return [...new Set(patterns)];
}

// ==================== FORMAT NORMALIZATION ====================

/**
 * Normalize bullet point format
 */
export function normalizeBullet(bullet: string): string {
  return bullet
    .replace(/^[\s•\-\*\u2022\u2023\u25E6\u2043\u2219]+/, '') // Remove leading bullet characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Normalize date format to "MMM YYYY - MMM YYYY" or "MMM YYYY - Present"
 */
export function normalizeDate(dateStr: string): string {
  // Try to parse and normalize common formats
  const months: Record<string, string> = {
    january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
    may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
    september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec',
    jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', jun: 'Jun',
    jul: 'Jul', aug: 'Aug', sep: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Dec',
  };

  let normalized = dateStr;

  // Replace full month names with abbreviations
  for (const [full, abbr] of Object.entries(months)) {
    const regex = new RegExp(`\\b${full}\\b`, 'gi');
    normalized = normalized.replace(regex, abbr);
  }

  // Normalize all types of dashes and separators to standard hyphen
  // This handles: en-dash (–), em-dash (—), and regular hyphen (-)
  normalized = normalized.replace(/[\u2013\u2014\u2015\u2212–—-]+/g, '-');

  // Ensure consistent spacing around the hyphen
  normalized = normalized.replace(/\s*-\s*/g, ' - ');

  return normalized;
}

// ==================== TEXT EXTRACTION ====================

/**
 * Extract company names from text
 */
export function extractCompanyNames(experiences: { company: string }[]): string[] {
  return experiences.map(exp => exp.company.toLowerCase().trim());
}

/**
 * Extract tool/technology names from text
 */
export function extractTechnologies(text: string): string[] {
  // Common technology patterns
  const techPatterns = [
    /\b(?:React|Angular|Vue|Node\.?js|Python|Java|JavaScript|TypeScript|Go|Rust|C\+\+|C#|Ruby|PHP|Swift|Kotlin)\b/gi,
    /\b(?:AWS|Azure|GCP|Docker|Kubernetes|K8s|Terraform|Jenkins|CircleCI|GitHub Actions)\b/gi,
    /\b(?:PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|DynamoDB|Cassandra)\b/gi,
    /\b(?:REST|GraphQL|gRPC|WebSocket|HTTP|HTTPS)\b/gi,
    /\b(?:Git|Jira|Confluence|Slack|Figma|Notion)\b/gi,
    /\b(?:TensorFlow|PyTorch|Scikit-learn|Pandas|NumPy|Keras)\b/gi,
    /\b(?:Spring|Django|Flask|Express|FastAPI|Rails|Laravel)\b/gi,
  ];

  const technologies: string[] = [];

  for (const pattern of techPatterns) {
    const matches = text.match(pattern) || [];
    technologies.push(...matches.map(m => m.toLowerCase()));
  }

  return [...new Set(technologies)];
}

/**
 * Check if output introduces new technologies not in original
 */
export function validateTechnologies(originalText: string, outputText: string): {
  valid: boolean;
  newTechnologies: string[];
} {
  const originalTech = extractTechnologies(originalText);
  const outputTech = extractTechnologies(outputText);

  const newTechnologies = outputTech.filter(
    tech => !originalTech.includes(tech)
  );

  return {
    valid: newTechnologies.length === 0,
    newTechnologies,
  };
}
