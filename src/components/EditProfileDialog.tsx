
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader2 } from "lucide-react";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBio: string;
  currentAvatar: string | null;
  onProfileUpdated: () => void;
}

const MAX_BIO_LENGTH = 280;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  currentBio,
  currentAvatar,
  onProfileUpdated
}) => {
  const [bio, setBio] = useState(currentBio);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(currentAvatar);

  useEffect(() => {
    setBio(currentBio);
    setAvatarUrl(currentAvatar);
    setAvatarPreview(currentAvatar);
    setAvatarFile(null);
  }, [currentBio, currentAvatar, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    setAvatarFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = e.target.value;
    if (newBio.length <= MAX_BIO_LENGTH) {
      setBio(newBio);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          title: "Authentication error",
          description: "Please log in to update your profile.",
          variant: "destructive"
        });
        return;
      }
      
      const userId = session.user.id;
      let newAvatarUrl = avatarUrl;
      
      // Upload avatar if a new one was selected
      if (avatarFile) {
        const filePath = `${userId}/${Date.now()}-${avatarFile.name}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
          
        newAvatarUrl = publicUrl;
      }
      
      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          bio: bio,
          avatar_url: newAvatarUrl
        })
        .eq('id', userId);
        
      if (updateError) {
        throw new Error(`Error updating profile: ${updateError.message}`);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
      
      onOpenChange(false);
      onProfileUpdated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} alt="Profile avatar" />
              ) : (
                <AvatarFallback className="text-2xl">
                  {/* Default initials or placeholder */}
                  JD
                </AvatarFallback>
              )}
            </Avatar>
            
            <div>
              <Label htmlFor="avatar" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md">
                <Upload className="h-4 w-4" />
                Change Photo
              </Label>
              <input 
                type="file"
                id="avatar"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                JPG or PNG. Max 5MB.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={handleBioChange}
              placeholder="Tell us about yourself..."
              className="resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/{MAX_BIO_LENGTH}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
