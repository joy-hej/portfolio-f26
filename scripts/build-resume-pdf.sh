#!/usr/bin/env bash
# Rebuild public/Joy-He-Resume.pdf from Figma Letter-2 content.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKDIR="${TMPDIR:-/tmp}/resume-pdf-build"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$WORKDIR"
cp "$ROOT/node_modules/@fontsource/poppins/files/poppins-latin-300-normal.woff2" "$WORKDIR/poppins-300.woff2"
cp "$ROOT/node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2" "$WORKDIR/poppins-700.woff2"
cp "$ROOT/scripts/resume-pdf.html" "$WORKDIR/resume.html"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$ROOT/public/Joy-He-Resume.pdf" \
  "file://$WORKDIR/resume.html"
echo "Wrote $ROOT/public/Joy-He-Resume.pdf"
