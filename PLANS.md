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
- [ ] Fill remaining content: full core-member roster, Resources, Projects
- [ ] Wire event registration + newsletter backends

## Relevant Files

- `app/page.tsx`, `lib/content.ts`, `components/`
- `resources/prodman-living-logo/` — original prototype, kept as reference (see docs/HANDOFF.md)
- `docs/PRD.md` — full spec and open questions

## Validation

```bash
./scripts/check.sh
```

The prototype was checked at 1440×1000 and 390×844 in Chromium, including pause and reduced-motion behavior. The full v1 build was re-verified the same way after the Next.js port.
