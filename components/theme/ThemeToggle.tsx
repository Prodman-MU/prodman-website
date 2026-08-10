"use client";

import { useEffect, useState } from "react";
import {
  applyDocumentTheme,
  getDocumentTheme,
  THEME_CHANGE_EVENT,
  type ColorTheme,
} from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ColorTheme>("light");

  useEffect(() => {
    const syncTheme = (event: Event) => {
      setTheme((event as CustomEvent<ColorTheme>).detail ?? getDocumentTheme());
    };

    queueMicrotask(() => setTheme(getDocumentTheme()));
    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = getDocumentTheme() === "light" ? "dark" : "light";
    applyDocumentTheme(nextTheme);
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
      <span className={styles.iconFrame} aria-hidden="true">
        <svg className={`${styles.icon} ${styles.sunIcon}`} viewBox="0 0 24 24">
          <rect x="9" y="9" width="6" height="6" fill="currentColor" />
          <path
            d="M12 2V6M12 18V22M2 12H6M18 12H22M4.9 4.9L7.7 7.7M16.3 16.3L19.1 19.1M19.1 4.9L16.3 7.7M7.7 16.3L4.9 19.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <svg className={`${styles.icon} ${styles.moonIcon}`} viewBox="0 0 24 24">
          <path
            d="M18.4 16.7A8.1 8.1 0 0 1 7.3 5.6a7.7 7.7 0 1 0 11.1 11.1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
    </button>
  );
}
