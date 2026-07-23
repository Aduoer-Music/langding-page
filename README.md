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
