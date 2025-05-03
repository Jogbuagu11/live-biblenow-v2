
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { useTheme } from '@/hooks/use-theme';
import Logo from './Logo';

const HeaderBar = () => {
  const { theme } = useTheme();
  
  // Demo user avatar - always show UI elements
  const demoAvatarUrl = "/placeholder.svg";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-medium text-lg">Live</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <Avatar 
              src={demoAvatarUrl}
              alt="Profile"
              size="sm"
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
