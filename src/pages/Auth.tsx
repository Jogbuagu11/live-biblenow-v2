
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-biblebeige p-6 flex flex-col">
      <div className="mx-auto mb-8 mt-8">
        <Logo size="lg" />
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm flex-1 max-w-md w-full mx-auto">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-biblebrown text-biblebrown'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'signup'
                ? 'border-b-2 border-biblebrown text-biblebrown'
                : 'text-gray-500'
            }`}
          >
            Signup
          </button>
        </div>
        
        {/* Forms */}
        <form onSubmit={handleSubmit}>
          {activeTab === 'login' ? (
            <>
              <FormField 
                label="Email" 
                type="email" 
                id="login-email" 
                placeholder="your@email.com" 
                required 
              />
              <FormField 
                label="Password" 
                type="password" 
                id="login-password" 
                required 
              />
              <div className="mb-6 text-right">
                <button type="button" className="text-biblebrown text-sm underline">
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
              />
              <FormField 
                label="Date of Birth" 
                type="date" 
                id="signup-dob" 
                required 
              />
              <FormField 
                label="Email" 
                type="email" 
                id="signup-email" 
                placeholder="your@email.com" 
                required 
              />
              <FormField 
                label="Password" 
                type="password" 
                id="signup-password" 
                required 
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
