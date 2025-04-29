
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';
import DonationModal from '../components/DonationModal';

const StreamerProfile = () => {
  const navigate = useNavigate();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleOpenDonation = () => {
    setIsDonationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-biblebeige pb-16">
      {/* Cover Photo */}
      <div className="h-40 bg-biblebrown relative">
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
      <div className="bg-white p-6 relative shadow-sm">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Avatar size="xl" className="border-4 border-biblebeige" />
        </div>
        
        <div className="mt-16 text-center">
          <h1 className="text-xl font-bold text-biblebrown">Pastor John</h1>
          <p className="text-gray-600 my-2">Bible Teacher & Spiritual Guide</p>
          
          <div className="flex justify-center space-x-4 mt-4">
            <div className="text-center">
              <p className="font-bold text-biblebrown">124</p>
              <p className="text-xs text-gray-500">Streams</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-biblebrown">45.2K</p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-biblebrown">1.2M</p>
              <p className="text-xs text-gray-500">Views</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <Button fullWidth>Follow</Button>
            <Button variant="secondary" fullWidth onClick={handleOpenDonation}>
              Donate
            </Button>
          </div>
        </div>
      </div>
      
      {/* Next Stream */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-biblebrown mb-4">Next Stream</h2>
          
          <div className="flex items-center">
            <div className="bg-biblegold/20 rounded-lg p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-biblegold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div>
              <h3 className="font-medium">Wednesday Bible Study</h3>
              <p className="text-sm text-gray-600">Tomorrow, 7:00 PM</p>
              <p className="text-sm text-biblebrown mt-1">Book of Psalms - Part 3</p>
            </div>
          </div>
          
          <Button variant="outline" fullWidth className="mt-4">
            Set Reminder
          </Button>
        </div>
      </div>
      
      {/* Recent Streams */}
      <div className="p-4 pt-0">
        <h2 className="font-bold text-biblebrown mb-4">Recent Streams</h2>
        
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                <span className="text-gray-400">Stream Thumbnail</span>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 100) + 10}K views
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-biblebrown">Bible Study Session #{item}</h3>
                <p className="text-xs text-gray-500">{item} day{item !== 1 ? 's' : ''} ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
      
      <BottomNavigation />
    </div>
  );
};

export default StreamerProfile;
