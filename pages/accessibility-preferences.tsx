import { useState, useEffect } from 'react';
import {
  CSS_VARS,
  getColorOverrides,
  setColorOverrides,
  getCurrentMode,
  getThemePalette,
  type CSSVar,
  type ThemePalette,
  type ColorOverrides,
} from '@/lib/theme';

const TOKEN_LABELS: Record<CSSVar, string> = {
  '--color-bg-body': 'Body Background',
  '--color-bg-card': 'Card Background',
  '--color-border-card': 'Card Border',
  '--color-text-primary': 'Primary Text',
  '--color-text-secondary': 'Secondary Text',
  '--color-accent': 'Accent',
  '--color-accent-hover': 'Accent Hover',
  '--color-accent-subtle': 'Accent Subtle',
  '--color-bg-nav': 'Navigation Background',
  '--color-ring-focus': 'Focus Ring',
  '--color-ring-offset': 'Focus Ring Offset',
};

type PaletteDefaults = Record<string, Record<CSSVar, string>>;

const DEFAULTS: PaletteDefaults = {
  'default-light': {
    '--color-bg-body': '#f4f4f5',
    '--color-bg-card': '#ffffff',
    '--color-border-card': '#e4e4e7',
    '--color-text-primary': '#09090b',
    '--color-text-secondary': '#52525b',
    '--color-accent': '#18181b',
    '--color-accent-hover': '#09090b',
    '--color-accent-subtle': '#e4e4e7',
    '--color-bg-nav': '#f4f4f5',
    '--color-ring-focus': '#18181b',
    '--color-ring-offset': '#ffffff',
  },
  'default-dark': {
    '--color-bg-body': '#09090b',
    '--color-bg-card': '#18181b',
    '--color-border-card': '#27272a',
    '--color-text-primary': '#fafafa',
    '--color-text-secondary': '#a1a1aa',
    '--color-accent': '#e4e4e7',
    '--color-accent-hover': '#fafafa',
    '--color-accent-subtle': '#27272a',
    '--color-bg-nav': '#09090b',
    '--color-ring-focus': '#e4e4e7',
    '--color-ring-offset': '#09090b',
  },
  'rose-light': {
    '--color-bg-body': '#fff1f2',
    '--color-bg-card': '#ffffff',
    '--color-border-card': '#fecdd3',
    '--color-text-primary': '#09090b',
    '--color-text-secondary': '#9f1239',
    '--color-accent': '#be123c',
    '--color-accent-hover': '#be123c',
    '--color-accent-subtle': '#ffe4e6',
    '--color-bg-nav': '#fff1f2',
    '--color-ring-focus': '#e11d48',
    '--color-ring-offset': '#ffffff',
  },
  'rose-dark': {
    '--color-bg-body': '#1a0a10',
    '--color-bg-card': '#2d1520',
    '--color-border-card': '#4a1d30',
    '--color-text-primary': '#fafafa',
    '--color-text-secondary': '#fda4af',
    '--color-accent': '#fb7185',
    '--color-accent-hover': '#fda4af',
    '--color-accent-subtle': '#3d1525',
    '--color-bg-nav': '#1a0a10',
    '--color-ring-focus': '#fb7185',
    '--color-ring-offset': '#1a0a10',
  },
  'rebecca-light': {
    '--color-bg-body': '#f3eef8',
    '--color-bg-card': '#ffffff',
    '--color-border-card': '#d8c8ed',
    '--color-text-primary': '#09090b',
    '--color-text-secondary': '#553080',
    '--color-accent': '#663399',
    '--color-accent-hover': '#7c4dba',
    '--color-accent-subtle': '#e8ddf5',
    '--color-bg-nav': '#f3eef8',
    '--color-ring-focus': '#663399',
    '--color-ring-offset': '#ffffff',
  },
  'rebecca-dark': {
    '--color-bg-body': '#110a1f',
    '--color-bg-card': '#1c1230',
    '--color-border-card': '#33245a',
    '--color-text-primary': '#fafafa',
    '--color-text-secondary': '#c4a8e0',
    '--color-accent': '#b794d6',
    '--color-accent-hover': '#d1b8ec',
    '--color-accent-subtle': '#211640',
    '--color-bg-nav': '#110a1f',
    '--color-ring-focus': '#b794d6',
    '--color-ring-offset': '#110a1f',
  },
  'claude-light': {
    '--color-bg-body': '#f5f0eb',
    '--color-bg-card': '#ffffff',
    '--color-border-card': '#e0d5c8',
    '--color-text-primary': '#09090b',
    '--color-text-secondary': '#7c4a2d',
    '--color-accent': '#a84f2a',
    '--color-accent-hover': '#9c4726',
    '--color-accent-subtle': '#f0e4d8',
    '--color-bg-nav': '#f5f0eb',
    '--color-ring-focus': '#d97757',
    '--color-ring-offset': '#ffffff',
  },
  'claude-dark': {
    '--color-bg-body': '#1a1915',
    '--color-bg-card': '#2d2b28',
    '--color-border-card': '#3d3a35',
    '--color-text-primary': '#fafafa',
    '--color-text-secondary': '#d4a88a',
    '--color-accent': '#e8956d',
    '--color-accent-hover': '#f0b090',
    '--color-accent-subtle': '#2a2420',
    '--color-bg-nav': '#1a1915',
    '--color-ring-focus': '#e8956d',
    '--color-ring-offset': '#1a1915',
  },
};

const PALETTE_LABELS: Record<ThemePalette, string> = {
  default: 'Default',
  rose: 'Ros\u00e9',
  rebecca: 'Rebecca Purple',
  claude: 'Claude',
};

const PALETTES: ThemePalette[] = ['default', 'rose', 'rebecca', 'claude'];
const MODES: ('light' | 'dark')[] = ['light', 'dark'];

export default function AccessibilityPage() {
  const [overrides, setOverridesState] = useState<ColorOverrides>({});
  const [activePalette, setActivePalette] = useState<ThemePalette>('default');
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setOverridesState(getColorOverrides());
    setActivePalette(getThemePalette());
    setActiveMode(getCurrentMode());
  }, []);

  function handleChange(sectionKey: string, cssVar: CSSVar, value: string) {
    const next = { ...overrides };
    if (!next[sectionKey]) next[sectionKey] = {};
    next[sectionKey] = { ...next[sectionKey], [cssVar]: value };
    setOverridesState(next);
    setColorOverrides(next);
  }

  function handleResetSection(sectionKey: string) {
    const next = { ...overrides };
    delete next[sectionKey];
    setOverridesState(next);
    setColorOverrides(next);
  }

  function handleResetAll() {
    setOverridesState({});
    setColorOverrides({});
  }

  const activeKey = `${activePalette}-${activeMode}`;

  return (
    <main id="stage" className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-sans">
          Accessibility Preferences
        </h1>
        <p className="text-sm text-secondary mb-6">
          Override individual color tokens for any theme and mode. Changes are saved in your browser and apply immediately.
        </p>

        <button
          onClick={handleResetAll}
          className="mb-8 text-xs px-3 py-1.5 rounded border border-[var(--color-border-card)] hover:bg-[var(--color-accent-subtle)] transition-colors"
          style={{ cursor: 'pointer' }}
        >
          Reset All Overrides
        </button>
      </div>

      {PALETTES.map((palette) =>
        MODES.map((mode) => {
          const key = `${palette}-${mode}`;
          const defaults = DEFAULTS[key];
          const sectionOverrides = overrides[key] || {};
          const isActive = key === activeKey;
          const hasOverrides = Object.keys(sectionOverrides).length > 0;

          const sectionStyles: Record<string, string> = {};
          for (const v of CSS_VARS) {
            sectionStyles[v] = sectionOverrides[v] || defaults[v];
          }

          const s = {
            bg: sectionStyles['--color-bg-body'],
            card: sectionStyles['--color-bg-card'],
            border: sectionStyles['--color-border-card'],
            text: sectionStyles['--color-text-primary'],
            text2: sectionStyles['--color-text-secondary'],
            accent: sectionStyles['--color-accent'],
            accentSub: sectionStyles['--color-accent-subtle'],
            nav: sectionStyles['--color-bg-nav'],
          };

          return (
            <section
              key={key}
              id={`theme-${key}`}
              className="scroll-mt-20 py-8 px-4 sm:px-6"
              aria-label={`${PALETTE_LABELS[palette]} ${mode} theme`}
              data-theme={palette !== 'default' ? palette : undefined}
              data-color-scheme={mode}
              style={{ backgroundColor: s.bg, color: s.text }}
            >
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2 font-sans" style={{ color: s.text }}>
                    {PALETTE_LABELS[palette]} &mdash; {mode === 'light' ? 'Light' : 'Dark'}
                    {isActive && (
                      <span
                        className="text-xs font-normal px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: s.accentSub, color: s.text2 }}
                      >
                        Active
                      </span>
                    )}
                  </h2>
                  {hasOverrides && (
                    <button
                      onClick={() => handleResetSection(key)}
                      className="text-xs px-2 py-1 rounded transition-colors"
                      style={{ borderColor: s.border, border: `1px solid ${s.border}`, color: s.text }}
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${s.border}` }}>
                  <table className="w-full text-sm" style={{ backgroundColor: s.card, color: s.text }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${s.border}` }}>
                        <th className="text-left px-4 py-2 font-medium" style={{ color: s.text2 }}>Token</th>
                        <th className="text-left px-4 py-2 font-medium" style={{ color: s.text2 }}>Default</th>
                        <th className="text-left px-4 py-2 font-medium" style={{ color: s.text2 }}>Override</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CSS_VARS.map((cssVar, i) => {
                        const defaultVal = defaults[cssVar];
                        const overrideVal = sectionOverrides[cssVar];
                        const isOverridden = overrideVal && overrideVal.toLowerCase() !== defaultVal.toLowerCase();
                        const isLast = i === CSS_VARS.length - 1;
                        const tokenId = `token-${key}-${cssVar}`;
                        return (
                          <tr
                            key={cssVar}
                            style={isLast ? undefined : { borderBottom: `1px solid ${s.border}` }}
                          >
                            <td className="px-4 py-2" style={{ color: s.text }}>
                              <div className="font-medium" id={tokenId}>{TOKEN_LABELS[cssVar]}</div>
                              <code className="text-xs opacity-70" style={{ color: s.text2 }}>{cssVar}</code>
                            </td>
                            <td className="px-4 py-2" style={{ color: s.text }}>
                              <div className="flex items-center gap-2">
                                <span
                                  className="inline-block w-6 h-6 rounded shrink-0"
                                  style={{ backgroundColor: defaultVal, border: `1px solid ${s.border}` }}
                                />
                                <code className="text-xs">{defaultVal}</code>
                              </div>
                            </td>
                            <td className="px-4 py-2" style={{ color: s.text }}>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={overrideVal || defaultVal}
                                  onChange={(e) => handleChange(key, cssVar, e.target.value)}
                                  className="w-8 h-8 rounded cursor-pointer bg-transparent p-0"
                                  style={{ border: `1px solid ${s.border}` }}
                                  aria-label={`Override color for ${PALETTE_LABELS[palette]} ${mode}`}
                                  aria-describedby={tokenId}
                                />
                                {isOverridden && (
                                  <code className="text-xs font-medium">{overrideVal}</code>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          );
        })
      )}
    </main>
  );
}
