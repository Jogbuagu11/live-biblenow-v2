
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from './Avatar';
import { useTheme } from '@/hooks/use-theme';
import Logo from './Logo';
import { Button } from './ui/button';
import { supabase } from '../integrations/supabase/client';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

const HeaderBar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
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

  const handleLogin = () => {
    window.location.href = '/auth';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Removed "Live" text from here */}
        </div>
        
        <div className="flex items-center gap-4">
          {isHomePage && (
            user ? (
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
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
