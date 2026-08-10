# Decisions

## 2026-08-08 - Build the logo animation as a portable progressive enhancement

- Context: The repository contains brand and content assets but no selected application framework.
- Decision: Build a dependency-free HTML/CSS/Canvas prototype. Keep the real logo image in the DOM and treat particles, sheen, and pointer response as enhancement layers.
- Consequences: The prototype runs immediately, remains visually complete without JavaScript, and can be ported to a future framework. Framework-specific routing and bundling are intentionally deferred.

## 2026-08-08 - Continuous motion must be controllable and resource-aware

- Context: The logo treatment is intended to run continuously as part of the website.
- Decision: Provide a pause control, respect reduced-motion preferences, cap rendering density, and suspend active rendering when the hero is off-screen or the document is hidden.
- Consequences: The animation can remain ambient without violating user motion preferences or consuming unnecessary resources.

## 2026-08-08 - Adopt Next.js (App Router) as the production framework, port the living-logo as-is

- Context: `docs/HANDOFF.md` had left the framework choice open. In parallel, docs/PRD.md (a separate session with the project owner) worked through the same decision and landed on Next.js + Framer Motion, with the existing Canvas 2D hero kept rather than rebuilt in WebGL/React Three Fiber — see docs/PRD.md Section 9 for the full reasoning.
- Decision: Scaffold a Next.js (App Router, TypeScript) app at the repo root. Port `resources/prodman-living-logo/` into `components/hero/Hero.tsx` + `components/hero/useLivingLogo.ts` as a client component, preserving the exact pause/reduced-motion/off-screen-suspension contract via effect cleanup. Build the remaining eight sections (Members, Events, Mission, Who It's For, Community, Product Breakdown, Resources, Projects) from content already drafted in `resources/*.txt`, using honest "Coming Soon" states for Resources/Projects rather than fabricated content.
- Consequences: The original static prototype (`index.html`, `demo.css`, `resources/prodman-living-logo/`) is kept in place as historical reference, not deleted — it is no longer the served entry point. `AGENTS.md`'s Stack section is updated to match. Design direction (typography, motifs) follows the penguin-capital.co.jp-influenced hybrid theme decided in docs/PRD.md Section 5b; the neon accent palette (`--acid`, `--cyan`) is unchanged. Two content conflicts were found but deliberately not auto-resolved: `resources/First-Event.txt` describes a different "Event 1" than the one already built from `resources/Event-Details.txt`, and `resources/Preview.txt` has alternate hero copy — see docs/PRD.md open questions before treating either file as authoritative.

## 2026-08-08 - Make navigation a responsive interaction layer, not a collapsed link row

- Context: The desktop navigation enhancement had progress and hover treatment, but below 900px all eight section links disappeared and only the Join CTA remained. The reference audit identifies a full-screen mobile menu, numbered editorial navigation, fixed layering, and a consistent exponential-out curve as important interaction principles.
- Decision: Keep the existing sticky-after-hero information architecture, add active-section tracking on desktop, and introduce an original full-viewport mobile menu using ProdMan typography, acid/cyan accents, orbit lines, and the existing content. Treat it as a modal interaction with focus containment, Escape restoration, body scroll lock, close-on-navigation, and reduced-motion support.
- Consequences: Every section is reachable at 320px; desktop and mobile share one current-location state; no reference branding, assets, or source code are copied. `whatsappUrl` remains `"#"` until the project owner supplies a real destination.

## 2026-08-08 - Keep reduced-motion preference hydration-stable

- Context: Framer Motion's live `useReducedMotion()` value caused the first client render to differ from server HTML on reduced-motion devices, including a semantic `<header>` becoming a `<div>`. Product Breakdown also emitted invalid SVG endpoint values through attribute animation.
- Decision: Read reduced-motion via `useSyncExternalStore` with `false` as the server snapshot, then update to the live media query after hydration. Keep semantic markup identical in all preference states, use Next's `beforeInteractive` Script component for the preloader class bootstrap, and animate the dial pointer by rotating a line with fixed endpoints.
- Consequences: Fresh normal and reduced-motion Chromium sessions hydrate with zero console errors. Reduced-motion users receive immediate/static transitions without sacrificing semantic HTML or triggering React recovery rendering.

## 2026-08-08 - Make the Members section portrait-first, with depth on demand

- Context: The original seven-card grid gave every long biography equal visual weight, making “The people behind ProdMan” read like a directory. The product direction calls for the image-led pacing seen in the supplied The Hub Bengaluru reference, without copying its branding, copy, or exact composition.
- Decision: Replace the grid with an original ProdMan portrait deck built from the existing seven profiles and normalized cutouts. Keep one active person in focus, surface only their name, role, and sourced superpower by default, and place the full bio behind a native disclosure. Support card selection, arrows, dots, swipe gestures, and Left/Right/Home/End keyboard controls. Add fine-pointer magnetic tilt, portrait parallax, and glare without React state churn; remove these responses under touch/reduced motion.
- Consequences: The section’s first impression is people and personality rather than paragraphs. No profile content is deleted, every member and outbound link remains reachable, keyboard focus follows selection, and the interaction uses the existing acid/cyan visual system instead of reproducing the reference site. The source-photo cleanup is repeatable through `npm run photos:process`, with per-person overrides documented in the processing script rather than hidden as one-off manual edits.

## 2026-08-08 - Add a system-aware editorial neo-brutalist light mode

- Context: The shipped identity was dark-only. The project owner approved a full-site light counterpart using a 70% neo-brutalist / 30% editorial balance rather than a mechanical palette inversion.
- Decision: Preserve dark mode and add a visible `LIGHT / DARK` control to the single site navigation across its hero and sticky states. Follow the operating-system preference on first visit, persist explicit choices in `localStorage`, and set `data-theme` synchronously before first paint. Light mode uses warm paper, near-black ink, acid/cyan brand accents, square controls, 2px structural borders, hard offset shadows, alternating section fields, and the existing Fraunces/Inter/mono typography. The hero and preloader canvases use theme-specific particle palettes and blending modes.
- Consequences: Both modes retain the same semantic tree, content, motion controls, reduced-motion behavior, and responsive interactions. The light treatment spans the preloader, living-logo hero, custom cursor, navigation/menu, every section, Product Breakdown, and footer. The dark visual system remains the default server fallback; browser preference is applied before paint without a theme flash.

## 2026-08-09 - Separate quick member discovery from full profile reading

- Context: The portrait deck needs visible role and contact actions while retaining its swipe/select behavior. The project owner also wants a full profile destination for each member and a card gesture that reveals the inline information.
- Decision: Keep the nameplate, add owner-confirmed President/Vice President/Member stamps, and show Read More plus only the verified LinkedIn/Email actions on the active card. A portrait tap/click selects the member and scrolls to the synchronized inline profile; Read More navigates in the same tab to a statically generated `/team/[slug]` page. Do not use long-press because it conflicts with deck swiping, browser gestures, keyboard access, and discoverability.
- Consequences: The homepage remains a fast visual introduction while every profile has a durable shareable URL and complete sourced story. Missing contacts are omitted rather than fabricated, and all seven routes are prerendered from the typed member registry.

## 2026-08-10 - Start every fresh page load in light mode

- Context: The earlier theme contract followed the operating-system preference and persisted an explicit choice. The project owner now wants the public site to open in light mode regardless of system preference or previously stored browser data.
- Decision: Render `data-theme="light"` directly on the root document and stop reading or writing theme preference in `localStorage`. Keep the existing theme control, but treat dark mode as a visit-local choice that resets to light on the next full page load.
- Consequences: The first paint is deterministically light without a theme-bootstrap script or hydration flash. Dark mode and both theme-aware canvases remain available during the live visit, while old `prodman_color_theme` values are ignored. The Events accordion continues to initialize with Event 01 expanded so its lead event is visible without a click.

## 2026-08-10 - Replace the text theme control with branded icons

- Context: The boxed `LIGHT / DARK` label carried more visual weight than the adjacent two-line mobile menu and introduced button chrome into the otherwise minimal navigation controls.
- Decision: Use custom square-cored sun and angular crescent SVGs with the menu glyph's line weight. Keep both icons in the rendered tree, let the root theme attribute select the visible state, and leave the 44px control transparent and shadow-free except for its keyboard-only focus outline.
- Consequences: The theme and menu controls now share one zero-gap layout group and read as a single neo-brutalist icon pair at every viewport. The menu trigger remains available on desktop as well as mobile. To keep the navigation strictly one row, the redundant inline section-link strip is non-wrapping on wide screens and hidden at `<=1280px`, where the same destinations remain available in the menu. The accessible theme label still announces the destination mode, reduced-motion users receive an instant state change, and the current light-first visit contract remains unchanged.
