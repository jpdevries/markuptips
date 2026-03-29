import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Code } from '@phosphor-icons/react';

const links = [
  { href: '/rules', label: 'Rules' },
];

export default function Nav() {
  const router = useRouter();

  function scrollToStage(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById('stage');
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (router.pathname === href.split('#')[0]) {
      const target = document.getElementById('stage');
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    }
  }

  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => { setCurrentPath(router.pathname); }, [router.pathname]);

  return (
    <header
      className="relative flex flex-col min-h-[100svh] sm:min-h-0 px-6 py-8"
      style={{ backgroundColor: 'var(--color-bg-nav)', color: 'var(--color-text-primary)' }}
    >
      {/* Site identity */}
      <div className="flex items-center justify-between">
        {currentPath === '/' || currentPath === '' ? (
          <span className="text-2xl font-bold tracking-tight font-sans inline-flex items-center gap-2">
            <Code size={28} weight="bold" aria-hidden="true" />
            markup.tips
          </span>
        ) : (
          <a
            href="/#stage"
            className="text-2xl font-bold tracking-tight font-sans hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 inline-flex items-center gap-2"
            aria-label="markup.tips — home"
          >
            <Code size={28} weight="bold" aria-hidden="true" />
            markup.tips
          </a>
        )}
      </div>

      {/* Desktop/phablet nav */}
      <nav
        aria-label="Main navigation"
        className="hidden sm:block mt-3 lg:mt-0 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2"
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-2 sm:justify-end lg:justify-start" role="list">
          {links.map(({ href, label }) => {
            const active = currentPath === href || (href !== '/' && currentPath.startsWith(href));
            return (
              <li key={label}>
                <a
                  href={`${href}#stage`}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${active ? 'underline underline-offset-4' : 'hover:underline underline-offset-4'}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quote fills dead space on mobile */}
      <blockquote className="my-auto sm:hidden italic text-secondary legible very">
        Use the platform. Reach for a native API before a library.
      </blockquote>

      {/* Mobile nav */}
      <nav className="mt-auto pb-16 sm:hidden" aria-label="Main navigation">
        <ul className="space-y-8" role="list">
          {links.map(({ href, label }) => {
            const active = currentPath === href || (href !== '/' && currentPath.startsWith(href));
            return (
              <li key={label}>
                <a
                  href={`${href}#stage`}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={active ? 'page' : undefined}
                  className={`text-lg font-medium ${active ? 'underline underline-offset-4' : 'hover:underline underline-offset-4'}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Scroll indicator */}
      <a
        href="#stage"
        onClick={scrollToStage}
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </header>
  );
}
