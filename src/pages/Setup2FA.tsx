
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

const Setup2FA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    // First check if redirectTo is in URL params
    const queryParams = new URLSearchParams(location.search);
    const redirectParam = queryParams.get('redirectTo');
    
    // If not in URL, check localStorage (could have been set during signup)
    const storedRedirect = localStorage.getItem('redirectTo');
    
    if (redirectParam) {
      setRedirectTo(redirectParam);
    } else if (storedRedirect) {
      setRedirectTo(storedRedirect);
    }
  }, [location.search]);

  const handleSetup2FA = () => {
    // Pass the redirectTo param to the next step
    if (redirectTo) {
      navigate(`/profile-setup?redirectTo=${encodeURIComponent(redirectTo)}`);
    } else {
      navigate('/profile-setup');
    }
  };

  const handleSkip = () => {
    // If skipping 2FA, handle the redirect here
    if (redirectTo) {
      navigate(`/profile-setup?redirectTo=${encodeURIComponent(redirectTo)}`);
    } else {
      navigate('/profile-setup');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <Logo size="lg" className="mb-10" />
      
      <div className="bg-card rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center bg-accent/20 w-20 h-20 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">Secure Your Account</h1>
        <p className="text-muted-foreground mb-8">
          Enable two-factor authentication for an extra layer of security. This will protect your account even if your password is compromised.
        </p>
        
        <Button onClick={handleSetup2FA} fullWidth className="mb-4">
          Setup Two-Factor Authentication
        </Button>
        
        <Button onClick={handleSkip} variant="outline" fullWidth>
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default Setup2FA;
