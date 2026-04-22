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

- `https://word-unscrambler-pro.vercel.app/rss.xml`

To add future posts automatically:

1. Append a new object to `scheduledDrafts` in `content/blog-posts.json`.
2. Keep fields complete: `slug`, `title`, `excerpt`, `tags`, `coverHint`, `content`.
3. Deploy; the post will auto-publish on its assigned cadence date.

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
