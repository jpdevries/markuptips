---
type: Rule
title: "CSS Token Theming"
description: "CSS custom property tokens, data-* cascade, dark/high-contrast"
tags: [css, theming, tokens, dark-mode, high-contrast]
icon: Palette
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
sources:
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
# CSS Token Theming
All colors via `--color-*` custom properties. `data-*` attributes on `<body>` control the cascade.
Never hard-code a Tailwind color utility for a semantic color.

## Why
CSS custom properties change at runtime without JS re-renders. A single `data-color-scheme="dark"`
attribute swaps every color on the page instantly. Palette, dark mode, high contrast, and
Windows Forced Colors all layer cleanly because they all write to the same token names.

## Code

```css
/* Root tokens — light default */
:root {
  --color-bg-body:        #f4f4f5;
  --color-bg-card:        #ffffff;
  --color-bg-nav:         #f4f4f5;
  --color-border-card:    #e4e4e7;
  --color-text-primary:   #09090b;
  --color-text-secondary: #52525b;  /* AA contrast on all light bgs */
  --color-accent:         #18181b;  /* AAA on white */
  --color-ring-focus:     #18181b;
  --color-ring-offset:    #ffffff;
}

/* Dark — system preference (unless forced light) */
@media (prefers-color-scheme: dark) {
  body:not([data-color-scheme="light"]) {
    --color-bg-body:        #09090b;
    --color-bg-card:        #18181b;
    --color-text-primary:   #fafafa;
    --color-text-secondary: #a1a1aa;
    --color-ring-offset:    #09090b;
  }
}
/* Dark — forced via JS */
body[data-color-scheme="dark"] {
  --color-bg-body:     #09090b;
  /* … same values … */
}

/* Named palette (example: rosé) */
body[data-theme="rose"] { --color-bg-body: #fff1f2; --color-accent: #be123c; }
@media (prefers-color-scheme: dark) {
  body[data-theme="rose"]:not([data-color-scheme="light"]) {
    --color-bg-body: #1a0a10; --color-accent: #fb7185;
  }
}
body[data-theme="rose"][data-color-scheme="dark"] {
  --color-bg-body: #1a0a10; --color-accent: #fb7185;
}

/* High contrast — overrides all palettes */
body[data-high-contrast] {
  --color-bg-body:      #ffffff;
  --color-text-primary: #000000;
  --color-accent:       #000000;
}
@media (prefers-color-scheme: dark) {
  body[data-high-contrast]:not([data-color-scheme="light"]) {
    --color-bg-body: #000000; --color-text-primary: #ffffff;
  }
}

/* Windows Forced Colors — map to system keywords */
@media (forced-colors: active) {
  :root {
    --color-bg-body:      Canvas;
    --color-text-primary: CanvasText;
    --color-accent:       LinkText;
  }
}
```

```tsx
// Usage — always tokens, never Tailwind color utilities for semantic colors
<div style={{ backgroundColor: 'var(--color-bg-nav)', color: 'var(--color-text-primary)' }}>
<p className="text-[var(--color-text-secondary)]">
```

```ts
// Switching — write data attributes, CSS cascade handles the rest
document.body.setAttribute('data-color-scheme', 'dark');
document.body.setAttribute('data-theme', 'rose');
document.body.toggleAttribute('data-high-contrast', true);
```

## Interactions
- `focus-rings.md` — ring colors also use `--color-ring-focus` / `--color-ring-offset` tokens
- `aria-patterns.md` — high contrast mode doubles border widths on `.card`, `.tag`, `.field-input`

## Reference
`packages/app/styles/globals.css`, `packages/shared/src/theme.ts` in pantry-host
