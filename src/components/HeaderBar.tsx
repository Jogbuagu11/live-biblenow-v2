import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from './Avatar';
import { useTheme } from '@/hooks/use-theme';
import { Button } from './ui/button';
import { supabase } from '../integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Input } from './ui/input';
import { Search, Settings } from 'lucide-react';

const HeaderBar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const isLivestreamPage = location.pathname === '/livestream';
  const isProfilePage = location.pathname === '/profile';
  
  // Default avatar - will use the uploaded image
  const defaultAvatarUrl = "/lovable-uploads/90164570-ed1b-470d-8239-c5ca43c9050e.png";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    fetchUser();

    return () => subscription.unsubscribe();
  }, []);

  // Click outside to collapse search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    // Redirect to auth.biblenow.io with return URL to /home
    const returnUrl = encodeURIComponent(`${window.location.origin}/home`);
    window.location.href = `https://auth.biblenow.io?returnUrl=${returnUrl}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Here you could filter livestreams or navigate to search results
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    // Focus the input when expanded
    if (!isSearchExpanded && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Removed Logo component */}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Expandable Search bar for Livestream page */}
          {isLivestreamPage && (
            <div className="relative" ref={searchInputRef}>
              <div className={`flex items-center transition-all duration-300 ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
                <button 
                  onClick={toggleSearch} 
                  className={`p-2 rounded-full hover:bg-muted transition-colors ${isSearchExpanded ? 'absolute left-2 z-10' : ''}`}
                >
                  <Search className="h-5 w-5 text-muted-foreground" />
                </button>
                
                {isSearchExpanded && (
                  <form onSubmit={handleSearch} className="w-full">
                    <Input
                      type="search"
                      placeholder="Search"
                      className="pl-10 pr-4 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      ref={searchInputRef}
                    />
                  </form>
                )}
              </div>
            </div>
          )}
          
          {/* Settings for Profile page */}
          {isProfilePage && (
            <Link to="/settings" className="text-foreground hover:text-primary transition-colors">
              <Settings size={20} />
            </Link>
          )}
          
          {/* Avatar on all pages */}
          {user ? (
            <Link to="/profile">
              <Avatar 
                src={user.user_metadata?.profile_photo_url || defaultAvatarUrl}
                alt="Profile"
                size="sm"
                className="cursor-pointer"
              />
            </Link>
          ) : (
            <Button variant="outline" onClick={handleLogin}>Log In</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
