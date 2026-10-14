// Headless balance sim: node tools/sim.js [hours=8] [seed]
global.DATA=require('../data.js');const C=require('../core.js');const D=DATA;
const H=+(process.argv[2]||8);let seed=+(process.argv[3]||1);C.rand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
let T=0;const T0=Date.UTC(2026,9,12,0,0,0);C.now=()=>T0+T*1000;
const S=C.init();
const fmtT=s=>`${Math.floor(s/3600)}h${String(Math.floor(s%3600/60)).padStart(2,'0')}m`;
const fmt=n=>n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(2)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':Math.floor(n)+'';
const reach=[],fails={},flow=[];let lastMax=-1,lastFail=0,gold0=0,orbsGot=0;
C.ev.fail=()=>{fails[S.si]=(fails[S.si]||0)+1};
const ORB0={v:S.orbs};
function policy(){
  C.daily();C.bUpdate();C.arenaUpdate();
  for(const k of ['vault','mine'])if(S.bld[k].acc>=C.bRate(k)*1800)C.bCollect(k);
  for(const m of D.MISSIONS)C.claimMission(m.k);
  if(!S.guild.don.gold&&S.gold>C.donateCost('gold')*3)C.donate('gold');if(!S.guild.don.gem&&S.gems>400)C.donate('gem');
  while(S.raid.tries<D.BAL.raid.tries)C.raidAttack();
  while(S.arena.tickets>0){const j=S.arena.opps.findIndex(o=>o.pow<C.POW()*1.1);C.arenaFight(j<0?2:j)}
  if(S.arena.pend)C.arenaClaim();
  C.buy('free');
  // v6 systems: daily dungeons, expeditions, idle chest, relics
  for(const u of D.DUNS)while(C.dunRun(u.k));
  for(const E of D.EXPS){C.expClaim(E.k);const free=Object.keys(S.comps).find(k=>!C.expBusy(k));if(free)C.expSend(E.k,free)}
  if(C.idleSec()>=4*3600)C.idleClaim();
  for(let i=0;i<20;i++){let best=null;for(const r of D.RELICS){const c=C.relicCost(r.k);if(S.frag>=c.f&&S.gold*.3>=c.g&&(!best||c.g<best.g))best={k:r.k,g:c.g}}if(!best)break;C.relicUp(best.k)}
  const owned=Object.keys(S.comps).length;
  if(owned<4||S.gems>2000){while((S.gems>=300||S.tickets)&&C.summon(1));}else if(S.gems>=600)C.buy('orb60');
  // buildings first if cheap relative to gold
  let saving=false;for(const k of ['mine','vault','tower'])if(!S.bld[k].up){if(C.bCost(k)<=S.gold)C.bUpgrade(k);else if(C.bCost(k)<S.stats.goldEarned*.08)saving=true}
  for(let i=0;i<4&&(S.shop.bought.orbg||0)<5&&C.shopPrice(D.SHOP[4])<S.gold*.15;i++)C.buy('orbg');
  S.filter=99;let n=0;while(n++<500&&C.autoRollStep()!=='empty');if(S.bag)C.sellBag();
  if(!saving)for(let i=0;i<300;i++){if(!C.train(C.cheapestStat().k))break}
}
const snaps=[];let nextSnap=0,nextOff=[6,13,14,20];const offl=[];
const dt=.1,END=H*3600;let pol=0;
// track active gold rate per stage
let rateWin=[];
while(T<END){C.tick(dt);T+=dt;pol+=dt;if(pol>=1){pol=0;policy()}
  if(S.maxSi!==lastMax){lastMax=S.maxSi;reach.push({st:C.stageName(S.maxSi),t:T,lv:S.lv,pow:C.POW(),gold:S.stats.goldEarned,fails:S.stats.bossFails});
    if(nextOff.includes(S.maxSi)){const r=C.offlineCalc(8*3600);let lv=S.lv,e=S.exp+r.x,need=x=>Math.floor(C.f(D.BAL.needExp,x-1));while(e>=need(lv)){e-=need(lv);lv++}
      const prev=reach.slice(-3);const span=prev[prev.length-1].t-prev[0].t,spanGold=Math.max(1,prev[prev.length-1].gold-prev[0].gold);
      offl.push({at:C.stageName(S.maxSi),gold:r.g,exp:r.x,orbs:r.o,lvGain:lv-S.lv,goldVsLast2Stages:r.g/spanGold,activeMinLast2:span/60});}}
  if(S.done&&!reach.done){reach.done=T}
  if(T>=nextSnap){snaps.push({t:fmtT(T),st:C.stageName(S.si),max:C.stageName(S.maxSi),lv:S.lv,pow:fmt(C.POW()),gold:fmt(S.gold),earned:fmt(S.stats.goldEarned),orbs:S.orbs,gems:S.gems,comps:JSON.stringify(S.comps),bld:`${S.bld.vault.lv}/${S.bld.mine.lv}/${S.bld.tower.lv}`,guild:S.guild.lv,raid:S.raid.lv,arena:S.arena.pts});nextSnap+=T<3600?600:1800}
  if(S.done&&T>reach.done+600)break;
}
const out=[];const p=s=>out.push(s);
p(`# Sim ${H}h seed ${process.argv[3]||1}`);
p('\n## Stage reach (max stage unlocked)');p('stage | time | Lv | power | boss fails so far');
reach.forEach(r=>p(`${r.st} | ${fmtT(r.t)} | ${r.lv} | ${fmt(r.pow)} | ${r.fails}`));
if(reach.done)p(`3-7 cleared at ${fmtT(reach.done)}`);
p('\n## Boss fails per stage: '+Object.entries(fails).map(([k,v])=>C.stageName(+k)+'×'+v).join(', '));
const R=S.stats.rolls,tot=R.reduce((a,b)=>a+b,0);p(`\n## Rolls: ${tot} — `+R.map((v,i)=>`${D.RAR[i].n} ${v} (${(v/tot*100).toFixed(2)}%)`).join(', '));
p(`\n## Gold: earned ${fmt(S.stats.goldEarned)}; spent `+Object.entries(S.stats.goldSpent).map(([k,v])=>`${k} ${fmt(v)} (${(v/S.stats.goldEarned*100).toFixed(0)}%)`).join(', '));
p('\n## Offline 8h test (resources vs. gold earned over last 2 stages of active play)');offl.forEach(o=>p(`at ${o.at}: gold ${fmt(o.gold)} (= ${(o.goldVsLast2Stages).toFixed(2)}× gold of last 2 stages, which took ${o.activeMinLast2.toFixed(0)} min), orbs ${o.orbs}, +${o.lvGain} Lv`));
p('\n## Snapshots');p('time | stage | max | Lv | pow | gold | earned | orbs | gems | comps | vault/mine/tower | guild | raid | arena');snaps.forEach(s=>p(Object.values(s).join(' | ')));
console.log(out.join('\n'));require('fs').writeFileSync(__dirname+'/sim-result.md',out.join('\n'));
