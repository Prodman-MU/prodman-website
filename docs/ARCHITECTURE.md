# Architecture

## Purpose

The production deliverable is a static-rendered Next.js App Router site with isolated client components for animation and interaction. The original portable living-logo prototype remains as historical reference; the React port is canonical.

## Layers

- `app/layout.tsx` owns fonts, metadata, the preloader/theme bootstraps, and global motion/cursor providers.
- `app/page.tsx` is a Server Component that assembles the nine-section page.
- `lib/content.ts` is the typed content boundary sourced from `resources/*.txt`.
- `app/events/[slug]/page.tsx` statically generates announced events from `getFullEvents()`. The shared homepage accordion links to each detail page. `photos` represents completed-event photography; `posters` represents promotional artwork and does not suppress registration. `EventGallery` shares enlarge, arrow navigation, download, Escape, focus containment/restoration, and scroll locking between both; posters retain their full aspect ratio. `EventCountdown` uses an optional ISO `startsAt` and India calendar dates, with date-only events falling back to midnight IST.
- `components/hero/` owns the canonical Canvas 2D living-logo runtime.
- `components/motion/` owns reusable reveal/stagger primitives and the hydration-safe reduced-motion store.
- `components/theme/ThemeToggle.tsx` owns the interactive light/dark icon control; the `beforeInteractive` script in `app/layout.tsx` bootstraps the root `data-theme` attribute synchronously before first paint.
- `components/site-nav/` owns scroll progress, current-section observation, and the responsive modal menu.
- `components/sections/` owns section-local layouts, the visual-first Members portrait-deck state, and the interactive Product Breakdown client state.
- `scripts/remove-team-backgrounds.mjs` and `scripts/process-team-photos.mjs` form the reproducible two-stage team-photo pipeline: AI segmentation to a temporary cache, then deterministic cleanup/framing to transparent WebP assets.
- `resources/prodman-living-logo/` and the root `index.html`/`demo.css` remain historical prototype references, not served application entry points.

## Runtime behavior

The particle field is rebuilt when its section resizes, caps device pixel ratio at 2, lowers the particle count on small screens, pauses while off-screen or in a background tab, and reacts locally to pointer movement. `prefers-reduced-motion` receives a static composition.

Ambient and pointer displacement stays inside a responsive, logo-local motion envelope. The particle targets and ghost logo use the same 72vw desktop / 88vw mobile geometry so the two layers remain registered instead of spilling into separate outer bands.

## Interaction and hydration contracts

- Keep `app/page.tsx` server-rendered; place browser state and event listeners at the smallest client-component boundary.
- Render `data-theme="light"` at the document root on every full page load. Theme controls may update the root attribute and `color-scheme` for the current visit, but must not read or persist browser preference or change the semantic tree.
- Canvas renderers must read the active theme and switch both palette and compositing mode; CSS-only inversion is insufficient for the living logo.
- Motion preference must use `useHydratedReducedMotion()` where it affects rendered properties or variants. Do not branch to a different semantic tree during hydration.
- Modal navigation must restore body styles and event listeners on every close/unmount path.
- Canvas and scroll observers must clean up animation frames, media listeners, and observers; the hero remains suspendable off-screen and in background tabs.
- Every decorative animation requires a static/reduced-motion path, and hidden breakpoint variants must not duplicate DOM IDs.
- The Members deck keeps all portraits in one semantic carousel region, exposes only the active portrait and its verified actions in the keyboard tab order, and moves focus with Left/Right/Home/End selection changes. Portrait activation scrolls to the synchronized inline profile; long bios remain available through native disclosure controls rather than occupying the default layout.
- Members card magnetism is implemented with pointer-updated CSS custom properties, not React render state. It resets on pointer exit/selection change and is bypassed for touch pointers and reduced-motion users.
- `app/team/[slug]/page.tsx` statically generates the seven shareable member profiles from `lib/content.ts`; unknown slugs 404 because `dynamicParams` is disabled.
