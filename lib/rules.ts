import {
  BookOpen,
  Palette,
  CircleDashed,
  Image,
  HardDrives,
  DownloadSimple,
  HandPointing,
  NavigationArrow,
  ShieldCheck,
  CloudSlash,
  TextAa,
  Printer,
} from '@phosphor-icons/react';

export const RULES = [
  { slug: 'book-cover-nav', title: 'Book-Cover Nav', summary: 'Full-viewport mobile nav, no hamburger, #stage scroll', Icon: BookOpen },
  { slug: 'css-token-theming', title: 'CSS Token Theming', summary: 'CSS custom property tokens, data-* cascade, dark/high-contrast', Icon: Palette },
  { slug: 'focus-rings', title: 'Focus Rings', summary: 'Layered box-shadow rings, forced-colors safe', Icon: CircleDashed },
  { slug: 'responsive-image-picture', title: 'Responsive Image <picture>', summary: '<picture> with monochrome + WebP + JPEG, CLS prevention', Icon: Image },
  { slug: 'service-worker-strategies', title: 'Service Worker Strategies', summary: 'Per-request caching strategies, response.ok guard, timestamp cleanup', Icon: HardDrives },
  { slug: 'canvas-download-export', title: 'Canvas + <a download> Export', summary: '<canvas> to data URI to <a download> — no server needed', Icon: DownloadSimple },
  { slug: 'aria-patterns', title: 'ARIA Patterns', summary: 'aria-current, aria-pressed, aria-describedby, live regions', Icon: HandPointing },
  { slug: 'focus-management', title: 'Focus Management', summary: 'autoFocus, scroll-mt, #stage as skip-link replacement', Icon: NavigationArrow },
  { slug: 'trusted-network-access', title: 'Trusted Network Access', summary: 'Owner vs guest on self-hosted apps, Tailscale + LAN ranges', Icon: ShieldCheck },
  { slug: 'offline-mutation-queue', title: 'Offline Mutation Queue', summary: 'localStorage queue, ordered flush, startup replay', Icon: CloudSlash },
  { slug: 'system-font-stacks', title: 'System Font Stacks', summary: 'Zero-download typography, no Google Fonts', Icon: TextAa },
  { slug: 'print-styles', title: 'Print Styles', summary: 'Printable documents — hide chrome, show URLs, collapse heroes', Icon: Printer },
];
