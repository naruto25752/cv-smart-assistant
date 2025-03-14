
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-secondary p-6 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold">
              Resume<span className="font-light">AI</span>
            </h2>
          </div>
          
          <div>
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/sign-in')}
                  className="flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Sign In with GitHub
                </Button>
                <Button 
                  onClick={() => navigate('/sign-up')}
                  className="flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Sign Up with GitHub
                </Button>
              </div>
            </SignedOut>
          </div>
        </header>

        <div className="text-center mb-16 pt-12">
          <h1 className={`text-5xl font-light tracking-tight mb-4 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <span className="font-semibold">Resume</span>AI
          </h1>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Create, analyze and optimize your resume for ATS with the power of artificial intelligence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className={`border overflow-hidden hover:shadow-md transition-all duration-300 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>
                Create a professional resume with our AI-powered builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center bg-muted rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/builder')}>
                Create Resume
              </Button>
            </CardFooter>
          </Card>

          <Card className={`border overflow-hidden hover:shadow-md transition-all duration-300 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle>Resume Analyzer</CardTitle>
              <CardDescription>
                Get ATS score and detailed feedback on your existing resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center bg-muted rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <circle cx="10" cy="13" r="2" />
                  <path d="m22 19-8.5-8.5a4.8 4.8 0 0 0-6.5.5 4.8 4.8 0 0 0 .5 6.5L16 26" />
                </svg>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/analyzer')}>
                Analyze Resume
              </Button>
            </CardFooter>
          </Card>
        </div>

        <footer className="text-center mt-24 text-sm text-muted-foreground">
          <p>Powered by AI technology for optimal resume outcomes</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
