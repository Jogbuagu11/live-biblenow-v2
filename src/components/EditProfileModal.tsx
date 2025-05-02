
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, User } from "lucide-react";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBio?: string;
  currentImageUrl?: string;
  onProfileUpdated: (bio: string, imageUrl: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ 
  open,
  onOpenChange,
  currentBio = '',
  currentImageUrl = '',
  onProfileUpdated
}) => {
  const [bio, setBio] = useState(currentBio);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Update state when props change
  useEffect(() => {
    setBio(currentBio);
    setImageUrl(currentImageUrl);
  }, [currentBio, currentImageUrl, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      console.log("Save button clicked, starting profile update");
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw userError;
      }
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to update your profile.",
          variant: "destructive",
        });
        return;
      }

      console.log("User authenticated:", user.id);
      let updatedImageUrl = imageUrl;

      // If there's an existing image and it's different from the placeholder, delete it
      if (file && currentImageUrl && currentImageUrl.includes('profiles/')) {
        const oldFilePath = currentImageUrl.split('profiles/').pop();
        if (oldFilePath) {
          console.log("Attempting to remove old profile photo:", oldFilePath);
          await supabase.storage.from('profiles').remove([oldFilePath]);
        }
      }

      // Upload image if a new one is selected
      if (file) {
        console.log("Uploading new profile photo");
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('profiles')
          .upload(filePath, file);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
        
        console.log("Upload successful, getting public URL");
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('profiles')
          .getPublicUrl(filePath);
        
        updatedImageUrl = publicUrl;
        console.log("New image URL:", updatedImageUrl);
      }
      
      // Update the profile in the database
      console.log("Updating profile in database");
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          bio,
          profile_photo_url: updatedImageUrl,
          updated_at: new Date().toISOString(),
        });
      
      if (error) {
        console.error('Upsert error:', error);
        throw error;
      }
      
      console.log("Profile updated successfully");
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      onProfileUpdated(bio, updatedImageUrl);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt="Profile" />
              ) : (
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="flex items-center">
              <Label htmlFor="picture" className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2">
                <Upload size={16} />
                Upload Photo
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/200 characters
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
