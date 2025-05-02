
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Tv, Bell } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/home') return true;
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 flex justify-around py-2">
      <Link to="/home" className={`flex flex-col items-center py-2 px-4 ${isActive('/home') || isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/profile" className={`flex flex-col items-center py-2 px-4 ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}>
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      
      <Link to="/livestream" className={`flex flex-col items-center py-2 px-4 ${isActive('/livestream') ? 'text-primary' : 'text-muted-foreground'}`}>
        <Tv size={24} />
        <span className="text-xs mt-1">Livestream</span>
      </Link>
      
      <Link to="/notifications" className={`flex flex-col items-center py-2 px-4 ${isActive('/notifications') ? 'text-primary' : 'text-muted-foreground'}`}>
        <Bell size={24} />
        <span className="text-xs mt-1">Notifications</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
