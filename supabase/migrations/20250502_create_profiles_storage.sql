

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'Profile Photos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the profiles bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profiles' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own profile photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profiles' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own profile photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'profiles' AND auth.uid() = owner);

