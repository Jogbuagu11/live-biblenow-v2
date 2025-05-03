
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import HeaderBar from '@/components/HeaderBar';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/Avatar';

const Home = () => {
  const navigate = useNavigate();
  
  const handleStreamerClick = () => {
    navigate('/streamer-profile');
  };

  const streamers = [
    { id: 1, name: "Pastor John", viewers: 1.2 },
    { id: 2, name: "Sarah's Bible Study", viewers: 0.8 },
    { id: 3, name: "Community Church", viewers: 2.5 },
    { id: 4, name: "David's Corner", viewers: 0.5 },
    { id: 5, name: "Prayer Group", viewers: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <HeaderBar />
      
      {/* Welcome Banner with enhanced design */}
      <div className="p-6 bg-gradient-to-r from-secondary/30 to-primary/20 mb-4 rounded-lg mx-4 mt-4 shadow-sm">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Welcome to Bible Live!</h1>
          <p className="text-foreground/80 leading-relaxed">
            Connect with faith communities and watch livestreams from your favorite ministries. 
            Join discussions, share insights, and deepen your spiritual journey together.
          </p>
          <Button className="mt-4" variant="secondary">
            Explore Livestreams
          </Button>
        </div>
      </div>
      
      {/* Featured Streamers */}
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4 text-foreground">Featured Streamers</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {streamers.map((streamer) => (
            <div key={streamer.id} className="flex-shrink-0" onClick={handleStreamerClick}>
              <div className="flex flex-col items-center w-20">
                <Avatar size="lg" className="mb-2 border-2 border-primary" />
                <p className="text-sm font-medium text-center text-foreground truncate w-full">
                  {streamer.name}
                </p>
                <p className="text-xs text-muted-foreground">{streamer.viewers}K viewers</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Featured Sections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured Card 1 */}
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-muted mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1 text-foreground">Daily Devotionals</h3>
            <p className="text-sm text-muted-foreground">Start your day with inspiring devotionals</p>
          </div>
          
          {/* Featured Card 2 */}
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-muted mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1 text-foreground">Community Groups</h3>
            <p className="text-sm text-muted-foreground">Connect with believers worldwide</p>
          </div>
          
          {/* Featured Card 3 */}
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-muted mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1 text-foreground">Bible Studies</h3>
            <p className="text-sm text-muted-foreground">Deep dive into scripture with expert teachers</p>
          </div>
          
          {/* Featured Card 4 */}
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-muted mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1 text-foreground">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">Stay updated on special livestreams</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
