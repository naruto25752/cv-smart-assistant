
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

// Try to get the key, but provide a fallback for development
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder_for_development";

// A simple mock ClerkProvider to use during development when no key is available
const MockClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Determine if we have a real key
const hasRealKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                   !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes("placeholder");

// Choose the appropriate provider
const Provider = hasRealKey ? ClerkProvider : MockClerkProvider;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </Provider>
  </React.StrictMode>,
);
