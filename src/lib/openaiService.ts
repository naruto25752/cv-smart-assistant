
// This is a mock service that would connect to OpenAI API in a real implementation
// In a production app, you would make API calls to OpenAI from a backend service

export interface AnalysisResult {
  atsScore: number;
  keywordMatch: number;
  readability: number;
  formatScore: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
  keywords: {
    found: string[];
    missing: string[];
  };
}

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Analyzes resume text using a simulated AI approach
 * In a real app, this would send the text to OpenAI API for analysis
 */
export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  // Simulate API call delay
  await delay(2000);
  
  // Calculate a pseudo "keyword score" based on the presence of certain keywords
  const keywordList = [
    "javascript", "react", "node", "typescript", "python", "java", "c#", 
    "software engineer", "developer", "frontend", "backend", "fullstack", 
    "web", "mobile", "app", "cloud", "aws", "azure", "devops", "agile", 
    "project management", "team lead", "architect", "machine learning", "ai"
  ];
  
  const lowerCaseResume = resumeText.toLowerCase();
  const foundKeywords = keywordList.filter(keyword => lowerCaseResume.includes(keyword));
  const keywordPercent = (foundKeywords.length / 10) * 100; // Assume 10 is max ideal keywords
  const keywordMatchScore = Math.min(Math.round(keywordPercent), 100);
  
  // Readability score simulation (based on sentence length, word complexity, etc)
  const sentences = resumeText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / sentences.length;
  const readabilityScore = Math.round(100 - Math.min(Math.abs(avgSentenceLength - 15) * 5, 50));
  
  // Format score simulation (based on sections, bullet points, etc)
  const hasBulletPoints = /•|\*|-/.test(resumeText);
  const hasMultipleSections = resumeText.split('\n\n').length > 3;
  const formatScore = Math.round((hasBulletPoints ? 40 : 0) + (hasMultipleSections ? 40 : 0) + 20); // 20 is base score
  
  // Calculate the overall ATS score as a weighted average
  const atsScore = Math.round(
    0.4 * keywordMatchScore + 
    0.3 * readabilityScore + 
    0.3 * formatScore
  );
  
  // Generate missing keywords (just pick some random ones the resume doesn't have)
  const missingKeywords = keywordList
    .filter(keyword => !lowerCaseResume.includes(keyword))
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 5); // Take 5 random ones
  
  // Create the analysis result
  return {
    atsScore,
    keywordMatch: keywordMatchScore,
    readability: readabilityScore,
    formatScore,
    feedback: {
      strengths: generateStrengths(atsScore, foundKeywords),
      weaknesses: generateWeaknesses(atsScore, keywordMatchScore, readabilityScore, formatScore),
      improvements: generateImprovements(keywordMatchScore, readabilityScore, formatScore, missingKeywords),
    },
    keywords: {
      found: foundKeywords,
      missing: missingKeywords,
    }
  };
}

// Helper functions to generate feedback

function generateStrengths(atsScore: number, foundKeywords: string[]): string[] {
  const strengths = [];
  
  if (atsScore > 70) {
    strengths.push("Your resume has good overall ATS compatibility.");
  }
  
  if (foundKeywords.length > 5) {
    strengths.push(`Strong keyword presence with ${foundKeywords.length} relevant industry terms.`);
  }
  
  if (foundKeywords.includes("javascript") && foundKeywords.includes("react")) {
    strengths.push("Good demonstration of frontend technology stack.");
  }
  
  if (foundKeywords.includes("node") || foundKeywords.includes("python")) {
    strengths.push("Backend technologies well represented.");
  }
  
  if (foundKeywords.includes("agile") || foundKeywords.includes("project management")) {
    strengths.push("Strong indication of process knowledge and project experience.");
  }
  
  // Add generic strengths if we don't have enough specific ones
  if (strengths.length < 3) {
    strengths.push("Resume has a clear structure that ATS systems can process.");
    strengths.push("Content appears to be relevant to the technology industry.");
    strengths.push("Length and depth of content is appropriate for ATS scanning.");
  }
  
  return strengths;
}

function generateWeaknesses(
  atsScore: number, 
  keywordMatchScore: number, 
  readabilityScore: number,
  formatScore: number
): string[] {
  const weaknesses = [];
  
  if (atsScore < 70) {
    weaknesses.push("Your resume may struggle to pass through some ATS systems.");
  }
  
  if (keywordMatchScore < 60) {
    weaknesses.push("Limited presence of industry-relevant keywords.");
  }
  
  if (readabilityScore < 65) {
    weaknesses.push("Sentence structure and complexity may reduce readability.");
  }
  
  if (formatScore < 70) {
    weaknesses.push("Resume format is not optimized for ATS scanning.");
  }
  
  // Add generic weaknesses if we don't have enough specific ones
  if (weaknesses.length < 2) {
    weaknesses.push("Could benefit from more specific achievements with measurable results.");
    weaknesses.push("Experience descriptions may lack sufficient detail for keyword matching.");
  }
  
  return weaknesses;
}

function generateImprovements(
  keywordMatchScore: number,
  readabilityScore: number,
  formatScore: number,
  missingKeywords: string[]
): string[] {
  const improvements = [];
  
  if (keywordMatchScore < 75) {
    improvements.push(`Add industry-specific keywords like: ${missingKeywords.slice(0, 3).join(", ")}.`);
  }
  
  if (readabilityScore < 70) {
    improvements.push("Use shorter, clearer sentences to improve readability.");
    improvements.push("Break down complex descriptions into bullet points.");
  }
  
  if (formatScore < 80) {
    improvements.push("Ensure distinct sections with clear headings for experience, education, and skills.");
    improvements.push("Use standard section titles that ATS systems can recognize.");
  }
  
  // Add more generic improvements
  improvements.push("Quantify achievements with specific metrics and results.");
  improvements.push("Tailor your resume keywords to match the job description.");
  improvements.push("Avoid complex tables, graphics, or unusual formatting that ATS might not process correctly.");
  
  return improvements;
}

/**
 * In a real application, this would be an actual call to OpenAI API
 * to generate a resume based on user input
 */
export async function generateResumeWithAI(userData: any): Promise<string> {
  // Simulate API call delay
  await delay(3000);
  
  // In a real app, this would make an API call to OpenAI
  // For now, we'll just return a template based on the user data
  return `
# ${userData.basics.name}
${userData.basics.email} | ${userData.basics.phone} | ${userData.basics.location}

## Professional Summary
${userData.basics.summary}

## Work Experience
${userData.work.map(w => `
### ${w.position} | ${w.company} | ${w.startDate} - ${w.endDate || 'Present'}
${w.highlights}
`).join('')}

## Education
${userData.education.map(e => `
### ${e.studyType} in ${e.area} | ${e.institution} | ${e.startDate} - ${e.endDate || 'Present'}
`).join('')}

## Skills
${userData.skills.map(s => `- ${s.name}${s.level ? ` (${s.level})` : ''}`).join('\n')}
  `;
}
