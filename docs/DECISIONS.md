# Decisions

## 2026-08-08 - Build the logo animation as a portable progressive enhancement

- Context: The repository contains brand and content assets but no selected application framework.
- Decision: Build a dependency-free HTML/CSS/Canvas prototype. Keep the real logo image in the DOM and treat particles, sheen, and pointer response as enhancement layers.
- Consequences: The prototype runs immediately, remains visually complete without JavaScript, and can be ported to a future framework. Framework-specific routing and bundling are intentionally deferred.

## 2026-08-08 - Continuous motion must be controllable and resource-aware

- Context: The logo treatment is intended to run continuously as part of the website.
- Decision: Provide a pause control, respect reduced-motion preferences, cap rendering density, and suspend active rendering when the hero is off-screen or the document is hidden.
- Consequences: The animation can remain ambient without violating user motion preferences or consuming unnecessary resources.
