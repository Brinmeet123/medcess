export const THEME_STORAGE_KEY = 'medcess-theme'

export type ThemeMode = 'light' | 'dark'

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(THEME_STORAGE_KEY)
  return v === 'dark' || v === 'light' ? v : null
}

export function resolveTheme(stored: ThemeMode | null, prefersDark: boolean): ThemeMode {
  if (stored) return stored
  return prefersDark ? 'dark' : 'light'
}

export function applyThemeToDocument(theme: ThemeMode): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

/** Inline boot script — keep in sync with ThemeScript / ThemeProvider. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='dark'||s==='light'?s:(d?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`
