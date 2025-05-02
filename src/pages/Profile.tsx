// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import Avatar from '../components/Avatar';
import { Button } from '@/components/ui/button';
import HeaderBar from '@/components/HeaderBar';
import EditProfileModal from '../components/EditProfileModal';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    bio: "I'm passionate about studying the Bible and connecting with fellow believers.",
    profileImageUrl: '/placeholder.svg',
    isLoading: false,
    username: 'Demo User'
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('bio, profile_photo_url, username')
            .eq('id', user.id)
            .single();
          if (!error && profile) {
            setUserProfile({
              bio: profile.bio || '',
              profileImageUrl: profile.profile_photo_url || '/placeholder.svg',
              isLoading: false,
              username: profile.username || user.email?.split('@')[0] || 'User'
            });
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
    fetchUserAndProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileUpdated = (newBio: string, newImageUrl: string) => {
    setUserProfile(prev => ({
      ...prev,
      bio: newBio,
      profileImageUrl: newImageUrl,
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <HeaderBar title="Profile" onSettingsClick={() => navigate('/settings')} />
      <div className="bg-card p-6 flex flex-col items-center">
        <Avatar src={userProfile.profileImageUrl} size="xl" className="mb-4" />
        <h2 className="text-xl font-bold">{userProfile.username}</h2>
        <p className="text-muted-foreground mb-6">Joined April 2023</p>
        <Button onClick={handleEditProfile} variant="outline" className="w-full">Edit Profile</Button>
      </div>
      <div className="m-4 p-4 bg-card rounded-xl">
        <h3 className="font-bold text-foreground mb-2">Bio</h3>
        <p className="text-muted-foreground">{userProfile.bio}</p>
      </div>
      <BottomNavigation />
      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        currentBio={userProfile.bio}
        currentImageUrl={userProfile.profileImageUrl}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
};

export default Profile;
