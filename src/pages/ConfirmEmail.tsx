
import React from 'react';
import Logo from '../components/Logo';

const ConfirmEmail = () => {
  return (
    <div className="min-h-screen bg-biblebeige p-6 flex flex-col items-center justify-center">
      <Logo size="lg" className="mb-10" />
      
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center bg-biblegold/20 w-20 h-20 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-biblegold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-biblebrown mb-4">Check Your Email</h1>
        <p className="text-gray-600 mb-8">
          We've sent a confirmation link to your email address. Please check your inbox and click the link to confirm your account.
        </p>
        
        <div className="mt-6">
          <button className="text-biblebrown underline">
            Didn't receive an email? Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
