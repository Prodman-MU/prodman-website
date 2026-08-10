# Project Agent Instructions

## Project Purpose

Build the public website for the Masters' Union Product Management Club, beginning with a distinctive, continuously animated brand identity.

## Stack

- Frontend: Next.js (App Router) + TypeScript + Framer Motion (for scroll/transition animation; not yet used by any shipped section)
- Backend: none yet — Phase 2 is a custom admin panel backed by Supabase (see docs/PRD.md Section 9)
- Database: none yet — Phase 2 Supabase, sketch in docs/PRD.md Section 9
- Auth: none yet — Phase 2, restricted to club exec / @mastersunion.org emails
- Deployment: Vercel (connected to this GitHub repo), not yet live — see docs/PRD.md Section 1 and PLANS.md
- AI/LLM: none
- Other: the original framework-neutral Canvas 2D living-logo prototype (`index.html`, `demo.css`, `resources/prodman-living-logo/`) is kept as historical reference — the canonical implementation is now `components/hero/Hero.tsx` + `components/hero/useLivingLogo.ts`, retaining reduced-motion and off-screen/background-tab suspension without a visible manual pause control.

**Decision resolved 2026-08-08** (was previously an open question in this file): framework is Next.js, not left framework-neutral. See docs/PRD.md Section 9 for the full reasoning and phasing. Please read docs/PRD.md before making further stack, content, or design decisions in this repo — it is the shared source of truth between concurrent sessions working on this project.

## Important Folders

```text
app/            — Next.js App Router pages, layout, global styles
components/     — section + hero + nav/footer React components
lib/content.ts  — typed content sourced from resources/*.txt (see file header)
public/         — served static assets (brand images, team photos)
resources/      — source-of-truth content drafts and brand assets (not served directly)
image/          — legacy asset folder from the pre-Next.js prototype
docs/           — PRD, architecture, decisions, handoff notes
scripts/
```

## How To Run

```bash
npm install
npm run dev
```

## How To Validate

```bash
npm run build
npx eslint .
./scripts/check.sh
```

## Engineering Rules

- Follow existing folder structure.
- Keep changes minimal.
- Prefer TypeScript safety.
- Avoid unnecessary dependencies.
- Do not expose secrets.
- Update docs when behavior changes.

## Database Rules

- Use migrations for schema changes.
- Explain impact before changing tables.
- Preserve existing data unless explicitly asked.

## Definition Of Done

A Codex task is complete only when:

- implementation is finished
- checks are run or limitations are explained
- changed files are summarized
- risks are documented
- docs are updated if needed

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
