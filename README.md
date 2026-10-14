# Aduoer Landing Page

The marketing site for Aduoer Music, built with Astro, React, TypeScript and
Sass. The home page is available in Simplified Chinese, Traditional Chinese,
English, Japanese, Korean and German (auto-detected from the browser, with a
switcher in the navigation). Legal pages remain bilingual (Chinese / English).

## Local development

```bash
corepack pnpm@9.15.9 install --frozen-lockfile
corepack pnpm@9.15.9 dev
```

## Production build

```bash
corepack pnpm@9.15.9 build
```

Pushes to `main` are deployed automatically by CI.

## Interactive demo

`src/modules/home/PhoneDemo.tsx` reproduces the iPhone player flow (mini
player → now playing → lyrics → swipe to dismiss) with the same timings the app
uses (`.smooth(0.35)` for presentation, `.smooth(0.45)` for the artwork morph,
`.snappy(0.5)` when a drag is released). The layers live in
`public/screenshots/iphone-*.webp`; `iphone-artwork.webp` is the album art
cropped from the player capture and `iphone-status.png` carries the status bar
glyphs so they stay put while the artwork animates. Mac and iPad captures use a
local mock source with fictional music data.

## Search indexing

The canonical production URL is `https://aduoer.app`. Each build generates
`dist/sitemap-index.xml` and `dist/sitemap-0.xml` from the site's pages using
`@astrojs/sitemap`, and copies `public/robots.txt` to `dist/robots.txt`.
New pages are included automatically.

After deploying, verify the `aduoer.waizx.com` property in Google Search Console
and submit `https://aduoer.app/sitemap-index.xml` under **Sitemaps**.
The docs site has its own sitemap and should be submitted under its own property
or a domain property covering both sites.
