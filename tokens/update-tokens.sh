#!/bin/bash
# tokens/scripts/update-tokens.sh
# Run this every time you export new tokens from Figma
#
# Usage:
#   ./tokens/scripts/update-tokens.sh                  (interactive — prompts for each file)
#   ./tokens/scripts/update-tokens.sh ~/Downloads       (auto-finds zips in folder)

set -e

DEST="tokens/figma"
SOURCE="${1:-$HOME/Downloads}"

echo "🔍 Looking for Figma token exports in: $SOURCE"
echo ""

# Map of zip names to destination folders
declare -A ZIPS=(
  ["Colors"]="Colors"
  ["Typography"]="Typography"
  ["Spacing"]="Spacing"
  ["Grid"]="Grid"
  ["Shadows"]="Shadows"
  ["Shapes"]="Shapes"
  ["Primitives"]="Primitives"
)

FOUND=0
for name in "${!ZIPS[@]}"; do
  ZIP="$SOURCE/$name.zip"
  if [ -f "$ZIP" ]; then
    DEST_DIR="$DEST/${ZIPS[$name]}"
    echo "📦 Found $name.zip — extracting to $DEST_DIR/"
    mkdir -p "$DEST_DIR"
    unzip -o "$ZIP" -d "$DEST_DIR/" > /dev/null
    FOUND=$((FOUND + 1))
  else
    echo "⚠️  Not found: $name.zip (skipping)"
  fi
done

echo ""

if [ $FOUND -eq 0 ]; then
  echo "❌ No zip files found in $SOURCE"
  echo "   Export tokens from Figma and place zips in that folder."
  exit 1
fi

echo "🔨 Building tokens ($FOUND sets updated)..."
npm run tokens:build

echo ""
echo "✅ Done! $FOUND token sets updated and rebuilt."
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff tokens/figma/"
echo "  2. Check CSS output: cat tokens/transformed/css/variables.css | head -40"
echo "  3. Commit: git add tokens/figma/ && git commit -m 'chore(tokens): update from Figma $(date +%Y-%m-%d)'"
