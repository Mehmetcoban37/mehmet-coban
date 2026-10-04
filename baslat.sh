#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"
file="$(pwd)/100-milyon-short.html"

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$file"
elif command -v open >/dev/null 2>&1; then
  open "$file"
else
  printf 'Tarayicinizda bu dosyayi acin:\n%s\n' "$file"
fi
