# Project Handoff

## Current State

**v1 is built** as a Next.js (App Router) app covering all 9 sections from the whiteboard content plan, committed on branch `feat/nextjs-v1` (not yet merged to `main`, not yet deployed). `docs/PRD.md` is the shared source of truth for scope, content provenance, and open decisions — read it before making further content or design changes. The original static prototype (`index.html`, `demo.css`, `resources/prodman-living-logo/`) is kept as historical reference only; it is no longer the served entry point.

## What Has Been Implemented

- Hero (Section 0): the living-logo prototype ported into `components/hero/Hero.tsx` + `useLivingLogo.ts` — same particle field, sheen/scan, pointer response, pause control, reduced-motion fallback, off-screen suspension, now with an added "next event" chip linking to the Events section.
- Members, Events, Mission, Who It's For, Community CTA, Product Breakdown — built from `resources/*.txt` content (see `lib/content.ts` for the typed source and `docs/PRD.md` Section 8 for full verbatim extraction/provenance notes).
- Resources, Projects — honest "Coming Soon" states; no content exists yet for either (`docs/PRD.md` Section 13).
- Persistent sticky site nav + footer (`components/site-nav/`, `components/site-footer/`) with a repeated WhatsApp CTA.
- Typography: Fraunces (display serif, headlines) + Inter (body) via `next/font/google`, self-hosted at build time — per the penguin-capital-influenced hybrid theme in `docs/PRD.md` Section 5b/7.

## Important Files

- `app/page.tsx` — assembles all sections
- `lib/content.ts` — typed content, sourced from `resources/*.txt` with provenance notes inline
- `components/hero/` — the ported living-logo hero
- `components/sections/` — the eight sections below the hero
- `docs/PRD.md` — full product spec, content extraction, and open questions

## How To Run

```bash
npm install
npm run dev
```

## How To Validate

```bash
./scripts/check.sh
```

(runs eslint, tsc --noEmit, and `next build`)

## Known Issues

- Two content conflicts found late and deliberately not auto-resolved: `resources/First-Event.txt` describes a different "Event 1" than the one already built (from `resources/Event-Details.txt`), and `resources/Preview.txt` has alternate hero copy not used in the current build. Needs a decision from the project owner before either supersedes what's live.
- Event registration and newsletter signup are non-functional stubs (`lib/content.ts`'s `registrationUrl`/`whatsappUrl` are `"#"`, and the newsletter form just shows a "coming soon" message on submit) — no backend chosen yet.
- Full core-member roster (President/VP + rest of core team) still missing bios/photos.
- Not yet deployed — branch `feat/nextjs-v1` is committed locally, Vercel connection pending project owner's go-ahead.

## Next Steps

1. Project owner resolves the First-Event.txt / Preview.txt content conflicts.
2. Connect Vercel to this GitHub repo for preview deploys off `feat/nextjs-v1`.
3. Fill remaining content gaps (roster, Resources, Projects) per `docs/PRD.md` Section 13.
4. Wire a real event-registration flow and newsletter backend.

## Notes For Future Codex Sessions

Preserve the animation's pause, visibility, responsive-density, and reduced-motion behavior — now enforced via `useLivingLogo.ts`'s effect cleanup rather than global DOM listeners. Read `docs/PRD.md` before changing content, section order, or visual direction; it supersedes assumptions in this file where the two disagree.
