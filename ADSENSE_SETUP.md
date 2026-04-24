# Google AdSense & Blog Automation Setup Checklist

This document outlines all the changes made to your site and what you need to do to complete the setup.

## ✅ Completed Implementations

### Blog System Enhancements
- [x] 6-month blog post filtering implemented in `lib/blog.ts`
- [x] Blog page updated to display only last 6 months of posts
- [x] Ad placements added to blog index page
- [x] Ad placements added to blog post detail pages
- [x] Improved blog excerpt showing 6-month timeframe

### Automatic Weekly Blog Generation
- [x] Created cron endpoint: `/api/cron/generate-blog` route handler
- [x] Updated `vercel.json` with cron job configuration
- [x] Scheduled for: **Every Sunday at 2 AM UTC** (`0 2 * * 0`)
- [x] Added security token verification (CRON_SECRET)

### Google AdSense Setup
- [x] AdSense script already in `app/layout.tsx`
- [x] Meta tag for AdSense account in layout
- [x] `AdPlaceholder` component properly configured with your pub ID
- [x] Ad placements on blog pages (3 positions per page type)
- [x] Comprehensive advertising disclosure page at `/advertising-disclosure`
- [x] Updated compliance documentation

### Environment & Documentation
- [x] Created `.env.example` with required variables
- [x] Updated `README.md` with setup instructions
- [x] Added blog automation section to README
- [x] Added AdSense monetization guide to README
- [x] Added cron job setup guide to README

---

## 🔧 Required Setup Steps

### Step 1: Generate and Set Cron Secret (5 minutes)

**On your local machine or terminal:**

```bash
# Generate a secure random secret
openssl rand -hex 32
```

Example output:
```
a3f8b2c1d9e4f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
```

**In Vercel Dashboard:**

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name:** `CRON_SECRET`
   - **Value:** Paste your generated secret from above
4. Save and redeploy your project

### Step 2: Verify Cron Job Setup (2 minutes)

1. After deployment, go to Vercel Dashboard
2. Navigate to **Cron Jobs** tab
3. Verify you see:
   - **Path:** `/api/cron/generate-blog`
   - **Schedule:** `0 2 * * 0` (Sundays 2 AM UTC)
4. Status should show as "Ready"

### Step 3: Get Your Google AdSense Publisher ID (10 minutes)

1. Go to https://www.google.com/adsense/start/
2. Sign in with your Google account
3. Enter your domain (`unscramble.fyi` or verify your custom domain setup)
4. Complete verification:
   - **Option A:** Add DNS record (recommended)
   - **Option B:** Upload HTML verification file to your site
5. Wait for verification (usually 24-48 hours, sometimes instant)
6. Once approved, go to **AdSense Dashboard > Settings > Account**
7. Copy your **Publisher ID** (format: `ca-pub-xxxxxxxxxxxxxxxxxx`)

### Step 4: Update Publisher ID (2 minutes)

Once you have your Google AdSense Publisher ID, update these files:

**File 1: `app/layout.tsx`**
- Find the line: `src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6247519976767626"`
- Replace `ca-pub-6247519976767626` with your Publisher ID

**File 2: `components/ad-placeholder.tsx`**
- Find the line: `data-ad-client="ca-pub-6247519976767626"`
- Replace `ca-pub-6247519976767626` with your Publisher ID

Then redeploy to Vercel.

### Step 5: Start Earning! (Ongoing)

1. Monitor your AdSense Dashboard for:
   - Impressions (page views showing ads)
   - Clicks (users clicking on ads)
   - Estimated Earnings (revenue generated)
   - Performance metrics

2. Keep content fresh:
   - The blog will automatically generate posts every Sunday
   - Check `/blog` to see recent posts
   - Older posts remain accessible for SEO value

3. Maintain compliance:
   - Review `/advertising-disclosure` page
   - Ensure no policy violations
   - Monitor for invalid traffic patterns

---

## 📊 What's Now Automatic

### Weekly Blog Generation
Every Sunday at 2 AM UTC:
- Script generates Scrabble strategy posts automatically
- Posts are added to `content/blog-posts.json`
- Published date is automatically assigned
- No manual intervention needed!

### Blog Display
- `/blog` page shows posts from last 6 months
- Older posts remain searchable and accessible
- RSS feed includes all published posts

### Ad Placements
- Blog index: 3 ad positions (top, middle, bottom)
- Blog posts: ads between paragraphs
- All ads respect user experience and Google AdSense policies

---

## 💡 Troubleshooting

### Cron Job Not Running
- Check `CRON_SECRET` is set in Vercel environment variables
- Verify the secret value has no extra spaces
- Redeploy your project after setting the variable
- Check Vercel Cron Jobs tab for status

### No Ad Revenue
- Wait 2-4 weeks for significant traffic/impressions
- Ensure blog content is being indexed by Google
- Check AdSense dashboard for policy violations
- Monitor Core Web Vitals and page performance

### Blog Posts Not Appearing
- Check `content/blog-posts.json` file
- Verify posts have correct `publishedAt` dates
- Run cron job manually for testing (with valid CRON_SECRET)
- Check browser console for errors

---

## 🔐 Security Notes

- **CRON_SECRET**: Keep this secret! Only Vercel's cron service should have it
- **Publisher ID**: Safe to keep in your code (it's meant to be public)
- **No API keys in repository**: Always use environment variables for secrets

---

## 📚 Additional Resources

- [Google AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [Vercel Cron Documentation](https://vercel.com/docs/cron-jobs)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

---

## 🎯 Next Steps (Optional but Recommended)

1. **Boost Traffic:**
   - Add more blog posts manually to build content library
   - Optimize existing content for SEO
   - Build backlinks to your domain

2. **Improve Monetization:**
   - Enable Google AdSense for specific geographic regions
   - Experiment with ad placement positions
   - Test different ad formats (native ads, etc.)

3. **Enhance Blog:**
   - Add author bio to blog posts
   - Add related posts recommendations
   - Add social sharing buttons

---

**Last Updated:** April 24, 2026
