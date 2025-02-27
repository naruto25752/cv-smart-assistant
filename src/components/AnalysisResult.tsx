
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScoreCard from "./ScoreCard";

interface AnalysisResultProps {
  analysis: {
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
  };
}

const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="w-full space-y-6">
      <h2 className={`text-2xl font-semibold mb-6 text-center transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Resume Analysis Results
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard 
          score={analysis.atsScore} 
          title="Overall ATS Score" 
          description="How well your resume will perform with ATS systems"
        />
        <ScoreCard 
          score={analysis.keywordMatch} 
          title="Keyword Match" 
          description="Relevance to job requirements"
        />
        <ScoreCard 
          score={analysis.readability} 
          title="Readability" 
          description="Clarity and ease of understanding"
        />
        <ScoreCard 
          score={analysis.formatScore} 
          title="Format Score" 
          description="Structure and organization"
        />
      </div>
      
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Card className="analysis-card">
          <CardHeader>
            <CardTitle className="text-lg">Key Strengths</CardTitle>
            <CardDescription>Positive aspects of your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              {analysis.feedback.strengths.map((strength, index) => (
                <li key={index} className="text-sm">{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="analysis-card">
          <CardHeader>
            <CardTitle className="text-lg">Areas for Improvement</CardTitle>
            <CardDescription>Issues that may impact ATS performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              {analysis.feedback.weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm">{weakness}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className={`analysis-card transition-all duration-500 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <CardHeader>
          <CardTitle className="text-lg">Recommended Improvements</CardTitle>
          <CardDescription>Actionable suggestions to enhance your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 list-disc pl-5">
            {analysis.feedback.improvements.map((improvement, index) => (
              <li key={index} className="text-sm">{improvement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Card className="analysis-card">
          <CardHeader>
            <CardTitle className="text-lg">Keywords Found</CardTitle>
            <CardDescription>Relevant keywords detected in your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.found.length > 0 ? (
                analysis.keywords.found.map((keyword, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-md">
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No relevant keywords found</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="analysis-card">
          <CardHeader>
            <CardTitle className="text-lg">Missing Keywords</CardTitle>
            <CardDescription>Suggested keywords to include</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.missing.length > 0 ? (
                analysis.keywords.missing.map((keyword, index) => (
                  <span key={index} className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-md">
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No missing keywords identified</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisResult;
