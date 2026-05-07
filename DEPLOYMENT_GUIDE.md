# 🚀 Fertilite IVF Funnel - Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

---

## Step 1: Push to GitHub

### Option A: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if you haven't
# macOS: brew install gh
# Windows: winget install GitHub.CLI

# Login to GitHub
gh auth login

# Create new repo and push
gh repo create fertilite-ivf-funnel --public --source=. --remote=origin --push
```

### Option B: Using Git + GitHub Web
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Fertilite IVF funnel with Supabase backend"

# Go to github.com and create a new repository called "fertilite-ivf-funnel"
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/fertilite-ivf-funnel.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Via Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `fertilite-ivf-funnel`
4. Vercel will auto-detect **Vite** settings ✅
5. **Add Environment Variables:**
   - `VITE_SUPABASE_URL` = `https://mimwhojyxpeerfqtgmic.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbXdob2p5eHBlZXJmcXRnbWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODk4NzcsImV4cCI6MjA4OTQ2NTg3N30.OvwPkGF7aXkG4Carl8ImnGs9tHCFZV1ukn5F7tVZWCE`
6. Click **"Deploy"**

### Via Vercel CLI (Alternative)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: fertilite-ivf-funnel
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## Step 3: Add Custom Domain

### In Vercel Dashboard:
1. Go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `start.fertilite.com` or `ivf.fertilite.com`)
3. Vercel will show you DNS records to add:
   - **Type:** CNAME
   - **Name:** start (or ivf)
   - **Value:** cname.vercel-dns.com

### In Your DNS Provider (GoDaddy/Cloudflare/etc):
1. Log in to your domain provider
2. Go to DNS settings
3. Add the CNAME record Vercel gave you
4. Wait 5-60 minutes for DNS propagation

---

## Step 4: Test Your Deployment

### Verify the Funnel Works:
1. Visit your Vercel URL (e.g., `fertilite-ivf-funnel.vercel.app`)
2. **Test the full flow:**
   - Click "Start Your Journey"
   - Go through all steps
   - Submit on contact form
   - Check `/results` page

### Verify Database Integration:
1. Go to **Supabase Dashboard** → **Table Editor**
2. Open the `leads` table
3. You should see your test lead with:
   - ✅ Contact info (first_name, email, phone)
   - ✅ Funnel responses (location, age_range, timeline, etc.)
   - ✅ Lead score
   - ✅ UTM parameters

### Verify Coordinator Dashboard:
1. In Supabase, open the `coordinator_dashboard` view
2. You should see your test lead with:
   - Priority label (🔥 HOT, 🟡 WARM, etc.)
   - SLA status (✅ On Time / ⚠️ OVERDUE)
   - Hours old

---

## Step 5: Update Ad Campaign URLs

### Add UTM Parameters to Track Sources:

**Facebook Ads:**
```
https://start.fertilite.com?utm_source=facebook&utm_medium=cpc&utm_campaign=ivf_spring_2026
```

**Google Ads:**
```
https://start.fertilite.com?utm_source=google&utm_medium=cpc&utm_campaign=ivf_search
```

**Instagram:**
```
https://start.fertilite.com?utm_source=instagram&utm_medium=social&utm_campaign=ivf_awareness
```

These will be captured automatically and stored in the `leads` table!

---

## Environment Variables Reference

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `VITE_SUPABASE_URL` | `https://mimwhojyxpeerfqtgmic.supabase.co` | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` (starts with eyJ) | Supabase Dashboard → Settings → API → anon public |

---

## Continuous Deployment (Auto-Deploy on Push)

Once connected to Vercel:
1. Make changes locally
2. Commit: `git commit -am "Update hero image"`
3. Push: `git push`
4. Vercel automatically deploys ✅

Changes go live in ~1-2 minutes!

---

## Troubleshooting

### Build Fails on Vercel
- **Check:** Build logs in Vercel dashboard
- **Common fix:** Ensure all dependencies in `package.json`
- **Command:** `pnpm install && pnpm build`

### Funnel Loads But Doesn't Save Leads
- **Check:** Environment variables are set in Vercel
- **Check:** Supabase Edge Function is deployed
- **Check:** Browser console for errors

### 404 on Routes (e.g., /step-2)
- **Fix:** Vercel should auto-detect Vite SPA routing
- **Manual fix:** Add `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### Images Not Loading
- **Check:** Image URLs in components
- **Fix:** Use relative paths or update image config

---

## Performance & SEO (Optional)

### Add to `index.html`:
```html
<meta name="description" content="Affordable IVF treatment in Tijuana. Save 40-60% with Fertilite's experienced specialists.">
<meta property="og:title" content="Fertilite IVF - Affordable Treatment in Tijuana">
<meta property="og:description" content="Premium IVF care at honest prices. Minutes from San Diego.">
<meta property="og:image" content="https://your-site.com/og-image.jpg">
```

### Add Analytics:
1. Google Analytics: Add tracking code to `index.html`
2. Facebook Pixel: Add to `index.html`
3. Or use Vercel Analytics (built-in)

---

## Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)

---

## Next Steps After Deployment

1. ✅ Test full funnel with real data
2. ✅ Set up coordinator dashboard views in Supabase
3. ✅ Configure domain (start.fertilite.com)
4. ✅ Update ad campaigns with new URL
5. ✅ Monitor leads in Supabase dashboard
6. ✅ Set up email notifications (optional)
7. ✅ Add Google Analytics (optional)

Your funnel is now live and connected to the same Supabase backend! 🎉
