
## 화룡전 UI reference study (v4, 2026-10-14)
Sources I inspected (the screenshots were downloaded for layout study only; none of their art, icons, logos or text assets are used in the game):
- BlueStacks 초보자 가이드: https://www.bluestacks.com/ko/blog/game-guides/breaking-bad-the-legend-of/bbtl-beginners-guide-ko.html (8 in-game screenshots: battle HUD, gear compare popup, 경지 training, 동료/편성, faction wheel, menu popup)
- BlueStacks 꿀팁 Top3: https://www.bluestacks.com/ko/blog/game-guides/breaking-bad-the-legend-of/bbtl-tips-tricks-ko.html (화룡구 filter / auto-roll)
- 컨슈머타임스 리뷰: https://www.cstimes.com/news/articleView.html?idxno=678880 (5-member party, stage structure, difficulty tiers 일반→종말)
- LDCloud 방치 가이드: https://www.ldcloud.net/ko/blog/yulgang-fire-dragon-tale-afk-guide (영지 / 문파 / 던전 loop)

### What the screenshots show (verified) → what we built
| 화룡전 (observed) | Our version |
|---|---|
| Quarter-view grass and stone field fills the whole screen; the party fights packs around it | Top-down `bg_field.jpg` tiled and mirrored, camera follow, swarms surround the party |
| Top-left: square portrait, green "Lv.39", ⚔ power, cyan EXP bar | `.prof` square portrait, green Lv, ⚔ power, cyan bar |
| Top-right: dark rectangular currency pills (gold, gem) and a ▼ dropdown | `.cur` pills plus ▼ that opens the 메뉴 grid popup |
| Top-center: "[일반] 10-10", green progress bar from a start node to a purple boss-face node, then a ⏱ timer bar with "22.24초" | `.stagebar`: same structure, boss node uses our boss art, boss timer in seconds |
| Round red lightning boss-challenge button under the stage bar | `.bossbtn` (ϟ), pulses during the fight, plus an 자동 toggle |
| Left column: event/package icons, plain art with outlined labels and red dots | `#sideL` (패키지, 일일 상점, 지도) |
| Right column: 2-column icon grid (성장, ▦ menu, 스케줄, 임무, 이벤트, 돌파…); lower right: 문파, 비무대회, 도전 | `#sideR` 2-column grid (성장, 메뉴, 장비, 임무, 배속, 소환) and `#sideR2` (협회, 투기장, 도전) |
| Left lower: party portrait column with HP bars; leader cut-in banner | `#partycol` (leader gold border); tap opens 편성 |
| Center: 방치보상 pot icon above the quest strip | `#idleBtn` 방치보상 (hourly rate popup) |
| Quest strip: round orb reward icon + "[지령 119] … (4/5)" on a dark fading bar | `.mission` with `.morb` icon and "[지령 N] … (v/goal)" |
| Skill row: round icons with dark rings, center one larger, "All Auto" at the right end | `.skills`: round icons, Dragon Slave larger in the center, All Auto toggle |
| Bottom nav: square art tiles 단련·편성·소환·상점·영지, big dragon orb (화룡구) bottom-right with count pill | `.nav` with the same five tiles; big 마정구 orb with count, tap = roll |
| Popups: dark slate rounded panel, inner light border, centered white title, big red ✕ | `#sheet` / `#menuPop` slate panel, centered title, red ✕ |
| Gear popup: 10-slot grid with rarity-colored frames + "Lv.x"; 착용 중 (beige brush header) vs NEW (red brush header); cyan power-diff box; stat rows; red 판매 / green 장착 pills | `.eqgrid` (8 slots), `.cmpc` brush headers, `.pdiff`, `.srow2`, `.pill.red/.green` |
| 경지 training: starry backdrop with the meditating hero, wooden tier plaque, milestone bar, brown panel of medallion stat cards with a green 최대 강화 button and coin cost | `.trainhero`, `.plaque` (삼류→화경 마도사 tiers), `.tprog`, `.tcards` medallion cards, green 강화 pills |
| Menu popup: 4-column icon grid with labels and red dots | `.mgrid` (12 entries) |
| Typography: bold rounded Korean sans with black outline; palette charcoal slate + white text + green/red action pills + gold accents | `text-shadow` outline, slate CSS variables, pill gradients |

Uncertain (not visible in the sources): exact pixel sizes, animation timings, and chat bar behavior. A chat bar was left out.

## v5 fidelity pass (2026-10-14)
More reference facts (BlueStacks guides, the LDCloud guide and the BlueStacks app page; text only, no new screenshots):
- Up to 4 companions plus the hero. Factions are 사파/정파/중립/신지; a faction effect needs 3 of the same faction (ours uses 2 because we only have 4 companions). Factions also counter each other in a cycle; this is only shown in the wheel image, not implemented.
- Summon has a mileage system: every pull adds mileage, which buys a pick-your-companion summon or a guaranteed summon.
- 팔대기보 relic content → our 기보 · 클레어 바이블 (8 copies, restored and upgraded with fragments from the 고대 유적 dungeon).
- 도전 has daily dungeons (경험치/골드/강화석) and 탐험 minigames (야밤의 밀회) → our 도전 screen has 3 daily dungeons (2 entries each, instant clear) and a 탐험 placeholder.
- Mailbox (우편함), coupons and account settings: [설정] > [계정 정보].
- A chat bar sits above the bottom nav (seen in the v1 screenshot).

| 화룡전 | Ours |
|---|---|
| Painted free-floating menu icons with outlined labels | `assets/ic_*.png` (12 painted icons cut to transparent PNGs) used in the HUD columns, nav and 메뉴 grid |
| 소환: banner art, 1회/10회 buttons, mileage | `summon` screen: banner, probabilities, mileage bar, pick-your-companion at 100, blue 1회 / red 10회 pills; result = grade-glow cards that flip in |
| 동료 detail / level-up | `compDetail()` modal: grade/faction frame, stars, level, attack multiplier before→after, green 레벨 업 (gold) |
| 팔대기보 | `relic` screen |
| 도전 dungeons / 탐험 | `dungeon` screen + sweep result popup |
| 방치보상 pot → claim popup | `#idleBtn` popup: accumulated-time bar (8h cap), reward tiles, 받기 (gives 50% of the offline rate, separate from the reopen reward) |
| 우편함 | `mail` screen with 받기 / 모두 받기 |
| 설정 | `settings`: sound/effects toggles, speed, account, coupon, reset |
| Chat bar | `.chat` ticker above the nav (fake messages; tap shows "not supported" toast) |
| Bright grass field in early stages | `bg_field2.jpg` is the default; the dark ruins field is used from chapter 3 and in boss fights |

## v6
- Each stage gets a bright quarter-view field (`D.FIELDS`). Chapter 1: meadow, town, autumn. Chapter 2: beach, desert, autumn. Chapter 3: snow, town, desert. On a stage change the field crossfades over about 0.8s and a stage-name banner appears. Bosses keep the stage's field with a red edge vignette; the dark ruins field is no longer used by default.
- All remaining square-tile icons are replaced with painted icons (`ic_equip`, `ic_relic`, `ic_speed`, `ic_chest`, `ic_explore`, `ic_orb`, `ic_settings`, `ic_chat`). Old `.btn` buttons are restyled as 화룡전-style pills (green, blue, red).
- 탐험 (expeditions): pick a companion and send it on a 30m / 2h / 8h trip. A progress bar shows while it's away, then 받기 gives gold, gems and Bible fragments. Sent companions still fight.
- Faction counters: the HUD shows a 상성 우세/보통/열세 tag next to 자동, and the 편성 screen shows the counter cycle.

## v7 SD sprites
- New cel-shaded SD sprites (`assets/sd_*.png`, also copied over `hero_lina`/`ally_*`/`mon_*`/`boss_*`, originals in `assets/old/`). Cut with rembg, then split into one figure per character by connected parts and nearest grid position. Stray bits were removed and edges eroded. The white wolf and Amelia's white dress also used a white flood-fill mask. Checked on dark and green backgrounds.
- Enemies by field: meadow = goblin/slime/mushroom, town = bandit/skeleton, autumn = mushroom/goblin, beach = slime/bandit, desert = scorpion/skeleton, snow = ice wolf/fire imp.
- Bosses (`BOSSPLAN`): chapter 1 = bandit chief (mid) / red ogre (end); chapter 2 = red ogre / dark sorcerer; chapter 3 = demon general / golden dragon.
- Factions: goblin, skeleton, imp, sorcerer, demon, dragon = 혼돈. Bandit = 인간. Slime, mushroom, wolf, scorpion, ogre = 야생 (no counter). Lina is now 무소속 (no penalty) unless a party faction effect gives her one.
- Movement per enemy type: slime squishes and hops, wolf and scorpion use a fast four-legged gait, goblin and mushroom hop, ogre and demon stomp, sorcerer, imp and dragon hover. Goblin and bandit are mirrored because they face right natively. Per-type size: slime 0.78, scorpion 0.88, wolf and mushroom 0.9, imp 0.92. Bosses are 132 px vs 104 px for regular units.

## Generated (fake) data list — r358 audit
Data shown to the player that is generated by code, not from real players or a server (waiting on the user's generated-data decision; do not add or change entries):
- **Boss rush 주간 순위** (보스 러시 주간 랭킹 popup and the "주간 N위" on the result screen). Fake names from `BR.names`, scores from a seeded rng `ai(w)`, and `rank()` mixes in the player's real best score (game.js ~691-707).
- **World boss 오늘의 랭킹 / "오늘 N위"**: `C.wbRank`, seeded fake names (`NM`) (core.js ~102).
- **비무대회 랭킹 TOP 10**: `C.arenaTop`, from `NAMES` (core.js ~56).
- **Chat messages**: `D.CHAT` (see the note above).
- **비무대회 대전 상대 names** (r388 note): `C.arenaRefresh` picks each of the 3 opponents with `pick(NAMES)` independently (core.js ~154), so two cards can show the same fake name (seen in r387: "금색마왕팬" twice). Left as is, waiting on the user's ranking/generated-data decision.
