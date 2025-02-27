
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface UploadResumeProps {
  onFileUpload: (text: string, fileName: string) => void;
}

const UploadResume = ({ onFileUpload }: UploadResumeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setIsLoading(true);
    
    // Check if file is PDF, DOCX, or TXT
    const fileType = file.type;
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (!validTypes.includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    setFileName(file.name);
    
    // For simplicity, we'll just handle TXT files directly
    // In a real app, you'd use specialized libraries to parse PDF and DOCX
    if (fileType === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileUpload(text, file.name);
        setIsLoading(false);
      };
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "There was an error reading the file. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      reader.readAsText(file);
    } else {
      // Simulate a delay for PDF/DOCX "processing"
      setTimeout(() => {
        // For demo purposes, we'll just extract the filename and create a placeholder text
        const placeholderText = `This is placeholder text for ${file.name}. In a real application, we would extract text from the PDF or DOCX file.`;
        onFileUpload(placeholderText, file.name);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <Card className={`${isDragging ? 'border-primary' : 'border-dashed'} transition-all`}>
        <CardContent>
          <div 
            className="min-h-64 flex flex-col items-center justify-center text-center p-8 cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            {isLoading ? (
              <div className="space-y-4">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-muted-foreground">Processing {fileName}...</p>
              </div>
            ) : (
              <>
                <div className="h-16 w-16 mb-4 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Upload your resume</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your resume file here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOCX, and TXT files
                </p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadResume;
