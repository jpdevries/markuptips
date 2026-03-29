/**
 * Theme management — respects system preferences by default.
 *
 * "system" (default): mirrors prefers-color-scheme via matchMedia listener
 * "light" / "dark": manual override, ignores OS preference
 *
 * High contrast is an independent toggle layered on top.
 * Palette (default / rose / rebecca / claude) controls the color scheme.
 */

export type ThemePreference = 'system' | 'light' | 'dark';
export type ThemePalette = 'default' | 'rose' | 'rebecca' | 'claude';

const THEME_KEY = 'theme-preference';
const HC_KEY = 'high-contrast';
const PALETTE_KEY = 'theme-palette';

export function getThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(THEME_KEY) as ThemePreference) || 'system';
}

export function setThemePreference(pref: ThemePreference) {
  if (pref === 'system') {
    localStorage.removeItem(THEME_KEY);
  } else {
    localStorage.setItem(THEME_KEY, pref);
  }
  applyTheme();
}

export function getHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(HC_KEY);
  if (stored !== null) return stored === 'true';
  return window.matchMedia('(prefers-contrast: more)').matches;
}

export function setHighContrast(enabled: boolean) {
  localStorage.setItem(HC_KEY, enabled ? 'true' : 'false');
  applyTheme();
}

export function getExplicitPalette(): ThemePalette {
  if (typeof window === 'undefined') return 'default';
  return (localStorage.getItem(PALETTE_KEY) as ThemePalette) || 'default';
}

export function getThemePalette(): ThemePalette {
  if (typeof window === 'undefined') return 'default';
  const stored = localStorage.getItem(PALETTE_KEY) as ThemePalette | null;
  if (stored) return stored;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="default-palette"]');
  return (meta?.content as ThemePalette) || 'default';
}

export function setThemePalette(palette: ThemePalette) {
  localStorage.setItem(PALETTE_KEY, palette);
  applyTheme();
}

const COLOR_OVERRIDES_KEY = 'theme-color-overrides';

const CSS_VARS = [
  '--color-bg-body', '--color-bg-card', '--color-border-card',
  '--color-text-primary', '--color-text-secondary',
  '--color-accent', '--color-accent-hover', '--color-accent-subtle',
  '--color-bg-nav', '--color-ring-focus', '--color-ring-offset',
] as const;

export type CSSVar = typeof CSS_VARS[number];
export { CSS_VARS };

export type ColorOverrides = Record<string, Record<string, string>>;

export function getColorOverrides(): ColorOverrides {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(COLOR_OVERRIDES_KEY) || '{}');
  } catch { return {}; }
}

export function setColorOverrides(overrides: ColorOverrides) {
  localStorage.setItem(COLOR_OVERRIDES_KEY, JSON.stringify(overrides));
  applyColorOverrides();
}

export function getCurrentMode(): 'light' | 'dark' {
  const pref = getThemePreference();
  if (pref === 'dark') return 'dark';
  if (pref === 'light') return 'light';
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyColorOverrides() {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  const overrides = getColorOverrides();
  const palette = getThemePalette();
  const mode = getCurrentMode();
  const key = `${palette}-${mode}`;
  const active = overrides[key] || {};

  for (const v of CSS_VARS) {
    if (active[v]) {
      el.style.setProperty(v, active[v]);
    } else {
      el.style.removeProperty(v);
    }
  }
}

export function applyTheme() {
  if (typeof document === 'undefined') return;

  const pref = getThemePreference();
  const body = document.body;

  if (pref === 'system') {
    delete body.dataset.colorScheme;
  } else {
    body.dataset.colorScheme = pref;
  }

  const dark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  body.style.colorScheme = dark ? 'dark' : 'light';

  const hc = getHighContrast();
  if (hc) {
    body.dataset.highContrast = '';
  } else {
    delete body.dataset.highContrast;
  }

  const palette = getThemePalette();
  if (palette === 'default') {
    delete body.dataset.theme;
  } else {
    body.dataset.theme = palette;
  }

  applyColorOverrides();
}

let listenerRegistered = false;

export function initTheme() {
  applyTheme();

  if (listenerRegistered) return;
  listenerRegistered = true;

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemePreference() === 'system') {
      applyTheme();
    }
  });

  window.matchMedia('(prefers-contrast: more)').addEventListener('change', () => {
    if (localStorage.getItem(HC_KEY) === null) {
      applyTheme();
    }
  });
}
