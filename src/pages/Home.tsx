
import React from 'react';
import Logo from '../components/Logo';
import BottomNavigation from '../components/BottomNavigation';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="min-h-screen bg-biblebeige pb-16">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm">
        <Logo size="lg" className="mx-auto" />
      </div>
      
      {/* Welcome Banner */}
      <div className="bg-biblebrown text-white p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-3">Welcome to BibleNOW</h1>
        <p className="text-center mb-4">Your gateway to spiritual livestreams</p>
        <Button variant="secondary" className="mt-2">
          Explore Livestreams
        </Button>
      </div>
      
      {/* Featured Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Featured Sections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured Card 1 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1">Daily Devotionals</h3>
            <p className="text-sm text-gray-600">Start your day with inspiring devotionals</p>
          </div>
          
          {/* Featured Card 2 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1">Community Groups</h3>
            <p className="text-sm text-gray-600">Connect with believers worldwide</p>
          </div>
          
          {/* Featured Card 3 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1">Bible Studies</h3>
            <p className="text-sm text-gray-600">Deep dive into scripture with expert teachers</p>
          </div>
          
          {/* Featured Card 4 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="rounded-lg h-32 bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Thumbnail</span>
            </div>
            <h3 className="font-semibold mb-1">Upcoming Events</h3>
            <p className="text-sm text-gray-600">Stay updated on special livestreams</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
