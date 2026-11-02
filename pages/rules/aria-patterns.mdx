---
type: Rule
title: "ARIA Patterns"
description: "aria-current, aria-pressed, aria-describedby, live regions"
tags: [accessibility, aria]
icon: HandPointing
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
sources:
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
# ARIA Patterns
Practical ARIA for interactive components. Use the right role/attribute for the right job.
Never add ARIA that duplicates native semantics — first reach for the correct HTML element.

## Why
Correct ARIA communicates state to screen readers without visual changes. Wrong ARIA is worse
than no ARIA — it creates false expectations. These patterns cover the cases where native HTML
alone is insufficient: toggles, status regions, action buttons that describe remote elements.

## Patterns

### Active page link
```tsx
<a href="/recipes" aria-current={isActive ? 'page' : undefined}>Recipes</a>
// Not aria-selected (that's for listbox/tab). Not aria-checked. 'page' is correct for nav.
```

### Toggle button
```tsx
// aria-pressed communicates on/off state for buttons that toggle something
<button aria-pressed={isQueued} onClick={toggleQueue}>
  {isQueued ? 'Remove from queue' : 'Add to queue'}
</button>
```

### Action button describing a remote element
```tsx
// Better than putting the item name in aria-label — survives i18n, reads naturally
<li>
  <span id="item-42-name">Cast Iron Skillet</span>
  <button aria-label="Edit" aria-describedby="item-42-name">✎</button>
  <button aria-label="Delete" aria-describedby="item-42-name">✕</button>
</li>
// Screen reader announces: "Edit, Cast Iron Skillet" / "Delete, Cast Iron Skillet"
```

### Disclosure (show/hide panel)
```tsx
<button aria-expanded={showForm} aria-controls="add-form-id">Add item</button>
<section id="add-form-id" hidden={!showForm}>…</section>
```

### Status region (non-critical updates)
```tsx
<div role="status" aria-live="polite">
  {isOffline ? `Offline — ${queueLength} changes queued` : null}
</div>
```

### Alert (immediate error)
```tsx
<div role="alert">{errorMessage}</div>
// role="alert" implies aria-live="assertive" — use sparingly
```

### Busy state during async operation
```tsx
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Generating…' : 'Generate'}
</button>
```

### List role override
```tsx
// Some CSS resets (list-style: none) strip list semantics in Safari VoiceOver
<ul role="list">…</ul>
```

### Decorative icons
```tsx
<svg aria-hidden="true" focusable="false">…</svg>
// Always aria-hidden="true" on icon SVGs. Never focusable="true".
```

## Interactions
- `focus-management.md` — `autoFocus` on destructive confirm buttons; `aria-describedby` IDs must be unique
- `css-token-theming.md` — high contrast mode adds `border-width: 2px` on `.card`, `.tag`, `.field-input`

## Reference
`packages/app/components/Nav.tsx`, `packages/app/components/pages/CookwarePage.tsx` in pantry-host
