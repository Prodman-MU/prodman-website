# Project Handoff

## Current State

The first living-logo hero prototype is packaged under `resources/prodman-living-logo/`, with `index.html` serving as the working integration demo.

## What Has Been Implemented

- Responsive full-viewport hero
- Canvas particle field sampled from the supplied transparent logo
- Subtle continuous sheen, scan, ambient drift, and pointer response
- Pause control, reduced-motion fallback, and off-screen suspension

## Important Files

- `index.html`
- `resources/prodman-living-logo/README.md`
- `resources/prodman-living-logo/embed.html`
- `resources/prodman-living-logo/prodman-living-logo.css`
- `resources/prodman-living-logo/prodman-living-logo.js`

## How To Run

`python3 -m http.server 8000`

## How To Validate

`./scripts/check.sh`

## Known Issues

The final production framework and page architecture have not been selected yet.

## Next Steps

Choose the final application stack, integrate the reusable `brand-orbit` bundle, and build the event journey from `resources/Event-Details.txt`.

## Notes For Future Codex Sessions

Preserve the animation's pause, visibility, responsive-density, and reduced-motion behavior during any framework port.
