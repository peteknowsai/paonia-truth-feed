#!/usr/bin/env bash
# download-article.sh -- Fetch a news article and save to raw/articles/.
# Usage: ./scripts/download-article.sh <url> [source] [title]
# Outputs: path of saved file
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
URL="${1:?Usage: download-article.sh <url> [source] [title]}"
SOURCE="${2:-unknown}"
TITLE="${3:-}"

python3 "$PROJECT_DIR/scripts/download_article.py" "$URL" "$SOURCE" "$TITLE"
