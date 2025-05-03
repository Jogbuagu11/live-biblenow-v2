
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { Check, RefreshCw } from 'lucide-react';

export default function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const [sentEmails, setSentEmails] = useState<Record<string, number>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this email was sent to recently (within the last hour)
    const lastSentTime = sentEmails[email] || 0;
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    if (lastSentTime > oneHourAgo) {
      const minutesLeft = Math.ceil((lastSentTime - oneHourAgo) / (60 * 1000));
      toast({
        title: "Please wait before resending",
        description: `You can send another invite to this email in ${minutesLeft} minutes.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-user-invite', {
        body: {
          recipientEmail: email,
          message: message.trim() || "I'd like to invite you to join Bible Now!",
        }
      });
      
      if (error) throw error;
      
      // Update the sent emails record
      setSentEmails(prev => ({
        ...prev,
        [email]: Date.now()
      }));
      
      toast({
        title: "Invitation sent!",
        description: `An invite has been sent to ${email}.`,
      });
      
      // Clear the form
      setEmail('');
      setMessage('');
      
    } catch (error: any) {
      toast({
        title: "Failed to send invitation",
        description: error.message || "There was an error sending the invitation.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Friend's Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="friend@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Personal Message (Optional)
        </label>
        <Textarea
          id="message"
          placeholder="I'd like to invite you to join Bible Now!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSending} 
        className="w-full"
      >
        {isSending ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
            Sending...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" /> 
            Send Invite
          </>
        )}
      </Button>
    </form>
  );
}
