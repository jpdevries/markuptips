# Responsive Image `<picture>`
Three `<source>` elements in priority order: monochrome (e-ink) → WebP → JPEG fallback.
Width descriptors + `sizes` for responsive selection. Explicit dimensions prevent CLS.

## Why
`<img srcset>` alone can't serve grayscale variants for e-ink readers or differentiate formats.
`<picture>` source order gives the browser a priority list: it picks the first matching source.
Putting `@media (monochrome)` first means e-readers get a grayscale JPEG without loading color data.
Pre-generating server-side variants (never client-side) means zero transform cost at render time.

## Code

```tsx
// Local upload (/uploads/{uuid}) → full <picture>
// External URL → plain <img> (no variants available)

function ResponsiveImage({ src, alt, sizes = '100vw', loading = 'lazy' }) {
  const isLocal = src.startsWith('/uploads/');
  if (!isLocal) {
    return <img src={src} alt={alt} width={1200} height={675} loading={loading} />;
  }

  const uuid = src.match(/\/uploads\/([^.]+)/)?.[1];
  const base = `/uploads/${uuid}`;

  const graySrcSet  = `${base}-400-gray.jpg 400w, ${base}-800-gray.jpg 800w, ${base}-1200-gray.jpg 1200w`;
  const webpSrcSet  = `${base}-400.webp 400w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`;
  const jpegSrcSet  = `${base}-400.jpg 400w, ${base}-800.jpg 800w, ${base}-1200.jpg 1200w`;

  return (
    <picture>
      {/* E-ink / monochrome displays — grayscale JPEG */}
      <source media="(monochrome)" srcSet={graySrcSet} sizes={sizes} />
      {/* Modern browsers — WebP */}
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      {/* Fallback — JPEG with explicit dimensions for CLS prevention */}
      <img src={`${base}-800.jpg`} srcSet={jpegSrcSet} sizes={sizes}
           width={1200} height={675} alt={alt} loading={loading} />
    </picture>
  );
}
```

```ts
// Server: generate 9 variants per upload (3 widths × WebP + JPEG + grayscale JPEG)
// widths: [400, 800, 1200] — skip widths larger than the original
// UUID filenames are immutable — never overwrite, generate new UUID on re-upload
```

## Interactions
- `service-worker-strategies.md` — `/uploads/` paths are cached cache-first (immutable UUIDs)
- `canvas-download-export.md` — local uploads need `imageToDataURI()` before HTML export

## Reference
`packages/app/components/ResponsiveImage.tsx`, `packages/app/lib/image.ts` in pantry-host
