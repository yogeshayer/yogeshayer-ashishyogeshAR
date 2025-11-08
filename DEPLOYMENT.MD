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

## Build Configuration

The following files have been added to fix Next.js 16 and Vercel build warnings:

- **proxy.js**: Replaces deprecated middleware.ts (Next.js 16 convention)
- **.npmrc**: Allows sharp package to run build scripts for image optimization

## AI Features Setup

The plant identification feature uses Vercel AI Gateway which requires:
- A credit card on file with Vercel (free tier available)
- Visit [Vercel AI Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card) to add payment method
- Free AI credits are provided after adding card

## Troubleshooting

### Error: "Your project's URL and Key are required to create a Supabase client"
- Double-check that you've added both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure the variable names are exactly correct (case-sensitive)
- Redeploy your project after adding environment variables

### Warning: "The middleware file convention is deprecated"
- Fixed: The app now uses proxy.js instead of middleware.ts

### Warning: "Ignored build scripts: sharp"
- Fixed: Added .npmrc configuration to allow sharp build scripts
- Sharp is required for Next.js image optimization

### Error: "AI Gateway requires credit card"
- Visit the AI settings link in the error message
- Add a credit card to unlock free AI credits
- No charges will be made within the free tier limits
