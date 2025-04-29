
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

const Setup2FA = () => {
  const navigate = useNavigate();

  const handleSetup2FA = () => {
    // In a real app, this would trigger 2FA setup flow
    navigate('/profile-setup');
  };

  const handleSkip = () => {
    navigate('/profile-setup');
  };

  return (
    <div className="min-h-screen bg-biblebeige p-6 flex flex-col items-center justify-center">
      <Logo size="lg" className="mb-10" />
      
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center bg-biblegold/20 w-20 h-20 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-biblegold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-biblebrown mb-4">Secure Your Account</h1>
        <p className="text-gray-600 mb-8">
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
