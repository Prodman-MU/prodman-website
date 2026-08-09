"use client";

import { useEffect, useState } from "react";
import {
  applyDocumentTheme,
  getDocumentTheme,
  hasStoredTheme,
  THEME_CHANGE_EVENT,
  type ColorTheme,
} from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ColorTheme>("dark");

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
    const syncTheme = (event: Event) => {
      setTheme((event as CustomEvent<ColorTheme>).detail ?? getDocumentTheme());
    };
    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (!hasStoredTheme()) applyDocumentTheme(event.matches ? "light" : "dark");
    };

    queueMicrotask(() => setTheme(getDocumentTheme()));
    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    systemTheme.addEventListener("change", followSystemTheme);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
      systemTheme.removeEventListener("change", followSystemTheme);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = getDocumentTheme() === "light" ? "dark" : "light";
    applyDocumentTheme(nextTheme, true);
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "light"}
      data-cursor-text="Theme"
    >
      <span className={styles.lightLabel}>Light</span>
      <span className={styles.divider} aria-hidden="true">
        /
      </span>
      <span className={styles.darkLabel}>Dark</span>
    </button>
  );
}
