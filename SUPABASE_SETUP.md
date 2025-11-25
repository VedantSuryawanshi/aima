# Supabase Setup Guide

This guide will help you set up Supabase for the EV Parking application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `ev-parking` (or any name you prefer)
   - Database Password: Create a strong password (save this!)
   - Region: Choose the closest region to you
5. Click "Create new project" and wait for it to be ready (takes 1-2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Configure the Application

1. Open `config.js` in your project
2. Replace the placeholder values:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'YOUR_SUPABASE_URL', // Paste your Project URL here
       anonKey: 'YOUR_SUPABASE_ANON_KEY' // Paste your anon key here
   };
   ```

## Step 4: Create the Database Table

1. In Supabase dashboard, go to **SQL Editor** (in the sidebar)
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Create submissions table
CREATE TABLE submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    vehicle_number TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write (for this demo)
-- In production, you should use authenticated users and proper policies
CREATE POLICY "Allow public insert" ON submissions
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public select" ON submissions
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public update" ON submissions
    FOR UPDATE
    USING (true);
```

4. Click "Run" to execute the SQL

## Step 5: Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage** (in the sidebar)
2. Click "Create a new bucket"
3. Configure:
   - **Name**: `ev-parking-photos`
   - **Public bucket**: ✅ Check this (so images can be accessed publicly)
4. Click "Create bucket"
5. Go to **Policies** tab for the bucket
6. Click "New Policy" → "For full customization"
7. Create an INSERT policy:
   - Policy name: `Allow public uploads`
   - Allowed operation: `INSERT`
   - Policy definition:
   ```sql
   (bucket_id = 'ev-parking-photos')
   ```
   - With check expression: `true`
8. Click "Review" and "Save policy"

## Step 6: Test the Application

1. Open `index.html` in your browser
2. Fill out the form and submit
3. Check your Supabase dashboard:
   - **Table Editor** → `submissions` table should show your entry
   - **Storage** → `ev-parking-photos` bucket should contain your image
4. Go to `admin.html` and login with password: `admin123`
5. Approve a submission
6. Open `approved.html` to see the slideshow

## Troubleshooting

### Images not uploading?
- Check that the storage bucket is public
- Verify the bucket name matches exactly: `ev-parking-photos`
- Check browser console for errors

### Can't insert submissions?
- Verify RLS policies are set correctly
- Check that the table was created successfully
- Look at the Supabase logs in the dashboard

### Slideshow not showing approved entries?
- Make sure submissions are marked as 'approved' in the admin panel
- Check browser console for any errors
- Verify the Supabase config is correct

## Security Notes

⚠️ **Important**: The current setup uses public access for simplicity. For production:

1. Use authenticated users instead of public access
2. Implement proper RLS policies
3. Use service role key only on the server side
4. Add rate limiting
5. Validate and sanitize all inputs

## Need Help?

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)

