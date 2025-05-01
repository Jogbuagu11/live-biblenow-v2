
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from 'lucide-react';

export const UpdateEmailForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      });
      return false;
    }

    if (!newEmail) {
      toast({
        title: "Error",
        description: "Please enter a new email address",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Get current user's email
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !user.email) {
        toast({
          title: "Error",
          description: "User session not found. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      // Check if new email is the same as current email
      if (user.email === newEmail) {
        toast({
          title: "Error",
          description: "The new email is the same as your current email",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Re-authenticate the user with current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        toast({
          title: "Error",
          description: "Incorrect password",
          variant: "destructive",
        });
        return;
      }

      // Update email
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (updateError) {
        toast({
          title: "Error",
          description: `Email update failed: ${updateError.message}`,
          variant: "destructive",
        });
        return;
      }

      // Success
      toast({
        title: "Success",
        description: "A confirmation email has been sent to your new address. Please check your inbox.",
      });
      
      // Reset form
      setCurrentPassword('');
      setNewEmail('');
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: `An unexpected error occurred: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdateEmail} className="space-y-4">
      <div>
        <label htmlFor="currentPasswordEmail" className="block text-sm font-medium text-foreground mb-1">
          Current Password
        </label>
        <Input
          id="currentPasswordEmail"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter your current password"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="newEmail" className="block text-sm font-medium text-foreground mb-1">
          New Email Address
        </label>
        <Input
          id="newEmail"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter your new email address"
          disabled={isLoading}
        />
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Email"
        )}
      </Button>
    </form>
  );
};
