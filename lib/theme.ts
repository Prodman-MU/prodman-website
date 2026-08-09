export type ColorTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "prodman_color_theme";
export const THEME_CHANGE_EVENT = "prodman:theme-change";

export function getDocumentTheme(): ColorTheme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyDocumentTheme(theme: ColorTheme, persist = false) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked in privacy-restricted browsing contexts.
    }
  }

  window.dispatchEvent(new CustomEvent<ColorTheme>(THEME_CHANGE_EVENT, { detail: theme }));
}

export function hasStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "dark" || storedTheme === "light";
  } catch {
    return false;
  }
}
