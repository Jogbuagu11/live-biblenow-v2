
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Avatar from '../components/Avatar';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('');
  
  const handleSave = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-biblebeige p-6 flex flex-col">
      <Logo size="lg" className="mx-auto mb-10 mt-8" />
      
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold text-biblebrown mb-6 text-center">Complete Your Profile</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <Avatar size="xl" className="border-4 border-biblegold" />
            <button className="absolute bottom-0 right-0 bg-biblebrown text-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">Upload Profile Photo</p>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium text-biblebrown">Bio</label>
          <textarea 
            className="input-field h-32 resize-none"
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            {bio.length}/200 characters
          </p>
        </div>
        
        <Button onClick={handleSave} fullWidth>
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
