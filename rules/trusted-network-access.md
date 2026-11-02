---
type: Rule
title: "Trusted Network Access"
description: "Owner vs guest on self-hosted apps, Tailscale + LAN ranges"
tags: [security, self-hosted, network]
icon: ShieldCheck
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
sources:
  - id: pantry-host
    resource: https://github.com/jpdevries/pantry-host
    title: pantry-host reference implementation
    author: human:jpdevries
---
# Trusted Network Access
Owner vs guest on a self-hosted app. Localhost and HTTPS = owner. LAN HTTP = guest (read-only).
Tailscale CGNAT and mDNS hostnames are trusted networks but not owners.

## Why
A self-hosted app shared on a home network needs a simple, zero-config access model. Requiring
a login for every family member adds friction. Instead: the person at the machine (localhost)
or anyone with an HTTPS certificate (Tailscale, mkcert) gets full write access. Anyone on
the LAN via a plain HTTP IP gets read-only access. No accounts required.

## Code

```ts
// lib/isTrustedNetwork.ts
export function isTrustedNetwork(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  if (hostname.endsWith('.local')) return true;           // mDNS
  if (hostname.endsWith('.ts.net')) return true;          // Tailscale MagicDNS
  if (/^192\.168\./.test(hostname)) return true;         // RFC1918 class C
  if (/^10\./.test(hostname)) return true;               // RFC1918 class A
  // Tailscale CGNAT range 100.64.0.0/10
  const match = hostname.match(/^100\.(\d+)\./);
  if (match && Number(match[1]) >= 64 && Number(match[1]) <= 127) return true;
  return false;
}

// isOwner: can create, edit, delete
export function isOwner(): boolean {
  if (typeof window === 'undefined') return false;       // SSR guard
  const { hostname, protocol } = window.location;
  return hostname === 'localhost' || hostname === '127.0.0.1' || protocol === 'https:';
}
```

```tsx
// Gate write-access features in UI
const [isOwner, setIsOwner] = useState(false);
useEffect(() => { setIsOwner(checkIsOwner()); }, []);

{isOwner && <button onClick={handleDelete}>Delete</button>}

// Gate nav links by network trust (not ownership)
const [isSecure, setIsSecure] = useState(true);
useEffect(() => {
  setIsSecure(isTrustedNetwork(window.location.hostname) || window.location.protocol === 'https:');
}, []);

const links = [
  { href: '/pantry', label: 'Pantry' },
  ...(isSecure ? [{ href: '/cookware', label: 'Cookware' }] : []),
];
```

## Notes
- This is a UI convenience pattern, not a security boundary. A determined LAN user can POST directly.
- Defense in depth: server-side mutations should also check the request origin or a session.
- `isSecure` (trusted network) and `isOwner` (write access) are intentionally separate — a Tailscale
  guest can be on a trusted network without having owner privileges.

## Reference
`packages/app/lib/isTrustedNetwork.ts`, `packages/app/components/Nav.tsx` in pantry-host
