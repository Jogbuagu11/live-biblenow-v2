
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../components/ThemeProvider';

const Settings = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [twoFA, setTwoFA] = useState(false);
  
  const goBack = () => {
    navigate(-1);
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    alert('This would delete your account (UI demo only)');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleReportContent = () => {
    // In a real app, this would open a form
    alert('This would open a content reporting form (UI demo only)');
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="bg-card p-6 shadow-sm flex items-center">
        <button onClick={goBack} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>
      
      {/* Settings Sections */}
      <div className="p-4">
        {/* Appearance */}
        <div className="mb-6 bg-card rounded-xl p-4">
          <h2 className="font-bold text-foreground mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Change app appearance</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
        
        {/* Security */}
        <div className="mb-6 bg-card rounded-xl p-4">
          <h2 className="font-bold text-foreground mb-4">Security</h2>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={twoFA}
                onChange={() => setTwoFA(!twoFA)}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-background after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-muted-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
          
          <button className="w-full py-3 text-left font-medium text-foreground border-t border-border">
            Change Password
          </button>
          
          <button className="w-full py-3 text-left font-medium text-foreground border-t border-border">
            Update Email
          </button>
        </div>
        
        {/* Report Content */}
        <div className="mb-6 bg-card rounded-xl p-4">
          <h2 className="font-bold text-foreground mb-4">Report Content</h2>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3">See something inappropriate? Report content that violates our community guidelines.</p>
          </div>
          
          <Button 
            onClick={handleReportContent} 
            className="bg-primary hover:bg-opacity-90 text-primary-foreground" 
            fullWidth
          >
            Report Content
          </Button>
        </div>
        
        {/* Danger Zone */}
        <div className="mb-6 bg-card rounded-xl p-4">
          <h2 className="font-bold text-foreground mb-4">Danger Zone</h2>
          
          <Button 
            onClick={handleDeleteAccount} 
            className="bg-red-500 hover:bg-red-600 text-white" 
            fullWidth
          >
            Delete Account
          </Button>
        </div>
        
        <Button onClick={handleLogout} variant="outline" fullWidth>
          Logout
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Settings;
