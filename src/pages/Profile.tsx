
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';
import { AuthCheck } from '../components/AuthCheck';

const Profile = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    // In a real app, this would navigate to edit profile
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <AuthCheck>
      <div className="min-h-screen bg-background pb-16">
        {/* Header */}
        <div className="bg-card p-6 shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <button onClick={handleSettingsClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="bg-card p-6 flex flex-col items-center">
          <Avatar className="mb-4" />
          <h2 className="text-xl font-bold text-foreground">John Doe</h2>
          <p className="text-muted-foreground mb-6">Joined April 2023</p>
          
          <div className="flex justify-around w-full mb-4">
            <div className="text-center">
              <p className="font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">142</p>
              <p className="text-xs text-muted-foreground">Watched</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">38h</p>
              <p className="text-xs text-muted-foreground">Total Time</p>
            </div>
          </div>
          
          <Button onClick={handleEditProfile} variant="outline" fullWidth>
            Edit Profile
          </Button>
        </div>
        
        {/* Bio */}
        <div className="m-4 p-4 bg-card rounded-xl">
          <h3 className="font-bold text-foreground mb-2">Bio</h3>
          <p className="text-muted-foreground">I'm passionate about studying the Bible and connecting with fellow believers through livestreams. Looking forward to growing in faith together!</p>
        </div>
        
        {/* Recent Activity */}
        <div className="m-4 p-4 bg-card rounded-xl">
          <h3 className="font-bold text-foreground mb-3">Recent Activity</h3>
          
          <div className="space-y-3">
            <div className="flex items-center p-2 border-b border-border">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm text-foreground">Watched <span className="font-medium">Sunday Service</span></p>
              <p className="text-xs text-muted-foreground ml-auto">2h ago</p>
            </div>
            
            <div className="flex items-center p-2 border-b border-border">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              <p className="text-sm text-foreground">Followed <span className="font-medium">Pastor Sarah</span></p>
              <p className="text-xs text-muted-foreground ml-auto">Yesterday</p>
            </div>
            
            <div className="flex items-center p-2 border-b border-border">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <p className="text-sm text-foreground">Commented on <span className="font-medium">Bible Study</span></p>
              <p className="text-xs text-muted-foreground ml-auto">3 days ago</p>
            </div>
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    </AuthCheck>
  );
};

export default Profile;
