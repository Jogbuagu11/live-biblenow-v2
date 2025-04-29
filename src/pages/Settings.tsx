
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
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

  return (
    <div className="min-h-screen bg-biblebeige pb-16">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm flex items-center">
        <button onClick={goBack} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-biblebrown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-biblebrown">Settings</h1>
      </div>
      
      {/* Settings Sections */}
      <div className="p-4">
        {/* Appearance */}
        <div className="mb-6 bg-white rounded-xl p-4">
          <h2 className="font-bold text-biblebrown mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500">Change app appearance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-biblegold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-biblegold"></div>
            </label>
          </div>
        </div>
        
        {/* Security */}
        <div className="mb-6 bg-white rounded-xl p-4">
          <h2 className="font-bold text-biblebrown mb-4">Security</h2>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={twoFA}
                onChange={() => setTwoFA(!twoFA)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-biblegold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-biblegold"></div>
            </label>
          </div>
          
          <button className="w-full py-3 text-left font-medium text-biblebrown border-t border-gray-100">
            Change Password
          </button>
          
          <button className="w-full py-3 text-left font-medium text-biblebrown border-t border-gray-100">
            Update Email
          </button>
        </div>
        
        {/* Danger Zone */}
        <div className="mb-6 bg-white rounded-xl p-4">
          <h2 className="font-bold text-biblebrown mb-4">Danger Zone</h2>
          
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
