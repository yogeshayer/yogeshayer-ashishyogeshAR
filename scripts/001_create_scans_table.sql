-- Create scans table to store plant scan history
CREATE TABLE IF NOT EXISTS scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plant_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  origin TEXT NOT NULL,
  description TEXT NOT NULL,
  care_tips TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Create policies for CRUD operations
CREATE POLICY "Users can view their own scans" 
  ON scans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans" 
  ON scans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scans" 
  ON scans FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scans" 
  ON scans FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_created_at ON scans(created_at DESC);
