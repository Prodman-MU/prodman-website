export type ColorTheme = "dark" | "light";

export const THEME_CHANGE_EVENT = "prodman:theme-change";

export function getDocumentTheme(): ColorTheme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyDocumentTheme(theme: ColorTheme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  window.dispatchEvent(new CustomEvent<ColorTheme>(THEME_CHANGE_EVENT, { detail: theme }));
}
