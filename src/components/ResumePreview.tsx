
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResumeData {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  work: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    highlights: string;
  }>;
  skills: Array<{
    name: string;
    level?: string;
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
  }>;
}

interface ResumePreviewProps {
  data: ResumeData;
  onAnalyze?: () => void;
}

const ResumePreview = ({ data, onAnalyze }: ResumePreviewProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Card className={`resume-preview animate-scale ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{data.basics.name}</h1>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-muted-foreground">
            <span>{data.basics.email}</span>
            <span>•</span>
            <span>{data.basics.phone}</span>
            <span>•</span>
            <span>{data.basics.location}</span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="resume-section">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm">{data.basics.summary}</p>
        </div>

        {/* Experience Section */}
        <div className="resume-section">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {data.work.map((work, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{work.position}</h3>
                  <span className="text-sm text-muted-foreground">
                    {work.startDate} - {work.endDate || "Present"}
                  </span>
                </div>
                <div className="text-sm">{work.company}</div>
                <div className="text-sm space-y-1 mt-2">
                  {work.highlights.split("\n").map((highlight, i) => (
                    <p key={i}>{highlight}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="resume-section">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{edu.institution}</h3>
                  <span className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <div className="text-sm">
                  {edu.studyType} in {edu.area}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="resume-section">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-md"
              >
                {skill.name} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </div>
      </div>

      {onAnalyze && (
        <div className="mt-8 text-center">
          <Button onClick={onAnalyze}>
            Analyze Resume
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ResumePreview;
