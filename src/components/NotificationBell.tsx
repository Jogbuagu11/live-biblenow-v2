
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

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

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch existing notifications on mount
  useEffect(() => {
    async function fetchNotifications() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        // Get stream alert notifications
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .eq('type', 'stream_alert')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (error) throw error;
        
        if (data) {
          setNotifications(data as Notification[]);
          setUnreadCount(data.filter(n => !n.is_read).length);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
    
    fetchNotifications();
  }, []);
  
  // Subscribe to realtime notifications
  useEffect(() => {
    async function setupSubscription() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        // Subscribe to notifications table for this user
        const channel = supabase
          .channel('notifications-channel')
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
              setUnreadCount(prev => prev + 1);
              
              // Show toast
              if (newNotification.metadata?.streamer_name && newNotification.metadata?.stream_title) {
                toast({
                  title: `🔴 ${newNotification.metadata.streamer_name} just went live`,
                  description: newNotification.metadata.stream_title,
                  duration: 5000,
                });
              }
            }
          )
          .subscribe();
          
        // Cleanup subscription when component unmounts
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error setting up notification subscription:', error);
      }
    }
    
    setupSubscription();
  }, [toast]);
  
  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="relative p-2 rounded-full hover:bg-accent transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1rem] h-4 flex items-center justify-center"
                variant="destructive"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold">Livestream Notifications</h3>
          </div>
          
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-3 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {notification.metadata?.streamer_name || 'Streamer'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {notification.created_at ? 
                        formatDistanceToNow(new Date(notification.created_at), { addSuffix: true }) : 
                        'Recently'}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{notification.metadata?.stream_title || notification.body}</p>
                  
                  {notification.metadata?.stream_id && (
                    <a 
                      href={`/livestream-watch?id=${notification.metadata.stream_id}`}
                      className="text-xs text-primary mt-1 block"
                    >
                      Watch stream
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationBell;
