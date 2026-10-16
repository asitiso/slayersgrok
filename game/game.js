'use strict';
const C=CORE,D=C.D,A=D.A,R=RENDER,BAL=D.BAL;
const $=s=>document.querySelector(s),fmt=R.fmt;
const KEY='slayers_save_v2';
let saved=null;try{saved=JSON.parse(localStorage.getItem(KEY))}catch(e){}
const S=C.init(saved);const B=C.B;setTimeout(()=>{const e=document.querySelector("#cGold"),c=document.querySelector("#cv");if(e&&c){const a=e.getBoundingClientRect(),b=c.getBoundingClientRect();RENDER.goldXY={x:a.left-b.left+8,y:a.top-b.top+a.height/2}}},500);RENDER.onCoin=()=>{const e=document.querySelector("#cGold");if(!e)return;e.classList.remove("cpop");void e.offsetWidth;e.classList.add("cpop")};{const sk=(DATA.SKINS||[]).find(x=>x.k==S.skin);RENDER.applyCskin(S.cskin);RENDER.skinImg=sk&&sk.k!="base"?sk.img:null;RENDER.skinAtk=sk&&sk.atk||null;RENDER.skinCast=sk&&sk.cast||null;[sk&&sk.atk,sk&&sk.cast].forEach(x=>x&&load(x));load&&load(sk?sk.img:"hero_lina.png")}
const G={C,S:()=>C.S(),speed:1,tab:'battle',screen:null};window.G=G;
const tfmt=s=>{s=Math.max(0,Math.ceil(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(x).padStart(2,'0')}`:`${m}:${String(x).padStart(2,'0')}`};
function toast(t){let q=$('#toastQ');if(!q){q=document.createElement('div');q.id='toastQ';$('#app').appendChild(q)}const old=[...q.children].find(x=>x.innerHTML==t);if(old)old.remove();while(q.children.length>=3)q.firstChild.remove();const d=document.createElement('div');d.className='toast';d.innerHTML=t;q.appendChild(d);setTimeout(()=>d.remove(),1800)}
function banner(t){if(/^LEVEL UP/.test(t)&&R.lvup)R.lvup();if(document.querySelector('.vic:not(.out)'))return;const d=document.createElement('div');d.className='banner';d.textContent=t;d.style.top=(150+(banN++%3)*44)+'px';setTimeout(()=>banN=Math.max(0,banN-1),1600);$('#battle').appendChild(d);setTimeout(()=>d.remove(),1600)}let banN=0;
function modal(html,cb){const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class=card>${html}<span class="btn wide" style="margin-top:12px">확인</span></div>`;m.onclick=e=>{if(e.target.closest('.btn')||e.target==m){m.remove();cb&&cb()}};$('#app').appendChild(m);return m}
// core events -> renderer/UI
Object.assign(C.ev,{hit:R.hit,kill:(e,...a)=>{R.kill(e,...a);if(e&&e.boss){R.hs=Math.max(R.hs||0,.6);if(!R.opt||R.opt.fx){const f=document.createElement('div');f.className='bkflash';document.body.appendChild(f);setTimeout(()=>f.remove(),700)}}},atk:R.atk,eatk:R.atk,dmgAlly:R.dmgAlly,heal:R.heal,spell:R.spell,walk:R.walk,banner,toast,clear:()=>{renderPanel();resultPop(1)},fail:()=>{renderPanel();resultPop(0)}});
C.deferHit=R.deferHit;
// ---------- HUD
function updateHud(){const s=C.S();
  $('#hName').textContent='Lv.'+s.lv;{const pw=C.POW();$('#hPow').textContent=fmt(pw);if(G._pw&&pw>G._pw*1.001){const d=document.createElement('div');d.className='powup';d.innerHTML='전투력 <b>+'+fmt(pw-G._pw)+'</b> ▲';document.body.appendChild(d);setTimeout(()=>d.remove(),1600)}G._pw=pw}$('#cGold').textContent=fmt(s.gold);$('#cGem').textContent=fmt(s.gems);renderPartyCol();
  $('#stName').textContent='[일반] '+C.stageName(s.si)+'  '+D.CH[Math.floor(s.si/7)];const nr=$('#navroll');if(nr&&nr.childNodes[1])nr.querySelector('.cnt').textContent=fmt(s.orbs);if(G.lastSi!==s.si){if(G.lastSi!==undefined){const nc=Math.floor(s.si/7);if(nc!==Math.floor(G.lastSi/7))chapterCard(nc,s.si);else banner(C.stageName(s.si)+' · '+D.CH[nc])}G.lastSi=s.si}{const sec=C.idleSec(),ib=$('#idleT');if(ib)ib.textContent=Math.floor(sec/3600)+'h '+String(Math.floor(sec%3600/60)).padStart(2,'0')+'m';{const bt=$('#idleBtn');if(bt){bt.classList.toggle('ready',sec>=600);bt.classList.toggle('full',sec>=8*3600)}}}{const e=C.B.enemies.find(x=>x.hp>0),fm=e?C.partyFacMul(e):1,ft=$('#facTag');if(ft){ft.textContent=fm>1.02?'상성 우세 ▲':fm<.98?'상성 열세 ▼':'상성 보통';ft.className='factag '+(fm>1.02?'up':fm<.98?'down':'')}}$('#xpBar').style.width=Math.min(100,s.exp/C.needExp()*100)+'%';
  const bb=$('#bossBtn');const can=s.wave>=BAL.waves&&!B.boss;bb.classList.toggle('off',!can);bb.classList.toggle('fight',!!B.boss);$('#autoBoss').textContent='자동 '+(s.autoBoss?'ON':'OFF');$('#autoBoss').classList.toggle('on',!!s.autoBoss);
  const m=D.MISSIONS.find(x=>(s.mp[x.k]||0)>=x.goal&&!s.mc[x.k])||D.MISSIONS.find(x=>(s.mp[x.k]||0)<x.goal);const ms=$('#mission');
  if(m){const v=Math.min(m.goal,s.mp[m.k]||0),done=v>=m.goal;const key=m.k+v+done;ms.classList.toggle('ready',done);if(ms.dataset.key!==key){ms.dataset.key=key;ms.dataset.m=m.k;ms.innerHTML=`<div class="morb ${done?'done':''}"><img src="${A}sk/ice.png"><small><img class=ci src=assets/it2_gem.png>${m.gem}</small></div><div class=f><span class=mq>[지령 ${D.MISSIONS.indexOf(m)+1}]</span> ${m.n} <span class=${done?'up':''}>(${v}/${m.goal})</span>${done?' <b class=up>완료! 탭하여 수령</b>':''}</div>`}}else{ms.innerHTML=`<div class=morb><img src="${A}sk/heal.png"></div><div class=f>오늘의 지령 모두 완료!</div>`;ms.dataset.m=''}
  const bar=$('#stBar');if(B.boss&&B.enemies[0]){const e=B.enemies[0];{const L=10,PAL=['#ff4a3a','#ff9a2a','#ffd84a','#6ee05a','#3ac8ff','#7a6bff','#d36bff','#ff6bb5','#ff4a3a','#ff9a2a'],f=Math.max(0,e.hp/e.max)*L,li=Math.max(0,Math.ceil(f)-1),w=f<=0?0:(f-li)*100;bar.style.width=w+'%';bar.style.setProperty('background',`linear-gradient(${PAL[li]},${PAL[li]}bb)`,'important');if(li>0)bar.parentElement.style.setProperty('background',PAL[li-1]+'aa','important');else bar.parentElement.style.removeProperty('background');$('#stInfo').textContent=B.timer.toFixed(2)+'초';let hx=$('#hpx');if(!hx){hx=document.createElement('em');hx.id='hpx';bar.parentElement.appendChild(hx)}hx.style.display='';hx.textContent='×'+(li+1)}$('#tBar').style.width=Math.max(0,B.timer/BAL.bossTime*100)+'%'}
  else if(B.boss){bar.style.width='100%';bar.style.background='linear-gradient(90deg,#8e1a1a,#ff4a3a)';$('#stInfo').textContent='보스 등장!'}
  else{bar.parentElement.style.removeProperty('background');bar.style.removeProperty('background');{const hx=$('#hpx');if(hx)hx.style.display='none'}$('#tBar').style.width='100%';bar.style.width=Math.min(100,s.wave/BAL.waves*100)+'%';bar.style.background='';$('#stInfo').textContent=s.wave>=BAL.waves?(C.canAutoBoss()?'보스 도전!':'보스 재도전 대기'):`웨이브 ${Math.min(s.wave+1,BAL.waves)}/${BAL.waves} · 적 ${C.alive().length+C.reserve()}`}
  document.querySelectorAll('.sk').forEach(el=>{const sp=D.SPELLS.find(x=>x.k==el.dataset.k);if(el.classList.contains('lock'))return;const c=B.cds[sp.k]||0;el.querySelector('.cd').style.height=(c/sp.cd*100)+'%';el.querySelector('.t').textContent=c>0?Math.ceil(c):'';el.classList.toggle('ready',c<=0)});
  C.daily();const md=D.MISSIONS.some(m=>(s.mp[m.k]||0)>=m.goal&&!s.mc[m.k]);const n=$('#sidemission .dot');if(n)n.style.display=md?'':'none';
  C.bUpdate();const bd=['vault','mine'].some(k=>s.bld[k].acc>=C.bRate(k)*BAL.store*.5);const hb=$('#sidebase .dot');if(hb)hb.style.display=bd?'':'none';
  const ad=s.arena.tickets>0||s.arena.pend;const ha=$('#sidearena .dot');if(ha)ha.style.display=ad?'':'none';
  const gd=s.raid.tries<BAL.raid.tries||Object.keys(s.guild.don).length<2||!!(G.gRed&&G.gRed());const hg=$('#sideguild .dot');if(hg)hg.style.display=gd?'':'none';
  {const dd=(sel,on)=>document.querySelectorAll(sel).forEach(n=>n.style.display=on?'':'none');const ev=(s.att?.last!==C.today())&&((s.att?.n||0)<28),ml=D.MAILS.some(m=>!(s.mailc||{})[m.k]),sm=(s.tickets||0)>0||s.gems>=BAL.summon;dd('#sideevent .dot',ev);dd('#sidemail .dot',ml);dd('#navsummon .dot',sm);dd('#navtrain .dot',md);const BD={event:ev,mail:ml,summon:sm,mission:md,train:md,base:bd,arena:ad,guild:gd,dungeon:Object.values(C.dunDaily().t||{}).some(v=>v>0)||!!(C.brRed&&C.brRed()),explore:Object.values(C.expState()).some(x=>x&&C.now()>=x.end),enhance:Object.values(s.gear||{}).some(it=>{if(!it||(it.en||0)>=15)return false;const c=C.enCost(it);return s.gold>=c.g&&(s.stone||0)>=c.st}),wboss:!!(C.wbState&&C.wbState().tries<C.WB.tries),ach:!!(C.achList&&C.achList().some(a=>a.can)),pass:(()=>{const b=C.bp(),T=C.bpTier();for(let t=0;t<T;t++)if(!b.fc[t]||(b.prem&&!b.pc[t]))return true;return false})()};BD.menu=MENU.some(m=>BD[m[0]]);G.BD=BD;document.querySelectorAll('#mgrid a').forEach(x=>{let d=x.querySelector('.dot');if(!d){d=document.createElement('span');d.className='dot';x.appendChild(d)}const k=x.dataset.s;d.style.display=BD[k]?'':'none'});for(const k in BD){if(k=='menu'||k=='mission'||k=='base'||k=='arena'||k=='guild'||k=='event'||k=='mail')continue;dd('#side'+k+' .dot',BD[k])}dd('#sidemenu .dot',BD.menu)}
}
let lockedSig='';
function renderSkills(){const s=C.S();lockedSig=JSON.stringify(C.spells().map(x=>x.k));
setTimeout(()=>{const k=$('#skills');k&&k.classList.toggle('sw',k.scrollWidth>k.clientWidth+4)},50);
  $('#skills').innerHTML=C.load6().map(sp=>{const lk=sp.unlock&&s.maxSi<sp.unlock;return `<div class="sk ${lk?'lock':''} ${sp.k=='ds'?'big':''}" data-k=${sp.k}><img src="${A}${sp.img}"><div class=cd></div><div class=t>${lk?'🔒':''}</div></div>`}).join('')+`<div class="tgl ${s.autoSpell?'on':''}" id=autoSp><img src=assets/ic2_auto.png style="width:100%;height:100%;object-fit:contain"></div>`;
  $('#autoSp').onclick=()=>{s.autoSpell=!s.autoSpell;renderSkills()};
  document.querySelectorAll('.sk').forEach(el=>el.onclick=()=>{const sp=D.SPELLS.find(x=>x.k==el.dataset.k);if(sp.unlock&&s.maxSi<sp.unlock)return toast(`${C.stageName(sp.unlock)} 도달 시 해금`);C.castSpell(sp)})}
const SIDEL=[['event','출석','ic3_calendar.png'],['shop','패키지','ic3_shop.png'],['mail','우편','ic3_mail.png'],['explore','탐험','ic3_map.png']];
const SIDER=[['train','성장','ic3_train.png'],['menu','메뉴',''],['gear','장비','ic3_bag.png'],['mission','임무','ic3_quest.png'],['relic','기보','ic3_relic.png'],['speed','배속','ic3_speed.png']];
const SIDER2=[['enhance','강화','ic3_anvil.png'],['guild','협회','ic3_guild.png'],['arena','투기장','ic3_arena.png'],['dungeon','도전','ic4/gate.png']];
const MENU=[['mail','우편함','ic3_mail.png'],['event','출석','ic3_calendar.png'],['map','지도','ic3_map.png'],['base','영지','ic3_castle.png'],['guild','협회','ic3_guild.png'],['arena','투기장','ic3_arena.png'],['dungeon','도전','ic4/gate.png'],['relic','기보','ic3_relic.png'],['explore','탐험','ic3_map.png'],['summon','소환','ic3_summon.png'],['party','편성','ic3_party.png'],['enhance','강화','ic3_anvil.png'],['bag','가방','ic3_bag.png'],['codex','도감','ic3_relic.png'],['ach','업적','ic3_trophy.png'],['wboss','월드보스','ic4/skull.png'],['tower','무한의 탑','ic4/crown.png'],['star','승급','ic_starup.png'],['pet','펫','pet/slime.png'],['rank','랭킹','ic3_podium.png'],['pass','패스','ic4/ticket.png'],['skin','코스튬','skin/lina_summer.png'],['settings','설정','ic3_settings.png']];
let pcSig='';function renderPartyCol(){const B=C.B;const sig=B.allies.map(a=>a.k).join();const el=$('#partycol');if(sig!==pcSig){pcSig=sig;el.innerHTML=B.allies.map((a,i)=>`<div class="pp ${i==0?'lead':''}"><img src="${A}${a.c?a.c.img:'hero_lina.png'}"><div class=hpb><i></i></div></div>`).join('')}
  el.querySelectorAll('.hpb i').forEach((h,i)=>{const a=B.allies[i];if(a)h.style.width=Math.max(0,a.hp/a.max*100)+'%'})}
function compDetail(k){const s=C.S(),c=D.COMPS.find(x=>x.k==k),F=D.FACTIONS[c.fac],R2=D.RAR[c.g],lv=(s.clv||{})[k]||1,cost=C.compUpCost(k);
  const m=modal(`<div class=cdet><div class=cdimg style="--rc:${R2.c}"><img src="${A}${c.img}"><span class=fac style="color:${F.c};border-color:${F.c};position:absolute;left:6px;top:6px;background:#000a">${F.n}</span></div>
  <div class=ttl style="justify-content:center;font-size:19px">${c.n} <span class=fac style="color:${R2.c};border-color:${R2.c};margin-left:6px">${R2.n}</span></div><div class=stars style="text-align:center;font-size:16px">${'★'.repeat(Math.min(5,s.comps[k]))}${'☆'.repeat(Math.max(0,5-s.comps[k]))}</div>
  <div class=srow2><span>레벨</span><b>Lv.${lv} → <i class=up>Lv.${lv+1}</i></b></div><div class=srow2><span>공격 배율</span><b>×${C.compMul(k).toFixed(2)} → <i class=up>×${(C.compMul(k)*(1+.05*lv)/(1+.05*(lv-1))).toFixed(2)}</i></b></div><div class=srow2><span>성급 (중복 소환)</span><b>★${s.comps[k]} · 공격 +${(s.comps[k]-1)*10}%</b></div><div class=srow2><span>고유 마법</span><b>${c.d}</b></div>
  <span class="pill green wide ${s.gold<cost?'off':''}" id=cup style="margin-top:10px">레벨 업<small><img class=ci src=assets/it2_gold.png> ${fmt(cost)}</small></span></div>`);
  m.querySelector('#cup').onclick=e=>{e.stopPropagation();if(C.compUp(k)){m.remove();compDetail(k);if(G.screen)renderScreen()}else toast('골드가 부족합니다')}}
function idleInfo(){const sec=C.idleSec(),r=C.offlineCalc(Math.max(60,sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60);
  const m2=modal(`<div class=ttl style="justify-content:center;font-size:18px">방치 보상</div><div style="text-align:center"><img src="${A}ic3_chest.png" style="height:90px;filter:drop-shadow(0 0 12px #ffd25a)"><div class=idlebar><i style="width:${sec/BAL.offCap*100}%"></i><span>${h}시간 ${m}분 / ${BAL.offCap/3600}시간</span></div>
  <div class=rwgrid><div><img src="${A}ic3_shop.png"><b>${fmt(r.g*.5)}</b><small>골드</small></div><div><img src="${A}it2_xp.png"><b>${fmt(r.x*.5)}</b><small>경험치</small></div><div><img src="${A}it2_exp.png"><b>${fmt(Math.floor(r.o*.5))}</b><small>마정구</small></div></div>
  <small>현재 스테이지 ${C.stageName(C.S().si)} 기준 · 최대 ${BAL.offCap/3600}시간 누적</small><span class="pill green wide" id=idleClaim style="margin-top:8px">받기</span></div>`);
  m2.querySelector('#idleClaim').onclick=e=>{e.stopPropagation();const g=C.idleClaim();if(g)idleBurst(g);toast(g?'방치 보상 수령: <img class=ci src=assets/it2_gold.png>'+fmt(g.g):'1분 이상 누적 후 수령 가능');m2.remove();updateHud()}}
function menuGo(k){$('#menuPop').classList.remove('on');if(k=='comp')k='summon';if(k=='menu')return $('#menuPop').classList.add('on');if(['gear','train','comp','mission'].includes(k))return openSheet(k);if(k=='speed'){G.speed=G.speed==1?2:1;renderHub();return}if(k=='idle')return idleInfo();openScreen(k=='shop2'?'shop':k)}
function renderHub(){const ic=([k,n,i])=>`<a id=side${k} data-s=${k}>${i?`<img src="${A}${i}">`:'<span class=grid>▦</span>'}<em>${k=='speed'?'×'+G.speed+' 배속':n}</em><span class=dot style="display:none"></span></a>`;
  $('#sideL').innerHTML=SIDEL.map(ic).join('');$('#sideR').innerHTML=SIDER.map(ic).join('');$('#sideR2').innerHTML=SIDER2.map(ic).join('');
  $('#mgrid').innerHTML=MENU.map(([k,n,i])=>`<a data-s=${k}><img src="${A}${i}"><em>${n}</em></a>`).join('');
  document.querySelectorAll('.side a,#mgrid a').forEach(a=>a.onclick=()=>menuGo(a.dataset.s));$('#menuBtn').onclick=()=>menuGo('menu');$('#menuClose').onclick=()=>$('#menuPop').classList.remove('on');$('#idleBtn').onclick=idleInfo;
  $('#bossBtn').onclick=()=>{const s=C.S();if(s.wave>=BAL.waves&&!B.boss){s.failPow=0;C.startBoss()}};$('#autoBoss').onclick=()=>{const s=C.S();s.autoBoss=!s.autoBoss};
  $('#mission').onclick=()=>{const k=$('#mission').dataset.m;if(k&&C.claimMission(k)){$('#mission').dataset.key=''}else openSheet('mission')};
  $('#prof').onclick=()=>openSheet('train');$('#partycol').onclick=()=>openScreen('party');$('#stagebar').onclick=()=>openScreen('map');$('#sheetClose').onclick=()=>openSheet('battle')}
const TITLES={gear:'장비',train:'마력 수련 · 경지',comp:'동료 소환',mission:'일일 지령'};
function openSheet(t){if(G.screen)closeScreen();G.tab=(t==G.tab?'battle':t);const on=G.tab!='battle';$('#sheet').classList.toggle('on',on);if(on){$('#sheetTitle').textContent=TITLES[G.tab];renderPanel()}renderNav()}
// ---------- items helpers
const slotOf=k=>D.SLOTS.find(s=>s.k==k);
function itemIcon(it,size=46){const s=slotOf(it.slot);return `<img class=ic src="${A}${s.img}" style="width:${size}px;height:${size}px;border-color:${D.RAR[it.r].c};${s.f?'filter:'+s.f:''}">`}
function itemLine(it){return `<b style="font-size:12px;color:${D.RAR[it.r].c}">[${D.RAR[it.r].n}] ${it.name}</b><br><small>Lv.${it.lv} · ${it.st=='atk'?'공격력':'HP'} +${fmt(it.v)}</small>`}
let autoT=null;G.autoRolling=false;
function autoRoll(on){clearInterval(autoT);autoT=null;G.autoRolling=on;if(on)autoT=setInterval(()=>{const r=C.autoRollStep();if(r=='stop'){autoRoll(false);toast('목표 등급 획득!')}else if(r=='empty'){autoRoll(false);toast('마정구 소진')}if(G.tab=='gear')renderPanel();renderNav()},220);renderPanel()} // fixed real-time interval: unaffected by battle speed
// ---------- panel tabs
function renderPanel(){const p=$('#panel'),t=G.tab,s=C.S();C.daily();
 if(t=='battle'){const ch=Math.floor(s.si/7);p.innerHTML=`<div class=card><div class=ttl>제${ch+1}장 · ${D.CH[ch]}<small>최고 ${C.stageName(s.maxSi)}</small></div>
  <div style="display:flex;gap:5px;margin:6px 0 10px">${Array.from({length:7},(_,j)=>{const i=ch*7+j;return `<div data-st=${i} style="flex:1;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;cursor:pointer;${i<s.maxSi?'background:#c9953f;color:#3a1a0a':i==s.maxSi?'background:#d2401f;border:2px solid #ffe09a':'background:#0008;color:#777'};${i==s.si?'outline:2px solid #fff':''}">${C.stageName(i)}</div>`}).join('')}</div>
  <div style="display:flex;gap:8px"><span class="btn ${s.wave>=BAL.waves&&!B.boss?'':'off'}" id=bBoss style="flex:1">⚔ 보스 도전</span><span class="btn p" id=bAuto style="flex:1">자동 도전 ${s.autoBoss?'ON':'OFF'}</span><span class="btn p" id=bMap>🗺</span></div></div>
  <div class=card><div class=ttl>파티 <small>탭하여 편성 · 최대 3명</small></div><div style="display:flex;gap:6px">${D.COMPS.map(c=>{const own=s.comps[c.k],inP=s.party.includes(c.k);return `<div data-c=${c.k} class=pc style="flex:1;text-align:center;border-radius:10px;padding:4px;border:2px solid ${inP?'#ffd77a':'#444'};background:#0006;${own?'':'opacity:.35'}"><img src="${A}${c.img}" style="height:60px"><br><small style="color:#fff;font-weight:700">${c.n}</small><br><small>${own?'Lv.'+own+(inP?' · 출전':''):'미보유'}</small></div>`}).join('')}</div></div>
  <div class=card><small>공격력 ${fmt(C.ATK())} · 예상 DPS ${fmt(C.estDPS())} · 최대 HP ${fmt(C.MAXHP())} · 치명 ${C.stat('crit').toFixed(1)}%<br>공격 보너스 +${Math.round((C.atkPct()-1)*100)}% (마탑·협회) · EXP ${fmt(s.exp)}/${fmt(C.needExp())}</small><div class=bar style="margin-top:4px"><i style="width:${s.exp/C.needExp()*100}%"></i></div></div>`;
  $('#bBoss').onclick=()=>{if(s.wave>=BAL.waves){C.S().failPow=0;C.startBoss()}renderPanel()};$('#bAuto').onclick=()=>{s.autoBoss=!s.autoBoss;renderPanel()};$('#bMap').onclick=()=>openScreen('map');
  p.querySelectorAll('[data-st]').forEach(el=>el.onclick=()=>{const i=+el.dataset.st;if(i>s.maxSi)return toast('아직 갈 수 없습니다');C.selectStage(i);renderPanel()});
  p.querySelectorAll('.pc').forEach(el=>el.onclick=()=>{const k=el.dataset.c;if(!s.comps[k])return toast('동료 탭에서 소환하세요');const i=s.party.indexOf(k);if(i>=0)s.party.splice(i,1);else if(s.party.length<3)s.party.push(k);else return toast('최대 3명');C.buildAllies();renderPanel()})}
 if(t=='gear'){const it=s.bag,o=it&&s.gear[it.slot];const d=it?C.itemPow(it)-C.itemPow(o):0;
  const slotHtml=`<div class=eqgrid>${D.SLOTS.map(sl=>{const g=s.gear[sl.k];return `<div class="eq ${it&&it.slot==sl.k?'sel':''}" style="--rc:${g?D.RAR[g.r].c:'#555'}"><img src="${A}${sl.img}" style="${g?'':'opacity:.25;'}${sl.f?'filter:'+sl.f:''}"><span>${g?'Lv.'+g.lv:sl.n}</span></div>`}).join('')}</div>`;
  const col=(x,hd,cls)=>`<div class="cmpc ${cls}"><div class=brush>${hd}</div>${x?`<div class=eq style="--rc:${D.RAR[x.r].c};margin:8px auto 4px"><img src="${A}${slotOf(x.slot).img}"><span>Lv.${x.lv}</span></div><b class=iname>${x.name}</b><small style="color:${D.RAR[x.r].c};display:block;text-align:center">${D.RAR[x.r].n} ${slotOf(x.slot).n}</small>`:'<div style="height:96px;display:flex;align-items:center;justify-content:center"><small>비어 있음</small></div>'}
   ${cls=='new'?`<div class="pdiff ${d>=0?'up':'down'}">⚔ ${d>=0?'+':'-'}${fmt(Math.abs(d))}</div>`:'<div class=pdiff style="visibility:hidden">-</div>'}
   <div class=srow2><span>${x&&x.st=='hp'?'체력':'공격력'}</span><b>${x?fmt(x.v):'-'}${cls=='new'&&x?(d>=0?' <i class=up>▲</i>':' <i class=down>▼</i>'):''}</b></div><div class=srow2><span>전투력</span><b>${x?fmt(C.itemPow(x)):'-'}</b></div></div>`;
  p.innerHTML=slotHtml+(it?`<div class=cmpwrap>${col(o,'착용 중','own')}${col(it,'NEW','new')}</div><div class=btnrow><span class="pill red" id=sl>판매 +${fmt(C.sellPrice(it))}<img class=ci src=assets/it2_gold.png></span><span class="pill green" id=eq>장착</span></div>`:'')+
  `<div class=card><div class=ttl>마정구 뽑기 <small>보유 <img class=ci src=assets/it2_exp.png> ${fmt(s.orbs)}</small></div>
  <span class="pill green wide ${s.orbs<1||G.autoRolling||it?'off':''}" id=roll><img class=ci src=assets/it2_exp.png> 1개 사용 · 뽑기</span><span class="pill wide ${s.orbs<1||G.autoRolling||it?'off':''}" id=rollEq style="margin-top:6px">⚡ 일괄 뽑기·장착 (최대 30회)</span>
  <div style="margin:8px 0 4px"><small>자동 뽑기 필터: 목표 등급 이상 획득 시 정지 (좋은 장비 자동 장착 / 나머지 판매)</small></div>
  <div class=chips>${D.RAR.map((r,i)=>`<span class="chip ${s.filter==i?'on':''}" data-f=${i} style="color:${r.c}">${r.n}+</span>`).join('')}</div>
  <span class="pill ${G.autoRolling?'red':'blue'} wide" id=auto style="margin-top:8px">${G.autoRolling?'자동 뽑기 중… (탭하여 정지)':'자동 뽑기 시작'}</span>
  <small style="display:block;margin-top:6px">확률: ${D.RAR.map(r=>`${r.n} ${(r.w/D.RAR.reduce((a,b)=>a+b.w,0)*100).toFixed(2)}%`).join(' · ')}</small></div>`;
  {const re=$('#rollEq');if(re)re.onclick=()=>{if(s.bag||G.autoRolling)return toast('먼저 장착/판매하세요');const p0=C.POW();let n=0,eq=[],sold=0,gold=0;while(n<30&&C.rollOnce()){n++;const b=s.bag,o=s.gear[b.slot];if(C.itemPow(b)>C.itemPow(o)){eq.push(b);C.equipBag()}else{gold+=C.sellBag();sold++}}
  if(!n)return toast('마정구가 부족합니다');const byS={};eq.forEach(x=>byS[x.slot]=x);
  modal(`<div class=ttl style="justify-content:center;font-size:18px">일괄 장착 결과</div><div style="text-align:center;margin:8px 0">${n}회 뽑기 · <b class=up>장착 ${eq.length}</b> · 판매 ${sold} (<img class=ci src=assets/it2_gold.png>${fmt(gold)})</div><div class=skg>${Object.values(byS).map(x=>`<div class=skn><img src="${A}${(D.SLOTS.find(q=>q.k==x.slot)||{}).img}" style="height:44px"><small>${x.name||x.slot}</small></div>`).join('')}</div><div style="text-align:center;margin-top:8px">전투력 ${fmt(p0)} ▶ <b class=up>${fmt(C.POW())}</b></div>`);renderPanel();updateHud()}}$('#roll').onclick=()=>{if(!C.rollOnce())toast('마정구가 부족합니다');renderPanel()};$('#auto').onclick=()=>{if(s.bag&&!G.autoRolling)return toast('먼저 장착/판매하세요');autoRoll(!G.autoRolling)};
  if(it){$('#eq').onclick=()=>{C.equipBag();toast('장착 완료');renderPanel()};$('#sl').onclick=()=>{toast('판매 +'+fmt(C.sellBag())+'<img class=ci src=assets/it2_gold.png>');renderPanel()}}
  p.querySelectorAll('.chip').forEach(el=>el.onclick=()=>{s.filter=+el.dataset.f;renderPanel()})}
 if(t=='train'){const tot=D.STATS.reduce((a,st)=>a+s.stl[st.k],0),tier=['삼류','이류','일류','절정','초절정','화경'][Math.min(5,Math.floor(tot/100))],tl=Math.floor(tot%100/10)+1;
  p.innerHTML=`<div class=trainhero><div class=plaque>${tier} 마도사 ${tl}</div><img src="${A}hero_lina.png"><div class=aura></div></div>
  <div class=tprog><div class=bar><i style="width:${tot%10*10}%"></i></div><small>수련 합계 ${tot} · 다음 경지 ${Math.floor(tot/10+1)*10}</small></div>
  <div class=tcards>${D.STATS.map(st=>{const lv=s.stl[st.k],c=C.cost(st),mx=!isFinite(c);const cur=st.mult?'×'+C.stat(st.k).toFixed(2):st.k=='crit'?C.stat(st.k).toFixed(1)+'%':fmt(C.stat(st.k));
   return `<div class=tcard><div class=medal><img src="${A}${st.img}"></div><div class=tlv>Lv. ${lv}</div><b>${cur}</b><small>${st.n} · ${st.d}</small><span class="pill green ${s.gold<c||mx?'off':''}" data-s=${st.k}>${mx?'MAX':'강화<br><small><img class=ci src=assets/it2_gold.png> '+fmt(c)+'</small>'}</span></div>`}).join('')}</div>
  <span class="pill blue wide" id=t10 style="margin-top:8px">⚡ 최대 강화 (골드가 허락하는 만큼)</span>`;
  p.querySelectorAll('[data-s]').forEach(el=>el.onclick=()=>{C.train(el.dataset.s);renderPanel()});$('#t10').onclick=()=>{let n=0;for(let i=0;i<300;i++){if(!C.train(C.cheapestStat().k))break;n++}toast('수련 '+n+'회 완료');renderPanel()}}
 if(t=='comp'){p.innerHTML=`<div class=card style="text-align:center;background:linear-gradient(#3a1a5aee,#120a1ee8)"><div class=ttl style="justify-content:center">동료 소환</div><small>가우리 · 젤가디스 · 아멜리아 · 제로스 · 중복 시 동료 레벨업 (+10%)<br>소환권 ${s.tickets}장 보유 (우선 사용)</small><div style="display:flex;gap:8px;margin-top:10px"><span class="btn wide ${s.gems<BAL.summon&&s.tickets<1?'off':''}" id=sm1 style="flex:1">1회 ${s.tickets?'<img class=ci src=assets/it2_ticket.png>1':'<img class=ci src=assets/it2_gem.png>'+BAL.summon}</span><span class="btn wide ${s.gems<BAL.summon10&&s.tickets<10?'off':''}" id=sm10 style="flex:1">10회 ${s.tickets>=10?'<img class=ci src=assets/it2_ticket.png>10':'<img class=ci src=assets/it2_gem.png>'+fmt(BAL.summon10)}</span></div></div>
  <div class=card><div class=ttl>세력 상성 <small>우세 시 피해 +25% · 열세 시 -15%</small></div><div class=facwheel><span style="color:#ffd77a">정의</span> ▶ <span style="color:#b07cff">혼돈</span> ▶ <span style="color:#7ad8ff">인간</span> ▶ <span style="color:#ffd77a">정의</span></div><small>현재 적: 고블린·마족 = 혼돈 / 도적 = 인간 · 리나 = 리나의 세력(기본 인간)</small></div><div class=card><div class=ttl>보유 동료 <small>보유 <img class=ci src=assets/it2_gem.png> ${fmt(s.gems)}</small></div>${D.COMPS.map(c=>`<div class=row style="${s.comps[c.k]?'':'opacity:.4'}"><img class=ic src="${A}${c.img}" style="border-color:#c9953f"><div class=f><b>${c.n} ${s.comps[c.k]?'Lv.'+s.comps[c.k]:'(미보유)'}</b><br><small>${c.d}</small></div>${s.party.includes(c.k)?'<span class=chip style="background:#2a8a4a">출전</span>':''}</div>`).join('')}</div>`;
  $('#sm1').onclick=()=>summon(1);$('#sm10').onclick=()=>summon(10)}
 if(t=='mission'){C.weekly();p.innerHTML=`<div class=card><div class=ttl>주간 임무 <small>월요일 초기화</small></div>${D.WMISS.map(m=>{const v=Math.min(m.goal,s.wk.p[m.k]||0),done=v>=m.goal,cl=s.wk.c[m.k];return `<div class=row style="${cl?'opacity:.5':''}"><div class=f><b>${m.n}</b> <small><img class=ci src=assets/it2_gem.png> ${m.gem}${m.tk?` <img class=ci src=assets/it2_ticket.png> ${m.tk}`:''}</small><div class=bar style="margin-top:4px"><i style="width:${v/m.goal*100}%"></i></div><small>${fmt(v)}/${fmt(m.goal)}</small></div><span class="btn ${cl?'p off':done?'':'p off'}" data-w=${m.k}>${cl?'완료':done?'받기':'진행 중'}</span></div>`}).join('')}</div><div class=card><div class=ttl>일일 지령 <small>매일 05:00 초기화 (KST)</small></div>${D.MISSIONS.map(m=>{const v=Math.min(m.goal,s.mp[m.k]||0),done=v>=m.goal,cl=s.mc[m.k];return `<div class=row style="${cl?'opacity:.5':''}"><div class=f><b>${m.n}</b> <small><img class=ci src=assets/it2_gem.png> ${m.gem}</small><div class=bar style="margin-top:4px"><i style="width:${v/m.goal*100}%"></i></div><small>${v}/${m.goal}</small></div><span class="btn ${cl?'p off':done?'':'p off'}" data-m=${m.k}>${cl?'완료':done?'받기':'진행 중'}</span></div>`}).join('')}</div>`;
  p.querySelectorAll('[data-m]').forEach(el=>el.onclick=()=>{const g=C.claimMission(el.dataset.m);renderPanel()});p.querySelectorAll('[data-w]').forEach(el=>el.onclick=()=>{const g=C.claimW(el.dataset.w);renderPanel()})}
}
function summon(n){const got=C.summon(n);if(!got)return toast('보석이 부족합니다');if(G.screen=='summon')renderScreen();modal(`<div class=ttl style="justify-content:center;font-size:18px">소환 결과</div><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px">${got.map((k,gi)=>{const c=D.COMPS.find(x=>x.k==k);return `<div class="sumcard ${c.g>=3?'hi':''}" style="--rc:${D.RAR[c.g].c};animation-delay:${.15+gi*.16}s"><img src="${A}${c.img}" style="height:${n>1?66:170}px"><span class=gr>${D.RAR[c.g].n}</span><b>${c.n}</b><small>★${C.S().comps[k]}</small>${(C.lastNew||{})[k]&&got.indexOf(k)==gi?'<em class=snew>NEW</em>':`<small class=sdup>조각 +${C.SHV[c.g]||5}</small>`}${k==C.RU?'<em class=snew style="left:-6px;right:auto;background:linear-gradient(#ffb03a,#d65a00)">UP</em>':''}</div>`}).join('')}</div>`).id='sumModal';renderPanel()}
// ---------- full screens
function shell(title,bg,body,pos='center'){return `<img class=sbg src="${A}${bg}" style="object-position:${pos}"><div class=shade></div><div class=shead><span class=back id=sBack>‹</span><b>${title}</b><span class=chip><img class=ci src=assets/it2_gold.png> ${fmt(C.S().gold)}</span><span class=chip><img class=ci src=assets/it2_gem.png> ${fmt(C.S().gems)}</span></div><div class=sbody>${body}</div>`}
function openScreen(k){G.screen=k;$('#screen').classList.add('on');renderNav();renderScreen(true)}
function closeScreen(){G.screen=null;$('#screen').classList.remove('on');$('#screen').innerHTML='';renderNav();updateHud()}
function renderScreen(first){const k=G.screen,el=$('#screen'),s=C.S();if(!k)return;C.daily();el.classList.remove('gld','pass');
 if(k=='map'){const Hh=el.clientHeight-58||714,mw=Hh*16/9;
  el.innerHTML=`<img class=sbg src="${A}bg_map.jpg" style="filter:blur(6px) brightness(.4)"><div class=shead><span class=back id=sBack>‹</span><b>모험 지도</b>${D.CH.map((c,i)=>`<span class="chip ${Math.floor(s.si/7)==i?'on':''}" data-ch=${i}>${i+1}장</span>`).join('')}</div>${(()=>{const ci=Math.floor(s.si/7),done=Math.max(0,Math.min(7,s.maxSi-ci*7+(s.done?1:0)));return `<div class=mapch style="--art:url(${A}chap/ch${ci+1}.jpg)"><div><small>CHAPTER ${ci+1}</small><b>${D.CH[ci]}</b></div><div class=mp><i style="width:${done/7*100}%"></i></div><span>${done}/7</span></div>`})()}
   <div class=mapwrap id=mapw><div class=mapin style="width:${mw*4}px"><img src="${A}bg_map.jpg" style="width:${mw}px"><img src="${A}bg_map2.jpg" style="position:absolute;left:${mw}px;top:0;width:${mw}px;height:${Hh}px"><img src="${A}bg_map3.jpg" style="position:absolute;left:${mw*2}px;top:0;width:${mw}px;height:${Hh}px"><img src="${A}bg_map4.jpg" style="position:absolute;left:${mw*3}px;top:0;width:${mw}px;height:${Hh}px">
   <svg style="position:absolute;inset:0" width=${mw*4} height=${Hh}><polyline points="${D.MAPNODES.map(([x,y])=>`${x*mw},${y*Hh}`).join(' ')}" fill=none stroke="#fff3c0" stroke-width=3 stroke-dasharray="1 9" stroke-linecap=round /></svg>
   ${D.CH.map((c,i)=>{const [x,y]=D.MAPNODES[i*7];return `<div class=chlabel style="left:${x*mw-40}px;top:${y*Hh+26}px">제${i+1}장 · ${c}</div>`}).join('')}
   ${D.MAPNODES.map(([x,y],i)=>`<div class="node ${i<s.maxSi||s.done&&i==D.FIELDS.length-1?'done':i==s.maxSi?'cur':'lock'} ${i%7==6?'boss':''}" data-n=${i} style="left:${x*mw}px;top:${y*Hh}px">${i%7==6?'👑':C.stageName(i)}${i<s.maxSi?'<small>★★★</small>':''}</div>`).join('')}
   <img src="${A}hero_lina.png" style="position:absolute;height:64px;left:${D.MAPNODES[s.si][0]*mw-22}px;top:${D.MAPNODES[s.si][1]*Hh-86}px;filter:drop-shadow(0 4px 4px #000)">
   </div></div>`;
  const w=$('#mapw');if(first)w.scrollLeft=D.MAPNODES[s.si][0]*mw-195;
  el.querySelectorAll('[data-ch]').forEach(c=>c.onclick=()=>{w.scrollTo({left:D.MAPNODES[+c.dataset.ch*7+3][0]*mw-195,behavior:'smooth'})});
  el.querySelectorAll('.node').forEach(n=>n.onclick=()=>{const i=+n.dataset.n;if(i>s.maxSi)return toast('이전 스테이지의 보스를 처치하세요');C.selectStage(i);toast(C.stageName(i)+' 으로 이동');closeScreen()})}
 if(k=='base'){C.bUpdate();const now=C.now();
  const card=bk=>{const b=s.bld[bk.k],up=b.up?Math.max(0,(b.up-now)/1000):0,c=C.bCost(bk.k);let prod='',bar='',act='';
   if(bk.k!='tower'){const rate=C.bRate(bk.k)*3600,cap=C.bRate(bk.k)*BAL.store;prod=`${bk.k=='vault'?'<img class=ci src=assets/it2_gold.png>':'<img class=ci src=assets/it2_exp.png>'} 시간당 +${fmt(rate)} · 보관 ${fmt(b.acc)}/${fmt(cap)}`;bar=`<div class=bar style="margin-top:4px"><i style="width:${b.acc/cap*100}%"></i></div>`;act=`<span class="btn g ${b.acc<1?'off':''}" data-col=${bk.k}>수확</span>`}
   else prod=`파티 공격력 +${Math.round(BAL.tower.pct*b.lv*100)}% (다음 +${Math.round(BAL.tower.pct*100)}%)`;
   return `<div class=row><img class=ic src="${A}${bk.img}" style="border-color:#c9953f"><div class=f><b>${bk.n} Lv.${b.lv}</b><br><small>${prod}</small>${bar}${up?`<small>업그레이드 중 <span class=timer data-end=${b.up}>${tfmt(up)}</span></small>`:`<small>업그레이드 <img class=ci src=assets/it2_gold.png>${fmt(c)} · ⏱ ${tfmt(C.bTime(bk.k))}</small>`}</div><div style="display:flex;flex-direction:column;gap:6px">${act}${up?`<span class=btn data-sp=${bk.k}>가속 <img class=ci src=assets/it2_gem.png>${Math.max(1,Math.ceil(up/60)*2)}</span>`:`<span class="btn ${s.gold<c?'off':''}" data-up=${bk.k}>강화</span>`}</div></div>`};
  el.innerHTML=shell('리나의 영지','bg_base.jpg',`<div style="height:250px;position:relative"><img src="${A}hero_lina.png" style="position:absolute;left:150px;top:120px;height:120px;filter:drop-shadow(0 8px 6px #000a)"><span class=chip style="position:absolute;left:170px;top:30px">마탑 Lv.${s.bld.tower.lv}</span><span class=chip style="position:absolute;left:30px;top:150px">금고 Lv.${s.bld.vault.lv}</span><span class=chip style="position:absolute;right:20px;top:180px">마정 광산 Lv.${s.bld.mine.lv}</span></div>
   <div class=card><div class=ttl>건물 · 생산 <small>보관 한도 ${BAL.store/3600}시간</small></div>${D.BUILD.map(card).join('')}</div><small>건물 생산은 앱을 닫아도 계속됩니다.</small>`,'45% center');
  el.querySelectorAll('[data-col]').forEach(b=>b.onclick=()=>{const v=C.bCollect(b.dataset.col);if(v)toast((b.dataset.col=='vault'?'<img class=ci src=assets/it2_gold.png> +':'<img class=ci src=assets/it2_exp.png> +')+fmt(v));renderScreen()});
  el.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{if(C.bUpgrade(b.dataset.up))toast('업그레이드 시작');renderScreen()});
  el.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>{const g=C.bSpeedup(b.dataset.sp);if(!g)toast('보석이 부족합니다');renderScreen()})}
 if(k=='guild'){const g=s.guild,rmax=C.raidMax(),left=Math.max(0,rmax-s.raid.dmg);if(!s.gj){el.innerHTML=shell('협회 가입','bg_guildhall.jpg',`<div class=card style="text-align:center"><img src="${A}ic3_guild.png" style="width:64px"><div class=ttl style="justify-content:center">가입할 협회를 선택하세요</div><small>가입 후 주간 임무 · 상자 · 채팅 이용 가능</small></div>${C.GUILDS.map((q,i)=>`<div class=card><div class=row><div class=f><b>${q.n}</b><br><small>${q.m} · 회원 ${18+i*7}명</small></div><span class="btn g" data-gj=${i}>가입</span></div></div>`).join('')}`,'30% center');el.querySelectorAll('[data-gj]').forEach(b=>b.onclick=()=>{C.gJoin(+b.dataset.gj);toast(C.S().gj.n+' 가입 완료!');renderScreen()});return}
  el.classList.add('gld');el.innerHTML=shell('붉은 마도사 협회','bg_guildhall.jpg',`<div class=card style="margin-top:4px"><div class=ttl>협회 Lv.${g.lv} <small>오늘 버프 공격력 +${Object.keys(g.don).length*BAL.donate.buff*100}% · 영구 +${(g.lv-1)*2}%</small></div><div class=bar><i style="width:${g.exp/(100*g.lv)*100}%"></i></div><small>협회 경험치 ${g.exp}/${100*g.lv}</small></div>
   <div class=card style="background:linear-gradient(90deg,#3a0f1ee6,#120a1ee6)"><div style="display:flex;gap:10px;align-items:center"><img src="${A}boss_dragon.png" style="height:110px;filter:drop-shadow(0 6px 6px #000)"><div style="flex:1"><b style="color:#ff8a6a"><img class=ci src=assets/ic4/skull.png> 협동 토벌 · 황금룡 Lv.${s.raid.lv}</b><br><small>남은 HP ${fmt(left)} / ${fmt(rmax)}</small><div class=bar style="margin:6px 0;height:10px"><i style="width:${left/rmax*100}%;background:linear-gradient(90deg,#8e1a1a,#ff4a3a)"></i></div><small>협회원 18명 참여 중 (시뮬레이션) · 처치 시 <img class=ci src=assets/it2_gem.png>200 <img class=ci src=assets/it2_exp.png>30</small><span class="btn wide ${s.raid.tries>=BAL.raid.tries?'off':''}" id=raid style="margin-top:6px;padding:8px">토벌 참여 (${BAL.raid.tries-s.raid.tries}/${BAL.raid.tries})</span></div></div></div>
   <div class=card><div class=ttl>일일 기부 <small>기부마다 오늘 공격력 +${BAL.donate.buff*100}%</small></div><div style="display:flex;gap:8px">
   <div style="flex:1;text-align:center;background:#0006;border:1px solid #c9953f66;border-radius:10px;padding:8px"><div style="font-size:22px"><img class=ci src=assets/it2_gold.png></div><b style="font-size:12px">골드 기부</b><br><small><img class=ci src=assets/it2_gold.png>${fmt(C.donateCost('gold'))} · 경험치 +20</small><br><span class="btn ${g.don.gold?'off':''}" data-d=gold style="margin-top:6px">${g.don.gold?'완료':'기부'}</span></div>
   <div style="flex:1;text-align:center;background:#0006;border:1px solid #c9953f66;border-radius:10px;padding:8px"><div style="font-size:22px"><img class=ci src=assets/it2_gem.png></div><b style="font-size:12px">보석 기부</b><br><small><img class=ci src=assets/it2_gem.png>${BAL.donate.gem} · 경험치 +40</small><br><span class="btn ${g.don.gem?'off':''}" data-d=gem style="margin-top:6px">${g.don.gem?'완료':'기부'}</span></div></div></div>
   ${(()=>{C.gWeek();const ch=C.week()!==s.gchest;return `<div class=card><div class=ttl>주간 협회 임무 <small>코인 보유 <img class=ci src=assets/it3_guildcoin.png> ${s.gcoin||0}</small></div>${D.GMISS.map(m=>{const v=Math.min(m.goal,s.gm.p[m.k]||0),cl=s.gm.c[m.k],dn=v>=m.goal;return `<div class=row style="${cl?'opacity:.5':''}"><div class=f><b>${m.n}</b> <small><img class=ci src=assets/it3_guildcoin.png> ${m.gcoin}</small><div class=bar style="margin-top:4px"><i style="width:${v/m.goal*100}%"></i></div><small>${fmt(v)}/${fmt(m.goal)}</small></div><span class="btn ${cl||!dn?'p off':''}" data-gm=${m.k}>${cl?'완료':dn?'받기':'진행 중'}</span></div>`}).join('')}
   <div style="display:flex;gap:8px;margin-top:6px"><span class="btn wide ${(s.gcoin||0)<10?'off':''}" id=gco>코인 10 헌납 (경험치 +80)</span><span class="btn g wide ${ch?'':'off'}" id=gch><img src=assets/ui/${ch?'chest_c':'chest_o'}.png style="height:34px;vertical-align:middle"> 주간 상자${ch?'':' (수령)'}</span></div></div>
   <div class=card><div class=ttl>협회 채팅 <small>로컬 기록</small></div><div class=gchat id=gchat>${(s.gchat||[{who:'회장 공지',t:'협회 상자는 매주 월요일 갱신!'}]).slice(-20).map(m=>`<p><small>${m.at?new Date(m.at).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}):''}</small><b>${m.who}</b> ${m.t.replace(/[<>&]/g,'')}</p>`).join('')}</div><div style="display:flex;gap:6px;margin-top:6px"><input id=gin maxlength=80 placeholder="메시지 입력…" style="flex:1;padding:7px;border-radius:8px;border:1px solid #c9953f66;background:#0008;color:#fff;font-family:inherit"><span class=btn id=gsend>전송</span></div></div>
   <div class=card><div class=ttl>협회원 ${C.gRoster().length}명 <small><span class=gleave id=gleave>탈퇴</span></small></div>${C.gRoster().map(m=>`<div class=row><img class=ic src="${A}${m.img}" style="border-color:${m.npc?'#7a8aa0':'#c9953f'}"><div class=f><b>${m.n}</b><br><small>${m.role} · 전투력 ${fmt(m.pow)}</small></div></div>`).join('')}`})()}</div>`,'30% center');
  el.querySelectorAll('[data-gm]').forEach(b=>b.onclick=()=>{const r=C.gClaimM(b.dataset.gm);if(r){renderScreen()}});$('#gco').onclick=()=>{if(C.gContrib(10)){toast('헌납 완료 · 협회 경험치 +80');renderScreen()}};$('#gch').onclick=()=>{const r=C.gChest();if(r){toast(`주간 상자 <img class=ci src=assets/it2_gem.png> +${r.gems} · 코인 +${r.gcoin} · 강화석 +${r.stone}`);renderScreen()}};$('#gleave').onclick=()=>{C.gLeave();renderScreen()};
  const snd=()=>{const v=$('#gin').value;if(C.gSay(v)){renderScreen();const c=$('#gchat');c&&(c.scrollTop=c.scrollHeight);$('#gin')&&$('#gin').focus()}};$('#gsend').onclick=snd;{const c=$('#gchat');if(c)c.scrollTop=c.scrollHeight}$('#gin').onkeydown=e=>{if(e.key=='Enter')snd()};
  $('#raid').onclick=()=>{const r=C.raidAttack();if(!r)return;modal(`<img src="${A}boss_dragon.png" style="height:120px"><div class=ttl style="justify-content:center;font-size:18px">${r.killed?'황금룡 토벌 성공!':'토벌 결과'}</div><div style="font-size:15px;font-weight:900">피해량 ${fmt(r.dmg)} (${Math.round(r.pct*100)}%)<br><img class=ci src=assets/it2_gem.png> +${r.gem} · <img class=ci src=assets/it2_exp.png> +${r.orb}${r.bonus?`<br>처치 보상 <img class=ci src=assets/it2_gem.png> +${r.bonus.gems} · <img class=ci src=assets/it2_exp.png> +${r.bonus.orbs}`:''}</div>`,()=>renderScreen())};
  el.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{if(C.donate(b.dataset.d))toast('기부 완료 · 공격력 +5%');else toast('재화가 부족합니다');renderScreen()})}
 if(k=='arena'){C.arenaUpdate();const a=s.arena,L=C.league(),nx=D.LEAGUE[D.LEAGUE.indexOf(L)+1],regen=a.tickets<BAL.arena.tickets?(a.tAt+BAL.arena.regen*1000):0;
  el.innerHTML=shell('비무대회','bg_bimu.jpg',`${a.pend?`<div class=card style="text-align:center;border-color:#ffd77a"><b>지난 주 ${a.pend.league} 리그 보상</b><br><span class=btn id=wk style="margin-top:6px"><img class=ci src=assets/it2_gem.png> ${a.pend.gem} 받기</span></div>`:''}
   <div class=card style="display:flex;align-items:center;gap:12px;margin-top:4px"><div class=av style="width:60px;height:60px"><img src="${A}hero_lina.png"></div><div style="flex:1"><b>내 순위 <span style="color:#ffd77a;font-size:18px">${fmt(C.rank())}위</span></b><br><small>${L.n} 리그 · 점수 ${a.pts}${nx?` (다음 ${nx.n} ${nx.pts})`:''} · ${a.streak}연승</small></div><div style="text-align:center"><b style="font-size:17px"><img class=ci src=assets/it2_ticket.png> ${a.tickets}/${BAL.arena.tickets}</b><br><small>매일 05:00 초기화</small></div></div>
   <div class=card><div class=ttl>대전 상대 <small>전투력 ${fmt(C.POW())}</small></div>${a.opps.map((o,j)=>{const r=C.POW()/o.pow,p=1/(1+Math.exp(-(r-1)*7));return `<div class=row><div class=apt>${(o.party||[o.img]).map(im=>`<img src="${A}${im}">`).join('')}</div><div class=f><b>${o.n}</b><br><small>전투력 ${fmt(o.pow)} · ${fmt(o.rank)}위 · 예상 승률 ${Math.round(p*100)}%</small></div><span class="btn ${a.tickets<1?'off':''}" data-f=${j} style="background:${p<.4?'linear-gradient(#ff6a5a,#a01a1a)':p<.7?'':'linear-gradient(#5ad07a,#1e7a3a)'}">도전</span></div>`}).join('')}<span class="btn p wide" id=rf style="margin-top:6px">🔄 상대 새로고침 (무료)</span></div>
   <div class=card><div class=ttl>투기장 랭킹 TOP 10</div>${C.arenaTop().map((r,i)=>`<div class="row rk"><b class=rkn>${i+1}</b><div class=apt>${r.party.map(im=>`<img src="${A}${im}">`).join('')}</div><div class=f><b>${r.n}</b><br><small>점수 ${r.pts} · 전투력 ${fmt(r.pow)}</small></div></div>`).join('')}<div class="row rk" style="border-color:#ffd77a"><b class=rkn>${fmt(C.rank())}</b><div class=apt>${C.S().party.slice(0,4).map(k=>`<img src="${A}${D.COMPS.find(c=>c.k==k).img}">`).join('')}</div><div class=f><b>${G.nick?G.nick():'나'} (나)</b><br><small>점수 ${a.pts}</small></div></div></div><div class=card><div class=ttl>주간 리그 보상 <small>매주 월요일 정산</small></div><small>${D.LEAGUE.map(l=>`${l.n} ${l.pts}+ <img class=ci src=assets/it2_gem.png>${l.gem}`).join(' · ')}</small></div>`);
  if(a.pend)$('#wk').onclick=()=>{const L=a.pend.league,v=C.arenaClaim();renderScreen();rewardPop([['it2_gem.png',v,'보석']],'지난 시즌 '+L+' 리그 보상')};$('#rf').onclick=()=>{C.arenaRefresh();renderScreen()};
  el.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const r=C.arenaFight(+b.dataset.f);if(!r)return toast('오늘 도전 횟수를 모두 사용했습니다');updateHud();arenaReplay(r,false)})}
 if(k=='shop'){const sec=(it)=>{const p=C.shopPrice(it),b=s.shop.bought[it.k]||0,lim=it.daily?`<small> (${b}/${it.daily})</small>`:'';const dis=(it.daily&&b>=it.daily)||(it.cur=='gems'&&s.gems<p)||(it.cur=='gold'&&s.gold<p);
   return `<div class=card style="margin:0;padding:8px;text-align:center"><img class=ic src="${A}${it.img}" style="width:100%;height:auto;aspect-ratio:1;border-color:#c9953f"><b style="font-size:11px;display:block;margin-top:4px;min-height:28px">${it.n}${lim}</b><span class="btn ${dis?'off':it.cur=='free'?'g':''}" data-b=${it.k} style="display:block;padding:6px 4px;font-size:12px">${it.cur=='free'?'무료':it.cur=='gems'?'<img class=ci src=assets/it2_gem.png> '+fmt(p):'<img class=ci src=assets/it2_gold.png> '+fmt(p)}</span></div>`};
  el.innerHTML=shell('마법 상점','bg_shop.jpg',`<div class=card style="margin-top:4px;background:linear-gradient(120deg,#5a1a10ee,#24143aee)"><div class=ttl>패키지 <small class=notice>프로토타입 · 실제 결제 없음</small></div>${D.PKG.map((p,i)=>`<div class=row><img class=ic src="${A}${p.img}" style="border-color:#ffa03a"><div class=f><b>${p.n}</b><br><small>${p.d}</small></div><span class="btn g" data-pkg=${i}>${p.won}</span></div>`).join('')}</div>
   <div class=ttl style="margin:6px 2px">보석 · 골드 상점 <small>매일 05:00 일일 한도 초기화</small></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${D.SHOP.map(sec).join('')}</div>`,'40% center');
  el.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{if(C.buy(b.dataset.b))toast('구매 완료');else toast('구매할 수 없습니다');renderScreen()});
  el.querySelectorAll('[data-pkg]').forEach(b=>b.onclick=()=>modal(`<div class=ttl style="justify-content:center;font-size:17px">결제 안내</div><small style="font-size:13px;color:#fff">이 빌드는 프로토타입입니다.<br>실제 결제는 이루어지지 않으며 상품도 지급되지 않습니다.</small>`)) }
 if(k=='summon'){const mile=s.mile||0;el.innerHTML=shell('동료 소환','bg_lobby.jpg',`<div class=sumban><img class=b1 src="${A}ally_xellos.png"><img class=b2 src="${A}ally_amelia.png"><img class=b3 src="${A}ally_gourry.png"><div class=bt><b>마도사 동료 소환</b><small>전설 동료 「제로스」 등장 확률 UP!</small></div></div>
   <div class=card><div class=ttl>소환 확률 <small>${[4,3,2].map(g=>`<span style="color:${D.RAR[g].c}">${D.RAR[g].n} ${C.GW[g]}%</span>`).join(' · ')} · ${C.PITY}회 전설 확정</small></div>
   <div class=milebar><span>마일리지</span><div class=bar><i style="width:${Math.min(100,mile)}%"></i></div><b>${mile}/100</b></div>
   ${mile>=100?`<div class=chips style="margin-top:6px">${D.COMPS.map(c=>`<span class=chip data-mile=${c.k}>${c.n} 선택 소환</span>`).join('')}</div>`:'<small>소환 1회당 마일리지 +1 · 100 달성 시 원하는 동료 선택 소환</small>'}</div>
   <div class=sumbtns><span class="pill blue" id=su1>1회 소환<small>${s.tickets?'<img class=ci src=assets/it2_ticket.png> 1':'<img class=ci src=assets/it2_gem.png> '+BAL.summon}</small></span><span class="pill red" id=su10>10회 소환<small>${s.tickets>=10?'<img class=ci src=assets/it2_ticket.png> 10':'<img class=ci src=assets/it2_gem.png> '+fmt(BAL.summon10)}</small></span></div><div class=spity><div class=spb><i style="width:${Math.min(100,(s.pity||0)/C.PITY*100)}%"></i></div><span>전설 확정까지 <b>${C.PITY-(s.pity||0)}</b>회</span></div><span id=suRate class=srate>ⓘ 확률 정보</span><small style="display:block;text-align:center">보유 <img class=ci src=assets/it2_ticket.png> ${s.tickets} · <img class=ci src=assets/it2_gem.png> ${fmt(s.gems)}</small>`);
   $('#su1').onclick=()=>summon(1);$('#su10').onclick=()=>summon(10);$('#suRate').onclick=rateInfo;el.querySelectorAll('[data-mile]').forEach(c=>c.onclick=()=>{C.mileSummon(c.dataset.mile);toast('선택 소환 완료');renderScreen()})}
 if(k=='relic'){const tot=D.RELICS.reduce((a,r)=>a+((s.relic||{})[r.k]||0),0);el.innerHTML=shell('기보 · 클레어 바이블','bg_guild.jpg',`<div class=relhero><img src="${A}it3_relicbook.png"><div><b>클레어 바이블 사본</b><small>조각을 모아 고대 마도서를 복원하세요<br>총 공격력 +${Math.round(C.relicB('atk')*100)}% · 체력 +${Math.round(C.relicB('hp')*100)}%</small></div></div>
   <div class=card><div class=ttl>사본 목록 <small>📜 조각 ${s.frag||0} · <img class=ci src=assets/it2_gold.png> ${fmt(s.gold)}</small></div><div class=relgrid>${D.RELICS.map((r,i)=>{const lv=(s.relic||{})[r.k]||0,c=C.relicCost(r.k),ok=(s.frag||0)>=c.f&&s.gold>=c.g;return `<div class="rel ${lv?'on':''}"><div class=rimg style="filter:hue-rotate(${i*40}deg) ${lv?'':'grayscale(1) brightness(.5)'}"><img src="${A}ic3_quest.png"></div><b>${r.n}</b><small>${r.d} +${Math.round(lv*r.per*100)}% · Lv.${lv}</small><span class="pill green ${ok?'':'off'}" data-rel=${r.k}>${lv?'강화':'복원'}<small>📜${c.f} · <img class=ci src=assets/it2_gold.png>${fmt(c.g)}</small></span></div>`}).join('')}</div></div><small>조각 획득: 도전 → 고대 유적 발굴</small>`);
   el.querySelectorAll('[data-rel]').forEach(b=>b.onclick=()=>{if(C.relicUp(b.dataset.rel)){toast('기보 강화!');renderScreen()}else toast('조각 또는 골드가 부족합니다')})}
 if(k=='dungeon'){dunScreen(el,s)}
 if(k=='wboss'){const w=C.wbState(),L=C.wbRank(),ref=C.wbRef(),left=C.WB.tries-w.tries,my=L.findIndex(x=>x.me)+1;el.innerHTML=shell('월드 보스','bg_dungeon.jpg',`<div class="card wbh"><img src="${A}${C.WB.img}"><div class=wbn><b>${C.WB.n}</b><small>${C.WB.time}초 동안 최대한 많은 피해를 입히세요 · 등급별 보상</small></div></div>
  <div class=card><div class=ttl>오늘의 기록 <small>최고 ${fmt(w.today||0)} · 순위 ${w.today?my+'위':'-'}</small></div><div class=wbt>${C.WB.tiers.map((t,i)=>{const r=C.wbRew(i),hit=(w.today||0)>=ref*t[1];return `<div class="${hit?'hit':''}"><b>${t[0]}</b><small>${fmt(ref*t[1])}</small><small><img class=ci src=assets/it2_gem.png>${r.gems}${r.tickets?` <img class=ci src=assets/it2_ticket.png>${r.tickets}`:''}</small></div>`}).join('')}</div></div>
  <div class=card><div class=ttl>오늘의 랭킹 <small>매일 05:00 초기화</small></div>${L.map((x,i)=>`<div class="wbr ${x.me?'me':''}"><b class="rk r${Math.min(i+1,4)}">${i+1}</b><i>${x.n}</i><span>${fmt(x.d)}</span></div>`).join('')}</div>
  <span class="pill red wide ${left?'':'off'}" id=wbGo>도전하기 (${left}/${C.WB.tries})</span>`);
  $('#wbGo').onclick=()=>{if(!left)return toast('오늘 도전 횟수를 모두 사용했습니다');if(C.B.boss)return toast('보스전 중에는 도전할 수 없습니다');$('#screen').classList.remove('on');G.screen=null;C.wbStart()}}
 if(k=='title'){const own=C.titlesOwned().map(t=>t.k),cur=s.title;el.innerHTML=shell('칭호','bg_lobby.jpg',`<div class=card style="text-align:center"><small>업적 단계로 칭호 해금 · 장착한 칭호 1개의 효과 적용 · 이름 아래 표시</small></div>${D.TITLES.map(t=>{const o=own.includes(t.k);return `<div class="ttlr ${o?'':'lock'} ${cur==t.k?'on':''}"><span class="tbadge r${t.r}">${t.n}</span><div class=f><small>${t.d}</small><small class=tb>공격력 +${t.atk}%${t.gold?` · 골드 +${t.gold}%`:''}</small></div>${o?(cur==t.k?'<small class=teq>장착 중</small>':`<span class="pill green" data-ttl="${t.k}">장착</span>`):'<small>🔒 미해금</small>'}</div>`}).join('')}`);
  el.querySelectorAll('[data-ttl]').forEach(b=>b.onclick=()=>{s.title=b.dataset.ttl;G.titleHud(1);toast('칭호 장착: '+C.titleCur().n);renderScreen()})}
 if(k=='ach'){const L=C.achList();const ready=L.filter(a=>a.can).length;el.innerHTML=shell('업적','bg_lobby.jpg',`<div class=card style="text-align:center"><div class=ttl style="justify-content:center"><img class=ci src="${A}ic3_trophy.png" style="height:20px"> 업적 점수 ${C.achScore()}</div><small>달성 단계마다 보상 · 단계가 오를수록 목표와 보상 증가</small><div class=ttlrow><span class="tbadge r${(C.titleCur()||{}).r||0}">${(C.titleCur()||{n:'칭호 없음'}).n}</span><span class="pill blue" id=ttlBtn>칭호 ${C.titlesOwned().length}/${D.TITLES.length}</span></div></div>${ready?`<span class="pill green wide" id=achAll style="margin:4px 0 6px">모두 받기 (${ready})</span>`:''}${L.map(a=>`<div class="achr ${a.can?'can':''} ${a.done?'done':''}"><img src="${A}${a.ic}"><div class=f><b>${a.n} <em>${'★'.repeat(Math.min(a.lv,5))}${a.lv>5?'+'+(a.lv-5):''}</em></b><small>${a.d.replace('#',fmt(a.goal))}</small><div class=bar><i style="width:${Math.min(1,a.v/a.goal)*100}%"></i></div><small>${fmt(Math.min(a.v,a.goal))}/${fmt(a.goal)}</small></div>${a.done?'<small>완료</small>':`<span class="pill ${a.can?'green':'off'}" data-ach="${a.k}"><img class=ci src=assets/it2_gem.png>${a.gem}</span>`}</div>`).join('')}`);
  el.querySelectorAll('[data-ach]').forEach(b=>b.onclick=()=>{const sn=resSnap();if(C.achClaim(b.dataset.ach)){renderScreen();diffPop(sn,'업적 달성')}});$('#ttlBtn').onclick=()=>openScreen('title');const aa=$('#achAll');if(aa)aa.onclick=()=>{const sn=resSnap();let n=0;for(let i=0;i<50;i++){let any=0;C.achList().forEach(a=>{if(a.can&&C.achClaim(a.k)){n++;any=1}});if(!any)break}renderScreen();diffPop(sn,'업적 '+n+'단계 달성')}}
 if(k=='mail'){s.mailc=s.mailc||{};el.innerHTML=shell('우편함','bg_lobby.jpg',`<div class=card>${D.MAILS.map(m=>`<div class=row><img src="${A}ic3_mail.png" style="width:44px"><div class=f><b>${m.n}</b><br><small>${m.g?'<img class=ci src=assets/it2_gem.png>'+m.g+' ':''}${m.o?'<img class=ci src=assets/it2_exp.png>'+m.o+' ':''}${m.t?'<img class=ci src=assets/it2_ticket.png>'+m.t:''} · 보관 기한 7일</small></div>${s.mailc[m.k]?'<small>수령 완료</small>':`<span class="pill green" data-m="${m.k}">받기</span>`}</div>`).join('')}</div><span class="pill blue wide" id=mailAll>모두 받기</span>`);
   const claim=k=>{const r=C.mailClaim(k);if(!r.n)return toast('받을 우편이 없습니다');renderScreen();rewardPop([r.g&&['it2_gem.png',r.g,'보석'],r.o&&['it2_exp.png',r.o,'마정구'],r.t&&['it2_ticket.png',r.t,'소환권']].filter(Boolean),r.n>1?'우편 '+r.n+'개 수령':'')};$('#mailAll').onclick=()=>claim();el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>claim(b.dataset.m))}
 if(k=='event'){s.att=s.att||{n:0,last:'',cyc:0};const today=C.today(),MAX=28,can=s.att.last!==today&&s.att.n<MAX;
   const base=[['gold',40,'it2_gold','골드'],['orbs',5,'it2_exp','마정구'],['gems',50,'it2_gem','다이아'],['gold',80,'it2_gold','골드'],['stone',3,'it2_stone','강화석'],['gems',80,'it2_gem','다이아'],['tickets',1,'it2_ticket','소환권']];
   const RW=Array.from({length:MAX},(_,i)=>{const b=base[i%7];const mul=1+Math.floor(i/7)*.5;if((i+1)%7===0)return ['gems',100+i*10,'it2_gem','다이아'];if((i+1)%14===0)return ['tickets',2,'it2_ticket','소환권'];if(i===27)return ['tickets',5,'it2_ticket','소환권'];return[b[0],Math.round(b[1]*mul),b[2],b[3]]});
   const amt=r=>r[0]=='gold'?C.goldKill(s.maxSi)*r[1]:r[1];
   el.innerHTML=shell('출석 이벤트','bg_lobby.jpg',`<div class=card style="text-align:center"><img src="${A}ic3_calendar.png" style="width:64px"><div class=ttl style="justify-content:center">28일 출석 보상</div><small>매일 접속 · ${s.att.n}/${MAX}일 · 사이클 ${(s.att.cyc||0)+1}</small></div>
   <div class=attg att28>${RW.map((r,i)=>`<div class="att ${i<(s.att.n||0)?'done':''} ${i==s.att.n&&can?'now':''}"><small>${i+1}</small><img src="${A}${r[2]}.png"><b>${fmt(amt(r))}</b>${i<(s.att.n||0)?'<i>✔</i>':''}</div>`).join('')}</div>
   <span class="pill ${can?'green':'off'} wide" id=attC>${can?'오늘 보상 받기':s.att.n>=MAX?'출석 완료 (다음 달 리셋)':'내일 다시 오세요'}</span>`);
   const b=$('#attC');if(can)b.onclick=()=>{const snap0=resSnap();const r=RW[s.att.n];const k2=r[0]==='stone'?'stone':r[0];s[k2]=(s[k2]||0)+amt(r);s.att.n++;s.att.last=today;if(s.att.n>=MAX){s.att.n=0;s.att.cyc=(s.att.cyc||0)+1}renderScreen();diffPop(snap0,'출석 '+s.att.n+'일차')}}
 if(k=='bag'){const it=[['it2_gold','골드',s.gold],['it2_gem','다이아',s.gems],['it2_exp','마정구',s.orbs],['it2_ticket','동료 소환권',s.tickets||0],['it2_hp','회복 물약',s.pot||0],['it2_mp','마나 물약',s.mpot||0],['it2_stone','강화석',s.stone||0],['it3_dungeonkey','던전 열쇠',s.dkey||0],['it3_guildcoin','길드 코인',s.gcoin||0],['it3_arenatoken','투기장 토큰',s.atoken||0],['it3_mileagestar','마일리지',s.mile||0]];const g=Object.values(s.gear||{}).filter(Boolean);
   el.innerHTML=shell('가방','bg_lobby.jpg',`<div class=card><div class=ttl>재화 · 소모품</div><div class=bagg>${it.map(x=>`<div class=bi><img src="${A}${x[0]}.png"><b>${fmt(x[2])}</b><small>${x[1]}</small></div>`).join('')}</div></div>
   <div class=card><div class=ttl>장착 장비 (${g.length})</div><div class=bagg>${g.map(x=>`<div class=bi style="border-color:${D.RAR[x.r].c}"><img src="${A}${(D.SLOTS.find(q=>q.k==x.slot)||{}).img}"><b>Lv.${x.lv}</b><small>${x.name}</small></div>`).join('')||'<div class=empty style="grid-column:1/-1"><b>장착한 장비가 없습니다</b></div>'}</div></div>`)}
 if(k=='codex'){const own=D.COMPS.filter(c=>s.comps[c.k]).length;
   const cb=C.codexB();el.innerHTML=shell('도감','bg_lobby.jpg',`<div class=card><div class=ttl>수집 보너스 <small>공격력 +${Math.round(cb.atk*100)}% · 체력 +${Math.round(cb.hp*100)}%</small></div>${D.CODEX.map(b=>{const v=b.t=='c'?cb.n:cb.seen,ok=v>=b.need;return `<div class=row style="${ok?'':'opacity:.55'}"><div class=f><b>${b.n} 수집</b> <small>${b.atk?`공격력 +${b.atk*100}% `:''}${b.hp?`체력 +${b.hp*100}%`:''}</small><div class=bar style="margin-top:4px"><i style="width:${Math.min(1,v/b.need)*100}%"></i></div></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':Math.min(v,b.need)+'/'+b.need}</span></div>`}).join('')}</div><div class=card><div class=ttl>동료 도감 ${own}/${D.COMPS.length}</div><div class=bagg>${D.COMPS.map(c=>`<div class="bi ${s.comps[c.k]?'':'lock'}"><img src="${A}${c.img}"><b>${c.n}</b><small>${'★'.repeat(c.g)}</small></div>`).join('')}</div></div>
   <div class=card><div class=ttl>몬스터 도감</div><div class=bagg>${D.MONS.map(m=>`<div class="bi ${(s.seen||{})[m.img]?'':'lock'}"><img src="${A}${m.img}"><b>${m.n}</b></div>`).join('')}${D.BOSSES.map(m=>`<div class=bi style="border-color:#e0533a"><img src="${A}${m.img}"><b>${m.n}</b></div>`).join('')}</div></div>`)}
 if(k=='enhance'){G.enTab=G.enTab||'gear';const gi='<img class=ci src=assets/it2_gold.png>',si='<img class=ci src=assets/it2_stone.png>';
   const tabs=`<div class=entabs><span class="${G.enTab=='gear'?'on':''}" data-et=gear>장비 강화</span><span class="${G.enTab=='comp'?'on':''}" data-et=comp>동료 육성</span><span class="${G.enTab=='skill'?'on':''}" data-et=skill>스킬 편성</span></div><div class="card enres"><img src="${A}it2_stone.png"><b>강화석 ${fmt(s.stone||0)}</b><small>처치 3% · 보스 5개 · 방치 15분당 1개</small></div>`;
   let body='';
   if(G.enTab=='gear'){const sl=D.SLOTS.filter(x=>s.gear[x.k]);G.enSel=s.gear[G.enSel]?G.enSel:(sl[0]&&sl[0].k);const it=s.gear[G.enSel];
     body=`<div class=card><div class=engrid>${sl.map(x=>{const g=s.gear[x.k];return `<div class="eni ${x.k==G.enSel?'sel':''}" data-es=${x.k} style="--rc:${D.RAR[g.r].c}"><img src="${A}${x.img}" style="${x.f?'filter:'+x.f:''}"><b>+${g.en||0}</b></div>`}).join('')||'<div class=empty style="grid-column:1/-1"><img src="assets/ic3_anvil.png"><b>장착한 장비가 없습니다</b><small>마정구로 장비를 뽑아 장착하면 여기서 강화할 수 있어요</small><span class="pill green" id=goRoll>장비 뽑으러 가기</span></div>'}</div></div>`;
     if(it){const c=C.enCost(it),r=C.enRate(it),n=it.en||0,cur=Math.round(it.v*(1+.1*n)),nx=Math.round(it.v*(1+.1*(n+1)));
      body+=`<div class="card anvil"><div class=anvilv><img class=av1 src="${A}ic3_anvil.png"><div class=eqbig style="--rc:${D.RAR[it.r].c}"><img src="${A}${D.SLOTS.find(q=>q.k==it.slot).img}"></div></div>
      <div class=ttl style="justify-content:center">${it.name} <span style="color:#ffd66a">+${n}</span></div>
      <div class=enstat><span>${it.st=='atk'?'공격력':'체력'}</span><b>${fmt(cur)}</b><i>▶</i><b style="color:#7dff8a">${n>=15?'MAX':fmt(nx)}</b></div>
      <div class=enstat><span>성공 확률</span><b style="color:${r<1?'#ffb84a':'#7dff8a'}">${Math.round(r*100)}%</b><span style="opacity:.7">실패 시 재료만 소모</span></div>
      <div class=encost>${gi} ${fmt(c.g)} &nbsp; ${si} ${c.st}</div>
      <span class="pill green wide ${n>=15||s.gold<c.g||(s.stone||0)<c.st?'off':''}" id=enGo>${n>=15?'최대 강화':'강화하기'}</span><span class="pill wide" id=enAll style="margin-top:6px">⚡ 일괄 강화 (최저 단계부터)</span></div>`}}
   else if(G.enTab=='skill'){const L=C.load6().map(x=>x.k);body=`<div class=card><div class=ttl>스킬 편성 <small>최대 6개 · 전투 하단 바에 표시</small></div><div class=skpick>${D.SPELLS.map(sp=>{const lk=sp.unlock&&s.maxSi<sp.unlock,on=L.includes(sp.k);return `<div class="skp ${on?'on':''} ${lk?'lock':''}" data-sl=${sp.k}><img src="${A}${sp.img}"><b>${sp.n}</b><small>${lk?C.stageName(sp.unlock)+' 해금':'쿨 '+sp.cd+'초'}</small></div>`}).join('')}</div></div>`}
   else{body=`<div class=card>${D.COMPS.filter(c=>s.comps[c.k]).map(c=>{const lv=(s.clv||{})[c.k]||1,sk=(s.csk||{})[c.k]||1,lc=C.compUpCost(c.k),kc=C.skCost(c.k);return `<div class=row><img src="${A}${c.img}" style="width:46px;height:52px;object-fit:contain"><div class=f><b>${c.n}</b> <small style="color:#ffd66a">${'★'.repeat(c.g)}</small><br><small>Lv.${lv} · <img class=ci src="${A}${(D.CSKI[c.k]||['sk/ult.png'])[0]}" style="width:16px;height:16px"> ${(D.CSKI[c.k]||['','스킬'])[1]} Lv.${sk}</small><br><small style="color:#9fe">공격 배율 ×${C.compMul(c.k).toFixed(2)}</small></div><div style="display:flex;flex-direction:column;gap:4px"><span class="pill blue ${s.gold<lc?'off':''}" data-lu=${c.k}>레벨업 ${gi}${fmt(lc)}</span><span class="pill green ${sk>=10||s.gold<kc.g||(s.stone||0)<kc.st?'off':''}" data-sk=${c.k}>${sk>=10?'스킬 MAX':'스킬 강화 '+si+kc.st}</span></div></div>`}).join('')}</div>`}
   el.innerHTML=shell('강화 · 육성','bg_lobby.jpg',tabs+body);
   el.querySelectorAll('[data-et]').forEach(b=>b.onclick=()=>{G.enTab=b.dataset.et;renderScreen()});el.querySelectorAll('[data-sl]').forEach(b=>b.onclick=()=>{if(C.setLoad(b.dataset.sl))renderScreen();else toast('최대 6개 · 최소 1개')});el.querySelectorAll('[data-es]').forEach(b=>b.onclick=()=>{G.enSel=b.dataset.es;renderScreen()});
   const ea=$('#enAll');if(ea)ea.onclick=()=>{let ok=0,fail=0,why='';for(let i=0;i<40;i++){const sl=Object.keys(s.gear).filter(k=>s.gear[k]&&(s.gear[k].en||0)<15).sort((a,b)=>(s.gear[a].en||0)-(s.gear[b].en||0))[0];if(!sl){why='max';break}const r=C.enhance(sl);if(r=='ok')ok++;else if(r=='fail')fail++;else{why=r;break}}
      if(!ok&&!fail){toast(why=='max'?'모든 장비가 최대 강화입니다':why=='stone'?'강화석이 부족합니다':'골드가 부족합니다');return}
      modal(`<div class=ttl style="justify-content:center;font-size:18px">일괄 강화 결과</div><div style="text-align:center;font-size:15px;margin:10px 0"><b class=up>성공 ${ok}</b> · <span style="opacity:.75">실패 ${fail}</span></div><small style="display:block;text-align:center">${why=='stone'?'강화석 소진':why=='gold'?'골드 소진':why=='max'?'모두 최대 강화':'40회 시도 완료'} · 전투력 ${fmt(C.POW())}</small>`);updateHud();renderScreen()};const eg=$('#enGo');if(eg)eg.onclick=()=>{const r=C.enhance(G.enSel);const M={ok:'강화 성공!',fail:'강화 실패… 재료가 소모되었습니다',gold:'골드가 부족합니다',stone:'강화석이 부족합니다',max:'최대 강화입니다'};toast(M[r]);if(r=='ok'||r=='fail'){const a=el.querySelector('.anvil');a&&a.classList.add(r=='ok'?'flashok':'flashno')}setTimeout(renderScreen,r=='ok'||r=='fail'?380:0)};
   el.querySelectorAll('[data-lu]').forEach(b=>b.onclick=()=>{toast(C.compUp(b.dataset.lu)?'레벨업!':'골드가 부족합니다');renderScreen()});
   el.querySelectorAll('[data-sk]').forEach(b=>b.onclick=()=>{const r=C.skUp(b.dataset.sk);toast({ok:'스킬 강화 성공!',gold:'골드가 부족합니다',stone:'강화석이 부족합니다',max:'최대 레벨'}[r]||'');renderScreen()})}
 if(k=='pass'){const b=C.bp(),T=C.bpTier(),ri=r=>Object.entries(r).map(([k,v])=>`<img class=ci src=assets/${({gems:'it2_gem',orbs:'it2_exp',stone:'it2_stone',tickets:'it2_ticket',goldH:'it2_gold'})[k]}.png>${k=='goldH'?'골드':v}`).join('');
   el.classList.add('pass');el.innerHTML=shell('마도 패스 시즌 '+(b.se%100+1),'bg_lobby.jpg',`<div class=card><div class=ttl>패스 Lv.${T}/${D.BP.tiers} <small>처치·보스·임무로 경험치 획득</small></div><div class=bar><i style="width:${(b.xp%D.BP.xp)/D.BP.xp*100}%"></i></div><small>${b.xp%D.BP.xp}/${D.BP.xp} XP · 4주 시즌</small>${b.prem?'<div class=pill style="margin-top:6px"><img class=ci src=assets/ic4/crown.png> 프리미엄 활성</div>':`<span class="btn g wide" id=bpb style="margin-top:6px">프리미엄 패스 ${D.BP.price} <small>(프로토타입 · 실제 결제 없음)</small></span>`}</div>${(()=>{const b=C.bp(),T=C.bpTier();let n=0;for(let t=0;t<T;t++){if(!b.fc[t])n++;if(b.prem&&!b.pc[t])n++}return n?`<span class="pill green wide" id=bpAll style="margin:6px 0">모두 받기 (${n})</span>`:''})()}
   <div class=card><div class=bpg><b>단계</b><b>무료</b><b>프리미엄</b>${Array.from({length:D.BP.tiers},(_,t)=>{const ok=t<T;const cell=(p)=>{const got=(p?b.pc:b.fc)[t],can=ok&&!got&&(!p||b.prem);return `<span class="bpc ${got?'got':can?'can':''} ${p&&!b.prem?'lockp':''}" data-bp="${t}" data-pp="${p?1:0}">${t==19&&p?'<img class=ci src=assets/skin/lina_gold.png>황금 코스튬':ri(C.bpRew(t,p))}${got?' ✔':''}</span>`};return `<em class="${ok?'ok':''}">${t+1}</em>${cell(0)}${cell(1)}`}).join('')}</div></div>`);
   const bb=$('#bpb');if(bb)bb.onclick=()=>{C.bpBuy();toast('프리미엄 패스 활성 (데모)');renderScreen()};
   {const ba=$('#bpAll');if(ba)ba.onclick=()=>{const sn=resSnap(),b=C.bp(),T=C.bpTier(),O=C._bpRaw||C.bpClaim;let n=0;for(let t=0;t<T;t++){if(O(t,false))n++;if(b.prem&&O(t,true))n++}renderScreen();diffPop(sn,'패스 보상 '+n+'개 수령')}}el.querySelectorAll('.bpc.can').forEach(x=>x.onclick=()=>{const r=C.bpClaim(+x.dataset.bp,x.dataset.pp=='1');if(r){renderScreen()}});return}
 if(k=='skin'){s.skins=s.skins||{base:1};const cur=s.skin||'base';
   el.innerHTML=shell('코스튬','bg_lobby.jpg',`<div class=card style="text-align:center"><img src="${A}${(D.SKINS.find(x=>x.k==cur)||D.SKINS[0]).img}" style="height:150px;filter:drop-shadow(0 6px 6px #000a)"><div class=ttl style="justify-content:center">${(D.SKINS.find(x=>x.k==cur)||D.SKINS[0]).n}</div><small>색상 변형 코스튬 (스텁) · 전투에 즉시 반영</small></div>
   <div class=card><div class=ttl>동료 축제 코스튬</div><div class=skg>${D.CSKINS.map(c=>{const own=(s.cown||{})[c.k],on=(s.cskin||{})[c.k];const nm=(D.COMPS.find(q=>q.k==c.k)||{}).n||c.k;return `<div class="skn ${on?'on':''}" data-cs=${c.k}><img src="${A}${c.img}"><b>${nm}</b><small>${c.n}<br>${on?'착용 중':own?'보유 · 탭하여 착용':'<img class=ci src=assets/it2_gem.png> '+c.cost}</small></div>`}).join('')}</div></div><div class=card><div class=skg>${D.SKINS.map(k2=>{const own=s.skins[k2.k]||k2.k=='base';return `<div class="skn ${cur==k2.k?'on':''}" data-sk=${k2.k}><img src="${A}${k2.img}"><b>${k2.n}</b><small>${cur==k2.k?'착용 중':own?'보유':k2.bp?'패스 20단계':'<img class=ci src=assets/it2_gem.png> '+k2.cost}</small></div>`}).join('')}</div></div>`);
   el.querySelectorAll('[data-cs]').forEach(x=>x.onclick=()=>{const k2=x.dataset.cs,c=D.CSKINS.find(q=>q.k==k2);s.cown=s.cown||{};s.cskin=s.cskin||{};if(!s.cown[k2]){if(s.gems<c.cost){toast('다이아가 부족합니다');return}s.gems-=c.cost;s.cown[k2]=1;s.cskin[k2]=1;toast('축제 코스튬 구매 · 장착')}else{s.cskin[k2]=s.cskin[k2]?0:1;toast(s.cskin[k2]?'코스튬 착용':'기본 복장')}RENDER.applyCskin(s.cskin);save();renderScreen()});el.querySelectorAll('[data-sk]').forEach(x=>x.onclick=()=>{const k2=x.dataset.sk,sk=D.SKINS.find(q=>q.k==k2)||{};s.skins=s.skins||{base:1};if(s.skins[k2]||k2=='base'){C.skinSet(k2);RENDER.skinImg=k2=='base'?null:sk.img;RENDER.skinAtk=sk.atk||null;RENDER.skinCast=sk.cast||null;toast('코스튬 변경');return renderScreen()}const r=C.skinBuy(k2);if(r=='ok'){C.skinSet(k2);RENDER.skinImg=sk.img;RENDER.skinAtk=sk.atk||null;RENDER.skinCast=sk.cast||null;toast('코스튬 구매 · 장착')}else toast(r=='bp'?'패스 20단계 프리미엄 보상':r=='gems'?'다이아가 부족합니다':'');renderScreen()});return}
 if(k=='rank'){const me=Math.round(C.power?C.power():s.lv*500);const N=['붉은마도사','용파참','검은고양이','세일룬공주','라그나블레이드','제피리아','드래곤슬레이어','젤가','마족사냥꾼'];const L=N.map((n,i)=>({n,p:Math.round(me*(2.4-i*.22)),lv:s.lv+12-i}));L.push({n:(G.nick?G.nick():'나')+' (나)',p:me,lv:s.lv,me:1});L.sort((a,b)=>b.p-a.p);
   el.innerHTML=shell('랭킹','bg_lobby.jpg',`<div class=card style="text-align:center"><img src="${A}ic3_podium.png" style="width:90px"><div class=ttl style="justify-content:center">전투력 랭킹 · 시즌 1</div><small>매주 월요일 보상 지급 (프로토타입: 로컬 더미 데이터)</small></div><div class=card>${L.map((x,i)=>`<div class=row style="${x.me?'background:#ffd66a22;border-radius:8px':''}"><b style="width:28px;text-align:center;color:${i<3?'#ffd66a':'#fff'}">${i+1}</b><div class=f><b>${x.n}</b><br><small>Lv.${x.lv}</small></div><b>${fmt(x.p)}</b></div>`).join('')}</div>`)}
 if(k=='settings'){G.set=G.loadSet();const t=(k2,n)=>`<div class=row><div class=f><b>${n}</b></div><span class="tog ${G.set[k2]?'on':''}" data-set=${k2}><i></i></span></div>`;
   el.innerHTML=shell('설정','bg_lobby.jpg',`<div class=card><div class=ttl>게임</div>${t('bgm','배경음')}${t('sfx','효과음')}${t('fx','스킬 연출')}${t('cut','궁극기 컷인')}${t('shake','화면 흔들림')}${t('dmg','데미지 숫자')}<div class=row><div class=f><b>전투 배속</b></div><span class="pill blue" id=spd2>×${G.speed}</span></div></div>
   <div class=card><div class=ttl>계정</div><div class=row><div class=f><b>계정 정보</b><br><small>게스트 · 로컬 저장</small></div></div><div class=row><div class=f><b>쿠폰 입력</b></div><span class="pill blue" id=cpn>입력</span></div><div class=row><div class=f><b>데이터 초기화</b><br><small>모든 진행이 삭제됩니다</small></div><span class="pill red" id=rst>초기화</span></div></div><small style="display:block;text-align:center">슬레이어즈 붉은 마도사전 · 프로토타입 v5</small>`);
   el.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{G.set[b.dataset.set]^=1;G.applySet();renderScreen()});$('#spd2').onclick=()=>{G.speed=G.speed==1?2:1;renderHub();renderScreen()};$('#cpn').onclick=()=>toast('유효하지 않은 쿠폰입니다');$('#rst').onclick=()=>{if(confirm('초기화할까요?'))G.reset()}}
 if(k=='explore'){const st=C.expState(),now=C.now();const avail=Object.keys(s.comps).filter(k2=>!C.expBusy(k2));G.expPick=G.expPick&&avail.includes(G.expPick)?G.expPick:avail[0];
   el.innerHTML=shell('탐험','bg_map.jpg',`<div class=card><div class=ttl>파견 동료 선택 <small>파견 중에도 전투에는 참여합니다</small></div><div class=chips>${avail.length?avail.map(k2=>{const c=D.COMPS.find(x=>x.k==k2);return `<span class="chip ${G.expPick==k2?'on':''}" data-pk=${k2}>${c.n} ★${s.comps[k2]}</span>`}).join(''):'<small>파견 가능한 동료가 없습니다</small>'}</div></div>
   ${D.EXPS.map(E=>{const x=st[E.k],r=C.expReward(E.k);const left=x?Math.max(0,x.end-now):0,done=x&&left<=0,pct=x?100-left/(E.min*600):0;const c=x&&D.COMPS.find(q=>q.k==x.c);
    return `<div class=expc><img class=eimg src="${A}ic3_map.png"><div class=f><b>${E.n}</b><small> · ${E.min>=60?E.min/60+'시간':E.min+'분'}</small><br><small>보상 <img class=ci src=assets/it2_gold.png>${fmt(r.g)} <img class=ci src=assets/it2_gem.png>${r.gem} 📜${r.f}</small>${x?`<div class=bar style="margin-top:4px"><i style="width:${pct}%"></i></div><small>${c?c.n+' 파견 중 · ':''}${done?'완료!':Math.ceil(left/60000)+'분 남음'}</small>`:''}</div>${x?(done?`<span class="pill green" data-cl=${E.k}>받기</span>`:'<span class="pill blue off">진행 중</span>'):`<span class="pill green ${G.expPick?'':'off'}" data-go=${E.k}>출발</span>`}</div>`}).join('')}<small>화룡전의 탐험처럼 동료를 파견하면 시간이 지난 뒤 보상을 받습니다. 성급(★)이 높을수록 골드 보상 증가.</small>`);
   el.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>{G.expPick=b.dataset.pk;renderScreen()});el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{if(C.expSend(b.dataset.go,G.expPick))toast('파견 출발!');renderScreen()});
   el.querySelectorAll('[data-cl]').forEach(b=>b.onclick=()=>{const r=C.expClaim(b.dataset.cl);if(r)modal(`<div class=ttl style="justify-content:center;font-size:18px">탐험 완료!</div><div class=rwgrid><div><img src="${A}ic3_shop.png"><b>${fmt(r.g)}</b><small>골드</small></div><div><img src="${A}ic3_chest.png"><b>${r.gem}</b><small>보석</small></div><div><img src="${A}ic3_relic.png"><b>${r.f}</b><small>바이블 조각</small></div></div>`);renderScreen()})}
 if(k=='party'){const syn=C.synergy();const slot=i=>{const c=s.party[i]&&D.COMPS.find(x=>x.k==s.party[i]);return c?`<div class="fslot full" data-rm=${c.k}><span class=x>✕</span><img src="${A}${c.img}">${c.n}</div>`:`<div class=fslot><span style="margin-bottom:34px;font-size:22px;opacity:.5">＋</span>빈 슬롯</div>`};
  const facCount={};s.party.forEach(k=>{const f=D.COMPS.find(x=>x.k==k).fac;facCount[f]=(facCount[f]||0)+1});
  el.innerHTML=shell('파티 편성','bg_battle.jpg',`<div class=card style="margin-top:4px;text-align:center"><div class=ttl style="justify-content:center">진형 <small style="margin-left:8px">파티 전투력 <b style="color:#ffd77a;font-size:15px">${fmt(C.POW())}</b></small></div>
   <div class=slotrow><div class="fslot full" style="border-color:#ff7a3d"><span class=x style="color:#ffd77a">리더</span><img src="${A}hero_lina.png">리나</div>${[0,1,2,3].map(slot).join('')}</div><small style="display:block;margin-top:6px">카드를 탭해 출전/해제 · 슬롯 ✕로 해제 · 최대 4명</small></div>
   <div class=card><div class=ttl>세력 효과 <small>같은 세력 2명 이상</small></div>${Object.entries(D.FACTIONS).map(([f,F])=>{const n=facCount[f]||0,on=n>=2;return `<div class=row><span class=fac style="color:${F.c};border-color:${F.c}">${F.n}</span><div class=f><small>${n}/2 · ${F.d}</small></div><b style="color:${on?'#6aff8a':'#777'}">${on?'발동':'미발동'}</b></div>`}).join('')}${syn.length?`<small>리나의 세력: <b style="color:${D.FACTIONS[syn[0].f].c}">${D.FACTIONS[syn[0].f].n}</b></small>`:''}</div>
   <div class=card><div class=ttl>세력 상성 <small>우세 시 피해 +25% · 열세 시 -15%</small></div><div class=facwheel><span style="color:#ffd77a">정의</span> ▶ <span style="color:#b07cff">혼돈</span> ▶ <span style="color:#7ad8ff">인간</span> ▶ <span style="color:#ffd77a">정의</span></div><small>현재 적: 고블린·마족 = 혼돈 / 도적 = 인간 · 리나 = 리나의 세력(기본 인간)</small></div><div class=card><div class=ttl>보유 동료 <small>${Object.keys(s.comps).length}/${D.COMPS.length}</small></div>${D.COMPS.map(c=>{const lv=s.comps[c.k],inP=s.party.includes(c.k),F=D.FACTIONS[c.fac],R=D.RAR[c.g];
    return `<div class="rcard ${inP?'in':''}" data-c=${c.k} style="${lv?'':'opacity:.4'}"><img src="${A}${c.img}"><div style="flex:1"><b style="font-size:14px">${c.n}</b> <span class=fac style="color:${R.c};border-color:${R.c}">${R.n}</span> <span class=fac style="color:${F.c};border-color:${F.c}">${F.n}</span><br><span class=stars>${lv?'★'.repeat(Math.min(5,lv))+'☆'.repeat(Math.max(0,5-lv)):''}</span> <small>${lv?'Lv.'+lv+' · 공격 ×'+C.compMul(c.k).toFixed(2):'미보유 · 소환에서 획득'}</small><br><small>${c.d}</small></div>${lv?`<span class="pill blue det" data-det=${c.k} style="min-height:30px;padding:2px 10px;font-size:12px">상세</span>`:''}${inP?'<span class=chip style="background:#2a8a4a">출전</span>':lv?'<span class=chip>대기</span>':''}</div>`}).join('')}</div>`);
  const tog=k=>{if(!s.comps[k])return toast('소환에서 획득하세요');const i=s.party.indexOf(k);if(i>=0)s.party.splice(i,1);else if(s.party.length<4)s.party.push(k);else return toast('최대 4명');C.buildAllies();C.refreshMax();renderScreen()};
  el.querySelectorAll('[data-c]').forEach(c=>c.onclick=e=>{if(e.target.closest('[data-det]'))return compDetail(e.target.closest('[data-det]').dataset.det);tog(c.dataset.c)});el.querySelectorAll('[data-rm]').forEach(c=>c.onclick=()=>tog(c.dataset.rm))}
 const bk=$('#sBack');if(bk)bk.onclick=closeScreen;
}
// ---------- nav
const TABS=[['train','단련','ic3_train.png'],['party','편성','ic3_party.png'],['summon','소환','ic3_summon.png'],['shop','상점','ic3_shop.png'],['base','영지','ic3_castle.png']];
function renderNav(){$('#nav').innerHTML=TABS.map(([k,n,i])=>`<a id=nav${k} class="${(G.tab==k&&!G.screen)||G.screen==k?'on':''}" data-t=${k}><img src="${A}${i}"><em>${n}</em><span class=dot style="display:none"></span></a>`).join('')+`<a id=navroll class=orb data-t=roll><img src="${A}it2_exp.png"><span class=cnt>${fmt(C.S().orbs)}</span></a>`;
  document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>{const t=a.dataset.t;if(t=='roll'){if(G.screen)closeScreen();if(C.S().bag){openSheet('gear');return toast('먼저 장착/판매하세요')}if(!C.rollOnce())return toast('마정구가 부족합니다');if(G.tab!='gear')openSheet('gear');else renderPanel();return}if(['party','shop','base','summon'].includes(t)){if(G.tab!='battle')openSheet('battle');return openScreen(t)}openSheet(t)})}
// ---------- save / loop
function save(){if(G.noSave)return;C.S().last=C.now();localStorage.setItem(KEY,JSON.stringify(C.S()))}
G.loadSet=()=>{if(!G.set){try{G.set=Object.assign({bgm:1,sfx:1,fx:1,cut:1,shake:1,dmg:1},JSON.parse(localStorage.getItem('slayers_set')||'{}'))}catch(e){G.set={bgm:1,sfx:1,fx:1,cut:1,shake:1,dmg:1}}}return G.set};G.applySet=()=>{const s=G.loadSet();localStorage.setItem('slayers_set',JSON.stringify(s));R.opt={cut:!!s.cut,shake:!!s.shake,dmg:!!s.dmg,fx:!!s.fx}};G.applySet();{const sb=C.startBoss;C.startBoss=(...a)=>{const s=C.S();if(!C.B.boss)G._bs={g:s.gold,lv:s.lv,ex:s.exp,st:s.stone||0,t:Date.now(),nm:C.stageName(s.si)};const was=C.B.boss,r=sb(...a);if(!was&&C.B.boss)bossWarn(s.si);return r}}
function bossWarn(i){try{if(G.screen)return;if(G.S&&R.opt&&!R.opt.cut)return;const pl=D.BOSSPLAN[Math.floor(i/7)],b=pl&&D.BOSSES[pl[i%7==6?1:0]];if(!b)return;document.querySelectorAll('.bwarn').forEach(x=>x.remove());const d=document.createElement('div');d.className='bwarn';d.innerHTML=`<div class=bwe></div><div class=bws><i>WARNING</i><i>WARNING</i><i>WARNING</i></div><div class=bwm><img src="assets/${b.img}"><div><small>${i%7==6?'챕터 보스':'보스'} 출현</small><b>${b.n}</b>${b.q?`<em>「${b.q}」</em>`:''}</div></div><div class=bws b2><i>WARNING</i><i>WARNING</i><i>WARNING</i></div>`;document.body.appendChild(d);R.hs=Math.max(R.hs||0,.25);R.ccut=null;R.ccCd=Math.max(R.ccCd||0,2.5);setTimeout(()=>d.classList.add('out'),1500);setTimeout(()=>d.remove(),1900)}catch(e){}}
function resultPop(win){const s=C.S(),b=G._bs||{g:s.gold,st:s.stone||0,nm:''};const dg=Math.max(0,s.gold-b.g),ds=Math.max(0,(s.stone||0)-b.st),sec=b.t?(((b.kt||Date.now())-b.t)/1000):0;document.querySelectorAll('.vic,#battle .banner').forEach(x=>x.remove());if(!win)document.querySelectorAll('.toast').forEach(x=>{if(x.textContent.includes('보스 실패'))x.remove()});const d=document.createElement('div');d.className='vic '+(win?'win':'lose');
 d.innerHTML=win?`<div class=vt>VICTORY</div><div class=vs>${b.nm} 클리어 · ${sec.toFixed(1)}초</div><div class=vr><span><img class=ci src=assets/it2_gold.png> +${fmt(dg)}</span>${ds?`<span><img class=ci src=assets/it2_stone.png> +${ds}</span>`:''}${s.lv>b.lv?`<span class=up>Lv.${s.lv} ▲</span>`:''}</div><div class=vn>다음 스테이지 ▶ ${C.stageName(s.si)}</div>`:`<div class=vt>DEFEAT</div><div class=vs>${b.nm} 보스 실패</div><div class=vn>장비 강화 · 동료 육성 후 자동 재도전</div>`;
 document.body.appendChild(d);d.onclick=()=>d.remove();setTimeout(()=>d.classList.add('out'),2300);setTimeout(()=>d.remove(),2700)}
function chapterCard(c,si){const TAG=['평화로운 가도에 몬스터가 들끓는다','마족의 기운이 숲을 뒤덮었다','붉은 마왕이 기다리는 마지막 성','용암이 끓는 땅, 염제가 깨어났다','영원한 겨울, 얼음 여제의 성채','구름 위의 신전, 마지막 시련'];let _cw=0;const show=()=>{if(document.querySelector('.vic:not(.out)')&&_cw++<60){setTimeout(show,250);return}_cw=0;document.querySelectorAll('.chap').forEach(x=>x.remove());const d=document.createElement('div');d.className='chap';d.style.setProperty('--art',`url(assets/chap/ch${c+1}.jpg)`);d.innerHTML=`<div class=cl></div><div class=cn>CHAPTER ${c+1}</div><div class=ct>${D.CH[c]||''}</div><div class=cs>${TAG[c]||''}</div><div class=cst>${C.stageName(si)}</div><div class=cl></div>`;document.body.appendChild(d);document.body.classList.add('chapon');const rm=()=>{d.remove();if(!document.querySelector('.chap'))document.body.classList.remove('chapon')};d.onclick=rm;setTimeout(()=>d.classList.add('out'),2600);setTimeout(rm,3100)};if(document.querySelector('.vic:not(.out)'))setTimeout(show,2500);else show()}
function idleBurst(g){const bt=$('#idleBtn'),cv=document.querySelector('#battle canvas')||document.querySelector('canvas');if(!bt||!cv||!R.coinBurst)return;const a=bt.getBoundingClientRect(),c=cv.getBoundingClientRect(),x=a.left-c.left+a.width/2,y=a.top-c.top+18;R.coinBurst(x,y,24,'gold');if(g.o)R.coinBurst(x,y,Math.min(8,g.o),'orb');bt.classList.add('pop');setTimeout(()=>bt.classList.remove('pop'),500)}
G.idleBurst=idleBurst;G.chapterCard=chapterCard;G.resultPop=resultPop;G.save=save;G.reset=()=>{G.noSave=1;localStorage.removeItem(KEY);location.reload()};G.open=openScreen;G.close=closeScreen;G.setTab=t=>{if(G.screen)closeScreen();G.tab='battle';openSheet(t)};G.render=renderPanel;
setInterval(save,5000);document.addEventListener('visibilitychange',()=>{if(document.hidden)save()});window.addEventListener('pagehide',save);
function scale(){const s=Math.min(innerWidth/390,innerHeight/844);$('#app').style.transform=`translateX(-50%) scale(${s})`}window.addEventListener('resize',scale);scale();
R.init($('#cv'));{let ci=0;const tick=()=>{$('#chatT').textContent=D.CHAT[ci++%D.CHAT.length]};tick();setInterval(tick,4000);$('#chat').onclick=()=>toast('채팅은 프로토타입에서 지원하지 않습니다')}renderSkills();renderHub();renderNav();updateHud();
const off=C.offline();if(off)setTimeout(()=>offPop(off),300);
function offPop(off){const h=Math.floor(off.sec/3600),mi=Math.floor(off.sec%3600/60),cap=BAL.offCap/3600;const m=document.createElement('div');m.className='modal';m.id='offModal';
m.innerHTML=`<div class="card offc"><div class=ttl style="justify-content:center;font-size:18px">어서 오세요!</div><img src="${A}hero_lina.png" class=offh><small>리나가 <b>${h}시간 ${mi}분</b> 동안 싸웠습니다</small><div class=idlebar><i style="width:${Math.min(100,off.sec/BAL.offCap*100)}%"></i><span>${h}시간 ${mi}분 / ${cap}시간</span></div><div class=offg><div><img src="assets/it2_gold.png"><b>${fmt(off.g)}</b><small>골드</small></div><div><img src="assets/it2_xp.png"><b>${fmt(off.x)}</b><small>경험치</small></div><div><img src="assets/it2_exp.png"><b>${fmt(off.o)}</b><small>마력구</small></div>${off.st?`<div><img src="assets/it2_stone.png"><b>${fmt(off.st)}</b><small>강화석</small></div>`:''}</div><div class=offb><span class="btn" id=offOk>받기</span><span class="btn x2" id=offX2>2배 받기<small><img class=ci src=assets/it2_gem.png> ${C.OFF2}</small></span></div></div>`;
$('#app').appendChild(m);const go=k=>{const s=C.S();if(k==2&&(s.gems||0)<C.OFF2){toast('보석이 부족합니다');return}if(!C.offApply(off,k))return;m.remove();const it=[['it2_gold.png',off.g*k,'골드'],['it2_xp.png',off.x*k,'경험치'],['it2_exp.png',off.o*k,'마력구']];if(off.st)it.push(['it2_stone.png',off.st*k,'강화석']);if(typeof rewardPop=='function')rewardPop(it,(k==2?'2배 보너스!':'방치 보상'));updateHud();renderPanel&&renderPanel()};
m.querySelector('#offOk').onclick=()=>go(1);m.querySelector('#offX2').onclick=()=>go(2)}G.offPop=offPop;
let lastSig='';setInterval(()=>{const s=C.S();if(JSON.stringify(C.spells().map(x=>x.k))!==lockedSig)renderSkills();
  if(G.screen){document.querySelectorAll('#screen .timer[data-end]').forEach(t=>{const r=(+t.dataset.end-C.now())/1000;t.textContent=tfmt(r);if(r<=0)renderScreen()});if(G.screen=='base'){C.bUpdate()}return}
  const ro=$('#navroll');if(ro)ro.lastChild.textContent;if(!['train','mission'].includes(G.tab)||document.querySelector('.modal'))return;const sig=JSON.stringify([G.tab,s.si,s.maxSi,s.wave,B.boss,s.autoBoss,s.lv,Math.floor(s.exp/C.needExp()*20),D.STATS.map(x=>s.gold>=C.cost(x)),s.mp,s.mc,s.party]);if(sig!==lastSig){lastSig=sig;renderPanel()}},1000);
let last=performance.now();
function frame(now){const real=Math.min(.1,(now-last)/1000);last=now;let dt=real*G.speed;if(R.hs>0){R.hs-=real;dt*=.08}R.hsRealDt=real;{const ci=!!((R.cut&&R.cut.t<1.25)||(R.ccut&&R.ccut.t<1));if(ci!==G._ci){G._ci=ci;document.body.classList.toggle('cutin',ci)}}while(dt>0){const st=Math.min(.05,dt);C.tick(st);dt-=st}R.frame(real*G.speed*(R.hs>0?.08:1));if((G._hT=(G._hT||0)+real)>=.1){G._hT=0;updateHud()}requestAnimationFrame(frame)}
(document.fonts?document.fonts.load('700 16px Maplestory').then(()=>document.fonts.ready):Promise.resolve()).catch(()=>{}).then(()=>requestAnimationFrame(frame));

;(()=>{const SEL='.side a,#mgrid a,#nav a,.sk,#autoSp,#idleBtn,.pill,.btn,#bossBtn,.back';let cur=null;
const up=()=>{if(!cur)return;const c=cur;cur=null;c.classList.remove('press');c.classList.add('rel');setTimeout(()=>c.classList.remove('rel'),220)};
document.addEventListener('pointerdown',e=>{const t=e.target.closest(SEL);if(!t)return;cur=t;t.classList.remove('rel');t.classList.add('press');const r=t.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const ring=document.createElement('div');ring.className='fxring';ring.style.left=cx+'px';ring.style.top=cy+'px';document.body.appendChild(ring);setTimeout(()=>ring.remove(),380);for(let i=0;i<5;i++){const sp=document.createElement('div');sp.className='fxsp';const an=i/5*6.283+Math.random()*.4,d=18+Math.random()*22;sp.style.left=cx+'px';sp.style.top=cy+'px';sp.style.setProperty('--dx',Math.cos(an)*d+'px');sp.style.setProperty('--dy',Math.sin(an)*d+'px');document.body.appendChild(sp);setTimeout(()=>sp.remove(),420)}},{passive:true});
['pointerup','pointercancel','pointerleave','blur'].forEach(ev=>document.addEventListener(ev,up,{passive:true}));window.addEventListener('blur',up)})();

function rateInfo(){document.querySelectorAll('.rpop').forEach(x=>x.remove());const r=C.rates(),gs=[4,3,2],d=document.createElement('div');d.className='rpop';d.innerHTML=`<div class=rbox><b class=rt>소환 확률 정보</b>${gs.map(g=>{const L=r.filter(x=>x.g==g),t=L.reduce((a,x)=>a+x.p,0);return `<div class=rg><div class=rh style="color:${D.RAR[g].c}">${D.RAR[g].n||('★'+g)} <span>${t.toFixed(1)}%</span></div>${L.map(x=>{const c=D.COMPS.find(q=>q.k==x.k);return `<div class=rr><img src="assets/${c.img}"><i>${x.n}${x.up?' <em class=rup>UP!</em>':''}</i><span>${x.p.toFixed(2)}%</span></div>`}).join('')}</div>`}).join('')}<small>${C.PITY}회 소환 내 전설 미획득 시 다음 소환 전설 확정 (50% 확률로 「${(D.COMPS.find(c=>c.k==C.RU)||{}).n}」)<br>선택 소환: 마일리지 누적 시 원하는 동료 확정</small><span class="pill blue" id=rClose>닫기</span></div>`;document.body.appendChild(d);d.onclick=e=>{if(e.target==d||e.target.id=='rClose')d.remove()}}

function rewardPop(items,sub){document.querySelectorAll('.rwpop').forEach(x=>x.remove());const d=document.createElement('div');d.className='rwpop';d.innerHTML=`<div class=rwbox><div class=rwrays></div><b class=rwt>보상 획득!</b>${sub?`<small class=rws>${sub}</small>`:''}<div class=rwi>${items.map((it,i)=>`<div class=rwc style="animation-delay:${.18+i*.12}s"><img src="assets/${it[0]}"><b>${typeof it[1]=='number'?fmt(it[1]):it[1]}</b><small>${it[2]}</small></div>`).join('')}</div><span class=rwtap>화면을 터치하여 닫기</span></div>`;document.body.appendChild(d);const close=()=>{d.classList.add('out');setTimeout(()=>d.remove(),220)};setTimeout(()=>d.onclick=close,350);setTimeout(close,4000)}
G.rewardPop=rewardPop;

const RES=[['gold','it2_gold.png','골드'],['gems','it2_gem.png','보석'],['orbs','it2_exp.png','마정구'],['tickets','it2_ticket.png','소환권'],['stone','it2_stone.png','강화석'],['pot','it2_hp.png','회복 물약'],['mpot','it2_mp.png','마나 물약'],['dkey','it3_dungeonkey.png','던전 열쇠'],['gcoin','it3_guildcoin.png','길드 코인'],['atoken','it3_arenatoken.png','투기장 토큰'],['mile','it3_mileagestar.png','마일리지']];
function resSnap(){const s=C.S(),o={};RES.forEach(r=>o[r[0]]=s[r[0]]||0);o._sk=JSON.stringify(s.skins||{});o._tt=C.titlesOwned?C.titlesOwned().map(t=>t.k):[];return o}
function diffPop(o,sub){const s=C.S(),it=[];RES.forEach(r=>{const d=(s[r[0]]||0)-o[r[0]];if(d>0)it.push([r[1],Math.round(d),r[2]])});{const o2=JSON.parse(o._sk);for(const k in (s.skins||{}))if(!o2[k]){const sk=(D.SKINS||[]).find(x=>x.k==k);it.push([sk&&sk.img?sk.img:'skin/lina_summer.png','NEW',sk?sk.n:'코스튬'])}}if(C.titlesOwned)C.titlesOwned().filter(t=>!o._tt.includes(t.k)).forEach(t=>it.push(['ic3_trophy.png','칭호','「'+t.n+'」']));if(it.length)rewardPop(it,sub)}
G.resSnap=resSnap;G.diffPop=diffPop;
C._bpRaw=C.bpClaim;[['claimMission','지령 완료'],['claimW','주간 임무 완료'],['bpClaim','패스 보상'],['gClaimM','협회 임무 완료']].forEach(([f,sub])=>{const o=C[f];if(!o)return;C[f]=(...a)=>{const sn=resSnap(),r=o(...a);if(r)setTimeout(()=>diffPop(sn,sub),0);return r}});

D.ACH=[{k:'kill',n:'몬스터 사냥꾼',d:'몬스터 #마리 처치',ic:'ic3_arena.png',g:[100,500,2000,5000,10000,25000,50000,100000],gem:[20,30,50,80,100,150,200,300]},
{k:'stage',n:'세계 정복',d:'스테이지 #개 돌파',ic:'ic3_map.png',g:[3,7,14,21,28,35,42,49],gem:[30,50,80,100,150,200,250,300]},
{k:'boss',n:'보스 슬레이어',d:'보스 #회 처치',ic:'ic3_relic.png',g:[1,5,15,30,60,100,200],gem:[30,50,80,100,150,200,300]},
{k:'summon',n:'동료 수집가',d:'동료 #회 소환',ic:'ic3_summon.png',g:[10,30,100,200,500,1000],gem:[30,60,100,150,200,300],t:[1,2,3,5,5,10]},
{k:'enh',n:'대장장이',d:'장비 #회 강화',ic:'ic3_anvil.png',g:[5,20,50,100,250,500],gem:[20,40,60,100,150,200],st:[5,10,20,30,50,80]},
{k:'roll',n:'장비 탐구가',d:'장비 #회 뽑기',ic:'ic3_bag.png',g:[30,100,300,1000,3000],gem:[20,40,80,120,200]},
{k:'spell',n:'대마도사',d:'마법 #회 시전',ic:'ic3_settings.png',g:[50,200,1000,3000,10000],gem:[20,40,80,120,200]}];
(()=>{const S0=()=>C.S();const ac=()=>{const s=S0();s.ac=s.ac||{};s.acl=s.acl||{};return s};
const om=C.mAdd;C.mAdd=(k,n=1)=>{const s=ac();s.ac[k]=(s.ac[k]||0)+n;return om(k,n)};
const oe=C.enhance;C.enhance=(...a)=>{const r=oe(...a);if(r&&typeof r!='string'||r===true||r==='ok'){const s=ac();s.ac.enh=(s.ac.enh||0)+1}return r};
C.achVal=k=>{const s=ac();if(k=='stage')return s.maxSi||0;if(k=='kill')return Math.max(s.ac.kill||0,s.kills||0);return s.ac[k]||0};
C.achList=()=>{const s=ac();return D.ACH.map(a=>{const lv=s.acl[a.k]||0,done=lv>=a.g.length,i=Math.min(lv,a.g.length-1),v=C.achVal(a.k);return{k:a.k,n:a.n,d:a.d,ic:a.ic,lv,done,goal:a.g[i],v,gem:a.gem[i],can:!done&&v>=a.g[i]}})};
C.achClaim=k=>{const s=ac(),a=D.ACH.find(x=>x.k==k);const lv=s.acl[k]||0;if(!a||lv>=a.g.length||C.achVal(k)<a.g[lv])return false;s.acl[k]=lv+1;s.gems+=a.gem[lv];if(a.t)s.tickets=(s.tickets||0)+a.t[lv];if(a.st)s.stone=(s.stone||0)+a.st[lv];return true};
C.achScore=()=>{const s=ac();return D.ACH.reduce((t,a)=>t+(s.acl[a.k]||0)*10,0)};})();

D.TITLES=[{k:'t1',n:'견습 마도사',r:1,d:'업적 점수 10 달성',q:()=>C.achScore()>=10,atk:2},
{k:'t2',n:'고블린 학살자',r:1,d:'「몬스터 사냥꾼」 2단계',q:()=>C.achLv('kill')>=2,atk:3},
{k:'t3',n:'보스 헌터',r:2,d:'「보스 슬레이어」 3단계',q:()=>C.achLv('boss')>=3,atk:5},
{k:'t4',n:'떠돌이 용병단장',r:2,d:'「동료 수집가」 2단계',q:()=>C.achLv('summon')>=2,atk:4,gold:5},
{k:'t5',n:'전설의 대장장이',r:2,d:'「대장장이」 3단계',q:()=>C.achLv('enh')>=3,atk:5},
{k:'t6',n:'세이룬의 영웅',r:3,d:'「세계 정복」 3단계',q:()=>C.achLv('stage')>=3,atk:8,gold:10},
{k:'t7',n:'드래곤도 피해가는 자',r:4,d:'업적 점수 200 달성',q:()=>C.achScore()>=200,atk:12,gold:15},
{k:'t8',n:'붉은 마도사',r:5,d:'업적 점수 400 달성',q:()=>C.achScore()>=400,atk:20,gold:20}];
C.achLv=k=>((C.S().acl||{})[k]||0);C.titlesOwned=()=>D.TITLES.filter(t=>t.q());C.titleCur=()=>{const s=C.S();return s.title&&D.TITLES.find(t=>t.k==s.title&&t.q())||null};
{const oa=C.atkPct;C.atkPct=()=>oa()+((C.titleCur()||{}).atk||0)/100;const og=C.addGold;if(og)C.addGold=g=>og(g*(1+((C.titleCur()||{}).gold||0)/100))}
G.titleHud=f=>{const t=C.titleCur(),k=t?t.k:'';if(!f&&G._tk===k)return;G._tk=k;let e=document.getElementById('hTitle');if(!e){e=document.createElement('span');e.id='hTitle';const hn=document.getElementById('hName');hn.parentNode.insertBefore(e,hn.nextSibling);e.onclick=ev=>{ev.stopPropagation();openScreen('title')}}e.className='tbadge sm r'+(t?t.r:0);e.textContent=t?t.n:'';e.style.display=t?'':'none'};
setInterval(()=>G.titleHud(),1000);
{const oc=C.achClaim;C.achClaim=k=>{const before=C.titlesOwned().map(t=>t.k),r=oc(k);if(r){const nw=C.titlesOwned().filter(t=>!before.includes(t.k));G._newT=(G._newT||0)+nw.length}return r}}

Object.assign(C.ev,{wbStart:()=>{document.body.classList.add('wbon');banner&&0;const d=document.createElement('div');d.className='bwarn';d.innerHTML=`<div class=bwe style="box-shadow:inset 0 0 60px 18px rgba(140,40,255,.75)"></div><div class=bws><i>WORLD BOSS</i><i>WORLD BOSS</i><i>WORLD BOSS</i></div><div class=bwm><img src="assets/${C.WB.img}" style="height:80px"><div><small>월드 보스 출현</small><b>${C.WB.n}</b><em>「심연에서 깨어난 나를… 막을 수 있겠느냐.」</em></div></div><div class="bws b2"><i>WORLD BOSS</i><i>WORLD BOSS</i><i>WORLD BOSS</i></div>`;document.body.appendChild(d);setTimeout(()=>d.classList.add('out'),1500);setTimeout(()=>d.remove(),1900)},
wbEnd:r=>{document.body.classList.remove('wbon');const T=C.WB.tiers,g=r.ti>=0?T[r.ti][0]:'-',L=C.wbRank(),rk=L.findIndex(x=>x.me)+1;const it=[];if(r.rw.gems)it.push(['it2_gem.png',r.rw.gems,'보석']);if(r.rw.gold)it.push(['it2_gold.png',r.rw.gold,'골드']);if(r.rw.stone)it.push(['it2_stone.png',r.rw.stone,'강화석']);if(r.rw.tickets)it.push(['it2_ticket.png',r.rw.tickets,'소환권']);rewardPop(it,`${r.ti>=0?g+'등급':'등급 미달'} · 피해 ${fmt(r.d)} · 오늘 ${rk}위`);const b=document.querySelector('.rwpop .rwt');if(b)b.innerHTML=r.ti>=0?`<span class=wbg>${g}</span> 토벌 종료!`:'토벌 종료!'}});
document.addEventListener('click',ev=>{if(ev.target&&ev.target.id=='goRoll'){$('#screen').classList.remove('on');G.screen=null;openSheet('gear')}});
// ---- new-player guide
(()=>{const ST=[
 {k:'gear',t:'장비를 뽑아 장착해 보세요!',gift:s=>{s.orbs=Math.max(s.orbs||0,3)},done:s=>Object.values(s.gear||{}).some(Boolean),tg:[['#eq','장착하면 전투력 UP!'],['#roll','마정구로 장비 뽑기!'],['#sidegear','장비를 눌러 보세요']]},
 {k:'summon',t:'동료를 소환해 파티를 키워요!',gift:s=>{s.tickets=Math.max(s.tickets||0,1)},done:s=>(s.ac&&s.ac.summon>=1),tg:[['#su1','소환권으로 1회 소환!'],['#navsummon','소환을 눌러 보세요']]},
 {k:'enh',t:'장비를 강화해 더 강해져요!',gift:s=>{s.stone=Math.max(s.stone||0,5);s.gold=Math.max(s.gold||0,2000)},done:s=>G._enTry||(s.ac&&s.ac.enh>=1),tg:[['#enGo','강화 버튼을 눌러 보세요!'],['#sideenhance','강화를 눌러 보세요']]}];
const vis=el=>{if(!el)return null;const r=el.getBoundingClientRect();if(r.width<4||r.height<4||r.bottom<0||r.top>innerHeight)return null;const cx=r.left+r.width/2,cy=r.top+r.height/2,h=document.elementFromPoint(cx,cy);if(!h||!(el===h||el.contains(h)||h.closest('.tut')))return null;let a=el;while(a&&a!==document.body){const cs=getComputedStyle(a);if(+cs.opacity<.2||cs.visibility=='hidden')return null;a=a.parentElement}return r};
let ov=null;const ensure=()=>{if(ov)return ov;ov=document.createElement('div');ov.className='tut';ov.innerHTML='<div class=tarr>▼</div><div class=tbub><b></b><small></small></div><div class=tring></div><span class=tskip>가이드 건너뛰기</span>';document.body.appendChild(ov);ov.querySelector('.tskip').onclick=()=>{C.S().tut=99;ov.style.display='none'};return ov};
G.tutTick=()=>{const s=C.S();if(s.tut==null)s.tut=(s.kills||0)>150?99:0;if(s.tut>=ST.length){if(ov)ov.style.display='none';return}
 const st=ST[s.tut];if(!s.tutG||s.tutG<=s.tut){st.gift(s);s.tutG=s.tut+1}
 if(st.done(s)){s.tut++;if(ov)ov.style.display='none';if(s.tut>=ST.length){s.gems+=100;setTimeout(()=>rewardPop([['it2_gem.png',100,'보석']],'신입 마도사 가이드 완료!'),400)}else toast('가이드 '+s.tut+'/'+ST.length+' 완료!');return}
 if(document.querySelector('.rwpop,.vic:not(.out),.bwarn,.chap,#sumModal')||document.body.classList.contains('cutin')||document.body.classList.contains('wbon')){if(ov)ov.style.display='none';return}
 let r=null,tx='';for(const [sel,t] of st.tg){r=vis(document.querySelector(sel));if(r){tx=t;break}}
 const o=ensure();if(!r){o.style.display='none';return}o.style.display='';const up=r.top>innerHeight*.55,a=o.querySelector('.tarr'),bb=o.querySelector('.tbub'),rg=o.querySelector('.tring');
 const ax=r.left+r.width/2;a.textContent=up?'▼':'▲';a.style.left=ax+'px';a.style.top=(up?r.top-30:r.bottom+2)+'px';rg.style.cssText=`left:${r.left-4}px;top:${r.top-4}px;width:${r.width+8}px;height:${r.height+8}px`;
 bb.querySelector('b').textContent=st.t;bb.querySelector('small').textContent=`(${s.tut+1}/${ST.length}) `+tx;const bw=210,bx=Math.max(8,Math.min(innerWidth-bw-8,ax-bw/2));bb.style.left=bx+'px';bb.style.top=(up?r.top-30-58:r.bottom+30)+'px'};
setInterval(()=>{try{G.tutTick()}catch(e){}},200);
document.addEventListener('click',ev=>{if(ev.target&&ev.target.id=='enGo')G._enTry=1},true);})();

(()=>{const b=document.getElementById('battle');const d=document.createElement('div');d.id='bctl';d.innerHTML='<span id=bAutoSk>AUTO</span><span id=bSpd>×2</span>';b.appendChild(d);
const sync=()=>{const s=C.S();d.querySelector('#bAutoSk').classList.toggle('on',!!s.autoSpell);const sp=d.querySelector('#bSpd');sp.classList.toggle('on',G.speed==2);sp.textContent=G.speed==2?'×2':'×1'};
const s0=C.S();if(s0.spd==2)G.speed=2;
d.querySelector('#bAutoSk').onclick=()=>{const s=C.S();s.autoSpell=!s.autoSpell;toast(s.autoSpell?'스킬 자동 사용 ON':'스킬 자동 사용 OFF');renderSkills();sync()};
d.querySelector('#bSpd').onclick=()=>{const s=C.S();G.speed=G.speed==2?1:2;s.spd=G.speed;toast('전투 속도 ×'+G.speed);renderHub&&renderHub();sync()};
setInterval(()=>{const s=C.S();if((s.spd||1)!==G.speed)s.spd=G.speed;sync()},400);sync()})();

;const DUNI={gold:['황금 광산','대량의 골드','it2_gold.png','#ffd25a','bg_mine.jpg'],exp:['마도 도서관','대량의 경험치','it2_xp.png','#7ad8ff','bg_library.jpg'],stone:['강철 대장간','강화석','it2_stone.png','#c8d2dc','bg_forge.jpg'],frag:['고대 유적','클레어 바이블 조각','ic3_relic.png','#b07cff','bg_ruins.jpg']};
function dunItems(r){const a=[];if(r.g)a.push(['it2_gold.png',r.g,'골드']);if(r.x)a.push(['it2_xp.png',r.x,'경험치']);if(r.st)a.push(['it2_stone.png',r.st,'강화석']);if(r.f)a.push(['ic3_relic.png',r.f,'바이블 조각']);if(r.gem)a.push(['it2_gem.png',r.gem,'첫 클리어']);return a}
function dunScreen(el,s){const d=C.dunDaily();G.dunK=G.dunK||'gold';const k=G.dunK,I=DUNI[k],pw=C.POW(),cl=d.clr[k]||0;
 const tabs=`<div class=duntabs>${C.DUN.keys.map(x=>`<span class="${x==k?'on':''}" data-dk=${x} style="--dc:${DUNI[x][3]}"><img src="assets/${DUNI[x][2]}"><b>${DUNI[x][0]}</b><small>${d.t[x]}/${C.DUN.tries}</small></span>`).join('')}</div>`;
 const head=`<div class="card dunh" style="--dc:${I[3]};background-image:linear-gradient(90deg,#000c,#0006),url(${A}${I[4]})"><b>${I[0]}</b><small>${I[1]} · 하루 ${C.DUN.tries}회 · 첫 클리어 후 소탕 가능</small><div class=dunleft>남은 입장 <b>${d.t[k]}/${C.DUN.tries}</b> · 내 전투력 <b>${fmt(pw)}</b></div></div>`;
 const rows=C.DUN.tiers.map((T,i)=>{const r=C.dunRew(k,i),ok=pw>=T.req,lock=i>0&&cl<i,done=cl>i;const rw=dunItems(r).map(a=>`<i><img src="assets/${a[0]}">${fmt(a[1])}</i>`).join('');
  return `<div class="duntr ${lock?'lock':''} ${done?'done':''}"><div class=dtn><b>${T.n}</b><small class="${ok?'up':'down'}">권장 ${fmt(T.req)}</small></div><div class=dtr>${rw}${!done&&!lock?'<i class=fc><img src="assets/it2_gem.png">50 첫</i>':''}</div><div class=dtb>${lock?'<span class="pill off">🔒 잠김</span>':done?`<span class="pill gold ${d.t[k]>0?'':'off'}" data-sw=${i}>소탕</span>`:`<span class="pill green ${d.t[k]>0?'':'off'}" data-ch=${i}>도전</span>`}</div></div>`}).join('');
 el.innerHTML=shell('일일 던전','bg_dungeon.jpg',tabs+head+`<div class=duntl>${rows}</div>`);
 el.querySelectorAll('[data-dk]').forEach(b=>b.onclick=()=>{G.dunK=b.dataset.dk;renderScreen()});
 const after=(r,sub)=>{s.dstat=(s.dstat||0)+1;updateHud();renderScreen();rewardPop(dunItems(r),sub)};
 el.querySelectorAll('[data-sw]').forEach(b=>b.onclick=()=>{const t=+b.dataset.sw,r=C.dunSweep(k,t);if(r.err)return toast(r.err=='tries'?'오늘 입장 횟수를 모두 사용했습니다':'먼저 클리어하세요');after(r,I[0]+' '+C.DUN.tiers[t].n+' 소탕 완료')});
 el.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{const t=+b.dataset.ch,T=C.DUN.tiers[t];if(!(d.t[k]>0))return toast('오늘 입장 횟수를 모두 사용했습니다');
  G.rbRun({kind:'dun',k,t,req:T.req,title:I[0]+' · '+T.n},won=>{const r=won?G.rbForce(()=>C.dunTry(k,t)):{fail:1};if(r.fail){updateHud();return modal(`<div class=ttl style="justify-content:center;font-size:18px;color:#ff7a6a">도전 실패</div><small>권장 전투력 ${fmt(T.req)} · 내 전투력 ${fmt(C.POW())}<br>입장 횟수는 차감되지 않았습니다.<br>장비 강화·동료 육성 후 다시 도전하세요!</small>`)}if(r.err)return toast('도전 불가');after(r,(r.first?'첫 클리어! 이제 소탕 가능 · ':'')+I[0]+' '+T.n)})})}
;(()=>{const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='map'){const el=document.querySelector('#screen');if(el&&!el.querySelector('#mapDun')){const b=document.createElement('span');b.id='mapDun';b.innerHTML=`<img src="${A}ic4/gate.png">일일 던전${G.BD&&G.BD.dungeon?'<i class=dot></i>':''}`;b.onclick=()=>openScreen('dungeon');el.appendChild(b)}}}catch(e){}return r}})();

;(()=>{const RI={gold:'it2_gold.png',orbs:'it2_exp.png',stone:'it2_stone.png',tickets:'it2_ticket.png',pot:'it2_hp.png',mpot:'it2_mp.png',dkey:'it3_dungeonkey.png',gems:'it2_gem.png'},RN={gold:'골드',orbs:'마정구',stone:'강화석',tickets:'소환권',pot:'회복 물약',mpot:'마나 물약',dkey:'던전 열쇠',gems:'보석'};
const left=()=>{const s=Math.max(0,Math.floor((C.nextReset()-C.now())/1000));return String(Math.floor(s/3600)).padStart(2,'0')+':'+String(Math.floor(s%3600/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
function dealHtml(){const d=C.deals(),s=C.S();return `<div class="card deals"><div class=ttl>일일 특가 <small class=dtim>⏱ <b id=dealT>${left()}</b> 후 갱신</small></div><div class=dgrid>${d.it.map((x,i)=>{const it=C.DEALS.find(z=>z.k==x.k),p=C.dealPrice(x),base=C.dealBase(it),cant=x.b||(it.cur=='gems'?s.gems<p:s.gold<p),ci=it.cur=='gems'?'it2_gem.png':'it2_gold.png';return `<div class="dcell ${x.b?'sold':''}"><i class=doff>-${Math.round(x.off*100)}%</i><img src="${A}${it.img}"><b>${it.n}</b><s><img class=ci src=assets/${ci}>${fmt(base)}</s><span class="btn ${cant?'off':''}" data-deal=${i}>${x.b?'구매 완료':`<img class=ci src=assets/${ci}> ${fmt(p)}`}</span></div>`}).join('')}</div><span class="pill ${d.ref>=C.DEAL_REFMAX||s.gems<C.DEAL_REF?'off':''} dref" id=dealRef>↻ 새로고침 <img class=ci src=assets/it2_gem.png> ${C.DEAL_REF} (${C.DEAL_REFMAX-d.ref}/${C.DEAL_REFMAX})</span></div>`}
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='shop'){const sb=document.querySelector('#screen .sbody');if(sb&&!sb.querySelector('.deals')){sb.insertAdjacentHTML('afterbegin',dealHtml());
 sb.querySelectorAll('[data-deal]').forEach(b=>b.onclick=()=>{const r=C.dealBuy(+b.dataset.deal);if(typeof r=='string')return toast(r=='sold'?'이미 구매했습니다':r=='gems'?'보석이 부족합니다':'골드가 부족합니다');updateHud();renderScreen();rewardPop(Object.entries(r).map(([k,v])=>[RI[k],v,RN[k]]),'일일 특가 구매 완료')});
 sb.querySelector('#dealRef').onclick=()=>{const r=C.dealRefresh();if(r!==true)return toast(r=='max'?'오늘 새로고침 횟수를 모두 사용했습니다':'보석이 부족합니다');toast('특가 상품이 갱신되었습니다');updateHud();renderScreen()}}}}catch(e){console.warn(e)}return r};
setInterval(()=>{const t=document.getElementById('dealT');if(t){t.textContent=left();if(C.S().deal&&C.S().deal.day!==C.today()&&G.screen=='shop')renderScreen()}},1000)})();
;(()=>{// v11 guild: 출석 · 버프 · 상점
const GB=[{k:'atk',n:'공격 강화',ic:'ic3_anvil.png',per:2,u:'공격력'},{k:'hp',n:'수호 결계',ic:'ic3_guild.png',per:3,u:'체력'},{k:'gold',n:'황금 축복',ic:'it2_gold.png',per:3,u:'골드 획득'}];
const GS=[{k:'gs_stone',n:'강화석 ×10',img:'it2_stone.png',p:30,lim:3,give:{stone:10}},{k:'gs_orb',n:'마정구 ×10',img:'it2_exp.png',p:25,lim:3,give:{orbs:10}},{k:'gs_tk',n:'동료 소환권',img:'it2_ticket.png',p:120,lim:1,give:{tickets:1}},{k:'gs_key',n:'던전 열쇠',img:'it3_dungeonkey.png',p:40,lim:2,give:{dkey:1}},{k:'gs_gem',n:'보석 ×50',img:'it2_gem.png',p:60,lim:1,give:{gems:50}},{k:'gs_pot',n:'회복 물약 ×5',img:'it2_hp.png',p:10,lim:5,give:{pot:5}}];
const RN={stone:'강화석',orbs:'마정구',tickets:'소환권',dkey:'던전 열쇠',gems:'보석',pot:'회복 물약',gold:'골드',gcoin:'협회 코인'},RI={stone:'it2_stone.png',orbs:'it2_exp.png',tickets:'it2_ticket.png',dkey:'it3_dungeonkey.png',gems:'it2_gem.png',pot:'it2_hp.png',gold:'it2_gold.png',gcoin:'it3_guildcoin.png'};
const gd=()=>{const s=C.S();s.gx=s.gx||{buf:{atk:0,hp:0,gold:0}};const x=s.gx;if(x.day!==C.today()){x.day=C.today();x.att=0;x.buy={}}return x};
const cap=()=>(C.S().guild.lv||1)*2,bcost=l=>10+l*8;
C.gAttend=()=>{const s=C.S(),x=gd();if(!s.gj||x.att)return null;x.att=1;const r={gcoin:5+s.guild.lv,gold:Math.floor(C.goldKill(s.maxSi||0)*80)};s.gcoin=(s.gcoin||0)+r.gcoin;C.addGold(r.gold);s.guild.exp+=10;while(s.guild.exp>=100*s.guild.lv){s.guild.exp-=100*s.guild.lv;s.guild.lv++}return r};
C.gBufUp=k=>{const s=C.S(),x=gd(),l=x.buf[k]||0;if(l>=cap())return 'cap';const c=bcost(l);if((s.gcoin||0)<c)return 'coin';s.gcoin-=c;x.buf[k]=l+1;C.refreshMax&&C.refreshMax();return true};
C.gBuf=k=>{const x=(C.S().gx||{buf:{}});return ((x.buf||{})[k]||0)*GB.find(b=>b.k==k).per/100};
C.gBuy=k=>{const s=C.S(),x=gd(),it=GS.find(z=>z.k==k);if(!it)return 'x';if((x.buy[k]||0)>=it.lim)return 'lim';if((s.gcoin||0)<it.p)return 'coin';s.gcoin-=it.p;x.buy[k]=(x.buy[k]||0)+1;for(const q in it.give)s[q]=(s[q]||0)+it.give[q];return it.give};
{const oa=C.atkPct;C.atkPct=()=>oa()+C.gBuf('atk');const oh=C.MAXHP;C.MAXHP=()=>oh()*(1+C.gBuf('hp'));const og=C.addGold;C.addGold=g=>og(g*(1+C.gBuf('gold')))}
G.gRed=()=>{const s=C.S();if(!s.gj)return false;const x=gd();return !x.att||!s.guild.don.gold&&s.gold>=C.donateCost('gold')};
function html(){const s=C.S(),x=gd(),c=s.gcoin||0;return `<div class="card gx"><div class=ttl>협회 출석 <small>매일 05:00 초기화</small></div><div class=gatt><img src="${A}ic3_calendar.png"><div class=f><b>${x.att?'오늘 출석 완료!':'오늘 출석하고 보상 받기'}</b><small><img class=ci src=assets/it3_guildcoin.png> ${5+s.guild.lv} · <img class=ci src=assets/it2_gold.png> ${fmt(Math.floor(C.goldKill(s.maxSi||0)*80))} · 협회 경험치 +10</small></div><span class="btn ${x.att?'off':'g'}" id=gAtt>${x.att?'완료':'출석'}</span></div></div>
<div class="card gx"><div class=ttl>협회 버프 <small>최대 Lv.${cap()} (협회 Lv×2) · 보유 <img class=ci src=assets/it3_guildcoin.png> ${c}</small></div>${GB.map(b=>{const l=x.buf[b.k]||0,mx=l>=cap(),co=bcost(l);return `<div class=gbr><img src="${A}${b.ic}"><div class=f><b>${b.n} <i>Lv.${l}</i></b><small>${b.u} +${l*b.per}% → <span class=up>+${(l+1)*b.per}%</span></small><div class=bar><i style="width:${l/cap()*100}%"></i></div></div><span class="btn ${mx||c<co?'off':''}" data-gb=${b.k}>${mx?'MAX':`<img class=ci src=assets/it3_guildcoin.png> ${co}`}</span></div>`}).join('')}</div>
<div class="card gx"><div class=ttl>협회 상점 <small>일일 한도 · 05:00 초기화</small></div><div class=gsg>${GS.map(it=>{const b=x.buy[it.k]||0,so=b>=it.lim;return `<div class="gsc ${so?'sold':''}"><img src="${A}${it.img}"><b>${it.n}</b><small>${b}/${it.lim}</small><span class="btn ${so||c<it.p?'off':''}" data-gs=${it.k}>${so?'완료':`<img class=ci src=assets/it3_guildcoin.png> ${it.p}`}</span></div>`}).join('')}</div></div>`}
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='guild'&&C.S().gj){const sb=document.querySelector('#screen .sbody');if(sb&&!sb.querySelector('.gx')){const f=sb.querySelector('.card');f.insertAdjacentHTML('afterend',html());
 const pop=(g,sub)=>rewardPop(Object.entries(g).map(([k,v])=>[RI[k],v,RN[k]]),sub);
 sb.querySelector('#gAtt').onclick=()=>{const r=C.gAttend();if(!r)return toast('오늘 이미 출석했습니다');updateHud();renderScreen();pop(r,'협회 출석 보상')};
 sb.querySelectorAll('[data-gb]').forEach(b=>b.onclick=()=>{const r=C.gBufUp(b.dataset.gb);if(r!==true)return toast(r=='cap'?'협회 레벨을 올려 한도를 늘리세요':'협회 코인이 부족합니다');toast('협회 버프 강화!');updateHud();renderScreen()});
 sb.querySelectorAll('[data-gs]').forEach(b=>b.onclick=()=>{const r=C.gBuy(b.dataset.gs);if(typeof r=='string')return toast(r=='lim'?'오늘 구매 한도 도달':'협회 코인이 부족합니다');updateHud();renderScreen();pop(r,'협회 상점 구매')})}}}catch(e){console.warn(e)}return r};
})();

;function arenaReplay(r,re){let sd=r.seed||1;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;const L=r.party||['hero_lina.png'],R=r.o.party||[r.o.img];
 const m=document.createElement('div');m.className='modal arep';m.innerHTML=`<div class=arbox><div class=arhd><b>${re?'다시보기 · ':''}비무대회</b><small>${fmt(r.my||C.POW())} vs ${fmt(r.o.pow)}</small></div>
 <div class=arfield><div class="arside l">${L.map((im,i)=>`<div class=aru data-u=l${i}><img src="${A}${im}"><i class=hp><i></i></i></div>`).join('')}</div><b class=arvs>VS</b><div class="arside r">${R.map((im,i)=>`<div class=aru data-u=r${i}><img src="${A}${im}"><i class=hp><i></i></i></div>`).join('')}</div></div>
 <div class=arnames><span>나 (리나 파티)</span><span>${r.o.n}</span></div><div class=arlog></div><span class="btn p" id=arSkip>건너뛰기 ▶▶</span></div>`;$('#app').appendChild(m);
 const hp={};[...L.map((_,i)=>'l'+i),...R.map((_,i)=>'r'+i)].forEach(k=>hp[k]=1);const lose=r.win?'r':'l',win=r.win?'l':'r';const N=10;let step=0,done=false;
 const setHp=k=>{const u=m.querySelector(`[data-u=${k}]`);if(!u)return;u.querySelector('.hp i').style.width=Math.max(0,hp[k]*100)+'%';if(hp[k]<=0)u.classList.add('dead')};
 const tick=()=>{if(done)return;step++;const side=step%2?'l':'r',tgt=side=='l'?'r':'l';const al=Object.keys(hp).filter(k=>k[0]==side&&hp[k]>0),tl=Object.keys(hp).filter(k=>k[0]==tgt&&hp[k]>0);if(!al.length||!tl.length)return fin();
  const a=al[Math.floor(rn()*al.length)],t=tl[Math.floor(rn()*tl.length)],last=step>=N;let dm=tgt==lose?.22+rn()*.2:.08+rn()*.1;if(last&&tgt==lose)dm=9;if(tgt==win)dm=Math.min(dm,hp[t]-.05);
  const au=m.querySelector(`[data-u=${a}]`),tu=m.querySelector(`[data-u=${t}]`);au.classList.add('atk');setTimeout(()=>au.classList.remove('atk'),250);hp[t]=Math.max(0,hp[t]-dm);setHp(t);tu.classList.add('hit');setTimeout(()=>tu.classList.remove('hit'),250);
  const d=document.createElement('b');d.className='ardmg'+(dm>.3?' cr':'');d.textContent=fmt(Math.round(dm*r.o.pow*.35));tu.appendChild(d);setTimeout(()=>d.remove(),700);
  if(last&&tgt==lose){Object.keys(hp).filter(k=>k[0]==lose).forEach(k=>{hp[k]=0;setHp(k)});return setTimeout(fin,500)}G._arT=setTimeout(tick,420)};
 const fin=()=>{if(done)return;done=true;clearTimeout(G._arT);Object.keys(hp).filter(k=>k[0]==lose).forEach(k=>{hp[k]=0;setHp(k)});const bx=m.querySelector('.arbox');m.querySelector('#arSkip').remove();
  bx.insertAdjacentHTML('beforeend',`<div class="arres ${r.win?'w':'l'}"><b>${r.win?'승리!':'패배…'}</b><small>${re?'지난 전투 기록':`점수 ${r.d>0?'+':''}${r.d} · <img class=ci src=assets/it2_gem.png> +${r.gem} · ${C.league().n} 리그 ${C.S().arena.pts}점`}</small><span class="btn wide" id=arOk>확인</span></div>`);bx.querySelector('#arOk').onclick=()=>{m.remove();if(G.screen=='arena')renderScreen()}};
 m.querySelector('#arSkip').onclick=fin;setTimeout(tick,600)}
G.arenaReplay=arenaReplay;
;(()=>{const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='arena'){const sb=document.querySelector('#screen .sbody'),lg=C.S().arena.log||[];if(sb&&!sb.querySelector('.arlogc')){const cards=sb.querySelectorAll('.card'),ref=cards[a2(cards)];ref.insertAdjacentHTML('afterend',`<div class="card arlogc"><div class=ttl>최근 전적 <small>최근 5경기 · 다시보기</small></div>${lg.length?lg.map((x,i)=>`<div class="row arl ${x.win?'w':'l'}"><b class=arwl>${x.win?'승':'패'}</b><div class=apt>${(x.o.party||[x.o.img]).map(im=>`<img src="${A}${im}">`).join('')}</div><div class=f><b>${x.o.n}</b><br><small>전투력 ${fmt(x.o.pow)} · 점수 ${x.d>0?'+':''}${x.d}</small></div><span class="btn p" data-rp=${i}>▶ 다시보기</span></div>`).join(''):'<small>아직 전적이 없습니다</small>'}</div>`);sb.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>arenaReplay(lg[+b.dataset.rp],true))}}}catch(e){console.warn(e)}return r};function a2(cs){for(let i=0;i<cs.length;i++)if(cs[i].querySelector('[data-f]'))return i;return 0}})();

;(()=>{// v12 무한의 탑
const MOB=D.BOSSES.map(b=>b.img);
const T={req:f=>Math.floor(350*Math.pow(1.13,f-1)),rew:f=>{const s=C.S(),r={g:Math.floor(C.goldKill(Math.min(s.maxSi||0,f))*30*(1+f*.05)),st:1+Math.floor(f/5)};if(f%10==0){r.gem=100+f*2;if(f%30==0)r.tk=1}else if(f%5==0)r.gem=30;return r},mob:f=>MOB[(f-1)%MOB.length],boss:f=>f%10==0};
C.tower=()=>{const s=C.S();s.tw=s.tw||{f:0,day:'',dc:0};return s.tw};
C.towerTry=()=>{const t=C.tower(),f=t.f+1;if(C.POW()<T.req(f))return{fail:1,f};t.f=f;const r=T.rew(f);C.addGold(r.g);const s=C.S();s.stone=(s.stone||0)+r.st;if(r.gem)s.gems+=r.gem;if(r.tk)s.tickets=(s.tickets||0)+1;r.f=f;return r};
C.towerDaily=()=>{const t=C.tower();if(t.day===C.today()||t.f<1)return null;t.day=C.today();const s=C.S(),r={g:Math.floor(C.goldKill(s.maxSi||0)*20*t.f),st:Math.max(1,Math.floor(t.f/3))};C.addGold(r.g);s.stone=(s.stone||0)+r.st;return r};
C.T=T;
const items=r=>{const a=[['it2_gold.png',r.g,'골드'],['it2_stone.png',r.st,'강화석']];if(r.gem)a.push(['it2_gem.png',r.gem,'보석']);if(r.tk)a.push(['it2_ticket.png',1,'소환권']);return a};
function scr(el){const t=C.tower(),s=C.S(),pw=C.POW(),cur=t.f+1,dr=t.day!==C.today()&&t.f>0;
 const fl=[cur+3,cur+2,cur+1,cur,cur-1,cur-2].filter(f=>f>0).map(f=>{const st=f<cur?'done':f==cur?'cur':'up',rq=T.req(f),r=T.rew(f);return `<div class="twf ${st} ${T.boss(f)?'boss':''}"><b class=twn>${f}F</b><img src="${A}${T.mob(f)}"><div class=f><small class="${pw>=rq?'up':'down'}">권장 ${fmt(rq)}</small><div class=twr>${items(r).map(a=>`<i><img src="assets/${a[0]}">${fmt(a[1])}</i>`).join('')}</div></div>${st=='done'?'<span class=twok>✔</span>':st=='cur'?`<span class="pill ${pw>=rq?'green':'twhard'}" id=twGo>도전</span>`:'<span class=twlk>🔒</span>'}</div>`}).join('');
 el.innerHTML=shell('무한의 탑','bg_tower.jpg',`<div class="card twh"><img src="${A}ic4/crown.png"><div class=f><b>최고 ${t.f}층</b><small>내 전투력 ${fmt(pw)} · 10층마다 보스 · 실패해도 손실 없음</small></div></div>
 <div class="card twd"><div class=f><b>일일 탑 보상</b><small>최고층 기준 · 매일 05:00</small></div><span class="btn ${dr?'g':'off'}" id=twD>${dr?'받기':t.f<1?'1층 클리어 필요':'수령 완료'}</span></div><div class=twl>${fl}</div>`);
 const go=el.querySelector('#twGo');if(go)go.onclick=()=>{const f=cur;G.rbRun({kind:'tw',f,boss:T.boss(f),mob:T.mob(f),req:T.req(f),title:'무한의 탑 '+f+'층'},won=>{const r=won?G.rbForce(()=>C.towerTry()):{fail:1,f};updateHud();renderScreen();if(r.fail)return modal(`<div class=ttl style="justify-content:center;font-size:18px;color:#ff7a6a">${f}층 도전 실패</div><small>권장 전투력 ${fmt(T.req(f))} · 내 전투력 ${fmt(C.POW())}<br>성장 후 다시 도전하세요!</small>`);rewardPop(items(r),`무한의 탑 ${r.f}층 돌파!`)})};
 el.querySelector('#twD').onclick=()=>{const r=C.towerDaily();if(!r)return;updateHud();renderScreen();rewardPop(items(r),'일일 탑 보상')}}
const rs0=renderScreen;renderScreen=function(){if(G.screen=='tower'){const el=$('#screen');scr(el);const b=el.querySelector('#sBack');if(b)b.onclick=()=>closeScreen();return}return rs0.apply(this,arguments)};
G.towerRed=()=>{const t=C.tower();return (t.day!==C.today()&&t.f>0)||C.POW()>=T.req(t.f+1)};
setInterval(()=>{try{const d=document.querySelector('#mgrid a[data-s=tower] .dot');if(d)d.style.display=G.towerRed()?'':'none'}catch(e){}},1000)})();

;(()=>{// v13 승급 screen
const stars=(n,a)=>`<span class=stv>${'★'.repeat(Math.min(n,6))}<i>${'☆'.repeat(Math.max(0,6-n))}</i></span>${a?`<span class=awv>${'◆'.repeat(a)}</span>`:''}`;
function scr(el){const s=C.S();G.stSel=G.stSel&&s.comps[G.stSel]?G.stSel:(D.COMPS.find(x=>s.comps[x.k])||{}).k;const own=D.COMPS.filter(x=>s.comps[x.k]).sort((a,b)=>b.g-a.g);const k=G.stSel,c=D.COMPS.find(x=>x.k==k);
 const red=x=>{const st=s.comps[x.k],sh=(s.csh||{})[x.k]||0;return st<C.STARMAX?sh>=C.starCost(x.k):((s.caw||{})[x.k]||0)<C.AWMAX&&sh>=C.awCost(x.k).sh};
 const list=`<div class=stlist>${own.map(x=>`<div class="stc ${x.k==k?'on':''}" data-st=${x.k} style="--rc:${D.RAR[x.g].c}"><img src="${A}${x.img}"><small>★${s.comps[x.k]}${(s.caw||{})[x.k]?'+'+(s.caw||{})[x.k]:''}</small>${red(x)?'<i class=dot></i>':''}</div>`).join('')}</div>`;
 let det='<div class=card><small>보유한 동료가 없습니다. 소환에서 동료를 모으세요!</small></div>';
 if(c){const st=s.comps[k],aw=(s.caw||{})[k]||0,sh=(s.csh||{})[k]||0,mx=st>=C.STARMAX,need=mx?C.awCost(k).sh:C.starCost(k),m0=C.compMul(k),m1=mx?m0/(1+.15*aw)*(1+.15*(aw+1)):m0/(1+.1*(st-1))*(1+.1*st),awMax=aw>=C.AWMAX;
  det=`<div class="card sthero" style="--rc:${D.RAR[c.g].c}"><img src="${A}${c.img}" class=${aw?'awk':''}><div class=f><b>${c.n} <span class=fac style="color:${D.RAR[c.g].c};border-color:${D.RAR[c.g].c}">${D.RAR[c.g].n}</span></b>${stars(st,aw)}<small>공격 배율 ×${m0.toFixed(2)}${awMax?'':` → <i class=up>×${m1.toFixed(2)}</i>`}</small><small>${mx?'최대 승급 달성 · 각성으로 추가 강화 (◆ 최대 3)':'중복 소환 시 조각 획득 · 승급마다 공격 +10% · 체력 +10%'}</small></div></div>
  <div class=card><div class=ttl>${mx?'각성':'승급'} <small>조각 ${sh}/${need}</small></div><div class=bar style="height:10px"><i style="width:${Math.min(100,sh/need*100)}%"></i></div>
  ${awMax?'<span class="pill off wide" style="margin-top:8px">각성 완료</span>':mx?`<span class="pill gold wide ${sh>=need&&s.gold>=C.awCost(k).g?'':'off'}" id=stAw style="margin-top:8px">◆ 각성 · 조각 ${need} · <img class=ci src=assets/it2_gold.png>${fmt(C.awCost(k).g)}</span>`:`<span class="pill green wide ${sh>=need?'':'off'}" id=stUp style="margin-top:8px">★ 승급 (★${st} → ★${st+1}) · 조각 ${need}</span>`}
  <small style="display:block;margin-top:6px;opacity:.75">조각 획득: 희귀 5 · 영웅 10 · 전설 20 (중복 1회당)</small></div>`}
 el.innerHTML=shell('동료 승급','bg_lobby.jpg',list+det);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{G.stSel=b.dataset.st;renderScreen()});
 const fx=t=>{const h=el.querySelector('.sthero');if(h){h.classList.remove('stfx');void h.offsetWidth;h.classList.add('stfx')}toast(t)};
 const u=el.querySelector('#stUp');if(u)u.onclick=()=>{const r=C.starUp(k);if(r!='ok')return toast(r=='max'?'최대 승급':'조각이 부족합니다');updateHud();renderScreen();fx(`${c.n} ★${C.S().comps[k]} 승급!`)};
 const a=el.querySelector('#stAw');if(a)a.onclick=()=>{const r=C.awake(k);if(r!='ok')return toast(r=='gold'?'골드가 부족합니다':r=='sh'?'조각이 부족합니다':'각성 불가');updateHud();renderScreen();fx(`${c.n} 각성 ◆${C.S().caw[k]}!`)}}
const rs0=renderScreen;renderScreen=function(){if(G.screen=='star'){scr($('#screen'));return}return rs0.apply(this,arguments)};
setInterval(()=>{try{const d=document.querySelector('#mgrid a[data-s=star] .dot');if(d)d.style.display=C.starRed()?'':'none'}catch(e){}},1000)})();

;(()=>{// v14 펫
const PETS=[{k:'slime',n:'말랑 슬라임',img:'pet/slime.png',st:'gold',per:3,g:2},{k:'mush',n:'버섯 꼬마',img:'pet/mush.png',st:'hp',per:3,g:2},{k:'bat',n:'밤그림자 박쥐',img:'pet/bat.png',st:'atk',per:2,g:3},{k:'imp',n:'장난꾸러기 임프',img:'pet/imp.png',st:'atk',per:2.5,g:3},{k:'wolf',n:'은빛 늑대',img:'pet/wolf.png',st:'atk',per:3,g:4},{k:'golem',n:'수호 골렘',img:'pet/golem.png',st:'hp',per:5,g:4}];
const SN={atk:'공격력',hp:'체력',gold:'골드 획득'},PMAX=20,PW={2:60,3:30,4:10};C.PETS=PETS;
const P=()=>{const s=C.S();s.pet=s.pet||{own:{},eq:null,egg:0,gift:0};return s.pet};
const lvC=l=>Math.floor(800*Math.pow(1.45,l-1));
C.petB=st=>{const p=P();let v=0;for(const x of PETS){const l=p.own[x.k];if(!l||x.st!==st)continue;v+=x.per*l*(p.eq==x.k?1:.2)}return v/100};
C.petHatch=()=>{const p=P(),s=C.S();if(p.egg<1){if(s.gems<300)return null;s.gems-=300}else p.egg--;const tot=PETS.reduce((a,x)=>a+PW[x.g],0);let r=C.rand()*tot,x=PETS[0];for(const q of PETS){r-=PW[q.g];if(r<=0){x=q;break}}const nw=!p.own[x.k];if(nw)p.own[x.k]=1;else p.own[x.k]=Math.min(PMAX,p.own[x.k]+1);if(!p.eq)p.eq=x.k;C.refreshMax&&C.refreshMax();return{x,nw}};
C.petUp=k=>{const p=P(),s=C.S(),l=p.own[k];if(!l)return 'none';if(l>=PMAX)return 'max';const c=lvC(l);if(s.gold<c)return 'gold';s.gold-=c;p.own[k]=l+1;C.refreshMax&&C.refreshMax();return 'ok'};
C.petEq=k=>{const p=P();if(!p.own[k])return false;p.eq=k;C.refreshMax&&C.refreshMax();return true};
{const oa=C.atkPct;C.atkPct=()=>oa()+C.petB('atk');const oh=C.MAXHP;C.MAXHP=()=>oh()*(1+C.petB('hp'));const og=C.addGold;C.addGold=g=>og(g*(1+C.petB('gold')))}
{const ot=C.towerTry;if(ot)C.towerTry=()=>{const r=ot();if(r&&!r.fail&&r.f%5==0){P().egg++;r.egg=1}return r}}
// battle render: active pet floats beside Lina
{const of=R.frame;const cv=()=>document.querySelector('#battle canvas');const im={};R.frame=dt=>{of(dt);try{const p=C.S().pet;if(!p||!p.eq||G.screen)return;const x=PETS.find(q=>q.k==p.eq),L=R._AS().get('lina');const c=cv();if(!x||!L||!c)return;let I=im[x.img];if(!I){I=im[x.img]=new Image();I.src=A+x.img}if(!I.complete||!I.naturalWidth)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,t=performance.now()/1000,f=L.face>=0?1:-1,h=38,w=h*I.naturalWidth/I.naturalHeight,px=Math.max(66,L.x-f*62),py=L.y-4+Math.sin(t*3.2)*4;
 ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.globalAlpha=.35;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(px,L.y+2,16,5,0,0,6.283);ctx.fill();ctx.globalAlpha=1;ctx.translate(px,py);if(f<0)ctx.scale(-1,1);ctx.drawImage(I,-w/2,-h,w,h);ctx.restore()}catch(e){}}}
function scr(el){const p=P(),s=C.S();if(!p.gift){p.gift=1;p.egg+=1}
 const cards=PETS.map(x=>{const l=p.own[x.k],eq=p.eq==x.k;return `<div class="ptc ${l?'':'lock'} ${eq?'pton':''}" data-pk=${x.k} style="--rc:${D.RAR[x.g].c}"><img src="${A}${x.img}"><b>${x.n}</b><small>${l?`Lv.${l} · ${SN[x.st]} +${(x.per*l).toFixed(1).replace('.0','')}%`:'미보유'}</small>${eq?'<i class=pteq>장착</i>':''}</div>`}).join('');
 G.ptSel=G.ptSel||p.eq||PETS[0].k;const x=PETS.find(q=>q.k==G.ptSel),l=p.own[x.k]||0,eq=p.eq==x.k;
 const det=`<div class="card ptd" style="--rc:${D.RAR[x.g].c}"><img src="${A}${x.img}" class=${l?'':'lock'}><div class=f><b>${x.n} <span class=fac style="color:${D.RAR[x.g].c};border-color:${D.RAR[x.g].c}">${D.RAR[x.g].n}</span></b><small>${l?`Lv.${l}/${PMAX} · ${SN[x.st]} +${(x.per*l).toFixed(1).replace('.0','')}% (장착 시 100% · 미장착 20%)`:'알을 부화해 획득하세요'}</small>
 ${l?`<div class=ptb><span class="pill ${eq?'off':'green'}" id=ptEq>${eq?'장착 중':'장착'}</span><span class="pill gold ${l>=PMAX||s.gold<lvC(l)?'off':''}" id=ptUp>${l>=PMAX?'MAX':`Lv↑ <img class=ci src=assets/it2_gold.png>${fmt(lvC(l))}`}</span></div>`:''}</div></div>`;
 el.innerHTML=shell('펫','bg_f_meadow.jpg',`<div class="card pth"><div class=f><b>펫 부화</b><small>보유 알 ${p.egg}개 · 무한의 탑 5층마다 알 1개 · 중복 시 레벨 +1</small></div><span class="pill gold ${p.egg<1&&s.gems<300?'off':''}" id=ptHatch>${p.egg>0?'🥚 알 부화':'<img class=ci src=assets/it2_gem.png> 300 부화'}</span></div>
 <div class=card><div class=ttl>펫 보너스 <small>공격 +${(C.petB('atk')*100).toFixed(1)}% · 체력 +${(C.petB('hp')*100).toFixed(1)}% · 골드 +${(C.petB('gold')*100).toFixed(1)}%</small></div><div class=ptg>${cards}</div></div>${det}`);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>{G.ptSel=b.dataset.pk;renderScreen()});
 el.querySelector('#ptHatch').onclick=()=>{const r=C.petHatch();if(!r)return toast('보석이 부족합니다');G.ptSel=r.x.k;updateHud();renderScreen();const m=document.createElement('div');m.className='modal pthm';m.innerHTML=`<div class=card><div class=egg>🥚</div><img src="${A}${r.x.img}" class=pthi><div class=ttl style="justify-content:center;font-size:19px">${r.x.n}</div><small>${r.nw?'<b class=up>NEW!</b> 새로운 펫 획득':'중복 · 레벨 +1'}</small><span class="btn wide" style="margin-top:10px">확인</span></div>`;m.onclick=e=>{if(e.target.closest('.btn')||e.target==m)m.remove()};$('#app').appendChild(m)};
 const e1=el.querySelector('#ptEq');if(e1)e1.onclick=()=>{if(C.petEq(x.k)){toast(x.n+' 장착!');updateHud();renderScreen()}};
 const u1=el.querySelector('#ptUp');if(u1)u1.onclick=()=>{const r=C.petUp(x.k);if(r!='ok')return toast(r=='gold'?'골드가 부족합니다':'최대 레벨');updateHud();renderScreen()}}
const rs0=renderScreen;renderScreen=function(){if(G.screen=='pet'){scr($('#screen'));return}return rs0.apply(this,arguments)};
setInterval(()=>{try{const p=P(),d=document.querySelector('#mgrid a[data-s=pet] .dot');if(d)d.style.display=(p.egg>0||!p.gift)?'':'none'}catch(e){}},1000)})();
;(()=>{// v15 도감 2.0: 등록 보상 · 인연 세트 · 별 합계
const SETS=[{k:'s1',n:'슬레이어즈 일행',m:['gourry','zelgadis','amelia'],atk:5},{k:'s2',n:'수상한 신관',m:['xellos','zelgadis'],atk:4},{k:'s3',n:'빛의 수호자',m:['amelia','sera','kaede'],hp:6},{k:'s4',n:'모험가 길드',m:['borin','pip','lyra'],gold:5},{k:'s5',n:'용의 피',m:['rhea','xellos','kaede'],atk:6,hp:4},{k:'s6',n:'펫 친구들',pet:['slime','mush','bat','imp','wolf','golem'],hp:8}];
const STM=[{n:10,atk:2},{n:20,hp:4},{n:30,atk:4},{n:45,atk:6,hp:6}];
const RW={c:30,m:10,p:20};
const cx=()=>{const s=C.S();s.cdx=s.cdx||{c:{},m:{},p:{}};return s.cdx};
const has=(t,k)=>{const s=C.S();return t=='c'?!!s.comps[k]:t=='m'?!!(s.seen||{})[(D.MONS.find(x=>x.k==k)||{}).img]:!!((s.pet||{}).own||{})[k]};
const setOk=x=>(x.m||[]).every(k=>C.S().comps[k])&&(x.pet||[]).every(k=>has('p',k));
const totSt=()=>Object.values(C.S().comps).reduce((a,v)=>a+(v||0),0);
C.cdxB=st=>{let v=0;SETS.forEach(x=>{if(setOk(x))v+=x[st]||0});const t=totSt();STM.forEach(m=>{if(t>=m.n)v+=m[st]||0});return v/100};
C.cdxPend=()=>{const d=cx();let n=0;D.COMPS.forEach(c=>{if(has('c',c.k)&&!d.c[c.k])n++});D.MONS.forEach(m=>{if(has('m',m.k)&&!d.m[m.k])n++});(C.PETS||[]).forEach(p=>{if(has('p',p.k)&&!d.p[p.k])n++});return n};
C.cdxReg=(t,k)=>{const d=cx();if(!has(t,k)||d[t][k])return 0;d[t][k]=1;C.S().gems+=RW[t];return RW[t]};
C.cdxRegAll=()=>{let g=0;D.COMPS.forEach(c=>g+=C.cdxReg('c',c.k));D.MONS.forEach(m=>g+=C.cdxReg('m',m.k));(C.PETS||[]).forEach(p=>g+=C.cdxReg('p',p.k));return g};
{const oa=C.atkPct;C.atkPct=()=>oa()+C.cdxB('atk');const oh=C.MAXHP;C.MAXHP=()=>oh()*(1+C.cdxB('hp'));const og=C.addGold;C.addGold=g=>og(g*(1+C.cdxB('gold')))}
function scr(el){const s=C.S(),d=cx(),cb=C.codexB();G.cdT=G.cdT||'c';const T=G.cdT,pend=C.cdxPend();
 const tabs=`<div class=entabs>${[['c','동료'],['m','몬스터'],['p','펫'],['s','인연']].map(([k,n])=>`<span class="${T==k?'on':''}" data-ct=${k}>${n}${k!='s'&&(k=='c'?D.COMPS:k=='m'?D.MONS:C.PETS||[]).some(x=>has(k,x.k)&&!d[k][x.k])?'<i class=dot></i>':''}</span>`).join('')}</div>`;
 const sum=`<div class="card cdsum"><div class=f><b>도감 보너스</b><small>공격력 +${Math.round((cb.atk+C.cdxB('atk'))*100)}% · 체력 +${Math.round((cb.hp+C.cdxB('hp'))*100)}% · 골드 +${Math.round(C.cdxB('gold')*100)}%</small></div><span class="pill gold ${pend?'':'off'}" id=cdAll>${pend?`모두 등록 (${pend})`:'등록 완료'}</span></div>`;
 const cell=(t,x,img,sub)=>{const o=has(t,x.k),r=d[t][x.k];return `<div class="bi cdc ${o?'':'lock'} ${o&&!r?'new':''}" data-cr="${t}:${x.k}"><img src="${A}${img}"><b>${o?x.n:'???'}</b><small>${sub}</small>${o&&!r?`<i class=cdrw><img class=ci src=assets/it2_gem.png>${RW[t]}</i>`:''}</div>`};
 let body='';
 if(T=='c')body=`<div class=card><div class=ttl>동료 ${cb.n}/${D.COMPS.length} <small>별 합계 ${totSt()}</small></div><div class=bagg>${D.COMPS.map(c=>cell('c',c,c.img,has('c',c.k)?'★'.repeat(Math.min(6,s.comps[c.k])):D.RAR[c.g].n)).join('')}</div></div><div class=card><div class=ttl>별 합계 보너스</div>${STM.map(m=>{const ok=totSt()>=m.n;return `<div class=row style="${ok?'':'opacity:.55'}"><div class=f><b>★ ${m.n}</b> <small>${m.atk?`공격력 +${m.atk}% `:''}${m.hp?`체력 +${m.hp}%`:''}</small><div class=bar style="margin-top:4px"><i style="width:${Math.min(1,totSt()/m.n)*100}%"></i></div></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':totSt()+'/'+m.n}</span></div>`}).join('')}</div>`;
 if(T=='m')body=`<div class=card><div class=ttl>몬스터 ${cb.seen}/${D.MONS.length}</div><div class=bagg>${D.MONS.map(m=>cell('m',m,m.img,'')).join('')}</div></div><div class=card><div class=ttl>수집 보너스</div>${D.CODEX.map(b=>{const v=b.t=='c'?cb.n:cb.seen,ok=v>=b.need;return `<div class=row style="${ok?'':'opacity:.55'}"><div class=f><b>${b.n}</b> <small>${b.atk?`공격력 +${b.atk*100}% `:''}${b.hp?`체력 +${b.hp*100}%`:''}</small></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':Math.min(v,b.need)+'/'+b.need}</span></div>`}).join('')}</div>`;
 if(T=='p')body=`<div class=card><div class=ttl>펫 ${(C.PETS||[]).filter(p=>has('p',p.k)).length}/${(C.PETS||[]).length}</div><div class=bagg>${(C.PETS||[]).map(p=>cell('p',p,p.img,has('p',p.k)?'Lv.'+s.pet.own[p.k]:'')).join('')}</div></div>`;
 if(T=='s')body=SETS.map(x=>{const ok=setOk(x),mem=[...(x.m||[]).map(k=>{const c=D.COMPS.find(q=>q.k==k);return [c.img,has('c',k)]}),...(x.pet||[]).map(k=>{const p=(C.PETS||[]).find(q=>q.k==k);return [p.img,has('p',k)]})];return `<div class="card cdset ${ok?'ok':''}"><div class=ttl>${x.n} <small class="${ok?'up':''}">${x.atk?`공격력 +${x.atk}% `:''}${x.hp?`체력 +${x.hp}% `:''}${x.gold?`골드 +${x.gold}%`:''}${ok?' · 적용 중':''}</small></div><div class=cdm>${mem.map(([im,o])=>`<img src="${A}${im}" class="${o?'':'lock'}">`).join('')}</div></div>`}).join('');
 el.innerHTML=shell('도감','bg_lobby.jpg',sum+tabs+body);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-ct]').forEach(b=>b.onclick=()=>{G.cdT=b.dataset.ct;renderScreen()});
 el.querySelectorAll('[data-cr]').forEach(b=>b.onclick=()=>{const [t,k]=b.dataset.cr.split(':');const g=C.cdxReg(t,k);if(g){updateHud();renderScreen();rewardPop([['it2_gem.png',g,'보석']],'도감 등록')}});
 el.querySelector('#cdAll').onclick=()=>{const g=C.cdxRegAll();if(!g)return;updateHud();renderScreen();rewardPop([['it2_gem.png',g,'보석']],'도감 일괄 등록')}}
const rs0=renderScreen;renderScreen=function(){if(G.screen=='codex'){scr($('#screen'));return}return rs0.apply(this,arguments)};
setInterval(()=>{try{const on=C.cdxPend()>0;const d=document.querySelector('#mgrid a[data-s=codex] .dot');if(d)d.style.display=on?'':'none'}catch(e){}},1000)})();
;(()=>{// v16 status VFX + icons
const COL={burn:'#ff8a2a',frz:'#7ad8ff',stun:'#ffe14a',psn:'#7ae05a'},EMO={burn:'🔥',frz:'❄️',stun:'💫',psn:'☠️'},IM={};
G.ST_ART=true;const icon=k=>{if(!G.ST_ART)return {};let i=IM[k];if(!i){i=IM[k]=new Image();i.onerror=()=>{i.bad=1};i.src='assets/st/'+k+'.png'}return i};
const FT=[];C.ev.status=(e,k)=>{const s=R._ES().get(e);if(s)FT.push({x:s.x,y:s.y-(e.boss?100:80)*(e.sc||1)-20,t:0,txt:C.STS[k].n+'!',c:COL[k],big:1})};
const oh=C.ev.hit;C.ev.hit=(e,d,cr)=>{if(C._dot){const s=R._ES().get(e);if(s)FT.push({x:s.x+(Math.random()*24-12),y:s.y-40,t:0,txt:fmt(Math.round(d)),c:COL[C._dot]});return}oh(e,d,cr)};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(const [e,s] of R._ES()){if(!e.st||e.hp<=0)continue;const ks=Object.keys(e.st);if(!ks.length)continue;const h=(e.boss?100:80)*(e.sc||1)*(e.el?1.28:1)*(e.wb?1.8:1),x=s.x,y=s.y;
  if(e.st.frz){ctx.globalAlpha=.32;ctx.fillStyle='#9fe6ff';ctx.beginPath();ctx.ellipse(x,y-h*.48,h*.36,h*.52,0,0,6.283);ctx.fill();ctx.globalAlpha=.85;ctx.strokeStyle='#e8fbff';ctx.lineWidth=1.5;for(let i=0;i<5;i++){const a=i*1.256+.3,r=h*.34;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r*.5,y-h*.48+Math.sin(a)*r*.7);ctx.lineTo(x+Math.cos(a)*r,y-h*.48+Math.sin(a)*r*1.3);ctx.stroke()}}
  if(e.st.burn){for(let i=0;i<5;i++){const p=(T*1.6+i/5)%1,px=x+Math.sin(i*2.1+T*3)*h*.22,py=y-h*.15-p*h*.7;ctx.globalAlpha=(1-p)*.85;ctx.fillStyle=p<.4?'#ffe27a':'#ff6a1a';ctx.beginPath();ctx.arc(px,py,4+(1-p)*4,0,6.283);ctx.fill()}}
  if(e.st.psn){for(let i=0;i<4;i++){const p=(T*1.1+i/4)%1,px=x+Math.cos(i*1.7)*h*.25,py=y-h*.3-p*h*.6;ctx.globalAlpha=(1-p)*.8;ctx.strokeStyle='#8af06a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,3+p*4,0,6.283);ctx.stroke()}}
  if(e.st.stun){ctx.globalAlpha=1;ctx.fillStyle='#ffe14a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';for(let i=0;i<3;i++){const a=T*5+i*2.094;ctx.fillText('★',x+Math.cos(a)*h*.28,y-h-4+Math.sin(a)*5)}}
  ctx.globalAlpha=1;const bw=18,x0=x-(ks.length*bw)/2+bw/2,iy=y-h-(e.boss?44:34);ks.forEach((k,i)=>{const ix=x0+i*bw,I=icon(k);ctx.fillStyle='#000a';ctx.beginPath();ctx.arc(ix,iy,9,0,6.283);ctx.fill();ctx.strokeStyle=COL[k];ctx.lineWidth=1.5;ctx.stroke();if(I.complete&&I.naturalWidth&&!I.bad)ctx.drawImage(I,ix-8,iy-8,16,16);else{ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(EMO[k],ix,iy+1);ctx.textBaseline='alphabetic'}
   const st=e.st[k],mx=C.STS[k].t*(e.boss?.5:1);ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(ix,iy,10.5,-1.571,-1.571+6.283*Math.max(0,Math.min(1,st.t/mx)));ctx.stroke()})}
 for(let i=FT.length-1;i>=0;i--){const f=FT[i];f.t+=dt;if(f.t>.9){FT.splice(i,1);continue}ctx.globalAlpha=1-Math.max(0,f.t-.5)/.4;ctx.font=(f.big?'900 16px':'800 13px')+' Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#000';const yy=f.y-f.t*30;ctx.strokeText(f.txt,f.x,yy);ctx.fillStyle=f.c;ctx.fillText(f.txt,f.x,yy)}
 ctx.restore()}catch(err){}}})();
;(()=>{// v17 break gauge + crit juice
const FT2=[];
C.ev.grog=e=>{R.hs=Math.max(R.hs||0,.35);const s=R._ES().get(e);FT2.push({t:0,x:s?s.x:200,y:s?s.y-120:300});if(!R.opt||R.opt.fx){const f=document.createElement('div');f.className='bkflash grogfl';document.body.appendChild(f);setTimeout(()=>f.remove(),120)}(!G.screen)&&toast('<b style="color:#ffd25a">그로기!</b> 보스가 무력화되었습니다 · 피해 +50%')};
C.ev.grogEnd=()=>{};
{const oh=C.ev.hit;C.ev.hit=(e,d,cr)=>{oh(e,d,cr);if(cr&&!C._dot&&e&&(e.boss||Math.random()<.35)){R.hs=Math.max(R.hs||0,e.boss?.07:.04)}}}
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const bo=C.alive().find(e=>e.boss&&!e.wb);const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 if(bo){const y=196+30,x0=78,w=W-156,g=bo.grog>0;ctx.fillStyle='rgba(10,0,8,.75)';ctx.beginPath();ctx.roundRect(x0-2,y-2,w+4,10,5);ctx.fill();const v=g?bo.grog/C.BRK.dur:Math.min(1,bo.brk||0);const gr=ctx.createLinearGradient(x0,0,x0+w,0);if(g){gr.addColorStop(0,'#ff4a3a');gr.addColorStop(1,'#ffd25a')}else{gr.addColorStop(0,'#c08a10');gr.addColorStop(1,'#ffe27a')}ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(x0,y,Math.max(2,w*v),6,3);ctx.fill();
  ctx.font='900 10px Maplestory,sans-serif';ctx.textAlign='left';ctx.lineWidth=3;ctx.strokeStyle='#000';const lb=g?'그로기!':'브레이크';ctx.strokeText(lb,x0,y+18);ctx.fillStyle=g?'#ff8a6a':'#ffe08a';ctx.fillText(lb,x0,y+18);
  if(g){const s=R._ES().get(bo);if(s){ctx.globalAlpha=.25+.15*Math.sin(T*10);ctx.fillStyle='#ffd25a';ctx.beginPath();ctx.ellipse(s.x,s.y-2,60,16,0,0,6.283);ctx.fill();ctx.globalAlpha=1}}}
 for(let i=FT2.length-1;i>=0;i--){const f=FT2[i];f.t+=dt;if(f.t>1.3){FT2.splice(i,1);continue}const k=Math.min(1,f.t/.15),a=f.t>1?1-(f.t-1)/.3:1;ctx.globalAlpha=a;ctx.save();ctx.translate(Math.min(W-80,Math.max(80,f.x)),f.y);ctx.scale(2-k,2-k);ctx.font='italic 900 34px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=6;ctx.strokeStyle='#3a0a00';ctx.strokeText('BREAK!',0,0);const g2=ctx.createLinearGradient(0,-30,0,4);g2.addColorStop(0,'#fff6c8');g2.addColorStop(.55,'#ffc23a');g2.addColorStop(1,'#d05a10');ctx.fillStyle=g2;ctx.fillText('BREAK!',0,0);ctx.restore()}
 ctx.restore()}catch(err){}}})();
;(()=>{// v18 telegraph VFX + dodge
let Z=null,FL=0;const TX=[];
const party=()=>{const L=[...R._AS().values()];if(!L.length)return null;const al=C.aliveAllies().map(a=>R._AS().get(a.k)).filter(Boolean);const A=al.length?al:L;let wx=0,wy=0;A.forEach(s=>{wx+=s.wx;wy+=s.wy});return{wx:wx/A.length,wy:wy/A.length}};
C.ev.tele=e=>{const p=party();if(!p)return;Z={wx:p.wx,wy:p.wy,t0:performance.now()};if(e&&!G.screen)toast('<b style="color:#ff6a5a">⚠ 강력한 공격!</b> 붉은 영역을 피하세요');};
C.ev.teleCancel=(e,stun)=>{Z=null;if(stun){const s=e&&R._ES().get(e);if(s)TX.push({x:s.x,y:s.y-130,t:0,txt:'공격 저지!',c:'#7ad8ff'})}};
C.ev.teleHit=(e,res)=>{const z=Z;Z=null;FL=.35;R.hs=Math.max(R.hs||0,.12);res.forEach(([a,d])=>{const s=R._AS().get(a.k);if(!s)return;if(!d){const dy=(z&&s.wy<z.wy?-1:1)*70;s.wy+=dy;s.wx-=20;TX.push({x:s.x,y:s.y-90,t:0,txt:'회피!',c:'#9ef'})}else{s.hitT=0;s.shk=8}})};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,H=c.clientHeight;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 const ref=R._AS().get('lina')||[...R._AS().values()][0];
 if(Z&&C.B.tele&&ref){const ox=ref.x-ref.wx,oy=ref.y-ref.wy,x=Z.wx+ox,y=Z.wy+oy,tl=C.B.tele,k=1-tl.t/tl.T,T=performance.now()/1000,rx=118,ry=58;
  ctx.globalAlpha=.18+.1*Math.sin(T*14);ctx.fillStyle='#ff2a1a';ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,6.283);ctx.fill();
  ctx.globalAlpha=.55;ctx.fillStyle='#ff3a2a';ctx.beginPath();ctx.ellipse(x,y,rx*k,ry*k,0,0,6.283);ctx.fill();
  ctx.globalAlpha=1;ctx.strokeStyle='#ff5a3a';ctx.lineWidth=3;ctx.setLineDash([10,6]);ctx.lineDashOffset=-T*40;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,6.283);ctx.stroke();ctx.setLineDash([]);
  const bs=R._ES().get(tl.e);if(bs){const by=bs.y-150+Math.sin(T*12)*3;ctx.font='900 30px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle='#300';ctx.strokeText('!',bs.x,by);ctx.fillStyle='#ff4a3a';ctx.fillText('!',bs.x,by);ctx.globalAlpha=.6;ctx.strokeStyle='#ff4a3a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bs.x,bs.y-40);ctx.lineTo(x,y);ctx.stroke();ctx.globalAlpha=1}}
 if(FL>0){FL-=dt;ctx.globalAlpha=Math.max(0,FL/.35)*.45;ctx.fillStyle='#ff2a1a';ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
 for(let i=TX.length-1;i>=0;i--){const f=TX[i];f.t+=dt;if(f.t>1){TX.splice(i,1);continue}ctx.globalAlpha=1-Math.max(0,f.t-.6)/.4;ctx.font='900 16px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#002';const yy=f.y-f.t*26;ctx.strokeText(f.txt,f.x,yy);ctx.fillStyle=f.c;ctx.fillText(f.txt,f.x,yy)}
 ctx.restore()}catch(err){}}})();
;(()=>{// v19 ally chain/combo skills (연계기)
const NAMES={'gourry+zelgadis':'쌍검 연격','amelia+sera':'성광 합창','lyra+pip':'그림자 저격','xellos+zelgadis':'아스트랄 붕괴','borin+gourry':'대지 가르기','kaede+rhea':'용화 일섬'};
const COL={gourry:'#ffd25a',zelgadis:'#b07cff',amelia:'#fff0a0',sera:'#ffe6ff',lyra:'#7af07a',pip:'#9a7aff',xellos:'#a050ff',borin:'#ff9a4a',kaede:'#ff7aa0',rhea:'#ff5a3a'};
const STK={lyra:'stun',pip:'psn',zelgadis:'frz',rhea:'burn',xellos:'stun',kaede:'stun',gourry:'stun',borin:'stun',sera:'burn',amelia:'burn'};
let last=null,cd=0,RING=null;G.comboN=0;
const nm=(a,b)=>NAMES[[a,b].sort().join('+')]||'합동 공격';
const fire=(a,b)=>{const A=D.COMPS.find(x=>x.k==a),Bc=D.COMPS.find(x=>x.k==b);if(!A||!Bc)return;cd=8;G.comboN++;const L=C.alive();if(!L.length)return;
 R.hs=Math.max(R.hs||0,.18);const n=nm(a,b);
 const d=document.createElement('div');d.className='combo';d.innerHTML=`<img class=cl src="${A0}${A.img}"><div class=cm><small>연계기</small><b>${n}</b><i>${A.n} × ${Bc.n}</i></div><img class=cr src="${A0}${Bc.img}">`;$('#battle').appendChild(d);setTimeout(()=>d.remove(),1500);
 setTimeout(()=>{const LL=C.alive();const es=LL.map(e=>R._ES().get(e)).filter(Boolean);const cx=es.reduce((s,q)=>s+q.x,0)/(es.length||1),cy=es.reduce((s,q)=>s+q.y,0)/(es.length||1);RING={x:cx,y:cy,t:0,c1:COL[a]||'#fff',c2:COL[b]||'#ffd25a'};
  const mul=(C.compMul(a)+C.compMul(b))*1.6;C._combo=1;setTimeout(()=>C._combo=0,0);LL.forEach(e=>{const cr=Math.random()<.5;C.hitEnemy(e,C.ATK()*mul*(cr?2:1),cr);if(e.hp>0){C.stApply(e,STK[a]||'burn');if(STK[b]!==STK[a])C.stApply(e,STK[b]||'stun')}})},450)};
const A0=A;const oc=R.csk;R.csk=(k,s,force)=>{const r=oc(k,s,force);if(r&&!G.screen){const now=performance.now()/1000;if(!force&&!(R.ccut&&R.ccut.t<1.1)&&cd<=0&&last&&last.k!==k&&now-last.t<1.6&&C.alive().length){fire(last.k,k);last=null}else last={k,t:now}}return r};
const of=R.frame;R.frame=dt=>{cd=Math.max(0,cd-dt);of(dt);try{if(!RING||G.screen)return;const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;RING.t+=dt;const k=RING.t/.7;if(k>1){RING=null;return}ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 [[RING.c1,0],[RING.c2,.15]].forEach(([col,o])=>{const kk=Math.max(0,k-o);ctx.globalAlpha=Math.max(0,1-kk)*.9;ctx.strokeStyle=col;ctx.lineWidth=10*(1-kk)+2;ctx.beginPath();ctx.ellipse(RING.x,RING.y-30,30+kk*170,12+kk*70,0,0,6.283);ctx.stroke()});
 ctx.globalAlpha=Math.max(0,1-k*2)*.55;const g=ctx.createRadialGradient(RING.x,RING.y-40,0,RING.x,RING.y-40,160);g.addColorStop(0,'#fff');g.addColorStop(.4,RING.c1);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(RING.x,RING.y-40,160,0,6.283);ctx.fill();ctx.restore()}catch(e){}};
G.comboTest=(a,b)=>fire(a,b)})();
;(()=>{// v20 varied hit reactions
const HR=new Map();G.HR=HR;G.hrN={kd:0,ln:0,fl:0};
const oh=C.ev.hit;C.ev.hit=(e,d,cr)=>{oh(e,d,cr);try{if(C._dot||!e||e.hp<=0||e.wb)return;const q=R._ES().get(e);if(!q)return;const cur=HR.get(e);
 const heavy=d>e.max*.16;let kind=null;
 if(e.boss)kind=(cr||heavy)?'bf':null;
 else if(e.el)kind=(cr||heavy)?'ef':null;
 else if(heavy&&cr)kind='ln';else if(heavy||cr&&Math.random()<.5)kind='kd';
 if(!kind||cur&&cur.t<cur.T*.6&&(cur.k=='ln'||cur.k=='kd'))return;
 const T={bf:.18,ef:.28,ln:.75,kd:.45}[kind];HR.set(e,{k:kind,t:0,T,ox:0,oy:0});G.hrN[kind=='bf'||kind=='ef'?'fl':kind]++}catch(_){}};
const ease=t=>1-Math.pow(1-t,3);
const of=R.frame;R.frame=dt=>{const ES=R._ES&&R._ES(),app=[];
 if(ES)HR.forEach((h,e)=>{const q=ES.get(e);h.t+=dt;if(!q||h.t>=h.T||e.hp<=0){HR.delete(e);return}const p=h.t/h.T;let ox=0,oy=0;
  if(h.k=='ln'){ox=12*ease(p);oy=-Math.sin(Math.PI*p)*46*(1-p*.3);if(p>.85)oy+=Math.sin((p-.85)/.15*Math.PI)*-5}
  else if(h.k=='kd'){ox=10*Math.sin(Math.PI*Math.min(1,p*1.4))*(1-p*.4);oy=-Math.sin(Math.PI*Math.min(1,p*1.6))*8}
  else if(h.k=='ef'){ox=7*Math.sin(Math.PI*p)}else{ox=3*Math.sin(Math.PI*p)}
  q.x+=ox;q.y+=oy;app.push([q,ox,oy,h,e])});
 of(dt);app.forEach(([q,ox,oy])=>{q.x-=ox;q.y-=oy});
 try{if(G.screen||!app.length)return;const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.globalCompositeOperation='lighter';
  app.forEach(([q,ox,oy,h,e])=>{const p=h.t/h.T,x=q.x+ox,y=q.y+oy,s=(e.boss?70:e.el?50:34);
   if(h.k=='ef'||h.k=='bf'){ctx.globalAlpha=(1-p)*(h.k=='bf'?.25:.4);const g=ctx.createRadialGradient(x,y-s,0,x,y-s,s*.8);g.addColorStop(0,'#ff6a5a');g.addColorStop(1,'rgba(255,60,40,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y-s,s*.8,0,6.283);ctx.fill()}
   if(h.k=='ln'&&p>.8){ctx.globalAlpha=(1-p)*4*.5;ctx.fillStyle='#e8d8a8';for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(q.x+12+(i-2)*9,q.y-2-(p-.8)*30,4+i%2*2,0,6.283);ctx.fill()}}
   if(h.k=='kd'&&p<.5){ctx.globalAlpha=(.5-p)*.8;ctx.strokeStyle='#fff';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x-10,y-20-i*12);ctx.lineTo(x-30-i*4,y-20-i*12);ctx.stroke()}}});
  ctx.restore()}catch(_){}};
})();
;(()=>{// v21 death variety: crit-kill tag + boss slow-mo
const oh=C.ev.hit;C.ev.hit=(e,d,cr)=>{if(e&&!C._dot)e._lc=!!cr;oh(e,d,cr)};
const ot=C.tick;C.tick=dt=>{if(R.slowT>0){R.slowT-=dt;dt*=R.slowT>.3?.3:.3+(.3-R.slowT)/.3*.7;document.body.classList.add('slowmo')}else if(R.slowT!==undefined){R.slowT=undefined;document.body.classList.remove('slowmo')}return ot(dt)};
const of=R.frame;R.frame=dt=>of(R.slowT>0?dt*.45:dt)})();
;(()=>{// v22 dmg colors, VICTORY/BREAK delay during boss slow-mo, ally knockback
const SPC={fire:'#ff7a2a',ragna:'#ff4a6a',giga:'#ff3a3a',ds:'#ff9a3a',ice:'#6ad0ff',bolt:'#ffe24a',poison:'#7aff6a',charm:'#ff8ad8'};
const oh=C.hitEnemy;C.hitEnemy=(e,d,cr,src)=>{if(e)e._hc=src&&src.sp?SPC[src.sp]||'#c8a0ff':C._combo?'#d08aff':null;return oh(e,d,cr,src)};
// slow-mo gating
const orp=resultPop;resultPop=function(w){if(R.slowT>0){setTimeout(()=>resultPop(w),Math.max(80,R.slowT*1000+150));return}return orp.apply(this,arguments)};
const og=C.ev.grog;C.ev.grog=e=>{if(R.slowT>0||e&&e.hp<=0)return;og(e)};
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{if(e&&e.boss){R.slowT=Math.max(R.slowT||0,1.3)}return ok(e,...a)};
// ally knockback
const HA=new Map();G.HA=HA;G.haN=0;
const kb=(a,pow,up)=>{if(!a||a.hp<=0&&!up)return;HA.set(a.k,{t:0,T:up?.7:.42,pow,up});G.haN++};
const od=C.ev.dmgAlly;C.ev.dmgAlly=(a,d,kind)=>{od(a,d,kind);if(kind)return;const bo=C.alive().find(e=>e.boss);if(bo&&!B.teleHitNow)kb(a,d>a.max*.12?22:14,0)};
const ot=C.ev.teleHit;C.ev.teleHit=(bo,res)=>{B.teleHitNow=1;try{ot&&ot(bo,res)}finally{B.teleHitNow=0}(res||[]).forEach(([a,d])=>{if(d>0)kb(a,30,1)})};
const of=R.frame;R.frame=dt=>{const AS=R._AS&&R._AS(),app=[];if(AS)HA.forEach((h,k)=>{const q=AS.get(k);h.t+=dt;if(!q||h.t>=h.T){HA.delete(k);return}const p=h.t/h.T;
  let ox=-h.pow*Math.sin(Math.PI*Math.min(1,p*1.25))*(1-p*.5),oy=h.up?-Math.sin(Math.PI*Math.min(1,p*1.6))*26:-Math.sin(Math.PI*Math.min(1,p*2))*5;
  if(q.x+ox<70)ox=Math.min(0,70-q.x);q.x+=ox;q.y+=oy;app.push([q,ox,oy])});of(dt);app.forEach(([q,ox,oy])=>{q.x-=ox;q.y-=oy})};
})();
;(()=>{const ob=banner;banner=function(t){if(R.slowT>0&&!/^LEVEL UP/.test(t)){setTimeout(()=>banner(t),R.slowT*1000+100);return}return ob.apply(this,arguments)}})();
;(()=>{// v23 enemy attack variety: ranged projectiles + elite special moves
const RNG={'mon_garcher.png':'arrow','mon_dmage.png':'orb','mon_skeleton.png':'arrow','mon_bandit.png':'dagger','mon_imp.png':'fire','mon_cultist.png':'orb','mon_harpy.png':'feather','mon_ghost.png':'wisp'};G.RNG=RNG;
const PJ=[],LB=[];let lastE=null;G.pjN=0;G.eskN=0;
const oe=C.ev.eatk;C.ev.eatk=e=>{lastE=e;oe&&oe(e)};
const od=C.ev.dmgAlly;C.ev.dmgAlly=(a,d,kind)=>{const e=lastE;lastE=null;const k=e&&!e.boss&&RNG[e.img];
 if(!k||G.screen||C._esk){od(a,d,kind);return}const s=R._ES().get(e),q=R._AS().get(a.k);if(!s||!q){od(a,d,kind);return}
 const T=k=='arrow'||k=='dagger'?.3:.45;let x0=s.x-14,y0=s.y-(e.el?70:52);if(Math.hypot(x0-q.x,y0-q.y)<90){x0=Math.max(x0,q.x+90);y0-=24}PJ.push({k,x0,y0,x1:q.x+8,y1:q.y-48,t:0,T,cb:()=>od(a,d,kind)});G.pjN++};
// elite special moves
const MV={slam:{n:'대지 강타',m:1.1,all:1,col:'#ffb040'},charge:{n:'맹렬한 돌진',m:2.4,all:0,col:'#ff5040'},volley:{n:'일제 사격',m:.9,all:1,col:'#a0e0ff'},hex:{n:'암흑 저주',m:1,all:1,col:'#b070ff'}};
const mvOf=e=>RNG[e.img]?(RNG[e.img]=='orb'||RNG[e.img]=='wisp'||RNG[e.img]=='fire'?'hex':'volley'):(/golem|treant|orc|slime/.test(e.img)?'slam':'charge');
const ot=C.tick;C.tick=dt=>{ot(dt);if(B.wb)return;C.alive().forEach(e=>{if(!e.el||e.boss||e.hp<=0)return;if(e.esk==null)e.esk=3+Math.random()*2;
  const held=!!(e.st&&e.st.stun&&e.st.stun.t>0&&(e.eskW==null||e.st.stun.t>(e._stun0||0)));e._stun0=e.st&&e.st.stun?e.st.stun.t:0;
  if(e.eskW!=null){if(held&&Math.random()<.5){LB.push({e,t:0,txt:'저항!',c:'#ffd25a'})}else if(held){e.eskW=null;LB.push({e,t:0,txt:'기술 저지!',c:'#9ef'});return}e.eskW-=dt;if(e.eskW<=0){e.eskW=null;fireMv(e)}return}
  if(!held)e.esk-=dt;if(e.esk<=0){e.esk=7+Math.random()*3;e.eskW=.85;e.mv=mvOf(e);LB.push({e,t:0,txt:'⚠ '+MV[e.mv].n,c:MV[e.mv].col,warn:1})}})};
const fireMv=e=>{const al=C.aliveAllies();if(!al.length)return;const M=MV[e.mv],tg=M.all?al:[al[0]];G.eskN++;C._esk=1;
 tg.forEach(t=>{const d=Math.max(1,e.atk*M.m*(1-Math.min(.6,C.stat('def')/200)));t.hp-=d;C.ev.dmgAlly(t,d,'');if(G.HA)G.HA.set(t.k,{t:0,T:e.mv=='charge'?.6:.42,pow:e.mv=='charge'?28:16,up:e.mv=='charge'?1:0});if(t.hp<=0){t.hp=0;t.dead=true;C.ev.allyDead&&C.ev.allyDead(t)}});C._esk=0;
 const s=R._ES().get(e);if(s)RINGS.push({x:M.all?150:s.x-60,y:(s.y||500),t:0,c:M.col,big:M.all});R.hs=Math.max(R.hs||0,.06)};
const RINGS=[];
const ease=t=>1-Math.pow(1-t,3);
const of=R.frame;R.frame=dt=>{of(dt);const c=document.querySelector('#battle canvas');if(!c)return;if(G.screen){PJ.splice(0).forEach(p=>p.cb());return}
 const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=PJ.length-1;i>=0;i--){const p=PJ[i];p.t+=dt;const k=Math.min(1,p.t/p.T);const arc=p.k=='arrow'||p.k=='dagger'?-30:-12;
  const x=p.x0+(p.x1-p.x0)*k,y=p.y0+(p.y1-p.y0)*k+arc*Math.sin(Math.PI*k),dx=(p.x1-p.x0),dy=(p.y1-p.y0)+arc*Math.PI*Math.cos(Math.PI*k),an=Math.atan2(dy,dx);
  ctx.save();ctx.translate(x,y);ctx.scale(1.6,1.6);
  if(p.k=='arrow'||p.k=='dagger'||p.k=='feather'){ctx.rotate(an);ctx.lineCap='round';ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-34,0);ctx.lineTo(-8,0);ctx.stroke();
   if(p.k=='arrow'){ctx.strokeStyle='#6a4a2a';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(6,0);ctx.stroke();ctx.fillStyle='#e8e8f0';ctx.beginPath();ctx.moveTo(11,0);ctx.lineTo(3,-4);ctx.lineTo(3,4);ctx.fill();ctx.fillStyle='#d04040';ctx.fillRect(-19,-3,5,6)}
   else if(p.k=='dagger'){ctx.rotate(p.t*30);ctx.fillStyle='#dfe6ff';ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-2,-3);ctx.lineTo(-2,3);ctx.fill();ctx.fillStyle='#6a4020';ctx.fillRect(-8,-2,6,4)}
   else{ctx.fillStyle='#f0e0ff';ctx.beginPath();ctx.ellipse(0,0,10,3.5,0,0,6.283);ctx.fill();ctx.strokeStyle='#a080c0';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(10,0);ctx.stroke()}}
  else{const col={fire:['#fff3c0','#ff7a20'],orb:['#f0d8ff','#8a40ff'],wisp:['#e0fff8','#40e0c0']}[p.k];ctx.globalCompositeOperation='lighter';for(let j=1;j<=4;j++){ctx.globalAlpha=.25/j;ctx.fillStyle=col[1];ctx.beginPath();ctx.arc(-Math.cos(an)*j*7,-Math.sin(an)*j*7,8-j,0,6.283);ctx.fill()}
   ctx.globalAlpha=1;const g=ctx.createRadialGradient(0,0,0,0,0,11);g.addColorStop(0,col[0]);g.addColorStop(.5,col[1]);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,11,0,6.283);ctx.fill()}
  ctx.restore();if(k>=1){PJ.splice(i,1);RINGS.push({x:p.x1,y:p.y1+40,t:0,c:p.k=='fire'?'#ff9a40':p.k=='orb'?'#b070ff':p.k=='wisp'?'#60f0d0':'#ffffff',sm:1});try{p.cb()}catch(_){}}}
 for(let i=RINGS.length-1;i>=0;i--){const r=RINGS[i];r.t+=dt;const k=r.t/(r.sm?.25:.5);if(k>=1){RINGS.splice(i,1);continue}ctx.globalAlpha=(1-k)*.85;ctx.strokeStyle=r.c;ctx.lineWidth=(r.sm?4:8)*(1-k)+1;ctx.beginPath();ctx.ellipse(r.x,r.y-40*(r.sm?1:0),(r.sm?6:20)+k*(r.sm?22:r.big?150:70),((r.sm?6:8)+k*(r.sm?22:r.big?50:28)),0,0,6.283);ctx.stroke()}
 ctx.globalAlpha=1;for(let i=LB.length-1;i>=0;i--){const l=LB[i];l.t+=dt;const s=R._ES().get(l.e);if(l.t>1.1||!s||l.e.hp<=0){LB.splice(i,1);continue}const k=Math.min(1,l.t/.15);
  ctx.save();ctx.translate(Math.min(300,Math.max(80,s.x)),s.y+30+ease(Math.min(1,l.t))*4);ctx.fillStyle='rgba(20,0,0,.6)';ctx.beginPath();ctx.roundRect?ctx.roundRect(-58,-15,116,21,10):ctx.rect(-58,-15,116,21);ctx.fill();ctx.scale(.6+.4*k,.6+.4*k);ctx.globalAlpha=l.t>.8?(1.1-l.t)/.3:1;ctx.font='900 15px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#200';ctx.strokeText(l.txt,0,0);ctx.fillStyle=l.c;ctx.fillText(l.txt,0,0);ctx.restore()
  if(l.warn&&l.e.eskW!=null){ctx.save();ctx.globalAlpha=.35+.35*Math.sin(l.t*30);ctx.strokeStyle='#ff3030';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(s.x,s.y,40,14,0,0,6.283);ctx.stroke();ctx.restore()}}
 ctx.restore()};
G.pjTest=k=>{const L=C.alive().map(e=>[e,R._ES().get(e)]).filter(x=>x[1]).sort((a,b)=>b[1].x-a[1].x)[0],q=R._AS().get('lina');if(!L||!q)return 0;const s=L[1];PJ.push({k,x0:s.x-14,y0:s.y-52,x1:q.x+8,y1:q.y-48,t:0,T:.9,cb:()=>{}});return 1};G.eskTest=img=>{const L=C.alive().filter(e=>!e.boss);const e=L.find(e=>!img||e.img==img)||L[0];if(!e)return 0;e.el=1;e.esk=0;return e.img};
})();
;(()=>{// v24 ranged kite / hang back
const RN=/mon_(garcher|dmage|skeleton|cultist|imp|ghost|harpy|bandit)\.png/;
const of=R.frame;R.frame=dt=>{try{const ES=R._ES(),AS=R._AS();if(ES&&AS&&!B.boss)C.alive().forEach(e=>{if(e.boss||!RN.test(e.img))return;const q=ES.get(e);if(!q||q.enter<1||q.x==null)return;if(q.home==null){q.home=q.tx;q.hy=q.ty}
  let dmin=1e9;AS.forEach(a=>{if(a.x!=null)dmin=Math.min(dmin,Math.hypot(a.x-q.x,(a.y-q.y)*1.4))});const CXv=q.wx-q.x;
  const back=dmin<80?70:dmin<130?45:30;let want=q.home+back;want=Math.min(want,CXv+292);const k=Math.min(1,dt*(dmin<80?3:1.2));q.tx+=(want-q.tx)*k;
  q.kite=dmin<80})}catch(_){}of(dt)}})();
;(()=>{// v25 DPS meter (전투 기여도)
const DM={};let t0=performance.now(),open=false;const nm=k=>k=='lina'?'리나':(D.COMPS.find(c=>c.k==k)||{}).n||k;const im=k=>k=='lina'?'hero_lina.png':(D.COMPS.find(c=>c.k==k)||{}).img;
const oh=C.hitEnemy;C.hitEnemy=(e,d,cr,src)=>{const hp0=e&&e.hp>0?e.hp:0;const r=oh(e,d,cr,src);if(hp0&&!e.wb){const k=src&&src.k&&src.k!='lina'?src.k:'lina';DM[k]=(DM[k]||0)+Math.max(0,hp0-Math.max(0,e.hp))}return r};
G.dmReset=()=>{for(const k in DM)delete DM[k];t0=performance.now()};G.DM=DM;
let lsi=null;
const add=()=>{const ft=document.getElementById('facTag');if(!ft||document.getElementById('dpsBtn'))return;const b=document.createElement('span');b.id='dpsBtn';b.className='factag';b.textContent='📊';ft.after(b);
 const p=document.createElement('div');p.id='dpsPan';document.getElementById('battle').appendChild(p);b.onclick=e=>{e.stopPropagation();open=!open;p.classList.toggle('on',open);b.classList.toggle('on',open);G.S().dpsOpen=open};open=!!G.S().dpsOpen;p.classList.toggle('on',open)};
setInterval(()=>{add();{const si=G.S().si;if(si!==lsi){lsi=si;G.dmReset()}}const p=document.getElementById('dpsPan');if(!p||!open)return;const ks=Object.keys(DM).sort((a,b)=>DM[b]-DM[a]),tot=ks.reduce((s,k)=>s+DM[k],0)||1,sec=Math.max(1,(performance.now()-t0)/1000);
 p.innerHTML=`<div class=dph>전투 기여도 <i>${fmt(Math.round(tot/sec))}/초</i></div>`+(ks.length?ks.slice(0,6).map((k,i)=>`<div class=dpr><img src="${A}${im(k)}"><b>${nm(k)}</b><span class=dpb><s style="width:${(DM[k]/DM[ks[0]]*100).toFixed(1)}%" class="${i==0?'top':''}"></s></span><em>${Math.round(DM[k]/tot*100)}%</em></div>`).join(''):'<div class=dpe>전투 대기 중…</div>')},500)})();
;(()=>{// v26 stage-clear result breakdown (MVP + contribution)
let snap=null;const nm=k=>k=='lina'?'리나':(D.COMPS.find(c=>c.k==k)||{}).n||k;const im=k=>k=='lina'?'hero_lina.png':(D.COMPS.find(c=>c.k==k)||{}).img;
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{if(e&&e.boss&&!e.wb&&G.DM)snap=Object.assign({},G.DM);return ok(e,...a)};
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{if(!w||!snap)return r;const o=[...document.querySelectorAll('.vic.win')].pop();if(!o)return r;const ks=Object.keys(snap).sort((a,b)=>snap[b]-snap[a]).slice(0,4);snap=null;if(!ks.length)return r;
 const tot=ks.reduce((s,k)=>s+G.DM_(k),0)||1;
 const d=o.cloneNode(true);o.replaceWith(d);d.classList.add('vbd');const mvp=ks[0];
 d.querySelector('.vn').insertAdjacentHTML('beforebegin',`<div class=vbx><div class=vmvp><img src="${A}${im(mvp)}"><i>MVP</i><b>${nm(mvp)}</b><em>${Math.round(G.DM_(mvp)/tot*100)}%</em></div><div class=vbl>${ks.map((k,i)=>`<div class=vbr style="animation-delay:${.25+i*.12}s"><img src="${A}${im(k)}"><span class=vbb><s style="width:${(G.DM_(k)/G.DM_(ks[0])*100).toFixed(0)}%" class="${i?'':'top'}"></s></span><em>${fmt(Math.round(G.DM_(k)))}</em></div>`).join('')}</div></div>`);
 d.onclick=()=>d.remove();setTimeout(()=>d.classList.add('out'),3600);setTimeout(()=>d.remove(),4000)}catch(_){}return r};
let cur=null;G.DM_=k=>cur?cur[k]||0:0;const or2=resultPop;resultPop=function(w){cur=snap;return or2.apply(this,arguments)}})();
;(()=>{// v27 보스 러시 (boss rush)
const BR={tries:3,time:30,names:['마천루 무사','주간 랭커','슬레이어','붉은달','용사지망','은빛검','마도학자','고블린킬러','검은고양이','세이룬기사','방랑시인','젤가팬','마족사냥꾼','달빛여우','노을','폭염','라그나','빙결공주','현자의돌','떠돌이'],
 tier:[[1,800,'1위'],[3,500,'2~3위'],[10,300,'4~10위'],[30,150,'11~30위'],[999,60,'참가']]};C.BR=BR;
const st=()=>{const s=C.S();s.br=s.br||{};const b=s.br;if(b.day!==C.today()){b.day=C.today();b.tries=BR.tries}if(b.w!==C.week()){if(b.w!=null&&b.best>0){b.pend={rk:rank(b.best,b.w).me,w:b.w}}b.w=C.week();b.best=0}return b};
const rng=seed=>()=>((seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff);
const ai=w=>{const r=rng(w*7919+13),lv=Math.max(3,(C.S().maxSi||0)/2+4);return BR.names.map(n=>({n,sc:+(lv*(.35+r()*1.1)).toFixed(1)}))};
const rank=(best,w)=>{const L=ai(w).concat([{n:(G.nick?G.nick():'나')+' (나)',sc:best,me:1}]).sort((a,b)=>b.sc-a.sc);return{L,me:L.findIndex(x=>x.me)+1}};
const tierOf=rk=>BR.tier.find(t=>rk<=t[0]);C.brSt=st;C.brRank=()=>rank(st().best,st().w);
const dps=()=>C.ATK()*(1.2+C.S().party.reduce((a,k)=>a+C.compMul(k),0))*(1+C.stat('crit')/100);
const bossHp=i=>dps()*3*Math.pow(1.3,i);
const rew=sc=>{const k=Math.floor(sc);return{g:Math.round(k*(60+(C.S().maxSi||0)*25)),gem:k*5,st:k*2}};
C.brRed=()=>{try{const b=st();return b.tries>0||!!b.pend}catch(_){return false}};
// screen card
const ods=dunScreen;dunScreen=function(el,s){ods.apply(this,arguments);const b=st(),r=rank(b.best,b.w);const c=document.createElement('div');c.className='card brc';
 c.innerHTML=`<div class=brh><img src="${A}boss_demon.png"><div><b>보스 러시</b><small>${BR.time}초 동안 보스를 연속 처치! 주간 랭킹 · 월 05:00 정산</small></div></div><div class=brs><span>오늘 <b>${b.tries}/${BR.tries}</b></span><span>주간 최고 <b>${b.best||0}</b></span><span>순위 <b>${b.best?r.me+'위':'-'}</b></span></div><div class=brbtns><span class="pill ${b.tries?'gold':''}" id=brGo>도전</span><span class=pill id=brRk>랭킹</span></div>${b.pend?`<div class=brpend id=brPend>지난 주 ${b.pend.rk}위 보상 받기 · 💎${tierOf(b.pend.rk)[1]}</div>`:''}`;
 {const an=el.querySelector('.dunh');an?an.before(c):el.appendChild(c)}c.querySelector('#brGo').onclick=()=>{if(!st().tries)return toast('오늘 도전 횟수를 모두 사용했습니다');realRun()};c.querySelector('#brRk').onclick=rkPop;
 const pd=c.querySelector('#brPend');if(pd)pd.onclick=()=>{const b=st(),t=tierOf(b.pend.rk);C.S().gems+=t[1];b.pend=null;rewardPop([['it2_gem.png',t[1],'보석']],'보스 러시 주간 '+t[2]+' 보상');G.screen&&renderScreen()}};
const rkPop=()=>{const b=st(),r=rank(b.best,b.w);const m=document.createElement('div');m.className='modal brmod';m.innerHTML=`<div class=mbox><div class=ttl>보스 러시 주간 랭킹</div><div class=brl>${r.L.slice(0,30).map((x,i)=>`<div class="brr ${x.me?'me':''}"><i>${i+1}</i><b>${x.n}</b><em>${x.sc}</em></div>`).join('')}</div><div class=brtier>${BR.tier.map(t=>`<span>${t[2]} 💎${t[1]}</span>`).join('')}</div><div class="pill gold" id=brX>닫기</div></div>`;document.getElementById('app').appendChild(m);m.querySelector('#brX').onclick=()=>m.remove();setTimeout(()=>{const me=m.querySelector('.brr.me');me&&me.scrollIntoView({block:'center'})},50)};
// run overlay
const run=()=>{const b=st();b.tries--;const BS=D.BOSSES;let i=0,hp=bossHp(0),T=BR.time,kills=0,done=false,last=performance.now(),acc=0,fast=1;
 const m=document.createElement('div');m.className='brrun';m.innerHTML=`<div class=brtop><div class=brtime><s></s></div><b class=brt></b></div><div class=brk>처치 <b>0</b></div><div class=brbn></div><div class=brboss><img></div><div class=brhp><s></s><i></i></div><div class=brparty>${['lina'].concat(C.S().party).slice(0,5).map(k=>`<img src="${A}${k=='lina'?'hero_lina.png':(D.COMPS.find(c=>c.k==k)||{}).img}">`).join('')}</div><div class=brfx></div><div class=brskip>⏩ 빠르게</div>`;
 document.getElementById('app').appendChild(m);const img=m.querySelector('.brboss img'),hpS=m.querySelector('.brhp s'),hpI=m.querySelector('.brhp i'),fx=m.querySelector('.brfx'),tS=m.querySelector('.brtime s'),tB=m.querySelector('.brt'),kB=m.querySelector('.brk b'),bn=m.querySelector('.brbn');
 const setB=()=>{const bo=BS[i%BS.length];img.src=A+bo.img;img.className='';void img.offsetWidth;img.className='in';bn.textContent=`#${i+1} ${bo.n}`;};setB();
 m.querySelector('.brskip').onclick=()=>{fast=fast==1?6:1;m.querySelector('.brskip').classList.toggle('on',fast>1)};
 const fin=()=>{done=true;const sc=+(kills+Math.max(0,1-hp/bossHp(i))).toFixed(1);const nb=sc>b.best;if(nb)b.best=sc;const r=rew(sc);C.addGold(r.g);C.S().gems+=r.gem;C.S().stone=(C.S().stone||0)+r.st;G.brLast=sc;
  m.insertAdjacentHTML('beforeend',`<div class=brend><div class=vt>TIME UP</div><div class=brsc>${sc}<small>점</small></div>${nb?'<div class=brnew>주간 최고 기록!</div>':''}<div class=brsub>처치 ${kills} · 순위 ${rank(b.best,b.w).me}위</div><div class="pill gold" id=brOk>보상 받기</div></div>`);
  m.querySelector('#brOk').onclick=()=>{m.remove();rewardPop([['it2_gold.png',r.g,'골드'],['it2_gem.png',r.gem,'보석'],['it2_stone.png',r.st,'강화석']],'보스 러시 '+sc+'점');if(G.screen)renderScreen()}};
 const loop=now=>{if(done||!m.isConnected)return;const dt=Math.min(.1,(now-last)/1000)*fast;last=now;T-=dt;acc+=dt;
  while(acc>.25){acc-=.25;const cr=Math.random()<.2,d=dps()*.25*(cr?2:1)*(.85+Math.random()*.3);hp-=d;const n=document.createElement('i');n.className=cr?'cr':'';n.textContent=fmt(Math.round(d));n.style.left=(150+Math.random()*120)+'px';n.style.top=(300+Math.random()*80)+'px';fx.appendChild(n);setTimeout(()=>n.remove(),700);
   if(hp<=0){kills++;i++;hp=bossHp(i);kB.textContent=kills;const k=document.createElement('div');k.className='brko';k.textContent='격파!';m.appendChild(k);setTimeout(()=>k.remove(),700);setB()}}
  hpS.style.width=Math.max(0,hp/bossHp(i)*100)+'%';hpI.textContent=fmt(Math.max(0,Math.round(hp)));tS.style.width=Math.max(0,T/BR.time*100)+'%';tB.textContent=Math.max(0,T).toFixed(1)+'초';
  if(T<=0)return fin();requestAnimationFrame(loop)};requestAnimationFrame(loop)};

// real-canvas rush
BR.time=60;
const realRun=()=>{const b=st();if(C.B.boss||C.B.wb)return toast('보스전 중에는 도전할 수 없습니다');b.tries--;const Bt=C.B;
 document.getElementById('screen').classList.remove('on');G.screen=null;document.querySelectorAll('.modal,.rwpop,.vic,.toast').forEach(x=>x.remove());
 Bt.allies.forEach(a=>{a.dead=false;a.hp=a.max});Bt.enemies=[];Bt.boss=true;Bt.lock=0;Bt.br={t:BR.time,end:performance.now()+BR.time*1000,i:0,kills:0,nx:.6,hp0:0};Bt.timer=BR.time+5;document.body.classList.add('wbon','bron');
 const hud=document.createElement('div');hud.id='brHud';hud.innerHTML=`<div class=brh1><b>보스 러시</b><span class=brhk>처치 <i>0</i></span><span class=brht>60.0</span></div><div class=brtime><s></s></div><div class=brhn></div>`;document.getElementById('battle').appendChild(hud);G.brHud=hud;};
const spawnB=()=>{const Bt=C.B,r=Bt.br,BS=D.BOSSES,bo=BS[r.i%BS.length],h=dps()*4.5*Math.pow(1.3,r.i);r.hp0=h;
 Bt.enemies=[{fac:bo.fac,n:bo.n,img:bo.img,sc:bo.sc,max:h,hp:h,atk:C.MAXHP()*.028*(1+.12*r.i),spd:.7,t:-.6,boss:1,brb:1}];Bt.timer=r.t+5;
 const n=G.brHud&&G.brHud.querySelector('.brhn');if(n){n.textContent=`#${r.i+1} ${bo.n}`;n.classList.remove('in');void n.offsetWidth;n.classList.add('in')}};
const endB=()=>{const Bt=C.B,r=Bt.br;if(!r)return;const cur=Bt.enemies.find(e=>e.brb&&e.hp>0);const sc=+(r.kills+(cur?Math.max(0,1-cur.hp/cur.max):0)).toFixed(1);
 Bt.br=null;Bt.boss=false;Bt.enemies=[];Bt.lock=1.4;C.S().wave=0;Bt.allies.forEach(a=>{a.dead=false;a.hp=a.max});document.body.classList.remove('wbon','bron');G.brHud&&G.brHud.remove();
 const b=st(),nb=sc>(b.best||0);if(nb)b.best=sc;const rw=rew(sc);C.addGold(rw.g);C.S().gems+=rw.gem;C.S().stone=(C.S().stone||0)+rw.st;G.brLast=sc;
 const m=document.createElement('div');m.className='brrun brfin';m.innerHTML=`<div class=brend><div class=vt>TIME UP</div><div class=brsc>${sc}<small>점</small></div>${nb?'<div class=brnew>주간 최고 기록!</div>':''}<div class=brsub>처치 ${r.kills} · 주간 ${rank(b.best,b.w).me}위</div><div class="pill gold" id=brOk>보상 받기</div></div>`;document.getElementById('app').appendChild(m);
 m.querySelector('#brOk').onclick=()=>{m.remove();rewardPop([['it2_gold.png',rw.g,'골드'],['it2_gem.png',rw.gem,'보석'],['it2_stone.png',rw.st,'강화석']],'보스 러시 '+sc+'점')}};
const ot=C.tick;C.tick=dt=>{const Bt=C.B,r=Bt.br;if(r){r.t=(r.end-performance.now())/1000;Bt.timer=r.t+5;if(r.t<=0||!C.aliveAllies().length){endB();return}if(!C.alive().length){r.nx-=dt;if(r.nx<=0){spawnB();r.nx=1.1}}
  if(G.brHud){G.brHud.querySelector('.brht').textContent=Math.max(0,r.t).toFixed(1)+'초';G.brHud.querySelector('.brtime s').style.width=Math.max(0,r.t/BR.time*100)+'%';G.brHud.querySelector('.brhk i').textContent=r.kills}}return ot(dt)};
const oh=C.hitEnemy;C.hitEnemy=(e,d,cr,src)=>{if(!(e&&e.brb&&C.B.br))return oh(e,d,cr,src);if(e.hp<=0)return;const BIG=1e15;e.hp+=BIG;const r=oh(e,d,cr,src);e.hp-=BIG;if(e.hp<=0){e.hp=0;C.B.br.kills++;try{R.kill(e,0,0)}catch(_){}R.hs=Math.max(R.hs||0,.25);const k=document.createElement('div');k.className='brko';k.textContent='격파!';document.getElementById('battle').appendChild(k);setTimeout(()=>k.remove(),800);C.B.br.i++;C.B.br.nx=.9}return r};
const ots=toast;toast=function(t){if(C.B.br)return;return ots.apply(this,arguments)};const obn=banner;banner=function(t){if(C.B.br)return;return obn.apply(this,arguments)};
G.brReal=realRun;G.brRun=realRun;
})();
;(()=>{// v28 real-canvas dungeon / tower fights
const B=C.B;const dps=()=>C.ATK()*(1.2+C.S().party.reduce((a,k)=>a+C.compMul(k),0));
const MK=n=>D.MONS.find(m=>m.k==n)||D.MONS[0];
const TH={gold:{m:['goblin','bandit','garcher'],b:0,bg:'bg_mine.jpg'},exp:{m:['cultist','dmage','ghost'],b:2,bg:'bg_library.jpg'},stone:{m:['golem','skeleton','orc'],b:1,bg:'bg_forge.jpg'},frag:{m:['imp','harpy','lizard'],b:3,bg:'bg_ruins.jpg'}};
G.rbForce=fn=>{const op=C.POW;C.POW=()=>1e18;try{return fn()}finally{C.POW=op}};
let cb=null;
const mob=(m,ratio,j)=>({res:j>=(C.CAP||6)?1:0,fac:m.fac,sc:m.sc,n:m.n,img:m.img,max:dps()*.9*ratio,hp:dps()*.9*ratio,atk:C.MAXHP()*.012*ratio,spd:.8,t:-Math.random()*.6,q:1,rbm:1});
const boss=(bo,n,ratio)=>({fac:bo.fac,n,img:bo.img,sc:bo.sc,max:dps()*9*ratio,hp:dps()*9*ratio,atk:C.MAXHP()*.03*ratio,spd:.7,t:-.8,boss:1,rbb:1});
G.rbRun=(o,done)=>{if(B.boss||B.wb||B.br||B.rb)return toast('다른 전투 중에는 도전할 수 없습니다');cb=done;const ratio=Math.max(1.1,Math.min(3,o.req/Math.max(1,C.POW())));const waves=[];
 if(o.kind=='dun'){const th=TH[o.k]||TH.gold,rr=ratio*(1+.15*o.t);for(let w=0;w<2;w++)waves.push(Array.from({length:5},(_,j)=>mob(MK(th.m[(j+w)%th.m.length]),rr,j)));const bo=D.BOSSES[th.b];waves.push([boss(bo,bo.n,rr)]);R.bgOv=th.bg}
 else{const mm=D.MONS.find(m=>m.img==o.mob)||{n:'탑의 수호자',img:o.mob,fac:'chaos'};
  if(o.boss){waves.push(Array.from({length:4},(_,j)=>mob(MK(['skeleton','ghost','imp','garcher'][j]),ratio,j)));const bo=D.BOSSES.find(b=>b.img==o.mob)||D.BOSSES[(o.f/10|0)%D.BOSSES.length];waves.push([boss(bo,bo.n+' · '+o.f+'층',ratio)])}
  else for(let w=0;w<2;w++)waves.push(Array.from({length:4},(_,j)=>mob(j==0?mm:MK(['skeleton','ghost','garcher','dmage'][(j+w)%4]),ratio,j)));R.bgOv='bg_tower.jpg'}
 document.getElementById('screen').classList.remove('on');G.rbRet=G.screen;G.screen=null;document.querySelectorAll('.modal,.rwpop,.vic,.toast').forEach(x=>x.remove());
 B.allies.forEach(a=>{a.dead=false;a.hp=a.max});B.enemies=[];B.boss=true;B.lock=0;B.rb={waves,w:0,nx:.5,end:performance.now()+45e3,t:45};B.timer=50;document.body.classList.add('wbon','bron');
 const h=document.createElement('div');h.id='brHud';h.innerHTML=`<div class=brh1><b>${o.title}</b><span class=brhk>웨이브 <i>0/${waves.length}</i></span><span class=brht>45.0</span></div><div class=brtime><s></s></div><div class=brhn></div>`;document.getElementById('battle').appendChild(h);G.rbHud=h};
const fin=won=>{const r=B.rb;if(!r)return;B.rb=null;B.boss=false;B.enemies=[];B.lock=1.4;C.S().wave=0;B.allies.forEach(a=>{a.dead=false;a.hp=a.max});document.body.classList.remove('wbon','bron');G.rbHud&&G.rbHud.remove();
 const go=()=>{R.bgOv=null;if(G.rbRet)openScreen(G.rbRet);const f=cb;cb=null;f&&f(won)};const k=document.createElement('div');k.className='brko';if(!won)k.style.color='#9ab';k.textContent=won?'CLEAR!':(r.why||'실패');document.getElementById('battle').appendChild(k);setTimeout(()=>{k.remove();go()},won?900:1100)};
G.rbFin=fin;
const ot=C.tick;C.tick=dt=>{const r=B.rb;if(r){r.t=(r.end-performance.now())/1000;B.timer=r.t+5;if(r.t<=0){r.why='시간 초과';fin(false);return}if(!C.aliveAllies().length){r.why='파티 전멸';fin(false);return}
  if(!C.alive().length&&!B.enemies.some(e=>e.res&&e.hp>0)){if(r.w>=r.waves.length){fin(true);return}r.nx-=dt;if(r.nx<=0){B.enemies=r.waves[r.w];r.w++;r.nx=.9;const n=G.rbHud&&G.rbHud.querySelector('.brhn');if(n&&!B.enemies[0].boss){n.textContent='WAVE '+r.w;n.classList.remove('in');void n.offsetWidth;n.classList.add('in')}}}
  if(G.rbHud){G.rbHud.querySelector('.brht').textContent=Math.max(0,r.t).toFixed(1)+'초';G.rbHud.querySelector('.brtime s').style.width=Math.max(0,r.t/45*100)+'%';G.rbHud.querySelector('.brhk i').textContent=r.w+'/'+r.waves.length}}return ot(dt)};
const oh=C.hitEnemy;C.hitEnemy=(e,d,cr,src)=>{if(!(e&&e.rbb&&B.rb))return oh(e,d,cr,src);if(e.hp<=0)return;const BIG=1e15;e.hp+=BIG;const r=oh(e,d,cr,src);e.hp-=BIG;if(e.hp<=0){e.hp=0;try{R.kill(e,0,0)}catch(_){}R.hs=Math.max(R.hs||0,.3)}return r};
const ots=toast;toast=function(t){if(B.rb)return;return ots.apply(this,arguments)};const obn=banner;banner=function(t){if(B.rb)return;return obn.apply(this,arguments)};
})();
;(()=>{// v29 under-power confirm + 일괄 소탕
const orb=G.rbRun;G.rbRun=(o,done)=>{const pw=C.POW();if(pw>=o.req)return orb(o,done);const m=document.createElement('div');m.className='modal pwwarn';
 m.innerHTML=`<div class=mbox><div class=ttl style="justify-content:center;color:#ff9a6a">⚠ 전투력 부족</div><div class=pwrow><span>권장 전투력<b>${fmt(o.req)}</b></span><span>내 전투력<b class=low>${fmt(pw)}</b></span></div><small>패배해도 입장 횟수는 차감되지 않습니다.<br>그래도 도전하시겠습니까?</small><div class=pwbtn><span class=pill id=pwNo>취소</span><span class="pill gold" id=pwYes>도전</span></div></div>`;
 document.getElementById('app').appendChild(m);m.querySelector('#pwNo').onclick=()=>m.remove();m.querySelector('#pwYes').onclick=()=>{m.remove();orb(o,done)}};
const sweepAll=()=>{const d=C.dunDaily(),tot={};let n=0;C.DUN.keys.forEach(k=>{const t=(d.clr[k]||0)-1;if(t<0)return;while(d.t[k]>0){const r=C.dunSweep(k,t);if(!r||r.err)break;n++;for(const x in r)if(typeof r[x]=='number')tot[x]=(tot[x]||0)+r[x]}});
 if(!n)return toast('소탕 가능한 던전이 없습니다');const s=C.S();s.dstat=(s.dstat||0)+n;updateHud();renderScreen();rewardPop(dunItems(tot),`일괄 소탕 ${n}회 완료`)};G.sweepAll=sweepAll;
const ods=dunScreen;dunScreen=function(el,s){ods.apply(this,arguments);const d=C.dunDaily(),can=C.DUN.keys.reduce((a,k)=>a+((d.clr[k]||0)>0?d.t[k]:0),0);const b=document.createElement('div');b.className='swall '+(can?'':'off');b.innerHTML=`⚡ 일괄 소탕 <small>${can}회 가능</small>`;b.onclick=sweepAll;const tb=el.querySelector('.duntabs');tb?tb.after(b):el.appendChild(b)};
})();
;(()=>{// v30 boss enrage at 50% HP (광폭화)
G.enrN=0;const EN=[];
const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{C.alive().forEach(e=>{if(!e.boss||e.wb||e.enr||e.hp>e.max*.5)return;e.enr=1;e.spd*=1.3;e.atk*=1.15;G.enrN++;EN.push({e,t:0});R.hs=Math.max(R.hs||0,.12);
  if(!G.screen){let w=0;const go=()=>{if((e.grog>0||R.slowT>0||document.querySelector('.grogt,.cutin'))&&w++<30)return setTimeout(go,200);const d=document.createElement('div');d.className='enrb';d.innerHTML='<b>광폭화!</b><small>공격 속도 상승</small>';document.getElementById('battle').appendChild(d);setTimeout(()=>d.remove(),1400)};go()}})}catch(_){}return r};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,ES=R._ES();ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 C.alive().forEach(e=>{if(!e.enr)return;const q=ES.get(e);if(!q)return;const t=performance.now()/1000,h=150*(e.sc||1);ctx.globalAlpha=.32+.12*Math.sin(t*6);const g=ctx.createRadialGradient(q.x,q.y-h*.45,10,q.x,q.y-h*.45,h*.75);g.addColorStop(0,'rgba(255,60,30,.9)');g.addColorStop(1,'rgba(255,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(q.x,q.y-h*.45,h*.6,h*.75,0,0,6.283);ctx.fill();
  if(Math.random()<.35){ctx.globalAlpha=.7;ctx.fillStyle='#ff7a3a';ctx.beginPath();ctx.arc(q.x+(Math.random()-.5)*h*.8,q.y-Math.random()*h,2+Math.random()*2,0,6.283);ctx.fill()}});
 for(let i=EN.length-1;i>=0;i--){const n=EN[i];n.t+=dt;const q=ES.get(n.e);if(n.t>.6||!q){EN.splice(i,1);continue}const k=n.t/.6;ctx.globalAlpha=(1-k)*.9;ctx.strokeStyle='#ff4020';ctx.lineWidth=10*(1-k)+2;ctx.beginPath();ctx.ellipse(q.x,q.y-60,30+k*200,12+k*80,0,0,6.283);ctx.stroke()}
 ctx.restore()}catch(_){}};
})();
;(()=>{// v31 party danger: red edge vignette + portrait pulse when an ally is low
G.dngN=0;let on=0;
const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{const b=document.getElementById('battle');if(!b)return r;let v=document.getElementById('dangerV');if(!v){v=document.createElement('div');v.id='dangerV';b.appendChild(v)}
  const A=C.B.allies||[];let low=0;const pp=document.querySelectorAll('#partycol .pp');A.forEach((a,i)=>{const l=a.hp>0&&a.hp<a.max*.3;if(l)low++;if(pp[i])pp[i].classList.toggle('dng',l)});
  const n=low>0&&!G.screen;if(n&&!on)G.dngN++;on=n;v.classList.toggle('on',n)}catch(_){}return r};
})();
;(()=>{// v32 loot fly: coins pop from kills and fly into the gold counter
G.lootN=0;let live=0;
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{try{const q=R._ES().get(e),b=document.getElementById('battle'),tg=document.getElementById('cGold');if(q&&b&&tg&&!G.screen&&live<36){const br=b.getBoundingClientRect(),tr=tg.getBoundingClientRect(),n=e.boss?10:e.el?5:2;
  for(let i=0;i<n;i++){const d=document.createElement('img');d.src='assets/fx_coin.png';d.className='lootc';const x=q.x+(Math.random()-.5)*30,y=q.y-30;d.style.left=x+'px';d.style.top=y+'px';d.style.setProperty('--dx',((Math.random()-.5)*(e.boss?160:70))+'px');d.style.setProperty('--dy',(-30-Math.random()*40)+'px');b.appendChild(d);live++;G.lootN++;
   setTimeout(()=>{d.classList.add('fly');d.style.transform=`translate(${tr.left+tr.width/2-br.left-x}px,${tr.top+tr.height/2-br.top-y}px) scale(.55)`},520+i*45);
   setTimeout(()=>{d.remove();live--;tg.classList.remove('gbump');void tg.offsetWidth;tg.classList.add('gbump')},1150+i*45)}}}catch(_){}return ok(e,...a)};
})();
;(()=>{// v33 companion ultimate: gauge fills, at full fires the companion's own CSKI skill (with its cut-in) + burst. Random procs no longer show the named cut-in.
G.ultN=0;G._grogT=0;const FX=[];
const og=C.ev.grog;C.ev.grog=(e,...a)=>{if(e&&e.boss)G._grogT=performance.now();return og(e,...a)};
const ocs=R.csk;R.csk=(k,s,force)=>{if(force)return ocs(k,s,force);const cc=R.ccCd;R.ccCd=99;const r=ocs(k,s,force);R.ccCd=cc;return r};
const busy=()=>R.slowT>0||(R.elT&&R.elT.t<1.6)||(R.bossT!=null&&R.bossT<2)||performance.now()-G._grogT<1600||C.alive().some(e=>e.boss&&e.grog>0)||(R.ccut&&R.ccut.t<1)||(R.cut&&R.cut.t<1.25)||document.querySelector('.bwarn,.combo,.enrb,.vic,.chap');
const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{const B=C.B;if(!B||!B.allies)return r;const pp=document.querySelectorAll('#partycol .pp');let fired=0;
 B.allies.forEach((a,i)=>{const el=pp[i];if(el&&!el.querySelector('.ugb'))el.insertAdjacentHTML('beforeend','<div class=ugb><i></i></div>');
  if(!a.c||a.hp<=0||!(D.CSKI||{})[a.k])return;a._ug=Math.min(1,(a._ug||0)+dt/(a.c.healer?11:9));if(el){el.querySelector('.ugb i').style.width=(a._ug*100)+'%';el.classList.toggle('ugf',a._ug>=1)}
  if(fired||a._ug<1||G.screen||(!G.S().autoSpell&&G._ugPick!=a.k)||!C.alive().some(e=>R._ES().get(e))||(G._ugPick&&G._ugPick!=a.k)||busy())return;G._ugPick=null;const q=R._AS().get(a.k);if(!q)return;R.ccCd=0;ocs(a.k,q,true);a._ug=0;G.ultN++;G._ultT=performance.now();fired=1;G.lastUlt=D.CSKI[a.k][1];
  setTimeout(()=>{try{if(a.c.healer){C.aliveAllies().forEach(x=>{const h=x.max*.25;x.hp=Math.min(x.max,x.hp+h);C.ev.heal&&C.ev.heal(x,h)})}
   else{const T=C.alive().slice().sort((p,q)=>(q.boss?1:0)-(p.boss?1:0)).slice(0,a.c.aoe?6:3);T.forEach(t=>C.hitEnemy(t,C.ATK()*C.compMul(a.k)*4,true,{sp:'ult_'+a.k}))}
   R.hs=Math.max(R.hs||0,.08);const q2=R._AS().get(a.k);if(q2)FX.push({x:q2.x,y:q2.y,t:0,h:a.c.healer})}catch(_){}},450)})}catch(_){}return r};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||!FX.length)return;const c=document.querySelector('#battle canvas'),ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=FX.length-1;i>=0;i--){const f=FX[i];f.t+=dt;if(f.t>.55){FX.splice(i,1);continue}const k=f.t/.55;ctx.globalAlpha=(1-k);ctx.strokeStyle=f.h?'#7affb0':'#7ad8ff';ctx.lineWidth=8*(1-k)+2;ctx.beginPath();ctx.ellipse(f.x,f.y-4,20+k*110,8+k*40,0,0,6.283);ctx.stroke()}ctx.restore()}catch(_){}};
})();
;(()=>{// v34 tap a glowing portrait to fire that companion's ultimate now (manual), else it auto-fires
document.addEventListener('click',ev=>{const p=ev.target.closest&&ev.target.closest('#partycol .pp.ugf');if(!p)return;const i=[...p.parentNode.children].indexOf(p),a=C.B.allies[i];if(!a||a._ug<1)return;ev.stopPropagation();G._ugPick=a.k;p.classList.add('ugtap');setTimeout(()=>p.classList.remove('ugtap'),300)},true);
})();
;(()=>{// v35 tap guard: a portrait tap within 0.6s after an ult fires does not open 파티 편성
document.addEventListener('click',ev=>{const p=ev.target.closest&&ev.target.closest('#partycol');if(p&&performance.now()-(G._ultT||0)<600){ev.stopPropagation();ev.preventDefault();G.tapGuardN=(G.tapGuardN||0)+1}},true);
})();
;(()=>{// v36 downed companions revive after 8s at 50% HP; portrait greys out with a countdown
G.revN=0;const RT=8;
const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{const B=C.B;if(!B||!B.allies)return r;const pp=document.querySelectorAll('#partycol .pp');
 B.allies.forEach((a,i)=>{const el=pp[i];if(a.dead){a._rv=(a._rv||0)+dt;const left=Math.ceil(RT-a._rv);if(el){el.classList.add('down');let c=el.querySelector('.rvc');if(!c){c=document.createElement('b');c.className='rvc';el.appendChild(c)}c.textContent=left>0?left:''}
   if(a._rv>=RT&&C.alive().length){a.dead=false;a.hp=a.max*.5;a._rv=0;G.revN++;if(C.ev.heal)C.ev.heal(a,a.hp);const q=R._AS().get(a.k);if(q){q.alpha=0;q.revT=0}}}
  else{a._rv=0;if(el&&el.classList.contains('down')){el.classList.remove('down');const c=el.querySelector('.rvc');c&&c.remove()}}})}catch(_){}return r};
})();
;(()=>{// v37 defeat growth guide: boss HP left + tappable shortcuts (장비 강화 / 동료 육성 / 소환), shown longer
let bp=null;const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{const b=C.alive().find(e=>e.boss&&!e.wb);if(b)bp=Math.max(0,b.hp/b.max)}catch(_){}return r};
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{if(w||C.B.br||C.B.rb)return r;const d=[...document.querySelectorAll('.vic.lose')].pop();if(!d)return r;G.guideN=(G.guideN||0)+1;
 const s=C.S(),gc=s.gold,pct=bp!=null?Math.max(1,Math.round(bp*100)):null;
 const vn=d.querySelector('.vn');vn.outerHTML=`${pct?`<div class=gdhp>보스 남은 체력 <b>${pct}%</b><i><em style="width:${pct}%"></em></i></div>`:''}<div class=gdt>강해지는 방법</div><div class=gdb>
  <span data-g=gear><img src=assets/it2_stone.png><b>장비 강화</b><small>강화석 ${fmt(s.stone||0)}</small></span>
  <span data-g=comp><img src=assets/ally_gourry.png><b>동료 육성</b><small>레벨·스킬 강화</small></span>
  <span data-g=summon><img src=assets/it2_gold.png><b>소환</b><small>새 동료·장비</small></span></div><div class=gdn>탭하여 이동 · 자동 재도전 대기</div>`;
 const n=d.cloneNode(true);d.replaceWith(n);n.classList.add('guide');n.classList.remove('out');
 n.onclick=ev=>{const g=ev.target.closest('[data-g]');n.remove();if(!g)return;ev.stopPropagation();if(g.dataset.g=='summon')menuGo('summon');else{G.enTab=g.dataset.g;menuGo('enhance')}};
 setTimeout(()=>{n.classList.add('out');setTimeout(()=>n.remove(),400)},5000);
}catch(_){}return r};
})();
;(()=>{// v38 timed battle buffs (화룡전-style): 공격력 +50% / 골드 x2 / 경험치 x2, 30분 each, 3 free claims per day, stack to 2h
const BF=[{k:'atk',n:'공격력 +50%',img:'it2_sword.png'},{k:'gold',n:'골드 획득 x2',img:'it2_gold.png'},{k:'exp',n:'경험치 x2',img:'it2_exp.png'}],DUR=30*60e3,CAP=120*60e3,MAXN=3;
const st=()=>{const s=C.S();const d=new Date().toDateString();s.buf=s.buf||{};if(s.buf.day!==d){s.buf.day=d;s.buf.n={}}s.buf.n=s.buf.n||{};return s.buf};
const left=k=>Math.max(0,(st()[k]||0)-Date.now());G.bufOn=k=>left(k)>0;
const oA=C.ATK;C.ATK=()=>oA()*(G.bufOn('atk')?1.5:1);
const og=C.goldKill;C.goldKill=i=>og(i)*(G.bufOn('gold')?2:1);const ox=C.expKill;C.expKill=i=>ox(i)*(G.bufOn('exp')?2:1);
const mm=ms=>{const m=Math.floor(ms/60e3),s=Math.floor(ms/1e3)%60;return m+':'+String(s).padStart(2,'0')};
G.bufClaim=k=>{const b=st();if((b.n[k]||0)>=MAXN)return 'max';const cur=Math.max(Date.now(),b[k]||0);if(cur-Date.now()+DUR>CAP)return 'cap';b[k]=cur+DUR;b.n[k]=(b.n[k]||0)+1;try{G.save&&G.save()}catch(_){}try{updateHud()}catch(_){}return true};
const html=()=>`<div class=ttl style="justify-content:center">전투 버프</div><div class=bfl>${BF.map(x=>{const l=left(x.k),n=st().n[x.k]||0;return `<div class="bfr ${l?'on':''}"><img src=assets/${x.img}><div class=f><b>${x.n}</b><small>${l?'남은 시간 '+mm(l):'비활성'} · 오늘 ${n}/${MAXN}</small></div><span class="pill ${n>=MAXN?'off':'green'}" data-bf=${x.k}>${n>=MAXN?'소진':'+30분'}</span></div>`}).join('')}</div><div class=bfn>최대 2시간까지 누적 · 매일 초기화</div>`;
G.bufOpen=()=>{const m=modal(html());const card=m.querySelector('.card');const wire=()=>card.querySelectorAll('[data-bf]').forEach(p=>p.onclick=e=>{e.stopPropagation();const r=G.bufClaim(p.dataset.bf);if(r!==true){toast(r=='max'?'오늘 횟수를 모두 사용했습니다':'최대 2시간까지 누적됩니다');return}G.bufN=(G.bufN||0)+1;const ok=card.querySelector('.btn');card.innerHTML=html();card.appendChild(ok);wire()});wire();
  const iv=setInterval(()=>{if(!document.body.contains(m))return clearInterval(iv);card.querySelectorAll('.bfr').forEach((r,i)=>{const l=left(BF[i].k);r.classList.toggle('on',!!l);const sm=r.querySelector('small');sm.textContent=(l?'남은 시간 '+mm(l):'비활성')+' · 오늘 '+(st().n[BF[i].k]||0)+'/'+MAXN})},1000)};
const add=()=>{const d=document.getElementById('battle');if(!d||document.getElementById('bufBtn'))return;const b=document.createElement('span');b.id='bufBtn';b.innerHTML='<img src=assets/it2_sword.png><i>버프</i>';d.appendChild(b);b.onclick=e=>{e.stopPropagation();G.bufOpen()}};
setInterval(()=>{try{add();const b=document.getElementById('bufBtn');if(!b)return;const on=BF.filter(x=>left(x.k));b.classList.toggle('on',on.length>0);b.querySelector('i').textContent=on.length?mm(Math.min(...on.map(x=>left(x.k)))):'버프';
 const s=C.S(),ready=BF.some(x=>(st().n[x.k]||0)<MAXN&&!left(x.k));b.classList.toggle('rd',ready)}catch(_){}},500);
})();
;(()=>{// v39 빠른 사냥: instantly collect 2h of hunting rewards from the idle popup; 1 free + 2 for 50 gems per day
const N=3,COST=[0,50,50],SEC=7200;
const st=()=>{const s=C.S(),d=new Date().toDateString();s.qh=s.qh||{};if(s.qh.day!==d){s.qh.day=d;s.qh.n=0}return s.qh};
G.quickHunt=()=>{const q=st(),s=C.S();if(q.n>=N)return 'max';const c=COST[q.n];if(s.gems<c)return 'gem';s.gems-=c;const r=C.offlineCalc(SEC);r.o=Math.floor(r.o);C.addGold(r.g);C.gainExp(r.x);s.orbs+=r.o;const stn=Math.floor(SEC/900);s.stone=(s.stone||0)+stn;r.st=stn;q.n++;G.qhN=(G.qhN||0)+1;try{G.save()}catch(_){}return r};
const lbl=()=>{const q=st();return q.n>=N?'빠른 사냥 (오늘 소진)':`<span class=qhl>⚡ 빠른 사냥 2시간 <em>${COST[q.n]?'<img src=assets/it2_gem.png>'+COST[q.n]:'무료'}</em> <small>${N-q.n}/${N}</small></span>`};
setInterval(()=>{try{const b=document.getElementById('idleClaim');if(!b||document.getElementById('qhBtn'))return;const m=b.closest('.modal');const q=document.createElement('span');q.id='qhBtn';q.className='pill wide '+(st().n>=N?'off':'blue');q.innerHTML=lbl();b.after(q);
 q.onclick=e=>{e.stopPropagation();const r=G.quickHunt();if(r==='max')return toast('오늘 빠른 사냥을 모두 사용했습니다');if(r==='gem')return toast('다이아가 부족합니다');m&&m.remove();try{idleBurst(r)}catch(_){}
  G.rewardPop([['it2_gold.png',r.g,'골드'],['it2_xp.png',r.x,'경험치'],['it2_exp.png',r.o,'마정구'],['it2_stone.png',r.st,'강화석']].filter(x=>x[1]>0),'빠른 사냥 · 2시간');try{updateHud()}catch(_){}}}catch(_){}},250);
})();
;(()=>{// v40 stage 권장 전투력: estimated power to clear this stage's boss within ~60% of the timer; shown by the stage name (green/red)
const BAL=D.BAL;
C.stageReq=i=>{const pl=D.BOSSPLAN[Math.floor(i/7)],b=pl&&D.BOSSES[pl[i%7==6?1:0]];if(!b)return 0;const h=C.mobHP(i)*BAL.bossHP*(i<7?.55+.45*i/7:1)*(b.s||1)*(i%7==6?BAL.chBoss:1);const dps=Math.max(1e-9,C.estDPS());return Math.ceil(C.POW()*h/(dps*BAL.bossTime*.6)*(1+.075*i)/10)*10};
setInterval(()=>{try{const el=document.getElementById('stName');if(!el)return;let t=document.getElementById('stReq');const sb=document.getElementById('battle');if(!t&&sb){t=document.createElement('span');t.id='stReq';sb.appendChild(t)}if(!t)return;
 if(C.B.br||C.B.rb||C.B.wb){t.style.display='none';return}t.style.display='';const s=C.S(),rq=C.stageReq(s.si),pw=C.POW(),ok=pw>=rq;t.className=ok?'ok':'lo';t.innerHTML=`권장 <span class=rv>⚔${fmt(rq)}</span>`;G._stReq=rq}catch(_){}},500);
})();
;(()=>{// v41 guard: never hit/kill an enemy that is already dead or no longer on the field (stale refs from deferred hits/DoTs could re-trigger kill → repeated bossClear)
const oh=C.hitEnemy;C.hitEnemy=(e,...a)=>{if(!e||!(e.hp>0)||!C.B.enemies.includes(e)){G.staleHitN=(G.staleHitN||0)+1;return}return oh(e,...a)};
})();
;(()=>{// v41 stage first-clear reward: 다이아 30 (chapter boss 100) shown on VICTORY
const fc=()=>{const s=C.S();if(s.fcl==null)s.fcl=s.maxSi;return s};fc();
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{const s=fc();if(!w||C.B.br||C.B.rb||s.maxSi<=s.fcl)return r;let g=0;for(let i=s.fcl;i<s.maxSi;i++)g+=i%7==6?100:30;s.fcl=s.maxSi;s.gems+=g;G.fcN=(G.fcN||0)+1;G.fcG=g;try{updateHud()}catch(_){}
 let k=0;const put=()=>{const d=[...document.querySelectorAll('.vic.win:not(.out)')].pop(),vr=d&&d.querySelector('.vr');if(vr&&!vr.querySelector('.fcl')){vr.insertAdjacentHTML('beforeend',`<span class=fcl><img class=ci src=assets/it2_gem.png> +${g}<small>최초 클리어</small></span>`);G.fcShown=performance.now();return}if(k++<40)setTimeout(put,100)};put()}catch(_){}return r};
})();
;(()=>{// v42 stage stars (★1-3 from boss clear) + chapter star chest
const T=[7,14,21],RW=[{gems:50,stone:10},{gems:100,orbs:30},{gems:200,tk:1}];
const st=()=>{const s=C.S();s.stars=s.stars||{};s.schest=s.schest||{};return s};
const get=i=>{const s=st();return s.stars[i]||(i<s.maxSi||(s.done&&i==D.FIELDS.length-1)?1:0)};
G.stageStars=get;G.chStars=c=>{let n=0;for(let i=c*7;i<c*7+7;i++)n+=get(i);return n};
let run=null;const osb=C.startBoss;C.startBoss=function(){const was=C.B.boss;const r=osb.apply(this,arguments);if(!was&&C.B.boss)run={si:C.S().si,t:performance.now(),dead:new Set()};return r};
const otk=C.tick;C.tick=function(){const r=otk.apply(this,arguments);if(run&&C.B.boss)C.B.allies.forEach(a=>{if(a.dead)run.dead.add(a.k)});return r};
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{if(run&&!C.B.br&&!C.B.rb){const q=run;run=null;if(w){const sec=(performance.now()-q.t)/1000,d=q.dead.size;const n=d==0&&sec<60?3:d<=1?2:1;const s=st(),old=get(q.si);G.lastStar={si:q.si,n,sec,d};if(n>old)s.stars[q.si]=n;else s.stars[q.si]=old;
 let k=0;const put=()=>{const v=[...document.querySelectorAll('.vic.win:not(.out)')].pop(),vr=v&&v.querySelector('.vr');if(vr&&!vr.querySelector('.vst')){vr.insertAdjacentHTML('afterbegin',`<div class=vst>${[0,1,2].map(j=>`<i class="${j<n?'on':''}" style="animation-delay:${.15+j*.18}s">★</i>`).join('')}</div>`);return}if(k++<40)setTimeout(put,100)};put()}}}catch(_){}return r};
G.starClaim=(c,t)=>{const s=st(),key=c+'_'+t;if(s.schest[key])return 'done';if(G.chStars(c)<T[t])return 'need';const w=RW[t];s.schest[key]=1;s.gems+=w.gems||0;s.stone=(s.stone||0)+(w.stone||0);s.orbs+=(w.orbs||0);if(w.tk)s.tickets=(s.tickets||0)+w.tk;try{updateHud()}catch(_){}try{G.save()}catch(_){}return w};
const rl=w=>[w.gems&&`<span><img class=ci src=assets/it2_gem.png>${w.gems}</span>`,w.stone&&`<span><img class=ci src=assets/it2_stone.png>${w.stone}</span>`,w.orbs&&`<span><img class=ci src=assets/it2_exp.png>${w.orbs}</span>`,w.tk&&`<span><img class=ci src=assets/it2_ticket.png>${w.tk}</span>`].filter(Boolean).join(' ');
const ready=c=>T.some((t,j)=>G.chStars(c)>=t&&!st().schest[c+'_'+j]);
G.starOpen=c=>{const s=st(),n=G.chStars(c);const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="card schm"><div class=ttl style="justify-content:center">제${c+1}장 별 보상</div><div class=sbar><i style="width:${n/21*100}%"></i><b>★ ${n}/21</b></div>${T.map((t,j)=>{const dn=s.schest[c+'_'+j],ok=n>=t;return `<div class=srw><img src=assets/ic3_chest.png class="${ok&&!dn?'rdy':''}"><div><b>★ ${t}</b><div class=rl>${rl(RW[j])}</div></div><span class="btn ${dn||!ok?'off':''}" data-sc=${j}>${dn?'수령 완료':ok?'수령':'미달성'}</span></div>`}).join('')}<small class=shint>보스를 아군 손실 없이 60초 안에 처치하면 ★3</small><span class="btn wide" data-x style="margin-top:10px">닫기</span></div>`;
 document.body.appendChild(m);m.onclick=e=>{if(e.target==m||e.target.dataset.x!=null){m.remove();return}const b=e.target.closest('[data-sc]');if(!b)return;const r=G.starClaim(c,+b.dataset.sc);if(typeof r=='object'){toast('별 보상 획득! '+rl(r));m.remove();G.starOpen(c);if(G.screen=='map'){const w=$('#mapw'),x=w?w.scrollLeft:0;renderScreen();const w2=$('#mapw');if(w2)w2.scrollLeft=x}}}};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='map'){const el=$('#screen');el.querySelectorAll('.node').forEach(nd=>{const i=+nd.dataset.n,n=get(i);const sm=nd.querySelector('small');if(sm)sm.remove();if(n)nd.insertAdjacentHTML('beforeend',`<small class=nst>${[0,1,2].map(j=>`<i class="${j<n?'on':''}">★</i>`).join('')}</small>`)});
 const mc=el.querySelector('.mapch');if(mc){const c=Math.floor(C.S().si/7);mc.insertAdjacentHTML('afterbegin',`<div class="schb ${ready(c)?'rdy':''}" id=schB><img src=assets/ic3_chest.png><em>★${G.chStars(c)}</em></div>`);el.querySelector('#schB').onclick=e=>{e.stopPropagation();G.starOpen(c)}}}}catch(_){}return r};
})();
;(()=>{// v43 전직 (class advancement): 2차 붉은 마도사 Lv.60, 3차 드래곤 슬레이어 Lv.150
const JOB=[{n:'견습 마도사'},{n:'붉은 마도사',lv:60,img:'skin/lina_job2.png',ic:'ic_job2.png',atk:1.25,boss:'boss_salamander.png',bn:'시련의 화염 살라만더'},{n:'드래곤 슬레이어',lv:150,img:'skin/lina_job3.png',ic:'ic_job3.png',atk:1.6,boss:'boss_flamelord.png',bn:'시련의 염제'}];
D.SKINS.push({k:'job2',n:'붉은 마도사 (2차 전직)',img:JOB[1].img,atk:JOB[1].img,cast:JOB[1].img,cost:0,job:1},{k:'job3',n:'드래곤 슬레이어 (3차 전직)',img:JOB[2].img,atk:JOB[2].img,cast:JOB[2].img,cost:0,job:1});
const jt=()=>C.S().job||0;G.JOB=JOB;G.jobT=jt;
const oatk=C.ATK;C.ATK=function(){let m=1;for(let i=1;i<=jt();i++)m*=JOB[i].atk;return oatk.apply(this,arguments)*m};
const osb=C.skinBuy;C.skinBuy=k=>{const sk=D.SKINS.find(x=>x.k==k);if(sk&&sk.job)return 'job';return osb(k)};
const wear=k=>{const sk=D.SKINS.find(x=>x.k==k);if(!sk||!C.skinSet(k))return;R.skinImg=sk.img;R.skinAtk=sk.atk;R.skinCast=sk.cast};
const promote=()=>{const s=C.S(),t=jt()+1;s.job=t;s.skins=s.skins||{base:1};s.skins['job'+(t+1)]=1;wear('job'+(t+1));try{G.save()}catch(_){}try{updateHud()}catch(_){}
 const J=JOB[t],m=document.createElement('div');m.className='jobfx';m.innerHTML=`<div class=jbg></div><img class=jl src="assets/${J.img}"><img class=je src="assets/${J.ic}"><div class=jt><small>${t+1}차 전직 완료</small><b>${J.n}</b><span>공격력 ×${J.atk} 영구 증가 · 전용 복장 획득</span></div>`;
 document.getElementById('app').appendChild(m);G.jobFxAt=performance.now();m.onclick=()=>{m.classList.add('out');setTimeout(()=>m.remove(),500)};setTimeout(()=>{if(m.isConnected){m.classList.add('out');setTimeout(()=>m.remove(),500)}},4200)};
G.jobPromote=promote;
G.jobTrial=()=>{const s=C.S(),t=jt()+1,J=JOB[t];if(!J)return 'max';if(s.lv<J.lv){toast(`Lv.${J.lv} 달성 시 도전 가능`);return 'lv'}
 try{openSheet('battle')}catch(_){}G.rbRun({kind:'tw',f:t,boss:1,mob:J.boss,req:Math.floor(C.POW()*.95),title:`${t+1}차 전직 시련`},won=>{if(won)promote();else{toast('시련 실패… 더 강해져서 다시 도전하세요');renderPanel()}});
 try{const w=C.B.rb&&C.B.rb.waves,bb=w&&w[w.length-1][0];if(bb&&bb.boss){bb.n=J.bn;bb.max*=1.3;bb.hp=bb.max}}catch(_){}return 'ok'};
const card=()=>{const s=C.S(),t=jt(),cur=JOB[t],nx=JOB[t+1];
 return `<div class=jobc style="--art:url(assets/chap/job_trial.jpg)"><div class=jl1>${t?`<img src="assets/${cur.ic}">`:''}<div><small>현재 클래스</small><b>${cur.n}</b></div></div>${nx?`<div class=jl2><span>다음: <b>${t+2}차 ${nx.n}</b> · 공격력 ×${nx.atk}</span><span class="pill ${s.lv>=nx.lv?'gold':'off'}" id=jobGo>${s.lv>=nx.lv?'전직 시련':'Lv.'+nx.lv+' 필요'}</span></div>`:'<div class=jl2><span>최종 전직 완료</span></div>'}</div>`};
const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab=='train'){const h=document.querySelector('#panel .trainhero');if(h&&!document.querySelector('#panel .jobc')){h.insertAdjacentHTML('beforebegin',card());const g=document.getElementById('jobGo');if(g)g.onclick=()=>G.jobTrial()}
 const im=h&&h.querySelector('img');if(im&&jt())im.src='assets/'+JOB[jt()].img}}catch(_){}return r};
const ouh=updateHud;updateHud=function(){const r=ouh.apply(this,arguments);try{const t=jt(),pi=document.querySelector('#prof .pinfo');let b=document.getElementById('hJob');if(t&&pi){if(!b){b=document.createElement('span');b.id='hJob';pi.insertBefore(b,pi.firstChild)}const v=`<img src="assets/${JOB[t].ic}">${JOB[t].n}`;if(b.innerHTML!==v)b.innerHTML=v}else if(b)b.remove();}catch(_){}return r};
// restore worn job skin on load
setTimeout(()=>{const s=C.S();if(s.skin&&/^job/.test(s.skin))wear(s.skin);try{updateHud()}catch(_){}},50);
})();
;(()=>{// v44 전직 signature: 드래곤 슬레이브 Ⅱ / 극 + job attack/cast poses
const P={'skin/lina_job2_atk.png':[1.021,.021,.177],'skin/lina_job2_cast.png':[1.2,.074,-.03],'skin/lina_job3_atk.png':[1.044,.014,.147],'skin/lina_job3_cast.png':[1.164,.046,.011]};R.PB=Object.assign(R.PB||{},P);
const J={job2:['skin/lina_job2_atk.png','skin/lina_job2_cast.png'],job3:['skin/lina_job3_atk.png','skin/lina_job3_cast.png']};
for(const k in J){const sk=D.SKINS.find(x=>x.k==k);if(sk){sk.atk=J[k][0];sk.cast=J[k][1]}}
const fix=()=>{const s=C.S();if(s.skin&&J[s.skin]){R.skinAtk=J[s.skin][0];R.skinCast=J[s.skin][1]}};fix();setTimeout(fix,80);
const op=G.jobPromote;G.jobPromote=function(){const r=op.apply(this,arguments);fix();return r};
Object.defineProperty(R,'jobLv',{get:()=>G.jobT(),configurable:true});
const DSM=[1,1.5,2.2];const ocs=C.castSpell;C.castSpell=sp=>{const t=G.jobT();if(sp&&sp.k=='ds'&&t)sp=Object.assign({},sp,{mul:sp.mul*DSM[t]});return ocs(sp)};
})();
;(()=>{['cut/lina_ult_job2.png','cut/lina_ult_job3.png','skin/lina_job2_atk.png','skin/lina_job2_cast.png','skin/lina_job3_atk.png','skin/lina_job3_cast.png'].forEach(s=>{const i=new Image();i.src='assets/'+s})})();
;(()=>{// v45 boss-fight body flag (combo banner moves off the boss band)
let on=false;setInterval(()=>{const b=!!(C.B.boss&&C.alive().some(e=>e.boss));if(b!==on){on=b;document.body.classList.toggle('bossfight',b)}},150);
// 권장 전투력 recalibration from growth sim (players clear ch3+ at well under the old estimate)
const osr=C.stageReq;C.stageReq=i=>{const v=osr(i);const k=i<=3?1:i<=10?1-(i-3)*.09:.37*Math.pow(.97,i-10);return v?Math.ceil(v*k/10)*10:v};
})();
;(()=>{// v46 scripted free 10-pull tickets on first clear of 1-7 / 2-7 (smooth early companion curve)
const GR={3:3,7:5,11:5,14:10};const oc=C.ev.clear;C.ev.clear=function(){const r=oc&&oc.apply(this,arguments);try{const s=C.S();s.fgr=s.fgr||{};for(const k in GR){if(s.maxSi>=+k&&!s.fgr[k]){s.fgr[k]=1;s.tickets=(s.tickets||0)+GR[k];G.fgrN=(G.fgrN||0)+1;(()=>{const n=GR[k];let tries=0;const put=()=>{const v=[...document.querySelectorAll('.vic.win:not(.out)')].pop(),vr=v&&v.querySelector('.vr');if(vr&&!vr.querySelector('.tkg')){vr.insertAdjacentHTML('beforeend',`<span class="fcl tkg"><img class=ci src=assets/it2_ticket.png> +${n}<small>소환권 보상</small></span>`);return}if(tries++<40)setTimeout(put,100);else try{toast(`🎁 동료 소환권 ×${n} 지급`)}catch(_){}};put();setTimeout(()=>{try{toast(`<b style="color:#ffd77a">🎁 동료 소환권 ×${n}</b> 지급 · 소환 탭에서 사용`);updateHud()}catch(_){}},5200)})()}}}catch(_){}return r};
})();
;(()=>{// v47 companion scaling trim (pacing: 5-7 ≈ 6-10h active)
G.COMP_TRIM=.85;const om=C.compMul;C.compMul=k=>om(k)*G.COMP_TRIM;try{C.buildAllies()}catch(_){}})();
;(()=>{// v48 income trim (gold/exp per kill; offline & quick hunt derive from these)
G.INC_TRIM=.45;const og=C.goldKill,ox=C.expKill;C.goldKill=i=>og(i)*G.INC_TRIM;C.expKill=i=>ox(i)*G.INC_TRIM})();
;(()=>{// v49 chapter card never overlaps VICTORY: park it while a result panel is up, replay afterwards
let parked=null;setInterval(()=>{const v=document.querySelector('.vic:not(.out)');if(v){const c=document.querySelector('.chap');if(c&&!parked){parked=c.cloneNode(true);c.remove();document.body.classList.remove('chapon')}return}
 if(parked){const d=parked;parked=null;d.className='chap';document.body.appendChild(d);document.body.classList.add('chapon');const rm=()=>{d.remove();if(!document.querySelector('.chap'))document.body.classList.remove('chapon')};d.onclick=rm;setTimeout(()=>d.classList.add('out'),2600);setTimeout(rm,3300);G.chapReplay=(G.chapReplay||0)+1}},120);
})();
;(()=>{// v50 미션 모두 받기 (daily + weekly)
const ready=()=>{const s=C.S();C.daily();C.weekly();const d=D.MISSIONS.filter(m=>(s.mp[m.k]||0)>=m.goal&&!s.mc[m.k]),w=(D.WMISS||[]).filter(m=>(s.wk.p[m.k]||0)>=m.goal&&!s.wk.c[m.k]);return{d,w}};
G.missionClaimAll=()=>{const {d,w}=ready();let g=0,t=0,n=0;G._bulk=1;setTimeout(()=>{G._bulk=0},0);d.forEach(m=>{const r=C.claimMission(m.k);if(r){g+=r;n++}});w.forEach(m=>{const t0=C.S().tickets||0,g0=C.S().gems;if(C.claimW(m.k)){n++;g+=C.S().gems-g0;t+=(C.S().tickets||0)-t0}});
 if(!n){toast('받을 보상이 없습니다');return 0}try{updateHud()}catch(_){}renderPanel();setTimeout(()=>{try{rewardPop([g&&['it2_gem.png',g,'보석'],t&&['it2_ticket.png',t,'소환권']].filter(Boolean),'미션 보상 '+n+'개 수령')}catch(_){toast('미션 보상 '+n+'개 수령')}},10);return n};
const odp=diffPop;diffPop=function(){if(G._bulk)return;return odp.apply(this,arguments)};
const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab=='mission'){const p=$('#panel');if(!p.querySelector('.mcall')){const {d,w}=ready(),n=d.length+w.length;const b=document.createElement('div');b.className='mcall '+(n?'':'off');b.innerHTML=`🎁 모두 받기${n?` <small>${n}</small>`:''}`;b.onclick=()=>G.missionClaimAll();p.insertBefore(b,p.firstChild)}}}catch(_){}return r};
})();
;(()=>{setInterval(()=>{document.body.classList.toggle('sheeton',!!(G.tab&&G.tab!='battle')||!!G.screen)},150)})();
;(()=>{// v51 사운드: procedural WebAudio SFX + light BGM (original, synthesized; respects 설정 배경음/효과음)
let ac=null,mg=null,sg=null,bg=null,nz=null;G.sfxN={};
const on=k=>{try{const s=G.set||G.loadSet();return s[k]!==false&&s[k]!==0}catch(_){return true}};
const init=()=>{if(ac)return;try{ac=new (window.AudioContext||window.webkitAudioContext)();mg=ac.createGain();mg.gain.value=1;const cp=ac.createDynamicsCompressor();cp.threshold.value=-30;cp.knee.value=8;cp.ratio.value=6;cp.attack.value=.003;cp.release.value=.2;const mk=ac.createGain();mk.gain.value=G.MAKEUP||1.2;const lim=ac.createDynamicsCompressor();lim.threshold.value=-10.5;lim.knee.value=0;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.08;mg.connect(cp);cp.connect(mk);mk.connect(lim);lim.connect(ac.destination);G._mk=mk;G._an=ac.createAnalyser();G._an.fftSize=2048;lim.connect(G._an);G._mg=lim;sg=ac.createGain();sg.connect(mg);bg=ac.createGain();bg.connect(mg);G._vol=()=>{const st=G.set||G.loadSet(),sv=(st.sfxV??80)/100,bv=(st.bgmV??70)/100;sg.gain.value=.55*sv*sv*1.56;bg.gain.value=.16*bv*bv*2.04};G._vol();
 const len=ac.sampleRate*.5,b=ac.createBuffer(1,len,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;nz=b;startBgm()}catch(_){ac=null}};
['pointerdown','keydown','touchstart'].forEach(e=>window.addEventListener(e,()=>{init();if(ac&&ac.state=='suspended')ac.resume()},{passive:true}));
document.addEventListener('visibilitychange',()=>{if(!ac)return;document.hidden?ac.suspend():ac.resume()});
const tone=(f,t0,dur,{type='square',vol=.3,f2=null,att=.005,dest=sg}={})=>{const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t0+dur);g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+att);g.gain.exponentialRampToValueAtTime(.0005,t0+dur);o.connect(g);g.connect(dest);o.start(t0);o.stop(t0+dur+.02)};
const noise=(t0,dur,{vol=.3,fq=1200,q=1,type='bandpass',f2=null}={})=>{const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=nz;f.type=type;f.frequency.setValueAtTime(fq,t0);if(f2)f.frequency.exponentialRampToValueAtTime(f2,t0+dur);f.Q.value=q;g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.0005,t0+dur);s.connect(f);f.connect(g);g.connect(sg);s.start(t0);s.stop(t0+dur+.02)};
const LIM={hit:.06,crit:.08,coin:.07,kill:.05,click:.05};const last={};
const SFX={
 hit:t=>{noise(t,.07,{vol:.18,fq:1800,q:.8});tone(220,t,.06,{type:'triangle',vol:.12,f2:120})},
 crit:t=>{noise(t,.12,{vol:.3,fq:2600,q:.6});tone(660,t,.1,{type:'square',vol:.1,f2:330})},
 kill:t=>{tone(520,t,.08,{type:'triangle',vol:.14,f2:260})},
 coin:t=>{tone(1320,t,.07,{type:'square',vol:.07});tone(1760,t+.06,.1,{type:'square',vol:.07})},
 spell:t=>{noise(t,.35,{vol:.22,fq:500,f2:3000,q:1.5});tone(300,t,.3,{type:'sawtooth',vol:.06,f2:900})},
 ds:t=>{noise(t,1.1,{vol:.25,fq:300,f2:2400,q:2});for(let i=0;i<4;i++)tone(180+i*90,t+i*.12,.5,{type:'sawtooth',vol:.05,f2:500+i*200});noise(t+1.15,1.2,{vol:.55,fq:900,f2:120,q:.6,type:'lowpass'});tone(70,t+1.15,1,{type:'sine',vol:.5,f2:35})},
 heal:t=>{[784,988,1175].forEach((f,i)=>tone(f,t+i*.07,.35,{type:'sine',vol:.12}))},
 lvup:t=>{[523,659,784,1047].forEach((f,i)=>tone(f,t+i*.08,.25,{type:'square',vol:.09}));tone(1047,t+.32,.5,{type:'triangle',vol:.12})},
 win:t=>{[523,659,784,1047,784,1047].forEach((f,i)=>tone(f,t+[0,.12,.24,.36,.6,.72][i],.3,{type:'square',vol:.1}));tone(262,t,.9,{type:'triangle',vol:.12})},
 lose:t=>{[392,349,311,262].forEach((f,i)=>tone(f,t+i*.18,.35,{type:'triangle',vol:.12}))},
 warn:t=>{for(let i=0;i<3;i++){tone(220,t+i*.45,.38,{type:'sawtooth',vol:.12});tone(233,t+i*.45,.38,{type:'sawtooth',vol:.08})}},
 brk:t=>{noise(t,.5,{vol:.5,fq:3000,f2:400,q:.5});tone(110,t,.4,{type:'square',vol:.15,f2:40})},
 summon:t=>{noise(t,.8,{vol:.18,fq:400,f2:5000,q:3});[659,880,1175,1568].forEach((f,i)=>tone(f,t+.5+i*.07,.4,{type:'sine',vol:.1}))},
 click:t=>{tone(880,t,.04,{type:'square',vol:.05})},
 ult:t=>{noise(t,.25,{vol:.3,fq:4000,f2:800,q:.7});tone(440,t+.05,.4,{type:'sawtooth',vol:.07,f2:880})}};
const play=G.sfx=k=>{G.sfxN[k]=(G.sfxN[k]||0)+1;if(!ac||!on('sfx')||document.hidden)return;const now=ac.currentTime;if(LIM[k]&&last[k]&&now-last[k]<LIM[k])return;last[k]=now;try{SFX[k](now+.005)}catch(_){}};
// hooks
{const oh=C.ev.hit;C.ev.hit=(e,d,cr,...a)=>{play(cr?'crit':'hit');return oh&&oh(e,d,cr,...a)}}
{const ok=C.ev.kill;C.ev.kill=(e,g,o,...a)=>{play(e&&e.boss?'brk':'kill');if(g)setTimeout(()=>play('coin'),120);return ok&&ok(e,g,o,...a)}}
{const og=C.ev.grog;if(og)C.ev.grog=(...a)=>{play('brk');return og(...a)}}
{const oc=C.castSpell;C.castSpell=sp=>{const r=oc(sp);if(r)play(sp.k=='ds'||sp.k=='giga'?'ds':sp.heal?'heal':'spell');return r}}
{const ob=banner;banner=function(t){if(/^LEVEL UP/.test(t))play('lvup');return ob.apply(this,arguments)}}
{const orp=resultPop;resultPop=function(w){play(w?'win':'lose');return orp.apply(this,arguments)}}
{const obw=bossWarn;bossWarn=function(){const r=obw.apply(this,arguments);if(document.querySelector('.bwarn'))play('warn');return r}}
{const os=C.summon;C.summon=n=>{const r=os(n);if(r)play('summon');return r}}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.btn,.pill,.mcall,.tog,.navb,nav *,.chip,.sk'))play('click')},true);
// BGM: soft procedural loop (calm on field, driving in boss fights)
const PROG=[[57,60,64],[53,57,60],[55,59,62],[52,55,59]],ARP=[0,2,1,2,0,2,1,2];let step=0,nextT=0,timer=null;
const mid=n=>440*Math.pow(2,(n-69)/12);
function startBgm(){if(timer)return;nextT=ac.currentTime+.1;timer=setInterval(()=>{if(!ac||document.hidden)return;const boss=!!(C.B.boss);const spb=boss?.16:.24;
 while(nextT<ac.currentTime+.3){if(on('bgm')){const ch=PROG[Math.floor(step/16)%4],i=step%16;
   if(i%8==0)ch.forEach(n=>tone(mid(n-12),nextT,spb*8,{type:'triangle',vol:boss?.10:.07,att:.08,dest:bg}));
   if(i%2==0)tone(mid(ch[ARP[(i/2)%8]]+(boss?0:12)),nextT,spb*1.6,{type:boss?'sawtooth':'square',vol:boss?.035:.03,dest:bg});
   if(boss&&i%4==0)noise(nextT,.08,{vol:.12,fq:150,type:'lowpass'});
   if(i%4==0)tone(mid(ch[0]-24),nextT,spb*3,{type:'sine',vol:.12,dest:bg})}
  step++;nextT+=spb}},80)}
G.audioState=()=>({ctx:ac?ac.state:null,n:G.sfxN});
})();
;(()=>{// v52 volume sliders (배경음/효과음)
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const st=G.set||G.loadSet();
 [['bgm','bgmV',70,'배경음 볼륨'],['sfx','sfxV',80,'효과음 볼륨']].forEach(([k,vk,def,n])=>{const tg=document.querySelector(`#screen [data-set="${k}"]`),row=tg&&tg.closest('.row');if(!row||row.nextElementSibling&&row.nextElementSibling.classList.contains('volrow'))return;
  const v=st[vk]??def;const d=document.createElement('div');d.className='row volrow';d.innerHTML=`<div class=f><small>${n}</small></div><input type=range min=0 max=100 step=5 value=${v} data-vol=${vk}><b class=vv>${v}</b>`;row.after(d);
  const inp=d.querySelector('input');inp.oninput=()=>{G.set[vk]=+inp.value;d.querySelector('.vv').textContent=inp.value;G._vol&&G._vol();try{localStorage.setItem('slayers_set',JSON.stringify(G.set))}catch(_){}};inp.onchange=()=>{if(vk=='sfxV'&&G.sfx)G.sfx('coin')}})}}catch(_){}return r};
})();
;(()=>{// v53 신규 7일 성장 이벤트 (newbie 7-day roadmap)
const T=[
 [['stage',4,'1-5 도달',{gems:50}],['lv',10,'레벨 10 달성',{gems:50}],['summon',3,'동료 소환 3회',{tk:2}]],
 [['stage',8,'2-2 도달',{gems:80}],['enh',5,'장비 강화 5회',{stone:15}],['kills',500,'몬스터 500마리 처치',{gems:60}]],
 [['stage',12,'2-6 도달',{gems:100}],['lv',25,'레벨 25 달성',{gems:80}],['summon',10,'동료 소환 10회',{tk:3}]],
 [['stage',15,'3-2 도달',{gems:120}],['enh',20,'장비 강화 20회',{stone:30}],['rolls',100,'장비 뽑기 100회',{gems:80}]],
 [['stage',18,'3-5 도달',{gems:150}],['lv',40,'레벨 40 달성',{gems:100}],['kills',3000,'몬스터 3,000마리 처치',{tk:3}]],
 [['stage',21,'4-1 도달',{gems:180}],['summon',30,'동료 소환 30회',{tk:5}],['enh',40,'장비 강화 40회',{stone:50}]],
 [['stage',25,'4-5 도달',{gems:250}],['lv',55,'레벨 55 달성',{gems:150}],['kills',8000,'몬스터 8,000마리 처치',{tk:5}]]];
const FIN={tk:5,gems:200};
const st=()=>{const s=C.S();if(!s.nb)s.nb={t0:C.now(),c:{},fin:0};return s.nb};st();
const day=()=>Math.min(7,Math.floor((C.now()-st().t0)/864e5)+1);
const val=k=>{const s=C.S();return k=='stage'?s.maxSi:k=='lv'?s.lv:k=='summon'?(s.mile||0):k=='enh'?((s.ac&&s.ac.enh)||0):k=='kills'?(s.kills||0):k=='rolls'?((s.stats&&s.stats.rolls)||0):0};
const done=(d,i)=>{const t=T[d][i];return val(t[0])>=t[1]};
const can=(d,i)=>d<day()&&done(d,i)&&!st().c[d+'_'+i];
const allC=()=>T.every((r,d)=>r.every((_,i)=>st().c[d+'_'+i]));
const nReady=()=>{let n=0;T.forEach((r,d)=>r.forEach((_,i)=>{if(can(d,i))n++}));if(allC()&&!st().fin)n++;return n};
const give=w=>{const s=C.S();s.gems+=w.gems||0;s.tickets=(s.tickets||0)+(w.tk||0);s.stone=(s.stone||0)+(w.stone||0)};
const rl=w=>[w.gems&&['it2_gem.png',w.gems,'보석'],w.tk&&['it2_ticket.png',w.tk,'소환권'],w.stone&&['it2_stone.png',w.stone,'강화석']].filter(Boolean);
const chip=w=>rl(w).map(([i,n])=>`<span><img class=ci src=assets/${i}>${n}</span>`).join(' ');
G.nbClaim=(d,i)=>{if(!can(d,i))return 0;st().c[d+'_'+i]=1;const w=T[d][i][3];give(w);try{updateHud()}catch(_){}return w};
G.nbFin=()=>{if(!allC()||st().fin)return 0;st().fin=1;give(FIN);try{updateHud()}catch(_){}return FIN};
let sel=null;
G.nbOpen=d0=>{const D0=day();sel=d0??(sel??Math.max(0,Math.min(6,(T.findIndex((r,d)=>r.some((_,i)=>can(d,i)))+1||D0)-1)));document.querySelectorAll('.modal.nbm').forEach(x=>x.remove());
 const m=document.createElement('div');m.className='modal nbm';const tot=T.length*3,got=Object.keys(st().c).length;
 m.innerHTML=`<div class="card nbc"><div class=nbh><b>신규 7일 성장 이벤트</b><small>${D0}일차 · 매일 새로운 미션 개방</small></div>
 <div class=nbd>${T.map((r,d)=>{const lk=d>=D0,rd=!lk&&r.some((_,i)=>can(d,i)),ok=r.every((_,i)=>st().c[d+'_'+i]);return `<span class="nbt ${d==sel?'on':''} ${lk?'lk':''} ${ok?'ok':''} ${rd?'rd':''}" data-d=${d}>${lk?'🔒':ok?'✔':''}${d+1}일</span>`}).join('')}</div>
 <div class=nbl>${sel>=D0?`<div class=nblk>🔒 ${sel+1}일차에 개방됩니다</div>`:T[sel].map((t,i)=>{const v=val(t[0]),c=st().c[sel+'_'+i],dn=v>=t[1];return `<div class=nbr><div class=f><b>${t[2]}</b><div class=nbp><i style="width:${Math.min(100,v/t[1]*100)}%"></i><em>${Math.min(v,t[1]).toLocaleString()}/${t[1].toLocaleString()}</em></div><div class=rl>${chip(t[3])}</div></div><span class="btn ${c||!dn?'off':''}" data-c=${i}>${c?'완료':dn?'받기':'진행 중'}</span></div>`}).join('')}</div>
 <div class="nbf ${allC()&&!st().fin?'rd':''}"><div class=f><b>전체 완료 보상</b><small>${got}/${tot} 미션</small><div class=rl>${chip(FIN)}</div></div><span class="btn ${allC()&&!st().fin?'':'off'}" id=nbFin>${st().fin?'수령 완료':'받기'}</span></div>
 <span class="btn wide" data-x style="margin-top:10px">닫기</span></div>`;
 document.body.appendChild(m);
 m.onclick=e=>{if(e.target==m||e.target.dataset.x!=null){m.remove();refresh();return}const t=e.target.closest('[data-d]');if(t){G.nbOpen(+t.dataset.d);return}const c=e.target.closest('[data-c]');if(c){const w=G.nbClaim(sel,+c.dataset.c);if(w){G.nbOpen(sel);try{rewardPop(rl(w),'7일 이벤트 보상')}catch(_){}}return}if(e.target.id=='nbFin'){const w=G.nbFin();if(w){G.nbOpen(sel);try{rewardPop(rl(w),'7일 이벤트 전체 완료!')}catch(_){}}}}};
const btn=document.createElement('span');btn.id='nbBtn';btn.className='pill';btn.innerHTML='🎁 7일';btn.onclick=e=>{e.stopPropagation();G.nbOpen()};
const place=()=>{const b=document.getElementById('bufBtn');if(b&&!document.getElementById('nbBtn'))b.after(btn)};
const refresh=()=>{place();const s=st();const gone=s.fin&&allC();btn.style.display=gone?'none':'';btn.classList.toggle('rd',nReady()>0)};
setInterval(refresh,700);refresh();G.nbState=()=>({day:day(),ready:nReady(),c:Object.keys(st().c).length,fin:st().fin});
})();
;(()=>{// v54 장비 세트 효과 (등급 세트 + 강화 합계 세트)
const RS=[{r:1,a:5,h:5},{r:2,a:10,h:10},{r:3,a:20,h:20},{r:4,a:35,h:35},{r:5,a:60,h:60}],ES=[{n:24,a:3},{n:48,a:6},{n:80,a:10},{n:120,a:15}],NS=D.SLOTS.length;
const st=()=>{const s=C.S(),g=Object.values(s.gear||{}).filter(Boolean);const cnt=r=>g.filter(x=>x.r>=r).length;let rt=null;RS.forEach(t=>{if(cnt(t.r)>=NS)rt=t});const en=g.reduce((a,x)=>a+(x.en||0),0);let et=null;ES.forEach(t=>{if(en>=t.n)et=t});return{cnt,rt,en,et}};
C.gearSet=()=>{const x=st();return{atk:((x.rt?x.rt.a:0)+(x.et?x.et.a:0))/100,hp:(x.rt?x.rt.h:0)/100,x}};
{const oa=C.atkPct;C.atkPct=()=>oa()+C.gearSet().atk;const oh=C.MAXHP;C.MAXHP=()=>oh()*(1+C.gearSet().hp)}
let last=null;const key=()=>{const x=st();return (x.rt?x.rt.r:0)+'_'+(x.et?x.et.n:0)};
G.gsCard=()=>{const x=st();return `<div class="card gsc"><div class=ttl>장비 세트 효과 <small>${NS}부위 모두 충족 시</small></div>${RS.map(t=>{const c=Math.min(NS,x.cnt(t.r)),ok=c>=NS;return `<div class="row gsr ${ok?'on':''}"><i style="background:${D.RAR[t.r].c}"></i><div class=f><b style="color:${D.RAR[t.r].c}">${D.RAR[t.r].n}+ 세트</b> <small>공격력 +${t.a}% · 체력 +${t.h}%</small><div class=bar><i style="width:${c/NS*100}%;background:${D.RAR[t.r].c}"></i></div></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':c+'/'+NS}</span></div>`}).join('')}<div class=ttl style="margin-top:6px">강화 합계 <small>현재 +${x.en}</small></div>${ES.map(t=>{const ok=x.en>=t.n;return `<div class="row gsr ${ok?'on':''}"><div class=f><b>강화 +${t.n}</b> <small>공격력 +${t.a}%</small><div class=bar><i style="width:${Math.min(1,x.en/t.n)*100}%"></i></div></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':x.en+'/'+t.n}</span></div>`}).join('')}</div>`};
const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab=='gear'){const p=document.querySelector('#panel .pbody')||document.querySelector('#panel');if(p&&!p.querySelector('.gsc'))p.insertAdjacentHTML('beforeend',G.gsCard())}}catch(e){}return r};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const k=key();if(last!==null&&k!==last){const x=st();const [a,b]=last.split('_').map(Number);if((x.rt?x.rt.r:0)>a)toast(`✨ ${D.RAR[x.rt.r].n}+ 세트 효과 발동! 공격력·체력 +${x.rt.a}%`);else if((x.et?x.et.n:0)>b)toast(`✨ 강화 합계 +${x.et.n} 세트 발동! 공격력 +${x.et.a}%`)}last=k}catch(e){}return r};
})();
;(()=>{// v55 전투력 분석 (프로필 탭 → 전투력 구성 + 성장 추천)
const pc=v=>Math.round((v||0)*100);const sf=f=>{try{return f()||0}catch(_){return 0}};
G.powInfo=()=>{const s=C.S(),A=C.ATK(),H=C.MAXHP(),cp=s.party.reduce((a,k)=>a+A*4*C.compMul(k),0),parts=[['마법 공격',A*10,'#ff7a5a'],['체력',H,'#5ad07a'],['방어·치명',C.stat('def')*20+C.stat('crit')*50,'#5ab0ff'],['동료',cp,'#c08aff']],tot=parts.reduce((a,x)=>a+x[1],0)||1;
 const bon=[['장비 세트',sf(()=>C.gearSet().atk),sf(()=>C.gearSet().hp),'gear'],['도감',sf(()=>C.codexB().atk+(C.cdxB?C.cdxB('atk'):0)),sf(()=>C.codexB().hp+(C.cdxB?C.cdxB('hp'):0)),'codex'],['기보',sf(()=>C.relicB('atk')),sf(()=>C.relicB('hp')),'relic'],['동료 시너지',sf(()=>C.synergy().reduce((a,x)=>a+x.atk,0)),sf(()=>C.synergy().reduce((a,x)=>a+x.hp,0)),'party'],['펫',sf(()=>C.petB&&C.petB('atk')),sf(()=>C.petB&&C.petB('hp')),'pet'],['협회',sf(()=>C.gBuf&&C.gBuf('atk')+Object.keys(s.guild.don).length*BAL.donate.buff+.02*(s.guild.lv-1)),sf(()=>C.gBuf&&C.gBuf('hp')),'guild'],['칭호',sf(()=>((C.titleCur()||{}).atk||0)/100),0,'title']];
 return{tot,parts,bon,req:C.stageReq(s.maxSi)}};
G.powOpen=()=>{const I=G.powInfo(),BD=G.BD||{},r=C.POW()/I.req;
 const rec=[['enhance','장비 강화','장비 +1마다 능력치 +10%'],['train','마력 수련','레벨·스탯 단련'],['summon','동료 소환','동료 1명당 공격력 ×4 기여'],['relic','기보','공격력·체력 %'],['pet','펫','추가 % 보너스']];
 modal(`<div class="ttl pwt" style="justify-content:center;font-size:18px">전투력 분석</div><div class=pwnk><b>${G.nick()}</b> <span id=nkEd>✏️ 변경</span></div><div class=pwbig>⚔ ${fmt(C.POW())}<small class="${r>=1?'up':'dn'}">현재 스테이지 권장 ${fmt(I.req)} (${Math.round(r*100)}%)</small></div>
 <div class=pwbar>${I.parts.map(p=>`<i style="width:${p[1]/I.tot*100}%;background:${p[2]}"></i>`).join('')}</div><div class=pwleg>${I.parts.map(p=>`<span><i style="background:${p[2]}"></i>${p[0]} ${Math.round(p[1]/I.tot*100)}%</span>`).join('')}</div>
 <div class=pwh>보너스 출처 <small>공격력 / 체력</small></div><div class=pwl>${I.bon.map(b=>`<div class="pwr ${b[1]||b[2]?'':'z'}"><b>${b[0]}</b><span>+${pc(b[1])}%</span><span>+${pc(b[2])}%</span></div>`).join('')}</div>
 <div class=pwh>성장 추천</div><div class=pwg>${rec.map(x=>`<span class=pwgo data-k=${x[0]}>${BD[x[0]]?'<em></em>':''}<b>${x[1]}</b><small>${x[2]}</small></span>`).join('')}</div>`);
 {const e=document.getElementById('nkEd');if(e)e.onclick=()=>{document.querySelectorAll('.modal').forEach(m=>m.remove());G.nickEdit()}}document.querySelectorAll('.pwgo').forEach(e=>e.onclick=()=>{document.querySelectorAll('.modal').forEach(m=>m.remove());menuGo(e.dataset.k)})};
document.addEventListener('click',ev=>{const t=ev.target.closest&&ev.target.closest('#prof');if(t&&!G.screen){ev.stopPropagation();ev.preventDefault();G.powOpen()}},true);
})();
;(()=>{// v56 친구 · 우정 포인트 (NPC 친구 · 일일 하트 주고받기 · 우정 상점)
const FR=[['붉은망토리나','ally_amelia.png'],['검사가우리팬','ally_gourry.png'],['키메라젤','ally_zelgadis.png'],['정의의아멜','ally_amelia.png'],['수상한신관','ally_xellos.png'],['사이라그주민','ally_kaede.png'],['드래곤슬레이브','ally_lyra.png'],['세이룬기사','ally_borin.png']].map((f,i)=>({k:'f'+i,n:f[0],img:f[1],m:[1.15,.95,1.05,.85,1.3,.7,1.0,.9][i],lv:[3,-2,1,-4,6,-6,0,-1][i]}));
const SH=[{k:'tk',n:'동료 소환권',img:'it2_ticket.png',c:150,lim:1,g:s=>s.tickets=(s.tickets||0)+1},{k:'st',n:'강화석 ×10',img:'it2_stone.png',c:40,lim:3,g:s=>s.stone=(s.stone||0)+10},{k:'ob',n:'마정구 ×5',img:'it2_exp.png',c:30,lim:3,g:s=>s.orbs+=5},{k:'gm',n:'다이아 ×20',img:'it2_gem.png',c:60,lim:2,g:s=>s.gems+=20}];
const st=()=>{const s=C.S();if(!s.fr)s.fr={pt:0,day:'',sent:{},got:{},buy:{}};const f=s.fr;if(f.day!=C.today()){f.day=C.today();f.sent={};f.got={};f.buy={}}return f};
const canGet=f=>!st().got[f.k]&&(+f.k.slice(1)%4!=3);// 일부 친구만 선물 보냄
C.frRed=()=>{const t=st();return FR.some(f=>!t.sent[f.k]||canGet(f))};
const send=k=>{const t=st();let n=0;FR.forEach(f=>{if((!k||f.k==k)&&!t.sent[f.k]){t.sent[f.k]=1;n++}});t.pt+=n*5;return n};
const get=k=>{const t=st();let n=0;FR.forEach(f=>{if((!k||f.k==k)&&canGet(f)){t.got[f.k]=1;n++}});t.pt+=n*10;return n};
G.frSendAll=()=>send();G.frGetAll=()=>get();G.frBuy=k=>{const t=st(),it=SH.find(x=>x.k==k),s=C.S();if(!it||(t.buy[k]||0)>=it.lim||t.pt<it.c)return 0;t.pt-=it.c;t.buy[k]=(t.buy[k]||0)+1;it.g(s);return it};
const MI=MENU.findIndex(m=>m[0]=='guild');if(!MENU.some(m=>m[0]=='friend'))MENU.splice(MI+1,0,['friend','친구','ic3_friend.png']);try{renderHub()}catch(_){}
const draw=()=>{const el=$('#screen'),t=st(),P=C.POW(),L=C.S().lv;
 el.innerHTML=shell('친구','bg_guild.jpg',`<div class="card frh"><span class=frp>💗</span><div class=f><b>우정 포인트 ${fmt(t.pt)}</b><small>하트 보내기 +5 · 받기 +10 · 매일 05:00 초기화</small></div></div>
 <div class="card frb"><span class="pill ${FR.some(f=>!t.sent[f.k])?'green':'off'}" id=frSA>💌 모두 보내기</span><span class="pill ${FR.some(canGet)?'green':'off'}" id=frGA>🎁 모두 받기</span></div>
 <div class=card><div class=ttl>친구 목록 <small>${FR.length}/30</small></div>${FR.map(f=>`<div class="row frr"><img src="${A}${f.img}"><div class=f><b>${f.n}</b><small>Lv.${Math.max(1,L+f.lv)} · ⚔ ${fmt(Math.round(P*f.m))}</small></div><span class="frx ${t.sent[f.k]?'off':''}" data-s=${f.k}>${t.sent[f.k]?'✔':'💌'}</span><span class="frx ${canGet(f)?'on':'off'}" data-g=${f.k}>${canGet(f)?'🎁':t.got[f.k]?'✔':'—'}</span></div>`).join('')}</div>
 <div class=card><div class=ttl>우정 상점 <small>매일 초기화</small></div><div class=frs>${SH.map(it=>{const b=t.buy[it.k]||0,ok=b<it.lim&&t.pt>=it.c;return `<div class="frsi ${ok?'':'off'}" data-b=${it.k}><img src="assets/${it.img}"><b>${it.n}</b><small>💗${it.c} · ${b}/${it.lim}</small></div>`}).join('')}</div></div>`);
 const b=el.querySelector('#sBack');if(b)b.onclick=()=>closeScreen();
 const fx=(n,w)=>{if(n){toast(`${w} ${n}명 · 우정 포인트 +${n*(w=='하트 보내기'?5:10)}`)}draw();updateHud()};
 el.querySelector('#frSA').onclick=()=>fx(send(),'하트 보내기');el.querySelector('#frGA').onclick=()=>fx(get(),'선물 받기');
 el.querySelectorAll('[data-s]').forEach(e=>e.onclick=()=>fx(send(e.dataset.s),'하트 보내기'));el.querySelectorAll('[data-g]').forEach(e=>e.onclick=()=>fx(get(e.dataset.g),'선물 받기'));
 el.querySelectorAll('[data-b]').forEach(e=>e.onclick=()=>{const it=G.frBuy(e.dataset.b);if(!it)return toast('우정 포인트가 부족하거나 구매 한도입니다');updateHud();draw();rewardPop([[it.img,it.n.split(' ×')[1]||1,it.n.split(' ×')[0]]],'우정 상점')})};
const rs=renderScreen;renderScreen=function(){if(G.screen=='friend'){scr0();return draw()}return rs.apply(this,arguments)};const scr0=()=>{};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const a=document.querySelector('#mgrid a[data-s=friend]');if(a){let d=a.querySelector('.dot');if(!d){d=document.createElement('span');d.className='dot';a.appendChild(d)}const on=C.frRed();d.style.display=on?'':'none';if(on){const m=document.querySelector('#sidemenu .dot');if(m)m.style.display=''}}}catch(_){}return r};
})();
;(()=>{// v57 접속 보상 (일일 플레이 시간 상자)
const T=[{m:5,w:{gold:1},n:'골드'},{m:10,w:{orbs:5},n:'마정구 ×5'},{m:20,w:{stone:10},n:'강화석 ×10'},{m:30,w:{gems:20},n:'다이아 ×20'},{m:60,w:{stone:15},n:'강화석 ×15'}];
const st=()=>{const s=C.S();if(!s.ol||s.ol.day!=C.today())s.ol={day:C.today(),sec:0,c:{}};return s.ol};
const gl=()=>Math.round(C.goldKill(Math.max(0,C.S().maxSi))*120);
const give=w=>{const s=C.S();const g=w.gold?gl():0;if(g)C.addGold(g);s.orbs+=w.orbs||0;s.stone=(s.stone||0)+(w.stone||0);s.gems+=w.gems||0;s.tickets=(s.tickets||0)+(w.tk||0);return g};
const ready=()=>{const o=st();return T.map((t,i)=>i).filter(i=>!o.c[i]&&o.sec>=T[i].m*60)};
G.olClaimAll=()=>{const o=st(),out=[];ready().forEach(i=>{o.c[i]=1;const g=give(T[i].w);const w=T[i].w;out.push(w.gold?['it2_gold.png',g,'골드']:w.orbs?['it2_exp.png',w.orbs,'마정구']:w.stone?['it2_stone.png',w.stone,'강화석']:w.gems?['it2_gem.png',w.gems,'다이아']:['it2_ticket.png',w.tk,'소환권'])});return out};
G.olAdd=sec=>{st().sec+=sec};G.olState=()=>({...st(),ready:ready().length});
const fm=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const btn=()=>{let b=document.getElementById('olBtn');const bt=document.getElementById('battle');if(!b&&bt){b=document.createElement('span');b.id='olBtn';b.className='pill';bt.appendChild(b);b.onclick=()=>G.olOpen()}return b};
const upd=()=>{const b=btn();if(!b)return;const o=st(),nx=T.findIndex((t,i)=>!o.c[i]);if(nx<0){b.style.display='none';return}b.style.display='';const r=ready().length;b.classList.toggle('rdy',r>0);b.innerHTML=r?`⏰ 받기<span class=dot></span>`:`⏰ ${fm(T[nx].m*60-o.sec)}`};
G.olOpen=()=>{const o=st();modal(`<div class=ttl style="justify-content:center;font-size:18px">접속 보상</div><small style="display:block;text-align:center;opacity:.75">오늘 플레이 ${Math.floor(o.sec/60)}분 · 매일 05:00 초기화</small><div class=oll>${T.map((t,i)=>{const ok=o.sec>=t.m*60,c=o.c[i];return `<div class="olr ${c?'got':ok?'rdy':''}"><b>${t.m}분</b><span>${t.n}</span><em>${c?'✔ 수령':ok?'받기 가능':fm(t.m*60-o.sec)}</em></div>`}).join('')}</div><span class="pill green wide ${ready().length?'':'off'}" id=olGo style="margin-top:10px;justify-content:center">🎁 모두 받기</span>`);
 const g=document.getElementById('olGo');if(g)g.onclick=()=>{const it=G.olClaimAll();if(!it.length)return;document.querySelectorAll('.modal').forEach(m=>m.remove());updateHud();upd();rewardPop(it,'접속 보상')}};
let lt=Date.now();setInterval(()=>{const n=Date.now(),d=Math.min(5,(n-lt)/1000);lt=n;if(!document.hidden&&!G.noSave)st().sec+=d;upd()},1000);setTimeout(upd,300);
})();
;(()=>{// v58 스토리 대화 (챕터 진입 시 짧은 대화 · 탭으로 진행 · 건너뛰기)
const P={lina:['리나','hero_lina.png'],gourry:['가우리','ally_gourry.png'],zel:['젤가디스','ally_zelgadis.png'],amelia:['아멜리아','ally_amelia.png'],xel:['제로스','ally_xellos.png']};
const SC=[
 [['lina','세이룬까지 가는 길에 몬스터가 이렇게 많을 리 없는데…'],['gourry','배고프다, 리나. 저 슬라임 먹을 수 있을까?'],['lina','먹지 마! …아무튼 길을 막는 녀석들은 전부 날려 버린다!']],
 [['zel','이 숲에서 마족의 기척이 느껴진다. 조심해라.'],['lina','흥, 마족이든 뭐든 내 마법 앞에선 똑같아.'],['amelia','정의의 이름으로! 숲의 평화를 되찾겠어요!']],
 [['xel','후후, 붉은 마왕의 성에 오신 걸 환영합니다.'],['lina','제로스… 너 또 뭔가 숨기고 있지?'],['xel','그건 비밀입니다~♪'],['lina','좋아, 성째로 날려 버리면 비밀도 사라지겠지!']],
 [['gourry','으아, 발밑이 뜨거워! 신발 녹는다!'],['zel','염제가 깨어났다는 소문이 사실이었군.'],['lina','불에는 불로! 화염 마법의 진수를 보여 주지!']],
 [['amelia','추, 추워요… 여기가 얼음 여제의 성채인가요?'],['zel','방심하지 마라. 얼음 속에 무언가 잠들어 있다.'],['lina','겨울이 영원하다고? 내가 봄을 데려다 주지. 가자!']],
 [['gourry','리나, 발밑에 땅이 없어! 구름이야, 구름!'],['xel','천공의 신전… 신들의 시련이 잠든 곳이지요.'],['amelia','정의의 시련이라면 피할 수 없어요!'],['lina','신이든 수호자든 상관없어. 정상까지 단숨에 날아오른다!']]];
const st=()=>{const s=C.S();if(!s.story)s.story={};return s.story};
let q=[],on=false;
const busy=()=>(G.set&&!G.set.story)||(C.B&&(C.B.boss||C.B.br||C.B.rb))||document.body.classList.contains('chapon')||document.querySelector('.vic:not(.out),.modal,.rwpop,.tut,.chap')||G.screen;
const pump=()=>{if(on||!q.length)return;if(busy())return setTimeout(pump,400);play(q.shift())};
const play=c=>{const L=SC[c];if(!L||st()[c])return pump();on=true;G.storyOn=1;st()[c]=1;let i=0;const d=document.createElement('div');d.className='sty';document.body.appendChild(d);
 const draw=()=>{const [who,t]=L[i],p=P[who],left=who=='lina';d.innerHTML=`<div class=stdim></div><img class="stp ${left?'l':'r'}" src="assets/${p[1]}"><div class=stb><b class="stn ${left?'l':'r'}">${p[0]}</b><div class=stt>${t}</div><small class=stc>CHAPTER ${c+1} · ${D.CH[c]} <i>${i+1}/${L.length}</i> ▼</small></div><span class=stsk>건너뛰기 ▶▶</span>`;d.querySelector('.stsk').onclick=e=>{e.stopPropagation();end()}};
 const end=()=>{d.classList.add('out');setTimeout(()=>{d.remove();on=false;G.storyOn=0;pump()},300)};
 d.onclick=()=>{i++;if(i>=L.length)end();else draw()};draw()};
G.storyPlay=c=>{q.push(c);pump()};{const ot=C.tick;C.tick=function(dt){if(G.storyOn)return;return ot.apply(this,arguments)};const rf=R.frame;R.frame=function(dt){return rf.call(this,G.storyOn?0:dt)}}G.storyLines=SC;
const occ=chapterCard;chapterCard=function(c,si){const r=occ.apply(this,arguments);if(!st()[c]){q.push(c);setTimeout(pump,800)}return r};
setTimeout(()=>{const s=C.S();if((s.tut||0)>=9&&!st()[0]&&(s.maxSi||0)<7){q.push(0);pump()}},2500);
})();
;(()=>{// v59 장비 도감 (부위 × 등급 수집 · 8종마다 공격력·체력 +1%)
const NR=D.RAR.length,NS=D.SLOTS.length,TOT=NR*NS,MS=[8,16,24,32,40,48];
const g=()=>{const s=C.S();if(!s.gcx)s.gcx={};return s.gcx};const mark=it=>{if(it&&it.slot!=null)g()[it.slot+'_'+it.r]=1};
const seed=()=>{const s=C.S();Object.values(s.gear||{}).forEach(mark);mark(s.bag)};seed();
{const ro=C.rollOnce;C.rollOnce=function(){const r=ro.apply(this,arguments);try{mark(C.S().bag)}catch(_){}return r}}
const n=()=>Object.keys(g()).length;const tier=()=>MS.filter(m=>n()>=m).length;
C.gcxB=()=>tier()*.01;{const oa=C.atkPct;C.atkPct=()=>oa()+C.gcxB();const oh=C.MAXHP;C.MAXHP=()=>oh()*(1+C.gcxB())}
G.gcxN=n;
const body=()=>{const c=n(),t=tier(),nx=MS[t];return `<div class="card gcxh"><div class=f><b>장비 도감 ${c}/${TOT}</b><small>공격력·체력 +${t}% 적용 중${nx?` · 다음 ${nx}종: +${(t+1)}%`:' · 완성!'}</small><div class=bar style="margin-top:5px"><i style="width:${c/TOT*100}%"></i></div></div></div>
<div class="card gcxg"><div class=gcxr><span></span>${D.RAR.map(r=>`<b style="color:${r.c}">${r.n}</b>`).join('')}</div>${D.SLOTS.map(sl=>`<div class=gcxr><span>${sl.n}</span>${D.RAR.map((r,i)=>{const o=g()[sl.k+'_'+i];return `<i class="${o?'o':''}" style="--rc:${r.c}"><img src="${A}${sl.img}" style="${sl.f?'filter:'+sl.f:''}"></i>`}).join('')}</div>`).join('')}</div>
<div class=card>${MS.map((m,i)=>`<div class=row style="${c>=m?'':'opacity:.55'}"><div class=f><b>${m}종 수집</b> <small>공격력·체력 +${(i+1)}%</small></div><span class="pill ${c>=m?'green':'off'}">${c>=m?'적용 중':c+'/'+m}</span></div>`).join('')}</div>`};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='codex'){seed();const el=$('#screen'),tb=el.querySelector('.entabs');if(tb&&!tb.querySelector('[data-ct=g]')){const sp=document.createElement('span');sp.dataset.ct='g';sp.textContent='장비';if(G.cdT=='g'){tb.querySelectorAll('span').forEach(x=>x.classList.remove('on'));sp.className='on'}sp.onclick=()=>{G.cdT='g';renderScreen()};tb.appendChild(sp);if(G.cdT=='g')tb.insertAdjacentHTML('afterend',body())}}}catch(e){console.warn(e)}return r};
})();

;(()=>{// v60 닉네임 (프로필 · 랭킹 · 투기장 표시, 설정/전투력 분석에서 변경)
const BAD=['운영자','관리자','GM','admin'];
G.nick=()=>{const s=C.S();return (s.nick||'').trim()||'리나'};
G.nickCheck=v=>{v=(v||'').trim();if(v.length<2||v.length>8)return '2~8자로 입력하세요';if(!/^[가-힣a-zA-Z0-9]+$/.test(v))return '한글·영문·숫자만 사용할 수 있어요';if(BAD.some(b=>v.toLowerCase().includes(b.toLowerCase())))return '사용할 수 없는 닉네임입니다';return ''};
G.nickSet=v=>{const e=G.nickCheck(v);if(e)return e;C.S().nick=v.trim();try{updateHud();if(G.screen)renderScreen()}catch(_){}return ''};
G.nickEdit=()=>{modal(`<div class=ttl style="justify-content:center;font-size:18px">닉네임 변경</div><input id=nkIn class=nkin maxlength=8 value="${G.nick()}" placeholder="2~8자"><small id=nkMsg class=nkmsg>한글·영문·숫자 2~8자 · 무료로 변경 가능</small><span class="pill green wide" id=nkOk style="margin-top:8px;justify-content:center">저장</span>`);
 const i=document.getElementById('nkIn'),m=document.getElementById('nkMsg');i.oninput=()=>{const e=G.nickCheck(i.value);m.textContent=e||'사용 가능한 닉네임입니다';m.className='nkmsg '+(e?'bad':'ok')};
 document.getElementById('nkOk').onclick=()=>{const e=G.nickSet(i.value);if(e){m.textContent=e;m.className='nkmsg bad';return}document.querySelectorAll('.modal').forEach(x=>x.remove());toast(`닉네임이 「${G.nick()}」(으)로 변경되었습니다`)}};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const n=document.getElementById('hName');if(n){const t=`${G.nick()} <i>Lv.${C.S().lv}</i>`;if(n.innerHTML!==t)n.innerHTML=t}}catch(_){}return r};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const el=$('#screen'),c=el.querySelector('.card');if(c&&!el.querySelector('#nkRow')){c.insertAdjacentHTML('beforebegin',`<div class="card row" id=nkRow><div class=f><b>닉네임</b><small style="display:block;opacity:.7">${G.nick()}</small></div><span class="pill green" id=nkBtn>✏️ 변경</span></div>`);el.querySelector('#nkBtn').onclick=()=>G.nickEdit()}}}catch(_){}return r};
})();
;(()=>{// v61 물약 (회복/마나 물약 · 보스전 자동 사용)
const CD=8;let cdH=0,cdM=0;
const usable=()=>C.B&&C.aliveAllies&&C.aliveAllies().length>0;
G.potHp=(auto)=>{const s=C.S();if((s.pot||0)<1||cdH>0||!usable())return 0;const L=C.aliveAllies();if(!L.some(a=>a.hp<a.max*.9))return 0;s.pot--;cdH=CD;L.forEach(a=>{a.hp=Math.min(a.max,a.hp+a.max*.4)});fx('hp',auto);return 1};
G.potMp=(auto)=>{const s=C.S();if((s.mpot||0)<1||cdM>0||!usable())return 0;const c=C.B.cds||{};if(!Object.values(c).some(v=>v>0.5))return 0;s.mpot--;cdM=CD;for(const k in c)c[k]=c[k]*.4;fx('mp',auto);return 1};
const fx=(k,auto)=>{try{const b=document.getElementById(k=='hp'?'potH':'potM');if(b){b.classList.remove('pfx');void b.offsetWidth;b.classList.add('pfx')}if(!auto)return;const t=document.createElement('div');t.className='potfl '+k;t.textContent=k=='hp'?'자동 회복 +40%':'자동 마나 회복';document.getElementById('battle').appendChild(t);setTimeout(()=>t.remove(),1100)}catch(_){}};
const ot=C.tick;C.tick=function(dt){const r=ot.apply(this,arguments);cdH=Math.max(0,cdH-dt);cdM=Math.max(0,cdM-dt);try{const s=C.S();if(s.autoPot!==false&&C.B.boss&&!G.noSave){const L=C.aliveAllies();if(L.some(a=>a.hp<a.max*.35))G.potHp(1);const c=C.B.cds||{},v=Object.values(c);if(v.length&&v.every(x=>x>2))G.potMp(1)}}catch(_){}return r};
const ui=()=>{const bt=document.getElementById('battle');if(!bt)return;let w=document.getElementById('potW');if(!w){w=document.createElement('div');w.id='potW';w.innerHTML=`<span id=potH class=potb><img src="assets/it2_hp.png"><b></b><i></i></span><span id=potM class=potb><img src="assets/it2_mp.png"><b></b><i></i></span><span id=potA class=pota></span>`;bt.appendChild(w);
 w.querySelector('#potH').onclick=()=>{if(!G.potHp())toast((C.S().pot||0)<1?'회복 물약이 없습니다 (상점에서 구매)':cdH>0?'재사용 대기 중':'체력이 충분합니다')};
 w.querySelector('#potM').onclick=()=>{if(!G.potMp())toast((C.S().mpot||0)<1?'마나 물약이 없습니다':cdM>0?'재사용 대기 중':'쿨타임 중인 스킬이 없습니다')};
 w.querySelector('#potA').onclick=()=>{const s=C.S();s.autoPot=s.autoPot===false;toast(s.autoPot?'보스전 물약 자동 사용 ON':'물약 자동 사용 OFF');ui()}}
 const s=C.S();w.querySelector('#potH b').textContent=s.pot||0;w.querySelector('#potM b').textContent=s.mpot||0;w.querySelector('#potH i').style.height=(cdH/CD*100)+'%';w.querySelector('#potM i').style.height=(cdM/CD*100)+'%';w.querySelector('#potH').classList.toggle('emp',!(s.pot>0));w.querySelector('#potM').classList.toggle('emp',!(s.mpot>0));const a=w.querySelector('#potA');a.textContent=s.autoPot===false?'자동 OFF':'자동';a.classList.toggle('on',s.autoPot!==false)};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{ui()}catch(_){}return r};
G.potCd=()=>[cdH,cdM];
})();
;(()=>{// v62 절전 모드 (화면 끄고 방치 · 획득량 표시 · 길게 눌러 해제)
let on=null,el=null,tm=null,hold=null;
const snap=()=>{const s=C.S();return{t:Date.now(),g:s.gold,x:s.exp,lv:s.lv,k:s.kills||0,o:s.orbs,st:s.stone||0,si:s.maxSi}};
const fmtT=ms=>{const s=Math.floor(ms/1000);return `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`};
const draw=()=>{if(!on||!el)return;const s=C.S(),n=Date.now();el.querySelector('.svt').textContent=fmtT(n-on.t);el.querySelector('.svc').textContent=new Date().toTimeString().slice(0,5);
 el.querySelector('.svg').innerHTML=[['it2_gold.png','골드',fmt(Math.max(0,s.gold-on.g))],['it2_exp.png','마정구',fmt(Math.max(0,s.orbs-on.o))],['it2_stone.png','강화석',fmt(Math.max(0,(s.stone||0)-on.st))],['','처치',fmt((s.kills||0)-on.k)],['','레벨',s.lv>on.lv?`Lv.${on.lv} → ${s.lv}`:`Lv.${s.lv}`],['','최고 스테이지',C.stageName(s.maxSi)+(s.maxSi>on.si?' ▲':'')]].map(r=>`<div>${r[0]?`<img src="assets/${r[0]}">`:'<i></i>'}<span>${r[1]}</span><b>${r[2]}</b></div>`).join('')};
G.saverOn=()=>{if(on)return;on=snap();el=document.createElement('div');el.id='saver';el.innerHTML=`<div class=svc></div><div class=svh>절전 모드</div><small class=svs>전투는 계속 진행됩니다</small><div class=svt></div><div class=svg></div><div class=svu><span><i></i></span>화면을 길게 눌러 해제</div>`;document.body.appendChild(el);document.body.classList.add('saving');draw();tm=setInterval(draw,1000);
 const bar=el.querySelector('.svu i');const st=e=>{e.preventDefault();bar.style.transition='width 1s linear';bar.style.width='100%';hold=setTimeout(G.saverOff,1000)};const en=()=>{clearTimeout(hold);bar.style.transition='width .2s';bar.style.width='0'};
 el.addEventListener('pointerdown',st);el.addEventListener('pointerup',en);el.addEventListener('pointerleave',en)};
G.saverOff=()=>{if(!on)return;const s=C.S(),g=s.gold-on.g,ms=Date.now()-on.t;clearInterval(tm);el.classList.add('out');const e=el;setTimeout(()=>e.remove(),300);el=null;on=null;document.body.classList.remove('saving');if(ms>5000)toast(`절전 모드 해제 · ${fmtT(ms)} 동안 골드 +${fmt(Math.max(0,g))}`)};
G.saverState=()=>on;
{const rf=R.frame;R.frame=function(dt){if(on)return;return rf.apply(this,arguments)}}
const btn=()=>{const bt=document.getElementById('battle');if(!bt||document.getElementById('svBtn'))return;const b=document.createElement('span');b.id='svBtn';b.className='pill';b.textContent='🌙';b.title='절전 모드';b.onclick=()=>G.saverOn();bt.appendChild(b)};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{btn()}catch(_){}return r};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const el2=$('#screen'),nk=el2.querySelector('#nkRow');if(nk&&!el2.querySelector('#svRow')){nk.insertAdjacentHTML('afterend',`<div class="card row" id=svRow><div class=f><b>절전 모드</b><small style="display:block;opacity:.7">화면을 끄고 방치 사냥 · 배터리 절약</small></div><span class="pill" id=svGo>🌙 켜기</span></div>`);el2.querySelector('#svGo').onclick=()=>{closeScreen();G.saverOn()}}}}catch(_){}return r};
})();
;(()=>{// v63 전투 말풍선 (스킬 · 보스 · 위기 · 승리 대사)
const L={lina:{sp:['{n}!','받아라, {n}!','날려 버리겠어!'],boss:['덤벼 봐! 상대해 주지!','보스라고? 흥!'],low:['큭… 아직이야!','이 정도로는 안 쓰러져!'],win:['역시 나라니까~♪','보물은 내 거야!'],grog:['지금이야! 몰아쳐!'],tele:['큰 거 온다! 피해!']},
 gourry:{boss:['내 검을 받아라!'],low:['아야야… 배고파서 힘이 안 나'],win:['이제 밥 먹으러 가자!'],grog:['좋아, 한 방 더!'],tele:['우왓, 위험해!']},
 zelgadis:{boss:['방심하지 마라.'],low:['…이 정도 상처쯤은.'],win:['흥, 별것 아니군.'],grog:['틈이 생겼다!']},
 amelia:{boss:['정의의 이름으로 용서하지 않겠어요!'],low:['정의는… 지지 않아요!'],win:['정의는 승리한다!'],grog:['지금이 정의의 타이밍!']},
 xellos:{boss:['후후, 재미있어지겠네요.'],low:['어머, 아프네요~'],win:['그건 비밀입니다~♪']},
 _:{boss:['간다!','조심해!'],low:['위험해…!'],win:['해냈다!'],grog:['기회다!']}};
const pick=a=>a[Math.floor(Math.random()*a.length)];let gT=0;const lastA={};let layer=null;const live=[];
const lay=()=>{if(!layer||!layer.isConnected){layer=document.createElement('div');layer.id='bubL';const bt=document.getElementById('battle');bt&&bt.appendChild(layer)}return layer};
const say=(k,type,vars,force)=>{try{if(G.storyOn||(G.saverState&&G.saverState())||(G.set&&!G.set.bubble))return;const now=performance.now();if(!force&&(now-gT<2600||now-(lastA[k]||0)<7000))return;const T=(L[k]||L._)[type]||L._[type];if(!T)return;const AS=R._AS&&R._AS();if(!AS||!AS.get(k))return;gT=now;lastA[k]=now;
 live.splice(0).forEach(q=>q.d.remove());const d=document.createElement('div');d.className='bub '+type;d.textContent=pick(T).replace('{n}',(vars&&vars.n)||'');lay().appendChild(d);const o={k,d,t:now};live.push(o);setTimeout(()=>{d.classList.add('out');setTimeout(()=>{d.remove();const i=live.indexOf(o);i>=0&&live.splice(i,1)},250)},1700)}catch(_){}};
const place=()=>{const AS=R._AS&&R._AS();if(AS)live.forEach(o=>{const s=AS.get(o.k);if(!s)return;const w=o.d.offsetWidth||100,x=Math.max(56+w/2,Math.min(328-w/2,s.x)),y=s.y-118;o.d.style.transform=`translate(${x}px,${y}px) translate(-50%,-100%)`});requestAnimationFrame(place)};requestAnimationFrame(place);
const alive=()=>(C.aliveAllies?C.aliveAllies():[]).map(a=>a.k);const rnd=()=>{const a=alive();return a[Math.floor(Math.random()*a.length)]};
const hook=(n,f)=>{const o=C.ev[n];C.ev[n]=function(){const r=o&&o.apply(this,arguments);try{f.apply(this,arguments)}catch(_){}return r}};
hook('spell',(sp)=>{if(sp&&!sp.heal&&Math.random()<.35)say('lina','sp',{n:sp.n})});
hook('walk',()=>{if(C.B.boss)setTimeout(()=>say(Math.random()<.5?'lina':rnd(),'boss',0,1),2700)});
hook('dmgAlly',(a)=>{if(a&&a.hp>0&&a.hp<a.max*.3)say(a.k,'low')});
hook('grog',()=>say(rnd(),'grog',0,1));hook('tele',()=>say(Math.random()<.6?'lina':rnd(),'tele',0,1));
hook('kill',(e)=>{if(e&&e.boss)setTimeout(()=>say(rnd(),'win',0,1),300)});
G.bubSay=say;
})();
;(()=>{// v64 아이템 정보 · 획득처 (가방에서 탭)
const I={it2_gold:['골드','장비 강화·마력 수련·영지 건설에 쓰이는 기본 재화.',[['train','마력 수련','사용'],['enhance','장비 강화','사용']],[['battle','몬스터 처치'],['idle','방치 보상'],['base','영지 금고']]],
 it2_gem:['다이아','동료 소환과 상점 구매에 쓰이는 귀한 보석.',[['summon','동료 소환','사용'],['shop','상점','사용']],[['ach','업적'],['mission','일일 지령'],['event','출석'],['pass','마도 패스']]],
 it2_exp:['마정구','장비를 뽑을 때 쓰는 마력 결정.',[['gear','장비 뽑기','사용']],[['battle','몬스터 처치 (확률)'],['base','영지 연구소'],['dungeon','도전 던전']]],
 it2_ticket:['동료 소환권','다이아 대신 동료를 1회 소환할 수 있다.',[['summon','동료 소환','사용']],[['mail','우편함'],['friend','우정 상점'],['pass','마도 패스']]],
 it2_hp:['회복 물약','전투 중 아군 전원의 체력을 40% 회복. 보스전에서 자동 사용 가능.',[['battle','전투 화면','사용']],[['shop','상점'],['mail','우편함']]],
 it2_mp:['마나 물약','전투 중 모든 스킬의 남은 쿨타임을 60% 단축.',[['battle','전투 화면','사용']],[['shop','상점'],['mail','우편함']]],
 it2_stone:['강화석','장비를 강화하는 데 필요한 광석.',[['enhance','장비 강화','사용']],[['battle','몬스터 처치·보스'],['idle','방치 보상'],['friend','우정 상점'],['dungeon','도전 던전']]],
 it3_dungeonkey:['던전 열쇠','도전 던전에 입장할 때 사용.',[['dungeon','도전','사용']],[['dungeon','매일 지급'],['shop','상점']]],
 it3_guildcoin:['길드 코인','협회 상점에서 쓰는 코인.',[['guild','협회','사용']],[['guild','협회 기부·레이드']]],
 it3_arenatoken:['투기장 토큰','투기장 상점에서 쓰는 토큰.',[['arena','투기장','사용']],[['arena','투기장 대전']]],
 it3_mileagestar:['마일리지','동료 소환 시 쌓이며, 일정량 모으면 원하는 동료와 교환.',[['summon','동료 소환','사용']],[['summon','동료 소환 1회당 1']]]};
const go=k=>{document.querySelectorAll('.modal').forEach(m=>m.remove());if(k=='battle'){if(G.screen)closeScreen();return}if(G.screen)closeScreen();menuGo(k)};
G.itemInfo=img=>{const d=I[img];if(!d)return;const s=C.S(),own={it2_gold:s.gold,it2_gem:s.gems,it2_exp:s.orbs,it2_ticket:s.tickets||0,it2_hp:s.pot||0,it2_mp:s.mpot||0,it2_stone:s.stone||0,it3_dungeonkey:s.dkey||0,it3_guildcoin:s.gcoin||0,it3_arenatoken:s.atoken||0,it3_mileagestar:s.mile||0}[img]||0;
 modal(`<div class=iih><img src="${A}${img}.png"><div><b>${d[0]}</b><small>보유 ${fmt(own)}</small></div></div><p class=iid>${d[1]}</p><div class=iis>사용처</div><div class=iig>${d[2].map(x=>`<span class=iigo data-g=${x[0]}>${x[1]} ▶</span>`).join('')}</div><div class=iis>획득처</div><div class=iig>${d[3].map(x=>`<span class=iigo data-g=${x[0]}>${x[1]} ▶</span>`).join('')}</div>`);
 document.querySelectorAll('.iigo').forEach(e=>e.onclick=()=>go(e.dataset.g))};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='bag'){$('#screen').querySelectorAll('.bagg .bi').forEach(b=>{const im=b.querySelector('img');if(!im)return;const m=(im.getAttribute('src')||'').match(/(it\d_[a-z]+)\.png$/);if(m&&I[m[1]]){b.classList.add('tap');b.onclick=()=>G.itemInfo(m[1])}})}}catch(_){}return r};
})();
;(()=>{// v65 오늘의 할 일 (메뉴 상단 바로가기 · 레드닷 모음)
const N={mail:'우편 수령',event:'출석 체크',summon:'동료 소환',mission:'지령 보상',base:'영지 수확',arena:'투기장 도전',guild:'협회 기부',dungeon:'던전 도전',explore:'탐험 보상',enhance:'장비 강화',wboss:'월드보스',ach:'업적 보상',pass:'패스 보상',friend:'친구 하트'};
const list=()=>{const B=G.BD||{},o=[];for(const k in N){const on=k=='friend'?(C.frRed&&C.frRed()):B[k];if(on)o.push(k)}if(G.nbState){try{const s=G.nbState();if(s&&s.ready)o.unshift('nb')}catch(_){}}if(G.olState&&G.olState().ready)o.unshift('ol');return o};
G.todoList=list;
const draw=()=>{const p=document.getElementById('mgrid');if(!p)return;let t=document.getElementById('todoBar');if(!t){t=document.createElement('div');t.id='todoBar';p.parentNode.insertBefore(t,p)}const L=list();
 t.innerHTML=`<div class=tdh>📋 오늘의 할 일 <small>${L.length?L.length+'개':'모두 완료!'}</small></div><div class=tdl>${L.length?L.map(k=>`<span class=tdc data-k=${k}>${k=='nb'?'7일 이벤트':k=='ol'?'접속 보상':N[k]} ▶</span>`).join(''):'<span class=tdd>✔ 할 일을 모두 끝냈어요</span>'}</div>`;
 t.querySelectorAll('.tdc').forEach(e=>e.onclick=()=>{const k=e.dataset.k;$('#menuPop').classList.remove('on');if(k=='nb')return G.nbOpen&&G.nbOpen();if(k=='ol')return G.olOpen&&G.olOpen();menuGo(k)})};
const om=menuGo;menuGo=function(k){const r=om.apply(this,arguments);try{if(k=='menu')draw()}catch(_){}return r};
})();

;(()=>{// v66 연출 설정 (말풍선 · 전투력 알림 · 스토리 대화 on/off)
const st=G.loadSet();['bubble','powpop','story'].forEach(k=>{if(st[k]==null)st[k]=1});G.applySet();
const sync=()=>document.body.classList.toggle('nopow',!G.loadSet().powpop);sync();
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{sync();if(G.screen=='settings'){const el=$('#screen'),dm=el.querySelector('[data-set="dmg"]'),row=dm&&dm.closest('.row');if(row&&!el.querySelector('[data-set="bubble"]')){row.insertAdjacentHTML('afterend',[['bubble','전투 말풍선'],['powpop','전투력 변화 알림'],['story','스토리 대화']].map(([k,n])=>`<div class=row><div class=f><b>${n}</b></div><span class="tog ${G.set[k]?'on':''}" data-set=${k}><i></i></span></div>`).join(''));el.querySelectorAll('[data-set=bubble],[data-set=powpop],[data-set=story]').forEach(b=>b.onclick=()=>{G.set[b.dataset.set]^=1;G.applySet();renderScreen()})}}}catch(_){}return r};
})();
;(()=>{// v67 콘텐츠 개방 (스테이지 진행에 따라 기능 해금 · 잠금 표시 · 개방 연출)
const U={ach:2,pass:3,explore:3,friend:4,base:5,codex:6,arena:7,rank:7,star:8,dungeon:9,guild:10,relic:12,tower:14,wboss:16,pet:18,skin:20};
const NM={ach:'업적',pass:'마도 패스',explore:'탐험',friend:'친구',base:'영지',codex:'도감',arena:'투기장',rank:'랭킹',star:'승급',dungeon:'도전 던전',guild:'협회',relic:'기보',tower:'무한의 탑',wboss:'월드보스',pet:'펫',skin:'코스튬'};
const IC={};MENU.forEach(m=>IC[m[0]]=m[2]);
const ms=()=>C.S().maxSi||0;
G.isOpen=k=>!(k in U)||ms()>=U[k]||!!(C.S().unl&&C.S().unl[k]);
const st=()=>{const s=C.S();if(!s.unl){s.unl={};for(const k in U)if(ms()>=U[k])s.unl[k]=1}return s.unl};st();
const om=menuGo;menuGo=function(k){if(k in U&&!G.isOpen(k)){toast(`🔒 ${NM[k]}: ${C.stageName(U[k])} 도달 시 개방`);return}return om.apply(this,arguments)};
const mark=()=>{document.querySelectorAll('#mgrid a,.side a').forEach(a=>{const k=a.dataset.s;const lk=k in U&&!G.isOpen(k);a.classList.toggle('lk',lk);let t=a.querySelector('.lkt');if(lk&&!t){t=document.createElement('span');t.className='lkt';t.textContent='🔒 '+C.stageName(U[k]);a.appendChild(t)}else if(!lk&&t)t.remove();if(lk){const d=a.querySelector('.dot');if(d)d.style.display='none'}})};
let q=[],busyT=0;
const pop=()=>{if(!q.length)return;if(G.storyOn||G.screen||document.querySelector('.modal,.rwpop,.vic:not(.out),.chap,.sty')||C.B.boss)return setTimeout(pop,700);const ks=[...new Set(q.splice(0))],k=ks[0];const d=document.createElement('div');d.className='unl';d.innerHTML=ks.length==1?`<div class=unb><small>NEW · 콘텐츠 개방</small><img src="${A}${IC[k]||'ic3_chest.png'}"><b>${NM[k]}</b><span class=ung>바로 가기 ▶</span></div>`:`<div class=unb><small>NEW · 콘텐츠 ${ks.length}개 개방</small><div class=unm>${ks.map(x=>`<span data-k=${x}><img src="${A}${IC[x]||'ic3_chest.png'}"><em>${NM[x]}</em></span>`).join('')}</div><span class=ung>확인</span></div>`;document.body.appendChild(d);const close=()=>{d.classList.add('out');setTimeout(()=>{d.remove();pop()},250)};d.onclick=e=>{const t=e.target.closest('[data-k]');close();if(t)setTimeout(()=>menuGo(t.dataset.k),260);else if(ks.length==1&&e.target.classList.contains('ung'))setTimeout(()=>menuGo(k),260)};};
const chk=()=>{const u=st();let n=0;for(const k in U)if(!u[k]&&ms()>=U[k]){u[k]=1;if(!q.includes(k))q.push(k);n++}if(n)setTimeout(pop,600)};
G.unlockQ=()=>q;G.UNL=U;
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{chk();mark()}catch(_){}return r};
if(G.todoList){const tl=G.todoList;G.todoList=()=>tl().filter(k=>G.isOpen(k))}
const om2=menuGo;menuGo=function(k){const r=om2.apply(this,arguments);try{if(k=='menu'){mark();const t=document.getElementById('todoBar');if(t){t.querySelectorAll('.tdc').forEach(c=>{if(!G.isOpen(c.dataset.k))c.remove()});const n=t.querySelectorAll('.tdc').length,sm=t.querySelector('.tdh small');if(sm)sm.textContent=n?n+'개':'모두 완료!'}}}catch(_){}return r};
})();
;(()=>{// v68 채팅창 (탭: 전체/월드/협회/시스템 · 기록 · 내 메시지)
let open=false,tab='전체',el=null;const LOG=[];const MAX=60;const now=()=>new Date().toTimeString().slice(0,5);
const parse=t=>{const m=(t||'').match(/^\[(.+?)\]\s*(.*)$/);if(!m)return{ch:'월드',who:'',t};const p=m[2].split(':');const ch=m[1]=='시스템'?'시스템':m[1]=='협회'?'협회':'월드';return p.length>1?{ch,who:p[0].trim(),t:p.slice(1).join(':').trim()}:{ch,who:'',t:m[2]}};
const add=(o)=>{o.at=now();LOG.push(o);if(LOG.length>MAX)LOG.shift();if(open)draw()};
D.CHAT.slice(0,8).forEach(x=>add(parse(x)));
const ct=document.getElementById('chatT');if(ct)new MutationObserver(()=>{const t=ct.textContent;if(t&&(!LOG.length||LOG[LOG.length-1].raw!==t)){const o=parse(t);o.raw=t;add(o)}}).observe(ct,{childList:true,characterData:true,subtree:true});
const RE=['ㅋㅋㅋ 화이팅!','오 고수다','저도 거기서 막혔어요 ㅠ','강화석 모아서 강화 ㄱㄱ','리나 최고!','드래곤 슬레이브 한 방이면 끝','협회 들어오세요~'];const NPC=['붉은마도사','용파참','검은고양이','세일룬공주','드래곤슬레이어'];
const draw=()=>{if(!el)return;const L=LOG.filter(m=>tab=='전체'||m.ch==tab);const box=el.querySelector('.chl');box.innerHTML=L.map(m=>`<p class="c-${m.ch=='시스템'?'sys':m.ch=='협회'?'gd':'wd'} ${m.me?'me':''}"><i>[${m.ch}]</i>${m.who?`<b>${m.who}</b>`:''}<span>${m.t}</span><small>${m.at}</small></p>`).join('')||'<p class=c-sys><span>메시지가 없습니다</span></p>';box.scrollTop=box.scrollHeight;el.querySelectorAll('[data-ct]').forEach(b=>b.classList.toggle('on',b.dataset.ct==tab))};
const send=()=>{const i=el.querySelector('#chIn'),v=(i.value||'').trim();if(!v)return;if(v.length>40)return toast('40자까지 입력할 수 있어요');const ch=tab=='협회'?'협회':'월드';add({ch,who:G.nick?G.nick():'나',t:v.replace(/[<>]/g,''),me:1});i.value='';if(Math.random()<.6)setTimeout(()=>add({ch,who:NPC[Math.floor(Math.random()*NPC.length)],t:RE[Math.floor(Math.random()*RE.length)]}),1200+Math.random()*1500)};
G.chatOpen=()=>{if(open)return;open=true;el=document.createElement('div');el.id='chatP';el.innerHTML=`<div class=chd></div><div class=chb><div class=chh><div class=cht>${['전체','월드','협회','시스템'].map(t=>`<span data-ct=${t}>${t}</span>`).join('')}</div><span class=chx>✕</span></div><div class=chl></div><div class=chi><input id=chIn maxlength=40 placeholder="메시지 입력 (최대 40자)"><span id=chGo>전송</span></div></div>`;document.body.appendChild(el);
 el.querySelector('.chd').onclick=G.chatClose;el.querySelector('.chx').onclick=G.chatClose;el.querySelectorAll('[data-ct]').forEach(b=>b.onclick=()=>{tab=b.dataset.ct;draw()});el.querySelector('#chGo').onclick=send;el.querySelector('#chIn').onkeydown=e=>{if(e.key=='Enter')send()};draw()};
G.chatClose=()=>{if(!el)return;el.classList.add('out');const e=el;setTimeout(()=>e.remove(),220);el=null;open=false};
G.chatSys=t=>add({ch:'시스템',who:'',t});G.chatLog=LOG;
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#chat')){e.stopPropagation();e.preventDefault();G.chatOpen()}},true);
if(C.ev){const ok=C.ev.kill;C.ev.kill=function(e){const r=ok&&ok.apply(this,arguments);try{if(e&&e.boss&&!e.wb)G.chatSys(`${G.nick?G.nick():'나'}님이 ${e.n||'보스'}을(를) 처치했습니다!`)}catch(_){}return r}}
})();
;(()=>{// v69 공지 · 이벤트 배너 팝업 (접속 시 · 오늘 하루 보지 않기)
const P=[{img:'notice/nb7day.jpg',tag:'EVENT',t:'신규 7일 성장 이벤트',d:'매일 3개의 성장 과제를 달성하고 보상을 받으세요!',go:()=>G.nbOpen&&G.nbOpen()},
 {img:'notice/nbfriend.jpg',tag:'NEW',t:'접속 보상 · 친구 시스템',d:'플레이 시간에 따라 상자 획득 · 친구와 하트를 주고받으세요.',go:()=>menuGo('friend')},
 {img:'notice/nbgearset.jpg',tag:'UPDATE',t:'장비 세트 · 장비 도감',d:'같은 등급으로 8부위를 맞추면 세트 효과 발동!',go:()=>openSheet('gear')}];
let i=0,el=null;
const draw=()=>{const p=P[i];el.querySelector('.ntb').style.backgroundImage=`linear-gradient(transparent 25%,rgba(0,0,0,.55) 55%,rgba(0,0,0,.92)),url(assets/${p.img})`;el.querySelector('.ntg').textContent=p.tag;el.querySelector('.ntt').textContent=p.t;el.querySelector('.ntd').textContent=p.d;el.querySelectorAll('.ntdot i').forEach((d,j)=>d.classList.toggle('on',j==i))};
G.noticeOpen=()=>{if(el)return;i=0;el=document.createElement('div');el.id='notice';el.innerHTML=`<div class=ntc><div class=nth>공지사항 <span class=ntx>✕</span></div><div class=ntb><em class=ntg></em><b class=ntt></b><small class=ntd></small><span class="ntar l">‹</span><span class="ntar r">›</span></div><div class=ntdot>${P.map(()=>'<i></i>').join('')}</div><span class=ntgo>바로 가기 ▶</span><label class=ntn><input type=checkbox id=ntToday> 오늘 하루 보지 않기</label></div>`;document.body.appendChild(el);
 const close=()=>{if(el.querySelector('#ntToday').checked)localStorage.setItem('slayers_notice',C.today());el.classList.add('out');const e=el;setTimeout(()=>e.remove(),220);el=null};
 el.querySelector('.ntx').onclick=close;el.querySelector('.l').onclick=()=>{i=(i+P.length-1)%P.length;draw()};el.querySelector('.r').onclick=()=>{i=(i+1)%P.length;draw()};el.querySelector('.ntgo').onclick=()=>{const g=P[i].go;close();setTimeout(g,250)};
 let sx=null;const b=el.querySelector('.ntb');b.addEventListener('pointerdown',e=>sx=e.clientX);b.addEventListener('pointerup',e=>{if(sx!=null&&Math.abs(e.clientX-sx)>40){i=(i+(e.clientX<sx?1:P.length-1))%P.length;draw()}sx=null});draw()};
const auto=()=>{const s=C.S();if((s.tut||0)<9||localStorage.getItem('slayers_notice')==C.today()||G.noSave)return;if(G.storyOn||G.screen||document.querySelector('.modal,.rwpop,.sty,.unl,.chap,.tut')||C.B.boss)return setTimeout(auto,1500);G.noticeOpen()};
setTimeout(auto,4500);
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const e2=$('#screen'),sv=e2.querySelector('#svRow');if(sv&&!e2.querySelector('#ntRow')){sv.insertAdjacentHTML('afterend',`<div class="card row" id=ntRow><div class=f><b>공지사항</b><small style="display:block;opacity:.7">이벤트 · 업데이트 소식</small></div><span class="pill" id=ntGo>📢 보기</span></div>`);e2.querySelector('#ntGo').onclick=()=>{closeScreen();G.noticeOpen()}}}}catch(_){}return r};
})();
;(()=>{// v70 도움말 (?) — 화면별 시스템 설명
const H={map:['지도','클리어한 스테이지를 골라 다시 사냥할 수 있어요.','별 3개 조건을 달성하면 별 보상 상자를 열 수 있어요.'],
 base:['영지','건물이 시간마다 골드·마정구를 생산해요. 보관 한도가 차기 전에 수확하세요.','건물 레벨을 올리면 생산량과 보관량이 늘어나요.'],
 guild:['협회','매일 기부하면 협회 경험치와 공격력 버프를 얻어요.','협회 레벨이 오를수록 모든 협회원 공격력 +2%.'],
 arena:['투기장','상대 파티와 자동 대전해 점수를 얻어요. 하루 5회 무료.','예상 승률이 높은 상대부터 도전하면 안정적이에요.','리그가 오를수록 주간 보상이 커져요.'],
 dungeon:['도전 던전','던전 열쇠로 입장해 골드·강화석·마정구를 대량으로 얻어요.','패배해도 입장 횟수는 차감되지 않아요.'],
 relic:['기보','기보를 모아 강화하면 공격력·체력 %가 올라요.'],
 explore:['탐험','동료를 보내 일정 시간 후 보상을 받아요. 오프라인에도 진행돼요.'],
 summon:['동료 소환','다이아 또는 소환권으로 동료를 소환해요. 10회 소환은 1회 보너스.','소환할 때마다 마일리지가 쌓여 원하는 동료와 교환할 수 있어요.'],
 party:['편성','최대 3명의 동료와 함께 싸워요. 상성(빛·혼돈·자연)이 맞으면 피해 증가.','같은 진영 동료를 모으면 시너지 보너스가 발동해요.'],
 enhance:['강화 · 육성','장비 +1 강화마다 능력치 +10%. 단계가 높을수록 성공률이 낮아져요.','실패해도 장비는 사라지지 않고 재료만 소모돼요.','동료 육성과 스킬 편성도 여기서 할 수 있어요.'],
 codex:['도감','동료·몬스터·펫·장비를 처음 얻으면 등록하고 다이아를 받아요.','수집 수에 따라 공격력·체력 보너스가 영구 적용돼요.'],
 tower:['무한의 탑','층을 올라갈수록 강해지는 적과 싸워요. 10층마다 보스.','최고 층 기준으로 매일 보상을 받을 수 있어요.'],
 wboss:['월드보스','하루 정해진 횟수만큼 도전해 준 피해량에 따라 보상을 받아요.'],
 pet:['펫','펫은 전투를 돕고 공격력·체력·골드 보너스를 줘요.'],
 pass:['마도 패스','임무를 하면 패스 경험치가 쌓여 단계별 보상을 받아요.'],
 friend:['친구','매일 하트를 보내고(+5) 선물을 받아(+10) 우정 포인트를 모으세요.','우정 상점에서 소환권·강화석 등과 교환할 수 있어요.'],
 shop:['상점','매일 갱신되는 일일 상품과 다이아 상품을 구매할 수 있어요.'],
 ach:['업적','누적 기록을 달성하면 다이아를 받아요. 단계가 올라갈수록 보상 증가.'],
 rank:['랭킹','전투력 기준 순위예요. 매주 월요일 보상이 지급돼요.'],
 star:['승급','같은 동료를 중복으로 얻으면 별을 올려 크게 강해져요.'],
 mail:['우편함','이벤트·보상 우편을 받을 수 있어요. 기간이 지나면 사라질 수 있어요.'],
 event:['출석','매일 접속해 출석 보상을 받아요. 28일 주기.']};
G.help=k=>{const h=H[k];if(!h)return;modal(`<div class=ttl style="justify-content:center;font-size:18px">❓ ${h[0]} 도움말</div><ul class=hlp>${h.slice(1).map(x=>`<li>${x}</li>`).join('')}</ul>`)};G.HELP=H;
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{const k=G.screen,hd=document.querySelector('#screen .shead');if(hd&&H[k]&&!hd.querySelector('.hlpb')){const b=document.createElement('span');b.className='hlpb';b.textContent='?';b.onclick=()=>G.help(k);const t=hd.querySelector('b');t?t.after(b):hd.appendChild(b)}}catch(_){}return r};
})();
;(()=>{// v71 보스 정보 (스테이지 바 보스 아이콘 탭)
const FN={light:'빛',chaos:'혼돈',human:'인간',wild:'야수',nature:'자연'};
G.bossInfo=()=>{const s=C.S(),i=s.si,pl=D.BOSSPLAN[Math.floor(i/7)]||D.BOSSPLAN[0],b=D.BOSSES[pl[i%7==6?1:0]],req=C.stageReq(i),pw=C.POW(),r=pw/req;
 const adv=Object.keys(D.COUNTER).find(k=>D.COUNTER[k]==b.fac),good=D.COMPS.filter(c=>c.fac==adv&&s.comps[c.k]);
 modal(`<div class=bih><img src="${A}${b.img}"><div><small>${i%7==6?'챕터 보스':'스테이지 보스'} · ${C.stageName(i)}</small><b>${b.n}</b>${b.q?`<em>「${b.q}」</em>`:''}</div></div>
 <div class=bir><span>권장 전투력</span><b class="${r>=1?'up':'dn'}">${fmt(req)}</b></div><div class=bir><span>내 전투력</span><b>${fmt(pw)} <small>(${Math.round(r*100)}%)</small></b></div>
 <div class=bir><span>진영</span><b>${FN[b.fac]||b.fac}</b></div><div class=bir><span>유리한 진영</span><b>${adv?FN[adv]+' (피해 증가)':'없음'}</b></div>
 ${adv?`<div class=bic>${good.length?good.map(c=>`<span><img src="${A}${c.img}">${c.n}</span>`).join(''):'<small>보유한 유리 진영 동료가 없습니다</small>'}</div>`:''}
 <div class=bip><b>보스 패턴</b><ul><li>⚠️ 붉은 장판 공격 — 빠른 동료는 회피 확률 증가</li><li>💥 브레이크 게이지를 채우면 그로기(피해 +50%)</li><li>⏱ 제한 시간 안에 처치하지 못하면 실패</li></ul></div>
 <span class="pill ${r>=1?'green':''} wide" id=biGo style="justify-content:center;margin-top:8px">${r>=1?'⚔ 보스 도전':'💪 성장하러 가기'}</span>`);
 document.getElementById('biGo').onclick=()=>{document.querySelectorAll('.modal').forEach(m=>m.remove());if(r>=1){if(s.wave>=3&&!C.B.boss){s.failPow=0;C.startBoss()}else toast('웨이브를 모두 처치하면 보스가 등장해요')}else G.powOpen?G.powOpen():openSheet('train')}};
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#stagebar .sboss')&&!G.screen){e.stopPropagation();G.bossInfo()}},true);
})();
/* v72 보스 도전 기록 */
(()=>{const C=G.C,rec=()=>{const s=C.S();return s.brec=s.brec||{}};
const sb=C.startBoss;C.startBoss=(...a)=>{const was=C.B.boss,r=sb(...a);if(!was&&C.B.boss){G._brSi=C.S().si;G._brT=Date.now()}return r};
const fin=w=>{if(G._bs)G._bs.kt=Date.now();const i=G._brSi;if(i==null)return;G._brSi=null;const o=rec()[i]=rec()[i]||{n:0,w:0};o.n++;if(w){o.w++;const t=Math.round((Date.now()-((G._bs&&G._bs.t)||G._brT))/100)/10;if(!o.t||t<o.t){if(o.t)G._brPut();o.t=t}}};
const oc=C.ev.clear;C.ev.clear=function(){fin(1);return oc&&oc.apply(this,arguments)};
const of=C.ev.fail;C.ev.fail=function(){fin(0);return of&&of.apply(this,arguments)};
G._brPut=()=>{let k=0;const put=()=>{const v=[...document.querySelectorAll('.vic.win:not(.out)')].pop();if(v){v.querySelector('.nrec')||v.insertAdjacentHTML('afterbegin','<div class=nrec>🏆 최단 기록 갱신!</div>');return}if(k++<40)setTimeout(put,100)};put()};
const ob=G.bossInfo;G.bossInfo=()=>{ob();const o=rec()[C.S().si],m=document.querySelector('.modal .bip');if(!m)return;m.insertAdjacentHTML('beforebegin',`<div class=bir><span>도전 기록</span><b>${o?`${o.w}승 ${o.n-o.w}패${o.t?` · 최단 ${o.t}초`:''}`:'첫 도전'}</b></div>`)};
})();
/* v73 동료 전투불능/부활 연출 (시각 전용) */
(()=>{const C=G.C,DW=new Map(),RV=[];
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=document.querySelector('#battle canvas'),AS=R._AS&&R._AS();if(!c||!AS)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
for(const a of C.B.allies||[]){const q=AS.get(a.k);if(!q)continue;const w=DW.get(a.k);if(a.dead){if(!w)DW.set(a.k,{t:0});const d=DW.get(a.k);d.t+=dt;const k=Math.min(1,d.t/.6);
 ctx.globalAlpha=.35*k;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(q.x,q.y+2,30,8,0,0,7);ctx.fill();
 for(let i=0;i<3;i++){const an=T*3+i*2.09;ctx.globalAlpha=.9*k;ctx.fillStyle='#ffe066';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('★',q.x+Math.cos(an)*18,q.y-62+Math.sin(an)*5)}
 const u=(d.t*.6)%1;ctx.globalAlpha=k*(1-u)*.6;const g=ctx.createRadialGradient(q.x,q.y-70-u*40,1,q.x,q.y-70-u*40,12);g.addColorStop(0,'#fff');g.addColorStop(1,'rgba(160,200,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(q.x,q.y-70-u*40,12,0,7);ctx.fill();
 ctx.globalAlpha=k;ctx.font='bold 9px sans-serif';ctx.textAlign='center';const ly=q.y-84;ctx.fillStyle='#000a';ctx.beginPath();ctx.roundRect?ctx.roundRect(q.x-22,ly-9,44,13,6):ctx.rect(q.x-22,ly-9,44,13);ctx.fill();ctx.fillStyle='#ff9a9a';ctx.fillText('전투 불능',q.x,ly+1)}
 else if(w){DW.delete(a.k);RV.push({k:a.k,t:0})}}
for(let i=RV.length-1;i>=0;i--){const r=RV[i],q=AS.get(r.k);r.t+=dt;const k=r.t/.9;if(k>=1||!q){RV.splice(i,1);continue}ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(1-k)*.8;const g=ctx.createLinearGradient(q.x-22,0,q.x+22,0);g.addColorStop(0,'rgba(255,230,120,0)');g.addColorStop(.5,'rgba(255,240,170,1)');g.addColorStop(1,'rgba(255,230,120,0)');ctx.fillStyle=g;ctx.fillRect(q.x-22,q.y-140,44,145);
 ctx.strokeStyle='#ffe58a';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(q.x,q.y,18+k*40,(18+k*40)*.3,0,0,7);ctx.stroke();ctx.globalCompositeOperation='source-over';
 ctx.globalAlpha=k<.7?1:(1-k)/.3;ctx.font='900 14px sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#5a3a00';ctx.strokeText('부활!',q.x,q.y-95-k*14);ctx.fillStyle='#fff3b0';ctx.fillText('부활!',q.x,q.y-95-k*14)}
ctx.restore()}catch(_){}};
})();

/* v74 스킬별 자동 사용 설정 (길게 누르기) */
(()=>{const C=G.C;let tm=null,ate=0,sx=0,sy=0;const off=()=>{const s=C.S();return s.skOff=s.skOff||{}};
const sync=()=>document.querySelectorAll('#skills .sk').forEach(el=>{const o=!!off()[el.dataset.k];if(el.classList.contains('skm')!==o)el.classList.toggle('skm',o)});
const sk=document.getElementById('skills');if(!sk)return;
sk.addEventListener('pointerdown',e=>{const el=e.target.closest('.sk');if(!el||el.classList.contains('lock'))return;sx=e.clientX;sy=e.clientY;clearTimeout(tm);tm=setTimeout(()=>{tm=null;ate=1;const k=el.dataset.k,o=off();o[k]=!o[k];const sp=D.SPELLS.find(x=>x.k==k);sync();el.classList.add('skp');setTimeout(()=>el.classList.remove('skp'),300);toast(`<b>${sp?sp.n:'스킬'}</b> 자동 사용 ${o[k]?'<b style="color:#ff9a7a">제외</b> · 직접 눌러 사용':'<b style="color:#8f8">포함</b>'}`)},500)},true);
const cancel=e=>{if(tm&&(e.type!='pointermove'||Math.hypot(e.clientX-sx,e.clientY-sy)>10)){clearTimeout(tm);tm=null}};['pointerup','pointercancel','pointerleave','pointermove'].forEach(t=>sk.addEventListener(t,cancel,true));
sk.addEventListener('click',e=>{if(ate){ate=0;e.stopPropagation();e.preventDefault()}},true);sk.addEventListener('contextmenu',e=>e.preventDefault());
setInterval(sync,500);sync();G.skOffSync=sync;
})();
/* v75 편성 프리셋 */
(()=>{const C=G.C;const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='party'){const sb=document.querySelector('#screen .sbody'),c1=sb&&sb.querySelector('.card');if(c1&&!sb.querySelector('.pset')){const s=C.S(),P=s.pset=s.pset||[null,null,null],cur=s.party.join();
 const h=`<div class="card pset"><div class=ttl>편성 프리셋 <small>탭: 불러오기 · 💾: 현재 편성 저장</small></div><div class=psr>${P.map((p,i)=>{const on=p&&p.join()==cur;return `<div class="psl ${p?'':'emp'} ${on?'on':''}" data-pi=${i}><b>${i+1}</b><div class=psi>${p?(p.length?p.map(k=>{const c=D.COMPS.find(x=>x.k==k);return c?`<img src="${A}${c.img}">`:''}).join(''):'<small>리나 단독</small>'):'<small>비어 있음</small>'}</div><span class=pss data-ps=${i}>💾</span></div>`}).join('')}</div></div>`;
 c1.insertAdjacentHTML('afterend',h);
 sb.querySelectorAll('.psl').forEach(el=>el.onclick=e=>{const i=+el.dataset.pi;if(e.target.closest('.pss')){P[i]=s.party.slice();toast(`프리셋 ${i+1}에 저장했습니다`);G.save&&G.save();renderScreen();return}const p=P[i];if(!p)return toast('먼저 💾로 현재 편성을 저장하세요');const q=p.filter(k=>s.comps[k]).slice(0,4);s.party=q;C.buildAllies();C.refreshMax();toast(`프리셋 ${i+1} 편성 적용 · 전투력 ${fmt(C.POW())}`);renderScreen()})}}}catch(_){}return r}})();
/* v76 보유 동료 정렬/필터 */
(()=>{const C=G.C,SO=[['def','기본'],['rar','등급'],['lv','레벨'],['fac','세력']];const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='party'){const cards=[...document.querySelectorAll('#screen .rcard[data-c]')];if(!cards.length||document.querySelector('#screen .csort'))return r;const s=C.S(),o=s.csort=s.csort||{k:'def',own:0},box=cards[0].parentNode,ttl=box.querySelector('.ttl');
 const ri=c=>Object.keys(D.RAR).indexOf(String(c.g)),fi=c=>Object.keys(D.FACTIONS).indexOf(c.fac);
 const key=k=>{const c=D.COMPS.find(x=>x.k==k),lv=s.comps[k]||0,inP=s.party.includes(k)?1:0;return [lv?0:1,o.k=='rar'?-ri(c):o.k=='lv'?-lv:o.k=='fac'?fi(c):0,-inP,D.COMPS.indexOf(c)]};
 const cmp=(a,b)=>{const x=key(a.dataset.c),y=key(b.dataset.c);for(let i=0;i<x.length;i++)if(x[i]!=y[i])return x[i]-y[i];return 0};
 ttl.insertAdjacentHTML('afterend',`<div class=csort>${SO.map(([k,n])=>`<span class="cso ${o.k==k?'on':''}" data-so=${k}>${n}</span>`).join('')}<span class="cso own ${o.own?'on':''}" data-own=1>${o.own?'☑':'☐'} 보유만</span></div>`);
 cards.sort(cmp).forEach(c=>{box.appendChild(c);c.style.display=o.own&&!s.comps[c.dataset.c]?'none':''});
 box.querySelectorAll('.cso').forEach(b=>b.onclick=()=>{if(b.dataset.own)o.own=o.own?0:1;else o.k=b.dataset.so;renderScreen()})}}catch(_){}return r}})();
/* v77 필드별 날씨/환경 파티클 */
(()=>{const C=G.C,P=[];let cur='',acc=0;const rnd=(a,b)=>a+Math.random()*(b-a);
const W={meadow:{n:14,mk:(w,h)=>({x:rnd(-20,w),y:-10,vx:rnd(18,40),vy:rnd(22,40),r:rnd(3,5),c:Math.random()<.5?'#ffd0e6':'#fff4f8',rot:rnd(0,6),vr:rnd(-3,3),k:'petal'})},
 forest:{n:12,mk:(w,h)=>({x:rnd(0,w),y:rnd(h*.3,h),vx:rnd(-8,8),vy:rnd(-14,-4),r:rnd(1.5,3),c:'#f6ffb0',k:'mote',ph:rnd(0,6)})},
 darkwood:{n:16,mk:(w,h)=>({x:rnd(0,w),y:rnd(h*.3,h),vx:rnd(-10,10),vy:rnd(-10,4),r:rnd(1.8,3.2),c:'#b8ff7a',k:'mote',ph:rnd(0,6)})},
 town:{n:8,mk:(w,h)=>({x:rnd(0,w),y:rnd(h*.2,h),vx:rnd(6,16),vy:rnd(-6,2),r:rnd(1,2),c:'#fff3d0',k:'mote',ph:rnd(0,6)})},
 autumn:{n:14,mk:(w,h)=>({x:rnd(-20,w),y:-10,vx:rnd(-30,10),vy:rnd(30,55),r:rnd(4,6),c:['#ff9a3a','#e8602a','#ffc24a'][Math.random()*3|0],rot:rnd(0,6),vr:rnd(-4,4),k:'leaf'})},
 beach:{n:10,mk:(w,h)=>({x:rnd(0,w),y:rnd(h*.2,h*.9),vx:0,vy:0,r:rnd(1.5,3),c:'#ffffff',k:'glint',ph:rnd(0,6)})},
 desert:{n:22,mk:(w,h)=>({x:-20,y:rnd(h*.25,h),vx:rnd(140,220),vy:rnd(-6,6),r:rnd(1,2),c:'#f3d29a',k:'sand'})},
 snow:{n:48,mk:(w,h)=>({x:rnd(-20,w+20),y:-8,vx:rnd(-14,6),vy:rnd(28,55),r:rnd(1.5,3.5),c:'#ffffff',k:'snow',ph:rnd(0,6)})},
 ice:{n:30,mk:(w,h)=>({x:rnd(-20,w+20),y:-8,vx:rnd(-30,-10),vy:rnd(30,60),r:rnd(1.2,3),c:'#e6f6ff',k:'snow',ph:rnd(0,6)})},
 sky:{n:16,mk:(w,h)=>({x:-60,y:rnd(h*.15,h*.95),vx:rnd(90,150),vy:rnd(-4,4),r:rnd(20,46),c:'#ffffff',k:'wind'})},
 volcano:{n:30,mk:(w,h)=>(Math.random()<.6?{x:rnd(0,w),y:h+6,vx:rnd(-14,14),vy:rnd(-110,-60),r:rnd(3,4.8),c:'#fffbe0',k:'ember',ph:rnd(0,6)}:{x:rnd(-20,w),y:-8,vx:rnd(-6,10),vy:rnd(32,52),r:rnd(1.8,3.2),c:'#3a302c',k:'ash',ph:rnd(0,6)})}};
G.weather=()=>cur;
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||(G.saverState&&G.saverState())||(R.opt&&!R.opt.fx)){P.length=0;return}const c=document.querySelector('#battle canvas');if(!c)return;const w=c.clientWidth,h=c.clientHeight,f=R.bgOv?'':D.FIELDS[C.S().si%D.FIELDS.length],cf=W[f];if(f!==cur){cur=f;P.length=0;if(cf)for(let i=0;i<cf.n;i++){const q=cf.mk(w,h);q.x=rnd(0,w);if(q.k!='ember')q.y=rnd(0,h);q.life=rnd(0,1);P.push(q)}}if(!cf)return;
 const rt=R.hsRealDt||dt;acc+=rt*cf.n/4;while(acc>1&&P.length<cf.n){acc--;const q=cf.mk(w,h);q.life=0;P.push(q)}if(P.length>=cf.n)acc=0;
 const ctx=c.getContext('2d'),sc=c.width/w,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=P.length-1;i>=0;i--){const q=P[i];q.life+=rt*.25;q.x+=q.vx*rt;q.y+=q.vy*rt;if(q.k=='snow'||q.k=='ash')q.x+=Math.sin(T*1.5+q.ph)*12*rt;if(q.k=='mote'){q.x+=Math.sin(T*.9+q.ph)*10*rt}if(q.rot!=null)q.rot+=q.vr*rt;
  if(q.x<-30||q.x>w+30||q.y>h+20||q.y<-30||q.life>1.6){P.splice(i,1);continue}
  const fa=Math.min(1,q.life*4)*Math.min(1,(1.6-q.life)*3);ctx.fillStyle=q.c;
  if(q.k=='petal'||q.k=='leaf'){ctx.globalAlpha=.75*fa;ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot);ctx.scale(1,Math.abs(Math.cos(q.rot*1.3))*.7+.3);ctx.beginPath();ctx.ellipse(0,0,q.r,q.r*.55,0,0,7);ctx.fill();ctx.restore()}
  else if(q.k=='wind'){ctx.globalAlpha=.22*fa;ctx.fillRect(q.x,q.y,q.r*3,1.6);ctx.globalAlpha=.12*fa;ctx.beginPath();ctx.ellipse(q.x+q.r,q.y+6,q.r,q.r*.22,0,0,7);ctx.fill()}else if(q.k=='sand'){ctx.globalAlpha=.45*fa;ctx.fillRect(q.x,q.y,q.r*9,q.r*.8)}
  else if(q.k=='glint'){const tw=Math.max(0,Math.sin(T*3+q.ph));ctx.globalAlpha=.8*tw*fa;ctx.fillRect(q.x-q.r*2,q.y-.6,q.r*4,1.2);ctx.fillRect(q.x-.6,q.y-q.r*2,1.2,q.r*4)}
  else{const glow=q.k=='mote'||q.k=='ember';ctx.globalAlpha=(glow?.55+.4*Math.sin(T*3+q.ph):q.k=='ash'?.5:.85)*fa;if(glow){ctx.globalCompositeOperation='lighter';const a0=ctx.globalAlpha;ctx.globalAlpha=a0*.3;ctx.beginPath();ctx.arc(q.x,q.y,q.r*2.6,0,7);ctx.fill();ctx.globalAlpha=a0}if(q.k=='snow'){ctx.fillStyle='rgba(90,110,150,.35)';ctx.beginPath();ctx.arc(q.x+.6,q.y+.8,q.r+.9,0,7);ctx.fill();ctx.fillStyle=q.c}if(q.k=='ember'){ctx.globalCompositeOperation='source-over';const a0=Math.min(1,fa*(.85+.15*Math.sin(T*5+q.ph)));ctx.globalAlpha=a0;ctx.fillStyle='rgba(40,4,0,.9)';ctx.beginPath();ctx.arc(q.x,q.y,q.r*1.65,0,7);ctx.fill();ctx.fillStyle='#ff6a00';ctx.beginPath();ctx.arc(q.x,q.y,q.r*1.3,0,7);ctx.fill();ctx.fillStyle='#ffd23a';ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,7);ctx.fill();ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(q.x,q.y,q.r*.55,0,7);ctx.fill();continue}ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,7);ctx.fill();if(glow)ctx.globalCompositeOperation='source-over'}}
 ctx.restore()}catch(_){}};
})();
/* v78 보스 클리어 축하 연출 (컨페티 + 빛줄기) */
(()=>{const C=G.C;let run=0;
G.confetti=(big)=>{if(run||(R.opt&&!R.opt.fx)||G.saverState&&G.saverState())return;run=1;const cv=document.createElement('canvas');cv.className='cfcv';const W=390,H=844,dp=Math.min(2,devicePixelRatio||1);cv.width=W*dp;cv.height=H*dp;document.body.appendChild(cv);const x=cv.getContext('2d');x.scale(dp,dp);
 const CL=['#ffd23a','#ff5a6a','#5ad0ff','#7aff8a','#ffffff','#c08aff','#ff9a3a'],N=big?110:70,P=[];for(let i=0;i<N;i++){const L=i%2==0;P.push({x:L?-10:W+10,y:H*.55+Math.random()*80,vx:(L?1:-1)*(160+Math.random()*260),vy:-(380+Math.random()*420),w:5+Math.random()*5,h:8+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*14,c:CL[i%CL.length],d:Math.random()*.25})}
 const t0=performance.now();let lt=t0;const step=now=>{const dt=Math.min(.05,(now-lt)/1000),t=(now-t0)/1000;lt=now;x.clearRect(0,0,W,H);
  if(t<1.2){const a=t<.2?t/.2:(1.2-t)/1;x.save();x.globalAlpha=.35*a;x.translate(W/2,H*.3);x.rotate(t*.4);for(let i=0;i<12;i++){x.rotate(Math.PI/6);const g=x.createLinearGradient(0,0,0,-520);g.addColorStop(0,'rgba(255,240,170,1)');g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.beginPath();x.moveTo(-14,0);x.lineTo(14,0);x.lineTo(60,-520);x.lineTo(-60,-520);x.fill()}x.restore()}
  for(const p of P){if(t<p.d)continue;p.vy+=520*dt;p.vx*=.985;p.vy=Math.min(p.vy,170);p.x+=p.vx*dt+Math.sin(t*4+p.r)*20*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;x.save();x.globalAlpha=t>2.6?Math.max(0,(3.4-t)/.8):1;x.translate(p.x,p.y);x.rotate(p.r);x.scale(1,Math.cos(p.r*1.7));x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()}
  if(t<3.4)requestAnimationFrame(step);else{cv.remove();run=0}};requestAnimationFrame(step)};
const oc=C.ev.clear;C.ev.clear=function(){const r=oc&&oc.apply(this,arguments);try{let k=0;const go=()=>{if(document.querySelector('.vic.win')){if(!G.screen)G.confetti(C.S().si%7==0);return}if(k++<50)setTimeout(go,100)};go()}catch(_){}return r};
})();

/* v79 제6장 천공의 신전 · 클리어 세이브 이전 */
(()=>{const C=G.C,s=C.S();if(s&&s.done&&s.maxSi<D.FIELDS.length-1){s.done=0;s.maxSi++;}})();
/* v80 보스 피니시 카메라 줌 */
(()=>{const C=G.C;const ok=C.ev.kill;C.ev.kill=function(e){try{if(e&&e.boss&&!e.wb&&!G.screen&&(!R.opt||R.opt.shake)){const q=R._ES().get(e),c=document.querySelector('#battle canvas');if(q&&c){const h=(e.sc||1)*90;c.style.transformOrigin=`${q.x}px ${q.y-h*.5}px`;c.style.transition='transform .35s cubic-bezier(.2,.9,.3,1)';c.style.transform='scale(1.18)';clearTimeout(G._fzT);G._fzT=setTimeout(()=>{c.style.transition='transform .6s ease-in-out';c.style.transform='';setTimeout(()=>{c.style.transition='';c.style.transformOrigin=''},650)},1000)}}}catch(_){}return ok&&ok.apply(this,arguments)};})();
/* v81 보스 착지 충격 연출 */
(()=>{const C=G.C;const seen=new WeakSet();let FXs=[];
const of=R.frame;R.frame=dt=>{of(dt);try{const bo=C.alive().find(e=>e.boss&&!e.wb);if(bo&&!seen.has(bo)){const q=R._ES().get(bo);if(q&&q.enter>=1){seen.add(bo);if(!G.screen&&(!R.opt||R.opt.fx)){const s=bo.sc||1,cr=[];for(let i=0;i<9;i++){const a=i/9*6.283+Math.random()*.4,L=50+Math.random()*60;cr.push([a,L*s])}const du=[];for(let i=0;i<22;i++){const a=Math.random()*6.283;du.push({a,v:60+Math.random()*120,r:8+Math.random()*12})}FXs.push({e:bo,t:0,s,cr,du});if(!R.opt||R.opt.shake){const c=document.querySelector('#battle canvas');if(c){c.classList.remove('bland');void c.offsetWidth;c.classList.add('bland');setTimeout(()=>c.classList.remove('bland'),520)}}}}}
 if(!FXs.length||G.screen)return;const c=document.querySelector('#battle canvas');if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=FXs.length-1;i>=0;i--){const f=FXs[i];f.t+=dt;const q=R._ES().get(f.e);if(f.t>1.6||!q){FXs.splice(i,1);continue}const x=q.x,y=q.y,t=f.t;
  const ca=t<1?1:(1.6-t)/.6;ctx.globalAlpha=.8*ca;ctx.strokeStyle='#1a0e06';ctx.lineWidth=3.5;ctx.beginPath();for(const [a,L] of f.cr){const k=Math.min(1,t/.12);ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*L*.55*k,y+Math.sin(a)*L*.2*k);ctx.lineTo(x+Math.cos(a+.25)*L*k,y+Math.sin(a+.25)*L*.36*k)}ctx.stroke();
  for(let j=0;j<2;j++){const k=(t-j*.12)/.75;if(k<=0||k>=1)continue;ctx.globalAlpha=(1-k);ctx.strokeStyle=j?'#ffb84a':'#ffffff';ctx.lineWidth=(1-k)*16+2;const R0=40+k*230*f.s;ctx.beginPath();ctx.ellipse(x,y,R0,R0*.32,0,0,7);ctx.stroke()}
  const dk=Math.min(1,t/.9);for(const d of f.du){const r=d.r*.8*(1+dk*1.2),px=x+Math.cos(d.a)*d.v*Math.sqrt(dk)*f.s,py=y+Math.abs(Math.sin(d.a))*d.v*.22*Math.sqrt(dk)-dk*6;ctx.globalAlpha=(1-dk)*.5;ctx.fillStyle='#e6dccb';ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill()}}
 ctx.restore()}catch(_){}};})();
/* v82 웨이브 배너 */
(()=>{const C=G.C;const os=C.ev.spawn;C.ev.spawn=function(){const r=os&&os.apply(this,arguments);try{const s=C.S();if(C.B.boss||G.screen||(G.saverState&&G.saverState())||G.storyOn)return r;const w=Math.min(3,(s.wave||0)+1),fin=w>=3;const b=document.getElementById('battle');if(!b)return r;b.querySelectorAll('.wvb').forEach(x=>x.remove());const d=document.createElement('div');d.className='wvb'+(fin?' fin':'');d.innerHTML=`<i></i><b>${fin?'FINAL WAVE':'WAVE '+w+'<small>/3</small>'}</b><i></i>`;b.appendChild(d);setTimeout(()=>d.remove(),1300)}catch(_){}return r}})();

/* v83 멀티 킬 연출 (시각 전용) */
(()=>{const C=G.C;const ok=C.ev.kill;let n=0,t0=0,tm=0;C.ev.kill=function(){const r=ok&&ok.apply(this,arguments);try{if(G.screen||(G.saverState&&G.saverState())||G.storyOn)return r;const now=performance.now();n=now-t0<650?n+1:1;t0=now;if(n<2)return r;clearTimeout(tm);tm=setTimeout(()=>{const k=n;const b=document.getElementById('battle');if(!b||b.querySelector('.wvb'))return;b.querySelectorAll('.mkb').forEach(x=>x.remove());const d=document.createElement('div');d.className='mkb'+(k>=4?' k4':k>=3?' k3':'');d.innerHTML=`<b>${k>=4?'MULTI KILL':k==3?'TRIPLE KILL':'DOUBLE KILL'}</b>${k>=4?'<small>×'+k+'</small>':''}`;b.appendChild(d);setTimeout(()=>d.remove(),1200)},180)}catch(_){}return r}})();
