# Book-Cover Nav
Full-viewport mobile nav that acts as a cover page. No hamburger. Content scrolls past it via `#stage`.

## Why
A hamburger menu is a disclosure pattern — it hides navigation behind an extra tap and a cognitive load.
A full-viewport nav with `min-height: 100svh` gives navigation the same visual weight as a book cover.
At larger breakpoints the nav collapses to natural height; the `#stage` hash handles scroll-past on all devices.

## Code

```tsx
// Header occupies 100svh on mobile, collapses at sm+
<header className="relative flex flex-col min-h-[100svh] sm:min-h-0 px-6 py-8"
  style={{ backgroundColor: 'var(--color-bg-nav)', color: 'var(--color-text-primary)' }}>

  {/* Branding */}
  <div className="flex items-center justify-between">
    <span className="text-2xl font-bold tracking-tight font-serif">Site Name</span>
  </div>

  {/* Desktop nav — stacks below brand at sm, inline absolute at lg */}
  <nav className="hidden sm:block mt-3 lg:mt-0 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2">
    <ul className="flex flex-wrap gap-x-8 gap-y-2 sm:justify-end" role="list">
      {links.map(({ href, label }) => (
        <li key={label}>
          <a href={`${href}#stage`} onClick={(e) => handleNavClick(e, href)}
            aria-current={active ? 'page' : undefined}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>

  {/* Quote fills dead space on mobile (my-auto centers in remaining flex space) */}
  <blockquote className="my-auto sm:hidden italic">…</blockquote>

  {/* Mobile nav — mt-auto pushes to bottom of 100svh */}
  <nav className="mt-auto pb-16 sm:hidden">
    <ul className="space-y-8" role="list">…</ul>
  </nav>

  {/* Scroll indicator */}
  <a href="#stage" onClick={scrollToStage} aria-label="Scroll to content"
    className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:hidden">
    <svg>…chevron down…</svg>
  </a>
</header>

{/* Content begins here */}
<main id="stage">…</main>
```

```ts
// Same-page click: scroll smoothly instead of navigating
function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (router.pathname === href.split('#')[0]) {
    const target = document.getElementById('stage');
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }
}
```

## Interactions
- `css-token-theming.md` — nav background uses `var(--color-bg-nav)`, not a hard-coded color
- `focus-management.md` — `#stage` serves as the skip-link target
- `aria-patterns.md` — `aria-current="page"` on active link; `role="list"` on `<ul>`

## Reference
`packages/app/components/Nav.tsx` in pantry-host
