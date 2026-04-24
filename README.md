# Word Unscrambler Pro (Next.js 15 + Tailwind)

Production-ready, SEO-optimized word unscrambler with wildcard support, Scrabble scoring, grouped results, advanced filters, shareable URLs, dark mode, and PWA metadata.

## Added Enhancements

- Service worker with offline fallback and dictionary caching (`public/sw.js`)
- Installable PWA prompt button in header
- shadcn component config (`components.json`) with reusable UI primitives

## 1) Local Setup

1. Install Node.js 20+.
2. Open terminal in this project folder.
3. Install dependencies:

```bash
npm install
```

4. Start dev server:

```bash
npm run dev
```

5. Open http://localhost:3000

## 2) Add Full Dictionary File (~400k+ words)

The app already reads from these files:

- `public/dictionaries/words_alpha.txt`
- `public/dictionaries/scrabble_words.txt`

To use a full dictionary:

1. Download a public list such as `dwyl/english-words` (`words_alpha.txt`) and optionally a Scrabble-focused list.
2. Replace the sample files above with full word lists.
3. Keep one word per line, lowercase/uppercase letters only.
4. Restart dev server after replacing very large files.

The app loads dictionary files client-side once and caches in memory.

## 3) Replace AdSense Placeholders

Search for the placeholder IDs in the app:

- `adsense-placeholder-1` (top banner)
- `adsense-placeholder-2` (between input/results)
- `adsense-placeholder-3` and `adsense-placeholder-3-mobile` (sidebar/bottom)

Current placeholders are in `components/ad-placeholder.tsx` and used in `components/unscrambler-app.tsx`.

To activate AdSense:

1. Add your AdSense script in `app/layout.tsx`.
2. Replace placeholder `<div>` sections with your `<ins class="adsbygoogle">` ad unit markup.
3. Keep ads outside result computation paths to preserve instant core UX.

## 4) Deploy to Vercel (Free)

1. Push this project to a GitHub repo.
2. In Vercel, click **Add New Project**.
3. Import your GitHub repo.
4. Framework preset should auto-detect Next.js.
5. Click **Deploy**.
6. Add your production domain (optional).

`vercel.json` is included with useful security headers.

## 5) SEO Actions To Compete For #1 Rankings

1. Set your real domain in metadata files:
   - `app/layout.tsx` (`metadataBase`)
   - `app/robots.ts`
   - `app/sitemap.ts`
2. Keep adding long-tail landing pages via `app/unscramble/[letters]/page.tsx` static params and internal links.
3. Submit sitemap to Google Search Console.
4. Request indexing for homepage and top `/unscramble/{letters}` URLs.
5. Improve CTR with compelling title/description tests.
6. Publish supporting content (how-to pages, game strategy pages).
7. Track Core Web Vitals and fix regressions fast.

## 6) Future Improvements

1. Add offline caching with a service worker for true PWA offline lookups.
2. Add server-generated static pages for top search volume letter combinations.
3. Add multilingual dictionaries and language toggle.
4. Add board-position helper mode (must-use letters, fixed tile positions).
5. Add analytics funnels for search success and filter usage.

## 7) Blog Auto-Publishing Workflow (JSON + RSS)

Blog content is now managed in one file:

- `content/blog-posts.json`

How it works:

1. `backdatedPosts` are published immediately with their explicit `publishedAt` dates.
2. `scheduledDrafts` are automatically assigned publish dates at regular intervals using:
   - `schedule.queueStartDate`
   - `schedule.cadenceDays`
3. Blog pages and sitemap only show posts with publish dates up to "today".
4. No manual route updates are needed when new drafts are added.

RSS feed:

- `https://unscramble.fyi/rss.xml`

To add future posts automatically:

1. Append a new object to `scheduledDrafts` in `content/blog-posts.json`.
2. Keep fields complete: `slug`, `title`, `excerpt`, `tags`, `coverHint`, `content`.
3. Deploy; the post will auto-publish on its assigned cadence date.

## 8) Automatic Weekly Blog Generation (Vercel Cron Jobs)

The blog generation now runs **automatically every Sunday at 2 AM UTC** via Vercel Cron Jobs.

**What it does:**
- Generates weekly strategy posts for the last 6 months automatically
- Updates `content/blog-posts.json` with new posts
- Prevents duplicate posts in the generated date window

**Setup Required:**

1. **Generate a Cron Secret:**
   ```bash
   openssl rand -hex 32
   ```
   This produces a secure random string like: `a3f8b2c1d9e4f6a7b8c9d0e1f2a3b4c5`

2. **Add to Vercel Environment Variables:**
   - Go to Vercel project settings
   - Environment Variables section
   - Add new variable:
     - Name: `CRON_SECRET`
     - Value: Your generated secret (paste the output from step 1)
   - Redeploy your project

3. **Verify Cron Job:**
   - After deployment, check Vercel Dashboard > Cron Jobs
   - You should see: `/api/cron/generate-blog` scheduled for `0 2 * * 0` (Sundays 2 AM UTC)

The endpoint (`/api/cron/generate-blog`) requires the `CRON_SECRET` for security and will only accept requests from Vercel's internal cron scheduler.

## 9) Google AdSense Setup for Monetization

This site is fully configured for Google AdSense with proper compliance policies.

**Current Implementation:**
- AdSense Publisher ID: `ca-pub-6247519976767626`
- Responsive ad placements on blog and content pages
- Compliance disclosure page at `/advertising-disclosure`
- Ad placeholders in strategic locations (blog posts, blog index, main content)

**To Complete AdSense Monetization:**

1. **Create/Connect AdSense Account:**
   - Visit https://www.google.com/adsense/start/
   - Sign in with your Google account
   - Enter your domain
   - Follow verification steps (DNS record or HTML file)

2. **Update Publisher ID:**
   - Once approved, get your Publisher ID from AdSense dashboard
   - Update `ca-pub-6247519976767626` with your actual ID in:
     - `app/layout.tsx` (AdSense script)
     - `components/ad-placeholder.tsx` (data-ad-client)
   - Redeploy

3. **Compliance Checklist:**
   - ✅ AdSense script properly loaded in `app/layout.tsx`
   - ✅ AdSense Privacy Policy linked in footer/policies
   - ✅ Advertising Disclosure page available at `/advertising-disclosure`
   - ✅ Ad density compliant (ads don't exceed 25% of page above fold)
   - ✅ Editorial content clearly separated from ads
   - ✅ No invalid activity (click fraud, impressions from automated traffic)
   - ✅ No policy-violating content (copyright, malware, misleading content)

4. **Supported Ad Formats:**
   - Responsive display ads (automatically size to container)
   - In-article ads (between blog paragraphs)
   - Sidebar ads (desktop only via hidden breakpoints)

5. **Monitoring:**
   - Check AdSense dashboard regularly for performance metrics
   - Monitor for policy violations
   - Track impressions, clicks, and earnings
   - Use Google Search Console to monitor indexing and search traffic

**Ad Placement Locations:**
- `/blog` - Top banner, between post cards, bottom section
- `/blog/[slug]` - Between paragraphs, bottom of article
- Main pages - Configured in layout as needed

**Important AdSense Policies to Follow:**
- No more than 3 ad units per page
- No ads on error pages or 404s
- No ads covering core content
- No misleading labels ("Ads by Google" displays automatically)
- No click-bait or forced interactions
- No scripts that modify ad display
- Keep content original and valuable

## 10) Six-Month Blog Display Policy

The blog page now displays only posts from the last 6 months to keep content fresh and relevant.

**Configuration:**
- Function: `getPublishedBlogPostsLastSixMonths()` in `lib/blog.ts`
- Used in: `/app/blog/page.tsx`
- Automatic filtering based on current date

**Full Archive:**
- Users can access older posts by searching or visiting direct URLs
- Historical posts remain indexed and accessible
- Blog API (`getBlogPostBySlug()`) returns all published posts regardless of date

This creates a balance between promoting recent quality content while maintaining SEO value of older posts.

## Tech Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS
- shadcn-inspired UI primitives
- next-themes (dark/light)
- sonner (toasts)
- lucide-react icons

## PWA Verification Checklist

1. Run the app in production mode (`npm run build` then `npm run start`).
2. Open DevTools > Application > Service Workers and verify `sw.js` is active.
3. Open DevTools > Application > Manifest and verify installability checks pass.
4. Trigger install using the header install button.
5. Go offline in DevTools and refresh to confirm `offline.html` fallback loads.

## Notes

- Core unscrambling remains client-side and instant.
- Wildcards support up to 4 `?` blank tiles.
- Results are grouped by length with Scrabble score labels and copy controls.

