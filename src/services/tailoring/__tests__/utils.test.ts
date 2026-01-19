// ResuMatch v2 - Utils Tests
import { describe, it, expect } from 'vitest';
import {
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
} from '../utils';

describe('Similarity Functions', () => {
  describe('calculateWordSimilarity', () => {
    it('returns 1 for identical strings', () => {
      const similarity = calculateWordSimilarity(
        'Built scalable API endpoints',
        'Built scalable API endpoints'
      );
      expect(similarity).toBe(1);
    });

    it('returns high similarity for minor changes', () => {
      const similarity = calculateWordSimilarity(
        'Built scalable API endpoints',
        'Built scalable API endpoints (Python)'
      );
      expect(similarity).toBeGreaterThan(0.7);
    });

    it('returns low similarity for different content', () => {
      const similarity = calculateWordSimilarity(
        'Built scalable API endpoints',
        'Managed cross-functional team of engineers'
      );
      expect(similarity).toBeLessThan(0.3);
    });

    it('handles empty strings', () => {
      expect(calculateWordSimilarity('', '')).toBe(1);
      expect(calculateWordSimilarity('test', '')).toBe(0);
    });
  });

  describe('calculateCharSimilarity', () => {
    it('returns 1 for identical strings', () => {
      const similarity = calculateCharSimilarity(
        'Built API',
        'Built API'
      );
      expect(similarity).toBe(1);
    });

    it('returns high similarity for small edits', () => {
      const similarity = calculateCharSimilarity(
        'Built API',
        'Built APIs'
      );
      expect(similarity).toBeGreaterThanOrEqual(0.9);
    });
  });

  describe('calculateCombinedSimilarity', () => {
    it('returns high similarity for keyword additions', () => {
      const similarity = calculateCombinedSimilarity(
        'Built scalable API endpoints for user authentication',
        'Built scalable API endpoints for user authentication (Python, REST)'
      );
      expect(similarity).toBeGreaterThan(0.85);
    });
  });

  describe('findBestMatch', () => {
    it('finds the most similar bullet', () => {
      const bullets = [
        'Led team of 5 engineers',
        'Built API endpoints using Python',
        'Reduced page load time by 40%',
      ];

      const result = findBestMatch('Built API endpoints (Python, REST)', bullets);
      expect(result.bullet).toBe('Built API endpoints using Python');
      expect(result.similarity).toBeGreaterThan(0.6);
    });
  });
});

describe('Metrics Extraction', () => {
  describe('extractMetrics', () => {
    it('extracts percentages', () => {
      const metrics = extractMetrics('Improved performance by 25% and reduced costs by 30%');
      expect(metrics).toContain('25%');
      expect(metrics).toContain('30%');
    });

    it('extracts dollar amounts', () => {
      const metrics = extractMetrics('Saved $1.5M annually through optimization');
      expect(metrics.some(m => m.includes('$1.5m') || m.includes('$1.5M'))).toBe(true);
    });

    it('extracts numbers with context', () => {
      const metrics = extractMetrics('Managed team of 15 engineers serving 10000 users');
      expect(metrics.some(m => m.includes('15'))).toBe(true);
      expect(metrics.some(m => m.includes('10000') || m.includes('10,000'))).toBe(true);
    });

    it('extracts time-based metrics', () => {
      const metrics = extractMetrics('5 years of experience in 3 months');
      expect(metrics.some(m => m.includes('5 years') || m.includes('5years'))).toBe(true);
    });

    it('extracts multipliers', () => {
      const metrics = extractMetrics('Achieved 3x improvement in throughput');
      expect(metrics.some(m => m.includes('3x'))).toBe(true);
    });
  });

  describe('validateMetrics', () => {
    it('passes when all metrics exist in original', () => {
      const original = 'Reduced costs by 25% and improved speed by 40%';
      const output = 'Reduced costs by 25% (Python)';

      const result = validateMetrics(original, output);
      expect(result.valid).toBe(true);
      expect(result.newMetrics).toHaveLength(0);
    });

    it('fails when new metrics are introduced', () => {
      const original = 'Reduced costs by 25%';
      const output = 'Reduced costs by 50%';

      const result = validateMetrics(original, output);
      expect(result.valid).toBe(false);
      expect(result.newMetrics.length).toBeGreaterThan(0);
    });
  });
});

describe('Technology Extraction', () => {
  describe('extractTechnologies', () => {
    it('extracts programming languages', () => {
      const tech = extractTechnologies('Built with Python and JavaScript');
      expect(tech).toContain('python');
      expect(tech).toContain('javascript');
    });

    it('extracts cloud platforms', () => {
      const tech = extractTechnologies('Deployed on AWS using Docker and Kubernetes');
      expect(tech).toContain('aws');
      expect(tech).toContain('docker');
      expect(tech).toContain('kubernetes');
    });

    it('extracts databases', () => {
      const tech = extractTechnologies('Used PostgreSQL and Redis for data storage');
      expect(tech).toContain('postgresql');
      expect(tech).toContain('redis');
    });
  });

  describe('validateTechnologies', () => {
    it('passes when all tech exists in original', () => {
      const original = 'Experience with Python, AWS, and Docker';
      const output = 'Built system (Python, AWS)';

      const result = validateTechnologies(original, output);
      expect(result.valid).toBe(true);
    });

    it('fails when new tech is introduced', () => {
      const original = 'Experience with Python';
      const output = 'Built system (Python, Java)';

      const result = validateTechnologies(original, output);
      expect(result.valid).toBe(false);
      expect(result.newTechnologies).toContain('java');
    });
  });
});

describe('Writing Style Analysis', () => {
  describe('analyzeWritingStyle', () => {
    it('detects average sentence length', () => {
      const bullets = [
        'Built API', // 2 words
        'Led team of five engineers', // 5 words
        'Reduced costs by implementing automation', // 5 words
      ];
      const style = analyzeWritingStyle(bullets, bullets.join(' '));
      expect(style.avgSentenceLength).toBeGreaterThan(0);
    });

    it('detects contractions', () => {
      const withContractions = analyzeWritingStyle([], "I'm experienced and can't wait");
      expect(withContractions.usesContractions).toBe(true);

      const without = analyzeWritingStyle([], 'I am experienced and cannot wait');
      expect(without.usesContractions).toBe(false);
    });

    it('extracts action verbs', () => {
      const bullets = ['Built APIs', 'Led teams', 'Managed projects'];
      const style = analyzeWritingStyle(bullets, bullets.join(' '));
      expect(style.actionVerbs).toContain('Built');
      expect(style.actionVerbs).toContain('Led');
      expect(style.actionVerbs).toContain('Managed');
    });
  });
});

describe('Normalization Functions', () => {
  describe('normalizeBullet', () => {
    it('removes bullet characters', () => {
      expect(normalizeBullet('• Built API')).toBe('Built API');
      expect(normalizeBullet('- Built API')).toBe('Built API');
      expect(normalizeBullet('* Built API')).toBe('Built API');
    });

    it('normalizes whitespace', () => {
      expect(normalizeBullet('  Built   API  ')).toBe('Built API');
    });
  });

  describe('normalizeDate', () => {
    it('normalizes date separators', () => {
      const result = normalizeDate('Jan 2020 – Present');
      expect(result).toContain('-');
    });
  });
});
