
import { analyzeResume, AnalysisResult } from "./openaiService";

/**
 * Extracts plain text from a resume (mock function)
 * In a real app, you would use libraries like pdf.js, mammoth, etc.
 */
export async function extractTextFromResume(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        if (typeof e.target?.result === 'string') {
          resolve(e.target.result);
        } else {
          reject(new Error("Failed to read file as text"));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Analyzes a resume using the OpenAI service
 */
export async function analyzeResumeText(text: string): Promise<AnalysisResult> {
  try {
    return await analyzeResume(text);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume");
  }
}

/**
 * Extracts key sections from a resume text
 * This is a simple implementation - in a real app, you would use 
 * more sophisticated parsing or AI-based extraction
 */
export function extractResumeStructure(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  // Look for common section headers
  const sectionHeaders = [
    "SUMMARY", "PROFILE", "OBJECTIVE", 
    "EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT", 
    "EDUCATION", "ACADEMIC BACKGROUND",
    "SKILLS", "TECHNICAL SKILLS", "COMPETENCIES",
    "PROJECTS", "CERTIFICATIONS", "AWARDS", "REFERENCES"
  ];
  
  // Simple regex-based extraction
  const lines = text.split('\n');
  let currentSection = "OTHER";
  sections[currentSection] = "";
  
  for (const line of lines) {
    const upperLine = line.trim().toUpperCase();
    
    // Check if this line is a section header
    const matchedHeader = sectionHeaders.find(header => 
      upperLine === header || 
      upperLine === `${header}:` ||
      upperLine === `## ${header}` ||
      upperLine === `### ${header}`
    );
    
    if (matchedHeader) {
      currentSection = matchedHeader;
      sections[currentSection] = "";
    } else if (line.trim()) {
      sections[currentSection] += line + '\n';
    }
  }
  
  return sections;
}

/**
 * Evaluates keyword relevance given a job description (mock function)
 * In a real app, this would use AI to compare the resume to the job description
 */
export function evaluateKeywordRelevance(resumeText: string, jobDescription: string): {
  relevantKeywords: string[];
  missingKeywords: string[];
  score: number;
} {
  // This is a simplified implementation
  const keywords = [
    "javascript", "typescript", "react", "node.js", "html", "css",
    "python", "java", "c#", "cloud", "aws", "azure", "docker", "kubernetes",
    "agile", "scrum", "project management", "team lead", "fullstack",
    "frontend", "backend", "mobile", "database", "sql", "nosql", "mongodb"
  ];
  
  const lowerResume = resumeText.toLowerCase();
  const lowerJob = jobDescription.toLowerCase();
  
  // Find keywords in the job description
  const jobKeywords = keywords.filter(keyword => lowerJob.includes(keyword));
  
  // Find keywords in the resume
  const foundKeywords = jobKeywords.filter(keyword => lowerResume.includes(keyword));
  
  // Determine missing keywords
  const missingKeywords = jobKeywords.filter(keyword => !lowerResume.includes(keyword));
  
  // Calculate match score
  const matchScore = jobKeywords.length > 0 
    ? Math.round((foundKeywords.length / jobKeywords.length) * 100)
    : 50; // Default score if no keywords found in job description
  
  return {
    relevantKeywords: foundKeywords,
    missingKeywords,
    score: matchScore
  };
}
