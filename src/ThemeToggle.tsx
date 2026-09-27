import { useEffect, useRef, useState } from 'react';
import { Palette, Check } from 'lucide-react';

export type ThemeName = 'rose' | 'lavender' | 'sage' | 'ocean' | 'cocoa';

const STORAGE_KEY = 'ournetflix-theme';
const CLASS_PREFIX = 'theme-';
const THEME_COLOR: Record<ThemeName, string> = {
  rose: '#faf5ef',
  lavender: '#f7f3fc',
  sage: '#f5f7f0',
  ocean: '#0e1622',
  cocoa: '#171114',
};

const THEMES: { value: ThemeName; label: string; swatches: [string, string, string] }[] = [
  { value: 'rose', label: 'Rose Ivory', swatches: ['#faf5ef', '#c2496b', '#c9a24b'] },
  { value: 'lavender', label: 'Lavender Haze', swatches: ['#f7f3fc', '#9b6bc4', '#c9a24b'] },
  { value: 'sage', label: 'Sage Meadow', swatches: ['#f5f7f0', '#6f9a7e', '#c9a24b'] },
  { value: 'ocean', label: 'Deep Ocean', swatches: ['#0e1622', '#7fb3e8', '#d4af7a'] },
  { value: 'cocoa', label: 'Midnight Cocoa', swatches: ['#171114', '#e08aa0', '#d9b45f'] },
];

function getStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'rose' || stored === 'lavender' || stored === 'sage' || stored === 'ocean' || stored === 'cocoa')
      return stored;
    // Migrate the old light/dark/system values.
    if (stored === 'dark') return 'cocoa';
    if (stored === 'light') return 'rose';
    if (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'cocoa';
  } catch {
    /* localStorage unavailable */
  }
  return 'rose';
}

export function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  for (const { value } of THEMES) root.classList.remove(CLASS_PREFIX + value);
  root.classList.add(CLASS_PREFIX + theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(getStoredTheme);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore write failures */
    }
  }, [theme]);

  // Close the menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = THEMES.find((t) => t.value === theme) ?? THEMES[0];

  return (
    <div className="theme-toggle" ref={ref}>
      <button
        className="theme-menu-button"
        aria-label={`Theme: ${active.label}. Change theme`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Palette size={19} />
      </button>
      {open && (
        <div className="theme-menu" role="menu" aria-label="Theme">
          <span className="theme-menu-title">Theme</span>
          {THEMES.map(({ value, label, swatches }) => (
            <button
              key={value}
              role="menuitemradio"
              aria-checked={theme === value}
              className={theme === value ? 'active' : ''}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
            >
              <span className="swatches" aria-hidden="true">
                {swatches.map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </span>
              {label}
              {theme === value && (
                <span className="check">
                  <Check size={15} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
