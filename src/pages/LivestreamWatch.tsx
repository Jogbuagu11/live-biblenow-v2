
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';

const LivestreamWatch = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleStreamerClick = () => {
    navigate('/streamer-profile');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    setMessage('');
  };

  // Dummy chat messages
  const chatMessages = [
    { id: 1, user: 'John', message: 'Great stream today!', isOwn: false },
    { id: 2, user: 'Mary', message: 'Amen to that!', isOwn: false },
    { id: 3, user: 'You', message: 'This is really insightful.', isOwn: true },
    { id: 4, user: 'David', message: 'What verse is that from?', isOwn: false },
    { id: 5, user: 'Sarah', message: 'I think it\'s Romans 8:28', isOwn: false },
    { id: 6, user: 'You', message: 'Yes, that\'s correct Sarah!', isOwn: true },
    { id: 7, user: 'Pastor Mike', message: 'Let\'s continue in the next verse', isOwn: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Live Video Player */}
      <div className="bg-black aspect-video w-full flex items-center justify-center">
        <span className="text-white">Live Video Feed</span>
      </div>
      
      {/* Stream Info */}
      <div className="p-4 bg-card">
        <h1 className="font-bold text-lg text-foreground">Sunday Morning Service</h1>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2" onClick={handleStreamerClick}>
            <Avatar size="sm" />
            <div>
              <p className="font-medium text-sm text-foreground">Pastor John</p>
              <p className="text-xs text-muted-foreground">2.5K watching</p>
            </div>
          </div>
          
          <Button variant="secondary" className="text-sm py-1 px-4">
            Follow
          </Button>
        </div>
      </div>
      
      {/* Chat Section */}
      <div className="p-4">
        <div className="bg-card rounded-t-xl p-3 border-b border-border">
          <h2 className="font-bold text-foreground">Live Chat</h2>
        </div>
        
        <div className="bg-card h-64 overflow-y-auto p-3">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex mb-3 ${msg.isOwn ? 'justify-end' : ''}`}>
              {!msg.isOwn && <Avatar size="sm" className="mr-2" />}
              <div className={msg.isOwn ? "chat-bubble-own" : "chat-bubble"}>
                <p className="font-medium text-xs">{msg.user}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="bg-card rounded-b-xl p-3 flex">
          <input
            type="text"
            className="input-field flex-1 mr-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default LivestreamWatch;
