
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useIsMobile } from '../hooks/use-mobile';
import { Phone } from 'lucide-react';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
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

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'email' ? 'phone' : 'email');
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
              {loginMethod === 'email' ? (
                <FormField 
                  label="Email" 
                  type="email" 
                  id="login-email" 
                  placeholder="your@email.com" 
                  required 
                  className="mb-2"
                />
              ) : (
                <FormField 
                  label="Phone Number" 
                  type="tel" 
                  id="login-phone" 
                  placeholder="(123) 456-7890" 
                  required 
                  className="mb-2"
                />
              )}
              <FormField 
                label="Password" 
                type="password" 
                id="login-password" 
                required 
                className="mb-2"
              />
              <div className="flex justify-between items-center mb-3">
                <button 
                  type="button" 
                  onClick={toggleLoginMethod}
                  className="flex items-center text-biblebrown text-xs font-medium"
                >
                  <Phone size={14} className="mr-1" />
                  {loginMethod === 'email' ? 'Use phone number instead' : 'Use email instead'}
                </button>
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
