
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useIsMobile } from '../hooks/use-mobile';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For UI only, navigate to confirm email page after signup or home after login
    if (activeTab === 'signup') {
      navigate('/confirm-email');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-biblebeige flex flex-col p-4">
      <div className="mx-auto mb-4 mt-4">
        <Logo size={isMobile ? "md" : "lg"} />
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm flex-1 max-w-md w-full mx-auto">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-biblebrown text-biblebrown'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'signup'
                ? 'border-b-2 border-biblebrown text-biblebrown'
                : 'text-gray-500'
            }`}
          >
            Signup
          </button>
        </div>
        
        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {activeTab === 'login' ? (
            <>
              <FormField 
                label="Email" 
                type="email" 
                id="login-email" 
                placeholder="your@email.com" 
                required 
                className="mb-2"
              />
              <FormField 
                label="Password" 
                type="password" 
                id="login-password" 
                required 
                className="mb-2"
              />
              <div className="mb-3 text-right">
                <button type="button" className="text-biblebrown text-xs underline">
                  Forgot password?
                </button>
              </div>
              <Button type="submit" fullWidth>
                Login
              </Button>
            </>
          ) : (
            <>
              <FormField 
                label="Name" 
                id="signup-name" 
                placeholder="Your full name" 
                required 
                className="mb-2"
              />
              <FormField 
                label="Date of Birth" 
                type="date" 
                id="signup-dob" 
                required 
                className="mb-2"
              />
              <FormField 
                label="Email" 
                type="email" 
                id="signup-email" 
                placeholder="your@email.com" 
                required 
                className="mb-2"
              />
              <FormField 
                label="Password" 
                type="password" 
                id="signup-password" 
                required 
                className="mb-2"
              />
              <Button type="submit" fullWidth>
                Create Account
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
