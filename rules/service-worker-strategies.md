# Service Worker Caching Strategies
Match the caching strategy to the request type. Never use a single strategy for everything.
Guard every cache write with `response.ok` — a cached 404 or 5xx is worse than no cache.

## Why
Shell pages need to work offline immediately (pre-cache on install). Hashed bundles never change
(cache-first). HTML must stay fresh (network-first). One failure during install must not abort
the entire service worker — use individual `.catch()` per URL, not `addAll()`.

## Strategies

| Request type | Strategy | Rationale |
|---|---|---|
| Shell pages (install) | Pre-cache individually | One 500 can't abort entire SW install |
| `/_rex/` or `/dist/` bundles | Cache-first (immutable) | Hashed filenames never change |
| `/uploads/` images | Cache-first (immutable) | UUID filenames never change |
| HTML navigation | Network-first + timeout | SSR stays fresh; offline fallback |
| Other same-origin | Stale-while-revalidate | Fonts, manifest — instant + background update |
| Cross-origin | Passthrough | Never intercept; GraphQL, CDN |

## Code

```js
const CACHE_NAME = 'app-shell';
const SHELL_PAGES = ['/', '/about', '/recipes'];
const NETWORK_TIMEOUT = 1500;

// --- Install: pre-cache individually ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        SHELL_PAGES.map((page) =>
          cache.add(page).catch((err) => console.warn('[SW] Failed to pre-cache', page, err))
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// --- Activate: delete old caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// --- Fetch ---
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // passthrough cross-origin

  const isImmutable = url.pathname.startsWith('/_rex/') || url.pathname.startsWith('/uploads/');

  if (isImmutable) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone()); // ← guard!
            return response;
          });
        })
      )
    );
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      Promise.race([
        fetch(event.request),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT)),
      ])
        .then((response) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() =>
          caches.open(CACHE_NAME).then((cache) =>
            cache.match(event.request).then((cached) => cached ?? cache.match('/'))
          )
        )
    );
    return;
  }

  // Stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request).then((response) => {
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        });
        return cached ?? networkFetch;
      })
    )
  );
});
```

```js
// Timestamp-based bundle cleanup (avoids manual CACHE_NAME bumping)
const BUNDLE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function stampResponse(response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cached-at', String(Date.now()));
  return response.arrayBuffer().then((body) =>
    new Response(body, { status: response.status, statusText: response.statusText, headers })
  );
}

function purgeStaleAssets(cache) {
  const cutoff = Date.now() - BUNDLE_MAX_AGE;
  return cache.keys().then((requests) =>
    Promise.all(
      requests
        .filter((req) => new URL(req.url).pathname.startsWith('/_rex/static/'))
        .map((req) =>
          cache.match(req).then((res) => {
            const cachedAt = Number(res?.headers.get('sw-cached-at'));
            if (!cachedAt || cachedAt < cutoff) return cache.delete(req);
          })
        )
    )
  );
}
```

## Interactions
- `responsive-image-picture.md` — `/uploads/` cache-first relies on immutable UUID filenames
- `offline-mutation-queue.md` — SW handles HTML/asset caching; data caching is separate (localStorage)

## Reference
`packages/app/public/sw.js` in pantry-host
