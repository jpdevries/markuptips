import { useState, useEffect } from 'react';
import { Monitor, Sun, Moon } from '@phosphor-icons/react';
import {
  getThemePreference,
  setThemePreference,
  getHighContrast,
  setHighContrast,
  getExplicitPalette,
  setThemePalette,
  type ThemePreference,
  type ThemePalette,
} from '@/lib/theme';

const THEME_OPTIONS: { value: ThemePreference; label: string; Icon: typeof Monitor }[] = [
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
];

const PALETTE_OPTIONS: { value: ThemePalette; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'rose', label: 'Ros\u00e9' },
  { value: 'rebecca', label: 'Rebecca Purple' },
  { value: 'claude', label: 'Claude' },
];

function LogoJP({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.22 119.76" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M73.11,10.12V129.88l17-17V96a23.81,23.81,0,0,0,23.08-6.16l1.5-1.51h0l1.45-1.44a23.85,23.85,0,0,0,0-33.72ZM101.69,75.4c-4.84,4.84-8.43,2.68-11.58-.25V52.41l9.73,9.72C103.42,65.73,107.42,69.68,101.69,75.4Z" transform="translate(-16.89 -10.12)" />
      <path d="M49.9,27.14V87.6l-9.73-9.73c-3.6-3.59-7.59-7.53-1.85-13.28C41,61.87,43.44,61.3,45.67,62V47.57a4.3,4.3,0,0,0-3.15-4l-.17,0-.51-.08a7.31,7.31,0,0,0-1.76,0,23.75,23.75,0,0,0-13.22,6.7l-2.68,2.68h0l-.3.3a23.83,23.83,0,0,0,0,33.72l43,43V10.12l-17,17v0Z" transform="translate(-16.89 -10.12)" />
    </svg>
  );
}

export default function Footer() {
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [hc, setHC] = useState(false);
  const [palette, setPalette] = useState<ThemePalette>('default');

  useEffect(() => {
    setTheme(getThemePreference());
    setHC(getHighContrast());
    setPalette(getExplicitPalette());
  }, []);

  function handleTheme(pref: ThemePreference) {
    setTheme(pref);
    setThemePreference(pref);
  }

  function handleHC(enabled: boolean) {
    setHC(enabled);
    setHighContrast(enabled);
  }

  function handlePalette(p: ThemePalette) {
    setPalette(p);
    setThemePalette(p);
  }

  return (
    <footer className="no-print pt-10 pb-8 px-4 sm:px-6 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="max-w-3xl mx-auto border-t pt-6" style={{ borderColor: 'var(--color-accent-subtle)' }}>
        <div className="flex flex-wrap items-center gap-4 gap-y-3">
          {/* Theme preference */}
          <div role="radiogroup" aria-label="Theme" className="flex items-center gap-1">
            {THEME_OPTIONS.map(({ value, label, Icon }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  role="radio"
                  aria-checked={active}
                  aria-label={`${label} theme`}
                  onClick={() => handleTheme(value)}
                  className={`p-1.5 rounded transition-colors ${
                    active
                      ? 'theme-toggle-active'
                      : 'theme-toggle-inactive'
                  }`}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>

          {/* Palette selector */}
          <label className="flex items-center gap-1.5 select-none">
            <span className="text-xs">Palette</span>
            <select
              value={palette}
              onChange={(e) => handlePalette(e.target.value as ThemePalette)}
              className="text-xs bg-transparent border border-zinc-300 dark:border-[var(--color-accent-subtle)] rounded px-1.5 py-0.5"
              aria-label="Color palette"
            >
              {PALETTE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          {/* High contrast toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hc}
              onChange={(e) => handleHC(e.target.checked)}
              className="w-3.5 h-3.5 accent-accent"
            />
            <span className="text-xs">High contrast</span>
          </label>
        </div>

        {/* Accessibility preferences link */}
        <a
          href="/accessibility-preferences#stage"
          className="mt-3 inline-block text-xs underline text-zinc-500 dark:text-zinc-400 hover:text-[var(--color-text-secondary)]"
        >
          Accessibility Preferences
        </a>

        {/* Credits */}
        <div className="mt-6 flex items-center gap-2">
          <a href="https://devries.jp" className="transition-colors hover:text-secondary inline-flex items-center gap-1.5" style={{ color: 'inherit' }} aria-label="JP DeVries">
            <LogoJP size={18} />
            <span>JP DeVries</span>
          </a>
          <span className="text-zinc-400 dark:text-zinc-600">|</span>
          <a href="https://github.com/jpdevries/markuptips" className="transition-colors hover:text-secondary" style={{ color: 'inherit' }} aria-label="markup.tips on GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
