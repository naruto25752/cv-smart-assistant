
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreCardProps {
  score: number;
  title: string;
  description: string;
}

const ScoreCard = ({ score, title, description }: ScoreCardProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    
    const interval = setInterval(() => {
      setAnimatedScore((prevScore) => {
        if (prevScore >= score) {
          clearInterval(interval);
          return score;
        }
        return prevScore + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  const getScoreColor = (value: number) => {
    if (value < 50) return "bg-red-500";
    if (value < 70) return "bg-yellow-500";
    if (value < 85) return "bg-green-500";
    return "bg-emerald-500";
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-36 w-36 mb-4">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getScoreColor(animatedScore).replace('bg-', 'text-')}
                strokeWidth="10"
                strokeDasharray={`${(animatedScore / 100) * 283} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                className="transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
              
              {/* Text in the middle */}
              <text
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="currentColor"
              >
                {animatedScore}%
              </text>
            </svg>
          </div>
          
          <div className="score-indicator w-full mt-2">
            <div 
              className={`${getScoreColor(animatedScore)}`}
              style={{ width: `${animatedScore}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            {animatedScore < 50 && "Needs significant improvement"}
            {animatedScore >= 50 && animatedScore < 70 && "Moderate ATS compatibility"}
            {animatedScore >= 70 && animatedScore < 85 && "Good ATS compatibility"}
            {animatedScore >= 85 && "Excellent ATS compatibility"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
