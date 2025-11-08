# Deploying Flora Scans to Vercel

## Required Environment Variables

When deploying to Vercel, you need to add the following environment variables in your Vercel project settings:

### Supabase Configuration (Required)

Go to your Vercel project → Settings → Environment Variables and add:

1. `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase project URL (e.g., `https://your-project.supabase.co`)
   - Find it at: [Supabase Dashboard](https://app.supabase.com/project/_/settings/api) → Project Settings → API

2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase anonymous/public key
   - Find it at: [Supabase Dashboard](https://app.supabase.com/project/_/settings/api) → Project Settings → API

### Optional Environment Variables

3. `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (for development)
   - Value: `http://localhost:3000` (or your local dev URL)
   - Only needed if you want email redirects to work in development

## Steps to Deploy

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Deploy Flora Scans"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables**
   - After deployment (or before), go to your project settings
   - Navigate to Settings → Environment Variables
   - Add the required Supabase variables listed above
   - Click "Redeploy" to apply the changes

4. **Update Supabase Auth Settings**
   - Go to your [Supabase Dashboard](https://app.supabase.com/project/_/auth/url-configuration)
   - Add your Vercel deployment URL to "Site URL"
   - Add `https://your-app.vercel.app/**` to "Redirect URLs"

## Troubleshooting

If you see errors like "Your project's URL and Key are required to create a Supabase client":
- Double-check that you've added both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure the variable names are exactly correct (case-sensitive)
- Redeploy your project after adding environment variables
