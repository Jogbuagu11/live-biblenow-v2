
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import BottomNavigation from '../components/BottomNavigation';

const Livestream = () => {
  const navigate = useNavigate();

  const handleLivestreamClick = () => {
    navigate('/livestream-watch');
  };

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

  const livestreams = [
    { id: 1, title: "Sunday Morning Service", streamer: "Pastor John", viewers: 1200 },
    { id: 2, title: "Bible Study: Romans", streamer: "Sarah's Bible Study", viewers: 845 },
    { id: 3, title: "Prayer Meeting", streamer: "Community Church", viewers: 2500 },
    { id: 4, title: "Youth Discussion", streamer: "David's Corner", viewers: 532 },
    { id: 5, title: "Q&A Session", streamer: "Prayer Group", viewers: 321 },
    { id: 6, title: "Worship Session", streamer: "Worship Team", viewers: 1500 },
  ];

  return (
    <div className="min-h-screen bg-biblebeige pb-16">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-biblebrown">Livestreams</h1>
        <button className="text-biblebrown">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      {/* Featured Streamers */}
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Featured Streamers</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {streamers.map((streamer) => (
            <div key={streamer.id} className="flex-shrink-0" onClick={handleStreamerClick}>
              <div className="flex flex-col items-center w-20">
                <Avatar size="lg" className="mb-2 border-2 border-biblebrown" />
                <p className="text-sm font-medium text-center text-biblebrown truncate w-full">
                  {streamer.name}
                </p>
                <p className="text-xs text-gray-500">{streamer.viewers}K viewers</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current Livestreams */}
      <div className="p-6 pt-0">
        <h2 className="text-lg font-bold mb-4">Current Livestreams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {livestreams.map((stream) => (
            <div 
              key={stream.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm" 
              onClick={handleLivestreamClick}
            >
              <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                <span className="text-gray-400">Livestream Thumbnail</span>
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  LIVE
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {stream.viewers.toLocaleString()} viewers
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-biblebrown">{stream.title}</h3>
                <p className="text-sm text-gray-600">{stream.streamer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Livestream;
