---
type: Rule
title: "System Font Stacks"
description: "Zero-download typography, no Google Fonts"
tags: [typography, performance, privacy]
icon: TextAa
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
sources:
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
# System Font Stacks
Use the device's own fonts. No external requests, no layout shift, no privacy leak, no CDN dependency.
Three stacks: sans-serif, serif, monospace — sourced from systemfontstack.com.

## Why
Google Fonts adds a DNS lookup, a TCP handshake, a TLS negotiation, and a render-blocking request
before the first character appears. System fonts are already on the device. They render instantly,
respect the user's OS preferences, and send zero bytes of your visitor's data to Google.

## Code

```css
/* globals.css — Tailwind v4 @theme block */
@theme {
  --font-sans: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, Adwaita Sans, Cantarell, Ubuntu, roboto, noto, helvetica, arial, sans-serif;

  --font-serif: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman,
    Droid Serif, Times, Source Serif Pro, serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;

  --font-mono: Menlo, Consolas, Monaco, Adwaita Mono, Liberation Mono,
    Lucida Console, monospace;
}
```

```css
/* Plain CSS (no Tailwind) */
:root {
  --font-sans:  -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, Adwaita Sans, Cantarell, Ubuntu, roboto, noto, helvetica, arial, sans-serif;
  --font-serif: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif;
  --font-mono:  Menlo, Consolas, Monaco, Adwaita Mono, Liberation Mono, Lucida Console, monospace;
}
body { font-family: var(--font-sans); }
```

```tsx
// In component styles — reference the token, never inline the full stack
<blockquote className="font-serif italic">
<code className="font-mono text-sm">
```

## Notes
- Never set `font-family` via inline `style` prop — use a class or token reference.
- Emoji fallbacks (`Apple Color Emoji`, `Segoe UI Emoji`) belong in the serif stack since it's
  used for body copy where emoji may appear.
- Source: [systemfontstack.com](https://systemfontstack.com/)

## Reference
`packages/app/styles/globals.css` `@theme` block in pantry-host
