# Aduoer Landing Page

A bilingual landing page for Aduoer Music, built with Astro, React, TypeScript,
and Sass.

## Local development

```bash
corepack pnpm@9.15.9 install --frozen-lockfile
corepack pnpm@9.15.9 dev
```

## Production build

```bash
corepack pnpm@9.15.9 build
```

Pushes to `main` are built and deployed to GitHub Pages by
`.github/workflows/deploy-pages.yml`.

All product screenshots in `public/screenshots/aduoer-*.png` are captured from
the iOS Simulator and use a local WoW mock API with entirely fictional music,
artist, album, playlist, artwork, and lyric data.

## Search indexing

The canonical production URL is `https://aduoer.app`. Each build generates
`dist/sitemap-index.xml` and `dist/sitemap-0.xml` from the site's pages using
`@astrojs/sitemap`, and copies `public/robots.txt` to `dist/robots.txt`.
New pages are included automatically.

After deploying, verify the `aduoer.waizx.com` property in Google Search Console
and submit `https://aduoer.app/sitemap-index.xml` under **Sitemaps**.
The docs site has its own sitemap and should be submitted under its own property
or a domain property covering both sites.
