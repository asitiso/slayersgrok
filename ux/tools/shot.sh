#!/bin/bash
# usage: bash tools/shot.sh [page ...]
cd "$(dirname "$0")/.."
for f in ${@:-01-title 02-lobby 03-battle 04-character 05-spells 06-summon 07-map 08-base 09-guild 10-arena 11-shop 12-missions index}; do
  google-chrome --headless=new --no-sandbox --disable-gpu --hide-scrollbars --virtual-time-budget=4000 --window-size=390,844 --screenshot=screenshots/$f.png "file://$PWD/$f.html" 2>/dev/null
done
