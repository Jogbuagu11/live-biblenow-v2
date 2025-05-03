
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { X, Send, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Define the interface for invite data
interface Invite {
  id: string;
  invitee_email: string;
  sender_id: string;
  accepted: boolean;
  accepted_at: string | null;
  created_at: string;
}

export function InviteUsersModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoadingInvites, setIsLoadingInvites] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchInviteHistory();
    }
  }, [open]);

  const fetchInviteHistory = async () => {
    setIsLoadingInvites(true);
    try {
      // In a real implementation, this would be a fetch from your API
      // For this demo, we're using mock data
      const mockInvites: Invite[] = [
        {
          id: '1',
          invitee_email: 'sample1@example.com',
          sender_id: '123',
          accepted: true,
          accepted_at: '2025-05-01T12:00:00Z',
          created_at: '2025-04-28T09:30:00Z'
        },
        {
          id: '2',
          invitee_email: 'sample2@example.com',
          sender_id: '123',
          accepted: false,
          accepted_at: null,
          created_at: '2025-04-30T14:45:00Z'
        }
      ];

      // In the future, you would replace this with actual data from Supabase
      setInvites(mockInvites);
    } catch (error) {
      console.error('Error fetching invite history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load invite history',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingInvites(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // This would be replaced with an actual call to your edge function
      // For demonstration purposes, we just simulate a successful request
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to local state for immediate UI update
      const newInvite: Invite = {
        id: Date.now().toString(),
        invitee_email: email,
        sender_id: '123', // This would be the current user's ID
        accepted: false,
        accepted_at: null,
        created_at: new Date().toISOString()
      };
      
      setInvites([newInvite, ...invites]);
      
      toast({
        title: 'Invite Sent',
        description: `Invitation sent to ${email}`
      });
      
      // Clear form
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending invite:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invitation',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not accepted yet';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite Users</span>
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Invite Form Section */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message (Optional)
              </label>
              <Textarea
                id="message"
                placeholder="I'd like to invite you to join our workspace..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-20"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full flex items-center justify-center"
            >
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? 'Sending...' : 'Send Invite'}
            </Button>
          </form>
          
          {/* Invite History Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Invite History</h3>
            {isLoadingInvites ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Loading invites...
              </div>
            ) : invites.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No invites sent yet
              </div>
            ) : (
              <ScrollArea className="h-[200px] rounded-md border p-2">
                <div className="space-y-2">
                  {invites.map((invite) => (
                    <div 
                      key={invite.id} 
                      className="border-b border-border pb-2 last:border-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="font-medium text-sm">
                          {invite.invitee_email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Sent: {formatDate(invite.created_at)}
                        </div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span className={invite.accepted ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
                          {invite.accepted ? 'Accepted' : 'Pending'}
                        </span>
                        <span className="text-muted-foreground">
                          {invite.accepted ? `Accepted: ${formatDate(invite.accepted_at)}` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
