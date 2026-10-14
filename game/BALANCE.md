# Balance (all numbers live in `data.js` → `BAL`, logic in `core.js`)

Run `node tools/sim.js [hours] [seed]` to replay the loop headless. Full output is written to `tools/sim-result.md`.
The sim plays "sensibly":
- train the cheapest stat
- save for buildings
- auto-roll, keeping better items
- summon until all 4 companions are owned
- daily missions, donations, raid tries, arena tickets, free shop orbs

## Curves (i = stage index 0..20, lv = player level, L = training level)
| What | Formula |
|---|---|
| Mob HP / ATK | 45·1.47^i / 3·1.42^i |
| Boss HP | mobHP·50 × (ch.1 ramp 0.55→1.0) × 1.2 on chapter-final (x-7). 30 s timer |
| Gold / EXP per kill | 1·1.30^i / 3·1.24^i (boss ×15 / ×10) |
| Level EXP | 30·1.17^(lv-1). Each level adds +2 ATK, +12 HP flat |
| 마력/체력 training | ×1.05 multiplier per level; cost 10·1.10^L gold (exponential sink) |
| 방어 / 집중 | +1 def (cost 30·1.12^L, max 120) / +0.5% crit (cost 60·1.15^L, max 50%) |
| Gear | ATK 3 / HP 25 × rarity mult × 1.10^maxStage. 8 slots, sell = goldKill·(1+0.8·grade) |
| Rarity odds | 일반 62% · 고급 27% · 희귀 8.5% · 영웅 2.1% · 전설 0.36% · 신화 0.04% (mult 1/1.5/2.3/3.6/5.8/9.5) |
| Orbs | 10% per kill, 5 per boss, 마정 광산 4/h per level, shop |
| Buildings | cost = goldKill(maxStage)·{120,200,400}·{1.55,1.6,1.7}^lv. Build time 30/60/120 s ×1.55^lv. Store cap 4 h |
| Guild | 2 daily donations, +5% ATK each for the day; guild level gives +2% ATK permanently |
| Raid | Dragon HP = bossHP(maxStage)·5·1.5^(raidLv-1). 3 tries/day, 30 s of estimated DPS each |
| Arena | 5 tickets (+1 per 2 h). Win p = sigmoid(7·(myPow/oppPow−1)). +25·(opp strength) / −15 pts. Weekly league reward 💎50–800 |
| Offline | min(8 h, away) × kills/s(est) × 8% gold/orbs, × 2% EXP |

## Simulated pacing (4 seeds)
| Milestone | Target | Result |
|---|---|---|
| Chapter 1 cleared (reach 2-1) | 5–10 min | 6–13 min |
| Chapter 2 cleared (reach 3-1) | 30–45 min more | 37–49 min more (total 43–59 min) |
| Chapter 3 (3-7 boss cleared) | a few hours | ~2–3 h more (total 2h45–3h51) |

- **Walls:** boss fails are concentrated on chapter finals (seed 1: 1-7×5, 2-7×7, 3-7×24) and on 3-4 and 3-6. Each wall is broken by training plus gear. After a fail, auto-challenge resumes once power is ≥ 1.08× the failed attempt, or after 3 minutes.
- **Gold sinks (seed 1):** training 67%, buildings 32%, donations and the shop's gold orbs make up the rest.
- **Rolls (884 in about 3.5 h):** 일반 62%, 고급 27%, 희귀 8.5%, 영웅 2.4%, 전설 0.34%, 신화 0. Mythic is roughly 1 in 2,500 rolls.
- **Offline 8 h (= max cap)**, gold compared with gold earned over the last 2 stages of active play:
  - at 1-7: 25×, about +11 levels (early stages are only minutes long)
  - at 2-7: 8×
  - at 3-1: 3×, +4 levels
  - at 3-7: 1.8×, +2 levels

  The target "≈1–2 stages" holds in chapter 3. Earlier chapters are deliberately generous, because 8 h equals about 40 min of active farming.
- **Known balance gaps:**
  - Gems are tight; the sim owns 2 of 4 companions after 3 h.
  - The shop's gold orbs are rarely affordable.
  - Arena and raid rewards were not tuned beyond sanity checks.

## Swarm packs (v4)
Regular waves spawn `BAL.swarm=[8,15]` mobs. Each mob gets q=3/n of the old 3-mob pack's per-mob HP, ATK, gold, EXP and orb chance, so each pack's totals stay the same. Sim with 3 seeds after the change: 2-1 at 8-12 min, 3-1 at 43-53 min, 3-7 cleared at 2h25-3h05 (roughly the same as before). Swarm mobs draw with 8 deform slices (bosses 16), and the particle pool is capped at 900. Headless frame test: 53 fps.

## v6 (daily dungeons, relics, idle chest, expeditions in the sim; faction counters)
- The sim now runs all daily dungeons every day, sends companions on expeditions and claims them, claims the idle chest every 4h, and upgrades the cheapest relic whenever it costs ≤30% of gold.
- Dungeon rewards: gold = goldKill(maxSi)×120, EXP = expKill(maxSi)×100, fragments = 3+⌊maxSi/3⌋, 2 entries per day each. The first version (×500 gold / ×350 EXP) made chapter 1 take 2–6 min.
- Faction counter: 정의 > 혼돈 > 인간 > 정의. ×1.25 when a unit has the advantage, ×0.85 at a disadvantage; checked per attacking unit, and spells use Lina's faction. Goblins and demons are 혼돈, bandits are 인간.
- Chapter 3 wall: mob HP ×1.4 for stages ≥14 (`BAL.ch3HP`), chapter boss ×1.35 (`BAL.chBoss`).
- Result over 4 seeds: 2-1 at 6–13 min, 3-1 at 39–59 min, 3-7 cleared at 3h18m–3h31m (one seed took 4h19m). This is inside the 2.5–3.5h target.
