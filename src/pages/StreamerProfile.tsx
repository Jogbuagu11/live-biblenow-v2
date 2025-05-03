
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { Button } from '@/components/ui/button';
import BottomNavigation from '../components/BottomNavigation';
import DonationModal from '../components/DonationModal';
import { useToast } from '@/hooks/use-toast';
import { UserX } from 'lucide-react';

const StreamerProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Simulate checking if user is following the streamer
  useEffect(() => {
    // In a real app, this would check against a database
    // Here we're just setting a random value for demo purposes
    setIsFollowing(Math.random() > 0.5);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleFollowToggle = () => {
    if (isFollowing) {
      // Unfollow logic
      setIsFollowing(false);
      toast({
        title: "Unfollowed",
        description: "You've successfully unfollowed this streamer.",
      });
    } else {
      // Follow logic
      setIsFollowing(true);
      toast({
        title: "Following",
        description: "You're now following this streamer.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Cover Photo */}
      <div className="h-40 bg-primary relative">
        <button 
          onClick={goBack}
          className="absolute top-4 left-4 bg-black bg-opacity-30 text-white rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Profile Info */}
      <div className="bg-card p-6 relative shadow-sm">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Avatar size="xl" className="border-4 border-background" />
        </div>
        
        <div className="mt-16 text-center">
          <h1 className="text-xl font-bold text-foreground">Pastor John</h1>
          <p className="text-muted-foreground my-2">Bible Teacher & Spiritual Guide</p>
          
          <div className="flex justify-center space-x-4 mt-4">
            <div className="text-center">
              <p className="font-bold text-foreground">124</p>
              <p className="text-xs text-muted-foreground">Streams</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">45.2K</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">1.2M</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            {isFollowing ? (
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleFollowToggle}
              >
                <UserX size={16} className="mr-2" />
                Unfollow
              </Button>
            ) : (
              <Button 
                className="w-full"
                onClick={handleFollowToggle}
              >
                Follow
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={() => setIsDonationModalOpen(true)}>
              Donate
            </Button>
          </div>
        </div>
      </div>
      
      {/* Next Stream */}
      <div className="p-4">
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-foreground mb-4">Next Stream</h2>
          
          <div className="flex items-center">
            <div className="bg-accent/20 rounded-lg p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground">Wednesday Bible Study</h3>
              <p className="text-sm text-muted-foreground">Tomorrow, 7:00 PM</p>
              <p className="text-sm text-primary mt-1">Book of Psalms - Part 3</p>
            </div>
          </div>
          
          <Button variant="outline" className="mt-4 w-full">
            Set Reminder
          </Button>
        </div>
      </div>
      
      {/* Recent Streams */}
      <div className="p-4 pt-0">
        <h2 className="font-bold text-foreground mb-4">Recent Streams</h2>
        
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 bg-muted relative flex items-center justify-center">
                <span className="text-muted-foreground">Stream Thumbnail</span>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-foreground text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 100) + 10}K views
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-foreground">Bible Study Session #{item}</h3>
                <p className="text-xs text-muted-foreground">{item} day{item !== 1 ? 's' : ''} ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
      
      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  );
};

export default StreamerProfile;
