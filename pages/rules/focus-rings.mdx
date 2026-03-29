# Focus Rings
Layered `box-shadow` focus rings that work on any background color. High contrast mode switches
to solid `outline`. Forced-colors mode maps to the system `Highlight` keyword.

## Why
`outline` can't be offset across varying background colors. A dual `box-shadow` (offset fill +
ring) creates a visible halo on both light and dark backgrounds without cutting into the element.
In high contrast mode, `box-shadow` is suppressed by the OS — switch to `outline` there.
Never remove `:focus-visible` outlines without replacing them.

## Code

```css
/* Default: keyboard-visible only */
:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--color-ring-offset),   /* matches background — creates gap */
    0 0 0 4px var(--color-ring-focus);    /* visible ring */
}

/* High contrast: solid outline (box-shadow invisible in forced-colors) */
body[data-high-contrast] :focus-visible {
  box-shadow: none;
  outline: 3px solid var(--color-text-primary);
  outline-offset: 3px;
}

/* Windows Forced Colors */
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid Highlight;
    outline-offset: 3px;
    box-shadow: none;
  }
}
```

```tsx
// Tailwind: use focus-visible utilities when not using the global rule
<a className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
```

## Interactions
- `css-token-theming.md` — `--color-ring-focus` and `--color-ring-offset` are design tokens

## Reference
`packages/app/styles/globals.css` `:focus-visible` block in pantry-host
