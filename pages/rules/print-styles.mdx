# Print Styles
Every page is a potential printout. Strip navigation chrome, force readable contrast,
show link URLs, and prevent awkward page breaks — without a separate stylesheet.

## Why
Users print recipes, directions, and reference content. A page that prints as-is —
with nav, sidebar, theme toggles, and dark background — wastes ink and looks broken.
`@media print` handles this with zero JavaScript and zero extra HTTP requests.

## Code

```css
@media print {
  /* Hide navigation chrome */
  header, nav, footer, .no-print { display: none !important; }

  /* Force black text on white — ignore user's theme */
  body {
    background: white !important;
    color: black !important;
  }

  /* Show URLs after links (external only) */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #555;
  }

  /* Prevent orphaned headings */
  h1, h2, h3, h4 { break-after: avoid; }

  /* Keep list items together */
  li { break-inside: avoid; }

  /* Collapse aspect-ratio hero containers */
  .hero, [style*="aspect-ratio"] {
    aspect-ratio: unset;
    height: auto;
  }

  /* Remove box shadows and borders that don't print well */
  * { box-shadow: none !important; }

  /* Expand full URLs for print */
  abbr[title]::after { content: " (" attr(title) ")"; }
}
```

```tsx
{/* Mark non-essential UI regions */}
<aside className="no-print">
  <ThemeControls />
</aside>

{/* Ensure recipe content has a printable region */}
<article id="recipe-content">
  <h1>{recipe.title}</h1>
  <ol>{recipe.steps.map(step => <li key={step.id}>{step.text}</li>)}</ol>
</article>
```

## Notes
- Put `@media print` at the end of your main stylesheet — no separate file needed.
- `!important` is acceptable in print styles since they intentionally override all other rules.
- Test with browser Print Preview before shipping any content-heavy page.

## Reference
`packages/app/styles/globals.css` `@media print` block in pantry-host
