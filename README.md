# Rizka Amelia — Portfolio (Blush Atelier · Tulip Garden)

Multi-page personal portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion** and **Redux Toolkit** (EN/ID language + day/night theme). Deploy target: **Vercel**, custom domain via **Cloudflare**.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

Requires Node.js 20.9+.

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, selected works, footer CTA |
| `/about` | About — values, my journey |
| `/education` | Education — timeline, thesis |
| `/experience` | Experience — all roles |
| `/experience/[slug]` | `i-love-emas`, `agronesia-bmc`, `makeup-artist` (beauty gallery), `model-talent` |
| `/skills` | Skills |
| `/organization` | Organization — leadership roles |
| `/speaking` | Speaking — events, highlights |
| `/projects` | Projects |
| `/projects/[slug]` | `sop-hedonic-testing`, `momies-bakery` |
| `/certificates` | Certificates (lightbox + BNSP PDF) |
| `/contact` | Contact |
| 404 | `app/not-found.tsx` |

## Project structure

```
app/                     routes, layout, sitemap.ts, robots.ts, icon.svg
components/
  layout/                Navbar (search, EN/ID, day/night), Background, FooterCTA
  sections/              SectionHero (shared inner-page template), Gallery (PhotoGrid + Lightbox)
  decor/                 TulipCluster/TulipCorner, Polaroid, MaskedImage, RotatingBadge, LineIcon
  ui/                    primitives (Eyebrow, SerifTitle, PillLink, Chip, Card), Reveal/Stagger
  views/                 one client view per page
  providers/Providers    Redux store + MotionConfig + preference sync
lib/
  content.ts             ALL copy (EN + ID), photos and links — edit here
  i18n.ts                shared UI strings + types
  store.ts               Redux Toolkit: lang + theme slices, useT() hook
  seo.ts                 per-page metadata helper, sitemap routes, Person JSON-LD
  theme-script.ts        no-flash script for the night theme
public/images/           optimized photos (grouped by section)
public/docs/             CV and BNSP certificate PDFs
public/og.jpg            1200×630 social preview
```

## Editing content

Everything visible on the site lives in `lib/content.ts`. Each text is `{ en: '...', id: '...' }`.
Items marked `[to be completed]` / `TODO(Rizka)` (thesis details) still need Rizka's input.

## Language & night theme (Redux)

- `lib/store.ts` has two slices: `lang` (`en` | `id`) and `theme` (`light` | `dark`).
- `useT()` returns `{ lang, t }`; `t({ en, id })` picks the current language.
- Choices are saved in `localStorage` (`ra-lang`, `ra-theme`). The first visit follows the device's dark-mode setting.
- `lib/theme-script.ts` runs before hydration, so the night theme never flashes light.
- Night colors are CSS variables under `[data-theme='dark']` in `app/globals.css`; Tailwind's `dark:` variant follows the same attribute.

## Swapping in painted tulips

The tulips are drawn in SVG (`components/decor/TulipCluster.tsx`). For a closer match to the reference, add transparent watercolor PNGs to `public/images/tulips/` and pass `src`:

```tsx
<TulipCluster side="left" src="/images/tulips/corner-left.png" />
```

## SEO checklist

Already included:
- Per-page `title`, `description`, canonical URL, Open Graph and Twitter cards (`lib/seo.ts`)
- `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`)
- `schema.org/Person` JSON-LD in the root layout
- Static generation for every page (including `[slug]` routes), optimized images via `next/image`, semantic headings, alt text, skip link

After deploying:
1. Set `NEXT_PUBLIC_SITE_URL` to the final domain (it drives canonical URLs and the sitemap).
2. Add the domain to **Google Search Console**, verify it (DNS TXT in Cloudflare, or the `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` meta tag), then submit `https://<domain>/sitemap.xml`.
3. Test the preview at <https://www.opengraph.xyz> and rich results at <https://search.google.com/test/rich-results>.

Note: the EN/ID switch is client-side, so search engines index the English version. If Indonesian search traffic matters, the next step is locale routes (`/id/...`) with `hreflang` alternates.

## Deploy: Vercel + Cloudflare domain

1. Push to GitHub → **Vercel → Add New Project** → import the repo (framework auto-detected).
2. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**.
3. **Vercel → Settings → Domains** → add `yourdomain.com` and `www.yourdomain.com`. Vercel shows the exact records to create.
4. In **Cloudflare → DNS**, add the records Vercel shows (typically an `A` record for the apex and a `CNAME` for `www`).
   Set them to **DNS only (grey cloud)** so Vercel can issue the SSL certificate.
   If you prefer the orange-cloud proxy, set Cloudflare **SSL/TLS → Full (strict)**.
5. Redeploy once `NEXT_PUBLIC_SITE_URL` points to the final domain.
