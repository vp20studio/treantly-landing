// ResuMatch v2 - Type Definitions

export interface ParsedResume {
  rawText: string;
  contact: {
    name: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  summary?: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications?: string[];
  projects?: Project[];
  metrics: string[]; // All numbers/percentages extracted
  bullets: string[]; // All bullet points for analysis
}

export interface Experience {
  company: string;
  title: string;
  dates: string;
  location?: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  dates?: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description?: string;
  bullets: string[];
  technologies?: string[];
}

export interface JDAnalysis {
  title: string;
  company?: string;
  requiredSkills: Skill[];
  preferredSkills: Skill[];
  responsibilities: string[];
  keywords: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  industryKeywords: string[];
}

export interface Skill {
  name: string;
  importance: 'required' | 'preferred' | 'nice-to-have';
  category: 'technical' | 'soft' | 'domain' | 'tool';
}

export interface MatchResult {
  originalBullet: string;
  matchedKeywords: string[];
  relevanceScore: number; // 0-1
  suggestedKeywordAdditions: string[]; // Keywords to add in parentheses
}

export interface TailoredBullet {
  original: string;
  tailored: string;
  similarity: number;
  addedKeywords: string[];
  wasModified: boolean;
}

export interface TailoredExperience {
  company: string;
  title: string;
  dates: string;
  location?: string;
  bullets: TailoredBullet[];
}

export interface WritingStyle {
  avgSentenceLength: number;
  usesContractions: boolean;
  formalityLevel: 1 | 2 | 3 | 4 | 5;
  vocabularyLevel: 'simple' | 'moderate' | 'advanced';
  actionVerbs: string[];
  sentencePatterns: string[];
}

export interface CoverLetterConfig {
  maxWords: number;
  style: WritingStyle;
  templateSections: {
    opening: string;
    body: string;
    closing: string;
  };
}

export interface TailoredResume {
  contact: ParsedResume['contact'];
  summary?: string;
  experiences: TailoredExperience[];
  education: Education[];
  skills: string[];
  certifications?: string[];
}

export interface CoverLetter {
  content: string;
  wordCount: number;
  aiProbabilityEstimate: number; // Our internal estimate
  originalPhrases: string[]; // Phrases taken directly from resume
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'hallucinated_metric' | 'new_company' | 'new_tool' | 'low_similarity' | 'format_error';
  message: string;
  location?: string;
  originalValue?: string;
  outputValue?: string;
}

export interface ValidationWarning {
  type: 'high_modification' | 'keyword_density' | 'length_change';
  message: string;
  details?: string;
}

export interface TailoringResult {
  resume: TailoredResume;
  coverLetter: CoverLetter;
  validation: ValidationResult;
  jdAnalysis: JDAnalysis;
  processingTime: number;
}

export interface TailoringOptions {
  strictMode?: boolean; // Even stricter validation
  includeCoverLetter?: boolean;
  maxBulletModification?: number; // Default 0.15 (15% change allowed)
  fallbackToOriginal?: boolean; // Use original if can't tailor safely (default true)
}
