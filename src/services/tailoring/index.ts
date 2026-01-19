// ResuMatch v2 - Main Export
// Clean public API for the resume tailoring system

export { tailorResume, checkApiConfiguration, formatAsPlainText } from './orchestrator';
export { parseResume, validateParsedResume } from './parser';
export { analyzeJobDescription, getAllKeywords, getKeywordPriority } from './jdAnalyzer';
export { matchBulletsToJD, selectTopBullets, groupMatchesByExperience } from './matcher';
export { formatBullet, formatBullets, addKeywordsSimple } from './formatter';
export { generateCoverLetter } from './coverLetter';
export {
  calculateWordSimilarity,
  calculateCharSimilarity,
  calculateCombinedSimilarity,
  extractMetrics,
  validateMetrics,
  extractTechnologies,
  validateTechnologies,
  analyzeWritingStyle,
  normalizeBullet,
  normalizeDate,
  findBestMatch,
} from './utils';

// Type exports
export type {
  ParsedResume,
  Experience,
  Education,
  Project,
  JDAnalysis,
  Skill,
  MatchResult,
  TailoredBullet,
  TailoredExperience,
  TailoredResume,
  CoverLetter,
  WritingStyle,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  TailoringResult,
  TailoringOptions,
} from './types';
