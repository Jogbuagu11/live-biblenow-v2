
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
import { formatDistanceToNow } from 'date-fns';
import { X } from 'lucide-react';

type Activity = {
  id: string;
  type: 'livestream_watched' | 'comment_posted' | 'donation_made';
  title: string;
  timestamp: string;
};

type Following = {
  id: string;
  username: string;
  profileImageUrl: string;
  followedAt: string;
};

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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [following, setFollowing] = useState<Following[]>([]);
  const [loadingFollowing, setLoadingFollowing] = useState(true);

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
    
    // Sample recent activity data - in a real app, this would come from the database
    const sampleActivities: Activity[] = [
      {
        id: '1',
        type: 'livestream_watched',
        title: 'Watched "Sunday Morning Service"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: '2',
        type: 'comment_posted',
        title: 'Commented on "Bible Study Group"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: '3',
        type: 'donation_made',
        title: 'Made a donation to Community Church',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      },
    ];

    // Sample following data - in a real app, this would come from the database
    const sampleFollowing: Following[] = [
      {
        id: '1',
        username: 'Pastor John',
        profileImageUrl: '/placeholder.svg',
        followedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
      },
      {
        id: '2',
        username: 'Sarah\'s Bible Study',
        profileImageUrl: '/placeholder.svg',
        followedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
      },
      {
        id: '3',
        username: 'Community Church',
        profileImageUrl: '/placeholder.svg',
        followedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
      },
    ];
    
    fetchUserAndProfile();
    
    // Simulate loading activities and following
    setTimeout(() => {
      setActivities(sampleActivities);
      setLoadingActivities(false);
      setFollowing(sampleFollowing);
      setLoadingFollowing(false);
    }, 1000);
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

  const handleUnfollow = (followingId: string) => {
    // In a real app, this would make an API call to unfollow
    setFollowing(prev => prev.filter(item => item.id !== followingId));
    toast({
      title: "Unfollowed",
      description: "You've successfully unfollowed this user.",
    });
  };

  // Function to get icon based on activity type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'livestream_watched':
        return (
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'comment_posted':
        return (
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'donation_made':
        return (
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <HeaderBar />
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
      
      {/* Recent Activity Section */}
      <div className="m-4 p-4 bg-card rounded-xl">
        <h3 className="font-bold text-foreground mb-4">Recent Activity</h3>
        
        {loadingActivities ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No recent activity to display.</p>
        )}
      </div>
      
      {/* Following Section */}
      <div className="m-4 p-4 bg-card rounded-xl">
        <h3 className="font-bold text-foreground mb-4">Following</h3>
        
        {loadingFollowing ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between gap-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div>
                    <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : following.length > 0 ? (
          <div className="space-y-4">
            {following.map((followedUser) => (
              <div key={followedUser.id} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <Avatar src={followedUser.profileImageUrl} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{followedUser.username}</p>
                    <p className="text-xs text-muted-foreground">
                      Following since {formatDistanceToNow(new Date(followedUser.followedAt), { addSuffix: false })} ago
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleUnfollow(followedUser.id)}
                  className="h-8 w-8 p-0 rounded-full"
                  title="Unfollow"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">You're not following anyone yet</p>
            <Button onClick={() => navigate('/livestream')} variant="outline">
              Discover Streamers
            </Button>
          </div>
        )}
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
