---
type: Rule
title: "Focus Management"
description: "autoFocus, scroll-mt, #stage as skip-link replacement"
tags: [accessibility, focus, keyboard]
icon: NavigationArrow
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
sources:
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
# Focus Management
Move focus intentionally when the UI changes. Prevent focus traps. Use `#stage` as a skip-link
replacement. Use `scroll-mt` to keep targets visible below sticky headers.

## Why
When new content appears (an inline form, a confirm dialog, a status message), focus should
follow. A user who can't see the screen has no other way to know something changed. Equally
important: focus must never get stranded in a region that's been removed or hidden.

## Patterns

### `autoFocus` on inline forms
```tsx
// When an edit form replaces a list item, focus the first field immediately
{isEditing ? (
  <input autoFocus defaultValue={item.name} />
) : (
  <span>{item.name}</span>
)}
```

### `autoFocus` on destructive confirmations
```tsx
// Move focus to the confirm button, not the cancel button
{showConfirm && (
  <div>
    <p>Delete "{item.name}"?</p>
    <button onClick={cancel}>Cancel</button>
    <button autoFocus onClick={confirm}>Delete</button>
  </div>
)}
```

### `#stage` as skip-link replacement
```tsx
// Every nav link ends with #stage — keyboard users skip the nav by activating any link
<a href="/recipes#stage">Recipes</a>

// The main content area is the target
<main id="stage">…</main>

// Same-page: scroll smoothly, don't navigate
function handleNavClick(e, href) {
  if (currentPath === href) {
    e.preventDefault();
    document.getElementById('stage')?.scrollIntoView({ behavior: 'smooth' });
  }
}
```

### Scroll margin for sticky headers
```css
/* Prevent section headings from hiding under a sticky nav on hash navigation */
.section-heading { scroll-margin-top: 5rem; /* ~80px */ }
```
```tsx
<h2 className="scroll-mt-20" id="section-id">Section</h2>
```

### Returning focus after modal close
```tsx
// Store the trigger ref before opening; restore on close
const triggerRef = useRef<HTMLButtonElement>(null);

function close() {
  setOpen(false);
  triggerRef.current?.focus();
}

<button ref={triggerRef} onClick={() => setOpen(true)}>Open</button>
```

## Interactions
- `book-cover-nav.md` — `#stage` anchor is the scroll target all nav links point to
- `aria-patterns.md` — `aria-describedby` IDs need to remain in the DOM when their button is focused

## Reference
`packages/app/components/Nav.tsx`, `packages/app/components/pages/CookwarePage.tsx` in pantry-host
