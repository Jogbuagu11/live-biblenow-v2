
import React, { useState, useEffect } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import HeaderBar from '@/components/HeaderBar';

type Notification = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  is_read: boolean;
  metadata: {
    streamer_name?: string;
    stream_id?: string;
    stream_title?: string;
  } | null;
  type: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        // Even if no user is found, stop the loading state
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);
  
  // Fetch existing notifications
  useEffect(() => {
    if (!user) return;
    
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .eq('type', 'stream_alert')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          setNotifications(data as Notification[]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [user]);
  
  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user) return;
    
    const channel = supabase
      .channel('stream-alerts-channel')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id} AND type=eq.stream_alert`
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          // Add to state
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .subscribe();
      
    // Cleanup subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Get icon based on notification type
  const getIcon = (notification: Notification) => {
    return (
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <HeaderBar />
      <div className="bg-card p-6 shadow-sm">
        <h1 className="text-xl font-bold text-foreground">Livestream Notifications</h1>
      </div>
      
      {/* Notifications List */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="p-4 flex items-start border-b border-border last:border-0"
              >
                {getIcon(notification)}
                
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">
                      {notification.metadata?.streamer_name || 'Streamer'} is live
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {notification.created_at ? 
                        formatDistanceToNow(new Date(notification.created_at), { addSuffix: true }) : 
                        'Recently'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground mt-1">
                    {notification.metadata?.stream_title || notification.body}
                  </p>
                  
                  {notification.metadata?.stream_id && (
                    <a 
                      href={`/livestream-watch?id=${notification.metadata.stream_id}`}
                      className="text-xs text-primary mt-2 block"
                    >
                      Watch stream
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-8 text-center shadow-sm">
            <div className="inline-flex items-center justify-center bg-accent/20 w-16 h-16 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Livestream Notifications</h2>
            <p className="text-muted-foreground">No streamers have gone live recently. Follow streamers to get notifications when they go live.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Notifications;
