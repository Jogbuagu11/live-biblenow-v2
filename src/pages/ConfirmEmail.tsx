
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const ConfirmEmail = () => {
  const navigate = useNavigate();
  
  // Get redirectTo from localStorage if it exists
  useEffect(() => {
    const handleConfirmation = () => {
      // Code to simulate email confirmation - in a real app this would verify the token
      console.log('Email confirmed');
      
      // After email confirmation, redirect to setup-2fa with the redirectTo parameter
      const redirectTo = localStorage.getItem('redirectTo');
      if (redirectTo) {
        navigate(`/setup-2fa?redirectTo=${encodeURIComponent(redirectTo)}`);
      } else {
        navigate('/setup-2fa');
      }
    };

    // Simulate email confirmation button click for demo
    const confirmButton = document.querySelector('button.text-primary');
    if (confirmButton) {
      confirmButton.addEventListener('click', handleConfirmation);
    }

    return () => {
      if (confirmButton) {
        confirmButton.removeEventListener('click', handleConfirmation);
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <Logo size="lg" className="mb-10" />
      
      <div className="bg-card rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center bg-accent/20 w-20 h-20 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">Check Your Email</h1>
        <p className="text-muted-foreground mb-8">
          We've sent a confirmation link to your email address. Please check your inbox and click the link to confirm your account.
        </p>
        
        <div className="mt-6">
          <button className="text-primary underline">
            Didn't receive an email? Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
