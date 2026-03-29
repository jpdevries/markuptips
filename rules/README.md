# markup.tips — Web Standards Rules for Agents

Performance-first, accessibility-first patterns for building modern web UIs.
Each file is a self-contained rule an agent can apply without reading a full codebase.

Lighthouse 97 is not an accident. These patterns compound.

## Rules

| File | Pattern |
|------|---------|
| [book-cover-nav.md](book-cover-nav.md) | Full-viewport mobile nav, no hamburger, `#stage` scroll |
| [css-token-theming.md](css-token-theming.md) | CSS custom property tokens, `data-*` cascade, dark/high-contrast |
| [focus-rings.md](focus-rings.md) | Layered box-shadow rings, forced-colors safe |
| [responsive-image-picture.md](responsive-image-picture.md) | `<picture>` with monochrome + WebP + JPEG, CLS prevention |
| [service-worker-strategies.md](service-worker-strategies.md) | Per-request caching strategies, `response.ok` guard, timestamp cleanup |
| [canvas-download-export.md](canvas-download-export.md) | `<canvas>` → data URI → `<a download>` — no server needed |
| [aria-patterns.md](aria-patterns.md) | `aria-current`, `aria-pressed`, `aria-describedby`, live regions |
| [focus-management.md](focus-management.md) | `autoFocus`, `scroll-mt`, `#stage` as skip-link replacement |
| [trusted-network-access.md](trusted-network-access.md) | Owner vs guest on self-hosted apps, Tailscale + LAN ranges |
| [offline-mutation-queue.md](offline-mutation-queue.md) | localStorage queue, ordered flush, startup replay |
| [system-font-stacks.md](system-font-stacks.md) | Zero-download typography, no Google Fonts |
| [print-styles.md](print-styles.md) | Printable documents — hide chrome, show URLs, collapse heroes |

## Reference Implementation

[pantry-host](https://github.com/jpdevries/pantry-host) — a self-hosted kitchen manager.
Every rule in this directory is distilled from patterns proven in that codebase.

## Philosophy

- Use the platform. Reach for a native API before a library.
- Semantic HTML is free performance and free accessibility.
- CSS custom properties > component-scoped styles for theming.
- Offline is a feature, not an edge case.
- Never hard-code a color. Never reduce opacity on hover.
