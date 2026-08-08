# Architecture

## Purpose

The current deliverable is a portable living-logo hero that can run standalone now and move into a future component framework without redesigning the motion system.

## Layers

- `index.html` owns semantic content, the accessible motion control, and the static logo fallback.
- `resources/prodman-living-logo/prodman-living-logo.css` owns the component-scoped visual system, spectral mask, scan treatment, responsive layout, and reduced-motion styles.
- `resources/prodman-living-logo/prodman-living-logo.js` samples the bundled transparent logo alpha channel into a bounded Canvas 2D particle field.
- `resources/prodman-living-logo/embed.html` is the portable markup contract; `index.html` demonstrates its integration.

## Runtime behavior

The particle field is rebuilt when its section resizes, caps device pixel ratio at 2, lowers the particle count on small screens, pauses while off-screen or in a background tab, and reacts locally to pointer movement. Users can pause motion, and `prefers-reduced-motion` receives a static composition.

## Integration

The entire `brand-orbit` bundle is intentionally self-contained under `resources/prodman-living-logo/`. In React or Next.js, move the markup into a client component, keep the CSS scoped to that component, and move the animation lifecycle into an effect with equivalent cleanup for observers, listeners, and animation frames.
