# Project Agent Instructions

## Project Purpose

Build the public website for the Masters' Union Product Management Club, beginning with a distinctive, continuously animated brand identity.

## Stack

- Frontend: Framework-neutral HTML, CSS, and JavaScript prototype
- Backend:
- Database:
- Auth:
- Deployment:
- AI/LLM:
- Other: Canvas 2D particle animation; no runtime dependencies

## Important Folders

```text
image/
resources/
scripts/
docs/
```

## How To Run

```bash
python3 -m http.server 8000
```

## How To Validate

```bash
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
