// ResuMatch v2 - Resume Parser
// Extracts structured data from raw resume text

import type { ParsedResume, Experience, Education, Project } from './types';
import { extractMetrics, normalizeBullet, normalizeDate } from './utils';

/**
 * Parse raw resume text into structured format
 * This is a deterministic parser - no LLM calls
 */
export function parseResume(rawText: string): ParsedResume {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const contact = parseContact(lines);
  const sections = identifySections(lines);

  const experiences = parseExperiences(sections.experience || []);
  const education = parseEducation(sections.education || []);
  const skills = parseSkills(sections.skills || []);
  const projects = parseProjects(sections.projects || []);
  const certifications = parseCertifications(sections.certifications || []);
  const summary = sections.summary?.join(' ');

  // Extract all bullets for analysis
  const bullets = [
    ...experiences.flatMap(e => e.bullets),
    ...projects.flatMap(p => p.bullets),
  ];

  // Extract all metrics from the resume
  const metrics = extractMetrics(rawText);

  return {
    rawText,
    contact,
    summary,
    experiences,
    education,
    skills,
    certifications: certifications.length > 0 ? certifications : undefined,
    projects: projects.length > 0 ? projects : undefined,
    metrics,
    bullets,
  };
}

function parseContact(lines: string[]): ParsedResume['contact'] {
  // Usually the first few lines contain contact info
  const contactLines = lines.slice(0, 6);
  const contactText = contactLines.join(' ');

  // Name is typically the first line in larger/bold font (first non-empty line)
  const name = lines[0] || 'Unknown';

  // Email pattern
  const emailMatch = contactText.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const email = emailMatch?.[0];

  // Phone pattern
  const phoneMatch = contactText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch?.[0];

  // LinkedIn pattern
  const linkedinMatch = contactText.match(/linkedin\.com\/in\/[\w-]+/i);
  const linkedin = linkedinMatch?.[0];

  // Location pattern (City, State or City, Country)
  const locationMatch = contactText.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z]{2}|[A-Z][a-z]+)/);
  const location = locationMatch?.[0];

  return { name, email, phone, linkedin, location };
}

function identifySections(lines: string[]): Record<string, string[]> {
  const sections: Record<string, string[]> = {};
  let currentSection = 'header';
  let currentLines: string[] = [];

  const sectionHeaders: Record<string, string[]> = {
    experience: ['experience', 'work experience', 'professional experience', 'employment', 'work history'],
    education: ['education', 'academic background', 'academic history'],
    skills: ['skills', 'technical skills', 'core competencies', 'technologies', 'tools'],
    projects: ['projects', 'personal projects', 'side projects', 'portfolio'],
    certifications: ['certifications', 'certificates', 'licenses', 'credentials'],
    summary: ['summary', 'professional summary', 'objective', 'profile', 'about'],
  };

  for (const line of lines) {
    const lowerLine = line.toLowerCase().replace(/[:\s]+$/, '').trim();

    // Check if this line is a section header
    let foundSection: string | null = null;
    for (const [section, headers] of Object.entries(sectionHeaders)) {
      if (headers.includes(lowerLine) || headers.some(h => lowerLine.startsWith(h))) {
        foundSection = section;
        break;
      }
    }

    if (foundSection) {
      // Save previous section
      if (currentLines.length > 0) {
        sections[currentSection] = currentLines;
      }
      currentSection = foundSection;
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Save last section
  if (currentLines.length > 0) {
    sections[currentSection] = currentLines;
  }

  return sections;
}

function parseExperiences(lines: string[]): Experience[] {
  const experiences: Experience[] = [];
  let currentExp: Partial<Experience> | null = null;
  let currentBullets: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this looks like a job title/company line
    // Patterns: "Company - Title" or "Title at Company" or "Title | Company"
    const jobPattern = /^(.+?)\s*[-|@]\s*(.+)$/;
    const datePattern = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}\s*[-–]\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}|Present|Current)/i;

    // Check if line contains a date range (indicates new experience)
    const hasDate = datePattern.test(line);
    const nextLineHasDate = i + 1 < lines.length && datePattern.test(lines[i + 1]);

    if (hasDate || (jobPattern.test(line) && nextLineHasDate)) {
      // Save previous experience
      if (currentExp && currentExp.company && currentExp.title) {
        currentExp.bullets = currentBullets;
        experiences.push(currentExp as Experience);
      }

      // Extract date from this line or next
      const dateMatch = line.match(datePattern) || (lines[i + 1]?.match(datePattern));
      const dates = dateMatch ? normalizeDate(dateMatch[0]) : '';

      // Parse company and title
      const cleanedLine = line.replace(datePattern, '').trim();
      const parts = cleanedLine.split(/\s*[-|@,]\s*/);

      currentExp = {
        company: parts[0] || 'Unknown Company',
        title: parts[1] || parts[0] || 'Unknown Title',
        dates,
        bullets: [],
      };

      // If company and title are in wrong order, swap based on common patterns
      if (currentExp.title && /Inc\.|LLC|Corp\.|Company|Technologies|Solutions/i.test(currentExp.title)) {
        [currentExp.company, currentExp.title] = [currentExp.title, currentExp.company];
      }

      currentBullets = [];
    } else if (isBulletLine(line)) {
      // This is a bullet point
      currentBullets.push(normalizeBullet(line));
    }
  }

  // Save last experience
  if (currentExp && currentExp.company) {
    currentExp.bullets = currentBullets;
    experiences.push(currentExp as Experience);
  }

  return experiences;
}

function isBulletLine(line: string): boolean {
  // Check for common bullet patterns
  return /^[\s]*[•\-\*\u2022\u2023\u25E6\u2043\u2219]/.test(line) ||
    /^[A-Z][a-z]+ed\s/.test(line) || // Starts with past tense verb
    /^[A-Z][a-z]+ing\s/.test(line);  // Starts with present participle
}

function parseEducation(lines: string[]): Education[] {
  const education: Education[] = [];
  let currentEdu: Partial<Education> | null = null;

  for (const line of lines) {
    // Common degree patterns
    const degreePattern = /(?:Bachelor|Master|PhD|Ph\.D\.|Doctor|Associate|MBA|BS|BA|MS|MA|B\.S\.|B\.A\.|M\.S\.|M\.A\.)[^,]*/i;
    const degreeMatch = line.match(degreePattern);

    // Date pattern
    const datePattern = /\d{4}\s*[-–]\s*(?:\d{4}|Present|Expected)/;
    const dateMatch = line.match(datePattern);

    // GPA pattern
    const gpaPattern = /GPA[:\s]*(\d\.\d+)/i;
    const gpaMatch = line.match(gpaPattern);

    if (degreeMatch) {
      // Save previous education
      if (currentEdu && currentEdu.institution) {
        education.push(currentEdu as Education);
      }

      currentEdu = {
        degree: degreeMatch[0].trim(),
        institution: line.replace(degreeMatch[0], '').replace(dateMatch?.[0] || '', '').replace(/[,\s]+$/, '').trim() || 'Unknown Institution',
        dates: dateMatch?.[0],
        gpa: gpaMatch?.[1],
      };
    } else if (currentEdu && gpaMatch) {
      currentEdu.gpa = gpaMatch[1];
    }
  }

  // Save last education
  if (currentEdu && currentEdu.institution) {
    education.push(currentEdu as Education);
  }

  return education;
}

function parseSkills(lines: string[]): string[] {
  const skills: string[] = [];

  for (const line of lines) {
    // Skills are often comma or pipe separated
    const parts = line.split(/[,|•\u2022]/);

    for (const part of parts) {
      const cleaned = part.replace(/^[\s\-:]+/, '').trim();
      if (cleaned.length > 0 && cleaned.length < 50) {
        skills.push(cleaned);
      }
    }
  }

  return [...new Set(skills)];
}

function parseProjects(lines: string[]): Project[] {
  const projects: Project[] = [];
  let currentProject: Partial<Project> | null = null;
  let currentBullets: string[] = [];

  for (const line of lines) {
    if (!isBulletLine(line) && line.length > 0) {
      // This might be a project name
      if (currentProject && currentProject.name) {
        currentProject.bullets = currentBullets;
        projects.push(currentProject as Project);
      }

      currentProject = {
        name: line.split(/[-|]/)[0].trim(),
        description: '',
        bullets: [],
      };
      currentBullets = [];
    } else if (isBulletLine(line)) {
      currentBullets.push(normalizeBullet(line));
    }
  }

  // Save last project
  if (currentProject && currentProject.name) {
    currentProject.bullets = currentBullets;
    projects.push(currentProject as Project);
  }

  return projects;
}

function parseCertifications(lines: string[]): string[] {
  return lines
    .map(l => l.replace(/^[\s•\-\*]+/, '').trim())
    .filter(l => l.length > 0);
}

/**
 * Validate parsed resume has minimum required fields
 */
export function validateParsedResume(resume: ParsedResume): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!resume.contact.name || resume.contact.name === 'Unknown') {
    errors.push('Could not extract candidate name');
  }

  if (resume.experiences.length === 0) {
    errors.push('No work experience found');
  }

  if (resume.bullets.length === 0) {
    errors.push('No bullet points found in resume');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
