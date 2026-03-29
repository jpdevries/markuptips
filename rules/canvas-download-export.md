# Canvas + `<a download>` Export
Generate files entirely in the browser — no server endpoint, no upload, no backend.
`<canvas>` converts images to base64. `<a download>` triggers the save dialog.

## Why
A self-hosted app can't rely on a cloud export API. The browser has everything needed:
`<canvas>` encodes images, `encodeURIComponent` wraps HTML, and a programmatic anchor click
delivers the file. The result is a fully self-contained export that works offline.

## Code

```ts
// 1. Encode a remote/local image as a base64 data URI via canvas
function imageToDataURI(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = reject;
    img.src = src;
  });
}

// 2. Build the HTML string (embed the image inline)
async function buildExportHTML(title: string, imageSrc: string, body: string) {
  const imageDataURI = await imageToDataURI(imageSrc);
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body>
  <img src="${imageDataURI}" alt="${title}">
  ${body}
</body>
</html>`;
}

// 3. Trigger download — no DOM insertion needed
function downloadHTML(html: string, filename: string) {
  const dataURI = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
  const a = document.createElement('a');
  a.href = dataURI;
  a.download = filename;
  a.click();
}
```

```tsx
{/* Declarative variant — works as a plain link too */}
<a download={`${slug}.html`} href={dataURI}>
  Export HTML
</a>
```

```ts
// Non-image files: same pattern, different MIME type
// SQL backup:
const dataURI = 'data:application/sql;charset=utf-8,' + encodeURIComponent(sqlDump);
a.download = `backup-${date}.sql`;

// JSON:
const dataURI = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
```

## Interactions
- `responsive-image-picture.md` — local `/uploads/` images must go through `imageToDataURI()`
  before embedding (CORS and SW caching make direct `src` references unreliable in exports)
- `service-worker-strategies.md` — exported files are fully self-contained and work offline

## Reference
`packages/shared/src/export-recipe.ts`, `packages/app/components/pages/RecipeExportPage.tsx` in pantry-host
