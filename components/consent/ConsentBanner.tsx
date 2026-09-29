"use client";

import { useEffect, useState } from "react";
import styles from "./ConsentBanner.module.css";

const STORAGE_KEY = "prodman_consent";
export const OPEN_CONSENT_EVENT = "prodman:open-consent";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wait a beat so the banner doesn't compete with the preloader.
    const timer = window.setTimeout(() => {
      if (readChoice() === null) setOpen(true);
    }, 1800);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  function choose(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    window.gtag?.("consent", "update", { analytics_storage: choice });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p>
        We use anonymous analytics cookies to count how many people visit the club site each day. No ads, no
        selling data.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className={styles.primary} onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
