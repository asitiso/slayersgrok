
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

## r653 bottom-tab hubs
단련 and 편성 each opened a single screen, so other growth and party screens were a detour through the 메뉴 grid. Now a compact sub-tab row (`#hub653`) docks above the bottom nav whenever a screen of that tab's group is open:
- 단련: 수련 (sheet) · 강화 · 특성 · 기보 · 가방
- 편성: 편성 · 인연 · 승급 · 펫 · 코스튬
- 영지: 영지 · 마을 · 낚시
소환 and 상점 stay single screens. 장비 stays on the orb (no row on the gear sheet, so the compare layout keeps its space). Content (도전, 탑, 투기장, 협회, 탐험, 월드보스, 도감, 업적, 패스, 랭킹, 친구, 우편, 출석, 설정) stays in the 메뉴 grid, which is unchanged and still lists everything.
Locked entries stay visible, grey, with the same stage pill, and tapping them gives the same 개방 toast (G.isOpen / menuGo). The lit bottom tab stays lit on its sub-screens; re-tapping it or ‹ returns to battle. A tab's red dot also lights when one of its unlocked sub-screens has one.

## r655 동료 승급 일괄 승급
Mine (마정 광산 / 마정 농장) harvest was checked first and already matches the vault path: list 수확, map bubble, 전체 수확 (includes orbs), strip 수확 가능, nav dot, one payout, remainder kept (no change).
승급 needed one tap per star per companion. A green 일괄 승급 (N명) pill under the companion list now runs the same `C.starUp` for every owned companion until its shards run out or it hits ★max, then shows a result popup (이름 ★a → ★b). Star-up only spends that companion's own shards, so nothing is chosen for the player. 각성 (costs gold) stays manual. Costs, STARMAX, shard values and saves are unchanged.

## r656 펫 모두 부화
Pet eggs pile up (1 per 5 무한의 탑 floors), but 알 부화 opened one egg per tap with a popup each time. With 2+ eggs a green 모두 부화 (알 N개) pill now sits under the 펫 부화 card. It runs the same `C.petHatch` once per egg and shows one result popup (each pet ×count, NEW or Lv.a → Lv.b, and how many duplicates were already at max level). It stops at 0 eggs, so it never spends gems; the 300-gem hatch stays a manual tap. Rates, PMAX, level-up costs, the tower egg drop and saves are unchanged.

## r657 7일 이벤트 모두 받기
The 신규 7일 성장 이벤트 popup needed one 받기 tap per finished task, a day-tab switch for each day and a reward popup every time, so coming back after a few days meant many taps. With 2+ rewards ready a green 모두 받기 (N개) pill now sits under 전체 완료 보상. It runs the same `G.nbClaim` for every finished task on every opened day (plus `G.nbFin` once all 21 are claimed) and shows one combined reward popup. Rewards are fixed per task (보석 / 소환권 / 강화석), nothing is spent and nothing is chosen. Locked days stay locked, unfinished tasks stay unclaimed. Tasks, rewards, day unlocks and saves are unchanged.

## r658 별 보상 모두 받기
Each chapter has 3 star chests (★7 / ★14 / ★21), and each one needed its own tap: one chest at a time on the world-map pins, or one chapter popup at a time. After a few chapters the earned chests piled up. With 2+ chests ready on unlocked chapters, a green 별 보상 모두 받기 (N개) pill now sits above the bottom bar of the 지도 screen, in both the chapter view and the world map. It runs the same `G.starClaim` for every ready chest and shows one combined reward popup naming the chapters. Chest rewards are fixed per chest, nothing is spent and nothing is chosen. Chests below their ★ threshold and chests on locked chapters stay as they are. Single chest taps still work and update the count. Thresholds, rewards, star rules and saves are unchanged.

## r659 특성 red dot
특성 points are earned for free (1 per 3 new stages) and only spent on 특성 tiers, but nothing showed when a tier could be learned. Every other growth screen (수련, 강화, 승급, 펫, 도감) had a 화룡전-style red dot, so unspent points sat unnoticed. 특성 now has a ready dot whenever at least one path's next tier costs no more than the points on hand (the same `C.talPts` / `C.TALC` check as the 습득 button). It shows on the 메뉴 grid's 특성 entry (and the ▦ 메뉴 button), on the 특성 sub-tab in the 단련 hub row, and on the 단련 bottom tab. It clears once no tier is affordable or every tier is learned. Display only: talent costs, point earning, effects, unlocks and saves are unchanged.

## r660 기보 red dot
기보 (클레어 바이블) was the only 단련 growth screen with no ready dot, so 고대 유적 fragments could sit unspent. Each 복원/강화 costs both fragments and gold, so the dot only lights when some copy's next level is fully affordable right now: fragments ≥ its fragment cost and gold ≥ its gold cost (the same test as the screen's 강화 pill and `C.relicUp`). It shows on the 메뉴 grid's 기보 entry (and the ▦ 메뉴 button), the 기보 sub-tab in the 단련 hub row and the 단련 bottom tab, and stays off while 기보 is locked. There is no batch upgrade: each 강화 is still a manual tap, so the player still chooses where the gold goes. Display only: relic costs, effects, fragment drops, unlocks and saves are unchanged.

## r661 지도 최고 스테이지로
After moving back to an earlier stage (to farm, or by tapping an older node), there was no quick way back to the furthest unlocked stage: 지도 opens on the current (older) chapter, so it took 월드맵 → the right chapter → its last node → stage panel → 이동. Now, whenever the current stage is below the highest unlocked one, the 지도 screen shows a 최고 N-M button: in the chapter view it is the last button in the bottom bar (next to 월드맵 / ★ / 일일 던전), and on the world map it is a green pill at the bottom. One tap runs the same `C.selectStage` + "이동" toast + close as tapping that node. It is hidden when you are already on the highest stage. Travel only: stage unlocks, maxSi, rewards, star rules and saves are unchanged.

## r662 임무 바로가기 for every in-progress task
In 화룡전 every unfinished quest row has a shortcut. Ours had 바로가기 only on 마력 수련, 투기장, 협회 기부 and 영지 수확. 몬스터 처치, 주문 시전, 보스 처치 and 장비 뽑기 (daily and weekly) only said 진행 중, so you had to close the sheet and find the right control yourself. Those rows now show the same green 바로가기. It closes the 임무 sheet back to the battle field, shows a hint toast, and briefly highlights where the task is done: the 보스 도전 button, the skill row, or the 마정구 orb (몬스터 처치 just returns to the field). It is navigation only: it never starts a boss fight, casts a spell or rolls an orb. Ready rows still show 받기 and claimed rows are unchanged. Mission goals, progress, rewards, claims and saves are unchanged.

## r663 강화석 획득처 from the 강화 screen
In 화룡전 you can tap a material on the upgrade screen to see where it drops and jump there. Ours had a 획득처 popup with ▶ shortcuts (전투, 방치 보상, 우정 상점, 도전 던전) for 강화석, but you could only reach it through 가방. The 강화 · 육성 screen's 강화석 bar only listed the drops as plain text. Now that bar (장비 강화, 동료 육성 and 스킬 편성 tabs) has a green 획득처 ▶ chip, and tapping the bar opens the same 강화석 popup (`G.itemInfo('it2_stone')`) with the owned count. The shortcuts use the same `menuGo` stage locks, so a locked 도전 던전 still only shows its 개방 toast. Navigation only: enhance and skill costs, success rates, stone drops, rewards, unlocks and saves are unchanged.

## r664 기보 조각 → 고대 유적 from the 기보 screen
In 화룡전 a growth screen's material line leads straight to where it drops. Our 기보 · 클레어 바이블 screen only said "조각 획득: 도전 → 고대 유적 발굴" as plain text, so getting more fragments took ‹ back → 메뉴 → 도전 → the 고대 유적 card. That line is now a tappable row with a green 고대 유적 ▶ chip. It opens the 일일 던전 screen with the 고대 유적 card already selected (`G.dunK='frag'` + the same `menuGo('dungeon')`, so the 도전 던전 stage lock and its 개방 toast still apply). Navigation only: it never enters or sweeps. Relic costs, fragment drops, dungeon entries and rewards, unlocks and saves are unchanged.

## r665 펫 알 → 무한의 탑 from the 펫 screen
In 화룡전 a growth screen's material line leads to where it drops. Pet eggs only come from 무한의 탑 (1 per 5 floors), but the 펫 screen's 펫 부화 card only said "무한의 탑 5층마다 알 1개" as plain text, so getting more eggs took ‹ back → 메뉴 → 무한의 탑. A small row with a green 무한의 탑 ▶ chip now sits under that line; tapping it (or the egg line) opens 무한의 탑 through the same `menuGo('tower')` stage lock, so a locked tower still only shows its 개방 toast. Navigation only: it never starts a floor. Egg drops, hatch costs and rates, pet levels, tower floors and rewards, unlocks and saves are unchanged.

## r666 강해지는 방법 on the 탑 / 던전 도전 실패 card
In 화룡전 every lost fight shows 강해지는 방법 with one-tap growth paths. Our stage DEFEAT card already had four tiles (장비 강화 · 동료 육성 · 편성 · 소환), but losing a 무한의 탑 floor or a 일일 던전 tier only said "성장 후 다시 도전하세요!" / "장비 강화·동료 육성 후 다시 도전하세요!" as plain text, so growing took 확인 → ‹ back → finding the screen. That 도전 실패 card now shows the same four tiles above 확인 (장비 강화 shows the owned 강화석). A tap closes the card and opens the same screen as the stage DEFEAT tiles: 강화 · 육성 on its 장비 강화 or 동료 육성 tab, 편성, or 소환, through `menuGo`. 확인 still just closes. Navigation only: no retry, nothing spent. Tower and dungeon requirements, rewards, entries, unlocks and saves are unchanged. The 전직 시련 fail card is left as is.
