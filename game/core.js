// Game logic without DOM. Used by game.js (browser) and tools/sim.js (node).
(function(root){
'use strict';
const D=root.DATA||require('./data.js'), BAL=D.BAL;
const C={D,ev:{},now:()=>Date.now(),rand:Math.random};root.CORE=C;
const emit=(n,...a)=>{const f=C.ev[n];if(f)f(...a)};
const f=(p,i)=>p[0]*Math.pow(p[1],i), rnd=(a,b)=>a+C.rand()*(b-a), pick=a=>a[Math.floor(C.rand()*a.length)];
C.f=f;C.pick=pick;
C.fresh=()=>({gold:100,gems:300,orbs:10,tickets:0,lv:1,exp:0,si:0,maxSi:0,wave:0,stl:{atk:0,hp:0,def:0,crit:0},gear:{},bag:null,comps:{},party:[],autoSpell:true,autoBoss:true,filter:3,day:'',mp:{},mc:{},last:0,kills:0,failPow:0,failAt:0,
  bld:{vault:{lv:1,up:0,last:0,acc:0},mine:{lv:1,up:0,last:0,acc:0},tower:{lv:0,up:0}},guild:{lv:1,exp:0,dDay:'',don:{}},raid:{lv:1,dmg:0,day:'',tries:0},
  arena:{pts:1000,tickets:5,tAt:0,opps:[],week:-1,pend:null,win:0,streak:0},shop:{day:'',bought:{}},stats:{rolls:[0,0,0,0,0,0],goldEarned:0,goldSpent:{train:0,build:0,shop:0,donate:0},bossFails:0}});
let S=C.fresh();C.S=()=>S;
C.load=d=>{S=Object.assign(C.fresh(),d||{});if(!S.idleAt)S.idleAt=C.now();const fr=C.fresh();for(const k of ['bld','guild','raid','arena','shop','stats','stl'])S[k]=Object.assign(fr[k],S[k]||{});const t=C.now();if(!S.last)S.last=t;for(const b of ['vault','mine'])if(!S.bld[b].last)S.bld[b].last=t;if(!S.arena.tAt)S.arena.tAt=t;if(S.arena.week<0)S.arena.week=C.week();return S};
// ---- derived
C.stat=k=>{const s=D.STATS.find(x=>x.k==k);return s.mult?Math.pow(s.mult,S.stl[k]):Math.min(s.max||1e18,s.base+s.inc*S.stl[k])};
C.cost=s=>s.max&&C.stat(s.k)>=s.max?Infinity:Math.floor(s.cost*Math.pow(s.g,S.stl[s.k]));
const gearSum=k=>Object.values(S.gear).reduce((a,it)=>a+(it&&it.st==k?it.v*(1+.1*(it.en||0)):0),0);
C.RESET_H=5;C.today=()=>{const d=new Date(C.now()+(9-C.RESET_H)*3600e3);return d.toISOString().slice(0,10)};C.nextReset=()=>{const t=C.now(),k=t+(9-C.RESET_H)*3600e3,day=864e5;return Math.floor(k/day)*day+day-(9-C.RESET_H)*3600e3};
C.week=()=>Math.floor((C.now()+(9-C.RESET_H)*3600e3-4*86400e3)/(7*86400e3));
C.daily=()=>{const t=C.today();if(S.day!==t){S.day=t;S.mp={};S.mc={}}if(S.guild.dDay!==t){S.guild.dDay=t;S.guild.don={}}if(S.raid.day!==t){S.raid.day=t;S.raid.tries=0}if(S.shop.day!==t){S.shop.day=t;S.shop.bought={}}};
C.synergy=()=>{const c={};S.party.forEach(k=>{const f=D.COMPS.find(x=>x.k==k).fac;c[f]=(c[f]||0)+1});const out=[];for(const f in c)if(c[f]>=2)out.push({f,n:c[f],atk:f=='chaos'?.15:.10,hp:f=='light'?.10:0});return out};
C.atkPct=()=>1+C.codexB().atk+C.relicB('atk')+C.synergy().reduce((a,x)=>a+x.atk,0)+BAL.tower.pct*S.bld.tower.lv+Object.keys(S.guild.don).length*BAL.donate.buff+.02*(S.guild.lv-1);
C.ATK=()=>(12+gearSum('atk')+(S.lv-1)*BAL.lvAtk)*C.stat('atk')*C.atkPct();
C.MAXHP=()=>(120+gearSum('hp')+(S.lv-1)*BAL.lvHp)*C.stat('hp')*(1+C.codexB().hp+C.relicB('hp')+C.synergy().reduce((a,x)=>a+x.hp,0));
C.POW=()=>Math.floor(C.ATK()*10+C.MAXHP()+C.stat('def')*20+C.stat('crit')*50+S.party.reduce((a,k)=>a+C.ATK()*4*C.compMul(k),0));
C.compMul=k=>{const c=D.COMPS.find(x=>x.k==k);return c.mul*(1+.1*((S.comps[k]||1)-1))*(1+.05*(((S.clv||{})[k]||1)-1))*(1+.08*(((S.csk||{})[k]||1)-1))};
C.DEFLOAD=['fire','ice','heal','ragna','ds','giga'];C.load6=()=>{const L=(S.load&&S.load.length?S.load:C.DEFLOAD);return L.map(k=>D.SPELLS.find(x=>x.k==k)).filter(Boolean)};C.setLoad=k=>{S.load=(S.load&&S.load.length?S.load:C.DEFLOAD).slice();const i=S.load.indexOf(k);if(i>=0){if(S.load.length<=1)return false;S.load.splice(i,1)}else{if(S.load.length>=6)return false;S.load.push(k)}return true};
C.spells=()=>C.load6().filter(s=>!s.unlock||S.maxSi>=s.unlock);
C.power=()=>Math.round(C.estDPS()*1000);C.estDPS=()=>{let m=1.2;S.party.forEach(k=>{const c=D.COMPS.find(x=>x.k==k);m+=C.compMul(k)*c.spd*(c.aoe?1.6:1)*(c.healer?.6:1)});C.spells().forEach(s=>{if(s.mul)m+=s.mul/s.cd*(s.aoe?2:1)});return C.ATK()*m*(1+C.stat('crit')/100)};
C.needExp=()=>Math.floor(f(BAL.needExp,S.lv-1));
C.mobHP=i=>f(BAL.mobHP,i)*(i>=14?BAL.ch3HP:1);C.goldKill=i=>f(BAL.gold,i);C.expKill=i=>f(BAL.exp,i);
C.stageName=i=>`${Math.floor(i/7)+1}-${i%7+1}`;
C.kps=()=>Math.min(1.1,C.estDPS()/(C.mobHP(S.si)*1.05)*.75);
// ---- missions
C.mAdd=(k,n=1)=>{C.daily();S.mp[k]=(S.mp[k]||0)+n;C.weekly();S.wk.p[k]=(S.wk.p[k]||0)+n;C.bpAdd((({kill:1,boss:25,spell:1,roll:2,arena:10,donate:15,raid:20})[k]||0)*n);if(S.gj&&C.GMAP[k]){C.gWeek();const g=C.GMAP[k];S.gm.p[g]=(S.gm.p[g]||0)+n}};
C.gWeek=()=>{const w=C.week();if(!S.gm||S.gm.w!==w)S.gm={w,p:{},c:{}}};C.GMAP={kill:'gkill',donate:'gdonate',raid:'graid'};
C.GUILDS=[{n:'붉은 마도사 협회',m:'리나 팬클럽 본부'},{n:'세이룬 수호대',m:'정의를 위하여!'},{n:'혼돈의 탑',m:'마족 사냥 전문'}];
C.gJoin=i=>{S.gj={n:C.GUILDS[i].n,at:C.now()};S.gcoin=S.gcoin||0;return true};C.gLeave=()=>{S.gj=null};
C.gContrib=n=>{if((S.gcoin||0)<n)return false;S.gcoin-=n;S.guild.exp+=n*8;while(S.guild.exp>=100*S.guild.lv){S.guild.exp-=100*S.guild.lv;S.guild.lv++}C.refreshMax&&C.refreshMax();return true};
C.gClaimM=k=>{C.gWeek();const m=D.GMISS.find(x=>x.k==k);if(!m||S.gm.c[k]||(S.gm.p[k]||0)<m.goal)return 0;S.gm.c[k]=1;S.gcoin=(S.gcoin||0)+m.gcoin;S.guild.exp+=m.gcoin*4;while(S.guild.exp>=100*S.guild.lv){S.guild.exp-=100*S.guild.lv;S.guild.lv++}return m.gcoin};
C.gChest=()=>{const w=C.week();if(!S.gj||S.gchest===w)return null;S.gchest=w;const r={gems:60+S.guild.lv*20,gcoin:10+S.guild.lv*3,stone:5};S.gems+=r.gems;S.gcoin=(S.gcoin||0)+r.gcoin;S.stone=(S.stone||0)+r.stone;return r};
C.NPCN=['검은마도사','은빛기사','해파리두뇌','마족사냥꾼','방랑마술사','드래곤킬러','세이룬공주','라그나보유자'];
C.gRoster=()=>{const own=D.COMPS.filter(x=>S.comps[x.k]).map((x,i)=>({n:x.n,img:x.img,role:i<1?'부회장':'간부',pow:Math.floor(C.POW()*(.5+.1*x.g))}));const npc=C.NPCN.slice(0,6).map((n,i)=>({n,img:D.COMPS[(i*3)%D.COMPS.length].img,role:'회원',pow:Math.floor(C.POW()*(.4+((i*37)%50)/100)),npc:1}));return[{n:'리나 인버스 (나)',img:'hero_lina.png',role:'회장',pow:C.POW()},...own,...npc]};
C.REPLY=['오 좋네요 ㅎㅎ','같이 레이드 가요!','리나님 오늘도 폭파 중이시네요','기부 완료했습니다~','드래곤 슬레이브 쿨 언제 돌아요?','ㅋㅋㅋ 인정','보스 2-7 공략 아시는 분?','협회 상자 꼭 챙기세요!'];
C.gSay=t=>{t=String(t||'').trim().slice(0,80);if(!t)return null;S.gchat=S.gchat||[];S.gchat.push({who:'나',t,at:C.now()});const n=C.NPCN[Math.floor(Math.random()*C.NPCN.length)],r=C.REPLY[(S.gchat.length*3)%C.REPLY.length];S.gchat.push({who:n,t:r,at:C.now()+1});if(S.gchat.length>40)S.gchat=S.gchat.slice(-40);return r};
C.bpSeason=()=>Math.floor(C.week()/4);C.bp=()=>{const se=C.bpSeason();if(!S.bp||S.bp.se!==se)S.bp={se,xp:0,fc:{},pc:{},prem:S.bp&&S.bp.prem&&S.bp.se===se};return S.bp};
C.bpTier=()=>Math.min(D.BP.tiers,Math.floor(C.bp().xp/D.BP.xp));C.bpAdd=n=>{if(!n)return;const t0=C.bpTier();C.bp().xp+=n;const t1=C.bpTier();if(t1>t0)emit('toast','<img class=ci src=assets/ic4/ticket.png> 마도 패스 Lv.'+t1+' 달성! 보상을 받으세요')};
C.bpRew=(t,prem)=>{const c=t%5==4;if(prem)return c?{tickets:1}:t%2?{gems:40+t*4}:{stone:3+Math.floor(t/5)};return c?{gems:50+t*5}:t%2?{orbs:3}:{goldH:.5}};
C.bpClaim=(t,prem)=>{const b=C.bp();if(t>=C.bpTier())return null;const m=prem?b.pc:b.fc;if(m[t]||(prem&&!b.prem))return null;m[t]=1;const r=C.bpRew(t,prem);for(const k in r){if(k=='goldH')S.gold+=Math.floor(C.goldKill(S.maxSi)*600*r[k]);else S[k]=(S[k]||0)+r[k]}if(prem&&t==19)S.skins=Object.assign(S.skins||{},{gold:1});return r};
C.bpBuy=()=>{C.bp().prem=true;return true};
C.skinBuy=k=>{const sk=D.SKINS.find(x=>x.k==k);S.skins=S.skins||{base:1};if(!sk)return 'none';if(S.skins[k])return 'own';if(sk.bp)return 'bp';if(S.gems<sk.cost)return 'gems';S.gems-=sk.cost;S.skins[k]=1;return 'ok'};
C.skinSet=k=>{S.skins=S.skins||{base:1};S.skins.base=1;if(!S.skins[k])return false;S.skin=k;return true};
C.weekly=()=>{const w=C.week();if(!S.wk||S.wk.w!==w)S.wk={w,p:{},c:{}}};
C.claimW=k=>{C.weekly();const m=D.WMISS.find(x=>x.k==k);if(!m||S.wk.c[k]||(S.wk.p[k]||0)<m.goal)return 0;S.wk.c[k]=1;S.gems+=m.gem;if(m.tk)S.tickets=(S.tickets||0)+m.tk;return m.gem};
C.codexB=()=>{const n=D.COMPS.filter(x=>S.comps[x.k]).length,seen=Object.keys(S.seen||{}).length;let atk=0,hp=0;D.CODEX.forEach(b=>{if((b.t=='c'?n:seen)>=b.need){atk+=b.atk||0;hp+=b.hp||0}});return{n,seen,atk,hp}};
C.arenaTop=()=>{const me=S.arena.pts;const r=[];const R=C.rand?Math.random:Math.random;for(let i=0;i<10;i++){const pts=Math.round(2600-i*120);r.push({n:NAMES[i%NAMES.length]+(i>=NAMES.length?i:''),pts,party:[0,1,2,3].map(j=>D.COMPS[(i*3+j*7)%D.COMPS.length].img),pow:Math.floor(C.POW()*(2.4-i*.15))})}return r};
C.claimMission=k=>{const m=D.MISSIONS.find(x=>x.k==k);if((S.mp[k]||0)>=m.goal&&!S.mc[k]){S.mc[k]=1;S.gems+=m.gem;return m.gem}return 0};
C.addGold=g=>{S.gold+=g;S.stats.goldEarned+=g};
C.spend=(cat,g)=>{if(S.gold<g)return false;S.gold-=g;S.stats.goldSpent[cat]=(S.stats.goldSpent[cat]||0)+g;return true};
// ---- battle
const B={allies:[],enemies:[],boss:false,timer:0,cds:{},lock:0};C.B=B;
C.CAP=6;C.alive=()=>B.enemies.filter(e=>e.hp>0&&!e.res);C.reserve=()=>B.enemies.filter(e=>e.res).length;C.aliveAllies=()=>B.allies.filter(a=>!a.dead);
C.buildAllies=()=>{const old={};B.allies.forEach(a=>old[a.k]=a.hp/a.max);B.allies=[];
  B.allies.push({k:'lina',mul:1,spd:1.2,max:C.MAXHP(),t:0});
  S.party.slice(0,4).forEach(k=>{const c=D.COMPS.find(x=>x.k==k);B.allies.push({k,c,mul:C.compMul(k),spd:c.spd,max:C.MAXHP()*c.hp*(1+.1*((S.comps[k]||1)-1)),t:C.rand()})});
  B.allies.forEach(a=>{a.hp=a.max*(old[a.k]??1);a.dead=a.hp<=0});emit('allies')};
C.refreshMax=()=>B.allies.forEach(a=>{const r=a.hp/a.max;a.max=a.k=='lina'?C.MAXHP():C.MAXHP()*a.c.hp*(1+.1*((S.comps[a.k]||1)-1));a.hp=r*a.max});
const reviveAll=p=>B.allies.forEach(a=>{if(a.dead){a.dead=false;a.hp=a.max*p}else a.hp=Math.min(a.max,a.hp+a.max*p)});
C.spawn=()=>{B.enemies=[];const i=S.si,mh=C.mobHP(i),ma=f(BAL.mobATK,i);
  if(B.boss){const pl=D.BOSSPLAN[Math.floor(i/7)],b=D.BOSSES[pl[i%7==6?1:0]];const h=mh*BAL.bossHP*(i<7?.55+.45*i/7:1)*(b.s||1)*(i%7==6?BAL.chBoss:1);B.enemies.push({fac:b.fac,n:b.n,img:b.img,sc:b.sc,max:h,hp:h,atk:ma*BAL.bossATK,spd:.7,t:-.8,boss:1});B.timer=BAL.bossTime}
  else{const n=BAL.swarm[0]+Math.floor(C.rand()*(BAL.swarm[1]-BAL.swarm[0]+1)),q=3/n;for(let j=0;j<n;j++){const pool=D.FIELDMON[D.FIELDS[i%D.FIELDS.length]].map(k=>D.MONS.find(x=>x.k==k)),m=pick(pool),h=mh*m.h/100*q*BAL.swarmHP;B.enemies.push({res:j>=C.CAP?1:0,fac:m.fac,sc:m.sc,n:m.n,img:m.img,max:h,hp:h,atk:ma*q,spd:.6+C.rand()*.3,t:-.6-C.rand()*.6,j,q})}if(n>=3&&C.rand()<.45){const e=B.enemies[B.enemies.length-n+1+Math.floor(C.rand()*(Math.min(n,C.CAP)-1))];if(e&&!e.boss){e.el=1;e.max*=3.5;e.hp=e.max;e.atk*=1.6}}}
  emit('spawn')};
C.hitEnemy=(e,dmg,crit,src)=>{if(e.hp<=0)return;dmg*=C.facMul(src,e);if(e.wb){if(!B.wb)return;B.wb.dmg+=dmg;e.hp-=dmg;if(e.hp<e.max*.02){e.hp=e.max;B.wb.ph=(B.wb.ph||1)+1;emit('toast','해룡왕이 분노한다! 페이즈 '+B.wb.ph)}emit('hit',e,dmg,crit);return}e.hp-=dmg;emit('hit',e,dmg,crit);if(e.hp<=0)kill(e)};
function kill(e){const i=S.si,q=e.q||1,g=C.goldKill(i)*(e.boss?15:q)*(e.el?4:1),x=C.expKill(i)*(e.boss?10:q)*(e.el?3:1);C.addGold(g);C.gainExp(x);S.kills++;if(e.img){S.seen=S.seen||{};S.seen[e.img]=1}C.mAdd('kill');
  let o=0;if(e.el||C.rand()<BAL.orbDrop*(e.q||1))o=e.el?3:1;if(e.boss){o=BAL.bossOrbs;S.gems+=BAL.bossGems;C.mAdd('boss')}S.orbs+=o;if(C.rand()<(e.boss?1:.03))S.stone=(S.stone||0)+(e.boss?5:1);emit('kill',e,g,o);if(e.boss)bossClear()}
C.gainExp=x=>{if(!isFinite(x))return;S.exp+=x;let up=0;while(S.exp>=C.needExp()&&up<500){S.exp-=C.needExp();S.lv++;up++}if(up){C.refreshMax();emit('banner','LEVEL UP! Lv.'+S.lv)}};
function bossClear(){B.boss=false;emit('banner','스테이지 클리어!');C.lastClear=C.stageName(S.si);
  if(S.si==S.maxSi){if(S.maxSi<D.FIELDS.length-1){S.maxSi++;S.si=S.maxSi}else S.done=1}else S.si++;
  S.wave=0;S.failPow=0;B.lock=1.6;reviveAll(1);emit('clear')}
function bossFail(why){B.boss=false;S.failPow=C.POW();S.failAt=C.now();S.stats.bossFails++;emit('banner',why);emit('toast','보스 실패 · 더 강해진 뒤 자동 재도전');S.wave=0;B.lock=1.6;reviveAll(1);emit('fail')}
C.canAutoBoss=()=>S.autoBoss&&(!S.failPow||C.POW()>=S.failPow*1.08||C.now()-S.failAt>180e3);
C.startBoss=()=>{if(B.boss)return;B.boss=true;reviveAll(1);B.enemies=[];B.lock=Math.max(B.lock,1.2);emit('walk')};
C.selectStage=i=>{if(!(i>=0)||i>S.maxSi||i>=D.FIELDS.length)return;S.si=i;S.wave=0;B.boss=false;S.failPow=0;B.lock=.6;reviveAll(1);emit('spawnclear')};
const crit=()=>C.rand()*100<C.stat('crit');
function allyAttack(a){const al=C.alive();if(!al.length)return;emit('atk',a);
  if(a.c&&a.c.healer){const low=C.aliveAllies().sort((x,y)=>x.hp/x.max-y.hp/y.max)[0];if(low&&low.hp<low.max*.75){const h=low.max*.08;low.hp=Math.min(low.max,low.hp+h);emit('heal',low,h);return}}
  const tg=a.c&&a.c.aoe?al:[al[0]];tg.forEach(t=>{const c=crit();C.hitEnemy(t,C.ATK()*a.mul*rnd(.9,1.1)*(c?2:1)*(tg.length>1?.6:1),c,a)})}
function enemyAttack(e){const al=C.aliveAllies();if(!al.length)return;const t=C.rand()<.4?al[0]:pick(al);emit('eatk',e);
  let d=Math.max(1,e.atk*(1-Math.min(.6,C.stat('def')/200))*rnd(.85,1.15)),kind='';const r=C.rand();if(r<BAL.dodge){d=0;kind='miss'}else if((t.k=='gourry'||t.k=='zelgadis')&&r<BAL.dodge+BAL.parry){d=0;kind='parry'}else if(r<BAL.dodge+BAL.parry+BAL.block){d*=.4;kind='block'}t.hp-=d;emit('dmgAlly',t,d,kind);if(t.hp<=0){t.hp=0;t.dead=true;emit('allyDead',t)}}
C.castSpell=sp=>{if((B.cds[sp.k]||0)>0||B.lock>0)return false;if(!sp.heal&&!C.alive().length)return false;B.cds[sp.k]=sp.cd;C.mAdd('spell');
  if(sp.heal){C.aliveAllies().forEach(a=>{const h=a.max*sp.heal;a.hp=Math.min(a.max,a.hp+h);emit('heal',a,h)});emit('spell',sp,[]);return true}
  const tg=sp.aoe?C.alive():[C.alive()[0]];emit('spell',sp,tg);
  const hit=()=>tg.forEach(t=>{const c=crit();C.hitEnemy(t,C.ATK()*sp.mul*(c?2:1)*(sp.aoe&&!sp.ult?.7:1),c,{sp:sp.k});if(sp.slow)t.t-=1.5});
  if(C.deferHit)C.deferHit(hit,sp.ult?1250:sp.k=='ice'?620:sp.k=='fire'?640:330);else hit();return true};
C.WB={n:'심연의 해룡왕',img:'wb_hydra.png',time:30,tries:2,tiers:[['D',1],['C',3],['B',6],['A',10],['S',16],['SS',25],['SSS',40]]};
C.wbRef=()=>Math.floor(C.mobHP(S.maxSi)*BAL.bossHP*.3);
C.wbState=()=>{const t=C.today();S.wbd=S.wbd||{};if(S.wbd.day!==t){S.wbd.day=t;S.wbd.tries=0;S.wbd.today=0}return S.wbd};
C.wbTier=d=>{const r=d/C.wbRef();let ti=-1;C.WB.tiers.forEach((x,i)=>{if(r>=x[1])ti=i});return ti};
C.wbRew=ti=>{if(ti<0)return{gold:Math.floor(C.goldKill(S.maxSi)*20)};const k=ti+1;return{gems:20*k+(k>=5?40:0),gold:Math.floor(C.goldKill(S.maxSi)*60*k),stone:3*k,tickets:k>=4?k-3:0}};
C.wbStart=()=>{const w=C.wbState();if(w.tries>=C.WB.tries||B.wb||B.boss)return false;w.tries++;reviveAll(1);const h=C.wbRef()*60;B.enemies=[{wb:1,boss:true,sc:1.8,fac:'chaos',n:C.WB.n,img:C.WB.img,max:h,hp:h,atk:C.MAXHP()*.035,spd:.45,t:-1.2}];B.boss=true;B.lock=0;B.timer=C.WB.time;B.wb={t:C.WB.time,dmg:0,ph:1};emit('walk');emit('wbStart');return true};
C.wbEnd=()=>{const w=C.wbState(),d=Math.floor(B.wb.dmg),ti=C.wbTier(d),rw=C.wbRew(ti);for(const k in rw)S[k]=(S[k]||0)+rw[k];w.best=Math.max(w.best||0,d);w.today=Math.max(w.today||0,d);S.wbBest=Math.max(S.wbBest||0,d);B.wb=null;B.boss=false;B.enemies=[];B.lock=1.2;S.wave=0;reviveAll(1);C.mAdd('wboss');emit('wbEnd',{d,ti,rw})};
C.wbRank=()=>{const w=C.wbState(),seed=[...w.day].reduce((a,c)=>a*31+c.charCodeAt(0)>>>0,7),ref=C.wbRef();const NM=['드래곤슬레이브','마도왕','고블린킬러','세이룬공주','은빛검사','어둠의제로스','붉은여우','라그나블레이드','흑마법사J','폭염의리나팬'];let x=seed;const r=()=>(x=(x*1103515245+12345)>>>0)/4294967296;const L=NM.map(n=>({n,d:Math.floor(ref*(.25+Math.pow(r(),2.2)*22)),ai:1}));L.push({n:'리나 인버스 (나)',d:w.today||0,me:1});L.sort((a,b)=>b.d-a.d);return L};
C.tick=dt=>{
  if(B.lock>0){B.lock-=dt;if(B.lock<=0)C.spawn();return}
  C.spells().forEach(s=>{B.cds[s.k]=Math.max(0,(B.cds[s.k]||0)-dt)});
  B.allies.forEach(a=>{if(a.dead)return;a.t+=dt*a.spd;if(a.t>=1){a.t=0;allyAttack(a)}});
  C.alive().forEach(e=>{e.t+=dt*e.spd;if(e.t>=1){e.t=0;enemyAttack(e)}});
  if(S.autoSpell){const low=C.aliveAllies().some(a=>a.hp<a.max*.55);for(const s of C.spells()){if(s.heal&&!low)continue;if(!s.heal&&!C.alive().length)continue;if(C.castSpell(s))break}}
  if(B.wb){B.wb.t-=dt;B.timer=Math.max(0,B.wb.t);if(B.wb.t<=0||!C.aliveAllies().length)C.wbEnd();return}
  if(B.boss){B.timer-=dt;if(B.timer<=0&&C.alive().length)return bossFail('시간 초과!')}
  if(!C.aliveAllies().length){if(B.boss)return bossFail('파티 전멸!');reviveAll(1);emit('toast','파티가 쓰러졌다… 재정비');B.lock=1.2;S.wave=0;return}
  {const al=C.alive().length;if(al<C.CAP&&B.lock<=0){const nx=B.enemies.find(e=>e.res);if(nx&&(B.rT=(B.rT||0)-dt)<=0){nx.res=0;nx.rf=1;nx.t=-.9;nx.j=B.rj=(B.rj||0)+1;B.rT=.35}}}
  if(!C.alive().length&&!C.reserve()&&!B.boss){S.wave++;reviveAll(.5);B.lock=BAL.walk;emit('walk');if(S.wave>=BAL.waves&&C.canAutoBoss())C.startBoss()}
};
// ---- items
C.rollRarity=()=>{let r=C.rand()*D.RAR.reduce((a,b)=>a+b.w,0);for(let i=0;i<D.RAR.length;i++){r-=D.RAR[i].w;if(r<=0)return i}return 0};
C.genItem=()=>{const s=pick(D.SLOTS),r=C.rollRarity(),i=S.maxSi,v=(s.st=='atk'?BAL.item[0]:BAL.item[1])*D.RAR[r].m*Math.pow(BAL.item[2],i)*rnd(.85,1.15);S.stats.rolls[r]++;return{slot:s.k,r,lv:i+1,st:s.st,v:Math.round(v),name:`${pick(D.ITEMNAME[s.k])} ${s.n}`}};
C.itemPow=it=>it?Math.floor(it.st=='atk'?it.v*10*C.stat('atk')*C.atkPct():it.v*C.stat('hp')):0;
C.sellPrice=it=>Math.floor(C.goldKill(it.lv-1)*BAL.sell*(1+it.r*.8));
C.rollOnce=()=>{if(S.orbs<1)return null;S.orbs--;C.mAdd('roll');S.bag=C.genItem();return S.bag};
C.equipBag=()=>{const it=S.bag;if(!it)return;const old=S.gear[it.slot];S.gear[it.slot]=it;S.bag=null;if(old)C.addGold(C.sellPrice(old));C.refreshMax()};
C.sellBag=()=>{if(!S.bag)return 0;const g=C.sellPrice(S.bag);C.addGold(g);S.bag=null;return g};
// auto step: returns 'stop' if target found, 'empty' if no orbs
C.autoRollStep=()=>{if(S.bag){const o=S.gear[S.bag.slot];if(C.itemPow(S.bag)>C.itemPow(o)){if(S.bag.r>=S.filter)return 'stop';C.equipBag()}else C.sellBag()}if(!C.rollOnce())return 'empty';return 'ok'};
C.train=k=>{const s=D.STATS.find(x=>x.k==k),c=C.cost(s);if(!isFinite(c)||!C.spend('train',c))return false;S.stl[k]++;C.mAdd('train');C.refreshMax();return true};
C.cheapestStat=()=>D.STATS.reduce((a,b)=>C.cost(a)<=C.cost(b)?a:b);
// ---- companions
C.GW={2:72,3:25,4:3};C.PITY=80;C.RU='xellos';C.cw=c=>{const L=D.COMPS.filter(x=>x.g==c.g);if(c.g==4&&C.RU&&L.some(x=>x.k==C.RU))return C.GW[4]*(c.k==C.RU?.5:.5/(L.length-1));return C.GW[c.g]/L.length};C.gpick=()=>{let r=C.rand()*100;for(const c of D.COMPS){r-=C.cw(c);if(r<0)return c}return D.COMPS[0]};C.rates=()=>D.COMPS.map(c=>({k:c.k,n:c.n,g:c.g,p:C.cw(c),up:c.k==C.RU}));
C.summon=n=>{const c=n==10?BAL.summon10:BAL.summon;if(S.tickets>=n)S.tickets-=n;else if(S.gems>=c)S.gems-=c;else return null;S.mile=(S.mile||0)+n;const got=[];C.lastNew={};for(let i=0;i<n;i++){S.pity=(S.pity||0)+1;let k=C.gpick().k;if(S.pity>=C.PITY&&D.COMPS.find(c=>c.k==k).g<4){const L=D.COMPS.filter(c=>c.g==4&&c.k!=C.RU);k=C.RU&&C.rand()<.5?C.RU:L[Math.floor(C.rand()*L.length)].k}if(D.COMPS.find(c=>c.k==k).g>=4)S.pity=0;if(!S.comps[k])C.lastNew[k]=1;S.comps[k]=(S.comps[k]||0)+1;got.push(k);if(S.party.length<4&&!S.party.includes(k))S.party.push(k)}C.mAdd('summon',n);C.buildAllies();return got};
// ---- buildings
C.bProd=k=>{const b=S.bld[k];if(k=='vault')return b.lv*BAL.vault.rate*C.goldKill(S.maxSi)*60;if(k=='mine')return b.lv*BAL.mine.rate;return 0};// per hour? vault per minute-> convert below
C.bRate=k=>k=='vault'?S.bld.vault.lv*BAL.vault.rate*C.goldKill(S.maxSi):k=='mine'?S.bld.mine.lv*BAL.mine.rate/3600:0;// per second
C.bCost=k=>{const b=S.bld[k],p=BAL[k].cost;return Math.floor(p[0]*C.goldKill(S.maxSi)*Math.pow(p[1],b.lv))};
C.bTime=k=>Math.floor(f(BAL[k].time,S.bld[k].lv));
C.bUpdate=()=>{const t=C.now();for(const k of ['vault','mine']){const b=S.bld[k];const dt=Math.max(0,(t-b.last)/1000);b.acc=Math.min(C.bRate(k)*BAL.store,b.acc+C.bRate(k)*dt);b.last=t}
  for(const k in S.bld){const b=S.bld[k];if(b.up&&t>=b.up){b.up=0;b.lv++;emit('toast',D.BUILD.find(x=>x.k==k).n+' Lv.'+b.lv+' 완공!');if(k=='tower')C.refreshMax()}}};
C.bUpgrade=k=>{const b=S.bld[k];if(b.up)return false;if(!C.spend('build',C.bCost(k)))return false;b.up=C.now()+C.bTime(k)*1000;return true};
C.bSpeedup=k=>{const b=S.bld[k];if(!b.up)return false;const g=Math.max(1,Math.ceil((b.up-C.now())/60000)*2);if(S.gems<g)return false;S.gems-=g;b.up=C.now();C.bUpdate();return g};
C.bCollect=k=>{C.bUpdate();const b=S.bld[k];const v=Math.floor(b.acc);if(v<1)return 0;b.acc-=v;if(k=='vault')C.addGold(v);else S.orbs+=v;C.mAdd('collect');return v};
// ---- guild
C.donateCost=k=>k=='gold'?Math.floor(C.goldKill(S.maxSi)*BAL.donate.goldMul):BAL.donate.gem;
C.donate=k=>{C.daily();if(S.guild.don[k])return false;if(k=='gold'){if(!C.spend('donate',C.donateCost(k)))return false}else{if(S.gems<BAL.donate.gem)return false;S.gems-=BAL.donate.gem}
  S.guild.don[k]=1;S.guild.exp+=k=='gold'?20:40;while(S.guild.exp>=100*S.guild.lv){S.guild.exp-=100*S.guild.lv;S.guild.lv++}C.mAdd('donate');C.refreshMax();return true};
C.raidMax=()=>Math.floor(C.mobHP(S.maxSi)*BAL.bossHP*BAL.raid.mul*Math.pow(BAL.raid.g,S.raid.lv-1));
C.raidAttack=()=>{C.daily();if(S.raid.tries>=BAL.raid.tries)return null;S.raid.tries++;C.mAdd('raid');const dmg=Math.floor(C.estDPS()*BAL.raid.time*rnd(.85,1.15));S.raid.dmg+=dmg;const max=C.raidMax();let killed=false;
  const gem=10+Math.min(60,Math.floor(dmg/max*100)),orb=3;S.gems+=gem;S.orbs+=orb;let bonus=null;
  if(S.raid.dmg>=max){killed=true;S.raid.dmg=0;S.raid.lv++;S.gems+=200;S.orbs+=30;bonus={gems:200,orbs:30}}return{dmg,gem,orb,killed,bonus,pct:Math.min(1,dmg/max)}};
// ---- arena
const NAMES=['수수께끼의신관','바위피부','빛의검사','세이룬공주','검은마도사','해파리두뇌','금색마왕팬','마족사냥꾼','은빛기사','드래곤킬러','방랑마술사','라그나보유자'];
C.arenaUpdate=()=>{const a=S.arena,t=C.now();a.tAt=t;if(a.day!==C.today()){a.day=C.today();a.tickets=Math.max(a.tickets,BAL.arena.tickets)}
  const w=C.week();if(w!==a.week){if(a.week>=0&&!a.pend){const L=C.league();a.pend={league:L.n,gem:L.gem}}a.week=w;a.pts=1000+Math.max(0,Math.floor((a.pts-1000)/2))}const P=C.POW();if(!a.opps.length||!a.ref||P/a.ref>1.25||P/a.ref<.8)C.arenaRefresh()};
C.league=(p=S.arena.pts)=>{let L=D.LEAGUE[0];for(const l of D.LEAGUE)if(p>=l.pts)L=l;return L};
C.rank=(p=S.arena.pts)=>Math.max(1,Math.round(30000*Math.exp(-(p-900)/260)));
C.arenaRefresh=()=>{const P=C.POW();S.arena.ref=P;S.arena.opps=[1.3,1.05,.82].map((m,j)=>{const pw=Math.floor(P*m*rnd(.92,1.08)),pts=Math.floor(S.arena.pts+(m-1)*200*rnd(.6,1.2));const pt=[...D.COMPS].sort(()=>Math.random()-.5).slice(0,4).map(x=>x.img);return{n:pick(NAMES),img:pt[0],party:pt,pow:pw,pts,rank:C.rank(pts)}})};
C.arenaFight=j=>{C.arenaUpdate();const a=S.arena;if(a.tickets<1)return null;const o=a.opps[j];if(!o)return null;a.tickets--;C.mAdd('arena');const r=C.POW()/o.pow;const p=1/(1+Math.exp(-(r-1)*7));const win=C.rand()<p;
  const d=win?Math.round(BAL.arena.win*Math.min(2,1/r+.2)):BAL.arena.lose;a.pts=Math.max(0,a.pts+d);if(win){a.win++;a.streak++;S.gold+=0}else a.streak=0;const gem=win?5:1;S.gems+=gem;const res={win,d,gem,p,o:JSON.parse(JSON.stringify(o)),my:C.POW(),seed:Math.floor(C.rand()*1e9),at:C.now(),party:['hero_lina.png',...S.party.slice(0,3).map(k=>(D.COMPS.find(x=>x.k==k)||{}).img).filter(Boolean)]};a.log=[res,...(a.log||[])].slice(0,5);C.arenaRefresh();return res};
C.arenaClaim=()=>{const p=S.arena.pend;if(!p)return 0;S.gems+=p.gem;S.arena.pend=null;return p.gem};
// ---- shop
C.shopPrice=it=>it.p=='orbGold'?Math.floor(f(BAL.orbGold,S.maxSi)):it.p;
C.buy=k=>{C.daily();const it=D.SHOP.find(x=>x.k==k),p=C.shopPrice(it),b=S.shop.bought[k]||0;if(it.daily&&b>=it.daily)return false;
  if(it.cur=='gems'){if(S.gems<p)return false;S.gems-=p}else if(it.cur=='gold'){if(!C.spend('shop',p))return false}
  S.shop.bought[k]=b+1;const g=it.give;if(g.orbs)S.orbs+=g.orbs;if(g.tickets)S.tickets+=g.tickets;if(g.goldH)C.addGold(C.goldKill(S.maxSi)*.6*3600*g.goldH);return true};
// ---- offline
C.offlineCalc=sec=>{sec=Math.min(BAL.offCap,sec);const k=C.kps()*sec*BAL.offEff;return{sec,g:C.goldKill(S.si)*k,x:C.expKill(S.si)*k*BAL.offExp,o:Math.floor(k*BAL.orbDrop)}};
C.offline=()=>{const sec=(C.now()-(S.last||C.now()))/1000;if(sec<60)return null;const r=C.offlineCalc(sec);r.st=Math.floor(r.sec/1800);S.last=C.now();return r};C.OFF2=50;C.offApply=(r,m)=>{if(!r||r.done)return false;m=m||1;if(m>1){if((S.gems||0)<C.OFF2)return false;S.gems-=C.OFF2}r.done=1;C.addGold(r.g*m);C.gainExp(r.x*m);S.orbs+=r.o*m;S.stone=(S.stone||0)+r.st*m;return true};

// ---- v5: relics (클레어 바이블), daily dungeons, idle chest, companion level, mileage, mail
{
C.relicB=st=>{let a=0;if(!S||!S.relic)return 0;for(const r of D.RELICS)if(r.st==st)a+=(S.relic[r.k]||0)*r.per;return a};
C.relicCost=k=>{const lv=(S.relic||{})[k]||0;return{f:4+lv*3,g:Math.floor(500*Math.pow(1.7,lv))}};
C.relicUp=k=>{S.relic=S.relic||{};const c=C.relicCost(k);if((S.frag||0)<c.f||S.gold<c.g)return false;S.frag-=c.f;S.gold-=c.g;S.relic[k]=(S.relic[k]||0)+1;C.buildAllies&&C.buildAllies();return true};
C.dunDaily=()=>{S.dun=S.dun||{};if(S.dun.day!==C.today()){S.dun.day=C.today();S.dun.t={gold:2,exp:2,frag:2}}return S.dun};
C.dunRun=k=>{const d=C.dunDaily();if(!(d.t[k]>0))return null;d.t[k]--;const i=S.maxSi;let r={};if(k=='gold'){r.g=C.goldKill(i)*120;C.addGold(r.g)}if(k=='exp'){r.x=C.expKill(i)*100;C.gainExp(r.x)}if(k=='frag'){r.f=3+Math.floor(i/3);S.frag=(S.frag||0)+r.f}return r};
C.idleSec=()=>Math.min(BAL.offCap,(C.now()-(S.idleAt||C.now()))/1000);
C.idleClaim=()=>{const sec=C.idleSec();if(sec<60)return null;const r=C.offlineCalc(sec);r.g*=.5;r.x*=.5;r.o=Math.floor(r.o*.5);C.addGold(r.g);C.gainExp(r.x);S.orbs+=r.o;r.st=Math.floor(sec/900);S.stone=(S.stone||0)+r.st;S.idleAt=C.now();return r};
C.compUpCost=k=>Math.floor(300*Math.pow(1.45,((S.clv||{})[k]||1)-1));
C.compUp=k=>{S.clv=S.clv||{};if(!S.comps[k])return false;const c=C.compUpCost(k);if(S.gold<c)return false;S.gold-=c;S.clv[k]=(S.clv[k]||1)+1;C.buildAllies();return true};
C.mileSummon=k=>{if((S.mile||0)<100)return false;S.mile-=100;S.comps[k]=(S.comps[k]||0)+1;C.buildAllies();return true};
C.mailClaim=(k)=>{S.mailc=S.mailc||{};let n=0;const r={g:0,o:0,t:0};for(const m of D.MAILS)if(!S.mailc[m.k]&&(k==null||m.k==k)){S.mailc[m.k]=1;S.gems+=m.g||0;S.orbs+=m.o||0;S.tickets+=m.t||0;r.g+=m.g||0;r.o+=m.o||0;r.t+=m.t||0;n++}r.n=n;return r};
}
C.allyFac=a=>a&&a.c?a.c.fac:((C.synergy()[0]||{}).f||'none');
C.facMul=(a,e)=>{if(!e||!e.fac)return 1;const f=C.allyFac(a);return D.COUNTER[f]==e.fac?BAL.facAdv:D.COUNTER[e.fac]==f?BAL.facDis:1};
C.partyFacMul=e=>{const al=C.B.allies||[];if(!al.length)return 1;return al.reduce((x,a)=>x+C.facMul(a,e),0)/al.length};
C.expState=()=>{S.expd=S.expd||{};return S.expd};
C.expBusy=k=>Object.values(C.expState()).some(x=>x.c==k);
C.expSend=(ek,ck)=>{const st=C.expState(),E=D.EXPS.find(x=>x.k==ek);if(st[ek]||!S.comps[ck]||C.expBusy(ck))return false;st[ek]={c:ck,end:C.now()+E.min*60e3};return true};
C.expReward=ek=>{const E=D.EXPS.find(x=>x.k==ek),m=1+S.maxSi*.35,st=C.expState()[ek];const star=st?(S.comps[st.c]||1):1;return{g:Math.floor(C.goldKill(S.maxSi)*E.g*.25*(1+.1*(star-1))),gem:E.gem,f:Math.floor(E.f*m*.5)+E.f}};
C.expClaim=ek=>{const st=C.expState(),x=st[ek];if(!x||C.now()<x.end)return null;const r=C.expReward(ek);C.addGold(r.g);S.gems+=r.gem;S.frag=(S.frag||0)+r.f;delete st[ek];return r};
C.init=d=>{C.load(d);C.daily();C.bUpdate();C.arenaUpdate();C.buildAllies();C.spawn();return S};
if(typeof module!=='undefined')module.exports=C;
// ---- enhance (anvil)
C.enCost=it=>{const n=it.en||0;return{g:Math.floor(200*Math.pow(1.4,n)*(1+it.lv*.15)),st:1+Math.floor(n/2)}};
C.enRate=it=>{const n=it.en||0;return n<5?1:Math.max(.3,1-(n-4)*.1)};
C.enhance=slot=>{const it=S.gear[slot];if(!it||(it.en||0)>=15)return 'max';const c=C.enCost(it);if(S.gold<c.g)return 'gold';if((S.stone||0)<c.st)return 'stone';S.gold-=c.g;S.stone-=c.st;if(C.rand()<C.enRate(it)){it.en=(it.en||0)+1;C.refreshMax();return 'ok'}return 'fail'};
C.skCost=k=>{const n=(S.csk||{})[k]||1;return{g:Math.floor(500*Math.pow(1.6,n-1)),st:2*n}};
C.skUp=k=>{S.csk=S.csk||{};if(!S.comps[k])return 'none';const n=S.csk[k]||1;if(n>=10)return 'max';const c=C.skCost(k);if(S.gold<c.g)return 'gold';if((S.stone||0)<c.st)return 'stone';S.gold-=c.g;S.stone-=c.st;S.csk[k]=n+1;C.buildAllies();return 'ok'};
// ---- v9: daily dungeons with tiers + sweep
C.DUN={keys:['gold','exp','stone','frag'],tries:2,tiers:[{n:'초급',req:300,si:3,m:1},{n:'중급',req:1000,si:10,m:1.7},{n:'상급',req:2600,si:17,m:2.8},{n:'영웅',req:6000,si:24,m:4.5},{n:'전설',req:13000,si:31,m:7}]};
C.dunDaily=()=>{S.dun=S.dun||{};if(!S.dun.clr)S.dun.clr={};if(S.dun.day!==C.today()||!S.dun.t||S.dun.t.stone==null){S.dun.day=C.today();S.dun.t={gold:2,exp:2,stone:2,frag:2}}return S.dun};
C.dunRew=(k,t)=>{const m=Math.pow(2.5,t),i=Math.max(0,S.maxSi||0),r={};if(k=='gold')r.g=C.goldKill(i)*60*m;if(k=='exp')r.x=C.expKill(i)*50*m;if(k=='stone')r.st=Math.round(3*Math.pow(1.8,t)+i/7);if(k=='frag')r.f=Math.round(2*Math.pow(1.8,t));return r};
C.dunGive=r=>{if(r.g)C.addGold(r.g);if(r.x)C.gainExp(r.x);if(r.st)S.stone=(S.stone||0)+r.st;if(r.f)S.frag=(S.frag||0)+r.f};
C.dunCleared=(k,t)=>(C.dunDaily().clr[k]||0)>t;
C.dunTry=(k,t)=>{const d=C.dunDaily();if(!(d.t[k]>0))return{err:'tries'};const T=C.DUN.tiers[t];if(t>0&&!C.dunCleared(k,t-1))return{err:'lock'};if(C.POW()<T.req)return{fail:1};d.t[k]--;const first=!C.dunCleared(k,t);d.clr[k]=Math.max(d.clr[k]||0,t+1);const r=C.dunRew(k,t);if(first)r.gem=50;if(r.gem)S.gems+=r.gem;C.dunGive(r);r.first=first;return r};
C.dunSweep=(k,t)=>{const d=C.dunDaily();if(!C.dunCleared(k,t))return{err:'lock'};if(!(d.t[k]>0))return{err:'tries'};d.t[k]--;const r=C.dunRew(k,t);C.dunGive(r);return r};
C.dunRun=k=>{const d=C.dunDaily(),t=(d.clr[k]||0)-1;return t>=0?C.dunSweep(k,t):null};
// ---- v10: daily deals (일일 특가)
C.DEALS=[{k:'d_orb',n:'마정구 ×20',img:'it3_gempouch.png',give:{orbs:20},p:200,cur:'gems'},{k:'d_stone',n:'강화석 ×15',img:'it2_stone.png',give:{stone:15},p:150,cur:'gems'},{k:'d_tk',n:'동료 소환권',img:'it2_ticket.png',give:{tickets:1},p:270,cur:'gems'},{k:'d_gold',n:'골드 상자 (4시간분)',img:'it2_gold.png',give:{goldH:4},p:240,cur:'gems'},{k:'d_pot',n:'회복 물약 ×5',img:'it2_hp.png',give:{pot:5},p:'g1',cur:'gold'},{k:'d_mp',n:'마나 물약 ×5',img:'it2_mp.png',give:{mpot:5},p:'g1',cur:'gold'},{k:'d_st2',n:'강화석 ×5',img:'it2_stone.png',give:{stone:5},p:'g2',cur:'gold'},{k:'d_key',n:'던전 열쇠',img:'it3_dungeonkey.png',give:{dkey:1},p:80,cur:'gems'},{k:'d_gem',n:'보석 ×30',img:'it2_gem.png',give:{gems:30},p:'g3',cur:'gold'}];
C.DEAL_REF=30;C.DEAL_REFMAX=3;C.DOFF=[.2,.3,.5,.7];
C.dealGen=()=>{const pool=C.DEALS.slice(),out=[];while(out.length<6&&pool.length){const it=pool.splice(Math.floor(C.rand()*pool.length),1)[0];const off=C.DOFF[Math.floor(C.rand()*C.DOFF.length)];out.push({k:it.k,off,b:0})}return out};
C.deals=()=>{const d=S.deal;if(!d||d.day!==C.today()){S.deal={day:C.today(),it:C.dealGen(),ref:0}}return S.deal};
C.dealBase=it=>{const gk=C.goldKill(S.maxSi||0);return it.p=='g1'?Math.floor(gk*40):it.p=='g2'?Math.floor(gk*120):it.p=='g3'?Math.floor(gk*300):it.p};
C.dealPrice=x=>{const it=C.DEALS.find(d=>d.k==x.k);return Math.max(1,Math.floor(C.dealBase(it)*(1-x.off)))};
C.dealBuy=i=>{const d=C.deals(),x=d.it[i];if(!x||x.b)return 'sold';const it=C.DEALS.find(z=>z.k==x.k),p=C.dealPrice(x);if(it.cur=='gems'){if(S.gems<p)return 'gems';S.gems-=p}else{if(S.gold<p)return 'gold';S.gold-=p}x.b=1;const g=it.give,r={};for(const k in g){if(k=='goldH'){r.gold=C.goldKill(S.maxSi)*.6*3600*g[k];C.addGold(r.gold)}else{S[k]=(S[k]||0)+g[k];r[k]=g[k]}}return r};
C.dealRefresh=()=>{const d=C.deals();if(d.ref>=C.DEAL_REFMAX)return 'max';if(S.gems<C.DEAL_REF)return 'gems';S.gems-=C.DEAL_REF;d.ref++;d.it=C.dealGen();return true};
// ---- v13: 승급/각성 (duplicate shards)
C.STARMAX=6;C.AWMAX=3;C.SHV={2:5,3:10,4:20};
C.starCost=k=>10*(S.comps[k]||1);C.awCost=k=>{const a=(S.caw||{})[k]||0;return{sh:60+a*40,g:Math.floor(5000*Math.pow(3,a))}};
{const os=C.summon;C.summon=n=>{const pre=Object.assign({},S.comps);const got=os(n);if(!got)return got;S.csh=S.csh||{};C.lastDup={};for(const k of new Set(got)){const base=pre[k]||1,dup=(S.comps[k]||0)-(pre[k]?pre[k]:1);if(dup>0){const v=dup*(C.SHV[D.COMPS.find(x=>x.k==k).g]||5);S.csh[k]=(S.csh[k]||0)+v;C.lastDup[k]=v;S.comps[k]=base}}C.buildAllies();return got}}
{const om=C.compMul;C.compMul=k=>om(k)*(1+.15*((S.caw||{})[k]||0))}
C.starUp=k=>{if(!S.comps[k])return 'none';if(S.comps[k]>=C.STARMAX)return 'max';const c=C.starCost(k);S.csh=S.csh||{};if((S.csh[k]||0)<c)return 'sh';S.csh[k]-=c;S.comps[k]++;C.buildAllies();return 'ok'};
C.awake=k=>{S.caw=S.caw||{};if(!S.comps[k])return 'none';if(S.comps[k]<C.STARMAX)return 'star';const a=S.caw[k]||0;if(a>=C.AWMAX)return 'max';const c=C.awCost(k);S.csh=S.csh||{};if((S.csh[k]||0)<c.sh)return 'sh';if(S.gold<c.g)return 'gold';S.csh[k]-=c.sh;S.gold-=c.g;S.caw[k]=a+1;C.buildAllies();return 'ok'};
C.starRed=()=>D.COMPS.some(x=>S.comps[x.k]&&((S.comps[x.k]<C.STARMAX&&((S.csh||{})[x.k]||0)>=C.starCost(x.k))||(S.comps[x.k]>=C.STARMAX&&((S.caw||{})[x.k]||0)<C.AWMAX&&((S.csh||{})[x.k]||0)>=C.awCost(x.k).sh&&S.gold>=C.awCost(x.k).g)));
{const om=C.mileSummon;C.mileSummon=k=>{const had=S.comps[k];if(!had)return om(k);if((S.mile||0)<100)return false;S.mile-=100;S.csh=S.csh||{};const v=C.SHV[D.COMPS.find(x=>x.k==k).g]||5;S.csh[k]=(S.csh[k]||0)+v;C.lastDup={[k]:v};C.buildAllies();return true}}
// ---- v16: status effects (burn/freeze/stun/poison)
C.STS={burn:{n:'화상',t:3,dot:.3},frz:{n:'빙결',t:2},stun:{n:'기절',t:1.2},psn:{n:'중독',t:5,dot:.18}};
C.STSRC={sp:{fire:['burn',1],ragna:['burn',1],giga:['burn',1],ds:['burn',.6],ice:['frz',1],bolt:['stun',.35],poison:['psn',1],charm:['stun',.6]},ally:{lyra:['stun',.15],pip:['psn',.4],xellos:['stun',.12],zelgadis:['frz',.15],rhea:['burn',.25],kaede:['stun',.2],gourry:['stun',.08],borin:['stun',.12],sera:['burn',.1]}};
C.stApply=(e,k,dur)=>{if(!e||e.hp<=0||e.wb&&k!='burn'&&k!='psn')return;const D0=C.STS[k];e.st=e.st||{};const b=e.boss?.5:1;const t=(dur||D0.t)*b;const cur=e.st[k];e.st[k]={t:Math.max(cur?cur.t:0,t),dps:D0.dot?C.ATK()*D0.dot:0};emit('status',e,k)};
{const oh=C.hitEnemy;C.hitEnemy=(e,dmg,crit,src)=>{const alive=e&&e.hp>0;if(e&&e.st&&e.st.frz&&!(src&&src.dot))dmg*=1.25;oh(e,dmg,crit,src&&src.dot?undefined:src&&src.sp?undefined:src);if(!alive||!e||e.hp<=0||!src||src.dot)return;let m=null;if(src.sp)m=C.STSRC.sp[src.sp];else if(src.k)m=C.STSRC.ally[src.k];if(m&&C.rand()<m[1]*(crit?1.5:1))C.stApply(e,m[0])}}
{const ot=C.tick;C.tick=dt=>{const L=C.alive?C.alive():[];const lock=[];L.forEach(e=>{if(e.st&&(e.st.frz||e.st.stun)){lock.push([e,e.spd]);e.spd=0}});try{ot(dt)}finally{lock.forEach(([e,v])=>{e.spd=v})}
 if(B.lock>0)return;(C.alive?C.alive():[]).forEach(e=>{if(!e.st)return;for(const k in e.st){const s=e.st[k];s.t-=dt;if(s.dps){s.acc=(s.acc||0)+dt;if(s.acc>=.5){s.acc-=.5;if(e.hp>0){C._dot=k;C.hitEnemy(e,s.dps*.5,false,{dot:k});C._dot=null}}}if(s.t<=0)delete e.st[k]}})}}
// ---- v17: boss break (그로기) gauge
C.BRK={need:.35,dur:3.5,mul:1.5};
{const oh=C.hitEnemy;C.hitEnemy=(e,dmg,crit,src)=>{if(e&&e.boss&&!e.wb&&e.hp>0){if(e.grog>0)dmg*=C.BRK.mul;else{e.brk=(e.brk||0)+dmg/(e.max*C.BRK.need)*(crit?1.6:1)*(src&&src.dot?.5:1);if(e.brk>=1){e.brk=0;e.grog=C.BRK.dur;e.st=e.st||{};e.st.stun={t:C.BRK.dur,dps:0};emit('grog',e)}}}oh(e,dmg,crit,src)}}
{const os=C.stApply;C.stApply=(e,k,d)=>{os(e,k,d);if(e&&e.boss&&!e.wb&&!(e.grog>0)){e.brk=Math.min(.99,(e.brk||0)+.08)}}}
{const ot=C.tick;C.tick=dt=>{ot(dt);(C.alive?C.alive():[]).forEach(e=>{if(e.grog>0){e.grog-=dt;if(e.grog<=0){e.grog=0;emit('grogEnd',e)}}})}}
// ---- v18: boss telegraphed AoE (danger zone, allies dodge)
C.TELE={first:4.5,cd:7.5,wind:1.4,mul:2.6};
{const ot=C.tick;C.tick=dt=>{const bo=(C.alive?C.alive():[]).find(e=>e.boss);const tl=B.tele;let hold=null;if(tl&&tl.e.hp>0){hold=[tl.e,tl.e.spd];tl.e.spd=0}try{ot(dt)}finally{if(hold)hold[0].spd=hold[1]}
 if(B.lock>0||!bo){if(B.tele){B.tele=null;emit('teleCancel')}return}
 const stunned=bo.st&&(bo.st.stun||bo.st.frz);
 if(B.tele){const t=B.tele;if(t.e!==bo||stunned){B.tele=null;emit('teleCancel',bo,1);return}t.t-=dt;if(t.t<=0){B.tele=null;const res=[];C.aliveAllies().forEach(a=>{const ch=.45+(a.spd>1.3?.2:0)+(a.k=='lina'?.1:0);if(C.rand()<ch){res.push([a,0]);return}const d=Math.max(1,bo.atk*C.TELE.mul*(1-Math.min(.6,C.stat('def')/200)));a.hp-=d;res.push([a,d]);emit('dmgAlly',a,d,'');if(a.hp<=0){a.hp=0;a.dead=true;emit('allyDead',a)}});emit('teleHit',bo,res)}return}
 if(bo.tcd==null)bo.tcd=C.TELE.first;if(!stunned)bo.tcd-=dt;if(bo.tcd<=0){bo.tcd=C.TELE.cd;B.tele={e:bo,t:C.TELE.wind,T:C.TELE.wind};emit('tele',bo)}}}
})(typeof window!=='undefined'?window:globalThis);

