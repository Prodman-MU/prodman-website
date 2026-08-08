# Project Handoff

## Current State

**v1 is built** as a Next.js (App Router) app covering all 9 sections from the whiteboard content plan, committed on branch `feat/nextjs-v1` (not yet merged to `main`, not yet deployed). `docs/PRD.md` is the shared source of truth for scope, content provenance, and open decisions — read it before making further content or design changes. The original static prototype (`index.html`, `demo.css`, `resources/prodman-living-logo/`) is kept as historical reference only; it is no longer the served entry point.

On top of that v1 base, an **Awwwards-elevation pass** (brand preloader, custom cursor, interactive Product Breakdown, page-wide entrance animations) has also been built and committed to `feat/nextjs-v1` — see "Awwwards Elevation Build" below for what it contains, how it was verified, and what's still open.

## What Has Been Implemented

- Hero (Section 0): the living-logo prototype ported into `components/hero/Hero.tsx` + `useLivingLogo.ts` — same particle field, sheen/scan, pointer response, pause control, reduced-motion fallback, off-screen suspension, now with an added "next event" chip linking to the Events section.
- Members, Events, Mission, Who It's For, Community CTA, Product Breakdown — built from `resources/*.txt` content (see `lib/content.ts` for the typed source and `docs/PRD.md` Section 8 for full verbatim extraction/provenance notes).
- Resources, Projects — honest "Coming Soon" states; no content exists yet for either (`docs/PRD.md` Section 13).
- Persistent sticky site nav + footer (`components/site-nav/`, `components/site-footer/`) with a repeated WhatsApp CTA.
- Typography: Fraunces (display serif, headlines) + Inter (body) via `next/font/google`, self-hosted at build time — per the penguin-capital-influenced hybrid theme in `docs/PRD.md` Section 5b/7.

## Awwwards Elevation Build (2026-08-08)

Built via a multi-agent orchestration process (`.agents/` — local scratch notes, gitignored, not part of the repo history) working through 4 milestones, with a Claude Code session doing a second-pass review, fix, and commit/push. Commits on `feat/nextjs-v1`, newest first: `d2f31bd`, `93ee2c3`, `fc82202`, `b5036f3`, `4912261`, `44ef4ab`.

**What's in it:**
- **Brand preloader** (`components/preloader/`): 0→100% counter (~1600ms, cubic ease-out) over the living-logo particle canvas, `sessionStorage`-gated to once per session (`?preloader=force` to replay), instant-skip under `prefers-reduced-motion`, scroll-lock with scrollbar-width compensation to avoid layout shift.
- **Custom cursor** (`components/cursor/`): dual dot+ring, magnetic hover/label states on `a`/`button`/`.cta`/tags via `data-cursor-text`, auto-disabled on touch (`pointer: fine` media query + `touchstart` kill-switch).
- **Interactive Product Breakdown** (`components/sections/ProductBreakdown.tsx`): 5 macro category tabs + an 8-node SVG radial dial (desktop) / horizontal scroll-snap step bar (mobile, <768px) selecting the same 8 stages, full WAI-ARIA tablist + roving-tabindex keyboard nav, `AnimatePresence` crossfade detail card. Title/hook/description/tags stay 100% verbatim from `resources/ProdMan-breakdown.txt`.
- **Page-wide entrance/interaction animation** (`components/motion/`, `components/providers/MotionProvider.tsx`): scroll-triggered `Reveal`/`StaggerContainer`/`StaggerItem` wrapping every section, spring-physics hover/tap on cards and CTAs, all gated behind `useReducedMotion()` with a static fallback.

**Issues found and fixed during the Claude Code review pass** (the orchestrator's own reviewers didn't catch these):
1. Fabricated content — the first draft of `ProductBreakdown.tsx`/`lib/content.ts` invented per-stage metrics ("15+ User Interviews", "88% Problem Validation"), a tool stack (Dovetail, Crayon, Strategyzer, ...), and curriculum bullets with zero basis in `resources/ProdMan-breakdown.txt`. Stripped entirely — the dial/tabs UI stayed, the invented stats did not.
2. Duplicate DOM `id` — an interim fix for a mobile-keyboard-nav bug gave both the mobile step buttons and desktop orbital-dial buttons the same `id="pm-tab-N"` (both render at once, one hidden via CSS `display:none`). Fixed by keeping them distinct (`mobile-tab-N` vs `pm-tab-N`) and pointing `aria-labelledby` at both.
3. A copy typo (`it's—again` vs the source's `it—again`) in the Product Breakdown payoff line.

**Verification status:**
- `npm run typecheck`, `npx eslint .`, `npm run build` all pass clean as of the last commit (`d2f31bd`) — re-verified independently after every commit in this pass, not just trusted from the orchestrator's self-reports.
- Milestones 1–3 (preloader/cursor, interactive breakdown, entrance animations) each got an independent reviewer + challenger + forensic-auditor pass from the orchestrator, all CLEAN/APPROVE/PASSED, plus the fixes above from the Claude Code pass.
- **Milestone 4 (final independent cross-check) did not complete** — the orchestrator hit an API quota limit while its M4 reviewer/challenger/auditor subagents were still initializing (workspace files only, no findings). Worker M4's own self-check (build/lint/typecheck + a self-audit against R1–R4) passed, but nothing independent verified that self-check. Treat M4 as "implementer says done, not independently confirmed."
- No live browser QA was done by the Claude Code session in this pass — the shared Playwright automation profile stayed locked (likely by the orchestrator's own browser-driven challengers) for the duration. Do a manual pass (preloader, cursor, dial on both breakpoints, reduced-motion, 320px) before shipping.

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
- `public/team/akshat.jpeg` and `public/team/anusha.png` exist on disk (untracked, not committed) but aren't wired into `lib/content.ts` — both members still show `photo: null`. Someone was mid-way through adding these when the Awwwards elevation work started; finish wiring them up or drop the files.
- Milestone 4's independent final review (see "Awwwards Elevation Build" above) never ran — only the implementer's self-check did. Worth a real second look before this ships, especially the interactive Product Breakdown's keyboard navigation and the reduced-motion paths, since those are exactly where the orchestrator's own reviewers missed real bugs earlier in this same build.
- Not yet deployed — branch `feat/nextjs-v1` is committed locally and pushed to `origin/feat/nextjs-v1`, Vercel connection pending project owner's go-ahead.

## Next Steps

1. Manual browser QA of the Awwwards elevation build: preloader (including `?preloader=force` replay), custom cursor on desktop, Product Breakdown dial at desktop + mobile + 320px, `prefers-reduced-motion: reduce` behavior site-wide.
2. Project owner resolves the First-Event.txt / Preview.txt content conflicts.
3. Decide on `public/team/akshat.jpeg` / `anusha.png` — wire into `lib/content.ts` or remove.
4. Connect Vercel to this GitHub repo for preview deploys off `feat/nextjs-v1`.
5. Fill remaining content gaps (roster, Resources, Projects) per `docs/PRD.md` Section 13.
6. Wire a real event-registration flow and newsletter backend.

## Notes For Future Codex Sessions

Preserve the animation's pause, visibility, responsive-density, and reduced-motion behavior — now enforced via `useLivingLogo.ts`'s effect cleanup rather than global DOM listeners. Read `docs/PRD.md` before changing content, section order, or visual direction; it supersedes assumptions in this file where the two disagree.
