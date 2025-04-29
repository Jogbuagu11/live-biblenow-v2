
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const Livestream = () => {
  const navigate = useNavigate();

  const handleLivestreamClick = () => {
    navigate('/livestream-watch');
  };

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
      
      {/* Current Livestreams */}
      <div className="p-6">
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
