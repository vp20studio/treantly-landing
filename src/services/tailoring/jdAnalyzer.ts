// ResuMatch v2 - Job Description Analyzer
// Uses LLM to extract structured requirements from job descriptions

import { getCompletion } from '../ai/client';
import type { JDAnalysis, Skill } from './types';

const JD_ANALYSIS_SYSTEM_PROMPT = `You are a job description analyzer. Extract structured information from job descriptions.

RESPOND ONLY WITH VALID JSON in this exact format:
{
  "title": "Job title from the JD",
  "company": "Company name if mentioned",
  "requiredSkills": [
    {"name": "Skill name", "importance": "required", "category": "technical|soft|domain|tool"}
  ],
  "preferredSkills": [
    {"name": "Skill name", "importance": "preferred", "category": "technical|soft|domain|tool"}
  ],
  "responsibilities": ["Key responsibility 1", "Key responsibility 2"],
  "keywords": ["keyword1", "keyword2"],
  "experienceLevel": "entry|mid|senior|lead|executive",
  "industryKeywords": ["industry-specific term 1"]
}

Rules:
1. Extract ONLY what is explicitly stated in the JD
2. Do NOT infer or add skills not mentioned
3. Keywords should be ATS-relevant terms from the JD
4. Category must be one of: technical, soft, domain, tool
5. Importance must be: required, preferred, or nice-to-have`;

/**
 * Analyze a job description and extract structured requirements
 */
export async function analyzeJobDescription(jdText: string): Promise<JDAnalysis> {
  const userPrompt = `Analyze this job description and extract the structured information:

${jdText}`;

  const response = await getCompletion({
    systemPrompt: JD_ANALYSIS_SYSTEM_PROMPT,
    userPrompt,
    responseFormat: 'json',
  });

  try {
    const parsed = JSON.parse(response);
    return validateAndNormalizeJDAnalysis(parsed);
  } catch (error) {
    throw new Error(`Failed to parse JD analysis response: ${error}`);
  }
}

function validateAndNormalizeJDAnalysis(raw: unknown): JDAnalysis {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Invalid JD analysis: not an object');
  }

  const obj = raw as Record<string, unknown>;

  // Normalize skills
  const requiredSkills = normalizeSkills(obj.requiredSkills, 'required');
  const preferredSkills = normalizeSkills(obj.preferredSkills, 'preferred');

  // Determine experience level
  const experienceLevel = normalizeExperienceLevel(obj.experienceLevel);

  return {
    title: String(obj.title || 'Unknown Position'),
    company: obj.company ? String(obj.company) : undefined,
    requiredSkills,
    preferredSkills,
    responsibilities: normalizeStringArray(obj.responsibilities),
    keywords: normalizeStringArray(obj.keywords).map(k => k.toLowerCase()),
    experienceLevel,
    industryKeywords: normalizeStringArray(obj.industryKeywords).map(k => k.toLowerCase()),
  };
}

function normalizeSkills(skills: unknown, defaultImportance: Skill['importance']): Skill[] {
  if (!Array.isArray(skills)) return [];

  return skills.map(skill => {
    if (typeof skill === 'string') {
      return {
        name: skill,
        importance: defaultImportance,
        category: 'technical' as const,
      };
    }

    if (typeof skill === 'object' && skill !== null) {
      const s = skill as Record<string, unknown>;
      return {
        name: String(s.name || ''),
        importance: normalizeImportance(s.importance) || defaultImportance,
        category: normalizeCategory(s.category),
      };
    }

    return null;
  }).filter((s): s is Skill => s !== null && s.name.length > 0);
}

function normalizeImportance(imp: unknown): Skill['importance'] | undefined {
  const str = String(imp).toLowerCase();
  if (str === 'required') return 'required';
  if (str === 'preferred') return 'preferred';
  if (str === 'nice-to-have' || str === 'nice to have') return 'nice-to-have';
  return undefined;
}

function normalizeCategory(cat: unknown): Skill['category'] {
  const str = String(cat).toLowerCase();
  if (str === 'technical') return 'technical';
  if (str === 'soft') return 'soft';
  if (str === 'domain') return 'domain';
  if (str === 'tool') return 'tool';
  return 'technical'; // Default
}

function normalizeExperienceLevel(level: unknown): JDAnalysis['experienceLevel'] {
  const str = String(level).toLowerCase();
  if (str === 'entry') return 'entry';
  if (str === 'mid') return 'mid';
  if (str === 'senior') return 'senior';
  if (str === 'lead') return 'lead';
  if (str === 'executive') return 'executive';
  return 'mid'; // Default
}

function normalizeStringArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map(item => String(item).trim())
    .filter(s => s.length > 0);
}

/**
 * Extract all unique keywords from JD analysis
 */
export function getAllKeywords(analysis: JDAnalysis): string[] {
  const keywords = new Set<string>();

  // Add explicit keywords
  analysis.keywords.forEach(k => keywords.add(k.toLowerCase()));

  // Add skill names
  [...analysis.requiredSkills, ...analysis.preferredSkills].forEach(skill => {
    keywords.add(skill.name.toLowerCase());
  });

  // Add industry keywords
  analysis.industryKeywords.forEach(k => keywords.add(k.toLowerCase()));

  return [...keywords];
}

/**
 * Calculate a priority score for keywords (higher = more important to include)
 */
export function getKeywordPriority(keyword: string, analysis: JDAnalysis): number {
  const lower = keyword.toLowerCase();

  // Required skills get highest priority
  if (analysis.requiredSkills.some(s => s.name.toLowerCase() === lower)) {
    return 10;
  }

  // Preferred skills
  if (analysis.preferredSkills.some(s => s.name.toLowerCase() === lower)) {
    return 7;
  }

  // Explicit keywords in JD
  if (analysis.keywords.includes(lower)) {
    return 5;
  }

  // Industry keywords
  if (analysis.industryKeywords.includes(lower)) {
    return 3;
  }

  return 1;
}
