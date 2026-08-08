#!/usr/bin/env bash
set -euo pipefail

echo "Starting project validation..."

if [ -f "index.html" ] && [ -f "resources/prodman-living-logo/prodman-living-logo.js" ] && [ -f "resources/prodman-living-logo/prodman-living-logo.css" ]; then
  echo "Detected static website prototype."
  echo "Checking JavaScript syntax..."
  node --check resources/prodman-living-logo/prodman-living-logo.js

  echo "Checking reusable living-logo bundle..."
  test -s resources/prodman-living-logo/Prodman-Logo.png
  test -s resources/prodman-living-logo/Prodman-Logo.ico
  test -s resources/prodman-living-logo/embed.html
  test -s resources/prodman-living-logo/README.md
  test -s resources/prodman-living-logo/preview-desktop.png
  test -s resources/prodman-living-logo/preview-mobile.png

  echo "Checking local references..."
  grep -q 'href="resources/prodman-living-logo/prodman-living-logo.css"' index.html
  grep -q 'src="resources/prodman-living-logo/prodman-living-logo.js"' index.html
  grep -q 'data-logo-src="resources/prodman-living-logo/Prodman-Logo.png"' index.html
fi

if [ -f "package.json" ]; then
  echo "Detected Node/TypeScript project."

  if npm run | grep -q " lint"; then
    echo "Running lint..."
    npm run lint
  fi

  if npm run | grep -q " typecheck"; then
    echo "Running typecheck..."
    npm run typecheck
  fi

  if npm run | grep -q " test"; then
    echo "Running tests..."
    npm run test
  fi

  if npm run | grep -q " build"; then
    echo "Running build..."
    npm run build
  fi
fi

if [ -f "pyproject.toml" ] || [ -f "requirements.txt" ]; then
  echo "Detected Python project."

  if command -v ruff >/dev/null 2>&1; then
    echo "Running ruff..."
    ruff check .
  fi

  if command -v pytest >/dev/null 2>&1; then
    echo "Running pytest..."
    python -m pytest
  fi

  if command -v mypy >/dev/null 2>&1; then
    echo "Running mypy..."
    mypy .
  fi
fi

echo "Validation completed."
