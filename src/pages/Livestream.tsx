import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import HeaderBar from '@/components/HeaderBar';

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
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <HeaderBar />
      
      {/* Current Livestreams */}
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4 text-foreground">Current Livestreams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {livestreams.map((stream) => (
            <div 
              key={stream.id} 
              className="bg-card rounded-xl overflow-hidden shadow-sm" 
              onClick={handleLivestreamClick}
            >
              <div className="h-40 bg-muted relative flex items-center justify-center">
                <span className="text-muted-foreground">Livestream Thumbnail</span>
                <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                  LIVE
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-foreground text-xs px-2 py-1 rounded">
                  {stream.viewers.toLocaleString()} viewers
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-foreground">{stream.title}</h3>
                <p className="text-sm text-muted-foreground">{stream.streamer}</p>
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
