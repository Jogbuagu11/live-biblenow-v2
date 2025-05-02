
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Tv, Bell } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around py-2">
      <Link to="/" className={`flex flex-col items-center py-2 px-4 ${isActive('/') ? 'text-biblegold' : 'text-biblebrown'}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/profile" className={`flex flex-col items-center py-2 px-4 ${isActive('/profile') ? 'text-biblegold' : 'text-biblebrown'}`}>
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      
      <Link to="/livestream" className={`flex flex-col items-center py-2 px-4 ${isActive('/livestream') ? 'text-biblegold' : 'text-biblebrown'}`}>
        <Tv size={24} />
        <span className="text-xs mt-1">Livestream</span>
      </Link>
      
      <Link to="/notifications" className={`flex flex-col items-center py-2 px-4 ${isActive('/notifications') ? 'text-biblegold' : 'text-biblebrown'}`}>
        <Bell size={24} />
        <span className="text-xs mt-1">Notifications</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
