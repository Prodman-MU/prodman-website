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
