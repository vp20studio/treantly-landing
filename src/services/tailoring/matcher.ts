// ResuMatch v2 - Deterministic Matching Engine
// Matches resume bullets to JD requirements without hallucination

import type { ParsedResume, JDAnalysis, MatchResult } from './types';
import { getAllKeywords, getKeywordPriority } from './jdAnalyzer';

/**
 * Match resume bullets against JD requirements
 * Returns bullets sorted by relevance with suggested keyword additions
 */
export function matchBulletsToJD(
  resume: ParsedResume,
  jdAnalysis: JDAnalysis
): MatchResult[] {
  const jdKeywords = getAllKeywords(jdAnalysis);
  const results: MatchResult[] = [];

  for (const bullet of resume.bullets) {
    const matchResult = analyzeBulletMatch(bullet, jdKeywords, jdAnalysis, resume);
    results.push(matchResult);
  }

  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

function analyzeBulletMatch(
  bullet: string,
  jdKeywords: string[],
  jdAnalysis: JDAnalysis,
  resume: ParsedResume
): MatchResult {
  const bulletLower = bullet.toLowerCase();
  const bulletWords = new Set(bulletLower.split(/\W+/).filter(w => w.length > 2));

  // Find keywords already present in the bullet
  const matchedKeywords: string[] = [];
  for (const keyword of jdKeywords) {
    if (bulletLower.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    }
  }

  // Calculate relevance score
  let relevanceScore = 0;
  for (const keyword of matchedKeywords) {
    relevanceScore += getKeywordPriority(keyword, jdAnalysis);
  }

  // Normalize score to 0-1 range
  const maxPossibleScore = jdKeywords.length * 10;
  relevanceScore = Math.min(1, relevanceScore / Math.max(1, maxPossibleScore / 3));

  // Boost score if bullet contains action verbs that match responsibilities
  const actionVerbBoost = calculateActionVerbBoost(bullet, jdAnalysis.responsibilities);
  relevanceScore = Math.min(1, relevanceScore + actionVerbBoost);

  // Find keywords that could be added (from resume skills that match JD)
  const suggestedKeywordAdditions = findSafeKeywordAdditions(
    bullet,
    jdKeywords,
    resume.skills,
    matchedKeywords
  );

  return {
    originalBullet: bullet,
    matchedKeywords,
    relevanceScore,
    suggestedKeywordAdditions,
  };
}

function calculateActionVerbBoost(bullet: string, responsibilities: string[]): number {
  const bulletVerb = bullet.split(/\s+/)[0]?.toLowerCase();
  if (!bulletVerb) return 0;

  // Check if any responsibility contains similar action
  for (const resp of responsibilities) {
    const respLower = resp.toLowerCase();
    if (respLower.includes(bulletVerb)) {
      return 0.1;
    }
  }

  // Common verb synonyms
  const verbGroups = [
    ['led', 'managed', 'directed', 'headed', 'oversaw'],
    ['built', 'developed', 'created', 'designed', 'implemented'],
    ['improved', 'enhanced', 'optimized', 'streamlined', 'upgraded'],
    ['reduced', 'decreased', 'cut', 'lowered', 'minimized'],
    ['increased', 'grew', 'expanded', 'boosted', 'raised'],
    ['collaborated', 'partnered', 'worked', 'coordinated', 'aligned'],
    ['analyzed', 'evaluated', 'assessed', 'reviewed', 'examined'],
  ];

  for (const group of verbGroups) {
    if (group.includes(bulletVerb)) {
      for (const resp of responsibilities) {
        const respLower = resp.toLowerCase();
        if (group.some(verb => respLower.includes(verb))) {
          return 0.05;
        }
      }
    }
  }

  return 0;
}

/**
 * Find keywords that can be SAFELY added to a bullet
 * CRITICAL: Only add keywords that are ALREADY in the resume's skills section
 */
function findSafeKeywordAdditions(
  bullet: string,
  jdKeywords: string[],
  resumeSkills: string[],
  alreadyMatched: string[]
): string[] {
  const suggestions: string[] = [];
  const bulletLower = bullet.toLowerCase();
  const alreadyMatchedLower = new Set(alreadyMatched.map(k => k.toLowerCase()));

  // Normalize resume skills for comparison
  const resumeSkillsLower = new Set(resumeSkills.map(s => s.toLowerCase()));

  for (const keyword of jdKeywords) {
    const keywordLower = keyword.toLowerCase();

    // Skip if already in bullet
    if (bulletLower.includes(keywordLower)) continue;

    // Skip if already matched
    if (alreadyMatchedLower.has(keywordLower)) continue;

    // CRITICAL: Only suggest if the skill is in the resume
    if (resumeSkillsLower.has(keywordLower)) {
      // Check if this keyword is contextually relevant to the bullet
      if (isKeywordRelevantToBullet(keyword, bullet)) {
        suggestions.push(keyword);
      }
    }
  }

  // Limit to top 2 most relevant suggestions
  return suggestions.slice(0, 2);
}

/**
 * Check if a keyword is contextually relevant to a bullet
 * This prevents nonsensical keyword additions
 */
function isKeywordRelevantToBullet(keyword: string, bullet: string): boolean {
  const keywordLower = keyword.toLowerCase();
  const bulletLower = bullet.toLowerCase();

  // Define context mappings
  const contextMappings: Record<string, string[]> = {
    // Programming languages
    python: ['data', 'script', 'automat', 'machine learning', 'ml', 'analysis', 'backend', 'api'],
    javascript: ['web', 'frontend', 'react', 'node', 'ui', 'interface', 'application'],
    typescript: ['web', 'frontend', 'react', 'node', 'type', 'application'],
    java: ['backend', 'enterprise', 'api', 'service', 'spring', 'microservice'],
    sql: ['data', 'database', 'query', 'report', 'analysis', 'etl'],
    go: ['backend', 'microservice', 'api', 'performance', 'concurrent'],
    rust: ['performance', 'system', 'backend', 'memory'],

    // Frameworks
    react: ['frontend', 'ui', 'component', 'web', 'interface', 'user'],
    node: ['backend', 'api', 'server', 'javascript'],
    django: ['python', 'backend', 'web', 'api'],
    spring: ['java', 'backend', 'enterprise', 'microservice'],

    // Cloud/DevOps
    aws: ['cloud', 'infrastructure', 'deploy', 'scale', 's3', 'ec2', 'lambda', 'serverless'],
    docker: ['container', 'deploy', 'infrastructure', 'microservice'],
    kubernetes: ['container', 'orchestrat', 'deploy', 'scale', 'k8s'],

    // Databases
    postgresql: ['database', 'sql', 'data', 'query', 'backend'],
    mongodb: ['database', 'nosql', 'data', 'document'],
    redis: ['cache', 'performance', 'data', 'real-time'],

    // General
    agile: ['team', 'sprint', 'scrum', 'collaborat', 'project'],
    git: ['version', 'code', 'collaborat', 'team', 'repository'],
  };

  // Check if the keyword has context rules
  const contexts = contextMappings[keywordLower];
  if (contexts) {
    return contexts.some(ctx => bulletLower.includes(ctx));
  }

  // For unknown keywords, be conservative - only allow if bullet mentions technology/tools
  const techIndicators = ['built', 'developed', 'implemented', 'created', 'designed', 'used', 'leveraged', 'utilizing', 'using'];
  return techIndicators.some(ind => bulletLower.includes(ind));
}

/**
 * Get the best bullets for each experience based on JD relevance
 */
export function selectTopBullets(
  matchResults: MatchResult[],
  maxBullets: number = 5
): MatchResult[] {
  return matchResults
    .filter(r => r.relevanceScore > 0.1) // Minimum relevance threshold
    .slice(0, maxBullets);
}

/**
 * Group match results by experience
 */
export function groupMatchesByExperience(
  matchResults: MatchResult[],
  resume: ParsedResume
): Map<string, MatchResult[]> {
  const grouped = new Map<string, MatchResult[]>();

  for (const exp of resume.experiences) {
    const expKey = `${exp.company}|${exp.title}`;
    const expMatches = matchResults.filter(mr =>
      exp.bullets.includes(mr.originalBullet)
    );
    grouped.set(expKey, expMatches);
  }

  return grouped;
}
