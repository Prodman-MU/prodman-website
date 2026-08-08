# Project Handoff

## Current State

**v1 is built** as a Next.js (App Router) app covering all 9 sections from the whiteboard content plan, committed on branch `feat/nextjs-v1` (not yet merged to `main`, not yet deployed). `docs/PRD.md` is the shared source of truth for scope, content provenance, and open decisions — read it before making further content or design changes. The original static prototype (`index.html`, `demo.css`, `resources/prodman-living-logo/`) is kept as historical reference only; it is no longer the served entry point.

On top of that v1 base, an **Awwwards-elevation pass** (brand preloader, custom cursor, interactive Product Breakdown, page-wide entrance animations) has also been built and committed to `feat/nextjs-v1` — see "Awwwards Elevation Build" below for what it contains, how it was verified, and what's still open.

A follow-on **navigation and runtime-quality pass** continues the earlier Gemini navigation work: the sticky bar has active-section tracking and progress feedback, mobile has a full-viewport editorial menu, and the shared motion layer is hydration-safe under reduced motion. See "Navigation + Runtime QA Continuation" below.

## What Has Been Implemented

- Hero (Section 0): the living-logo prototype ported into `components/hero/Hero.tsx` + `useLivingLogo.ts` — same particle field, sheen/scan, pointer response, pause control, reduced-motion fallback, off-screen suspension, now with an added "next event" chip linking to the Events section.
- Members — a visual-first, seven-person portrait deck using normalized transparent WebP cutouts, direct portrait/dot/arrow selection, swipe, Left/Right/Home/End keyboard control, reduced-motion handling, and full bios disclosed on demand. Fine-pointer hover adds card attraction, 3D tilt, portrait counter-motion, and a restrained glare sweep; touch and reduced-motion paths stay static. Events, Mission, Who It's For, Community CTA, and Product Breakdown remain built from `resources/*.txt` content (see `lib/content.ts` and `docs/PRD.md` Section 8 for provenance).
- Resources, Projects — honest "Coming Soon" states; no content exists yet for either (`docs/PRD.md` Section 13).
- Persistent sticky site nav + footer (`components/site-nav/`, `components/site-footer/`) with a repeated WhatsApp CTA.
- Typography: Fraunces (display serif, headlines) + Inter (body) via `next/font/google`, self-hosted at build time — per the penguin-capital-influenced hybrid theme in `docs/PRD.md` Section 5b/7.

## Awwwards Elevation Build (2026-08-08)

Built via a multi-agent orchestration process (`.agents/` — local scratch notes, gitignored, not part of the repo history) working through 4 milestones, with a Claude Code session doing a second-pass review, fix, and commit/push. Commits on `feat/nextjs-v1`, newest first: `d2f31bd`, `93ee2c3`, `fc82202`, `b5036f3`, `4912261`, `44ef4ab`.

**What's in it:**
- **Brand preloader** (`components/preloader/`): 0→100% counter (~1600ms, cubic ease-out) over the living-logo particle canvas, `sessionStorage`-gated to once per session (`?preloader=force` to replay), instant-skip under `prefers-reduced-motion`, scroll-lock with scrollbar-width compensation to avoid layout shift.
- **Custom cursor** (`components/cursor/`): dual dot+ring, magnetic hover/label states on `a`/`button`/`.cta`/tags via `data-cursor-text`, auto-disabled on touch (`pointer: fine` media query + `touchstart` kill-switch).
- **Interactive Product Breakdown** (`components/sections/ProductBreakdown.tsx`): 5 macro category tabs + an 8-node SVG radial dial (desktop) / horizontal scroll-snap step bar (mobile, <768px) selecting the same 8 stages, full WAI-ARIA tablist + roving-tabindex keyboard nav, `AnimatePresence` crossfade detail card. Title/hook/description/tags stay 100% verbatim from `resources/ProdMan-breakdown.txt`.
- **Page-wide entrance/interaction animation** (`components/motion/`, `components/providers/MotionProvider.tsx`): scroll-triggered `Reveal`/`StaggerContainer`/`StaggerItem` wrapping every section, spring-physics hover/tap on cards and CTAs, all gated behind the hydration-safe `useHydratedReducedMotion()` preference with a static fallback.

## Navigation + Runtime QA Continuation (2026-08-08)

This pass read and reconciled `AGENTS.md`, `docs/PRD.md`, git history, the live working tree, and the prior swarm records in `.agents/` before making changes. It deliberately extends the current navigation work rather than replacing the existing hero, preloader, cursor, dial, or reveal architecture.

**What's in it:**
- **Responsive interaction layer** (`components/site-nav/`): desktop active-section state via `IntersectionObserver`, scroll progress, pointer glow, compact scrolled state, and the existing animated Masters’ Union affiliation lockup.
- **Mobile editorial menu** at `<=900px`: full-viewport clipped reveal, numbered destinations, orbit/grid/noise treatment, active-location state, and a repeated community CTA. At `<=560px`, the redundant top-bar Join button is removed so the 44px Menu control has clear space.
- **Keyboard and modal behavior**: first-link focus on open, contained Tab order, Escape-to-close with focus restoration, close-on-navigation, close-on-desktop-resize, and body scroll lock with scrollbar compensation.
- **Reduced-motion and hydration repair**: `components/motion/useHydratedReducedMotion.ts` uses `useSyncExternalStore` with a stable server snapshot. `Reveal`, `SplitHeading`, `StaggerContainer`, `StaggerItem`, Product Breakdown, SiteNav, and CustomCursor now receive the live preference without changing their server/client trees during hydration.
- **Semantic motion elements**: motion helpers now resolve string tags directly from Framer Motion's proxy, so `as="header"` renders an actual `<header>` instead of falling back to a `<div>`.
- **Runtime cleanup**: the preloader visibility bootstrap now uses Next's `Script strategy="beforeInteractive"`; the intentional `<html>` class mutation is hydration-suppressed; the Product Breakdown pointer animates a stable SVG rotation instead of emitting invalid `x2/y2="undefined"` attributes.

**Verification:**
- `npm run lint`, `npm run typecheck`, `npm run build`, and `./scripts/check.sh` pass. The check script emits sandbox-only npm log-directory warnings but finishes with `Validation completed.`
- Playwright: 320×568, 390×844, and desktop layout checks; no horizontal overflow; active section changed to `Events` after section navigation; open state set `body.style.overflow="hidden"`; first menu link received focus; Escape restored focus to the Menu trigger.
- Fresh normal-motion and reduced-motion sessions produced zero console errors. Reduced motion opened the menu at computed opacity `1` immediately. The remaining reduced-motion console warning is Framer Motion's expected informational notice.
- Temporary QA screenshots were generated under `output/playwright/` during verification and removed afterward; no test captures were added as product assets.

**Issues found and fixed during the Claude Code review pass** (the orchestrator's own reviewers didn't catch these):
1. Fabricated content — the first draft of `ProductBreakdown.tsx`/`lib/content.ts` invented per-stage metrics ("15+ User Interviews", "88% Problem Validation"), a tool stack (Dovetail, Crayon, Strategyzer, ...), and curriculum bullets with zero basis in `resources/ProdMan-breakdown.txt`. Stripped entirely — the dial/tabs UI stayed, the invented stats did not.
2. Duplicate DOM `id` — an interim fix for a mobile-keyboard-nav bug gave both the mobile step buttons and desktop orbital-dial buttons the same `id="pm-tab-N"` (both render at once, one hidden via CSS `display:none`). Fixed by keeping them distinct (`mobile-tab-N` vs `pm-tab-N`) and pointing `aria-labelledby` at both.
3. A copy typo (`it's—again` vs the source's `it—again`) in the Product Breakdown payoff line.

**Verification status:**
- `npm run typecheck`, `npx eslint .`, `npm run build` all pass clean as of the last commit (`d2f31bd`) — re-verified independently after every commit in this pass, not just trusted from the orchestrator's self-reports.
- Milestones 1–3 (preloader/cursor, interactive breakdown, entrance animations) each got an independent reviewer + challenger + forensic-auditor pass from the orchestrator, all CLEAN/APPROVE/PASSED, plus the fixes above from the Claude Code pass.
- **Historical note:** Milestone 4's original swarm reviewer/challenger/auditor did not complete because the orchestrator hit an API quota limit. The follow-on pass above independently reran the full code checks and covered navigation, hydration, console integrity, reduced motion, and the 320px viewport in a real browser. A final cross-browser pass should still exercise every Product Breakdown keyboard path and the custom cursor before production.

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

## Team Photo Pipeline

The seven original portraits remain under `public/team/`. Website-ready transparent cutouts live under `public/team/cutouts/` and are referenced through `lib/content.ts`. Regenerate both segmentation and consistent 4:5 framing with:

```bash
npm run photos:process
```

`scripts/remove-team-backgrounds.mjs` performs AI person segmentation into a temporary lossless cache. `scripts/process-team-photos.mjs` then finds the primary subject, applies the documented per-photo cleanup/framing overrides, and exports 900×1125 alpha WebPs. Akhil’s override removes a retained plant without flattening his hair. Supriya’s replacement formal portrait exports as `supriya-v2.webp` so Next/Image and deployed CDN caches do not reuse the previous cutout.

(runs eslint, tsc --noEmit, and `next build`)

## Known Issues

- `@imgly/background-removal-node` is a development-only dependency used by `npm run photos:process`. `npm audit --omit=dev` reports zero vulnerabilities, while the full development audit reports four upstream findings (one moderate, three high) through its pinned `lodash`, `sharp`, and `zod` transitive dependencies; two currently have no upstream fix. Do not move this toolchain into a server/runtime path.
- Two content conflicts found late and deliberately not auto-resolved: `resources/First-Event.txt` describes a different "Event 1" than the one already built (from `resources/Event-Details.txt`), and `resources/Preview.txt` has alternate hero copy not used in the current build. Needs a decision from the project owner before either supersedes what's live.
- Event registration and newsletter signup are non-functional stubs (`lib/content.ts`'s `registrationUrl`/`whatsappUrl` are `"#"`, and the newsletter form just shows a "coming soon" message on submit) — no backend chosen yet.
- ~~Full core-member roster (President/VP + rest of core team) still missing bios/photos.~~ **Resolved 2026-08-08**: roster is now 7 members (added Sai Harsha Sadhu/President, Akhil Menon, Anusha P. B. — their bios were already in `resources/Team-Summary.txt`, just never extracted) and every member has a photo. No VP found in any source file.
- The original Milestone 4 swarm review did not finish. The follow-on pass has closed the known hydration, invalid-SVG, responsive-menu, and console-error gaps, but full cross-browser Product Breakdown keyboard and custom-cursor QA remains advisable before production.
- Not yet deployed — branch `feat/nextjs-v1` is committed locally and pushed to `origin/feat/nextjs-v1`, Vercel connection pending project owner's go-ahead.

## Next Steps

1. Finish the remaining manual browser matrix: custom cursor hover labels, every Product Breakdown tab/dial keyboard path, Safari/Firefox, and the complete preloader replay sequence. Navigation, 320px overflow, console integrity, and reduced-motion hydration are already verified in Chromium.
2. Project owner resolves the First-Event.txt / Preview.txt content conflicts.
3. Connect Vercel to this GitHub repo for preview deploys off `feat/nextjs-v1`.
4. Fill remaining content gaps (Resources, Projects) per `docs/PRD.md` Section 13.
5. Wire a real event-registration flow and newsletter backend.

## Notes For Future Codex Sessions

Preserve the animation's pause, visibility, responsive-density, and reduced-motion behavior — now enforced via `useLivingLogo.ts`'s effect cleanup rather than global DOM listeners. Read `docs/PRD.md` before changing content, section order, or visual direction; it supersedes assumptions in this file where the two disagree.
