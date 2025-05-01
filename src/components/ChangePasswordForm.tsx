
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from 'lucide-react';

export const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      });
      return false;
    }

    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      });
      return false;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters",
        variant: "destructive",
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
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
        navigate('/auth');
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
          description: "Incorrect current password",
          variant: "destructive",
        });
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        toast({
          title: "Error",
          description: `Failed to update password: ${updateError.message}`,
          variant: "destructive",
        });
        return;
      }

      // Success
      toast({
        title: "Success",
        description: "Password updated. Please log in again with your new password.",
      });

      // Sign out user and redirect to login
      await supabase.auth.signOut();
      navigate('/auth');
      
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
    <form onSubmit={handleChangePassword} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-1">
          Current Password
        </label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter your current password"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-1">
          New Password
        </label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
          Confirm New Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
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
          "Change Password"
        )}
      </Button>
    </form>
  );
};
