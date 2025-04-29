
import React from 'react';
import BottomNavigation from '../components/BottomNavigation';
import Avatar from '../components/Avatar';

const Notifications = () => {
  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      type: 'live',
      message: 'Pastor John just went live!',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'follow',
      message: 'Sarah started following you',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Bible Study starts in 30 minutes',
      time: '30 minutes ago'
    },
    {
      id: 4,
      type: 'comment',
      message: 'David replied to your comment',
      time: '2 hours ago'
    },
    {
      id: 5,
      type: 'live',
      message: 'Community Church is now live',
      time: '3 hours ago'
    },
    {
      id: 6,
      type: 'system',
      message: 'Your account was successfully verified',
      time: '1 day ago'
    },
    {
      id: 7,
      type: 'follow',
      message: 'Prayer Group started following you',
      time: '2 days ago'
    },
  ];
  
  // Icons for different notification types
  const getIcon = (type: string) => {
    switch(type) {
      case 'live':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'follow':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
        );
      case 'reminder':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-biblebeige pb-16">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-biblebrown">Notifications</h1>
      </div>
      
      {/* Notifications List */}
      <div className="p-4">
        {notifications.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {notifications.map((notification, index) => (
              <div 
                key={notification.id}
                className={`p-4 flex items-center ${
                  index < notifications.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {getIcon(notification.type)}
                
                <div className="ml-3 flex-1">
                  <p className="text-biblebrown">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                
                <div className="w-2 h-2 bg-biblegold rounded-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <div className="inline-flex items-center justify-center bg-biblegold/20 w-16 h-16 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-biblegold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-biblebrown mb-2">No Notifications Yet</h2>
            <p className="text-gray-500">You're all caught up! Check back later.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Notifications;
