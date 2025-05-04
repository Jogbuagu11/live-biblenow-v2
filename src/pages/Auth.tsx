import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useIsMobile } from '../hooks/use-mobile';
import { Phone, Apple, Github } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Extract redirectTo from URL query parameters
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  
  useEffect(() => {
    // Get redirectTo from URL query parameters when the component mounts
    const queryParams = new URLSearchParams(location.search);
    const redirectParam = queryParams.get('redirectTo');
    if (redirectParam) {
      setRedirectTo(redirectParam);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For UI only, show success toast and handle redirect
    if (activeTab === 'signup') {
      // Store redirectTo in localStorage to persist through the signup flow
      if (redirectTo) {
        localStorage.setItem('redirectTo', redirectTo);
      }
      navigate('/confirm-email');
    } else {
      // Login success
      toast({
        title: "Login successful",
        description: "You are now logged in",
      });
      
      // Immediately redirect to the specified URL without setTimeout
      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        // Default to live.biblenow.io if no redirectTo is specified
        window.location.href = 'https://live.biblenow.io';
      }
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
      
      <div className="bg-white rounded-xl p-6 shadow-sm flex-1 max-w-md w-full mx-auto">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mb-6">
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'login' ? (
            <>
              {/* Login Method Toggle centered above input field */}
              <div className="flex justify-center mb-2">
                <button 
                  type="button" 
                  onClick={toggleLoginMethod}
                  className="flex items-center text-biblebrown text-xs font-medium"
                >
                  <Phone size={14} className="mr-1" />
                  {loginMethod === 'email' ? 'Use phone number' : 'Use email'}
                </button>
              </div>
            
              {loginMethod === 'email' ? (
                <FormField 
                  label="Email" 
                  type="email" 
                  id="login-email" 
                  placeholder="your@email.com" 
                  required 
                  className="mb-3"
                />
              ) : (
                <FormField 
                  label="Phone Number" 
                  type="tel" 
                  id="login-phone" 
                  placeholder="(123) 456-7890" 
                  required 
                  className="mb-3"
                />
              )}
              <FormField 
                label="Password" 
                type="password" 
                id="login-password" 
                required 
                className="mb-3"
              />
              <div className="flex justify-end mb-4">
                <button type="button" className="text-biblebrown text-xs underline">
                  Forgot password?
                </button>
              </div>
              <Button type="submit" fullWidth>
                Login
              </Button>
              
              {/* Social login options */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  className="btn-outline flex justify-center items-center py-2.5 border border-biblegold rounded-md hover:bg-gray-50"
                >
                  <Apple className="h-5 w-5 mr-2" />
                  <span>Apple</span>
                </button>
                <button 
                  type="button"
                  className="btn-outline flex justify-center items-center py-2.5 border border-biblegold rounded-md hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <FormField 
                label="Name" 
                id="signup-name" 
                placeholder="Your full name" 
                required 
                className="mb-3"
              />
              <FormField 
                label="Date of Birth" 
                type="date" 
                id="signup-dob" 
                required 
                className="mb-3"
              />
              <FormField 
                label="Email" 
                type="email" 
                id="signup-email" 
                placeholder="your@email.com" 
                required 
                className="mb-3"
              />
              <FormField 
                label="Password" 
                type="password" 
                id="signup-password" 
                required 
                className="mb-4"
              />
              
              {/* Age verification checkbox */}
              <div className="flex items-start space-x-2 mb-3">
                <Checkbox 
                  id="age-verification" 
                  checked={ageVerified}
                  onCheckedChange={(checked) => setAgeVerified(checked as boolean)} 
                />
                <label 
                  htmlFor="age-verification"
                  className="text-sm text-gray-700 leading-tight"
                >
                  I am at least 13 years of age
                </label>
              </div>
              
              {/* Terms and conditions checkbox */}
              <div className="flex items-start space-x-2 mb-4">
                <Checkbox 
                  id="terms-conditions" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} 
                />
                <label 
                  htmlFor="terms-conditions"
                  className="text-sm text-gray-700 leading-tight"
                >
                  I agree to <a href="https://terms.biblenow.io" target="_blank" rel="noopener noreferrer" className="text-biblebrown underline">Terms and Conditions</a> and <a href="https://policy.biblenow.io" target="_blank" rel="noopener noreferrer" className="text-biblebrown underline">Privacy Policy</a>
                </label>
              </div>
              
              <Button type="submit" fullWidth>
                Create Account
              </Button>
              
              {/* Social signup options */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  className="btn-outline flex justify-center items-center py-2.5 border border-biblegold rounded-md hover:bg-gray-50"
                >
                  <Apple className="h-5 w-5 mr-2" />
                  <span>Apple</span>
                </button>
                <button 
                  type="button"
                  className="btn-outline flex justify-center items-center py-2.5 border border-biblegold rounded-md hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
