---
type: Rule
title: "Offline Mutation Queue"
description: "localStorage queue, ordered flush, startup replay"
tags: [offline, localstorage, sync]
icon: CloudSlash
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
sources:
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
# Offline Mutation Queue
Queue mutations to localStorage when offline. Flush in timestamp order on reconnection.
Flush also on app startup — connectivity may have returned since the last session.

## Why
`navigator.onLine` is unreliable (returns `true` on captive portals, flickers on mobile).
Instead, treat any failed mutation as potentially-offline and queue it. Replay on startup
and when the API becomes reachable again. Stop replay on first failure to preserve order
guarantees — a later mutation may depend on an earlier one succeeding.

## Code

```ts
// lib/offlineQueue.ts
const STORAGE_KEY = 'offlineQueue';

interface QueuedMutation {
  query: string;
  variables: Record<string, unknown>;
  ts: number;
}

function load(): QueuedMutation[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); }
  catch { return []; }
}
function save(queue: QueuedMutation[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(queue)); }
  catch {}
}

export function enqueue(query: string, variables: Record<string, unknown>) {
  const queue = load();
  queue.push({ query, variables, ts: Date.now() });
  save(queue);
}

export function queueLength() { return load().length; }

export async function flush() {
  const queue = load();
  if (!queue.length) return;

  const remaining: QueuedMutation[] = [];
  for (const item of queue) {
    try {
      await gql(item.query, item.variables);
    } catch {
      // Stop on first failure — preserve order guarantee
      remaining.push(item, ...queue.slice(queue.indexOf(item) + 1));
      break;
    }
  }
  save(remaining);
}
```

```ts
// Usage in a mutation
async function saveItem(data) {
  try {
    await gql(MUTATION, data);
  } catch {
    enqueue(MUTATION, data);
    showOfflineMessage();
  }
}
```

```tsx
// _app.tsx — flush on startup AND register a flush callback for API recovery
useEffect(() => {
  flush().catch(console.error);              // mutations queued in a previous session
  registerFlush(flush);                      // flush when API comes back online
}, []);
```

```tsx
// OfflineBanner — status region, polite live announcements
<div role="status" aria-live="polite">
  {isOffline && `Offline — ${count} change${count !== 1 ? 's' : ''} queued`}
</div>
```

## Interactions
- `service-worker-strategies.md` — SW caches HTML/assets; this queue handles data mutations separately
- `aria-patterns.md` — queue count surfaced via `role="status"` + `aria-live="polite"`

## Reference
`packages/app/lib/offlineQueue.ts`, `packages/app/pages/_app.tsx` in pantry-host
