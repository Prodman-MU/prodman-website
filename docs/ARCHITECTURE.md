# Architecture

## Purpose

The production deliverable is a static-rendered Next.js App Router site with isolated client components for animation and interaction. The original portable living-logo prototype remains as historical reference; the React port is canonical.

## Layers

- `app/layout.tsx` owns fonts, metadata, the preloader bootstrap, and global motion/cursor providers.
- `app/page.tsx` is a Server Component that assembles the nine-section page.
- `lib/content.ts` is the typed content boundary sourced from `resources/*.txt`.
- `components/hero/` owns the canonical Canvas 2D living-logo runtime.
- `components/motion/` owns reusable reveal/stagger primitives and the hydration-safe reduced-motion store.
- `components/site-nav/` owns scroll progress, current-section observation, and the responsive modal menu.
- `components/sections/` owns section-local layouts and the interactive Product Breakdown client state.
- `resources/prodman-living-logo/` and the root `index.html`/`demo.css` remain historical prototype references, not served application entry points.

## Runtime behavior

The particle field is rebuilt when its section resizes, caps device pixel ratio at 2, lowers the particle count on small screens, pauses while off-screen or in a background tab, and reacts locally to pointer movement. Users can pause motion, and `prefers-reduced-motion` receives a static composition.

## Interaction and hydration contracts

- Keep `app/page.tsx` server-rendered; place browser state and event listeners at the smallest client-component boundary.
- Motion preference must use `useHydratedReducedMotion()` where it affects rendered properties or variants. Do not branch to a different semantic tree during hydration.
- Modal navigation must restore body styles and event listeners on every close/unmount path.
- Canvas and scroll observers must clean up animation frames, media listeners, and observers; the hero remains suspendable off-screen and in background tabs.
- Every decorative animation requires a static/reduced-motion path, and hidden breakpoint variants must not duplicate DOM IDs.
