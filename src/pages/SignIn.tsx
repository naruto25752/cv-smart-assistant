
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

const SignIn = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-secondary p-6 flex items-center justify-center ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-light tracking-tight mb-4 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <span className="font-semibold">Resume</span>AI
          </h1>
          <p className={`text-lg text-muted-foreground ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Sign in to access your resume tools
          </p>
        </div>
        
        <Card className={`overflow-hidden border shadow-md ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-0">
            <ClerkSignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0",
                  headerTitle: "text-xl font-semibold",
                  headerSubtitle: "text-md text-muted-foreground",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                  formFieldInput: "rounded-md border border-input bg-background px-3 py-2",
                  footerAction: "text-primary hover:text-primary/90",
                }
              }}
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              redirectUrl="/"
            />
          </CardContent>
        </Card>
        
        <div className={`mt-8 text-center ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
