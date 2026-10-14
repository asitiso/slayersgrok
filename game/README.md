# 슬레이어즈 붉은 마도사전 — playable prototype
No build step. Run `python3 -m http.server` inside this folder and open `index.html`.

| File | Contents |
|---|---|
| `data.js` | All data and balance numbers (`BAL`). See `BALANCE.md` |
| `core.js` | DOM-free game logic: battle, stages, gear, training, companions, buildings, guild, raid, arena, shop, missions, offline reward. Shared by the game and the sim |
| `render.js` | Canvas battle renderer, 390×440, DPR-aware. Parallax walking, SD sprites at a uniform height, particle FX (additive glow), damage numbers, combo counter, coins and orbs that fly into the HUD |
| `game.js` | DOM UI: HUD, skill bar, 5 bottom tabs (전투/장비/수련/동료/지령), hub row (지도/영지/협회/투기장/상점) opening full screens, modals, save |
| `tools/sim.js` | Headless balance sim (`node tools/sim.js 8 1`) |
| `test/run.js` | Headless Chrome test plus screenshots and video frames. Needs `python3 -m http.server 18791 --bind 127.0.0.1`, then `cd test && npm i && node run.js` |

- **Save:** localStorage key `slayers_save_v2`.
- **Debug:** `G.speed=2`, `G.reset()`, `G.S()`, `G.open('arena')`.

## Font license
UI and canvas text use **넥슨 메이플스토리 (Maplestory) Light/Bold**. The files in `assets/fonts/` are unmodified woff2 copies from fonts-archive/Maplestory on jsDelivr. All rights, including intellectual property, belong to NEXON Korea (㈜넥슨코리아). The font is free for personal and commercial use and may be redistributed and embedded. It must not be modified or edited, and the font itself must not be sold. Source: https://noonnu.cc/font_page/427
