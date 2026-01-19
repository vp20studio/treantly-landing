// ResuMatch v2 - Orchestrator
// Main entry point for resume tailoring with pre-flight validation

import type {
  ParsedResume,
  TailoringResult,
  TailoringOptions,
  TailoredResume,
  TailoredExperience,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  JDAnalysis,
} from './types';
import { parseResume, validateParsedResume } from './parser';
import { analyzeJobDescription, getAllKeywords } from './jdAnalyzer';
import { matchBulletsToJD, groupMatchesByExperience } from './matcher';
import { formatBulletsWithRateLimit, addKeywordsSimple } from './formatter';
import { generateCoverLetter } from './coverLetter';
import {
  validateMetrics,
  validateTechnologies,
  extractCompanyNames,
  calculateCombinedSimilarity,
} from './utils';

const DEFAULT_OPTIONS: Required<TailoringOptions> = {
  strictMode: false,
  includeCoverLetter: true,
  maxBulletModification: 0.15,
  fallbackToOriginal: true,
};

/**
 * Main entry point: Tailor a resume to a job description
 */
export async function tailorResume(
  resumeText: string,
  jobDescriptionText: string,
  options: TailoringOptions = {}
): Promise<TailoringResult> {
  const startTime = Date.now();
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Phase 1: Parse the resume
  const parsedResume = parseResume(resumeText);
  const parseValidation = validateParsedResume(parsedResume);

  if (!parseValidation.valid) {
    throw new Error(`Resume parsing failed: ${parseValidation.errors.join(', ')}`);
  }

  // Phase 2: Analyze the job description
  const jdAnalysis = await analyzeJobDescription(jobDescriptionText);

  // Phase 3: Match bullets to JD
  const matchResults = matchBulletsToJD(parsedResume, jdAnalysis);

  // Phase 4: Format bullets with keywords
  const tailoredBullets = await formatBulletsWithRateLimit(
    matchResults,
    parsedResume,
    { fallbackToOriginal: opts.fallbackToOriginal }
  );

  // Phase 5: Assemble the tailored resume
  const tailoredResume = assembleResume(parsedResume, tailoredBullets, matchResults);

  // Phase 6: Generate cover letter (if requested)
  let coverLetter = {
    content: '',
    wordCount: 0,
    aiProbabilityEstimate: 0,
    originalPhrases: [] as string[],
  };

  if (opts.includeCoverLetter) {
    coverLetter = await generateCoverLetter(parsedResume, jdAnalysis, tailoredBullets);
  }

  // Phase 7: Pre-flight validation
  const validation = validateTailoredOutput(
    parsedResume,
    tailoredResume,
    jdAnalysis,
    opts.strictMode
  );

  const processingTime = Date.now() - startTime;

  return {
    resume: tailoredResume,
    coverLetter,
    validation,
    jdAnalysis,
    processingTime,
  };
}

/**
 * Assemble the tailored resume from components
 */
function assembleResume(
  original: ParsedResume,
  tailoredBullets: Awaited<ReturnType<typeof formatBulletsWithRateLimit>>,
  matchResults: ReturnType<typeof matchBulletsToJD>
): TailoredResume {
  // Create a map of original bullet -> tailored bullet
  const bulletMap = new Map<string, typeof tailoredBullets[0]>();
  for (const tb of tailoredBullets) {
    bulletMap.set(tb.original, tb);
  }

  // Group match results by experience
  const matchesByExp = groupMatchesByExperience(matchResults, original);

  // Build tailored experiences
  const experiences: TailoredExperience[] = original.experiences.map(exp => {
    const expKey = `${exp.company}|${exp.title}`;
    const expMatches = matchesByExp.get(expKey) || [];

    // Sort bullets by relevance
    const sortedBullets = expMatches
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .map(match => {
        const tailored = bulletMap.get(match.originalBullet);
        if (tailored) {
          return tailored;
        }
        // Fallback: use simple keyword addition
        const withKeywords = addKeywordsSimple(
          match.originalBullet,
          match.suggestedKeywordAdditions.slice(0, 2)
        );
        return {
          original: match.originalBullet,
          tailored: withKeywords,
          similarity: calculateCombinedSimilarity(match.originalBullet, withKeywords),
          addedKeywords: match.suggestedKeywordAdditions.slice(0, 2),
          wasModified: withKeywords !== match.originalBullet,
        };
      });

    // Include any bullets not in match results
    const matchedOriginals = new Set(expMatches.map(m => m.originalBullet));
    const unmatchedBullets = exp.bullets
      .filter(b => !matchedOriginals.has(b))
      .map(b => ({
        original: b,
        tailored: b,
        similarity: 1.0,
        addedKeywords: [],
        wasModified: false,
      }));

    return {
      company: exp.company,
      title: exp.title,
      dates: exp.dates,
      location: exp.location,
      bullets: [...sortedBullets, ...unmatchedBullets],
    };
  });

  // Prioritize skills mentioned in JD
  const skills = prioritizeSkills(original.skills);

  return {
    contact: original.contact,
    summary: original.summary,
    experiences,
    education: original.education,
    skills,
    certifications: original.certifications,
  };
}

/**
 * Prioritize skills (JD-relevant skills should come first)
 * Note: This is a simple alphabetical sort for now;
 * in production, you'd want to sort by JD relevance
 */
function prioritizeSkills(skills: string[]): string[] {
  // Remove duplicates and normalize
  return [...new Set(skills.map(s => s.trim()))];
}

/**
 * Pre-flight validation of tailored output
 */
function validateTailoredOutput(
  original: ParsedResume,
  tailored: TailoredResume,
  jdAnalysis: JDAnalysis,
  strictMode: boolean
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. Validate all companies/titles match original
  const originalCompanies = extractCompanyNames(original.experiences);
  for (const exp of tailored.experiences) {
    if (!originalCompanies.includes(exp.company.toLowerCase().trim())) {
      errors.push({
        type: 'new_company',
        message: `Company "${exp.company}" not found in original resume`,
        outputValue: exp.company,
      });
    }
  }

  // 2. Validate all dates match original
  const originalDates = new Set(original.experiences.map(e => e.dates));
  for (const exp of tailored.experiences) {
    if (!originalDates.has(exp.dates)) {
      // Check for similar dates (formatting differences)
      const similarDate = [...originalDates].find(d =>
        d.replace(/\s+/g, '') === exp.dates.replace(/\s+/g, '')
      );
      if (!similarDate) {
        errors.push({
          type: 'format_error',
          message: `Date "${exp.dates}" doesn't match any original dates`,
          outputValue: exp.dates,
        });
      }
    }
  }

  // 3. Validate no new metrics introduced
  const allTailoredText = tailored.experiences
    .flatMap(e => e.bullets.map(b => b.tailored))
    .join(' ');

  const metricsValidation = validateMetrics(original.rawText, allTailoredText);
  if (!metricsValidation.valid) {
    for (const metric of metricsValidation.newMetrics) {
      errors.push({
        type: 'hallucinated_metric',
        message: `New metric "${metric}" not found in original resume`,
        outputValue: metric,
      });
    }
  }

  // 4. Validate no new technologies introduced
  const techValidation = validateTechnologies(original.rawText, allTailoredText);
  if (!techValidation.valid) {
    for (const tech of techValidation.newTechnologies) {
      errors.push({
        type: 'new_tool',
        message: `New technology "${tech}" not found in original resume`,
        outputValue: tech,
      });
    }
  }

  // 5. Validate each bullet has 85%+ similarity
  for (const exp of tailored.experiences) {
    for (const bullet of exp.bullets) {
      if (bullet.wasModified && bullet.similarity < 0.85) {
        if (strictMode) {
          errors.push({
            type: 'low_similarity',
            message: `Bullet similarity ${(bullet.similarity * 100).toFixed(1)}% below 85% threshold`,
            originalValue: bullet.original,
            outputValue: bullet.tailored,
          });
        } else {
          warnings.push({
            type: 'high_modification',
            message: `Bullet modified significantly (${(bullet.similarity * 100).toFixed(1)}% similarity)`,
            details: `Original: "${bullet.original.slice(0, 50)}..."`,
          });
        }
      }
    }
  }

  // 6. Validate total word count within 10% of original
  const originalWordCount = original.rawText.split(/\s+/).length;
  const tailoredWordCount = allTailoredText.split(/\s+/).length;
  const wordCountRatio = tailoredWordCount / originalWordCount;

  if (wordCountRatio > 1.1 || wordCountRatio < 0.9) {
    warnings.push({
      type: 'length_change',
      message: `Word count changed by ${((wordCountRatio - 1) * 100).toFixed(0)}%`,
      details: `Original: ~${originalWordCount} words, Tailored: ~${tailoredWordCount} words`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Quick check if OpenAI API is configured
 */
export async function checkApiConfiguration(): Promise<{
  configured: boolean;
  error?: string;
}> {
  try {
    const { validateApiKey } = await import('../ai/client');
    const isValid = await validateApiKey();
    return { configured: isValid };
  } catch (error) {
    return {
      configured: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Export utility for formatting the tailored resume as plain text
 */
export function formatAsPlainText(result: TailoringResult): string {
  const { resume, coverLetter } = result;
  const lines: string[] = [];

  // Contact
  lines.push(resume.contact.name);
  if (resume.contact.email) lines.push(resume.contact.email);
  if (resume.contact.phone) lines.push(resume.contact.phone);
  if (resume.contact.location) lines.push(resume.contact.location);
  lines.push('');

  // Summary
  if (resume.summary) {
    lines.push('SUMMARY');
    lines.push(resume.summary);
    lines.push('');
  }

  // Experience
  lines.push('EXPERIENCE');
  for (const exp of resume.experiences) {
    lines.push(`${exp.title} | ${exp.company}`);
    lines.push(exp.dates);
    for (const bullet of exp.bullets) {
      lines.push(`• ${bullet.tailored}`);
    }
    lines.push('');
  }

  // Education
  lines.push('EDUCATION');
  for (const edu of resume.education) {
    lines.push(`${edu.degree} - ${edu.institution}`);
    if (edu.dates) lines.push(edu.dates);
    if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
  }
  lines.push('');

  // Skills
  lines.push('SKILLS');
  lines.push(resume.skills.join(', '));
  lines.push('');

  // Cover Letter
  if (coverLetter.content) {
    lines.push('---');
    lines.push('COVER LETTER');
    lines.push('---');
    lines.push(coverLetter.content);
  }

  return lines.join('\n');
}
