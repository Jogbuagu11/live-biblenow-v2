
import React from 'react';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/integrations/supabase/client';

const HeaderBar = () => {
  const [user, setUser] = React.useState<any>(null);
  const { theme } = useTheme();

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    
    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-medium text-lg">BibleNow Live</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user && <NotificationBell />}
          <ThemeToggle />
          {user && (
            <Link to="/profile">
              <Avatar 
                src={user.user_metadata?.avatar_url || ""}
                alt="Profile"
                size="sm"
                className="cursor-pointer"
              />
            </Link>
          )}
          {!user && (
            <Link to="/auth" className="text-sm font-medium">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
