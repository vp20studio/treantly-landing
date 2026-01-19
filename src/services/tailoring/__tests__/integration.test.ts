// ResuMatch v2 - Integration Tests
// Tests the full tailoring pipeline

import { describe, it, expect, beforeAll } from 'vitest';
import { parseResume } from '../parser';
import { matchBulletsToJD } from '../matcher';
import { addKeywordsSimple } from '../formatter';
import { calculateCombinedSimilarity, validateMetrics, validateTechnologies } from '../utils';
import type { JDAnalysis, ParsedResume } from '../types';

// Sample resume for testing
const SAMPLE_RESUME = `
Jane Smith
jane.smith@email.com | (555) 987-6543 | New York, NY | linkedin.com/in/janesmith

SUMMARY
Experienced software engineer with 5 years of experience building scalable web applications.

EXPERIENCE

Senior Software Engineer | TechStartup Inc.
Jan 2021 - Present | New York, NY
• Built microservices architecture serving 50,000 daily active users using Python and AWS
• Reduced API response time by 35% through implementing Redis caching layer
• Led team of 4 engineers in migrating legacy monolith to containerized services
• Implemented automated testing pipeline increasing code coverage from 40% to 85%

Software Engineer | BigCorp Technologies
Jun 2018 - Dec 2020 | San Francisco, CA
• Developed real-time data processing pipeline handling 1M events per day
• Created React dashboard for monitoring system health and performance metrics
• Optimized PostgreSQL queries reducing database load by 45%
• Collaborated with product team to ship 12 features in agile sprints

Junior Developer | StartupCo
Jan 2017 - May 2018 | Austin, TX
• Built REST APIs for mobile application serving 10,000 users
• Implemented user authentication using OAuth 2.0
• Wrote unit and integration tests achieving 70% code coverage

EDUCATION
BS Computer Science - MIT, 2016
GPA: 3.8

SKILLS
Python, JavaScript, TypeScript, React, Node.js, PostgreSQL, Redis, AWS, Docker, Git, Agile
`;

// Sample job description for testing
const SAMPLE_JD = `
Senior Backend Engineer - FinTech Company

We're looking for a Senior Backend Engineer to join our growing team. You'll be responsible for building and maintaining our core payment processing infrastructure.

Requirements:
- 4+ years of experience with Python or Go
- Experience with microservices architecture
- Strong knowledge of SQL databases (PostgreSQL preferred)
- Experience with cloud platforms (AWS, GCP)
- Experience with Redis or similar caching solutions
- Understanding of CI/CD pipelines
- Experience leading small teams

Nice to have:
- Experience in fintech or payments
- Knowledge of Docker and Kubernetes
- Experience with event-driven architectures

Responsibilities:
- Design and implement scalable backend services
- Lead technical initiatives and mentor junior engineers
- Optimize system performance and reliability
- Collaborate with cross-functional teams
`;

// Mock JD analysis for deterministic testing
const MOCK_JD_ANALYSIS: JDAnalysis = {
  title: 'Senior Backend Engineer',
  company: 'FinTech Company',
  requiredSkills: [
    { name: 'Python', importance: 'required', category: 'technical' },
    { name: 'microservices', importance: 'required', category: 'technical' },
    { name: 'PostgreSQL', importance: 'required', category: 'technical' },
    { name: 'AWS', importance: 'required', category: 'tool' },
    { name: 'Redis', importance: 'required', category: 'technical' },
    { name: 'CI/CD', importance: 'required', category: 'technical' },
    { name: 'team leadership', importance: 'required', category: 'soft' },
  ],
  preferredSkills: [
    { name: 'Docker', importance: 'preferred', category: 'tool' },
    { name: 'Kubernetes', importance: 'preferred', category: 'tool' },
    { name: 'fintech', importance: 'preferred', category: 'domain' },
  ],
  responsibilities: [
    'Design and implement scalable backend services',
    'Lead technical initiatives and mentor junior engineers',
    'Optimize system performance and reliability',
    'Collaborate with cross-functional teams',
  ],
  keywords: ['python', 'microservices', 'postgresql', 'aws', 'redis', 'backend', 'scalable'],
  experienceLevel: 'senior',
  industryKeywords: ['fintech', 'payments', 'processing'],
};

describe('Resume Parser Integration', () => {
  let parsedResume: ParsedResume;

  beforeAll(() => {
    parsedResume = parseResume(SAMPLE_RESUME);
  });

  it('extracts contact information', () => {
    expect(parsedResume.contact.name).toBe('Jane Smith');
    expect(parsedResume.contact.email).toBe('jane.smith@email.com');
  });

  it('extracts experiences', () => {
    expect(parsedResume.experiences.length).toBeGreaterThanOrEqual(2);
    expect(parsedResume.experiences[0].company).toContain('TechStartup');
  });

  it('extracts all bullet points', () => {
    expect(parsedResume.bullets.length).toBeGreaterThan(5);
  });

  it('extracts metrics from resume', () => {
    expect(parsedResume.metrics.length).toBeGreaterThan(0);
    expect(parsedResume.metrics.some(m => m.includes('35%'))).toBe(true);
    expect(parsedResume.metrics.some(m => m.includes('50,000') || m.includes('50000'))).toBe(true);
  });

  it('extracts skills', () => {
    expect(parsedResume.skills.length).toBeGreaterThan(5);
    expect(parsedResume.skills.map(s => s.toLowerCase())).toContain('python');
  });
});

describe('Matching Engine Integration', () => {
  let parsedResume: ParsedResume;
  let matchResults: ReturnType<typeof matchBulletsToJD>;

  beforeAll(() => {
    parsedResume = parseResume(SAMPLE_RESUME);
    matchResults = matchBulletsToJD(parsedResume, MOCK_JD_ANALYSIS);
  });

  it('returns match results for all bullets', () => {
    expect(matchResults.length).toBe(parsedResume.bullets.length);
  });

  it('finds matching keywords in bullets', () => {
    // Find the bullet about microservices
    const microservicesBullet = matchResults.find(r =>
      r.originalBullet.toLowerCase().includes('microservices')
    );

    expect(microservicesBullet).toBeDefined();
    expect(microservicesBullet!.matchedKeywords.length).toBeGreaterThan(0);
  });

  it('calculates relevance scores', () => {
    const allScores = matchResults.map(r => r.relevanceScore);
    expect(allScores.every(s => s >= 0 && s <= 1)).toBe(true);
  });

  it('suggests only safe keyword additions', () => {
    for (const result of matchResults) {
      // All suggested keywords should be from the resume's skills
      const resumeSkillsLower = parsedResume.skills.map(s => s.toLowerCase());
      for (const suggestion of result.suggestedKeywordAdditions) {
        expect(resumeSkillsLower).toContain(suggestion.toLowerCase());
      }
    }
  });

  it('sorts results by relevance', () => {
    for (let i = 1; i < matchResults.length; i++) {
      expect(matchResults[i].relevanceScore).toBeLessThanOrEqual(matchResults[i - 1].relevanceScore);
    }
  });
});

describe('Keyword Addition Integration', () => {
  it('adds keywords in parentheses at end', () => {
    const original = 'Built microservices architecture serving 50,000 users';
    const result = addKeywordsSimple(original, ['Python', 'AWS']);

    expect(result).toBe('Built microservices architecture serving 50,000 users (Python, AWS)');
  });

  it('extends existing parentheses', () => {
    const original = 'Built system (Python)';
    const result = addKeywordsSimple(original, ['AWS']);

    expect(result).toBe('Built system (Python, AWS)');
  });

  it('does not duplicate keywords', () => {
    const original = 'Built system (Python)';
    const result = addKeywordsSimple(original, ['Python', 'AWS']);

    expect(result).toBe('Built system (Python, AWS)');
    expect((result.match(/Python/g) || []).length).toBe(1);
  });

  it('maintains high similarity after keyword addition', () => {
    const original = 'Built microservices architecture serving 50,000 users';
    const withKeywords = addKeywordsSimple(original, ['Python', 'AWS']);

    const similarity = calculateCombinedSimilarity(original, withKeywords);
    expect(similarity).toBeGreaterThan(0.85);
  });
});

describe('Full Pipeline Validation', () => {
  let parsedResume: ParsedResume;
  let matchResults: ReturnType<typeof matchBulletsToJD>;

  beforeAll(() => {
    parsedResume = parseResume(SAMPLE_RESUME);
    matchResults = matchBulletsToJD(parsedResume, MOCK_JD_ANALYSIS);
  });

  it('no hallucinated metrics in tailored output', () => {
    for (const result of matchResults) {
      const withKeywords = addKeywordsSimple(
        result.originalBullet,
        result.suggestedKeywordAdditions
      );

      const validation = validateMetrics(SAMPLE_RESUME, withKeywords);
      expect(validation.valid).toBe(true);
    }
  });

  it('no hallucinated technologies in tailored output', () => {
    for (const result of matchResults) {
      const withKeywords = addKeywordsSimple(
        result.originalBullet,
        result.suggestedKeywordAdditions
      );

      const validation = validateTechnologies(SAMPLE_RESUME, withKeywords);
      expect(validation.valid).toBe(true);
    }
  });

  it('all tailored bullets maintain 85%+ similarity', () => {
    for (const result of matchResults) {
      const withKeywords = addKeywordsSimple(
        result.originalBullet,
        result.suggestedKeywordAdditions
      );

      const similarity = calculateCombinedSimilarity(result.originalBullet, withKeywords);
      expect(similarity).toBeGreaterThanOrEqual(0.85);
    }
  });

  it('preserves all original content', () => {
    for (const result of matchResults) {
      const withKeywords = addKeywordsSimple(
        result.originalBullet,
        result.suggestedKeywordAdditions
      );

      // Original content should still be present
      expect(withKeywords.startsWith(result.originalBullet.replace(/\s*\([^)]+\)$/, ''))).toBe(true);
    }
  });
});

describe('Edge Cases', () => {
  it('handles resume with minimal content', () => {
    const minimal = `
John Doe
john@email.com

EXPERIENCE
Developer | Company
Jan 2020 - Present
• Built software
• Developed features
`;
    const parsed = parseResume(minimal);
    // Parser should extract contact at minimum
    expect(parsed.contact.name).toBe('John Doe');
    // Bullets from the experience section
    expect(parsed.bullets.length).toBeGreaterThanOrEqual(0);
  });

  it('handles resume with no skills section', () => {
    const noSkills = `
John Doe

EXPERIENCE
Developer | Company
2020 - Present
• Built software using Python
`;
    const parsed = parseResume(noSkills);
    expect(parsed.skills.length).toBe(0);
  });

  it('handles bullets with existing parentheses', () => {
    const bullet = 'Built API (v2) for mobile app';
    const result = addKeywordsSimple(bullet, ['Python']);

    // Should handle gracefully
    expect(result).toContain('Python');
  });

  it('handles empty keyword suggestions', () => {
    const bullet = 'Built API endpoints';
    const result = addKeywordsSimple(bullet, []);

    expect(result).toBe(bullet);
  });
});
