# CLAUDE.md

Project context for AI agents working on this codebase.

## What is this?

markup.tips is a static documentation site hosting web standards rules — performance-first, accessibility-first patterns distilled from the [pantry-host](https://github.com/jpdevries/pantry-host) codebase (which achieved Lighthouse 97). Each rule is a self-contained markdown file an agent can apply without reading a full codebase.

Live at: https://markup.tips

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Rex (`@limlabs/rex`) — Next.js Pages Router reimplemented in Rust |
| Frontend | React 18, TypeScript |
| Styling | Tailwind v4 (built into Rex binary) + CSS custom property design tokens |
| Icons | `@phosphor-icons/react` |
| Syntax highlighting | Prism.js (loaded client-side from `public/prism.js`, not bundled) |
| Content | MDX files in `pages/rules/` (compiled by Rex at build time) |
| Deployment | Cloudflare Pages via `rex export` → static HTML |

## Project structure

```
markuptips/
├── pages/
│   ├── _document.tsx              # HTML shell, FOUC-prevention script
│   ├── _app.tsx                   # App shell (Nav + Footer, prose wrapper for MDX)
│   ├── index.tsx                  # Home page with rules listing
│   ├── accessibility-preferences.tsx  # Per-token color override UI
│   └── rules/
│       ├── index.tsx              # Rules index page
│       └── *.mdx                  # 12 rule pages (byte-for-byte copies of rules/*.md)
├── components/
│   ├── Nav.tsx                    # Book-cover nav (100svh mobile, collapses at sm+)
│   └── Footer.tsx                 # Theme toggle, palette picker, high contrast, credits
├── lib/
│   ├── theme.ts                   # Theme management (system/light/dark, 4 palettes, high contrast, color overrides)
│   └── rules.ts                   # GENERATED from rules/*.md frontmatter (npm run sync:rules)
├── styles/
│   └── globals.css                # Full design system (tokens, palettes, prose, print, forced-colors)
├── rules/                         # OKF v0.2 bundle: canonical rules + index.md, log.md, README.md
├── scripts/
│   └── sync-rules.mjs             # rules/*.md → pages/rules/*.mdx + lib/rules.ts
├── public/
│   ├── prism.js                   # Prism core + language components (client-only)
│   └── manifest.json              # PWA manifest
├── mdx-components.tsx             # MDX component overrides (Rex picks this up automatically)
├── package.json
├── tsconfig.json
└── wrangler.toml                  # Cloudflare Pages config
```

## Rex framework (not Next.js)

Uses **Rex** (`@limlabs/rex`), a custom React bundler built on rolldown. Mimics Next.js file-based routing but is NOT Next.js.

**Critical Rex behaviors:**
- Client bundles served from `/_rex/static/` and `/_rex/router.js`
- Stale `.rex/build` causes hydration failures. Fix: `rm -rf .rex/build` + restart
- Rex has Tailwind v4 built into its Rust binary — no external plugin needed
- MDX files in `pages/` are compiled to React components at build time
- `rex export` produces static HTML in `.rex/export/` for Cloudflare Pages
- Rex's V8 SSR does not have browser globals (`Element`, `window`). Libraries that reference DOM at import time (like Prism.js) cannot be imported in SSR — load them client-side only

## Commands

```bash
npm run dev        # Rex dev server (port 3000, HMR)
npm run build      # Production build
npm run export     # Static export → .rex/export/
npm run start      # Production server
npm run sync:rules # Copy rules/*.md into pages/rules/ and regenerate lib/rules.ts
npm run check:rules # Fail if those copies are stale
```

## Design system

All colors use `--color-*` CSS custom properties. Four palettes (default, rosé, rebecca purple, claude) × light/dark × high contrast. Theme state stored in `data-*` attributes on `<body>` and persisted to localStorage.

**Design constraints:**
- Never hard-code a color. Use `--color-*` tokens.
- Never reduce opacity on hover. Use underline or color change.
- Never inline `font-family` via style prop. Use a class or CSS token.
- Semantic HTML before ARIA. Native element before custom widget.
- The platform first. Library second.

## Content workflow

`rules/` is an [Open Knowledge Format](https://github.com/GoogleCloudPlatform/open-knowledge-format) v0.2 bundle that follows the Agate OKF profile (`~/Sites/mrktps/agate/knowledge/references/okf-profile.md`). Source of truth for rules is `rules/*.md`; the `pages/rules/*.mdx` files are byte-for-byte copies and `lib/rules.ts` is generated. Never edit either by hand.

**Every rule** carries YAML frontmatter with concept type `Rule`:

```yaml
---
type: Rule
title: Focus Rings                        # display title on the site
description: Layered box-shadow rings, forced-colors safe   # one line, shown on the index pages
tags: [accessibility, focus, css, forced-colors]
icon: CircleDashed                        # @phosphor-icons/react icon name used by the site
status: stable                            # draft | stable | deprecated
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }  # author and last meaningful change
sources:                                  # optional provenance; cite with [^id] footnotes
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
```

- `generated.by` is `human:jpdevries` for JP's own words; an agent drafting a rule uses `<agent>/<model>` (for example `claude-code/claude-fable-5-1`) and leaves `status: draft`.
- Only JP adds `verified: { by: human:jpdevries, at: <ISO datetime> }`. Never invent one.
- Body headings: `## Why` first, `## Reference` last; between them `## Code` (or `## Patterns`) and `## Interactions` (or `## Notes`).

**Bundle files:**
- `rules/index.md` — hand-written root index (`okf_version: "0.2"`), one `* [Title](slug.md) - description` bullet per rule. Its bullet order is the order the site lists rules in. Add a bullet when you add a rule.
- `rules/log.md` — bundle history, newest first, under `## YYYY-MM-DD` headings. Add an entry for a new, deprecated, or substantially changed rule.
- `rules/README.md` — the GitHub landing page for the folder; it is a `type: Reference` concept (first heading `## Summary`) so it stays conformant inside the bundle.

**After editing a rule or its frontmatter:**

```bash
npm run sync:rules    # copies rules/*.md → pages/rules/*.mdx, regenerates lib/rules.ts
npm run check:rules   # exits 1 if the copies or lib/rules.ts are out of date
node ~/Sites/mrktps/agate/tooling/scripts/check-okf.mjs rules   # OKF + profile conformance (0 errors expected)
```

Rex compiles the frontmatter itself: it is removed from the rendered page and exposed as `export const frontmatter` on the MDX module, so nothing strips it in the MDX pipeline. MDX pages get the prose wrapper and syntax highlighting automatically.

## Reference implementation

The patterns documented here are proven in [pantry-host](https://github.com/jpdevries/pantry-host) at `~/Sites/jpdevries/pantry-list`. Read it freely when you need a canonical example.
