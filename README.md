# Prodman Club Website

An interactive website prototype for the Masters' Union Product Management Club.

The current experience is a framework-neutral living-logo hero. It combines a crisp brand layer with a canvas particle field, pointer-responsive motion, a spectral sheen, and an accessible pause/reduced-motion path.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Validate

```bash
./scripts/check.sh
```

## Key files

- `index.html` — accessible hero structure and fallback content
- `resources/prodman-living-logo/` — canonical reusable animation bundle, assets, previews, and integration guide
- `demo.css` — page-only styles for the standalone preview
- `index.html` — working integration of the reusable bundle
