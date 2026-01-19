// ResuMatch v2 - Validation Tests
import { describe, it, expect } from 'vitest';
import { parseResume, validateParsedResume } from '../parser';
import {
  calculateCombinedSimilarity,
  validateMetrics,
  validateTechnologies,
} from '../utils';

describe('Anti-Hallucination Validation', () => {
  const sampleResume = `
John Doe
john@example.com | (555) 123-4567 | San Francisco, CA

EXPERIENCE

Software Engineer | TechCorp Inc.
Jan 2020 - Present
• Built scalable API endpoints serving 10,000 daily requests
• Reduced page load time by 40% through caching optimization
• Led team of 5 engineers in microservices migration

Senior Developer | StartupXYZ
Mar 2017 - Dec 2019
• Developed real-time analytics dashboard using Python and React
• Implemented CI/CD pipeline reducing deployment time by 60%
• Managed PostgreSQL database handling 1M+ records

EDUCATION
BS Computer Science - Stanford University, 2017

SKILLS
Python, JavaScript, React, PostgreSQL, AWS, Docker, Git
`;

  describe('Metric Hallucination Detection', () => {
    it('rejects output with fabricated percentages', () => {
      const original = 'Reduced page load time by 40% through caching';
      const hallucinated = 'Reduced page load time by 75% through caching';

      const validation = validateMetrics(sampleResume, hallucinated);
      expect(validation.valid).toBe(false);
    });

    it('rejects output with fabricated numbers', () => {
      const original = sampleResume;
      const hallucinated = 'Built scalable API endpoints serving 50,000 daily requests';

      const validation = validateMetrics(original, hallucinated);
      expect(validation.valid).toBe(false);
    });

    it('accepts output with original metrics', () => {
      const validation = validateMetrics(
        sampleResume,
        'Reduced page load time by 40%'
      );
      expect(validation.valid).toBe(true);
    });
  });

  describe('Technology Hallucination Detection', () => {
    it('rejects output with fabricated technologies', () => {
      const validation = validateTechnologies(
        sampleResume,
        'Built system using Java and Kubernetes'
      );
      expect(validation.valid).toBe(false);
      expect(validation.newTechnologies).toContain('java');
      expect(validation.newTechnologies).toContain('kubernetes');
    });

    it('accepts output with original technologies', () => {
      const validation = validateTechnologies(
        sampleResume,
        'Built system using Python and React'
      );
      expect(validation.valid).toBe(true);
    });
  });

  describe('Similarity Threshold (85%)', () => {
    it('accepts bullets with 85%+ similarity', () => {
      const original = 'Built scalable API endpoints serving 10,000 daily requests';
      const tailored = 'Built scalable API endpoints serving 10,000 daily requests (Python, REST)';

      const similarity = calculateCombinedSimilarity(original, tailored);
      expect(similarity).toBeGreaterThan(0.85);
    });

    it('flags bullets with low similarity', () => {
      const original = 'Built scalable API endpoints';
      const hallucinated = 'Architected enterprise-grade microservices infrastructure';

      const similarity = calculateCombinedSimilarity(original, hallucinated);
      expect(similarity).toBeLessThan(0.5);
    });

    it('handles keyword additions in parentheses', () => {
      const original = 'Developed real-time analytics dashboard';
      const withKeywords = 'Developed real-time analytics dashboard (Python, React)';

      const similarity = calculateCombinedSimilarity(original, withKeywords);
      expect(similarity).toBeGreaterThan(0.8);
    });
  });
});

describe('Resume Parser Validation', () => {
  it('validates resume has required fields', () => {
    const validResume = `
John Doe
john@example.com

EXPERIENCE
Software Engineer | Company
Jan 2020 - Present
• Built APIs
`;
    const parsed = parseResume(validResume);
    const validation = validateParsedResume(parsed);

    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it('fails when no experience found', () => {
    const noExperience = `
John Doe
john@example.com

SKILLS
Python, JavaScript
`;
    const parsed = parseResume(noExperience);
    const validation = validateParsedResume(parsed);

    expect(validation.valid).toBe(false);
    expect(validation.errors.some(e => e.includes('experience'))).toBe(true);
  });
});

describe('Action Verb Preservation', () => {
  it('detects action verb changes', () => {
    const original = 'Led team of engineers';
    const changed = 'Spearheaded team of engineers';

    // The words are different, so similarity should reflect that
    const similarity = calculateCombinedSimilarity(original, changed);
    expect(similarity).toBeLessThan(0.9); // Verb change should lower similarity
  });

  it('preserves action verbs in valid tailoring', () => {
    const original = 'Built API endpoints';
    const tailored = 'Built API endpoints (Python)';

    const similarity = calculateCombinedSimilarity(original, tailored);
    expect(similarity).toBeGreaterThan(0.9); // Same verb, just added keyword
  });
});

describe('Company/Title Validation', () => {
  const resumeText = `
John Doe

EXPERIENCE
Software Engineer | TechCorp Inc.
Jan 2020 - Present
• Built APIs

Data Analyst | DataCo
Jan 2018 - Dec 2019
• Analyzed data
`;

  it('extracts companies correctly', () => {
    const parsed = parseResume(resumeText);
    const companies = parsed.experiences.map(e => e.company.toLowerCase());

    expect(companies).toContain('techcorp inc.');
  });
});
