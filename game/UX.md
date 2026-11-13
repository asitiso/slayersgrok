
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
- Each stage gets a bright quarter-view field (`D.FIELDS`). Chapter 1: meadow, town, autumn. Chapter 2: beach, desert, autumn. Chapter 3: snow, town, desert. On a stage change the field crossfades over about 0.2s (r755; was ~0.8s) and a stage-name banner appears. Bosses keep the stage's field with a red edge vignette; the dark ruins field is no longer used by default.
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

## r667 7일 이벤트 바로가기
In 화룡전 every unfinished event task has a shortcut, and our 임무 list has 바로가기 on every in-progress row (r662). The 신규 7일 성장 이벤트 popup still only said 진행 중 on unfinished tasks, so you had to close it and find the right screen yourself. On opened days those rows now show a green 바로가기 instead. It closes the popup and goes where the task is done: 동료 소환 → 소환, 장비 강화 → 강화 · 육성 on the 장비 강화 tab, 장비 뽑기 and 레벨 → the battle field with the 마정구 orb highlighted, 몬스터 처치 → the battle field, and N-M 도달 → the battle field with the 보스 도전 button highlighted, or 지도 (where 최고 N-M sits) when you are on an older stage. It uses the same hint toast and highlight as the r662 임무 바로가기. Navigation only: it never fights, summons, enhances or rolls. Finished rows still show 받기, claimed rows show 완료, locked days stay locked, and 모두 받기 is unchanged. Tasks, goals, rewards, claims, day unlocks and saves are unchanged.

## r668 동료 상세 ‹ › 넘기기
In 화룡전 the hero detail screen has left/right arrows to flip through your heroes. Our 동료 상세 popup showed only one companion, so checking or leveling several meant 확인 → find the next card on 편성 → 상세, again and again. For owned companions the popup now has ‹ › arrows on the illustration and an N/M count at its bottom. They step through owned companions in the 편성 list order (wrapping at both ends), closing this popup and opening the same 동료 상세 for the next one, so 레벨 업 and the 출전 중 badge work as before. With only one owned companion, or on an unowned companion, no arrows are shown. Navigation only: levels, level-up costs, stars, party, unlocks and saves are unchanged.

## r669 가방: 기보 조각 · 펫 알
In 화룡전 the bag lists every material you hold, and tapping one shows where it is used and where it drops. Our 가방 listed 11 currencies and consumables but not 기보 조각 (클레어 바이블 조각) or 펫 알, so their counts only appeared deep inside the 기보 and 펫 screens. Both are now 가방 cells (under 전체 and 소모품) with their real counts (`s.frag`, `s.pet.egg`; 0 when none). Tapping one fills the detail card, and 바로 가기 ▶ opens the same 사용처 / 획득처 popup as other items: 기보 조각 → 기보 복원·강화, 고대 유적 발굴 (일일 던전 with 고대 유적 selected, as in r664) and 탐험; 펫 알 → 펫 부화 and 무한의 탑. Shortcuts go through `menuGo`, so locked content still only shows its 개방 toast. The icons (`it3_relicfrag.png`, `it3_petegg.png`) are the existing `rl_fragment.png` / `pt_egg.png` art padded to square. Display and navigation only: fragment and egg drops, relic and hatch costs, rates, unlocks and saves are unchanged.

## r670 소환 결과 → 동료 상세
In 화룡전 a hero card opens that hero's info. Our 소환 결과 popup showed each summoned companion (grade, ★, NEW or 조각 +N), but the cards did nothing when tapped, so checking what you just got (level, attack multiplier, 성급, 고유 마법) took 확인 → ‹ back → 편성 → find the card → 상세. Once a result card has flipped open, tapping it now opens the same 동료 상세 popup (`compDetail`) on top of the result, and closing it returns to the result. Cards that are still face-down ignore the tap, so 전부 열기 and the automatic flip work as before. Display only: summon costs, rates, pity, mileage, shards, levels and saves are unchanged. The result popup still has no repeat-summon button (parked for a user decision).

## r671 장착 장비 상세 → 강화
In 화룡전 an item's info window has a 강화 button that opens the upgrade screen on that item. Our 장비 sheet showed the same kind of info when you tap an equipped slot (r506: +N, stats, set count, sell price), but it was read-only, so raising that piece took 확인 → close the sheet → 단련 → 강화 → find the slot. That popup now has a green 강화 ▶ pill. It closes the popup and the sheet and opens 강화 · 육성 on the 장비 강화 tab with that slot already selected (`G.enGo671`, same `G.enTab` / `G.enSel` the screen uses). 확인 still only closes the popup, empty slots and the NEW-item compare mode still open nothing, and other popups are untouched. Navigation only: it never enhances, and enhance costs, rates, the +15 cap, 일괄 강화 and saves are unchanged.

## r672 오늘의 할 일 lists every menu red dot
The 메뉴 popup's 오늘의 할 일 bar is meant to gather the menu's red dots into one-tap chips, like 화룡전's to-do summary. It only knew the older dots, so 특성 (r659), 기보 (r660), 승급, 펫, 무한의 탑 and 도감 could be lit in the grid right below while the bar said 모두 완료! / 할 일을 모두 끝냈어요. The bar now also lists 특성 습득, 기보 강화, 동료 승급, 펫 부화, 무한의 탑 and 도감 보상, each using exactly the same test as its grid dot (`G.BD.talent`, `G.BD.relic`, `C.starRed`, the 펫 egg/first-gift test, `G.towerRed`, `C.cdxPend`). The count in the header includes them. A chip closes the menu and opens that screen through the same `menuGo`, and locked content is still filtered out by `G.isOpen`. 수련 (any stat affordable with gold) is still not listed, as before. Display and navigation only: talent points and costs, relic, star-up, hatch and tower costs and rewards, unlocks and saves are unchanged.

## r673 ▦ 메뉴 button dot follows every menu red dot
In 화룡전 the menu button carries a badge whenever anything inside the menu needs attention. Our ▦ 메뉴 button only knew the older dots, so when the only ready items were 동료 승급, 펫 부화, 무한의 탑 or 도감 보상, those icons were lit inside the grid (and listed in 오늘의 할 일) but the 메뉴 button itself stayed dark, so you had no reason to open it. The button now also lights when any unlocked one of those is ready, using exactly the same tests as their grid dots and 오늘의 할 일 chips (`C.starRed`, the 펫 egg/first-gift test, `G.towerRed`, `C.cdxPend`). Locked content still never lights it, and 수련 still does not light it, as before. Display only: costs, rewards, unlocks and saves are unchanged.

## r674 강해지는 방법 on the 투기장 패배 card
In 화룡전 a lost fight shows 강해지는 방법 with one-tap growth paths. A stage DEFEAT and (r666) a 무한의 탑 / 일일 던전 도전 실패 card already had the four tiles (장비 강화 · 동료 육성 · 편성 · 소환), but losing a 비무대회 (투기장) match only showed 패배…, the score change and 월드맵 / 확인, so growing took 확인 → ‹ back → finding the screen. A live arena loss now shows the same four tiles right above the 월드맵 / 확인 bar (장비 강화 shows the owned 강화석). A tap closes the result and opens the same screen as the other fail cards (`G.failGo666`): 강화 · 육성 on its 장비 강화 or 동료 육성 tab, 편성, or 소환. 확인 and 월드맵 work as before. A win, or a ▶ 다시보기 of an old match, shows no tiles. Navigation only: no rematch, no ticket or gem spent. Arena points, tickets, rewards, opponents, league, unlocks and saves are unchanged.

## r675 도감 동료 정보 → 동료 소환
In 화룡전 a hero's info window leads straight to where that hero is obtained. Tapping a companion in 도감 opens its info card, whose 획득 방법 box listed 동료 소환 (with its rate), 소환 마일리지 100 · 선택 소환 and the pity line as plain text with only 닫기, so getting that companion (or more copies for 성급) meant 닫기 → ‹ back → 소환. A green 동료 소환 ▶ chip now sits at the bottom of that box, on owned and unowned companions alike. A tap closes the card and opens the 동료 소환 screen through `menuGo('summon')` (`G.sumGo675`). Navigation only: it never summons; rates, pity, mileage, costs, 도감 rewards, unlocks and saves are unchanged. 닫기 still just closes the card.

## r676 업적 바로가기
In 화룡전 an unfinished achievement has a button that takes you to where it is done. Our 업적 rows only showed the dimmed reward pill until the goal was met, while 임무 (r662) and the 7일 이벤트 (r667) already have 바로가기 on every in-progress row, so pushing an achievement meant ‹ back and finding the right control. In-progress 업적 rows now show a small green 바로가기 ▶ chip on their progress line (`G.achGo676`), using the same targets as r662/r667: 몬스터 사냥꾼 → the battle field, 대마도사 → field with the skill row highlighted, 보스 슬레이어 → field with 보스 도전 highlighted, 장비 탐구가 → field with the 마정구 orb highlighted, 동료 수집가 → 소환, 대장장이 → 강화 · 육성 on the 장비 강화 tab, 세계 정복 → field with 보스 도전 highlighted, or 지도 (최고 N-M) when you are on an older stage. Claimable rows keep their 받기 pill and get no chip; finished rows are unchanged; the in-progress reward pill stays as it was. Navigation only: it never fights, casts, rolls, summons or enhances. Goals, progress, rewards, claims, 모두 받기, unlocks and saves are unchanged.

## r677 소환으로 이동 on the empty 탐험 / 인연 screens
In 화룡전 an empty screen gives you a button to where you get what it needs. Our 동료 승급 screen with no companions already shows the greyed 미보유 grid, "소환에서 동료를 얻으면 여기서 승급할 수 있어요" and a gold 소환으로 이동 button, and 강화 · 육성 with no gear has 장비 뽑으러 가기. The 탐험 screen shows the same empty grid and the same kind of line ("…탐험에 파견할 수 있어요"), and 인연 says "동료를 소환하면 인연을 쌓을 수 있어요", but neither had a button, so you had to go ‹ back and find 소환 yourself. Both empty states now have the same gold 소환으로 이동 button (same `go554` look), which opens the 동료 소환 screen through `menuGo('summon')`. It only appears while you own no companions; once you own one, both screens are unchanged. Navigation only: it never summons; summon costs, rates, mileage, expedition rewards, bond levels, unlocks and saves are unchanged.

## r678 동료 상세 별 표시 = 승급 화면
In 화룡전 a hero shows the same star and awakening marks wherever you look at it. Our 동료 상세 popup drew at most 5 stars in 5 slots, while 승급 goes up to ★6 (`C.STARMAX`) and the 승급 / 동료 육성 screens draw 6 slots plus ◆ per 각성. So a ★6 companion looked like ★5 in 동료 상세, and 각성 ◆ never showed there. The 동료 상세 header (opened from 편성, 소환 결과, 도감, ‹ › stepping) now draws 6 slots and the same purple ◆ marks as 승급. Unowned companions show 6 empty slots. Display only: star-up, 각성, costs, attack multipliers, 레벨 업 and saves are unchanged.

## r679 동료 상세 → 승급 ▶
In 화룡전 the hero info screen has a 승급 button that takes you straight to that hero's star-up. Our 동료 상세 popup (from 편성, 소환 결과 cards and the ‹ › arrows) shows ★, ◆ and 성급 but only offered 레벨 업 and 확인, so raising that companion meant 확인 → 승급 → find its card again. Owned companions now get a gold 승급 ▶ pill under 레벨 업. It carries a red dot when that companion's 승급 (or 각성, including its gold) is ready, the same test as the 승급 list dot / `C.starRed`. A tap closes the popup (and the 소환 결과 popup under it, if any) and opens 동료 승급 with that companion already selected. If 승급 is still locked, the usual lock toast shows and the popup stays. Unowned companions get no pill. Navigation only: it never stars up or awakens; shards, gold, star / 각성 costs, attack multipliers, 일괄 승급, unlocks and saves are unchanged.

## r680 동료 상세 성급 줄 = 실제 공격 보너스
In 화룡전 a hero's info shows the same star/awakening bonus that the hero really gets. Our 동료 상세 성급 (중복 소환) line showed `공격 +N%` from stars only, as (★−1)×10%, while the real attack multiplier (`C.compMul`, also shown on the 공격 배율 row) also multiplies by (1+0.15×각성), so an awakened companion's line understated its bonus (★6 ◆1 read +50% instead of +73%). The line now reads `★N · 각성 ◆… · 공격 +M%`, with M = ((1+0.1×(★−1))×(1+0.15×각성) − 1)×100 rounded, the same star and 각성 factors as `C.compMul`. Without 각성 it reads exactly as before. Display only: star-up, 각성, costs, the actual multiplier, 레벨 업 and saves are unchanged.

## r681 지도 red dot for ready 별 보상
In 화룡전 the stage map carries a badge when a star chest can be opened. Our chapter star chests (★7 / ★14 / ★21, r658 모두 받기) could sit ready while nothing outside the 지도 screen said so: the 메뉴 grid's 지도 entry had no red dot, 오늘의 할 일 had no chip, and the ▦ 메뉴 button stayed dark if that was the only thing ready. Now the 지도 entry gets a red dot whenever a chest on an unlocked chapter is ready (`G.starReady()`, the same test as the map pins and 별 보상 모두 받기), 오늘의 할 일 shows a 별 보상 ▶ chip that opens 지도 through `menuGo('map')`, and the 메뉴 button follows through the r673 `G.todoX672` path. The dot and chip clear once every ready chest is claimed. Display and navigation only: the chip never claims; thresholds, chest rewards, star rules, claims, unlocks and saves are unchanged. 수련 stays out of 오늘의 할 일 and the 메뉴 button dot.

## r682 편성 카드 별 6칸
In 화룡전 a hero shows the same star count wherever you look at it. Our 편성 screen's companion cards drew at most 5 stars in 5 slots, while 승급 goes up to ★6 (`C.STARMAX`) and the 승급 grid, 동료 육성, 도감 and 동료 상세 (r678) already show 6. So a ★6 companion looked like ★5 on 편성, and a ★5 one looked maxed. The card star line now draws 6 slots (filled ★ plus dim ☆), the same count as 승급. Unowned cards still say 미보유. 각성 ◆ is not added to the small card (the 승급 grid tile has none either). Display only: star-up, 각성, costs, attack multipliers, party taps, unlocks and saves are unchanged.

## r683 도감 opens again once a pet is owned
The 도감 tab row puts a red dot on a tab with an owned but unregistered entry. Its check skipped 인연 and 보스 but not 빛나는, so for 빛나는 it fell through to the pet list and read `cdx.h`, which never exists; as soon as any pet was owned, building the 도감 screen threw a TypeError and the screen could not render. 빛나는 is now skipped like 보스 (it has no registration). Display only: 펫/동료/몬스터 tab dots, registration rewards, 도감 bonuses and saves are unchanged.

## r684 도감 미획득 펫 정보 → 펫
In 화룡전 an info window leads straight to where the thing is obtained, and our 도감 companion card already has 동료 소환 ▶ (r675). Tapping an unowned pet in 도감 opens its small info card, whose 획득처 line only said 펫 알 부화 as plain text with just 확인, so hatching meant 확인 → ‹ back → 메뉴 → 펫. A green 펫 부화 ▶ chip now sits on that line. A tap closes the card and opens the 펫 screen through `menuGo('pet')` (`G.petGo684`), so while 펫 is still locked the usual unlock toast shows instead. Navigation only: it never hatches and spends no eggs or gems; hatch rates, egg drops, pet levels, 도감 rewards, unlocks and saves are unchanged. Owned pets open no info card, so nothing changes for them. 확인 still just closes the card.

## r685 도감 인연 미보유 펫 → 펫
In 화룡전 every place that names how to get something leads there, and our 도감 cards already have 동료 소환 ▶ (r675) and 펫 부화 ▶ (r684). On the 도감 인연 tab, a set's unowned pet member only said 펫 알 부화 under its name as plain text, and tapping it did nothing, so hatching it for the set bonus meant ‹ back → 메뉴 → 펫. A small green 펫 부화 ▶ chip now sits under that text. A tap opens the 펫 screen through `menuGo('pet')` (`G.petGo684`), so while 펫 is still locked the usual unlock toast shows instead. Navigation only: it never hatches and spends no eggs or gems; set bonuses, hatch rates, egg drops, 도감 rewards, unlocks and saves are unchanged. Owned members (보유) and companion members (소환 n%) are unchanged.

## r686 도감 인연 미보유 동료 → 동료 소환
In 화룡전 every place that names how to get something leads there. On the 도감 인연 tab, a set's unowned companion member only said 소환 n% under its name as plain text, and tapping it did nothing, so summoning it for the set bonus meant ‹ back → 소환, while the companion info card (r675) and the 인연 pet members (r685) already have a ▶ chip. A small green 동료 소환 ▶ chip now sits under the unchanged 소환 n% text. A tap opens the 동료 소환 screen through `menuGo('summon')` (`G.sumGo675`). Navigation only: it never summons and spends no gems or tickets; rates, pity, mileage, set bonuses, 도감 rewards, unlocks and saves are unchanged. Owned members (보유) and the pet-member 펫 부화 ▶ chips are unchanged.

## r687 코스튬 황금 마도사 → 마도 패스
In 화룡전 a costume you cannot buy points to where it comes from. On our 코스튬 screen the pass-only costume 황금 마도사 (granted by the 마도 패스 premium tier-20 claim) only said 패스 20단계 as plain text, and tapping it just toasted 패스 20단계 프리미엄 보상, so checking or claiming it meant ‹ back → 메뉴 → 마도 패스. A small green 마도 패스 ▶ chip now sits under that text while the costume is not owned. A tap opens 마도 패스 through `menuGo('pass')` (`G.skinPass687`), so its usual stage lock applies. Navigation only: it never buys, claims or equips anything and spends no gems; pass tiers, rewards, premium status, costume prices, ownership and saves are unchanged. Tapping the costume card itself still shows the same toast.

## r688 주간 협회 임무 바로가기
In 화룡전 an unfinished guild quest has a move button to where it is done, and our 임무 (r662) and 업적 (r676) rows already have 바로가기. The 협회 screen's 주간 협회 임무 rows only showed a grey 진행 중 until the goal was met. In-progress rows now get a small green 바로가기 ▶ chip on their progress line (`G.gmGo688`): 협회 합동 처치 closes the screen back to the battle field with the same kill hint as 임무; 협회 기부 scrolls to the 일일 기부 card on the same screen and briefly highlights it; 황금룡 레이드 scrolls to and highlights the 토벌 참여 button. Navigation only: it never donates, attacks the raid or claims; goals, progress, coin rewards, guild exp/level, the weekly chest and saves are unchanged. Done (받기) and claimed (완료) rows get no chip.

## r689 소환으로 이동 on the empty 동료 육성 tab
In 화룡전 an empty screen gives you a button to where you get what it needs. 강화 · 육성's 동료 육성 tab with no companions showed the greyed 미보유 grid and "동료는 소환에서 얻을 수 있어요…" but no button, while the empty 승급 screen and (r677) the empty 탐험 / 인연 screens already have a gold 소환으로 이동, and 장비 강화 with no gear has 장비 뽑으러 가기. The same 소환으로 이동 button (`go554` look) now sits under that line and opens the 동료 소환 screen through `menuGo('summon')` (`G.enCompSum689`). It only appears while you own no companions; once you own one, the tab is unchanged. Navigation only: it never summons; summon costs, rates, mileage, level-up and skill costs, unlocks and saves are unchanged.

## r690 마도 패스 경험치 → 임무
In 화룡전 the pass screen links to the missions that feed it. Our 마도 패스 summary only said 처치·보스·임무로 경험치 획득 as plain text, so getting more pass XP from missions meant ‹ back → 임무. A small green 임무 ▶ chip now sits at the end of that line. A tap closes the pass screen and opens the 임무 sheet through `menuGo('mission')` (`G.passMis690`). Navigation only: it never claims a mission or a pass tier and spends nothing; XP rates, tiers, rewards, premium status, mission goals and saves are unchanged. The hint text itself is unchanged.

## r691 승급 조각 획득 → 동료 소환
In 화룡전 a hero's shard counter leads to where shards come from. Our 동료 승급 card only said 조각 획득: 희귀 5 · 영웅 10 · 전설 20 (중복 1회당) as plain text, so getting more shards for 승급 or 각성 meant ‹ back → 소환. A small green 동료 소환 ▶ chip now sits at the end of that line (hidden once that companion's 각성 is complete). A tap opens the 동료 소환 screen through `menuGo('summon')` (`G.shardSum691`). Navigation only: it never summons, 승급s or 각성s and spends nothing; shard amounts, star and 각성 costs and multipliers, rates, pity, mileage, unlocks and saves are unchanged.

## r692 전투력 분석 보너스 출처: 영지 마탑 · 장비 도감 · 특성
In 화룡전 the power breakdown lists every source of its percentage bonuses. Our 전투력 분석 (tap the profile) 보너스 출처 table showed 장비 세트 · 도감 · 기보 · 동료 시너지 · 펫 · 협회 · 칭호, but three sources that really raise 공격력 / 체력 were missing even though their own screens show them: 영지 마탑 (파티 공격력 +N%, `BAL.tower.pct` × 마탑 Lv inside `C.atkPct`), 장비 도감 (공격력·체력 +N% 적용 중, `C.gcxB`) and 특성 (특성 합계, `C.talB`). They are now added at the end of the table with the same values their screens show, and the existing row tap (r384 / r385) opens 영지 / 도감 / 특성 with the same lock display. Display only: no stat, multiplier, 전투력, cost or save changes.

## r693 전투력 분석 장비 도감 row → 도감 장비 tab
The r692 장비 도감 row in 전투력 분석 → 보너스 출처 opened 도감 through the generic row tap, which lands on whatever 도감 tab was used last, so you still had to tap 장비. That one row now selects the 장비 tab before opening 도감 (`G.gcxGo693`); while 도감 is still locked it shows the usual unlock toast and leaves the last-used tab alone. The 도감 row and every other row keep their current destinations. Navigation only: no 도감 registration or reward, no spend; bonus values, unlocks and saves are unchanged.

## r694 방치 보상 골드 = 실제 수령액
In 화룡전 the idle reward window shows what you will actually receive. Our 방치 보상 popup's 골드 tile and the 방치 보상 수령 toast showed the base idle gold (`offlineCalc` × 0.5), but `C.idleClaim` adds it through `C.addGold`, which applies the existing gold bonuses (칭호, 협회 버프, 펫, 인연 세트). With any gold bonus you received more than the popup said (for example 213 shown, 291 received with 펫 +30% and 인연 +5%). The tile now shows the base amount × the current gold-bonus multiplier (`G.goldMul694`, a probe that restores gold and stats), and the toast shows the gold actually added. Display only: idle rates, the 50% rule, the 8-hour cap, 마정구, 강화석, 경험치, gold bonuses and saves are unchanged.

## r695 어서 오세요! 골드 = 실제 수령액
Same gap as r694, on the return popup. When you reopen the game, 어서 오세요! showed the offline 골드 before bonuses, and so did the 방치 보상 / 2배 보너스! reward popup after 받기, but `C.offApply` adds the gold through `C.addGold`, which applies the existing 칭호, 협회 버프, 펫 and 인연 세트 gold bonuses. The 골드 tile now shows the base amount × the current gold-bonus multiplier (`G.goldMul694`, which restores gold and the earnings counter exactly), and after a successful 받기 or 2배 받기 the reward popup shows the gold actually added. Display only: offline rates, the 8-hour cap, the 2배 gem cost, 경험치, 마정구, 강화석, gold bonuses and saves are unchanged.

## r696 빠른 사냥 결과 골드 = 실제 수령액
- 방치 보상 창의 「빠른 사냥 2시간」 결과 창(보상 획득! · 빠른 사냥 · 2시간)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 다이아 비용 · 하루 3회 · 2시간 · 경험치 · 마정구 · 강화석 그대로).

## r697 일일 던전 결과 골드 = 실제 수령액
- 일일 던전의 도전 클리어 · 소탕 · 일괄 소탕 · 전체 소탕 결과 창(보상 획득!)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 네 경로 모두 같은 지급 함수를 거치므로 한 곳에서 수정: 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 입장 횟수 · 첫 클리어 보석 · 경험치 · 강화석 · 바이블 조각 그대로).
- 던전 단계 목록의 보상 미리보기(기본값)는 이번 수정 범위 밖.

## r698 탐험 보상 골드 = 실제 수령액
- 탐험 완료 후 받기(탐험 완료! 창)와 모두 받기 결과의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 두 경로 모두 같은 수령 함수 결과를 쓰므로 한 곳에서 수정: 이제 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 보석 · 바이블 조각 · 탐험 시간 그대로, 모두 받기 후 자동 재파견 없음).
- 탐험 목록의 예상 보상(기본값 미리보기)은 이번 수정 범위 밖.

## r699 금고 수확 골드 = 실제 수령액
- 영지 금고의 수확(건물 수확 버튼 알림, 영지 지도 수확 아이콘 알림, 전체 수확 결과 창)에 보너스 적용 전 기본값이 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 세 곳 모두 같은 수확 함수의 결과를 표시하므로 한 곳에서 수정: 이제 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 생산 속도 · 저장 한도 · 소수점 잔여 · 광산 마정구 그대로).
- 금고 건물/지도의 저장량 표시(기본값)는 이번 수정 범위 밖.

## r700 일일 탑 보상 골드 = 실제 수령액
- 무한의 탑 「일일 탑 보상」 받기 결과 창의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 하루 1회 · 최고층 기준 · 강화석 그대로).

## r701 무한의 탑 층 돌파 골드 = 실제 수령액
- 무한의 탑 층 클리어 시 「무한의 탑 N층 돌파!」 결과 창의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 층 난이도 · 권장 전투력 · 강화석 · 보석 · 소환권 · 5층 알 그대로).
- 층 목록의 「첫 클리어 보상」 미리보기(기본값)는 이번 수정 범위 밖.

## r702 보스 러시 보상 골드 = 실제 수령액
- 보스 러시 종료(TIME UP) 후 「보상 받기」 결과 창(보스 러시 N점)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 점수 · 지급량 · 보석 · 강화석 · 하루 도전 횟수 · 주간 랭킹/정산 그대로).
- 예전 오버레이식 보스 러시 코드(현재 호출되지 않음)는 건드리지 않음.

## r703 접속 보상 골드 = 실제 수령액
- 전투 화면 「접속 보상」(일일 플레이 시간 상자) 모두 받기 결과 창의 5분 골드 상자가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 상자 시간 · 지급량 · 마정구 · 강화석 · 다이아 · 하루 1회 그대로).
- 확인: 월드보스 결과 창은 골드를 보너스 없이 그대로 지급하므로 표시 = 실제 수령액 (변경 없음).

## r704 협회 출석 보상 골드 = 실제 수령액
- 협회 화면 「협회 출석」 결과 창(협회 출석 보상)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 지급량 · 협회 코인 · 협회 경험치 · 하루 1회 그대로).
- 출석 카드의 예상 보상(기본값 미리보기)은 이번 수정 범위 밖.

## r705 행운 룰렛 골드 당첨 = 실제 수령액
- 행운 룰렛에서 「골드」 · 「골드 대박」 당첨 시 결과 창(룰렛 당첨 / 대박! 룰렛 당첨)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 당첨 확률 · 칸 구성/이름 · 무료 1회 + 보석 100 추가 1회 · 지급량 그대로).

## r706 전장 나무상자 골드 = 실제 수령액
- 전투 화면에 나타나는 나무상자(탭하면 바로 부서짐, 두지 않으면 4번 맞고 부서짐)의 「+골드」 표시가 보너스 적용 전 기본값이었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 탭으로 부순 경우와 저절로 부서진 경우 모두 같은 함수이므로 한 곳에서 수정: 이제 실제로 지급된 골드가 표시됨 (표시만 변경; 등장 간격 · 내구도 · 탭 25배 / 자동 20배 지급량 그대로).

## r707 떠돌이 상인 골드 특가 = 실제 수령액
- 떠돌이 상인의 「골드」 특가(보석 40)를 사면 결과 창(떠돌이 상인과 거래했습니다)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 상품 카드의 「골드 ×N」 · 가격 · 등장 간격 · 방문당 1회 구매 · 다른 상품 그대로).

## r708 장비 판매 알림 골드 = 실제 수령액
- 장비 탭에서 새 장비를 「판매」하면 뜨는 알림 「판매 +N」이 보너스 적용 전 판매가였으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 알림에는 실제로 지급된 골드가 표시됨 (표시만 변경; 판매 버튼의 「판매 +N」 미리보기 · 판매가 공식 · 지급량 그대로). 자동 뽑기 요약의 판매 골드 합계는 이번 수정 범위 밖.

## r709 일일 특가 골드 상자 = 실제 수령액
- 상점 「일일 특가」의 「골드 상자 (4시간분)」를 구매하면 결과 창(일일 특가 구매 완료)의 골드가 보너스 적용 전 기본값으로 표시되었으나, 실제로는 칭호 · 협회 버프 · 펫 · 인연 세트 보너스가 더해진 골드가 지급됨.
- 이제 결과 창에는 실제로 지급된 골드가 표시됨 (표시만 변경; 상품 목록 · 할인율 · 가격 · 구매 확인 창 · 하루 1회 · 지급량 그대로).

## r710 실제 수령액 표시 소수점 오차 보정
- r694–r709의 「실제 수령액」 표시는 (수령 후 골드 − 수령 전 골드)로 계산하는데, 보유 골드가 크면 뺄셈에 아주 작은 부동소수점 오차가 생겨(예: 1,178 → 1,177.9999999) 표시가 1 작게 내림될 수 있었음.
- 오차 범위 안이면 가장 가까운 정수로 맞춰 표시 (표시만 변경; 보유 골드 · 지급량 그대로).

## r711 우정 상점 갱신 타이머 = 실제 초기화 시각
- 친구 화면 「우정 상점」의 갱신 타이머가 기기 시간대의 05:00까지를 세고 있었으나, 실제 상점 한도 초기화는 게임 기준(한국 시간 05:00, C.today / C.nextReset)으로 일어남. 한국 외 시간대 기기에서는 타이머가 0이 되어도 초기화되지 않거나, 초기화 후에도 시간이 남은 것으로 표시됨.
- 이제 타이머는 일일 특가 타이머와 같은 기준(C.nextReset − C.now)으로 표시 (표시만 변경; 초기화 규칙 · 구매 한도 · 가격 그대로).

## r712 출석 이벤트 「오늘 보상 받기」 빠른 두 번 탭 = 1회만 수령
- 받기 버튼은 보상 아이콘이 상단으로 날아가는 짧은 연출(약 0.46초) 후에 수령이 실행됨. 연출 중 두 번째 탭이 버튼 처리로 바로 들어가 1회 수령되고, 연출이 끝난 뒤 같은 처리가 한 번 더 실행되어 하루에 출석 2일치 · 보상 2회가 지급됐음 (하루 1회 한도 위반). 화룡전은 아무리 빨리 눌러도 하루 1회만 수령.
- 이제 처리 실행 시점에 기존 규칙(오늘 이미 수령 또는 28일 완료)을 다시 확인해서, 첫 탭만 수령되고 추가 탭은 무시됨.
- 그대로: 28일 보상표와 수량, 하루 1회 한도, 28일차 사이클 리셋, 날아가는 연출, 보상 팝업, 날짜 기준(C.today, 한국 시간 05:00).

## r713 협회 주간 상자 빠른 두 번 탭 = 보상 토스트 1개만
- 주간 상자를 받은 직후 두 번째 탭이 「이번 주 상자는 이미 받았어요」 토스트를 보상 토스트 위에 하나 더 띄웠음 (지급은 원래 1회). 화룡전은 빠른 연타에 안내를 겹쳐 띄우지 않음.
- 이제 수령 성공 후 0.8초 안의 추가 탭은 조용히 무시. 그 뒤에 누르거나 화면을 다시 열고 누르면 「이미 받았어요」 안내는 그대로 표시 (표시만 변경).
- 그대로: 상자 보상(보석 60+협회Lv×20 · 코인 10+Lv×3 · 강화석 5), 주 1회 한도, 월요일 05시 갱신, C.gChest 결과 형태, 단일 탭 토스트 문구.

## r714 우편 모두 받기 빠른 두 번 탭 = 「받을 우편이 없습니다」 겹침 없음
- 「모두 받기」는 상자 연출 후 수령되는데, 연출 중 두 번째 탭이 먼저 수령하고 연출 끝의 처리는 남은 우편이 없어 「받을 우편이 없습니다」 토스트를 보상 팝업 위에 하나 더 띄웠음 (지급은 원래 1회). 화룡전은 빠른 연타에 안내를 겹쳐 띄우지 않음.
- 이제 수령 성공 후 0.8초 안의 빈 수령은 조용히 무시. 그 뒤에 누르거나 화면을 다시 열고 누르면 안내는 그대로 표시 (표시만 변경).
- 그대로: 우편 보상과 수령 한도, 보상 팝업, 개별 「받기」, C.mailClaim 결과 형태.

## r715 협회 출석 빠른 두 번 탭 = 「오늘 이미 출석했습니다」 겹침 없음
- 출석을 받은 직후 두 번째 탭이 「오늘 이미 출석했습니다」 토스트를 보상 팝업 위에 하나 더 띄웠음 (지급은 원래 1회). 화룡전은 빠른 연타에 안내를 겹쳐 띄우지 않음.
- 이제 수령 성공 후 0.8초 안의 추가 탭은 조용히 무시. 그 뒤에 누르거나 화면을 다시 열고 누르면 「오늘 이미 출석했습니다」 안내는 그대로 표시 (표시만 변경).
- 그대로: 출석 보상(협회 코인 5+Lv · 골드 · 협회 경험치 +10), 하루 1회 한도, 매일 05:00 초기화, C.gAttend 결과 형태, 단일 탭 보상 팝업.

## r716 금고 전체 수확 빠른 두 번 탭 = 「수확할 자원이 없습니다」 겹침 없음
- 전체 수확을 받은 직후 두 번째 탭이 「수확할 자원이 없습니다」 토스트를 보상 팝업 위에 하나 더 띄웠음 (지급은 원래 1회). 화룡전은 빠른 연타에 안내를 겹쳐 띄우지 않음.
- 이제 수령 성공 후 0.8초 안의 추가 탭은 조용히 무시. 그 뒤에 누르거나 화면을 다시 열고 누르면 「수확할 자원이 없습니다」 안내는 그대로 표시 (표시만 변경).
- 그대로: 금고 골드 · 마정 광산 마정구 지급량과 수확 속도 · 보관 한도 · 소수 잔여, 개별 수확, C.bCollect 반환값, 단일 탭 「영지 전체 수확」 팝업. (팝업 골드가 1 낮게 읽히는 문제는 r717에서 별도 수정.)

## r717 전투 승리 카드 · 보스 상자 골드 = 소수점 오차 보정
- 스테이지 클리어 승리 카드와 보스 상자 날아가는 골드는 「보스 시작 시 골드」를 뺀 값에 fmt(내림)을 쓰고 있어, 큰 잔액에서 빼기 오차로 실제 수령액보다 1 낮게 읽힐 수 있었음 (예: 1,178이 1,177로 표시). 화룡전은 받은 골드를 한 눈금 낮춰 보여 주지 않음.
- 이제 방치·수확 등과 같은 G.gd710 반올림 스냅을 수령액 표시에만 적용. 승리 카드의 골드 카운트업도 같은 값을 씀.
- 그대로: 실제 지급량, 강화석, 패배 카드, 소수 실수령액은 정수로 강제하지 않음 (표시만 변경).

## r718 탐험 모두 받기 빠른 두 번 탭 = 「완료된 탐험이 없습니다」 겹침 없음
- 모두 받기로 보상을 받은 직후 두 번째 탭이 「완료된 탐험이 없습니다」 토스트를 띄웠고, 결과 팝업이 떠 있는 동안은 토스트가 보류되었다가 팝업을 닫으면 그 위에(또는 바로 이어서) 나타났음 (지급은 원래 1회). 화룡전은 빠른 연타에 안내를 겹쳐 띄우지 않음.
- 이제 수령 성공 후 0.8초 안의 추가 탭은 조용히 무시. 그 뒤에 누르거나 화면을 다시 열고 누르면 「완료된 탐험이 없습니다」 안내는 그대로 표시 (표시만 변경).
- 그대로: 탐험 보상(골드 · 보석 · 바이블 조각), 개별 「받기」, C.expClaim 결과, 자동 재파견 없음.

## r719 미션 모두 받기 빠른 두 번 탭 = 「받을 보상이 없습니다」 겹침 없음
- 모두 받기로 보상을 받은 직후 두 번째 탭이 「받을 보상이 없습니다」 토스트를 띄웠고, 보상 팝업이 떠 있는 동안 그 위에 나타났음 (지급은 원래 1회). 화룡전은 빠른 연타에 안내를 겹쳐 띄우지 않음.
- 이제 수령 성공 후 0.8초 안의 추가 탭은 조용히 무시. 그 뒤에 누르거나 화면을 다시 열고 누르면 「받을 보상이 없습니다」 안내는 그대로 표시 (표시만 변경).
- 그대로: 일일·주간 미션 보상(보석 · 소환권), 개별 「받기」, G.missionClaimAll 반환값, 업적 모두 받기, 단일 탭 「미션 보상 N개 수령」 팝업.

## r720 전직 시련 실패 카드 = 강해지는 방법
- 화룡전은 패배 후 성장 경로를 바로 열어 준다. 스테이지 DEFEAT(r434) · 무한의 탑/일일 던전(r666) · 투기장 패배(r674)에는 이미 장비 강화 · 동료 육성 · 편성 · 소환 타일이 있었지만, 전직 시련 실패 카드(r357)는 「시련 실패… 더 강해져서 다시 도전하세요」와 확인만 있어 성장 화면을 따로 찾아야 했음. r666이 이 카드를 남겨 두었음.
- 이제 같은 네 타일이 확인 바로 위에 붙고, 누르면 카드를 닫고 해당 화면으로 이동 (장비 강화/동료 육성 → 강화 · 육성 탭, 편성, 소환). 기존 G.failGo666 / menuGo를 그대로 씀.
- 그대로: 확인은 카드만 닫음, 재도전 없음, 전직 조건(레벨 · 시련 전투 · 성공 시 전직), 권장/내 전투력 표시, 시련 실패 문구, 소모·저장 없음 (표시·이동만).

## r721 전투력 부족 확인창 = 강해지는 방법
- 화룡전은 전투력이 부족할 때도 성장 경로를 바로 열어 준다. 스테이지 DEFEAT(r434) · 무한의 탑/일일 던전 실패(r666) · 투기장 패배(r674) · 전직 시련 실패(r720)에는 이미 장비 강화 · 동료 육성 · 편성 · 소환 타일이 있었지만, 던전·무한의 탑·전직 시련 도전 전의 「전투력 부족」 확인창은 권장/내 전투력과 취소·도전만 있어 성장 화면을 따로 찾아야 했음.
- 이제 같은 네 타일이 취소·도전 바로 위에 붙고, 누르면 확인창을 닫고(도전하지 않음) 해당 화면으로 이동 (장비 강화/동료 육성 → 강화 · 육성 탭, 편성, 소환). 기존 G.failGuide666 / G.failGo666 / menuGo를 그대로 씀.
- 그대로: 취소는 창만 닫음, 도전은 기존처럼 전투 시작, 권장 전투력·입장 횟수·전직 시련 조건(시련 req는 기존처럼 현재 전투력의 95%라 이 창이 뜨지 않음) · 소모·저장 없음 (표시·이동만).

## r722 보스 정보(전투력 부족) = 강해지는 방법
- 화룡전은 스테이지 보스 도전 전에도 성장 경로를 바로 열어 준다. 패배·도전 실패 카드와 던전/탑 전투력 부족 확인창(r721)에는 이미 장비 강화 · 동료 육성 · 편성 · 소환 타일이 있었지만, 스테이지 보스 정보 창(G.bossInfo)은 권장 전투력 미달일 때 「성장하러 가기」 한 버튼만 있어 전투력 분석으로만 이동했음.
- 이제 내 전투력이 권장보다 낮을 때만 같은 네 타일이 「성장하러 가기」 바로 위에 붙고, 누르면 창을 닫고(보스는 시작하지 않음) 해당 화면으로 이동 (장비 강화/동료 육성 → 강화 · 육성 탭, 편성, 소환). 기존 G.failGuide666 / G.failGo666 / menuGo를 그대로 씀.
- 그대로: 충분하면 「보스 도전」(웨이브 미완료 시 기존 토스트, 완료 시 기존처럼 보스 시작), 「성장하러 가기」는 여전히 전투력 분석, 확인은 창만 닫음, 권장/내 전투력 · 도전 기록 · 보스 패턴 · 웨이브 조건, 소모·저장 없음 (표시·이동만).

## r723 지도 스테이지 패널(전투력 부족) = 강해지는 방법
- 화룡전은 지도에서 스테이지를 고를 때도 성장 경로를 바로 열어 준다. 패배·도전 실패 카드, 던전/탑 전투력 부족 확인창(r721), 보스 정보(r722)에는 이미 장비 강화 · 동료 육성 · 편성 · 소환 타일이 있었지만, 지도 스테이지 패널(G.stagePanel)은 권장/내 전투력과 닫기·이동만 있어 성장 화면을 따로 찾아야 했음.
- 이제 내 전투력이 권장보다 낮을 때만 같은 네 타일이 닫기·이동 바로 위에 붙고, 누르면 패널을 닫고(스테이지는 바꾸지 않음) 해당 화면으로 이동 (장비 강화/동료 육성 → 강화 · 육성 탭, 편성, 소환). 기존 G.failGuide666 / G.failGo666 / menuGo를 그대로 씀.
- 그대로: 충분하면 타일 없음, 닫기·✕·배경은 패널만 닫음, 이동/진행 중은 기존처럼 스테이지 선택, 권장/내 전투력 · 출현 몬스터 · 보상 · 별, 소모·저장 없음 (표시·이동만).

## r724 던전·탑·시련 보스 웨이브 등장 안내
- 화룡전은 보스 웨이브가 시작될 때 한눈에 들어오게 강조한다. 일반 스테이지 보스는 이미 WARNING + VS 스플래시가 있고, 던전/무한의 탑/전직 시련의 잡몹 웨이브는 `#brHud .brhn`에 WAVE N이 떴지만, 보스 웨이브는 그 안내를 건너뛰었다 (전투 내내 `C.B.boss`가 켜져 있어 필드 WAVE 리본도 막힘).
- 이제 보스 웨이브가 실제로 나올 때 `.brhn`에 보스 이름이 골드색으로 같은 페이드와 함께 뜨고, 가운데에 짧은 BOSS 리본(기존 WAVE / FINAL WAVE와 같은 wave_ribbon, 1.15초)이 한 번 나온다. 2초짜리 VS 스플래시는 쓰지 않아 45초 제한 전투의 시야를 가리지 않는다. 이펙트 끄기(nofx / tglite)에서는 이름만 남고 리본은 생략.
- 그대로: 웨이브 구성·적 HP·제한 시간·권장 전투력·보상, 스테이지 보스의 WARNING/VS, 잡몹 WAVE N 안내, 소모·저장 없음 (표시만). 전투당 한 번, 프레임마다 레이아웃 없음.

## r725 스킬 쿨 마지막 1초 = 0.1초 단위
- 화룡전 스킬 아이콘은 마지막 1초를 0.9 · 0.8 … 로 셀 수 있다. 여기 스킬 바는 이미 시계 방향 쿨 링과 남은 초(.t, Math.ceil)가 있었지만, 1초 이하에서는 준비될 때까지 "1"로만 보여 마지막 초가 읽히지 않았음.
- 이제 남은 시간이 1초 미만이면 0.9 … 0.1 (0.1초 단위, 준비 직전까지는 0.1)로 표시하고, 1초 이상은 기존처럼 올림한 정수. 아이콘에 방금 쓴 글자를 기억해 같은 텍스트면 HUD가 다시 돌아도 DOM을 쓰지 않음 (프레임마다 더 쓰지 않음).
- 그대로: 실제 쿨 값(B.cds) · 스킬 쿨 길이 · 사용/자동시전 · 준비 표시, 전투 시간·HP·권장 전투력, 소모·저장 없음 (표시만).

## r726 필드 웨이브 사이 NEXT WAVE
- 화룡전은 다음 웨이브로 걸어가는 짧은 틈에도 전환이 한눈에 들어온다. 여기 필드 스테이지는 이미 마지막 일격에 WAVE CLEAR, 적 등장 때 WAVE N/3 · FINAL WAVE 리본이 있었지만, 그 사이 1.4초 이동은 상단 스테이지 바의 「다음 웨이브 N/3」만 바뀌었음.
- 이제 필드 웨이브가 끝나고 걸어가는 동안(보스로 넘어가는 3웨이브 이후·startBoss 이동은 제외) 같은 웨이브 리본 그림으로 짧은 NEXT WAVE N/3이 한 번 뜬다. WAVE CLEAR가 아직 있으면 처음 ~0.6초는 그대로 두고 그 다음에 같은 자리에 이어 붙인다. 이펙트 끄기(nofx / 연출 끔)에서는 리본을 생략하고 기존 스테이지 바 문구만 남긴다. 프레임마다 추가 작업 없음.
- 그대로: 이동 시간(BAL.walk 1.4초) · 스폰 타이밍 · 웨이브 수, 스테이지 보스 WARNING/VS, 던전/탑 전투, HP·권장 전투력, 소모·저장 없음 (표시만).

## r727 파티 초상화 저체력 강조
- 화룡전은 체력이 위험한 동료가 초상화에서 바로 보인다. 여기에도 이미 체력 30% 미만이면 초상화에 .dng(빨간 체력바·테두리 펄스, r559)과 화면 가장자리 비네트가 붙었지만, 전투 프레임마다 클래스를 다시 썼고, HUD가 파티 열을 다시 그리면 다음 틱까지 표시가 빠질 수 있었음.
- 이제 저체력 상태가 바뀔 때만 .dng / 비네트를 켜고 끄며 (같은 상태면 DOM을 쓰지 않음), 파티 열을 다시 그려도 바로 다시 붙는다. 이펙트 끄기(nofx / tglite / 연출 끔)에서는 빨간 강조는 남기고 초상화·비네트 펄스만 끈다.
- 그대로: 실제 HP · 30% 기준 · 전투 처리, 권장 전투력, 소모·저장 없음 (표시만).

## r728 메뉴 화면 전환 150ms 페이드
- 화룡전은 메뉴를 열 때 바로 반응하고 전환은 약 100–200ms로 짧다. 여기 전체 화면(#screen: 지도·설정·소환 등)은 display로만 켜져, 내용이 그려진 뒤 그냥 뚝 나타났다.
- 이제 #screen.on이 150ms 동안만 투명도 페이드로 들어온다 (위치 transform은 쓰지 않아 내부 고정 요소가 어긋나지 않음). 닫기는 기존처럼 즉시 (퇴장 대기 없음). 이펙트 끄기(nofx / tglite)에서는 애니메이션 없이 바로 표시.
- 그대로: openScreen/closeScreen는 같은 턴에 화면을 열고 내용을 채움, 메뉴 아이콘 클릭 이펙트(fxring), HP·권장 전투력·경제, 소모·저장 없음 (표시·체감만).

## r729 자주 듣는 효과음 레이어 재구성
- 타격 · 치명타 · 클릭 · 코인 · 처치 효과음이 단순한 전자 비프(사각파 짧은 음 등)에 가까웠음. 키와 호출 위치, 재발 간격(LIM), 전투 보이스 예산(0.12초에 5개), 배경음/효과음 켜기·볼륨, 숨긴 탭에서 일시정지, 오디오 파일 없음은 그대로 두고, WebAudio로만 겹쳐 만들었다.
- 타격(hit): 짧은 필터 노이즈 트랜지언트 + 낮게 내려가는 바디 섬 + 아주 짧은 클릭.
- 치명타(crit): 더 밝은 충격, 금속성 배음(사각파 없음), 짧게 남는 꼬리.
- 클릭(click): 사각파 비프 대신 필터 노이즈 + 짧은 사인으로 부드러운 UI 틱.
- 코인(coin): 종처럼 들리지 않는 배음(비조화 부분음)을 빠르게 감쇠, 음을 살짝 무작위로 흔듦.
- 처치(kill): 짧은 노이즈 + 내려가는 바디 + 약한 배음.
- 노드는 짧게만 살고 끝나면 연결을 끊음. 소모·저장·HP·권장 전투력 없음 (음향만).

## r730 큰 효과음(스킬·승리 등) 레이어 재구성
- 마법 · 드라곤 슬레이브 · 소환 · 레벨업 · 승리(그리고 패배 · 경고 · 파괴)도 r729와 같이, 단순한 사각파/톱니파 멜로디에서 벗어나 WebAudio로만 겹쳐 재구성. 키와 호출 위치, 재발 간격, 전투 보이스 예산, 켜기·볼륨, 숨긴 탭 일시정지, 오디오 파일 없음은 그대로.
- 마법(spell): 올라가는 필터 노이즈 후시 + 낮은 바디 + 밝은 쉬머 (톱니파 비프 없음).
- 드라곤 슬레이브(ds): 크게 — 올라가는 차지(노이즈·음이 떠오름) 후 깊은 폭발, 길게 남는 저음 럼블.
- 소환(summon): 처음부터 포탈처럼 소용돌이, 종 화음, 도착할 때 낮은 섬.
- 레벨업(lvup): 사각파 아르페지오 대신 올라가는 사인/삼각 화음과 반짝임.
- 승리(win): 겹친 팡파르 화음, 올라가는 베이스, 반짝임 (사각파 멜로디 없음).
- 패배(lose): 둔한 충격, 내려가는 단3도, 낮은 지속음과 어두운 노이즈.
- 경고(warn): 세 번의 경보 펄스 — 노이즈 틱 + 어긋난 두 음 + 저음.
- 파괴(brk): 깨지는 트랜지언트 + 중저음 크런치 + 낮은 섬, 짧은 파편 꼬리 (사각파 없음).
- 노드는 짧게만 살고 끝나면 연결을 끊음. 소모·저장·HP·권장 전투력 없음 (음향만).

## r731 터치 반응 — 300ms 지연 제거
- 화룡전은 버튼을 누르면 바로 반응한다. 여기 메뉴 아이콘·일부 버튼에는 이미 touch-action:manipulation이 있어 더블탭 줌으로 생기는 약 300ms 클릭 지연을 건너뛰었지만, html·body·#app·전체 화면(#screen)·모달과 목록 줄·지도 노드 등에는 없었다.
- 이제 그 바탕과 자주 누르는 면(버튼, 칩, 토글, 행, 뒤로, 맵 노드, 스킬 등)에 touch-action:manipulation과 -webkit-tap-highlight-color:transparent를 넣는다.
- 세로로 스크롤하는 목록(#panel, #screen .sbody, 채팅·결과 상자 등)은 pan-y, 가로로 미는 지도·스트립(.mapwrap, .wmap, .town 등)은 pan-x를 유지해 스크롤이 막히지 않는다. 세이버 화면(#saver, touch-action:none)과 기존 .ntb(pan-y)는 그대로.
- 제스처/드래그 코드는 건드리지 않음. 소모·저장·HP·권장 전투력 없음 (표시·체감만).

## r732 메뉴 행·지도 노드 누름 반응
- 화룡전은 목록이나 지도 점을 누르는 즉시 눌린 느낌이 난다. 여기 누름 효과(.press 축소·밝아짐, 메뉴 아이콘의 fxring)는 사이드/메뉴 아이콘, 하단 탭, 알약·버튼, 뒤로 가기에만 붙어 있어, 설정 행이나 지도 스테이지 노드를 눌러 이동할 때는 반응이 없었다.
- 이제 #screen·모달·패널의 행, 지도 노드, 칩·토글·편성 칸 등에도 같은 방식의 누름(변환·밝기, 80ms)이 바로 보인다. 가로로 긴 행은 목록이 튀지 않게 살짝만(0.98) 줄어든다. 메뉴 아이콘 클릭 이펙트(fxring)는 그대로이며, 새 면에서는 링을 만들지 않는다. 손가락이 10px 넘게 움직이면 누름을 취소하고 튕김 없이 스크롤한다.
- 이펙트 끄기(nofx / tglite / fxoff)에서는 누름 모양은 남기고 전환·해제 애니메이션만 끈다.
- 소모·저장·HP·권장 전투력 없음 (표시·체감만).

## r733 화면 전환·보상 창 대기 150ms로 단축
- 화룡전은 메뉴와 팝업이 약 100–150ms로 빠르게 움직인다. 여기 하단 시트(#sheet)는 테마 기준 약 180ms(기본 280ms), 설정에서 절전 모드를 켜고 창이 닫히기까지 220ms, 보상 창은 350ms 동안 터치가 잠겼고, 절전 화면이 사라질 때 300ms가 걸렸다.
- 이제 #sheet 전환, 절전 토글 후 닫기, 절전 화면 페이드, 보상 창 클릭 잠금이 모두 150ms. 보상 창은 그 150ms 동안은 여전히 바로 닫히지 않아 실수 더블탭을 막는다. 우편·출석·수확·탐험·미션 등 r714–r722의 중복 수령 방지는 그대로.
- 절전 모드를 켜거나 끌 때 저장(saveNow)을 먼저 끝낸 뒤(동기) 화면을 바꾸므로, 저장이 끝나기 전에 절전 화면이 닫히지 않는다.
- 소모·저장 규칙·HP·권장 전투력 없음 (표시·체감만).

## r734 장면별 배경음
- 이전 배경음은 필드와 보스 두 가지만 있고, 아르페지오가 사각파·톱니파에 가까웠다. 이제 장면마다 화음·템포·악기가 달라진다 (사인·삼각 패드와 베이스, 부드러운 노이즈 타점, 약한 로우패스). 사각파·톱니파 리드는 쓰지 않는다.
- 모험 지도: 조금 느리고 밝은 패드. 영지·메뉴(town): 더 느리고 따뜻한 메이저. 필드: 모험적인 기존 진행을 부드럽게. 던전: 낮고 어두운 단조와 드문 럼블. 탑·시련: 조금 빠르고 긴장된 진행과 가벼운 틱. 투기장: 더 밀고 나가는 킥·틱. 보스(필드·월드 보스·보스 웨이브): 가장 낮고 촘촘한 타점. 결과(.vic): 짧고 밝은 종지.
- 장면이 바뀌면 0.4초 크로스페이드로 넘어가 루프가 겹치지 않고, 음이 끊기며 딸깍하지 않게 엔벨로프를 유지한다. 배경음 켜기·볼륨, 숨긴 탭에서 AudioContext 일시정지, 효과음 보이스 예산은 그대로. 노드는 끝나면 연결을 끊음. 오디오 파일 없음.
- 소모·저장·HP·권장 전투력 없음 (음향만).

## r735 남은 전투·회복 효과음
- 회복(heal), 공격 휘두름(swing)·시전(cast)·활(bow), 피격(hurt), 패링(parry)·방어(block), 그리고 이미 연결되어 있는 적·보스 휘두름(eswing/bswing)을 r729/r730과 같이 겹겹이 다시 짰다. 사각파·톱니파 비프는 쓰지 않는다. 필살기(ult) 효과음은 전투에 연결하지 않고 그대로 둔다.
- 회복: 세 개의 날카로운 비프 대신, 부드럽게 올라가는 종소리와 공기처럼 반짝이는 노이즈, 낮은 받침음. 휘두름: 칼·옷깃이 스치는 후쉬와 낮게 느껴지는 몸통음. 시전: 공기가 모이는 후쉬와 작은 마법 음점. 활: 짧게 튕기는 현과 가벼운 바람. 피격: 무딘 타격과 낮은 노이즈(톱니파 없음). 패링: 짧고 밝은 금속 틱과 여운. 방어: 더 무거운 방패 타격. 적 휘두름은 더 낮고 느리고, 보스 휘두름은 더 길고 깊게.
- 키·훅, 재발동 간격(LIM), 전투 효과음 5성부 예산, 효과음 켜기·볼륨, 숨긴 탭에서 AudioContext 일시정지는 그대로. 노드는 끝나면 연결을 끊음. 오디오 파일 없음.
- 소모·저장 규칙·HP·권장 전투력 없음 (음향만).

## r736 필드 동료 저체력 표시
- 화룡전은 체력이 위험한 동료가 필드 스프라이트에서도 바로 보인다. 여기에는 파티 초상화에만 30% 미만 강조(r727)가 있었고, 전투 캔버스의 동료 모습은 그대로였다.
- 이제 같은 기준(살아 있고 체력이 최대의 30% 미만)으로, 필드 동료 발밑과 몸 주변에 옅은 붉은 빛만 올린다. 상태가 바뀔 때만 표시 여부를 갱신하고, 같은 상태면 DOM을 건드리지 않는다. 빛 그림은 한 번만 만들어 두고 프레임마다 새로 만들지 않는다.
- 이펙트 끄기(nofx / tglite / 연출 끔)에서는 정적 붉은 표시는 남기고 맥동만 끈다. 메뉴 화면이 열려 있으면 그리지 않는다.
- 소모·저장 규칙·실제 HP·30% 기준·권장 전투력 없음 (표시만).

## r737 필드 동료 피격 예고
- 화룡전은 적이 때리기 직전에 맞는 동료가 잠깐 표시된다. 여기서는 적·보스 공격의 실제 체력 차감은 바로 일어나지만, 화면의 타격 연출은 기존처럼 약 0.32초 뒤에 나온다. 그 짧은 틈에 맞는 쪽 표시가 없었다.
- 이제 그 대상 동료 머리 위에 작은 "!"와 발밑 섬광이 시각 타격 직전까지 잠깐 뜬다. 실제 공격 타이밍·데미지·회피/패링/방어 판정은 그대로다. 표시 여부는 켜지거나 꺼질 때만 바꾸고, 표식 그림은 한 번만 만들어 재사용한다.
- 이펙트 끄기(nofx / tglite / 연출 끔)에서는 정적 표시만 남기고 맥동은 끈다. 메뉴 화면이 열려 있으면 그리지 않는다.
- 소모·저장 규칙·HP·권장 전투력 없음 (표시만).

## r738 회피·패링·방어 확인
- 화룡전은 피한·받아낸 공격이 그 동료 위에 짧게 확인된다. 여기에도 MISS / PARRY / BLOCK 글자는 있었지만, 색이 거의 같고(패링과 방어가 같은 청록), 회피에는 효과음이 없었으며, 피해 숫자 끄기를 켜면 확인 글자도 함께 사라졌다.
- 이제 시각 타격(기존 0.32초 뒤) 순간에 그 동료 위로 MapleStory 글씨로 구별되는 확인이 뜬다. 회피는 은빛 MISS, 패링은 금빛 PARRY, 방어는 푸른 BLOCK, 각각 짧은 섬광이 함께 한다. 실제 판정·데미지·타이밍은 그대로다. 표시는 켜지거나 꺼질 때만 바꾸고, 글씨·섬광 그림은 한 번만 만들어 재사용한다.
- 이펙트 끄기(nofx / tglite / 연출 끔)에서는 정적 표시만 남기고 맥동·떠오름은 끈다. 메뉴가 열려 있으면 그리지 않는다.
- 패링·방어 효과음(r735)은 그 순간에 나오고, 회피에는 가벼운 후쉬(miss)를 넣었다. 재발동 간격(LIM)과 전투 효과음 5성부 예산을 지킨다.
- 소모·저장 규칙·HP·권장 전투력 없음 (표시·음향만).

## r739 필드 동료 스킬 준비
- 화룡전은 필살기가 차면 그 동료가 필드에서도 바로 보인다. 여기에는 파티 초상화에만 금색 준비 표시(r308, `.ugf`)가 있었고, 전투 캔버스의 동료 모습은 그대로였다.
- 이제 같은 기준(살아 있고 필살 게이지가 가득 찬 동료)으로, 필드 스프라이트 둘레에 옅은 금색 테두리와 작은 반짝임을 올린다. 상태가 바뀔 때만 표시 여부를 갱신하고, 테두리 그림은 한 번만 만들어 재사용한다. 게이지가 차는 속도나 자동 시전, 실제 전투는 그대로다.
- 저체력 표시(r736)와 피격 예고·확인(r737/r738)보다 우선순위를 낮춘다. 피격 예고가 켜져 있을 때를 포함해, 그런 표시가 떠 있는 동안에는 스킬 준비 빛을 그리지 않아 스프라이트가 겹쳐 보이지 않게 한다.
- 이펙트 끄기(nofx / tglite / 연출 끔)에서는 정적 금색 표시만 남기고 맥동은 끈다. 메뉴가 열려 있으면 그리지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r740 메뉴를 연 동안의 전투 상태
- 회복을 받았을 때 필드 동료 위에 짧은 확인을 넣을 계획이었으나, 이미 `R.heal`이 그 동료 위치에 초록 `+N` 숫자, `fx_heal` 버스트, 초록 입자를 띄우고 있다 (파티 회복은 r305에서 합쳐진다). 같은 확인을 한 번 더 그리지 않았다.
- 그 대신, 화룡전은 메뉴를 열어도 지금 싸움이 한눈에 남는다. 여기에서는 전투가 메뉴 뒤에서도 그대로 돌아가는데 (`C.tick`은 계속, 캔버스만 생략), 전체 화면(#screen)이 상단 스테이지 바를 가려 보스 남은 시간이나 웨이브·남은 적을 볼 수 없었다.
- 이제 그런 화면이 열려 있고 전투가 진행 중이면, 하단 내비 바로 위에 짧은 상태 줄이 뜬다. 보스면 이름·남은 초·잔여 체력%, 필드면 웨이브와 남은 적 수. 줄을 탭하면 메뉴가 닫히고 전투로 돌아간다. 전투를 멈추거나 타이밍·HP를 바꾸지 않는다. 글자와 표시 여부는 바뀔 때만 갱신한다.
- 이펙트 끄기(nofx / tglite / 연출 끔)에서는 정적 표시만 남기고, 남은 시간 10초 이하의 맥동은 끈다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·화면 이동만).

## r741 결과 카드 잠시 고정
- 화룡전처럼 보상은 읽을 수 있어야 하지만, 이 게임은 방치로 다음 전투가 스스로 이어진다. 승리·패배 결과 카드가 약 2.3초에 자동으로 닫히는 흐름은 그대로 둔다. 손대지 않은 카드는 이전과 같이 2.3초에 사라지고, 자동 진행도 그대로다.
- 닫히기 전에 카드 본문(버튼이 아닌 곳)을 탭하면 자동 닫기가 멈추고, 「탭하여 계속」이 뜬다. 확인 / 다음 스테이지 / 월드맵, 그리고 강해지는 방법 칸은 이전처럼 바로 닫는다. 고정된 뒤 본문을 다시 탭해도 닫힌다.
- 고정된 카드가 자동 전투를 붙잡지 않도록, 약 8초 뒤에는 스스로 닫히고, 앱이 숨어도 닫힌다.
- 보상 창의 150ms 클릭 잠금(r733)과 우편·출석·수확 등의 빠른 두 번 탭 방지(r714–r722)는 건드리지 않는다.
- 소모·저장 규칙·HP·권장 전투력·실제 보상 액수·전투 타이밍 없음 (표시·흐름만).

## r742 파티 초상화 체력 숫자
- 화룡전 왼쪽 동료 초상화는 체력 바만으로도 대략 보이지만, 지금 몇 %인지 바로 읽히게 숫자가 있다. 여기 파티 열(#partycol)은 44px 초상화 아래 초록 바만 있어, 저체력 강조(r727)가 켜지기 전에는 남은 양을 한눈에 알기 어려웠다.
- 이제 각 초상화 체력 바 위에 짧은 퍼센트(100% · 87% · 0% 등)를 MapleStory 글씨로 올린다. 작은 크기에서도 읽히도록 검은 외곽선을 넣었다. 표시 글자가 바뀔 때만 DOM을 쓰고, 절대 위치로 올려 초상화 크기나 간격이 흔들리지 않는다. 살아있는 아주 적은 체력은 0%로 내리지 않고, 가득 찬 때만 100%다.
- r727 저체력(.dng) 표시와 함께 쓰인다. 이펙트 끄기(nofx / tglite / 연출 끔)에서도 숫자는 그대로 두고, 따로 애니메이션을 넣지 않는다.
- 소모·저장 규칙·실제 HP·30% 기준·권장 전투력·전투 타이밍 없음 (표시만).

## r743 메뉴 팝업에서도 전투 상태
- 전투는 전체 화면 메뉴 뒤에서도 돌아가서, r740에서 그런 화면이 열려 있으면 하단 상태 줄로 보스 남은 시간이나 웨이브·적을 보여 주었다. ▦ 메뉴 팝업(#menuPop)도 스테이지 바를 가리는데, 그 줄은 뜨지 않았다.
- 이제 같은 줄을 메뉴 팝업이 열려 있을 때도 쓴다. 표시·문구·이펙트 끄기 동작은 r740과 같다. 화면과 팝업이 함께 열려 있어도 줄은 하나다. 줄을 탭하면 팝업(그리고 열려 있던 전체 화면)이 닫히고 전투로 돌아간다. 팝업보다 위에 떠서 가려지지 않는다.
- 전투를 멈추거나 타이밍·HP를 바꾸지 않는다. 글자와 표시 여부는 바뀔 때만 갱신한다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·화면 이동만).

## r744 배속·자동 토글 읽기
- 화룡전은 전투 배속과 자동이 켜졌는지 버튼만 봐도 바로 안다 (꺼짐은 어둡고, 켜짐은 빛나고 색이 분명하다). 여기 배속(×1/×2)과 스킬 자동, 보스 자동은 이미 전투 HUD에 있었지만, 보스 자동은 글자 색만 바뀌고, 스킬 자동은 아이콘만 있어 켜짐·꺼짐이 약했다.
- 이제 있는 버튼을 다시 칠한다. 배속은 ×숫자 크기를 키워 항상 보이게 하고, ×2일 때 금색으로 밝힌다. 스킬 자동(스킬 줄 오른쪽 끝 AUTO)은 꺼지면 어둡고, 켜지면 금색 빛과 AUTO 글씨가 분명하다. 보스 자동은 꺼지면 어두운 칩, 켜지면 초록으로 빛난다. 새 막대는 넣지 않았다. 드래곤 슬레이브는 스킬 줄 가운데, AUTO는 오른쪽 끝(r588/r589) 그대로다.
- 표시는 상태가 바뀔 때만 바꾼다. 이펙트 끄기에서는 켜짐·꺼짐 색은 남기고 맥동은 없다. 누르는 반응은 그대로다. 배속·자동 동작은 바꾸지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r746 물약 자동 칩 읽기
- 화룡전은 자동이 켜졌는지 버튼만 봐도 바로 안다. r744에서 배속·스킬 자동·보스 자동은 꺼지면 어둡고 켜지면 빛나게 바꿨지만, 물약 줄의 「자동」 칩(#potA)은 작은 회색/초록 글씨만 바뀌고, 켜져 있을 때는 「자동」만 보여 ON이 약했다.
- 이제 그 칩만 다시 칠한다. 꺼지면 어두운 칩에 「자동 OFF」, 켜지면 초록으로 빛나며 「자동 ON」이 분명하다. 새 막대는 넣지 않았고, 물약 버튼 위치와 크기는 그대로다. 표시는 상태가 바뀔 때만 바꾼다. 이펙트 끄기에서는 켜짐·꺼짐 색은 남기고 맥동은 없다. 누르는 반응은 그대로 두고, 칩을 누를 때 살짝 줄어든다.
- 보스전 물약 자동 사용, 물약 개수, 재사용 대기, 사용 조건은 바꾸지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r747 물약 남은 쿨 초
- 스킬 줄 아이콘의 남은 쿨 초는 이미 있다 (r725). 1초 이상은 올림한 정수, 마지막 1초는 0.9…0.1, MapleStory 글씨에 검은 외곽선, 글자가 바뀔 때만 다시 쓴다. 같은 숫자를 스킬 아이콘에 하나 더 올리지 않았다.
- 회복·마나 물약 버튼은 8초 재사용 대기 동안 어두운 가림만 있고 남은 시간이 없어, 누르면 「재사용 대기 중」만 나왔다. 화룡전 물약도 남은 초가 바로 보인다.
- 이제 그 버튼 한가운데에 스킬과 같은 시계(정수 · 1초 미만은 0.1초, r725 형식)를 MapleStory 글씨와 외곽선으로 보여 준다. 보유 개수 뱃지는 그대로 두고, 버튼 크기와 위치, r746 물약 자동 칩의 켜짐·꺼짐 표시는 바꾸지 않는다. 글자가 바뀔 때만 쓴다. 이펙트 끄기에서도 숫자는 그대로이고 맥동은 없다. 물약 쿨 길이·사용·자동 사용·개수는 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍·실제 쿨 없음 (표시만).

## r748 방치보상 버튼 읽기
- 화룡전 방치 상자는 받을 수 있을 때 빛나고, 아직이면 남은 시간이 바로 보인다. 여기 방치보상 버튼(#idleBtn)은 모인 시간(0h 00m)만 보여 주고, 상자가 빛나는 건 10분이 지난 뒤였다. 실제로는 1분만 모여도 받을 수 있다(팝업의 「1분 이상 누적 후 수령 가능」, C.idleClaim). 마지막 1분은 초가 안 보여 대기가 읽히지 않았다.
- 이제 아직 받을 수 없으면 「남은 N초」로 기다림이 보이고, 받을 수 있으면 상자가 금색으로 밝아지며 모인 시간(1h 23m)은 그대로 둔다. 8시간 가득(MAX) 표시는 그대로다. 글자와 켜짐 표시는 바뀔 때만 바꾼다. 이펙트 끄기에서는 밝기·색은 남기고 흔들림·맥동은 없다. 버튼 위치와 크기는 바꾸지 않는다.
- 방치 보상 양, 1분 수령 조건, 50% 지급, 8시간 한도는 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r749 스킬 아이콘을 누르고 있으면 이름
- 화룡전 스킬 줄은 아이콘을 누르고 있는 동안 스킬 이름이 보여, 어떤 스킬인지 바로 안다. 여기 전투 하단 스킬 줄은 아이콘만 있고, 짧게 누르면 사용, 0.5초 길게 누르면 자동 사용 제외/포함만 바뀌었다. 이름은 쓰지 않을 때나 편성 화면에 가야 보였다.
- 이제 스킬 아이콘을 누르고 있는 동안에만, 그 아이콘 위에 MapleStory 글씨와 외곽선으로 이름이 뜬다. 손을 떼면 바로 사라진다. 아이콘 크기와 자리, 드래곤 슬레이브 가운데·AUTO 오른쪽 끝 배치는 그대로다. 짧게 눌러 쓰는 동작과 그 타이밍, 길게 눌러 자동에서 빼거나 넣는 동작은 바꾸지 않는다. 표시는 이름·위치가 바뀔 때만 바꾼다. 이펙트 끄기에서는 이름만 남기고 애니메는 없다. 따로 한 번 더 탭할 필요는 없다.
- 스킬 쿨·사용·자동 시전·자동 제외 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r750 우편 아이콘 받을 메일 수
- 화룡전 우편 아이콘은 받을 우편이 있으면 숫자 뱃지가 분명하다. 여기 왼쪽 우편 아이콘(#sidemail)에도 빨간 뱃지(.dot)가 켜지지만, 알맹이 없이 펄럭이기만 해서 몇 통인지는 우편함을 열어야 알았다.
- 이제 같은 뱃지에 받을 수 있는 우편 수(지금 살아있는 메일, C.mailLive와 같은 규칙)를 MapleStory 글씨로 보여 준다. 0통이면 뱃지를 숨기고, 1통 이상이면 밝게 켠다. 글자와 표시는 바뀔 때만 바꾼다. 이펙트 끄기에서는 숫자와 뱃지는 남기고 흔들림은 없다. 아이콘 크기와 자리는 그대로다.
- 우편 보상, 보관 기한, 받기/모두 받기 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r751 출석 아이콘 오늘 받을 표시
- 화룡전 출석 아이콘은 오늘 도장을 아직 안 찍었으면 뱃지가 분명하게 켜진다. 여기 왼쪽 출석 아이콘(#sideevent)에도 빨간 뱃지(.dot)가 켜지지만, 알맹이 없이 펄럭이기만 해서 오늘 받을 수 있는지가 잘 안 보였다.
- 이제 같은 뱃지를 우편(r750)과 같은 방식으로 밝게 켠다. 오늘 출석을 아직 안 받았고 28일이 끝나지 않았으면(출석판과 같은 규칙) MapleStory 글씨로 「1」을 보여 주고, 오늘 이미 받았거나 28일을 다 채우면 뱃지를 숨긴다. 글자와 표시는 바뀔 때만 바꾼다. 이펙트 끄기에서는 숫자와 뱃지는 남기고 흔들림은 없다. 아이콘 크기와 자리는 그대로다.
- 출석 보상, 받기, 날짜 초기화, 28일 주기 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r752 임무 아이콘 받을 임무 수
- 화룡전 임무 아이콘은 받을 임무가 있으면 숫자 뱃지가 분명하다. 여기 오른쪽 임무 아이콘(#sidemission)에도 빨간 뱃지(.dot)가 켜지지만, 알맹이 없이 펄럭이기만 해서 몇 개인지는 임무 창을 열어야 알았다.
- 이제 같은 뱃지에 받을 수 있는 임무 수(일일·주간 완료 후 미수령, 그리고 같은 뱃지를 켜던 기존 규칙의 업적 받을 단계)를 MapleStory 글씨로 보여 준다. 0개이면 뱃지를 숨기고, 1개 이상이면 밝게 켠다. 글자와 표시는 바뀔 때만 바꾼다. 이펙트 끄기에서는 숫자와 뱃지는 남기고 흔들림은 없다. 아이콘 크기와 자리, 모두 받은 뒤의 체크 표시는 그대로다.
- 임무 진행도, 받기, 보상, 일일·주간 초기화 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r753 패키지 아이콘 무료 상품 수
- 화룡전 상점 아이콘은 오늘 받을 무료 상품이 있으면 숫자 뱃지가 분명하다. 여기 왼쪽 패키지 아이콘(#sideshop)에는 뱃지 자리가 있지만 비어 있었고, 받을 수 있는지는 상점을 열거나 아래 상점 탭의 빨간 점을 봐야 알았다.
- 이제 같은 뱃지에 오늘 아직 안 받은 일일 무료 상품 수(상점이 켜던 것과 같은 규칙: 무료 상품이고 오늘 산 횟수가 한도보다 적음)를 MapleStory 글씨로 보여 준다. 0개이면 뱃지를 숨기고, 1개 이상이면 밝게 켠다. 글자와 표시는 바뀔 때만 바꾼다. 이펙트 끄기에서는 숫자와 뱃지는 남기고 흔들림은 없다. 아이콘 크기와 자리는 그대로다.
- 상점 재고, 가격, 구매·한도, 보상 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r754 영지 아이콘 수확 가능 수
- 화룡전 영지 아이콘은 수확할 건물이 있으면 숫자 뱃지가 분명하다. 여기 아래 영지 탭(#navbase)과 영지 쪽 아이콘(#sidebase)에도 빨간 뱃지(.dot)가 켜지지만, 알맹이 없이 펄럭이기만 해서 금고와 광산 중 몇 곳이 준비됐는지는 영지를 열어야 알았다.
- 이제 같은 뱃지에 수확 준비가 된 건물 수(기존과 같은 규칙: 금고·광산의 보관량이 한도의 절반 이상, acc ≥ 시간당 생산×보관시간×0.5)를 MapleStory 글씨로 보여 준다. 0개이면 뱃지를 숨기고, 1개 이상이면 밝게 켠다. 글자와 표시는 바뀔 때만 바꾼다. 이펙트 끄기에서는 숫자와 뱃지는 남기고 흔들림은 없다. 아이콘 크기와 자리는 그대로다.
- 수확량, 보관 한도, 생산 속도, 업그레이드 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r755 스테이지 필드 전환 약 0.2초
- 화룡전은 스테이지가 바뀔 때 배경이 약 100–200ms로 짧게 바뀐다. 여기 필드 교차 페이드(R.fade, 초당 1.2)는 약 0.8초라 다음 스테이지로 넘어가는 느낌이 길었다.
- 이제 같은 페이드가 약 0.2초(초당 5)로 끝난다. R.fade를 기다리는 적 출현·입력·웨이브·자동 진행은 없어서, 보이는 속도만 바뀐다. 이펙트 끄기에서는 페이드 없이 바로 새 필드가 보인다. 스테이지 이름 배너는 그대로다.
- 전투 타이밍, HP, 보상, 스테이지 진행 규칙은 그대로다. 던전·탑 CLEAR/실패 카드가 닫히기 전 대기(0.9–1.1초)는 이번이 아니다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r756 던전·탑 CLEAR/실패 직후 복귀
- 화룡전은 던전이나 탑이 끝나면 결과 스탬프를 짧게 보여주고 바로 다음 화면으로 돌아간다. 여기 클리어(0.9초)와 실패(1.1초) 대기는, 이미 끝난 전투 뒤에 같은 글자가 사라진 뒤에도 조금 더 멈춰 있어서 복귀가 길어 보였다.
- 이제 성공은 약 0.6초, 실패는 약 0.8초 뒤에 자동으로 던전·탑 화면으로 돌아간다. 글자를 읽었으면 화면 아무 곳이나 탭해서 바로 넘어갈 수 있다. 탭은 필수가 아니다. 이펙트 끄기에서는 팝·페이드 없이 같은 시간 동안 글자만 보여 준다.
- 전투 길이(탑 층은 그대로 더 긴 전투), 45초 제한, 보상, 층 진행, 다음 층 도전 규칙은 그대로다. 클리어 시간 표시는 실제 대기(바로 스킵한 시간도 포함)만 빼고, 전투 시간 자체는 바꾸지 않는다. 챕터·스테이지 결과 카드(.chap.out, .vic.out)는 이번이 아니다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·복귀 대기만).

## r757 챕터·결과 카드가 사라지는 속도
- 화룡전은 챕터 소개와 결과 카드가 닫힐 때 짧은 페이드만 남기고 바로 다음 조작이 된다. 여기 챕터 카드(.chap.out, 0.5초)와 결과 카드(.vic.out, 0.4초)는 글자가 이미 닫히기 시작한 뒤에도 조금 더 남아 있었고, 그 동안 챕터 카드는 왼쪽·오른쪽 레일 클릭을 막고(.chapon) 카드 자리의 탭도 삼켰다.
- 이제 닫힘 페이드는 약 0.25초다. 페이드가 시작하는 순간부터 카드는 탭을 통과시키고, 챕터 카드는 레일을 바로 다시 연다. 이펙트 끄기에서는 페이드 없이 바로 사라진다. 챕터 카드가 떠 있는 시간(약 2.6초)과 결과 카드 자동 닫힘(약 2.3초, 고정 시 약 8초)은 그대로라서, 읽기도 전투·보상·자동 진행 타이밍도 바뀌지 않는다. 탭은 필수가 아니고, 기존처럼 카드를 탭하면 바로 닫힌다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·닫힘만).

## r758 보스 WARNING이 끝난 뒤 바로 조작
- 화룡전은 보스 WARNING을 분명히 보여 준 뒤, 사라지는 순간부터 다음 조작이 된다. 여기 경고는 1.5초 동안 보여 주는 것 자체는 맞지만, 그 다음 0.4초 페이드 동안에도 동료 필살 자동 발동·가이드·업적/전리품 알림이 경고 노드가 남을 때까지 기다렸다. 화면 탭은 원래 통과했다(pointer-events:none).
- 이제 경고가 닫히기 시작하는 순간 그 대기들은 풀리고, 페이드는 약 0.25초다. 이펙트 끄기에서는 페이드 없이 바로 사라진다. 경고가 떠 있는 1.5초, 히트 스톱, 컷인 쿨, 보스 등장과 전투 타이밍은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·닫힘만).

## r759 업적·전리품 알림이 닫힌 뒤 바로 다음 알림
- 화룡전은 업적 판과 레어 장비 카드를 충분히 보여 준 뒤, 사라지기 시작하면 다음 알림을 띄운다. 여기 업적 판(.acp, 약 2초)과 전설·신화 카드(.lcd, 약 1.8초)는 읽는 시간은 맞지만, 그 다음 0.42초 페이드 동안에도 서로가, 그리고 같은 자리의 다음 장이, 노드가 남을 때까지 기다렸다. 화면 탭은 원래 통과했다.
- 이제 닫히기 시작하는 순간 다른 종류 알림은 바로 나올 수 있고, 페이드는 약 0.25초다. 같은 자리의 다음 장은 겹치지 않게 이전 장이 사라진 뒤에 나온다. 이펙트 끄기에서는 페이드 없이 바로 사라지고 다음이 이어진다. 떠 있는 시간과 업적·뽑기·보상 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·닫힘만).

## r760 보스 VS가 닫히기 시작하면 바로 전투 UI
- 화룡전은 보스 등장 VS를 분명히 보여 준 뒤, 접히기 시작하는 순간부터 다른 전투 알림이 나와도 된다. 여기 VS는 약 1.8초 동안 제대로 보이고, 전투 틱도 1.9초 뒤에 다시 도는데, 그 다음 0.4초 셔터가 끝날 때(2.25초)까지 콤보 배너·가이드·스테이지 이동·콤보 숫자 같은 알림이 노드를 기다렸다. 화면 탭은 원래 통과했다.
- 이제 1.8초가 지나면 VS에 .out이 붙고, 그 순간 그 알림들은 다시 뜰 수 있다. 셔터는 약 0.25초다. 이펙트 끄기에서는 1.8초에 바로 사라진다. 떠 있는 시간, 전투 틱이 멈추는 1.9초, 컷인 쿨, 보스 등장과 히트 스톱은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·닫힘만).

## r761 보스 필살기 컷인이 닫히기 시작하면 바로 전투 UI
- 화룡전은 보스 필살 예고를 분명히 보여 준 뒤, 사라지기 시작하는 순간부터 다른 전투 알림이 나와도 된다. 여기 컷인(.bcut)은 약 1초 동안 제대로 보이고 그 다음 0.25초 페이드가 이미 들어 있었지만, 페이드가 끝날 때(1.25초, 대기 창은 1.3초)까지 콤보 배너와 가이드가 노드를 기다렸다. 화면 탭은 원래 통과했다.
- 이제 1초가 지나면 컷인에 .out이 붙고, 그 순간 콤보 배너와 가이드가 다시 나올 수 있다. 페이드는 약 0.25초로 그대로다. 이펙트 끄기에서는 1초에 바로 사라진다. 떠 있는 시간, 보스 등장, WARNING, 필살 예고와 전투 타이밍은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시·닫힘만).

## r762 남은 적 수가 한눈에 보이게
- 화룡전은 전투 중에 지금 웨이브와 남은 적 수가 상단에서 바로 읽힌다. 여기 스테이지 바도 「웨이브 1/3 · 적 5」를 같은 자리에 보여 주지만, 11픽셀 흰 글자라서 숫자 크기가 라벨과 같고, 보스 남은 시간처럼 윤곽이 뚜렷하지 않았다.
- 이제 그 문구가 떠 있을 때만, 같은 자리에서 글자에 윤곽을 넣고 남은 적 수만 조금 더 큰 골드 숫자로 보여 준다. 바 너비나 높이, 다른 상태(다음 웨이브, 보스 도전, 보스 남은 시간)는 그대로다. 이펙트 끄기에서도 깜빡임 없이 그 숫자가 유지된다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r763 보스 체력 층 숫자가 바로 읽히게
- 화룡전은 전투 중에 떠오르는 피해 숫자와 보스 체력이 한눈에 들어온다. 여기 피해 숫자(메이플스토리 글씨, 두꺼운 윤곽, 치명타는 더 큼)는 이미 잘 읽혀서 그대로 두었다. 대신 상단 보스 체력 바의 층 수(#hpx, 「×10」)가 이탤릭 11픽셀 흰 글자라 바 위에서 작아 보였다.
- 이제 같은 자리에, 같은 「×N」 문구로, 남은 적 수와 비슷한 15픽셀 굵은 글씨와 더 진한 윤곽으로 보여 준다. 바 위치와 10층 계산은 그대로라서 레이아웃이 흔들리지 않는다. 이펙트 끄기에서도 깜빡임 없이 그 숫자가 유지된다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r764 동료가 받는 피해 숫자가 적 피해만큼 크게
- 화룡전은 우리 편이 맞는 숫자도 적에게 넣는 숫자만큼 바로 읽힌다. 여기 적에게 넣는 숫자(19픽셀, 두꺼운 윤곽)는 이미 잘 보였지만, 동료가 받는 빨간 마이너스 숫자는 같은 글씨에 15픽셀이라 작아 보였다.
- 이제 동료가 받는 숫자도 같은 19픽셀로, 같은 빨간 그라데이션과 윤곽을 유지한 채 한 번만 그려 둔다. 합쳐진 스택(×N)도 그 크기를 따른다. 글씨가 바뀔 때만 다시 그리고, 매 프레임 추가 작업은 없다. MISS/PARRY/BLOCK, 회복, 적에게 넣는 숫자, HP와 전투 타이밍은 그대로다. 피해 숫자 끄기 설정에서도 숫자는 나오지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r765 필드 동료 체력 바가 낮을 때 색이 바뀌게
- 화룡전은 전투 중 동료 머리 위 체력 바가 줄어들면 노랑·빨강으로 바뀌어, 누가 위험한지 바로 보인다. 여기 필드 바(52×7, 금색 테두리)는 자리와 크기는 맞지만, 체력이 낮아져도 항상 초록이라 초상화의 30% 경고와 달리 위급함이 잘 안 읽혔다.
- 이제 같은 바의 초록 칸만, 체력이 50% 이하면 노랑, 30% 이하(초상화와 같은 구간)면 빨강으로 다시 칠한다. 바의 위치·크기·테두리·가득 찼을 때의 옅은 표시는 그대로다. 초록(50% 초과)일 때는 다시 그리지 않는다. 이펙트 끄기에서도 깜빡임 없이 그 색이 유지된다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r766 적 체력 바가 낮을 때 색이 바뀌게
- 화룡전은 잡몹 머리 위 체력 바도 줄어들면 색이 바뀌어, 누가 거의 죽었는지 한눈에 보인다. 여기 일반 몹 바(46×6, 맞으면 나타나고 가득일 때는 옅음)는 항상 같은 붉은색이라, 너비 말고는 위급함이 잘 안 읽혔다.
- 이제 같은 바의 칸만, 체력이 50% 이하면 더 밝은 주황빛 빨강, 30% 이하면 선명한 위급 빨강으로 다시 칠한다. 바의 위치·크기·테두리·늦게 따라오는 흰 칸은 그대로다. 50%를 넘는 바는 다시 그리지 않는다. 정예는 금색 바와 「정예」 이름 그대로이고, 보스 필드 바는 만들지 않는다. 이펙트 끄기에서도 깜빡임 없이 그 색이 유지된다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r767 정예 체력 바가 낮을 때 더 진한 금색으로
- 화룡전은 정예 머리 위 금색 체력 바도 줄어들면 색이 조금 깊어져, 정예인 것은 보이면서도 위급함이 읽힌다. 여기 정예 바(56×6, 금색, 「정예」 이름)는 자리와 금색 정체성은 맞지만, 체력이 낮아져도 항상 같은 금색이라 너비 말고는 위급함이 잘 안 읽혔다.
- 이제 같은 바의 칸만, 체력이 50% 이하면 더 진한 호박색, 30% 이하면 더 진한 주황 금색으로 다시 칠한다. 바의 위치·크기·테두리·늦게 따라오는 흰 칸과 「정예」 이름은 그대로다. 50%를 넘는 바는 다시 그리지 않는다. 일반 몹 바와 보스 필드 바는 건드리지 않는다. 이펙트 끄기에서도 깜빡임 없이 그 색이 유지된다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r768 스킬 총 피해가 전투 중에도 바로 읽히게
- 화룡전은 스킬이 여러 적을 때리면 가운데 금색 총 피해가 굵은 윤곽으로 분명히 보이고, 이펙트를 꺼도 그 자리에 그대로 있다. 여기 총 피해(.tdmg)는 같은 자리에 30픽셀 금색 숫자를 띄우지만, 윤곽이 1.2픽셀이라 전투 중에 묻히기 쉽고, 콤보 배너에 붙는 줄(.tdm)은 22픽셀에 다른 글씨였다. 이펙트 끄기에서도 커졌다가 위로 떠오르며 사라졌다.
- 이제 같은 자리, 같은 문구로, 숫자 윤곽을 더 굵게 하고 글씨를 메이플스토리로 맞춘다. 콤보 배너에 붙는 숫자도 같은 크기와 윤곽을 쓴다. 이펙트 끄기에서는 커지거나 떠오르지 않고, 떠 있는 동안 그 자리에 그대로 있다. 위치와 떠 있는 시간은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r769 스킬 총 피해가 떠오르지 않고 그 자리에서 사라지게
- 화룡전은 스킬 총 피해가 잠깐 튀어 나온 뒤 그 자리에 읽힐 때까지 있다가, 짧게 사라진다. 여기 총 피해는 처음 튀어 나오는 연출은 있지만, 그 다음부터 위로 떠오르기 시작하고 마지막 약 0.35초는 더 올라가며 흐려져서 전투 중에 읽기가 어려웠다.
- 이제 같은 자리, 같은 1.6초 동안, 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머문다. 사라질 때만 약 0.25초 동안 제자리에서 흐려진다. 이펙트 끄기에서는 이전처럼 연출 없이 그 자리에 그대로 있다. 문구, 크기, 2명 이상일 때만 나오는 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r770 킬 배너가 떠오르지 않고 그 자리에서 사라지게
- 화룡전은 더블·트리플·멀티 킬 배너가 잠깐 튀어 나온 뒤 그 자리에 읽힐 때까지 있다가 짧게 사라진다. 여기 연계 스킬 배너(.combo)는 이미 그 자리에서 유지된 뒤 흐려지지만, 킬 배너(.mkb)는 나온 뒤부터 위로 떠오르고 마지막에는 더 올라가며 사라져서 전투 중에 읽기가 어려웠다. 이펙트 끄기에서도 그 움직임이 그대로였다.
- 이제 같은 자리, 같은 1.2초 동안, 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머문다. 사라질 때만 약 0.25초 동안 제자리에서 흐려진다. 이펙트 끄기에서는 연출 없이 그 자리에 그대로 있다. 문구와 크기, 킬 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r771 킬 배너 글씨와 윤곽이 바로 읽히게
- 화룡전은 더블·트리플·멀티 킬 글씨가 굵은 윤곽의 금색 메이플스토리 글씨로 한눈에 들어온다. 여기 킬 배너(.mkb)는 같은 자리와 문구지만, 윤곽이 1.5픽셀이라 전투 중에 묻히기 쉽고, 멀티 킬만 나중에 28픽셀로 줄어 트리플(30픽셀)보다 작아 보였다.
- 이제 같은 자리, 같은 문구로, 숫자 윤곽을 더 굵게 한다. 멀티 킬은 다시 34픽셀로, 다른 킬보다 작지 않게 두고 배수는 18픽셀로 맞춘다. 화면 너비를 넘치지 않고, 피해를 피하는 위치도 그대로다. 이펙트 끄기에서는 이전처럼 연출 없이 그 자리에 그대로 있다. 떠 있는 시간과 킬 규칙은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r772 연계기 배너 글씨가 바로 읽히게
- 화룡전은 두 동료가 함께 쓰는 연계기 배너의 작은 글씨도 윤곽이 있어 전투 중에 바로 읽힌다. 여기 연계기 배너(.combo)는 같은 자리에 「연계기」가 12픽셀, 두 동료 이름이 11픽셀이라 윤곽이 거의 없었고, 실제로 그려지는 판에서는 이름 줄이 9픽셀까지 작아졌다. 이펙트 끄기에서도 위에서 접히며 등장하는 연출이 그대로였다.
- 이제 같은 자리, 같은 1.5초 동안, 「연계기」는 15픽셀, 동료 이름은 14픽셀(판에서는 13픽셀)로 조금 더 크게, 메이플스토리 글씨와 더 굵은 윤곽으로 보여 준다. 화면 너비(390픽셀)를 넘치지 않고, 위치와 사라지는 방식, 나오는 규칙은 그대로다. 이펙트 끄기에서는 접히거나 미끄러지지 않고 그 자리에 그대로 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r773 스킬 이름 태그가 바로 읽히게
- 화룡전은 스킬을 쓰는 순간 캐릭터 위에 이름 태그가 굵은 글씨로 그 자리에 보이다가 짧게 사라진다. 여기 태그(.sktag)는 11픽셀에 윤곽이 거의 없고, 마지막에는 위로 떠오르며 흐려져서 전투 중에 읽기가 어려웠다.
- 이제 같은 자리, 같은 1.25초 동안, 글씨를 14픽셀 메이플스토리로 조금 더 크게 하고 윤곽을 더 굵게 한다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다 약 0.25초 동안 제자리에서 흐려진다. 화면 가장자리에서는 잘리지 않게 살짝 안쪽으로 맞춘다. 저사양·이펙트 끄기에서는 연출 없이 그 자리에 그대로 있다가 같은 시간에 사라진다. 나오는 규칙과 스킬 독, 길게 눌러 보는 이름은 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r774 웨이브 클리어·다음 웨이브가 그 자리에 읽히게
- 화룡전은 웨이브를 클리어하거나 다음 웨이브로 넘어갈 때, 가운데 리본 글씨가 굵은 윤곽으로 그 자리에 보이다가 짧게 사라진다. 여기 리본(.wvb.wrib, WAVE CLEAR / NEXT WAVE / WAVE)은 같은 자리와 1.15초지만, 글씨 윤곽이 얇고, 약 0.6초부터 흐려지며 위로 떠올라서 전투 중에 읽기가 어려웠다. 이펙트 끄기에서도 그 움직임이 그대로였다.
- 이제 같은 자리, 같은 1.15초 동안, 메이플스토리 글씨 윤곽을 더 굵게 한다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다, 사라질 때만 약 0.25초 동안 제자리에서 흐려진다. 먼저 사라질 때도 같은 자리에서 0.2초 동안 흐려지고, 나오는 규칙과 웨이브 시간은 그대로다. 이펙트 끄기에서는 연출 없이 그 자리에 그대로 있다가 같은 시간에 사라진다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r775 피버 배너가 떠오르지 않고 그 자리에 읽히게
- 화룡전은 피버가 터질 때 가운데 글씨가 굵은 윤곽으로 그 자리에 보이다가 짧게 사라진다. 여기 피버 배너(.fevban)는 같은 자리와 1.4초, 40픽셀이지만, 윤곽이 한쪽으로만 두껍고 마지막에는 위로 떠오르며 흐려져서 전투 중에 읽기가 어려웠다. 이펙트 끄기에서도 그 움직임이 그대로였다. 광폭화 배너(.enrb)는 이미 그 자리에서 유지된 뒤 흐려지므로, 이번엔 더 약한 피버 배너만 손본다.
- 이제 같은 자리, 같은 1.4초 동안, 글씨 윤곽을 사방으로 더 굵게 하고 설명 글씨도 조금 더 크게 한다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다, 사라질 때만 약 0.25초 동안 제자리에서 흐려진다. 나오는 규칙과 피버 효과, 광폭화 배너와 보스 광폭 표시는 그대로다. 이펙트 끄기에서는 연출 없이 그 자리에 그대로 있다가 같은 시간에 사라진다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r776 광폭화 글씨가 바로 읽히게
- 화룡전은 보스가 광폭화할 때 가운데 글씨가 사방으로 굵은 윤곽이 있어 전투 중에도 바로 읽힌다. 여기 광폭화 배너(.enrb)는 같은 자리와 1.4초, 40픽셀이고 그 자리에서 사라지지만, 윤곽이 아래로만 3픽셀이라 바쁜 화면에서 묻히기 쉽고, 이펙트 끄기에서도 커졌다가 줄어드는 연출이 그대로였다.
- 이제 같은 자리, 같은 1.4초 동안, 글씨 윤곽을 사방으로 더 굵게 하고 설명 글씨도 메이플스토리로 조금 더 크게 한다. 나오는 규칙과 보스 광폭 상태, 이름 옆 「광폭」 표시는 그대로다. 이펙트 끄기에서는 커지거나 줄어들지 않고 그 자리에 그대로 있다가 같은 시간에 사라진다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r777 격파 도장이 바로 읽히게
- 화룡전은 보스를 쓰러뜨리면 격파 도장의 글씨가 굵은 윤곽으로 그 자리에 보이다가 짧게 사라진다. 여기 격파 도장(.bsht)은 같은 자리와 1.7초이고, 이미 그 자리에서 흐려지지만, 「격파!」 윤곽 옆에 한쪽으로만 그림자가 있고 보스 이름 줄은 윤곽이 거의 없다. 이펙트 끄기에서도 잠깐 기다렸다가 나타났다가 다시 흐려졌다.
- 이제 같은 자리, 같은 1.7초 동안, 「격파!」 윤곽을 사방으로 맞추고 이름 줄에도 윤곽을 넣는다. 나오는 규칙과 보스 위치, 도장 그림은 그대로다. 이펙트 끄기·저사양에서는 커지거나 기다리지 않고 그 자리에 그대로 있다가 같은 시간에 사라진다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r778 회피·방어 글씨가 그 자리에서 바로 읽히게
- 화룡전은 동료가 피하거나 막을 때 MISS·PARRY·BLOCK 글씨가 굵은 윤곽과 선명한 색으로 그 자리에 보이다가 짧게 사라진다. 여기 적에게 넣는 숫자와 동료가 받는 숫자(19픽셀)는 이미 잘 보이지만, 이 글씨는 같은 크기에 MISS가 회색이라 묻히기 쉽고, 마지막까지 위로 떠오르며 흐려져서 전투 중에 읽기가 어려웠다. 이펙트 끄기에서도 그 움직임이 그대로였다.
- 이제 같은 19픽셀, 같은 약 1초 동안, MISS는 금색, PARRY는 황금, BLOCK은 더 밝은 청록으로, 윤곽을 더 진하게 한 번만 그려 둔다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다, 사라질 때만 제자리에서 흐려진다. 나오는 규칙과 피해 숫자는 그대로다. 이펙트 끄기·저사양에서는 떠오르지 않고 그 자리에 있다. 피해 숫자 끄기 설정에서도 글씨는 나오지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r779 회복 숫자가 전투 중에도 바로 읽히게
- 화룡전은 회복 숫자가 공격 숫자와 같은 크기의 선명한 초록 글씨로, 그 자리에 보이다가 짧게 사라진다. 여기 적에게 넣는 숫자와 동료가 받는 숫자(19픽셀)는 이미 잘 보이지만, 회복 숫자는 17픽셀에 연한 초록이라 전투 중에 묻히기 쉽고, 마지막까지 위로 떠오르며 흐려졌다. 이펙트 끄기에서도 그 움직임이 그대로였다.
- 이제 같은 자리, 같은 1초 동안, 회복 숫자도 19픽셀 메이플스토리로 맞추고 초록을 더 선명하게, 윤곽을 더 진하게 한 번만 그려 둔다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다, 사라질 때만 제자리에서 흐려진다. 회복량과 합쳐 보여주는 방식, 나오는 규칙은 그대로다. 이펙트 끄기·저사양에서는 떠오르지 않고 그 자리에 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r780 회피·공격 저지 글씨가 그 자리에서 바로 읽히게
- 화룡전은 붉은 장판을 피하거나 보스의 공격을 끊었을 때, 회피·공격 저지 글씨가 굵은 윤곽과 선명한 색으로 그 자리에 보이다가 짧게 사라진다. 여기 글씨는 16픽셀에 회피가 연한 색이라 전투 중에 묻히기 쉽고, 마지막까지 위로 떠오르며 흐려졌다. 이펙트 끄기에서도 그 움직임이 그대로였다.
- 이제 같은 자리, 같은 1초 동안, 19픽셀 메이플스토리로 맞추고 회피는 금색, 공격 저지는 밝은 청록으로, 윤곽을 더 진하게 한 번만 그려 둔다. 처음 위치에서 머물다, 사라질 때만 약 0.25초 동안 제자리에서 흐려진다. 피하고 끊는 규칙과 동료가 움직이는 방식은 그대로다. 이펙트 끄기·저사양에서는 떠오르지 않고 그 자리에 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r781 정예 출현 글씨가 그 자리에서 바로 읽히게
- 화룡전은 정예가 나올 때 위쪽 짧은 띠의 글씨가 굵은 윤곽과 선명한 금색으로 그 자리에 보이다가 짧게 사라진다. 여기 브레이크 글씨(BREAK!)는 이미 크고 윤곽이 있어 잘 보이지만, 정예 출현 띠는 13픽셀에 윤곽이 얇고, 처음 살짝 위에서 미끄러져 들어와 전투 중에 읽기가 어려웠다. 이펙트 끄기에서도 그 움직임이 그대로였다.
- 이제 같은 자리, 같은 1.6초 동안, 글씨를 15픽셀 메이플스토리로 조금 더 크게 하고 금색과 윤곽을 더 진하게 한 번만 그려 둔다. 미끄러지지 않고 그 자리에 머물다, 사라질 때만 제자리에서 흐려진다. 정예가 나오는 규칙과 처치 보상 4배, 보스전에서 이 띠가 나오지 않는 규칙은 그대로다. 이펙트 끄기·저사양에서는 미끄러지지 않고 그 자리에 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r782 정예 처치 글씨가 그 자리에서 바로 읽히게
- 화룡전은 정예를 쓰러뜨렸을 때 금색 글씨가 굵은 윤곽으로 그 자리에 보이다가 짧게 사라진다. 여기 정예 처치 글씨는 17픽셀에, 마지막까지 위로 26픽셀 떠오르며 흐려져서 전투 중에 읽기가 어려웠다. 이펙트 끄기에서도 그 움직임과 커졌다가 줄어드는 연출이 그대로였다.
- 이제 같은 자리, 같은 1.3초 동안, 「정예 처치!」를 19픽셀 메이플스토리로 맞추고 금색과 윤곽을 더 진하게 한 번만 그려 둔다. 골드·오브 줄도 조금 더 크게 한다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다, 사라질 때만 약 0.3초 동안 제자리에서 흐려진다. 정예가 나오는 규칙과 처치 보상은 그대로다. 이펙트 끄기·저사양에서는 떠오르거나 커지지 않고 그 자리에 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r783 이펙트 끄기에서 브레이크 글씨가 커지지 않게
- 화룡전은 이펙트를 끄면 브레이크 글씨가 커졌다 줄어들지 않고, 같은 시간 동안 그 자리에 보이다가 짧게 사라진다. 여기 브레이크 글씨(BREAK!)는 이미 크고 윤곽이 있으며, 보스 위치를 따라가고, 마지막 약 0.3초는 제자리에서 흐려진다. 하지만 이펙트 끄기·저사양에서도 처음 잠깐 커졌다가 줄어드는 연출이 그대로였다.
- 이제 이펙트를 켠 모습과 떠 있는 1.3초, 사라지는 타이밍, 보스를 따라가는 위치는 그대로 두고, 이펙트 끄기·저사양에서만 커지지 않고 그 자리에 있다. 그로기와 브레이크 규칙, 게이지와 그로기 안내는 그대로다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r784 기술 저지·저항 글씨가 그 자리에서 바로 읽히게
- 화룡전은 적의 기술을 끊거나 적이 버틸 때, 기술 저지·저항 글씨가 굵은 윤곽과 선명한 색으로 그 자리에 보이다가 짧게 사라진다. 여기 글씨는 15픽셀에 기술 저지가 연한 색이라 전투 중에 묻히기 쉽고, 마지막까지 살짝 위로 떠오르며 흐려졌다. 이펙트 끄기에서도 그 움직임과 커졌다가 줄어드는 연출이 그대로였다.
- 이제 같은 자리, 같은 약 1.1초 동안, 16픽셀 메이플스토리로 맞추고 기술 저지는 밝은 청록, 저항은 금색으로, 윤곽을 더 진하게 한 번만 그려 둔다. 처음의 짧은 연출은 그대로 두고 그 뒤에는 그 자리에 머물다, 사라질 때만 약 0.25초 동안 제자리에서 흐려진다. 끊고 버티는 규칙과, 기술이 나온다는 경고 글씨는 그대로다. 이펙트 끄기·저사양에서는 떠오르거나 커지지 않고 그 자리에 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r785 게이지 그로기·브레이크 임박 글씨가 바로 읽히게
- 화룡전은 보스 브레이크 게이지 안의 그로기·임박 글씨가 굵은 윤곽과 선명한 색으로 게이지 안에 바로 보인다. 여기 글씨는 8.5픽셀에 연한 분홍·크림색이라 가느다란 게이지 안에서 묻히기 쉽고, 그로기 직전과 보통 브레이크가 같은 색이라 구분이 어려웠다.
- 이제 같은 자리, 같은 게이지 크기와 타이밍으로, 9픽셀 메이플스토리로 맞추고 그로기는 붉은 산호색, 임박은 밝은 금색, 브레이크는 크림 금색으로, 윤곽을 더 가지런하고 진하게 한 번만 그려 둔다. 게이지가 나오고 차는 규칙, 보스 위치, 아래 그로기 안내 줄은 그대로다. 이펙트 끄기·저사양에서도 움직이거나 커지지 않고 그 자리에 있다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r786 그로기 안내 줄이 바로 읽히게
- 화룡전은 보스가 그로기에 들어갔을 때, 게이지 아래 짧은 안내 줄이 굵은 윤곽과 선명한 색으로 그 자리에 보이다가 그로기가 끝나기 전에 짧게 사라진다. 여기 글씨는 10픽셀에 피해 안내는 윤곽이 없고, 그로기 글씨도 단색이라 가느다란 줄 안에서 묻히기 쉬웠다.
- 이제 같은 자리, 같은 14픽셀 높이의 줄과 나타나는 타이밍으로, 11픽셀 메이플스토리로 맞추고 그로기는 금색, 피해 안내는 크림색으로, 윤곽을 가지런하고 진하게 한 번만 그려 둔다. 글씨는 기존 줄 안에 맞춰 두고, 줄의 크기와 위치, 그로기 규칙과 피해 배율, 보스 위치는 그대로다. 이펙트 끄기·저사양에서도 커지거나 움직이지 않고, 같은 속도로 나타났다가 사라진다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r787 강한 공격만 짧게 묵직하게
- 화룡전은 평타가 가볍게 지나고, 치명타·스킬·필살기가 맞을 때만 화면이 짧게 멈칫하고 한쪽으로 살짝 눌렸다가 돌아온다. 여기 평타는 이미 가벼운데, 강한 공격도 화면이 무작위로 흔들릴 뿐 묵직한 느낌이 약했고, 이펙트 끄기에서도 흔들림과 번쩍임이 남았다.
- 이제 치명타·스킬·필살기가 맞을 때만 화면이 짧게 멈칫하고 아래로 살짝 눌렸다가 돌아온다. 평타는 그대로 가볍다. 여러 대가 한 번에 맞아도 한 번만 먹고, 배속을 켜면 그만큼 짧게 끝난다. 데미지와 전투 진행, 보스 연출은 그대로다. 이펙트 끄기·저사양에서는 흔들리거나 번쩍이거나 밀리지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r788 필살기 화면 흔들림이 짧게 남고 바로 가라앉게
- 화룡전은 필살기가 맞을 때 화면이 한 번 묵직하게 눌리며, 남은 흔들림은 짧게 있다가 바로 가라앉는다. 여기 드래곤 슬레이브와 기가 슬레이브는 이미 가장 큰 연출인데, 화면이 26~30픽셀이나 무작위로 흔들려 아래로 눌리는 느낌이 묻혔다.
- 이제 필살기의 번쩍임과 이펙트, 보스 연출은 그대로 두고, 무작위 흔들림만 14픽셀 정도로 남겼다가 약 0.25초 만에 가라앉힌다. 아래로 눌리는 느낌이 더 잘 보이고, 필살기는 여전히 전투에서 가장 큰 순간이다. 이펙트 끄기·저사양에서는 흔들리거나 밀리지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r789 필살기 번쩍임이 짧고 선명하게
- 화룡전은 필살기가 맞을 때 화면이 한 번 밝게 번쩍이고 바로 가라앉는다. 여기 드래곤 슬레이브와 기가 슬레이브는 이미 가장 큰 연출인데, 화면 전체가 약 0.25초 동안 짙게 덮였고, 같은 시전 안의 다른 번쩍임이 이어져 오래 번쩍이거나 여러 번 깜빡일 수 있었다. 치명타는 번쩍임이 없었다.
- 이제 필살기가 맞는 순간의 화면 번쩍임은 짧게 한 번만 밝았다가 약 0.1초 만에 가라앉는다. 같은 시전 안의 작은 전체 화면 번쩍임은 겹치지 않게 줄였다. 빔과 폭발, 보스 연출은 그대로다. 치명타는 아주 약하게, 맞은 자리만 짧게 빛나고, 연속 치명타가 깜빡이지 않게 간격을 둔다. 이펙트 끄기·저사양에서는 번쩍이지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r790 타격 효과음이 세기별로 나뉘게
- 화룡전은 기본 타격, 치명타, 스킬, 필살기가 맞을 때 소리가 분명히 다르다. 여기는 이미 기본 타격과 치명타 효과음, 드래곤 슬레이브 시전 때의 기합과 울림이 있었지만, 스킬이 맞을 때는 뭉개진 소리가 나고, 필살기가 맞는 순간에는 같은 스킬 타격음이 여러 대상에 겹쳤다.
- 이제 기본 타격과 치명타 소리는 그대로 두고, 스킬이 맞을 때는 조금 더 묵직하고 또렷한 타격음이 난다. 드래곤 슬레이브와 기가 슬레이브가 맞는 순간에는, 화면이 아래로 눌리는 것과 같은 타이밍에 전용 타격음이 한 번 울린다. 여러 대상이나 빠른 배속에서도 소리가 쌓이거나 깨지지 않게 간격을 두었고, 효과음을 끄면 나지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r791 스킬 속성별 타격음
- 화룡전은 불, 얼음, 번개처럼 속성이 다른 스킬이 맞을 때 타격음도 다르게 들린다. 여기는 스킬이 맞을 때 같은 타격음이 나서, 파이어볼과 프리즈 애로우, 썬더 볼트가 소리만으로는 구분이 안 됐다.
- 이제 스킬이 맞을 때의 묵직한 타격음은 그대로 두고, 그 위에 속성만 짧게 덧입힌다. 불은 타오르는 소리, 얼음은 깨지는 소리, 번개는 짧게 튀는 소리이고, 독·매혹·암흑·신성·검격·방패 같은 다른 스킬도 각각 짧게 구분이 된다. 속성이 없는 타격은 기존 스킬 타격음 그대로다. 드래곤 슬레이브와 기가 슬레이브의 전용 타격음은 바꾸지 않았다. 효과음을 끄면 나지 않는다.
- 소모·저장 규칙·HP·권장 전투력·전투 타이밍 없음 (표시만).

## r792 동료마다 기본 타격이 다르게
- 화룡전은 같은 편이어도 누가 때렸는지 타격의 빛과 소리로 구분이 된다. 여기는 이미 검·마법·활의 휘두르는 소리는 나뉘고, 무기 궤적도 다르지만, 기본 타격이 맞을 때의 불꽃과 타격음은 물리와 마법 두 가지뿐이라 리나, 가우리, 젤가디스, 아멜리아가 맞아도 느낌이 비슷했다.
- 이제 기본 타격이 맞을 때, 기존 타격음은 그대로 두고 동료마다 작은 불꽃과 짧은 소리를 덧입힌다. 리나는 불꽃색, 가우리는 금빛 검흔, 젤가디스는 보랏빛 검흔, 아멜리아는 부드러운 빛, 리라는 뾰족한 초록 섬광처럼 무기와 성격이 드러난다. 스킬과 필살기 타격음은 그대로다. 이펙트나 효과음을 끄면 덧입힌 불꽃과 소리는 나지 않는다.
- 소모·저장 규칙·HP·권장 전투력·공격 속도·전투 타이밍 없음 (표시만).

## r793 동료마다 휘두르는 소리가 다르게
- 화룡전은 누가 칼을 휘두르거나 마법을 쓰는지만 들어도 구분이 된다. 여기는 이미 검·마법·활 세 가지로 나뉘어 있었지만, 가우리와 젤가디스, 피피의 휘두르는 소리는 같았고, 리나·아멜리아·제로스 같은 시전음도 서로 비슷했다.
- 이제 기존의 휘두르거나 시전하는 소리는 그대로 두고, 그 위에 동료마다 짧은 빛깔만 덧입힌다. 가우리는 금빛 검기, 젤가디스는 보랏빛 검기, 피피는 가벼운 쌍검, 리나는 불꽃 시전처럼 들린다. 적이나 보스가 휘두르는 소리, 스킬과 필살기 타격음은 그대로다. 효과음을 끄면 나지 않는다.
- 소모·저장 규칙·HP·권장 전투력·공격 속도·전투 타이밍 없음 (표시만).

## r794 동료마다 맞는 반응이 다르게
- 화룡전은 누가 맞았는지도 빛과 소리로 구분이 된다. 여기는 이미 기본 타격과 휘두르는 소리는 동료마다 달라졌지만, 맞았을 때는 누구나 같은 붉은 번쩍임과 같은 신음이었다.
- 이제 맞았을 때의 기존 신음과 움찔은 그대로 두고, 그 위에 동료마다 짧은 빛과 소리를 덧입힌다. 리나는 불꽃색, 가우리는 금빛, 젤가디스는 보랏빛, 아멜리아는 부드러운 빛처럼, 때릴 때와 같은 빛깔이다. 피하기·막기·받아치기는 그대로다. 이펙트나 효과음을 끄면 덧입힌 빛과 소리는 나지 않는다.
- 소모·저장 규칙·HP·권장 전투력·공격 속도·전투 타이밍 없음 (표시만).

## r795 회복 빛과 소리가 출처마다 다르게
- 화룡전은 누가 회복했는지도 빛과 소리로 구분이 된다. 여기는 이미 타격·휘두르기·맞는 반응은 동료마다 달라졌지만, 아멜리아와 세라의 회복, 리커버리, 회복 물약은 같은 초록 빛과 같은 종소리였고, 동료가 회복할 때는 소리도 없었다.
- 이제 기존의 회복 종소리와 초록 빛, 회복 숫자는 그대로 두고, 그 위에 출처마다 짧은 빛과 소리를 덧입힌다. 아멜리아는 부드러운 크림빛, 세라는 성스러운 초록, 리커버리는 맑은 민트, 물약은 붉은 기운이다. 이펙트나 효과음을 끄면 덧입힌 빛과 소리는 나지 않는다.
- 소모·저장 규칙·HP·회복량·권장 전투력·공격 속도·전투 타이밍 없음 (표시만).

## r796 동료 필살기 빛과 소리가 캐릭터마다 다르게
- 화룡전은 동료 필살기가 맞을 때도 누가 썼는지 빛과 소리로 바로 읽힌다. 여기는 이미 기본 타격·휘두르기·맞는 반응·회복이 캐릭터마다 다르게 입혀져 있지만, 동료 필살기가 적에게 닿는 순간은 모두 같은 청록빛 고리와 같은 스킬 타격음이었다. 리나  Inverse의 드래곤 슬레이브는 그대로 가장 큰 한 방으로 두고, 그 아래 단계의 동료 필살기에만 짧은 빛과 소리를 덧입힌다.
- 이제 기존의 스킬 타격음과 화면 연출은 그대로 두고, 그 위에 캐릭터마다 짧은 빛과 소리를 덧입힌다. 가우리는 밝은 금빛 칼날, 젤가디스는 보랏빛 파편, 제라스는 깊은 보라 별, 레아는 붉은 불꽃, 리라는 연두 다이아, 보린은 투박한 황토, 카에데는 장밋빛 칼날, 피프는 옅은 쌍점, 노엘은 냉기 푸른 별이다. 아멜리아와 세라의 필살기 회복은 기존의 회복 종소리를 그대로 쓰고, 조금 더 넓은 빛만 덧입힌다. 드래곤 슬레이브보다 빛도, 흔들림도, 소리도 한 단계 작게 유지한다. 이펙트나 효과음을 끄면 덧입힌 빛과 소리는 나지 않는다.
- 소모·저장 규칙·HP·필살기 게이지·권장 전투력·공격 속도·전투 타이밍 없음 (표시만).

## r797 던전·탑 전투 입장과 복귀가 바로 전환
- 화룡전은 던전이나 탑에 들어가면 화면이 바로 전투 배경으로 바뀐다. 여기는 스테이지가 바뀔 때의 짧은 페이드(약 0.2초)가 던전·탑·전직 시련에 들어가고 나올 때도 그대로 쓰여, 메뉴가 사라진 뒤에도 이전 들판이 잠깐 남아 있었다.
- 이제 던전·무한의 탑·전직 시련에 들어가거나 나올 때는 배경이 바로 바뀐다. 일반 스테이지가 바뀌는 짧은 페이드와 보스 WARNING·VS 연출은 그대로 둔다. 이펙트를 끄면 원래부터 바로 바뀐다.
- 소모·저장 규칙·HP·전투 시간·보상 없음 (표시만).

## r798 던전·탑 화면이 전투 후에 바로 다시 열린다
- 화룡전은 던전이나 탑 전투가 끝나면 목록 화면이 바로 다시 뜬다. 여기는 메뉴를 열 때 아주 짧은 페이드(0.15초)를 쓰고 있는데, 클리어나 실패 뒤에 던전·탑 화면이 다시 열릴 때도 그 페이드가 그대로 들어가 한 박자 늦게 보였다.
- 이제 던전·무한의 탑(같은 길로 화면이 다시 열리는 전직 시련 포함)에서 전투가 끝난 뒤에 목록이 돌아올 때는 바로 나타난다. 평소에 메뉴를 열 때의 짧은 페이드는 그대로 둔다. 이펙트를 끄면 원래부터 바로 나타난다.
- 소모·저장 규칙·HP·CLEAR 대기·전투 시간·보상 없음 (표시만).

## r799 던전·탑 전투 중 콤보와 보스 연출이 다시 보인다
- 화룡전은 던전이나 탑에 들어가면 전투 UI가 바로 보인다. 여기는 월드 보스에 들어갈 때는 메뉴 가림을 풀지만, 던전·무한의 탑·보스 러시·전직 시련은 메뉴를 닫은 뒤에도 그 가림이 남아, 콤보와 보스 WARNING·VS가 전투 내내 숨겨져 있었다.
- 이제 그 전투에 들어가면 콤보와 보스 연출이 다시 보인다. 전투가 끝나 목록 화면이 다시 열리면 메뉴를 가리는 처리는 다시 켜지고, 평소에 메뉴를 열고 닫을 때는 그대로다.
- 소모·저장 규칙·HP·전투 시간·보상 없음 (표시만).

## r800 보스 러시가 끝나면 도전 목록이 다시 열린다
- 화룡전은 보스 러시가 끝나도 도전 목록으로 돌아온다. 여기는 던전이나 탑은 이미 목록이 다시 열리지만, 보스 러시는 타임 업 뒤에 들판으로 떨어져 목록을 다시 찾아 들어가야 했다.
- 이제 보스 러시가 끝나면 기존의 결과 카드는 그대로 두고, 그 아래에 도전 목록이 바로 다시 열린다. 결과 카드를 가리거나 일찍 닫지 않고, 보상 받기 버튼도 그대로다. 평소에 메뉴를 여는 방식은 바꾸지 않는다.
- 소모·저장 규칙·점수·입장 횟수·보상·HP·전투 시간 없음 (표시만).

