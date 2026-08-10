# Implementation Plan

## Living identity prototype — completed 2026-08-08

- [x] Convert the supplied logo into production raster formats
- [x] Build a full-viewport continuous logo animation
- [x] Add pointer response, motion controls, and reduced-motion behavior
- [x] Verify desktop and mobile layouts in a real browser
- [x] Select the production application framework — Next.js (App Router), see docs/DECISIONS.md
- [x] Build the remaining club story, event journey, and team sections

## v1 Next.js build — completed 2026-08-08 (branch `feat/nextjs-v1`, not yet deployed)

- [x] Scaffold Next.js + TypeScript, port the living-logo hero into a client component
- [x] Build Members, Events, Mission, Who It's For, Community CTA, Product Breakdown from `resources/*.txt`
- [x] Honest "Coming Soon" states for Resources and Projects (no content exists yet)
- [x] Persistent site nav + footer
- [x] `npm run build`, `npx eslint .`, `tsc --noEmit` all pass clean
- [x] Verified in a real browser at desktop + mobile viewports (hero motion, pause control, layout)
- [x] Committed to `feat/nextjs-v1`
- [ ] Resolve `resources/First-Event.txt` / `resources/Preview.txt` content conflicts (see docs/HANDOFF.md Known Issues)
- [ ] Connect Vercel to Prodman-MU/prodman-website and deploy a preview
- [x] Fill remaining content: full core-member roster (7 members incl. President, all with photos — 2026-08-08)
- [ ] Fill remaining content: Resources, Projects
- [ ] Wire event registration + newsletter backends

## Awwwards elevation build — completed 2026-08-08 (branch `feat/nextjs-v1`, pushed, not yet deployed)

- [x] Brand preloader (0-100%, session-gated) + custom cursor (touch-safe)
- [x] Interactive Product Breakdown: category tabs + SVG radial dial / mobile step bar
- [x] Page-wide scroll-entrance animations + hover micro-interactions (Framer Motion)
- [x] Removed fabricated metrics/tools/curriculum content from Product Breakdown (see docs/HANDOFF.md)
- [x] Fixed a mobile-keyboard-nav accessibility bug and a duplicate-DOM-id bug the orchestrator's own reviewers missed
- [x] `npm run typecheck`, `npx eslint .`, `npm run build` all pass clean; committed and pushed in 3 staged commits
- [x] Follow-on independent code/runtime review: lint, typecheck, build, project check, hydration and console integrity
- [x] Chromium navigation QA at 320px, 390px, and desktop; active section, focus trap, Escape, scroll lock, and reduced-motion verified
- [ ] Complete manual browser matrix: custom cursor, every dial keyboard path, Safari/Firefox, full forced-preloader replay

## Navigation and interaction continuation — completed 2026-08-08

- [x] Preserve and extend the existing Gemini sticky-nav work
- [x] Add active-section state and current-location semantics
- [x] Add a full-viewport numbered mobile menu inspired by the reference site's interaction principles
- [x] Add focus containment, Escape restoration, scroll lock, breakpoint cleanup, and 44px touch controls
- [x] Repair reduced-motion hydration across shared motion components
- [x] Remove invalid SVG endpoint animation warnings from Product Breakdown
- [x] Record the continuation in `docs/HANDOFF.md` and `docs/DECISIONS.md`

## Editorial neo-brutalist light mode — completed 2026-08-08

- [x] Add system-aware first-visit theming and persisted explicit selection without first-paint flash
- [x] Add visible light/dark controls to the hero and sticky navigation
- [x] Theme the hero/preloader Canvas 2D particle palettes and compositing modes
- [x] Apply warm-paper neo-brutalist treatments across every section, navigation/menu, cursor, and footer
- [x] Preserve dark mode, reduced motion, mobile behavior, and semantic markup
- [x] Verify desktop/mobile rendering, persistence, overflow, mobile menu focus/scroll lock, and browser console integrity

## Light-first startup and event lead — completed 2026-08-10

- [x] Start every full page load in light mode, ignoring system preference and old stored theme data
- [x] Keep dark mode available as a non-persisted choice for the current visit
- [x] Keep Event 01 expanded by default so its details are visible without a click
- [x] Update the PRD, decisions, architecture, and handoff contracts

## Relevant Files

- `app/page.tsx`, `lib/content.ts`, `components/`
- `resources/prodman-living-logo/` — original prototype, kept as reference (see docs/HANDOFF.md)
- `docs/PRD.md` — full spec and open questions

## Validation

```bash
./scripts/check.sh
```

The prototype was checked at 1440×1000 and 390×844 in Chromium, including pause and reduced-motion behavior. The full v1 build was re-verified the same way after the Next.js port.
