
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface Invite {
  id: string;
  invitee_email: string;
  created_at: string;
  accepted: boolean;
  accepted_at: string | null;
}

export default function InviteHistory() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  // Function to format time in a human-readable way
  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return 'N/A';
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  // Function to fetch user invites
  const fetchInvites = async () => {
    try {
      // For now, we'll use mock data since we don't have access to the actual table
      // In a production environment, you would replace this with an actual query
      // to the appropriate table or a custom edge function
      
      // Mock data for development and testing
      const mockInvites: Invite[] = [
        {
          id: '1',
          invitee_email: 'friend1@example.com',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          accepted: true,
          accepted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          invitee_email: 'friend2@example.com',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          accepted: false,
          accepted_at: null
        }
      ];
      
      setInvites(mockInvites);
    } catch (error: any) {
      console.error('Error fetching invites:', error);
      toast({
        title: "Failed to load invites",
        description: error.message || "There was an error loading your invites.",
        variant: "destructive"
      });
      
      // Fallback to mock data on error
      const mockInvites: Invite[] = [
        {
          id: '1',
          invitee_email: 'friend1@example.com',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          accepted: true,
          accepted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          invitee_email: 'friend2@example.com',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          accepted: false,
          accepted_at: null
        }
      ];
      setInvites(mockInvites);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to resend an invitation
  const handleResend = async (invite: Invite) => {
    setResending(prev => ({ ...prev, [invite.id]: true }));
    
    try {
      const { error } = await supabase.functions.invoke('send-user-invite', {
        body: {
          recipientEmail: invite.invitee_email,
          resend: true
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Invitation resent!",
        description: `An invite has been resent to ${invite.invitee_email}.`,
      });
      
      // Refresh the invites list
      fetchInvites();
      
    } catch (error: any) {
      toast({
        title: "Failed to resend invitation",
        description: error.message || "There was an error resending the invitation.",
        variant: "destructive"
      });
    } finally {
      setResending(prev => ({ ...prev, [invite.id]: false }));
    }
  };
  
  // Check if an invite can be resent (not within the last hour)
  const canResend = (invite: Invite) => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    return new Date(invite.created_at) < oneHourAgo && !invite.accepted;
  };
  
  useEffect(() => {
    fetchInvites();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (invites.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        You haven't sent any invites yet.
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <TableRow key={invite.id}>
              <TableCell className="font-medium">{invite.invitee_email}</TableCell>
              <TableCell>{formatTime(invite.created_at)}</TableCell>
              <TableCell>
                {invite.accepted ? (
                  <span className="text-green-500 flex items-center">
                    ✅ Accepted {formatTime(invite.accepted_at)}
                  </span>
                ) : (
                  <span className="text-amber-500">Pending</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResend(invite)}
                  disabled={!canResend(invite) || resending[invite.id]}
                >
                  {resending[invite.id] ? (
                    <>
                      <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Resend'
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
