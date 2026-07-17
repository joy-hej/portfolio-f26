#!/usr/bin/env bash
# Build portfolio-f26 and publish to joy-hej.github.io (serves joyhe.me).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAGES_DIR="${TMPDIR:-/tmp}/joyhe-pages-deploy"
REMOTE="https://github.com/joy-hej/joy-hej.github.io.git"

cd "$ROOT"
npm run build

# Refuse to publish an empty/broken build (a prior deploy wiped the live site).
for required in index.html 404.html CNAME assets; do
  if [[ ! -e "$ROOT/dist/$required" ]]; then
    echo "error: dist/$required missing after build; aborting deploy" >&2
    exit 1
  fi
done
asset_count="$(find "$ROOT/dist/assets" -type f | wc -l | tr -d ' ')"
if [[ "$asset_count" -lt 5 ]]; then
  echo "error: dist/assets looks empty ($asset_count files); aborting deploy" >&2
  exit 1
fi

rm -rf "$PAGES_DIR"
git clone --depth 1 "$REMOTE" "$PAGES_DIR"
cd "$PAGES_DIR"
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R "$ROOT/dist/." .
touch .nojekyll

# Final safety: never push a pages commit without the SPA entrypoints.
for required in index.html 404.html CNAME; do
  if [[ ! -f "$required" ]]; then
    echo "error: $required missing in pages staging dir; aborting deploy" >&2
    exit 1
  fi
done

git add -A
if git diff --cached --quiet; then
  echo "No site changes to deploy."
  exit 0
fi

git -c user.name="portfolio-f26 deploy" -c user.email="deploy@joyhe.me" \
  commit -m "Deploy portfolio-f26 $(git -C "$ROOT" rev-parse --short HEAD)"

git config http.postBuffer 524288000
git push origin HEAD:main
echo "Deployed to https://joyhe.me"
