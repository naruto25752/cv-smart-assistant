
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { generateResumeWithAI } from "@/lib/openaiService";

const Builder = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedResume, setEnhancedResume] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: any) => {
    setResumeData(data);
    
    try {
      setIsLoading(true);
      toast({
        title: "Generating enhanced resume...",
        description: "Our AI is optimizing your resume for ATS compatibility.",
      });
      
      // In a real app, this would send the data to an API for AI processing
      const enhancedText = await generateResumeWithAI(data);
      setEnhancedResume(enhancedText);
      
      toast({
        title: "Resume created",
        description: "Your resume has been created and enhanced successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate enhanced resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = () => {
    if (resumeData) {
      navigate('/analyzer', { state: { resumeText: enhancedResume } });
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

        <h1 className="text-3xl font-semibold mb-8 text-center">Resume Builder</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Enter Your Information</h2>
              <ResumeForm onSubmit={handleFormSubmit} />
            </Card>
          </div>

          <div>
            {resumeData ? (
              <div className="sticky top-6 space-y-6">
                <h2 className="text-xl font-medium mb-4">Resume Preview</h2>
                <ResumePreview data={resumeData} onAnalyze={handleAnalyze} />
                
                {enhancedResume && (
                  <Card className="p-6">
                    <h3 className="text-lg font-medium mb-3">AI-Enhanced Version</h3>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md overflow-auto max-h-96">
                        {enhancedResume}
                      </pre>
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="p-6 bg-muted/50 h-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground mb-4">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
                  <p className="text-muted-foreground text-sm">
                    Fill out the form to generate your resume
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
