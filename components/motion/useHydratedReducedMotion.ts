"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe reduced-motion preference.
 *
 * React uses the stable server snapshot for SSR and hydration, then updates to
 * the live media-query value. This prevents the semantic tree and Framer Motion
 * attributes from diverging during hydration on devices with reduced motion.
 */
export function useHydratedReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
