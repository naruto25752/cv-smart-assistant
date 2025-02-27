
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import UploadResume from "@/components/UploadResume";
import AnalysisResult from "@/components/AnalysisResult";
import { analyzeResumeText } from "@/lib/resumeAnalyzer";
import { AnalysisResult as AnalysisResultType } from "@/lib/openaiService";

const Analyzer = () => {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if resume text was passed from the builder
  useEffect(() => {
    if (location.state?.resumeText) {
      setResumeText(location.state.resumeText);
      setFileName("Generated Resume.txt");
      handleAnalyzeResume(location.state.resumeText);
    }
  }, [location.state]);

  const handleFileUpload = (text: string, name: string) => {
    setResumeText(text);
    setFileName(name);
    handleAnalyzeResume(text);
  };

  const handleAnalyzeResume = async (text: string) => {
    if (!text) return;
    
    try {
      setIsAnalyzing(true);
      
      toast({
        title: "Analyzing resume...",
        description: "Our AI is evaluating your resume for ATS compatibility.",
      });
      
      // In a real app, this would send the text to an OpenAI-powered API
      const result = await analyzeResumeText(text);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis complete",
        description: `Your resume received an ATS score of ${result.atsScore}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Button>

        <h1 className="text-3xl font-semibold mb-8 text-center">Resume Analyzer</h1>

        {!resumeText && !isAnalyzing && (
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-muted-foreground mb-8">
              Upload your resume to get detailed ATS analysis and improvement suggestions
            </p>
            <UploadResume onFileUpload={handleFileUpload} />
          </div>
        )}

        {isAnalyzing && (
          <Card className="max-w-xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Analyzing Your Resume</h3>
              <p className="text-muted-foreground text-center">
                Our AI is evaluating your resume against ATS criteria and industry standards...
              </p>
            </CardContent>
          </Card>
        )}

        {analysisResult && (
          <div className="space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium">{fileName}</h2>
                <p className="text-muted-foreground">
                  {resumeText?.length} characters • Analyzed {new Date().toLocaleDateString()}
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setResumeText(null);
                  setFileName(null);
                  setAnalysisResult(null);
                }}
              >
                Analyze Another Resume
              </Button>
            </div>
            
            <AnalysisResult analysis={analysisResult} />
            
            <Card className="max-w-4xl mx-auto">
              <CardContent className="py-6">
                <h3 className="text-lg font-medium mb-4">Resume Content</h3>
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-80">
                  <pre className="text-sm whitespace-pre-wrap">{resumeText}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
