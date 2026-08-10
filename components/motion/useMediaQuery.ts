"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe media query match. Mirrors useHydratedReducedMotion's
 * pattern: server/first paint assumes no match, then syncs to the live value.
 */
export function useMediaQuery(query: string) {
  function subscribe(onStoreChange: () => void) {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", onStoreChange);
    return () => mediaQuery.removeEventListener("change", onStoreChange);
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  function getServerSnapshot() {
    return false;
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
