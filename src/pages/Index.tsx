// YaRa Tourism Safety Dashboard - Main Index Page
// This page is now handled by the authentication flow in App.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main app flow (handled by App.tsx)
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">YaRa Dashboard</h1>
        <p className="text-xl text-muted-foreground">Loading Tourism Safety System...</p>
      </div>
    </div>
  );
};

export default Index;
