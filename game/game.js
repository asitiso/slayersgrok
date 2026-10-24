/* r237 perf: textContent writes that would not change a lone text child are skipped (no node swap -> no style/layout invalidation for unchanged HUD text) */(()=>{const d=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');if(!d||!d.set||Node.prototype.__tcG)return;Object.defineProperty(Node.prototype,'textContent',{configurable:true,enumerable:d.enumerable,get:d.get,set(v){const f=this.firstChild;if(f&&f===this.lastChild&&f.nodeType===3&&this.nodeType===1&&f.data===String(v??''))return;d.set.call(this,v)}});Node.prototype.__tcG=1})();
/* r230 perf: write DOM only when the value changes */
const $sd=(n,v)=>{if(v===''&&n.classList.contains('dot')&&n.parentElement&&n.parentElement.classList.contains('lk'))v='none';if(n.style.display!==v)n.style.display=v},$sw=(st,k,v)=>{if(st[k]!==v)st[k]=v},$st=(n,v)=>{v=String(v);if(n.textContent!==v){const f=n.firstChild;if(v!==''&&f&&f.nodeType===3&&!f.nextSibling)f.nodeValue=v;else n.textContent=v}};/* r394: same text, but rewrites the existing text node instead of replacing it (no DOM node churn) */
'use strict';
const C=CORE,D=C.D,A=D.A,R=RENDER,BAL=D.BAL;
const $=s=>document.querySelector(s),fmt=R.fmt;
const KEY='slayers_save_v2';
let saved=null;G_LOADFROM:{for(const k of [KEY,KEY+'_tmp',KEY+'_bak']){try{const v=JSON.parse(localStorage.getItem(k));if(v&&typeof v=='object'){saved=v;window.__loadFrom=k;break G_LOADFROM}}catch(e){}}}
const S=C.init(saved);const B=C.B;setTimeout(()=>{const e=document.querySelector("#cGold"),c=document.querySelector("#cv");if(e&&c){const a=e.getBoundingClientRect(),b=c.getBoundingClientRect();RENDER.goldXY={x:a.left-b.left+8,y:a.top-b.top+a.height/2}}},500);RENDER.onCoin=()=>{const e=document.querySelector("#cGold");if(!e)return;e.classList.remove("cpop");void e.offsetWidth;e.classList.add("cpop")};{const sk=(DATA.SKINS||[]).find(x=>x.k==S.skin);RENDER.applyCskin(S.cskin);RENDER.skinImg=sk&&sk.k!="base"?sk.img:null;RENDER.skinAtk=sk&&sk.atk||null;RENDER.skinCast=sk&&sk.cast||null;[sk&&sk.atk,sk&&sk.cast].forEach(x=>x&&load(x));load&&load(sk?sk.img:"hero_lina.png")}
const G={C,S:()=>C.S(),speed:1,tab:'battle',screen:null};window.G=G;
const tfmt=s=>{s=Math.max(0,Math.ceil(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(x).padStart(2,'0')}`:`${m}:${String(x).padStart(2,'0')}`};
function toast(t){let q=$('#toastQ');if(!q){q=document.createElement('div');q.id='toastQ';$('#app').appendChild(q)}const tk=String(t).replace(/<img\b[^>]*?src=["']?(?:assets\/)?([^"'\s>]+)[^>]*>/g,'[$1]'),old=[...q.children].find(x=>x._tk==tk);if(old)old.remove();while(q.children.length>=3)q.firstChild.remove();const d=document.createElement('div');d.className='toast';d.innerHTML=t;d._tk=tk;q.appendChild(d);setTimeout(()=>d.remove(),1800)}
function banner(t){if(/^LEVEL UP/.test(t)&&R.lvup)R.lvup();if(document.querySelector('.vic:not(.out)'))return;const d=document.createElement('div');d.className='banner';d.textContent=t;d.style.top=(150+(banN++%3)*44)+'px';if(/^LEVEL UP/.test(t)){if(document.querySelector('#battle .combo.dlo:not(.cbq):not(.cbo)'))d.classList.add('lvp');else{d.classList.add('lvb');G._dloOn&&G._dloOn()}}setTimeout(()=>banN=Math.max(0,banN-1),1600);$('#battle').appendChild(d);setTimeout(()=>d.remove(),1600)}let banN=0;
function modal(html,cb){const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class=card>${html}<span class="btn wide" style="margin-top:12px">확인</span></div>`;m.onclick=e=>{if(e.target.closest('.btn')||e.target==m){m.remove();cb&&cb()}};$('#app').appendChild(m);return m}
// core events -> renderer/UI
Object.assign(C.ev,{hit:R.hit,kill:(e,...a)=>{R.kill(e,...a);if(e&&e.boss){R.hs=Math.max(R.hs||0,.6);if(!R.opt||R.opt.fx){const f=document.createElement('div');f.className='bkflash';document.body.appendChild(f);setTimeout(()=>f.remove(),700)}}},atk:R.atk,eatk:R.atk,dmgAlly:R.dmgAlly,heal:R.heal,spell:R.spell,walk:R.walk,banner,toast,clear:()=>{renderPanel();resultPop(1)},fail:()=>{renderPanel();resultPop(0)}});
C.deferHit=R.deferHit;
// ---------- HUD
function updateHud(){const s=C.S();
  if(!G.nick)$st($('#hName'),'Lv.'+s.lv);{const pw=C.POW();$st($('#hPow'),fmt(pw));if(G._pw&&pw>G._pw*1.001){const d=document.createElement('div');d.className='powup';d.innerHTML='전투력 <b>+'+fmt(pw-G._pw)+'</b> ▲';document.body.appendChild(d);setTimeout(()=>d.remove(),1600)}G._pw=pw}$st($('#cGold'),fmt(s.gold));$st($('#cGem'),fmt(s.gems));renderPartyCol();
  $st($('#stName'),'[일반] '+C.stageName(s.si)+'  '+D.CH[Math.floor(s.si/7)]);const nr=$('#navroll');if(nr&&nr.childNodes[1])$st(nr.querySelector('.cnt'),fmt(s.orbs));if(G.lastSi!==s.si){if(G.lastSi!==undefined){const nc=Math.floor(s.si/7);if(nc!==Math.floor(G.lastSi/7))chapterCard(nc,s.si);else banner(C.stageName(s.si)+' · '+D.CH[nc])}G.lastSi=s.si}{const sec=C.idleSec(),ib=$('#idleT');if(ib)$st(ib,Math.floor(sec/3600)+'h '+String(Math.floor(sec%3600/60)).padStart(2,'0')+'m');{const bt=$('#idleBtn');if(bt){bt.classList.toggle('ready',sec>=600);bt.classList.toggle('full',sec>=8*3600)}}}{const e=C.B.enemies.find(x=>x.hp>0),fm=e?C.partyFacMul(e):1,ft=$('#facTag');if(ft){$st(ft,fm>1.02?'상성 우세 ▲':fm<.98?'상성 열세 ▼':'상성 보통');{const fc='factag '+(fm>1.02?'up':fm<.98?'down':'');if(ft.className!==fc)ft.className=fc}}}$sw($('#xpBar').style,'width',Math.min(100,s.exp/C.needExp()*100)+'%');
  const bb=$('#bossBtn');const can=s.wave>=BAL.waves&&!B.boss;bb.classList.toggle('off',!can);bb.classList.toggle('fight',!!B.boss);$st($('#autoBoss'),'자동 '+(s.autoBoss?'ON':'OFF'));$('#autoBoss').classList.toggle('on',!!s.autoBoss);
  const m=D.MISSIONS.find(x=>(s.mp[x.k]||0)>=x.goal&&!s.mc[x.k])||D.MISSIONS.find(x=>(s.mp[x.k]||0)<x.goal);const ms=$('#mission');
  if(m){const v=Math.min(m.goal,s.mp[m.k]||0),done=v>=m.goal;const key=m.k+v+done;ms.classList.toggle('ready',done);let sp;if(ms.dataset.key!==key&&ms.dataset.m===m.k&&ms._dn===done&&(sp=ms.querySelector('.f > span:not(.mq)'))){ms.dataset.key=key;$st(sp,`(${v}/${m.goal})`)}/* r394: count-only change patches the counter text instead of rebuilding the bar */if(ms.dataset.key!==key){ms.dataset.key=key;ms.dataset.m=m.k;ms._dn=done;ms.innerHTML=`<div class="morb ${done?'done':''}"><img src="${A}sk/ice.png"><small><img class=ci src=assets/it2_gem.png>${m.gem}</small></div><div class=f><span class=mq>[지령 ${D.MISSIONS.indexOf(m)+1}]</span> ${m.n} <span class=${done?'up':''}>(${v}/${m.goal})</span>${done?' <b class=up>완료! 탭하여 수령</b>':''}</div>`}}else if(ms.dataset.key!=='all'||!ms.firstChild){ms.dataset.key='all';ms.innerHTML=`<div class=morb><img src="${A}sk/heal.png"></div><div class=f>오늘의 지령 모두 완료!</div>`;ms.dataset.m=''}
  const bar=$('#stBar');if(B.boss&&B.enemies[0]){const e=B.enemies[0];{const L=10,PAL=['#ff4a3a','#ff9a2a','#ffd84a','#6ee05a','#3ac8ff','#7a6bff','#d36bff','#ff6bb5','#ff4a3a','#ff9a2a'],f=Math.max(0,e.hp/e.max)*L,li=Math.max(0,Math.ceil(f)-1),w=f<=0?0:(f-li)*100;$sw(bar.style,'width',w+'%');{const g=`linear-gradient(${PAL[li]},${PAL[li]}bb)`,pe=bar.parentElement,pg=li>0?PAL[li-1]+'aa':'';if(bar._bg!==g){bar._bg=g;bar.style.setProperty('background',g,'important')}if(pe._bg!==pg){pe._bg=pg;if(pg)pe.style.setProperty('background',pg,'important');else pe.style.removeProperty('background')}}$st($('#stInfo'),B.timer.toFixed(2)+'초');let hx=$('#hpx');if(!hx){hx=document.createElement('em');hx.id='hpx';bar.parentElement.appendChild(hx)}$sd(hx,'');$st(hx,'×'+(li+1))}$sw($('#tBar').style,'width',Math.max(0,B.timer/BAL.bossTime*100)+'%')}
  else if(B.boss){$sw(bar.style,'width','100%');bar._bg=undefined;bar.style.background='linear-gradient(90deg,#8e1a1a,#ff4a3a)';$st($('#stInfo'),'보스 등장!')}
  else{{const pe=bar.parentElement;if(pe._bg!==''){pe._bg='';pe.style.removeProperty('background')}if(bar._bg!==''){bar._bg='';bar.style.removeProperty('background')}}{const hx=$('#hpx');if(hx)$sd(hx,'none')}$sw($('#tBar').style,'width','100%');$sw(bar.style,'width',Math.min(100,s.wave/BAL.waves*100)+'%');$st($('#stInfo'),s.wave>=BAL.waves?(C.canAutoBoss()?'보스 도전!':'보스 재도전 대기'):`웨이브 ${Math.min(s.wave+1,BAL.waves)}/${BAL.waves} · 적 ${C.alive().length+C.reserve()}`)}
  document.querySelectorAll('.sk').forEach(el=>{const sp=D.SPELLS.find(x=>x.k==el.dataset.k);if(el.classList.contains('lock'))return;const c=B.cds[sp.k]||0;/* r369 perf: .cd is opacity:0 (only the sweep reads it), so keep the exact % on the element and write the hidden height only at 0/100 transitions */const pc=Math.round(c/sp.cd*1000)/10;el._cdp=pc;const cq=pc<=0?0:pc>=100?2:1;if(el._cdq!==cq){el._cdq=cq;el.querySelector('.cd').style.height=(cq===1?50:cq*50)+'%'}$st(el.querySelector('.t'),c>0?Math.ceil(c):'');el.classList.toggle('ready',c<=0)});
  C.daily();const md=D.MISSIONS.some(m=>(s.mp[m.k]||0)>=m.goal&&!s.mc[m.k]);C.weekly();const wd=(D.WMISS||[]).some(m=>((s.wk.p||{})[m.k]||0)>=m.goal&&!(s.wk.c||{})[m.k]);const n=$('#sidemission .dot');if(n)$sd(n,md||wd?'':'none');/* r336: weekly 받기 also lights 임무 */
  C.bUpdate();const bd=['vault','mine'].some(k=>s.bld[k].acc>=C.bRate(k)*BAL.store*.5);const hb=$('#sidebase .dot');if(hb)$sd(hb,bd?'':'none');
  const ad=s.arena.tickets>0||s.arena.pend;const ha=$('#sidearena .dot');if(ha)$sd(ha,ad?'':'none');
  const gd=!s.gj||s.raid.tries<BAL.raid.tries||(!s.guild.don.gold&&s.gold>=C.donateCost('gold'))||(!s.guild.don.gem&&s.gems>=BAL.donate.gem)||!!(G.gRed&&G.gRed());/* r391: donation part only lit when that donation is still open today AND affordable (was: any unused donation slot, even with too little gold) */const hg=$('#sideguild .dot');if(hg)$sd(hg,gd?'':'none');
  {const dd=(sel,on)=>document.querySelectorAll(sel).forEach(n=>$sd(n,on?'':'none'));const ev=(s.att?.last!==C.today())&&((s.att?.n||0)<28),ml=D.MAILS.some(m=>C.mailLive(m)),sm=(s.tickets||0)>0||s.gems>=BAL.summon;dd('#sideevent .dot',ev);dd('#sidemail .dot',ml);dd('#navsummon .dot',sm);dd('#navtrain .dot',md);const BD={event:ev,mail:ml,summon:sm,mission:md,train:md,base:bd,arena:ad,guild:gd,dungeon:Object.values(C.dunDaily().t||{}).some(v=>v>0)||!!(C.brRed&&C.brRed()),explore:Object.values(C.expState()).some(x=>x&&C.now()>=x.end),enhance:Object.values(s.gear||{}).some(it=>{if(!it||(it.en||0)>=15)return false;const c=C.enCost(it);return s.gold>=c.g&&(s.stone||0)>=c.st}),wboss:!!(C.wbState&&C.wbState().tries<C.WB.tries),ach:!!(C.achList&&C.achList().some(a=>a.can)),pass:(()=>{const b=C.bp(),T=C.bpTier();for(let t=0;t<T;t++)if(!b.fc[t]||(b.prem&&!b.pc[t]))return true;return false})()};BD.menu=MENU.some(m=>BD[m[0]]);G.BD=BD;document.querySelectorAll('#mgrid a').forEach(x=>{let d=x.querySelector('.dot'),nw=0;if(!d){d=document.createElement('span');d.className='dot';x.appendChild(d);nw=1}const k=x.dataset.s;if(k in BD)$sd(d,BD[k]?'':'none');else if(nw)$sd(d,'none')})/* r313: keys without a BD entry (tower/star/pet/codex/friend) are owned by their own writer - no more none/'' flip every HUD tick */;for(const k in BD){if(k=='menu'||k=='mission'||k=='base'||k=='arena'||k=='guild'||k=='event'||k=='mail')continue;dd('#side'+k+' .dot',BD[k])}dd('#sidemenu .dot',BD.menu)}
}
let lockedSig='';
function renderSkills(){const s=C.S();lockedSig=JSON.stringify(C.spells().map(x=>x.k));
setTimeout(()=>{const k=$('#skills');k&&k.classList.toggle('sw',k.scrollWidth>k.clientWidth+4)},50);
  $('#skills').innerHTML=C.load6().map(sp=>{const lk=sp.unlock&&s.maxSi<sp.unlock;return `<div class="sk ${lk?'lock':''} ${sp.k=='ds'?'big':''}" data-k=${sp.k}><img src="${A}${sp.img}"><div class=cd></div><div class=t>${lk?'<img class="emi e_sk_lock" src=assets/sk_lock.png alt="">':''}</div></div>`}).join('')+`<div class="tgl ${s.autoSpell?'on':''}" id=autoSp><img src=assets/ic2_auto.png style="width:100%;height:100%;object-fit:contain"></div>`;
  $('#autoSp').onclick=()=>{s.autoSpell=!s.autoSpell;renderSkills()};
  document.querySelectorAll('.sk').forEach(el=>el.onclick=()=>{const sp=D.SPELLS.find(x=>x.k==el.dataset.k);if(sp.unlock&&s.maxSi<sp.unlock)return toast(`${C.stageName(sp.unlock)} 도달 시 해금`);C.castSpell(sp)})}
const SIDEL=[['event','출석','ic3_calendar.png'],['shop','패키지','ic3_shop.png'],['mail','우편','ic3_mail.png']];/* r334: 탐험 sat under the party column - folded into 더보기 */
/* r334: 4 core icons per side; the rest fold into 더보기 (#sideF), same ids so every badge/tutorial/lock lookup still finds them */
const SIDER=[['train','성장','ic3_train.png'],['menu','메뉴',''],['gear','장비','ic3_bag.png'],['mission','임무','ic3_quest.png'],['more','더보기','']];
const SIDER2=[];const SIDEF=[['enhance','강화','ic3_anvil.png'],['dungeon','도전','ic4/gate.png'],['arena','투기장','ic3_arena.png'],['guild','협회','ic3_guild.png'],['relic','기보','ic3_relic.png'],['speed','배속','ic3_speed.png'],['explore','탐험','ic3_map.png']];
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
function menuGo(k){$('#menuPop').classList.remove('on');{const f=$('#sideF'),o=f.classList.contains('on');f.classList.remove('on');if(k=='more'){if(!o)f.classList.add('on');return}}if(k=='comp')k='summon';if(k=='menu')return $('#menuPop').classList.add('on');if(['gear','train','comp','mission'].includes(k))return openSheet(k);if(k=='speed'){G.speed=G.speed==1?2:1;renderHub();return}if(k=='idle')return idleInfo();openScreen(k=='shop2'?'shop':k)}
function renderHub(){const ic=([k,n,i])=>`<a id=side${k} data-s=${k}>${i?`<img src="${A}${i}">`:k=='more'?'<span class="grid gmore"><i></i><i></i><i></i></span>':'<span class=grid>▦</span>'}<em>${k=='speed'?'×'+G.speed+' 배속':n}</em><span class=dot style="display:none"></span></a>`;
  $('#sideL').innerHTML=SIDEL.map(ic).join('');$('#sideR').innerHTML=SIDER.map(ic).join('');$('#sideR2').innerHTML=SIDER2.map(ic).join('');$('#sideF').innerHTML=SIDEF.map(ic).join('');G._sfDot&&G._sfDot();
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
function autoRoll(on,why){clearInterval(autoT);autoT=null;const was=G.autoRolling;G.autoRolling=on;/* r402: UI-layer tally for the 자동 뽑기 stop summary - observes the bag item before/after each C.autoRollStep() (unchanged) */const T=autoRoll.T||(autoRoll.T={n:0,eq:[],sr:[],gold:0,p0:0,got:null});if(on){T.n=0;T.eq.length=0;T.sr.length=0;T.gold=0;T.p0=C.POW();T.got=null;autoT=setInterval(()=>{const S_=C.S(),b=S_.bag,sp=b?C.sellPrice(b):0;const r=C.autoRollStep();if(b){if(S_.gear[b.slot]===b)T.eq.push(b);else if(S_.bag!==b){T.sr[b.r]=(T.sr[b.r]||0)+1;T.gold+=sp}else if(r=='stop')T.got=b}if(r=='ok')T.n++;if(r=='stop'){autoRoll(false,'stop')}else if(r=='empty'){autoRoll(false,'empty')}if(G.tab=='gear')renderPanel();renderNav()},220)}else if(was){const w=why||'user';if(!(T.n||T.eq.length||T.got)||!autoRoll.sum)toast(w=='stop'?'목표 등급 획득!':w=='empty'?'마정구 소진':'자동 뽑기 정지');else autoRoll.sum(T,w)}renderPanel()} // fixed real-time interval: unaffected by battle speed
// ---------- panel tabs
function renderPanel(){const p=$('#panel'),t=G.tab,s=C.S();C.daily();
 if(t=='battle'){const ch=Math.floor(s.si/7);p.innerHTML=`<div class=card><div class=ttl>제${ch+1}장 · ${D.CH[ch]}<small>최고 ${C.stageName(s.maxSi)}</small></div>
  <div style="display:flex;gap:5px;margin:6px 0 10px">${Array.from({length:7},(_,j)=>{const i=ch*7+j;return `<div data-st=${i} style="flex:1;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;cursor:pointer;${i<s.maxSi?'background:#c9953f;color:#3a1a0a':i==s.maxSi?'background:#d2401f;border:2px solid #ffe09a':'background:#0008;color:#777'};${i==s.si?'outline:2px solid #fff':''}">${C.stageName(i)}</div>`}).join('')}</div>
  <div style="display:flex;gap:8px"><span class="btn ${s.wave>=BAL.waves&&!B.boss?'':'off'}" id=bBoss style="flex:1"><img class=\"emi e_ic3_arena\" src=assets/ic3_arena.png alt=\"\">보스 도전</span><span class="btn p" id=bAuto style="flex:1">자동 도전 ${s.autoBoss?'ON':'OFF'}</span><span class="btn p" id=bMap><img class="emi e_ic_map" src=assets/ic_map.png alt=""></span></div></div>
  <div class=card><div class=ttl>파티 <small>탭하여 편성 · 최대 3명</small></div><div style="display:flex;gap:6px">${D.COMPS.map(c=>{const own=s.comps[c.k],inP=s.party.includes(c.k);return `<div data-c=${c.k} class=pc style="flex:1;text-align:center;border-radius:10px;padding:4px;border:2px solid ${inP?'#ffd77a':'#444'};background:#0006;${own?'':'opacity:.35'}"><img src="${A}${c.img}" style="height:60px"><br><small style="color:#fff;font-weight:700">${c.n}</small><br><small>${own?'Lv.'+own+(inP?' · 출전':''):'미보유'}</small></div>`}).join('')}</div></div>
  <div class=card><small>공격력 ${fmt(C.ATK())} · 예상 DPS ${fmt(C.estDPS())} · 최대 HP ${fmt(C.MAXHP())} · 치명 ${C.stat('crit').toFixed(1)}%<br>공격 보너스 +${Math.round((C.atkPct()-1)*100)}% (마탑·협회) · EXP ${fmt(s.exp)}/${fmt(C.needExp())}</small><div class=bar style="margin-top:4px"><i style="width:${s.exp/C.needExp()*100}%"></i></div></div>`;
  $('#bBoss').onclick=()=>{if(s.wave>=BAL.waves){C.S().failPow=0;C.startBoss()}renderPanel()};$('#bAuto').onclick=()=>{s.autoBoss=!s.autoBoss;renderPanel()};$('#bMap').onclick=()=>openScreen('map');
  p.querySelectorAll('[data-st]').forEach(el=>el.onclick=()=>{const i=+el.dataset.st;if(i>s.maxSi)return toast('아직 갈 수 없습니다');C.selectStage(i);renderPanel()});
  p.querySelectorAll('.pc').forEach(el=>el.onclick=()=>{const k=el.dataset.c;if(!s.comps[k])return toast('동료 탭에서 소환하세요');const i=s.party.indexOf(k);if(i>=0)s.party.splice(i,1);else if(s.party.length<3)s.party.push(k);else return toast('최대 3명');C.buildAllies();renderPanel()})}
 if(t=='gear'){const it=s.bag,o=it&&s.gear[it.slot];const d=it?C.itemPow(it)-C.itemPow(o):0;
  const slotHtml=`<div class=eqgrid>${D.SLOTS.map(sl=>{const g=s.gear[sl.k];return `<div class="eq ${it&&it.slot==sl.k?'sel':''}" style="--rc:${g?D.RAR[g.r].c:'#555'}"><img src="${A}${sl.img}" style="${g?'':'opacity:.25;'}${sl.f?'filter:'+sl.f:''}"><span>${g?'Lv.'+g.lv:sl.n}</span></div>`}).join('')}</div>`;
  const col=(x,hd,cls)=>`<div class="cmpc ${cls}" style="--rc:${x?D.RAR[x.r].c:'#555'}"><div class=brush>${hd}</div>${x?`<div class=eq style="--rc:${D.RAR[x.r].c};margin:8px auto 4px"><img src="${A}${slotOf(x.slot).img}"><span>Lv.${x.lv}</span></div><b class=iname>${x.name}</b><small style="color:${D.RAR[x.r].c};display:block;text-align:center">${D.RAR[x.r].n} ${slotOf(x.slot).n}</small>`:'<div style="height:96px;display:flex;align-items:center;justify-content:center"><small>비어 있음</small></div>'}
   ${cls=='new'?`<div class="pdiff ${d>=0?'up':'down'}"><img class=\"emi e_ic3_arena\" src=assets/ic3_arena.png alt=\"\">${d>=0?'+':'-'}${fmt(Math.abs(d))}</div>`:'<div class=pdiff style="visibility:hidden">-</div>'}
   <div class=srow2><span>${x&&x.st=='hp'?'체력':'공격력'}</span><b>${x?fmt(x.v):'-'}${cls=='new'&&x?(d>=0?' <i class=up>▲</i>':' <i class=down>▼</i>'):''}</b></div><div class=srow2><span>전투력</span><b>${x?fmt(C.itemPow(x)):'-'}</b></div></div>`;
  p.innerHTML=slotHtml+(it?`<div class=cmpwrap>${col(o,'착용 중','own')}${col(it,'NEW','new')}</div><div class=btnrow><span class="pill red" id=sl>판매 +${fmt(C.sellPrice(it))}<img class=ci src=assets/it2_gold.png></span><span class="pill green" id=eq>장착</span></div>`:'')+
  `<div class="card mjc"><div class=ttl>마정구 뽑기 <small>보유 <img class=ci src=assets/it2_exp.png> ${fmt(s.orbs)}</small></div>
  <span class="pill green wide ${s.orbs<1||G.autoRolling||it?'off':''}" id=roll><img class=ci src=assets/it2_exp.png> 1개 사용 · 뽑기</span><span class="pill wide ${s.orbs<1||G.autoRolling||it?'off':''}" id=rollEq style="margin-top:6px"><img class=\"emi e_ui_bolt\" src=assets/ui_bolt.png alt=\"\">일괄 뽑기·장착 (최대 30회)</span>
  <div style="margin:8px 0 4px"><small>자동 뽑기 필터: 목표 등급 이상 획득 시 정지 (좋은 장비 자동 장착 / 나머지 판매)</small></div>
  <div class=chips>${D.RAR.map((r,i)=>`<span class="chip ${s.filter==i?'on':''}" data-f=${i} style="color:${r.c}">${r.n}+</span>`).join('')}${D.RAR[s.filter]?'':'<span class="chip on mjnf">정지 없음</span>'}</div>
  <span class="pill ${G.autoRolling?'red':'blue'} wide" id=auto style="margin-top:8px">${G.autoRolling?`자동 뽑기 중… (탭하여 정지)${autoRoll.T?`<small class=arlive>${autoRoll.T.n}회 · 장착 ${autoRoll.T.eq.length}</small>`:''}`:'자동 뽑기 시작'}</span>
  <small style="display:block;margin-top:6px">확률: ${D.RAR.map(r=>`${r.n} ${(r.w/D.RAR.reduce((a,b)=>a+b.w,0)*100).toFixed(2)}%`).join(' · ')}</small></div>`;
  {const re=$('#rollEq');if(re)re.onclick=()=>{if(s.bag||G.autoRolling)return toast('먼저 장착/판매하세요');const p0=C.POW();let n=0,eq=[],sold=0,gold=0;const sr=[];/* r401: sold count per grade, read from the bag item right before it is sold (display only) */while(n<30&&C.rollOnce()){n++;const b=s.bag,o=s.gear[b.slot];if(C.itemPow(b)>C.itemPow(o)){eq.push(b);C.equipBag()}else{sr[b.r]=(sr[b.r]||0)+1;gold+=C.sellBag();sold++}}
  if(!n)return toast('마정구가 부족합니다');const byS={},byC={};eq.forEach(x=>{byS[x.slot]=x;byC[x.slot]=(byC[x.slot]||0)+1});/* r401: per-slot upgrade count (one slot can be replaced several times in 30 rolls; only the final item gets a tile) */
  modal(`<div class=ttl style="justify-content:center;font-size:18px">일괄 장착 결과</div><div style="text-align:center;margin:8px 0">${n}회 뽑기 · <b class=up>장착 ${eq.length}</b> · 판매 ${sold} (<img class=ci src=assets/it2_gold.png>${fmt(gold)})</div>${sold?`<div class=mjsr><small>판매 내역</small>${D.RAR.map((r,i)=>sr[i]?`<span class=mjs style="--rc:${r.c}">${r.n} <b>${sr[i]}</b></span>`:'').join('')}</div>`:''}<div class=skg>${Object.values(byS).map(x=>`<div class="skn mjr" style="--rc:${(D.RAR[x.r]||{c:'#888'}).c}"><img src="${A}${(D.SLOTS.find(q=>q.k==x.slot)||{}).img}" style="height:44px"><small>${x.name||x.slot}</small><b>${(D.RAR[x.r]||{n:''}).n} · Lv.${x.lv}</b>${byC[x.slot]>1?`<i class=mjx>×${byC[x.slot]}</i>`:''}</div>`).join('')}</div><div style="text-align:center;margin-top:8px">전투력 ${fmt(p0)} ▶ <b class=up>${fmt(C.POW())}</b></div>`);renderPanel();updateHud()}}$('#roll').onclick=()=>{if(!C.rollOnce())toast('마정구가 부족합니다');renderPanel()};$('#auto').onclick=()=>{if(s.bag&&!G.autoRolling)return toast('먼저 장착/판매하세요');autoRoll(!G.autoRolling)};
  if(it){$('#eq').onclick=()=>{C.equipBag();toast('장착 완료');renderPanel()};$('#sl').onclick=()=>{toast('판매 +'+fmt(C.sellBag())+'<img class=ci src=assets/it2_gold.png>');renderPanel()}}
  p.querySelectorAll('.chip[data-f]').forEach(el=>el.onclick=()=>{s.filter=+el.dataset.f;renderPanel()})}
 if(t=='train'){const tot=D.STATS.reduce((a,st)=>a+s.stl[st.k],0),tier=['삼류','이류','일류','절정','초절정','화경'][Math.min(5,Math.floor(tot/100))],tl=Math.floor(tot%100/10)+1;
  p.innerHTML=`<div class=trainhero><div class=plaque>${tier} 마도사 ${tl}</div><img src="${A}hero_lina.png"><div class=aura></div></div>
  <div class=tprog><div class=bar><i style="width:${tot%10*10}%"></i></div><small>수련 합계 ${tot} · 다음 경지 ${Math.floor(tot/10+1)*10}</small></div>
  <div class=tcards>${D.STATS.map(st=>{const lv=s.stl[st.k],c=C.cost(st),mx=!isFinite(c);const cur=st.mult?'×'+C.stat(st.k).toFixed(2):st.k=='crit'?C.stat(st.k).toFixed(1)+'%':fmt(C.stat(st.k));
   return `<div class=tcard><div class=medal><img src="${A}${st.img}"></div><div class=tlv>Lv. ${lv}</div><b>${cur}</b><small>${st.n} · ${st.d}</small><span class="pill green ${s.gold<c||mx?'off':''}" data-s=${st.k}>${mx?'MAX':'강화<br><small><img class=ci src=assets/it2_gold.png> '+fmt(c)+'</small>'}</span></div>`}).join('')}</div>
  <span class="pill blue wide ${D.STATS.some(st=>{const c=C.cost(st);return isFinite(c)&&s.gold>=c})?'':'off'}" id=t10 style="margin-top:8px"><img class="emi e_ui_bolt" src=assets/ui_bolt.png alt="">최대 강화 (골드가 허락하는 만큼)</span>`;
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
function openScreen(k){G.screen=k;$('#screen').className='on';document.body.classList.add('scron');renderNav();renderScreen(true)}
function closeScreen(){G.screen=null;$('#screen').className='';document.body.classList.remove('scron');$('#screen').innerHTML='';renderNav();updateHud()}
function renderScreen(first){const k=G.screen,el=$('#screen'),s=C.S();if(!k)return;C.daily();el.classList.remove('gld','pass');
 if(k=='map'){const Hh=el.clientHeight-58||714,mw=Hh*16/9;
  el.innerHTML=`<img class=sbg src="${A}bg_map.jpg" style="filter:blur(6px) brightness(.4)"><div class=shead><span class=back id=sBack>‹</span><b>모험 지도</b>${D.CH.map((c,i)=>`<span class="chip ${Math.floor(s.si/7)==i?'on':''}" data-ch=${i}>${i+1}장</span>`).join('')}</div>${(()=>{const ci=Math.floor(s.si/7),done=Math.max(0,Math.min(7,s.maxSi-ci*7+(s.done?1:0)));return `<div class=mapch style="--art:url(${A}chap/ch${ci+1}.jpg)"><div><small>CHAPTER ${ci+1}</small><b>${D.CH[ci]}</b></div><div class=mp><i style="width:${done/7*100}%"></i></div><span>${done}/7</span></div>`})()}
   <div class=mapwrap id=mapw><div class=mapin style="width:${mw*5}px"><img src="${A}bg_map.jpg" style="width:${mw}px"><img src="${A}bg_map2.jpg" style="position:absolute;left:${mw}px;top:0;width:${mw}px;height:${Hh}px"><img src="${A}bg_map3.jpg" style="position:absolute;left:${mw*2}px;top:0;width:${mw}px;height:${Hh}px"><img src="${A}bg_map4.jpg" style="position:absolute;left:${mw*3}px;top:0;width:${mw}px;height:${Hh}px"><img src="${A}bg_map5.jpg" style="position:absolute;left:${mw*4}px;top:0;width:${mw}px;height:${Hh}px">
   <svg style="position:absolute;inset:0" width=${mw*5} height=${Hh}><polyline points="${D.MAPNODES.map(([x,y])=>`${x*mw},${y*Hh}`).join(' ')}" fill=none stroke="#fff3c0" stroke-width=3 stroke-dasharray="1 9" stroke-linecap=round /></svg>
   ${D.CH.map((c,i)=>{const [x,y]=D.MAPNODES[i*7];return `<div class=chlabel style="left:${x*mw-40}px;top:${y*Hh+26}px">제${i+1}장 · ${c}</div>`}).join('')}
   ${D.MAPNODES.map(([x,y],i)=>`<div class="node ${i<s.maxSi||s.done&&i==D.FIELDS.length-1?'done':i==s.maxSi?'cur':'lock'} ${i%7==6?'boss':''}" data-n=${i} style="left:${x*mw}px;top:${y*Hh}px">${i%7==6?'<img class="emi e_ic4_crown" src=assets/ic4/crown.png alt="">':C.stageName(i)}${i<s.maxSi?'<small>★★★</small>':''}</div>`).join('')}
   <img src="${A}hero_lina.png" style="position:absolute;height:64px;left:${D.MAPNODES[s.si][0]*mw-22}px;top:${D.MAPNODES[s.si][1]*Hh-86}px;filter:drop-shadow(0 4px 4px #000)">
   </div></div>`;
  const w=$('#mapw');if(first)w.scrollLeft=D.MAPNODES[s.si][0]*mw-195;
  el.querySelectorAll('[data-ch]').forEach(c=>c.onclick=()=>{w.scrollTo({left:D.MAPNODES[+c.dataset.ch*7+3][0]*mw-195,behavior:'smooth'})});
  el.querySelectorAll('.node').forEach(n=>n.onclick=()=>{const i=+n.dataset.n;if(i>s.maxSi)return toast('이전 스테이지의 보스를 처치하세요');C.selectStage(i);toast(C.stageName(i)+' 으로 이동');closeScreen()})}
 if(k=='base'){C.bUpdate();const now=C.now();
  const card=bk=>{const b=s.bld[bk.k],up=b.up?Math.max(0,(b.up-now)/1000):0,c=C.bCost(bk.k);let prod='',bar='',act='';
   if(bk.k!='tower'){const rate=C.bRate(bk.k)*3600,cap=C.bRate(bk.k)*BAL.store;prod=`${bk.k=='vault'?'<img class=ci src=assets/it2_gold.png>':'<img class=ci src=assets/it2_exp.png>'} 시간당 +${fmt(rate)} · 보관 ${fmt(b.acc)}/${fmt(cap)}`;bar=`<div class=bar style="margin-top:4px"><i style="width:${b.acc/cap*100}%"></i></div>`;act=`<span class="btn g ${b.acc<1?'off':''}" data-col=${bk.k}>수확</span>`}
   else prod=`파티 공격력 +${Math.round(BAL.tower.pct*b.lv*100)}% (다음 +${Math.round(BAL.tower.pct*100)}%)`;
   return `<div class=row><img class=ic src="${A}${bk.img}" style="border-color:#c9953f"><div class=f><b>${bk.n} Lv.${b.lv}</b><br><small>${prod}</small>${bar}${up?`<small>업그레이드 중 <span class=timer data-end=${b.up}>${tfmt(up)}</span></small>`:`<small>업그레이드 <img class=ci src=assets/it2_gold.png>${fmt(c)} · <img class="qic q_ui_timer" src=assets/ui_timer.png alt=""> ${tfmt(C.bTime(bk.k))}</small>`}</div><div style="display:flex;flex-direction:column;gap:6px">${act}${up?`<span class=btn data-sp=${bk.k}>가속 <img class=ci src=assets/it2_gem.png>${Math.max(1,Math.ceil(up/60)*2)}</span>`:`<span class="btn ${s.gold<c?'off':''}" data-up=${bk.k}>강화</span>`}</div></div>`};
  el.innerHTML=shell('리나의 영지','bg_base.jpg',`<div style="height:250px;position:relative"><img src="${A}hero_lina.png" style="position:absolute;left:150px;top:120px;height:120px;filter:drop-shadow(0 8px 6px #000a)"><span class=chip style="position:absolute;left:170px;top:30px">마탑 Lv.${s.bld.tower.lv}</span><span class=chip style="position:absolute;left:30px;top:150px">금고 Lv.${s.bld.vault.lv}</span><span class=chip style="position:absolute;right:20px;top:180px">마정 광산 Lv.${s.bld.mine.lv}</span></div>
   <div class=card><div class=ttl>건물 · 생산 <small>보관 한도 ${BAL.store/3600}시간</small></div>${D.BUILD.map(card).join('')}</div><small>건물 생산은 앱을 닫아도 계속됩니다.</small>`,'45% center');
  el.querySelectorAll('[data-col]').forEach(b=>b.onclick=()=>{const v=C.bCollect(b.dataset.col);if(v)toast((b.dataset.col=='vault'?'<img class=ci src=assets/it2_gold.png> +':'<img class=ci src=assets/it2_exp.png> +')+fmt(v));renderScreen()});
  el.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{if(C.bUpgrade(b.dataset.up))toast('업그레이드 시작');renderScreen()});
  el.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>{const g=C.bSpeedup(b.dataset.sp);if(!g)toast('보석이 부족합니다');renderScreen()})}
 if(k=='guild'){const g=s.guild,rmax=C.raidMax(),left=Math.max(0,rmax-s.raid.dmg);if(!s.gj){el.innerHTML=shell('협회 가입','bg_guildhall.jpg',`<div class=card style="text-align:center"><img src="${A}ic3_guild.png" style="width:64px"><div class=ttl style="justify-content:center">가입할 협회를 선택하세요</div><small>가입 후 주간 임무 · 상자 · 채팅 이용 가능</small></div>${C.GUILDS.map((q,i)=>`<div class=card><div class=row><div class=f><b>${q.n}</b><br><small>${q.m} · 회원 ${18+i*7}명</small></div><span class="btn g" data-gj=${i}>가입</span></div></div>`).join('')}`,'30% center');el.querySelectorAll('[data-gj]').forEach(b=>b.onclick=()=>{C.gJoin(+b.dataset.gj);toast(C.S().gj.n+' 가입 완료!');renderScreen()});return}
  el.classList.add('gld');el.innerHTML=shell((s.gj&&s.gj.n)||'협회','bg_guildhall.jpg',`<div class=card style="margin-top:4px"><div class=ttl>협회 Lv.${g.lv} <small>오늘 버프 공격력 +${Object.keys(g.don).length*BAL.donate.buff*100}% · 영구 +${(g.lv-1)*2}%</small></div><div class=bar><i style="width:${g.exp/(100*g.lv)*100}%"></i></div><small>협회 경험치 ${g.exp}/${100*g.lv}</small></div>
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
   <div class=card><div class=ttl>대전 상대 <small>전투력 ${fmt(C.POW())}</small></div>${a.opps.map((o,j)=>{const r=C.POW()/o.pow,p=1/(1+Math.exp(-(r-1)*7));return `<div class=row><div class=apt>${(o.party||[o.img]).map(im=>`<img src="${A}${im}">`).join('')}</div><div class=f><b>${o.n}</b><br><small>전투력 ${fmt(o.pow)} · ${fmt(o.rank)}위 · 예상 승률 ${Math.round(p*100)}%</small></div><span class="btn ${a.tickets<1?'off':''}" data-f=${j} style="background:${p<.4?'linear-gradient(#ff6a5a,#a01a1a)':p<.7?'':'linear-gradient(#5ad07a,#1e7a3a)'}">도전</span></div>`}).join('')}<span class="btn p wide" id=rf style="margin-top:6px"><img class="ci icrf" src=assets/ic_refresh.png> 상대 새로고침 (무료)</span></div>
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
   <div class=sumbtns><span class="pill blue" id=su1>1회 소환<small>${s.tickets?'<img class=ci src=assets/it2_ticket.png> 1':'<img class=ci src=assets/it2_gem.png> '+BAL.summon}</small></span><span class="pill red" id=su10>10회 소환<small>${s.tickets>=10?'<img class=ci src=assets/it2_ticket.png> 10':'<img class=ci src=assets/it2_gem.png> '+fmt(BAL.summon10)}</small></span></div><div class=spity><div class=spb><i style="width:${Math.min(100,(s.pity||0)/C.PITY*100)}%"></i></div><span>전설 확정까지 <b>${C.PITY-(s.pity||0)}</b>회</span></div><small style="display:block;text-align:center">보유 <img class=ci src=assets/it2_ticket.png> ${s.tickets} · <img class=ci src=assets/it2_gem.png> ${fmt(s.gems)}</small>`);
   $('#su1').onclick=()=>summon(1);$('#su10').onclick=()=>summon(10);/* r398: the duplicate ⓘ 확률 정보 text link under the pity bar is gone - the 확률 정보 tab (r340/r364) is the one kept */el.querySelectorAll('[data-mile]').forEach(c=>c.onclick=()=>{C.mileSummon(c.dataset.mile);toast('선택 소환 완료');renderScreen()})}
 if(k=='relic'){const tot=D.RELICS.reduce((a,r)=>a+((s.relic||{})[r.k]||0),0);el.innerHTML=shell('기보 · 클레어 바이블','bg_guild.jpg',`<div class=relhero><img src="${A}it3_relicbook.png"><div><b>클레어 바이블 사본</b><small>조각을 모아 고대 마도서를 복원하세요<br>총 공격력 +${Math.round(C.relicB('atk')*100)}% · 체력 +${Math.round(C.relicB('hp')*100)}%</small></div></div>
   <div class=card><div class=ttl>사본 목록 <small><img class="ci rlf" src=assets/rl_fragment.png> 조각 ${s.frag||0} · <img class=ci src=assets/it2_gold.png> ${fmt(s.gold)}</small></div><div class=relgrid>${D.RELICS.map((r,i)=>{const lv=(s.relic||{})[r.k]||0,c=C.relicCost(r.k),ok=(s.frag||0)>=c.f&&s.gold>=c.g;return `<div class="rel ${lv?'on':''}"><div class=rimg style="filter:hue-rotate(${i*40}deg) ${lv?'':'grayscale(1) brightness(.5)'}"><img src="${A}ic3_quest.png"></div><b>${r.n}</b><small>${r.d} +${Math.round(lv*r.per*100)}% · Lv.${lv}</small><span class="pill green ${ok?'':'off'}" data-rel=${r.k}>${lv?'강화':'복원'}<small><img class="ci rlf" src=assets/rl_fragment.png>${c.f} · <img class=ci src=assets/it2_gold.png>${fmt(c.g)}</small></span></div>`}).join('')}</div></div><small>조각 획득: 도전 → 고대 유적 발굴</small>`);
   el.querySelectorAll('[data-rel]').forEach(b=>b.onclick=()=>{if(C.relicUp(b.dataset.rel)){toast('기보 강화!');renderScreen()}else toast('조각 또는 골드가 부족합니다')})}
 if(k=='dungeon'){dunScreen(el,s)}
 if(k=='wboss'){const w=C.wbState(),L=C.wbRank(),ref=C.wbRef(),left=C.WB.tries-w.tries,my=L.findIndex(x=>x.me)+1;el.innerHTML=shell('월드 보스','bg_dungeon.jpg',`<div class="card wbh"><img src="${A}${C.WB.img}"><div class=wbn><b>${C.WB.n}</b><small>${C.WB.time}초 동안 최대한 많은 피해를 입히세요 · 등급별 보상</small></div></div>
  <div class=card><div class=ttl>오늘의 기록 <small>최고 ${fmt(w.today||0)} · 순위 ${w.today?my+'위':'-'}</small></div><div class=wbt>${C.WB.tiers.map((t,i)=>{const r=C.wbRew(i),hit=(w.today||0)>=ref*t[1];return `<div class="${hit?'hit':''}"><b>${t[0]}</b><small>${fmt(ref*t[1])}</small><small><img class=ci src=assets/it2_gem.png>${r.gems}${r.tickets?` <img class=ci src=assets/it2_ticket.png>${r.tickets}`:''}</small></div>`}).join('')}</div></div>
  <div class=card><div class=ttl>오늘의 랭킹 <small>매일 05:00 초기화</small></div>${L.map((x,i)=>`<div class="wbr ${x.me?'me':''}"><b class="rk r${Math.min(i+1,4)}">${i+1}</b><i>${x.n}</i><span>${fmt(x.d)}</span></div>`).join('')}</div>
  <span class="pill red wide ${left?'':'off'}" id=wbGo>도전하기 (${left}/${C.WB.tries})</span>`);
  $('#wbGo').onclick=()=>{if(!left)return toast('오늘 도전 횟수를 모두 사용했습니다');if(C.B.boss)return toast('보스전 중에는 도전할 수 없습니다');$('#screen').classList.remove('on');document.body.classList.remove('scron');G.screen=null;C.wbStart()}}
 if(k=='title'){const own=C.titlesOwned().map(t=>t.k),cur=s.title;el.innerHTML=shell('칭호','bg_lobby.jpg',`<div class=card style="text-align:center"><small>업적 단계로 칭호 해금 · 장착한 칭호 1개의 효과 적용 · 이름 아래 표시</small></div>${D.TITLES.map(t=>{const o=own.includes(t.k);return `<div class="ttlr ${o?'':'lock'} ${cur==t.k?'on':''}"><span class="tbadge r${t.r}">${t.n}</span><div class=f><small>${t.d}</small><small class=tb>공격력 +${t.atk}%${t.gold?` · 골드 +${t.gold}%`:''}</small></div>${o?(cur==t.k?'<small class=teq>장착 중</small>':`<span class="pill green" data-ttl="${t.k}">장착</span>`):'<small><img class="emi e_sk_lock" src=assets/sk_lock.png alt="">미해금</small>'}</div>`}).join('')}`);
  el.querySelectorAll('[data-ttl]').forEach(b=>b.onclick=()=>{s.title=b.dataset.ttl;G.titleHud(1);toast('칭호 장착: '+C.titleCur().n);renderScreen()})}
 if(k=='ach'){const L=C.achList();const ready=L.filter(a=>a.can).length;el.innerHTML=shell('업적','bg_lobby.jpg',`<div class=card style="text-align:center"><div class=ttl style="justify-content:center"><img class=ci src="${A}ic3_trophy.png" style="height:20px"> 업적 점수 ${C.achScore()}</div><small>달성 단계마다 보상 · 단계가 오를수록 목표와 보상 증가</small><div class=ttlrow><span class="tbadge r${(C.titleCur()||{}).r||0}">${(C.titleCur()||{n:'칭호 없음'}).n}</span><span class="pill blue" id=ttlBtn>칭호 ${C.titlesOwned().length}/${D.TITLES.length}</span></div></div>${ready?`<span class="pill green wide" id=achAll style="margin:4px 0 6px">모두 받기 (${ready}종 · ${G.achSteps?G.achSteps():ready}단계)</span>`:''}${L.map(a=>`<div class="achr ${a.can?'can':''} ${a.done?'done':''}"><img src="${A}${a.ic}"><div class=f><b>${a.n} <em>${'★'.repeat(Math.min(a.lv,5))}${a.lv>5?'+'+(a.lv-5):''}</em></b><small>${a.d.replace('#',fmt(a.goal))}</small><div class=bar><i style="width:${Math.min(1,a.v/a.goal)*100}%"></i></div><small>${fmt(Math.min(a.v,a.goal))}/${fmt(a.goal)}</small></div>${a.done?'<small>완료</small>':`<span class="pill ${a.can?'green':'off'}" data-ach="${a.k}"><img class=ci src=assets/it2_gem.png>${a.gem}</span>`}</div>`).join('')}`);
  el.querySelectorAll('[data-ach]').forEach(b=>b.onclick=()=>{const sn=resSnap();if(C.achClaim(b.dataset.ach)){renderScreen();diffPop(sn,'업적 달성')}});$('#ttlBtn').onclick=()=>openScreen('title');const aa=$('#achAll');if(aa)aa.onclick=()=>{const sn=resSnap();let n=0;for(let i=0;i<50;i++){let any=0;C.achList().forEach(a=>{if(a.can&&C.achClaim(a.k)){n++;any=1}});if(!any)break}renderScreen();diffPop(sn,'업적 '+n+'단계 달성')}}
 if(k=='mail'){s.mailc=s.mailc||{};el.innerHTML=shell('우편함','bg_lobby.jpg',`<div class=card>${D.MAILS.filter(m=>C.mailLeft(m.k)>0).map(m=>`<div class=row><img src="${A}ic3_mail.png" style="width:44px"><div class=f><b>${m.n}</b><br><small>${m.g?'<img class=ci src=assets/it2_gem.png>'+m.g+' ':''}${m.o?'<img class=ci src=assets/it2_exp.png>'+m.o+' ':''}${m.t?'<img class=ci src=assets/it2_ticket.png>'+m.t:''} · 보관 기한 7일</small></div>${s.mailc[m.k]?'<small>수령 완료</small>':`<span class="pill green" data-m="${m.k}">받기</span>`}</div>`).join('')}</div><span class="pill blue wide" id=mailAll>모두 받기</span>`);
   const claim=k=>{const r=C.mailClaim(k);if(!r.n)return toast('받을 우편이 없습니다');renderScreen();rewardPop([r.g&&['it2_gem.png',r.g,'보석'],r.o&&['it2_exp.png',r.o,'마정구'],r.t&&['it2_ticket.png',r.t,'소환권']].filter(Boolean),r.n>1?'우편 '+r.n+'개 수령':'')};$('#mailAll').onclick=()=>claim();el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>claim(b.dataset.m))}
 if(k=='event'){s.att=s.att||{n:0,last:'',cyc:0};const today=C.today(),MAX=28,can=s.att.last!==today&&s.att.n<MAX;
   const base=[['gold',40,'it2_gold','골드'],['orbs',5,'it2_exp','마정구'],['gems',50,'it2_gem','다이아'],['gold',80,'it2_gold','골드'],['stone',3,'it2_stone','강화석'],['gems',80,'it2_gem','다이아'],['tickets',1,'it2_ticket','소환권']];
   const RW=Array.from({length:MAX},(_,i)=>{const b=base[i%7];const mul=1+Math.floor(i/7)*.5;if((i+1)%7===0)return ['gems',100+i*10,'it2_gem','다이아'];if((i+1)%14===0)return ['tickets',2,'it2_ticket','소환권'];if(i===27)return ['tickets',5,'it2_ticket','소환권'];return[b[0],Math.round(b[1]*mul),b[2],b[3]]});
   const amt=r=>r[0]=='gold'?C.goldKill(s.maxSi)*r[1]:r[1];
   el.innerHTML=shell('출석 이벤트','bg_lobby.jpg',`<div class=card style="text-align:center"><img src="${A}ic3_calendar.png" style="width:64px"><div class=ttl style="justify-content:center">28일 출석 보상</div><small>매일 접속 · ${s.att.n}/${MAX}일 · 사이클 ${(s.att.cyc||0)+1}</small></div>
   <div class=attg att28>${RW.map((r,i)=>`<div class="att ${i<(s.att.n||0)?'done':''} ${i==s.att.n&&can?'now':''}"><small>${i+1}</small><img src="${A}${r[2]}.png"><b>${fmt(amt(r))}</b>${i<(s.att.n||0)?'<i><img class="emi e_pass_check" src=assets/pass_check.png alt=""></i>':''}</div>`).join('')}</div>
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
      <span class="pill green wide ${n>=15||s.gold<c.g||(s.stone||0)<c.st?'off':''}" id=enGo>${n>=15?'최대 강화':'강화하기'}</span><span class="pill wide" id=enAll style="margin-top:6px"><img class="emi e_ui_bolt" src=assets/ui_bolt.png alt="">일괄 강화 (최저 단계부터)</span></div>`}}
   else if(G.enTab=='skill'){const L=C.load6().map(x=>x.k);body=`<div class=card><div class=ttl>스킬 편성 <small>최대 6개 · 전투 하단 바에 표시</small></div><div class=skpick>${D.SPELLS.map(sp=>{const lk=sp.unlock&&s.maxSi<sp.unlock,on=L.includes(sp.k);return `<div class="skp ${on?'on':''} ${lk?'lock':''}" data-sl=${sp.k}><img src="${A}${sp.img}"><b>${sp.n}</b><small>${lk?C.stageName(sp.unlock)+' 해금':'쿨 '+sp.cd+'초'}</small></div>`}).join('')}</div></div>`}
   else{body=`<div class=card>${D.COMPS.filter(c=>s.comps[c.k]).map(c=>{const lv=(s.clv||{})[c.k]||1,sk=(s.csk||{})[c.k]||1,lc=C.compUpCost(c.k),kc=C.skCost(c.k);return `<div class=row><img src="${A}${c.img}" style="width:46px;height:52px;object-fit:contain"><div class=f><b>${c.n}</b> <small style="color:#ffd66a">${'★'.repeat(c.g)}</small><br><small>Lv.${lv} · <img class=ci src="${A}${(D.CSKI[c.k]||['sk/ult.png'])[0]}" style="width:16px;height:16px"> ${(D.CSKI[c.k]||['','스킬'])[1]} Lv.${sk}</small><br><small style="color:#9fe">공격 배율 ×${C.compMul(c.k).toFixed(2)}</small></div><div style="display:flex;flex-direction:column;gap:4px"><span class="pill blue ${s.gold<lc?'off':''}" data-lu=${c.k}>레벨업 ${gi}${fmt(lc)}</span><span class="pill green ${sk>=10||s.gold<kc.g||(s.stone||0)<kc.st?'off':''}" data-sk=${c.k}>${sk>=10?'스킬 MAX':'스킬 강화 '+si+kc.st}</span></div></div>`}).join('')}</div>`}
   el.innerHTML=shell('강화 · 육성','bg_lobby.jpg',tabs+body);
   el.querySelectorAll('[data-et]').forEach(b=>b.onclick=()=>{G.enTab=b.dataset.et;renderScreen()});el.querySelectorAll('[data-sl]').forEach(b=>b.onclick=()=>{if(C.setLoad(b.dataset.sl))renderScreen();else toast('최대 6개 · 최소 1개')});el.querySelectorAll('[data-es]').forEach(b=>b.onclick=()=>{G.enSel=b.dataset.es;renderScreen()});
   const ea=$('#enAll');if(ea)ea.onclick=()=>{let ok=0,fail=0,why='';for(let i=0;i<40;i++){const sl=Object.keys(s.gear).filter(k=>s.gear[k]&&(s.gear[k].en||0)<15).sort((a,b)=>(s.gear[a].en||0)-(s.gear[b].en||0))[0];if(!sl){why='max';break}const r=C.enhance(sl);if(r=='ok')ok++;else if(r=='fail')fail++;else{why=r;break}}
      if(!ok&&!fail){toast(why=='max'?'모든 장비가 최대 강화입니다':why=='stone'?'강화석이 부족합니다':'골드가 부족합니다');return}
      modal(`<div class=ttl style="justify-content:center;font-size:18px">일괄 강화 결과</div><div style="text-align:center;font-size:15px;margin:10px 0"><b class=up>성공 ${ok}</b> · <span style="opacity:.75">실패 ${fail}</span></div><small style="display:block;text-align:center">${why=='stone'?'강화석 소진':why=='gold'?'골드 소진':why=='max'?'모두 최대 강화':'40회 시도 완료'} · 전투력 ${fmt(C.POW())}</small>`);updateHud();renderScreen()};const eg=$('#enGo');if(eg)eg.onclick=()=>{const r=C.enhance(G.enSel);const M={ok:'강화 성공!',fail:'강화 실패… 재료가 소모되었습니다',gold:'골드가 부족합니다',stone:'강화석이 부족합니다',max:'최대 강화입니다'};toast(M[r]);if(r=='ok'||r=='fail'){const a=el.querySelector('.anvil');a&&a.classList.add(r=='ok'?'flashok':'flashno')}setTimeout(renderScreen,r=='ok'||r=='fail'?380:0)};
   el.querySelectorAll('[data-lu]').forEach(b=>b.onclick=()=>{toast(C.compUp(b.dataset.lu)?'레벨업!':'골드가 부족합니다');renderScreen()});
   el.querySelectorAll('[data-sk]').forEach(b=>b.onclick=()=>{const r=C.skUp(b.dataset.sk);toast({ok:'스킬 강화 성공!',gold:'골드가 부족합니다',stone:'강화석이 부족합니다',max:'최대 레벨'}[r]||'');renderScreen()})}
 if(k=='pass'){const b=C.bp(),T=C.bpTier(),ri=r=>Object.entries(r).map(([k,v])=>`<img class=ci src=assets/${({gems:'it2_gem',orbs:'it2_exp',stone:'it2_stone',tickets:'it2_ticket',goldH:'it2_gold'})[k]}.png>${k=='goldH'?fmt(Math.floor(C.goldKill(C.S().maxSi)*600*v))/* r391: show the exact gold C.bpClaim adds (goldKill(maxSi)*600*goldH) instead of a bare '골드' */:v}`).join('');
   el.classList.add('pass');el.innerHTML=shell('마도 패스 시즌 '+(b.se%100+1),'bg_lobby.jpg',`<div class=card><div class=ttl>패스 Lv.${T}/${D.BP.tiers} <small>처치·보스·임무로 경험치 획득</small></div><div class=bar><i style="width:${(b.xp%D.BP.xp)/D.BP.xp*100}%"></i></div><small>${b.xp%D.BP.xp}/${D.BP.xp} XP · 4주 시즌</small>${b.prem?'<div class=pill style="margin-top:6px"><img class=ci src=assets/ic4/crown.png> 프리미엄 활성</div>':`<span class="btn g wide" id=bpb style="margin-top:6px">프리미엄 패스 ${D.BP.price} <small>(프로토타입 · 실제 결제 없음)</small></span>`}</div>${(()=>{const b=C.bp(),T=C.bpTier();let n=0;for(let t=0;t<T;t++){if(!b.fc[t])n++;if(b.prem&&!b.pc[t])n++}return n?`<span class="pill green wide" id=bpAll style="margin:6px 0">모두 받기 (${n})</span>`:''})()}
   <div class=card><div class=bpg><b>단계</b><b>무료</b><b>프리미엄</b>${Array.from({length:D.BP.tiers},(_,t)=>{const ok=t<T;const cell=(p)=>{const got=(p?b.pc:b.fc)[t],can=ok&&!got&&(!p||b.prem);return `<span class="bpc ${got?'got':can?'can':''} ${p&&!b.prem?'lockp':''}" data-bp="${t}" data-pp="${p?1:0}">${t==19&&p?'<img class=ci src=assets/skin/lina_gold.png>황금 코스튬':ri(C.bpRew(t,p))}${got?' <img class="emi e_pass_check" src=assets/pass_check.png alt="">':''}</span>`};return `<em class="${ok?'ok':''}">${t+1}</em>${cell(0)}${cell(1)}`}).join('')}</div></div>`);
   const bb=$('#bpb');if(bb)bb.onclick=()=>{C.bpBuy();toast('프리미엄 패스 활성 (데모)');renderScreen()};
   {const ba=$('#bpAll');if(ba)ba.onclick=()=>{const sn=resSnap(),b=C.bp(),T=C.bpTier(),O=C._bpRaw||C.bpClaim;let n=0;for(let t=0;t<T;t++){if(O(t,false))n++;if(b.prem&&O(t,true))n++}renderScreen();diffPop(sn,'패스 보상 '+n+'개 수령')}}el.querySelectorAll('.bpc.can').forEach(x=>x.onclick=()=>{const r=C.bpClaim(+x.dataset.bp,x.dataset.pp=='1');if(r){renderScreen()}});return}
 if(k=='skin'){s.skins=s.skins||{base:1};const cur=s.skin||'base';
   el.innerHTML=shell('코스튬','bg_lobby.jpg',`<div class=card style="text-align:center"><img src="${A}${(D.SKINS.find(x=>x.k==cur)||D.SKINS[0]).img}" style="height:150px;filter:drop-shadow(0 6px 6px #000a)"><div class=ttl style="justify-content:center">${(D.SKINS.find(x=>x.k==cur)||D.SKINS[0]).n}</div><small>색상 변형 코스튬 (스텁) · 전투에 즉시 반영</small></div>
   <div class=card><div class=ttl>동료 축제 코스튬<small class=skcnt>보유 ${D.CSKINS.filter(c=>(s.cown||{})[c.k]).length}/${D.CSKINS.length}</small></div><div class=skg>${D.CSKINS.map(c=>{const own=(s.cown||{})[c.k],on=(s.cskin||{})[c.k];const nm=(D.COMPS.find(q=>q.k==c.k)||{}).n||c.k;return `<div class="skn ${on?'on':''}" data-cs=${c.k}><img src="${A}${c.img}"><b>${nm}</b><small>${c.n}<br>${on?'착용 중':own?'보유 · 탭하여 착용':'<img class=ci src=assets/it2_gem.png> '+c.cost}</small></div>`}).join('')}</div></div><div class=card><div class=skg>${D.SKINS.map(k2=>{const own=s.skins[k2.k]||k2.k=='base';return `<div class="skn ${cur==k2.k?'on':''}" data-sk=${k2.k}><img src="${A}${k2.img}"><b>${k2.n}</b><small>${cur==k2.k?'착용 중':own?'보유':k2.bp?'패스 20단계':'<img class=ci src=assets/it2_gem.png> '+k2.cost}</small></div>`}).join('')}</div></div>`);
   el.querySelectorAll('[data-cs]').forEach(x=>x.onclick=()=>{const k2=x.dataset.cs,c=D.CSKINS.find(q=>q.k==k2);s.cown=s.cown||{};s.cskin=s.cskin||{};if(!s.cown[k2]){if(s.gems<c.cost){toast('다이아가 부족합니다');return}s.gems-=c.cost;s.cown[k2]=1;s.cskin[k2]=1;toast('축제 코스튬 구매 · 장착')}else{s.cskin[k2]=s.cskin[k2]?0:1;toast(s.cskin[k2]?'코스튬 착용':'기본 복장')}RENDER.applyCskin(s.cskin);save();renderScreen()});el.querySelectorAll('[data-sk]').forEach(x=>x.onclick=()=>{const k2=x.dataset.sk,sk=D.SKINS.find(q=>q.k==k2)||{};s.skins=s.skins||{base:1};if(s.skins[k2]||k2=='base'){C.skinSet(k2);RENDER.skinImg=k2=='base'?null:sk.img;RENDER.skinAtk=sk.atk||null;RENDER.skinCast=sk.cast||null;toast('코스튬 변경');return renderScreen()}const r=C.skinBuy(k2);if(r=='ok'){C.skinSet(k2);RENDER.skinImg=sk.img;RENDER.skinAtk=sk.atk||null;RENDER.skinCast=sk.cast||null;toast('코스튬 구매 · 장착')}else toast(r=='bp'?'패스 20단계 프리미엄 보상':r=='gems'?'다이아가 부족합니다':'');renderScreen()});return}
 if(k=='rank'){const me=Math.round(C.power?C.power():s.lv*500);const N=['붉은마도사','용파참','검은고양이','세일룬공주','라그나블레이드','제피리아','드래곤슬레이어','젤가','마족사냥꾼'];const dS=C.today?C.today():new Date().toDateString(),drf=n=>{let h=2166136261;for(const c of n+'|'+dS)h=Math.imul(h^c.charCodeAt(0),16777619);const u=(h>>>0)/4294967296,mg=.03+(u*997%1)*.05;return 1+(u<.5?-mg:mg)};const L=N.map((n,i)=>({n,p:Math.round(me*(2.4-i*.22)*drf(n)),lv:s.lv+12-i}));L.push({n:(G.nick?G.nick():'나')+' (나)',p:me,lv:s.lv,me:1});L.sort((a,b)=>b.p-a.p);
   el.innerHTML=shell('랭킹','bg_lobby.jpg',`<div class=card style="text-align:center"><img src="${A}ic3_podium.png" style="width:90px"><div class=ttl style="justify-content:center">전투력 랭킹 · 시즌 1</div><small>매주 월요일 보상 지급 (프로토타입: 로컬 더미 데이터)</small></div><div class=card>${L.map((x,i)=>`<div class=row style="${x.me?'background:#ffd66a22;border-radius:8px':''}"><b style="width:28px;text-align:center;color:${i<3?'#ffd66a':'#fff'}">${i+1}</b><div class=f><b>${x.n}</b><br><small>Lv.${x.lv}</small></div><b>${fmt(x.p)}</b></div>`).join('')}</div>`)}
 if(k=='settings'){G.set=G.loadSet();const t=(k2,n)=>`<div class=row><div class=f><b>${n}</b></div><span class="tog ${G.set[k2]?'on':''}" data-set=${k2}><i></i></span></div>`;
   el.innerHTML=shell('설정','bg_lobby.jpg',`<div class=card><div class=ttl>게임</div>${t('bgm','배경음')}${t('sfx','효과음')}${t('fx','스킬 연출')}${t('cut','궁극기 컷인')}${t('shake','화면 흔들림')}${t('dmg','데미지 숫자')}<div class=row><div class=f><b>전투 배속</b></div><span class="pill blue" id=spd2>×${G.speed}</span></div></div>
   <div class=card><div class=ttl>계정</div><div class=row><div class=f><b>계정 정보</b><br><small>게스트 · 로컬 저장</small></div></div><div class=row><div class=f><b>쿠폰 입력</b></div><span class="pill blue" id=cpn>입력</span></div><div class=row><div class=f><b>데이터 초기화</b><br><small>모든 진행이 삭제됩니다</small></div><span class="pill red" id=rst>초기화</span></div></div><small style="display:block;text-align:center">슬레이어즈 붉은 마도사전 · 프로토타입 v5</small>`);
   el.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{G.set[b.dataset.set]^=1;G.applySet();renderScreen()});$('#spd2').onclick=()=>{G.speed=G.speed==1?2:1;renderHub();renderScreen()};$('#cpn').onclick=()=>toast('유효하지 않은 쿠폰입니다');$('#rst').onclick=()=>{if(confirm('초기화할까요?'))G.reset()}}
 if(k=='explore'){const st=C.expState(),now=C.now();const avail=Object.keys(s.comps).filter(k2=>!C.expBusy(k2));G.expPick=G.expPick&&avail.includes(G.expPick)?G.expPick:avail[0];
   el.innerHTML=shell('탐험','bg_map.jpg',`<div class=card><div class=ttl>파견 동료 선택 <small>파견 중에도 전투에는 참여합니다</small></div><div class=chips>${avail.length?avail.map(k2=>{const c=D.COMPS.find(x=>x.k==k2);return `<span class="chip ${G.expPick==k2?'on':''}" data-pk=${k2}>${c.n} ★${s.comps[k2]}</span>`}).join(''):'<small>파견 가능한 동료가 없습니다</small>'}</div></div>
   ${D.EXPS.map(E=>{const x=st[E.k],r=C.expReward(E.k);const left=x?Math.max(0,x.end-now):0,done=x&&left<=0,pct=x?100-left/(E.min*600):0;const c=x&&D.COMPS.find(q=>q.k==x.c);
    return `<div class=expc><img class=eimg src="${A}ic3_map.png"><div class=f><b>${E.n}</b><small> · ${E.min>=60?E.min/60+'시간':E.min+'분'}</small><br><small>보상 <img class=ci src=assets/it2_gold.png>${fmt(r.g)} <img class=ci src=assets/it2_gem.png>${r.gem} <img class="ci rlf" src=assets/rl_fragment.png>${r.f}</small>${x?`<div class=bar style="margin-top:4px"><i style="width:${pct}%"></i></div><small>${c?c.n+' 파견 중 · ':''}${done?'완료!':Math.ceil(left/60000)+'분 남음'}</small>`:''}</div>${x?(done?`<span class="pill green" data-cl=${E.k}>받기</span>`:'<span class="pill blue off">진행 중</span>'):`<span class="pill green ${G.expPick?'':'off'}" data-go=${E.k}>출발</span>`}</div>`}).join('')}<small>동료를 파견하면 시간이 지난 뒤 보상을 받습니다. 성급(★)이 높을수록 골드 보상 증가.</small>`);
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
/* v193 저장: 디바운스+유휴 직렬화, 임시키→본키 교체, 마지막 정상본 보관, 숨김/종료 시 즉시 저장 */const SV={h:0,ih:0,n:0,ms:[],bytes:0,bk:0,err:''};function saveNow(why){if(SV.h){clearTimeout(SV.h);SV.h=0}if(SV.ih&&window.cancelIdleCallback){cancelIdleCallback(SV.ih)}SV.ih=0;if(G.noSave)return;const t=performance.now();const st=C.S();st.last=C.now();const j=JSON.stringify(st);try{const ls=localStorage;ls.setItem(KEY+'_tmp',j);if(Date.now()-SV.bk>60000){const pv=ls.getItem(KEY);if(pv)ls.setItem(KEY+'_bak',pv);SV.bk=Date.now()}ls.setItem(KEY,j);ls.removeItem(KEY+'_tmp')}catch(e){SV.err=String(e&&e.message||e)}const d=performance.now()-t;SV.n++;SV.bytes=j.length;SV.ms.push([why||'',+d.toFixed(2)]);if(SV.ms.length>200)SV.ms.shift()}function save(){if(G.noSave||SV.h||SV.ih)return;SV.h=setTimeout(()=>{SV.h=0;if(window.requestIdleCallback)SV.ih=requestIdleCallback(()=>{SV.ih=0;saveNow('idle')},{timeout:1000});else saveNow('timer')},600)}G._SV=SV;G.saveNow=saveNow;
G.loadSet=()=>{if(!G.set){try{G.set=Object.assign({bgm:1,sfx:1,fx:1,cut:1,shake:1,dmg:1},JSON.parse(localStorage.getItem('slayers_set')||'{}'))}catch(e){G.set={bgm:1,sfx:1,fx:1,cut:1,shake:1,dmg:1}}}return G.set};G.applySet=()=>{const s=G.loadSet();localStorage.setItem('slayers_set',JSON.stringify(s));R.opt={cut:!!s.cut,shake:!!s.shake,dmg:!!s.dmg,fx:!!s.fx}};G.applySet();{const sb=C.startBoss;C.startBoss=(...a)=>{const s=C.S();if(!C.B.boss)G._bs={g:s.gold,lv:s.lv,ex:s.exp,st:s.stone||0,t:Date.now(),nm:C.stageName(s.si)};const was=C.B.boss,r=sb(...a);if(!was&&C.B.boss)bossWarn(s.si);return r}}
function bossWarn(i){try{if(G.screen)return;if(G.S&&R.opt&&!R.opt.cut)return;const pl=D.BOSSPLAN[Math.floor(i/7)],b=pl&&D.BOSSES[pl[i%7==6?1:0]];if(!b)return;document.querySelectorAll('.bwarn').forEach(x=>x.remove());const d=document.createElement('div');d.className='bwarn';d.innerHTML=`<div class=bwe></div><div class=bws><i>WARNING</i><i>WARNING</i><i>WARNING</i></div><div class=bwm><img src="assets/${b.img}"><div><small>${i%7==6?'챕터 보스':'보스'} 출현</small><b>${b.n}</b>${b.q?`<em>「${b.q}」</em>`:''}</div></div><div class=bws b2><i>WARNING</i><i>WARNING</i><i>WARNING</i></div>`;document.body.appendChild(d);R.hs=Math.max(R.hs||0,.25);R.ccut=null;R.ccCd=Math.max(R.ccCd||0,2.5);setTimeout(()=>d.classList.add('out'),1500);setTimeout(()=>d.remove(),1900)}catch(e){}}
function resultPop(win){const s=C.S(),b=G._bs||{g:s.gold,st:s.stone||0,nm:''};const dg=Math.max(0,s.gold-b.g),ds=Math.max(0,(s.stone||0)-b.st),sec=b.t?(((b.kt||Date.now())-b.t)/1000):0;document.querySelectorAll('.vic,#battle .banner').forEach(x=>x.remove());if(!win)document.querySelectorAll('.toast').forEach(x=>{if(x.textContent.includes('보스 실패'))x.remove()});const d=document.createElement('div');d.className='vic '+(win?'win':'lose');
 d.innerHTML=win?`<div class=vt>VICTORY</div><div class=vs>${b.nm} 클리어 · ${sec.toFixed(1)}초</div><div class=vr><span><img class=ci src=assets/it2_gold.png> +${fmt(dg)}</span>${ds?`<span><img class=ci src=assets/it2_stone.png> +${ds}</span>`:''}${s.lv>b.lv?`<span class=up>Lv.${s.lv} ▲</span>`:''}</div><div class=vn>다음 스테이지 ▶ ${C.stageName(s.si)}</div>`:`<div class=vt>DEFEAT</div><div class=vs>${b.nm} 보스 실패</div><div class=vn>장비 강화 · 동료 육성 후 자동 재도전</div>`;
 document.body.appendChild(d);d.onclick=()=>d.remove();setTimeout(()=>d.classList.add('out'),2300);setTimeout(()=>d.remove(),2700)}
function chapterCard(c,si){const TAG=['평화로운 가도에 몬스터가 들끓는다','마족의 기운이 숲을 뒤덮었다','붉은 마왕이 기다리는 마지막 성','용암이 끓는 땅, 염제가 깨어났다','영원한 겨울, 얼음 여제의 성채','구름 위의 신전, 마지막 시련','바다 밑에 잠든 신전, 해신이 눈을 뜬다'];let _cw=0;const show=()=>{if((document.querySelector('.vic:not(.out),.bsht')||performance.now()-(G._koT||-1e9)<2500)&&_cw++<60){setTimeout(show,250);return}_cw=0;document.querySelectorAll('.chap').forEach(x=>x.remove());const d=document.createElement('div');d.className='chap';d.style.setProperty('--art',`url(assets/chap/ch${c+1}.jpg)`);d.innerHTML=`<div class=cl></div><div class=cn>CHAPTER ${c+1}</div><div class=ct>${D.CH[c]||''}</div><div class=cs>${TAG[c]||''}</div><div class=cst>${C.stageName(si)}</div><div class=cl></div>`;document.body.appendChild(d);document.body.classList.add('chapon');const rm=()=>{d.remove();if(!document.querySelector('.chap'))document.body.classList.remove('chapon')};d.onclick=rm;setTimeout(()=>d.classList.add('out'),2600);setTimeout(rm,3100)};if(document.querySelector('.vic:not(.out)'))setTimeout(show,2500);else show()}
function idleBurst(g){const bt=$('#idleBtn'),cv=R._bc()||document.querySelector('canvas');if(!bt||!cv||!R.coinBurst)return;const a=bt.getBoundingClientRect(),c=cv.getBoundingClientRect(),x=a.left-c.left+a.width/2,y=a.top-c.top+18;R.coinBurst(x,y,24,'gold');if(g.o)R.coinBurst(x,y,Math.min(8,g.o),'orb');bt.classList.add('pop');setTimeout(()=>bt.classList.remove('pop'),500)}
G.idleBurst=idleBurst;G.chapterCard=chapterCard;G.resultPop=resultPop;G.save=save;G.reset=()=>{G.noSave=1;localStorage.removeItem(KEY);localStorage.removeItem(KEY+'_tmp');localStorage.removeItem(KEY+'_bak');location.reload()};G.open=openScreen;G.close=closeScreen;G.setTab=t=>{if(G.screen)closeScreen();G.tab='battle';openSheet(t)};G.render=renderPanel;
setInterval(save,5000);document.addEventListener('visibilitychange',()=>{if(document.hidden)saveNow('hide')});window.addEventListener('pagehide',()=>saveNow('pagehide'));
function scale(){const s=Math.min(innerWidth/390,innerHeight/844);$('#app').style.transform=`translateX(-50%) scale(${s})`}window.addEventListener('resize',scale);scale();
R.init($('#cv'));{let ci=0;const tick=()=>{$('#chatT').textContent=D.CHAT[ci++%D.CHAT.length]};tick();setInterval(tick,4000);$('#chat').onclick=()=>toast('채팅은 프로토타입에서 지원하지 않습니다')}renderSkills();renderHub();renderNav();updateHud();
const off=C.offline();if(off)setTimeout(()=>offPop(off),300);
function offPop(off){const h=Math.floor(off.sec/3600),mi=Math.floor(off.sec%3600/60),cap=BAL.offCap/3600;const m=document.createElement('div');m.className='modal';m.id='offModal';
m.innerHTML=`<div class="card offc"><div class=ttl style="justify-content:center;font-size:18px">어서 오세요!</div><img src="${A}hero_lina.png" class=offh><small>리나가 <b>${h}시간 ${mi}분</b> 동안 싸웠습니다</small><div class=idlebar><i style="width:${Math.min(100,off.sec/BAL.offCap*100)}%"></i><span>${h}시간 ${mi}분 / ${cap}시간${off.sec>=BAL.offCap?' · 최대 도달':''}</span></div><div class=offg><div><img src="assets/it2_gold.png"><b>${fmt(off.g)}</b><small>골드</small></div><div><img src="assets/it2_xp.png"><b>${fmt(off.x)}</b><small>경험치</small></div><div><img src="assets/it2_exp.png"><b>${fmt(off.o)}</b><small>마력구</small></div>${off.st?`<div><img src="assets/it2_stone.png"><b>${fmt(off.st)}</b><small>강화석</small></div>`:''}</div><div class=offb><span class="btn" id=offOk>받기</span><span class="btn x2" id=offX2>2배 받기<small><img class=ci src=assets/it2_gem.png> ${C.OFF2}</small></span></div></div>`;
$('#app').appendChild(m);const go=k=>{const s=C.S();if(k==2&&(s.gems||0)<C.OFF2){toast('보석이 부족합니다');return}if(!C.offApply(off,k))return;m.remove();const it=[['it2_gold.png',off.g*k,'골드'],['it2_xp.png',off.x*k,'경험치'],['it2_exp.png',off.o*k,'마력구']];if(off.st)it.push(['it2_stone.png',off.st*k,'강화석']);if(typeof rewardPop=='function')rewardPop(it,(k==2?'2배 보너스!':'방치 보상'));updateHud();renderPanel&&renderPanel()};
m.querySelector('#offOk').onclick=()=>go(1);m.querySelector('#offX2').onclick=()=>go(2)}G.offPop=offPop;
let lastSig='';setInterval(()=>{const s=C.S();if(JSON.stringify(C.spells().map(x=>x.k))!==lockedSig)renderSkills();
  if(G.screen){document.querySelectorAll('#screen .timer[data-end]').forEach(t=>{const r=(+t.dataset.end-C.now())/1000;t.textContent=tfmt(r);if(r<=0)renderScreen()});if(G.screen=='base'){C.bUpdate()}return}
  const ro=$('#navroll');if(ro)ro.lastChild.textContent;if(!['train','mission'].includes(G.tab)||document.querySelector('.modal'))return;const sig=JSON.stringify([G.tab,s.si,s.maxSi,s.wave,B.boss,s.autoBoss,s.lv,Math.floor(s.exp/C.needExp()*20),D.STATS.map(x=>s.gold>=C.cost(x)),s.mp,s.mc,s.party]);if(sig!==lastSig){lastSig=sig;renderPanel()}},1000);
let last=performance.now();
function frame(now){const real=Math.min(.1,(now-last)/1000);last=now;let dt=real*G.speed;if(R.hs>0){R.hs-=real;dt*=.08}R.hsRealDt=real;{const ci=!!((R.cut&&R.cut.t<1.25)||(R.ccut&&R.ccut.t<1));if(ci!==G._ci){G._ci=ci;document.body.classList.toggle('cutin',ci)}}while(dt>0){const st=Math.min(.05,dt);C.tick(st);dt-=st}/* r237 perf: an opaque full screen covers the battle - skip canvas drawing (sim untouched; last frame stays underneath) */if(!(G.screen&&G.screen!=='sim'&&!G.noScrSkip&&$('#screen').classList.contains('on'))){/* r239 perf: first frame back after a skip - settle the unseen visual backlog instead of drawing it as one burst */if(G._skT>.3&&R.settle)R.settle();G._skT=0;R.frame(real*G.speed*(R.hs>0?.08:1))}else G._skT=(G._skT||0)+real;if((G._hT=(G._hT||0)+real)>=.1){G._hT=0;updateHud()}requestAnimationFrame(frame)}
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
G.achGems=()=>{let n=0;try{const s=ac();D.ACH.forEach(a=>{const v=C.achVal(a.k);for(let i=s.acl[a.k]||0;i<a.g.length&&v>=a.g[i];i++)n+=a.gem[i]||0})}catch(e){}return n};G.achSteps=()=>{let n=0;try{const s=ac();D.ACH.forEach(a=>{const v=C.achVal(a.k);for(let i=s.acl[a.k]||0;i<a.g.length&&v>=a.g[i];i++)n++})}catch(e){}return n};C.achClaim=k=>{const s=ac(),a=D.ACH.find(x=>x.k==k);const lv=s.acl[k]||0;if(!a||lv>=a.g.length||C.achVal(k)<a.g[lv])return false;s.acl[k]=lv+1;s.gems+=a.gem[lv];if(a.t)s.tickets=(s.tickets||0)+a.t[lv];if(a.st)s.stone=(s.stone||0)+a.st[lv];return true};
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
G.titleHud=f=>{const t=C.titleCur(),k=t?t.k:'';if(!f&&G._tk===k)return;G._tk=k;let e=document.getElementById('hTitle');if(!e){e=document.createElement('span');e.id='hTitle';const hn=document.getElementById('hName');hn.parentNode.insertBefore(e,hn.nextSibling);e.onclick=ev=>{ev.stopPropagation();openScreen('title')}}e.className='tbadge sm r'+(t?t.r:0);e.textContent=t?t.n:'';$sd(e,t?'':'none')};
setInterval(()=>G.titleHud(),1000);
{const oc=C.achClaim;C.achClaim=k=>{const before=C.titlesOwned().map(t=>t.k),r=oc(k);if(r){const nw=C.titlesOwned().filter(t=>!before.includes(t.k));G._newT=(G._newT||0)+nw.length}return r}}

Object.assign(C.ev,{wbStart:()=>{document.body.classList.add('wbon');banner&&0;const d=document.createElement('div');d.className='bwarn';d.innerHTML=`<div class=bwe style="box-shadow:inset 0 0 60px 18px rgba(140,40,255,.75)"></div><div class=bws><i>WORLD BOSS</i><i>WORLD BOSS</i><i>WORLD BOSS</i></div><div class=bwm><img src="assets/${C.WB.img}" style="height:80px"><div><small>월드 보스 출현</small><b>${C.WB.n}</b><em>「심연에서 깨어난 나를… 막을 수 있겠느냐.」</em></div></div><div class="bws b2"><i>WORLD BOSS</i><i>WORLD BOSS</i><i>WORLD BOSS</i></div>`;document.body.appendChild(d);setTimeout(()=>d.classList.add('out'),1500);setTimeout(()=>d.remove(),1900)},
wbEnd:r=>{document.body.classList.remove('wbon');const T=C.WB.tiers,g=r.ti>=0?T[r.ti][0]:'-',L=C.wbRank(),rk=L.findIndex(x=>x.me)+1;const it=[];if(r.rw.gems)it.push(['it2_gem.png',r.rw.gems,'보석']);if(r.rw.gold)it.push(['it2_gold.png',r.rw.gold,'골드']);if(r.rw.stone)it.push(['it2_stone.png',r.rw.stone,'강화석']);if(r.rw.tickets)it.push(['it2_ticket.png',r.rw.tickets,'소환권']);rewardPop(it,`${r.ti>=0?g+'등급':'등급 미달'} · 피해 ${fmt(r.d)} · 오늘 ${rk}위`);const b=document.querySelector('.rwpop .rwt');if(b)b.innerHTML=r.ti>=0?`<span class=wbg>${g}</span> 토벌 종료!`:'토벌 종료!'}});
document.addEventListener('click',ev=>{if(ev.target&&ev.target.id=='goRoll'){$('#screen').classList.remove('on');document.body.classList.remove('scron');G.screen=null;openSheet('gear')}});
// ---- new-player guide
(()=>{const ST=[
 {k:'gear',t:'장비를 뽑아 장착해 보세요!',gift:s=>{s.orbs=Math.max(s.orbs||0,3)},done:s=>Object.values(s.gear||{}).some(Boolean),tg:[['#eq','장착하면 전투력 UP!'],['#roll','마정구로 장비 뽑기!'],['#sidegear','장비를 눌러 보세요']]},
 {k:'summon',t:'동료를 소환해 파티를 키워요!',gift:s=>{s.tickets=Math.max(s.tickets||0,1)},done:s=>(s.ac&&s.ac.summon>=1),tg:[['#su1','소환권으로 1회 소환!'],['#navsummon','소환을 눌러 보세요']]},
 {k:'enh',t:'장비를 강화해 더 강해져요!',gift:s=>{s.stone=Math.max(s.stone||0,5);s.gold=Math.max(s.gold||0,2000)},done:s=>G._enTry||(s.ac&&s.ac.enh>=1),tg:[['#enGo','강화 버튼을 눌러 보세요!'],['#sideenhance','강화를 눌러 보세요'],['#sidemore','더보기를 눌러 강화를 찾아요']]}];
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
  return `<div class="duntr ${lock?'lock':''} ${done?'done':''}"><div class=dtn><b>${T.n}</b><small class="${ok?'up':'down'}">권장 ${fmt(T.req)}</small></div><div class=dtr>${rw}${!done&&!lock?'<i class=fc><img src="assets/it2_gem.png">50 첫</i>':''}</div><div class=dtb>${lock?'<span class="pill off dlk"><img src=assets/sk_lock.png alt=""><b>잠김</b><small>'+C.DUN.tiers[i-1].n+' 클리어</small></span>':done?`<span class="pill gold ${d.t[k]>0?'':'off'}" data-sw=${i}>소탕</span>`:`<span class="pill green ${d.t[k]>0?'':'off'}" data-ch=${i}>도전</span>`}</div></div>`}).join('');
 el.innerHTML=shell('일일 던전','bg_dungeon.jpg',tabs+head+`<div class=duntl>${rows}</div>`);
 el.querySelectorAll('[data-dk]').forEach(b=>b.onclick=()=>{G.dunK=b.dataset.dk;renderScreen()});
 const after=(r,sub)=>{s.dstat=(s.dstat||0)+1;updateHud();renderScreen();rewardPop(dunItems(r),sub)};
 el.querySelectorAll('[data-sw]').forEach(b=>b.onclick=()=>{const t=+b.dataset.sw,r=C.dunSweep(k,t);if(r.err)return toast(r.err=='tries'?'오늘 입장 횟수를 모두 사용했습니다':'먼저 클리어하세요');after(r,I[0]+' '+C.DUN.tiers[t].n+' 소탕 완료')});
 el.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{const t=+b.dataset.ch,T=C.DUN.tiers[t];if(!(d.t[k]>0))return toast('오늘 입장 횟수를 모두 사용했습니다');
  G.rbRun({kind:'dun',k,t,req:T.req,title:I[0]+' · '+T.n},won=>{const r=won?G.rbForce(()=>C.dunTry(k,t)):{fail:1};if(r.fail){updateHud();return modal(`<div class=ttl style="justify-content:center;font-size:18px;color:#ff7a6a">도전 실패</div><small>권장 전투력 ${fmt(T.req)} · 내 전투력 ${fmt(C.POW())}<br>입장 횟수는 차감되지 않았습니다.<br>장비 강화·동료 육성 후 다시 도전하세요!</small>`)}if(r.err)return toast('도전 불가');after(r,(r.first?'첫 클리어! 이제 소탕 가능 · ':'')+I[0]+' '+T.n)})})}
;(()=>{const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='map'){const el=document.querySelector('#screen');if(el&&!el.querySelector('#mapDun')){const b=document.createElement('span');b.id='mapDun';b.innerHTML=`<img src="${A}ic4/gate.png">일일 던전${G.BD&&G.BD.dungeon?'<i class=dot></i>':''}`;b.onclick=()=>openScreen('dungeon');el.appendChild(b)}}}catch(e){}return r}})();

;(()=>{const RI={gold:'it2_gold.png',orbs:'it2_exp.png',stone:'it2_stone.png',tickets:'it2_ticket.png',pot:'it2_hp.png',mpot:'it2_mp.png',dkey:'it3_dungeonkey.png',gems:'it2_gem.png'},RN={gold:'골드',orbs:'마정구',stone:'강화석',tickets:'소환권',pot:'회복 물약',mpot:'마나 물약',dkey:'던전 열쇠',gems:'보석'};
const left=()=>{const s=Math.max(0,Math.floor((C.nextReset()-C.now())/1000));return String(Math.floor(s/3600)).padStart(2,'0')+':'+String(Math.floor(s%3600/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
function dealHtml(){const d=C.deals(),s=C.S();return `<div class="card deals"><div class=ttl>일일 특가 <small class=dtim><img class="emi e_ui_timer" src=assets/ui_timer.png alt=""><b id=dealT>${left()}</b> 후 갱신</small></div><div class=dgrid>${d.it.map((x,i)=>{const it=C.DEALS.find(z=>z.k==x.k),p=C.dealPrice(x),base=C.dealBase(it),cant=x.b||(it.cur=='gems'?s.gems<p:s.gold<p),ci=it.cur=='gems'?'it2_gem.png':'it2_gold.png';return `<div class="dcell ${x.b?'sold':''}"><i class=doff>-${Math.round(x.off*100)}%</i><img src="${A}${it.img}"><b>${it.n}</b><s><img class=ci src=assets/${ci}>${fmt(base)}</s><span class="btn ${cant?'off':''}" data-deal=${i}>${x.b?'구매 완료':`<img class=ci src=assets/${ci}> ${fmt(p)}`}</span></div>`}).join('')}</div><span class="pill ${d.ref>=C.DEAL_REFMAX||s.gems<C.DEAL_REF?'off':''} dref" id=dealRef><img class="ci icrf" src=assets/ic_refresh.png> 새로고침 <img class=ci src=assets/it2_gem.png> ${C.DEAL_REF} (${C.DEAL_REFMAX-d.ref}/${C.DEAL_REFMAX})</span></div>`}
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
 const fl=[cur+3,cur+2,cur+1,cur,cur-1,cur-2].filter(f=>f>0).map(f=>{const st=f<cur?'done':f==cur?'cur':'up',rq=T.req(f),r=T.rew(f);return `<div class="twf ${st} ${T.boss(f)?'boss':''}"><b class=twn>${f}F</b><img src="${A}${T.mob(f)}"><div class=f><small class="${pw>=rq?'up':'down'}">권장 ${fmt(rq)}</small><div class=twr>${items(r).map(a=>`<i><img src="assets/${a[0]}">${fmt(a[1])}</i>`).join('')}</div></div>${st=='done'?'<span class=twok><img class="emi e_pass_check" src=assets/pass_check.png alt=""></span>':st=='cur'?`<span class="pill ${pw>=rq?'green':'twhard'}" id=twGo>도전</span>`:'<span class=twlk><img class="emi e_sk_lock" src=assets/sk_lock.png alt=""></span>'}</div>`}).join('');
 el.innerHTML=shell('무한의 탑','bg_tower.jpg',`<div class="card twh"><img src="${A}ic4/crown.png"><div class=f><b>최고 ${t.f}층</b><small>내 전투력 ${fmt(pw)} · 10층마다 보스 · 실패해도 손실 없음</small></div></div>
 <div class="card twd"><div class=f><b>일일 탑 보상</b><small>최고층 기준 · 매일 05:00</small></div><span class="btn ${dr?'g':'off'}" id=twD>${dr?'받기':t.f<1?'1층 클리어 필요':'수령 완료'}</span></div><div class=twl>${fl}</div>`);
 const go=el.querySelector('#twGo');if(go)go.onclick=()=>{const f=cur;G.rbRun({kind:'tw',f,boss:T.boss(f),mob:T.mob(f),req:T.req(f),title:'무한의 탑 '+f+'층'},won=>{const r=won?G.rbForce(()=>C.towerTry()):{fail:1,f};updateHud();renderScreen();if(r.fail)return modal(`<div class=ttl style="justify-content:center;font-size:18px;color:#ff7a6a">${f}층 도전 실패</div><small>권장 전투력 ${fmt(T.req(f))} · 내 전투력 ${fmt(C.POW())}<br>성장 후 다시 도전하세요!</small>`);rewardPop(items(r),`무한의 탑 ${r.f}층 돌파!`)})};
 el.querySelector('#twD').onclick=()=>{const r=C.towerDaily();if(!r)return;updateHud();renderScreen();rewardPop(items(r),'일일 탑 보상')}}
const rs0=renderScreen;renderScreen=function(){if(G.screen=='tower'){const el=$('#screen');scr(el);const b=el.querySelector('#sBack');if(b)b.onclick=()=>closeScreen();return}return rs0.apply(this,arguments)};
G.towerRed=()=>{const t=C.tower();return (t.day!==C.today()&&t.f>0)||C.POW()>=T.req(t.f+1)};
setInterval(()=>{try{const d=document.querySelector('#mgrid a[data-s=tower] .dot');if(d){const v=G.towerRed()?'':'none';if(d.style.display!==v)d.style.display=v}}catch(e){}},1000)})();

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
setInterval(()=>{try{const d=document.querySelector('#mgrid a[data-s=star] .dot');if(d){const v=C.starRed()?'':'none';if(d.style.display!==v)d.style.display=v}}catch(e){}},1000)})();

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
{const of=R.frame;const cv=()=>R._bc();const im={};R.frame=dt=>{of(dt);try{const p=C.S().pet;if(!p||!p.eq||G.screen||G._bpet)return;const x=PETS.find(q=>q.k==p.eq),L=R._AS().get('lina');const c=cv();if(!x||!L||!c)return;let I=im[x.img];if(!I){I=im[x.img]=new Image();I.src=A+x.img}if(!I.complete||!I.naturalWidth)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,t=performance.now()/1000,f=L.face>=0?1:-1,h=38,w=h*I.naturalWidth/I.naturalHeight,px=Math.max(66,L.x-f*62),py=L.y-4+Math.sin(t*3.2)*4;
 ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.globalAlpha=.35;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(px,L.y+2,16,5,0,0,6.283);ctx.fill();ctx.globalAlpha=1;ctx.translate(px,py);if(f<0)ctx.scale(-1,1);ctx.drawImage(I,-w/2,-h,w,h);ctx.restore()}catch(e){}}}
function scr(el){const p=P(),s=C.S();if(!p.gift){p.gift=1;p.egg+=1}
 const cards=PETS.map(x=>{const l=p.own[x.k],eq=p.eq==x.k;return `<div class="ptc ${l?'':'lock'} ${eq?'pton':''}" data-pk=${x.k} style="--rc:${D.RAR[x.g].c}"><img src="${A}${x.img}"><b>${x.n}</b><small>${l?`Lv.${l} · ${SN[x.st]} +${(x.per*l).toFixed(1).replace('.0','')}%`:'미보유'}</small>${eq?'<i class=pteq>장착</i>':''}</div>`}).join('');
 G.ptSel=G.ptSel||p.eq||PETS[0].k;const x=PETS.find(q=>q.k==G.ptSel),l=p.own[x.k]||0,eq=p.eq==x.k;
 const det=`<div class="card ptd" style="--rc:${D.RAR[x.g].c}"><img src="${A}${x.img}" class=${l?'':'lock'}><div class=f><b>${x.n} <span class=fac style="color:${D.RAR[x.g].c};border-color:${D.RAR[x.g].c}">${D.RAR[x.g].n}</span></b><small>${l?`Lv.${l}/${PMAX} · ${SN[x.st]} +${(x.per*l).toFixed(1).replace('.0','')}% (장착 시 100% · 미장착 20%)`:'알을 부화해 획득하세요'}</small>
 ${l?`<div class=ptb><span class="pill ${eq?'off':'green'}" id=ptEq>${eq?'장착 중':'장착'}</span><span class="pill gold ${l>=PMAX||s.gold<lvC(l)?'off':''}" id=ptUp>${l>=PMAX?'MAX':`Lv↑ <img class=ci src=assets/it2_gold.png>${fmt(lvC(l))}`}</span></div>`:''}</div></div>`;
 el.innerHTML=shell('펫','bg_f_meadow.jpg',`<div class="card pth"><div class=f><b>펫 부화</b><small>보유 알 ${p.egg}개 · 무한의 탑 5층마다 알 1개<br>중복 시 레벨 +1</small></div><span class="pill gold ${p.egg<1&&s.gems<300?'off':''}" id=ptHatch>${p.egg>0?'<img class=pegi src=assets/pt_egg.png> 알 부화':'<img class=ci src=assets/it2_gem.png> 300 부화'}</span></div>
 <div class=card><div class=ttl>펫 보너스 <small>공격 +${(C.petB('atk')*100).toFixed(1)}% · 체력 +${(C.petB('hp')*100).toFixed(1)}% · 골드 +${(C.petB('gold')*100).toFixed(1)}%</small></div><div class=ptg>${cards}</div></div>${det}`);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>{G.ptSel=b.dataset.pk;renderScreen()});
 el.querySelector('#ptHatch').onclick=()=>{const r=C.petHatch();if(!r)return toast('보석이 부족합니다');G.ptSel=r.x.k;updateHud();renderScreen();const m=document.createElement('div');m.className='modal pthm';m.innerHTML=`<div class=card><div class=egg><img class="emi e_pt_egg" src=assets/pt_egg.png alt=""></div><img src="${A}${r.x.img}" class=pthi><div class=ttl style="justify-content:center;font-size:19px">${r.x.n}</div><small>${r.nw?'<b class=up>NEW!</b> 새로운 펫 획득':'중복 · 레벨 +1'}</small><span class="btn wide" style="margin-top:10px">확인</span></div>`;m.onclick=e=>{if(e.target.closest('.btn')||e.target==m)m.remove()};$('#app').appendChild(m)};
 const e1=el.querySelector('#ptEq');if(e1)e1.onclick=()=>{if(C.petEq(x.k)){toast(x.n+' 장착!');updateHud();renderScreen()}};
 const u1=el.querySelector('#ptUp');if(u1)u1.onclick=()=>{const r=C.petUp(x.k);if(r!='ok')return toast(r=='gold'?'골드가 부족합니다':'최대 레벨');updateHud();renderScreen()}}
const rs0=renderScreen;renderScreen=function(){if(G.screen=='pet'){scr($('#screen'));return}return rs0.apply(this,arguments)};
setInterval(()=>{try{const p=P(),d=document.querySelector('#mgrid a[data-s=pet] .dot');if(d){const v=(p.egg>0||!p.gift)?'':'none';if(d.style.display!==v)d.style.display=v}}catch(e){}},1000)})();
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
 const tabs=`<div class=entabs>${[['c','동료'],['m','몬스터'],['h','빛나는'],['b','보스'],['p','펫'],['s','인연']].map(([k,n])=>`<span class="${T==k?'on':''}" data-ct=${k}>${n}${k!='s'&&k!='b'&&(k=='c'?D.COMPS:k=='m'?D.MONS:C.PETS||[]).some(x=>has(k,x.k)&&!d[k][x.k])?'<i class=dot></i>':''}</span>`).join('')}</div>`;
 const sum=`<div class="card cdsum"><div class=f><b>도감 보너스</b><small>공격력 +${Math.round((cb.atk+C.cdxB('atk'))*100)}% · 체력 +${Math.round((cb.hp+C.cdxB('hp'))*100)}% · 골드 +${Math.round(C.cdxB('gold')*100)}%</small></div><span class="pill gold ${pend?'':'off'}" id=cdAll>${pend?`모두 등록 (${pend})`:'등록 완료'}</span></div>`;
 const cell=(t,x,img,sub)=>{const o=has(t,x.k),r=d[t][x.k];return `<div class="bi cdc ${o?'':'lock'} ${o&&!r?'new':''}" data-cr="${t}:${x.k}"><img src="${A}${img}"><b>${o?x.n:'???'}</b><small>${sub}</small>${o&&!r?`<i class=cdrw><img class=ci src=assets/it2_gem.png>${RW[t]}</i>`:''}</div>`};
 let body='';
 /* r335: 동료 도감 grouped by grade - owned in colour w/ Lv+★, unowned as silhouettes w/ real summon rate; tap → detail card (ult cut-in). Display only */
 const hcell=c=>{const o=has('c',c.k),r=d.c[c.k],lv=((s.clv||{})[c.k])||1,st=Math.min(6,s.comps[c.k]||0),pr=C.cw?C.cw(c):0;return `<div class="bi cdc hc ${o?'':'lock'} ${o&&!r?'new':''}" data-cr="c:${c.k}" style="--rc:${D.RAR[c.g].c}"><img src="${A}${c.img}">${o?`<i class=hclv>Lv.${lv}</i>`:''}<b>${o?c.n:'???'}</b><small>${o?`<span class=hcst>${'★'.repeat(st)}</span>`:`소환 ${pr.toFixed(pr<1?2:1)}%`}</small>${o&&!r?`<i class=cdrw><img class=ci src=assets/it2_gem.png>${RW.c}</i>`:''}</div>`};
 if(T=='c')body=`<div class=card><div class=ttl>동료 ${cb.n}/${D.COMPS.length} <small>별 합계 ${totSt()}</small></div>${[...new Set(D.COMPS.map(c=>c.g))].sort((x,y)=>y-x).map(g=>{const L=D.COMPS.filter(c=>c.g==g),n=L.filter(c=>has('c',c.k)).length;return `<div class=hcg style="--rc:${D.RAR[g].c}"><span class=hcgn>${D.RAR[g].n}</span><em>${n}/${L.length}</em></div><div class="bagg hcgr">${L.map(hcell).join('')}</div>`}).join('')}</div><div class=card><div class=ttl>별 합계 보너스</div>${STM.map(m=>{const ok=totSt()>=m.n;return `<div class=row style="${ok?'':'opacity:.55'}"><div class=f><b>★ ${m.n}</b> <small>${m.atk?`공격력 +${m.atk}% `:''}${m.hp?`체력 +${m.hp}%`:''}</small><div class=bar style="margin-top:4px"><i style="width:${Math.min(1,totSt()/m.n)*100}%"></i></div></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':totSt()+'/'+m.n}</span></div>`}).join('')}</div>`;
 if(T=='m')body=`<div class=card><div class=ttl>몬스터 ${cb.seen}/${D.MONS.length}</div><div class=bagg>${D.MONS.map(m=>cell('m',m,m.img,'')).join('')}</div></div><div class=card><div class=ttl>수집 보너스</div>${D.CODEX.map(b=>{const v=b.t=='c'?cb.n:cb.seen,ok=v>=b.need;return `<div class=row style="${ok?'':'opacity:.55'}"><div class=f><b>${b.n}</b> <small>${b.atk?`공격력 +${b.atk*100}% `:''}${b.hp?`체력 +${b.hp*100}%`:''}</small></div><span class="pill ${ok?'green':'off'}">${ok?'적용 중':Math.min(v,b.need)+'/'+b.need}</span></div>`}).join('')}</div>`;
 if(T=='h'){const sh=s.shiny||{},tot=Object.values(sh).reduce((a,b)=>a+b,0),n=D.MONS.filter(m=>sh[m.img]).length;body=`<div class="card shcd"><div class=ttl>빛나는 몬스터 ${n}/${D.MONS.length} <small>총 처치 ${tot}</small></div><div class=shtip>전투 중 낮은 확률로 무지개빛 몬스터가 출현합니다. 처치하면 보석·강화석을 얻고 도감에 기록됩니다.</div><div class=bagg>${D.MONS.map(m=>{const c=sh[m.img]||0;return `<div class="bi cdc shc ${c?'':'lock'}"><img src="${A}${m.img}"><b>${c?'★'+m.n:'???'}</b><small>${c?c+'회 처치':''}</small></div>`}).join('')}</div></div>`}
 if(T=='b')body=G.bossDex();
 if(T=='p')body=`<div class=card><div class=ttl>펫 ${(C.PETS||[]).filter(p=>has('p',p.k)).length}/${(C.PETS||[]).length}</div><div class=bagg>${(C.PETS||[]).map(p=>cell('p',p,p.img,has('p',p.k)?'Lv.'+s.pet.own[p.k]:'')).join('')}</div></div>`;
 if(T=='s')body=SETS.map(x=>{const ok=setOk(x),mem=[...(x.m||[]).map(k=>{const c=D.COMPS.find(q=>q.k==k);return [c.img,has('c',k)]}),...(x.pet||[]).map(k=>{const p=(C.PETS||[]).find(q=>q.k==k);return [p.img,has('p',k)]})];return `<div class="card cdset ${ok?'ok':''}"><div class=ttl>${x.n} <small class="${ok?'up':''}">${x.atk?`공격력 +${x.atk}% `:''}${x.hp?`체력 +${x.hp}% `:''}${x.gold?`골드 +${x.gold}%`:''}${ok?' · 적용 중':''}</small></div><div class=cdm>${mem.map(([im,o])=>`<img src="${A}${im}" class="${o?'':'lock'}">`).join('')}</div></div>`}).join('');
 el.innerHTML=shell('도감','bg_lobby.jpg',sum+tabs+body);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-ct]').forEach(b=>b.onclick=()=>{G.cdT=b.dataset.ct;renderScreen()});
 el.querySelectorAll('[data-cr]').forEach(b=>b.onclick=()=>{const [t,k]=b.dataset.cr.split(':');const g=C.cdxReg(t,k);if(g){updateHud();renderScreen();rewardPop([['it2_gem.png',g,'보석']],'도감 등록')}else if(t=='c')hDet(k)});
 el.querySelector('#cdAll').onclick=()=>{const g=C.cdxRegAll();if(!g)return;updateHud();renderScreen();rewardPop([['it2_gem.png',g,'보석']],'도감 일괄 등록')}}
function hDet(k){const s=C.S(),c=D.COMPS.find(x=>x.k==k);if(!c)return;const o=has('c',k),R0=D.RAR[c.g],F=(D.FACTIONS||{})[c.fac]||{},lv=((s.clv||{})[k])||1,st=Math.min(6,s.comps[k]||0),sk=((s.csk||{})[k])||1,pr=C.cw?C.cw(c):0;
 const how=[`동료 소환 · 확률 ${pr.toFixed(pr<1?2:1)}%${C.RU==k?' <b class=up>확률 UP</b>':''}`,'소환 마일리지 100 · 선택 소환'];if(c.g>=4)how.push(`${C.PITY}회 소환 시 ${R0.n} 확정`);
 const sets=SETS.filter(x=>(x.m||[]).includes(k)).map(x=>{const ok=setOk(x);return `<div class="hdset ${ok?'ok':''}"><b>${x.n}</b><span>${(x.m||[]).map(q=>{const cc=D.COMPS.find(z=>z.k==q);return `<img src="${A}${cc.img}" class="${has('c',q)?'':'lock'}">`}).join('')}</span><small>${x.atk?`공격력 +${x.atk}% `:''}${x.hp?`체력 +${x.hp}% `:''}${x.gold?`골드 +${x.gold}%`:''}${ok?' · 적용 중':''}</small></div>`}).join('');
 const m=document.createElement('div');m.className='modal hdm';m.innerHTML=`<div class=card style="--rc:${R0.c}"><div class=hdart><img src="${A}cut/${k}_ult.png" onerror="this.onerror=null;this.src='${A}cutc/${k}.png'"><div class=hdnm><span>${R0.n}</span><b>${c.n}</b><em style="color:${F.c||'#fff'}">${F.n||''}</em></div>${o?'':'<i class=hdno>미보유</i>'}</div><div class=hdd>${c.d||''}</div>${o?`<div class=hdst><span>레벨<b>${lv}</b></span><span>성급<b class=hcst>${'★'.repeat(st)}</b></span><span>스킬<b>Lv.${sk}</b></span></div>`:''}<div class=hdh><div class=hdt>획득 방법</div>${how.map(h=>`<div>· ${h}</div>`).join('')}</div>${sets?`<div class=hdh><div class=hdt>인연 세트</div>${sets}</div>`:''}<span class="btn wide" style="margin-top:10px">닫기</span></div>`;
 m.onclick=e=>{if(e.target.closest('.btn')||e.target==m)m.remove()};$('#app').appendChild(m)}
G.hDet=hDet;
const rs0=renderScreen;renderScreen=function(){if(G.screen=='codex'){scr($('#screen'));return}return rs0.apply(this,arguments)};
setInterval(()=>{try{const on=C.cdxPend()>0;const d=document.querySelector('#mgrid a[data-s=codex] .dot');if(d)$sd(d,on?'':'none')}catch(e){}},1000)})();
;(()=>{// v16 status VFX + icons
const COL={burn:'#ff8a2a',frz:'#7ad8ff',stun:'#ffe14a',psn:'#7ae05a'},EMO={burn:'',frz:'',stun:'',psn:''},IM={};
G.ST_ART=true;const icon=k=>{if(!G.ST_ART)return {};let i=IM[k];if(!i){i=IM[k]=new Image();i.onerror=()=>{i.bad=1};i.src='assets/st/'+k+'.png'}return i};
const FT=[];C.ev.status=(e,k)=>{if(G._fin)return;const s=R._ES().get(e);if(!s)return;const tx=C.STS[k].n+'!',f={x:s.x,y:s.y-80*(e.sc||1)-20,t:0,txt:tx,c:COL[k],big:1,bs:e.boss?1:0};/* r376: status labels (boss and mobs) take the first free slot - boss: above head, then beside it on the open side, then the other side; mobs: above head, sidesteps - checked against live numbers/captions, other labels and hero HP bars */if(R._ftSlot)R._ftSlot(f,e,tx.length*16+6,18,FT);FT.push(f)};
const oh=C.ev.hit;C.ev.hit=(e,d,cr)=>{if(C._dot){const s=R._ES().get(e);if(s){const tx=fmt(Math.round(d)),f={x:s.x+(Math.random()*24-12),y:s.y-40,t:0,txt:tx,c:COL[C._dot],bd:e.boss?1:0};/* r376: boss DoT ticks share the status-label slot search (head, open side, other side) and keep off hero HP bars and live captions */if(e.boss&&R._ftSlot)R._ftSlot(f,e,tx.length*8+6,15,FT);FT.push(f)}return}oh(e,d,cr)};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(const [e,s] of R._ES()){if(!e.st||e.hp<=0)continue;const ks=Object.keys(e.st);if(!ks.length)continue;const h=(e.boss?100:80)*(e.sc||1)*(e.el?1.28:1)*(e.wb?1.8:1),x=s.x,y=s.y;
  if(e.st.frz){ctx.globalAlpha=e.boss?.16:.32;/* r367: lighter frost veil on bosses - it bleached pale bosses */ctx.fillStyle='#9fe6ff';ctx.beginPath();ctx.ellipse(x,y-h*.48,h*.36,h*.52,0,0,6.283);ctx.fill();ctx.globalAlpha=.85;ctx.strokeStyle='#e8fbff';ctx.lineWidth=1.5;for(let i=0;i<5;i++){const a=i*1.256+.3,r=h*.34;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r*.5,y-h*.48+Math.sin(a)*r*.7);ctx.lineTo(x+Math.cos(a)*r,y-h*.48+Math.sin(a)*r*1.3);ctx.stroke()}}
  if(e.st.burn){for(let i=0;i<5;i++){const p=(T*1.6+i/5)%1,px=x+Math.sin(i*2.1+T*3)*h*.22,py=y-h*.15-p*h*.7;ctx.globalAlpha=(1-p)*.85;ctx.fillStyle=p<.4?'#ffe27a':'#ff6a1a';ctx.beginPath();ctx.arc(px,py,4+(1-p)*4,0,6.283);ctx.fill()}}
  if(e.st.psn){for(let i=0;i<4;i++){const p=(T*1.1+i/4)%1,px=x+Math.cos(i*1.7)*h*.25,py=y-h*.3-p*h*.6;ctx.globalAlpha=(1-p)*.8;ctx.strokeStyle='#8af06a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,3+p*4,0,6.283);ctx.stroke()}}
  if(e.st.stun){ctx.globalAlpha=R._dtTop2&&y-h+1>279&&y-h-9<R._dtTop2?.15:1;/* r323 */ctx.fillStyle='#ffe14a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';for(let i=0;i<3;i++){const a=T*5+i*2.094;ctx.fillText('★',x+Math.cos(a)*h*.28,y-h-4+Math.sin(a)*5)}}
  const bw=18,x0=x-(ks.length*bw)/2+bw/2,iy=e.boss?y+16:y-h-34;/* r367: boss status-icon row moved from above the head (inside the big crit number) to the feet */ctx.globalAlpha=R._dtTop2&&iy+11>279&&iy-11<R._dtTop2?.15:1;/* r323: while the boss HP notice / ally skill strip (279-358) is up, a status-icon row inside that band fades like the in-flight numbers (one compare, no alloc) */ks.forEach((k,i)=>{const ix=x0+i*bw,I=icon(k);ctx.fillStyle='#000a';ctx.beginPath();ctx.arc(ix,iy,9,0,6.283);ctx.fill();ctx.strokeStyle=COL[k];ctx.lineWidth=1.5;ctx.stroke();if(I.complete&&I.naturalWidth&&!I.bad)ctx.drawImage(I,ix-8,iy-8,16,16);else{ctx.fillStyle=COL[k];ctx.beginPath();ctx.arc(ix,iy,4.5,0,6.283);ctx.fill()}/* r309: no emoji fallback - a status-colour dot if the icon is missing */
   const st=e.st[k],mx=C.STS[k].t*(e.boss?.5:1);ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(ix,iy,10.5,-1.571,-1.571+6.283*Math.max(0,Math.min(1,st.t/mx)));ctx.stroke()})}
 if(G._fin)FT.length=0;for(let i=FT.length-1;i>=0;i--){const f=FT[i];f.t+=dt;if(f.t>.9){FT.splice(i,1);continue}ctx.globalAlpha=(1-Math.max(0,f.t-.5)/.4)*(R._dtTop2&&f.y-f.t*30<R._dtTop2||R._dloB&&f.y-f.t*30>356&&f.y-f.t*30<480?0:1);/* r373: combat text under an overlay band is hidden, not a 15% ghost */ctx.font=(f.big?'900 16px':'800 13px')+' Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#000';const yy=f.y-f.t*30;ctx.strokeText(f.txt,f.x,yy);ctx.fillStyle=f.c;ctx.fillText(f.txt,f.x,yy)}
 ctx.restore()}catch(err){}}})();
;(()=>{// v17 break gauge + crit juice
const FT2=[],BKG={};
C.ev.grog=e=>{R.hs=Math.max(R.hs||0,.35);const s=R._ES().get(e);let ir=232;if(e.boss){const ib=document.getElementById('idleBtn');if(ib){const r=ib.getBoundingClientRect();if(r.width)ir=r.right}}FT2.push({t:0,x:s?s.x:200,y:s?(e.boss?Math.min(584,s.y+56):s.y-120):300,e:e.boss?e:null,ir});/* r373: boss BREAK! moved off the body to the ground gap under the feet status-icon row (y+5..y+27): baseline y+56, kept right of the 방치보상 chest (rect read once per event) and above the NICE COMBO slot (595+) *//* r366: BREAK! sits at the boss's lower body, not on its face - the band above the head is taken by the 그로기 notice that comes with it */if(!R.opt||R.opt.fx){const f=document.createElement('div');f.className='bkflash grogfl';document.body.appendChild(f);setTimeout(()=>f.remove(),120)}/* r368: the wide 그로기 toast is gone - a compact pill in a fixed slot under the break gauge carries it (drawn on the canvas, no DOM) */};
C.ev.grogEnd=()=>{};
{const oh=C.ev.hit;C.ev.hit=(e,d,cr)=>{oh(e,d,cr);if(cr&&!C._dot&&e&&(e.boss||Math.random()<.35)){R.hs=Math.max(R.hs||0,e.boss?.07:.04)}}}
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const bo=C.alive().find(e=>e.boss&&!e.wb);const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 if(bo){const y=226+30,x0=104,w=W-232,g=bo.grog>0;ctx.fillStyle='rgba(10,0,8,.75)';ctx.beginPath();ctx.roundRect(x0-2,y-2,w+4,10,5);ctx.fill();const v=g?bo.grog/C.BRK.dur:Math.min(1,bo.brk||0);/* r368 perf: two cached gauge gradients (rebuilt only if the field width changes) */if(BKG.w!==w||BKG.x!==x0){const m=(c0,c1)=>{const q=ctx.createLinearGradient(x0,0,x0+w,0);q.addColorStop(0,c0);q.addColorStop(1,c1);return q};BKG.g=m('#ff4a3a','#ffd25a');BKG.n=m('#c08a10','#ffe27a');BKG.w=w;BKG.x=x0}const gr=g?BKG.g:BKG.n;ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(x0,y,Math.max(2,w*v),6,3);ctx.fill();
  ctx.font='900 8.5px Maplestory,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=2.5;ctx.strokeStyle='#000';const lb=g?'그로기!':'브레이크';ctx.strokeText(lb,x0+w/2,y+3.5);ctx.fillStyle=g?'#ffd0c0':'#fff2c0';ctx.fillText(lb,x0+w/2,y+3.5);ctx.textBaseline='alphabetic';if(g){const el=C.BRK.dur-bo.grog,pa=el<.15?el/.15:el>2.2?Math.max(0,1-(el-2.2)/.3):1;if(pa>0){/* r368: 그로기 pill - fixed slot right under the gauge (266-280), above the ally strip band (279+), never on the boss */const t1='그로기!',t2=' 피해 +50%';ctx.font='900 10px Maplestory,sans-serif';if(BKG.pw==null){BKG.w1=ctx.measureText(t1).width;BKG.pw=BKG.w1+ctx.measureText(t2).width+16}const pw=BKG.pw,px=W/2-pw/2,py=265;ctx.globalAlpha=pa;ctx.fillStyle='rgba(40,6,4,.86)';ctx.beginPath();ctx.roundRect(px,py,pw,14,7);ctx.fill();ctx.strokeStyle='#ffb44a';ctx.lineWidth=1.2;ctx.stroke();ctx.textAlign='left';ctx.textBaseline='middle';ctx.lineWidth=2.5;ctx.strokeStyle='#000';ctx.strokeText(t1,px+8,py+7.5);ctx.fillStyle='#ffd25a';ctx.fillText(t1,px+8,py+7.5);ctx.fillStyle='#fff0e0';ctx.fillText(t2,px+8+BKG.w1,py+7.5);ctx.textBaseline='alphabetic';ctx.textAlign='center';ctx.globalAlpha=1}}/* r308: label rides inside the break gauge instead of on the frame's bottom edge */
  if(g){const s=R._ES().get(bo);if(s){ctx.globalAlpha=.25+.15*Math.sin(T*10);ctx.fillStyle='#ffd25a';ctx.beginPath();ctx.ellipse(s.x,s.y-2,60,16,0,0,6.283);ctx.fill();ctx.globalAlpha=1}}}
 if(G._fin)FT2.length=0; for(let i=FT2.length-1;i>=0;i--){const f=FT2[i];f.t+=dt;if(f.t>1.3){FT2.splice(i,1);continue}if(f.e){const s=R._ES().get(f.e);if(s){f.x=Math.max(f.ir+80,s.x);f.y=Math.min(584,s.y+52)}}/* r368: BREAK! rides with the boss, so a leap can no longer carry the feet status-icon row (y+5..y+27) up under a text left at the old spot */const k=Math.min(1,f.t/.15),a=(f.t>1?1-(f.t-1)/.3:1)*(R._dtTop2&&f.y<R._dtTop2||R._dloB&&f.y>340&&f.y<480?0:1);ctx.globalAlpha=a;ctx.save();/* r374: boss BREAK! is 25px with a 1.15x pop (was 34px, 2x) so it fits the ground strip right of the 방치보상 chest (~158px) without clipping it; non-boss keeps 34px/2x */const bb=!!f.e,ps=bb?1.15-.15*k:2-k;ctx.translate(bb?Math.min(W-79,Math.max(80,f.x)):Math.min(W-80,Math.max(80,f.x)),f.y);ctx.scale(ps,ps);ctx.font=bb?'italic 900 25px Maplestory,sans-serif':'italic 900 34px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=bb?5:6;ctx.strokeStyle='#3a0a00';ctx.strokeText('BREAK!',0,0);let g2=bb?BKG.b:BKG.t;if(!g2){const gh=bb?25/34:1;g2=ctx.createLinearGradient(0,-30*gh,0,4*gh);g2.addColorStop(0,'#fff6c8');g2.addColorStop(.55,'#ffc23a');g2.addColorStop(1,'#d05a10');if(bb)BKG.b=g2;else BKG.t=g2}ctx.fillStyle=g2;ctx.fillText('BREAK!',0,0);ctx.restore()}
 ctx.restore()}catch(err){}}})();
;(()=>{// v18 telegraph VFX + dodge
let Z=null,FL=0;const TX=[];
const party=()=>{const L=[...R._AS().values()];if(!L.length)return null;const al=C.aliveAllies().map(a=>R._AS().get(a.k)).filter(Boolean);const A=al.length?al:L;let wx=0,wy=0;A.forEach(s=>{wx+=s.wx;wy+=s.wy});return{wx:wx/A.length,wy:wy/A.length}};
C.ev.tele=e=>{const p=party();if(!p)return;Z={wx:p.wx,wy:p.wy,t0:performance.now()};if(e&&!G.screen)toast('<b style="color:#ff6a5a"><img class="emi e_ui_warn" src=assets/ui_warn.png alt="">강력한 공격!</b> 붉은 영역을 피하세요');};
C.ev.teleCancel=(e,stun)=>{Z=null;if(stun){const s=e&&R._ES().get(e);if(s)TX.push({x:s.x,y:s.y-130,t:0,txt:'공격 저지!',c:'#7ad8ff'})}};
C.ev.teleHit=(e,res)=>{const z=Z;Z=null;FL=.35;R.hs=Math.max(R.hs||0,.12);res.forEach(([a,d])=>{const s=R._AS().get(a.k);if(!s)return;if(!d){const dy=(z&&s.wy<z.wy?-1:1)*70;s.wy+=dy;s.wx-=20;TX.push({x:s.x,y:s.y-90,t:0,txt:'회피!',c:'#9ef'})}else{s.hitT=0;s.shk=8}})};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,H=c.clientHeight;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 const ref=R._AS().get('lina')||[...R._AS().values()][0];
 if(Z&&C.B.tele&&ref){const ox=ref.x-ref.wx,oy=ref.y-ref.wy,x=Z.wx+ox,y=Z.wy+oy,tl=C.B.tele,k=1-tl.t/tl.T,T=performance.now()/1000,rx=118,ry=58;
  ctx.globalAlpha=.18+.1*Math.sin(T*14);ctx.fillStyle='#ff2a1a';ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,6.283);ctx.fill();
  ctx.globalAlpha=.55;ctx.fillStyle='#ff3a2a';ctx.beginPath();ctx.ellipse(x,y,rx*k,ry*k,0,0,6.283);ctx.fill();
  ctx.globalAlpha=1;ctx.strokeStyle='#ff5a3a';ctx.lineWidth=3;ctx.setLineDash([10,6]);ctx.lineDashOffset=-T*40;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,6.283);ctx.stroke();ctx.setLineDash([]);if(!R.opt||R.opt.fx){const pr=Math.max(0,Math.min(1,tl.t/tl.T));ctx.lineWidth=4;ctx.strokeStyle='#ffe08a';ctx.shadowColor='#ff6a2a';ctx.shadowBlur=8;ctx.beginPath();ctx.ellipse(x,y,rx+8,ry+6,0,-1.571,-1.571+6.283*pr);ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=.5+.5*Math.abs(Math.sin(T*9));ctx.lineWidth=2;ctx.strokeStyle='#fff0c0';ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,6.283);ctx.stroke();ctx.globalAlpha=1;ctx.font='900 13px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#300';const tt=Math.max(0,tl.t).toFixed(1)+'s';ctx.strokeText(tt,x,y-ry-6);ctx.fillStyle='#ffe08a';ctx.fillText(tt,x,y-ry-6)}
  const bs=R._ES().get(tl.e);if(bs){const by=bs.y-150+Math.sin(T*12)*3;ctx.font='900 30px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle='#300';ctx.strokeText('!',bs.x,by);ctx.fillStyle='#ff4a3a';ctx.fillText('!',bs.x,by);ctx.globalAlpha=.6;ctx.strokeStyle='#ff4a3a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bs.x,bs.y-40);ctx.lineTo(x,y);ctx.stroke();ctx.globalAlpha=1}}
 if(FL>0){FL-=dt;ctx.globalAlpha=Math.max(0,FL/.35)*.45;ctx.fillStyle='#ff2a1a';ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
 for(let i=TX.length-1;i>=0;i--){const f=TX[i];f.t+=dt;if(f.t>1){TX.splice(i,1);continue}ctx.globalAlpha=(1-Math.max(0,f.t-.6)/.4)*(R._dtTop2&&f.y-f.t*26<R._dtTop2||R._dloB&&f.y-f.t*26>356&&f.y-f.t*26<480?.15:1);ctx.font='900 16px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#002';const yy=f.y-f.t*26;ctx.strokeText(f.txt,f.x,yy);ctx.fillStyle=f.c;ctx.fillText(f.txt,f.x,yy)}
 ctx.restore()}catch(err){}}})();
;(()=>{// v19 ally chain/combo skills (연계기)
const NAMES={'gourry+zelgadis':'쌍검 연격','amelia+sera':'성광 합창','lyra+pip':'그림자 저격','xellos+zelgadis':'아스트랄 붕괴','borin+gourry':'대지 가르기','kaede+rhea':'용화 일섬'};
const COL={gourry:'#ffd25a',zelgadis:'#b07cff',amelia:'#fff0a0',sera:'#ffe6ff',lyra:'#7af07a',pip:'#9a7aff',noel:'#9fe6ff',xellos:'#a050ff',borin:'#ff9a4a',kaede:'#ff7aa0',rhea:'#ff5a3a'};
const STK={lyra:'stun',pip:'psn',noel:'frz',zelgadis:'frz',rhea:'burn',xellos:'stun',kaede:'stun',gourry:'stun',borin:'stun',sera:'burn',amelia:'burn'};
let last=null,cd=0,RING=null;G.comboN=0;
const nm=(a,b)=>NAMES[[a,b].sort().join('+')]||'합동 공격';
const fire=(a,b)=>{const A=D.COMPS.find(x=>x.k==a),Bc=D.COMPS.find(x=>x.k==b);if(!A||!Bc)return;cd=8;G.comboN++;const L=C.alive();if(!L.length)return;
 R.hs=Math.max(R.hs||0,.18);const n=nm(a,b);
 const d=document.createElement('div');d.className='combo';d.innerHTML=`<img class=cl src="${A0}${A.img}"><div class=cm><small>연계기</small><b>${n}</b><i>${A.n} × ${Bc.n}</i></div><img class=cr src="${A0}${Bc.img}">`;{const show=()=>{/* r325: boss skill strip up (or queued behind the boss hold) when the banner appears -> it takes the 362 slot under the strip for its whole life */if(C.B.boss&&!C.B.wb&&((R.ccut&&R.ccut.t<1)||R.ccQ))d.classList.add('dlo');$('#battle').appendChild(d);setTimeout(()=>d.remove(),1500)};/* v184b: banner waits for boss landing hold; damage timing unchanged */if(R.bHold>0){const w=()=>R.bHold>0?setTimeout(w,50):show();setTimeout(w,50)}else show()}
 setTimeout(()=>{const LL=C.alive();const es=LL.map(e=>R._ES().get(e)).filter(Boolean);const cx=es.reduce((s,q)=>s+q.x,0)/(es.length||1),cy=es.reduce((s,q)=>s+q.y,0)/(es.length||1);RING={x:cx,y:cy,t:0,c1:COL[a]||'#fff',c2:COL[b]||'#ffd25a'};
  const mul=(C.compMul(a)+C.compMul(b))*1.6;C._combo=1;setTimeout(()=>C._combo=0,0);LL.forEach(e=>{const cr=Math.random()<.5;C.hitEnemy(e,C.ATK()*mul*(cr?2:1),cr);if(e.hp>0){C.stApply(e,STK[a]||'burn');if(STK[b]!==STK[a])C.stApply(e,STK[b]||'stun')}})},450)};
G._duoTest=(a,b)=>{cd=0;fire(a,b)};G._dloOn=()=>{R._dloB=1;clearTimeout(G._dloT);G._dloT=setTimeout(()=>{R._dloB=0},1500)};/* r327: number-fade band flag while a lowered duo banner shows *//* r326 test hook (console only; nothing in the game calls it) */const A0=A;const oc=R.csk;R.csk=(k,s,force)=>{const r=oc(k,s,force);if(r&&!G.screen){const now=performance.now()/1000;if(!force&&!(R.ccut&&R.ccut.t<1.1)&&cd<=0&&last&&last.k!==k&&now-last.t<1.6&&C.alive().length){fire(last.k,k);last=null}else last={k,t:now}}return r};
const of=R.frame;R.frame=dt=>{cd=Math.max(0,cd-dt);of(dt);try{if(!RING||G.screen)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;RING.t+=dt;const k=RING.t/.7;if(k>1){RING=null;return}ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
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
 try{if(G.screen||!app.length)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.globalCompositeOperation='lighter';
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
const PJ=[],LB=[],WI=new Image();WI.src='assets/ui_warn.png';let lastE=null;G.pjN=0;G.eskN=0;
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
  if(!held)e.esk-=dt;if(e.esk<=0){e.esk=7+Math.random()*3;e.eskW=.85;e.mv=mvOf(e);LB.push({e,t:0,txt:MV[e.mv].n,c:MV[e.mv].col,warn:1})}})};
const fireMv=e=>{const al=C.aliveAllies();if(!al.length)return;const M=MV[e.mv],tg=M.all?al:[al[0]];G.eskN++;C._esk=1;
 tg.forEach(t=>{const d=Math.max(1,e.atk*M.m*(1-Math.min(.6,C.stat('def')/200)));t.hp-=d;C.ev.dmgAlly(t,d,'');if(G.HA)G.HA.set(t.k,{t:0,T:e.mv=='charge'?.6:.42,pow:e.mv=='charge'?28:16,up:e.mv=='charge'?1:0});if(t.hp<=0){t.hp=0;t.dead=true;C.ev.allyDead&&C.ev.allyDead(t)}});C._esk=0;
 const s=R._ES().get(e);if(s)RINGS.push({x:M.all?150:s.x-60,y:(s.y||500),t:0,c:M.col,big:M.all});R.hs=Math.max(R.hs||0,.06)};
const RINGS=[];
const ease=t=>1-Math.pow(1-t,3);
const of=R.frame;R.frame=dt=>{of(dt);const c=R._bc();if(!c)return;if(G.screen){PJ.splice(0).forEach(p=>p.cb());return}
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
  ctx.save();ctx.translate(Math.min(300,Math.max(80,s.x)),s.y+30+ease(Math.min(1,l.t))*4);ctx.fillStyle='rgba(20,0,0,.6)';ctx.beginPath();ctx.roundRect?ctx.roundRect(-58,-15,116,21,10):ctx.rect(-58,-15,116,21);ctx.fill();ctx.scale(.6+.4*k,.6+.4*k);ctx.globalAlpha=l.t>.8?(1.1-l.t)/.3:1;ctx.font='900 15px Maplestory,sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#200';ctx.strokeText(l.txt,0,0);ctx.fillStyle=l.c;ctx.fillText(l.txt,0,0);if(l.warn&&WI.complete&&WI.naturalWidth){if(l.tw==null)l.tw=ctx.measureText(l.txt).width;ctx.drawImage(WI,-l.tw/2-21,-16,19,18)}ctx.restore()
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
const add=()=>{const ft=document.getElementById('facTag');if(!ft||document.getElementById('dpsBtn'))return;const b=document.createElement('span');b.id='dpsBtn';b.className='factag';b.innerHTML='<img class=hi src=assets/ic_dps.png width=16 height=16 alt="">';ft.after(b);
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
 c.innerHTML=`<div class=brh><img src="${A}boss_demon.png"><div><b>보스 러시</b><small>${BR.time}초 동안 보스를 연속 처치! 주간 랭킹 · 월 05:00 정산</small></div></div><div class=brs><span>오늘 <b>${b.tries}/${BR.tries}</b></span><span>주간 최고 <b>${b.best||0}</b></span><span>순위 <b>${b.best?r.me+'위':'-'}</b></span></div><div class=brbtns><span class="pill ${b.tries?'gold':''}" id=brGo>도전</span><span class=pill id=brRk>랭킹</span></div>${b.pend?`<div class=brpend id=brPend>지난 주 ${b.pend.rk}위 보상 받기 · <img class="emi e_it2_gem" src=assets/it2_gem.png alt="">${tierOf(b.pend.rk)[1]}</div>`:''}`;
 {const an=el.querySelector('.dunh');an?an.before(c):el.appendChild(c)}c.querySelector('#brGo').onclick=()=>{if(!st().tries)return toast('오늘 도전 횟수를 모두 사용했습니다');realRun()};c.querySelector('#brRk').onclick=rkPop;
 const pd=c.querySelector('#brPend');if(pd)pd.onclick=()=>{const b=st(),t=tierOf(b.pend.rk);C.S().gems+=t[1];b.pend=null;rewardPop([['it2_gem.png',t[1],'보석']],'보스 러시 주간 '+t[2]+' 보상');G.screen&&renderScreen()}};
const rkPop=()=>{const b=st(),r=rank(b.best,b.w);const m=document.createElement('div');m.className='modal brmod';m.innerHTML=`<div class=mbox><div class=ttl>보스 러시 주간 랭킹</div><div class=brl>${r.L.slice(0,30).map((x,i)=>`<div class="brr ${x.me?'me':''}"><i>${i+1}</i><b>${x.n}</b><em>${x.sc}</em></div>`).join('')}</div><div class=brtier>${BR.tier.map(t=>`<span>${t[2]} <img class="emi e_it2_gem" src=assets/it2_gem.png alt="">${t[1]}</span>`).join('')}</div><div class="pill gold" id=brX>닫기</div></div>`;document.getElementById('app').appendChild(m);m.querySelector('#brX').onclick=()=>m.remove();setTimeout(()=>{const me=m.querySelector('.brr.me');me&&me.scrollIntoView({block:'center'})},50)};
// run overlay
const run=()=>{const b=st();b.tries--;const BS=D.BOSSES;let i=0,hp=bossHp(0),T=BR.time,kills=0,done=false,last=performance.now(),acc=0,fast=1;
 const m=document.createElement('div');m.className='brrun';m.innerHTML=`<div class=brtop><div class=brtime><s></s></div><b class=brt></b></div><div class=brk>처치 <b>0</b></div><div class=brbn></div><div class=brboss><img></div><div class=brhp><s></s><i></i></div><div class=brparty>${['lina'].concat(C.S().party).slice(0,5).map(k=>`<img src="${A}${k=='lina'?'hero_lina.png':(D.COMPS.find(c=>c.k==k)||{}).img}">`).join('')}</div><div class=brfx></div><div class=brskip><img class="emi e_ic_speed" src=assets/ic_speed.png alt="">빠르게</div>`;
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
 m.innerHTML=`<div class=mbox><div class=ttl style="justify-content:center;color:#ff9a6a"><img class="emi e_ui_warn" src=assets/ui_warn.png alt="">전투력 부족</div><div class=pwrow><span>권장 전투력<b>${fmt(o.req)}</b></span><span>내 전투력<b class=low>${fmt(pw)}</b></span></div><small>패배해도 입장 횟수는 차감되지 않습니다.<br>그래도 도전하시겠습니까?</small><div class=pwbtn><span class=pill id=pwNo>취소</span><span class="pill gold" id=pwYes>도전</span></div></div>`;
 document.getElementById('app').appendChild(m);m.querySelector('#pwNo').onclick=()=>m.remove();m.querySelector('#pwYes').onclick=()=>{m.remove();orb(o,done)}};
const sweepAll=()=>{const d=C.dunDaily(),tot={};let n=0;C.DUN.keys.forEach(k=>{const t=(d.clr[k]||0)-1;if(t<0)return;while(d.t[k]>0){const r=C.dunSweep(k,t);if(!r||r.err)break;n++;for(const x in r)if(typeof r[x]=='number')tot[x]=(tot[x]||0)+r[x]}});
 if(!n)return toast('소탕 가능한 던전이 없습니다');const s=C.S();s.dstat=(s.dstat||0)+n;updateHud();renderScreen();rewardPop(dunItems(tot),`일괄 소탕 ${n}회 완료`)};G.sweepAll=sweepAll;
const ods=dunScreen;dunScreen=function(el,s){ods.apply(this,arguments);const d=C.dunDaily(),can=C.DUN.keys.reduce((a,k)=>a+((d.clr[k]||0)>0?d.t[k]:0),0);const b=document.createElement('div');b.className='swall '+(can?'':'off');b.innerHTML=`<img class="emi e_ui_bolt" src=assets/ui_bolt.png alt="">일괄 소탕 <small>${can}회 가능</small>${can?'':`<em class=swwhy>${C.DUN.keys.some(k=>(d.clr[k]||0)>0)?'오늘 입장 횟수를 모두 사용했습니다':'던전 첫 클리어 후 소탕 가능'}</em>`}`;b.onclick=sweepAll;const tb=el.querySelector('.duntabs');tb?tb.after(b):el.appendChild(b)};
})();
;(()=>{// v30 boss enrage at 50% HP (광폭화)
G.enrN=0;const EN=[];
const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{C.alive().forEach(e=>{if(!e.boss||e.wb||e.enr||e.hp>e.max*.5)return;e.enr=1;e.spd*=1.3;e.atk*=1.15;G.enrN++;EN.push({e,t:0});R.hs=Math.max(R.hs||0,.12);
  if(!G.screen){let w=0;const go=()=>{if((e.grog>0||R.slowT>0||document.querySelector('.grogt,.cutin'))&&w++<30)return setTimeout(go,200);const d=document.createElement('div');d.className='enrb';d.innerHTML='<b>광폭화!</b><small>공격 속도 상승</small>';document.getElementById('battle').appendChild(d);setTimeout(()=>d.remove(),1400)};go()}})}catch(_){}return r};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,ES=R._ES();ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
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
G.lootN=0;let live=0;const CP=[];
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{try{const q=R._ES().get(e),b=document.getElementById('battle'),tg=document.getElementById('cGold');if(q&&b&&tg&&!G.screen&&live<36){const br=G.rc(b),tr=G.rc(tg),n=e.boss?10:e.el?5:2;
  for(let i=0;i<n;i++){/* r393: pooled - idle coins stay in #battle hidden (.lzz = display:none) and are reused; display none->block restarts lootP exactly like a fresh node */let d=null;for(const c of CP)if(c._f){d=c;break}if(!d){d=document.createElement('img');d.src='assets/fx_coin.png';CP.push(d)}d._f=0;d.className='lootc';d.style.transform='';const x=q.x+(Math.random()-.5)*30,y=q.y-30;d.style.left=x+'px';d.style.top=y+'px';d.style.setProperty('--dx',((Math.random()-.5)*(e.boss?160:70))+'px');d.style.setProperty('--dy',(-30-Math.random()*40)+'px');if(d.parentNode!==b)b.appendChild(d);live++;G.lootN++;
   setTimeout(()=>{d.classList.add('fly');d.style.transform=`translate(${tr.left+tr.width/2-br.left-x}px,${tr.top+tr.height/2-br.top-y}px) scale(.55)`},520+i*45);
   setTimeout(()=>{d.className='lootc lzz';d._f=1;live--;G.bump(tg,'gbump')},1150+i*45)}}}catch(_){}return ok(e,...a)};
{const st=document.createElement('style');st.textContent='html body .lootc.lzz{display:none!important}';document.head.appendChild(st)}
})();
;(()=>{// v33 companion ultimate: gauge fills, at full fires the companion's own CSKI skill (with its cut-in) + burst. Random procs no longer show the named cut-in.
G.ultN=0;G._grogT=0;const FX=[];
const og=C.ev.grog;C.ev.grog=(e,...a)=>{if(e&&e.boss)G._grogT=performance.now();return og(e,...a)};
const ocs=R.csk;R.csk=(k,s,force)=>{if(force)return ocs(k,s,force);const cc=R.ccCd;R.ccCd=99;const r=ocs(k,s,force);R.ccCd=cc;return r};
const busy=()=>R.slowT>0||(R.elT&&R.elT.t<1.6)||(R.bossT!=null&&R.bossT<2)||performance.now()-G._grogT<1600||C.alive().some(e=>e.boss&&e.grog>0)||(R.ccut&&R.ccut.t<1)||(R.cut&&R.cut.t<1.25)||document.querySelector('.bwarn,.combo,.enrb,.vic,.chap');
const ot=C.tick;C.tick=dt=>{const r=ot(dt);try{const B=C.B;if(!B||!B.allies)return r;const pp=document.querySelectorAll('#partycol .pp');let fired=0;
 B.allies.forEach((a,i)=>{const el=pp[i];if(el&&!el.querySelector('.ugb'))el.insertAdjacentHTML('beforeend','<div class=ugb><i></i></div>');
  if(!a.c||a.hp<=0||!(D.CSKI||{})[a.k])return;a._ug=Math.min(1,(a._ug||0)+dt/(a.c.healer?11:9));if(el){/* r369 perf: 1/50 steps (the bar has a .25s linear transform transition, so it still glides); string only built on change */const uq=Math.round(a._ug*50);if(!el._ugi||!el._ugi.isConnected){el._ugi=el.querySelector('.ugb i');el._ugq=-1}if(el._ugi&&el._ugq!==uq){el._ugq=uq;/* r369 perf: the write is deferred to after the canvas frame (G._post) so the frame's first canvas font set doesn't force a style recalc */let U=G._UGP;if(!U){U=G._UGP=[];(G._post=G._post||[]).push(()=>{for(let i=0;i<U.length;i++){const e2=U[i];e2._ugp=0;if(e2._ugi)e2._ugi.style.transform='scaleX('+(e2._ugq/50)+')'}U.length=0})}if(!el._ugp){el._ugp=1;U.push(el)}};el.classList.toggle('ugf',a._ug>=1)}
  if(fired||a._ug<1||G.screen||(!G.S().autoSpell&&G._ugPick!=a.k)||!C.alive().some(e=>R._ES().get(e))||(G._ugPick&&G._ugPick!=a.k)||busy())return;G._ugPick=null;const q=R._AS().get(a.k);if(!q)return;R.ccCd=0;ocs(a.k,q,true);a._ug=0;G.ultN++;G._ultT=performance.now();fired=1;G.lastUlt=D.CSKI[a.k][1];
  setTimeout(()=>{try{if(a.c.healer){C.aliveAllies().forEach(x=>{const h=x.max*.25;x.hp=Math.min(x.max,x.hp+h);C.ev.heal&&C.ev.heal(x,h)})}
   else{const T=C.alive().slice().sort((p,q)=>(q.boss?1:0)-(p.boss?1:0)).slice(0,a.c.aoe?6:3);T.forEach(t=>C.hitEnemy(t,C.ATK()*C.compMul(a.k)*4,true,{sp:'ult_'+a.k}))}
   R.hs=Math.max(R.hs||0,.08);const q2=R._AS().get(a.k);if(q2)FX.push({x:q2.x,y:q2.y,t:0,h:a.c.healer})}catch(_){}},450)})}catch(_){}return r};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||!FX.length)return;const c=R._bc(),ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
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
const lbl=()=>{const q=st();return q.n>=N?'빠른 사냥 (오늘 소진)':`<span class=qhl><img class="emi e_ui_bolt" src=assets/ui_bolt.png alt="">빠른 사냥 2시간 <em>${COST[q.n]?'<img src=assets/it2_gem.png>'+COST[q.n]:'무료'}</em> <small>${N-q.n}/${N}</small></span>`};
setInterval(()=>{try{const b=document.getElementById('idleClaim');if(!b||document.getElementById('qhBtn'))return;const m=b.closest('.modal');const q=document.createElement('span');q.id='qhBtn';q.className='pill wide '+(st().n>=N?'off':'blue');q.innerHTML=lbl();b.after(q);
 q.onclick=e=>{e.stopPropagation();const r=G.quickHunt();if(r==='max')return toast('오늘 빠른 사냥을 모두 사용했습니다');if(r==='gem')return toast('다이아가 부족합니다');m&&m.remove();try{idleBurst(r)}catch(_){}
  G.rewardPop([['it2_gold.png',r.g,'골드'],['it2_xp.png',r.x,'경험치'],['it2_exp.png',r.o,'마정구'],['it2_stone.png',r.st,'강화석']].filter(x=>x[1]>0),'빠른 사냥 · 2시간');try{updateHud()}catch(_){}}}catch(_){}},250);
})();
;(()=>{// v40 stage 권장 전투력: estimated power to clear this stage's boss within ~60% of the timer; shown by the stage name (green/red)
const BAL=D.BAL;
C.stageReq=i=>{const pl=D.BOSSPLAN[Math.floor(i/7)],b=pl&&D.BOSSES[pl[i%7==6?1:0]];if(!b)return 0;const h=C.mobHP(i)*BAL.bossHP*(i<7?.55+.45*i/7:1)*(b.s||1)*(i%7==6?BAL.chBoss:1);const dps=Math.max(1e-9,C.estDPS());return Math.ceil(C.POW()*h/(dps*BAL.bossTime*.6)*(1+.075*i)/10)*10};
setInterval(()=>{try{const el=document.getElementById('stName');if(!el)return;let t=document.getElementById('stReq');const sb=document.getElementById('battle');if(!t&&sb){t=document.createElement('span');t.id='stReq';sb.appendChild(t)}if(!t)return;
 if(C.B.br||C.B.rb||C.B.wb){t.style.display='none';return}t.style.display='';const s=C.S(),rq=C.stageReq(s.si),pw=C.POW(),ok=pw>=rq;{const k=ok+'|'+fmt(rq);if(t._k!==k||!t.firstChild){t._k=k;t.className=ok?'ok':'lo';t.innerHTML=`권장 <span class=rv><img class=hi src=assets/wb_sword.png width=13 height=14 alt="">${fmt(rq)}</span>`}}G._stReq=rq}catch(_){}},500);
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
const get=i=>{const s=st();return s.stars[i]||(i<s.maxSi||(s.done&&i==D.FIELDS.length-1)?1:0)};G.stStar=get;
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
;(()=>{['cut/lina_ult_job2.png','cut/lina_ult_job3.png','skin/lina_job2_atk.png','skin/lina_job2_cast.png','skin/lina_job3_atk.png','skin/lina_job3_cast.png'].forEach(s=>{const R0=window.RENDER;if(R0&&R0.preQ)R0.preQ(s);else{const i=new Image();i.src='assets/'+s}})})();
;(()=>{// v45 boss-fight body flag (combo banner moves off the boss band)
let on=false;setInterval(()=>{const b=!!(C.B.boss&&C.alive().some(e=>e.boss));if(b!==on){on=b;document.body.classList.toggle('bossfight',b)}},150);
// 권장 전투력 recalibration from growth sim (players clear ch3+ at well under the old estimate)
const osr=C.stageReq;C.stageReq=i=>{const v=osr(i);const k=i<=3?1:i<=10?1-(i-3)*.09:.37*Math.pow(.97,i-10);return v?Math.ceil(v*k/10)*10:v};
})();
;(()=>{// v46 scripted free 10-pull tickets on first clear of 1-7 / 2-7 (smooth early companion curve)
const GR={3:3,7:5,11:5,14:10};const oc=C.ev.clear;C.ev.clear=function(){const r=oc&&oc.apply(this,arguments);try{const s=C.S();s.fgr=s.fgr||{};for(const k in GR){if(s.maxSi>=+k&&!s.fgr[k]){s.fgr[k]=1;s.tickets=(s.tickets||0)+GR[k];G.fgrN=(G.fgrN||0)+1;(()=>{const n=GR[k];let tries=0;const put=()=>{const v=[...document.querySelectorAll('.vic.win:not(.out)')].pop(),vr=v&&v.querySelector('.vr');if(vr&&!vr.querySelector('.tkg')){vr.insertAdjacentHTML('beforeend',`<span class="fcl tkg"><img class=ci src=assets/it2_ticket.png> +${n}<small>소환권 보상</small></span>`);return}if(tries++<40)setTimeout(put,100);else try{toast(`<img class="emi e_fr_gift" src=assets/fr_gift.png alt="">동료 소환권 ×${n} 지급`)}catch(_){}};put();setTimeout(()=>{try{toast(`<b style="color:#ffd77a"><img class="emi e_fr_gift" src=assets/fr_gift.png alt="">동료 소환권 ×${n}</b> 지급 · 소환 탭에서 사용`);updateHud()}catch(_){}},5200)})()}}}catch(_){}return r};
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
const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab=='mission'){const p=$('#panel');if(!p.querySelector('.mcall')){const {d,w}=ready(),n=d.length+w.length;const b=document.createElement('div');b.className='mcall '+(n?'':'off');b.innerHTML=`<img class="emi e_fr_gift" src=assets/fr_gift.png alt="">모두 받기${n?` <small>${n}</small>`:''}`;b.onclick=()=>G.missionClaimAll();p.insertBefore(b,p.firstChild)}}}catch(_){}return r};
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
 <div class=nbd>${T.map((r,d)=>{const lk=d>=D0,rd=!lk&&r.some((_,i)=>can(d,i)),ok=r.every((_,i)=>st().c[d+'_'+i]);return `<span class="nbt ${d==sel?'on':''} ${lk?'lk':''} ${ok?'ok':''} ${rd?'rd':''}" data-d=${d}>${lk?'<img class="emi e_sk_lock" src=assets/sk_lock.png alt="">':ok?'<img class="emi e_pass_check" src=assets/pass_check.png alt="">':''}${d+1}일</span>`}).join('')}</div>
 <div class=nbl>${sel>=D0?`<div class=nblk><img class="emi e_sk_lock" src=assets/sk_lock.png alt="">${sel+1}일차에 개방됩니다</div>`:T[sel].map((t,i)=>{const v=val(t[0]),c=st().c[sel+'_'+i],dn=v>=t[1];return `<div class=nbr><div class=f><b>${t[2]}</b><div class=nbp><i style="width:${Math.min(100,v/t[1]*100)}%"></i><em>${Math.min(v,t[1]).toLocaleString()}/${t[1].toLocaleString()}</em></div><div class=rl>${chip(t[3])}</div></div><span class="btn ${c||!dn?'off':''}" data-c=${i}>${c?'완료':dn?'받기':'진행 중'}</span></div>`}).join('')}</div>
 <div class="nbf ${allC()&&!st().fin?'rd':''}"><div class=f><b>전체 완료 보상</b><small>${got}/${tot} 미션</small><div class=rl>${chip(FIN)}</div></div><span class="btn ${allC()&&!st().fin?'':'off'}" id=nbFin>${st().fin?'수령 완료':'받기'}</span></div>
 <span class="btn wide" data-x style="margin-top:10px">닫기</span></div>`;
 document.body.appendChild(m);
 m.onclick=e=>{if(e.target==m||e.target.dataset.x!=null){m.remove();refresh();return}const t=e.target.closest('[data-d]');if(t){G.nbOpen(+t.dataset.d);return}const c=e.target.closest('[data-c]');if(c){const w=G.nbClaim(sel,+c.dataset.c);if(w){G.nbOpen(sel);try{rewardPop(rl(w),'7일 이벤트 보상')}catch(_){}}return}if(e.target.id=='nbFin'){const w=G.nbFin();if(w){G.nbOpen(sel);try{rewardPop(rl(w),'7일 이벤트 전체 완료!')}catch(_){}}}}};
const btn=document.createElement('span');btn.id='nbBtn';btn.className='pill';btn.innerHTML='<img class=hi src=assets/fr_gift.png width=12 height=14 alt="">7일';btn.onclick=e=>{e.stopPropagation();G.nbOpen()};
const place=()=>{const b=document.getElementById('bufBtn');if(b&&!document.getElementById('nbBtn'))b.after(btn)};
const refresh=()=>{place();const s=st();const gone=s.fin&&allC();$sd(btn,gone?'none':'');btn.classList.toggle('rd',nReady()>0)};
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
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const k=key();if(last!==null&&k!==last){const x=st();const [a,b]=last.split('_').map(Number);if((x.rt?x.rt.r:0)>a)toast(`<img class="emi e_fx_success" src=assets/fx_success.png alt="">${D.RAR[x.rt.r].n}+ 세트 효과 발동! 공격력·체력 +${x.rt.a}%`);else if((x.et?x.et.n:0)>b)toast(`<img class="emi e_fx_success" src=assets/fx_success.png alt="">강화 합계 +${x.et.n} 세트 발동! 공격력 +${x.et.a}%`)}last=k}catch(e){}return r};
})();
;(()=>{// v55 전투력 분석 (프로필 탭 → 전투력 구성 + 성장 추천)
const pc=v=>Math.round((v||0)*100);const sf=f=>{try{return f()||0}catch(_){return 0}};
G.powInfo=()=>{const s=C.S(),A=C.ATK(),H=C.MAXHP(),cp=s.party.reduce((a,k)=>a+A*4*C.compMul(k),0),parts=[['마법 공격',A*10,'#ff7a5a'],['체력',H,'#5ad07a'],['방어·치명',C.stat('def')*20+C.stat('crit')*50,'#5ab0ff'],['동료',cp,'#c08aff']],tot=parts.reduce((a,x)=>a+x[1],0)||1;
 const bon=[['장비 세트',sf(()=>C.gearSet().atk),sf(()=>C.gearSet().hp),'gear'],['도감',sf(()=>C.codexB().atk+(C.cdxB?C.cdxB('atk'):0)),sf(()=>C.codexB().hp+(C.cdxB?C.cdxB('hp'):0)),'codex'],['기보',sf(()=>C.relicB('atk')),sf(()=>C.relicB('hp')),'relic'],['동료 시너지',sf(()=>C.synergy().reduce((a,x)=>a+x.atk,0)),sf(()=>C.synergy().reduce((a,x)=>a+x.hp,0)),'party'],['펫',sf(()=>C.petB&&C.petB('atk')),sf(()=>C.petB&&C.petB('hp')),'pet'],['협회',sf(()=>C.gBuf&&C.gBuf('atk')+Object.keys(s.guild.don).length*BAL.donate.buff+.02*(s.guild.lv-1)),sf(()=>C.gBuf&&C.gBuf('hp')),'guild'],['칭호',sf(()=>((C.titleCur()||{}).atk||0)/100),0,'title']];
 return{tot,parts,bon,req:C.stageReq(s.maxSi)}};
G.powOpen=()=>{const I=G.powInfo(),BD=G.BD||{},r=C.POW()/I.req;
 const rec=[['enhance','장비 강화','장비 +1마다 능력치 +10%'],['train','마력 수련','레벨·스탯 단련'],['summon','동료 소환','동료 1명당 공격력 ×4 기여'],['relic','기보','공격력·체력 %'],['pet','펫','추가 % 보너스']];
 modal(`<div class="ttl pwt" style="justify-content:center;font-size:18px">전투력 분석</div><div class=pwnk><b>${G.nick()}</b> <span id=nkEd><img class="emi e_ic_quill" src=assets/ic_quill.png alt="">변경</span></div><div class=pwbig><img class="emi e_ic3_arena" src=assets/ic3_arena.png alt="">${fmt(C.POW())}<small class="${r>=1?'up':'dn'}">현재 스테이지 권장 ${fmt(I.req)} (${Math.round(r*100)}%)</small></div>
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
 el.innerHTML=shell('친구','bg_guild.jpg',`<div class="card frh"><span class=frp><img class="emi e_bd_heart_full" src=assets/bd_heart_full.png alt=""></span><div class=f><b>우정 포인트 ${fmt(t.pt)}</b><small>하트 보내기 +5 · 받기 +10 · 매일 05:00 초기화</small></div></div>
 <div class="card frb"><span class="pill ${FR.some(f=>!t.sent[f.k])?'green':'off'}" id=frSA><img class=\"emi e_fr_heart_send\" src=assets/fr_heart_send.png alt=\"\">모두 보내기</span><span class="pill ${FR.some(canGet)?'green':'off'}" id=frGA><img class=\"emi e_fr_gift\" src=assets/fr_gift.png alt=\"\">모두 받기</span></div>
 <div class=card><div class=ttl>친구 목록 <small>${FR.length}/30</small></div>${FR.map(f=>`<div class="row frr"><img src="${A}${f.img}"><div class=f><b>${f.n}</b><small>Lv.${Math.max(1,L+f.lv)} · <img class="ci frp" src=assets/ic3_arena.png> ${fmt(Math.round(P*f.m))}</small></div><span class="frx ${t.sent[f.k]?'off':''}" data-s=${f.k}>${t.sent[f.k]?'<img class="emi e_pass_check" src=assets/pass_check.png alt="">':'<img class="emi e_fr_heart_send" src=assets/fr_heart_send.png alt="">'}</span><span class="frx ${canGet(f)?'on':'off'}" data-g=${f.k}>${canGet(f)?'<img class="emi e_fr_gift" src=assets/fr_gift.png alt="">':t.got[f.k]?'<img class="emi e_pass_check" src=assets/pass_check.png alt="">':'—'}</span></div>`).join('')}</div>
 <div class=card><div class=ttl>우정 상점 <small>매일 초기화</small></div><div class=frs>${SH.map(it=>{const b=t.buy[it.k]||0,ok=b<it.lim&&t.pt>=it.c;return `<div class="frsi ${ok?'':'off'}" data-b=${it.k}><img src="assets/${it.img}"><b>${it.n}</b><small><img class="emi e_bd_heart_full" src=assets/bd_heart_full.png alt="">${it.c} · ${b}/${it.lim}</small></div>`}).join('')}</div></div>`);
 const b=el.querySelector('#sBack');if(b)b.onclick=()=>closeScreen();
 const fx=(n,w)=>{if(n){toast(`${w} ${n}명 · 우정 포인트 +${n*(w=='하트 보내기'?5:10)}`)}draw();updateHud()};
 el.querySelector('#frSA').onclick=()=>fx(send(),'하트 보내기');el.querySelector('#frGA').onclick=()=>fx(get(),'선물 받기');
 el.querySelectorAll('[data-s]').forEach(e=>e.onclick=()=>fx(send(e.dataset.s),'하트 보내기'));el.querySelectorAll('[data-g]').forEach(e=>e.onclick=()=>fx(get(e.dataset.g),'선물 받기'));
 el.querySelectorAll('[data-b]').forEach(e=>e.onclick=()=>{const it=G.frBuy(e.dataset.b);if(!it)return toast('우정 포인트가 부족하거나 구매 한도입니다');updateHud();draw();rewardPop([[it.img,it.n.split(' ×')[1]||1,it.n.split(' ×')[0]]],'우정 상점')})};
const rs=renderScreen;renderScreen=function(){if(G.screen=='friend'){scr0();return draw()}return rs.apply(this,arguments)};const scr0=()=>{};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const a=document.querySelector('#mgrid a[data-s=friend]');if(a){let d=a.querySelector('.dot');if(!d){d=document.createElement('span');d.className='dot';a.appendChild(d)}const on=C.frRed();$sd(d,on?'':'none');if(on){const m=document.querySelector('#sidemenu .dot');if(m&&m.style.display!=='')m.style.display=''}}}catch(_){}return r};
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
const upd=()=>{const b=btn();if(!b)return;const o=st(),nx=T.findIndex((t,i)=>!o.c[i]);if(nx<0){b.style.display='none';return}b.style.display='';const r=ready().length;b.classList.toggle('rdy',r>0);{const h=r?`<img class=hi src=assets/ui_timer.png width=9 height=14 alt="">받기<span class=dot></span>`:`<img class=hi src=assets/ui_timer.png width=9 height=14 alt="">${fm(T[nx].m*60-o.sec)}`;if(b._h!==h){b._h=h;b.innerHTML=h}}};
G.olOpen=()=>{const o=st();modal(`<div class=ttl style="justify-content:center;font-size:18px">접속 보상</div><small style="display:block;text-align:center;opacity:.75">오늘 플레이 ${Math.floor(o.sec/60)}분 · 매일 05:00 초기화</small><div class=oll>${T.map((t,i)=>{const ok=o.sec>=t.m*60,c=o.c[i];return `<div class="olr ${c?'got':ok?'rdy':''}"><b>${t.m}분</b><span>${t.n}</span><em>${c?'<img class="emi e_pass_check" src=assets/pass_check.png alt="">수령':ok?'받기 가능':fm(t.m*60-o.sec)}</em></div>`}).join('')}</div><span class="pill green wide ${ready().length?'':'off'}" id=olGo style="margin-top:10px;justify-content:center"><img class=\"emi e_fr_gift\" src=assets/fr_gift.png alt=\"\">모두 받기</span>`);
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
 [['gourry','리나, 발밑에 땅이 없어! 구름이야, 구름!'],['xel','천공의 신전… 신들의 시련이 잠든 곳이지요.'],['amelia','정의의 시련이라면 피할 수 없어요!'],['lina','신이든 수호자든 상관없어. 정상까지 단숨에 날아오른다!']],
 [['amelia','리나 씨, 숨… 숨이 쉬어져요! 바닷속인데!'],['xel','해신의 결계 덕분이지요. 다만, 손님을 반기는 결계는 아닙니다.'],['lina','반기든 말든! 잠든 바다째로 깨워 주겠어!']]];
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
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const el=$('#screen'),c=el.querySelector('.card');if(c&&!el.querySelector('#nkRow')){c.insertAdjacentHTML('beforebegin',`<div class="card row" id=nkRow><div class=f><b>닉네임</b><small style="display:block;opacity:.7">${G.nick()}</small></div><span class="pill green" id=nkBtn><img class="emi e_ic_quill" src=assets/ic_quill.png alt="">변경</span></div>`);el.querySelector('#nkBtn').onclick=()=>G.nickEdit()}}}catch(_){}return r};
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
const btn=()=>{const bt=document.getElementById('battle');if(!bt||document.getElementById('svBtn'))return;const b=document.createElement('span');b.id='svBtn';b.className='pill';b.innerHTML='<img class=hi src=assets/ic_moon.png width=12 height=14 alt="">';b.title='절전 모드';b.onclick=()=>G.saverOn();bt.appendChild(b)};
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{btn()}catch(_){}return r};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const el2=$('#screen'),nk=el2.querySelector('#nkRow');if(nk&&!el2.querySelector('#svRow')){nk.insertAdjacentHTML('afterend',`<div class="card row" id=svRow><div class=f><b>절전 모드</b><small style="display:block;opacity:.7">화면을 끄고 방치 사냥 · 배터리 절약</small></div><span class="pill" id=svGo><img class="emi e_ic_moon" src=assets/ic_moon.png alt="">켜기</span></div>`);el2.querySelector('#svGo').onclick=()=>{closeScreen();G.saverOn()}}}}catch(_){}return r};
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
const place=()=>{const AS=R._AS&&R._AS();if(AS)live.forEach(o=>{const s=AS.get(o.k);if(!s)return;if(!o.w)o.w=o.d.offsetWidth;const w=o.w||100,x=Math.max(56+w/2,Math.min(328-w/2,s.x)),y=s.y-118;{const f=!!(R._dtTop2&&y>279&&y-40<358||R._dloB&&y>362&&y-40<474);if(o.f!==f){o.f=f;o.d.classList.toggle('bfd',f)}}/* r369 perf: 0.5px-quantised, string + style write only when the position actually moves */const qx=Math.round(x*2)/2,qy=Math.round(y*2)/2;if(o.qx!==qx||o.qy!==qy){o.qx=qx;o.qy=qy;o.d.style.transform=`translate(${qx}px,${qy}px) translate(-50%,-100%)`}})};(G._post=G._post||[]).push(place);/* r314: runs after the canvas frame, not in its own earlier rAF */
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
G.itemData=I;/* r340: read-only handle for the 가방 detail card */G.itemInfo=img=>{const d=I[img];if(!d)return;const s=C.S(),own={it2_gold:s.gold,it2_gem:s.gems,it2_exp:s.orbs,it2_ticket:s.tickets||0,it2_hp:s.pot||0,it2_mp:s.mpot||0,it2_stone:s.stone||0,it3_dungeonkey:s.dkey||0,it3_guildcoin:s.gcoin||0,it3_arenatoken:s.atoken||0,it3_mileagestar:s.mile||0}[img]||0;
 modal(`<div class=iih><img src="${A}${img}.png"><div><b>${d[0]}</b><small>보유 ${fmt(own)}</small></div></div><p class=iid>${d[1]}</p><div class=iis>사용처</div><div class=iig>${d[2].map(x=>`<span class=iigo data-g=${x[0]}>${x[1]} ▶</span>`).join('')}</div><div class=iis>획득처</div><div class=iig>${d[3].map(x=>`<span class=iigo data-g=${x[0]}>${x[1]} ▶</span>`).join('')}</div>`);
 document.querySelectorAll('.iigo').forEach(e=>e.onclick=()=>go(e.dataset.g))};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='bag'){$('#screen').querySelectorAll('.bagg .bi').forEach(b=>{const im=b.querySelector('img');if(!im)return;const m=(im.getAttribute('src')||'').match(/(it\d_[a-z]+)\.png$/);if(m&&I[m[1]]){b.classList.add('tap');b.onclick=()=>G.itemInfo(m[1])}})}}catch(_){}return r};
})();
;(()=>{// v65 오늘의 할 일 (메뉴 상단 바로가기 · 레드닷 모음)
const N={mail:'우편 수령',event:'출석 체크',summon:'동료 소환',mission:'지령 보상',base:'영지 수확',arena:'투기장 도전',guild:'협회 기부',dungeon:'던전 도전',explore:'탐험 보상',enhance:'장비 강화',wboss:'월드보스',ach:'업적 보상',pass:'패스 보상',friend:'친구 하트'};
const list=()=>{const B=G.BD||{},o=[];for(const k in N){const on=k=='friend'?(C.frRed&&C.frRed()):B[k];if(on&&(!G.isOpen||G.isOpen(k)))o.push(k)}if(G.nbState){try{const s=G.nbState();if(s&&s.ready)o.unshift('nb')}catch(_){}}if(G.olState&&G.olState().ready)o.unshift('ol');return o};
G.todoList=list;
const draw=()=>{const p=document.getElementById('mgrid');if(!p)return;let t=document.getElementById('todoBar');if(!t){t=document.createElement('div');t.id='todoBar';p.parentNode.insertBefore(t,p)}const L=list();
 t.innerHTML=`<div class=tdh><img class="emi e_ic3_quest" src=assets/ic3_quest.png alt="">오늘의 할 일 <small>${L.length?L.length+'개':'모두 완료!'}</small></div><div class=tdl>${L.length?L.map(k=>`<span class=tdc data-k=${k}>${k=='nb'?'7일 이벤트':k=='ol'?'접속 보상':k=='guild'?(()=>{const q=C.S();return !q.gj?'협회 가입':q.raid.tries<BAL.raid.tries?'협회 토벌':(!q.guild.don.gold&&q.gold>=C.donateCost('gold'))||(!q.guild.don.gem&&q.gems>=BAL.donate.gem)?'협회 기부':'협회 출석'})():N[k]} ▶</span>`).join(''):'<span class=tdd><img class="emi e_pass_check" src=assets/pass_check.png alt="">할 일을 모두 끝냈어요</span>'}</div>`;
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
const om=menuGo;menuGo=function(k){if(k in U&&!G.isOpen(k)){toast(`<img class="emi e_sk_lock" src=assets/sk_lock.png alt="">${NM[k]}: ${C.stageName(U[k])} 도달 시 개방`);return}return om.apply(this,arguments)};
const mark=()=>{document.querySelectorAll('#mgrid a,.side a').forEach(a=>{const k=a.dataset.s;const lk=k in U&&!G.isOpen(k);a.classList.toggle('lk',lk);let t=a.querySelector('.lkt');if(lk&&!t){t=document.createElement('span');t.className='lkt';t.innerHTML='<img class="emi e_sk_lock" src=assets/sk_lock.png alt="">'+C.stageName(U[k]);a.appendChild(t)}else if(!lk&&t)t.remove();if(lk){const d=a.querySelector('.dot');if(d)$sd(d,'none')}})};
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
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{if(G.screen=='settings'){const e2=$('#screen'),sv=e2.querySelector('#svRow');if(sv&&!e2.querySelector('#ntRow')){sv.insertAdjacentHTML('afterend',`<div class="card row" id=ntRow><div class=f><b>공지사항</b><small style="display:block;opacity:.7">이벤트 · 업데이트 소식</small></div><span class="pill" id=ntGo><img class="emi e_ic_horn" src=assets/ic_horn.png alt="">보기</span></div>`);e2.querySelector('#ntGo').onclick=()=>{closeScreen();G.noticeOpen()}}}}catch(_){}return r};
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
 party:['편성','최대 4명의 동료와 함께 싸워요. 상성(빛·혼돈·자연)이 맞으면 피해 증가.','같은 진영 동료를 모으면 시너지 보너스가 발동해요.'],
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
G.help=k=>{const h=H[k];if(!h)return;modal(`<div class=ttl style="justify-content:center;font-size:18px"><img class="emi e_ui_help" src=assets/ui_help.png alt="">${h[0]} 도움말</div><ul class=hlp>${h.slice(1).map(x=>`<li>${x}</li>`).join('')}</ul>`)};G.HELP=H;
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
 <div class=bip><b>보스 패턴</b><ul><li><img class="emi e_ui_warn" src=assets/ui_warn.png alt="">붉은 장판 공격 — 빠른 동료는 회피 확률 증가</li><li><img class="emi e_fx_crit" src=assets/fx_crit.png alt="">브레이크 게이지를 채우면 그로기(피해 +50%)</li><li><img class="emi e_ui_timer" src=assets/ui_timer.png alt="">제한 시간 안에 처치하지 못하면 실패</li></ul></div>
 <span class="pill ${r>=1?'green':''} wide" id=biGo style="justify-content:center;margin-top:8px">${r>=1?'<img class="emi e_ic3_arena" src=assets/ic3_arena.png alt="">보스 도전':'<img class="emi e_st_atk" src=assets/st_atk.png alt="">성장하러 가기'}</span>`);
 document.getElementById('biGo').onclick=()=>{document.querySelectorAll('.modal').forEach(m=>m.remove());if(r>=1){if(s.wave>=3&&!C.B.boss){s.failPow=0;C.startBoss()}else toast('웨이브를 모두 처치하면 보스가 등장해요')}else G.powOpen?G.powOpen():openSheet('train')}};
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#stagebar .sboss')&&!G.screen){e.stopPropagation();G.bossInfo()}},true);
})();
/* v72 보스 도전 기록 */
(()=>{const C=G.C,rec=()=>{const s=C.S();return s.brec=s.brec||{}};
const sb=C.startBoss;C.startBoss=(...a)=>{const was=C.B.boss,r=sb(...a);if(!was&&C.B.boss){G._brSi=C.S().si;G._brT=Date.now()}return r};
const fin=w=>{if(G._bs)G._bs.kt=Date.now();const i=G._brSi;if(i==null)return;G._brSi=null;const o=rec()[i]=rec()[i]||{n:0,w:0};o.n++;if(w){o.w++;const t=Math.round((Date.now()-((G._bs&&G._bs.t)||G._brT))/100)/10;if(!o.t||t<o.t){if(o.t)G._brPut(t,o.t);o.t=t}}};
const oc=C.ev.clear;C.ev.clear=function(){fin(1);return oc&&oc.apply(this,arguments)};
const of=C.ev.fail;C.ev.fail=function(){fin(0);return of&&of.apply(this,arguments)};
G._brPut=()=>{let k=0;const put=()=>{const v=[...document.querySelectorAll('.vic.win:not(.out)')].pop();if(v){v.querySelector('.nrec')||v.insertAdjacentHTML('afterbegin','<div class=nrec><img class="emi e_ic3_trophy" src=assets/ic3_trophy.png alt="">최단 기록 갱신!</div>');return}if(k++<40)setTimeout(put,100)};put()};
const ob=G.bossInfo;G.bossInfo=()=>{ob();const o=rec()[C.S().si],m=document.querySelector('.modal .bip');if(!m)return;m.insertAdjacentHTML('beforebegin',`<div class=bir><span>도전 기록</span><b>${o?`${o.w}승 ${o.n-o.w}패${o.t?` · 최단 ${o.t}초`:''}`:'첫 도전'}</b></div>`)};
})();
/* v73 동료 전투불능/부활 연출 (시각 전용) */
(()=>{const C=G.C,DW=new Map(),RV=[];
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=R._bc(),AS=R._AS&&R._AS();if(!c||!AS)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
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
 const h=`<div class="card pset"><div class=ttl>편성 프리셋 <small><img class=ppi src=assets/pp_load.png>탭: 불러오기 · <img class=ppi src=assets/pp_save.png>: 현재 편성 저장</small></div><div class=psr>${P.map((p,i)=>{const on=p&&p.join()==cur;return `<div class="psl ${p?'':'emp'} ${on?'on':''}" data-pi=${i}><b>${i+1}</b><div class=psi>${p?(p.length?p.map(k=>{const c=D.COMPS.find(x=>x.k==k);return c?`<img src="${A}${c.img}">`:''}).join(''):'<small>리나 단독</small>'):'<small>비어 있음</small>'}</div><span class=pss data-ps=${i}><img src=assets/pp_save.png alt="저장"></span></div>`}).join('')}</div></div>`;
 c1.insertAdjacentHTML('afterend',h);
 sb.querySelectorAll('.psl').forEach(el=>el.onclick=e=>{const i=+el.dataset.pi;if(e.target.closest('.pss')){P[i]=s.party.slice();toast(`프리셋 ${i+1}에 저장했습니다`);G.save&&G.save();renderScreen();return}const p=P[i];if(!p)return toast('먼저 <img class=ppi src=assets/pp_save.png>로 현재 편성을 저장하세요');const q=p.filter(k=>s.comps[k]).slice(0,4);s.party=q;C.buildAllies();C.refreshMax();toast(`프리셋 ${i+1} 편성 적용 · 전투력 ${fmt(C.POW())}`);renderScreen()})}}}catch(_){}return r}})();
/* v76 보유 동료 정렬/필터 */
(()=>{const C=G.C,SO=[['def','기본'],['rar','등급'],['lv','레벨'],['fac','세력']];const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='party'){const cards=[...document.querySelectorAll('#screen .rcard[data-c]')];if(!cards.length||document.querySelector('#screen .csort'))return r;const s=C.S(),o=s.csort=s.csort||{k:'def',own:0},box=cards[0].parentNode,ttl=box.querySelector('.ttl');
 const ri=c=>Object.keys(D.RAR).indexOf(String(c.g)),fi=c=>Object.keys(D.FACTIONS).indexOf(c.fac);
 const key=k=>{const c=D.COMPS.find(x=>x.k==k),lv=s.comps[k]||0,inP=s.party.includes(k)?1:0;return [lv?0:1,o.k=='rar'?-ri(c):o.k=='lv'?-lv:o.k=='fac'?fi(c):0,-inP,D.COMPS.indexOf(c)]};
 const cmp=(a,b)=>{const x=key(a.dataset.c),y=key(b.dataset.c);for(let i=0;i<x.length;i++)if(x[i]!=y[i])return x[i]-y[i];return 0};
 ttl.insertAdjacentHTML('afterend',`<div class=csort>${SO.map(([k,n])=>`<span class="cso ${o.k==k?'on':''}" data-so=${k}>${n}</span>`).join('')}<span class="cso own ${o.own?'on':''}" data-own=1>${o.own?'<img class="emi e_pass_check" src=assets/pass_check.png alt="">':'<img class="emi e_dc_off" src=assets/dc_off.png alt="">'} 보유만</span></div>`);
 cards.sort(cmp).forEach(c=>{box.appendChild(c);$sd(c,o.own&&!s.comps[c.dataset.c]?'none':'')});
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
 abyss:{n:14,mk:(w,h)=>({x:rnd(0,w),y:h+20,vx:rnd(-6,6),vy:-rnd(30,60),r:rnd(3,7),c:'#e8fbff',k:'bub'})},
 sky:{n:16,mk:(w,h)=>({x:-60,y:rnd(h*.15,h*.95),vx:rnd(90,150),vy:rnd(-4,4),r:rnd(20,46),c:'#ffffff',k:'wind'})},
 volcano:{n:30,mk:(w,h)=>(Math.random()<.6?{x:rnd(0,w),y:h+6,vx:rnd(-14,14),vy:rnd(-110,-60),r:rnd(3,4.8),c:'#fffbe0',k:'ember',ph:rnd(0,6)}:{x:rnd(-20,w),y:-8,vx:rnd(-6,10),vy:rnd(32,52),r:rnd(1.8,3.2),c:'#3a302c',k:'ash',ph:rnd(0,6)})}};
G.weather=()=>cur;
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||(G.saverState&&G.saverState())||(R.opt&&!R.opt.fx)){P.length=0;return}const c=R._bc();if(!c)return;const w=c.clientWidth,h=c.clientHeight,f=R.bgOv?'':D.FIELDS[C.S().si%D.FIELDS.length],cf=W[f];if(f!==cur){cur=f;P.length=0;if(cf)for(let i=0;i<cf.n;i++){const q=cf.mk(w,h);q.x=rnd(0,w);if(q.k!='ember'&&q.k!='bub')q.y=rnd(0,h);if(q.k=='bub')q.y=rnd(h*.3,h);q.life=rnd(0,1);P.push(q)}}if(!cf)return;
 const rt=R.hsRealDt||dt;acc+=rt*cf.n/4;while(acc>1&&P.length<cf.n){acc--;const q=cf.mk(w,h);q.life=0;P.push(q)}if(P.length>=cf.n)acc=0;
 const ctx=c.getContext('2d'),sc=c.width/w,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=P.length-1;i>=0;i--){const q=P[i];q.life+=rt*.25;q.x+=q.vx*rt;q.y+=q.vy*rt;if(q.k=='snow'||q.k=='ash')q.x+=Math.sin(T*1.5+q.ph)*12*rt;if(q.k=='mote'){q.x+=Math.sin(T*.9+q.ph)*10*rt}if(q.rot!=null)q.rot+=q.vr*rt;
  if(q.x<-30||q.x>w+30||q.y>h+20||q.y<-30||q.life>1.6){P.splice(i,1);continue}
  const fa=Math.min(1,q.life*4)*Math.min(1,(1.6-q.life)*3);ctx.fillStyle=q.c;
  if(q.k=='petal'||q.k=='leaf'){ctx.globalAlpha=.75*fa;ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot);ctx.scale(1,Math.abs(Math.cos(q.rot*1.3))*.7+.3);ctx.beginPath();ctx.ellipse(0,0,q.r,q.r*.55,0,0,7);ctx.fill();ctx.restore()}
  else if(q.k=='bub'){q.x+=Math.sin(T*2+q.y*.05)*8*rt;ctx.globalAlpha=.7*fa;ctx.strokeStyle='#ffffff';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,6.283);ctx.stroke();ctx.globalAlpha=.5*fa;ctx.beginPath();ctx.arc(q.x-q.r*.35,q.y-q.r*.35,q.r*.3,0,6.283);ctx.fill()}else if(q.k=='wind'){ctx.globalAlpha=.22*fa;ctx.fillRect(q.x,q.y,q.r*3,1.6);ctx.globalAlpha=.12*fa;ctx.beginPath();ctx.ellipse(q.x+q.r,q.y+6,q.r,q.r*.22,0,0,7);ctx.fill()}else if(q.k=='sand'){ctx.globalAlpha=.45*fa;ctx.fillRect(q.x,q.y,q.r*9,q.r*.8)}
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
(()=>{const C=G.C;const ok=C.ev.kill;C.ev.kill=function(e){try{if(e&&e.boss&&!e.wb&&!G.screen&&(!R.opt||R.opt.shake)){const q=R._ES().get(e),c=R._bc();if(q&&c){const h=(e.sc||1)*90;c.style.transformOrigin=`${q.x}px ${q.y-h*.5}px`;c.style.transition='transform .35s cubic-bezier(.2,.9,.3,1)';c.style.transform='scale(1.18)';clearTimeout(G._fzT);G._fzT=setTimeout(()=>{c.style.transition='transform .6s ease-in-out';c.style.transform='';setTimeout(()=>{c.style.transition='';c.style.transformOrigin=''},650)},1000)}}}catch(_){}return ok&&ok.apply(this,arguments)};})();
/* v81 보스 착지 충격 연출 */
(()=>{const C=G.C;const seen=new WeakSet();let FXs=[];
const of=R.frame;R.frame=dt=>{of(dt);try{const bo=C.alive().find(e=>e.boss&&!e.wb);if(bo&&!seen.has(bo)){const q=R._ES().get(bo);if(q&&q.enter>=1){seen.add(bo);if(!G.screen&&(!R.opt||R.opt.fx)){const s=bo.sc||1,cr=[];for(let i=0;i<9;i++){const a=i/9*6.283+Math.random()*.4,L=50+Math.random()*60;cr.push([a,L*s])}const du=[];for(let i=0;i<22;i++){const a=Math.random()*6.283;du.push({a,v:60+Math.random()*120,r:8+Math.random()*12})}FXs.push({e:bo,t:0,s,cr,du});if(!R.opt||R.opt.shake){const c=R._bc();if(c){c.classList.remove('bland');void c.offsetWidth;c.classList.add('bland');setTimeout(()=>c.classList.remove('bland'),520)}}}}}
 if(!FXs.length||G.screen)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=FXs.length-1;i>=0;i--){const f=FXs[i];f.t+=dt;const q=R._ES().get(f.e);if(f.t>1.6||!q){FXs.splice(i,1);continue}const x=q.x,y=q.y,t=f.t;
  const ca=t<1?1:(1.6-t)/.6;ctx.globalAlpha=.8*ca;ctx.strokeStyle='#1a0e06';ctx.lineWidth=3.5;ctx.beginPath();for(const [a,L] of f.cr){const k=Math.min(1,t/.12);ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*L*.55*k,y+Math.sin(a)*L*.2*k);ctx.lineTo(x+Math.cos(a+.25)*L*k,y+Math.sin(a+.25)*L*.36*k)}ctx.stroke();
  for(let j=0;j<2;j++){const k=(t-j*.12)/.75;if(k<=0||k>=1)continue;ctx.globalAlpha=(1-k);ctx.strokeStyle=j?'#ffb84a':'#ffffff';ctx.lineWidth=(1-k)*16+2;const R0=40+k*230*f.s;ctx.beginPath();ctx.ellipse(x,y,R0,R0*.32,0,0,7);ctx.stroke()}
  const dk=Math.min(1,t/.9);for(const d of f.du){const r=d.r*.8*(1+dk*1.2),px=x+Math.cos(d.a)*d.v*Math.sqrt(dk)*f.s,py=y+Math.abs(Math.sin(d.a))*d.v*.22*Math.sqrt(dk)-dk*6;ctx.globalAlpha=(1-dk)*.5;ctx.fillStyle='#e6dccb';ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill()}}
 ctx.restore()}catch(_){}};})();
/* v82 웨이브 배너 */
(()=>{const C=G.C;const os=C.ev.spawn;C.ev.spawn=function(){const r=os&&os.apply(this,arguments);try{const s=C.S();if(C.B.boss||G.screen||(G.saverState&&G.saverState())||G.storyOn)return r;const w=Math.min(3,(s.wave||0)+1),fin=w>=3;const b=document.getElementById('battle');if(!b)return r;b.querySelectorAll('.wvb').forEach(x=>x.remove());let d=G._wvT;/* r395: one reused transient node (the v199 ribbon reads its <b> and removes it in the same spawn call) */if(!d||d.isConnected||!d.querySelector('b')){d=G._wvT=document.createElement('div');d.innerHTML='<i></i><b></b><i></i>'}d.className='wvb'+(fin?' fin':'');d.removeAttribute('style');d.querySelector('b').innerHTML=fin?'FINAL WAVE':'WAVE '+w+'<small>/3</small>';b.appendChild(d);clearTimeout(d._tm);d._tm=setTimeout(()=>d.remove(),1300)}catch(_){}return r}})();

/* v83 멀티 킬 연출 (시각 전용) */
(()=>{const C=G.C;const ok=C.ev.kill;let n=0,t0=0,tm=0;C.ev.kill=function(e){const r=ok&&ok.apply(this,arguments);try{if(!e||e.boss||e.wb||G.screen||(G.saverState&&G.saverState())||G.storyOn)return r;const now=performance.now();if(now-t0<700)n++;else{n=1;t0=now}if(n<2)return r;clearTimeout(tm);tm=setTimeout(()=>{const k=n;const b=document.getElementById('battle');if(!b||b.querySelector('.wvb,.wclr'))return;b.querySelectorAll('.mkb').forEach(x=>x.remove());const d=document.createElement('div');d.className='mkb'+(k>=4?' k4':k>=3?' k3':'');d.innerHTML=`<b>${k>=4?'MULTI KILL':k==3?'TRIPLE KILL':'DOUBLE KILL'}</b>${k>=4?'<small>×'+Math.min(k,9)+'</small>':''}`;b.appendChild(d);setTimeout(()=>d.remove(),1200)},180)}catch(_){}return r}})();

/* v84 보스 HP 구간 눈금 + 구간 돌파 파편 (시각 전용) */
(()=>{const C=G.C,R=G.R||window.RENDER;let last=4,bid=null,SH=[],FL=null;const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=R._bc();if(!c)return;const bo=C.alive().find(e=>e.boss);if(!bo){bid=null;SH.length=0;return}const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,x0=104,bw=W-232,y=226+15;if(bid!==bo){bid=bo;last=Math.ceil(bo.hp/bo.max*4)}const q=Math.ceil(Math.max(0,bo.hp)/bo.max*4);if(q<last&&bo.hp>0){last=q;G._phase&&G._phase(q);const bx=x0+bw*q/4;if(!(G.saverState&&G.saverState())){for(let i=0;i<12;i++){const a=-Math.PI*Math.random(),v=60+Math.random()*110;SH.push({x:bx,y:y+3,vx:Math.cos(a)*v,vy:Math.sin(a)*v-20,r:Math.random()*6,vr:Math.random()*16-8,t:0})}FL={x:bx,t:0}}}else if(q>last)last=q;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);for(let k=1;k<4;k++){const tx=x0+bw*k/4;ctx.fillStyle='#1a0008';ctx.fillRect(tx-2.5,y-1,5,9);ctx.fillStyle=k<q?'#fff6d8':'#8a6a70';ctx.fillRect(tx-1.5,y,3,7)}/* r308: quarter ticks kept to the HP bar line (241-248), off the boss name row */if(FL){FL.t+=dt;const k=FL.t/.4;if(k>=1)FL=null;else{const g=ctx.createRadialGradient(FL.x,y+3,0,FL.x,y+3,10+30*k);g.addColorStop(0,`rgba(255,255,255,${1-k})`);g.addColorStop(.4,`rgba(255,200,140,${.8*(1-k)})`);g.addColorStop(1,'rgba(255,100,80,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(FL.x,y+3,10+30*k,0,6.283);ctx.fill()}}for(let i=SH.length-1;i>=0;i--){const p=SH[i];p.t+=dt;if(p.t>.75){SH.splice(i,1);continue}p.vy+=260*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;ctx.save();ctx.globalAlpha=1-p.t/.75;ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle='#5a0010';ctx.fillRect(-4,-3,8,6);ctx.fillStyle='#ff7a5a';ctx.fillRect(-3,-2,6,4);ctx.fillStyle='#fff';ctx.fillRect(-3,-2,3,1.5);ctx.restore()}ctx.restore()}catch(_){}}})();

/* v85 스킬 쿨타임 완료 팝 (시각 전용) */
(()=>{const was=new WeakMap();setInterval(()=>{try{if(G.screen||(G.saverState&&G.saverState()))return;document.querySelectorAll('.sk').forEach(el=>{const r=el.classList.contains('ready');if(r&&was.get(el)===false){el.classList.remove('skpop');void el.offsetWidth;el.classList.add('skpop');const g=document.createElement('i');g.className='skring';const P=el.parentElement;g.style.cssText=`left:${el.offsetLeft+el.offsetWidth/2}px;top:${el.offsetTop+el.offsetHeight/2}px;width:${el.offsetWidth}px;height:${el.offsetHeight}px;margin:${-el.offsetHeight/2}px 0 0 ${-el.offsetWidth/2}px`;P.appendChild(g);setTimeout(()=>{g.remove();el.classList.remove('skpop')},650)}was.set(el,r)})}catch(_){}},100)})();
/* v86 보물 고블린 (희귀 등장 · 9초 내 처치 시 골드 6배) */
(()=>{const C=G.C,R=window.RENDER;let clk=0,next=90+Math.random()*60,cur=null;const B=()=>C.B;const scr=()=>G.screen&&G.screen!=='sim';
G.tgSpawn=()=>{const b=B(),al=C.alive();if(!b||b.boss||!al.length||cur)return 0;const hp=C.mobHP(C.S().si)*3*BAL.swarmHP*G.tgHPm;const e={tg:1,fac:'chaos',n:'보물 고블린',img:'mon_goblin_gold.png',sc:1.15,max:hp,hp,atk:0,spd:.9,t:-.3,j:al.length,q:G.tgQ};b.enemies.push(e);cur={e,t:9};const d=!scr()&&G.screen!=='sim'&&document.getElementById('battle');if(d&&!(G.saverState&&G.saverState())){d.querySelectorAll('.wvb').forEach(x=>x.remove());const n=document.createElement('div');n.className='wvb tgb';n.innerHTML='<i></i><b>보물 고블린 출현!</b><i></i>';d.appendChild(n);setTimeout(()=>n.remove(),1500)}return 1};G.tgHPm=1.5;G.tgQ=6;
const ot=C.tick;C.tick=function(dt){const r=ot.apply(this,arguments);try{clk+=dt;if(cur){cur.t-=dt;const e=cur.e;if(e.hp<=0){cur=null;next=clk+150+Math.random()*90;return r}if(cur.t<=0||B().boss){const s=R._ES&&R._ES().get(e);e.res=1;e.hp=0;const i=B().enemies.indexOf(e);if(i>=0)B().enemies.splice(i,1);if(s&&G.screen!=='sim'&&!(G.saverState&&G.saverState())){const d=document.getElementById('battle'),f=document.createElement('div');f.className='tgflee';f.textContent='도망쳤다!';f.style.left=s.x+'px';f.style.top=(s.y-90)+'px';d&&d.appendChild(f);setTimeout(()=>f.remove(),1400)}cur=null;next=clk+150+Math.random()*90}return r}if(clk>next&&!scr()&&!G.storyOn&&!B().boss){if(!G.tgSpawn())next=clk+5}}catch(_){}return r};
G.tgState=()=>cur;
const of=R.frame;R.frame=dt=>{of(dt);try{if(!cur||G.screen)return;const e=cur.e,s=R._ES().get(e);const c=R._bc();if(!s||!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);const h=80;ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(s.x,s.y-h*.45,4,s.x,s.y-h*.45,h*.75);g.addColorStop(0,'rgba(255,220,90,.45)');g.addColorStop(1,'rgba(255,180,40,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(s.x,s.y-h*.45,h*.75,0,6.283);ctx.fill();for(let i=0;i<6;i++){const a=T*2+i*1.047,r=h*.5,px=s.x+Math.cos(a)*r*.7,py=s.y-h*.45+Math.sin(a)*r*.5,z=2.5+1.5*Math.sin(T*6+i);ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.moveTo(px,py-z*2);ctx.lineTo(px+z*.6,py);ctx.lineTo(px,py+z*2);ctx.lineTo(px-z*.6,py);ctx.fill()}ctx.globalCompositeOperation='source-over';const y=s.y-h-30,w=56;ctx.font='900 11px Maplestory,"Noto Sans KR",sans-serif';ctx.textAlign='center';ctx.lineWidth=3.5;ctx.strokeStyle='#4a2a00';ctx.strokeText('보물 고블린',s.x,y-6);ctx.fillStyle='#ffe066';ctx.fillText('보물 고블린',s.x,y-6);ctx.fillStyle='#2a1a00';ctx.fillRect(s.x-w/2-1,y-1,w+2,6);ctx.fillStyle=cur.t<3?'#ff6a4a':'#ffd24a';ctx.fillRect(s.x-w/2,y,w*Math.max(0,cur.t/9),4);ctx.restore()}catch(_){}}})();
/* v87 보스 필살기 컷인 (시각 전용) */
(()=>{const C=G.C;const SK=['파멸의 일격','암흑 폭풍','대지 분쇄','혼돈의 포효','멸망의 낙인'];const ot=C.ev.tele;C.ev.tele=function(e){const r=ot&&ot.apply(this,arguments);try{if(!e||!e.boss||e.wb||G.screen||G.storyOn||(G.saverState&&G.saverState())||(R.opt&&R.opt.fx===false))return r;const b=document.getElementById('battle');if(!b)return r;b.querySelectorAll('.bcut').forEach(x=>x.remove());const nm=SK[(e.n||'').length%SK.length];const d=document.createElement('div');d.className='bcut';d.innerHTML=`<div class=bcs></div><img src="assets/${e.img}"><div class=bct><small>${e.n}</small><b>${nm}!</b><em>붉은 영역을 피하세요</em></div>`;b.appendChild(d);[...document.querySelectorAll('#toastQ>*')].forEach(t=>{if(t.textContent.includes('강력한 공격'))t.remove()});setTimeout(()=>d.remove(),1250)}catch(_){}return r}})();
/* v87b 보스 컷인 중 아군 컷인 대기열 */
(()=>{let until=0,qc=null,qcc=null,qd=[];const busy=()=>performance.now()<until;
const mo=new MutationObserver(ms=>{if(!busy())return;ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.classList&&n.classList.contains('combo')){n.remove();qd.push(n)}}))});
const hook=()=>{const b=document.getElementById('battle');if(b)mo.observe(b,{childList:true});else setTimeout(hook,500)};hook();
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.classList&&n.classList.contains('bcut')){until=performance.now()+1300;R.cut=null;R.ccut=null;document.querySelectorAll('#battle .combo').forEach(x=>x.remove())}}))).observe(document.body,{childList:true,subtree:true});
const of=R.frame;R.frame=dt=>{try{if(busy()){if(R.cut&&R.cut.t<.1){qc=R.cut;R.cut=null}if(R.ccut&&R.ccut.t<.1){qcc=R.ccut;R.ccut=null}}else{if(qc){qc.t=0;R.cut=qc;qc=null}else if(qcc&&!(R.cut&&R.cut.t<1.3)){qcc.t=0;R.ccut=qcc;qcc=null}else if(qd.length&&!(R.ccut&&R.ccut.t<1)){const n=qd.shift(),b=document.getElementById('battle');if(b){b.appendChild(n);setTimeout(()=>n.remove(),1500)}}}}catch(_){}of(dt)};G.bcutBusy=busy})();
/* v88 피버 게이지 (처치 40회 → 8초 피버: 공격력 ×1.3) */
(()=>{const C=G.C,NEED=40,DUR=8,MUL=1.3;let g=0,fv=0;const ui=()=>G.screen!=='sim';
const oA=C.ATK;C.ATK=function(){const v=oA.apply(this,arguments);return fv>0?v*MUL:v};['POW','power','estDPS'].forEach(k=>{const o=C[k];if(typeof o!='function')return;C[k]=function(){const f=fv;fv=0;try{return o.apply(this,arguments)}finally{fv=f}}});
let el=null;const mk=()=>{if(el&&el.isConnected)return el;const m=document.getElementById('mission');if(!m)return null;el=document.createElement('div');el.id='fevg';el.innerHTML='<b>FEVER</b><div class=fvb><i></i></div>';m.parentElement.appendChild(el);return el};
const draw=()=>{if(!ui())return;const e=mk();if(!e)return;const r=fv>0?fv/DUR:g/NEED;e.querySelector('i').style.width=(r*100).toFixed(1)+'%';e.classList.toggle('on',fv>0);e.classList.toggle('full',fv<=0&&g>=NEED-4);$sd(e,C.B&&C.B.wb||G.screen?'none':'')};
const start=()=>{fv=DUR;g=0;if(!ui()||(G.saverState&&G.saverState()))return;const b=document.getElementById('battle');if(!b)return;b.querySelectorAll('.fevban,.fevov').forEach(x=>x.remove());const o=document.createElement('div');o.className='fevov';b.appendChild(o);const n=document.createElement('div');n.className='fevban';n.innerHTML='<b>FEVER!</b><small>공격력 ×1.3 · 8초</small>';b.appendChild(n);setTimeout(()=>n.remove(),1400);try{R.hs=Math.max(R.hs||0,.12)}catch(_){}};
const ok=C.ev.kill;C.ev.kill=function(e){const r=ok&&ok.apply(this,arguments);try{if(e&&!e.wb&&fv<=0){g+=e.boss?10:(e.el?3:1);if(g>=NEED)start()}draw()}catch(_){}return r};
const ot=C.tick;C.tick=function(dt){const r=ot.apply(this,arguments);if(fv>0){fv-=dt;if(fv<=0){fv=0;if(ui())document.querySelectorAll('.fevov').forEach(x=>{x.classList.add('out');setTimeout(()=>x.remove(),500)})}}return r};
setInterval(()=>{try{draw()}catch(_){}},200);G.fever=()=>({g,fv});G.feverStart=start})();
/* v89 웨이브 마지막 일격 (히트스톱·줌·WAVE CLEAR) */
(()=>{const C=G.C;const ok=C.ev.kill;C.ev.kill=function(e){const r=ok&&ok.apply(this,arguments);try{if(!e||e.boss||e.wb||e.tg||G.screen||G.storyOn||(G.saverState&&G.saverState()))return r;if(C.alive().length||C.reserve()||C.B.boss)return r;const q=R._ES().get(e),c=R._bc(),b=document.getElementById('battle');R.hs=Math.max(R.hs||0,.18);if(q&&c&&(!R.opt||R.opt.shake)&&!c.style.transform){c.style.transformOrigin=`${q.x}px ${q.y-45}px`;c.style.transition='transform .2s cubic-bezier(.2,.9,.3,1)';c.style.transform='scale(1.07)';setTimeout(()=>{c.style.transition='transform .45s ease-in-out';c.style.transform='';setTimeout(()=>{c.style.transition='';c.style.transformOrigin=''},480)},420)}if(b&&q){b.querySelectorAll('.mkb').forEach(x=>x.remove());const f=document.createElement('div');f.className='wclr';f.style.left=q.x+'px';f.style.top=(q.y-45)+'px';const tx=Math.min(230,Math.max(130,q.x));f.innerHTML=`<i></i><b style="left:${tx-q.x}px">WAVE CLEAR</b>`;b.appendChild(f);setTimeout(()=>f.remove(),1000)}}catch(_){}return r}})();
/* v90 떠돌이 상인 (전투 중 가끔 등장 · 60초 · 방문당 1회 구매) */
(()=>{const C=G.C;let clk=0,next=240+Math.random()*120,vis=null;const IMG=()=>'assets/'+(G._merchImg||'merchant.png');
const offers=()=>{const s=C.S(),gk=C.goldKill(s.si);return[{k:'stone',ic:'it2_stone.png',n:'강화석',v:10,cost:Math.round(gk*150),cur:'gold'},{k:'tickets',ic:'it2_ticket.png',n:'소환권',v:1,cost:240,cur:'gems',tag:'20% 할인'},{k:'gold',ic:'it2_gold.png',n:'골드',v:Math.round(gk*400),cost:40,cur:'gems',tag:'특가'}]};
const show=()=>{const b=document.getElementById('battle');if(!b)return;b.querySelectorAll('.merch').forEach(x=>x.remove());const d=document.createElement('div');d.className='merch';d.innerHTML=`<img src="${IMG()}"><b>떠돌이 상인</b><i class=mtm></i><em>특가!</em>`;d.onclick=open;b.appendChild(d);vis.el=d};
const hide=()=>{if(vis&&vis.el){vis.el.classList.add('out');const e=vis.el;setTimeout(()=>e.remove(),500)}document.querySelectorAll('.modal.mshop').forEach(x=>x.remove());vis=null};
function open(){if(!vis)return;const s=C.S(),O=vis.o;const m=document.createElement('div');m.className='modal mshop';const ci=c=>c=='gold'?'it2_gold.png':'it2_gem.png';
 m.innerHTML=`<div class=mbox><div class=ttl style="justify-content:center"><img class="emi e_npc_merchant" src=assets/npc_merchant.png alt="">떠돌이 상인</div><div class=msub>"좋은 물건 있수다! 한 가지만 골라 가슈~"</div><div class=mrow>${O.map((o,i)=>`<div class="moff ${vis.bought?'off':''}" data-i=${i}>${o.tag?`<s>${o.tag}</s>`:''}<img src="assets/${o.ic}"><b>${o.n} ×${fmt(o.v)}</b><span><img src="assets/${ci(o.cur)}">${fmt(o.cost)}</span></div>`).join('')}</div><small class=mleft>${vis.bought?'이번 방문의 거래를 마쳤습니다':'남은 시간 '+Math.ceil(vis.t)+'초'}</small><span class="pill wide" id=mClose>닫기</span></div>`;
 document.getElementById('app').appendChild(m);m.querySelector('#mClose').onclick=()=>m.remove();
 m.querySelectorAll('.moff').forEach(el=>el.onclick=()=>{if(!vis||vis.bought)return;const o=O[+el.dataset.i];const have=o.cur=='gold'?s.gold:s.gems;if(have<o.cost)return toast(o.cur=='gold'?'골드가 부족합니다':'보석이 부족합니다');if(o.cur=='gold')s.gold-=o.cost;else s.gems-=o.cost;if(o.k=='gold')C.addGold?C.addGold(o.v):(s.gold+=o.v);else s[o.k]=(s[o.k]||0)+o.v;vis.bought=1;m.remove();updateHud();rewardPop([[o.ic,o.v,o.n]],'떠돌이 상인과 거래했습니다');if(vis.el){vis.el.querySelector('em').textContent='감사!'}setTimeout(()=>{if(vis&&vis.bought)vis.t=Math.min(vis.t,3)},300)})}
const ot=C.tick;C.tick=function(dt){const r=ot.apply(this,arguments);try{if(G.screen==='sim')return r;clk+=dt;if(vis){vis.t-=dt;if(vis.el){const q=vis.el.querySelector('.mtm');q&&(q.style.width=Math.max(0,vis.t/60*100)+'%')}if(vis.t<=0)hide();else if(vis.el&&!vis.el.isConnected)show()}else if(clk>next&&!C.B.boss&&!C.B.rb&&!G.storyOn){next=clk+360+Math.random()*180;vis={t:60,o:offers(),bought:0};show()}}catch(_){}return r};
G.merchSpawn=()=>{next=0;clk=1}})();
/* v91 행운 룰렛 (일일 무료 1회 + 보석 100 추가 1회) */
(()=>{const C=G.C;const P=[{n:'보석 30',ic:'it2_gem.png',k:'gems',v:30,w:25,c:'#5ab0ff'},{n:'강화석 5',ic:'it2_stone.png',k:'stone',v:5,w:20,c:'#b0a0ff'},{n:'골드',ic:'it2_gold.png',k:'gold',g:200,w:20,c:'#ffd24a'},{n:'보석 50',ic:'it2_gem.png',k:'gems',v:50,w:15,c:'#3a8aff'},{n:'강화석 15',ic:'it2_stone.png',k:'stone',v:15,w:8,c:'#8a6aff'},{n:'소환권',ic:'it2_ticket.png',k:'tickets',v:1,w:4,c:'#ff8ac0'},{n:'골드 대박',ic:'it2_gold.png',k:'gold',g:600,w:3,c:'#ff9a2a'},{n:'보석 100',ic:'it2_gem.png',k:'gems',v:100,w:5,c:'#ff5a7a'}];
const st=()=>{const s=C.S();if(!s.whl||s.whl.d!==C.today())s.whl={d:C.today(),n:0};return s.whl};const free=()=>st().n<1;
let spinning=0;
const pill=()=>{const b=document.getElementById('battle');if(!b)return;let p=document.getElementById('whlBtn');const on=!C.B.boss&&!C.B.rb&&!G.screen&&free();if(!p&&on){p=document.createElement('span');p.id='whlBtn';p.className='pill';p.innerHTML='<i class=wico></i>무료 룰렛<i class=dot></i>';p.onclick=open;b.appendChild(p)}if(p)$sd(p,on?'':'none')};setInterval(()=>{try{pill()}catch(_){}},500);
function open(){document.querySelectorAll('.modal.whl').forEach(x=>x.remove());const n=P.length,seg=360/n;const m=document.createElement('div');m.className='modal whl';const grad=P.map((p,i)=>`${p.c} ${i*seg}deg ${(i+1)*seg}deg`).join(',');
 m.innerHTML=`<div class=mbox><div class=ttl style="justify-content:center"><i class=wico></i>행운 룰렛</div><div class=wwrap><div class=wptr></div><div class=wheel style="background:conic-gradient(${grad})">${P.map((p,i)=>`<div class=wsl style="transform:rotate(${i*seg+seg/2}deg)"><img src="assets/${p.ic}"><b>${p.n}</b></div>`).join('')}</div><div class=whub>GO</div></div><div class=wbtns></div><small class=wnote>매일 05:00 초기화 · 무료 1회 + 추가 1회</small></div>`;
 document.getElementById('app').appendChild(m);m.onclick=e=>{if(e.target===m&&!spinning)m.remove()};draw(m)}
function draw(m){const w=st(),b=m.querySelector('.wbtns');b.innerHTML=w.n<1?`<span class="pill green wide" id=wGo>무료 돌리기</span>`:w.n<2?`<span class="pill wide" id=wGo><img src="assets/it2_gem.png" style="width:14px;vertical-align:-2px"> 100 · 한 번 더</span>`:`<span class="pill wide off">내일 다시 도전!</span>`;b.insertAdjacentHTML('beforeend',`<span class="pill wide" id=wX style="margin-top:6px">닫기</span>`);b.querySelector('#wX').onclick=()=>{if(!spinning)m.remove()};const g=b.querySelector('#wGo');if(g)g.onclick=()=>spin(m)}
function spin(m){if(spinning)return;const s=C.S(),w=st();if(w.n>=2)return;if(w.n==1){if(s.gems<100)return toast('보석이 부족합니다');s.gems-=100}w.n++;spinning=1;updateHud();
 const tot=P.reduce((a,p)=>a+p.w,0);let r=Math.random()*tot,i=0;for(;i<P.length;i++){r-=P[i].w;if(r<0)break}i=Math.min(i,P.length-1);const p=P[i],seg=360/P.length;
 const wh=m.querySelector('.wheel');const base=(+wh.dataset.rot||0);const target=base+360*5+(360-(i*seg+seg/2))-(base%360);wh.dataset.rot=target;wh.style.transition='transform 3.6s cubic-bezier(.12,.75,.2,1)';wh.style.transform=`rotate(${target}deg)`;
 setTimeout(()=>{spinning=0;const v=p.g?Math.round(C.goldKill(s.si)*p.g):p.v;if(p.k=='gold')C.addGold?C.addGold(v):(s.gold+=v);else s[p.k]=(s[p.k]||0)+v;updateHud();const big=p.w<=5;rewardPop([[p.ic,v,p.n.replace(/ \d+$/,'')]],big?'<img class="emi e_ui_confetti" src=assets/ui_confetti.png alt="">대박! 룰렛 당첨':'룰렛 당첨');if(big&&G.confetti)try{G.confetti()}catch(_){}draw(m)},3700)}
G.wheelOpen=open})();
/* v92 오늘의 현상수배 (일일 특정 몬스터 30마리 처치) */
(()=>{const C=G.C,N=30;const day=()=>C.today();
const cur=()=>{const s=C.S();if(s.wnt&&s.wnt.d===day()&&!s.wnt.n&&!s.wnt.done){const f=D.FIELDS[s.si%D.FIELDS.length];if(!(D.FIELDMON[f]||[]).includes(s.wnt.k))s.wnt=null}if(!s.wnt||s.wnt.d!==day()){const f=D.FIELDS[s.si%D.FIELDS.length],pool=(D.FIELDMON[f]||['slime']).map(k=>D.MONS.find(m=>m.k==k)).filter(Boolean);const m=pool[Math.floor(Math.random()*pool.length)]||D.MONS[0];s.wnt={d:day(),k:m.k,n:0,done:0,clm:0}}return s.wnt};
const mon=w=>D.MONS.find(m=>m.k==w.k)||D.MONS[0];
const ok=C.ev.kill;C.ev.kill=function(e){const r=ok&&ok.apply(this,arguments);try{if(G.screen==='sim'||!e||e.boss||e.tg)return r;const w=cur();if(w.done)return r;const m=mon(w);if(e.img===m.img||e.n===m.n||(e.n||'').endsWith(' '+m.n)){w.n++;if(w.n>=N){w.n=N;w.done=1;const b=document.getElementById('battle');if(b){const d=document.createElement('div');d.className='wvb tgb';d.innerHTML='<i></i><b>현상수배 완료!</b><i></i>';b.appendChild(d);setTimeout(()=>d.remove(),1500)}}else{const t=document.getElementById('wntBtn');if(t){t.classList.remove('bump');void t.offsetWidth;t.classList.add('bump')}}}}catch(_){}return r};
const claim=()=>{const s=C.S(),w=cur();if(!w.done||w.clm)return;w.clm=1;s.gems+=50;s.stone=(s.stone||0)+10;updateHud();rewardPop([['it2_gem.png',50,'보석'],['it2_stone.png',10,'강화석']],'현상수배 보상')};
const info=()=>{const w=cur(),m=mon(w);document.querySelectorAll('.modal.wnt').forEach(x=>x.remove());const d=document.createElement('div');d.className='modal wnt';d.innerHTML=`<div class=mbox><div class=wposter><div class=wph>WANTED</div><img src="assets/${m.img}"><b>${m.n}</b><div class=wpr><i style="width:${w.n/N*100}%"></i><span>${w.n} / ${N}</span></div><div class=wrw>보상 <img src="assets/it2_gem.png">50 <img src="assets/it2_stone.png">10</div></div><small class=wnote2>매일 05:00 새 현상수배 · 해당 몬스터가 나오는 스테이지에서 사냥하세요</small><span class="pill ${w.done&&!w.clm?'green':''} wide" id=wC>${w.clm?'수령 완료':w.done?'보상 받기':'닫기'}</span></div>`;document.getElementById('app').appendChild(d);d.querySelector('#wC').onclick=()=>{d.remove();claim()};d.onclick=e=>{if(e.target===d)d.remove()}};
setInterval(()=>{try{const b=document.getElementById('battle');if(!b)return;let t=document.getElementById('wntBtn');const w=cur(),m=mon(w),on=!C.B.boss&&!C.B.rb&&!G.screen&&!w.clm;if(!t){t=document.createElement('span');t.id='wntBtn';t.onclick=info;b.appendChild(t)}$sd(t,on?'':'none');if(on){const h=`<img src="assets/${m.img}"><span><small>현상수배</small><b>${w.done?'완료!':w.n+'/'+N}</b></span>${w.done?'<i class=dot></i>':''}`;if(t._h!==h){t.innerHTML=h;t._h=h}t.classList.toggle('dn',!!w.done)}}catch(_){}},400);G.wanted=cur;G.wantedInfo=info})();
/* v93 정예 속성 변이 (불꽃·서리·번개·독기 오라, 시각 전용) */
(()=>{const C=G.C;const AF=[{k:'fire',n:'불꽃',c:['#fff3a0','#ff8a2a','#ff3a1a']},{k:'ice',n:'서리',c:['#ffffff','#9fe6ff','#3a9aff']},{k:'bolt',n:'번개',c:['#ffffff','#fff07a','#b07cff']},{k:'venom',n:'독기',c:['#e8ffd0','#8af06a','#2a9a4a']}];
const os=C.ev.spawn;C.ev.spawn=function(){try{(C.B.enemies||[]).forEach(e=>{if(e.el&&!e.afx){const a=AF[Math.floor(Math.random()*AF.length)];e.afx=a;e.n=a.n+' '+e.n;e._hc=a.c[1]}})}catch(_){}return os&&os.apply(this,arguments)};
const PT=[];const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||(G.saverState&&G.saverState())||(R.opt&&!R.opt.fx))return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 C.alive().forEach(e=>{if(!e.afx)return;const s=R._ES().get(e);if(!s)return;const h=90*(e.sc||1)*1.28,a=e.afx,cx0=s.x,cy=s.y-h*.45;
  const g=ctx.createRadialGradient(cx0,s.y-4,2,cx0,s.y-4,h*.55);g.addColorStop(0,a.c[1]+'cc');g.addColorStop(1,a.c[2]+'00');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx0,s.y-4,h*.6,h*.2,0,0,6.283);ctx.fill();ctx.strokeStyle=a.c[2];ctx.globalAlpha=.6+.3*Math.sin(T*5);ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(cx0,s.y-4,h*.5,h*.15,0,0,6.283);ctx.stroke();ctx.globalAlpha=1;
  for(let q=0;q<2;q++)if(Math.random()<dt*14)PT.push({x:cx0+(Math.random()-.5)*h*.6,y:s.y-Math.random()*h*.3,vy:-(30+Math.random()*50),t:0,a,ph:Math.random()*6});
  if(a.k=='bolt'&&Math.random()<dt*3){ctx.strokeStyle=a.c[1];ctx.lineWidth=2;ctx.beginPath();let x=cx0+(Math.random()-.5)*h*.5,y=cy-h*.4;ctx.moveTo(x,y);for(let i=0;i<4;i++){x+=(Math.random()-.5)*18;y+=h*.2;ctx.lineTo(x,y)}ctx.stroke()}});
 for(let i=PT.length-1;i>=0;i--){const p=PT[i];p.t+=dt;if(p.t>.9){PT.splice(i,1);continue}p.y+=p.vy*dt;const k=p.t/.9,a=p.a;ctx.globalAlpha=1-k;
  if(a.k=='fire'){ctx.fillStyle=k<.3?a.c[0]:a.c[1];ctx.beginPath();ctx.arc(p.x+Math.sin(T*8+p.ph)*3,p.y,5*(1-k)+2,0,6.283);ctx.fill()}
  else if(a.k=='ice'){ctx.fillStyle=a.c[0];ctx.save();ctx.translate(p.x,p.y);ctx.rotate(T*2+p.ph);ctx.strokeStyle=a.c[2];ctx.lineWidth=1;ctx.strokeRect(-4.5,-1.3,9,2.6);ctx.fillRect(-4.5,-1.3,9,2.6);ctx.fillRect(-1.3,-4.5,2.6,9);ctx.restore()}
  else if(a.k=='venom'){ctx.strokeStyle=a.c[1];ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(p.x+Math.sin(T*3+p.ph)*4,p.y,2+k*4,0,6.283);ctx.stroke()}
  else{ctx.fillStyle=a.c[1];ctx.fillRect(p.x-1,p.y-3,2,6)}}
 ctx.globalAlpha=1;ctx.restore()}catch(_){}}})();
/* v94 elite treasure chest drop */
(()=>{const C=G.C;let live=0;
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{try{if(e&&e.el&&!e.boss&&G.screen!='sim'&&!document.querySelector('.vic')){const q=R._ES().get(e),b=document.getElementById('battle');if(q&&b&&live<3){const gold=G._echG!=null?G._echG:Math.random()<.2,s=C.S(),gm=gold?10:3,st=gold?3:1;s.gems+=gm;s.stone=(s.stone||0)+st;live++;
 const w=document.createElement('div');w.className='ech'+(gold?' gold':'');w.style.left=Math.max(90,Math.min(265,q.x))+'px';w.style.top=(q.y-20)+'px';
 w.innerHTML=`<div class="echb"></div><img src="assets/ic3_chest.png"><div class="echt">${gold?'황금 보물상자!':'보물상자'}<br><b><img src="assets/it2_gem.png">${gm} <img src="assets/it2_stone.png">${st}</b></div>`;b.appendChild(w);
 setTimeout(()=>w.classList.add('open'),850);setTimeout(()=>w.classList.add('out'),2500);setTimeout(()=>{w.remove();live--},3000);const r=ok(e,...a);R.ekT=null;return r}}}catch(_){}return ok(e,...a)}})();
/* v95 breakable field crates */
(()=>{const C=G.C;let cd=12,el=null;
function brk(byTap){if(!el)return;const w=el,s=C.S(),g=Math.round(C.goldKill(s.si||0)*(byTap?25:20));C.addGold(g);el=null;w.classList.add('brk');
 const b=document.getElementById('battle');for(let i=0;i<9;i++){const p=document.createElement('i');p.className='crp';p.style.setProperty('--dx',(Math.random()-.5)*140+'px');p.style.setProperty('--dy',(-40-Math.random()*90)+'px');p.style.setProperty('--r',(Math.random()*720-360)+'deg');w.appendChild(p)}
 const t=document.createElement('div');t.className='crt';t.innerHTML=`<img src="assets/it2_gold.png">+${R.fmt(g)}`;w.appendChild(t);setTimeout(()=>w.remove(),1300)}
function spawn(){const b=document.getElementById('battle');if(!b)return;el=document.createElement('div');el.className='crate';el.style.left=(235+Math.random()*35)+'px';el.style.top=(455+Math.random()*30)+'px';el.innerHTML='<img src="assets/prop_crate.png"><div class="crhp"><b></b></div>';el.dataset.h=4;b.appendChild(el);
 el.addEventListener('pointerdown',ev=>{ev.stopPropagation();brk(1)});el._t=0}
G._crSpawn=()=>{if(!el)spawn()};
const ot=C.tick;C.tick=(dt,...a)=>{const r=ot(dt,...a);try{if(G.screen=='sim'||G.screen)return r;const B=C.B;if(!el){if(B&&!B.enemies.some(e=>e.boss)&&(cd-=dt)<=0){cd=20+Math.random()*15;spawn()}}else if(B&&B.enemies.some(e=>e.boss)){el.remove();el=null}else{el._t+=dt;if(el._t>.9){el._t=0;const h=+el.dataset.h-1;el.dataset.h=h;el.querySelector('b').style.width=(h*25)+'%';const im=el.querySelector('img');im.classList.remove('hit');void im.offsetWidth;im.classList.add('hit');if(h<=0)brk(0)}}}catch(_){}return r}})();
/* v96 spawn rift portal */
(()=>{const C=G.C,RP=[];const os=C.ev.spawn;C.ev.spawn=function(){const r=os&&os.apply(this,arguments);try{if(G.screen)return r;const b=document.getElementById('battle');if(!b)return r;const bo=(C.B.enemies||[]).some(e=>e.boss);
 /* r395: 2 pooled portals - re-inserting a detached node restarts its CSS animations exactly like a new one */let d=RP.find(x=>!x.isConnected);if(!d){d=document.createElement('div');d.innerHTML='<i class="rs"></i><i class="rc"></i><i class="rb"></i>';RP.push(d)}d.className='rift'+(bo?' boss':'');b.appendChild(d);clearTimeout(d._tm);d._tm=setTimeout(()=>d.remove(),bo?1400:1700)}catch(_){}return r}})();

/* v97 declutter: one center banner at a time, damage-number cap */
(()=>{const BN=['wvb','wclr','mkb','fevban','enrb','bsht','stban'];const b=document.getElementById('battle');if(!b)return;
const mo=new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(!n.classList)continue;if(n.classList.contains('powup')&&document.querySelector('.vic')){n.classList.add('bgone');continue}const vic=n.classList.contains('vic');if(!vic&&!n.classList.contains('bsht')&&(G._fin||document.querySelector('.bsht'))&&(n.classList.contains('banner')||BN.some(c=>n.classList.contains(c)))){n.classList.add('bgone');continue}if(vic||BN.some(c=>n.classList.contains(c))){if(!vic&&document.querySelector('.vic')){n.classList.add('bgone');continue}if(vic)document.querySelectorAll('.powup').forEach(o=>o.classList.add('bgone'));document.querySelectorAll(BN.map(c=>'.'+c).join(',')+',.ech,.crate,.shk').forEach(o=>{if(o!==n&&!o.classList.contains('bgone'))o.classList.add('bgone')})}}});mo.observe(b,{childList:true});mo.observe(document.body,{childList:true});
G.declutter=1})();

/* v98 equipped pet follows the party in battle */
(()=>{const C=G.C;let el=null,cur=null,atkT=4,dash=0;G._bpet=1;
function ensure(){const s=C.S(),p=s.pet&&s.pet.eq,b=document.getElementById('battle');if(!b)return null;const def=p&&(C.PETS||[]).find(x=>x.k==p);if(!def){if(el){el.remove();el=null;cur=null}return null}
 if(!el||cur!==p){if(el)el.remove();el=document.createElement('div');el.className='bpet';el.innerHTML=`<img src="assets/${def.img}"><i class="bpsh"></i>`;b.appendChild(el);cur=p}return el}
const ot=C.tick;C.tick=(dt,...a)=>{const r=ot(dt,...a);try{if(G.screen){if(el)el.style.display='none';return r}const e=ensure();if(!e)return r;e.style.display='';const L=R._AS().get('lina');if(!L)return r;
 const T=performance.now()/1000;if(dash>0){dash-=dt;if(dash<=0)e.classList.remove('dash')}
 if(!e.classList.contains('dash')){const f=L.face>=0?1:-1;e.style.left=Math.max(66,L.x-f*62)+'px';e.style.top=(L.y-4+Math.sin(T*3.2)*4)+'px'}
 if((atkT-=dt)<=0){atkT=5+Math.random()*3;const tg=(C.B.enemies||[]).filter(x=>x.hp>0).map(x=>R._ES().get(x)).filter(q=>q&&q.x<300).sort((a,b)=>a.x-b.x)[0];
  if(tg&&!document.querySelector('.vic')){e.classList.add('dash');e.style.left=(tg.x-20)+'px';e.style.top=(tg.y-70)+'px';dash=.55;setTimeout(()=>{const s=document.createElement('div');s.className='bpfx';s.style.left=tg.x+'px';s.style.top=(tg.y-50)+'px';document.getElementById('battle').appendChild(s);setTimeout(()=>s.remove(),500)},230)}}}catch(_){}return r}})();
/* v99 shiny (빛나는) rare monsters */
(()=>{const C=G.C;const PT=[];G._shMake=()=>{const e=C.alive().find(e=>!e.boss&&!e.wb&&!e.tg&&!e.shiny&&R._ES().get(e)&&R._ES().get(e).x<300);if(e){e.shiny=1;e.n='★빛나는 '+e.n;e.hp*=5;if(e.max)e.max*=5}return e?e.n:''};
const os=C.ev.spawn;C.ev.spawn=function(){try{let has=(C.B.enemies||[]).some(e=>e.shiny&&e.hp>0);(C.B.enemies||[]).forEach(e=>{if(e.boss||e.wb||e.tg||e.shiny!=null)return;e.shiny=!has&&(G._shF||Math.random()<.012)?1:0;if(e.shiny){has=1;G._shF=0}if(e.shiny){e.n='★빛나는 '+e.n;e.hp*=5;if(e.max)e.max*=5}})}catch(_){}return os&&os.apply(this,arguments)};
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{try{if(e&&e.shiny&&G.screen!='sim'){const s=C.S(),q=R._ES().get(e);s.gems+=20;s.stone=(s.stone||0)+5;s.shiny=s.shiny||{};const k=e.img||e.n;const nw=!s.shiny[k];s.shiny[k]=(s.shiny[k]||0)+1;
 const b=document.getElementById('battle');const pv=b&&b.querySelector('.shk:not(.bgone)');if(pv&&Date.now()-pv._t<1200){pv._n=(pv._n||1)+1;pv._t=Date.now();pv.querySelector('b').textContent='빛나는 몬스터 '+pv._n+'연속 처치!';pv.querySelector('span').innerHTML=`<img src="assets/it2_gem.png">${20*pv._n} <img src="assets/it2_stone.png">${5*pv._n}`;if(nw)pv.querySelector('em')?pv.querySelector('em').textContent=`NEW! 수집 ${Object.keys(s.shiny).length}종`:pv.insertAdjacentHTML('beforeend',`<em>NEW! 수집 ${Object.keys(s.shiny).length}종</em>`);pv.style.animation='none';void pv.offsetWidth;pv.style.animation='';clearTimeout(pv._rm);pv._rm=setTimeout(()=>pv.remove(),2400)}else if(b&&q){const d=document.createElement('div');d.className='shk';d._t=Date.now();d.style.left=Math.max(110,Math.min(250,q.x))+'px';d.style.top=(q.y-60)+'px';d.innerHTML=`<b>빛나는 몬스터 처치!</b><span><img src="assets/it2_gem.png">20 <img src="assets/it2_stone.png">5</span>${nw?`<em>NEW! 수집 ${Object.keys(s.shiny).length}종</em>`:''}`;b.appendChild(d);d._rm=setTimeout(()=>d.remove(),2400)}if(q){
  for(let i=0;i<40;i++)PT.push({x:q.x,y:q.y-40,vx:(Math.random()-.5)*360,vy:-Math.random()*320,t:0,h:Math.random()*360,big:1})}}}catch(_){}return ok(e,...a)};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 C.alive().forEach(e=>{if(!e.shiny)return;const s=R._ES().get(e);if(!s)return;const h=90*(e.sc||1)*1.28;
  ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){ctx.strokeStyle=`hsla(${(T*200+i*120)%360},100%,65%,.75)`;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(s.x,s.y-4,h*(.45+i*.08),h*(.14+i*.025),0,0,6.283);ctx.stroke()}
  const g=ctx.createRadialGradient(s.x,s.y-h*.45,4,s.x,s.y-h*.45,h*.7);g.addColorStop(0,`hsla(${(T*200)%360},100%,80%,.35)`);g.addColorStop(1,'hsla(0,0%,100%,0)');ctx.fillStyle=g;ctx.fillRect(s.x-h,s.y-h*1.3,h*2,h*1.4);ctx.globalCompositeOperation='source-over';
  const sy=s.y-h*1.05+Math.sin(T*4)*4;ctx.font='900 22px sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#5a3a00';ctx.strokeText('★',s.x,sy);ctx.fillStyle=`hsl(${(T*200)%360},100%,70%)`;ctx.fillText('★',s.x,sy);
  if(Math.random()<dt*18)PT.push({x:s.x+(Math.random()-.5)*h*.7,y:s.y-Math.random()*h*.9,vx:0,vy:-40,t:0,h:Math.random()*360})});
 for(let i=PT.length-1;i>=0;i--){const p=PT[i];p.t+=dt;const L=p.big?1:.8;if(p.t>L){PT.splice(i,1);continue}p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.big)p.vy+=500*dt;const k=p.t/L,r=(p.big?5:3)*(1-k)+1;ctx.globalAlpha=1-k;ctx.fillStyle=`hsl(${p.h},100%,70%)`;ctx.beginPath();ctx.moveTo(p.x,p.y-r*2);ctx.lineTo(p.x+r*.6,p.y);ctx.lineTo(p.x,p.y+r*2);ctx.lineTo(p.x-r*.6,p.y);ctx.fill()}
 ctx.globalAlpha=1;ctx.restore()}catch(_){}}})();
/* v100 boss shatter finisher */
(()=>{const C=G.C;let F=null;const SH=[];
const ok=C.ev.kill;C.ev.kill=(e,...a)=>{try{if(e&&e.boss&&!e.wb&&!G.screen){const q=R._ES().get(e);if(q){const h=90*(e.sc||1)*1.6;F={x:q.x,y:q.y-h*.45,h,t:0,cr:[...Array(9)].map(()=>({a:Math.random()*6.283,l:.4+Math.random()*.6,k:[...Array(4)].map(()=>(Math.random()-.5)*.6)})),done:0};
 G._fin=1;clearTimeout(G._finT);G._finT=setTimeout(()=>G._fin=0,1700);document.querySelectorAll('.banner,.fevban,.bkflash').forEach(x=>x.classList.add('bgone'));const b=document.getElementById('battle');if(b){const d=document.createElement('div');d.className='bsht';d.innerHTML=`<small>${e.n}</small><b>격파!</b>`;d.style.top=Math.max(300,q.y-h*1.1)+'px';b.appendChild(d);setTimeout(()=>d.remove(),1700)}}}}catch(_){}return ok(e,...a)};
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||(!F&&!SH.length))return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 if(F){F.t+=dt;const t=F.t,{x,y,h}=F;
  if(t<.75){const k=t/.75;ctx.globalCompositeOperation='lighter';
   for(let i=0;i<12;i++){const a=i/12*6.283+t*1.5,L=h*(.6+k*1.6);const g=ctx.createLinearGradient(x,y,x+Math.cos(a)*L,y+Math.sin(a)*L);g.addColorStop(0,`rgba(255,250,220,${.8*k})`);g.addColorStop(1,'rgba(255,200,80,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a-.06)*L,y+Math.sin(a-.06)*L);ctx.lineTo(x+Math.cos(a+.06)*L,y+Math.sin(a+.06)*L);ctx.fill()}
   ctx.globalCompositeOperation='source-over';ctx.strokeStyle='#fff';ctx.shadowColor='#ffd24a';ctx.shadowBlur=10;ctx.lineWidth=3;
   F.cr.forEach(r=>{const L=h*.5*r.l*Math.min(1,k*1.6);ctx.beginPath();ctx.moveTo(x,y);let px=x,py=y;r.k.forEach((j,i)=>{const d=L*(i+1)/4,a=r.a+j;px=x+Math.cos(a)*d;py=y+Math.sin(a)*d*.9;ctx.lineTo(px,py)});ctx.stroke()});ctx.shadowBlur=0}
  else if(!F.done){F.done=1;for(let i=0;i<46;i++){const a=Math.random()*6.283,v=150+Math.random()*420;SH.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-160,r:Math.random()*6,vr:(Math.random()-.5)*14,s:5+Math.random()*12,t:0,c:Math.random()<.5?'#fff3c0':'#ffb43a'})}}
  if(t>.75&&t<1.05){ctx.fillStyle=`rgba(255,255,240,${(1.05-t)/.3*.85})`;ctx.fillRect(0,0,c.clientWidth,c.clientHeight)}
  if(t>1.1)F=null}
 for(let i=SH.length-1;i>=0;i--){const p=SH[i];p.t+=dt;if(p.t>1.1){SH.splice(i,1);continue}p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=700*dt;p.r+=p.vr*dt;ctx.globalAlpha=1-p.t/1.1;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.beginPath();ctx.moveTo(0,-p.s);ctx.lineTo(p.s*.5,p.s*.3);ctx.lineTo(-p.s*.4,p.s*.5);ctx.fill();ctx.restore()}
 ctx.globalAlpha=1;ctx.restore()}catch(_){}}})();

/* v100b finisher: mute grog/BREAK visuals */
(()=>{const C=G.C;const og=C.ev.grog;C.ev.grog=function(){if(G._fin)return;return og&&og.apply(this,arguments)}})();
/* v101 field event: thunderstorm (낙뢰 폭풍) */
(()=>{const C=G.C;let nx=150+Math.random()*90,st=0,sk=0;const BO=[];
function ui(){return !G.screen}
function begin(){st=15;sk=1.2;if(!ui())return;const b=document.getElementById('battle');if(!b)return;b.querySelectorAll('.storm').forEach(x=>x.remove());const o=document.createElement('div');o.className='storm';o.innerHTML='<i class=srain></i>';b.appendChild(o);
 const n=document.createElement('div');n.className='stban';n.innerHTML='<b><img class="emi e_ui_bolt" src=assets/ui_bolt.png alt="">낙뢰 폭풍 <img class="emi e_ui_bolt" src=assets/ui_bolt.png alt=""></b><small>15초간 번개가 적을 강타합니다</small>';b.appendChild(n);setTimeout(()=>n.remove(),2200)}
function end(){const o=document.querySelector('#battle .storm');if(o){o.classList.add('out');setTimeout(()=>o.remove(),800)}}
G._storm=()=>{nx=0};
const ot=C.tick;C.tick=(dt,...a)=>{const r=ot(dt,...a);try{const B=C.B;if(!B||(G.screen&&G.screen!='sim'))return r;const boss=B.enemies.some(e=>e.boss||e.wb);
 if(st>0){st-=dt;if(st<=0||boss){st=0;end();return r}if((sk-=dt)<=0){sk=1.1+Math.random()*.6;const T=C.alive().filter(e=>!e.res);if(T.length){const e=T[Math.floor(Math.random()*T.length)];C.hitEnemy(e,C.ATK()*4,true,{dot:0,storm:1});if(ui()){const q=R._ES().get(e);if(q)BO.push({x:q.x,y:q.y-30,t:0,seg:mk(q.x,q.y-30)});document.querySelector('#battle .storm')?.classList.add('fl');setTimeout(()=>document.querySelector('#battle .storm')?.classList.remove('fl'),120)}}}}
 else if(!boss&&(nx-=dt)<=0){nx=180+Math.random()*120;begin()}}catch(_){}return r};
function mk(x,y){const p=[[x+(Math.random()-.5)*60,0]];let cx=p[0][0];for(let i=1;i<=8;i++){cx+=(x-cx)*.35+(Math.random()-.5)*34;p.push([i==8?x:cx,y*i/8])}return p}
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||!BO.length)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 for(let i=BO.length-1;i>=0;i--){const b=BO[i];b.t+=dt;if(b.t>.5){BO.splice(i,1);continue}const a=1-b.t/.5;ctx.globalAlpha=a;ctx.lineCap='round';
  [[14,'rgba(150,180,255,.35)'],[6,'#cfe0ff'],[2.5,'#fff']].forEach(([w,c])=>{ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();b.seg.forEach(([x,y],j)=>j?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke()});
  const g=ctx.createRadialGradient(b.x,b.y,2,b.x,b.y,70);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(150,180,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(b.x,b.y,70,0,6.283);ctx.fill()}
 ctx.globalAlpha=1;ctx.restore()}catch(_){}}})();
/* v102 faction resonance links in battle */
(()=>{const C=G.C,SYG=new Map(),LD106=[10,6],LD0=[];const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||(R.opt&&!R.opt.fx))return;const syn=C.synergy();if(!syn.length)return;const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000,AS=R._AS();ctx.save();ctx.setTransform(sc,0,0,sc,0,0);
 syn.forEach(sy=>{const col=(D.FACTIONS[sy.f]||{}).c||'#ffd77a';const P=(C.B.allies||[]).filter(a=>a.hp>0&&(D.COMPS.find(x=>x.k==a.k)||{}).fac==sy.f).map(a=>AS.get(a.k)).filter(Boolean).sort((a,b)=>a.x-b.x);if(P.length<2)return;
  ctx.globalAlpha=.8+.2*Math.sin(T*3);let gr=SYG.get(col);if(!gr){gr=ctx.createRadialGradient(0,0,4,0,0,34);gr.addColorStop(0,col+'aa');gr.addColorStop(1,col+'00');SYG.set(col,gr)}/* r368 perf: one cached ring gradient per faction colour, drawn in ring-local coords */P.forEach(p=>{ctx.fillStyle=gr;ctx.translate(p.x,p.y-2);ctx.beginPath();ctx.ellipse(0,0,34,11,0,0,6.283);ctx.fill();ctx.translate(-p.x,-(p.y-2));ctx.strokeStyle=col;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(p.x,p.y-2,28,9,0,0,6.283);ctx.stroke()});ctx.strokeStyle=col;
  ctx.setLineDash(LD106);ctx.lineDashOffset=-T*40;ctx.lineWidth=4.5;ctx.shadowColor=col;ctx.shadowBlur=12;ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p.x,p.y-2):ctx.moveTo(p.x,p.y-2));ctx.stroke();ctx.setLineDash(LD0);
  for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],k=(T*.8+i*.37)%1;ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(a.x+(b.x-a.x)*k,a.y-2+(b.y-a.y)*k,3.2,0,6.283);ctx.fill()}
  ctx.shadowBlur=0;if(!G.synHud){const m=P[Math.floor(P.length/2)],n=P[Math.floor(P.length/2)-1]||m,my=(m.y+n.y)/2+16;ctx.globalAlpha=.95;ctx.font='900 11px "Noto Sans KR",sans-serif';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#000a';const tx=((D.FACTIONS[sy.f]||{}).n||'')+' 공명 ×'+P.length,tw=ctx.measureText(tx).width+14,mx=Math.max(100+tw/2,Math.min(292-tw/2,(m.x+n.x)/2));ctx.fillStyle='#000a';ctx.beginPath();ctx.roundRect?ctx.roundRect(mx-tw/2,my-12,tw,17,8):ctx.rect(mx-tw/2,my-12,tw,17);ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=1.2;ctx.stroke();ctx.lineWidth=3;ctx.strokeStyle='#000a';ctx.strokeText(tx,mx,my);ctx.fillStyle=col;ctx.fillText(tx,mx,my)}ctx.globalAlpha=.95;P.forEach(p=>{const y=p.y-104+Math.sin(T*2+p.x)*2;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(p.x,y-6);ctx.lineTo(p.x+5,y);ctx.lineTo(p.x,y+6);ctx.lineTo(p.x-5,y);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.stroke()})});
 ctx.globalAlpha=1;ctx.restore()}catch(_){}}})();
;(()=>{// v103 동료 인연 (호감도 · 선물 · 인연 대사 해금)
const LN={gourry:['어, 리나! 배고프지 않아? 나는 항상 배고파.','검은 내가 맡을게. 넌 뒤에서 마음껏 터뜨려.','네 옆이라면 어디든 따라갈 거야. 그게 내 일이니까.'],
zelgadis:['…이 몸에 신경 쓸 필요 없다.','원래 몸을 찾는 여행이지만, 너희와 함께라면 나쁘지 않군.','고맙다, 리나. 처음으로 동료라는 말이 어색하지 않아.'],
amelia:['정의는 반드시 승리합니다!','리나 씨의 주문, 언제 봐도 박력 만점이에요!','세이룬의 이름으로 맹세할게요. 끝까지 함께예요!'],
xellos:['그건… 비밀입니다♪','후후, 당신은 정말 흥미로운 분이군요.','마족에게도 즐거운 여행이란 게 있는 모양입니다.'],
sera:['빛이 당신의 길을 비추기를.','상처는 제가 맡을게요. 앞만 보세요.','당신 곁에서 기도하는 시간이 가장 따뜻해요.'],
rhea:['용의 피가 끓는다! 싸우자!','네 화염도 꽤 뜨겁더군. 인정한다.','언젠가 진짜 드래곤을 함께 쓰러뜨리자, 약속이다.'],
lyra:['바람이 다음 표적을 알려줘요.','숲의 친구들도 당신을 좋아하게 됐대요.','당신을 위해서라면 백 발 백 중이에요.'],
borin:['흠! 망치질 한 번이면 끝이지.','네 지팡이, 내가 손 좀 봐줄까?','드워프는 은혜를 잊지 않는다. 평생 동료다!'],
kaede:['검은 마음을 비추는 거울입니다.','당신의 기세에 저도 수련을 다시 하게 되네요.','이 칼날은 이제 당신을 지키기 위해 있습니다.'],
pip:['헤헤, 이건 주운 거예요! 진짜로!','보물 냄새가 나요! 저쪽이에요!','언니가 최고야! 제일 좋은 보물은 언니예요!'],
noel:['…추운 건 익숙해요.','당신 곁은 이상하게 따뜻하네요.','얼어붙었던 마음이 녹았어요. 고마워요.']};
const TH=[0,30,80,160,280,450],MX=5,LIM=5;
const GF=[{k:'f',n:'들꽃 다발',e:10,ic:'bd_flower.png',gold:40},{k:'c',n:'수제 과자',e:35,ic:'bd_cookie.png',gold:120},{k:'j',n:'마법 보석',e:100,ic:'it2_gem.png',gems:30}];
const st=()=>{const s=C.S();if(!s.bond)s.bond={x:{},day:'',n:{},sel:''};const b=s.bond;if(b.day!=C.today()){b.day=C.today();b.n={}}return b};
const lv=k=>{const x=st().x[k]||0;let l=0;TH.forEach((t,i)=>{if(x>=t)l=i});return l};
const price=g=>g.gold?Math.max(50,Math.round(C.goldKill(Math.max(0,C.S().maxSi))*g.gold)):g.gems;
const line=(k,l)=>{const L=LN[k]||['…','…','…'];return l>=5?L[2]:l>=3?L[1]:L[0]};
G.bondGive=(k,gk)=>{const s=C.S(),b=st(),g=GF.find(x=>x.k==gk);if(!g||!s.comps[k])return 0;if(lv(k)>=MX)return -1;if((b.n[k]||0)>=LIM)return -2;const p=price(g);if(g.gold?s.gold<p:s.gems<p)return -3;
 if(g.gold)s.gold-=p;else s.gems-=p;b.n[k]=(b.n[k]||0)+1;const l0=lv(k);b.x[k]=Math.min(TH[MX],(b.x[k]||0)+g.e);const l1=lv(k);if(l1>l0)s.gems+=10*(l1-l0);return {up:l1>l0,l:l1}};
const hearts=l=>Array.from({length:MX},(_,i)=>`<span class="bh ${i<l?'on':''}"><img src="assets/${i<l?'bd_heart_full':'bd_heart_empty'}.png"></span>`).join('');
const css=document.createElement('style');css.textContent=`
.bdsel{display:flex;gap:6px;overflow-x:auto;padding:4px 2px 8px}.bdsel::-webkit-scrollbar{display:none}
.bdc{flex:0 0 62px;border:2px solid #5a4a6a;border-radius:10px;background:linear-gradient(#2a2238,#17121f);text-align:center;padding:3px 0 2px;position:relative}
.bdc img{width:56px;height:44px;object-fit:contain}.bdc b{display:block;font-size:10px;color:#eee}.bdc.on{border-color:#ff8ab0;box-shadow:0 0 10px #ff5a90}.bdc .bl{font-size:9px;color:#ff8ab0}
.bdhero{position:relative;height:300px;border-radius:14px;overflow:hidden;background:radial-gradient(ellipse at 50% 70%,#ffd0e0 0%,#f7a3c4 35%,#7a4a8a 100%);border:2px solid #ff9ac0}
.bdhero .pt{position:absolute;bottom:0;left:50%;transform:translateX(-50%);height:270px;max-width:96%;object-fit:contain;filter:drop-shadow(0 6px 10px #0006)}
.bdhero .sp{position:absolute;left:10px;right:10px;top:10px;background:#fffdf7;color:#3a2440;border-radius:12px;padding:8px 10px;font-size:13px;font-weight:700;box-shadow:0 3px 8px #0005}
.bdhero .sp:after{content:'';position:absolute;bottom:-9px;left:50%;border:9px solid transparent;border-top-color:#fffdf7;border-bottom:0}
.bdhero .nm{position:absolute;left:10px;bottom:10px;background:#0008;border-radius:8px;padding:4px 8px;color:#fff;font-size:13px}
.bdhero .fl{position:absolute;color:#ff4a86;font-size:22px;text-shadow:0 0 6px #fff;z-index:2;animation:bdfl 3.2s linear infinite;opacity:0}
@keyframes bdfl{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:.9}100%{transform:translateY(-230px) scale(1.2);opacity:0}}
.bh{color:#5a4a5a;font-size:18px;margin-right:1px}.bh.on{color:#ff5a90;text-shadow:0 0 6px #ff5a90}
.bdbar{height:9px;border-radius:5px;background:#2a2030;border:1px solid #ff9ac0;overflow:hidden;margin:4px 0}.bdbar i{display:block;height:100%;background:linear-gradient(90deg,#ff7aa8,#ffc0d8)}
.bdg{display:flex;gap:6px;margin-top:6px}.bdgi{flex:1;border:2px solid #ff9ac0;border-radius:10px;background:#2a1a2a;text-align:center;padding:6px 2px;color:#fff}
.bdgi .i{font-size:26px;display:block}.bdgi b{font-size:12px;display:block}.bdgi small{font-size:10px;color:#ffd77a}.bdgi.off{opacity:.4}
.bdln{font-size:12px;padding:5px 0;border-bottom:1px solid #fff2}.bdln.lock{color:#888}
.bdpop{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);background:linear-gradient(#ff7aa8,#c24a7a);color:#fff;font-weight:900;font-size:22px;padding:10px 22px;border-radius:14px;border:2px solid #fff;box-shadow:0 0 24px #ff5a90;animation:bdpp 1.6s ease forwards;pointer-events:none;z-index:5;white-space:nowrap}
@keyframes bdpp{0%{transform:translate(-50%,-50%) scale(.4);opacity:0}20%{transform:translate(-50%,-50%) scale(1.1);opacity:1}75%{opacity:1}100%{transform:translate(-50%,-70%) scale(1);opacity:0}}`;document.head.appendChild(css);
const CUT={amelia:1,borin:1,gourry:1,noel:1,sera:1,zelgadis:1,xellos:1,rhea:1,lyra:1,kaede:1,pip:1};
const draw=up=>{const el=$('#screen'),s=C.S(),b=st();const own=D.COMPS.filter(c=>s.comps[c.k]);
 if(!own.length){el.innerHTML=shell('인연','bg_bond_tavern.jpg','<div class=card style="text-align:center">동료를 소환하면 인연을 쌓을 수 있어요</div>');}
 else{if(!s.comps[b.sel])b.sel=own[0].k;const c=D.COMPS.find(x=>x.k==b.sel),l=lv(c.k),x=b.x[c.k]||0,nx=TH[Math.min(MX,l+1)],pv=TH[l],pct=l>=MX?100:Math.round((x-pv)/(nx-pv)*100),F=D.FACTIONS[c.fac];
 const fl=Array.from({length:7},(_,i)=>`<span class=fl style="left:${8+i*13}%;bottom:${10+(i%3)*8}px;animation-delay:${i*.45}s"><img src="${A}bd_heart_full.png" alt=""></span>`).join('');
 el.innerHTML=shell('인연','bg_bond_tavern.jpg',`<div class=bdsel>${own.map(o=>`<div class="bdc ${o.k==c.k?'on':''}" data-bk=${o.k}><span class=bdm><img src="${A}${o.img}"><img class=bdmf src="${A}bd_medal.png"></span><b>${o.n}</b><span class=bl><img class=bdi src="${A}bd_heart_full.png">${lv(o.k)}</span></div>`).join('')}</div>
 <div class=bdhero>${fl}<img class=pt src="${A}${CUT[c.k]?'cutc/'+c.k+'.png':c.img}"><div class=sp>「${line(c.k,l)}」</div><div class=nm><b>${c.n}</b> <span style="color:${F.c}">${F.n}</span></div>${up?`<div class=bdpop>인연 Lv.${l} 달성! <img class=bdi src="${A}it2_gem.png">+10</div>`:''}</div>
 <div class="card bdcard"><div class=ttl>인연 Lv.${l} <span>${hearts(l)}</span></div><div class=bdbar><i style="width:${pct}%"></i></div><small>${l>=MX?'인연 최대!':`다음 단계까지 ${nx-x} · 오늘 선물 ${b.n[c.k]||0}/${LIM}`} · 단계 달성마다 <img class=bdi src="${A}it2_gem.png">10</small>
 <div class=bdg>${GF.map(g=>{const p=price(g),ok=l<MX&&(b.n[c.k]||0)<LIM&&(g.gold?s.gold>=p:s.gems>=p);return `<div class="bdgi ${ok?'':'off'}" data-gf=${g.k}><span class=i><img src="${A}${{f:'bd_flower.png',c:'bd_cookie.png',j:'it2_gem.png'}[g.k]||''}" alt=""></span><b>${g.n}</b><small>${g.gold?'<img class=bdi src="'+A+'it2_gold.png">'+fmt(p):'<img class=bdi src="'+A+'it2_gem.png">'+p} · +${g.e}</small></div>`}).join('')}</div></div>
 <div class=card><div class=ttl>인연 대사</div>${[1,3,5].map(t=>`<div class="bdln ${l>=t?'':'lock'}">${l>=t?'<img class=bdi src="'+A+'bd_heart_full.png">':'<img class=bdi src="'+A+'bd_heart_empty.png">'}${t} ${l>=t?'「'+line(c.k,t)+'」':'<img class=bdi src="'+A+'sk_lock.png"> 인연 Lv.'+t+' 달성 시 해금'}</div>`).join('')}</div>`);}
 const bk=el.querySelector('#sBack');if(bk)bk.onclick=()=>closeScreen();
 el.querySelectorAll('[data-bk]').forEach(e=>e.onclick=()=>{st().sel=e.dataset.bk;draw()});
 el.querySelectorAll('[data-gf]').forEach(e=>e.onclick=()=>{const r=G.bondGive(st().sel,e.dataset.gf);if(r==-1)return toast('인연이 최대예요');if(r==-2)return toast('오늘은 더 선물할 수 없어요');if(r==-3)return toast('재화가 부족해요');if(r){updateHud();draw(r.up)}})};
if(!MENU.some(m=>m[0]=='bond')){const i=MENU.findIndex(m=>m[0]=='party');MENU.splice(i+1,0,['bond','인연','ic3_bond.png'])}try{renderHub()}catch(_){}
const rs=renderScreen;renderScreen=function(){if(G.screen=='bond')return draw();return rs.apply(this,arguments)};
})();
;(()=>{// v104 인연 전투 대사 (인연 Lv1+ 동료가 전투 중 말풍선으로 인연 대사)
const LN2={gourry:['배고파… 끝나면 밥 먹자!','내 뒤에 있어, 리나!','이 정도쯤이야!'],zelgadis:['…방심하지 마라.','이 검으로 길을 연다.','흥, 나쁘지 않군.'],amelia:['정의의 철퇴를 받아라!','악은 용서 못 해요!','리나 씨, 지금이에요!'],xellos:['그건 비밀입니다♪','후후, 재미있군요.','어머나, 벌써 끝인가요?'],sera:['빛이여, 지켜주소서.','상처는 제가 치료할게요!','조금만 더 힘내요!'],rhea:['용의 분노를 보여주마!','덤벼라!','하찮군!'],lyra:['바람이 길을 알려줘요.','표적 확인!','놓치지 않아요.'],borin:['망치 맛 좀 봐라!','흠! 단단하군!','드워프를 얕보지 마라!'],kaede:['일섬!','마음을 비우고…','이 칼날로 지킵니다.'],pip:['헤헤, 이거 내 거!','보물 냄새가 나요!','언니 최고!'],noel:['…얼어붙어라.','추위는 익숙해요.','당신 곁은 따뜻해요.']};
const css=document.createElement('style');css.textContent=`.bdsay{position:absolute;z-index:8;transform:translate(-50%,-100%);background:#fffdf7;color:#4a2440;font:800 11px "Noto Sans KR",sans-serif;padding:4px 8px;border-radius:10px;border:1.5px solid #ff8ab0;box-shadow:0 2px 6px #0006;white-space:nowrap;pointer-events:none;animation:bdsy 2.8s ease forwards}
.bdsay:after{content:'';position:absolute;left:var(--tl,50%);bottom:-7px;margin-left:-6px;border:6px solid transparent;border-top-color:#ff8ab0;border-bottom:0}
.bdsay i{color:#ff4a86;font-style:normal;margin-right:3px}
@keyframes bdsy{0%{opacity:0;transform:translate(-50%,-80%) scale(.6)}12%{opacity:1;transform:translate(-50%,-100%) scale(1.05)}20%{transform:translate(-50%,-100%) scale(1)}82%{opacity:1}100%{opacity:0;transform:translate(-50%,-112%)}}`;document.head.appendChild(css);
let nx=performance.now()+9000,cur=null;
const lv=k=>{const x=((C.S().bond||{}).x||{})[k]||0;return [0,30,80,160,280,450].filter(t=>x>=t).length-1};
G._bdSay=k=>{const bt=document.querySelector('#battle');if(!bt||G.screen||G._fin||document.querySelector('.vic,.bsht,.bwarn,.bossin'))return 0;const al=C.aliveAllies().filter(a=>a.k!='lina'&&LN2[a.k]&&(k?a.k==k:lv(a.k)>=1));if(!al.length)return 0;const a=al[Math.floor(Math.random()*al.length)],s=R._AS().get(a.k);if(!s)return 0;
 if(cur)cur.el.remove();const L=LN2[a.k],l=lv(a.k);const el=document.createElement('div');el.className='bdsay';el.innerHTML=`<i>♥${Math.max(1,l)}</i>${L[Math.floor(Math.random()*Math.min(L.length,1+l))]}`;bt.appendChild(el);cur={el,k:a.k,t:performance.now()};return 1};
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{const n=performance.now();if(cur){const s=R._AS().get(cur.k);if(!s||n-cur.t>2800){cur.el.remove();cur=null}else if(document.querySelector('.vic,.bsht,.bwarn')||G._fin){cur.el.remove();cur=null}else{const w=cur.el.offsetWidth||80,L=Math.max(70+w/2,Math.min(296-w/2,s.x));cur.el.style.left=L+'px';cur.el.style.setProperty('--tl',Math.max(8,Math.min(w-8,s.x-L+w/2))+'px');cur.el.style.top=(s.y-114)+'px'}}
 if(n>nx){nx=n+14000+Math.random()*10000;G._bdSay()}}catch(_){}return r};
})();

;(()=>{// v105 보스 도감 (토벌 기록: 처치 수 · 최단 시간 · 대사)
const rec=()=>{const s=C.S();return s.bdex||(s.bdex={})};
const ok=C.ev.kill;C.ev.kill=function(e){try{if(e&&e.boss&&!e.wb&&!C.B.br&&!C.B.rb&&e.img){const b=D.BOSSES.find(x=>x.img==e.img);if(b){const r=rec(),o=r[b.img]||(r[b.img]={n:0,best:0,first:C.stageName?C.stageName(C.S().si):''});o.n++;const t=G._bs&&G._bs.t?(Date.now()-G._bs.t)/1000:0;if(t>0&&(!o.best||t<o.best))o.best=Math.round(t*10)/10}}}catch(_){}return ok.apply(this,arguments)};
const css=document.createElement('style');css.textContent=`.bdx{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.bdxc{position:relative;border-radius:12px;overflow:hidden;border:2px solid #c9902a;background:radial-gradient(ellipse at 50% 85%,#fff3c8 0%,#f0b860 45%,#7a3a1a 100%);height:168px;box-shadow:0 2px 6px #0007}
.bdxc img{position:absolute;left:50%;bottom:36px;transform:translateX(-50%);max-width:92%;max-height:118px;object-fit:contain;filter:drop-shadow(0 4px 4px #0006)}
.bdxc .ch{position:absolute;left:6px;top:6px;background:#000a;color:#ffd77a;font-size:10px;font-weight:800;padding:1px 6px;border-radius:6px}
.bdxc .kc{position:absolute;right:6px;top:6px;background:#c22;color:#fff;font-size:10px;font-weight:900;padding:1px 6px;border-radius:6px}
.bdxc .ft{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#0000,#000d 35%);padding:12px 6px 4px;text-align:center}
.bdxc .ft b{display:block;color:#fff;font-size:12px}.bdxc .ft small{color:#ffd77a;font-size:10px}
.bdxc.lock{border-color:#555;background:radial-gradient(ellipse at 50% 85%,#666,#2a2a33 70%)}.bdxc.lock img{filter:brightness(0) opacity(.55)}.bdxc.lock .ft b{color:#999}
.bdxq{font-size:11px;color:#ffe9c8;font-style:italic;margin:2px 0 0;line-height:1.3}`;document.head.appendChild(css);
G.bossDex=()=>{const r=rec(),n=D.BOSSES.filter(b=>r[b.img]).length,tot=Object.values(r).reduce((a,o)=>a+o.n,0);
 const chOf=i=>{const c=D.BOSSPLAN.findIndex(p=>p.includes(i));return c<0?'':(c+1)+'장 · '+(D.BOSSPLAN[c][1]==i?'챕터 보스':'중간 보스')};
 const last=D.BOSSES.filter(b=>r[b.img]).slice(-1)[0];
 return `<div class=card><div class=ttl>보스 토벌 기록 ${n}/${D.BOSSES.length} <small>총 토벌 ${tot}회</small></div>${last&&last.q?`<div class=bdxq>최근 토벌 · ${last.n}: 「${last.q}」</div>`:''}</div>
 <div class=bdx>${D.BOSSES.map((b,i)=>{const o=r[b.img];return `<div class="bdxc ${o?'':'lock'}"><span class=ch>${chOf(i)}</span>${o?`<span class=kc>×${o.n}</span>`:''}<img src="${A}${b.img}"><div class=ft><b>${o?b.n:'???'}</b><small>${o?(o.best?'최단 '+o.best+'초':'토벌 완료'):'미토벌'}</small></div></div>`}).join('')}</div>`};
})();
;(()=>{// v106 낚시터 (일일 5회 · 타이밍 낚시 · 어종 도감)
const F=[{k:'f1',img:'fish/f1.png',n:'피라미',ic:'fish/f1.png',w:46,sz:[8,15],g:20,c:'#9a9a9a'},{k:'f2',img:'fish/f2.png',n:'은빛 송어',ic:'fish/f2.png',w:28,sz:[25,45],g:60,c:'#4ad07a'},{k:'f3',img:'fish/f3.png',n:'무지개 잉어',ic:'fish/f3.png',w:16,sz:[30,60],st:3,c:'#4ab0ff'},{k:'f4',img:'fish/f4.png',n:'황금 메기',ic:'fish/f4.png',w:8,sz:[50,90],st:8,c:'#b07cff'},{k:'f5',img:'fish/f5.png',n:'전설의 용어',ic:'fish/f5.png',w:2,sz:[120,200],gm:20,c:'#ffa03a'}];
const LIM=5;
const st=()=>{const s=C.S();if(!s.fish)s.fish={day:'',n:0,col:{}};const f=s.fish;if(f.day!=C.today()){f.day=C.today();f.n=0}return f};
const roll=()=>{let t=F.reduce((a,x)=>a+x.w,0),r=Math.random()*t;for(const x of F){if((r-=x.w)<0)return x}return F[0]};
let ph='idle',tm=[],biteAt=0,res=null;const clr=()=>{tm.forEach(clearTimeout);tm=[]};
G._fishForce=k=>{G._fk=k};
const give=x=>{const s=C.S(),gk=C.goldKill(Math.max(0,s.maxSi));const it=[];if(x.g){const v=Math.round(gk*x.g);s.gold+=v;it.push(['it2_gold.png',v,'골드'])}if(x.st){s.stone=(s.stone||0)+x.st;it.push(['it2_stone.png',x.st,'강화석'])}if(x.gm){s.gems+=x.gm;it.push(['it2_gem.png',x.gm,'다이아'])}return it};
const css=document.createElement('style');css.textContent=`
.fsh{position:relative;height:330px;border-radius:14px;overflow:hidden;border:2px solid #8fd8ff;background:url(assets/bg_f_beach.jpg) center 30%/cover}
.fsh .wt{position:absolute;left:0;right:0;bottom:0;height:52%;background:linear-gradient(#5ac8f0cc,#1a7ab0ee);border-top:2px solid #e8faff}
.fsh .wt:before,.fsh .wt:after{content:'';position:absolute;left:-20%;width:140%;height:10px;top:18px;background:repeating-radial-gradient(ellipse at 50% 0,#fff8 0 2px,#0000 3px 22px);animation:fwv 4s linear infinite}
.fsh .wt:after{top:60px;opacity:.6;animation-duration:6s}
@keyframes fwv{from{transform:translateX(0)}to{transform:translateX(-44px)}}
.fsh .rod{position:absolute;left:24px;bottom:-10px;width:8px;height:250px;background:linear-gradient(90deg,#7a4a1a,#c08040);border-radius:4px;transform-origin:50% 100%;transform:rotate(28deg);transition:transform .35s}
.fsh.fcast .rod,.fsh.fbite .rod{transform:rotate(36deg)}.fsh.freel .rod{transform:rotate(14deg)}
.fsh .ln{position:absolute;left:174px;top:134px;width:1.5px;height:45px;background:#fffc;transform-origin:top;transform:rotate(20deg);opacity:0;transition:opacity .2s}
.fsh.fcast .ln,.fsh.fbite .ln{opacity:1}
.fsh .bob{position:absolute;left:150px;top:176px;width:18px;height:22px;border-radius:50% 50% 45% 45%;background:linear-gradient(#ff3a3a 50%,#fff 50%);border:1.5px solid #222;opacity:0;transition:opacity .2s}
.fsh.fcast .bob{opacity:1;animation:fbob 1.6s ease-in-out infinite}.fsh.fbite .bob{opacity:1;animation:fbite .18s ease-in-out infinite}
@keyframes fbob{50%{transform:translateY(3px)}}@keyframes fbite{0%,100%{transform:translateY(4px)}50%{transform:translateY(12px)}}
.fsh .rip{position:absolute;left:132px;top:192px;width:54px;height:16px;border:2px solid #fffa;border-radius:50%;opacity:0}.fsh.fbite .rip{animation:frip .6s ease-out infinite}
@keyframes frip{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.6);opacity:0}}
.fsh .ex{position:absolute;left:142px;top:118px;font:900 42px sans-serif;color:#ffe23a;text-shadow:0 3px 0 #a04000,0 0 12px #fff;opacity:0}.fsh.fbite .ex{opacity:1;animation:fex .3s ease-out}
@keyframes fex{0%{transform:scale(2)}100%{transform:scale(1)}}
.fsh .msg{position:absolute;left:10px;right:10px;top:10px;text-align:center;background:#000a;color:#fff;font-weight:800;font-size:13px;padding:6px;border-radius:10px}
.fsh .catch{position:absolute;left:50%;top:48%;transform:translate(-50%,-50%);text-align:center;background:radial-gradient(#fff8e0,#ffd77a);border:3px solid var(--c);border-radius:16px;padding:10px 18px;box-shadow:0 0 24px var(--c);animation:fcat .5s cubic-bezier(.2,1.5,.4,1) both;min-width:170px}
.fsh .catch .i{width:110px;height:110px;object-fit:contain;display:block;margin:0 auto;animation:fjump 1s ease-in-out infinite}.fsh .catch b{display:block;color:#3a2010;font-size:17px}.fsh .catch small{color:#7a4a10;font-weight:700}
@keyframes fcat{0%{transform:translate(-50%,-50%) scale(.3);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}@keyframes fjump{50%{transform:translateY(-6px) rotate(-8deg)}}
.fbtn{display:block;margin:10px auto 0;width:220px;text-align:center;font:900 18px 'Noto Sans KR',sans-serif;padding:12px;border-radius:14px;color:#fff;background:linear-gradient(#4ac0ff,#1a70d0);border:2px solid #cfeeff;box-shadow:0 4px 0 #0a3a80}
.fbtn.hot{background:linear-gradient(#ff7a3a,#d02a1a);border-color:#ffe0c0;box-shadow:0 4px 0 #701000;animation:fhot .3s infinite alternate}.fbtn.off{opacity:.45}
@keyframes fhot{to{transform:scale(1.06)}}
.fcol{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.fcc{text-align:center;border:2px solid var(--c);border-radius:10px;background:#1a2030;padding:4px 0}.fcc .i{width:44px;height:44px;object-fit:contain;display:block;margin:0 auto}.fcc.lock .i{filter:brightness(0) opacity(.5)}.fcc b{font-size:10px;color:#fff;display:block}.fcc small{font-size:9px;color:#ffd77a}.fcc.lock{filter:grayscale(1);opacity:.4}`;document.head.appendChild(css);
const draw=()=>{const el=$('#screen'),f=st(),left=LIM-f.n;
 el.innerHTML=shell('낚시터','bg_fish_dock.jpg',`<div class="fsh f${ph}" id=fsh><div class=wt></div><div class=rod></div><div class=ln></div><div class=rip></div><div class=bob></div><div class=ex>!</div>
 <div class=msg id=fmsg>${ph=='idle'?`찌를 던지고 입질이 오면 재빨리 챔질하세요! · 오늘 ${left}/${LIM}회`:ph=='cast'?'입질을 기다리는 중…':ph=='bite'?'지금이에요! 챔질!':''}</div>
 ${res?res.x?`<div class=catch style="--c:${res.x.c}"><img class=i src="${A}${res.x.img}"><b>${res.x.n}</b><small>${res.sz}cm${res.rec?' · 최고 기록!':''}</small></div>`:`<div class=catch style="--c:#888"><img class="i fmi" src=assets/fs_bobber.png><b>놓쳤다…</b><small>타이밍이 늦었어요</small></div>`:''}</div>
 <span class="fbtn ${ph=='bite'?'hot':''} ${ph=='cast'||(ph=='idle'&&left<=0)?'off':''}" id=fgo>${ph=='bite'?'챔질!':ph=='cast'?'기다리는 중…':left>0?'던지기 <img class="emi e_fs_bobber" src=assets/fs_bobber.png alt="">':'내일 다시 (05:00)'}</span>
 <div class=card style="margin-top:10px"><div class=ttl>어종 도감 ${F.filter(x=>f.col[x.k]).length}/${F.length}</div><div class=fcol>${F.map(x=>{const o=f.col[x.k];return `<div class="fcc ${o?'':'lock'}" style="--c:${x.c}"><img class=i src="${A}${x.img}"><b>${o?x.n:'???'}</b><small>${o?`×${o.n} · ${o.max}cm`:''}</small></div>`}).join('')}</div>
 <small style="display:block;margin-top:6px">피라미·송어: 골드 · 잉어·메기: 강화석 · 전설의 용어: 다이아 20</small></div>${G.cookCard?G.cookCard():''}`);G.cookWire&&G.cookWire(el);
 el.querySelector('#sBack').onclick=()=>{clr();ph='idle';res=null;closeScreen()};
 el.querySelector('#fgo').onclick=()=>{const f=st();if(ph=='idle'){if(f.n>=LIM)return toast('오늘 낚시 횟수를 모두 사용했어요');f.n++;res=null;ph='cast';draw();tm.push(setTimeout(()=>{ph='bite';biteAt=performance.now();draw();tm.push(setTimeout(()=>{if(ph=='bite'){ph='idle';res={};draw()}},900))},1500+Math.random()*2500))}
  else if(ph=='bite'){clr();const x=G._fk?F.find(q=>q.k==G._fk):roll();G._fk=0;const sz=Math.round(x.sz[0]+Math.random()*(x.sz[1]-x.sz[0]));const o=f.col[x.k]||(f.col[x.k]={n:0,max:0});o.n++;f.inv=f.inv||{};f.inv[x.k]=(f.inv[x.k]||0)+1;const rec=sz>o.max;if(rec)o.max=sz;const it=give(x);ph='idle';res={x,sz,rec};updateHud();draw();tm.push(setTimeout(()=>rewardPop(it,'낚시 · '+x.n),900))}}};
if(!MENU.some(m=>m[0]=='fish')){const i=MENU.findIndex(m=>m[0]=='explore');MENU.splice(i+1,0,['fish','낚시','ic3_fish.png'])}try{renderHub()}catch(_){}
const rs=renderScreen;renderScreen=function(){if(G.screen=='fish')return draw();return rs.apply(this,arguments)};
})();

;(()=>{// v107 요리 (잡은 생선으로 요리 → 전투 버프 시간 연장 · 하루 2회)
const RC=[{k:'r1',n:'생선 구이',ic:'<img src=assets/dish/r1.png>',need:{f1:2},bf:['gold'],min:10},{k:'r2',n:'송어 스테이크',ic:'<img src=assets/dish/r2.png>',need:{f2:1,f1:1},bf:['exp'],min:10},{k:'r3',n:'무지개 잉어찜',ic:'<img src=assets/dish/r3.png>',need:{f3:1},bf:['atk'],min:10},{k:'r4',n:'황금 메기탕',ic:'<img src=assets/dish/r4.png>',need:{f4:1},bf:['atk','gold','exp'],min:10},{k:'r5',n:'용어 정식',ic:'<img src=assets/dish/r5.png>',need:{f5:1},bf:['atk','gold','exp'],min:20}];
const BN={atk:'공격력 +50%',gold:'골드 x2',exp:'경험치 x2'},FI={f1:'fish/f1.png',f2:'fish/f2.png',f3:'fish/f3.png',f4:'fish/f4.png',f5:'fish/f5.png'},LIM=2,CAP=120*60e3;
const fs=()=>{const s=C.S();s.fish=s.fish||{day:'',n:0,col:{}};const f=s.fish;f.inv=f.inv||{};if(f.ckd!=C.today()){f.ckd=C.today();f.ck=0}return f};
const can=r=>Object.entries(r.need).every(([k,v])=>(fs().inv[k]||0)>=v);
G.cook=k=>{const r=RC.find(x=>x.k==k),f=fs(),s=C.S();if(!r||f.ck>=LIM||!can(r))return 0;Object.entries(r.need).forEach(([q,v])=>f.inv[q]-=v);f.ck++;const d=new Date().toDateString();s.buf=s.buf||{day:d,n:{}};const now=Date.now();r.bf.forEach(b=>{s.buf[b]=Math.min(now+CAP,Math.max(now,s.buf[b]||0)+r.min*60e3)});return r};
const css=document.createElement('style');css.textContent=`.ckr{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #fff2}.ckr .di img{width:40px;height:40px;object-fit:contain}.ckr .di{font-size:30px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:radial-gradient(#fff6d8,#e0a050);border-radius:50%;border:2px solid #ffd77a;flex:0 0 44px}
.ckr .f{flex:1;min-width:0}.ckr b{font-size:13px;color:#fff}.ckr small{display:block;font-size:10px;color:#ffd77a}.ckr .nd{display:flex;gap:4px;margin-top:2px}.ckr .nd span{display:flex;align-items:center;font-size:10px;color:#fff;background:#0006;border-radius:6px;padding:0 4px 0 0}.ckr .nd img{width:22px;height:22px;object-fit:contain}.ckr .nd span.no{color:#ff7a7a}
.ckb{padding:6px 12px;border-radius:10px;font-weight:900;font-size:12px;color:#fff;background:linear-gradient(#ffa03a,#d05a10);border:1.5px solid #ffe0b0}.ckb.off{opacity:.4;filter:grayscale(.6)}
.ckpop{position:fixed;left:50%;top:40%;transform:translate(-50%,-50%);z-index:999;text-align:center;background:radial-gradient(#fff8e0,#ffc870);border:3px solid #ff8a2a;border-radius:18px;padding:14px 22px;box-shadow:0 0 30px #ffa040;animation:fcat .5s cubic-bezier(.2,1.5,.4,1) both;pointer-events:none}.ckpop .di img{width:110px;height:110px;object-fit:contain}.ckpop .di{font-size:64px;display:block;animation:ckst 1s ease-in-out infinite}.ckpop b{color:#5a2a00;font-size:18px;display:block}.ckpop small{color:#8a4a10;font-weight:800}
@keyframes ckst{50%{transform:translateY(-5px) scale(1.05)}}`;document.head.appendChild(css);
G.cookCard=()=>{const f=fs();return `<div class=card style="margin-top:10px"><div class=ttl><img class="emi e_fs_board" src=assets/fs_board.png alt="">요리 <small>오늘 ${f.ck}/${LIM}회 · 버프 시간 연장 (최대 2시간)</small></div>${RC.map(r=>{const ok=f.ck<LIM&&can(r);return `<div class=ckr><span class=di>${r.ic}</span><div class=f><b>${r.n}</b><small>${r.bf.map(b=>BN[b]).join(' · ')} +${r.min}분</small><div class=nd>${Object.entries(r.need).map(([k,v])=>`<span class="${(f.inv[k]||0)>=v?'':'no'}"><img src="${A}${FI[k]}">${f.inv[k]||0}/${v}</span>`).join('')}</div></div><span class="ckb ${ok?'':'off'}" data-ck=${r.k}>요리</span></div>`}).join('')}</div>`};
G.cookWire=el=>el.querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>{const f=fs();if(f.ck>=LIM)return toast('오늘은 더 요리할 수 없어요');const r=G.cook(b.dataset.ck);if(!r)return toast('재료가 부족해요');try{updateHud()}catch(_){}renderScreen();const p=document.createElement('div');p.className='ckpop';p.innerHTML=`<span class=di>${r.ic}</span><b>${r.n} 완성!</b><small>${r.bf.map(x=>BN[x]).join(' · ')} +${r.min}분</small>`;document.body.appendChild(p);setTimeout(()=>p.remove(),1800)});
})();
;(()=>{// v108 마도 특성 (스테이지 3개 클리어마다 1포인트 · 3계열 × 5단계 트리)
const IC={atk:'sk/fire.png',hp:'sk/heal.png',gold:'it2_gold.png'};
const css=document.createElement('style');css.textContent=`
.tlh{display:flex;align-items:center;gap:10px}.tlh .f b,.tlh .f small{display:block}.tlh .pt{font:900 30px Maplestory,sans-serif;color:#ffe27a;text-shadow:0 2px 0 #7a3a00;min-width:44px;text-align:center}
.tlt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px}
.tlc{position:relative;border-radius:14px;padding:8px 4px 6px;background:linear-gradient(#24182ecc,#120c1acc);border:2px solid var(--c);text-align:center}
.tlc>b{display:block;color:var(--c);font-size:13px}.tlc>small{display:block;color:#ddd;font-size:10px;margin-bottom:4px}
.tln{position:relative;margin:0 auto;width:70px;padding-top:16px}
.tln:before{content:'';position:absolute;left:50%;top:0;width:4px;height:16px;margin-left:-2px;background:#555;border-radius:2px}.tln:first-of-type{padding-top:4px}.tln:first-of-type:before{display:none}
.tln.on:before{background:var(--c);box-shadow:0 0 6px var(--c)}
.tln .o{width:52px;height:52px;margin:0 auto;border-radius:50%;border:3px solid #555;background:#222;display:flex;align-items:center;justify-content:center;filter:grayscale(1) brightness(.6);transition:.2s}
.tln .o img{width:32px;height:32px;object-fit:contain}
.tln.on .o{border-color:var(--c);filter:none;background:radial-gradient(#fff8,var(--c) 60%,#0008);box-shadow:0 0 12px var(--c)}
.tln.nx .o{border-color:#fff;filter:none;background:#3a2a40;animation:tlp 1s ease-in-out infinite alternate}
@keyframes tlp{to{box-shadow:0 0 14px #fff}}
.tln em{display:block;font-style:normal;font-size:10px;color:#fff;margin-top:2px;white-space:nowrap}.tln i{display:block;font-style:normal;font-size:10px;color:var(--c);font-weight:800}
.tln.lock em,.tln.lock i{color:#777}
.tln .cs{position:absolute;right:-2px;top:12px;background:#000c;color:#ffe27a;font-size:9px;font-weight:900;border-radius:6px;padding:0 4px;border:1px solid #ffe27a}
.tln.cap .o{width:60px;height:60px}.tlfx{position:absolute;left:50%;top:50%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;border:3px solid #fff;animation:tlfx .6s ease-out forwards;pointer-events:none}
@keyframes tlfx{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.6);opacity:0}}`;document.head.appendChild(css);
const draw=fx=>{const el=$('#screen'),s=C.S(),t=s.tal||{},P=C.talPts();
 el.innerHTML=shell('마도 특성','bg_library.jpg',`<div class="card tlh"><span class=pt>${P}</span><div class=f><b>특성 포인트</b><small>스테이지 3개 클리어마다 +1 · 노드를 탭해 습득 (아래 단계부터)</small>${G.tlHdr?G.tlHdr():''}</div></div>
 <div class="card tlsum"><span class=tlsl>특성 합계</span>${C.TAL.map(b=>`<span class=tlsc style="--c:${b.c}">${b.d} <b>+${Math.round(C.talB(b.k)*100)}%</b></span>`).join('')}</div>
 <div class=tlt>${C.TAL.map(b=>{const n=t[b.k]||0;return `<div class=tlc style="--c:${b.c}"><b>${b.n}</b><small>${b.d} 강화</small><u class=tlq>${n}/${b.v.length}</u>${G.tlNext?G.tlNext(b,n,P):''}${b.v.map((v,i)=>{const on=i<n,nx=i==n,cs=C.TALC[i];return `<div class="tln ${on?'on':nx?'nx'+(P>=cs?' can':' poor'):'lock'} ${i==4?'cap':''}" data-tl="${b.k}" data-i=${i}><div class=o><img src="${A}${IC[b.k]}"></div>${!on?`<span class="cs${nx?(P>=cs?' ok':' no'):''}">${cs}P</span>`:''}<em>${b.nm[i]}</em><i>${b.d} +${Math.round(v*100)}%</i>${fx==b.k+i?'<span class=tlfx></span>':''}</div>`}).join('')}</div>`}).join('')}</div>`);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-tl]').forEach(e=>e.onclick=G.tlWrap(e,()=>{const k=e.dataset.tl,i=+e.dataset.i,n=(C.S().tal||{})[k]||0;if(i<n)return;if(i>n)return toast('아래 단계를 먼저 습득하세요');if(!C.talUp(k))return toast('특성 포인트가 부족해요');try{updateHud()}catch(_){}draw(k+i);toast((C.TAL.find(b=>b.k==k).nm[i])+' 습득!')}))};
if(!MENU.some(m=>m[0]=='talent')){const i=MENU.findIndex(m=>m[0]=='star');MENU.splice(i+1,0,['talent','특성','ic3_talent.png'])}try{renderHub()}catch(_){}
const rs=renderScreen;renderScreen=function(){if(G.screen=='talent')return draw();return rs.apply(this,arguments)};
})();
;(()=>{// v109 갤러리 (동료 일러스트 · 보스 · 코스튬 감상 · 전체 화면 뷰어, 보상 없음)
const CUTK={amelia:1,borin:1,gourry:1,noel:1,sera:1,zelgadis:1,xellos:1,rhea:1,lyra:1,kaede:1,pip:1};
const css=document.createElement('style');css.textContent=`
.glt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.glc{position:relative;aspect-ratio:3/4;border-radius:10px;overflow:hidden;border:2px solid var(--c,#c9902a);background:radial-gradient(ellipse at 50% 75%,#fff6d8,#f0b0c8 55%,#6a3a7a)}
.glc img{position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:100%;max-width:none;object-fit:contain}
.glc.bs img{height:auto;width:96%;bottom:18px}.glc b{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#0000,#000c);color:#fff;font-size:10px;text-align:center;padding:8px 0 3px}
.glc.lock{background:#2a2a33;border-color:#555}.glc.lock img{filter:brightness(0) opacity(.5)}.glc.lock b{color:#888}
.glv{position:fixed;inset:0;z-index:1000;background:radial-gradient(ellipse at 50% 60%,#ffe8f0,#d088b0 50%,#2a1030);display:flex;flex-direction:column;align-items:center;justify-content:center;animation:glin .35s ease both}
.glv img{max-width:96%;max-height:62%;object-fit:contain;filter:drop-shadow(0 8px 16px #0008);animation:glzm .5s cubic-bezier(.2,1.3,.4,1) both}
.glv .nm{margin-top:10px;font:900 24px Maplestory,'Noto Sans KR',sans-serif;color:#fff;text-shadow:0 2px 0 #5a2040,0 0 10px #ff8ac0}.glv .sb{color:#fff;font-size:12px;margin-top:2px;opacity:.9}
.glv .q{margin:10px 20px 0;background:#fffdf7;color:#4a2440;border-radius:12px;padding:8px 12px;font-size:13px;font-weight:700;max-width:320px;text-align:center}
.glv .x{position:absolute;bottom:40px;color:#fff;font-size:12px;opacity:.8}.glv .nv{position:absolute;top:45%;font-size:34px;color:#fff;padding:10px;text-shadow:0 2px 4px #000}
@keyframes glin{from{opacity:0}}@keyframes glzm{from{transform:scale(.7);opacity:0}}`;document.head.appendChild(css);
let tab='c';
const items=()=>{const s=C.S();if(tab=='c')return D.COMPS.map(c=>({img:CUTK[c.k]?'cutc/'+c.k+'.png':c.img,n:c.n,sub:(D.FACTIONS[c.fac]||{}).n||'',own:!!s.comps[c.k],c:(D.RAR[c.g]||{}).c,q:(c.d||'')}));
 if(tab=='b'){const r=s.bdex||{};return D.BOSSES.map(b=>({img:b.img,n:b.n,sub:'보스',own:!!r[b.img],c:'#ff6a3a',q:b.q,bs:1}))}
 return (D.SKINS||[]).map(k=>({img:k.img,n:k.n,sub:'리나 코스튬',own:k.cost==0||!!(s.skins||{})[k.k],c:'#b07cff'})).concat((D.CSKINS||[]).map(k=>({img:k.img,n:k.n,sub:((D.COMPS.find(c=>c.k==k.k)||{}).n||'')+' 코스튬',own:!!(s.cown||{})[k.k],c:'#ff8ab0'})))};
const view=i=>{const L=items().filter(x=>x.own);if(!L.length)return;i=(i+L.length)%L.length;const x=L[i];document.querySelectorAll('.glv').forEach(e=>e.remove());const v=document.createElement('div');v.className='glv';
 v.innerHTML=`<span class=nv style="left:6px" data-p>‹</span><span class=nv style="right:6px" data-n>›</span><img src="${A}${x.img}"><div class=nm>${x.n}</div><div class=sb>${x.sub}</div>${x.q?`<div class=q>「${x.q}」</div>`:''}<div class=x>탭하여 닫기 · ‹ › 넘기기 (${i+1}/${L.length})</div>`;
 v.onclick=e=>{if(e.target.dataset.p!=null)return view(i-1);if(e.target.dataset.n!=null)return view(i+1);v.remove()};document.body.appendChild(v)};
G._glView=view;
const draw=()=>{const el=$('#screen'),L=items(),own=L.filter(x=>x.own);
 el.innerHTML=shell('갤러리','bg_gallery_hall.jpg',`<div class=entabs>${[['c','동료'],['b','보스'],['s','코스튬']].map(([k,n])=>`<span class="${tab==k?'on':''}" data-gt=${k}>${n}</span>`).join('')}</div>
 <div class=card><div class=ttl>수집한 일러스트 ${own.length}/${L.length} <small>탭하면 크게 감상</small></div><div class=glt>${L.map(x=>`<div class="glc ${x.own?'':'lock'} ${x.bs?'bs':''}" style="--c:${x.c}" ${x.own?`data-gv=${own.indexOf(x)}`:''}><img src="${A}${x.img}"><b>${x.own?x.n:'???'}</b></div>`).join('')}</div></div>`);
 el.querySelector('#sBack').onclick=()=>closeScreen();
 el.querySelectorAll('[data-gt]').forEach(b=>b.onclick=()=>{tab=b.dataset.gt;draw()});el.querySelectorAll('[data-gv]').forEach(b=>b.onclick=()=>view(+b.dataset.gv))};
if(!MENU.some(m=>m[0]=='gallery')){const i=MENU.findIndex(m=>m[0]=='codex');MENU.splice(i+1,0,['gallery','갤러리','ic3_gallery.png'])}try{renderHub()}catch(_){}
const rs=renderScreen;renderScreen=function(){if(G.screen=='gallery')return draw();return rs.apply(this,arguments)};
})();
;(()=>{// v110 보스 전리품 폭발 (보스 처치 시 전리품이 튀어나와 바닥에 튕긴 뒤 HUD로 빨려 들어감 · 시각 전용)
const css=document.createElement('style');css.textContent=`
.bloot{position:absolute;z-index:7;width:34px;height:34px;margin:-17px 0 0 -17px;pointer-events:none;animation:blj .75s cubic-bezier(.3,0,.7,1) both}
.bloot img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 2px #0008);animation:blb .75s ease-out both}
.bloot .bm{position:absolute;left:50%;bottom:6px;width:30px;height:170px;margin-left:-15px;background:linear-gradient(90deg,#0000,var(--bc) 30%,#fff 50%,var(--bc) 70%,#0000);-webkit-mask:linear-gradient(#0000,#000 45%,#000);mask:linear-gradient(#0000,#000 45%,#000);opacity:0;box-shadow:0 0 18px var(--bc);animation:blbm 1.3s 1.1s ease-out both;border-radius:14px;transform-origin:50% 100%}
.bloot .sd{position:absolute;left:50%;bottom:-4px;width:26px;height:7px;margin-left:-13px;border-radius:50%;background:#0005;animation:blsd .75s ease-out both}
.bloot.fly{transition:left .5s cubic-bezier(.6,0,.9,.4),top .5s cubic-bezier(.6,0,.9,.4),transform .5s,opacity .5s;transform:scale(.5);opacity:.2}
@keyframes blj{0%{transform:translate(var(--sx),var(--sy)) scale(.4)}55%{transform:translate(calc(var(--sx)*.4),-70px) scale(1.1)}80%{transform:translate(0,0) scale(1)}90%{transform:translate(0,-10px)}100%{transform:translate(0,0)}}
@keyframes blb{0%{transform:rotate(-200deg)}80%{transform:rotate(0)}}
@keyframes blsd{0%,70%{opacity:0;transform:scale(.3)}100%{opacity:1}}
@keyframes blbm{0%{opacity:0;transform:scaleY(.1)}20%{opacity:1;transform:scaleY(1)}75%{opacity:.95}100%{opacity:0;transform:scaleY(1.1)}}`;document.head.appendChild(css);
const LOOT=[['it2_gold.png',''],['it2_gold.png',''],['it2_gold.png',''],['it2_gem.png','#4ab0ff'],['it2_stone.png','#c0c8ff'],['it2_exp.png','#b07cff'],['it2_gold.png','']];
G._bossLoot=(bx,by)=>{const bt=document.querySelector('#battle');if(!bt)return;const n=LOOT.length;LOOT.forEach(([im,bc],i)=>{const x=Math.max(90,Math.min(280,bx-80+i*(150/(n-1))+(Math.random()*14-7))),y=515+Math.random()*20;const d=document.createElement('div');d.className='bloot';d.style.left=x+'px';d.style.top=y+'px';d.style.setProperty('--sx',(bx-x)+'px');d.style.setProperty('--sy',(by-y)+'px');d.style.animationDelay=(i*.05)+'s';
 d.innerHTML=`${bc?`<span class=bm style="--bc:${bc}"></span>`:''}<span class=sd></span><img src="${A}${im}" style="animation-delay:${i*.05}s">`;bt.appendChild(d);
 setTimeout(()=>{const t=document.querySelector(im=='it2_gem.png'?'#cGem':'#cGold'),br=bt.getBoundingClientRect();let tx=300,ty=20;if(t){const r=t.getBoundingClientRect();tx=r.left-br.left+r.width/2;ty=r.top-br.top+r.height/2}d.style.animation='none';d.classList.add('fly');d.style.left=tx+'px';d.style.top=ty+'px';setTimeout(()=>d.remove(),550)},2600+i*60)})};
const ok=C.ev.kill;C.ev.kill=function(e){try{if(e&&e.boss&&!e.wb&&!G.screen&&G.screen!=='sim'){const q=R._ES().get(e);if(q){const bx=q.x,by=q.y-60;setTimeout(()=>G._bossLoot(bx,by),350)}}}catch(_){}return ok.apply(this,arguments)};
})();
;(()=>{// v111 상성 약점 표시 (파티가 상성 우세인 적 발밑에 회전 조준 링 + '약점' 태그 · 시각 전용)
const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||G._fin||(R.opt&&!R.opt.fx)||document.querySelector('.vic,.bwarn:not(.out)'))return;const c=R._bc();if(!c)return;
 const fs=new Set([{k:'lina'},...(C.B.allies||[]).filter(a=>a.hp>0)].map(a=>C.allyFac(a)).filter(Boolean));if(!fs.size)return;
 const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,T=performance.now()/1000,ES=R._ES();ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.font='900 10px "Noto Sans KR",sans-serif';ctx.textAlign='center';
 const L0=C.alive().filter(e=>{if(!e.fac||e.wb)return false;let adv=false;fs.forEach(f=>{if(D.COUNTER[f]==e.fac)adv=true});const q=adv&&ES.get(e);return q&&q.x<=292&&q.x>=70}).map(e=>[e,ES.get(e)]).sort((A,B)=>(B[0].boss?1:0)-(A[0].boss?1:0)||A[1].x-B[1].x),busy=C.alive().length>4;
 L0.forEach(([e,q],ix)=>{const full=e.boss||ix<1;
  if(!full){ctx.globalAlpha=.85;ctx.fillStyle='#c01a1a';ctx.beginPath();ctx.arc(q.x,q.y+2,6,0,6.283);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 8px sans-serif';ctx.fillText('▲',q.x,q.y+5);ctx.font='900 10px "Noto Sans KR",sans-serif';return}
  const r=e.boss?50:30,y=q.y+2,p=.75+.25*Math.sin(T*5);{const g=ctx.createRadialGradient(q.x,y,2,q.x,y,r);g.addColorStop(0,'#ff3a3a00');g.addColorStop(.7,'#ff3a3a55');g.addColorStop(1,'#ff3a3a00');ctx.globalAlpha=p;ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(q.x,y,r,r*.34,0,0,6.283);ctx.fill()}ctx.globalAlpha=p;ctx.shadowColor='#ff2020';ctx.shadowBlur=8;ctx.strokeStyle='#ff4040';ctx.lineWidth=3.5;ctx.setLineDash([7,5]);ctx.lineDashOffset=-T*30;ctx.beginPath();ctx.ellipse(q.x,y,r,r*.32,0,0,6.283);ctx.stroke();ctx.setLineDash([]);ctx.shadowBlur=0;ctx.setLineDash([7,5]);ctx.lineDashOffset=-T*30;ctx.beginPath();ctx.ellipse(q.x,y,r,r*.32,0,0,6.283);ctx.stroke();ctx.setLineDash([]);ctx.shadowBlur=0;
  ctx.fillStyle='#ffd23a';for(let i=0;i<4;i++){const a=T*1.6+i*1.5708,x=q.x+Math.cos(a)*r,yy=y+Math.sin(a)*r*.32;ctx.beginPath();ctx.moveTo(x,yy-4);ctx.lineTo(x+3,yy);ctx.lineTo(x,yy+4);ctx.lineTo(x-3,yy);ctx.fill()}
  if(e.boss&&G.weakHud)return;ctx.globalAlpha=.95;const w=38,lx=Math.max(70+w/2,q.x-r-w/2+6),ty=y+4;ctx.fillStyle='#c01a1a';ctx.beginPath();ctx.roundRect?ctx.roundRect(lx-w/2,ty-10,w,15,7):ctx.rect(lx-w/2,ty-10,w,15);ctx.fill();ctx.strokeStyle='#ffd23a';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#fff';ctx.fillText('약점 ▲',lx,ty+1.5)});
 ctx.restore()}catch(_){}};
})();

;(()=>{// v112 스킬 총 피해 (광역 스킬 적중 합계를 크게 표시 · 시각 전용)
const st=document.createElement('style');st.textContent=`.tdmg{position:absolute;left:185px;top:318px;transform:translate(-50%,-50%);z-index:30;pointer-events:none;text-align:center;font-family:"Noto Sans KR",sans-serif;animation:tdIn 1.6s ease-out forwards}
.tdm{font:800 12px "Noto Sans KR",sans-serif;color:#fff;text-shadow:0 1px 2px #000,0 0 6px #ff7a00;margin-top:2px;letter-spacing:0;-webkit-text-stroke:0;font-style:normal;text-align:center}.tdm .tdv{display:inline-block;font:900 22px/1 "Noto Sans KR";color:#ffd23a!important;-webkit-text-fill-color:#ffd23a;background:none!important;-webkit-text-stroke:1px #6a2200;text-shadow:0 2px 0 #3a1000,0 0 8px #ff9a2a;margin-left:5px;vertical-align:-3px;animation:none;opacity:1}
.tdmg.tdlo{top:392px;transition:top .18s}
.tdmg small{display:block;font:800 11px "Noto Sans KR";color:#fff;letter-spacing:1px;text-shadow:0 1px 2px #000,0 0 6px #ff7a00}
.tdmg b{display:block;font:900 30px/1 "Noto Sans KR";background:linear-gradient(#fffbe0,#ffc23a 55%,#ff7a10);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:1.2px #6a2200;filter:drop-shadow(0 2px 0 #3a1000) drop-shadow(0 0 8px #ff9a2a)}
.tdmg i{display:block;margin:2px auto 0;width:150px;height:3px;background:linear-gradient(90deg,#ffc23a00,#ffc23a,#ffc23a00)}
@keyframes tdIn{0%{opacity:0;transform:translate(-50%,-50%) scale(1.8)}12%{opacity:1;transform:translate(-50%,-50%) scale(.94)}20%{transform:translate(-50%,-50%) scale(1.04)}26%{transform:translate(-50%,-50%) scale(1)}78%{opacity:1;transform:translate(-50%,-56%) scale(1)}100%{opacity:0;transform:translate(-50%,-75%) scale(.96)}}`;document.head.appendChild(st);
let acc=null;const oh=C.hitEnemy;C.hitEnemy=(e,dmg,crit,src)=>{const k=src&&src.sp,h0=e&&e.hp>0?e.hp:0;const r=oh(e,dmg,crit,src);if(k&&h0>0){const d=e.hp>0?h0-e.hp:Math.max(h0,dmg||0);if(!acc||acc.k!=k){if(acc)clearTimeout(acc.to);acc={k,v:0,n:new Set()}}acc.v+=d;acc.n.add(e);clearTimeout(acc.to);acc.to=setTimeout(show,260)}return r};
function show(a0,tr){const a=a0||acc;if(!a0)acc=null;if(!a||a.n.size<2||a.v<=0)return;const R=G.R||window.RENDER;tr=tr||0;const ct=R&&R.cut&&R.cut.t,cc=R&&R.ccut&&R.ccut.t,busy=(ct!=null&&ct<1.9&&ct!==a._ct)||(cc!=null&&cc<1.4&&cc!==a._cc);a._ct=ct;a._cc=cc;if(busy){if(tr<30)setTimeout(()=>show(a,tr+1),150);return}if(G.screen||G._fin||[...document.querySelectorAll('.vic,.bwarn:not(.out),.bsht')].some(n=>!n.classList.contains('bgone')&&n.isConnected&&+getComputedStyle(n).opacity>.05&&getComputedStyle(n).display!='none'))return;const sp=D.SPELLS.find(x=>x.k==a.k);const b=document.querySelector('#battle');if(!b)return;b.querySelectorAll('.tdmg').forEach(n=>n.remove());const el=document.createElement('div');el.className='tdmg';el.innerHTML=`<small>${sp?sp.n:''} · ${a.n.size}명 적중</small><b>${fmt(Math.round(a.v))}</b><i></i>`;b.appendChild(el);el._a=a;G._tdShow=show;G._tdLast=a.v;const merge=mk=>{if(!el.isConnected||mk.querySelector('.tdm'))return;const t=document.createElement('div');t.className='tdm';t.innerHTML=`${sp?sp.n:''} 총 피해 <span class=tdv>${fmt(Math.round(a.v))}</span>`;mk.appendChild(t);el.remove()};const low=n=>{if(n&&n.classList.contains('mkb'))return merge(n);el.classList.add('tdlo')};{const m0=document.querySelector('.mkb:not(.bgone)');if(m0)merge(m0);else if(document.querySelector('.fevban:not(.bgone)'))low()}const mo=new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&(n.classList.contains('mkb')||n.classList.contains('fevban')||n.classList.contains('wclr')))low(n)});mo.observe(b,{childList:true});setTimeout(()=>mo.disconnect(),1700);setTimeout(()=>el.remove(),1650)};G._tdShow=show
})();
;(()=>{// v113 경험치 구슬 (처치 시 푸른 빛 구슬이 EXP 바로 날아가 흡수 · 시각 전용)
const st=document.createElement('style');st.textContent=`.xpo{position:fixed;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;z-index:40;pointer-events:none;background:radial-gradient(circle,#fff 0 25%,#8ef4ff 45%,#2a9cff 70%,#2a9cff00 72%);box-shadow:0 0 10px 4px #4ac8ffcc}
#xpBar.xpfl{filter:brightness(1.8) drop-shadow(0 0 4px #7fe3ff);transition:filter .05s}#xpBar{transition:filter .35s}`;document.head.appendChild(st);
let live=0,ft=null;const ok=C.ev.kill;C.ev.kill=(e,...a)=>{const r=ok(e,...a);try{if(G.screen||G._fin||live>24||(R.opt&&!R.opt.fx))return r;const q=R._ES().get(e),tg=document.getElementById('xpBar'),cv=R._bc();if(!q||!tg||!cv)return r;
 const cr=cv.getBoundingClientRect(),f=cr.width/cv.clientWidth,tr=tg.getBoundingClientRect(),n=e.boss?8:e.el?4:2;
 for(let i=0;i<n;i++){const d=document.createElement('i');d.className='xpo';document.body.appendChild(d);live++;const x0=cr.left+q.x*f+(Math.random()-.5)*26,y0=cr.top+(q.y-34)*f,mx=x0+(Math.random()-.5)*60,my=y0-40-Math.random()*40,x1=tr.left+tr.width*(.35+Math.random()*.5),y1=tr.top+tr.height/2,D=650+Math.random()*250+i*60;
  const an=d.animate([{transform:`translate(${x0}px,${y0}px) scale(.3)`,opacity:0},{transform:`translate(${mx}px,${my}px) scale(1.15)`,opacity:1,offset:.32},{transform:`translate(${(mx+x1)/2}px,${Math.min(my,y1)-10}px) scale(1)`,opacity:1,offset:.7},{transform:`translate(${x1}px,${y1}px) scale(.5)`,opacity:.9}],{duration:D,delay:120+i*40,easing:'cubic-bezier(.45,.05,.55,.95)',fill:'both'});
  an.onfinish=()=>{d.remove();live--;G.bump(tg,'xpfl')};an.oncancel=()=>{d.remove();live--}}}catch(_){}return r};
})();

;(()=>{// v112b 컷인 중 총 피해 패널 숨김
let pc=null,pl=null;const of=R.frame;R.frame=dt=>{of(dt);try{const t=document.querySelector('.tdmg');const cc=R.ccut&&R.ccut.t,ct=R.cut&&R.cut.t;const on=(cc!=null&&cc<1.4&&cc!==pc)||(ct!=null&&ct<1.9&&ct!==pl);pc=cc;pl=ct;if(t&&on&&t._a&&!t._a.rq&&G._tdShow){t._a.rq=1;t.remove();G._tdShow(t._a,0)}}catch(_){}};
})();
;(()=>{// v114 보스 HP 퍼센트 표시 + v115 피해 잔상 바 (시각 전용)
let gb=null,gv=100,gd=0;const of=R.frame;R.frame=dt=>{of(dt);try{if(G.screen||G._fin)return;let bo=null;{const A=R._alv?R._alv():C.alive();for(let i=0;i<A.length;i++){const e=A[i];if(e.boss&&!e.wb){bo=e;break}}}if(!bo)return;/* r311: no per-frame filter/find arrays */const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,p=Math.max(0,bo.hp/bo.max*100);
 if(gb!==bo){gb=bo;gv=p;gd=0}if(p<gv){gd+=dt;if(gd>.35)gv=Math.max(p,gv-(gv-p)*Math.min(1,dt*4)-dt*6)}else{gv=p;gd=0}if(p>=gv)gd=0;
 ctx.save();ctx.setTransform(sc,0,0,sc,0,0);{const x0=104,bw=W-232;if(gv-p>.15){const xa=x0+bw*p/100,xb=x0+bw*gv/100;let gr=ctx._gbg;if(!gr){gr=ctx._gbg=ctx.createLinearGradient(0,237,0,250);gr.addColorStop(0,'#fff8e0');gr.addColorStop(1,'#ffb070')}/* r311: cached */ctx.globalAlpha=.85;ctx.fillStyle=gr;ctx.fillRect(xa,241,xb-xa,7);ctx.globalAlpha=1}}R._bhp&&R._bhp(p);/* r311: % moved into the #bossNm DOM label (render.js), written only on whole-number change *//* r308: % on the name row at the right end of the frame window (name is capped to 124px in render.js), no longer centred over the name */ctx.restore()}catch(_){}};
})();
;(()=>{// v116 보스 VS 스플래시 (보스 등장 시 리나 vs 보스 대치 화면 · 캔버스 'BOSS 등장' 띠 대체 · 시각 전용)
const st=document.createElement('style');st.textContent=`.vsx{position:absolute;left:0;right:0;top:300px;height:200px;z-index:34;pointer-events:none;overflow:hidden;background:url(assets/vs_bg.jpg) center/cover;animation:vsxO 2.2s ease-in forwards}
.vsx .vl,.vsx .vr{position:absolute;top:0;bottom:0;width:62%;overflow:hidden}
.vsx .vl{left:0;clip-path:polygon(0 0,100% 0,78% 100%,0 100%);background:linear-gradient(90deg,#0a1a5a66,#0000);animation:vsxL .38s cubic-bezier(.2,.9,.3,1) both}
.vsx .vr{right:0;clip-path:polygon(22% 0,100% 0,100% 100%,0 100%);background:linear-gradient(270deg,#3a000866,#0000);animation:vsxR .38s cubic-bezier(.2,.9,.3,1) both}
.vsx .vl img{position:absolute;left:-30px;top:-6px;height:215px;filter:drop-shadow(4px 0 0 #fff8)}
.vsx .vr img{position:absolute;right:30px;bottom:6px;height:170px;filter:drop-shadow(-3px 0 0 #fff8) drop-shadow(0 0 10px #ff3a2a)}
.vsx .vs{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:900 64px/1 Maplestory,"Noto Sans KR",sans-serif;font-style:italic;background:linear-gradient(#fffbe0,#ffd23a 50%,#ff7a10);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:2px #4a1400;filter:drop-shadow(0 3px 0 #2a0800) drop-shadow(0 0 12px #ffb02a);animation:vsxV .5s .25s cubic-bezier(.3,1.6,.5,1) both}
.vsx .sl{position:absolute;left:50%;top:-20px;bottom:-20px;width:6px;background:#fff;transform:translateX(-50%) rotate(12deg);box-shadow:0 0 16px 6px #fff8;animation:vsxS .5s .2s both}
.vsx .nl,.vsx .nr{position:absolute;bottom:10px;font:900 15px "Noto Sans KR",sans-serif;color:#fff;text-shadow:0 2px 0 #0008,0 0 6px #000}
.vsx .nl{left:12px;text-align:left}.vsx .nr{right:12px;text-align:right}.vsx small{display:block;font:800 10px "Noto Sans KR";color:#ffe9a0}
.vsx .bt{position:absolute;right:12px;top:8px;font:900 11px "Noto Sans KR";color:#ffd23a;letter-spacing:2px;text-shadow:0 1px 2px #000}
.vsx .bd{position:absolute;left:0;right:0;height:3px;background:linear-gradient(90deg,#ffd23a00,#ffd23a,#ffd23a00)}.vsx .bd.t{top:0}.vsx .bd.b{bottom:0}
@keyframes vsxL{0%{transform:translateX(-100%)}100%{transform:none}}@keyframes vsxR{0%{transform:translateX(100%)}100%{transform:none}}
@keyframes vsxV{0%{opacity:0;transform:translate(-50%,-50%) scale(3)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes vsxS{0%{opacity:0;height:0}40%{opacity:1}100%{opacity:.9}}
@keyframes vsxO{0%,80%{opacity:1}100%{opacity:0;transform:scale(1.05)}}`;document.head.appendChild(st);
let lastB=null;G.vsShow=bo=>{const b=document.getElementById('battle');if(!b||!bo)return;b.querySelectorAll('.vsx,.stmv').forEach(n=>n.remove());const s=C.S(),job=s.job||0,lim=job>=3?'cut/lina_ult_job3.png':job>=2?'cut/lina_ult_job2.png':'cut/lina_ult.png';
 const el=document.createElement('div');el.className='vsx';el.innerHTML=`<div class=vl><img src="assets/${lim}"></div><div class=vr><img src="assets/${bo.img}"></div><b class=vs>VS</b><i class="bd t"></i><i class="bd b"></i><span class=bt>BOSS BATTLE</span><div class=nl><small>전투력 ${fmt(C.POW())}</small>리나 일행</div><div class=nr><small>HP ${fmt(Math.round(bo.max))}</small>${bo.n||'보스'}</div>`;b.appendChild(el);G._vsT=performance.now()+1900;if(R.ccCd!=null||1)R.ccCd=Math.max(R.ccCd||0,2.3);setTimeout(()=>el.remove(),2250)};
{const ot=C.tick;C.tick=dt=>{if(G._vsT&&performance.now()<G._vsT)return;return ot(dt)}}
const of=R.frame;R.frame=dt=>{of(dt);try{if(R.bossT!=null&&R.bossT<.05){const bo=C.alive().find(e=>e.boss&&!e.wb);if(bo&&bo!==lastB&&!G.screen){lastB=bo;R.bossT=1.6;G.vsShow(bo)}}}catch(_){}};
})();
;(()=>{// v117 스테이지 이동 카드 (클리어 후 챕터 경로 위 리나 말이 다음 노드로 이동 · 시각 전용)
const st=document.createElement('style');st.textContent=`.stmv{position:absolute;left:185px;top:286px;width:220px;box-sizing:border-box;transform:translateX(-50%);z-index:33;pointer-events:none;padding:10px 14px 12px;border-radius:14px;background:linear-gradient(#2a1a0ae6,#3a240ee6);border:2px solid #e8b44a;box-shadow:0 6px 18px #0008,inset 0 0 0 1px #fff3;font-family:"Noto Sans KR",sans-serif;color:#fff;animation:stmvA 2.6s ease-in-out forwards}
.stmv h4{margin:0 0 2px;text-align:center;font:900 15px Maplestory,"Noto Sans KR",sans-serif;color:#ffe29a;text-shadow:0 2px 0 #0008}.stmv p{margin:0 0 8px;text-align:center;font:800 11px "Noto Sans KR";color:#fff;opacity:.85}
.stmv .pth{position:relative;height:34px}.stmv .ln{position:absolute;left:10px;right:10px;top:20px;height:4px;border-radius:2px;background:#5a4020}.stmv .lf{position:absolute;left:10px;top:20px;height:4px;border-radius:2px;background:linear-gradient(90deg,#ffd23a,#ff9a2a);box-shadow:0 0 6px #ffb02a;transition:width .7s .5s ease-in-out}
.stmv .nd{position:absolute;top:15px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#5a4020;border:2px solid #8a6a3a}.stmv .nd.on{background:#ffd23a;border-color:#fff6c0;box-shadow:0 0 6px #ffc23a}.stmv .nd.bs{width:18px;height:18px;margin-left:-9px;top:13px;background:#8a1a1a;border-color:#ff8a6a}.stmv .nd.bs.on{background:#ff5a3a}
.stmv .nd.nx{animation:stmvN .5s 1.2s both}.stmv .pin{position:absolute;top:-8px;width:28px;height:28px;margin-left:-14px;transition:left .7s .5s ease-in-out;animation:stmvH .35s .5s 2 ease-in-out}
.stmv .pin img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 2px #000a)}
@keyframes stmvA{0%{opacity:0;transform:translate(-50%,-14px) scale(.9)}12%{opacity:1;transform:translate(-50%,0) scale(1)}85%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,-10px)}}
#toastQ.stmvq{transform:translateY(150px);transition:transform .2s}#toastQ{transition:transform .2s}
@keyframes stmvH{50%{transform:translateY(-8px)}}@keyframes stmvN{0%{transform:scale(1)}50%{transform:scale(1.7);box-shadow:0 0 14px #fff}100%{transform:scale(1)}}`;document.head.appendChild(st);
let last=null,pend=null;G.stMove=(from,to)=>{const b=document.getElementById('battle');if(!b)return;R.ccCd=Math.max(R.ccCd||0,2.8);{const tq=document.getElementById('toastQ');if(tq){tq.classList.add('stmvq');clearTimeout(G._stTq);G._stTq=setTimeout(()=>tq.classList.remove('stmvq'),2650)}}b.querySelectorAll('.stmv').forEach(n=>n.remove());const ch=Math.floor(to/7),a=Math.floor(from/7)==ch?from%7:-1,z=to%7,X=k=>10+k*(192-20)/6;
 const el=document.createElement('div');el.className='stmv';let nd='';for(let k=0;k<7;k++)nd+=`<i class="nd${k==6?' bs':''}${k<=Math.max(a,0)&&a>=0?' on':''}${k==z?' nx':''}" style="left:${X(k)}px"></i>`;
 el.innerHTML=`<h4>${C.stageName(to)} 이동</h4><p>제${ch+1}장 · ${D.CH[ch]||''}${z==6?' · <b style="color:#ff8a6a">보스 스테이지</b>':''}</p><div class=pth><i class=ln></i><i class=lf style="width:${a<0?0:X(a)-10}px"></i>${nd}<span class=pin style="left:${X(a<0?0:a)}px"><img src="assets/sd_lina.png"></span></div>`;b.appendChild(el);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{el.querySelector('.pin').style.left=X(z)+'px';el.querySelector('.lf').style.width=(X(z)-10)+'px';setTimeout(()=>el.querySelectorAll('.nd')[z].classList.add('on'),1200)}));setTimeout(()=>el.remove(),2650)};
{let shown=null;const b=document.getElementById('battle');if(b)new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes)if(n.classList&&(n.classList.contains('bwarn')||n.classList.contains('vsx')))b.querySelectorAll('.stmv').forEach(x=>{x.style.transition='opacity .25s';x.style.animation='none';x.style.opacity='0';setTimeout(()=>x.remove(),260)});for(const n of m.removedNodes)if(n.classList&&(n.classList.contains('vic')||(n.querySelector&&n.querySelector('.vic')))){const si=C.S().si;if(shown==null)shown=si-1;if(si>shown){let n0=0,pc=null;const go=()=>{if(si<=shown||G.screen||G._fin||document.querySelector('.vic,.bwarn:not(.out),.vsx'))return;if(R.ccut&&R.ccut.t<1.3)R.ccut.t=99;const f=shown;shown=si;G.stMove(f,si)};setTimeout(go,60)}}}}).observe(document.body,{childList:true,subtree:true})}
})();

;(()=>{// v117b 이동 카드 표시 중 동료 컷인 생략
const of=R.frame;R.frame=dt=>{try{if(R.ccut&&R.ccut.t<.5&&document.querySelector('.stmv'))R.ccut.t=99}catch(_){}of(dt)};
})();
;(()=>{// v118 보스 스테이지 분위기 (챕터 7번째 스테이지: 붉은 가장자리 비네트 + 불씨 · 시각 전용)
const P=[];let fd=0;const of=R.frame;R.frame=dt=>{of(dt);try{const on=C.S().si%7==6&&!G.screen&&!(R.opt&&!R.opt.fx);fd=Math.max(0,Math.min(1,fd+(on?dt:-dt)*1.5));if(fd<=0){P.length=0;return}const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,H=c.clientHeight,T=performance.now()/1000;
 ctx.save();ctx.setTransform(sc,0,0,sc,0,0);const pu=.85+.15*Math.sin(T*2.2);const A=.5*fd*pu,ga0=ctx.globalAlpha,eg=(x0,y0,x1,y1,rx,ry,rw,rh)=>{/* r237 perf: cached edge sprite, pulse via globalAlpha */const spr=R.gspr('eg'+[x0-rx,y0-ry,x1-rx,y1-ry].join(','),rw,rh,sc,(q)=>{const g=q.createLinearGradient(x0-rx,y0-ry,x1-rx,y1-ry);g.addColorStop(0,'rgba(170,10,10,1)');g.addColorStop(1,'rgba(170,10,10,0)');q.fillStyle=g;q.fillRect(0,0,rw,rh)});ctx.globalAlpha=ga0*Math.min(1,A);ctx.drawImage(spr,rx,ry,rw,rh);ctx.globalAlpha=ga0};eg(0,0,80,0,0,0,80,H);eg(W,0,W-80,0,W-80,0,80,H);eg(0,H,0,H-200,0,H-200,W,200);eg(0,0,0,160,0,0,W,160);
 while(P.length<16)P.push({x:Math.random()*W,y:H*.75+Math.random()*H*.3,v:20+Math.random()*30,s:1.5+Math.random()*2.5,ph:Math.random()*6});
 for(const p of P){p.y-=p.v*dt;p.x+=Math.sin(T*1.3+p.ph)*12*dt;if(p.y<H*.12){p.y=H*.8+Math.random()*H*.2;p.x=Math.random()*W}const a=fd*Math.min(1,(p.y-H*.12)/(H*.2));ctx.globalAlpha=a*.35;ctx.fillStyle='#ff3a10';ctx.beginPath();ctx.arc(p.x,p.y,p.s*2,0,6.283);ctx.fill();ctx.globalAlpha=a;ctx.fillStyle='#ffd27a';ctx.beginPath();ctx.arc(p.x,p.y,p.s*.8,0,6.283);ctx.fill()}
 ctx.restore()}catch(_){}};
})();
;(()=>{// v119 보스 제한시간 위기 연출 (10초 이하: 타이머 붉게 맥동 + '10초 남음!' 알림 + 5초 이하 초침 펄스 · 시각 전용)
const st=document.createElement('style');st.textContent=`#stInfo.tbo{font:900 14px/1 'Noto Sans KR',sans-serif!important;color:#fff!important;text-shadow:0 0 3px #000,0 1px 2px #000,0 0 1px #000;letter-spacing:.5px;display:inline-block;transform-origin:right center}
#stInfo.tlow{font-size:18px!important;color:#ff4a3a!important;-webkit-text-stroke:.6px #3a0000;animation:tlowP .5s ease-in-out infinite alternate;text-shadow:0 0 8px #ff2a1a,0 1px 2px #000}
@keyframes tlowP{0%{transform:scale(1)}100%{transform:scale(1.12)}}
.tlw{position:absolute;left:185px;top:262px;transform:translateX(-50%);z-index:31;pointer-events:none;padding:5px 14px;border-radius:999px;background:linear-gradient(#d0201a,#8a0a0a);border:2px solid #ffd23a;color:#fff;font:900 14px "Noto Sans KR",sans-serif;white-space:nowrap;box-shadow:0 4px 12px #0007,0 0 14px #ff3a2a;animation:tlwA 1.8s ease-out forwards}
@keyframes tlwA{0%{opacity:0;transform:translateX(-50%) scale(1.6)}12%{opacity:1;transform:translateX(-50%) scale(.95)}20%{transform:translateX(-50%) scale(1)}80%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-10px)}}`;document.head.appendChild(st);
let warned=null,lastS=null,pl=0;const of=R.frame;R.frame=dt=>{of(dt);try{const B=C.B,bo=B.boss&&C.alive().find(e=>e.boss&&!e.wb),inf=document.getElementById('stInfo');const low=!!(bo&&B.timer>0&&B.timer<=10&&!G.screen);if(inf){inf.classList.toggle('tlow',low);inf.classList.toggle('tbo',!!(bo&&!G.screen))}if(!low){if(!bo)warned=null;return}
 if(warned!==bo&&!G._fin&&!document.querySelector('.vsx,.bwarn:not(.out),.vic')){warned=bo;const b=document.getElementById('battle');if(b){const el=document.createElement('div');el.className='tlw';el.innerHTML='<img class=hi src=assets/ui_timer.png width=9 height=14 alt="">'+Math.ceil(B.timer)+'초 남음! 서두르세요';b.appendChild(el);setTimeout(()=>el.remove(),1850)}}
 if(B.timer<=5){const s=Math.ceil(B.timer);if(s!==lastS){lastS=s;pl=1}}pl=Math.max(0,pl-dt*2.2);if(pl>0&&!G._fin){const c=R._bc();if(!c)return;const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,W=c.clientWidth,H=c.clientHeight;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.globalAlpha=pl*.6;ctx.strokeStyle='#ff2a1a';ctx.lineWidth=10;ctx.shadowColor='#ff2a1a';ctx.shadowBlur=18;ctx.strokeRect(5,5,W-10,H-10);ctx.restore()}}catch(_){}};
})();
;(()=>{// v120 보스전 실시간 MVP 왕관 (보스전 중 피해 1위 아군 머리 위 왕관 · 시각 전용)
let base=null,bb=null,cx0=null,cy0=null,lead=null;const of=R.frame;R.frame=dt=>{of(dt);try{G._mvpK=null;const bo=C.B.boss&&C.alive().find(e=>e.boss&&!e.wb);if(!bo||G.screen||G._fin){bb=null;return}if(bb!==bo){bb=bo;base={...G.DM};lead=null}
 let bk=null,bv=0;for(const k in G.DM){const v=G.DM[k]-(base[k]||0);if(v>bv){bv=v;bk=k}}if(!bk||bv<=0)return;G._mvpK=bk;if(G.mvpHud)return;const q=R._AS().get(bk);if(!q)return;const c=R._bc();if(!c)return;if(document.querySelector('.vsx,.vic'))return;
 const T=performance.now()/1000,tx=Math.max(84,Math.min(286,q.x)),ty=q.y-(bk=='lina'?112:106);if(lead!==bk||cx0==null){if(cx0==null){cx0=tx;cy0=ty}lead=bk}cx0+=(tx-cx0)*Math.min(1,dt*8);cy0+=(ty-cy0)*Math.min(1,dt*8);
 const ctx=c.getContext('2d'),sc=c.width/c.clientWidth,x=cx0,y=cy0+Math.sin(T*3)*2.5;ctx.save();ctx.setTransform(sc,0,0,sc,0,0);ctx.translate(x,y);ctx.scale(1.4,1.4);ctx.shadowColor='#ffcc33';ctx.shadowBlur=10;
 const g=ctx.createLinearGradient(0,-12,0,6);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,'#ffcf3a');g.addColorStop(1,'#c27a10');ctx.fillStyle=g;ctx.strokeStyle='#6a3a00';ctx.lineWidth=1.5;
 ctx.beginPath();ctx.moveTo(-12,6);ctx.lineTo(-13,-6);ctx.lineTo(-6,0);ctx.lineTo(0,-11);ctx.lineTo(6,0);ctx.lineTo(13,-6);ctx.lineTo(12,6);ctx.closePath();ctx.fill();ctx.stroke();ctx.shadowBlur=0;
 ctx.fillStyle='#ff3a5a';for(const [px,py] of [[-13,-6],[0,-11],[13,-6]]){ctx.beginPath();ctx.arc(px,py,2.2,0,6.283);ctx.fill()}ctx.fillStyle='#fff';ctx.globalAlpha=.6+.4*Math.sin(T*6);ctx.beginPath();ctx.arc(-4,-2,1.3,0,6.283);ctx.fill();ctx.globalAlpha=1;
 ctx.font='900 8px "Noto Sans KR",sans-serif';ctx.textAlign='center';ctx.lineWidth=2.5;ctx.strokeStyle='#3a1a00';ctx.strokeText('MVP',0,15);ctx.fillStyle='#ffe27a';ctx.fillText('MVP',0,15);ctx.restore()}catch(_){}};
})();

;(()=>{// v121 콤보 카운터 DOM화 (포털·적 위에 표시 · 단계별 색/이름)
R.cmbDom=1;const st=document.createElement('style');st.textContent=`.cmbx{position:absolute;left:272px;top:592px;transform:translate(-50%,-70%);z-index:29;pointer-events:none;text-align:center;font-family:Maplestory,"Noto Sans KR",sans-serif;font-style:italic;white-space:nowrap}
.cmbx b{display:block;font:italic 900 28px/1 Maplestory,"Noto Sans KR",sans-serif;background:linear-gradient(var(--c0),var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:1.6px #5a1208;filter:drop-shadow(0 2px 0 #3a0a00) drop-shadow(0 0 var(--gl) var(--c1))}
.cmbx small{display:block;margin-top:1px;font:italic 900 12px Maplestory,"Noto Sans KR",sans-serif;color:var(--lc);text-shadow:-1px -1px 0 #5a1208,1px -1px 0 #5a1208,-1px 1px 0 #5a1208,1px 1px 0 #5a1208,0 0 6px var(--c1)}`;document.head.appendChild(st);
let el=null,lv=0,pop=0;const TC=[['#fff6c0','#ff8a2a','#ffd77a','0px'],['#fffbe0','#ff4a2a','#ffd77a','6px'],['#f6e0ff','#b04aff','#e0b0ff','10px'],['#e0fbff','#2ad0ff','#9ff0ff','14px']];
const of=R.frame;R.frame=dt=>{of(dt);try{const [cb]=R._cmbGet?R._cmbGet():[0];const b=document.getElementById('battle');const show=cb>=5&&!G.screen&&!G._fin&&!(R.cut&&R.cut.t<1.25)&&!document.querySelector('.vsx,.vic');if(!show){if(el){el.remove();el=null}lv=0;return}
 if(!el){el=document.createElement('div');el.className='cmbx';el.innerHTML='<b></b><small></small>';b.appendChild(el)}if(cb!==lv){if(cb>lv)pop=1;lv=cb;const t=cb>=100?3:cb>=50?2:cb>=20?1:0,c=TC[t];if(el._t!==t){el._t=t;el.style.setProperty('--c0',c[0]);el.style.setProperty('--c1',c[1]);el.style.setProperty('--lc',c[2]);el.style.setProperty('--gl',c[3]);el.lastChild.textContent=t==3?'LEGEND COMBO':t==2?'GREAT COMBO':t==1?'NICE COMBO':'COMBO'}$st(el.firstChild,cb)}/* r313: tier vars + label written only when the tier changes */
 if(pop>0){pop=0;if(el.animate){if(el._pa)el._pa.cancel();el._pa=el.animate([{transform:'translate(-50%,-70%) scale(1.25)'},{transform:'translate(-50%,-70%) scale(1)'}],{duration:167})}}/* r313: combo pop as a compositor animation (same 1.25->1 linear over 1/6s) instead of a style write every frame *//* r298: no per-frame style write once the pop settles */}catch(_){}};
})();
/* v123 소환 연출 (마법진 → 등급색 구슬 강림 → 전설 이상 단독 등장 · 탭으로 건너뛰기, 시각 전용) */
;(()=>{const oc=C.summon;C.summon=n=>{const r=oc(n);G._sumGot=r;return r};
const os=summon;summon=function(n){G._sumGot=null;os(n);const got=G._sumGot,m=document.getElementById('sumModal');if(!got||!m)return;
 const cs=got.map(k=>D.COMPS.find(x=>x.k==k)),top=Math.max(...cs.map(c=>c.g)),col=D.RAR[top].c;m.style.display='none';
 const v=document.createElement('div');v.className='sumcin'+(top>=4?' leg':'');v.style.setProperty('--oc',col);
 v.innerHTML=`<div class=scc><i class=r1></i><i class=r2></i><i class=r3></i></div><div class=sco></div><div class=scf></div><div class=scl>${top>=4?'<i class=dm362></i>강렬한 빛이 쏟아진다!<i class=dm362></i>':'소환 중…'}</div><small class=scs>탭하여 건너뛰기</small>`;
 document.body.appendChild(v);let done=0;const heroes=cs.filter((c,i)=>c.g>=4&&got.indexOf(c.k)==i);
 const fin=()=>{if(done)return;done=1;v.remove();next()};
 const next=()=>{const c=heroes.shift();if(!c){m.style.display='';return}const h=document.createElement('div');h.className='sumhero';h.style.setProperty('--oc',D.RAR[c.g].c);
  h.innerHTML=`<div class=shr></div><img src="${A}cutc/${c.k}.png" onerror="this.src='${A}${c.img}'"><div class=shn><span>${D.RAR[c.g].n}</span><b>${c.n}</b><em>${'★'.repeat(c.g+1)}</em></div><small class=scs>탭하여 계속</small>`;
  document.body.appendChild(h);setTimeout(()=>h.onclick=()=>{h.classList.add('out');setTimeout(()=>{h.remove();next()},250)},500)};
 v.onclick=fin;setTimeout(fin,top>=4?2600:1900)}})();
/* v124 화룡전식 편성 화면 (진형 무대 + 카드 그리드) */
;(()=>{const orS=renderScreen;renderScreen=function(f){const r=orS.apply(this,arguments);try{if(G.screen=='party')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),s=C.S(),f0=el.querySelector('.slotrow');if(!f0)return;const card=f0.closest('.card');card.style.display='none';
 const fig=(k,i)=>{const c=k=='lina'?{k:'lina',n:'리나',img:'hero_lina.png',g:4}:D.COMPS.find(x=>x.k==k);if(!c)return `<div class="pfig emp" data-i=${i}><i></i><span>＋</span></div>`;const R=D.RAR[c.g];
  return `<div class=pfig data-k=${c.k} style="--rc:${R.c}"><i></i><img src="${A}${c.img}"><em>${k=='lina'?'리더':'Lv.'+s.comps[k]}</em><b>${c.n}</b></div>`};
 const P=s.party,st=document.createElement('div');st.className='pstage';
 st.innerHTML=`<div class=psp><img src=assets/it2_gem.png><small>파티 전투력</small><b>${fmt(C.POW())}</b></div><div class="prw prb">${fig(P[2],2)}${fig(P[3],3)}</div><div class="prw prf">${fig(P[0],0)}${fig('lina',-1)}${fig(P[1],1)}</div><small class=pst>캐릭터 탭: 해제 · 아래 카드 탭: 출전</small>`;
 card.before(st);st.querySelectorAll('.pfig[data-k]').forEach(n=>{if(n.dataset.k!='lina')n.onclick=()=>{const o=el.querySelector(`[data-rm="${n.dataset.k}"]`);o&&o.click()}});
 el.querySelectorAll('.row .fac').forEach(n=>{const f=Object.keys(D.FACTIONS).find(x=>D.FACTIONS[x].n==n.textContent);if(f&&!n.querySelector('img'))n.insertAdjacentHTML('afterbegin',`<img class=fci src="assets/fac_${f}.png">`)});const rc=el.querySelectorAll('.rcard');if(!rc.length)return;rc[0].parentNode.classList.add('rgrid');
 rc.forEach(n=>{const k=n.dataset.c,c=D.COMPS.find(x=>x.k==k),lv=s.comps[k],R=D.RAR[c.g],F=D.FACTIONS[c.fac],inP=P.includes(k);n.style.setProperty('--rc',R.c);n.classList.toggle('own',!!lv);
  n.innerHTML=`<img src="${A}${c.img}"><span class=rg>${R.n}</span><img class=fd src="assets/fac_${c.fac}.png">${inP?'<span class=ck><img class="emi e_pass_check" src=assets/pass_check.png alt=""></span>':''}<b>${c.n}</b><small>${lv?'★'.repeat(Math.min(5,lv)):'미보유'}</small>${lv?`<span class=di data-det=${k}>i</span>`:''}`})}})();
/* v125 화룡전식 동료 상세 (전신 일러스트 무대 · 세력 엠블럼 · 능력치 막대 · 스킬 카드) */
;(()=>{const ocd=compDetail;compDetail=function(k){const r=ocd.apply(this,arguments);try{const c=D.COMPS.find(x=>x.k==k),im=[...document.querySelectorAll('.cdet .cdimg')].pop();if(!c||!im)return r;
 im.classList.add('cdx');im.querySelector('img').src=`${A}cutc/${k}.png`;im.querySelector('img').onerror=function(){this.onerror=null;this.src=A+c.img};
 const fb=im.querySelector('.fac');if(fb)fb.innerHTML=`<img class=fci src="assets/fac_${c.fac}.png">${fb.textContent}`;
 const SI={'공격':'atk','체력':'hp','속도':'spd'},bar=(n,v,mx,col)=>`<div class=cxb><img class=sti src="assets/st_${SI[n]}.png"><span>${n}</span><i><u style="width:${Math.min(100,v/mx*100)}%;background:${col}"></u></i><b>${v.toFixed(2)}</b></div>`;
 const sk=(D.CSKI||{})[k],st=document.createElement('div');st.className='cxs';
 st.innerHTML=bar('공격',C.compMul(k),2.5,'linear-gradient(90deg,#ff7a3d,#ffd25a)')+bar('체력',c.hp||1,1.5,'linear-gradient(90deg,#3ad07a,#b4ff6a)')+bar('속도',c.spd||1,1.5,'linear-gradient(90deg,#3a9bff,#7ae8ff)')+(sk?`<div class=cxk><img src="${A}${sk[0]}"><div><b>${sk[1]}</b><small>${c.d}</small></div></div>`:'');
 const st0=im.parentNode.querySelector('.stars');(st0||im).after(st)}catch(e){console.warn(e)}return r}})();
/* v126 화룡전식 장비 인형 (리나 전신 중앙 + 좌우 4부위 슬롯) · 시트 열림 시 콤보 숨김 */
;(()=>{const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab=='gear'){const g=document.querySelector('#panel .eqgrid');if(g&&!g.classList.contains('doll')){g.classList.add('doll');const s=C.S(),n=Object.values(s.gear||{}).filter(Boolean).length;
 const c=document.createElement('div');c.className='dollc';c.innerHTML=`<i class=dr></i><img src="${A}hero_lina.png"><div class=dp><small>전투력</small><b>${fmt(C.POW())}</b></div><span class=dn>리나 Lv.${s.lv} · 장착 ${n}/8</span>`;g.appendChild(c)}}}catch(e){console.warn(e)}return r}})();
/* v127 화룡전식 마을 허브 (가로 스크롤 마을 전경 · 건물 탭으로 기존 메뉴 이동 · 전투가 기본 화면) */
;(()=>{if(!MENU.some(m=>m[0]=='town')){MENU.unshift(['town','마을','ic3_town.png'])}try{renderHub()}catch(_){}
const HS=[['summon','소환의 전당','ic3_summon.png',15,40],['guild','모험가 협회','ic3_guild.png',57,30],['shop','상점가','ic3_shop.png',84,46],['enhance','대장간','ic3_anvil.png',92,26],['event','출석','ic3_calendar.png',50,52],['mail','우편함','ic3_mail.png',27,22],['base','영지','ic3_castle.png',62,80],['party','편성','ic3_party.png',22,74]];
const NPC=[['merchant','shop',80,610,['좋은 물건 들어왔어요!','오늘의 특가 놓치지 마세요~','보석 상자 어때요?']],['smith','enhance',94,560,['장비 강화는 내게 맡겨!','망치질 한 번이면 +1이지.','좋은 강화석 있나?']],['guildgirl','guild',66,520,['새 의뢰가 도착했어요.','모험가 협회에 어서 오세요!','오늘도 힘내세요, 리나 님!']]];let bt=0;
const bub=()=>{const n=[...document.querySelectorAll('.tnpc')];if(!n.length||G.screen!='town'){clearInterval(bt);bt=0;return}n.forEach(x=>x.classList.remove('say'));const t=n[Math.floor(Math.random()*n.length)],d=NPC.find(q=>q[0]==t.dataset.n);t.querySelector('.tbub').textContent=d[4][Math.floor(Math.random()*3)];t.classList.add('say')};
const draw=()=>{const el=$('#screen');el.innerHTML=shell('마을','bg_lobby_town.jpg',`<div class=town><div class=tpan>${HS.map(([k,n,i,x,y])=>`<div class=tsp data-go=${k} style="left:${x}%;top:${y}%"><img src="${A}${i}"><b>${n}</b></div>`).join('')}<img class=tlina src="${A}hero_lina.png" data-go=skin>${NPC.map(([k,go,x,y,L])=>`<div class=tnpc data-go=${go} data-n=${k} style="left:${x}%;top:${y}px"><img src="assets/npc_${k}.png"><span class=tbub></span></div>`).join('')}</div></div><span class=thint><img class="tha l" src=assets/st_arrow.png>좌우로 밀어 둘러보기<img class="tha r" src=assets/st_arrow.png></span><span class=tbat id=tBat><img class=tbi src=assets/ic3_arena.png>전투로</span>`);
 el.querySelector('.sbg').style.filter='blur(6px) brightness(.6)';const t=el.querySelector('.town');t.scrollLeft=(1244-t.clientWidth)/2;
 el.querySelectorAll('[data-go]').forEach(n=>n.onclick=()=>menuGo(n.dataset.go));$('#tBat').onclick=closeScreen;$('#sBack').onclick=closeScreen;bub();if(!bt)bt=setInterval(bub,3800)};
const rs=renderScreen;renderScreen=function(){if(G.screen=='town')return draw();return rs.apply(this,arguments)};})();
/* v128 화룡전식 월드맵 · 스테이지 선택 (지역 개요 + 챕터별 노드) */
;(()=>{const PIN=[[13,60],[29,46],[43,34],[90,42],[70,40],[80,14],[86,80]];// ch1..7 region on map_world
const NP=[[26,80],[68,72],[28,62],[70,52],[30,43],[70,35],[46,25]];// stage nodes in chapter view (%)
const WW=1244,WH=700;
// per-chapter art (cover crop centred); node positions follow the painted path. Missing art → world-map crop.
// add a chapter index here when assets/map_chN.jpg is added (avoids 404 probing)
const MAPART=[0,1,2,3,4,5,6];const NPC2={0:[[38,80],[64,74],[42,63],[70,53],[38,43],[64,33],[50,22]],1:[[42,82],[36,72],[48,62],[38,52],[50,43],[38,34],[50,24]],2:[[40,82],[60,73],[42,63],[60,54],[42,45],[58,36],[50,24]],3:[[44,82],[58,72],[68,62],[56,52],[44,43],[30,34],[40,24]],4:[[40,82],[52,73],[30,63],[50,54],[66,45],[46,36],[50,25]],5:[[46,82],[22,70],[62,62],[28,52],[72,44],[40,34],[50,23]],6:[[50,82],[40,72],[34,62],[60,54],[40,45],[62,37],[56,25]]};G.mapArt=G.mapArt||{};MAPART.forEach(i=>G.mapArt[i]=1);

const draw=()=>{const el=$('#screen'),s=C.S(),cur=Math.floor(s.si/7),mx=Math.floor(Math.min(s.maxSi,D.FIELDS.length-1)/7);if(G.mapCh==null)G.mapCh=cur;const ch=G.mapCh;
 const head=`<div class=shead><span class=back id=sBack>‹</span><b>${ch<0?'월드맵':'제'+(ch+1)+'장 · '+D.CH[ch]}</b><span class=chip><img class=ci src=assets/it2_gold.png> ${fmt(s.gold)}</span></div>`;
 if(ch<0){el.innerHTML=`<img class=sbg src="${A}map_world.jpg" style="filter:blur(6px) brightness(.5)">${head}<div class=wmap id=mapw><div class=wmin style="width:${WW}px;height:${WH}px">
  <svg width=${WW} height=${WH} style="position:absolute;inset:0"><polyline points="${PIN.map(([x,y])=>`${x*WW/100},${y*WH/100}`).join(' ')}" fill=none stroke="#fff3c0" stroke-width=4 stroke-dasharray="2 10" stroke-linecap=round /></svg>
  ${PIN.map(([x,y],i)=>{const lk=i>mx,n=lk?0:[...Array(7)].reduce((a,_,j)=>a+(G.stStar?G.stStar(i*7+j):0),0);return `<div class="wpin ${lk?'lk':''} ${i==cur?'cur':''}" data-ch=${i} style="left:${x}%;top:${y}%"><img src="assets/node_${lk?'locked':i==cur?'boss':'normal'}.png"><b>제${i+1}장</b><span>${D.CH[i]}</span>${lk?'':`<em>★${n}/21</em>`}</div>`}).join('')}
  <img class=wlina src="${A}hero_lina.png" style="left:${PIN[cur][0]}%;top:${PIN[cur][1]}%"></div></div>`;
  const w=$('#mapw');w.scrollLeft=PIN[cur][0]/100*WW-195;el.querySelectorAll('[data-ch]').forEach(n=>n.onclick=()=>{const i=+n.dataset.ch;if(i>mx)return toast('이전 장의 보스를 처치하세요');G.mapCh=i;draw()});
 }else{const [px,py]=PIN[ch],bh=1150,bw=bh*16/9,bx=Math.max(0,Math.min(bw-390,px/100*bw-195)),by=Math.max(0,Math.min(bh-700,py/100*bh-350));
  const pl=D.BOSSPLAN[ch]||[0,1],bo=D.BOSSES[pl[1]];const NPx=(G.mapArt&&G.mapArt[ch]&&NPC2[ch])||NP;
  el.innerHTML=`<img class=sbg src="${A}map_world.jpg" style="filter:blur(6px) brightness(.5)">${head}<div class=cmap style="${G.mapArt[ch]?`background:url(${A}map_ch${ch+1}.jpg) center/cover`:`background-image:url(${A}map_world.jpg);background-size:${bw}px ${bh}px;background-position:-${bx}px -${by}px`}">
  <div class=cban style="background-image:url(${A}chap/ch${ch+1}.jpg)"><small>CHAPTER ${ch+1}</small><b>${D.CH[ch]}</b></div>
  <svg viewBox="0 0 100 100" preserveAspectRatio=none style="position:absolute;inset:0;width:100%;height:100%"><polyline points="${NPx.map(([x,y])=>x+','+y).join(' ')}" fill=none stroke="#fff3c0" stroke-width=.8 stroke-dasharray=".4 2" stroke-linecap=round vector-effect=none /></svg>
  ${NPx.map(([x,y],j)=>{const i=ch*7+j,lk=i>s.maxSi,bs=j==6,n=G.stStar?G.stStar(i):0;return `<div class="snode ${lk?'lk':''} ${i==s.si?'cur':''} ${bs?'bs':''}" data-n=${i} style="left:${x}%;top:${y}%">${bs?`<img class=sbimg src="${A}${bo.img}">`:''}<img src="assets/node_${lk?'locked':bs?'boss':(G.nodeTheme?G.nodeTheme(ch):'normal')}.png"${!lk&&!bs&&G.nodeTheme?' class=nt':''}><b>${C.stageName(i)}</b>${lk?'':`<small>${[0,1,2].map(k=>`<i class="${k<n?'on':''}">★</i>`).join('')}</small>`}${bs?`<em>${bo.n}</em>`:''}</div>`}).join('')}
  ${s.si>=ch*7&&s.si<ch*7+7?`<img class=slina src="${A}hero_lina.png" style="left:${NPx[s.si%7][0]}%;top:${NPx[s.si%7][1]}%">`:''}
  <div class=cbar><span class=btn id=wBtn><img class="emi e_ic_map" src=assets/ic_map.png alt="">월드맵</span><span class="btn schbtn" id=schB><img src=assets/ic3_chest.png>★${G.chStars?G.chStars(ch):0}/21</span><span class=btn id=mapDun2><img src="${A}ic4/gate.png">일일 던전</span></div></div>`;
  $('#wBtn').onclick=()=>{G.mapCh=-1;draw()};$('#schB').onclick=()=>G.starOpen&&G.starOpen(ch);$('#mapDun2').onclick=()=>openScreen('dungeon');
  el.querySelectorAll('.snode').forEach(n=>n.onclick=()=>{const i=+n.dataset.n;if(i>s.maxSi)return toast('이전 스테이지의 보스를 처치하세요');C.selectStage(i);toast(C.stageName(i)+' 으로 이동');closeScreen()})}
 $('#sBack').onclick=()=>{if(G.mapCh>=0||G.mapCh==null)closeScreen();else{G.mapCh=Math.floor(C.S().si/7);draw()}}};
const os=openScreen;openScreen=function(k){if(k=='map')G.mapCh=null;return os.apply(this,arguments)};
const rs=renderScreen;renderScreen=function(){if(G.screen=='map')return draw();return rs.apply(this,arguments)};})();
/* v129 상점 상인 헤더 (상인 NPC · 말풍선 · 섹션 바로가기 탭) */
;(()=>{const L=['어서 오세요, 리나 님!','오늘의 특가는 05시에 바뀌어요.','강화석이 싸게 들어왔어요!','패키지도 한번 보고 가세요~'];
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='shop'){const b=document.querySelector('#screen .sbody');if(b&&!b.querySelector('.shh')){
 const secs=[...b.querySelectorAll(':scope > .card, :scope > div')].map(c=>({c,t:(c.matches('.ttl')?c:(c.querySelector('.ttl')||{})).firstChild})).filter(x=>x.t&&x.t.textContent&&x.t.textContent.trim()).slice(0,4);
 const h=document.createElement('div');h.className='shh';h.innerHTML=`<img class=shnp src="assets/npc_merchant.png"><div class=shbb>${L[Math.floor(Math.random()*L.length)]}</div><div class=shtb>${secs.map((x,i)=>`<span data-sc=${i}>${x.t.textContent.trim()}</span>`).join('')}</div>`;
 b.prepend(h);h.querySelectorAll('[data-sc]').forEach(n=>n.onclick=()=>{secs[+n.dataset.sc].c.scrollIntoView({behavior:'smooth',block:'start'})});
 h.querySelector('.shnp').onclick=()=>{const bb=h.querySelector('.shbb');bb.textContent=L[Math.floor(Math.random()*L.length)];bb.classList.remove('pp');void bb.offsetWidth;bb.classList.add('pp')}}}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v130 화룡전-style stage/chapter clear: banner art, gold star pop, reward card fly-in, chapter-complete ribbon (rides on VICTORY panel; same auto-close / tap-skip) */
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{if(!w||C.B.br||C.B.rb)return r;const d=[...document.querySelectorAll('.vic.win')].pop();if(!d||d.classList.contains('clr'))return r;const s=C.S(),chc=s.si>0&&s.si%7==0;d.classList.add('clr');if(chc)d.classList.add('chc');
d.insertAdjacentHTML('afterbegin',`<div class=clbw><img class=clb src="assets/clear_banner.png"><b class=clt>${chc?'CHAPTER CLEAR':'STAGE CLEAR'}</b></div>${chc?`<div class=chcr>제${s.si/7}장 「${D.CH[s.si/7-1]}」 완료!</div>`:''}`);
d.querySelectorAll('.vr>span:not(.vst)').forEach((x,i)=>{x.classList.add('rcd');x.style.animationDelay=(.25+i*.09)+'s'});
let k=0;const st=()=>{const v=d.querySelector('.vst');if(!v){if(k++<20)setTimeout(st,100);return}[...v.querySelectorAll('i')].forEach((x,i)=>{const on=x.classList.contains('on');x.className='gs'+(on?'':' off');x.innerHTML='<img src="assets/star_gold.png">';x.style.animationDelay=(.1+i*.15)+'s'})};st();}catch(_){}return r}})();
;(()=>{/* v131 화룡전-style 투기장: arena bg, tier/rank header, opponent cards, short VS intro (reuses vs_bg.jpg) */
const TI=['tier_bronze','tier_silver','tier_gold','tier_gold','tier_gold','tier_gold'],TF=['','','','hue-rotate(150deg) saturate(.7)','hue-rotate(185deg) saturate(1.4)','hue-rotate(290deg) saturate(1.3)'];
G.tierImg=L=>{const i=Math.max(0,D.LEAGUE.indexOf(L));return `<img class=tier src="assets/${TI[i]}.png" style="filter:${TF[i]||'none'} drop-shadow(0 3px 4px #0008)">`};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='arena')return r;const sc=document.querySelector('#screen'),sb=sc&&sc.querySelector('.sbody');if(!sb||sb.querySelector('.arhd2'))return r;
const bg=sc.querySelector('.sbg');if(bg)bg.src='assets/bg_arena2.jpg';sc.classList.add('arena2');
const s=C.S(),a=s.arena,L=C.league(),li=D.LEAGUE.indexOf(L),nx=D.LEAGUE[li+1],pc=nx?Math.min(100,(a.pts-L.pts)/(nx.pts-L.pts)*100):100;
const cards=[...sb.querySelectorAll('.card')],me=cards.find(c=>/내 순위/.test(c.textContent)),op=cards.find(c=>c.querySelector('[data-f]'));
if(me)me.style.display='none';
sb.insertAdjacentHTML('afterbegin',`<div class=arhd2>${G.tierImg(L)}<div class=ahi><b>${L.n} 리그</b><span class=ahr>${fmt(C.rank())}위</span><div class=ahb><i style="width:${pc}%"></i></div><small>점수 ${a.pts}${nx?` / ${nx.pts} (${nx.n})`:' · 최고 리그'} · ${a.streak}연승</small></div><div class=aht><img src="assets/it2_ticket.png"><b>${a.tickets}/${BAL.arena.tickets}</b><small>도전권</small></div></div>`);
if(op){const P=C.POW();op.classList.add('arops');const g=a.opps.map((o,j)=>{const p=1/(1+Math.exp(-(P/o.pow-1)*7)),lv=p<.4?'hard':p<.7?'mid':'easy',pt=o.party||[o.img],oL=C.league(o.pts||a.pts);
return `<div class="aoc ${lv}"><div class=aolead><img src="${A}${pt[0]}"></div><div class=aotg>${G.tierImg(oL)}</div><b class=aon>${o.n}</b><small class=aop><img class="emi e_ic3_arena" src=assets/ic3_arena.png alt="">${fmt(o.pow)}</small><div class=aopt>${pt.slice(1).map(im=>`<img src="${A}${im}">`).join('')}</div><em class=aopr>승률 ${Math.round(p*100)}%</em><span class="btn ${a.tickets<1?'off':''}" data-f2=${j}>도전</span></div>`}).join('');
op.querySelectorAll('.row').forEach(x=>x.style.display='none');op.querySelector('.ttl').insertAdjacentHTML('afterend',`<div class=aocg>${g}</div>`);
op.querySelectorAll('[data-f2]').forEach(b=>b.onclick=()=>{const o=op.querySelector(`[data-f="${b.dataset.f2}"]`);if(o)o.click()})}}catch(e){console.warn(e)}return r};
const ar0=arenaReplay;arenaReplay=function(r,re){if(re||!r||!r.o)return ar0.apply(this,arguments);const args=arguments,L=r.party||['hero_lina.png'],R=r.o.party||[r.o.img];
const d=document.createElement('div');d.className='arvsi';d.innerHTML=`<div class="avs l"><img src="${A}${L[0]}"><b>${G.nick?G.nick():'나'}</b><small><img class="emi e_ic3_arena" src=assets/ic3_arena.png alt="">${fmt(r.my||C.POW())}</small></div><b class=avx>VS</b><div class="avs r"><img src="${A}${R[0]}"><b>${r.o.n}</b><small><img class="emi e_ic3_arena" src=assets/ic3_arena.png alt="">${fmt(r.o.pow)}</small></div>`;
$('#app').appendChild(d);let gone=0;const go=()=>{if(gone)return;gone=1;d.remove();ar0.apply(this,args)};d.onclick=go;setTimeout(go,1300)};G.arenaReplay=arenaReplay})();
;(()=>{/* v132 화룡전-style 일일 던전: gate bg, 3 big type cards (gold/stone/exp) + 유적 chip, entry counts, 전체 소탕 (reuses C.dunSweep; same per-try rewards) */
const EM={gold:'dg_gold.png',stone:'dg_stone.png',exp:'dg_exp.png'};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='dungeon')return r;const sc=document.querySelector('#screen'),tb=sc&&sc.querySelector('.duntabs');if(!tb||sc.querySelector('.dgc'))return r;
const bg=sc.querySelector('.sbg');if(bg)bg.src='assets/bg_dungeon_gate.jpg';sc.classList.add('dun2');const d=C.dunDaily(),k=G.dunK,T=C.DUN.tries;
const card=x=>{const I=DUNI[x],cl=d.clr[x]||0;return `<div class="dgcard ${x==k?'on':''}" data-dk2=${x} style="--dc:${I[3]}"><img class=dge src="assets/${EM[x]}"><b>${I[0]}</b><small>${I[1]}</small><div class=dgt>${[...Array(T)].map((_,i)=>`<i class="${i<d.t[x]?'on':''}"></i>`).join('')}<em>${d.t[x]}/${T}</em></div><span class=dgtier>${cl?C.DUN.tiers[cl-1].n+' 클리어':'미클리어'}</span></div>`};
tb.insertAdjacentHTML('beforebegin',`<div class=dgc>${['gold','stone','exp'].map(card).join('')}</div><div class="dgfr ${k=='frag'?'on':''}" data-dk2=frag style="--dc:${DUNI.frag[3]}"><img src="assets/${DUNI.frag[2]}"><b>${DUNI.frag[0]}</b><small>${DUNI.frag[1]}</small><em>${d.t.frag}/${T}</em></div>`);tb.style.display='none';
sc.querySelectorAll('[data-dk2]').forEach(b=>b.onclick=()=>{G.dunK=b.dataset.dk2;renderScreen()});
const cl=d.clr[k]||0,h=sc.querySelector('.dunh');if(h&&cl){h.insertAdjacentHTML('beforeend',`<span class="btn dgsw ${d.t[k]>0?'':'off'}" id=dgAll><img class=\"emi e_ui_bolt\" src=assets/ui_bolt.png alt=\"\">전체 소탕 (${C.DUN.tiers[cl-1].n} ×${d.t[k]})</span>`);
sc.querySelector('#dgAll').onclick=()=>{if(!(C.dunDaily().t[k]>0))return toast('오늘 입장 횟수를 모두 사용했습니다');const m={};let n=0;while(C.dunDaily().t[k]>0&&n<9){const q=C.dunSweep(k,cl-1);if(q.err)break;n++;dunItems(q).forEach(a=>{m[a[0]]=m[a[0]]||[a[0],0,a[2]];m[a[0]][1]+=a[1]})}if(!n)return;const s=C.S();s.dstat=(s.dstat||0)+n;updateHud();renderScreen();rewardPop(Object.values(m),DUNI[k][0]+' '+C.DUN.tiers[cl-1].n+' ×'+n+' 소탕 완료')}}}catch(e){console.warn(e)}return r};
/* arena: unique leaders across the 3 opponent cards */
const rs1=renderScreen;renderScreen=function(){try{if(G.screen=='arena'){const a=C.S().arena,used=new Set();(a.opps||[]).forEach(o=>{if(!o.party)o.party=[o.img];let i=o.party.findIndex(im=>!used.has(im));if(i<0){const c=D.COMPS.find(c=>!used.has(c.img)&&!o.party.includes(c.img));if(c)o.party[0]=c.img;i=0}if(i>0)o.party.unshift(o.party.splice(i,1)[0]);o.img=o.party[0];used.add(o.party[0])})}}catch(e){}return rs1.apply(this,arguments)}})();
;(()=>{/* v133 화룡전-style 영지: painted town view, building hotspots + Lv badges + harvest bubbles, 전체 수확, per-building upgrade panel (existing C.b* logic) */
const HS=[{k:'vault',x:18,y:38,n:'황금 광산',sub:'금고'},{k:'castle',x:51,y:24,n:'영주성'},{k:'tower',x:79,y:36,n:'마탑'},{k:'mine',x:22,y:66,n:'마정 농장',sub:'마정 광산'},{k:'barracks',x:80,y:67,n:'병영',lock:1}];
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='base')return r;const sc=document.querySelector('#screen'),sb=sc&&sc.querySelector('.sbody');if(!sb||sb.querySelector('.bpan'))return r;
const s=C.S(),now=C.now();sc.classList.add('base2');const old=sb.firstElementChild;const sel=G.baseSel||'vault';
const pins=HS.map(h=>{const b=s.bld[h.k];if(h.lock)return `<div class="bhs lock" style="left:${h.x}%;top:${h.y}%" data-bh=${h.k}><b class=blv><img class="qic q_sk_lock" src=assets/sk_lock.png alt=""></b><em>${h.n}</em></div>`;if(!b)return `<div class="bhs" style="left:${h.x}%;top:${h.y}%" data-bh=${h.k}><b class=blv>Lv.${Object.values(s.bld).reduce((a,x)=>a+x.lv,0)}</b><em>${h.n}</em></div>`;
const up=b.up&&b.up>now,ready=h.k!='tower'&&b.acc>=1;return `<div class="bhs ${sel==h.k?'on':''}" style="left:${h.x}%;top:${h.y}%" data-bh=${h.k}>${ready?`<i class=bhb data-hv=${h.k}><img src="assets/${h.k=='vault'?'it2_gold.png':'it2_exp.png'}"></i>`:''}${up?'<i class=bhu><img src=assets/ui_timer.png alt="" style="width:18px;height:18px;object-fit:contain;filter:drop-shadow(0 1px 1px #000a)"></i>':''}<b class=blv>Lv.${b.lv}</b><em>${h.n}</em></div>`}).join('');
const canAll=['vault','mine'].some(k=>s.bld[k]&&s.bld[k].acc>=1);
const v=document.createElement('div');v.className='bpanw';v.innerHTML=`<div class=bscr><div class=bpan><img src="assets/bg_base_town.jpg">${pins}</div></div><span class="btn bcall ${canAll?'':'off'}" id=bAll><img class="qic q_bd_harvest" src=assets/bd_harvest.png alt=""> 전체 수확</span>`;
if(old&&/height:250px/.test(old.getAttribute('style')||''))old.replaceWith(v);else sb.prepend(v);
const pw=v.querySelector('.bpan');setTimeout(()=>{pw.parentNode.scrollLeft=G.baseScroll!=null?G.baseScroll:(pw.offsetWidth-390)/2},0);pw.parentNode.onscroll=()=>G.baseScroll=pw.parentNode.scrollLeft;
const card=[...sb.querySelectorAll('.card')].find(c=>c.querySelector('[data-up],[data-sp]'));
if(card){card.classList.add('bupc');const ttl=card.querySelector('.ttl');[...card.querySelectorAll('.row')].forEach(row=>{const k=(row.querySelector('[data-up],[data-sp]')||{}).dataset;const key=k&&(k.up||k.sp);if(key!=sel)row.style.display='none';else{const h=HS.find(x=>x.k==key),im=row.querySelector('img.ic');if(im)im.src='assets/'+({vault:'bd_mine.png',mine:'bd_farm.png',tower:'bd_tower.png'}[key]);if(ttl)ttl.innerHTML=`<span>${h.n}${h.sub?` <small>(${h.sub})</small>`:''}</span> <small>보관 한도 ${BAL.store/3600}시간</small>`}});}
sb.querySelectorAll('[data-bh]').forEach(e=>e.onclick=ev=>{const k=e.dataset.bh;if(ev.target.closest('[data-hv]'))return;if(k=='barracks')return toast('병영은 준비 중입니다');if(k=='castle'){const t=['vault','mine','tower'].map(x=>`${HS.find(h=>h.k==x).n} Lv.${s.bld[x].lv}`).join(' · ');return toast('영주성 · '+t)}G.baseSel=k;renderScreen()});
sb.querySelectorAll('[data-hv]').forEach(e=>e.onclick=ev=>{ev.stopPropagation();const k=e.dataset.hv,val=C.bCollect(k);if(val)toast((k=='vault'?'<img class=ci src=assets/it2_gold.png> +':'<img class=ci src=assets/it2_exp.png> +')+fmt(val));renderScreen()});
v.querySelector('#bAll').onclick=()=>{const g=C.bCollect('vault')||0,o=C.bCollect('mine')||0;if(!g&&!o)return toast('수확할 자원이 없습니다');updateHud();renderScreen();rewardPop([g&&['it2_gold.png',g,'골드'],o&&['it2_exp.png',o,'마정구']].filter(Boolean),'영지 전체 수확')}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v134 화룡전-style 협회 홀: guild level banner, painted hall with stations (게시판=주간 임무, 작전 탁자=토벌, 보물 상자=기부·상자), member portrait grid (existing guild logic) */
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='guild'||!C.S().gj)return r;const sc=document.querySelector('#screen'),sb=sc&&sc.querySelector('.sbody');if(!sb||sb.querySelector('.ghall'))return r;
const s=C.S(),g=s.guild,cards=[...sb.querySelectorAll(':scope>.card')],find=re=>cards.find(c=>re.test((c.querySelector('.ttl,b')||c).textContent));
const lvC=find(/협회 Lv\./),raidC=cards.find(c=>c.querySelector('#raid')),donC=find(/일일 기부/),misC=find(/주간 협회 임무/),memC=find(/협회원/);
sc.classList.add('gld2');const bg=sc.querySelector('.sbg');if(bg)bg.src='assets/bg_guild_hall2.jpg';
const mOk=D.GMISS.some(m=>!s.gm.c[m.k]&&(s.gm.p[m.k]||0)>=m.goal),rOk=s.raid.tries<BAL.raid.tries,dOk=!g.don.gold||!g.don.gem||C.week()!==s.gchest;
const st=(cls,x,y,ic,n,ok,tg)=>`<div class="gst ${cls}" style="left:${x}%;top:${y}%" data-gt=${tg}><img src="assets/${ic}">${ok?'<i class=dot></i>':''}<em>${n}</em></div>`;
const html=`<div class=gbanner><img src="assets/ic3_guild.png"><div class=gbi><b>${s.gj.n}</b><span>Lv.${g.lv}</span><div class=gbb><i style="width:${Math.min(100,g.exp/(100*g.lv)*100)}%"></i></div><small>경험치 ${g.exp}/${100*g.lv} · 오늘 공격력 +${Object.keys(g.don).length*BAL.donate.buff*100}% · 영구 +${(g.lv-1)*2}%</small></div></div>
<div class=ghall><img class=ghbg src="assets/bg_guild_hall2.jpg">${st('b',20,34,'gd_board.png','주간 임무',mOk,'mis')}${st('t',55,60,'gd_raid.png','황금룡 토벌',rOk,'raid')}${st('c',86,56,'gd_chest.png','기부 · 상자',dOk,'don')}</div>`;
sb.insertAdjacentHTML('afterbegin',html);if(lvC)lvC.style.display='none';
const T={mis:misC,raid:raidC,don:donC};if(raidC)raidC.querySelector('.ttl,b')?.insertAdjacentHTML('afterbegin','');
sb.querySelectorAll('[data-gt]').forEach(e=>e.onclick=()=>{const c=T[e.dataset.gt];if(!c)return;c.scrollIntoView({behavior:'smooth',block:'start'});c.classList.remove('gflash');void c.offsetWidth;c.classList.add('gflash')});
[[misC,'gd_board.png'],[raidC,'gd_raid.png'],[donC,'gd_chest.png']].forEach(([c,ic])=>{const t=c&&c.querySelector('.ttl');if(t)t.insertAdjacentHTML('afterbegin',`<img class=gti src="assets/${ic}">`)});
if(memC){const ro=C.gRoster();[...memC.querySelectorAll('.row')].forEach(x=>x.remove());memC.insertAdjacentHTML('beforeend',`<div class=gmem>${ro.map(m=>`<div class="gmc ${m.npc?'':'me'} ${/회장/.test(m.role)?'lead':''}"><img src="${A}${m.img}"><b>${m.n}</b><small>${m.role}</small><em><img class=gmpw src="${A}ic3_arena.png">${fmt(m.pow)}</em></div>`).join('')}</div>`)}
}catch(e){console.warn(e)}return r}})();
;(()=>{/* v135 화룡전-style 출석 board on bg_attend (7x4 calendar inside the painted board, gift boxes on 7/14/21/28) + 우편함 gift cards + collect fly-in animation (existing logic, no new rewards) */
const BX=i=>(i+1)==28?'l':(i+1)%7==0?((i+1)==7?'s':'m'):'';
const fly=(els,done)=>{const app=$('#app'),ar=app.getBoundingClientRect(),sc=ar.width/390;const tg=document.querySelector('.shead .chip:last-child')||document.querySelector('.shead');const tr=tg.getBoundingClientRect();
els.forEach((e,i)=>{const r=e.getBoundingClientRect(),im=e.querySelector('img');if(!im)return;const c=im.cloneNode();c.className='atfly';c.style.left=((r.left-ar.left)/sc+r.width/sc/2-18)+'px';c.style.top=((r.top-ar.top)/sc+r.height/sc/2-18)+'px';c.style.setProperty('--dx',((tr.left-r.left)/sc)+'px');c.style.setProperty('--dy',((tr.top-r.top)/sc)+'px');c.style.animationDelay=(i*.06)+'s';app.appendChild(c);setTimeout(()=>c.remove(),900+i*60);e.classList.add('atpop')});setTimeout(done,Math.min(700,420+els.length*40))};
const hook=(sb,sel,pick)=>{sb.addEventListener('click',ev=>{const b=ev.target.closest(sel);if(!b||b.classList.contains('off')||b._go)return;const els=pick(b);if(!els.length)return;ev.stopPropagation();b._go=1;fly(els,()=>{b.onclick&&b.onclick.call(b,ev)})},true)};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.querySelector('#screen'),sb=sc&&sc.querySelector('.sbody');if(!sb)return r;
if(G.screen=='event'&&!sb.querySelector('.atb')){const g=sb.querySelector('.attg');if(!g)return r;const s=C.S(),n=s.att.n||0,MAX=28;sc.classList.add('att2');
const cells=[...g.children].map((c,i)=>{const bx=BX(i),done=c.classList.contains('done'),now=c.classList.contains('now'),im=c.querySelector('img').getAttribute('src'),amt=c.querySelector('b').textContent;return `<div class="atc ${done?'done':''} ${now?'now':''} ${bx?'sp':''}"><small>${i+1}</small>${bx?`<img class=atx src="assets/at_box_${bx}.png">`:''}<img class=atr src="${im}"><b>${amt}</b>${done?'<span class=atst><i>출석</i><em>'+(i+1)+'일</em></span>':''}${now?'<em class=attd>오늘</em>':''}</div>`}).join('');/* r337: CSS stamp on claimed days, 오늘 tag on today */
const hd=g.previousElementSibling;if(hd&&hd.classList.contains('card'))hd.style.display='none';g.style.display='none';
g.insertAdjacentHTML('beforebegin',`<div class=atb><img class=atbg src="assets/bg_attend.jpg"><div class=atttl><b>28일 출석 보상</b><small>${n}/${MAX}일 · 사이클 ${(s.att.cyc||0)+1}</small></div><div class=atgrid>${cells}</div></div>`);
hook(sb,'#attC',()=>[...sb.querySelectorAll('.atc.now')])}
if(G.screen=='mail'&&!sb.querySelector('.mgc')){const s=C.S(),card=sb.querySelector('.card');if(!card)return r;sc.classList.add('mail2');const bg=sc.querySelector('.sbg');if(bg)bg.src='assets/bg_attend.jpg';
const LV=D.MAILS.filter(m=>C.mailLeft(m.k)>0);const html=LV.length?LV.map(m=>{const v=(m.g||0)+(m.o||0)*3+(m.t||0)*150,bx=v>=300?'l':v>=100?'m':'s',got=s.mailc[m.k];return `<div class="mgc ${got?'got':''}" data-mk=${m.k}><img class=mgb src="assets/at_box_${bx}.png"><b>${m.n}</b><div class=mgr>${m.g?`<span><img src=assets/it2_gem.png>${m.g}</span>`:''}${m.o?`<span><img src=assets/it2_exp.png>${m.o}</span>`:''}${m.t?`<span><img src=assets/it2_ticket.png>${m.t}</span>`:''}</div>${got?'<small>수령 완료</small>':`<span class="pill green" data-m="${m.k}">받기</span>`}</div>`}).join(''):'<div class=mlempty><img src=assets/ml_open.png><b>도착한 우편이 없습니다</b><small>새 우편이 오면 알려 드릴게요</small></div>';
card.innerHTML=`<div class=ttl>선물함 <small>보관 기한 7일 · ${LV.filter(m=>!s.mailc[m.k]).length}개</small></div><div class=mgg>${html}</div>`;
card.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const r2=C.mailClaim(b.dataset.m);if(!r2.n)return;renderScreen();rewardPop([r2.g&&['it2_gem.png',r2.g,'보석'],r2.o&&['it2_exp.png',r2.o,'마정구'],r2.t&&['it2_ticket.png',r2.t,'소환권']].filter(Boolean),'')});
hook(sb,'#mailAll',()=>[...sb.querySelectorAll('.mgc:not(.got)')]);hook(sb,'[data-m]',b=>[b.closest('.mgc')])}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v136 화룡전-style 상점 쇼케이스: daily deals on painted counter (bg_shop_counter), rarity frames, ⏱ refresh badge, buy confirm + item flies into bag (existing C.dealBuy; same prices) */
const RAR={d_tk:'epic',d_orb:'rare',d_stone:'rare'},RN2={epic:'영웅',rare:'희귀',common:'일반'};
const flyBag=(img,from)=>{const app=$('#app'),ar=app.getBoundingClientRect(),sc=ar.width/390,tg=document.querySelector('#navgear,#nav a[data-t=gear],#navroll')||document.querySelector('#nav'),t=tg.getBoundingClientRect(),f=from.getBoundingClientRect();const c=document.createElement('img');c.src=img;c.className='atfly shfly';c.style.left=((f.left-ar.left)/sc+f.width/sc/2-18)+'px';c.style.top=((f.top-ar.top)/sc+f.height/sc/2-18)+'px';c.style.setProperty('--dx',((t.left+t.width/2-f.left-f.width/2)/sc)+'px');c.style.setProperty('--dy',((t.top-f.top)/sc)+'px');app.appendChild(c);setTimeout(()=>c.remove(),900);setTimeout(()=>{tg.classList.add('pop');setTimeout(()=>tg.classList.remove('pop'),400)},700)};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='shop')return r;const dl=document.querySelector('#screen .deals');if(!dl||dl.classList.contains('scv'))return r;dl.classList.add('scv');const d=C.deals();
dl.querySelectorAll('.dcell').forEach((c,i)=>{const x=d.it[i];if(!x)return;const rr=RAR[x.k]||'common';c.classList.add('fr-'+rr);c.insertAdjacentHTML('afterbegin',`<img class=dfr src="assets/fr_${rr}.png"><em class=drr>${RN2[rr]}</em>`)});
dl.querySelectorAll('[data-deal]').forEach(b=>{const orig=b.onclick;if(b.classList.contains('off'))return;b.onclick=()=>{const i=+b.dataset.deal,x=d.it[i],it=C.DEALS.find(z=>z.k==x.k),p=C.dealPrice(x),ci=it.cur=='gems'?'it2_gem.png':'it2_gold.png',cell=b.closest('.dcell'),rr=RAR[x.k]||'common';
const m=document.createElement('div');m.className='modal shcf';m.innerHTML=`<div class=shcb><div class=ttl style="justify-content:center">구매 확인</div><div class="shci fr-${rr}"><img class=dfr src="assets/fr_${rr}.png"><img class=shim src="${A}${it.img}"></div><b>${it.n}</b><small>-${Math.round(x.off*100)}% 특가 · 하루 1회</small><div class=shcbt><span class="btn p" id=shNo>취소</span><span class=btn id=shOk><img class=ci src=assets/${ci}> ${fmt(p)} 구매</span></div></div>`;$('#app').appendChild(m);
m.querySelector('#shNo').onclick=()=>m.remove();m.onclick=e=>{if(e.target==m)m.remove()};m.querySelector('#shOk').onclick=()=>{const src=cell.querySelector('img:not(.dfr)').src;m.remove();flyBag(src,cell);setTimeout(()=>orig&&orig.call(b),650)}}})}catch(e){console.warn(e)}return r}})();
;(()=>{/* v137 화룡전-style 장비 강화: forge stage (item floats over painted anvil), success gauge, material slot row, hammer strike + success/fail fx (existing C.enhance / rates / costs) */
const oe=C.enhance;C.enhance=function(){const r=oe.apply(this,arguments);G._enLast=r;return r};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='enhance'||G.enTab!='gear')return r;const sc=document.querySelector('#screen'),an=sc&&sc.querySelector('.card.anvil');if(!an||an.classList.contains('forge'))return r;an.classList.add('forge');
const s=C.S(),it=s.gear[G.enSel];if(!it)return r;const c=C.enCost(it),rt=C.enRate(it),n=it.en||0;
const av=an.querySelector('.anvilv');if(av)av.insertAdjacentHTML('beforeend',`<i class=fglow></i><b class=fen>+${n}</b>`);
const st=[...an.querySelectorAll('.enstat')][1];if(st)st.outerHTML=`<div class=engauge><span>성공 확률</span><div class=egb><i style="width:${rt*100}%;background:${rt>=1?'linear-gradient(90deg,#3ad07a,#9aff6a)':rt>=.6?'linear-gradient(90deg,#e0a020,#ffe060)':'linear-gradient(90deg,#d03a20,#ff8a4a)'}"></i><b>${Math.round(rt*100)}%</b></div><small>실패 시 재료만 소모</small></div>`;
const ec=an.querySelector('.encost');if(ec){const sl=(img,have,need,nm)=>`<div class="emat ${have>=need?'ok':'no'}"><div class=emf><img class=emfr src="assets/fr_common.png"><img class=emi src="assets/${img}"></div><b>${fmt(need)}</b><small>${nm} 보유 ${fmt(have)}</small></div>`;
ec.outerHTML=`<div class=emats>${sl('it2_gold.png',s.gold,c.g,'골드')}<i class=eplus>+</i>${sl('it2_stone.png',s.stone||0,c.st,'강화석')}</div>`}
const eg=an.querySelector('#enGo');if(eg&&!eg.classList.contains('off')){const orig=eg.onclick;eg.onclick=null;eg.addEventListener('click',()=>{if(G._enBusy)return;G._enBusy=1;const big=an.querySelector('.eqbig'),app=$('#app'),ar=app.getBoundingClientRect(),k=ar.width/390,br=big.getBoundingClientRect(),cx=(br.left-ar.left)/k+br.width/k/2,cy=(br.top-ar.top)/k+br.height/k/2;
const h=document.createElement('img');h.src='assets/fx_hammer.png';h.className='fxham';h.style.left=(cx+10)+'px';h.style.top=(cy-90)+'px';app.appendChild(h);
setTimeout(()=>{big.classList.add('fxhit');orig&&orig.call(eg);const res=G._enLast;if(res=='ok'||res=='fail'){const f=document.createElement('div');f.className='fxres '+res;f.style.left=cx+'px';f.style.top=cy+'px';f.innerHTML=`<img src="assets/fx_${res=='ok'?'success':'fail'}.png"><b>${res=='ok'?'강화 성공!':'강화 실패'}</b>`;app.appendChild(f);setTimeout(()=>f.remove(),1100)}},380);setTimeout(()=>{h.remove();G._enBusy=0},700)})}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v138 화룡전-style 동료 육성 card view: portrait on magic circle (bg_train_hall), aura, before/after stats, material bars, Lv-up / 승급 / 스킬 with fx (existing compUp / starUp / skUp; same costs) */
const fx=(img,txt,cls)=>{const st=document.querySelector('.trstage');if(!st)return;const f=document.createElement('div');f.className='trfx '+cls;f.innerHTML=`<img src="assets/${img}"><b>${txt}</b>`;st.appendChild(f);setTimeout(()=>f.remove(),1300)};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='enhance'||G.enTab!='comp')return r;const sb=document.querySelector('#screen .sbody');if(!sb||sb.querySelector('.trv'))return r;
const s=C.S(),own=D.COMPS.filter(c=>s.comps[c.k]);if(!own.length)return r;if(!s.comps[G.trSel])G.trSel=own[0].k;const c=D.COMPS.find(x=>x.k==G.trSel),k=c.k;
const lv=(s.clv||{})[k]||1,st=s.comps[k]||1,sk=(s.csk||{})[k]||1,mul=C.compMul(k),lc=C.compUpCost(k),kc=C.skCost(k),sc=C.starCost(k),sh=(s.csh||{})[k]||0,smax=st>=C.STARMAX;
const mLv=mul*(1+.05*lv)/(1+.05*(lv-1)),mSt=mul*(1+.1*st)/(1+.1*(st-1)),R=D.RAR&&D.RAR[c.g]?D.RAR[c.g].c:'#ffd77a';
const bar=(ic,have,need,nm)=>`<div class=trm><img src="assets/${ic}"><div class=trmb><i style="width:${Math.min(100,have/need*100)}%" class="${have>=need?'ok':''}"></i><b>${fmt(have)} / ${fmt(need)}</b></div><small>${nm}</small></div>`;
const html=`<div class=trv><div class=trsel>${own.map(x=>`<img class="${x.k==k?'on':''}" data-tr=${x.k} src="${A}${x.img}">`).join('')}</div>
<div class=trstage style="--rc:${R}"><img class=trch src="${A}${c.img}"><div class=trnm><b>${c.n}</b><span>${'★'.repeat(st)}<i>${'★'.repeat(Math.max(0,C.STARMAX-st))}</i></span></div><b class=trlv>Lv.${lv}</b></div>
<div class=trcmp><div><small>공격 배율</small><b>×${mul.toFixed(2)}</b></div><i>▶</i><div class=nx><small>레벨업 후</small><b>×${mLv.toFixed(2)}</b></div><div class=nx2><small>승급 후</small><b>${smax?'MAX':'×'+mSt.toFixed(2)}</b></div></div>
<div class=trmats>${bar('it2_gold.png',s.gold,lc,'레벨업 골드')}${smax?'':bar(c.img,sh,sc,'승급 조각')}${sk>=10?'':bar('it2_stone.png',s.stone||0,kc.st,'스킬 강화석 (Lv.'+sk+')')}</div>
<div class=trbtn><span class="btn ${s.gold<lc?'off':''}" id=trLv><img src="assets/fx_lvup.png">레벨업</span><span class="btn g ${smax||sh<sc?'off':''}" id=trSt><img src="assets/fx_starup.png">${smax?'최대 승급':'승급'}</span><span class="btn p ${sk>=10||s.gold<kc.g||(s.stone||0)<kc.st?'off':''}" id=trSk><img src="assets/${(D.CSKI[k]||['sk/ult.png'])[0]}">스킬</span></div></div>`;
const list=[...sb.querySelectorAll(':scope>.card')].find(x=>x.querySelector('[data-lu]'));if(list){list.insertAdjacentHTML('beforebegin',html);list.classList.add('trlist')}else sb.insertAdjacentHTML('beforeend',html);
sb.querySelectorAll('[data-tr]').forEach(e=>e.onclick=()=>{G.trSel=e.dataset.tr;renderScreen()});
const after=(f)=>{updateHud();setTimeout(renderScreen,650);f()};
sb.querySelector('#trLv').onclick=()=>{if(!C.compUp(k))return toast('골드가 부족합니다');after(()=>fx('fx_lvup.png','LEVEL UP!','lv'))};
sb.querySelector('#trSt').onclick=()=>{const q=C.starUp(k);if(q!='ok')return toast(q=='max'?'최대 승급':'조각이 부족합니다');after(()=>fx('fx_starup.png','승급 성공!','st'))};
sb.querySelector('#trSk').onclick=()=>{const q=C.skUp(k);if(q!='ok')return toast({gold:'골드가 부족합니다',stone:'강화석이 부족합니다',max:'최대 레벨'}[q]||'');after(()=>fx('fx_lvup.png','스킬 강화!','lv'))}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v139 화룡전-style 탐험 map: parchment region map, parties as moving tokens, time-left rings, 모두 받기 with chest opening (existing C.expSend / expClaim; same rewards) */
const N={e1:[25,32],e2:[22,70],e3:[74,24]},HOME=[52,52],RU=[73,72];
const ring=(p,done)=>`<svg class=exr viewBox="0 0 44 44"><circle cx=22 cy=22 r=19 class=bg /><circle cx=22 cy=22 r=19 class="fg ${done?'dn':''}" stroke-dasharray="${(p*119.4).toFixed(1)} 200" /></svg>`;
const pos=(E,x,now)=>{const T=E.min*60000,p=Math.min(1,Math.max(0,1-(x.end-now)/T)),n=N[E.k];return{p,l:HOME[0]+(n[0]-HOME[0])*Math.min(1,p*1.0),t:HOME[1]+(n[1]-HOME[1])*Math.min(1,p)}};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='explore')return r;const sb=document.querySelector('#screen .sbody');if(!sb||sb.querySelector('.exmap'))return r;
const s=C.S(),st=C.expState(),now=C.now();let nd='',tk='',ready=0;
D.EXPS.forEach(E=>{const x=st[E.k],n=N[E.k];if(!n)return;let p=0,done=false;if(x){const q=pos(E,x,now);p=q.p;done=now>=x.end;if(done)ready++;const c=D.COMPS.find(z=>z.k==x.c);tk+=`<div class="extk ${done?'arr':''}" data-ek=${E.k} style="left:${q.l}%;top:${q.t}%"><img src="${A}${c?c.img:'hero_lina.png'}"></div>`}
nd+=`<div class="exn ${x?(done?'done':'run'):'idle'}" style="left:${n[0]}%;top:${n[1]}%" data-en=${E.k}>${ring(x?p:0,done)}<img class=exf src="assets/ex_flag.png"><em>${E.n}</em><small class=ext data-ee=${E.k}>${x?(done?'완료!':Math.ceil((x.end-now)/60000)+'분'):(E.min>=60?E.min/60+'시간':E.min+'분')}</small></div>`});
nd+=`<div class="exn lock" style="left:${RU[0]}%;top:${RU[1]}%"><img class=exf src="assets/ex_flag.png"><em>고대 유적 <img class="emi e_sk_lock" src=assets/sk_lock.png alt=""></em></div><div class=exhome style="left:${HOME[0]}%;top:${HOME[1]}%"><img src="${A}hero_lina.png"><em>캠프</em></div>`;
sb.insertAdjacentHTML('afterbegin',`<div class=exmap><img class=exbg src="assets/bg_explore_map.jpg">${nd}${tk}<span class="btn exall ${ready?'':'off'}" id=exAll><img src="assets/ex_chest_c.png">모두 받기${ready?` (${ready})`:''}</span></div>`);
sb.querySelectorAll('[data-en]').forEach(e=>e.onclick=()=>{const b=sb.querySelector(`[data-go=${e.dataset.en}],[data-cl=${e.dataset.en}]`);if(b){b.closest('.expc').scrollIntoView({behavior:'smooth',block:'center'});b.closest('.expc').classList.remove('gflash');void b.offsetWidth;b.closest('.expc').classList.add('gflash')}});
sb.querySelector('#exAll').onclick=()=>{const ks=D.EXPS.filter(E=>st[E.k]&&C.now()>=st[E.k].end).map(E=>E.k);if(!ks.length)return toast('완료된 탐험이 없습니다');const tot={g:0,gem:0,f:0};ks.forEach(k=>{const q=C.expClaim(k);if(q){tot.g+=q.g;tot.gem+=q.gem;tot.f+=q.f}});updateHud();
const m=document.createElement('div');m.className='modal excm';m.innerHTML=`<div class=excb><div class=exch><img class=c1 src="assets/ex_chest_c.png"><img class=c2 src="assets/ex_chest_o.png"><i class=exsh></i></div><div class=ttl style="justify-content:center;font-size:18px">탐험 ${ks.length}곳 완료!</div><div class=rwgrid><div><img src="assets/it2_gold.png"><b>${fmt(tot.g)}</b><small>골드</small></div><div><img src="assets/it2_gem.png"><b>${tot.gem}</b><small>보석</small></div><div><img src="${A}ic3_relic.png"><b>${tot.f}</b><small>바이블 조각</small></div></div><small style="display:block;text-align:center;opacity:.7;margin-top:6px">화면을 터치하여 닫기</small></div>`;m.onclick=()=>{m.remove();renderScreen()};$('#app').appendChild(m);renderScreen()}}catch(e){console.warn(e)}return r};
setInterval(()=>{if(G.screen!='explore')return;const st=C.expState(),now=C.now();let flip=false;D.EXPS.forEach(E=>{const x=st[E.k],t=document.querySelector(`.extk[data-ek=${E.k}]`);if(!x||!t)return;const q=pos(E,x,now);t.style.left=q.l+'%';t.style.top=q.t+'%';const fg=document.querySelector(`[data-en=${E.k}] .fg`);if(fg)fg.setAttribute('stroke-dasharray',(q.p*119.4).toFixed(1)+' 200');const tx=document.querySelector(`[data-ee=${E.k}]`);if(tx&&now<x.end)tx.textContent=Math.ceil((x.end-now)/60000)+'분';if(now>=x.end&&!t.classList.contains('arr'))flip=true});if(flip&&!document.querySelector('.excm'))renderScreen()},1000)})();
;(()=>{/* v140 화룡전-style 월드보스: sunset raid stage with huge boss, attempt pips, crown leaderboard; big damage-number bursts during the fight (existing C.wb* logic, no reward changes) */
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='wboss')return r;const sb=document.querySelector('#screen .sbody');if(!sb||sb.querySelector('.wbst'))return r;
const w=C.wbState(),L=C.wbRank(),left=C.WB.tries-w.tries,top=Math.max(1,...L.map(x=>x.d)),my=L.findIndex(x=>x.me)+1;const sc=document.querySelector('#screen');sc.classList.add('wb2');
const h=sb.querySelector('.wbh');if(h)h.style.display='none';
sb.insertAdjacentHTML('afterbegin',`<div class=wbst><img class=wbbg src="assets/bg_wboss_arena.jpg"><i class=wbdark></i><img class=wbboss src="${A}${C.WB.img}"><div class=wbnm><img src="assets/wb_skull.png"><div><b>${C.WB.n}</b><small>${C.WB.time}초 · 피해량 등급 보상</small></div></div>
<div class=wbtr><img src="assets/wb_sword.png"><div><small>오늘 도전</small><span>${[...Array(C.WB.tries)].map((_,i)=>`<i class="${i<left?'on':''}"></i>`).join('')}</span><b>${left}/${C.WB.tries}</b></div></div>
<div class=wbbest><small>오늘 최고</small><b>${fmt(w.today||0)}</b><em>${w.today?my+'위':'-'}</em></div></div>`);
const rk=[...sb.querySelectorAll('.card')].find(c=>c.querySelector('.wbr'));if(rk){rk.classList.add('wbrk');rk.querySelectorAll('.wbr').forEach((row,i)=>{const x=L[i];if(!x)return;row.insertAdjacentHTML('beforeend',`<s style="width:${(x.d/top*100).toFixed(1)}%"></s>`);if(i<3)row.querySelector('.rk').innerHTML=`<img src="assets/wb_crown.png" style="filter:${['none','grayscale(1) brightness(1.3)','sepia(1) hue-rotate(-20deg) saturate(2) brightness(.8)'][i]}"><em>${i+1}</em>`});
const t=rk.querySelector('.ttl');if(t)t.insertAdjacentHTML('afterbegin','<img src="assets/wb_crown.png" class=gti>')}
const go=sb.querySelector('#wbGo');if(go)go.innerHTML=`<img src="assets/wb_sword.png">도전하기 (${left}/${C.WB.tries})`}catch(e){console.warn(e)}return r};
let last=0;setInterval(()=>{const wb=C.B.wb;if(!wb){last=0;return}const d=wb.dmg||0,dd=d-last;last=d;if(dd<=0)return;const bt=$('#battle');if(!bt)return;const n=document.createElement('b');n.className='wbdn'+(dd>C.wbRef()*.6?' big':'');n.textContent=fmt(Math.round(dd));n.style.left=(165+Math.random()*80)+'px';n.style.top=(370+Math.random()*50)+'px';bt.appendChild(n);setTimeout(()=>n.remove(),900)},300);
Object.assign(C.ev,{wbEnd:(o=>function(){document.querySelectorAll('.wbtot,.wbdn').forEach(x=>x.remove());return o&&o.apply(this,arguments)})(C.ev.wbEnd)})})();
;(()=>{/* v141 무한의 탑 계단 등반 */
const st=document.createElement('style');st.textContent=`.twst{position:relative;height:560px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:0 4px 10px #0008}
.twst>.tbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:52% 50%}
.twst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0a102a99,#0000 30%,#0000 75%,#0a102a88);pointer-events:none}
.tfl{position:absolute;z-index:2;display:flex;align-items:center;gap:6px;height:46px;padding:0 10px 0 6px;border-radius:12px;background:linear-gradient(#2c3a5cee,#1a2238ee);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #8aa6e066,0 3px 6px #0009;color:#fff}
.tfl b{font-size:16px;color:#ffe08a;min-width:38px;text-shadow:0 2px 0 #000}.tfl small{font-size:10px;opacity:.85;line-height:1.2}.tfl .ti{height:34px;filter:drop-shadow(0 2px 2px #000)}
.tfl.done{background:linear-gradient(#24405aee,#16283aee)}.tfl.done b{color:#9fd8ff}
.tfl.up{filter:saturate(.5) brightness(.8)}.tfl.boss{background:linear-gradient(#6a1a24f2,#300a12f2);box-shadow:inset 0 0 0 1px #ff6a5a88,0 0 10px #ff303066}.tfl.boss b{color:#ffb0a0}
.tfl.cur{background:linear-gradient(#ffd86af5,#d08a1af5);box-shadow:0 0 0 2px #fff6,0 0 18px #ffc040;animation:tfp 1.4s infinite}.tfl.cur b{color:#5a2a00;text-shadow:none}.tfl.cur small{color:#4a2400;opacity:1;font-weight:800}
@keyframes tfp{50%{box-shadow:0 0 0 2px #fff9,0 0 28px #ffd060}}
.tlina{position:absolute;z-index:3;height:78px;filter:drop-shadow(0 4px 4px #000b);animation:tlb 1.2s ease-in-out infinite;pointer-events:none}@keyframes tlb{50%{transform:translateY(-5px)}}
.ttop{position:absolute;z-index:3;left:10px;top:10px;display:flex;gap:6px}.ttop span{background:#0009;border:1px solid #fff3;border-radius:10px;padding:3px 8px;font-size:11px;font-weight:800;color:#fff}.ttop img{height:15px;vertical-align:-3px}
.tgo{position:absolute;z-index:3;left:50%;bottom:16px;transform:translateX(-50%);min-width:180px;text-align:center;font-size:18px;font-weight:900;padding:10px 18px;border-radius:16px;color:#fff;border:2px solid #0b0d0f;background:linear-gradient(#a8f070,#4cbf3a 55%,#2f9a2a);box-shadow:inset 0 2px 0 #e0ffc0,0 4px 0 #145a12,0 0 16px #8f8a;text-shadow:0 2px 0 #0006}
.tgo.hard{background:linear-gradient(#ff8a6a,#c02a1a);box-shadow:inset 0 2px 0 #ffc0b0,0 4px 0 #5a0a0a}.tgo small{display:block;font-size:10px;font-weight:700}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='tower')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),T=C.T,t=C.tower(),cur=t.f+1,pw=C.POW(),list=el.querySelector('.twl'),go=el.querySelector('#twGo');if(!list||el.querySelector('.twst'))return;
 const fs=[];for(let f=cur+5;f>=Math.max(1,cur-1);f--)fs.push(f);
 const nb=Math.ceil(cur/10)*10;let h=`<img class=tbg src="${A}bg_tower_climb.jpg"><div class=ttop><span><img src="${A}tw_flag.png"> 최고 ${t.f}층</span><span><img src="${A}tw_door.png"> 다음 보스 ${nb}F</span></div>`;
 const n=fs.length;fs.forEach((f,i)=>{const s=f<cur?'done':f==cur?'cur':'up',y=18+i*64,x=[30,150,60,170,40,160,70,150][i%8],b=T.boss(f),rq=T.req(f);
  const ic=s=='done'?'tw_flag':b?'tw_door':s=='up'?'tw_lock':null;
  h+=`<div class="tfl ${s} ${b?'boss':''}" style="left:${x}px;top:${y+20}px">${ic?`<img class=ti src="${A}${ic}.png">`:''}<b>${f}F</b><small>${b?'보스층<br>':''}${s=='done'?'클리어':'권장 '+fmt(rq)}</small></div>`;
  if(s=='cur')h+=`<img class=tlina src="${A}hero_lina.png" data-y=${y}>`});
 const rq=T.req(cur);h+=`<span class="tgo ${pw>=rq?'':'hard'}" id=twGo2>${cur}층 도전<small>전투력 ${fmt(pw)} / ${fmt(rq)}</small></span>`;
 const d=document.createElement('div');d.className='twst';d.innerHTML=h;list.parentNode.insertBefore(d,el.querySelector('.twh'));list.style.display='none';
 const cp=d.querySelector('.tfl.cur'),li=d.querySelector('.tlina');if(cp&&li){cp.style.paddingRight='74px';const pl=()=>{const a=cp.getBoundingClientRect(),b=d.getBoundingClientRect();li.style.left=(a.right-b.left-72)+'px';li.style.top=(a.top-b.top+2)+'px'};pl();requestAnimationFrame(pl);setTimeout(pl,300)}
 d.querySelector('#twGo2').onclick=()=>{const g=el.querySelector('#twGo');if(g)g.click()}}
})();
;(()=>{/* v142 펫 정원 */
const st=document.createElement('style');st.textContent=`.ptst{position:relative;height:300px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:0 4px 10px #0008}
.ptst>.pbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ptst .ppet{position:absolute;left:50%;bottom:162px;height:110px;transform:translateX(-50%);filter:drop-shadow(0 0 10px #fff9) drop-shadow(0 6px 4px #0008);animation:ppb 1.6s ease-in-out infinite;z-index:2}
@keyframes ppb{50%{transform:translateX(-50%) translateY(-7px)}}
.ptst .pnm{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);z-index:3;background:linear-gradient(#5a2a6aee,#2a1036ee);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #ffc0f088;border-radius:12px;padding:4px 12px;text-align:center;white-space:nowrap;color:#fff}
.ptst .pnm b{font-size:15px;color:#ffe08a}.ptst .pnm small{display:block;font-size:10px}
.ptst .phs{position:absolute;left:10px;top:10px;z-index:3;display:flex;gap:6px}.ptst .phs span{background:#0009;border:1px solid #fff4;border-radius:10px;padding:3px 8px;font-size:11px;font-weight:800;color:#fff;display:flex;align-items:center;gap:3px}.ptst .phs img{height:16px}
.pthrt{display:flex;justify-content:center;gap:1px;margin-top:2px}.pthrt img{height:11px}.pthrt img.e{filter:grayscale(1) brightness(.5);opacity:.6}
.ptc .pthrt{position:relative;z-index:1}.ptst .pthrt img{height:15px}
#ptHatch img.pegi{height:20px;vertical-align:-5px;margin-right:2px}
.pthm .pegg{width:120px;height:140px;margin:6px auto 0;position:relative}.pthm .pegg img{width:100%;height:100%;object-fit:contain;animation:pwob .9s ease-in-out 0s 2,pcrk .5s 1.8s forwards}
.pthm .pegg:after{content:'';position:absolute;inset:-30px;border-radius:50%;background:radial-gradient(#fff,#ffe08a88 35%,#0000 65%);opacity:0;animation:pfl .7s 1.9s forwards}
@keyframes pwob{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(5deg)}}
@keyframes pcrk{0%{transform:scale(1);filter:brightness(1)}60%{transform:scale(1.15);filter:brightness(2.5)}100%{transform:scale(1.4);opacity:0;filter:brightness(4)}}
@keyframes pfl{40%{opacity:1}100%{opacity:0;transform:scale(1.8)}}
.pthm .pthi{position:absolute;left:50%;top:24px;margin:0 0 0 -65px!important;height:130px;width:130px;object-fit:contain;opacity:0;animation:prv .6s 2.1s forwards!important}
.pthm .pthr{opacity:0;animation:prt .4s 2.4s forwards}
@keyframes prv{0%{opacity:0;transform:scale(.3)}70%{opacity:1;transform:scale(1.15)}100%{opacity:1;transform:scale(1)}}@keyframes prt{to{opacity:1}}`;document.head.appendChild(st);
const PM=20,hearts=(l,n=5)=>{const f=Math.round((l||0)/PM*n);return `<div class=pthrt>${Array.from({length:n},(_,i)=>`<img class="${i<f?'':'e'}" src="${A}pt_heart.png">`).join('')}</div>`};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='pet')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),p=C.S().pet||{},P=C.PETS,hd=el.querySelector('.pth');if(!hd||el.querySelector('.ptst'))return;
 const x=P.find(q=>q.k==p.eq),own=Object.keys(p.own||{}).length;
 const d=document.createElement('div');d.className='ptst';d.innerHTML=`<img class=pbg src="${A}bg_pet_garden.jpg"><div class=phs><span><img src="${A}pt_egg.png">알 ${p.egg||0}</span><span><img src="${A}pt_paw.png">${own}/${P.length}</span></div>`+(x?`<img class=ppet src="${A}${x.img}"><div class=pnm><b>${x.n}</b><small>Lv.${p.own[x.k]} · 장착 중</small>${hearts(p.own[x.k])}</div>`:`<div class=pnm><b>장착한 펫 없음</b><small>알을 부화해 보세요</small></div>`);
 hd.parentNode.insertBefore(d,hd);
 el.querySelectorAll('.ptc[data-pk]').forEach(c=>{const l=(p.own||{})[c.dataset.pk];if(l)c.querySelector('small').insertAdjacentHTML('afterend',hearts(l))});
 const hb=el.querySelector('#ptHatch');if(hb){hb.innerHTML=hb.innerHTML.replace('🥚',`<img class=pegi src="${A}pt_egg.png">`);const o=hb.onclick;hb.onclick=e=>{o&&o(e);const m=[...document.querySelectorAll('.pthm')].pop();if(!m)return;const eg=m.querySelector('.egg');if(eg)eg.outerHTML=`<div class=pegg><img src="${A}pt_egg.png"></div>`;const c=m.querySelector('.card');[...c.children].forEach(n=>{if(!n.matches('.pegg,.pthi'))n.classList.add('pthr')})}}}
})();
;(()=>{/* v143 도감 서고 */
const st=document.createElement('style');st.textContent=`.cxst{position:relative;height:250px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:0 4px 10px #0008}
.cxst>.cbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 60%}
.cxst:after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#ffe0a033,#0000 50%),linear-gradient(#0000 60%,#1a0e06cc);pointer-events:none}
.cxst .cpct{position:absolute;left:50%;top:14px;transform:translateX(-50%);z-index:2;text-align:center;color:#fff;text-shadow:0 2px 4px #000}
.cxst .cpct b{display:block;font-size:34px;font-weight:900;color:#ffe08a;line-height:1;text-shadow:0 0 12px #ffb040,0 3px 0 #6a3a00}.cxst .cpct small{font-size:11px;font-weight:800;background:#000a;border-radius:9px;padding:2px 8px;display:inline-block;margin-top:3px}
.cxst .cbar{position:absolute;left:30px;right:30px;bottom:14px;z-index:2;height:14px;border-radius:8px;background:#0009;border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #c9a25a88;overflow:hidden}.cxst .cbar i{display:block;height:100%;background:linear-gradient(#ffe89a,#e0a030);box-shadow:0 0 8px #ffc040}
.cxst .cct{position:absolute;bottom:34px;z-index:2;display:flex;gap:6px;left:50%;transform:translateX(-50%);white-space:nowrap}.cxst .cct span{background:#000a;border:1px solid #c9a25a88;border-radius:9px;padding:2px 7px;font-size:10px;font-weight:800;color:#fff}
.cxst .cbk{position:absolute;left:10px;top:10px;height:36px;z-index:2;filter:drop-shadow(0 2px 3px #000)}
.cdc.cxf{position:relative;background:linear-gradient(#4a3420,#2a1c10)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 0 0 2px #c9a25a,inset 0 0 12px #000a!important;border-radius:10px}
.cdc.cxf>img:first-child{filter:drop-shadow(0 3px 3px #000a)}.cdc.cxf b{color:#ffe8b0}
.cdc .cxs{position:absolute!important;right:-6px;bottom:-6px;left:auto!important;top:auto!important;width:34px!important;height:34px!important;background:none!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important;opacity:1!important;transform:rotate(-12deg);filter:drop-shadow(0 2px 2px #000a);z-index:2}
.cdc.new .cxs{display:none}
.cdc.cxu{background:linear-gradient(#1c2a4a,#101828)!important;box-shadow:inset 0 0 0 2px #4a6aa0!important;border:2px solid #0b0d0f!important}.cdc.cxu>img:first-child{filter:none!important;opacity:1!important;object-fit:contain}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='codex')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),sm=el.querySelector('.cdsum');if(!sm||el.querySelector('.cxst'))return;const s=C.S(),P=C.PETS||[];
 const oc=D.COMPS.filter(c=>s.comps[c.k]).length,om=D.MONS.filter(m=>(s.seen||{})[m.img]).length,op=P.filter(p=>((s.pet||{}).own||{})[p.k]).length,tot=D.COMPS.length+D.MONS.length+P.length,pc=Math.floor((oc+om+op)/tot*100);
 const d=document.createElement('div');d.className='cxst';d.innerHTML=`<img class=cbg src="${A}bg_codex_library.jpg"><img class=cbk src="${A}cx_book.png"><div class=cpct><b>${pc}%</b><small>도감 완성도 · ${oc+om+op}/${tot}</small></div><div class=cct><span>동료 ${oc}/${D.COMPS.length}</span><span>몬스터 ${om}/${D.MONS.length}</span><span>펫 ${op}/${P.length}</span></div><div class=cbar><i style="width:${pc}%"></i></div>`;
 sm.parentNode.insertBefore(d,sm);
 el.querySelectorAll('.cdc').forEach(c=>{const im=c.querySelector('img');if(c.classList.contains('lock')){c.classList.add('cxu');if(im&&!c.classList.contains('hc'))im.src=A+'cx_unknown.png'}else{c.classList.add('cxf');if(!c.classList.contains('new'))c.insertAdjacentHTML('beforeend',`<img class=cxs src="${A}cx_seal.png">`)}})}
})();
;(()=>{/* v144 업적의 전당 */
const st=document.createElement('style');st.textContent=`.acst{position:relative;height:250px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:0 4px 10px #0008}
.acst>.abg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 50%}
.acst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 55%,#1a1006d0);pointer-events:none}
.acst .asc{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);z-index:2;display:flex;align-items:center;gap:8px;background:linear-gradient(#5a3a10f0,#2a1806f0);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #ffd77a99,0 0 14px #ffc04066;border-radius:14px;padding:5px 14px;white-space:nowrap;color:#fff}
.acst .asc img{height:34px}.acst .asc b{font-size:22px;color:#ffe08a;text-shadow:0 2px 0 #000}.acst .asc small{display:block;font-size:10px;font-weight:800}
.acst .ach2{position:absolute;top:10px;z-index:2;display:flex;align-items:center;gap:4px;background:#000a;border:1px solid #ffd77a66;border-radius:10px;padding:3px 8px;font-size:11px;font-weight:800;color:#fff}.acst .ach2 img{height:18px}
.achr{position:relative;background:linear-gradient(#3a2c1a,#241a0e)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 0 0 1px #c9a25a88!important;border-radius:12px}
.achr.can{box-shadow:inset 0 0 0 2px #ffd25a,0 0 12px #ffb03a88!important;background:linear-gradient(#5a4018,#33240c)!important}
.achr .amd{position:absolute;left:-6px;top:-8px;height:30px;z-index:2;filter:drop-shadow(0 2px 2px #000a);animation:amd 1.2s ease-in-out infinite}@keyframes amd{50%{transform:rotate(-10deg) scale(1.08)}}
.achr.done{opacity:.8}.achr .adn{height:44px;width:auto!important;margin-right:2px;transform:rotate(-8deg);filter:drop-shadow(0 2px 3px #000a)}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='ach')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen');if(el.querySelector('.acst'))return;const L=C.achList(),hd=el.querySelector('.sbody .card,.card');if(!hd)return;
 const done=L.filter(a=>a.done).length,can=L.filter(a=>a.can).length;
 const d=document.createElement('div');d.className='acst';d.innerHTML=`<img class=abg src="${A}bg_ach_hall.jpg"><span class=ach2 style="left:10px"><img src="${A}ac_medal.png">받을 보상 ${can}</span><span class=ach2 style="right:10px"><img src="${A}ac_done.png">완료 ${done}/${L.length}</span><div class=asc><img src="${A}ac_trophy.png"><div><small>업적 점수</small><b>${fmt(C.achScore())}</b></div></div>`;
 hd.parentNode.insertBefore(d,hd);const t=hd.querySelector('.ttl');if(t)t.style.display='none';
 el.querySelectorAll('.achr').forEach(r=>{if(r.classList.contains('can'))r.insertAdjacentHTML('afterbegin',`<img class=amd src="${A}ac_medal.png">`);if(r.classList.contains('done')){const sm=[...r.children].pop();if(sm&&sm.tagName=='SMALL')sm.outerHTML=`<img class=adn src="${A}ac_done.png">`}})}
})();
;(()=>{/* v145 랭킹 시상대 */
const st=document.createElement('style');st.textContent=`.rkst{position:relative;height:290px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:0 4px 10px #0008}
.rkst>.rbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 70%}
.rkst .rttl{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:3;background:#000a;border:1px solid #ffd77a88;border-radius:12px;padding:3px 12px;font-size:12px;font-weight:900;color:#ffe08a;white-space:nowrap}
.rkp{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;transform:translateX(-50%)}
.rkp .rav{position:relative}.rkp .rav>img{height:var(--h);filter:drop-shadow(0 5px 4px #000a)}
.rkp .rlr{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);height:46px;z-index:-1;opacity:.95}
.rkp .rnm{margin-top:2px;background:linear-gradient(#2a1c48f0,#140c28f0);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px var(--c);border-radius:10px;padding:2px 8px;text-align:center;white-space:nowrap;color:#fff}
.rkp .rnm b{font-size:11px;display:block}.rkp .rnm small{font-size:10px;color:#ffe08a;font-weight:800}
.rkp .rno{position:absolute;top:-10px;left:-8px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:14px;color:#3a2000;background:var(--c);border:2px solid #0b0d0f;z-index:3}
.rkrow{display:flex;align-items:center;gap:8px;padding:6px 8px;margin:4px 0;border-radius:10px;background:linear-gradient(#2c3346,#1c2130);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #5a6a8a88}
.rkrow.me{background:linear-gradient(#6a4a14,#3a2808);box-shadow:inset 0 0 0 2px #ffd25a,0 0 10px #ffb03a77}
.rkrow .rn{width:26px;text-align:center;font-weight:900;font-size:16px;color:#cfd8ff}.rkrow .f{flex:1}.rkrow .f b{font-size:13px}.rkrow .f small{font-size:10px;opacity:.8}
.rkrow .rp{font-weight:900;color:#ffe08a}.rkrow .ra{height:16px;margin-left:4px}.rkrow .rav2{width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 2px 2px #000a)}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='rank')deco()}catch(e){console.warn(e)}return r};
const hsh=s=>[...s].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7);
function deco(){const el=$('#screen');if(el.querySelector('.rkst'))return;const cards=el.querySelectorAll('.sbody>.card,.card');if(cards.length<2)return;const hd=cards[0],lc=cards[1];
 const rows=[...lc.querySelectorAll('.row')].map(r=>{const bs=r.querySelectorAll('b');return{n:bs[1].textContent,lv:r.querySelector('small').textContent,p:bs[2].textContent,me:!!r.getAttribute('style')}});if(rows.length<3)return;
 const imgs=D.COMPS.map(c=>c.img),av=(x,i)=>x.me?'hero_lina.png':imgs[(i*3+1)%imgs.length];
 const pos=[[50,32,92,'#ffd66a'],[24,96,76,'#dfe6f0'],[76,96,76,'#e8a060']];
 let h=`<img class=rbg src="${A}bg_rank_podium.jpg"><span class=rttl>전투력 랭킹 · 시즌 1</span>`;
 rows.slice(0,3).forEach((x,i)=>{const [l,t,hh,c]=pos[i];h+=`<div class=rkp style="left:${l}%;top:${t}px;--h:${hh}px;--c:${c}"><div class=rav><i class=rno>${i+1}</i>${i==0?`<img class=rlr src="${A}rk_laurel.png" style="height:${hh+10}px;bottom:-14px">`:''}<img src="${A}${av(x,i)}"></div><div class=rnm><b>${x.n}</b><small>${x.p}</small></div></div>`});
 const d=document.createElement('div');d.className='rkst';d.innerHTML=h;hd.parentNode.insertBefore(d,hd);hd.querySelector('img').style.display='none';const t=hd.querySelector('.ttl');if(t)t.style.display='none';
 const sv=C.S();sv.rkh=sv.rkh||{cur:null,prev:null};const now={};rows.forEach((x,i)=>now[x.n.replace(/ \(나\)$/,'')]=i+1);if(JSON.stringify(now)!==JSON.stringify(sv.rkh.cur)){sv.rkh.prev=sv.rkh.cur;sv.rkh.cur=now;try{G.save&&G.save()}catch(_){}}const pv=sv.rkh.prev;
 lc.innerHTML=rows.map((x,i)=>{const nk=x.n.replace(/ \(나\)$/,''),p0=pv&&pv[nk],m=!p0||p0==i+1?0:p0>i+1?1:2;return `<div class="rkrow ${x.me?'me':''}"><b class=rn>${i+1}</b><img class=rav2 src="${A}${av(x,i)}"><div class=f><b>${x.n}</b><br><small>${x.lv}</small></div><b class=rp>${x.p}</b>${m==1?`<img class=ra src="${A}rk_up.png">`:m==2?`<img class=ra src="${A}rk_down.png">`:'<span class=ra style="width:16px;text-align:center;opacity:.6">-</span>'}</div>`}).join('')}
})();
;(()=>{/* v146 코스튬 드레스룸 */
const st=document.createElement('style');st.textContent=`.skst{position:relative;height:330px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:0 4px 10px #0008}
.skst>.kbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:52% 60%}
.skst .kspot{position:absolute;left:50%;bottom:30px;width:220px;height:300px;transform:translateX(-50%);background:radial-gradient(ellipse at 50% 100%,#fff6 0,#ffe8ff33 40%,#0000 70%);pointer-events:none}
.skst .kch{position:absolute;left:50%;bottom:58px;height:190px;transform:translateX(-50%);z-index:2;filter:drop-shadow(0 8px 6px #0009);animation:kbob 2s ease-in-out infinite}@keyframes kbob{50%{transform:translateX(-50%) translateY(-5px)}}
.skst .kst{position:absolute;height:26px;z-index:3;animation:ktw 1.6s ease-in-out infinite}@keyframes ktw{50%{transform:scale(.6) rotate(20deg);opacity:.5}}
.skst .knm{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);z-index:3;background:linear-gradient(#5a2a6af0,#2a1036f0);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #ffc0f088;border-radius:12px;padding:3px 14px;text-align:center;white-space:nowrap;color:#fff}.skst .knm b{font-size:15px;color:#ffe08a}.skst .knm small{display:block;font-size:10px}
.skst .kcnt{position:absolute;left:10px;top:10px;z-index:3;display:flex;align-items:center;gap:4px;background:#000a;border:1px solid #ffd77a66;border-radius:10px;padding:3px 8px;font-size:11px;font-weight:800;color:#fff}.skst .kcnt img{height:18px}
.skstrip{display:flex!important;overflow-x:auto;gap:8px;padding:4px 2px 8px;scroll-snap-type:x mandatory;grid-template-columns:none!important}
.skstrip .skn{flex:0 0 96px;scroll-snap-align:start;position:relative;background:linear-gradient(#3a2448,#22142c)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 0 0 1px #c9a0e088!important;border-radius:12px}
.skstrip .skn.on{box-shadow:inset 0 0 0 2px #ffd25a,0 0 12px #ffb03a99!important;background:linear-gradient(#6a4a20,#3a2810)!important}
.skstrip .skn .klk{position:absolute;right:4px;top:4px;height:24px;z-index:2;filter:drop-shadow(0 2px 2px #000a)}.skstrip .skn.lk>img:first-child{filter:brightness(.55) saturate(.6)}
.skstrip .skn .kon{position:absolute;left:4px;top:4px;height:22px;z-index:2}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='skin')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen');if(el.querySelector('.skst'))return;const s=C.S(),cur=s.skin||'base',sk=D.SKINS.find(x=>x.k==cur)||D.SKINS[0],cards=el.querySelectorAll('.card');if(cards.length<3)return;
 const own=D.SKINS.filter(k=>k.k=='base'||k.cost==0||(s.skins||{})[k.k]).length;
 const d=document.createElement('div');d.className='skst';d.innerHTML=`<img class=kbg src="${A}bg_dressing_room.jpg"><div class=kspot></div><span class=kcnt><img src="${A}sk_hanger.png">보유 ${own}/${D.SKINS.length}</span><img class=kch src="${A}${sk.img}"><img class=kst src="${A}sk_star.png" style="left:110px;bottom:200px"><img class=kst src="${A}sk_star.png" style="right:105px;bottom:150px;animation-delay:.8s"><div class=knm><b>${sk.n}</b><small>착용 중 · 전투에 즉시 반영</small></div>`;
 cards[0].replaceWith(d);
 const lc=cards[cards.length-1],g=lc.querySelector('.skg');if(g){g.classList.add('skstrip');lc.insertAdjacentHTML('afterbegin','<div class=ttl>리나 코스튬 <small>탭하여 착용 · 구매</small></div>');
  g.querySelectorAll('[data-sk]').forEach(c=>{const k=c.dataset.sk,x=D.SKINS.find(q=>q.k==k)||{},o=k=='base'||x.cost==0||(s.skins||{})[k];if(!o){c.classList.add('lk');c.insertAdjacentHTML('beforeend',`<img class=klk src="${A}sk_lock.png">`)}if(k==cur)c.insertAdjacentHTML('beforeend',`<img class=kon src="${A}sk_star.png">`)});
  d.after(lc);
  const on=g.querySelector('.skn.on');if(on)g.scrollLeft=Math.max(0,on.offsetLeft-g.clientWidth/2+48)}}
})();
;(()=>{/* v147 설정 양피지 */
const st=document.createElement('style');st.textContent=`.stst{position:relative;height:170px;margin:-4px -4px -40px;border-radius:14px 14px 0 0;overflow:hidden;border:2px solid #0b0d0f;border-bottom:0}
.stst>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%}.stst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 40%,#2a1a0cee)}
.stst .sth{position:absolute;left:12px;top:10px;z-index:2;display:flex;align-items:center;gap:6px;font-weight:900;font-size:16px;color:#ffe8b0;text-shadow:0 2px 3px #000}.stst .sth img{height:30px;filter:drop-shadow(0 2px 2px #000)}
.stpaper .card{position:relative;z-index:1;background:linear-gradient(#f4e4c0,#e6cf9c)!important;color:#3a2410!important;border:2px solid #5a3a14!important;box-shadow:inset 0 0 0 2px #c9a060,inset 0 0 30px #a0703a66,0 6px 14px #000a!important;border-radius:10px 10px 14px 14px}
.stpaper .card .ttl{color:#6a2a0a!important;font-size:15px;border-bottom:1px dashed #8a5a2a88;padding-bottom:4px;display:flex;align-items:center;gap:6px}.stpaper .card .ttl img.sti{height:22px}
.stpaper .card b,.stpaper .card small{color:#3a2410!important;text-shadow:none!important}.stpaper .card small{opacity:.8}
.stpaper .card .row{border-bottom:1px solid #8a5a2a33}.stpaper .card .row img.sri,.stpaper .card img.sri{height:22px!important;width:auto!important;max-width:28px!important;margin-right:6px;flex:0 0 auto}.stpaper .card .row,.stpaper .card .row>div{background:#fff8e0aa!important;box-shadow:inset 0 0 0 1px #8a5a2a55!important;border-color:#8a5a2a55!important}.stpaper .card .row>div{background:none!important;box-shadow:none!important}.stpaper .card .row *:not(.pill):not(.pill *):not(.tog):not(.tog *){color:#3a2410!important}
.stpaper .tog{background:#8a6a4a!important;box-shadow:inset 0 2px 3px #0006!important}.stpaper .tog.on{background:linear-gradient(#7ad060,#3a9a2a)!important}
.stpaper>small{color:#ffe8b0!important}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='settings')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),c0=el.querySelector('.card');if(!c0||el.querySelector('.stst'))return;const body=c0.parentNode;body.classList.add('stpaper');
 const d=document.createElement('div');d.className='stst';d.innerHTML=`<img src="${A}bg_settings_study.jpg"><div class=sth><img src="${A}st_gear.png">마도사의 서재 · 설정</div>`;body.insertBefore(d,body.firstChild);
 body.querySelectorAll('.card>.ttl').forEach(t=>{if(!t.querySelector('.sti'))t.insertAdjacentHTML('afterbegin',`<img class=sti src="${A}st_gear.png">`)});
 const ic=(sel,img)=>body.querySelectorAll(sel).forEach(x=>{const row=x.closest('.row');if(row&&!row.querySelector('.sri'))row.insertAdjacentHTML('afterbegin',`<img class=sri src="${A}${img}">`)});
 ic('[data-set=bgm],[data-set=sfx]','st_sound.png');const nt=body.querySelector('#ntRow');if(nt&&!nt.querySelector('.sri'))nt.insertAdjacentHTML('afterbegin',`<img class=sri src="${A}st_bell.png">`);
 body.querySelectorAll('.row').forEach(r=>{if(/알림|푸시/.test(r.textContent)&&!r.querySelector('.sri'))r.insertAdjacentHTML('afterbegin',`<img class=sri src="${A}st_bell.png">`)})}
})();
;(()=>{/* v148 마도 패스 사다리 */
const st=document.createElement('style');st.textContent=`.pld{position:relative;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;margin:6px -4px 8px;background:url(assets/bg_pass_road.jpg) 60% 0/auto 100% no-repeat,#8ac8ff}
.pld:before{content:'';position:absolute;inset:0;background:linear-gradient(#ffffff22,#0a2a5a55)}
.plh{position:sticky;top:0;z-index:4;display:grid;grid-template-columns:1fr 54px 1fr;gap:6px;padding:6px 8px;background:linear-gradient(#1a2a5af2,#0e1838f2);color:#fff;font-weight:900;font-size:12px;text-align:center;align-items:center}
.plh span{display:flex;align-items:center;justify-content:center;gap:4px}.plh img{height:22px}
.pll{position:relative;max-height:520px;overflow-y:auto;padding:6px 8px 10px}
.pll:before{content:'';position:absolute;left:50%;top:0;bottom:0;width:8px;margin-left:-4px;background:linear-gradient(90deg,#c9a25a,#ffe8a0,#c9a25a);box-shadow:0 0 6px #0006}
.plr{position:relative;display:grid;grid-template-columns:1fr 54px 1fr;gap:6px;align-items:center;margin:6px 0}
.pln{width:42px;height:42px;margin:auto;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:15px;color:#fff;background:radial-gradient(#5a6a8a,#2a3450);border:3px solid #0b0d0f;box-shadow:0 0 0 2px #8a9ab8;z-index:1;position:relative}
.plr.ok .pln{background:radial-gradient(#ffe08a,#c08a20);color:#4a2a00;box-shadow:0 0 0 2px #fff6}
.plr.cur .pln{width:50px;height:50px;font-size:18px;background:radial-gradient(#fff6c0,#ffb030);color:#5a2a00;box-shadow:0 0 0 3px #fff,0 0 18px #ffd040;animation:plp 1.3s infinite}@keyframes plp{50%{box-shadow:0 0 0 3px #fff,0 0 30px #ffe060}}
.plr.cur:after{content:'현재';position:absolute;left:50%;top:-8px;transform:translateX(-50%);font-size:9px;font-weight:900;background:#ff5a3a;color:#fff;border-radius:6px;padding:0 5px;z-index:2}
.plc{position:relative;min-height:46px;display:flex;align-items:center;justify-content:center;gap:3px;flex-wrap:wrap;font-size:11px;font-weight:800;color:#fff;border-radius:10px;padding:4px;border:2px solid #0b0d0f;background:linear-gradient(#3a4a6aee,#222c44ee);box-shadow:inset 0 0 0 1px #9ab0d888;text-shadow:0 1px 2px #000}
.plc .ci{height:18px}.plc.p{background:linear-gradient(#6a4a18ee,#3a280cee);box-shadow:inset 0 0 0 1px #ffd77a99}
.plc.lockp{filter:saturate(.4) brightness(.75)}.plc.lockp:before{content:'';position:absolute;right:2px;top:1px;width:12px;height:12px;background:url(assets/sk_lock.png) center/contain no-repeat;filter:drop-shadow(0 1px 1px #000a)}
.plc.can:after{content:'받기';position:absolute;left:4px;top:-7px;font-size:9px;font-weight:900;background:#2fbf3a;color:#fff;border-radius:6px;padding:0 5px;border:1px solid #0b0d0f}.plc.p.can:after{background:#e0a020}.plc.can{background:linear-gradient(#3a8a4aee,#1e5a2aee)!important;cursor:pointer;box-shadow:inset 0 0 0 2px #fff,0 0 14px #7fffa0!important;animation:plg 1s ease-in-out infinite}.plc.p.can{background:linear-gradient(#c08a20ee,#7a5210ee)!important;box-shadow:inset 0 0 0 2px #fff,0 0 14px #ffd040!important}@keyframes plg{50%{transform:scale(1.04);filter:brightness(1.2)}}
.plc.got{filter:brightness(.7)}.plc .pck{position:absolute;right:-6px;top:-8px;height:26px;filter:drop-shadow(0 2px 2px #000a)}
.plr .pbd{position:absolute;left:-4px;top:-6px;height:20px}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='pass')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),g=el.querySelector('.bpg');if(!g||el.querySelector('.pld'))return;const T=C.bpTier(),card=g.closest('.card');
 const cells=[...g.querySelectorAll('.bpc')],n=cells.length/2;let h='';
 for(let t=0;t<n;t++){const f=cells[t*2],p=cells[t*2+1],cl=(c,pp)=>`<div class="plc ${pp?'p':''} ${c.classList.contains('can')?'can':''} ${c.classList.contains('got')?'got':''} ${c.classList.contains('lockp')?'lockp':''}" data-px="${t*2+pp}">${c.innerHTML.replace(/ ?<img class="emi e_pass_check"[^>]*>/,'')}${c.classList.contains('got')?`<img class=pck src="${A}pass_check.png">`:''}</div>`;
  h+=`<div class="plr ${t<T?'ok':''} ${t==T||(T>=n&&t==n-1)?'cur':''}">${cl(f,0)}<div class=pln>${t+1}</div>${cl(p,1)}</div>`}
 const d=document.createElement('div');d.className='pld';d.innerHTML=`<div class=plh><span><img src="${A}pass_free.png">무료</span><span>단계</span><span><img src="${A}pass_premium.png">프리미엄</span></div><div class=pll>${h}</div>`;
 card.style.display='none';card.parentNode.insertBefore(d,card);
 d.querySelectorAll('.plc.can').forEach(x=>x.onclick=()=>{const c=cells[+x.dataset.px];if(c)c.click()});
 const L=d.querySelector('.pll'),cu=d.querySelector('.plr.cur');if(cu)requestAnimationFrame(()=>{L.scrollTop=Math.max(0,cu.offsetTop-L.clientHeight/2+30)})}
})();
;(()=>{/* v149 친구 선술집 */
const st=document.createElement('style');st.textContent=`.frst{position:relative;height:200px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f}
.frst>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:45% 60%}.frst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 50%,#1a0e06e0)}
.frst .ftp{position:absolute;left:12px;bottom:10px;z-index:2;display:flex;align-items:center;gap:8px;color:#fff}.frst .ftp img{height:40px;filter:drop-shadow(0 2px 3px #000)}.frst .ftp b{font-size:20px;color:#ffd0e0;text-shadow:0 2px 0 #000}.frst .ftp small{display:block;font-size:10px;font-weight:800;color:#ffe8c0}
.frst .fcnt{position:absolute;right:10px;top:10px;z-index:2;background:#000a;border:1px solid #ffd77a77;border-radius:10px;padding:3px 9px;font-size:11px;font-weight:800;color:#fff}
.frtv .frh{display:none}.frtv .frb{display:flex;gap:8px;background:none!important;box-shadow:none!important;border:0!important;padding:0!important}.frtv .frb .pill{flex:1;display:flex;align-items:center;justify-content:center;gap:4px}.frtv .frb .pill img{height:20px}
.frtv .frr{position:relative;gap:8px!important;padding:6px 8px!important;margin:6px 0;border-radius:12px;background:linear-gradient(#5a3a1e,#3a2410)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 0 0 1px #d0a060aa,0 3px 6px #0007!important}
.frtv .frr>img:first-child{width:52px!important;height:52px!important;object-fit:contain;background:radial-gradient(#ffe8b0,#b07838);border-radius:50%;border:2px solid #0b0d0f;box-shadow:0 0 0 2px #e0b060}
.frtv .frr .flv{position:absolute;left:44px;top:42px;background:#2a1a08;border:1px solid #e0b060;border-radius:7px;font-size:9px;font-weight:900;color:#ffe08a;padding:0 4px}
.frtv .frr .f b{color:#fff3d8}.frtv .frr .f small{color:#ffe0b0}
.frtv .frx{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:0!important;background:linear-gradient(#7a5a3a,#4a3018);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #e0b06088;position:relative}
.frtv .frx img{height:28px!important;width:auto!important;max-width:34px;border-radius:0!important;background:none!important;border:0!important;box-shadow:none!important;object-fit:contain!important}.frtv .frx.frv{background:linear-gradient(#5aa0e0,#2a5a9a)}.frtv .frx.frv img{height:32px;filter:drop-shadow(0 1px 1px #000)}.frtv .frx.off{filter:grayscale(.8) brightness(.7)}.frtv .frx.on{box-shadow:inset 0 0 0 2px #fff,0 0 12px #ffb0d0;animation:fxg 1s ease-in-out infinite}@keyframes fxg{50%{transform:scale(1.08)}}
.frtv .frx .fok{position:absolute;right:-4px;bottom:-4px;font-size:11px;background:#2fbf3a;color:#fff;border-radius:50%;width:16px;height:16px;display:grid;place-items:center;border:1px solid #0b0d0f}`;document.head.appendChild(st);
const deco=()=>{const el=$('#screen');if(G.screen!='friend'||el.querySelector('.frst'))return;const h=el.querySelector('.frh'),body=h&&h.parentNode;if(!body)return;body.classList.add('frtv');
 const pt=(h.querySelector('b')||{}).textContent||'',rows=el.querySelectorAll('.frr');
 const d=document.createElement('div');d.className='frst';d.innerHTML=`<img src="${A}bg_friend_tavern.jpg"><span class=fcnt>친구 ${rows.length}/30</span><div class=ftp><img src="${A}fr_heart_send.png"><div><small>모험가의 선술집</small><b>${pt.replace('우정 포인트','<img class="emi e_bd_heart_full" src=assets/bd_heart_full.png alt="">')}</b></div></div>`;body.insertBefore(d,h);
 const sa=el.querySelector('#frSA'),ga=el.querySelector('#frGA');if(sa)sa.innerHTML=`<img src="${A}fr_heart_send.png">모두 보내기`;if(ga)ga.innerHTML=`<img src="${A}fr_gift.png">모두 받기`;
 rows.forEach(r=>{const sm=r.querySelector('.f small'),lv=(sm&&sm.textContent.match(/Lv\.\d+/)||[''])[0];if(lv)r.insertAdjacentHTML('beforeend',`<i class=flv>${lv}</i>`);
  const s=r.querySelector('[data-s]'),g=r.querySelector('[data-g]');
  if(s){const done=s.classList.contains('off');s.innerHTML=`<img src="${A}fr_heart_send.png">${done?'<i class=fok><img class="emi e_pass_check" src=assets/pass_check.png alt=""></i>':''}`;if(!done)s.classList.add('on')}
  if(g){const can=g.classList.contains('on'),got=!!g.querySelector('.e_pass_check');g.innerHTML=`<img src="${A}fr_gift.png">${got?'<i class=fok><img class="emi e_pass_check" src=assets/pass_check.png alt=""></i>':''}`}
  const nm=(r.querySelector('.f b')||{}).textContent||'',v=document.createElement('span');v.className='frx frv';v.innerHTML=`<img src="${A}fr_visit.png">`;v.onclick=()=>toast(`${nm}의 영지 방문 · ${sm?sm.textContent:''}`);r.appendChild(v)})};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{deco()}catch(e){console.warn(e)}return r};
new MutationObserver(()=>{try{deco()}catch(e){}}).observe(document.querySelector('#screen')||document.body,{childList:true,subtree:false});
})();
;(()=>{/* v150 우정 상점 노점 */
const st=document.createElement('style');st.textContent=`.fsst{position:relative;height:150px;margin:-4px -4px 6px;border-radius:12px;overflow:hidden;border:2px solid #0b0d0f}
.fsst>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%}.fsst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 45%,#2a1606e8)}
.fsst .fsn{position:absolute;left:10px;bottom:8px;z-index:2;font-size:17px;font-weight:900;color:#fff3d0;text-shadow:0 2px 0 #000}
.fsst .fstm{position:absolute;right:8px;bottom:8px;z-index:2;display:flex;align-items:center;gap:3px;background:#000b;border:1px solid #ffd77a88;border-radius:10px;padding:2px 8px 2px 3px;font-size:11px;font-weight:900;color:#bfe0ff}.fsst .fstm img{height:22px}
.fsct .ttl{display:none}.fsct .frs{display:grid!important;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px 6px;border-radius:10px;background:linear-gradient(#8a5a2e,#5a361a);border:2px solid #0b0d0f;box-shadow:inset 0 2px 0 #d8a868,inset 0 -3px 0 #3a2008}
.fsct .frsi{position:relative;display:flex!important;flex-direction:column;align-items:center;padding:6px 2px 4px!important;border-radius:9px!important;background:linear-gradient(#fff3d8,#e8c890)!important;border:2px solid #4a2a10!important;box-shadow:0 3px 0 #2a1606!important;color:#3a2008!important}
.fsct .frsi>img{height:40px!important;width:auto!important;filter:drop-shadow(0 2px 2px #0006)}.fsct .frsi b{font-size:10px;color:#3a2008!important;text-align:center;line-height:1.15;min-height:24px}
.fsct .frsi small{display:none}.fsct .fsp{display:flex;align-items:center;gap:2px;margin-top:2px;background:#3a2008;border-radius:8px;padding:1px 6px 1px 2px;font-size:11px;font-weight:900;color:#ffd0e0}.fsct .fsp img{height:15px}
.fsct .fsl{font-size:9px;font-weight:800;color:#7a4a20;margin-top:1px}.fsct .frsi.off{opacity:1!important;filter:none!important}.fsct .frsi.poor .fsp{color:#ff8a8a}
.fsct .frsi.sold>*:not(.fss){filter:grayscale(1) brightness(.75)}.fsct .fss{position:absolute;left:50%;top:2px;width:50px;transform:translateX(-50%) rotate(-14deg);filter:drop-shadow(0 2px 2px #000a);pointer-events:none}.fsct .frsi.poor{filter:saturate(.5) brightness(.8)!important}.fsct .fsso{font-style:normal;background:#c0201a;color:#fff;font-size:10px;font-weight:900;padding:0 6px;border-radius:4px;border:1px solid #fff8}`;document.head.appendChild(st);
const left=()=>{const n=new Date(),t=new Date(n);t.setHours(5,0,0,0);if(t<=n)t.setDate(t.getDate()+1);const s=Math.floor((t-n)/1000),p=x=>String(x).padStart(2,'0');return `${p(Math.floor(s/3600))}:${p(Math.floor(s/60)%60)}:${p(s%60)}`};
const deco=()=>{const el=$('#screen');if(G.screen!='friend')return;const fs=el.querySelector('.frs'),card=fs&&fs.closest('.card');if(!card||card.querySelector('.fsst'))return;card.classList.add('fsct');
 const d=document.createElement('div');d.className='fsst';d.innerHTML=`<img src="${A}bg_friend_shop.jpg"><span class=fsn>우정 상점</span><span class=fstm><img src="${A}fs_refresh.png"><i id=fsTm>${left()}</i></span>`;card.insertBefore(d,card.firstChild);
 fs.querySelectorAll('.frsi').forEach(it=>{const m=(it.querySelector('small')||{}).textContent.match(/(\d+)\s*·\s*(\d+)\/(\d+)/);if(!m)return;const c=+m[1],b=+m[2],l=+m[3],sold=b>=l;
  it.insertAdjacentHTML('beforeend',`<span class=fsp><img src="${A}fs_coin.png">${c}</span><span class=fsl>${sold?'<em class=fsso>품절</em>':b+'/'+l}</span>${sold?`<img class=fss src="${A}fs_soldout.png">`:''}`);it.classList.add(sold?'sold':it.classList.contains('off')?'poor':'ok')})};
setInterval(()=>{const t=document.getElementById('fsTm');if(t)t.textContent=left()},1000);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{deco()}catch(e){console.warn(e)}return r};
new MutationObserver(()=>{try{deco()}catch(e){}}).observe(document.querySelector('#screen')||document.body,{childList:true,subtree:false});
})();
;(()=>{/* v151 우편함 우체국 */
const st=document.createElement('style');st.textContent=`.mlst{position:relative;height:190px;margin:-4px -4px 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f}
.mlst>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:40% 50%}.mlst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 45%,#1e1206e8)}
.mlst .mln{position:absolute;left:12px;bottom:10px;z-index:2;display:flex;align-items:center;gap:8px;color:#fff}.mlst .mln img{height:42px;filter:drop-shadow(0 2px 3px #000)}.mlst .mln b{font-size:18px;color:#fff3d0;text-shadow:0 2px 0 #000;display:block}.mlst .mln small{font-size:11px;font-weight:800;color:#ffe0a8}
.mlst .mlc{position:absolute;right:10px;top:10px;z-index:2;background:#c0201a;border:1px solid #fff8;border-radius:10px;padding:2px 9px;font-size:11px;font-weight:900;color:#fff}
.mail3 .card>.ttl{display:none}.mail3 .mgg{display:flex!important;flex-direction:column;gap:7px}
.mail3 .mgc{position:relative;display:flex!important;flex-direction:row!important;align-items:center;gap:9px;text-align:left!important;padding:7px 9px!important;min-height:0!important;border-radius:12px!important;background:linear-gradient(#fff4dc,#ecd2a0)!important;border:2px solid #4a2a10!important;box-shadow:0 3px 0 #2a1606,inset 0 0 0 1px #fff8!important;color:#3a2008}
.mail3 .mgc .mgb{width:50px!important;height:auto!important;margin:0!important;filter:drop-shadow(0 2px 2px #0006)}
.mail3 .mgc .mlm{flex:1;min-width:0}.mail3 .mgc .mlm>b{display:block;font-size:13px;color:#3a2008!important}
.mail3 .mgc .mgr{display:flex!important;align-items:center;gap:5px;margin-top:3px;justify-content:flex-start!important}.mail3 .mgc .mgr span{display:flex;align-items:center;gap:2px;background:#3a2008;color:#fff;border-radius:7px;padding:0 5px 0 2px;font-size:11px;font-weight:900}.mail3 .mgc .mgr span img{height:16px}.mail3 .mgc .mgr .mlp{height:22px;margin-right:1px}
.mail3 .mgc .mlx{position:absolute;right:8px;top:5px;font-size:9px;font-weight:900;color:#fff;background:#a8521a;border-radius:6px;padding:0 5px}
.mail3 .mgc>.pill,.mail3 .mgc>small{margin:14px 0 0!important;flex:0 0 auto!important;width:auto!important;min-width:0!important;position:static!important}.mail3 .mgc>.pill{padding:6px 14px!important;font-size:13px!important}.mail3 .mgc .mlm{flex:1 1 auto!important;width:auto!important}.mail3 .mgc>small{color:#6a4a2a!important;font-weight:800}
.mail3 .mgc .mlx.soon{background:#c0201a;animation:fxg 1s infinite}.mail3 .mlempty{display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px;color:#ffe8c0}.mail3 .mlempty img{height:60px;opacity:.8}.mail3 .mgc.got{background:linear-gradient(#d8cdb8,#b8a888)!important}.mail3 .mgc.got .mgr,.mail3 .mgc.got .mlx{filter:grayscale(1);opacity:.6}
.mail3 #mailAll{display:flex!important;flex-direction:row!important;align-items:center;justify-content:center;gap:6px;background:linear-gradient(#ffcf5a,#e08a1a)!important;color:#3a1a00!important;border:2px solid #0b0d0f!important}.mail3 #mailAll img{height:24px}`;document.head.appendChild(st);
const deco=()=>{const sb=$('#screen');if(G.screen!='mail')return;const g=sb.querySelector('.mgg');if(!g||g.dataset.ml)return;g.dataset.ml=1;const card=g.closest('.card');card.parentNode.classList.add('mail3');
 const all=[...g.querySelectorAll('.mgc')];C.mailStamp();if(!all.length){const ma0=sb.querySelector('#mailAll');if(ma0)ma0.style.setProperty('display','none','important')}const un=all.filter(m=>!m.classList.contains('got')).length;
 if(!sb.querySelector('.mlst')){const d=document.createElement('div');d.className='mlst';card.parentNode.insertBefore(d,card)}
 sb.querySelector('.mlst').innerHTML=`<img src="${A}bg_mail_post.jpg">${un?`<span class=mlc>새 우편 ${un}</span>`:''}<div class=mln><img src="${A}${un?'ml_letter':'ml_open'}.png"><div><b>마도 우체국</b><small>보관 기한 7일 · ${all.length?(un?`미수령 ${un}통 · `:'')+`보관 ${all.length}통`:'받은 우편 없음'}</small></div></div>`;
 all.forEach(m=>{const got=m.classList.contains('got'),b=m.querySelector(':scope>b'),r=m.querySelector('.mgr'),im=m.querySelector('.mgb');if(im)im.src=`${A}${got?'ml_open':'ml_letter'}.png`;
  const w=document.createElement('div');w.className='mlm';if(b)w.appendChild(b);if(r){r.insertAdjacentHTML('afterbegin',`<img class=mlp src="${A}ml_parcel.png">`);w.appendChild(r)}im.after(w);const ms=C.mailLeft(m.dataset.mk),dd=Math.floor(ms/864e5),hh=Math.floor(ms/36e5)%24,mm=Math.max(1,Math.floor(ms/6e4)%60),tx=dd?`${dd}일 ${hh}시간 남음`:hh?`${hh}시간 ${mm}분 남음`:`${mm}분 남음`;m.insertAdjacentHTML('beforeend',`<i class="mlx ${!got&&ms<864e5?'soon':''}">${got?'수령함 · ':''}${tx}</i>`)});
 const ma=sb.querySelector('#mailAll');if(ma)ma.innerHTML=`<img src="${A}ml_parcel.png">모두 받기${un?` (${un})`:''}`};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{deco()}catch(e){console.warn(e)}return r};
})();
;(()=>{/* v152 상점 상인 길드 홀 (패키지 진열장 · 가격 리본 · BEST · 실제 한도만 LIMITED) */
const st=document.createElement('style');st.textContent=`.shpk{padding:0!important;overflow:hidden;background:#1a0e14!important;border:2px solid #c9953f!important;box-shadow:0 0 0 2px #0b0d0f,0 4px 10px #0008!important}
.shpk>.ttl,.shpk>.row{display:none!important}.shpk .pkst{position:relative;height:150px}.shpk .pkst>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%}.shpk .pkst:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 40%,#1a0e14)}
.shpk .pkt{position:absolute;left:10px;bottom:8px;z-index:2;display:flex;align-items:center;gap:6px}.shpk .pkt img{height:50px;filter:drop-shadow(0 2px 3px #000)}.shpk .pkt b{font-size:18px;color:#ffe08a;text-shadow:0 2px 0 #000;display:block}.shpk .pkt small{font-size:10px;color:#ffd0c0;font-weight:800}
.shpk .pkl{display:flex;flex-direction:column;gap:12px;padding:16px 10px 12px}
.shpk .pkc{position:relative;display:flex;align-items:center;gap:10px;padding:8px 10px 8px 8px;border-radius:12px;background:linear-gradient(#3a1a22,#24101a);border:2px solid #c9953f;box-shadow:inset 0 0 0 1px #ffe08a55,0 3px 0 #0b0d0f}
.shpk .pkc.best{border-color:#ffd95a;box-shadow:inset 0 0 0 1px #fff8,0 0 14px #ffc84a88,0 3px 0 #0b0d0f}
.shpk .pkv{position:relative;flex:none;width:82px;height:78px;border-radius:8px;background:linear-gradient(160deg,#ffffff38,#ffffff08 45%,#ffffff20);border:2px solid #d8b060;box-shadow:inset 0 0 8px #bfe0ff55}
.shpk .pkv:after{content:'';position:absolute;left:6px;right:6px;bottom:5px;height:20px;border-radius:50%;background:radial-gradient(#d0283a,#7a0c18);box-shadow:0 2px 3px #0008}
.shpk .pkv img{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);height:56px;z-index:2;filter:drop-shadow(0 3px 3px #000a)}
.shpk .pkm{flex:1;min-width:0}.shpk .pkm b{display:block;font-size:14px;color:#fff3d8}.shpk .pkm small{display:block;font-size:11px;color:#ffd8a8;margin-top:2px}
.shpk .pkr{position:relative;flex:none;min-width:84px;padding:7px 10px 7px 14px;font-size:13px;font-weight:900;color:#fff;text-align:center;background:linear-gradient(#e8423a,#a01818);clip-path:polygon(10px 0,100% 0,100% 100%,10px 100%,0 50%);text-shadow:0 1px 0 #000;cursor:pointer}
.shpk .pkb{position:absolute;left:-8px;top:-16px;width:58px;z-index:3;filter:drop-shadow(0 2px 3px #000a);pointer-events:none}.shpk .pkbt{position:absolute;left:4px;top:4px;z-index:4;font-size:9px;font-weight:900;color:#5a2a00;pointer-events:none}
.shpk .pkn{text-align:center;font-size:10px;color:#ffb0a0;padding:0 0 10px}
.shlm{position:absolute;right:-4px;top:-6px;z-index:3;display:flex;align-items:center}.shlm img{height:34px;filter:drop-shadow(0 2px 2px #000a)}.shlm i{position:absolute;right:30px;top:8px;white-space:nowrap;background:#a01818;color:#fff;font-style:normal;font-size:9px;font-weight:900;padding:1px 5px;border-radius:5px;border:1px solid #fff6}`;document.head.appendChild(st);
const deco=()=>{if(G.screen!='shop')return;const sb=document.querySelector('#screen .sbody');if(!sb)return;const b0=sb.querySelector('[data-pkg]'),card=b0&&b0.closest('.card');
 if(card&&!card.classList.contains('shpk')){card.classList.add('shpk');const rows=[...card.querySelectorAll(':scope>.row')];
  const w=document.createElement('div');w.innerHTML=`<div class=pkst><img src="${A}bg_shop_hall.jpg"><div class=pkt><img src="${A}sh_chest.png"><div><b>패키지 · 상인 길드</b><small>${(card.querySelector('.notice')||{}).textContent||''}</small></div></div></div><div class=pkl>${rows.map((r,i)=>{const im=r.querySelector('img'),bt=r.querySelector('[data-pkg]');return `<div class="pkc ${i==0?'best':''}">${i==0?`<img class=pkb src="${A}sh_best.png">`:''}<div class=pkv><img src="${im.getAttribute('src')}"></div><div class=pkm><b>${r.querySelector('.f b').textContent}</b><small>${r.querySelector('.f small').innerHTML}</small></div><span class=pkr data-pk2=${bt.dataset.pkg}>${bt.textContent}</span></div>`}).join('')}</div>`;
  while(w.firstChild)card.appendChild(w.firstChild);card.querySelectorAll('[data-pk2]').forEach(x=>x.onclick=()=>card.querySelector(`[data-pkg="${x.dataset.pk2}"]`).click())}
 sb.querySelectorAll('[data-b]').forEach(bt=>{const c=bt.closest('.card');if(!c||c.querySelector('.shlm'))return;const m=(c.querySelector('b small')||{}).textContent;const mm=m&&m.match(/(\d+)\/(\d+)/);if(!mm)return;c.style.position='relative';c.insertAdjacentHTML('beforeend',`<span class=shlm><i>일일 한정 ${mm[1]}/${mm[2]}</i><img src="${A}sh_limited.png"></span>`)})};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{deco()}catch(e){console.warn(e)}return r};
})();
;(()=>{/* v153 소환 제단 (마법진 스테이지 · 실제 확률 보석 · 실제 천장 크리스탈 바 · 석판 버튼) */
const st=document.createElement('style');st.textContent=`.smal .sumban{position:relative;background:url(assets/bg_summon_altar.jpg) 50% 88%/cover!important;overflow:hidden;border:2px solid #0b0d0f!important;box-shadow:0 0 0 2px #b890ff88,0 0 18px #8a5aff66!important}
.smal .sumban img.smc{position:absolute;left:50%;bottom:-135px;width:300px;height:auto;transform:translateX(-50%);opacity:1;filter:brightness(2.2) saturate(1.3) drop-shadow(0 0 14px #e0c0ff);mix-blend-mode:screen;bottom:-125px!important;animation:smsp 9s linear infinite;z-index:1;pointer-events:none}
@keyframes smsp{from{transform:translateX(-50%) perspective(400px) rotateX(70deg) rotate(0)}to{transform:translateX(-50%) perspective(400px) rotateX(70deg) rotate(360deg)}}
.smal .sumban>img{z-index:2;filter:drop-shadow(0 0 10px #d8b8ffaa)}.smal .sumban .bt{z-index:3}
.smal .smr{display:flex;gap:6px;margin:2px 0 8px}.smal .smr>div{flex:1;display:flex;align-items:center;gap:4px;padding:4px 6px;border-radius:10px;background:linear-gradient(#2a1a4a,#160c2a);border:1px solid #8a6ad0}.smal .smr img{height:30px}.smal .smr b{display:block;font-size:15px;color:#fff}.smal .smr small{display:block;font-size:10px;font-weight:800}
.smal .card .ttl small{display:none}.smal .spity{display:none!important}
.smal .smp{display:flex;align-items:center;gap:6px;margin:8px 2px 4px}.smal .smp .bar{flex:1;position:relative;height:16px;border-radius:9px;background:#140a26;border:2px solid #0b0d0f;box-shadow:0 0 0 1px #b890ff88;overflow:hidden}
.smal .smp .bar i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#7a4aff,#d8a0ff,#fff3a0);box-shadow:0 0 10px #d8a0ff}.smal .smp .bar span{position:absolute;inset:0;text-align:center;font-size:10px;font-weight:900;line-height:12px;color:#fff;text-shadow:0 0 3px #000,0 1px 0 #000,0 0 2px #000}
.smal .smp>img{height:34px;filter:drop-shadow(0 0 6px #ffd27a)}.smal .smp>b{font-size:11px;color:#ffe8a0;white-space:nowrap}
.smal .sumbtns .pill{position:relative;display:flex!important;flex-direction:column;align-items:center;justify-content:center;padding:10px 6px 8px 40px!important;border-radius:8px 8px 14px 14px!important;background:linear-gradient(#8a8aa0,#4a4a64)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 2px 0 #d0d0e8,inset 0 -4px 0 #2a2a3a,0 0 12px #9a7aff88!important;color:#fff!important;text-shadow:0 2px 0 #000}
.smal .sumbtns .pill.red{background:linear-gradient(#a07ad8,#5a3a9a)!important;box-shadow:inset 0 2px 0 #e8d0ff,inset 0 -4px 0 #2a1a4a,0 0 16px #c89aff!important}
.smal .sumbtns .pill>img.smt{position:absolute;left:6px;top:50%;transform:translateY(-50%);height:42px;filter:drop-shadow(0 2px 2px #000a)}`;document.head.appendChild(st);
const deco=()=>{if(G.screen!='summon')return;const sc=$('#screen'),bn=sc.querySelector('.sumban');if(!bn||sc.querySelector('.smr'))return;const C=G.C,s=C.S(),D=C.D;sc.querySelector('.sbody')?.classList.add('smal');
 bn.insertAdjacentHTML('afterbegin',`<img class=smc src="${A}sm_circle.png">`);const card=bn.nextElementSibling,tt=card&&card.querySelector('.ttl');
 if(tt)tt.insertAdjacentHTML('afterend',`<div class=smr>${[4,3,2].map((g,i)=>`<div><img src="${A}sm_crystal.png" style="filter:hue-rotate(${[0,250,170][i]}deg) saturate(${g==4?1.3:.9})"><div><b>${C.GW[g]}%</b><small style="color:${D.RAR[g].c}">${D.RAR[g].n}</small></div></div>`).join('')}</div>`);
 if(C.PITY){const p=s.pity||0,sp=sc.querySelector('.spity');(sp||card).insertAdjacentHTML(sp?'beforebegin':'beforeend',`<div class=smp><div class=bar><i style="width:${Math.min(100,p/C.PITY*100)}%"></i></div><img src="${A}sm_crystal.png"><b>${p}/${C.PITY} · 확정까지 ${C.PITY-p}회</b></div>`)}
 ['#su1','#su10'].forEach(id=>{const b=sc.querySelector(id);if(b)b.insertAdjacentHTML('afterbegin',`<img class=smt src="${A}${id=='#su1'?'sm_scroll':'sm_circle'}.png">`)})};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{deco()}catch(e){console.warn(e)}return r};
})();
;(()=>{/* v155 소환 결과 제단 (sr_back 카드 뒤집기 · 전설 sr_burst · 실제 신규만 NEW 방패 · 전부 열기) */
const st=document.createElement('style');st.textContent=`#sumModal.srm>.card{background:url(assets/bg_summon_result.jpg) 50% 70%/cover!important;border:2px solid #c9a6ff!important;box-shadow:0 0 0 2px #0b0d0f,0 0 24px #9a6aff99!important;padding-bottom:14px!important}
#sumModal.srm .ttl{color:#fff3d0;text-shadow:0 2px 0 #000,0 0 10px #c8a0ff}
#sumModal.srm .srg{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;perspective:600px;padding:4px 0}
.srm .srf{position:relative;width:68px;transform-style:preserve-3d}.srm .srf.one{width:150px}
.srm .sumcard{animation:none!important;width:100%!important;box-sizing:border-box;backface-visibility:hidden;transform:rotateY(180deg);transition:transform .45s ease;background:radial-gradient(circle at 50% 35%,color-mix(in srgb,var(--rc) 55%,#000),#120a20)!important;border:3px solid var(--rc)!important;box-shadow:inset 0 0 0 1px #fff6,0 0 12px var(--rc)!important}
.srm .sumcard::before,.srm .sumcard::after{display:none!important}
.srm .srbk{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;backface-visibility:hidden;transition:transform .45s ease;filter:drop-shadow(0 3px 4px #000a);z-index:2}
.srm .srf.open .srbk{transform:rotateY(-180deg)}.srm .srf.open .sumcard{transform:rotateY(0)}
.srm .srbu{position:absolute;left:50%;top:50%;width:260%;max-width:none;transform:translate(-50%,-50%) scale(0);opacity:0;pointer-events:none;z-index:0;mix-blend-mode:screen}.srm .srf.leg{z-index:3}.srm .srf>.sumcard{position:relative;z-index:1}.srm .srf.one .srbu{width:150%}
.srm .srf.leg.open .srbu{animation:srbu 1.1s ease-out forwards}@keyframes srbu{0%{transform:translate(-50%,-50%) scale(.2) rotate(0);opacity:0}30%{opacity:1}100%{transform:translate(-50%,-50%) scale(1) rotate(25deg);opacity:1}}
.srm .srf.leg.open .sumcard{box-shadow:0 0 18px #ffd86a,0 0 34px #ffb02a!important}
.srm .srnw{position:absolute;right:-9px;top:-10px;z-index:4;width:30px;height:32px;display:grid;place-items:center;opacity:0;transform:scale(.3);transition:.3s .35s}.srm .srnw img{position:absolute;inset:0;width:100%;height:100%}.srm .srnw b{position:relative;margin-top:-3px;font:italic 900 8px Maplestory,sans-serif;color:#fff;text-shadow:0 1px 0 #600}
.srm .srf.open .srnw{opacity:1;transform:scale(1)}
/* r329: 10-pull as a balanced 5x2 grid (화룡전 style), no lone tenth card */
#sumModal.srm .srg.ten{display:grid;grid-template-columns:repeat(5,56px);justify-content:center;gap:10px 6px}
.srm .srg.ten .srf{width:56px}.srm .srg.ten .sumcard{padding:2px 1px}.srm .srg.ten .sumcard img{height:54px!important;max-width:100%;object-fit:contain}
.srm .srg.ten .sumcard b{font-size:10px;white-space:nowrap}.srm .srg.ten .sumcard small{font-size:9px;white-space:nowrap}
.srm .srf.hg399::after{content:'';position:absolute;inset:-6px;border-radius:12px;border:3px solid #fff;box-shadow:0 0 14px var(--gw,#fff),inset 0 0 10px var(--gw,#fff);pointer-events:none;z-index:4;animation:hg399 .55s .28s ease-out both}@keyframes hg399{0%{opacity:0;transform:scale(.7)}35%{opacity:1;transform:scale(1.06)}100%{opacity:0;transform:scale(1.22)}}
body:is(.nofx,.tglite) .srm .srf.hg399::after{display:none}
.srm .srall{display:block;margin:10px auto 0;width:60%;text-align:center;padding:8px;border-radius:10px;font-weight:900;color:#3a1a00;background:linear-gradient(#ffe08a,#e0a020);border:2px solid #0b0d0f;box-shadow:0 3px 0 #5a3a00;cursor:pointer}`;document.head.appendChild(st);
const os=summon;summon=function(n){os(n);const got=G._sumGot,m=document.getElementById('sumModal');if(!got||!m||m.classList.contains('srm'))return;m.classList.add('srm');
 const cards=[...m.querySelectorAll('.sumcard')],wrap=cards[0]&&cards[0].parentNode;if(!wrap)return;wrap.className='srg'+(cards.length==10?' ten':'');wrap.removeAttribute('style');
 const fs=cards.map((c,i)=>{const k=got[i],cp=D.COMPS.find(x=>x.k==k),f=document.createElement('div');f.className='srf'+(cards.length==1?' one':'')+(cp&&cp.g>=4?' leg':'');c.before(f);
  if(cp&&cp.g>=4)f.insertAdjacentHTML('beforeend',`<img class=srbu src="${A}sr_burst.png">`);f.appendChild(c);f.insertAdjacentHTML('beforeend',`<img class=srbk src="${A}sr_back.png">`);
  const nw=[...c.querySelectorAll('.snew')].find(e=>e.textContent.trim()=='NEW');if(nw){nw.remove();f.insertAdjacentHTML('beforeend',`<span class=srnw><img src="${A}sr_new.png"><b>NEW</b></span>`)}return f});
 const card=m.querySelector('.card'),ok=card.querySelector('.btn.wide'),b=document.createElement('span');b.className='srall';b.textContent='전부 열기';ok.before(b);
 let i=0,tm=null,hd=0;const step=q=>{if(i<fs.length){const f=fs[i++];f.classList.add('open');/* r399: 영웅+ card in the auto sequence - short hold (2 ticks, ~0.46s) so its r361 glow reads before the next flip, plus a one-shot flash ring (.hg399, CSS pseudo, no new nodes); skipped by 전부 열기, low graphics and 스킬 연출 off */if(!q&&fs.length>1&&/\bg[345]\b/.test(f.className)&&!document.body.matches('.nofx,.tglite')){hd=2;f.classList.add('hg399')}if(i>=fs.length){b.style.visibility='hidden';b.style.pointerEvents='none'}/* r398: keeps its slot - display:none shrank the modal so the card grid and 확인 jumped ~25px the moment the last card opened */}};
 b.onclick=e=>{e.stopPropagation();clearInterval(tm);hd=0;while(i<fs.length)step(1)};
 const go=()=>{if(!m.isConnected)return;if(m.style.display=='none'||getComputedStyle(m).display=='none')return setTimeout(go,120);setTimeout(()=>{step();tm=setInterval(()=>{if(hd>0){hd--;return}step();if(i>=fs.length)clearInterval(tm)},fs.length>1?230:0)},250)};go()};
})();
;(()=>{/* v156 동료 영웅 갤러리 (등급색 받침대 · 실제 조각 바 · 실제 진영 문장 · 미획득 실루엣) */
const st=document.createElement('style');st.textContent=`.hgal{position:relative;margin:0 0 8px;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #e0c070;background:url(assets/bg_hero_gallery.jpg) 30% 60%/cover}
.hgal:before{content:'';position:absolute;inset:0;background:linear-gradient(#fff0 0,#2a1a0a55 55%,#1a1008cc)}
.hgal .hgt{position:relative;display:flex;justify-content:space-between;align-items:center;padding:8px 10px 2px;color:#fff;font-weight:900;text-shadow:0 2px 0 #000}.hgal .hgt small{font-size:11px;color:#ffe8a8}
.hgal .hgg{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:4px 4px;padding:4px 6px 8px}
.hgc{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:2px;cursor:pointer}
.hgc .hgch{position:relative;z-index:2;height:66px;width:auto;margin-bottom:-14px;filter:drop-shadow(0 3px 2px #0008)}
.hgc .hgpd{position:relative;z-index:1;width:70px;filter:drop-shadow(0 0 3px var(--rc)) drop-shadow(0 0 8px var(--rc)) drop-shadow(0 2px 2px #000a)}.hgc .hgpd:after{content:''}
.hgc .hgrc{position:absolute;z-index:1;left:50%;top:56px;width:60px;height:20px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(var(--rc),transparent 72%);opacity:.9;mix-blend-mode:color;pointer-events:none}.hgc .hgch{z-index:3!important}
.hgc b{font-size:11px;color:#fff;text-shadow:0 1px 0 #000,0 0 3px #000;margin-top:1px}.hgc .hgst{font-size:9px;color:#ffd84a;text-shadow:0 1px 0 #000;line-height:1}
.hgc .hgsb{display:flex;align-items:center;gap:1px;width:74px;margin-top:2px}.hgc .hgsb img{height:15px;filter:drop-shadow(0 0 3px #4ab0ff)}.hgc .hgsb div{flex:1;position:relative;height:9px;border-radius:5px;background:#0a1020;border:1px solid #0b0d0f;overflow:hidden}
.hgc .hgsb i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#2a7aff,#8ad8ff)}.hgc .hgsb i.ok{background:linear-gradient(90deg,#3ad05a,#c0ff8a)}.hgc .hgsb span{position:absolute;inset:0;font-size:7px;line-height:8px;text-align:center;font-weight:900;color:#fff;text-shadow:0 0 2px #000,0 0 2px #000}
.hgc .hgcr{position:absolute;left:2px;top:2px;z-index:3;width:24px;height:27px;display:grid;place-items:center}.hgc .hgcr>img{position:absolute;inset:0;width:100%;height:100%;filter:hue-rotate(var(--fh)) saturate(1.1)}.hgc .hgcr>i{position:relative;width:14px;height:14px;background-size:contain;background-repeat:no-repeat;background-position:center;margin-top:-2px}
.hgc .hgrl{position:absolute;right:0;top:4px;z-index:3;font-size:8px;font-weight:900;color:#fff;background:#0009;border:1px solid #fff5;border-radius:5px;padding:0 3px}
.hgc.sel .hgpd{filter:drop-shadow(0 0 4px #fff) drop-shadow(0 0 10px var(--rc))}.hgc.sel b{color:#3a2000;background:#ffe08a;border-radius:6px;padding:0 5px;text-shadow:none}
.hgc.no{cursor:default}.hgc.no .hgch{filter:brightness(0) opacity(.75) drop-shadow(0 0 3px #b8a0ff88)}.hgc.no .hgpd{filter:grayscale(1) brightness(.55)}.hgc.no .hgrc{opacity:.2}.hgc.no b{color:#c8c0d0}.hgc.no .hgst{color:#aaa}
.trv .trsel{display:none!important}.trlist{display:none!important}.hgc.leg .hgpd{filter:sepia(1) saturate(4) hue-rotate(-12deg) brightness(1.05) drop-shadow(0 0 4px #ffd24a) drop-shadow(0 0 12px #ff9a1a) drop-shadow(0 2px 2px #000a)!important}.hgc.leg .hgrc{mix-blend-mode:normal;background:radial-gradient(#ffd86acc,#ff8a1a55 50%,transparent 72%);height:26px;top:52px;animation:hglg 1.6s ease-in-out infinite}.hgc.leg:before{content:'';position:absolute;left:50%;top:0;width:78px;height:84px;transform:translateX(-50%);background:radial-gradient(#ffd86a66,transparent 65%);z-index:0;pointer-events:none}@keyframes hglg{50%{opacity:.55;transform:translateX(-50%) scale(1.15)}}`;document.head.appendChild(st);
const FH={light:'190deg',chaos:'70deg',human:'0deg',wild:'250deg',none:'0deg'};
const role=c=>c.healer?'회복':c.aoe?'광역':(c.d||'').split('·')[1]?.trim().split(' ')[0]||'';
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='enhance'||G.enTab!='comp')return r;const sb=document.querySelector('#screen .sbody'),tv=sb&&sb.querySelector('.trv');if(!tv||sb.querySelector('.hgal'))return r;
 const s=C.S(),L=[...D.COMPS].sort((a,b)=>(!!s.comps[b.k])-(!!s.comps[a.k])||b.g-a.g),own=L.filter(c=>s.comps[c.k]).length;
 const tile=c=>{const o=s.comps[c.k],R=D.RAR[c.g]?D.RAR[c.g].c:'#fff',sh=(s.csh||{})[c.k]||0,need=C.starCost(c.k),mx=o>=C.STARMAX,F=D.FACTIONS[c.fac];
  return `<div class="hgc ${o?'':'no'} ${o&&c.g>=4?'leg':''} ${c.k==G.trSel?'sel':''}" ${o?`data-hg=${c.k}`:''} style="--rc:${R};--fh:${FH[c.fac]||'0deg'}">${F?`<span class=hgcr title="${F.n}"><img src="${A}hg_crest.png"><i style="background-image:url(${A}fac_${c.fac}.png)"></i></span>`:''}${role(c)?`<em class=hgrl>${role(c)}</em>`:''}
  <img class=hgch src="${A}${c.img}"><img class=hgpd src="${A}hg_pedestal.png"><i class=hgrc></i><b>${o?c.n:'???'}</b><span class=hgst>${o?'★'.repeat(o):D.RAR[c.g].n}</span>
  ${o?`<div class=hgsb><img src="${A}hg_shard.png"><div><i class="${mx||sh>=need?'ok':''}" style="width:${mx?100:Math.min(100,sh/need*100)}%"></i><span>${mx?'MAX':sh+'/'+need}</span></div></div>`:'<div class=hgsb style="opacity:.5"><img src="'+A+'hg_shard.png" style="filter:grayscale(1)"><div><span>미획득</span></div></div>'}</div>`};
 tv.insertAdjacentHTML('beforebegin',`<div class=hgal><div class=hgt><span>영웅 갤러리</span><small>보유 ${own}/${D.COMPS.length}</small></div><div class=hgg>${L.map(tile).join('')}</div></div>`);
 sb.querySelectorAll('[data-hg]').forEach(e=>e.onclick=()=>{G.trSel=e.dataset.hg;renderScreen()})}catch(e){console.warn(e)}return r};
})();
;(()=>{/* v157 기보 고대 서고 (색별 rl_tome · 실제 조각 바 · 금색 복원/강화 버튼) */
const st=document.createElement('style');st.textContent=`.rlx .relhero{position:relative;height:170px;padding:0!important;display:block!important;border-radius:14px;overflow:hidden;border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #d8b060,0 0 14px #6aa0ff55;background:url(assets/bg_relic_archive.jpg) 50% 55%/cover!important}
.rlx .relhero:after{content:'';position:absolute;inset:0;background:linear-gradient(#0000 35%,#0a1022e8)}.rlx .relhero>img{position:absolute;left:10px;bottom:10px;width:58px!important;height:auto!important;z-index:2;filter:drop-shadow(0 0 8px #ffd27a)}
.rlx .relhero>div{position:absolute;left:76px;right:8px;bottom:10px;z-index:2}.rlx .relhero b{font-size:17px;color:#ffe8a8;text-shadow:0 2px 0 #000}.rlx .relhero small{color:#d8e4ff;text-shadow:0 1px 0 #000}
.rlx .relgrid{gap:8px!important}.rlx .rel{position:relative;padding:8px 6px!important;border-radius:12px!important;background:linear-gradient(#1e2a4a,#0e1428)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 0 0 1px #d8b06088,0 3px 6px #0008!important}
.rlx .rel.on{box-shadow:inset 0 0 0 1px #ffd86a,0 0 10px #6aa0ff66!important}
.rlx .rel .rimg{background:radial-gradient(#ffffff22,transparent 70%)!important;border:0!important;height:78px!important;display:grid;place-items:center}.rlx .rel .rimg img{width:auto!important;height:72px!important;filter:drop-shadow(0 3px 3px #000a)}
.rlx .rel b{color:#fff3d8!important}.rlx .rel>small{color:#bcd0ff!important}
.rlx .rlfb{display:flex;align-items:center;gap:3px;margin:4px 0;width:100%;box-sizing:border-box;padding:0 2px}.rlx .rlfb img{height:20px}.rlx .rlfb div{flex:1;position:relative;height:11px;border-radius:6px;background:#0a0e1a;border:1px solid #0b0d0f;box-shadow:0 0 0 1px #d8b06055;overflow:hidden}.rlx .rlfb i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#c08a2a,#ffe08a)}.rlx .rlfb i.ok{background:linear-gradient(90deg,#3ac05a,#c0ff8a)}.rlx .rlfb span{position:absolute;inset:0;text-align:center;font-size:9px;font-weight:900;line-height:10px;color:#fff;text-shadow:0 0 2px #000,0 0 2px #000}
.rlx .rel .pill{display:flex!important;align-items:center;justify-content:center;gap:4px;background:linear-gradient(#ffe08a,#d89a20)!important;color:#3a1a00!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 1px 0 #fff8,0 3px 0 #5a3a00!important;text-shadow:none!important}.rlx .rel .pill>img.rlr{position:absolute;left:6px;top:50%;transform:translateY(-50%);height:30px}.rlx .rel .pill{position:relative;padding-left:30px!important}.rlx .rel .pill small{color:#5a2a00!important}
.rlx .rel .pill.off{filter:grayscale(.85) brightness(.75)}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='relic')return r;const sb=document.querySelector('#screen .sbody');if(!sb||sb.classList.contains('rlx'))return r;sb.classList.add('rlx');const s=C.S(),fr=s.frag||0;
 const hi=sb.querySelector('.relhero>img');if(hi)hi.src=A+'rl_tome.png';
 sb.querySelectorAll('.rel').forEach((el,i)=>{const R=D.RELICS[i];if(!R)return;const lv=(s.relic||{})[R.k]||0,c=C.relicCost(R.k),ri=el.querySelector('.rimg');
  if(ri){ri.style.filter='';ri.innerHTML=`<img src="${A}rl_tome.png" style="filter:sepia(.9) saturate(2.4) hue-rotate(${(i*37)%360}deg) ${lv?'':'grayscale(.8) brightness(.55)'} drop-shadow(0 3px 3px #000a)">`}
  const p=el.querySelector('[data-rel]');if(p){p.insertAdjacentHTML('beforebegin',`<div class=rlfb><img src="${A}rl_fragment.png"><div><i class="${fr>=c.f?'ok':''}" style="width:${Math.min(100,fr/c.f*100)}%"></i><span>${fr} / ${c.f}</span></div></div>`);p.insertAdjacentHTML('afterbegin',`<img class=rlr src="${A}rl_restore.png">`)}})}catch(e){console.warn(e)}return r};
})();
/* v158 가방: adventurer's storeroom */
(function(){const st=document.createElement('style');st.textContent=`
.bgx .bghero{display:flex;align-items:center;gap:10px;margin:2px 4px 8px;padding:8px 10px;border-radius:12px;background:linear-gradient(90deg,rgba(40,24,10,.85),rgba(40,24,10,.2));border:1px solid #a87a3a}
.bgx .bghero img{height:64px;filter:drop-shadow(0 3px 6px #000)}.bgx .bghero b{font-size:18px;color:#ffd98a;text-shadow:0 2px 3px #000}.bgx .bghero small{display:block;color:#e8d6b8;font-size:11px}
.bgx .card{background:linear-gradient(180deg,rgba(52,34,18,.92),rgba(30,20,12,.92))!important;border:1px solid #8a6232!important}
.bgx .ttl img{height:26px;vertical-align:middle;margin-right:4px}
.bgx .bagg .bi{position:relative;background:radial-gradient(circle,rgba(70,48,24,.9),rgba(25,16,8,.95))!important;border:none!important;border-radius:6px;padding:8px 4px 6px!important;overflow:visible}
.bgx .bagg .bi>.sf{position:absolute;inset:-2px;width:calc(100% + 4px);height:calc(100% + 4px);pointer-events:none;z-index:2}
.bgx .bagg .bi>img:not(.sf){position:relative;z-index:1}
.bgx .bagg .bi>b{position:absolute;top:4px;right:4px;z-index:3;background:rgba(0,0,0,.75);border:1px solid #d9a648;border-radius:8px;padding:0 5px;font-size:10px;color:#fff;line-height:15px}
.bgx .bagg .bi>small{position:relative;z-index:3;display:block;margin-top:2px;color:#f0dfc0}
.bgx .bagg .bi.gear>b{left:4px;right:auto}`;document.head.appendChild(st);
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{if(G.screen=='bag'){const sb=$('#screen');sb.classList.add('bgx');const bg=sb.querySelector('.sbg');if(bg)bg.src=A+'bg_bag_store.jpg';
const body=sb.querySelector('.sbody');if(body&&!body.querySelector('.bghero')){const h=document.createElement('div');h.className='bghero';h.innerHTML=`<img src="${A}bg_backpack.png"><div><b>모험가의 창고</b><small>아이템을 눌러 정보 확인</small></div>`;body.prepend(h)}
const cards=sb.querySelectorAll('.card');const tt=cards[0]&&cards[0].querySelector('.ttl');if(tt&&!tt.querySelector('img'))tt.insertAdjacentHTML('afterbegin',`<img src="${A}bg_pouch.png">`);
const t2=cards[1]&&cards[1].querySelector('.ttl');if(t2&&!t2.querySelector('img'))t2.insertAdjacentHTML('afterbegin',`<img src="${A}it2_armor.png">`);
cards.forEach((c,ci)=>c.querySelectorAll('.bagg .bi').forEach(b=>{if(b.querySelector('.sf'))return;const col=ci==1?b.style.borderColor:'';if(ci==1)b.classList.add('gear');const f=document.createElement('img');f.className='sf';f.src=A+'bg_slot.png';if(col)f.style.filter=`drop-shadow(0 0 3px ${col}) drop-shadow(0 0 2px ${col})`;b.appendChild(f)}))}else $('#screen').classList.remove('bgx')}catch(_){}return r}})();
/* v159 칭호: hall of honours */
(function(){const st=document.createElement('style');st.textContent=`
.ttx .shade{background:rgba(8,6,14,.55)!important}
.ttx .ttlr{position:relative;min-height:78px;background:none!important;border:none!important;padding:12px 26px 12px 30px!important;margin:6px 0!important;display:flex;align-items:center;gap:8px;isolation:isolate}
.ttx .ttlr>.tpl{position:absolute;inset:0;width:100%;height:100%;z-index:-1;object-fit:fill;filter:var(--tf) drop-shadow(0 3px 5px #000)}
.ttx .ttlr .f small{color:#1e1a26!important;font-weight:700;text-shadow:0 1px 0 rgba(255,255,255,.4)}
.ttx .ttlr .tbadge{flex:none}
.ttx .ttlr.lock{opacity:1!important;filter:none!important}.ttx .ttlr.lock .f small{color:#f3dfb8!important;text-shadow:0 1px 2px #000}
.ttx .ttlr.lock .tlk{display:block;color:#ffd98a!important;font-size:11px;font-weight:800}
.ttx .ttlr.lock>small{display:none}.ttx .ttlr>.tlki{height:34px;flex:none;filter:drop-shadow(0 2px 3px #000)}
.ttx .ttlr.on{min-height:86px}.ttx .ttlr.on>.tla{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);height:120%;z-index:-2;opacity:.85;filter:drop-shadow(0 0 10px #ffd24a)}
.ttx .ttlr.on>.tcr{position:absolute;left:50%;top:-14px;transform:translateX(-50%);height:28px;z-index:2;filter:drop-shadow(0 0 6px #ffd24a)}
.ttx .ttlr.on .teq{background:linear-gradient(#ffe08a,#c08a20);color:#3a2400!important;padding:3px 8px;border-radius:10px;font-weight:800}`;document.head.appendChild(st);
const TF={1:'sepia(.8) saturate(2.2) hue-rotate(60deg)',2:'sepia(.8) saturate(2.4) hue-rotate(170deg)',3:'sepia(.8) saturate(2.4) hue-rotate(225deg)',4:'sepia(.9) saturate(3)',5:'sepia(.9) saturate(3.5) hue-rotate(-40deg)'};
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{const sb=$('#screen');if(G.screen=='title'){sb.classList.add('ttx');const bg=sb.querySelector('.sbg');if(bg)bg.src=A+'bg_ach_hall.jpg';
sb.querySelectorAll('.ttlr').forEach((row,i)=>{if(row.querySelector('.tpl'))return;const t=D.TITLES[i];if(!t)return;const lk=row.classList.contains('lock');const p=document.createElement('img');p.className='tpl';p.src=A+'tt_plate.png';row.style.setProperty('--tf',lk?'sepia(1) saturate(1.6) brightness(.55) contrast(1.1)':(TF[t.r]||'none'));row.prepend(p);if(lk)row.insertAdjacentHTML('beforeend',`<img class=tlki src="${A}tt_locked.png">`);
if(lk){const f=row.querySelector('.f');f&&f.insertAdjacentHTML('beforeend',`<small class=tlk><img class="emi e_sk_lock" src=assets/sk_lock.png alt="">해금 조건: ${t.d}</small>`);const d=f&&f.querySelector('small');if(d)d.style.display='none'}
if(row.classList.contains('on')){row.insertAdjacentHTML('afterbegin',`<img class=tla src="${A}rk_laurel.png"><img class=tcr src="${A}tt_crown.png">`)}})}else sb.classList.remove('ttx')}catch(_){}return r}})();
/* v160 칭호 wrap/laurel fix + 스킬 편성 마법진 */
(function(){const st=document.createElement('style');st.textContent=`
.ttx .ttlr .f small{word-break:keep-all}.ttx .ttlr .tlk{white-space:nowrap;font-size:10.5px!important}
.ttx .ttlr.on>.tla{height:150%!important;opacity:1!important;filter:sepia(1) saturate(3) brightness(1.2) drop-shadow(0 0 8px #ffd24a) drop-shadow(0 0 16px #ffb000)!important;animation:tlaG 1.8s ease-in-out infinite alternate}
@keyframes tlaG{to{filter:sepia(1) saturate(3) brightness(1.45) drop-shadow(0 0 12px #ffe27a) drop-shadow(0 0 24px #ffb000)}}
.skx .card{background:rgba(14,10,30,.78)!important;border:1px solid #6a5ab0!important}
.skx .skpick .skp{position:relative;background:none!important;border:none!important;box-shadow:none!important;padding:2px 0 0!important;display:flex;flex-direction:column;align-items:center}
.skx .skp .skw{position:relative;width:72px;height:72px;display:grid;place-items:center}
.skx .skp .skw>img.sic{width:46px;height:46px;border-radius:50%;object-fit:cover}
.skx .skp .skw>img.srg{position:absolute;inset:0;width:100%;height:100%;filter:var(--sf)}
.skx .skp.on .skw>img.srg{filter:var(--sf) drop-shadow(0 0 6px var(--sc)) drop-shadow(0 0 10px var(--sc))}
.skx .skp.lock .skw>img.sic{filter:grayscale(1) brightness(.4)}
.skx .skp>b{font-size:11px;color:#fff;text-shadow:0 1px 2px #000;margin-top:2px}
.skx .skp>small{display:none}
.skx .skpick{grid-template-columns:repeat(3,minmax(0,1fr))!important}.skx .skp{min-width:0}.skx .skp.lock{opacity:.85!important}.skx .skp .stg{max-width:100%;box-sizing:border-box;flex-wrap:wrap;justify-content:center;white-space:normal!important;text-align:center;line-height:12px;display:flex;align-items:center;gap:3px;margin-top:2px;background:linear-gradient(#efe0bc,#c9b07c);color:#3a2610;border-radius:4px;padding:1px 5px 1px 2px;font-size:9.5px;font-weight:800;white-space:nowrap;box-shadow:0 1px 3px #000}
.skx .skp .stg img{height:16px}.skx .skp.lock .stg{background:linear-gradient(#777,#444);color:#eee}
.skx .skp.lock.on::after{display:none}.skx .skp.on::after{content:'편성';position:absolute;top:0;right:4px;background:#ffd24a;color:#3a2400;font-size:9px;font-weight:900;border-radius:6px;padding:0 4px}`;document.head.appendChild(st);
const EL={fire:['sepia(1) saturate(4) hue-rotate(-20deg)','#ff5a2a'],ice:['sepia(1) saturate(3) hue-rotate(160deg)','#5ad0ff'],heal:['sepia(1) saturate(3) hue-rotate(60deg)','#5aff8a'],bolt:['sepia(1) saturate(4) hue-rotate(15deg)','#ffe24a'],poison:['sepia(1) saturate(3) hue-rotate(240deg)','#c05aff'],charm:['sepia(1) saturate(3) hue-rotate(290deg)','#ff7ad0'],ragna:['sepia(1) saturate(5) hue-rotate(-35deg)','#ff2a2a'],bash:['sepia(1) saturate(3)','#ffa03a'],dark:['sepia(1) saturate(3) hue-rotate(220deg) brightness(.8)','#8a4aff'],holy:['sepia(.6) saturate(2) brightness(1.2)','#fff3a0'],ds:['sepia(1) saturate(4) hue-rotate(-40deg) brightness(.75)','#c0102a'],giga:['sepia(1) saturate(5) hue-rotate(-30deg) brightness(.9)','#ff3a3a']};
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{const sb=$('#screen');if(G.screen=='enhance'&&G.enTab=='skill'){sb.classList.add('skx');const bg=sb.querySelector('.sbg');if(bg)bg.src=A+'bg_skill_circle.jpg';const s=C.S();
{const tt=sb.querySelector('.ttl small');if(tt&&!tt.dataset.c){tt.dataset.c=1;tt.textContent=`편성 ${sb.querySelectorAll('.skp.on:not(.lock)').length}/6 · 전투 하단 바에 표시`}}sb.querySelectorAll('.skp').forEach(p=>{if(p.querySelector('.skw'))return;const sp=D.SPELLS.find(x=>x.k==p.dataset.sl);if(!sp)return;const lk=p.classList.contains('lock');const im=p.querySelector('img');im.className='sic';const w=document.createElement('div');w.className='skw';im.replaceWith(w);w.appendChild(im);const e=EL[sp.k];w.insertAdjacentHTML('beforeend',`<img class=srg src="${A}${lk?'sk_empty':'sk_ring'}.png">`);if(!lk&&e){p.style.setProperty('--sf',e[0]);p.style.setProperty('--sc',e[1])}
const pw=sp.heal?`회복 ${Math.round(sp.heal*100)}%`:sp.mul?`×${sp.mul}${sp.aoe?' 광역':''}`:'';p.insertAdjacentHTML('beforeend',`<span class=stg><img src="${A}sk_tag.png">${lk?C.stageName(sp.unlock)+' 해금':`쿨 ${sp.cd}초${pw?' · '+pw:''}`}</span>`)})}else sb.classList.remove('skx')}catch(_){}return r}})();
/* v161 동료 승급: star shrine */
(function(){const st=document.createElement('style');st.textContent=`
.stx .shade{background:linear-gradient(rgba(6,8,24,.35),rgba(6,8,24,.7))!important}
.stx .stlist{display:flex!important;gap:8px;overflow-x:auto;padding:6px 4px 8px;margin:0 0 6px;height:auto!important}
.stx .stlist .stc{position:relative!important;right:auto!important;bottom:auto!important;opacity:1!important;flex:0 0 62px;width:62px;font-size:inherit;background:radial-gradient(circle at 50% 30%,rgba(80,70,140,.9),rgba(16,14,40,.95))!important;border:2px solid var(--rc)!important;border-radius:12px!important;padding:4px 2px!important;display:flex!important;flex-direction:column;align-items:center}
.stx .stlist .stc.on{box-shadow:0 0 0 2px #ffe27a,0 0 14px #ffc83a!important}
.stx .stlist .stc img{height:50px;width:100%;object-fit:contain}
.stx .card{background:rgba(14,16,44,.82)!important;border:1px solid #7a6ac8!important}
.stx .sthero{position:relative;overflow:hidden}
.stx .xsk{display:flex;gap:3px;margin:2px 0}.stx .xsk i{position:relative;width:26px;height:26px;display:block}
.stx .xsk i img{position:absolute;inset:0;width:100%;height:100%}.stx .xsk i .fl{inset:3px;width:20px;height:20px;filter:drop-shadow(0 0 3px #ffd24a)}
.stx .xsk i.off .xso{filter:grayscale(.6) brightness(.55)}
.stx .stv{display:none}
.stx .bar.xsb{position:relative;margin-left:16px;height:14px!important;border-radius:7px}.stx .bar.xsb>img{position:absolute;left:-18px;top:50%;transform:translateY(-50%);height:30px;z-index:2}
.stx .bar.xsb i{background:linear-gradient(90deg,#ffe27a,#ffb000)!important}
.stx #stUp,.stx #stAw{position:relative;padding-left:40px!important;background:linear-gradient(#ffe68a,#d79a20)!important;color:#3a2400!important;font-weight:900;border:1px solid #fff2b0}
.stx #stUp.off,.stx #stAw.off{background:linear-gradient(#777,#444)!important;color:#ddd!important}
.stx #stUp>img.ar,.stx #stAw>img.ar{position:absolute;left:10px;top:50%;transform:translateY(-50%);height:34px}
.stx .xsburst{position:absolute;left:62%;top:30%;width:10px;height:10px;pointer-events:none;z-index:5}
.stx .xsburst img{position:absolute;width:30px;height:30px;left:-15px;top:-15px;animation:stb 1s ease-out forwards}
@keyframes stb{0%{transform:translate(0,0) scale(.3);opacity:1}100%{transform:translate(var(--x),var(--y)) scale(1) rotate(180deg);opacity:0}}
.stx .sthero.stfx{animation:stfl .8s ease-out}@keyframes stfl{0%{box-shadow:0 0 0 2px #fff,0 0 40px #ffe27a}100%{}}`;document.head.appendChild(st);
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{const sb=$('#screen');if(G.screen=='star'){sb.classList.add('stx');const bg=sb.querySelector('.sbg');if(bg)bg.src=A+'bg_star_shrine.jpg';const s=C.S(),k=G.stSel;
const v=sb.querySelector('.sthero .stv');if(v&&!sb.querySelector('.xsk')){const n=Math.min(s.comps[k]||0,6);v.insertAdjacentHTML('afterend',`<div class=xsk>${[0,1,2,3,4,5].map(i=>`<i class="${i<n?'':'off'}"><img class=xso src="${A}st_socket.png">${i<n?`<img class=fl src="${A}st_frag.png">`:''}</i>`).join('')}</div>`)}
const bar=sb.querySelector('.card .bar');if(bar&&!bar.classList.contains('xsb')){bar.classList.add('xsb');bar.insertAdjacentHTML('afterbegin',`<img src="${A}st_frag.png">`)}
['#stUp','#stAw'].forEach(q=>{const b=sb.querySelector(q);if(b&&!b.querySelector('.ar'))b.insertAdjacentHTML('afterbegin',`<img class=ar src="${A}st_arrow.png">`)});
const h=sb.querySelector('.sthero');if(h&&G._stBurst&&Date.now()-G._stBurst<500){G._stBurst=0;const bz=document.createElement('div');bz.className='xsburst';bz.innerHTML=[...Array(10)].map((_,i)=>{const a=i/10*6.283;return `<img src="${A}st_frag.png" style="--x:${Math.cos(a)*90}px;--y:${Math.sin(a)*70}px;animation-delay:${i*20}ms">`}).join('');h.appendChild(bz);setTimeout(()=>bz.remove(),1300)}}else sb.classList.remove('stx')}catch(_){}return r};
const su=C.starUp;C.starUp=function(){const r=su.apply(this,arguments);if(r=='ok')G._stBurst=Date.now();return r};const aw=C.awake;C.awake=function(){const r=aw.apply(this,arguments);if(r=='ok')G._stBurst=Date.now();return r}})();
/* v162 갤러리: gallery hall */
(function(){const st=document.createElement('style');st.textContent=`
.glx .shade{background:linear-gradient(rgba(20,6,10,.25),rgba(20,6,10,.6))!important}
.glx .card{background:rgba(30,10,16,.78)!important;border:1px solid #a8803a!important}
.glx .glt{gap:10px 8px!important}
.glx .glt .glc{position:relative;aspect-ratio:3/4.2!important;background:none!important;border:none!important;border-radius:0!important;padding:0!important;overflow:visible!important}
.glx .glt .glc::before{content:'';position:absolute;left:8%;right:8%;top:7%;bottom:22%;background:radial-gradient(circle at 50% 45%,#5a3038,#1a0c10);z-index:0}
.glx .glt .glc>img:not(.gfr):not(.gvl){position:absolute!important;left:10%!important;width:80%!important;top:8%!important;height:68%!important;bottom:auto!important;transform:none!important;object-fit:contain!important;max-width:none;z-index:1;overflow:hidden}
.glx .glt .glc>.gfr,.glx .glt .glc>.gvl{filter:drop-shadow(0 2px 3px #000)!important;transform:none!important;max-width:none!important;bottom:auto!important}.glx .glt .glc>.gfr{position:absolute;left:0!important;top:0;width:100%;height:80%;z-index:3;pointer-events:none;filter:drop-shadow(0 3px 4px #000)}
.glx .glt .glc>b{position:absolute!important;left:-2%!important;right:-2%!important;bottom:0!important;z-index:4;background:url(assets/gl_plate.png) center/100% 100% no-repeat!important;color:#3a2408!important;font-size:9.5px!important;font-weight:900;padding:5px 6px!important;text-shadow:0 1px 0 #f3d890;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
.glx .glt .glc.lock>img:not(.gfr):not(.gvl){visibility:hidden}
.glx .glt .glc.lock>.gvl{position:absolute;left:7%!important;top:5%;width:86%;height:72%;z-index:2;object-fit:fill}
.glx .glt .glc.lock>b{font-size:8.5px!important}`;document.head.appendChild(st);
const CND={c:'소환으로 획득',b:'보스 처치 시 해금',s:'코스튬 보유 시 해금'};
const dec=()=>{const sb=$('#screen');if(G.screen!='gallery'){sb.classList.remove('glx');return}sb.classList.add('glx');const bg=sb.querySelector('.sbg');if(bg)bg.src=A+'bg_gallery_hall.jpg';
 const tb=(sb.querySelector('[data-gt].on')||{}).dataset;const t=tb?tb.gt:'c';
 sb.querySelectorAll('.glc').forEach(c=>{if(c.querySelector('.gfr'))return;c.insertAdjacentHTML('beforeend',`<img class=gfr src="${A}gl_frame.png">`);if(c.classList.contains('lock')){c.insertAdjacentHTML('afterbegin',`<img class=gvl src="${A}gl_veil.png">`);const b=c.querySelector('b');if(b)b.innerHTML='<img class="emi e_sk_lock" src=assets/sk_lock.png alt="">'+CND[t]}});
 sb.querySelectorAll('[data-gt]').forEach(b=>b.addEventListener('click',()=>setTimeout(dec,0)))};
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{dec()}catch(_){}return r}})();
/* v163 공통 팝업: 방치/접속 보상·도전 실패 scroll */
(function(){const st=document.createElement('style');st.textContent=`
.modal .card.ppx{position:relative;background:none!important;border-style:solid!important;border-width:44px 36px 40px!important;border-image:url(assets/pp_scroll.png) 150 190 150 190 fill stretch!important;border-radius:0!important;box-shadow:none!important;color:#3a2810!important;padding:6px 4px 4px!important;filter:drop-shadow(0 10px 18px #000c);min-width:290px}
.modal .card.ppx small,.modal .card.ppx b,.modal .card.ppx span:not(.btn):not(.pill){color:#3a2810}
.modal .card.ppx .pph{display:flex;flex-direction:column;align-items:center;margin:-30px 0 4px}
.modal .card.ppx .pph img{height:74px;filter:drop-shadow(0 4px 6px #0008)}
.modal .card.ppx .ppb{margin-top:-6px;padding:4px 22px;font:900 16px Maplestory,'Noto Sans KR',sans-serif;color:#fff!important;text-shadow:0 1px 2px #000;background:var(--bn);clip-path:polygon(0 0,100% 0,94% 50%,100% 100%,0 100%,6% 50%);box-shadow:inset 0 -3px 0 #0003}
.modal .card.ppx .ttl.pphid{display:none!important}.modal .card.ppx .idlebar span{color:#fff!important;text-shadow:0 1px 2px #000;font-weight:800}
.modal .card.ppx.pp-idle{--bn:linear-gradient(#e0902a,#a8520c)}.modal .card.ppx.pp-ol{--bn:linear-gradient(#c8302a,#801818)}.modal .card.ppx.pp-fail{--bn:linear-gradient(#8a4a4a,#4a2626)}
.modal .card.ppx .idlebar{background:#5a4020!important}
.modal .card.ppx .rwgrid>div{background:rgba(255,248,225,.6)!important;border:1px solid #b08a4a!important}
.modal .card.ppx .olr{background:rgba(255,248,225,.55)!important;border:1px solid #b08a4a!important;color:#3a2810!important}
.modal .card.ppx .olr em{color:#6a4a20!important}.modal .card.ppx .olr.rdy{box-shadow:0 0 0 2px #ffb000 inset}.modal .card.ppx .olr.got{opacity:.65}
.modal .card.ppx .olr.got em{color:#2a7a2a!important;font-weight:900}
.modal .card.ppx.pp-fail .ppf{display:flex;justify-content:space-around;margin:4px 0;font-weight:900}.modal .card.ppx.pp-fail .ppf div{display:flex;flex-direction:column}.modal .card.ppx.pp-fail .ppf i{font-style:normal;font-size:16px}.modal .card.ppx.pp-fail .ppf .lo{color:#b02020}`;document.head.appendChild(st);
const deco=m=>{const c=m.querySelector(':scope>.card');if(!c||c.classList.contains('ppx'))return;const t=c.querySelector('.ttl');if(!t)return;const tx=t.textContent.trim();let k=null,ic=null;
 if(tx=='방치 보상'){k='idle';ic='pp_idle'}else if(tx=='접속 보상'){k='ol';ic='pp_cal'}else if(/도전 실패$/.test(tx)){k='fail';ic='pp_fail'}if(!k)return;
 c.classList.add('ppx','pp-'+k);t.classList.add('pphid');t.insertAdjacentHTML('beforebegin',`<div class=pph><img src="${A}${ic}.png"><span class=ppb>${tx}</span></div>`);
 if(k=='fail'){const sm=c.querySelector('small');const mm=sm&&sm.innerHTML.match(/권장 전투력 ([^·<]+) · 내 전투력 ([^<]+)<br>/);if(mm){sm.innerHTML=sm.innerHTML.replace(mm[0],'');sm.insertAdjacentHTML('beforebegin',`<div class=ppf><div><small>권장 전투력</small><i>${mm[1].trim()}</i></div><div><small>내 전투력</small><i class=${parseFloat(mm[2].replace(/,/g,''))<parseFloat(mm[1].replace(/,/g,''))?'lo':''}>${mm[2].trim()}</i></div></div>`)}}};
new MutationObserver(ms=>ms.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType==1&&n.classList.contains('modal'))try{deco(n)}catch(_){}}))).observe(document.getElementById('app'),{childList:true})})();

/* v164 인연: tavern dialogue */
(function(){const st=document.createElement('style');st.textContent=`
.bdhero{background:none!important;border:none!important;height:330px!important;overflow:visible!important}
.bdhero .pt{bottom:96px!important;height:230px!important}
.bdhero .sp{top:auto!important;bottom:0;left:0!important;right:0!important;height:112px;box-sizing:border-box;background:none!important;box-shadow:none!important;border-radius:0!important;padding:38px 26px 18px 26px!important;color:#4a2a2a!important;font-size:13.5px!important;line-height:1.45;display:flex;align-items:center;filter:drop-shadow(0 4px 8px #0008)}
.bdhero .sp::before{content:'';position:absolute;inset:0;z-index:-1;border-style:solid;border-width:30px 22px 22px 80px;border-image:url(assets/bd_panel.png) 120 120 110 330 fill stretch}
.bdhero .sp:after{display:none!important}
.bdhero .nm{left:12px!important;bottom:84px!important;background:none!important;padding:2px 10px!important;color:#6a3040!important;font-size:12px!important;z-index:3;width:56px;text-align:center;white-space:nowrap}
.bdhero .nm span{display:none}
.bdhero .fl{bottom:auto!important;top:60%}
.bh{display:inline-block;width:22px;height:22px;margin-right:1px;vertical-align:middle}.bh img{width:100%;height:100%;object-fit:contain}.bh.on img{filter:drop-shadow(0 0 4px #ff5a90)}
.bdsel .bdc{background:none!important;border:none!important;box-shadow:none!important}
.bdsel .bdc .bdm{position:relative;display:block;width:56px;height:56px;margin:0 auto}
.bdsel .bdc .bdm img{position:absolute;left:7px;top:7px;width:42px!important;height:42px!important;border-radius:50%;object-fit:cover;object-position:50% 20%;background:radial-gradient(#ffe0ea,#a05070)}
.bdsel .bdc .bdm img.bdmf{left:0;top:0;width:56px!important;height:56px!important;background:none;border-radius:0}
.bdsel .bdc.on .bdm{filter:drop-shadow(0 0 6px #ff7aa8)}
.bdsel .bdc b{color:#fff;text-shadow:0 1px 2px #000}
#screen .card.bdcard,#screen .bdcard~.card{background:rgba(40,18,28,.82)!important;border:1px solid #c88a8a!important}`;document.head.appendChild(st)})();

/* v165 낚시터: lakeside dock */
(function(){const st=document.createElement('style');st.textContent=`
.fsx .fsh{background:url(assets/bg_fish_dock.jpg) center 60%/cover!important;border:2px solid #c8a060!important;box-shadow:0 6px 14px #0008}
.fsx .fsh .wt{background:linear-gradient(#5ac8f022,#1a6aa055)!important;border-top:1px solid #fff6!important}
.fsx .fsh .bob{background:url(assets/fs_bobber.png) center/contain no-repeat!important;border:none!important;border-radius:0!important;width:22px!important;height:30px!important;top:170px!important}
.fsx .fsh .msg{background:rgba(40,24,10,.75)!important;border:1px solid #c8a060}
.fsx .fgauge{margin:8px auto 0;width:300px;display:flex;align-items:center;gap:6px}
.fsx .fgauge .rl{flex:0 0 34px;height:34px;border-radius:50%;background:radial-gradient(circle,#fff3c0 0 18%,#c89a3a 20% 46%,#6a4a1a 48% 52%,#e0b860 54% 72%,#7a5418 74%);box-shadow:0 2px 4px #0008,inset 0 0 0 2px #3a2408}
.fsx .fgauge .ch{flex:1;position:relative;height:22px;border-radius:11px;background:repeating-linear-gradient(90deg,#7a4a1e 0 9px,#6a3e18 9px 11px);border:3px solid #c8a04a;box-shadow:inset 0 2px 4px #0009,0 2px 0 #5a3a10}
.fsx .fgauge .ch i{position:absolute;left:0;top:0;bottom:0;border-radius:8px;background:linear-gradient(#ffe8a0,#d8a030 55%,#a87010);box-shadow:inset 0 1px 0 #fff8}
.fsx .fgauge .ch span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:2px;font:900 11px 'Noto Sans KR',sans-serif;color:#fff;text-shadow:0 1px 2px #000}
.fsx .fgauge .ch span img{height:16px}.fsx .fgauge .ch span img.u{filter:grayscale(1) brightness(.5)}
.fsx .card{background:rgba(46,30,14,.85)!important;border:1px solid #a8803a!important}
.fsx .fcc{position:relative;background:none!important;border:none!important;padding:2px 0!important}
.fsx .fcc .fpw{position:relative;width:58px;height:58px;margin:0 auto}
.fsx .fcc .fpw .i{position:absolute!important;left:10px;top:10px;width:38px!important;height:38px!important;border-radius:50%;background:radial-gradient(#e0f4ff,#5aa0c8)}
.fsx .fcc .fpw .pq{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 0 3px var(--c))}
.fsx .fcc.lock{filter:none!important;opacity:1!important}.fsx .fcc.lock .fpw .i{background:#2a2a30}.fsx .fcc.lock .pq{filter:grayscale(.7) brightness(.6)!important}
.fsx .ckr .di{background:url(assets/fs_board.png) center/contain no-repeat!important;border:none!important;border-radius:0!important}
.fsx .ttl .fbd{height:22px;vertical-align:middle;margin-right:3px}.fsx .ttl.ckt{justify-content:flex-start!important;gap:4px}.fsx .ttl.ckt small{margin-left:auto}.fsx .fcc .fpw::before{content:'';position:absolute;left:10px;top:10px;width:38px;height:38px;border-radius:50%;background:radial-gradient(#e0f4ff,#5aa0c8)}.fsx .fcc .fpw .i{background:none!important}.fsx .fcc.lock .fpw::before{background:#1e2a36}.fsx .fcc.lock .fpw .i{filter:brightness(0) invert(1) opacity(.35)!important}`;document.head.appendChild(st);
const LIM=5;
const dec=()=>{const sb=$('#screen');if(G.screen!='fish'){sb.classList.remove('fsx');return}sb.classList.add('fsx');const f=C.S().fish||{n:0};const go=sb.querySelector('#fgo');
 if(go&&!sb.querySelector('.fgauge')){const left=Math.max(0,LIM-(f.n||0));go.insertAdjacentHTML('afterend',`<div class=fgauge><span class=rl></span><div class=ch><i style="width:${left/LIM*100}%"></i><span>${[0,1,2,3,4].map(i=>`<img class="${i<left?'':'u'}" src="${A}fs_bobber.png">`).join('')} 오늘 ${left}/${LIM}회</span></div></div>`)}
 sb.querySelectorAll('.fcc').forEach(c=>{if(c.querySelector('.fpw'))return;const im=c.querySelector('.i');if(!im)return;const w=document.createElement('div');w.className='fpw';im.replaceWith(w);w.appendChild(im);w.insertAdjacentHTML('beforeend',`<img class=pq src="${A}fs_plaque.png">`)});
 sb.querySelectorAll('.ttl').forEach(t=>{if(t.textContent.includes('요리')&&!t.querySelector('.fbd')){t.classList.add('ckt');t.innerHTML=t.innerHTML.replace(/<img class="emi e_fs_board"[^>]*>/,'');t.insertAdjacentHTML('afterbegin',`<img class=fbd src="${A}fs_board.png">`)}})};
let busy=0;new MutationObserver(()=>{if(busy)return;busy=1;try{dec()}catch(_){}busy=0}).observe(document.getElementById('screen')||document.body,{childList:true});
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{dec()}catch(_){}return r}})();

/* v166 파티 편성 lower half: war room */
(function(){const st=document.createElement('style');st.textContent=`
.ptx .card:not(.pstage){background:rgba(34,22,12,.84)!important;border:1px solid #a8803a!important}
.ptx .psl{position:relative;background:none!important;border:none!important;min-height:86px}
.ptx .psl>.ppd{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:84%;z-index:0;filter:drop-shadow(0 3px 4px #000)}
.ptx .psl>*:not(.ppd){position:relative;z-index:1}
.ptx .psl.emp .psi small{color:#e8dcc0!important;text-shadow:0 1px 2px #000}
.ptx .psl:not(.emp)>.ppf{position:absolute;right:20px;top:-6px;height:30px;z-index:2;filter:drop-shadow(0 2px 2px #000)}
.ptx .fxr{position:relative;background:url(assets/gl_plate.png) center/100% 100% no-repeat!important;border:none!important;color:#3a2408!important;padding:8px 18px!important;margin:4px 0!important}
.ptx .fxr .fac{background:#2a1a0cdd!important}.ptx .fxr small{color:#3a2408!important;font-weight:800}.ptx .fxr *{opacity:1!important}.ptx .fxr>b{background:#f3dc9ccc;border-radius:8px;padding:1px 7px;mix-blend-mode:normal!important}.ptx .fxr>b,.ptx .fxr b{color:#4a3018!important;font-weight:900;text-shadow:0 1px 0 #f3d890!important;filter:none!important}.ptx .psl.emp .psi small{background:#0008;border-radius:6px;padding:1px 6px}.ptx .fxr.on b{color:#1a7a2a!important}
.ptx .fxr.on::after{content:'';position:absolute;right:-4px;top:-10px;width:26px;height:34px;background:url(assets/pt_flag.png) center/contain no-repeat;filter:drop-shadow(0 2px 2px #000)}
.ptx .rcard.in>.ck{display:none!important}
.ptx .rcard.in>.pfl{position:absolute;right:2px;top:26px;height:30px;z-index:3;filter:drop-shadow(0 2px 2px #000)}`;document.head.appendChild(st);
const dec=()=>{const sb=$('#screen');if(G.screen!='party'){sb.classList.remove('ptx');return}sb.classList.add('ptx');const bg=sb.querySelector('.sbg');if(bg&&!/bg_war_room/.test(bg.src))bg.src=A+'bg_war_room.jpg';
 sb.querySelectorAll('.psl').forEach(p=>{if(!p.querySelector('.ppd'))p.insertAdjacentHTML('afterbegin',`<img class=ppd src="${A}pt_pedestal.png">`);if(!p.classList.contains('emp')&&!p.querySelector('.ppf'))p.insertAdjacentHTML('beforeend',`<img class=ppf src="${A}pt_flag.png">`)});
 sb.querySelectorAll('.card').forEach(c=>{const t=c.querySelector('.ttl');if(!t||!t.textContent.startsWith('세력 효과'))return;c.querySelectorAll('.row').forEach(r=>{if(r.classList.contains('fxr'))return;r.classList.add('fxr');const b=r.querySelector(':scope>b');if(b&&b.textContent=='발동')r.classList.add('on')})});
 sb.querySelectorAll('.rcard.in').forEach(r=>{if(!r.querySelector('.pfl'))r.insertAdjacentHTML('beforeend',`<img class=pfl src="${A}pt_flag.png">`)})};
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{dec()}catch(_){}return r}})();

/* v167 rare popups: celebration frame (보상 획득 · 콘텐츠 개방 · 황금룡 결과 · LEVEL UP) */
(function(){const st=document.createElement('style');st.textContent=`
.rpf,.modal .card.rpf{position:relative;border-style:solid!important;border-width:46px 50px 40px!important;border-image:url(assets/rp_frame.png) 145 150 135 150 stretch!important;border-radius:0!important;background:radial-gradient(ellipse at 50% 30%,#5a1420,#24060c 75%) padding-box!important;box-shadow:none!important;filter:drop-shadow(0 10px 24px #000c)}
.rpray{position:absolute;left:50%;top:50%;width:620px;height:620px;margin:-310px 0 0 -310px;pointer-events:none;z-index:0;background:repeating-conic-gradient(from 0deg,#ffd56a77 0 7deg,#0000 7deg 18deg);-webkit-mask:radial-gradient(circle,#000 8%,#0008 35%,#0000 62%);mask:radial-gradient(circle,#000 8%,#0008 35%,#0000 62%);animation:rwspin 14s linear infinite}
.rpray::after{content:'';position:absolute;inset:30%;border-radius:50%;background:radial-gradient(circle,#ffe7a066,#ff9a2a22 50%,#0000 70%)}
.rwpop .rwbox.rpf{width:290px!important;padding:2px 0 4px!important;margin:0}.rwpop .rwrays{display:none}
.rpic{display:block;height:74px;margin:-62px auto 0;position:relative;z-index:2;filter:drop-shadow(0 0 10px #ffc94a) drop-shadow(0 4px 4px #000a)}
.unl .unb.rpf{width:230px!important;padding:0 0 4px!important;animation:unb .45s cubic-bezier(.2,1.5,.4,1)}
.unl .unb.rpf .rpic{height:64px;margin-top:-56px}.unl .unb.rpf>img:not(.rpic){width:76px!important;height:76px!important}
.unl,.rwpop{isolation:isolate}.unl>.rpray,.rwpop>.rpray{z-index:-1}
.modal .card.rpf{width:300px!important;padding:0 0 6px!important}
.modal .card.rpf .rpcr{display:block;height:46px;margin:-50px auto -4px;position:relative;z-index:2;filter:drop-shadow(0 0 8px #ffd75a)}
.modal .card.rpf>img[src*=boss_dragon]{height:110px!important;filter:drop-shadow(0 0 14px #ff6a2a)}
.banner.rplv{display:flex;align-items:center;justify-content:center;gap:4px}.banner.rplv img{height:44px;filter:drop-shadow(0 0 8px #ffc94a)}
body:is(.hs-scr,#_x.hs_x) #toastQ{bottom:auto!important;top:96px!important;flex-direction:column!important}`;document.head.appendChild(st);
const ray=p=>{if(!p.querySelector(':scope>.rpray'))p.insertAdjacentHTML('afterbegin','<div class=rpray></div>')};
const deco=n=>{if(n.nodeType!=1)return;
 if(n.classList.contains('rwpop')){const b=n.querySelector('.rwbox');if(b&&!b.classList.contains('rpf')){b.classList.add('rpf');b.insertAdjacentHTML('afterbegin',`<img class=rpic src="${A}rp_chest.png">`);ray(n)}}
 else if(n.classList.contains('unl')){const b=n.querySelector('.unb');if(b&&!b.classList.contains('rpf')){b.classList.add('rpf');b.insertAdjacentHTML('afterbegin',`<img class=rpic src="${A}rp_unlock.png">`);ray(n)}}
 else if(n.classList.contains('modal')){const c=n.querySelector(':scope>.card');const im=c&&c.querySelector(':scope>img[src*="boss_dragon"]');if(im&&!c.classList.contains('rpf')){c.classList.add('rpf');ray(n);const t=c.querySelector('.ttl');if(t&&/성공/.test(t.textContent))c.insertAdjacentHTML('afterbegin',`<img class=rpcr src="${A}wb_crown.png">`)}}
 else if(n.classList.contains('banner')&&/^LEVEL UP/.test(n.textContent)&&!n.classList.contains('rplv')){n.classList.add('rplv');n.insertAdjacentHTML('afterbegin',`<img src="${A}rp_lvup.png">`)}};
new MutationObserver(ms=>ms.forEach(r=>r.addedNodes.forEach(n=>{try{deco(n)}catch(_){}}))).observe(document.body,{childList:true,subtree:true})})();

/* v168 battle HUD: stage plate, tidy event-pill row, boss gauge frame */
(function(){const st=document.createElement('style');st.textContent=`
#stagebar::before{content:'';position:absolute;left:-12px;right:-12px;top:-7px;bottom:-5px;background:url(assets/hud_plate.png) center/100% 100% no-repeat;z-index:-1;filter:drop-shadow(0 3px 4px #000a);pointer-events:none}
#stagebar{isolation:isolate;padding:5px 14px 3px!important;width:196px!important;box-sizing:border-box}
#stName{font-size:11.5px!important;color:#ffe2a0!important;text-shadow:0 1px 2px #000}
#evrow{position:absolute;z-index:6;left:70px;width:230px;top:174px;height:24px;display:flex;align-items:center;justify-content:center;gap:2px;pointer-events:none}
#evrow>*{position:relative!important;left:auto!important;top:auto!important;right:auto!important;bottom:auto!important;transform:none!important;margin:0!important;pointer-events:auto;flex:none;height:22px!important;min-width:0!important;box-sizing:border-box;display:inline-flex!important;align-items:center;gap:2px;padding:0 3px!important;border-radius:11px!important;font:900 9.5px Maplestory,'Noto Sans KR',sans-serif!important;color:#fff!important;text-shadow:0 1px 1px #000;white-space:nowrap;
 --pc1:#f2c45a;--pc2:#8a5a14;background:linear-gradient(#3a2614,#1c1008) padding-box,linear-gradient(var(--pc1),var(--pc2)) border-box!important;border:1.5px solid transparent!important;box-shadow:inset 0 1px 0 #ffffff2a,0 2px 3px #0008!important;animation:none!important;width:auto!important}
#evrow>[style*="display: none"],#evrow>[style*="display:none"]{display:none!important}
#evrow>#bufBtn{--pc1:#d6a8ff;--pc2:#5a2a9a;background:linear-gradient(#3a1e5a,#1a0c2a) padding-box,linear-gradient(var(--pc1),var(--pc2)) border-box!important}
#battle #evrow>#whlBtn{font-size:0!important;padding:0 4px!important;width:26px!important;justify-content:center}#battle #evrow>#whlBtn{--pc1:#ffb0d8;--pc2:#a02a6a;background:linear-gradient(#5a1a3a,#2a0a1a) padding-box,linear-gradient(var(--pc1),var(--pc2)) border-box!important}
#evrow img{height:15px!important;width:auto!important;position:static!important;margin:0!important}
#evrow>#bufBtn i{font-style:normal;position:static!important}
#evrow .wico{width:14px!important;height:14px!important;position:static!important;margin:0!important;flex:none}
#evrow .dot,#evrow>.rd::after{position:absolute!important;right:-3px!important;top:-4px!important;left:auto!important;width:9px!important;height:9px!important;margin:0!important}
#battle #evrow>#wntBtn,#battle #evrow>#whlBtn{height:22px!important;min-height:0!important}#evrow>#wntBtn>span{display:flex!important;flex-direction:row!important;gap:2px;align-items:baseline;position:static!important}
#evrow>#wntBtn small{font-size:9px!important;display:none}#evrow>#wntBtn b{font-size:10px!important;color:#ffe08a!important}
#bossFr{position:absolute;z-index:4;left:64px;top:202px;width:224px;height:73px;pointer-events:none;display:none;filter:drop-shadow(0 3px 4px #000a)}
body.bfon #bossFr{display:block}
.banner{translate:0 170px}
.powup{top:300px!important;bottom:auto!important}`;document.head.appendChild(st);
const IDS=['bufBtn','nbBtn','olBtn','svBtn','whlBtn','wntBtn'];
const setup=()=>{const bt=document.getElementById('battle');if(!bt)return setTimeout(setup,300);let r=document.getElementById('evrow');if(!r){r=document.createElement('div');r.id='evrow';bt.appendChild(r)}IDS.forEach(i=>{const e=document.getElementById(i);if(e&&e.parentElement!==r)r.appendChild(e)});if(!document.getElementById('bossFr'))bt.insertAdjacentHTML('beforeend',`<img id=bossFr src="${A}hud_bossbar.png">`)};
setInterval(()=>{setup();const on=!!(C.B&&C.B.boss&&!G.screen&&C.alive&&C.alive().some(e=>e.boss&&!e.wb));document.body.classList.toggle('bfon',on)},400);setup()})();

/* v169 lower battle dock: socket dock for the skill row, parchment mission strip */
(function(){const S=.553,CX=[144,265,385,514,635,755].map(c=>Math.round(195+(c-450)*S));const st=document.createElement('style');st.textContent=`
#skills.skills{bottom:93px!important;left:0!important;right:auto!important;width:390px!important;max-width:none!important;transform:none!important;height:74px!important;display:block!important;gap:0!important;background:url(assets/dock_frame.png) center -52px/497px 168px no-repeat!important;filter:drop-shadow(0 -2px 5px #0009);overflow:visible}
#skills.skills>.sk{position:absolute!important;top:15px!important;bottom:auto!important;width:42px!important;height:42px!important;margin:0!important;border-radius:50%!important;transform:none!important}
${CX.map((x,i)=>`#skills.skills>.sk:nth-child(${i+1}){left:${x-21}px!important}`).join('')}
#skills.skills>.sk.big{box-shadow:0 0 10px #ff6a2a,0 0 0 2px #ffcf6a!important}
#skills.skills>.sk>img{width:100%!important;height:100%!important}
#mission.mission{right:98px!important;height:46px!important;box-sizing:border-box;background:url(assets/dock_mission.png) center/100% 100% no-repeat!important;padding:3px 26px 3px 22px!important;color:#3a2408!important;text-shadow:none!important}
#mission.mission b{color:#7a2a08!important}#mission.mission .f{font-size:11px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#mission.mission .f>*{white-space:nowrap!important}#mission.mission .f,#mission.mission .f *:not(.bar):not(.bar *){color:#3a2408!important;text-shadow:0 1px 0 #f8ecd0!important}
#mission.mission .morb{flex:none;width:34px!important;height:34px!important}
#bctl{bottom:169px!important;right:6px!important;opacity:1!important;gap:4px!important}
#bctl>*{width:42px!important;height:42px!important}
#chat{z-index:8}`;document.head.appendChild(st)})();

/* v170 battle header bar + side-column label tabs */
(function(){const st=document.createElement('style');st.textContent=`
#battle>.hud{background:none!important;isolation:isolate}
#battle>.hud::before{content:'';position:absolute;left:-12px;top:-8px;width:404px;height:82px;background:url(assets/hdr_bar.png) 0 0/100% 100% no-repeat;z-index:-1;pointer-events:none;filter:drop-shadow(0 3px 5px #000a)}
#battle>.hud::after{content:'';position:absolute;left:-12px;top:-8px;width:83.5px;height:82px;background:url(assets/hdr_ring.png) 0 0/100% 100% no-repeat;z-index:3;pointer-events:none}
#battle>.hud .av{border-radius:50%!important;border:none!important;box-shadow:none!important;background:radial-gradient(#5a1a24,#1a0610)!important}
#battle>.hud .prof,#battle>.hud .pinfo{background:none!important;border:none!important;box-shadow:none!important}
#battle>.hud #cGold,#battle>.hud #cGem{background:none!important;border:none!important;box-shadow:none!important;text-shadow:0 1px 2px #000}
#battle>.hud .cur{transform:translateY(16px)}#battle>.hud #menuBtn{transform:translateY(-16px);background:none!important;border:none!important;box-shadow:none!important}
#stName{z-index:2;color:#fff0c8!important;text-shadow:0 0 3px #000,0 1px 2px #000,0 0 6px #000!important}#stagebar::before{top:-3px!important}.side a em{background:url(assets/side_tab.png) center/100% 100% no-repeat!important;padding:3px 7px 1px!important;min-width:34px;box-sizing:border-box;text-align:center;font-size:9.5px!important;line-height:12px;color:#ffe8b0!important;text-shadow:0 1px 1px #000!important;margin-left:auto;margin-right:auto;width:max-content}`;document.head.appendChild(st)})();

/* v171 bottom nav bar + header fixes */
(function(){const st=document.createElement('style');st.textContent=`
#nav.nav{background:url(assets/nav_bar.png) 0 0/390px 76px no-repeat,#140c08!important;border-top:none!important;box-shadow:0 -3px 8px #000a!important}
#nav.nav>a:not(#navroll){background:none!important}
#nav.nav>a:not(#navroll) em{color:#e8d0a0!important;text-shadow:0 1px 2px #000,0 0 3px #000!important;font-size:10.5px!important}
#nav.nav>a.on:not(#navroll){background:radial-gradient(ellipse 60% 55% at 50% 45%,#ffcf6a66,#ff8a2a22 60%,#0000 75%)!important}
#nav.nav>a.on:not(#navroll) img{filter:drop-shadow(0 0 6px #ffc94a)!important;box-shadow:none!important}
#nav.nav>a.on:not(#navroll)::after{content:'';position:absolute;left:10px;right:10px;bottom:1px;height:2px;border-radius:2px;background:linear-gradient(90deg,#0000,#ffd77a,#0000);box-shadow:0 0 6px #ffc94a}
#nav.nav>a.on em{color:#ffe08a!important}

#battle>.hud #menuBtn{transform:translate(-13px,-16px)!important;width:16px!important;min-width:0!important;padding:0!important;font-size:11px!important;overflow:visible}`;document.head.appendChild(st)})();

/* v172 shared non-battle chrome: title bar, panel 9-slice, bronze buttons & chips */
(function(){const st=document.createElement('style');const TH=':not(.bgx):not(.cdx):not(.fsx):not(.glx):not(.pfx):not(.ptx):not(.rlx):not(.skx):not(.stfx):not(.stx):not(.ttx)'+['bond','mail','event','map','base','skin','summon'].map(k=>`:not([data-scr=${k}])`).join('');
st.textContent=`
#screen .shead{background:none!important;border-bottom:none!important;box-shadow:none!important;isolation:isolate}
#screen .shead::before{content:'';position:absolute;left:-12px;top:-5px;width:402px;height:72px;background:url(assets/ui_titlebar.png) 0 0/100% 100% no-repeat;z-index:-1;pointer-events:none;filter:drop-shadow(0 3px 5px #000b)}
#screen .shead .back{width:30px!important;height:30px!important;margin:3px 0 0 3px;background:radial-gradient(#3a1a14,#140806)!important;border:none!important;box-shadow:inset 0 0 6px #000!important;color:#ffd890!important}
#screen .shead b{color:#ffe6b0!important}
#screen .shead .chip{background:linear-gradient(#2a1a10,#140a06)!important;border:1px solid #8a6a3a!important;box-shadow:inset 0 1px 0 #ffffff1a!important}
#screen${TH} .sbody .card:not(.pac0){background:none!important;border-style:solid!important;border-width:10px!important;border-image:url(assets/ui_panel.png) 30 fill stretch!important;border-radius:0!important;box-shadow:0 4px 10px #0008!important;padding:4px 4px!important}
#screen${TH} .sbody .pill:not(.off),#screen${TH} .sbody .btn{border:1.5px solid #d8b060!important;box-shadow:inset 0 1px 0 #fff6,inset 0 -2px 0 #0006,0 2px 3px #0008!important;text-shadow:0 1px 1px #000a}
#screen${TH} .sbody .card .row{background:rgba(24,12,6,.5)!important;border-color:#6a4a24!important}#screen${TH} .entabs span,#screen${TH} .duntabs span{background:linear-gradient(#3a2614,#1c1008)!important;border:1.5px solid #8a6a3a!important;box-shadow:inset 0 1px 0 #ffffff22!important;color:#e8d0a0!important}
#screen${TH} .entabs span.on,#screen${TH} .duntabs span.on{background:linear-gradient(#f2d080,#b07a2a)!important;border-color:#ffe9a8!important;color:#2a1600!important;box-shadow:0 0 8px #ffc94a88,inset 0 1px 0 #fff8!important}`;document.head.appendChild(st);
const mark=()=>{const s=document.getElementById('screen');if(s&&s.dataset.scr!==(G.screen||''))s.dataset.scr=G.screen||''};setInterval(mark,150);
new MutationObserver(mark).observe(document.getElementById('screen'),{childList:true})})();

/* v173 generic popup base (panel frame + ribbon) and bronze toast capsule */
(function(){const st=document.createElement('style');st.textContent=`
.modal .card:not(.ppx):not(.rpf){background:none!important;border-style:solid!important;border-width:12px!important;border-image:url(assets/ui_panel.png) 30 fill stretch!important;border-radius:0!important;box-shadow:0 10px 30px #000c!important;padding:30px 12px 10px!important;position:relative}
.modal .card:not(.ppx):not(.rpf)>.ttl:first-child{position:relative;margin:-50px -6px 8px!important;height:58px;display:flex!important;align-items:center;justify-content:center;padding:10px 20px 0!important;background:url(assets/ui_ribbon.png) center/100% 100% no-repeat!important;color:#ffe6b0!important;text-shadow:0 1px 2px #000,0 0 6px #000!important;font-size:16px!important}
.modal .card:not(.ppx):not(.rpf) small{color:#e8d8c0}
.toast{background:linear-gradient(#4a321a,#22140a)!important;border:1.5px solid #d8b060!important;border-radius:20px!important;box-shadow:inset 0 1px 0 #fff4,inset 0 -2px 0 #0007,0 0 0 2px #2a1808,0 4px 10px #000a!important;color:#ffeccc!important;text-shadow:0 1px 1px #000!important}`;document.head.appendChild(st)})();

/* v174 menu grid + bottom sheets: panel frame, ribbon head, CSS bronze rim with grab notch, frameless icons with press glow */
(function(){const st=document.createElement('style');st.textContent=`
#menuPop .mbox,#sheet{background:none!important;border-style:solid!important;border-width:12px!important;border-image:url(assets/ui_panel.png) 30 fill stretch!important;border-radius:0!important;box-shadow:0 -4px 16px #000c!important;overflow:visible!important}
#menuPop .mbox::before,#sheet::before{content:'';position:absolute;left:-12px;right:-12px;top:-15px;height:7px;border-radius:6px 6px 0 0;background:linear-gradient(#f2d080,#a8782e 45%,#5a3a14);box-shadow:0 1px 0 #2a1808,0 -1px 3px #000a;pointer-events:none;z-index:2}
#menuPop .mbox::after,#sheet::after{content:'';position:absolute;left:50%;top:-19px;width:54px;height:11px;margin-left:-27px;border-radius:7px;background:linear-gradient(#5a3a14,#2a1808);border:1.5px solid #e0b860;box-shadow:inset 0 2px 3px #000a,0 2px 3px #000a;pointer-events:none;z-index:3}
#menuPop .sheethead,#sheet .sheethead{background:url(assets/ui_ribbon.png) center/200px 100% no-repeat!important;border:none!important;box-shadow:none!important;height:46px;margin:-4px 0 6px!important;display:flex;align-items:center;justify-content:center;position:relative}
#menuPop .sheethead b,#sheet .sheethead b{color:#ffe6b0!important;text-shadow:0 1px 2px #000,0 0 6px #000!important;font-size:15px!important;padding-top:4px}
#menuPop .xbtn,#sheet .xbtn{position:absolute!important;right:2px;top:8px}
#sheet .card,#sheet .row{background:rgba(24,12,6,.5)!important;border-color:#6a4a24!important}#todoBar{background:rgba(24,12,6,.55)!important;border:1px solid #6a4a24!important;border-radius:8px!important}
#todoBar .tdc{background:linear-gradient(#4a321a,#22140a)!important;border:1.5px solid #d8b060!important;color:#ffeccc!important;box-shadow:inset 0 1px 0 #fff3,0 1px 2px #000a!important}
#mgrid a{background:none!important;border:none!important;box-shadow:none!important;transition:transform .08s}
#mgrid a img{transition:filter .12s,transform .08s}
#mgrid a:active img,#mgrid a.prs img{transform:scale(.92);filter:drop-shadow(0 0 7px #ffc94a) brightness(1.12)}
#mgrid a em{color:#ffe6b0!important;text-shadow:0 1px 2px #000!important}`;document.head.appendChild(st);
document.addEventListener('pointerdown',e=>{const a=e.target.closest&&e.target.closest('#mgrid a');if(a){a.classList.add('prs');setTimeout(()=>a.classList.remove('prs'),180)}},true)})();

/* v175 battle feel: loot lands in header gold slot / nav orb with a pulse; skill-ready socket flash (visual only, off when effects off) */
(function(){const st=document.createElement('style');st.textContent=`
@keyframes slotglow{0%{box-shadow:0 0 0 0 #ffd77a00}35%{box-shadow:0 0 10px 3px #ffd77acc}100%{box-shadow:0 0 0 0 #ffd77a00}}
#battle>.hud #cGold.lpop{animation:cpop .25s ease-out,slotglow .45s ease-out;border-radius:10px!important}
#navroll .cnt.lpop{animation:cpop .25s ease-out}
@keyframes skring{0%{transform:scale(.8);opacity:1;border-width:3px}100%{transform:scale(1.55);opacity:0;border-width:1px}}
@keyframes skflash{0%{opacity:.9}100%{opacity:0}}
@keyframes skglow{0%{filter:drop-shadow(0 0 2px #ffd77a) brightness(1.5)}30%{filter:drop-shadow(0 0 12px #ffd77a) brightness(1.3)}100%{filter:none}}@keyframes skin{0%{box-shadow:inset 0 0 0 4px #fff2b0,inset 0 0 16px #ffc94a;opacity:1}100%{box-shadow:inset 0 0 0 1px #ffd77a,inset 0 0 4px #ffc94a;opacity:0}}#skills .sk.rdyfx{animation:skglow .7s ease-out}#skills .sk.rdyfx::after{content:'';position:absolute;inset:0;border-radius:50%;animation:skin .6s ease-out forwards;pointer-events:none;z-index:5}body.fxoff #skills .sk.rdyfx{animation:none}
#skills .sk.rdyfx::before{content:'';position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,#fff6d0cc,#ffc94a55 50%,#0000 70%);animation:skflash .4s ease-out forwards;pointer-events:none;z-index:4}
body.fxoff #skills .sk.rdyfx::after,body.fxoff #skills .sk.rdyfx::before{display:none}`;document.head.appendChild(st);
const fxOn=()=>!R.opt||R.opt.fx!==false;
const pulse=e=>{if(!e)return;G.bump(e,'lpop')};
let lastG=0,lastO=0;const prev=R.onCoin;
R.onCoin=k=>{const now=performance.now();if(k=='orb'){if(fxOn()&&now-lastO>90){lastO=now;pulse(document.querySelector('#navroll .cnt'))}return}
 if(!fxOn()){prev&&prev(k);return}if(now-lastG>90){lastG=now;pulse(document.getElementById('cGold'))}};
const was=new WeakMap();setInterval(()=>{document.body.classList.toggle('fxoff',!fxOn());if(G.screen)return;document.querySelectorAll('#skills .sk').forEach(el=>{const r=el.classList.contains('ready');if(r&&was.get(el)===false&&fxOn()){el.classList.remove('rdyfx');void el.offsetWidth;el.classList.add('rdyfx');setTimeout(()=>el.classList.remove('rdyfx'),750)}was.set(el,r)})},100)})();

/* v176 boss drama: quarter-HP phase beats, BREAK payoff (render-only brief slow-mo; sim timing untouched) */
(function(){const st=document.createElement('style');st.textContent=`
#phv{position:absolute;inset:0;z-index:9;pointer-events:none;opacity:0;box-shadow:inset 0 0 60px 18px #ff2a1a}
#phv.on{animation:phv .7s ease-out}#phv.brk{box-shadow:inset 0 0 70px 22px #ffc94a}
@keyframes phv{0%{opacity:0}20%{opacity:.9}100%{opacity:0}}
.phx{position:absolute;z-index:9;left:50%;top:288px;transform:translateX(-50%);pointer-events:none;font:900 13px Maplestory,'Noto Sans KR',sans-serif;color:#ffe2a0;padding:3px 14px;border-radius:12px;background:linear-gradient(90deg,#0000,#3a0a0ae6 20%,#3a0a0ae6 80%,#0000);text-shadow:0 1px 2px #000;white-space:nowrap;animation:phx 1.1s ease-out forwards}
@keyframes phx{0%{opacity:0;transform:translate(-50%,6px)}15%{opacity:1;transform:translate(-50%,0)}75%{opacity:1}100%{opacity:0}}
@keyframes cvshk{0%,100%{transform:none}25%{transform:translate(3px,-2px)}50%{transform:translate(-3px,2px)}75%{transform:translate(2px,1px)}}
#battle canvas.bdshk{animation:cvshk .22s linear}`;document.head.appendChild(st);
const fx=()=>!R.opt||R.opt.fx!==false;
const veil=c=>{const bt=document.getElementById('battle');if(!bt)return;let v=document.getElementById('phv');if(!v){v=document.createElement('div');v.id='phv';bt.appendChild(v)}v.className='';void v.offsetWidth;v.className=c};
G._phase=q=>{if(G.screen||!fx())return;const pct=q*25;veil('on');if(C.B.tele)return;const bt=document.getElementById('battle');document.querySelectorAll('.phx').forEach(x=>x.remove());const d=document.createElement('div');d.className='phx';d.textContent='보스 남은 체력 '+pct+'%';bt.appendChild(d);setTimeout(()=>d.remove(),1150);
 if(R.opt&&R.opt.shake){const c=bt.querySelector('canvas');if(c){c.classList.remove('bdshk');void c.offsetWidth;c.classList.add('bdshk');setTimeout(()=>c.classList.remove('bdshk'),260)}}};
let vs=0;const og=C.ev.grog;C.ev.grog=(...a)=>{og&&og(...a);if(G.screen||!fx())return;veil('on brk');if(!R.opt||R.opt.cut!==false)vs=.35};
const of=R.frame;R.frame=dt=>{if(vs>0){vs-=dt;return of(dt*.4)}return of(dt)}})();

/* v177 companion feel: portrait cast flash when a companion ultimate fires (visual only) */
(function(){const st=document.createElement('style');st.textContent=`
@keyframes ppcast{0%{filter:brightness(2.2) drop-shadow(0 0 10px #ffe08a)}100%{filter:none}}
#partycol .pp.cfl img{animation:ppcast .6s ease-out}
.pptag{position:absolute;z-index:8;pointer-events:none;font:900 10.5px Maplestory,'Noto Sans KR',sans-serif;color:#fff0c8;padding:2px 9px 2px 7px;white-space:nowrap;background:linear-gradient(90deg,#5a1a10ee,#3a0a08cc 80%,#0000);border-left:2px solid #ffd77a;text-shadow:0 1px 2px #000;animation:pptag 1.4s ease-out forwards}
@keyframes pptag{0%{opacity:0;transform:translateX(-8px)}12%{opacity:1;transform:none}75%{opacity:1}100%{opacity:0}}`;document.head.appendChild(st);
const fx=()=>!R.opt||R.opt.fx!==false;const was=new Map();
setInterval(()=>{const B=C.B;if(!B||!B.allies)return;const pp=document.querySelectorAll('#partycol .pp');B.allies.forEach((a,i)=>{const p=was.get(a.k)||0,u=a._ug||0;was.set(a.k,u);
 if(p>=1&&u<.05&&!G.screen&&fx()&&pp[i]&&(D.CSKI||{})[a.k]){const el=pp[i];el.classList.remove('cfl');void el.offsetWidth;el.classList.add('cfl');setTimeout(()=>el.classList.remove('cfl'),650)}})},60)})();

/* v178: notice popup uses shared bronze panel + ribbon (visual only) */
(()=>{const st=document.createElement('style');st.textContent=`
#notice .ntc{background:none!important;border-style:solid!important;border-width:12px!important;border-image:url(assets/ui_panel.png) 30 fill stretch!important;border-radius:0!important;box-shadow:0 10px 30px #000c!important;padding:30px 10px 8px!important;width:350px}
#notice .nth{margin:-50px -4px 8px;height:58px;display:flex;align-items:center;justify-content:center;padding-top:10px;background:url(assets/ui_ribbon.png) center/100% 100% no-repeat;color:#ffe6b0;text-shadow:0 1px 2px #000,0 0 6px #000}
#notice .ntx{position:absolute;right:-14px;top:-4px;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff3d6;background:radial-gradient(circle at 40% 35%,#a8423a,#5a1712);border:2px solid #d9a85a;box-shadow:0 2px 4px #000a}
#notice .ntb{border:2px solid #b8894a;box-shadow:inset 0 0 0 1px #3a2210,0 2px 6px #0008}
#notice .ntdot i{background:#6a5440}#notice .ntdot i.on{background:#ffd75a}
#notice .ntgo{border:2px solid #e8c47a;box-shadow:0 2px 0 #1e5a2a,0 3px 6px #0008}
#notice .ntn{color:#e8d8c0}`;document.head.appendChild(st)})();

/* v179: chat panel in shared bronze sheet style (visual only) */
(()=>{const st=document.createElement('style');st.textContent=`
#chatP .chb{background:none!important;border-style:solid!important;border-width:12px 12px 0!important;border-image:url(assets/ui_panel.png) 30 30 0 fill stretch!important;border-radius:0!important;box-shadow:0 -4px 16px #000c!important;overflow:visible}
#chatP .chb::before{content:'';position:absolute;left:-12px;right:-12px;top:-15px;height:7px;border-radius:6px 6px 0 0;background:linear-gradient(#f2d080,#a8782e 45%,#5a3a14);box-shadow:0 1px 0 #2a1808,0 -1px 3px #000a;pointer-events:none;z-index:2}
#chatP .chb::after{content:'';position:absolute;left:50%;top:-19px;width:54px;height:11px;margin-left:-27px;border-radius:7px;background:linear-gradient(#5a3a14,#2a1808);border:1.5px solid #e0b860;box-shadow:inset 0 2px 3px #000a,0 2px 3px #000a;pointer-events:none;z-index:3}
#chatP .cht span{background:linear-gradient(#4a321a,#22140a);border:1.5px solid #8a6a3a;color:#e8d8c0}
#chatP .cht span.on{background:linear-gradient(#ffe08a,#c8902e);border-color:#fff0b0;color:#3a2000}
#chatP .chx{width:26px;height:26px;padding:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;color:#fff3d6;background:radial-gradient(circle at 40% 35%,#a8423a,#5a1712);border:2px solid #d9a85a}
#chatP .chl{background:rgba(24,12,6,.5);border:1px solid #6a4a24;border-radius:8px;margin:2px 4px}
#chatP .chl span{color:#f0e4d0}
#chatP .chi input{background:#1a0e06;border:1.5px solid #8a6a3a;color:#ffeccc}
#chatP #chGo{border:2px solid #e8c47a}`;document.head.appendChild(st)})();

/* v180: battlefield labels — WAVE banner in bronze/gold (visual only; 대기/증원 capsule in render.js) */
(()=>{const st=document.createElement('style');st.textContent=`
.wvb:not(.fin):not(.tgb) b{color:#fff4dc;text-shadow:0 2px 0 #3a2008,0 0 10px #e0a040,0 0 2px #000}
.wvb:not(.fin) i{height:2px;width:60px;background:linear-gradient(90deg,transparent,#e8c070,transparent)}`;document.head.appendChild(st)})();

/* v182: skill-dock radial cooldown sweep (visual only; reads existing .cd height) */
(()=>{const st=document.createElement('style');st.textContent=`
#skills .sk .cd{opacity:0!important}
#skills .sk .cdsw{position:absolute;inset:0;border-radius:50%;pointer-events:none;z-index:1;background:conic-gradient(from 0deg,#0000 0 calc(360deg - var(--cdp,0)*3.6deg),#0a0604c8 0 360deg)}
#skills .sk .cdsw.on::after{content:'';position:absolute;inset:0;border-radius:50%;background:conic-gradient(from calc(360deg - var(--cdp,0)*3.6deg - 10deg),#0000 0,#ffcf6a99 10deg,#0000 12deg)}
body.nofx #skills .sk .cdsw.on::after{display:none}
#skills .sk .t{z-index:2;color:#ffe9b0;-webkit-text-stroke:3px #2a1406;paint-order:stroke fill;text-shadow:0 1px 2px #000;font-size:15px!important}`;document.head.appendChild(st);
const up=()=>{const fx=!(typeof R!=="undefined"&&R.opt&&R.opt.fx===false);document.body.classList.toggle('nofx',!fx);document.querySelectorAll('#skills .sk').forEach(el=>{let w=el.querySelector('.cdsw');if(!w){w=document.createElement('i');w.className='cdsw';el.appendChild(w)}const c=el.querySelector('.cd'),p=el.classList.contains('lock')||!c?0:(el._cdp!==undefined?el._cdp:parseFloat(c.style.height)||0);const v=String(Math.round(p*10)/10);if(w.style.getPropertyValue('--cdp')!==v)w.style.setProperty('--cdp',v);w.classList.toggle('on',p>0&&p<100)})};
setInterval(up,100)})();

/* v187: stage route on the header bar — 7 nodes, party marker, chapter boss icon (visual only) */
(()=>{const st=document.createElement('style');st.textContent=`
#stagebar .srow .bar{position:relative!important}
#stagebar .srow{position:relative!important}#strt{position:absolute!important;pointer-events:none!important;z-index:3!important}
#strt .nd{position:absolute!important;top:50%!important;width:7px!important;height:7px!important;margin:-3.5px 0 0 -3.5px!important;border-radius:50%!important;background:#2a1a0c!important;border:1.2px solid #a8844a!important;box-sizing:border-box!important}
#strt .nd.dn{background:radial-gradient(circle at 40% 35%,#fff2b0,#e0a030)!important;border-color:#fff0c0!important}
#strt .nd.cu{width:9px!important;height:9px!important;margin:-4.5px 0 0 -4.5px!important;background:#ffd75a!important;border-color:#fff!important;box-shadow:0 0 5px #ffcf5a!important;animation:strp 1s ease-in-out infinite alternate!important}
#strt .nd.bs{border-color:#ff6a4a!important}
#strt .pm{position:absolute!important;top:50%!important;margin-top:-7px!important;width:14px!important;height:14px!important;margin-left:-7px!important;border-radius:50%!important;background:url(assets/hero_lina.png) center 12%/180% auto no-repeat,#5a1a14!important;border:1.5px solid #ffe08a!important;box-shadow:0 1px 3px #000a!important;transition:left .6s ease!important}
#strt .nd.fl{animation:stfl .9s ease-out!important}@keyframes stfl{0%{transform:scale(2.4);box-shadow:0 0 0 6px #fff8,0 0 14px #ffd75a}100%{transform:scale(1);box-shadow:0 0 0 0 #fff0}}@keyframes strp{to{box-shadow:0 0 9px #ffcf5a}}
body.bossfight #strt{display:none!important}`;document.head.appendChild(st);
let last='';const up=()=>{try{const bar=document.querySelector('#stagebar .srow .bar');if(!bar)return;const row=bar.parentElement;let r=row.querySelector('#strt');const s=G.S(),si=s.si,ch=Math.floor(si/7),pl=D.BOSSPLAN[ch];if(!pl){if(r)r.remove();return}
 const n=7,cur=si%7;if(!r){r=document.createElement('div');r.id='strt';row.appendChild(r);last=''}{/* r237 perf: bar geometry read only inside a ResizeObserver callback (layout already clean), never forcing sync layout from the 300ms timer */const geo=()=>{const cs=`left:${bar.offsetLeft}px!important;top:${bar.offsetTop}px;width:${bar.offsetWidth}px;height:${bar.offsetHeight}px`;if(r._cs!==cs){r._cs=cs;r.style.cssText=cs}};if(r._rb!==bar){r._rb=bar;if(r._ro)r._ro.disconnect();if(window.ResizeObserver){r._ro=new ResizeObserver(geo);r._ro.observe(bar);r._ro.observe(row)}else geo()}}
 const key=si+'|'+s.maxSi;if(key!==last){last=key;let h='';for(let k=0;k<n;k++){const ex=ch*7+k;const cls=k===cur?'cu':ex<s.maxSi?'dn':'';h+=`<span class="nd ${cls}${k===n-1?' bs':''}" style="left:${(4+k*92/(n-1)).toFixed(1)}%"></span>`}r.innerHTML=h+'<span class=pm></span>';
  const bo=D.BOSSES[pl[1]]||D.BOSSES[pl[0]],im=document.querySelector('#stagebar .sboss');if(bo&&im&&!im.src.endsWith(bo.img))im.src='assets/'+bo.img}
 const w=parseFloat((document.getElementById('stBar')||{}).style?.width)||0,fr=C.B&&C.B.boss?1:Math.min(1,w/100);const pos=4+(cur+Math.min(.92,fr)*(cur<n-1?1:0))*92/(n-1);const mk=r.querySelector('.pm');if(mk)mk.style.left=Math.min(96,pos).toFixed(1)+'%'}catch(_){}};
setInterval(up,300)})();

/* v188: victory moment — party hop + sparkle on win (visual only; within clear card time) */
(()=>{const go=()=>{const fx=!(R.opt&&R.opt.fx===false);R.cheer={t:0,id:(R._chid=(R._chid||0)+1),fx};if(!fx)return;const s=C.S(),ch=Math.floor(s.si/7),ci=(s.maxSi-1)-ch*7;const nd=document.querySelectorAll('#strt .nd')[ci];if(nd&&ci>=0){nd.classList.remove('fl');void nd.offsetWidth;nd.classList.add('fl')}};
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{if(w&&!C.B.br&&!C.B.rb&&!G.screen){const d=[...document.querySelectorAll('.vic.win')].pop();let n=0;const wt=()=>{if(++n>60)return;if(!d||!d.isConnected||d.classList.contains('out'))go();else setTimeout(wt,80)};setTimeout(wt,80)}}catch(_){}return r}})();

/* v189: slim "N-N 이동" card to a compact stage-name banner (header route keeps the dots) */
(()=>{const st=document.createElement('style');st.textContent=`
.stmv{top:246px!important;width:auto!important;min-width:150px;max-width:260px;padding:4px 16px 5px!important;border-radius:6px!important;background:linear-gradient(90deg,#0000,#2a1608e6 14%,#2a1608e6 86%,#0000)!important;border:0!important;border-top:1px solid #d8b0607a!important;border-bottom:1px solid #d8b0607a!important;box-shadow:none!important;white-space:nowrap}
.stmv .pth{display:none!important}
.stmv h4{font-size:14px!important;margin:0!important}
.stmv p{margin:0!important;font-size:10px!important;opacity:.8}`;document.head.appendChild(st)})();

/* v190: centre-lane queue — one centre banner at a time; later ones wait and then play their full animation (nothing removed or shortened) */
(()=>{const SEL='.wvb,.fevban,.stban,.tdmg,.mkb,.enrb';let act=null,actEnd=0;const Q=[];
const dur=el=>{const cs=getComputedStyle(el);const p=s=>s.split(',').map(x=>parseFloat(x)*(x.includes('ms')?1:1000)||0);const d=p(cs.animationDuration),dl=p(cs.animationDelay);let m=0;d.forEach((v,i)=>m=Math.max(m,v+(dl[i]||0)));return Math.max(600,m)};
const start=(el,par,clone)=>{if(clone){(par&&par.isConnected?par:document.querySelector('#battle')||document.body).appendChild(el)}const d=dur(el);act=el;actEnd=performance.now()+d+60;if(clone)setTimeout(()=>{if(el.isConnected)el.remove()},d+60)};
const XS='.mkb,.fevban,.enrb',xb=()=>!!(R._dtTop2||document.querySelector('#battle .phx,#battle .combo:not(.cbq):not(.cbo)'))/* r308: the mid-field kill / FEVER / 광폭화 banners also wait (max 2.5s) while the boss HP notice, the ally skill strip or a skill-cast banner holds the band */;
const pump=()=>{if(act&&(act.isConnected&&performance.now()<actEnd))return;act=null;if(Q.length&&Q[0].x&&xb()&&performance.now()-Q[0].t0<2500)return;const n=Q.shift();if(n){if(performance.now()-n.t0>3000){let c=0;for(let j=Q.length-1;j>=0;j--)if(Q[j].k===n.k){Q.splice(j,1);c++}if(c){const b=n.el.querySelector('b')||n.el;b.insertAdjacentHTML('beforeend',`<em class=qx>×${c+1}</em>`)}}start(n.el,n.par,true);}};
setInterval(pump,80);G._cBusy=()=>!!(act&&act.isConnected&&performance.now()<actEnd)||Q.length>0;{const st=document.createElement('style');st.textContent='.qx{font-style:normal;font-size:.6em;margin-left:6px;color:#ffe08a;vertical-align:middle}';document.head.appendChild(st)}
new MutationObserver(ms=>{for(const m of ms)for(const el of m.addedNodes){if(!(el instanceof HTMLElement)||!el.matches(SEL)||el._q)continue;el._q=1;
 const ex=el.matches(XS);if((act&&act.isConnected&&performance.now()<actEnd)||(ex&&xb())){const c=el.cloneNode(true);c._q=1;const par=el.parentNode;el.style.visibility='hidden';el.remove();Q.push({el:c,par,t0:performance.now(),k:SEL.split(',').find(x=>el.matches(x)),x:ex})}else start(el,el.parentNode,false)}}).observe(document.body,{childList:true,subtree:true})})();

/* v191: slot under the centre lane for WAVE CLEAR text; waits (max 1.5s) while a centre banner shows */
(()=>{new MutationObserver(ms=>{for(const m of ms)for(const el of m.addedNodes){if(!(el instanceof HTMLElement)||!el.classList.contains('wclr')||el._s)continue;el._s=1;const b=el.querySelector('b');if(!b)continue;
 const par=el.parentNode;const tb=b.cloneNode(true);b.remove();tb.className='wcs';const show=()=>{const h=document.createElement('div');h.className='wcsl';h.appendChild(tb);(par&&par.isConnected?par:document.querySelector('#battle')).appendChild(h);setTimeout(()=>h.remove(),1000)};
 let w=0;const go=()=>{if(((R.slotBusy&&R.slotBusy('wc',w/1000))||document.querySelector('.wcsl'))&&w<6000){w+=100;setTimeout(go,100)}else show()};go()}}).observe(document.body,{childList:true,subtree:true});
 const st=document.createElement('style');st.textContent=`.wcsl{position:absolute;left:50%;top:392px;transform:translateX(-50%);z-index:7;pointer-events:none}.wcsl .wcs{position:static!important;left:auto!important;transform:none!important;display:block}`;document.head.appendChild(st)})();

;(()=>{/* v192 설정 · 그래픽 품질 (자동 / 고화질 / 절약) — visual/perf only */
const R=window.RENDER;if(!R||!R.setQuality)return;const S=()=>G.loadSet();const M=[['auto','자동'],['high','고화질'],['save','절약']];
const apply=()=>{const m=S().gq||'auto';try{R.setQuality(m)}catch(_){}};setTimeout(apply,0);
const info=()=>{const m=S().gq||'auto',d=R.dprLvl?R.dprLvl():1,q=R.qLvl||0;return m==='auto'?`기기 성능에 맞춰 자동 조절 · 현재 해상도 ×${d}${q?` · 절감 ${q}단계`:''}`:m==='high'?`항상 최고 해상도 ×${d} · 자동 절감 끔`:`해상도 ×1 · 입자/외곽선 절감 · 배터리 절약`};
const st=document.createElement('style');st.textContent=`.gqseg{display:flex;gap:4px;background:#0006;border:1px solid #8a6a3a;border-radius:14px;padding:2px}.gqseg span{padding:4px 9px;border-radius:11px;font:700 11px "Noto Sans KR",sans-serif;color:#d8c09a;cursor:pointer}.gqseg span.on{background:linear-gradient(#ffd877,#e09a2a);color:#3a1a04;box-shadow:0 1px 0 #fff8 inset}.gqinfo{display:block;margin-top:2px;color:#bfae8e;font-size:10.5px}#screen .stpaper .card .row b,#screen .stpaper .card .row *:not(.pill):not(.pill *):not(.tog):not(.tog *):not(.gqseg):not(.gqseg *):not(small){color:#f1dfba!important;text-shadow:0 1px 1px #000c!important}#screen .stpaper .card .row small,#screen .stpaper .card .row small *{color:#c9b48e!important;text-shadow:0 1px 1px #000a!important;opacity:1!important}#screen .stpaper .gqseg span{color:#d8c09a!important}#screen .stpaper .gqseg span.on{color:#3a1a04!important}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='settings'){const dm=document.querySelector('#screen [data-set="dmg"]');const row=dm&&dm.closest('.row');if(row&&!document.getElementById('gqrow')){const m=S().gq||'auto';row.insertAdjacentHTML('afterend',`<div class=row id=gqrow><div class=f><b>그래픽 품질</b><small class=gqinfo id=gqinfo>${info()}</small></div><div class=gqseg>${M.map(([k,n])=>`<span data-gq=${k} class="${k==m?'on':''}">${n}</span>`).join('')}</div></div>`);
 document.querySelectorAll('#gqrow [data-gq]').forEach(b=>b.onclick=()=>{const s=S();s.gq=b.dataset.gq;localStorage.setItem('slayers_set',JSON.stringify(s));apply();document.querySelectorAll('#gqrow [data-gq]').forEach(x=>x.classList.toggle('on',x===b));const i=document.getElementById('gqinfo');if(i)i.textContent=info()})}}}catch(_){}return r};
setInterval(()=>{const i=document.getElementById('gqinfo');if(i){const t=info();if(i.textContent!==t)i.textContent=t}},1000);
})();

/* r237 perf: animation replay without forced reflow (alternate identical _b copies of the CSS rules), and cached layout rects for per-kill effects */
(()=>{const CL=['gbump','lpop'];let made=0;const mk=()=>{if(made)return;const names=new Set(),ins=[];for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(_){continue}for(const r of rs){if(r.type===1&&CL.some(c=>new RegExp('\\.'+c+'(?![\\w-])').test(r.selectorText))){let sel=r.selectorText,txt=r.style.cssText;CL.forEach(c=>sel=sel.replace(new RegExp('\\.'+c+'(?![\\w-])','g'),'.'+c+'_b'));const an=r.style.animationName;if(an&&an!=='none')an.split(',').map(x=>x.trim()).forEach(n=>{names.add(n);txt=txt.replace(new RegExp('(^|[\\s,:])'+n+'(?![\\w-])','g'),'$1'+n+'_b')});ins.push(sel+'{'+txt+'}')}}}for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(_){continue}for(const r of rs)if(r.type===7&&names.has(r.name))ins.push(r.cssText.replace(/^@keyframes\s+[\w-]+/,'@keyframes '+r.name+'_b'))}const st=document.createElement('style');st.id='replayB';st.textContent=ins.join('\n');document.head.append(st);made=1;G._replayRules=ins.length};G.replay=(el,c)=>{if(!el)return;mk();const b=c+'_b';if(el.classList.contains(c)){el.classList.remove(c);el.classList.add(b)}else{el.classList.remove(b);el.classList.add(c)}};const RC=new WeakMap;let gen=0;addEventListener('resize',()=>gen++);G.rc=el=>{const now=performance.now();let v=RC.get(el);if(!v||v.g!==gen||now-v.t>1000){v={r:el.getBoundingClientRect(),t:now,g:gen};RC.set(el,v)}return v.r}})();
/* r237 perf: battle canvas client size from ResizeObserver (same values; avoids ~20 forced style+layout reads per frame in overlay wrappers) */
(()=>{const cv=document.querySelector('#cv');if(!cv||!window.ResizeObserver)return;const dW=Object.getOwnPropertyDescriptor(Element.prototype,'clientWidth'),dH=Object.getOwnPropertyDescriptor(Element.prototype,'clientHeight');let w=dW.get.call(cv),h=dH.get.call(cv),ok=1;new ResizeObserver(()=>{w=dW.get.call(cv);h=dH.get.call(cv)}).observe(cv);Object.defineProperty(cv,'clientWidth',{configurable:true,get(){return ok?w:dW.get.call(cv)}});Object.defineProperty(cv,'clientHeight',{configurable:true,get(){return ok?h:dH.get.call(cv)}});G._cvRO=()=>[w,h,dW.get.call(cv),dH.get.call(cv)]})();
/* r237 perf: decode companion art ahead of time (idle, one per slice) so gacha/party results don't decode on the click frame */
(()=>{const ric=window.requestIdleCallback||(f=>setTimeout(()=>f({timeRemaining:()=>8}),200));G._pre=[];const q=()=>[...new Set(D.COMPS.map(c=>c.img))].map(s=>'assets/'+s);let L=null,i=0;const step=()=>{if(!L)L=q();if(i>=L.length)return;const im=new Image();im.src=L[i++];G._pre.push(im);(im.decode?im.decode():Promise.resolve()).catch(()=>{}).finally(()=>ric(step,{timeout:3000}))};setTimeout(()=>ric(step,{timeout:3000}),6000)})();
/* r237 perf: CSS :has() replaced by body state classes. A :has() on body/html made every class flip of 'on' (skill cooldowns, nav dots) restyle the whole document (~290 elements, ~7ms at 4x, 2-3x per frame). */
(()=>{const B=document.body;if(!B)return;let q=0;const sync=()=>{q=0;const sc=document.getElementById('screen'),sh=document.getElementById('sheet'),mp=document.getElementById('menuPop'),T=[['hs-scr',!!(sc&&sc.classList.contains('on'))],['hs-sh',!!(sh&&sh.classList.contains('on'))],['hs-mp',!!(mp&&mp.classList.contains('on'))],['hs-mod',!!B.querySelector('.modal')],['hs-rw',!!B.querySelector('.rwpop')],['hs-nt',!!document.getElementById('notice')],['hs-sty',!!B.querySelector('.sty')],/* r368 perf: the last body:has() rules (bwarn, combo banner, modal) moved onto state classes too - they were restyling ~200 elements every frame */['hs-bw',!!B.querySelector('.bwarn.bw2:not(.out)')],['hs-cb',!!B.querySelector('#battle .combo:not(.cbq):not(.cbo)')],['hs-cbo',!!B.querySelector('#battle .combo.dlo:not(.cbq):not(.cbo)')],['hs-cbw',!!B.querySelector('#battle .combo.dlw:not(.cbq):not(.cbo)')]];for(const [c,v] of T)if(B.classList.contains(c)!==v)B.classList.toggle(c,v)};G.hsSync=sync;const kick=L=>{if(q)return;for(const m of L){if(m.type==='attributes'){const t=m.target,o=m.oldValue||'';if(t.id==='screen'||t.id==='sheet'||t.id==='menuPop'||(t.classList&&(t.classList.contains('bwarn')||t.classList.contains('combo')||t.classList.contains('modal')))||o.indexOf('bwarn')>=0||o.indexOf('combo')>=0||o.indexOf('modal')>=0){q=1;break}}else{for(const n of m.addedNodes)if(n.nodeType===1){q=1;break}if(!q)for(const n of m.removedNodes)if(n.nodeType===1){q=1;break}if(q)break}}if(q)sync()};new MutationObserver(kick).observe(B,{subtree:true,childList:true,attributes:true,attributeFilter:['class'],attributeOldValue:true});sync()})();

/* v194: uncluttered boss field — no elite banner/kill text while a boss is up; resonance + MVP as small HUD icons; boss weak-point icon pinned to the boss HP bar edge (visual only) */
;(()=>{const C=G.C;G.synHud=1;G.mvpHud=1;G.weakHud=1;
const st=document.createElement('style');st.textContent=`
#evrow>.synChip{display:flex!important;align-items:center;gap:1px;height:22px;padding:0 5px 0 3px;border-radius:11px;background:#1a1020cc;box-shadow:inset 0 0 0 1.5px var(--sc,#ffd77a);font:900 10px Maplestory,"Noto Sans KR",sans-serif;color:var(--sc,#ffd77a);text-shadow:0 1px 0 #000;flex:none;pointer-events:none;position:relative!important}
#evrow>.synChip img{height:15px!important;width:auto!important}
#partycol .pp .mvpB{position:absolute;right:-7px;top:-9px;width:22px;height:auto;z-index:3;pointer-events:none;filter:drop-shadow(0 1px 2px #000c);animation:mvpB 1.6s ease-in-out infinite}
@keyframes mvpB{50%{transform:translateY(-2px) scale(1.06)}}
#bossWk{position:absolute;z-index:5;left:274px;top:226px;width:20px;height:auto;pointer-events:none;display:none;filter:drop-shadow(0 0 4px #ff3030) drop-shadow(0 1px 2px #000);animation:bWk 1.2s ease-in-out infinite}
body.bfon #bossWk.on{display:block}
@keyframes bWk{50%{transform:scale(1.12)}}`;document.head.appendChild(st);
const of=R.frame;R.frame=dt=>{if(C.B&&C.B.boss){if(R.elT)R.elT=null;if(R.ekT)R.ekT=null}return of(dt)};
let synSig='',mvpK=null;
const tick=()=>{try{const bt=document.getElementById('battle'),ev=document.getElementById('evrow');if(!bt||!ev)return;
 // resonance chips
 const syn=(C.synergy&&C.synergy())||[];const L=syn.map(sy=>{const n=(C.B.allies||[]).filter(a=>a.hp>0&&(D.COMPS.find(x=>x.k==a.k)||{}).fac==sy.f).length;return [sy.f,n]}).filter(x=>x[1]>=2);const sig=L.join('|');
 if(sig!==synSig){synSig=sig;ev.querySelectorAll('.synChip').forEach(x=>x.remove());L.forEach(([f,n])=>{const F=D.FACTIONS[f]||{};const e=document.createElement('span');e.className='synChip';e.title=(F.n||'')+' 공명';e.style.setProperty('--sc',F.c||'#ffd77a');e.innerHTML=`<img src="${A}ic_reso.png" alt="">×${n}`;ev.appendChild(e)})}
 // MVP badge on party portrait
 const k=G.screen?null:G._mvpK||null;if(k!==mvpK||(k&&!document.querySelector('#partycol .mvpB'))){mvpK=k;document.querySelectorAll('#partycol .mvpB').forEach(x=>x.remove());if(k){const i=(C.B.allies||[]).findIndex(a=>a.k==k),pp=document.querySelectorAll('#partycol .pp')[i];if(pp){pp.style.position=pp.style.position||'relative';pp.insertAdjacentHTML('beforeend',`<img class=mvpB src="${A}ic_mvp.png" alt="MVP">`)}}}
 // weak icon at boss bar edge
 let w=document.getElementById('bossWk');if(!w){bt.insertAdjacentHTML('beforeend',`<img id=bossWk src="${A}ic_weak.png" alt="약점">`);w=document.getElementById('bossWk')}
 const bo=C.B.boss&&C.alive().find(e=>e.boss&&!e.wb);let on=false;if(bo&&bo.fac){const fs=new Set([{k:'lina'},...(C.B.allies||[]).filter(a=>a.hp>0)].map(a=>C.allyFac(a)).filter(Boolean));fs.forEach(f=>{if(D.COUNTER[f]==bo.fac)on=true})}w.classList.toggle('on',on)}catch(_){}};
setInterval(tick,250);tick()})();

/* v195: boss-fight companion skill strip — during a boss fight the full-width cut-in becomes a slim framed strip under the boss bar (0.9s, small portrait in the socket); outside boss fights the normal banner plays (visual only) */
;(()=>{const C=G.C;const fr=new Image();fr.src=A+'strip_frame.png';const IM={};const img=s=>{let i=IM[s];if(!i){i=IM[s]=new Image();i.src=A+s}return i};
// source slices in strip_frame.png (452x132): capL 0-130, stretch 130-228, diamond 228-256, stretch 256-368, capR 368-452; socket centre (61,66) r34; band rows 31-104
const SW=452,SH=132,SL=[[0,130,0],[130,228,1],[228,256,0],[256,368,1],[368,452,0]];
R.ccStrip=(cx,dt,W,H)=>{try{if(!C.B.boss||C.B.wb||!fr.complete||!fr.naturalWidth)return false;if(!C.alive().some(e=>e.boss&&!e.wb))return false;
 const c=R.ccut;c.t+=dt/.9;const t=Math.min(1,c.t),ein=Math.min(1,t/.14),eo=t>.78?(1-t)/.22:1,a=Math.max(0,Math.min(ein,eo));
 const h=52,k=h/SH,w=Math.min(W-28,330),x0=(W-w)/2-(1-ein)*40,y0=304;/* r306: 304-356, below the boss HP notice slot (279-301) */
 const fixed=SL.filter(q=>!q[2]).reduce((s,q)=>s+(q[1]-q[0])*k,0),strW=(w-fixed)/2;
 cx.save();cx.globalAlpha=a;
 // portrait behind the socket
 const pi=img(c.img);const scx=x0+61*k,scy=y0+66*k,sr=34*k+1;
 if(pi.complete&&pi.naturalWidth){cx.save();cx.beginPath();cx.arc(scx,scy,sr,0,6.283);cx.closePath();cx.fillStyle='#2a1830';cx.fill();cx.clip();const iw=pi.naturalWidth,ih=pi.naturalHeight,side=Math.min(iw*(c.bust?.5:.62),ih*.55),sx=(iw-side)/2+(c.bust?iw*.06:0),sy=ih*(c.bust?.06:.06);cx.drawImage(pi,sx,sy,side,side,scx-sr,scy-sr,sr*2,sr*2);cx.restore()}
 let x=x0;const sn=v=>Math.round(v*2)/2;for(const [s0,s1,st] of SL){const dw=st?strW:(s1-s0)*k,xa=sn(x),xb=sn(x+dw);cx.drawImage(fr,s0,0,s1-s0,SH,xa,y0,xb-xa,h);x+=dw}
 /* r322: ult art panel at the right end of the strip, inside 304-356 (looked up once per cut-in) */
 if(c._sa===undefined)c._sa=R._ultStripArt?R._ultStripArt(c.k):null;
 if(c._sa){const ph=h-6,pw=ph*2,px=x0+w-pw-12+(1-ein)*24;cx.drawImage(c._sa,px,y0+3,pw,ph)}
 // text in the band
 const tx=x0+136*k,ty=y0+(31+104)/2*k+1;cx.textBaseline='middle';cx.textAlign='left';
 cx.font='bold 10px Maplestory,"Noto Sans KR",sans-serif';cx.fillStyle=c.rc||'#ffd77a';const nw=cx.measureText(c.n).width;cx.lineWidth=3;cx.strokeStyle='#000a';cx.strokeText(c.n,tx,ty);cx.fillText(c.n,tx,ty);
 cx.font='900 15px Maplestory,"Noto Sans KR",sans-serif';cx.lineWidth=4;cx.strokeStyle='#000';const sx2=tx+nw+6,sk=c.sk+'!';cx.strokeText(sk,sx2,ty);cx.fillStyle='#fff6d8';cx.fillText(sk,sx2,ty);
 cx.textBaseline='alphabetic';cx.restore();return true}catch(_){return false}};
})();

/* v196: boss-clear chest moment — closed chest drops on the boss spot, bounces, bursts open, drops fly to header (visual only; fits the 2.7s clear card; respects 스킬 연출 setting) */
;(()=>{const st=document.createElement('style');st.textContent=`
.bchest{position:fixed;z-index:990;width:118px;height:118px;margin:-118px 0 0 -59px;pointer-events:none}
.bchest img{position:absolute;left:0;bottom:0;width:100%;height:auto;transform-origin:50% 100%;filter:drop-shadow(0 4px 3px #0006)}
.bchest .bco{animation:bcdrop .62s cubic-bezier(.45,0,.6,1) both}
.bchest.sh .bco{animation:bcshake .2s linear both}
.bchest .bcp{opacity:0}
.bchest.op .bco{display:none}.bchest.op .bcp{opacity:1;animation:bcpop .32s cubic-bezier(.2,1.6,.4,1) both}
.bchest .bcsh{position:absolute;left:14px;right:14px;bottom:-6px;height:14px;border-radius:50%;background:radial-gradient(#0007,#0000 70%);animation:bcshd .62s both}
.bchest .bcg{position:absolute;left:50%;top:44%;width:230px;height:230px;margin:-115px 0 0 -115px;border-radius:50%;opacity:0;background:radial-gradient(#fff8d8 0,#ffd24a99 28%,#ffb02e33 52%,#0000 70%)}
.bchest.op .bcg{animation:bcglow 1.4s ease-out both}
.bchest .bcr{position:absolute;left:50%;top:40%;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;border:3px solid #fff1b8;opacity:0;box-shadow:0 0 12px #ffcf4a}
.bchest.op .bcr{animation:bcring .55s ease-out both}
.bchest.out{animation:bcout .35s ease-in forwards}
@keyframes bcdrop{0%{transform:translateY(-190px) scale(.85);opacity:0}12%{opacity:1}55%{transform:translateY(0) scale(1.06,.9)}70%{transform:translateY(-26px) scale(.97,1.04)}84%{transform:translateY(0) scale(1.03,.95)}92%{transform:translateY(-6px)}100%{transform:none}}
@keyframes bcshd{0%{transform:scale(.3);opacity:0}55%{transform:scale(1.1);opacity:1}70%{transform:scale(.8)}100%{transform:none;opacity:1}}
@keyframes bcshake{0%,100%{transform:none}20%{transform:rotate(-5deg)}40%{transform:rotate(5deg)}60%{transform:rotate(-4deg) scale(1.04)}80%{transform:rotate(3deg) scale(1.06)}}
@keyframes bcpop{0%{transform:scale(1.25,.8)}60%{transform:scale(.94,1.1)}100%{transform:none}}
@keyframes bcglow{0%{opacity:0;transform:scale(.3)}20%{opacity:1;transform:scale(1.1)}100%{opacity:.35;transform:scale(1)}}
@keyframes bcring{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(9)}}
@keyframes bcout{to{opacity:0;transform:translateY(8px) scale(.9)}}
.bcl{position:fixed;z-index:1000;width:30px;height:30px;margin:-15px 0 0 -15px;pointer-events:none;will-change:transform}
.bcl img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 0 4px #ffe58a) drop-shadow(0 2px 1px #0007)}
.bcl b{position:absolute;left:50%;top:100%;transform:translateX(-50%);font:900 11px Maplestory,sans-serif;color:#fff3c0;-webkit-text-stroke:2.5px #3a1a00;paint-order:stroke;white-space:nowrap}
.hdpulse{animation:hdpulse .3s ease-out}@keyframes hdpulse{50%{transform:scale(1.25);filter:brightness(1.6)}}
`;document.head.appendChild(st);
let last=null;const ok=C.ev.kill;C.ev.kill=function(e){try{if(e&&e.boss&&!e.wb){const q=R._ES&&R._ES().get(e),c=R._bc(),r=c&&c.getBoundingClientRect();last={x:(r?r.left:0)+(q?q.x:240),y:(r?r.top:0)+(q?q.y:520),t:performance.now()}}}catch(_){}return ok&&ok.apply(this,arguments)};
const T=[],at=(f,ms)=>T.push(setTimeout(f,ms));
G.chestMoment=(w)=>{T.splice(0).forEach(clearTimeout);document.querySelectorAll('.bchest,.bcl').forEach(x=>x.remove());
 if(!w||(R.opt&&R.opt.fx===false)||G.screen||C.B.br||C.B.rb||C.B.wb||G.storyOn||!last||performance.now()-last.t>6000)return 0;
 const s=C.S(),b=G._bs||{},W=innerWidth,x=Math.max(70,Math.min(W-70,last.x)),y=innerHeight-216/* ground line under the clear card, above the fever bar */;last=null;
 const dg=Math.max(0,s.gold-(b.g||s.gold)),ds=Math.max(0,(s.stone||0)-(b.st||0));
 const L=[['it2_gold.png','+'+fmt(dg),'#cGold'],['it2_gem.png','+'+((D.BAL||{}).bossGems||15),'#cGem'],['it_orb.png','+'+((D.BAL||{}).bossOrbs||5),'#cGem']];if(ds)L.push(['it2_stone.png','+'+ds,'#cGold']);
 const ch=document.createElement('div');ch.className='bchest';ch.style.left=x+'px';ch.style.top=y+'px';
 ch.innerHTML=`<i class=bcsh></i><i class=bcg></i><i class=bcr></i><img class=bco src="${A}chest_closed.png"><img class=bcp src="${A}chest_open.png">`;document.body.appendChild(ch);G._chestN=(G._chestN||0)+1;
 at(()=>ch.classList.add('sh'),640);
 at(()=>{ch.classList.remove('sh');ch.classList.add('op');G.sfx&&G.sfx('coin');R.hs=Math.max(R.hs||0,.15)},860);
 at(()=>{L.forEach(([ic,tx,sel],i)=>{const n=document.createElement('div');n.className='bcl';n.innerHTML=`<img src="${A}${ic}"><b>${tx}</b>`;n.style.left=x+'px';n.style.top=(y-50)+'px';document.body.appendChild(n);
  const dx=(i-(L.length-1)/2)*40,tg=document.querySelector(sel),tr=tg&&tg.getBoundingClientRect(),tx2=tr?tr.left+12-x:-x+60,ty2=tr?tr.top+tr.height/2-(y-50):-(y-70);
  const a=n.animate([{transform:'translate(0,10px) scale(.3)',opacity:0},{transform:`translate(${dx}px,-46px) scale(1.15)`,opacity:1,offset:.3},{transform:`translate(${dx}px,-40px) scale(1)`,opacity:1,offset:.45},{transform:`translate(${tx2}px,${ty2}px) scale(.55)`,opacity:.9}],{duration:1000+i*70,easing:'cubic-bezier(.5,0,.75,.4)',fill:'forwards'});
  a.onfinish=()=>{n.remove();if(tg){tg.classList.remove('hdpulse');void tg.offsetWidth;tg.classList.add('hdpulse')}}})},1120);
 at(()=>ch.classList.add('out'),2250);at(()=>ch.remove(),2620);return 1};
const orp=resultPop;resultPop=function(w){const r=orp.apply(this,arguments);try{if(w&&document.querySelector('.vic.win:not(.out)'))G.chestMoment(w)}catch(_){}return r};
G._bossLoot=()=>{}/* v110 loot burst superseded by the chest moment */})();

/* v197: swarm companion cut-in on its own framed layer (arch portrait + plum plate) above combat text / damage / kill callouts; kill callout drops below it (visual only) */
;(()=>{const st=document.createElement('style');st.textContent=`
#ccLayer{position:absolute;left:0;top:0;z-index:45;pointer-events:none}
#battle.ccon .mkb{top:362px!important;transition:top .12s}
#battle.ccon .tdmg{top:392px!important}
/* r317: XP orbs (fixed, body-level, z40) flew over the cut-in title; dim them while a field cut-in shows (filter, since the orb's WAAPI flight owns opacity) */
body.ccon .xpo,body.lcut .xpo{filter:opacity(.35)}
/* r375: battle XP orbs no longer float over an open menu sheet/screen (hidden, flight + HUD bar fill unchanged) */
body.sheeton .xpo,body.scron .xpo{visibility:hidden}
/* r319: Lina's full cut-in band spans ~y 240-430, so the multi-kill banner drops below it (doubled id outranks the ccon/elon/lvon/qson rules) */
body.lcut #battle#battle .mkb{top:448px!important;transition:top .12s}`;document.head.appendChild(st);
const FW=640,FH=350,Y0=196,BW=270;let lay=null,lx=null,dirty=0,fr=null;
const IC={},img=s=>IC[s]||(IC[s]=Object.assign(new Image(),{src:A+s}));
const ensure=(W,H)=>{const b=document.getElementById('battle');if(!b)return null;if(!lay||!lay.isConnected){lay=document.createElement('canvas');lay.id='ccLayer';b.appendChild(lay);lx=lay.getContext('2d')}
 const mc=b.querySelector('canvas:not(#ccLayer)'),dpr=mc&&mc.width?mc.width/W:(devicePixelRatio||1),pw=Math.round(W*dpr),ph=Math.round(H*dpr);if(lay.width!=pw||lay.height!=ph){lay.width=pw;lay.height=ph;lay.style.width=W+'px';lay.style.height=H+'px'}lx.setTransform(dpr,0,0,dpr,0,0);return lx};
const clear=()=>{if(dirty&&lx){lx.setTransform(1,0,0,1,0,0);lx.clearRect(0,0,lay.width,lay.height);dirty=0;const b=document.getElementById('battle');b&&b.classList.remove('ccon');document.body.classList.remove('ccon')}};
R.ccFrame=(dt,W,H)=>{try{if(C.B.boss||C.B.wb)return false;fr=fr||img('cutin_frame.png');if(!fr.complete||!fr.naturalWidth)return false;const c=R.ccut,cx=ensure(W,H);if(!cx)return false;
 c.t+=dt;const t=c.t;if(t>=1){clear();return true}
 const ein=Math.min(1,t/.16),eo=t>.8?(1-t)/.2:1,a=Math.max(0,Math.min(ein,eo)),k=BW/FW,h=FH*k,e=1-Math.pow(1-ein,3),x0=8-(1-e)*(BW+20)+(t>.8?-(t-.8)/.2*50:0),y0=Y0;
 cx.clearRect(0,0,W,H);dirty=1;{const bt=document.getElementById('battle');if(!bt.classList.contains('ccon')){bt.classList.add('ccon');document.body.classList.add('ccon')}};if(R._ccUlt&&R._ccUlt(cx,c,t,a,W,H))return true;cx.save();cx.globalAlpha=a;cx.translate(x0,y0);cx.scale(k,k);
 // bust inside arch (clip: semicircle top + rect)
 const pi=img(c.img);
 cx.save();cx.beginPath();cx.moveTo(45,FH);cx.lineTo(45,140);cx.ellipse(134,140,89,86,0,Math.PI,2*Math.PI);cx.lineTo(223,FH);cx.closePath();cx.clip();
 const bg=cx.createLinearGradient(0,50,0,FH);bg.addColorStop(0,'#fff4d8');bg.addColorStop(1,c.rc||'#c890ff');cx.fillStyle=bg;cx.globalAlpha=a*.55;cx.fillRect(40,40,190,FH);cx.globalAlpha=a;
 if(pi.complete&&pi.naturalWidth){const iw=pi.naturalWidth,ih=pi.naturalHeight;if(c.bust){const s=(178*.95)/(iw*.5),dw=iw*s,dh=ih*s,ox=134-(iw/2+iw*.06)*s+(1-e)*-30+t*12,oy=62-ih*.06*s;cx.drawImage(pi,ox,oy,dw,dh)}else{const dh=FH*1.05,dw=dh*iw/ih;cx.drawImage(pi,134-dw/2+t*12,FH-dh+6,dw,dh)}}
 cx.restore();cx.drawImage(fr,0,0,FW,FH);
 // text on plate (plate inner ≈ x 285–540, y 125–270 in frame px)
 cx.textAlign='left';cx.textBaseline='middle';const tx=292,mw=250;cx.font='bold 26px Maplestory,"Noto Sans KR",sans-serif';cx.lineWidth=6;cx.strokeStyle='#000b';cx.strokeText(c.n,tx,162,mw);cx.fillStyle=c.rc||'#ffd77a';cx.fillText(c.n,tx,162,mw);
 const sk=c.sk+'!';let fs=44;cx.font=`900 ${fs}px Maplestory,"Noto Sans KR",sans-serif`;const sw=cx.measureText(sk).width;if(sw>mw){fs=Math.max(28,fs*mw/sw);cx.font=`900 ${fs}px Maplestory,"Noto Sans KR",sans-serif`}
 const pop=t<.22?1+(.22-t)*1.6:1;cx.save();cx.translate(tx,218);cx.scale(pop,pop);cx.lineWidth=9;cx.strokeStyle='#1a0610';cx.strokeText(sk,0,0,mw);const g=cx.createLinearGradient(0,-fs/2,0,fs/2);g.addColorStop(0,'#ffffff');g.addColorStop(.55,'#fff1c0');g.addColorStop(1,'#ffc24a');cx.fillStyle=g;cx.fillText(sk,0,0,mw);cx.restore();
 cx.textBaseline='alphabetic';cx.restore();return true}catch(_){return false}};
const of=R.frame;R.frame=function(dt){const r=of.apply(this,arguments);try{if(dirty&&!(R.ccut&&R.ccut.t<1&&!C.B.boss))clear()}catch(_){}return r};
})();

/* v198: 정예 출현 → framed crimson plaque in a fixed slot (pop-in, skull glow pulse, fade); shared slot with kill callouts + swarm cut-in (visual only; boss fights unchanged) */
;(()=>{const st=document.createElement('style');st.textContent=`
#battle.elon .mkb{top:236px!important}
#battle.ccon.elon .mkb{top:424px!important}
#battle.ccon.elon .tdmg{top:452px!important}`;document.head.appendChild(st);
const PW=600,PH=184,DW=240,CY=378;let fr=null,on=0,seen=0;
const cls=v=>{if(on===v)return;on=v;const b=document.getElementById('battle');b&&b.classList.toggle('elon',!!v);R._elB=!!v/* r365: elite plaque band 341-415 for the number fade */};
R.elPlq=(cx,c,W,t,a)=>{try{if(C.B.boss)return false;fr=fr||Object.assign(new Image(),{src:A+'elite_plaque.png'});if(!fr.complete||!fr.naturalWidth)return false;seen=performance.now();cls(1);
 const k=DW/PW,sc=t<.1?.6+t*6.5:t<.22?1.25-(t-.1)*2.1:1,fo=t>1.3?1+(t-1.3)*.12:1;cx.save();cx.globalAlpha=Math.max(0,a);cx.translate(W/2,CY);cx.scale(sc*fo,sc*fo);
 cx.drawImage(fr,-DW/2,-PH*k/2,DW,PH*k);
 // skull glow pulse (eyes ≈ frame px 88,98)
 const gx=-DW/2+88*k,gy=-PH*k/2+97*k,p=.55+.45*Math.sin(t*14);cx.save();cx.globalCompositeOperation='lighter';const g=cx.createRadialGradient(gx,gy,0,gx,gy,22);g.addColorStop(0,`rgba(255,70,40,${.55*p})`);g.addColorStop(.45,`rgba(255,40,20,${.22*p})`);g.addColorStop(1,'rgba(255,0,0,0)');cx.fillStyle=g;cx.fillRect(gx-24,gy-24,48,48);cx.restore();
 // text centred on plate (plate centre ≈ frame px 330)
 const tx=-DW/2+330*k;cx.textAlign='center';cx.textBaseline='middle';cx.font='italic 900 19px Maplestory,"Noto Sans KR",sans-serif';cx.lineWidth=5;cx.strokeStyle='#3a0006';cx.strokeText('정예 출현!',tx,-7,140);const tg=cx.createLinearGradient(0,-17,0,3);tg.addColorStop(0,'#fff8d0');tg.addColorStop(1,'#ffc23a');cx.fillStyle=tg;cx.fillText('정예 출현!',tx,-7,140);
 cx.font='bold 10px Maplestory,"Noto Sans KR",sans-serif';cx.lineWidth=3;cx.strokeStyle='#2a0004';const sub=(c.n||'정예')+' · 처치 시 보상 4배';cx.strokeText(sub,tx,12,140);cx.fillStyle='#ffe9c8';cx.fillText(sub,tx,12,140);
 cx.textBaseline='alphabetic';cx.restore();return true}catch(_){return false}};
const of=R.frame;R.frame=function(dt){const r=of.apply(this,arguments);try{const ek=!C.B.boss&&R.ekT&&R.ekT.t>0&&R.ekT.t<1.3,el=!C.B.boss&&R.elT&&R.elT.t>0&&R.elT.t<1.6&&performance.now()-seen<250;cls(ek||el?1:0)}catch(_){}return r};/* 정예 처치 text (y≈392) shares the plaque slot */
})();

/* v199: WAVE CLEAR / wave-advance ribbon — wave_ribbon.png in fixed band 244–332 (clear of elite plaque 341–415 & 정예 처치 392), waits for swarm cut-in banner, suppresses/clears kill callouts while up (existing .wvb gate) */
(()=>{const C=G.C;const st=document.createElement('style');st.textContent=`
.wvb.wrib{left:50%;right:auto;top:244px;width:220px;height:88px;margin-left:-110px;display:block;z-index:8;animation:wrib 1.15s ease-out forwards;transform-origin:50% 55%}
.wvb.wrib img{display:block;width:100%;height:100%;filter:drop-shadow(0 3px 4px #0006)}
.wvb.wrib span{position:absolute;left:21%;right:21%;top:49px;transform:translateY(-50%);text-align:center;white-space:nowrap;font:900 italic 19px Maplestory,"Noto Sans KR",sans-serif;letter-spacing:.5px;color:#6e1810;text-shadow:1px 1px 0 #fff7de,-1px -1px 0 #fff7de,1px -1px 0 #fff7de,-1px 1px 0 #fff7de,0 0 4px #fff3c8}
.wvb.wrib span small{font-size:13px;color:#8a3a18}
.wvb.wrib.fin span{color:#8a1206}
.wvb.wrib.out{animation:wribo .2s ease-in forwards}
@keyframes wrib{0%{opacity:0;transform:scaleX(.06) scaleY(.75)}16%{opacity:1;transform:scaleX(1.1) scaleY(1.03)}26%{transform:scale(.98)}32%{transform:scale(1)}78%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-16px)}}
@keyframes wribo{to{opacity:0;transform:scaleX(.6)}}`;document.head.appendChild(st);
const q=[],WP=[];let busy=0,cur=null,w=0;
const cut=()=>(!C.B.boss&&R.ccut&&R.ccut.t<1)||!!document.querySelector(".wcsl");const lvb=()=>!!document.querySelector("#battle .lvem,#battle .qsc");
const show=it=>{const b=document.getElementById('battle');if(!b||C.B.boss||G.screen||G.storyOn){busy=0;return pump()}
b.querySelectorAll('.mkb,.wvb:not(.tgb)').forEach(x=>x.remove());let d=WP.find(x=>!x.isConnected);/* r395: 2 pooled ribbons (img + span reused; re-inserting restarts the wrib animation) */if(!d){d=document.createElement('div');d.innerHTML=`<img src="${A}wave_ribbon.png" alt=""><span></span>`;WP.push(d)}d.className='wvb wrib'+(it.fin?' fin':'');d.removeAttribute('style');if(d.lastChild._h!==it.h){d.lastChild._h=it.h;d.lastChild.innerHTML=it.h}b.appendChild(d);cur=d;const sid=d._sid=(d._sid||0)+1;
const end=()=>{if(R._wrHold)return setTimeout(end,100);if(cur!==d||d._sid!==sid)return;cur=null;d.remove();busy=0;pump()};setTimeout(end,1150)};
const pump=()=>{if(busy||!q.length)return;busy=1;w=0;const go=()=>{if(C.B.boss){q.length=0;busy=0;return}if((cut()||lvb())&&w<2500){w+=100;setTimeout(go,100)}else if(w>=2500){q.shift();busy=0;pump()}else show(q.shift())};go()};
new Image().src=A+"wave_ribbon.png";R._wrq=()=>{q.length=0;busy=0;if(cur){cur.remove();cur=null}};R.waveRib=(h,fin)=>{if(q.length>1)q.shift();q.push({h,fin});pump()};
const ok=C.ev.kill;C.ev.kill=function(e){const r=ok&&ok.apply(this,arguments);try{document.querySelectorAll('#battle .wclr').forEach(f=>{if(f._rb)return;f._rb=1;const t=f.querySelector('b');if(t){t.remove();R.waveRib('WAVE CLEAR')}})}catch(_){}return r};
const os=C.ev.spawn;C.ev.spawn=function(){const k=cur;if(k)k.classList.remove('wvb');/* the base spawn banner code removes every .wvb */let r;try{r=os&&os.apply(this,arguments)}finally{if(k)k.classList.add('wvb')}try{document.querySelectorAll('#battle .wvb:not(.wrib):not(.tgb)').forEach(d=>{const fin=d.classList.contains('fin'),b=d.querySelector('b');d.remove();if(b)R.waveRib(fin?'FINAL WAVE':b.innerHTML,fin)})}catch(_){}return r};
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{if(cur&&cut()&&!cur.classList.contains('out'))cur.classList.add('out');if(cur&&!cur.classList.contains('out')){const t=cur.parentNode&&cur.parentNode.querySelector('.tdmg:not(.tdlo)');if(t)t.classList.add('tdlo')}/* r395: a 총 피해 panel (y 318) under the WAVE / FINAL WAVE ribbon (244-332) drops to its existing lower slot (y 392) */if(cur&&cur.classList.contains('bgone')&&!G._fin&&!document.querySelector('.vic,.bsht'))cur.classList.remove('bgone')/* BN mutex: the transient spawn .wvb we swap out must not hide the ribbon */}catch(_){}return r}})();

/* v200: 연계기 duo banner — duo_banner.png frame (340×127) in its own band 466–585 (r250: lifted off the NICE COMBO chest text) (below callout max 462, clear of cut-in 196–336 / ribbon 244–332 / plaque 341–415); busts clipped in the two windows under the frame; boss keeps the old 548 slot */
(()=>{const st=document.createElement('style');st.textContent=`
#battle .combo.duo{left:50%;right:auto;top:466px;width:320px;height:119px;margin-left:-160px;display:block;background:none;border:0;box-shadow:none;animation:duoIn 1.5s ease-out forwards;transform-origin:50% 60%}
body.bossfight #battle .combo.duo{top:548px;height:119px}
#battle .combo.duo .fr{position:absolute;inset:0;width:100%;height:100%;margin:0;filter:drop-shadow(0 4px 6px #0007);animation:none;transform:none;object-fit:fill;z-index:1}
#battle .combo.duo .dw{position:absolute;top:46px;width:47px;height:47px;overflow:hidden;border-radius:7px;background:radial-gradient(circle at 50% 40%,#5a3a9a,#1a0d3a 75%);z-index:0}
#battle .combo.duo .dw.l{left:21px}#battle .combo.duo .dw.r{left:252px}
#battle .combo.duo .dw img{position:absolute;left:50%;top:2px;width:58px;height:auto;margin:0;transform:translateX(-50%);filter:none;object-fit:contain;animation:duoB .4s .12s both}
#battle .combo.duo .dw.r img{transform:translateX(-50%) scaleX(-1)}
#battle .combo.duo .pl{position:absolute;left:92px;width:137px;top:52px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;min-width:0}
#battle .combo.duo .pl b{font:italic 900 16px Maplestory,"Noto Sans KR",sans-serif;color:#3a1250;white-space:nowrap;max-width:137px;overflow:hidden;text-shadow:1px 1px 0 #fff8e4,-1px -1px 0 #fff8e4,1px -1px 0 #fff8e4,-1px 1px 0 #fff8e4}
#battle .combo.duo .pl i{font:700 9px Maplestory,"Noto Sans KR",sans-serif;font-style:normal;color:#6a4a2a;margin-top:1px;white-space:nowrap}
#battle .combo.duo .gm{position:absolute;left:138px;top:-11px;width:45px;height:45px;border-radius:50%;background:radial-gradient(#f4d8ffee,#c070ff88 35%,#8a30ff00 70%);mix-blend-mode:screen;z-index:3;animation:duoG .9s .2s ease-in-out 2 both}
@keyframes duoIn{0%{opacity:0;transform:translateX(-40px) scaleX(.4)}14%{opacity:1;transform:translateX(4px) scaleX(1.05)}22%{transform:none}86%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-10px)}}
@keyframes duoB{from{opacity:0;top:16px}to{opacity:1;top:2px}}
@keyframes duoG{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.15)}}`;document.head.appendChild(st);
const bust=(src,img)=>{const k=(D.COMPS.find(c=>src.endsWith(c.img))||{}).k;const i=new Image();i.alt='';if(k){i.src=A+'cutc/'+k+'.png';i.onerror=()=>{i.onerror=null;i.src=src}}else i.src=src;return i};
const dress=n=>{if(n._duo)return;n._duo=1;const l=n.querySelector('.cl'),r=n.querySelector('.cr'),b=n.querySelector('.cm b'),it=n.querySelector('.cm i');if(!l||!r||!b)return;
const nm=b.textContent,sub=it?it.textContent:'';n.classList.add('duo');n.innerHTML='';
for(const [s,c] of [[l.getAttribute('src'),'l'],[r.getAttribute('src'),'r']]){const w=document.createElement('div');w.className='dw '+c;w.appendChild(bust(s));n.appendChild(w)}
n.insertAdjacentHTML('beforeend',`<img class="fr" src="${A}duo_banner.png" alt=""><div class="pl"><b>${nm}</b><i>${sub}</i></div><span class="gm"></span>`)};
new Image().src=A+'duo_banner.png';
const go=()=>{const b=document.getElementById('battle');if(!b)return setTimeout(go,300);new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&n.classList.contains('combo'))try{dress(n)}catch(_){}}).observe(b,{childList:true})};go()})();

/* v201: hero LEVEL UP → levelup_emblem.png toast (280×115) in the top band 206–321 shared with swarm cut-in / wave ribbon (waits for them, yields on cut-in); rapid level-ups + 전투력 powup merge into one toast; kill callouts drop to 362/424 while up; hero canvas text float retired (glow pillar kept) */
(()=>{const C=G.C;const st=document.createElement('style');st.textContent=`
#battle .lvem{position:absolute;left:50%;top:206px;width:280px;height:115px;margin-left:-140px;z-index:9;pointer-events:none;animation:lvIn .42s cubic-bezier(.2,1.5,.45,1) both;transform-origin:50% 45%}
#battle .lvem .ry{position:absolute;left:50%;top:44%;width:280px;height:280px;margin:-140px 0 0 -140px;border-radius:50%;background:repeating-conic-gradient(from 0deg,#ffe58a99 0 6deg,#0000 6deg 20deg);-webkit-mask:radial-gradient(circle,#000 12%,#0007 34%,#0000 60%);mask:radial-gradient(circle,#000 12%,#0007 34%,#0000 60%);animation:lvRy 2.4s linear both;will-change:transform,opacity}
#battle .lvem>img{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 4px 5px #0007)}
#battle .lvem .tx{position:absolute;left:73px;width:136px;top:32px;height:32px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
#battle .lvem .tx b{font:italic 900 18px Maplestory,"Noto Sans KR",sans-serif;letter-spacing:.5px;color:#8a1008;white-space:nowrap;text-shadow:1px 1px 0 #fff6dc,-1px -1px 0 #fff6dc,1px -1px 0 #fff6dc,-1px 1px 0 #fff6dc}
#battle .lvem .tx i{font:700 9px Maplestory,"Noto Sans KR",sans-serif;line-height:1.35;font-style:normal;color:#6a2a14;margin-top:0;white-space:nowrap;max-width:132px;overflow:hidden}
#battle .lvem .tx i:empty{display:none}
#battle .lvem.bump .tx b{animation:lvBp .3s ease-out}
#battle .lvem.out{animation:lvOut .35s ease-in forwards}
#battle.lvon .mkb{top:362px!important}#battle.lvon.elon .mkb{top:424px!important}#battle.lvon .tdmg{top:392px!important}#battle.lvon.elon .tdmg{top:452px!important}
@keyframes lvIn{0%{opacity:0;transform:scale(.3)}60%{opacity:1;transform:scale(1.08)}100%{opacity:1;transform:scale(1)}}
@keyframes lvOut{to{opacity:0;transform:translateY(-14px) scale(.96)}}
@keyframes lvRy{0%{opacity:0;transform:scale(.4) rotate(0)}15%{opacity:1;transform:scale(1.1) rotate(10deg)}100%{opacity:.5;transform:scale(1) rotate(60deg)}}
@keyframes lvBp{0%{transform:scale(1.3)}100%{transform:scale(1)}}`;document.head.appendChild(st);
new Image().src=A+'levelup_emblem.png';R.lvNoTxt=1;
let cur=null,endT=0,p0=0,lv=0,pend=null,w=0;const HOLD=1500;
const bat=()=>document.getElementById('battle');
const busy=()=>(!C.B.boss&&R.ccut&&R.ccut.t<1)||(R.cut&&R.cut.t<1.25)||!!document.querySelector('.wcsl,#battle .wvb.wrib:not(.out),.vic,.bsht,#battle .qsc');
const sub=()=>{const g=C.POW()-p0;return 'Lv.'+lv+(g>0?' · 전투력 +'+fmt(g):'')};
const fin=()=>{const d=cur;if(!d)return;if(R._lvHold){endT=setTimeout(fin,100);return}d.classList.add('out');setTimeout(()=>{d.remove();if(cur===d){cur=null;const b=bat();b&&b.classList.remove('lvon')}},360)};
const show=()=>{pend=null;const b=bat();if(!b||G.screen||G.storyOn)return;const d=document.createElement('div');d.className='lvem';d.innerHTML=`<div class=ry></div><img src="${A}levelup_emblem.png" alt=""><div class=tx><b>LEVEL UP</b><i></i></div>`;b.appendChild(d);b.classList.add('lvon');cur=d;d.querySelector('i').textContent=sub();clearTimeout(endT);endT=setTimeout(fin,HOLD+420)};
const wait=()=>{if(!pend)return;if(busy()&&w<3000){w+=100;setTimeout(wait,100)}else show()};
R.lvEmb=n=>{lv=n||lv;if(cur&&!cur.classList.contains('out')){const i=cur.querySelector('i');i.textContent=sub();cur.classList.remove('bump');void cur.offsetWidth;cur.classList.add('bump');clearTimeout(endT);endT=setTimeout(fin,HOLD);return}
 if(pend)return;/* merged into the queued toast */if(!cur)p0=G._pw||C.POW();pend=1;w=0;wait()};
R._lvq=()=>{pend=null;clearTimeout(endT);if(cur){cur.remove();cur=null}const b=bat();b&&b.classList.remove('lvon')};
const ob=C.ev.banner||banner;C.ev.banner=function(t){const r=ob.apply(this,arguments);try{if(/^LEVEL UP/.test(t)){document.querySelectorAll('#battle .banner').forEach(x=>{if(/^LEVEL UP/.test(x.textContent)||x.classList.contains('rplv'))x.remove()});R.lvEmb(+((t.match(/Lv\.(\d+)/)||[])[1])||0)}}catch(_){}return r};
/* 전투력 +N float during a level-up toast is absorbed into the gain line */
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&n.classList.contains('powup')&&(cur&&!cur.classList.contains('out')||pend)){n.remove();if(cur)cur.querySelector('i').textContent=sub()}}).observe(document.body,{childList:true});
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{if(cur&&!cur.classList.contains('out')&&((!C.B.boss&&R.ccut&&R.ccut.t<.5)||(R.cut&&R.cut.t<.5))){clearTimeout(endT);fin()}if(cur&&cur.classList.contains('bgone')&&!G._fin&&!document.querySelector('.vic,.bsht'))cur.classList.remove('bgone')}catch(_){}return r}})();

/* v202: 지령/주간 임무 objective complete → "임무 완료" scroll toast (quest_scroll.png 260×94, band 214–308 in the shared top band: queues behind cut-in / wave ribbon / LEVEL UP emblem, they queue behind it; yields on cut-in); unroll → wax-seal stamp thump → hold → fade; quest bar flash; DOM/CSS only, 500 ms poll of real mission progress */
(()=>{const C=G.C;const st=document.createElement('style');st.textContent=`
#battle .qsc{position:absolute;left:50%;top:214px;width:260px;height:94px;margin-left:-130px;z-index:9;pointer-events:none;animation:qsIn .45s cubic-bezier(.25,1.3,.5,1) both}
#battle .qsc>img.sc{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 4px 5px #0007)}
#battle .qsc .sl{position:absolute;left:12px;top:-1px;width:48px;height:55px;background:url(${A}quest_scroll.png) -12px 1px/260px 94px no-repeat;-webkit-mask:radial-gradient(circle at 50% 35%,#000 50%,#0000 62%);mask:radial-gradient(circle at 50% 35%,#000 50%,#0000 62%);animation:qsSt .32s .42s cubic-bezier(.5,0,.6,1.4) both;transform-origin:50% 40%}
#battle .qsc .rg{position:absolute;left:14px;top:-4px;width:44px;height:44px;border-radius:50%;border:3px solid #ffd76a;opacity:0;animation:qsRg .5s .7s ease-out both}
#battle .qsc .tx{position:absolute;left:62px;width:150px;top:21px;height:54px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.25;text-align:center}
#battle .qsc .tx em{font:900 10px Maplestory,"Noto Sans KR",sans-serif;font-style:normal;color:#a3201a;letter-spacing:1px}
#battle .qsc .tx b{font:900 15px Maplestory,"Noto Sans KR",sans-serif;color:#4a2a10;white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis}
#battle .qsc .tx i{font:700 9.5px Maplestory,"Noto Sans KR",sans-serif;font-style:normal;color:#7a5530;white-space:nowrap}
#battle .qsc .tx i img{height:11px;vertical-align:-2px;margin:0 1px}
#battle .qsc.out{animation:qsOut .35s ease-in forwards}
#battle.qson .mkb{top:362px!important}#battle.qson.elon .mkb{top:424px!important}#battle.qson .tdmg{top:392px!important}#battle.qson.elon .tdmg{top:452px!important}
#mission.qflash{animation:qsFl 1.2s ease-out}
@keyframes qsIn{0%{opacity:0;transform:scaleX(.08)}25%{opacity:1}100%{opacity:1;transform:scaleX(1)}}
@keyframes qsSt{0%{opacity:0;transform:scale(1.9)}70%{opacity:1;transform:scale(.92)}100%{opacity:1;transform:scale(1)}}
@keyframes qsRg{0%{opacity:.9;transform:scale(.8)}100%{opacity:0;transform:scale(1.7)}}
@keyframes qsOut{to{opacity:0;transform:translateY(-12px)}}
@keyframes qsFl{0%,100%{filter:none}20%{filter:brightness(1.5) drop-shadow(0 0 8px #ffd76a)}50%{filter:brightness(1.2) drop-shadow(0 0 5px #ffd76a)}}`;document.head.appendChild(st);
new Image().src=A+'quest_scroll.png';
const q=[];let cur=null,busy=0,endT=0,seen=null;const HOLD=1800;
const bat=()=>document.getElementById('battle');
const blk=()=>(!C.B.boss&&R.ccut&&R.ccut.t<1)||(R.cut&&R.cut.t<1.25)||!!document.querySelector('.wcsl,#battle .wrib,#battle .lvem,.vic,.bsht');
const list=()=>{const s=C.S(),o=[];D.MISSIONS.forEach((m,i)=>{if((s.mp[m.k]||0)>=m.goal&&!s.mc[m.k])o.push({id:'d'+m.k,t:'지령 '+(i+1),h:m.n,gem:m.gem})});const w=s.wk;if(w&&w.p)D.WMISS.forEach(m=>{if((w.p[m.k]||0)>=m.goal&&!(w.c||{})[m.k])o.push({id:'w'+m.k,t:'주간',h:m.n,gem:m.gem,tk:m.tk})});return o};
const fin=()=>{const d=cur;if(!d)return;if(R._qsHold){endT=setTimeout(fin,100);return}d.classList.add('out');setTimeout(()=>{d.remove();if(cur===d){cur=null;const b=bat();b&&b.classList.remove('qson');busy=0;pump()}},360)};
const show=it=>{const b=bat();if(!b){busy=0;return}const rw=[it.gem?`<img src="${A}it2_gem.png">${it.gem}`:'',it.tk?`<img src="${A}it2_ticket.png">${it.tk}`:''].filter(Boolean).join(' ');
 const d=document.createElement('div');d.className='qsc';d.innerHTML=`<img class=sc src="${A}quest_scroll.png" alt=""><span class=sl></span><span class=rg></span><div class=tx><em>${it.t} · 임무 완료</em><b></b>${rw?`<i>보상 ${rw}</i>`:''}</div>`;d.querySelector('b').textContent=it.h+(it.more?' 외 '+it.more+'건':'');
 b.appendChild(d);b.classList.add('qson');cur=d;const ms=document.getElementById('mission');if(ms&&ms.getClientRects().length&&getComputedStyle(ms).opacity!=="0"){ms.classList.remove('qflash');void ms.offsetWidth;ms.classList.add('qflash');setTimeout(()=>ms.classList.remove('qflash'),1300)}endT=setTimeout(fin,HOLD+450)};
const pump=()=>{if(busy||!q.length)return;busy=1;let w=0;const go=()=>{if((G.screen||G.storyOn||blk())&&w<6000){w+=150;setTimeout(go,150)}else{const it=q.shift();if(q.length){it.more=q.length;q.length=0}show(it)}};go()};
R.questToast=it=>{if(q.length>=3)return;q.push(it);pump()};R._qsq=()=>{q.length=0;clearTimeout(endT);if(cur){cur.remove();cur=null}busy=0;const b=bat();b&&b.classList.remove('qson')};
setInterval(()=>{try{if(!C.S)return;const l=list(),ids=new Set(l.map(x=>x.id));if(!seen){seen=ids;return}l.forEach(x=>{if(!seen.has(x.id))R.questToast(x)});seen=ids}catch(_){}},500);
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{if(cur&&!cur.classList.contains('out')&&((!C.B.boss&&R.ccut&&R.ccut.t<.5)||(R.cut&&R.cut.t<.5))){clearTimeout(endT);fin()}if(cur&&cur.classList.contains('bgone')&&!G._fin&&!document.querySelector('.vic,.bsht'))cur.classList.remove('bgone')}catch(_){}return r}})();

/* v203: 업적 달성 / 칭호 획득 slide-in plate (achv_plate.png 214×76) — real D.ACH tier reached (C.achVal ≥ g[i]) and D.TITLES newly owned (q()); band 478–554 on the right (x 116–330): measured clear of callouts ≤462, combo counter 561+, side columns, fever 624; shares the duo band → waits for any #battle .combo and slides out early if one starts; slides in from the right edge, medal shine, hold 2 s, slide out; queue 3, extras fold to "외 N건"; tiers/titles already reached at load are seeded; DOM/CSS only */
(()=>{const C=G.C;const st=document.createElement('style');st.textContent=`
#battle .acp{position:absolute;left:116px;top:478px;width:214px;height:76px;z-index:9;pointer-events:none;animation:acIn .5s cubic-bezier(.2,1.25,.45,1) both}
#battle .acp>img{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 3px 4px #000a)}
#battle .acp .sh{position:absolute;left:4px;top:3px;width:29px;height:29px;border-radius:50%;overflow:hidden}
#battle .acp .sh:after{content:'';position:absolute;top:-20%;bottom:-20%;width:40%;left:-60%;background:linear-gradient(100deg,#fff0 0%,#fffbe0cc 50%,#fff0 100%);transform:skewX(-18deg);animation:acSh .7s .45s ease-in-out both,acSh .7s 1.7s ease-in-out both}
#battle .acp .tx{position:absolute;left:46px;width:140px;top:11px;height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.3;text-align:center}
#battle .acp .tx em{font:900 9px Maplestory,"Noto Sans KR",sans-serif;font-style:normal;color:#ffcf4a;letter-spacing:1px;text-shadow:0 1px 0 #000}
#battle .acp .tx b{font:900 13px Maplestory,"Noto Sans KR",sans-serif;color:#fff0c8;white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 0 #000,0 0 6px #ffcf4a55}
#battle .acp .tx i{font:700 9px Maplestory,"Noto Sans KR",sans-serif;font-style:normal;color:#e8d6a8;white-space:nowrap}
#battle .acp .tx i img{height:10px;vertical-align:-2px;margin:0 1px}
#battle .acp.out{animation:acOut .4s ease-in forwards}
@keyframes acIn{0%{opacity:0;transform:translateX(290px)}20%{opacity:1}100%{opacity:1;transform:translateX(0)}}
@keyframes acOut{to{opacity:0;transform:translateX(290px)}}
@keyframes acSh{0%{left:-60%}100%{left:130%}}`;document.head.appendChild(st);
new Image().src=A+'achv_plate.png';
const q=[];let cur=null,busy=0,endT=0,seen=null;const HOLD=2000;
const bat=()=>document.getElementById('battle');
const blk=()=>!!document.querySelector('#battle .combo,#battle .lcd,.vic,.bsht,.bwarn');
const list=()=>{const o=[];D.ACH.forEach(a=>{const v=C.achVal(a.k);a.g.forEach((g,i)=>{if(v>=g)o.push({id:'a'+a.k+i,t:'업적 달성',h:a.n+' '+(i+1)+'단계',gem:a.gem[i],tk:a.t&&a.t[i],sto:a.st&&a.st[i]})})});C.titlesOwned().forEach(t=>o.push({id:'t'+t.k,t:'칭호 획득',h:'「'+t.n+'」',rw:'공격력 +'+t.atk+'%'+(t.gold?' · 골드 +'+t.gold+'%':'')}));return o};
const fin=()=>{const d=cur;if(!d)return;if(R._acHold){endT=setTimeout(fin,100);return}d.classList.add('out');setTimeout(()=>{d.remove();if(cur===d){cur=null;busy=0;pump()}},420)};
const show=it=>{const b=bat();if(!b){busy=0;return}const rw=it.rw||[it.gem?`<img src="${A}it2_gem.png">${it.gem}`:'',it.tk?`<img src="${A}it2_ticket.png">소환권 ${it.tk}`:'',it.sto?'강화석 '+it.sto:''].filter(Boolean).join(' ');
 const d=document.createElement('div');d.className='acp';d.innerHTML=`<img src="${A}achv_plate.png" alt=""><span class=sh></span><div class=tx><em>${it.t}</em><b></b>${rw?`<i>${it.rw?'':'보상 '}${rw}</i>`:''}</div>`;d.querySelector('b').textContent=it.h+(it.more?' 외 '+it.more+'건':'');
 b.appendChild(d);cur=d;endT=setTimeout(fin,HOLD+500)};
const pump=()=>{if(busy||!q.length)return;busy=1;let w=0;const go=()=>{if((G.screen||G.storyOn||blk())&&w<8000){w+=150;setTimeout(go,150)}else{const it=q.shift();if(q.length){it.more=q.reduce((t,x)=>t+1+(x.more||0),0);q.length=0}show(it)}};go()};
R.achToast=it=>{if(q.length>=3){const l=q[q.length-1];l.more=(l.more||0)+1;return}q.push(it);pump()};R._acq=()=>{q.length=0;clearTimeout(endT);if(cur){cur.remove();cur=null}busy=0};
setInterval(()=>{try{if(!C.achVal)return;const l=list(),ids=new Set(l.map(x=>x.id));if(!seen){seen=ids;return}l.forEach(x=>{if(!seen.has(x.id))R.achToast(x)});seen=ids}catch(_){}},500);
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{if(cur&&!cur.classList.contains('out')&&document.querySelector('#battle .combo')){clearTimeout(endT);fin()}}catch(_){}return r}})();

/* v204: 전설/신화 장비 획득 loot card — loot_card.png (84×125) at left 52, top 462–587: measured clear of party column (x≤48), potions (y≥588), callouts (≤462), 방치보상 (x≥165); shares the duo/achievement band → takes turns with .acp and #battle .combo (waits; slides out early on a duo); real drops only: wraps C.rollOnce (the single equipment source, incl. auto-roll / 30연 뽑기) for r≥4 (전설/신화); slot icon in the starburst window (mythic window hue-shifted red-gold), flip-pop + rarity glow pulse, hold 1.8 s, fade; queue 3 → "외 N건"; waits while a sheet/screen is open so drops show on return; chat line untouched; DOM/CSS only */
(()=>{const C=G.C;const st=document.createElement('style');st.textContent=`
#battle .lcd{position:absolute;left:52px;top:462px;width:84px;height:125px;z-index:9;pointer-events:none;perspective:300px;--rc:#b07cff}
#battle .lcd .in{position:absolute;inset:0;animation:lcIn .55s cubic-bezier(.3,1.4,.5,1) both;transform-origin:50% 55%}
#battle .lcd .in>img.fr{position:absolute;inset:0;width:100%;height:100%;animation:lcGl 1.1s .5s ease-in-out 2 both}
#battle .lcd .wn{position:absolute;left:11px;top:27px;width:62px;height:64px;border-radius:7px;background:url(${A}loot_card.png) -11px -27px/84px 125px no-repeat}
#battle .lcd.r5 .wn{filter:hue-rotate(95deg) saturate(1.35) brightness(1.05)}
#battle .lcd .wn:after{content:'';position:absolute;inset:0;border-radius:7px;background:radial-gradient(circle,#fff6 0,#fff0 60%);animation:lcPu .9s .5s ease-in-out 2 alternate both}
#battle .lcd .ic{position:absolute;left:21px;top:36px;width:42px;height:42px;object-fit:contain;filter:drop-shadow(0 0 4px var(--rc)) drop-shadow(0 2px 2px #000a);animation:lcIc .5s .3s cubic-bezier(.3,1.6,.5,1) both}
#battle .lcd .lb{position:absolute;left:0;right:0;top:15px;text-align:center;font:900 8px Maplestory,"Noto Sans KR",sans-serif;color:#fff;letter-spacing:-.2px;text-shadow:0 0 3px var(--rc),0 1px 0 #000,1px 0 0 #000,-1px 0 0 #000}
#battle .lcd .nm{position:absolute;left:9px;width:66px;top:96px;height:14px;display:flex;align-items:center;justify-content:center;font:900 8px Maplestory,"Noto Sans KR",sans-serif;color:#fff0c8;letter-spacing:-.4px;white-space:nowrap;overflow:hidden;text-shadow:0 0 4px var(--rc),0 1px 0 #000}
#battle .lcd .mo{position:absolute;right:13px;top:79px;padding:1px 4px;border-radius:6px;background:#1a0c22d0;border:1px solid #e8c060;font:900 7.5px Maplestory,"Noto Sans KR",sans-serif;color:#ffe9a8;text-shadow:0 1px 0 #000}
#battle .lcd.out .in{animation:lcOut .4s ease-in forwards}
@keyframes lcIn{0%{opacity:0;transform:rotateY(90deg) scale(.5)}60%{opacity:1;transform:rotateY(-8deg) scale(1.08)}100%{opacity:1;transform:none}}
@keyframes lcGl{0%,100%{filter:drop-shadow(0 2px 3px #000a)}50%{filter:drop-shadow(0 0 7px var(--rc)) drop-shadow(0 2px 3px #000a)}}
@keyframes lcPu{from{opacity:.2}to{opacity:1}}
@keyframes lcIc{0%{opacity:0;transform:scale(.3)}100%{opacity:1;transform:none}}
@keyframes lcOut{to{opacity:0;transform:scale(.85) translateY(6px)}}`;document.head.appendChild(st);
new Image().src=A+'loot_card.png';
const q=[];let cur=null,busy=0,endT=0;const HOLD=1800;
const bat=()=>document.getElementById('battle');
const away=()=>G.screen||G.storyOn||(G.tab&&G.tab!='battle');
const blk=()=>!!document.querySelector('#battle .combo,#battle .acp,.vic,.bsht,.bwarn');
const fin=()=>{const d=cur;if(!d)return;if(R._lcHold){endT=setTimeout(fin,100);return}d.classList.add('out');setTimeout(()=>{d.remove();if(cur===d){cur=null;busy=0;pump()}},420)};
const show=it=>{const b=bat();if(!b){busy=0;return}const rr=D.RAR[it.r]||{},sl=D.SLOTS.find(x=>x.k==it.slot)||{};
 const d=document.createElement('div');d.className='lcd r'+it.r;d.style.setProperty('--rc',rr.c||'#b07cff');d.innerHTML=`<div class=in><img class=fr src="${A}loot_card.png" alt=""><span class=wn></span><img class=ic src="${A}${sl.img}" alt="" style="${sl.f?'filter:'+sl.f+' drop-shadow(0 0 4px '+rr.c+')':''}"><div class=lb>${rr.n} 장비 획득</div><div class=nm></div>${it.more?`<div class=mo>외 ${it.more}건</div>`:''}</div>`;d.querySelector('.nm').textContent=it.name;
 const nm=d.querySelector('.nm');b.appendChild(d);if(nm.scrollWidth>nm.clientWidth+1)nm.style.fontSize=Math.max(6.5,8*nm.clientWidth/nm.scrollWidth)+'px';cur=d;endT=setTimeout(fin,HOLD+550)};
const pump=()=>{if(busy||!q.length)return;busy=1;let w=0;const go=()=>{if(away()||(blk()&&w<8000)){if(!away())w+=150;setTimeout(go,150)}else{const it=q.shift();if(q.length){it.more=q.reduce((t,x)=>t+1+(x.more||0),0);q.length=0}show(it)}};go()};
R.lootCard=it=>{if(q.length>=3){const l=q[q.length-1];l.more=(l.more||0)+1;return}q.push(it);pump()};R._lcq=()=>{q.length=0;clearTimeout(endT);if(cur){cur.remove();cur=null}busy=0};
const ro=C.rollOnce;C.rollOnce=function(){const r=ro.apply(this,arguments);try{if(r&&r.r>=4)R.lootCard({r:r.r,slot:r.slot,name:r.name})}catch(_){}return r};
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{if(cur&&!cur.classList.contains('out')&&document.querySelector('#battle .combo')){clearTimeout(endT);fin()}}catch(_){}return r}})();

/* v205: boss WARNING banner — upgrades the existing bossWarn (.bwarn) with boss_warning.png art: stripe bars slide in from opposite sides, plaque pops with WARNING + real boss name, red edge vignette + skull glow; hands off to the VS splash; other toasts hidden while up (visual only) */
;(()=>{const st=document.createElement('style');
const TB='polygon(0 14%,36% 14%,36% 31%,16.5% 31%,16.5% 52%,0 52%)',TB2='polygon(64% 14%,100% 14%,100% 52%,83.5% 52%,83.5% 31%,64% 31%)',BB='polygon(0 68%,16.5% 68%,16.5% 92%,83.5% 92%,83.5% 68%,100% 68%,100% 100%,0 100%)',PL='polygon(16.5% 31%,36% 31%,36% 0,64% 0,64% 31%,83.5% 31%,83.5% 92%,16.5% 92%)';
st.textContent=`.bwarn.bw2{display:block;animation:bwin .12s both}.bwarn.bw2.out{animation:bw2o .38s ease-in both}
.bw2 .bwe{box-shadow:inset 0 0 70px 14px rgba(255,24,24,.6);animation:bw2v .5s ease-in-out .1s 3 alternate both}
.bw2 .bwb{position:absolute;left:0;top:calc(50% - 128px);width:390px;height:143px;filter:drop-shadow(0 6px 10px #0009)}
.bw2 .ly{position:absolute;inset:0;background:url(assets/boss_warning.png) 0 0/100% 100% no-repeat}
.bw2 .ta{clip-path:${TB};animation:bw2L .34s cubic-bezier(.2,.9,.3,1) both}.bw2 .tb{clip-path:${TB2};animation:bw2L .34s cubic-bezier(.2,.9,.3,1) both}
.bw2 .bb{clip-path:${BB};animation:bw2R .34s cubic-bezier(.2,.9,.3,1) both}
.bw2 .pl{clip-path:${PL};animation:bw2P .4s .26s cubic-bezier(.3,1.6,.5,1) both}
.bw2 .sg{position:absolute;left:50%;top:15px;width:48px;height:44px;margin-left:-24px;border-radius:50%;background:radial-gradient(#ff5a3a,#ff3a2a00 70%);mix-blend-mode:screen;animation:bw2G .45s .55s ease-in-out 3 alternate both}
.bw2 .tx{position:absolute;left:92px;width:206px;top:58px;height:66px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;animation:bw2T .3s .5s cubic-bezier(.3,1.5,.5,1) both}
.bw2 .tx b{font:900 27px/1 Maplestory,"Noto Sans KR",sans-serif;font-style:italic;letter-spacing:2px;background:linear-gradient(#fffbe0,#ffd23a 55%,#ff8a1a);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 0 #3a0400) drop-shadow(0 0 6px #ff2a1a)}
.bw2 .tx span{margin-top:5px;max-width:200px;white-space:nowrap;overflow:hidden;font:900 14px/1.1 Maplestory,"Noto Sans KR",sans-serif;color:#fff4e0;text-shadow:0 0 5px #ff2a1a,0 0 2px #ff2a1a,0 2px 1px #000}
.bw2 .tx small{font:700 10px Maplestory,"Noto Sans KR",sans-serif;color:#ffb0a0;margin-right:5px}
.bw2.lite .ta,.bw2.lite .tb,.bw2.lite .bb,.bw2.lite .pl,.bw2.lite .tx{animation:bwin .15s both}.bw2.lite .bwe,.bw2.lite .sg{display:none}
@keyframes bw2L{0%{transform:translateX(-105%)}100%{transform:none}}@keyframes bw2R{0%{transform:translateX(105%)}100%{transform:none}}
@keyframes bw2P{0%{opacity:0;transform:scale(.35)}100%{opacity:1;transform:none}}@keyframes bw2T{0%{opacity:0;transform:scale(1.8)}100%{opacity:1;transform:none}}
@keyframes bw2G{0%{opacity:0;transform:scale(.8)}100%{opacity:.85;transform:scale(1.15)}}@keyframes bw2v{0%{opacity:.25}100%{opacity:1}}
@keyframes bw2o{to{opacity:0;transform:translateX(-50%) scale(1.04)}}
body.hs-bw.hs-bw.hs-bw :is(#toastQ,#battle .acp,#battle .lcd,#battle .qsc,#battle .tdmg,#battle .tlw,#battle .mkb){opacity:0!important;transition:opacity .12s}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const ob=bossWarn;bossWarn=function(i){const r=ob.apply(this,arguments);try{const d=document.querySelector('.bwarn:not(.bw2)');if(!d||document.body.classList.contains('wbon'))return r;const pl=D.BOSSPLAN[Math.floor(i/7)],b=pl&&D.BOSSES[pl[i%7==6?1:0]];if(!b)return r;
 d.classList.add('bw2');if(lite())d.classList.add('lite');d.innerHTML=`<div class=bwe></div><div class=bwb><i class="ly ta"></i><i class="ly tb"></i><i class="ly bb"></i><i class="ly pl"></i><i class=sg></i><div class=tx><b>WARNING</b><span><small>${i%7==6?'챕터 보스 등장':'보스 등장'}</small>${b.n}</span></div></div>`;
 const T=lite()?1000:0;if(T){setTimeout(()=>d.classList.add('out'),T);setTimeout(()=>d.remove(),T+380)}}catch(e){}return r};
// hand off to the VS splash: banner exits as soon as the VS card appears (no stacking)
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);try{const d=document.querySelector('.bwarn.bw2:not(.out)');if(d&&!R._bwHold&&document.querySelector('#battle .vsx')){d.classList.add('out');setTimeout(()=>d.remove(),380)}}catch(_){}return r};
})();
/* v206: boss KO stamp — the plain .bsht "격파!" becomes the ko_stamp.png slash band slammed on the boss spot (1.8→1 overshoot, canvas shake, code shards), held ~1 s and gone before the victory card / chest (+2.05 s); keeps the .bsht node + its 1.7 s lifetime so every mutex stays as-is (visual only) */
;(()=>{const st=document.createElement('style');st.textContent=`
.bsht.ko2{left:0;right:auto;width:230px;height:166px;margin-left:-115px;animation:ko2A 1.35s linear .3s both;opacity:1}
.bsht.ko2 .kb{position:absolute;inset:0;transform-origin:52% 50%;animation:ko2S .34s cubic-bezier(.25,1.7,.5,1) .3s both}
.bsht.ko2 .kb img{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 5px 6px #0008)}
.bsht.ko2 .kt{position:absolute;left:52%;top:50%;transform:translate(-50%,-50%) rotate(-25deg);text-align:center;white-space:nowrap}
.bsht.ko2 .kt b{display:block;font:900 40px/1 Maplestory,"Noto Sans KR",sans-serif;color:#fff;-webkit-text-stroke:0;letter-spacing:2px;text-shadow:0 0 0 #000;paint-order:stroke fill;-webkit-text-stroke:5px #5a0008;filter:drop-shadow(0 3px 0 #3a0004)}
.bsht.ko2 .kt small{display:block;margin-top:3px;font:900 11px Maplestory,"Noto Sans KR",sans-serif;color:#ffe9b0;text-shadow:0 0 3px #5a0008,0 1px 1px #000,0 0 2px #5a0008}
.bsht.ko2 .ks{position:absolute;left:52%;top:50%;width:14px;height:22px;margin:-11px 0 0 -7px;background:linear-gradient(135deg,#ff6a5a,#c4101c 55%,#6a0008);clip-path:polygon(50% 0,100% 45%,50% 100%,0 45%);opacity:0;animation:ko2K .7s cubic-bezier(.2,.8,.4,1) .38s both}
.bsht.ko2 .fl{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(#fff8,#ffd23a44 45%,#0000 70%);opacity:0;animation:ko2F .35s .3s ease-out both}
.bsht.ko2.lite{animation:ko2A 1.2s linear .25s both}.bsht.ko2.lite .kb{animation:bwin .12s .25s both}.bsht.ko2.lite .ks,.bsht.ko2.lite .fl{display:none}
@keyframes ko2A{0%{opacity:0}2%{opacity:1}78%{opacity:1}100%{opacity:0}}
@keyframes ko2S{0%{transform:scale(1.8);opacity:0}45%{transform:scale(.9);opacity:1}72%{transform:scale(1.05)}100%{transform:scale(1)}}
@keyframes ko2K{0%{opacity:1;transform:translate(0,0) rotate(var(--r)) scale(.6)}80%{opacity:1}100%{opacity:0;transform:translate(var(--x),var(--y)) rotate(calc(var(--r) + 220deg)) scale(1)}}
@keyframes ko2F{0%{opacity:0;transform:scale(.4)}40%{opacity:1}100%{opacity:0;transform:scale(1.3)}}`;document.head.appendChild(st);
let pos=null;const ok=C.ev.kill;C.ev.kill=function(e){try{if(e&&e.boss&&!e.wb){const q=R._ES&&R._ES().get(e);pos=q?{x:q.x,y:q.y,h:90*(e.sc||1)*1.6,n:e.n}:null}}catch(_){}return ok&&ok.apply(this,arguments)};
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const up=d=>{if(d.classList.contains('ko2'))return;G._koT=performance.now();/* chapter card (chapterCard) waits for the stamp → then parks behind VICTORY as before */const nm=(d.querySelector('small')||{}).textContent||(pos&&pos.n)||'';const L=lite();d.classList.add('ko2');if(L)d.classList.add('lite');
 const x=pos?Math.max(140,Math.min(250,pos.x)):195,y=pos?Math.max(222,Math.min(470,pos.y-pos.h*.55-83)):300;d.style.left=x+'px';d.style.top=y+'px';
 let sh='';if(!L)for(let i=0;i<10;i++){const a=i/10*6.283+Math.random()*.4,r=95+Math.random()*55;sh+=`<i class=ks style="--x:${Math.round(Math.cos(a)*r)}px;--y:${Math.round(Math.sin(a)*r*.8)}px;--r:${Math.round(a*57)}deg;animation-delay:${(.36+Math.random()*.06).toFixed(2)}s;transform:scale(${(.7+Math.random()*.6).toFixed(2)})"></i>`}
 d.innerHTML=`<i class=fl></i>${sh}<div class=kb><img src="assets/ko_stamp.png"><div class=kt><b>격파!</b>${nm?`<small>${nm}</small>`:''}</div></div>`;
 if(!L&&(!R.opt||R.opt.shake!==false))setTimeout(()=>{const c=R._bc();if(!c)return;c.classList.remove('bdshk');void c.offsetWidth;c.classList.add('bdshk');setTimeout(()=>c.classList.remove('bdshk'),260)},420)};
const b=document.getElementById('battle');if(b)new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&n.classList.contains('bsht'))up(n)}).observe(b,{childList:true});
})();

/* v207: NEW RECORD badge — the existing "🏆 최단 기록 갱신!" pill (only when a stored 최단 record existed and was beaten) becomes record_badge.png stamped onto the victory card: NEW RECORD on the ribbon, new time in the teal centre, old time small; stamp-in overshoot + tilt + code sparkle ring (visual only; rides on the card, never delays chest/clear timing) */
;(()=>{const st=document.createElement('style');st.textContent=`
.vic .nrb{position:absolute;right:-40px;top:138px;width:116px;height:83px;z-index:5;pointer-events:none;transform:rotate(9deg);animation:nrbI .42s cubic-bezier(.25,1.7,.5,1) .75s both}
.vic .nrb img{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 4px 5px #0009)}
.vic .nrb .nt{position:absolute;left:50%;top:41%;transform:translate(-50%,-50%);font:900 15px/1 Maplestory,"Noto Sans KR",sans-serif;color:#fff;white-space:nowrap;text-shadow:0 0 3px #003a40,0 1px 0 #003a40,0 0 6px #4ff}
.vic .nrb .nl{position:absolute;left:50%;top:62%;transform:translate(-50%,-50%) rotate(-8deg);font:900 11.5px/1 Maplestory,"Noto Sans KR",sans-serif;color:#fff;letter-spacing:.5px;white-space:nowrap;-webkit-text-stroke:3px #6a0010;paint-order:stroke fill}
.vic .nrb .no{position:absolute;left:50%;top:86%;transform:translate(-50%,-50%);font:800 7.5px/1 Maplestory,"Noto Sans KR",sans-serif;color:#c8f4ff;white-space:nowrap;text-shadow:0 1px 1px #002a30}
.vic .nrb .ring{position:absolute;left:50%;top:45%;width:10px;height:10px;margin:-5px;border-radius:50%;border:3px solid #fff6c0;box-shadow:0 0 10px 3px #ffd23a,inset 0 0 6px #ffd23a;opacity:0;animation:nrbR .6s ease-out .9s both}
.vic .nrb .sp{position:absolute;left:50%;top:45%;width:9px;height:9px;margin:-4.5px;background:radial-gradient(#fff,#ffe27a 40%,#ffe27a00 70%);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);opacity:0;animation:nrbS .7s ease-out both}
.vic .nrb.lite{animation:nrbL .2s .5s both}@keyframes nrbL{from{opacity:0}to{opacity:1}}.vic .nrb.lite .ring,.vic .nrb.lite .sp{display:none}
@keyframes nrbI{0%{opacity:0;transform:rotate(-6deg) scale(2.2)}55%{opacity:1;transform:rotate(11deg) scale(.88)}80%{transform:rotate(8deg) scale(1.06)}100%{opacity:1;transform:rotate(9deg) scale(1)}}
@keyframes nrbR{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(16)}}
@keyframes nrbS{0%{opacity:0;transform:translate(0,0) scale(.4)}25%{opacity:1}100%{opacity:0;transform:translate(var(--x),var(--y)) scale(1.3) rotate(90deg)}}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
G._brPut=(t,old)=>{let k=0;const put=()=>{const v=[...document.querySelectorAll('.vic.win:not(.out)')].pop();if(v){if(v.querySelector('.nrb,.nrec'))return;const L=lite();let sp='';if(!L)for(let i=0;i<12;i++){const a=i/12*6.283,r=58+(i%2)*14;sp+=`<i class=sp style="--x:${Math.round(Math.cos(a)*r)}px;--y:${Math.round(Math.sin(a)*r*.8)}px;animation-delay:${(.92+(i%3)*.04).toFixed(2)}s"></i>`}
 const f=x=>x==null?'':(+x).toFixed(1)+'초';v.insertAdjacentHTML('beforeend',`<div class="nrb${L?' lite':''}"><i class=ring></i>${sp}<img src="assets/record_badge.png"><b class=nt>${t!=null?f(t):'최단'}</b><b class=nl>NEW RECORD</b>${old!=null?`<span class=no>이전 ${f(old)}</span>`:''}</div>`);return}if(k++<40)setTimeout(put,100)};put()};
})();

/* v208: 화룡전식 3-star crest on stage-map nodes — uses the real saved v42 rating (G.stStar(i)==3: boss beaten with no ally lost in <60s); ★1-2 nodes keep their star row. A node seen ★3 for the first time pops + one shine sweep (seen-set kept in localStorage, not the save; first run seeds silently). Visual only. */
;(()=>{const st=document.createElement('style');st.textContent=`
.snode .ncr{position:absolute;left:50%;top:-10px;margin-left:12px;width:30px;height:32px;z-index:3;pointer-events:none;filter:drop-shadow(0 2px 2px #000a)}
.snode.bs .ncr{top:-6px;margin-left:-50px;width:34px;height:36px}
.snode .ncr img{width:100%;height:100%;display:block}
.snode .ncr::after{content:'';position:absolute;inset:0;-webkit-mask:url(assets/crest_3star.png) center/100% 100%;mask:url(assets/crest_3star.png) center/100% 100%;background:linear-gradient(110deg,#fff0 35%,#fffbe0e6 50%,#fff0 65%) -60px 0/200% 100% no-repeat;opacity:0}
.snode.s3 small{visibility:hidden}
.snode .ncr.nw{animation:ncrP .55s cubic-bezier(.3,1.8,.5,1) .25s both}
.snode .ncr.nw::after{animation:ncrS .9s ease-in-out .75s both}
.snode .ncr.nw i{position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:50%;border:2px solid #fff3b0;box-shadow:0 0 6px #ffd23a;opacity:0;animation:ncrR .55s ease-out .45s both}
@keyframes ncrP{0%{opacity:0;transform:scale(2.4) rotate(-14deg)}60%{opacity:1;transform:scale(.85) rotate(4deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes ncrS{0%{opacity:1;background-position:-60px 0}100%{opacity:1;background-position:60px 0}}
@keyframes ncrR{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(6)}}
.snode .ncr.lite,.snode .ncr.lite::after{animation:none}.snode .ncr.lite i{display:none}`;document.head.appendChild(st);
const K='slayers_s3seen',ld=()=>{try{return JSON.parse(localStorage.getItem(K))}catch(_){return null}},sv=o=>{try{localStorage.setItem(K,JSON.stringify(o))}catch(_){}};
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const deco=()=>{if(G.screen!='map'||!G.stStar)return;let seen=ld();const first=!seen;if(first){seen={};const s=C.S();for(let i=0;i<D.FIELDS.length;i++)if(G.stStar(i)>=3)seen[i]=1}
 let ch=0;const L=lite();document.querySelectorAll('#screen .snode').forEach(n=>{const i=+n.dataset.n;if(n.classList.contains('lk')||G.stStar(i)<3||n.querySelector('.ncr'))return;const nw=!seen[i];seen[i]=1;if(nw)ch=1;n.classList.add('s3');
  n.insertAdjacentHTML('beforeend',`<span class="ncr${nw?' nw':''}${L?' lite':''}" title="★3 완전 클리어">${nw?'<i></i>':''}<img src="assets/crest_3star.png" alt="★3"></span>`)});if(first||ch)sv(seen)};
G.s3Deco=deco;const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();})();

/* v209: 화룡전식 chapter conquest seal — a chapter whose 7 stages are all really ★3 (saved v42 rating via G.stStar) gets seal_conquer.png stamped on its chapter-view banner with a "완전 정복" plaque, and a small seal (seal_conquer_s.png) on its world-map pin. First-time stamp pop tracked in localStorage (first run seeds existing conquests silently); respects 스킬 연출 / graphics quality. Visual only. */
;(()=>{const st=document.createElement('style');st.textContent=`
.cban .csl{position:absolute;right:4px;top:-12px;width:66px;height:85px;z-index:3;pointer-events:none;transform:rotate(-8deg);filter:drop-shadow(0 3px 3px #000b)}
.cban .csl img{width:100%;height:100%;display:block}
.cban .cslb{position:absolute;right:74px;top:50%;transform:translateY(-50%);padding:2px 9px 3px;border-radius:9px;background:linear-gradient(#8a1a14,#4a0a08);border:1.5px solid #ffd77a;color:#ffe9a0;font:900 12px Maplestory,sans-serif;white-space:nowrap;text-shadow:0 1px 1px #000;box-shadow:0 2px 4px #0008;z-index:3}
.wpin .wsl{position:absolute;left:50%;top:-8px;margin-left:-46px;width:32px;height:41px;z-index:3;pointer-events:none;transform:rotate(-8deg);filter:drop-shadow(0 2px 2px #000a)}
.wpin.cur .wsl{margin-left:-52px;top:-12px}
.wpin .wsl img{width:100%!important;height:100%!important;display:block;filter:none!important;animation:none!important}
.csl.nw{animation:cslP .6s cubic-bezier(.3,1.7,.5,1) .35s both}.cslb.nw{animation:cslL .3s ease-out .85s both}
.csl.nw i{position:absolute;left:50%;top:55%;width:12px;height:12px;margin:-6px;border-radius:50%;border:3px solid #fff3b0;box-shadow:0 0 10px #ffd23a;opacity:0;animation:cslR .6s ease-out .6s both}
.cban.cshk{animation:cslK .25s ease-out .6s}
.wsl.nw{animation:cslP .5s cubic-bezier(.3,1.7,.5,1) .3s both}
@keyframes cslP{0%{opacity:0;transform:scale(2.6) rotate(-22deg)}55%{opacity:1;transform:scale(.88) rotate(-5deg)}100%{opacity:1;transform:scale(1) rotate(-8deg)}}
@keyframes cslL{from{opacity:0;transform:translateY(-50%) translateX(10px)}to{opacity:1;transform:translateY(-50%)}}
@keyframes cslR{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(7)}}
@keyframes cslK{0%,100%{translate:0 0}30%{translate:0 3px}60%{translate:0 -1px}}
.csl.lite,.cslb.lite,.wsl.lite,.cban.lite{animation:none!important}.csl.lite i{display:none}`;document.head.appendChild(st);
const K='slayers_ch3seen',ld=()=>{try{return JSON.parse(localStorage.getItem(K))}catch(_){return null}},sv=o=>{try{localStorage.setItem(K,JSON.stringify(o))}catch(_){}};
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const NC=()=>Math.floor((D.FIELDS.length+6)/7);
const full=c=>{if(!G.stStar)return false;for(let i=c*7;i<c*7+7;i++){if(i>=D.FIELDS.length||G.stStar(i)<3)return false}return true};G.chConq=full;
const deco=()=>{if(G.screen!='map')return;let seen=ld();const first=!seen;if(first){seen={};for(let c=0;c<NC();c++)if(full(c))seen[c]=1}
 const L=lite(),li=L?' lite':'';let ch=0;
 const ban=document.querySelector('#screen .cban');if(ban&&G.mapCh>=0&&!ban.querySelector('.csl')&&full(G.mapCh)){const c=G.mapCh,nw=!seen[c];seen[c]=1;if(nw){ch=1;ban.classList.add('cshk');if(L)ban.classList.add('lite')}
  ban.insertAdjacentHTML('beforeend',`<span class="cslb${nw?' nw':''}${li}">완전 정복</span><span class="csl${nw?' nw':''}${li}">${nw?'<i></i>':''}<img src="assets/seal_conquer.png" alt="완전 정복"></span>`)}
 document.querySelectorAll('#screen .wpin[data-ch]').forEach(p=>{const c=+p.dataset.ch;if(p.classList.contains('lk')||p.querySelector('.wsl')||!full(c))return;const nw=!seen[c];seen[c]=1;if(nw)ch=1;
  p.insertAdjacentHTML('beforeend',`<span class="wsl${nw?' nw':''}${li}"><img src="assets/seal_conquer_s.png" alt="완전 정복"></span>`)});
 if(first||ch)sv(seen)};
G.chSealDeco=deco;const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();})();

/* v210: 화룡전식 locked-region gate on world-map pins — the next locked chapter shows gate_locked.png with its real unlock rule on the scroll (chapter c opens when maxSi reaches c*7, i.e. the previous chapter's boss is beaten — same rule as the map's lock check and its "이전 장의 보스를 처치하세요" toast); further locked chapters get a smaller dim gate. Keyhole glow pulse. A newly unlocked chapter plays a one-time gate-break (shake, keyhole flash, chains/lock drop) tracked in localStorage (first run seeds silently). Respects 스킬 연출 / graphics quality. Visual only. */
;(()=>{const st=document.createElement('style');st.textContent=`
.wpin.lk>img:first-child{display:none!important}
.wpin .wgt{position:relative;display:block;width:100px;height:122px;margin-bottom:-14px;filter:drop-shadow(0 4px 5px #000b);pointer-events:none}
.wpin .wgt img{width:100%!important;height:100%!important;display:block;filter:none!important;animation:none!important}
.wpin .wgt .kh{position:absolute;left:49.8%;top:59%;width:16px;height:22px;margin:-11px 0 0 -8px;border-radius:50%;background:radial-gradient(#9ef4ff,#3ab8ff88 45%,#3ab8ff00 72%);mix-blend-mode:screen;animation:wgtK 2.2s ease-in-out infinite}
.wpin .wgt .gt{position:absolute;left:23%;right:21%;top:73%;height:14%;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 7.6px/1.05 Maplestory,sans-serif;color:#4a2a0e;text-align:center;white-space:nowrap;letter-spacing:-.2px}
.wpin.far .wgt{width:54px;height:66px;margin-bottom:-6px;opacity:.72;filter:grayscale(.45) brightness(.8) drop-shadow(0 3px 3px #000a)}
.wpin.far .wgt .gt{display:none}.wpin.far .wgt .kh{animation:none;opacity:.35}
.wpin.lk.nxt b{margin-top:0}
@keyframes wgtK{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1.25)}}
.wpin .wgo{position:absolute!important;left:50%!important;top:0!important;width:100px;height:122px;margin:-30px 0 0 -50px!important;filter:drop-shadow(0 4px 5px #000b);z-index:6;pointer-events:none;animation:wgoS .5s ease-in-out .3s both}
.wgo img{position:absolute;inset:0;width:100%!important;height:100%!important;filter:none!important;animation:none!important}
.wgo .wl{clip-path:polygon(0 0,100% 0,100% 72%,0 72%);animation:wgoB .55s ease-in .85s both}
.wgo .wr{clip-path:polygon(0 72%,100% 72%,100% 100%,0 100%);animation:wgoF .5s ease-in .9s both}
.wgo .wf{position:absolute;left:49.8%;top:59%;width:20px;height:20px;margin:-10px;border-radius:50%;background:radial-gradient(#fff,#9ef4ff 40%,#3ab8ff00 70%);opacity:0;animation:wgoX .6s ease-out .7s both}
@keyframes wgoS{0%,100%{transform:translate(0)}20%{transform:translate(-3px,1px) rotate(-2deg)}40%{transform:translate(3px,-1px) rotate(2deg)}60%{transform:translate(-2px,0) rotate(-1deg)}80%{transform:translate(2px,0)}}
@keyframes wgoB{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(70px) rotate(8deg) scale(.9)}}
@keyframes wgoF{0%{opacity:1;transform:none}100%{opacity:0;transform:translateY(40px) rotate(-6deg)}}
@keyframes wgoX{0%{opacity:0;transform:scale(.4)}35%{opacity:1;transform:scale(3)}100%{opacity:0;transform:scale(9)}}
.wgt.lite .kh{animation:none;opacity:.7}
.wpin.lk span.wgt{filter:drop-shadow(0 4px 5px #000b)!important;opacity:1!important;text-shadow:none!important}
.wpin.lk.far span.wgt{filter:grayscale(.45) brightness(.8) drop-shadow(0 3px 3px #000a)!important;opacity:.72!important}
.wpin.lk .wgt span{filter:none!important;opacity:1!important;color:#4a2a0e!important;text-shadow:0 0 1px #f6e2b0!important;font:900 7.6px/1.1 Maplestory,sans-serif!important}
.wpin.lk .wgt span.gt{display:flex}.wpin.lk.far .wgt span.gt{display:none}`;document.head.appendChild(st);
const K='slayers_gateseen',ld=()=>{try{return JSON.parse(localStorage.getItem(K))}catch(_){return null}},sv=o=>{try{localStorage.setItem(K,JSON.stringify(o))}catch(_){}};
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const deco=()=>{if(G.screen!='map')return;const pins=[...document.querySelectorAll('#screen .wpin[data-ch]')];if(!pins.length)return;const s=C.S(),mx=Math.floor(Math.min(s.maxSi,D.FIELDS.length-1)/7),L=lite();
 let seen=ld();const first=!seen;if(first){seen={};for(let c=0;c<=mx;c++)seen[c]=1}let ch=0;
 pins.forEach(p=>{const c=+p.dataset.ch;if(p.querySelector('.wgt,.wgo'))return;
  if(c>mx){const nx=c==mx+1;p.classList.add(nx?'nxt':'far');const im=p.querySelector('img');
   im.insertAdjacentHTML('afterend',`<span class="wgt${L?' lite':''}"><img src="assets/${nx?'gate_locked.png':'gate_locked_s.png'}" alt="잠김"><i class=kh></i>${nx?`<span class=gt><span>제${c}장 보스</span><span>처치 시 개방</span></span>`:''}</span>`);return}
  if(!seen[c]){seen[c]=1;ch=1;if(!L)p.insertAdjacentHTML('beforeend',`<div class=wgo><img class=wl src="assets/gate_locked.png"><img class=wr src="assets/gate_locked.png"><i class=wf></i></div>`);const g=p.querySelector('.wgo');g&&setTimeout(()=>g.remove(),1700)}});
 if(first||ch)sv(seen)};
G.gateDeco=deco;const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();})();

/* v211: 화룡전식 "새 지역 개방" region banner (assets/region_banner.png) — once per chapter, only when a chapter really newly opens (maxSi crosses c*7; same rule as the world-map lock). In battle it waits until the boss-clear flow (KO stamp, VICTORY card, chest, chapter card, content-unlock pop) is gone; on the world map it waits for the v210 gate-break. Unfurl → light sweep → fade (~2.4 s); lite (스킬 연출 off / 절전 graphics): plain fade, no sweep. Tracked in localStorage slayers_rbseen (first run seeds silently). Visual only. */
;(()=>{const st=document.createElement('style');st.textContent=`
.rgb{position:fixed;left:50%;top:31%;width:372px;height:139px;margin-left:-186px;z-index:9000;pointer-events:none;animation:rgbIn .55s cubic-bezier(.2,1.3,.4,1) both,rgbOut .45s ease-in 2.0s forwards}
.rgb>img{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 6px 10px #000c)}
.rgb .sw{position:absolute;left:19%;right:13%;top:27%;bottom:25%;overflow:hidden;border-radius:10px/40%}
.rgb .sw:after{content:'';position:absolute;top:-20%;bottom:-20%;left:-40%;width:35%;background:linear-gradient(100deg,#fff0,#fff8 50%,#fff0);transform:skewX(-18deg);animation:rgbSw .8s ease-in-out .55s both}
.rgb .tx{position:absolute;left:19%;right:13%;top:27%;bottom:25%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;text-align:center}
.rgb .tx small{font:900 11.5px Maplestory,sans-serif;color:#ffd96a;letter-spacing:2px;text-shadow:0 1px 0 #5a3a00,0 0 4px #000a}
.rgb .tx b{font:900 21px/1.1 Maplestory,sans-serif;color:#fff6dc;white-space:nowrap;-webkit-text-stroke:1px #1a1030;paint-order:stroke fill;text-shadow:0 2px 0 #10082a,0 0 6px #0008;animation:rgbT .5s ease-out .3s both}
.rgb.lite{animation:rgbF .25s ease-out both,rgbOut .35s ease-in 1.8s forwards}.rgb.lite .sw{display:none}.rgb.lite .tx b{animation:none}
@keyframes rgbIn{0%{opacity:0;transform:scaleX(.08) scaleY(.6);clip-path:inset(0 46% 0 46%)}60%{opacity:1;clip-path:inset(0 0 0 0)}100%{opacity:1;transform:none;clip-path:inset(0 0 0 0)}}
@keyframes rgbSw{0%{left:-40%}100%{left:120%}}
@keyframes rgbT{0%{opacity:0;transform:translateY(6px) scale(.9)}100%{opacity:1;transform:none}}
@keyframes rgbF{from{opacity:0}to{opacity:1}}
@keyframes rgbOut{to{opacity:0;transform:translateY(-14px) scale(.96)}}`;document.head.appendChild(st);
const K='slayers_rbseen',ld=()=>{try{return JSON.parse(localStorage.getItem(K))}catch(_){return null}},sv=o=>{try{localStorage.setItem(K,JSON.stringify(o))}catch(_){}};
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const mxc=()=>{const s=C.S();return Math.floor(Math.min(s.maxSi||0,D.FIELDS.length-1)/7)};
let seen=ld();if(!seen){seen={};for(let c=0;c<=mxc();c++)seen[c]=1;sv(seen)}
let q=[],on=0,pend=0,vicT=0;G._rbLog=[];
/* the chapter card is queued at stage advance but only shows after VICTORY clears — hold the banner until that card has appeared (or 16 s safety) */
if(typeof chapterCard=='function'){const oc=chapterCard;chapterCard=function(){pend=performance.now();return oc.apply(this,arguments)}}
const busy=()=>{const n=performance.now();if(document.querySelector('.vic:not(.out)'))vicT=n;if(pend&&(document.querySelector('.chap')||n-pend>16000))pend=0;return pend||n-vicT<900||bz()};const bz=()=>G.storyOn||(G.screen&&G.screen!='map')||(C.B&&C.B.boss)||performance.now()-(G._koT||-1e9)<2500||document.querySelector('.vic:not(.out),.bchest,.chap,.rwpop,.modal,.unl,.sty,.bsht,.wgo,.rgb');
const show=c=>{const L=lite(),d=document.createElement('div');d.className='rgb'+(L?' lite':'');d.innerHTML=`<img src="assets/region_banner.png" alt=""><div class=sw></div><div class=tx><small>새 지역 개방</small><b>제${c+1}장 ${D.CH[c]||''}</b></div>`;document.body.appendChild(d);G._rbLog.push([c,Math.round(performance.now()),L?'lite':'full']);on=1;setTimeout(()=>{d.remove();on=0},L?2200:2500)};
const tick=()=>{const m=mxc();for(let c=0;c<=m;c++)if(!seen[c]){seen[c]=1;sv(seen);q.push(c)}
 if(q.length&&!on&&!busy())show(q.shift())};
setInterval(()=>{try{tick()}catch(e){console.warn(e)}},300);G.regionBanner=show;G._rbSeen=seen;})();

/* v212: 화룡전식 fog over locked regions on the world map — 2–3 fog_cloud.png instances per locked chapter (varied scale/flip) with a slow CSS-only drift. The next locked chapter's clouds sit behind its pin so the v210 gate + scroll stay on top; farther chapters are covered more fully (one cloud over the pin, small gate peeking). On a real unlock (v210 gate-break playing on that pin) the clouds part outward and fade before the lock drops; the v211 banner keeps its timing. Lite (스킬 연출 off / 절전 graphics): static clouds, no parting — they're simply gone once unlocked. Visual only. */
;(()=>{const st=document.createElement('style');st.textContent=`
.wmin .wpin{z-index:3}.wmin .wpin.nxt{z-index:5}.wmin .wlina{z-index:6}.wmin .wpin:has(.wgo){z-index:6}
.wfog{position:absolute;pointer-events:none;z-index:2;margin:0;will-change:transform}
.wfog.ov{z-index:4}
.wfog i{display:block;width:100%;height:100%;background:url(assets/fog_cloud.png) center/100% 100% no-repeat;animation:wfgD var(--d,18s) ease-in-out var(--dl,0s) infinite alternate}
.wfog.fl i{transform:scaleX(-1);animation-name:wfgDf}
@keyframes wfgD{from{transform:translateX(calc(var(--a,12px)*-1))}to{transform:translateX(var(--a,12px))}}
@keyframes wfgDf{from{transform:scaleX(-1) translateX(calc(var(--a,12px)*-1))}to{transform:scaleX(-1) translateX(var(--a,12px))}}
.wfog.lite i{animation:none!important}
.wfog.pt{z-index:7;animation:wfgP 1.05s cubic-bezier(.3,0,.6,1) both}
.wfog.pt i{animation:none}
@keyframes wfgP{0%{transform:translate(0) scale(1);opacity:1}100%{transform:translate(var(--px,0),var(--py,0)) scale(1.18);opacity:0}}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
// [dx,dy,w,flip,over-pin] around the pin centre (px in world space)
const NX=[[-125,-8,250,0,0],[118,18,236,1,0],[-10,64,300,0,0]],FR=[[-112,-18,250,1,0],[104,12,244,0,0],[0,-2,190,0,1]];
const put=(wm,p,lay,cls,L,k)=>{const x=parseFloat(p.style.left)/100*wm.clientWidth,y=parseFloat(p.style.top)/100*wm.clientHeight;
 lay.forEach(([dx,dy,w,fl,ov],j)=>{const h=Math.round(w*.432),e=document.createElement('div');e.className=`wfog ${cls}${fl?' fl':''}${ov?' ov':''}${L?' lite':''}`;e.dataset.ch=p.dataset.ch;
  e.style.cssText=`left:${Math.round(x+dx-w/2)}px;top:${Math.round(y+dy-h/2)}px;width:${w}px;height:${h}px;--d:${15+((k*3+j)*7)%9}s;--dl:-${((k+j)*5)%11}s;--a:${10+j*4}px;--px:${dx<0?-110:dx>0?110:0}px;--py:${dy<0?-40:30}px`+(ov?';opacity:.8':'');
  e.innerHTML='<i></i>';wm.insertBefore(e,wm.firstChild.nextSibling)})};
const deco=()=>{if(G.screen!='map')return;const wm=document.querySelector('#screen .wmin');if(!wm||wm.querySelector('.wfog'))return;const L=lite();
 [...wm.querySelectorAll('.wpin[data-ch]')].forEach((p,k)=>{if(p.classList.contains('nxt'))put(wm,p,NX,'',L,k);else if(p.classList.contains('far'))put(wm,p,FR,'',L,k);
  else if(p.querySelector('.wgo')){put(wm,p,NX,'pt',L,k);setTimeout(()=>wm.querySelectorAll('.wfog.pt').forEach(x=>x.remove()),1200)}})};
G.fogDeco=deco;const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();})();

/* v213: (fix) background-battle skill cut-ins (.bcut) no longer draw over full screens (map/menus), notices or story — same body.hs-* flags the toasts use; the battle keeps running underneath.
   + 화룡전식 locked-region preview: tapping a locked world-map pin opens region_preview.png with a darkened silhouette of that chapter's real end boss (D.BOSSPLAN[c][1] → D.BOSSES img; "?" emblem if the art is missing), "제N장 {D.CH}" and the real unlock rule on the parchment. Pop-in + breathing violet rim glow; lite = static. Close: tap outside or ✕. Visual only. */
;(()=>{const st=document.createElement('style');st.textContent=`
body:is(.hs-scr,#_x.hs_x) .bcut,body.hs-nt .bcut,body.hs-sty .bcut,body.hs-mod .bcut{display:none!important}
.rpv{position:fixed;inset:0;z-index:9500;background:#0009;display:flex;align-items:center;justify-content:center;animation:rpvB .2s ease-out both}
.rpv .rc{position:relative;width:300px;height:435px;animation:rpvP .42s cubic-bezier(.2,1.4,.4,1) both}
.rpv .rc>img.fr{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 10px 18px #000c)}
.rpv .win{position:absolute;left:12%;right:12%;top:19%;bottom:42%;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;border-radius:18px}
.rpv .win img{max-width:92%;max-height:96%;object-fit:contain;filter:brightness(0) drop-shadow(0 0 3px #c9a2ff) drop-shadow(0 0 9px #8a5cff);animation:rpvG 2.6s ease-in-out infinite}
.rpv .win .q{align-self:center;font:900 92px/1 Maplestory,sans-serif;color:#1a0f2e;text-shadow:0 0 6px #c9a2ff,0 0 16px #8a5cff;animation:rpvG 2.6s ease-in-out infinite}
.rpv .pt{position:absolute;left:14%;right:14%;top:66%;bottom:9%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;text-align:center;color:#4a2a0e;font-family:Maplestory,sans-serif}
.rpv .pt small{font-weight:900;font-size:11px;letter-spacing:2px;color:#7a5326}
.rpv .pt b{font-weight:900;font-size:18px;line-height:1.15}
.rpv .pt span{font-weight:700;font-size:13px;padding:3px 10px;border-radius:9px;background:#5a3a1a1c;border:1px solid #7a532655}
.rpv .x{position:absolute;right:-4px;top:-4px;width:30px;height:30px;border-radius:50%;background:radial-gradient(#6a4a2a,#2a1a0a);border:2px solid #e0b860;color:#ffe9b0;font:900 15px/26px sans-serif;text-align:center;cursor:pointer;box-shadow:0 2px 5px #000a;z-index:2}
.rpv.lite,.rpv.lite .rc{animation:none}.rpv.lite .win img,.rpv.lite .win .q{animation:none}
@keyframes rpvB{from{opacity:0}to{opacity:1}}
@keyframes rpvP{0%{transform:scale(.55);opacity:0}100%{transform:none;opacity:1}}
@keyframes rpvG{0%,100%{filter:brightness(0) drop-shadow(0 0 2px #c9a2ff) drop-shadow(0 0 6px #8a5cff);transform:scale(1)}50%{filter:brightness(0) drop-shadow(0 0 4px #e0ccff) drop-shadow(0 0 14px #a77bff);transform:scale(1.025)}}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const open=c=>{document.querySelectorAll('.rpv').forEach(x=>x.remove());const pl=(D.BOSSPLAN||[])[c],bo=pl&&D.BOSSES&&D.BOSSES[pl[1]],L=lite();
 const d=document.createElement('div');d.className='rpv'+(L?' lite':'');
 d.innerHTML=`<div class=rc><img class=fr src="assets/region_preview.png" alt=""><span class=x>✕</span><div class=win>${bo&&bo.img?`<img src="assets/${bo.img}" alt="">`:'<span class=q>?</span>'}</div><div class=pt><small>잠긴 지역</small><b>제${c+1}장 ${D.CH[c]||''}</b><span>제${c}장 보스 처치 시 개방</span></div></div>`;
 const im=d.querySelector('.win img');if(im)im.onerror=()=>{im.replaceWith(Object.assign(document.createElement('span'),{className:'q',textContent:'?'}))};
 d.onclick=e=>{if(e.target===d||e.target.classList.contains('x'))d.remove()};document.body.appendChild(d);return d};
G.regionPreview=open;
const deco=()=>{if(G.screen!='map')return;const s=C.S(),mx=Math.floor(Math.min(s.maxSi,D.FIELDS.length-1)/7);
 document.querySelectorAll('#screen .wpin[data-ch]').forEach(p=>{const c=+p.dataset.ch;if(c>mx&&!p._rpv){p._rpv=1;p.onclick=()=>open(c)}})};
const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();
// leaving the map closes the preview
setInterval(()=>{if(G.screen!='map')document.querySelectorAll('.rpv').forEach(x=>x.remove())},500);})();

/* v214: 화룡전식 chapter star chests on the world map — visualises the existing v42 star-reward system (thresholds ★7/★14/★21, rewards and claim via G.starClaim; nothing new granted). Each unlocked chapter pin gets a row of 3 chests (schest_1/2/3.png): locked = dim + "★t", claimable = glow bounce + red dot, claimed = schest_open.png dimmed. Tap claimable → real G.starClaim, lid-open pop + reward icons fly to the HUD (.atfly) + toast. Lite = no bounce/open/fly. */
;(()=>{const T=[7,14,21],IC={gems:'it2_gem.png',stone:'it2_stone.png',orbs:'it2_exp.png',tk:'it2_ticket.png'};
const st=document.createElement('style');st.textContent=`
.wpin .wsc{position:absolute;left:50%;top:100%;margin-top:22px;transform:translateX(-50%);display:flex;gap:1px;z-index:4;pointer-events:auto}
.wpin .wsc i{position:relative;display:block;width:30px;height:28px;font-style:normal;cursor:pointer}
.wpin .wsc i img{width:30px;height:28px;object-fit:contain;filter:drop-shadow(0 2px 2px #0008)}
.wpin .wsc i u{position:absolute;left:0;right:0;bottom:-7px;text-align:center;font:900 9px/1 Maplestory,sans-serif;color:#fff3c0;text-decoration:none;text-shadow:0 0 2px #000,0 1px 2px #000}
.wpin .wsc i.lo img{filter:grayscale(.55) brightness(.72) drop-shadow(0 2px 2px #0008)}
.wpin .wsc i.lo u{color:#cfc6b0}
.wpin .wsc i.dn img{opacity:.55;filter:grayscale(.35) drop-shadow(0 2px 2px #0006)}
.wpin .wsc i.dn u{color:#bfe8a0}
.wpin .wsc i.ok img{filter:drop-shadow(0 0 4px #ffe066) drop-shadow(0 0 9px #ffb820);animation:wscB 1.1s ease-in-out infinite}
.wpin .wsc i.ok:after{content:'';position:absolute;right:-1px;top:-2px;width:9px;height:9px;border-radius:50%;background:#ff3b3b;border:1.5px solid #fff;box-shadow:0 0 3px #f00}
.wpin .wsc i.opn img{animation:wscO .55s cubic-bezier(.2,1.6,.4,1) both}
.lite-sc .wpin .wsc i.ok img,.lite-sc .wpin .wsc i.opn img{animation:none}
@keyframes wscB{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-4px) scale(1.08)}60%{transform:translateY(-1px) scale(1.02)}}
@keyframes wscO{0%{transform:scale(.6) rotate(-8deg)}60%{transform:scale(1.35)}100%{transform:scale(1);opacity:.55}}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
const html=c=>{const s=C.S(),sc=s.schest||{},n=G.chStars(c);return T.map((t,j)=>{const dn=sc[c+'_'+j],ok=!dn&&n>=t;return `<i data-sc=${j} class="${dn?'dn':ok?'ok':'lo'}"><img src="assets/${dn?'schest_open':'schest_'+(j+1)}.png" alt=""><u>${dn?'✓':'★'+t}</u></i>`}).join('')};
const fly=(w,from)=>{const app=document.getElementById('app'),ar=app.getBoundingClientRect(),sc=ar.width/390,f=from.getBoundingClientRect();/* v215: per-currency target */
 Object.keys(IC).filter(k=>w[k]).forEach((k,q)=>{const tg=(G.curTarget&&G.curTarget(k))||document.querySelector('#screen .shead');if(!tg)return;const t=tg.getBoundingClientRect();if(G.curHold)G.curHold(k,850+q*120);const c=document.createElement('img');c.src='assets/'+IC[k];c.className='atfly scfly';c.style.left=((f.left-ar.left)/sc+f.width/sc/2-18+q*10)+'px';c.style.top=((f.top-ar.top)/sc-10)+'px';c.style.animationDelay=(q*.12)+'s';c.style.setProperty('--dx',((t.left+t.width/2-f.left-f.width/2)/sc-q*10)+'px');c.style.setProperty('--dy',((t.top+t.height/2-f.top)/sc+10)+'px');app.appendChild(c);setTimeout(()=>c.remove(),1100+q*120)})};
const nm={gems:'젬',stone:'강화석',orbs:'경험 구슬',tk:'티켓'};
const tap=(c,j,el,pin)=>{const r=G.starClaim(c,j);if(typeof r!='object'){if(r=='need')toast(`★${T[j]} 달성 시 수령 (현재 ★${G.chStars(c)}/21)`);else toast('이미 수령한 보상입니다');return}
 const L=lite();el.className='dn'+(L?'':' opn');el.querySelector('img').src='assets/schest_open.png';el.querySelector('u').textContent='✓';if(!L)fly(r,el);G.lastSC={c,j,r};
 toast('별 보상 획득! '+Object.keys(nm).filter(k=>r[k]).map(k=>nm[k]+' +'+r[k]).join(' · '));try{updateHud()}catch(_){}};
const deco=()=>{if(G.screen!='map'||!G.chStars)return;const sc=document.querySelector('#screen');sc.classList.toggle('lite-sc',lite());
 sc.querySelectorAll('.wpin[data-ch]:not(.lk)').forEach(p=>{if(p.querySelector('.wsc'))return;const c=+p.dataset.ch;const d=document.createElement('div');d.className='wsc';d.innerHTML=html(c);p.appendChild(d);
  d.onclick=e=>{e.stopPropagation();const i=e.target.closest('[data-sc]');if(i)tap(c,+i.dataset.sc,i,p)}})};
G.schDeco=deco;
const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();})();

/* v215: 화룡전식 map header currencies + stage info panel. (1) World map / chapter header shows real gold · 젬 · 강화석 · 티켓 (it2_* icons) instead of gold only; reward flies (v214 star chests) target the matching chip (경험 구슬 → the existing orb counter #navroll; unknown → gold), the number ticks up on arrival with a pulse. (2) Tapping an unlocked stage node opens a stage panel first (real data: C.stageReq vs C.POW, D.FIELDMON monsters, stage boss from D.BOSSPLAN, C.goldKill, first-clear gems rule of v41 (30 / 100 on x-7, until cleared), ★ from G.stStar) with 이동 → the original select-stage action. Visual only. */
;(()=>{const CUR=[['gold','it2_gold.png',s=>s.gold],['gems','it2_gem.png',s=>s.gems],['stone','it2_stone.png',s=>s.stone||0],['tk','it2_ticket.png',s=>s.tickets||0]];
const st=document.createElement('style');st.textContent=`
#screen .shead .mcur{display:flex;gap:3px;margin-left:auto;flex:none}
#screen .shead .mcur .mc{display:flex;align-items:center;gap:2px;height:22px;padding:0 6px 0 2px;border-radius:11px;background:linear-gradient(#11161b,#262c33);border:1px solid #c9953f99;font:700 11px/1 Maplestory,sans-serif;color:#fff3d0;white-space:nowrap;box-shadow:inset 0 1px 0 #ffffff1a}
#screen .shead .mcur .mc img{width:18px;height:18px;object-fit:contain;filter:drop-shadow(0 1px 1px #000a)}
#screen .shead .mcur .mc.pz{animation:mcP .45s ease-out}
#screen .shead.hasmc{justify-content:flex-start!important;gap:6px}
#screen .shead.hasmc b{flex:1 1 auto!important;min-width:0;font-size:17px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#screen .shead.hasmc>.chip{display:none!important}
@keyframes mcP{0%{transform:scale(1)}35%{transform:scale(1.28);box-shadow:0 0 10px #ffd860}100%{transform:scale(1)}}
#navroll.pz{animation:mcP .45s ease-out}
.spv{position:fixed;inset:0;z-index:9400;background:#0007;display:flex;align-items:flex-end;justify-content:center;animation:rpvB .18s ease-out both}
.spv .sp{position:relative;width:370px;margin-bottom:96px;border-radius:16px;background:linear-gradient(#3a3226,#241d15);border:2px solid #c9953f;box-shadow:0 0 0 2px #000,0 10px 24px #000c,inset 0 1px 0 #ffffff22;padding:12px 14px 12px;color:#fff3d0;font-family:Maplestory,sans-serif;animation:spU .3s cubic-bezier(.2,1.2,.4,1) both}
.spv.lite,.spv.lite .sp{animation:none}
.spv .sp .h{display:flex;align-items:center;gap:8px}
.spv .sp .h b{font-size:19px;font-weight:900;color:#ffe9a8;text-shadow:0 2px 0 #000}
.spv .sp .h small{font-size:12px;color:#d9c7a0}
.spv .sp .h .st{margin-left:auto;font-size:17px;letter-spacing:1px}.spv .sp .h .st i{font-style:normal;color:#5a4a36}.spv .sp .h .st i.on{color:#ffd23a;text-shadow:0 0 4px #ff9a00}
.spv .sp .x{position:absolute;right:-8px;top:-10px;width:28px;height:28px;border-radius:50%;background:radial-gradient(#6a4a2a,#2a1a0a);border:2px solid #e0b860;color:#ffe9b0;font:900 14px/24px sans-serif;text-align:center;cursor:pointer}
.spv .pw{margin:8px 0;display:flex;gap:6px}.spv .pw div{flex:1;border-radius:9px;background:#0006;padding:5px 8px;font-size:11px;color:#cdb98f}.spv .pw div b{display:block;font-size:15px;color:#fff}.spv .pw .up b{color:#7dff8a}.spv .pw .dn b{color:#ff6a5a}
.spv .lb{font-size:11px;font-weight:700;color:#e0b860;margin:6px 0 4px}
.spv .mons{display:flex;gap:5px}.spv .mons span{position:relative;width:52px;height:52px;border-radius:10px;background:radial-gradient(#5a6a7a,#25303a);border:1px solid #9aa8b688;overflow:hidden}
.spv .mons span img{width:100%;height:100%;object-fit:contain}
.spv .mons span.bs{background:radial-gradient(#8a3a2a,#3a1410);border-color:#ff8a5a}.spv .mons span.bs:after{content:'BOSS';position:absolute;left:0;right:0;bottom:0;font:900 9px/13px sans-serif;text-align:center;background:#c0201ad0;color:#fff}
.spv .rw{display:flex;gap:6px;flex-wrap:wrap}.spv .rw span{display:flex;align-items:center;gap:3px;font-size:12px;padding:3px 8px 3px 4px;border-radius:9px;background:#0006}.spv .rw span img{width:20px;height:20px}.spv .rw span small{color:#cdb98f;font-size:10px}.spv .rw span.dn{opacity:.5}
.spv .go{margin-top:10px;display:flex;gap:8px}.spv .go span{flex:1;text-align:center;padding:9px 0;border-radius:11px;font-weight:900;font-size:15px;cursor:pointer}
.spv .go .ok{background:linear-gradient(#5fd35a,#2f9a2b);border:2px solid #1d5e1a;color:#fff;text-shadow:0 1px 0 #0008}.spv .go .no{background:linear-gradient(#6a6258,#463f37);border:2px solid #2a241e;color:#eee}
@keyframes spU{from{transform:translateY(60px);opacity:0}to{transform:none;opacity:1}}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (R.opt&&R.opt.fx===false)||s.gq=='save'};
// ---- currencies
const hold={};G.curHold=(k,ms)=>{const c=CUR.find(c=>c[0]==k);if(!c||lite())return;const s=C.S(),el=document.querySelector(`#screen .mc[data-k=${k}]`);hold[k]={v:el?el.dataset.v:null};setTimeout(()=>{delete hold[k];paint();const e=document.querySelector(`#screen .mc[data-k=${k}]`);if(e){e.classList.remove('pz');void e.offsetWidth;e.classList.add('pz')}},ms)};
G.curTarget=k=>{if(k=='orbs'){const n=document.getElementById('navroll');if(n){setTimeout(()=>{if(lite())return;n.classList.remove('pz');void n.offsetWidth;n.classList.add('pz')},850);return n}}return document.querySelector(`#screen .mc[data-k=${k}]`)||document.querySelector('#screen .mc[data-k=gold]')};
const paint=()=>{const s=C.S();document.querySelectorAll('#screen .mc[data-k]').forEach(e=>{const k=e.dataset.k;if(hold[k])return;const v=CUR.find(c=>c[0]==k)[2](s);e.dataset.v=v;const t=fmt(v);if(e.lastChild.textContent!=t)e.lastChild.textContent=t})};
const head=()=>{const h=document.querySelector('#screen .shead');if(!h||h.querySelector('.mcur'))return;h.classList.add('hasmc');const d=document.createElement('div');d.className='mcur';d.innerHTML=CUR.map(([k,ic])=>`<span class=mc data-k=${k}><img src="assets/${ic}" alt=""><i></i></span>`).join('');d.querySelectorAll('.mc i').forEach(i=>i.replaceWith(document.createTextNode('')));h.appendChild(d);
 if(G.mapCh>=0){const b=h.querySelector('b');if(b)b.textContent='제'+(G.mapCh+1)+'장'}paint()};
setInterval(()=>{if(G.screen=='map')paint()},400);
// ---- stage panel
const panel=i=>{document.querySelectorAll('.spv').forEach(x=>x.remove());const s=C.S(),req=C.stageReq?C.stageReq(i):0,pw=C.POW(),fk=D.FIELDS[i%D.FIELDS.length],pool=(D.FIELDMON[fk]||[]).map(k=>D.MONS.find(m=>m.k==k)).filter(Boolean),
 pl=D.BOSSPLAN[Math.floor(i/7)],bo=pl&&D.BOSSES[pl[i%7==6?1:0]],n=G.stStar?G.stStar(i):0,fcd=i<(s.fcl==null?s.maxSi:s.fcl),fg=i%7==6?100:30,L=lite();
 const d=document.createElement('div');d.className='spv'+(L?' lite':'');
 d.innerHTML=`<div class=sp><span class=x>✕</span><div class=h><b>${C.stageName(i)}</b><small>${D.CH[Math.floor(i/7)]}${i%7==6?' · 챕터 보스':''}</small><span class=st>${[0,1,2].map(j=>`<i class="${j<n?'on':''}">★</i>`).join('')}</span></div>
 <div class=pw>${req?`<div class="${pw>=req?'up':'dn'}">권장 전투력<b>${fmt(req)}</b></div>`:''}<div>내 전투력<b>${fmt(pw)}</b></div></div>
 <div class=lb>출현 몬스터</div><div class=mons>${pool.map(m=>`<span title="${m.n}"><img src="assets/${m.img}" alt=""></span>`).join('')}${bo?`<span class=bs title="${bo.n}"><img src="assets/${bo.img}" alt=""></span>`:''}</div>
 <div class=lb>보상</div><div class=rw><span><img src=assets/it2_gold.png>${fmt(C.goldKill(i))}<small>/처치</small></span><span class="${fcd?'dn':''}"><img src=assets/it2_gem.png>${fg}<small>${fcd?'최초 클리어 · 수령 완료':'최초 클리어'}</small></span></div>
 <div class=go><span class=no>닫기</span><span class=ok>${i==s.si?'진행 중':'이동'}</span></div></div>`;
 d.onclick=e=>{const t=e.target;if(t===d||t.classList.contains('x')||t.classList.contains('no')){d.remove();return}if(t.classList.contains('ok')){d.remove();C.selectStage(i);toast(C.stageName(i)+' 으로 이동');closeScreen()}};document.body.appendChild(d);return d};
G.stagePanel=panel;
const deco=()=>{if(G.screen!='map')return;head();const s=C.S();document.querySelectorAll('#screen .snode[data-n]').forEach(n=>{const i=+n.dataset.n;if(n._sp||i>s.maxSi)return;n._sp=1;n.onclick=()=>panel(i)})};
const go=()=>{const el=document.querySelector('#screen');if(!el)return setTimeout(go,300);new MutationObserver(()=>{try{deco()}catch(e){console.warn(e)}}).observe(el,{childList:true})};go();
setInterval(()=>{if(G.screen!='map')document.querySelectorAll('.spv').forEach(x=>x.remove())},500);})();

/* v216: 화룡전식 chapter-themed stage nodes (node_t1..t7.png, oval medallions) replace the generic node_normal per chapter. Mapping by real chapter name + D.FIELDS biome: 1 세이룬 가도 (meadow/town) → leaf · 2 마족의 숲 (forest/darkwood) → mushroom forest · 3 붉은 마왕의 성 → crimson castle · 4 용암 화산 지대 (volcano) → lava fire · 5 얼음 성채 (snow/ice) → ice crystal · 6 천공의 신전 (sky) → cloud+wing · 7 심해 신전 (abyss) → wave+pearl. Extra chapters reuse the nearest biome via D.FIELDS. node_boss / node_locked unchanged; boss gets a stronger red aura so it still stands out. Visual only. */
;(()=>{const BT={meadow:1,town:1,autumn:1,forest:2,darkwood:2,castle:3,desert:4,volcano:4,beach:4,snow:5,ice:5,sky:6,abyss:7};const FIX=[1,2,3,4,5,6,7];
G.nodeTheme=c=>{if(c<FIX.length)return 't'+FIX[c];const f=D.FIELDS.slice(c*7,c*7+7),cnt={};f.forEach(k=>{const t=BT[k];if(t)cnt[t]=(cnt[t]||0)+1});const b=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];return b?'t'+b:'normal'};
const st=document.createElement('style');st.textContent=`
.snode>img.nt{width:50px!important;height:62px!important;object-fit:contain;filter:drop-shadow(0 3px 4px #000) drop-shadow(0 0 2px #0008)}
.snode.cur>img.nt{filter:drop-shadow(0 0 6px #fff6b0) drop-shadow(0 0 12px #ffcf40) drop-shadow(0 3px 4px #000)}
.snode:not(.bs) .ncr{margin-left:10px!important}
.snode.bs:not(.lk)>img:not(.sbimg){filter:drop-shadow(0 0 7px #ff3a20) drop-shadow(0 0 14px #ff5a2088) drop-shadow(0 3px 4px #000)!important}
.snode>img.nt+b{margin-top:-6px}`;document.head.appendChild(st);})();

/* v217: 화룡전식 stage-info frame. assets/panel_stage.png = dark-wood/gold 9-slice (gem patched out of the top edge so it can stretch), assets/panel_stage_gem.png = red-gem crest overlaid unstretched at top centre. Also: chapter-view 월드맵 button uses ic_map.png instead of the emoji; non-boss crest flips to the node's left when it would overlap another node's label (e.g. 5-6 vs 5-7). Visual only. */
(function(){const st=document.createElement('style');st.textContent=`
.spv .sp{background:none!important;border:30px solid transparent!important;border-image:url(assets/panel_stage.png) 64 fill / 30px stretch!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 10px 16px #000b);padding:2px 4px 2px!important;width:370px;box-sizing:border-box}
.spv .sp:before{content:'';position:absolute;left:50%;top:-47px;width:40px;height:48px;margin-left:-19px;background:url(assets/panel_stage_gem.png) center/contain no-repeat;pointer-events:none;z-index:2}
.spv .sp .x{right:-30px!important;top:-34px!important;z-index:3}
.spv .sp .h b{color:#ffe7a0!important;text-shadow:0 2px 0 #2a1206,0 0 6px #000a!important}
.spv .sp .h small{color:#f3dcae!important;text-shadow:0 1px 0 #2a1206}
.spv .sp .h .st i{color:#3a2010!important;text-shadow:0 0 1px #d9a650}
.spv .pw div{background:#2a120899!important;box-shadow:inset 0 0 0 1px #d9a65055;color:#f0d9a8!important}
.spv .pw div b{color:#fff7e0!important;text-shadow:0 1px 0 #000}
.spv .pw .up b{color:#8dff96!important}.spv .pw .dn b{color:#ff8070!important}
.spv .lb{color:#ffd77a!important;text-shadow:0 1px 0 #2a1206}
.spv .rw span{background:#2a120899!important;box-shadow:inset 0 0 0 1px #d9a65044;color:#fff3d0}
.spv .rw span small{color:#f0d9a8!important}
#wBtn img.wmi{width:22px;height:22px;object-fit:contain;filter:drop-shadow(0 1px 1px #0008)}
.snode:not(.bs) .ncr.ncl{margin-left:-44px!important}`;document.head.appendChild(st);
const deco=()=>{if(G.screen!='map')return;const w=document.querySelector('#screen #wBtn');if(w&&!w.querySelector('img.wmi')){w.innerHTML='<img class=wmi src="assets/ic_map.png" alt="">월드맵'}
 const ns=[...document.querySelectorAll('#screen .snode')];const labs=ns.map(n=>[n,[...n.querySelectorAll('b,small,em')].map(e=>e.getBoundingClientRect())]);
 ns.forEach(n=>{if(n.classList.contains('bs'))return;const c=n.querySelector('.ncr');if(!c||c.classList.contains('ncl'))return;const r=c.getBoundingClientRect();if(!r.width)return;
  const hit=labs.some(([m,rs])=>m!=n&&rs.some(q=>q.width&&r.left<q.right&&r.right>q.left&&r.top<q.bottom&&r.bottom>q.top));if(hit)c.classList.add('ncl')})};
const sc=document.getElementById('screen');if(sc)new MutationObserver(()=>requestAnimationFrame(deco)).observe(sc,{childList:true,subtree:true});G.mapDeco217=deco})();

/* v218: 화룡전식 button art (9-slice border-image, CSS only). btn_green = primary (stage panel 이동, chapter bar 월드맵/★/일일 던전), btn_grey = 닫기/cancel (stage panel 닫기, star-chest 닫기), btn_gold = claim (star-chest 수령, daily/weekly mission 받기). Pressed = scale .95 + darken. Disabled (.off) claim buttons keep the old look. Visual only. */
(function(){const G9=':is(.spv .go .ok,#screen .cbar>.btn)',R9=':is(.spv .go .no,.schm .btn[data-x])',Y9=':is(.schm .srw .btn[data-sc]:not(.off),#panel .btn[data-m]:not(.off),#panel .btn[data-w]:not(.off))';
const base=(sel,img,ol)=>`${sel}{background:none!important;border:10px solid transparent!important;border-image:url(assets/${img}) 30 fill / 10px stretch!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 2px 2px #0007);color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:-1px 0 ${ol},1px 0 ${ol},0 -1px ${ol},0 1px ${ol},0 2px ${ol}!important}
${sel}:active{transform:scale(.95)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}`;
const st=document.createElement('style');st.textContent=base(G9,'btn_green.png','#0b3510')+base(R9,'btn_grey.png','#3a2a1a')+base(Y9,'btn_gold.png','#5a3006')+`
.spv .go span{padding:1px 0!important;min-height:30px;display:flex;align-items:center;justify-content:center}
#screen .cbar>.btn{padding:0 2px!important;min-height:30px}
.schm .srw .btn[data-sc]:not(.off),#panel .btn[data-m]:not(.off),#panel .btn[data-w]:not(.off){padding:0 8px!important;min-height:22px;display:inline-flex;align-items:center;justify-content:center}
.schm .btn[data-x]{padding:1px 0!important}`;document.head.appendChild(st)})();

/* v219: 화룡전식 settings toggles. .tog track = tgl_on.png / tgl_off.png, knob = tgl_knob.png (≈115% of track height), knob slides via transform (150ms). Settings re-render on click, so the clicked toggle's new knob starts at the old side (.tgf) and transitions over — toggle logic untouched. No transition in low graphics. Visual only. */
(function(){const st=document.createElement('style');st.textContent=`
#screen .tog,#screen .stpaper .tog{width:50px!important;height:28px!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:url(assets/tgl_off.png) center/100% 100% no-repeat!important;overflow:visible!important;flex:0 0 auto}
#screen .tog.on,#screen .stpaper .tog.on{background:url(assets/tgl_on.png) center/100% 100% no-repeat!important}
#screen .tog i{left:-3px!important;top:-2px!important;width:32px!important;height:32px!important;border-radius:0!important;background:url(assets/tgl_knob.png) center/contain no-repeat!important;filter:drop-shadow(0 2px 2px #0008);transform:translateX(0);transition:transform .15s ease-out}
#screen .tog.on i{left:-3px!important;transform:translateX(24px)}
#screen .tog.on.tgf i{transform:translateX(0);transition:none}
#screen .tog:not(.on).tgf i{transform:translateX(24px);transition:none}
body.tglite #screen .tog i{transition:none!important}`;document.head.appendChild(st);
const lite=()=>{const s=G.loadSet?G.loadSet():{};return (typeof R!='undefined'&&R.opt&&R.opt.fx===false)||s.gq=='save'};let last=null;
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#screen .tog[data-set]');if(t)last=t.dataset.set},true);
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{const L=lite();document.body.classList.toggle('tglite',L);if(G.screen=='settings'&&last&&!L){const t=document.querySelector(`#screen .tog[data-set="${last}"]`);if(t){t.classList.add('tgf');void t.offsetWidth;requestAnimationFrame(()=>t.classList.remove('tgf'))}}last=null}catch(_){}return r}})();

/* v220: (1) settings top cards (#nkRow/#svRow/#ntRow are .card.row, so they inherited the parchment-row dark brown text on the dark card) → cream text + dark shadow. (2) 화룡전식 volume sliders: input[data-vol] wrapped in .sldw with sld_track.png 9-slice track, sld_fill.png 9-slice fill whose width follows the thumb (CSS var --p updated by an extra input listener), sld_knob.png thumb. Slider logic/values untouched. Visual only. */
(function(){const st=document.createElement('style');st.textContent=`
#screen :is(#nkRow,#svRow,#ntRow) .f :is(b,small){color:#fff3d8!important;text-shadow:0 1px 2px #000,0 0 3px #000c!important}
#screen :is(#nkRow,#svRow,#ntRow) .f small{color:#f0dcb4!important;opacity:.95!important}
#screen .sldw{position:relative;flex:1;height:26px;display:block;margin:0 2px}
#screen .sldw .sldt,#screen .sldw .sldf{position:absolute;left:0;top:50%;height:16px;margin-top:-8px;box-sizing:border-box;border:8px solid transparent;border-image:url(assets/sld_track.png) 20 fill / 8px stretch;pointer-events:none}
#screen .sldw .sldt{right:0}
#screen .sldw .sldf{border-image-source:url(assets/sld_fill.png);width:calc(13px + (100% - 26px) * var(--p,0));min-width:16px}
#screen .sldw input[type=range]{position:absolute;inset:0;width:100%;height:100%;margin:0;-webkit-appearance:none;appearance:none;background:transparent!important;accent-color:auto;cursor:pointer}
#screen .sldw input[type=range]::-webkit-slider-runnable-track{background:transparent;height:26px;border:0}
#screen .sldw input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:26px;height:26px;border:0;border-radius:50%;background:url(assets/sld_knob.png) center/contain no-repeat;filter:drop-shadow(0 2px 2px #0009)}
#screen .sldw input[type=range]::-moz-range-track{background:transparent;border:0}
#screen .sldw input[type=range]::-moz-range-thumb{width:26px;height:26px;border:0;border-radius:50%;background:url(assets/sld_knob.png) center/contain no-repeat}
#screen .sldw input[type=range]:active::-webkit-slider-thumb{filter:brightness(.88) drop-shadow(0 1px 1px #0009)}`;document.head.appendChild(st);
const wrap=()=>{if(G.screen!='settings')return;document.querySelectorAll('#screen input[type=range][data-vol]').forEach(i=>{if(i.parentElement.classList.contains('sldw'))return;const w=document.createElement('span');w.className='sldw';w.innerHTML='<i class=sldt></i><i class=sldf></i>';i.before(w);w.appendChild(i);
 const upd=()=>{const mn=+i.min||0,mx=+i.max||100;w.style.setProperty('--p',((+i.value-mn)/(mx-mn)).toFixed(4))};upd();i.addEventListener('input',upd)})};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{wrap()}catch(_){}return r};G.sldWrap=wrap})();

/* v221: settings polish. (1) ✏️/🌙/📢 emoji on 닉네임 변경 / 절전 켜기 / 공지 보기 buttons → ic_quill / ic_moon / ic_horn (19px). (2) settings section titles (게임, 계정 …): .ttl was space-between + dark #6a2a0a on dark card → centred ui_ribbon.png header with gear + cream title. Visual only. */
(function(){const st=document.createElement('style');st.textContent=`
#screen :is(#nkBtn,#svGo,#ntGo){display:inline-flex!important;flex-direction:row!important;align-items:center;justify-content:center;gap:5px;white-space:nowrap;width:auto!important;min-width:0!important;padding-left:12px!important;padding-right:14px!important}
#screen :is(#nkBtn,#svGo,#ntGo) img.sbi{width:19px;height:19px;object-fit:contain;filter:drop-shadow(0 1px 1px #0009);flex:0 0 auto}
#screen .stpaper .card>.ttl{justify-content:center!important;gap:6px!important;height:46px;margin:-2px auto 8px!important;padding:9px 30px 0!important;width:max-content;min-width:160px;box-sizing:border-box;background:url(assets/ui_ribbon.png) center/100% 100% no-repeat!important;border:0!important;color:#fff3d0!important;font-size:15px!important;font-weight:900;text-shadow:0 2px 0 #000,0 0 4px #000!important}
#screen .stpaper .card>.ttl img.sti{height:20px!important;filter:drop-shadow(0 1px 1px #000)}
#screen .stpaper .card>.ttl small{color:#f0dcb4!important}`;document.head.appendChild(st);
const IC={nkBtn:'ic_quill',svGo:'ic_moon',ntGo:'ic_horn'},EM=/^\s*(✏️|✏|🌙|📢)\s*/u;
const deco=()=>{if(G.screen!='settings')return;Object.entries(IC).forEach(([id,ic])=>{const b=document.getElementById(id);if(!b||b.querySelector('img.sbi'))return;const t=b.firstChild;if(t&&t.nodeType==3&&EM.test(t.textContent)){t.textContent=t.textContent.replace(EM,'');b.insertAdjacentHTML('afterbegin',`<img class=sbi src="assets/${ic}.png" alt="">`)}})};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{deco()}catch(_){}return r};G.setIcDeco=deco})();

/* v222: 인연 screen icons — gift cards 🌼/🍪/💎 → bd_flower / bd_cookie / it2_gem; level row bd_socket/bd_heart → bd_heart_empty/full; portrait badge ♥n, dialogue list ♥t (full if unlocked, empty if locked), floating ♥ and 💎/🪙 price/reward glyphs → images; 🔒 → sk_lock. Counts unchanged (same lv()/t values). Visual only. */
(function(){const st=document.createElement('style');st.textContent=`
#screen img.bdi{height:1.25em;width:auto;vertical-align:-.28em;margin:0 2px 0 0;filter:drop-shadow(0 1px 1px #0008)}
#screen .bdc .bl{display:inline-flex;align-items:center;gap:1px;font-weight:900;color:#ffc0d8;text-shadow:0 1px 2px #000}
#screen .bdc .bl img.bdi{height:13px}
#screen .bdgi .i img{height:40px;width:auto;display:block;margin:0 auto 2px;filter:drop-shadow(0 2px 2px #0009)}
#screen .bdgi small img.bdi{height:13px;vertical-align:-2px}
#screen .bdln{display:flex;align-items:center;gap:3px}#screen .bdln>img.bdi:first-child{height:17px}
#screen .bdln.lock img.bdi{opacity:.85}#screen .bdln img.bdi[src*=sk_lock]{height:15px;margin-left:5px}
#screen .bdhero .fl img{width:22px;height:auto;display:block;filter:drop-shadow(0 0 4px #fff8)}
#screen .bh{width:24px;height:24px}`;document.head.appendChild(st)})();
/* v223: 편성 프리셋 art — slots framed with pp_slot.png 9-slice plate, 💾 → pp_save scroll, load hint pp_load; relic 📜 fragment counts → rl_fragment.png; friend list ⚔ power → ic3_arena. Visual only (same handlers / values). */
(function(){const st=document.createElement('style');st.textContent=`
#screen .pset .psl{border:16px solid transparent!important;border-image:url(assets/pp_slot.png) 34 fill / 16px stretch!important;background:none!important;box-shadow:none!important;border-radius:0!important;padding:0 2px!important;position:relative;color:#f4e2bd}
#screen .pset .psl.on{filter:drop-shadow(0 0 6px #ffd86a) drop-shadow(0 0 2px #ffd86a)}
#screen .pset .psl>b{color:#ffe7a8!important;text-shadow:0 1px 2px #000,0 0 3px #000}
#screen .pset .psl .psi small{color:#d9c7a3!important;text-shadow:0 1px 2px #000}
#screen .pset .pss{position:absolute!important;top:-6px!important;right:-6px!important;left:auto!important;bottom:auto!important;transform:none!important;z-index:3!important;background:none!important;border:0!important;box-shadow:none!important;padding:0!important;font-size:0!important;line-height:0}
#screen .pset .psl.emp .psi small{background:#120c08d0!important;color:#f4e2bd!important;border-radius:6px;padding:1px 7px!important}#screen .pset .pss img{width:30px;height:auto;filter:drop-shadow(0 1px 2px #000a);transition:transform .1s}
#screen .pset .pss:active img{transform:scale(.88)}
#screen .pset .ttl small img.ppi,.toast img.ppi,#toast img.ppi{height:16px;width:auto;vertical-align:-3px;margin:0 2px}
img.ppi{height:16px;width:auto;vertical-align:-3px;margin:0 2px}
#screen img.ci.rlf{height:15px;width:auto;vertical-align:-3px;filter:drop-shadow(0 1px 1px #0008)}
#screen img.ci.frp{height:14px;width:14px;vertical-align:-2px}`;document.head.appendChild(st)})();
/* v224: quick icons — ⏱→ui_timer (영지 timers, 상점 refresh), 🧺→bd_harvest (전체 수확), ⚡→ui_bolt (일괄 소탕/전체 소탕/일괄 강화), plus existing-art leftovers 🔒→sk_lock, 💎→it2_gem (shop), 🗺→ic_map, 🎣→fs_bobber. Per-screen text-node swap (only listed glyphs on listed screens; values/handlers untouched). Preset slot number moved off the pedestal. Visual only. */
(function(){const IM={'⏱':'ui_timer','🧺':'bd_harvest','⚡':'ui_bolt','🔒':'sk_lock','💎':'it2_gem','🗺':'ic_map','🎣':'fs_bobber'};
const SC={base:'⏱🧺🔒',shop:'⏱💎',dungeon:'⚡🔒',enhance:'⚡',gallery:'🔒',explore:'🔒',map:'🗺',fish:'🎣'};
const st=document.createElement('style');st.textContent=`#screen img.qic{height:1.2em;width:auto;vertical-align:-.25em;margin:0 .12em;filter:drop-shadow(0 1px 1px #0009);pointer-events:none}
#screen img.qic.q_ui_bolt{height:1.3em}#screen img.qic.q_bd_harvest{height:1.35em;vertical-align:-.32em}
#screen .pset .psl>b{position:absolute!important;left:-9px;top:-10px;z-index:3!important;min-width:20px;height:20px;line-height:20px;border-radius:10px;background:radial-gradient(#5a3a12,#2a1a08);border:1.5px solid #d8a84a;font-size:12px!important;text-align:center;box-shadow:0 1px 3px #000a}`;document.head.appendChild(st);
let busy=0;const sw=()=>{const set=SC[G.screen];if(!set)return;const root=document.getElementById('screen');if(!root)return;const re=new RegExp('['+[...set].join('')+']\\uFE0F?','u');
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>re.test(n.nodeValue)&&!n.parentNode.closest('script,style,textarea,input')?1:3});const ns=[];while(w.nextNode())ns.push(w.currentNode);
 busy=1;ns.forEach(n=>{const f=document.createDocumentFragment();n.nodeValue.split(new RegExp('(['+[...set].join('')+']\\uFE0F?)','u')).forEach(p=>{const k=p.replace('\uFE0F','');if(IM[k]&&set.includes(k)){const i=document.createElement('img');i.className='qic q_'+IM[k];i.src='assets/'+IM[k]+'.png';i.alt='';f.appendChild(i)}else if(p)f.appendChild(document.createTextNode(p))});n.parentNode.replaceChild(f,n)});busy=0};
let q=0;const kick=()=>{if(q||busy)return;q=1;requestAnimationFrame(()=>{q=0;try{sw()}catch(_){}})};
const ors=renderScreen;renderScreen=function(){const r=ors.apply(this,arguments);try{sw()}catch(_){}return r};
const s=document.getElementById('screen');if(s)new MutationObserver(()=>{if(SC[G.screen])kick()}).observe(s,{childList:true,subtree:true,characterData:true});G.qicSwap=sw})();

/* v225 (r274): hit kind for the battle hit-burst sprites (render.js r274 pool) - magic for spells/storm/caster allies, none for DoT ticks; visual only */
(()=>{const MAG={lina:1,amelia:1,xellos:1,sera:1,noel:1};const oh=C.hitEnemy;C.hitEnemy=(e,d,cr,src)=>{const pk=R._hk;R._hk=(src&&src.dot!=null&&!src.storm)||C._dot?'d':src&&(src.sp||src.storm||MAG[src.k])?'m':src?'p':'m';try{return oh(e,d,cr,src)}finally{R._hk=pk}}})();

/* v226 (r275): wave ribbon (wrib, r248 BN priority queue untouched) - full strength for the first ~0.6s, then thins to half opacity and lifts away so a busy final-wave fight shows through; visual only */
(()=>{const st=document.createElement('style');st.textContent='@keyframes wrib{0%{opacity:0;transform:scaleX(.06) scaleY(.75)}16%{opacity:1;transform:scaleX(1.1) scaleY(1.03)}26%{transform:scale(.98)}32%{transform:scale(1)}52%{opacity:1;transform:translateY(0)}70%{opacity:.5;transform:translateY(-4px) scale(.96)}100%{opacity:0;transform:translateY(-16px) scale(.94)}}';document.head.appendChild(st)})();
;(()=>{/* v227 화룡전-style rarity frames on 동료 상세 카드 (.trv): hc_frame_g2..g4 9-slice + separate crest/gem overlays (not stretched); hc_statplate behind 공격 배율 / material rows */
const F={g2:{W:259,H:493,tb1:31,bb0:457,S:61,cw:137,ch:96,cb:80,gw:33,gh:64,gb:19},g3:{W:255,H:496,tb1:30,bb0:459,S:61,cw:168,ch:106,cb:77,gw:30,gh:63,gb:21},g4:{W:251,H:482,tb1:29,bb0:448,S:75,cw:228,ch:102,cb:73,gw:109,gh:74,gb:26}};
const K=.72,st=document.createElement('style');let css=`.trv.hcf{position:relative;overflow:visible;border:0;border-radius:0;background:#141a30f0;padding:20px 21px 24px;margin:40px 2px 12px}
.trv.hcf .trstage{border-radius:6px}.hcfr{position:absolute;inset:-3px;pointer-events:none;z-index:3;border-style:solid}.hccr,.hcgm{position:absolute;left:50%;transform:translateX(-50%);pointer-events:none;z-index:4}
.trv.hcf .trcmp,.trv.hcf .trmats{border:solid transparent;border-width:12px 14px;border-image:url(assets/hc_statplate.png) 46 52 fill/12px 14px stretch;background:none;margin:4px 0 0;padding:2px 6px}
.trv.hcf .trcmp b,.trv.hcf .trcmp small,.trv.hcf .trm small{text-shadow:0 1px 2px #000}`;
for(const g in F){const f=F[g],T=f.tb1+30,B=f.H-f.bb0+30;css+=`.hcf.${g} .hcfr{border-image:url(assets/hc_frame_${g}.png) ${T} ${f.S} ${B} ${f.S}/${(T*K).toFixed(1)}px ${(f.S*K).toFixed(1)}px ${(B*K).toFixed(1)}px stretch}
.hcf.${g} .hccr{width:${(f.cw*K).toFixed(1)}px;top:${((f.tb1-f.cb)*K-3).toFixed(1)}px}.hcf.${g} .hcgm{width:${(f.gw*K).toFixed(1)}px;bottom:${((f.H-f.bb0-f.gh+f.gb)*K-3).toFixed(1)}px}\n`}
st.textContent=css;document.head.appendChild(st);
const gk=g=>g<=2?'g2':g>=4?'g4':'g3';
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='enhance'||G.enTab!='comp')return r;const v=document.querySelector('#screen .trv');if(!v||v.classList.contains('hcf'))return r;const c=D.COMPS.find(x=>x.k==G.trSel);if(!c)return r;const g=gk(c.g);
v.classList.add('hcf',g);v.insertAdjacentHTML('beforeend',`<i class=hcfr></i><img class=hccr src="${A}hc_crest_${g}.png"><img class=hcgm src="${A}hc_gem_${g}.png">`)}catch(e){console.warn(e)}return r}})();
;(()=>{/* v228 화룡전-style 동료 카드 name plate by grade (hc_name_g2..g4, gem end = fixed left slice), winged Lv badge (hc_lvbadge, wings fixed), star_gold stars, r267 btn_green/gold/grey on 레벨업/승급/스킬. Visual only */
const N={g2:[34,55,34,125,.34],g3:[34,55,34,125,.34],g4:[42,75,42,132,.31]};let css='';
for(const g in N){const [t,r,b,l,k]=N[g];css+=`.trv.hcf.${g} .trnm{border:solid transparent;border-width:${(t*k).toFixed(1)}px ${(r*k).toFixed(1)}px ${(b*k).toFixed(1)}px ${(l*k).toFixed(1)}px;border-image:url(assets/hc_name_${g}.png) ${t} ${r} ${b} ${l} fill/${(t*k).toFixed(1)}px ${(r*k).toFixed(1)}px ${(b*k).toFixed(1)}px ${(l*k).toFixed(1)}px stretch;background:none;border-radius:0;padding:0 4px 0 2px;filter:drop-shadow(0 2px 2px #0008)}\n`}
const bo=(c)=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`;
const btn=(sel,img,ol)=>`${sel}{background:none!important;border:9px solid transparent!important;border-image:url(assets/${img}) 30 fill/9px stretch!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 2px 2px #0007);color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;padding:0 2px!important;min-height:30px;text-shadow:${bo(ol)}!important;opacity:1!important}${sel}:active{transform:scale(.95)!important;filter:brightness(.8)!important}`;
css+=`.trv.hcf .trnm{left:22px;top:6px}.trv.hcf .trnm b{text-shadow:${bo('#0a1430')};line-height:16px}.trv.hcf .trnm span{display:flex;gap:0;line-height:0;margin-top:1px}
.trnm .hst{width:13px;height:13px;object-fit:contain}.trnm .hst.e{filter:grayscale(1) brightness(.45);opacity:.8}
.trv.hcf .trlv{border:solid transparent;border-width:8px 30px;border-image:url(assets/hc_lvbadge.png) 40 150 fill/8px 30px stretch;background:none;border-radius:0;box-shadow:none;padding:0 2px;line-height:16px;font-family:Maplestory,sans-serif;text-shadow:${bo('#0a2a6a')};right:18px;top:8px;filter:drop-shadow(0 2px 2px #0008)}
${btn('#screen .trv.hcf #trLv#trLv:not(.off),#screen .trv.hcf #trSk#trSk:not(.off)','btn_green.png','#0b3510')}${btn('#screen .trv.hcf #trSt#trSt:not(.off)','btn_gold.png','#5a3006')}${btn('#screen .trv.hcf #trLv#trLv.off,#screen .trv.hcf #trSt#trSt.off,#screen .trv.hcf #trSk#trSk.off','btn_grey.png','#3a2a1a')}
#screen .trv.hcf #trLv#trLv.off,#screen .trv.hcf #trSt#trSt.off,#screen .trv.hcf #trSk#trSk.off{color:#d8d0c4!important}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='enhance'||G.enTab!='comp')return r;const sp=document.querySelector('#screen .trv.hcf .trnm span');if(!sp||sp.dataset.hs)return r;
const i=sp.querySelector('i'),e=i?[...i.textContent].length:0,f=[...sp.textContent].length-e;sp.dataset.hs=1;sp.innerHTML='<img class=hst src="assets/star_gold.png">'.repeat(f)+'<img class="hst e" src="assets/star_gold.png">'.repeat(e)}catch(e){console.warn(e)}return r}})();
;(()=>{/* v229 reuse r269 sld_track/sld_fill gauges (9-slice, fill clip by width) on 동료 카드 material bars (.trmb; full = pre-baked sld_fill_green) and the 18px idle/offline bar (.idlebar); st_arrow replaces ▶ in 공격 배율 row. Visual only */
const T=`border:8px solid transparent!important;border-image:url(assets/sld_track.png) 20 fill/8px stretch!important;background:none!important;border-radius:0!important;box-sizing:border-box`;
const Fl=`box-sizing:content-box!important;border:8px solid transparent;border-image:url(assets/sld_fill.png) 20 fill/8px stretch;background:none!important;min-width:0`;
const st=document.createElement('style');st.textContent=`
#screen .trv .trmb{${T};height:18px;overflow:visible}
#screen .trv .trmb i{${Fl};position:absolute;left:-8px;top:-8px;bottom:auto;height:2px;max-width:100%}
#screen .trv .trmb i.ok{border-image-source:url(assets/sld_fill_green.png)}
#screen .trv .trmb i[style^="width:0%"]{display:none}
#screen .trv .trmb b{position:absolute;left:-8px;right:-8px;top:-8px;line-height:18px;font-size:10.5px;text-shadow:-1px 0 #2a1606,1px 0 #2a1606,0 -1px #2a1606,0 1px #2a1606;z-index:1}
#screen .trv .trm{margin:4px 0}
.trcmp i.hcar{width:14px;height:18px;background:url(assets/st_arrow.png) center/contain no-repeat;transform:rotate(-90deg);color:transparent!important;font-size:0;flex:none;filter:drop-shadow(0 1px 1px #000a)}
.idlebar{${T};height:22px!important;overflow:visible!important}
.idlebar i{${Fl};position:absolute;left:-8px;top:-8px;height:6px!important;max-width:100%}
.idlebar i[style^="width:0%"]{display:none}
.idlebar span{inset:-8px!important;line-height:22px!important;z-index:1}`;document.head.appendChild(st);
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='enhance'||G.enTab!='comp')return r;const i=document.querySelector('#screen .trv .trcmp>i:not(.hcar)');if(i&&i.textContent.trim()=='▶')i.classList.add('hcar')}catch(e){console.warn(e)}return r}})();

/* v230 r279: tab plates (tab_on/tab_off 9-slice + tab_gem overlay) on .entabs rows */
(function(){try{const S=document.createElement('style');const X=':is(#_t1,#_t2,span):is(#_t3,#_t4,span)';
S.textContent=`
#screen .entabs{gap:4px!important;padding-top:14px;margin-top:2px}
#screen .entabs span${X}{flex:1 1 0!important;min-width:0}
#screen .entabs:has(>span:nth-child(5)) span${X}{border-width:9px 5px!important;font-size:12px;letter-spacing:-.5px}
#screen .entabs span${X}{background:none!important;border:9px solid transparent!important;border-width:9px 11px!important;border-image:url(${A}tab_off.png) 46 56 fill/9px 11px stretch!important;border-radius:0!important;box-shadow:none!important;padding:1px 0 2px!important;color:#e9dcc0!important;font-family:Maplestory,sans-serif;font-weight:700;line-height:20px;white-space:nowrap;filter:drop-shadow(0 2px 2px #0008);text-shadow:-1px 0 #1b1410,1px 0 #1b1410,0 -1px #1b1410,0 1px #1b1410,0 2px #1b1410;transition:transform .12s}
#screen .entabs span.on${X}{border-image-source:url(${A}tab_on.png)!important;color:#fff0c8!important;transform:translateY(-2px);text-shadow:-1px 0 #3a0c06,1px 0 #3a0c06,0 -1px #3a0c06,0 1px #3a0c06,0 2px #2a0804}
#screen .entabs span.on${X}::before{content:'';position:absolute;left:50%;top:-21px;width:25px;height:21px;margin-left:-12.5px;background:url(${A}tab_gem.png) center/contain no-repeat;pointer-events:none}
#screen .entabs span${X} .dot{top:-21px;right:-10px;transform:scale(.75)}
#screen .entabs:has(>span:nth-child(5)) span.on${X}::before{top:-22px;width:22px;height:19px;margin-left:-11px}
`;document.head.appendChild(S)}catch(e){console.warn(e)}})();

/* v231 r280: thin 12px gauges (sld_track_s/sld_fill_s/sld_fill_green_s, box-downscaled from r269 sld_*) on in-screen progress .bar rows (missions/achievements/codex/pass/base); HUD bars untouched; codex tab .dot moved off the label. Visual only */
(function(){try{const S=document.createElement('style');const X=':is(#_b1,#_b2,div):is(#_b3,#_b4,div)',Q=`#screen :is(.f,.card)>.bar${X}:not(:has(>i[style*=background]))`;
S.textContent=`
${Q}{height:0!important;min-height:0!important;box-sizing:content-box!important;border:6px solid transparent!important;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch!important;background:none!important;border-radius:0!important;overflow:visible!important;position:relative;box-shadow:none!important}
${Q}>i{position:absolute!important;left:-6px;top:-6px;height:0!important;max-width:100%;box-sizing:content-box!important;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch;background:none!important;border-radius:0!important}
${Q}>i.ok{border-image-source:url(${A}sld_fill_green_s.png)}
${Q}>i[style^="width:0%"],${Q}>i[style^="width:0;"],${Q}>i[style^="width:NaN"]{display:none}
#screen .entabs span:is(#_t1,#_t2,span):is(#_t3,#_t4,span) .dot{top:-22px!important;right:-13px!important;transform:scale(.72)!important;z-index:2}
`;document.head.appendChild(S);
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.getElementById('screen');if(sc)sc.querySelectorAll(':is(.f,.card)>.bar>i').forEach(i=>{const w=parseFloat(i.style.width);i.classList.toggle('ok',w>=99.999)})}catch(e){console.warn(e)}return r}}catch(e){console.warn(e)}})();

/* v232 r281: dungeon selector cards (dc_on/dc_off 9-slice on a ::before layer + dc_gem overlay) on .dgcard and legacy .duntabs; layout box unchanged. Visual only */
(function(){try{const S=document.createElement('style');const X=':is(#_d1,#_d2,div,span):is(#_d3,#_d4,div,span)';const Q=`#screen :is(.dgc>.dgcard,.duntabs>span)${X}`;
S.textContent=`
#screen .dgc{padding-top:10px}
${Q}{position:relative;isolation:isolate;background:none!important;border-color:transparent!important;box-shadow:none!important;border-radius:0!important;padding-top:9px!important;padding-left:7px!important;padding-right:7px!important;filter:drop-shadow(0 3px 3px #0009)}
${Q}::before{content:'';position:absolute;inset:-2px;z-index:-1;border:24px solid transparent;border-image:url(${A}dc_off.png) 110 fill/24px stretch;pointer-events:none}
${Q}.on::before{border-image-source:url(${A}dc_on.png)}
${Q}.on{transform:translateY(-3px);filter:drop-shadow(0 0 6px var(--dc,#ffd25a)) drop-shadow(0 3px 3px #0009)}
${Q}.on::after{content:'';position:absolute;left:50%;top:-9px;width:28px;height:21px;margin-left:-14px;background:url(${A}dc_gem.png) center/contain no-repeat;pointer-events:none;z-index:2}
${Q} b{text-shadow:-1px 0 #1b1008,1px 0 #1b1008,0 -1px #1b1008,0 1px #1b1008,0 2px #1b1008!important}
${Q} small{color:#f0e6d0!important;text-shadow:0 1px 1px #000,0 0 2px #000}
${Q}.on small{color:#fff0c8!important}
`;document.head.appendChild(S)}catch(e){console.warn(e)}})();

/* v233 r282: dungeon screen dressing with existing art only: r267 btn_gold/btn_grey on 일괄 소탕 (.swall / .off), btn_green 도전 (#brGo, tier 도전 pills), btn_grey 랭킹; r266 panel_stage(+gem) on 보스 러시 (.brc); hc_statplate on 고대 유적 row (.dgfr); tab_on/tab_off plates on .dgtier (cleared = tab_on). Visual only */
(function(){try{const S=document.createElement('style');const I=(t)=>`:is(#_r1,#_r2,${t}):is(#_r3,#_r4,${t})`;
const btn=(sel,img,ol)=>`${sel}{background:none!important;border:10px solid transparent!important;border-image:url(${A}${img}) 30 fill / 10px stretch!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 2px 2px #0007)!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:-1px 0 ${ol},1px 0 ${ol},0 -1px ${ol},0 1px ${ol},0 2px ${ol}!important}${sel}:active{transform:scale(.95);filter:brightness(.8)!important}`;
const SW=`#screen .swall${I('div')}`,GO=`#screen :is(#brGo,.dtb .pill.green[data-ch]:not(.off))${I('span')}`,RK=`#screen #brRk${I('span')}`,BR=`#screen .card.brc${I('div')}`,FR=`#screen .dgfr${I('div')}`,TG=`#screen .dgcard .dgtier${I('span')}`;
S.textContent=btn(`${SW}:not(.off)`,'btn_gold.png','#5a3006')+btn(`${SW}.off`,'btn_grey.png','#2a2a2a')+btn(GO,'btn_green.png','#0b3510')+btn(RK,'btn_grey.png','#3a2a1a')+`
${SW}{padding:2px 8px!important;margin:6px 0 8px!important;font-size:15px!important}
${SW}.off{filter:drop-shadow(0 2px 2px #0007)!important;opacity:.9}
${SW} small{color:#fff0c8;opacity:.9}
${GO},${RK}{padding:1px 6px!important;line-height:20px}
${BR}{background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:4px 2px 2px!important;position:relative;margin-top:16px}
${BR}::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
${BR} .brs span{color:#efe4cc}
${FR}{background:none!important;border:12px solid transparent!important;border-width:12px 14px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/12px 14px stretch!important;border-radius:0!important;padding:0 2px 0 6px!important;margin-bottom:8px}
${FR}.on{filter:drop-shadow(0 0 5px var(--dc))}
${FR} b,${FR} em{text-shadow:0 1px 1px #000,0 0 2px #000}
${TG}{background:none!important;border:5px solid transparent!important;border-width:5px 7px!important;border-image:url(${A}tab_off.png) 46 56 fill/5px 7px stretch!important;border-radius:0!important;padding:0 2px!important;font-family:Maplestory,sans-serif;font-size:9.5px!important;line-height:12px;color:#e9dcc0!important;text-shadow:-1px 0 #1b1410,1px 0 #1b1410,0 -1px #1b1410,0 1px #1b1410}
${TG}.cl{border-image-source:url(${A}tab_on.png)!important;color:#fff0c8!important;text-shadow:-1px 0 #3a0c06,1px 0 #3a0c06,0 -1px #3a0c06,0 1px #3a0c06}
`;document.head.appendChild(S);
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='dungeon')document.querySelectorAll('#screen .dgtier').forEach(t=>t.classList.toggle('cl',!/^미/.test(t.textContent.trim())))}catch(e){console.warn(e)}return r}}catch(e){console.warn(e)}})();
;(()=>{/* v234 비무대회 상대 카드 difficulty frames: easy=hc_frame_g2, mid=hc_frame_g4, hard=hc_frame_red (r283 cut) 9-slice + crest/gem overlays (not stretched); difficulty glow kept as drop-shadow; r267 btn_green on 도전, btn_gold on 새로고침 (btn_grey when .off). Visual only, overlays injected once per render */
const F={easy:{g:'g2',k:.3,W:259,H:493,T:61,R:61,B:66,L:61,tb1:31,cw:137,ch:96,cb:80,gw:33,gh:64,gb:19,bb0:457,c:'#5ad07a'},
mid:{g:'g4',k:.28,W:251,H:482,T:59,R:75,B:64,L:75,tb1:29,cw:228,ch:102,cb:73,gw:109,gh:74,gb:26,bb0:448,c:'#b07aff'},
hard:{g:'red',k:.12,W:532,H:626,T:186,R:177,B:190,L:178,cx:124,cy:-64,cw:255,ch:170,gx:212,gy:536,gw:109,gh:111,c:'#ff5a4a'}};
const X=':is(#_a1,#_a2,span):is(#_a3,#_a4,span)';let css=`#screen .aocg{margin-top:18px;gap:5px}
#screen .aoc.aof{overflow:visible;border:0!important;border-radius:0;padding:10px 9px 12px;isolation:isolate;background:linear-gradient(#3a2a5a,#1a1230) 7px 7px/calc(100% - 14px) calc(100% - 14px) no-repeat}
#screen .aoc.aof.hard{background-image:linear-gradient(#4a2230,#1a0e18)}#screen .aoc.aof.easy{background-image:linear-gradient(#22423a,#0e1a18)}
#screen .aoc .aofr{position:absolute;inset:-2px;pointer-events:none;z-index:3;border-style:solid}
#screen .aoc .aocr,#screen .aoc .aogm{position:absolute;left:50%;transform:translateX(-50%);pointer-events:none;z-index:4}
#screen .aoc.aof .aotg{left:9px;top:9px;z-index:5}#screen .aoc.aof .aon,#screen .aoc.aof .aop,#screen .aoc.aof .aopr{text-shadow:0 1px 2px #000,0 0 2px #000}
#screen .aoc.aof .btn${X}{position:relative;z-index:5;background:none!important;border:9px solid transparent!important;border-image:url(${A}btn_green.png) 30 fill/9px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0!important;min-height:24px;line-height:14px;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:-1px 0 #0b3510,1px 0 #0b3510,0 -1px #0b3510,0 1px #0b3510!important;filter:drop-shadow(0 2px 2px #0007)}
#screen .aoc.aof .btn.off${X}{border-image-source:url(${A}btn_grey.png)!important;text-shadow:-1px 0 #3a2a1a,1px 0 #3a2a1a,0 -1px #3a2a1a,0 1px #3a2a1a!important}
#screen #rf.aorf{background:none!important;border:10px solid transparent!important;border-image:url(${A}btn_gold.png) 30 fill/10px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px 0!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:-1px 0 #5a3006,1px 0 #5a3006,0 -1px #5a3006,0 1px #5a3006,0 2px #5a3006!important;filter:drop-shadow(0 2px 2px #0007)}
#screen #rf.aorf.off{border-image-source:url(${A}btn_grey.png)!important}
#screen :is(.aoc.aof .btn,#rf.aorf):active{transform:scale(.95)}\n`;
for(const d in F){const f=F[d],k=f.k,p=v=>(v*k).toFixed(1)+'px';
css+=`#screen .aoc.aof.${d}{filter:drop-shadow(0 0 4px ${f.c}) drop-shadow(0 0 1px ${f.c})}#screen .aoc.${d} .aofr{border-width:${p(f.T)} ${p(f.R)} ${p(f.B)} ${p(f.L)};border-image:url(${A}hc_frame_${f.g}.png) ${f.T} ${f.R} ${f.B} ${f.L}/${p(f.T)} ${p(f.R)} ${p(f.B)} ${p(f.L)} stretch}
#screen .aoc.${d} .aocr{width:${f.cy!=null?(f.cw*.18).toFixed(1)+'px':p(f.cw)};top:${f.cy!=null?(71*k-135*.18-2).toFixed(1):((f.tb1-f.cb)*k-2).toFixed(1)}px}#screen .aoc.${d} .aogm{width:${p(f.gw)};bottom:${f.gy!=null?((f.H-f.gy-f.gh)*k-2).toFixed(1):((f.H-f.bb0-f.gh+f.gb)*k-2).toFixed(1)}px}\n`}
css+=`body:is(.tglite,.nofx) #screen .aoc.aof{filter:none!important}body:is(.tglite,.nofx) #screen .aoc.aof .btn,body:is(.tglite,.nofx) #screen #rf.aorf{filter:none!important}`;const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='arena')return r;const rf=document.querySelector('#screen #rf');if(rf)rf.classList.add('aorf');
document.querySelectorAll('#screen .aoc:not(.aof)').forEach(c=>{const d=c.classList.contains('hard')?'hard':c.classList.contains('easy')?'easy':'mid',g=F[d].g;c.classList.add('aof');if(d=='mid')c.classList.add('mid');
c.insertAdjacentHTML('beforeend',`<i class=aofr></i><img class=aocr src="${A}hc_crest_${g}.png"><img class=aogm src="${A}hc_gem_${g}.png">`)})}catch(e){console.warn(e)}return r}})();
;(()=>{/* v235 r284 동료 소환: su_blue/su_purple plates (r284 cut, near-native aspect → plain 100% background, no slicing so studs stay crisp) on #su1/#su10 with r267 pressed state; r269 sld gauges on 마일리지 (thin _s) and 확정까지 (full); hc_statplate rate chips. Visual only, real inline widths kept */
const X=':is(#_s1,#_s2,span):is(#_s3,#_s4,span)',D=':is(#_s5,#_s6,div):is(#_s7,#_s8,div)',st=document.createElement('style');
const ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`;
st.textContent=`#screen .sumbtns{gap:8px;margin:8px 0 4px}
#screen .sumbtns .pill${X}{min-height:60px;border:0!important;border-radius:0!important;background:url(${A}su_blue.png) center/100% 100% no-repeat!important;box-shadow:none!important;padding:8px 16px 8px 44px!important;font-family:Maplestory,sans-serif!important;font-weight:900;color:#fff!important;text-shadow:${ol('#0a1c5a')}!important;filter:drop-shadow(0 3px 3px #0008);transition:transform .08s}
#screen .sumbtns .pill.red${X}{background-image:url(${A}su_purple.png)!important;text-shadow:${ol('#3a1268')}!important;filter:drop-shadow(0 3px 3px #0008) drop-shadow(0 0 6px #c89aff88)}
#screen .sumbtns .pill${X}>img.smt{left:12px;height:38px}
#screen .sumbtns .pill${X} small{font-family:Maplestory,sans-serif;font-size:12px;color:#fff;text-shadow:${ol('#000a')}}
#screen .sumbtns .pill${X}:active{transform:scale(.95)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}
body:is(.tglite,.nofx) #screen .sumbtns .pill.red${X}{filter:drop-shadow(0 3px 3px #0008)}
#screen .smr>div${D}{border:solid transparent!important;border-width:10px 12px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/10px 12px stretch!important;background:none!important;border-radius:0!important;box-shadow:none!important;padding:0 2px 0 5px!important;box-sizing:border-box}
#screen .smr>div${D} b,#screen .smr>div${D} small{text-shadow:0 1px 2px #000,0 0 2px #000}
#screen .milebar .bar${D}{height:0!important;box-sizing:content-box!important;border:6px solid transparent!important;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch!important;background:none!important;border-radius:0!important;overflow:visible!important;position:relative;box-shadow:none!important}
#screen .milebar .bar${D}>i{position:absolute!important;display:block;left:-6px;top:-6px;height:0!important;max-width:100%;box-sizing:content-box!important;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch;background:none!important;border-radius:0!important;box-shadow:none!important}
#screen .smp .bar${D}{height:0!important;box-sizing:content-box!important;border:8px solid transparent!important;border-image:url(${A}sld_track.png) 20 fill/8px stretch!important;background:none!important;border-radius:0!important;overflow:visible!important;box-shadow:none!important}
#screen .smp .bar${D}>i{left:-8px!important;top:-8px!important;bottom:auto!important;height:0!important;max-width:100%;box-sizing:content-box!important;border:8px solid transparent;border-image:url(${A}sld_fill.png) 20 fill/8px stretch;background:none!important;border-radius:0!important;box-shadow:none!important}
#screen .smp .bar${D}>span{inset:-8px!important;line-height:16px!important;z-index:1}
#screen :is(.milebar,.smp) .bar${D}>i:is([style^="width:0%"],[style^="width:0;"],[style^="width:NaN"]){display:none!important}`;
document.head.appendChild(st)})();
;(()=>{/* v236 r285 마법 상점: r279 tab_on/tab_off (+tab_gem on active) on 상인 header section tabs (.shtb; active = last tapped / section in view, rAF-throttled passive scroll, no per-frame work); r267 btn_gold on 일일 특가 새로고침 (#dealRef), btn_grey when .off. Visual only */
const X=':is(#_h1,#_h2,span):is(#_h3,#_h4,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,st=document.createElement('style');
st.textContent=`#screen .shtb{gap:3px;bottom:8px;flex-wrap:nowrap}
#screen .shtb span${X}{position:relative;flex:0 1 auto;min-width:0;white-space:nowrap;background:none!important;border:7px solid transparent!important;border-width:7px 9px!important;border-image:url(${A}tab_off.png) 46 56 fill/7px 9px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 1px 1px!important;line-height:16px;font:700 12px Maplestory,sans-serif!important;letter-spacing:-.4px;color:#e9dcc0!important;text-shadow:${ol('#1b1410')};filter:drop-shadow(0 2px 2px #0008);transition:transform .12s}
#screen .shtb span.on${X}{border-image-source:url(${A}tab_on.png)!important;color:#fff0c8!important;transform:translateY(-2px);text-shadow:${ol('#3a0c06')}}
#screen .shtb span.on${X}::before{content:'';position:absolute;left:50%;top:-20px;width:22px;height:19px;margin-left:-11px;background:url(${A}tab_gem.png) center/contain no-repeat;pointer-events:none}
#screen .shtb span${X}:active{transform:scale(.95)}
#screen #dealRef${X}{background:none!important;border:10px solid transparent!important;border-image:url(${A}btn_gold.png) 30 fill/10px stretch!important;border-radius:0!important;box-shadow:none!important;padding:1px 0!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol('#5a3006')}!important;filter:drop-shadow(0 2px 2px #0007);opacity:1}
#screen #dealRef.off${X}{border-image-source:url(${A}btn_grey.png)!important;text-shadow:${ol('#3a2a1a')}!important;filter:drop-shadow(0 2px 2px #0007)!important;opacity:.92}
#screen #dealRef${X}:active{transform:scale(.95);filter:brightness(.8) drop-shadow(0 1px 1px #0007)}
#screen #dealRef${X} .ci{vertical-align:-2px}`;document.head.appendChild(st);
let tabs=null,secs=null,body=null,pend=0;
const pick=i=>{if(!tabs)return;for(let k=0;k<tabs.length;k++)tabs[k].classList.toggle('on',k==i)};
const sync=()=>{pend=0;if(!tabs||!body||!body.isConnected||G.screen!='shop')return;const top=body.getBoundingClientRect().top+60;let a=0;for(let k=0;k<secs.length;k++)if(secs[k].getBoundingClientRect().top<=top)a=k;if(body.scrollTop>0&&body.scrollTop+body.clientHeight>=body.scrollHeight-4)a=secs.length-1;pick(a)};
const onS=()=>{if(!pend)pend=requestAnimationFrame(sync)};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='shop')return r;const b=document.querySelector('#screen .sbody'),h=b&&b.querySelector('.shtb');if(!h||h.dataset.v236)return r;h.dataset.v236=1;
tabs=[...h.querySelectorAll('[data-sc]')];secs=[...b.querySelectorAll(':scope > .card, :scope > div')].filter(c=>!c.classList.contains('shh')&&(c.matches('.ttl')?c:c.querySelector('.ttl'))&&(c.matches('.ttl')?c:c.querySelector('.ttl')).firstChild&&(c.matches('.ttl')?c:c.querySelector('.ttl')).firstChild.textContent.trim()).slice(0,tabs.length);
tabs.forEach((t,i)=>t.addEventListener('click',()=>pick(i)));if(body)body.removeEventListener('scroll',onS);body=b;
const sc=b.scrollHeight>b.clientHeight+4?b:document.querySelector('#screen');if(sc){sc.removeEventListener('scroll',onS);sc.addEventListener('scroll',onS,{passive:true});body=sc}sync();if(!tabs.some(t=>t.classList.contains('on')))pick(0)}catch(e){console.warn(e)}return r}})();
;(()=>{/* v237 r286: ic_refresh icon sizing (shop/arena 새로고침); 우편함: r266 panel_stage + gem on the 선물함 card (empty state + list), hc_statplate mail rows (.mgc) with light text, r267 btn_gold on 받기/모두 받기 (btn_grey when .off). Visual only */
const X=':is(#_m1,#_m2,div):is(#_m3,#_m4,div)',Y=':is(#_m5,#_m6,span):is(#_m7,#_m8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,st=document.createElement('style');
st.textContent=`#screen img.icrf{height:18px!important;width:18px!important;vertical-align:-4px!important;margin-right:2px;filter:drop-shadow(0 1px 1px #0009)}
#screen .sbody>.card${X}:has(>.mgg){background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:4px 2px 2px!important;position:relative;margin-top:22px!important;overflow:visible!important}
#screen .sbody>.card${X}:has(>.mgg)::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
#screen .sbody>.card${X}:has(>.mgg) .mlempty b{color:#ffe8c0;text-shadow:0 2px 2px #000}#screen .sbody>.card${X}:has(>.mgg) .mlempty small{color:#efe4cc;text-shadow:0 1px 2px #000}
#screen .mgg>.mgc${X}{background:none!important;border:solid transparent!important;border-width:12px 14px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/12px 14px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 2px!important;color:#efe4cc;filter:drop-shadow(0 2px 2px #0007)}
#screen .mgg>.mgc${X} .mlm>b,#screen .mgg>.mgc${X}>b{color:#ffe8c0!important;text-shadow:0 1px 2px #000}
#screen .mgg>.mgc${X}>small{color:#cfc2a8!important;text-shadow:0 1px 2px #000}
#screen .mgg>.mgc${X} .mgr span{background:#0008;border:1px solid #c8a05a88}
#screen .mgg>.mgc${X} .mlx{right:4px;top:-8px}
#screen .mgg>.mgc.got${X}{filter:brightness(.78) drop-shadow(0 2px 2px #0007)}
#screen :is(.mgc>.pill[data-m],#mailAll)${Y}{background:none!important;border:10px solid transparent!important;border-image:url(${A}btn_gold.png) 30 fill/10px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol('#5a3006')}!important;filter:drop-shadow(0 2px 2px #0007)}
#screen .mgc>.pill[data-m]${Y}{padding:0 6px!important;margin:12px 0 0!important}
#screen #mailAll${Y}{padding:2px 0!important;margin-top:8px}
#screen :is(.mgc>.pill[data-m],#mailAll).off${Y}{border-image-source:url(${A}btn_grey.png)!important;text-shadow:${ol('#3a2a1a')}!important}
#screen :is(.mgc>.pill[data-m],#mailAll)${Y}:active{transform:scale(.95)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}`;document.head.appendChild(st)})();
;(()=>{/* v238 r287: btn_red (new, r267 btn_green scale/slice) on 마을 전투로 (ic3_arena icon) + battle-call buttons 보스 도전 (#bBoss, grey when off) and 월드 보스 도전하기 (#wbGo); town building labels on hc_name_g3 (gem left); swipe hint on tt_plate with st_arrow arrows. Visual only */
const Y=':is(#_t1,#_t2,span):is(#_t3,#_t4,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,R=`border-image:url(${A}btn_red.png) 30 fill/9px stretch!important;border-style:solid!important;border-color:transparent!important;background:none!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol('#4a0606')}!important`,st=document.createElement('style');
st.textContent=`#screen .tbat${Y}{${R};border-width:9px!important;padding:2px 8px 2px 4px!important;display:flex;align-items:center;gap:3px;font-size:16px!important;filter:drop-shadow(0 3px 3px #0008)}
#screen .tbat .tbi{width:30px;height:30px;margin:-6px 0 -6px -2px;filter:drop-shadow(0 1px 1px #0009)}
#screen .tbat${Y}:active{transform:scale(.95);filter:brightness(.85)}
#bBoss${Y}:not(.off),#wbGo${Y}:not(.off){${R};border-width:9px!important;padding-top:0!important;padding-bottom:0!important}
#bBoss${Y}.off,#wbGo${Y}.off{border-image:url(${A}btn_grey.png) 30 fill/9px stretch!important;border-style:solid!important;border-color:transparent!important;border-width:9px!important;background:none!important;border-radius:0!important;box-shadow:none!important;padding-top:0!important;padding-bottom:0!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important}
:is(#bBoss,#wbGo)${Y}:not(.off):active{filter:brightness(.82)}
#wbGo${Y}{flex-direction:row!important;min-height:52px!important;font-size:17px!important}#wbGo${Y} img{width:30px!important;height:30px!important;margin:0!important}
#screen .tsp b:is(#_t5,#_t6,b):is(#_t7,#_t8,b){position:relative;border:solid transparent!important;border-width:6px 12px 6px 20px!important;border-image:url(${A}hc_name_g3.png) 30 60 30 100 fill/6px 12px 6px 20px stretch!important;background:none!important;border-radius:0!important;box-shadow:none!important;padding:0 2px 0 3px!important;line-height:15px;color:#fff;text-shadow:${ol('#0a1430')};filter:drop-shadow(0 2px 2px #0009)}
#screen .thint${Y}{display:flex;align-items:center;gap:4px;background:none!important;border:solid transparent;border-width:7px 10px;border-image:url(${A}tt_plate.png) 44 fill/7px 10px stretch;border-radius:0!important;padding:0 2px!important;color:#2a2f3a!important;font-weight:900;font-size:11px;bottom:18px!important;filter:drop-shadow(0 2px 2px #0007)}
#screen .thint .tha{width:10px;height:13px}#screen .thint .tha.l{transform:rotate(-90deg)}#screen .thint .tha.r{transform:rotate(90deg)}`;document.head.appendChild(st)})();
;(()=>{/* v239 r288: 협회 가입 — per-guild emblems (gd_em_red/holy/chaos ↔ C.GUILDS order) on hc_statplate rows, btn_green 가입 with pressed state, ic3_guild header kept; joined-guild banner shows its own emblem. Visual only */
const EM=['red','holy','chaos'],emOf=n=>{const i=(C.GUILDS||[]).findIndex(q=>q.n==n);return i>=0?`${A}gd_em_${EM[i]}.png`:''};
const X=':is(#_g1,#_g2,div):is(#_g3,#_g4,div)',Y=':is(#_g5,#_g6,span):is(#_g7,#_g8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,st=document.createElement('style');
st.textContent=`#screen .card.gjr${X}{background:none!important;border:solid transparent!important;border-width:12px 14px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/12px 14px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 2px!important;filter:drop-shadow(0 3px 3px #0008)}
#screen .card.gjr .row{gap:10px;align-items:center}#screen .card.gjr img.gjem{width:44px;height:auto;margin:-6px 0 -6px -2px;filter:drop-shadow(0 2px 2px #000a)}
#screen .card.gjr b{color:#ffe8c0;font-size:15px;text-shadow:0 1px 2px #000}#screen .card.gjr small{color:#cfc2a8}
#screen .card.gjr [data-gj]${Y}{background:none!important;border:9px solid transparent!important;border-image:url(${A}btn_green.png) 30 fill/9px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px 8px!important;min-width:0!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;font-size:14px!important;text-shadow:${ol('#0b3510')}!important;filter:drop-shadow(0 2px 2px #0007)}
#screen .card.gjr [data-gj]${Y}:active{transform:scale(.94)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}
#screen .gbanner>img.gbem{object-fit:contain!important}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='guild'){const sb=document.querySelector('#screen .sbody');if(!sb)return r;
 sb.querySelectorAll('[data-gj]').forEach(b=>{const c=b.closest('.card');if(!c||c.classList.contains('gjr'))return;const q=C.GUILDS[+b.dataset.gj];if(!q)return;c.classList.add('gjr');c.querySelector('.row').insertAdjacentHTML('afterbegin',`<img class=gjem src="${A}gd_em_${EM[+b.dataset.gj]}.png">`)});
 const s=C.S(),gi=sb.querySelector('.gbanner>img:not(.gbem)');if(gi&&s.gj){const u=emOf(s.gj.n);if(u){gi.src=u;gi.classList.add('gbem')}}}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v240 r289: joined-guild screen — hall labels on hc_name_g3 (as town), banner on hc_statplate with thin sld_*_s exp gauge, 협회 출석 btn_green (btn_grey when done), buff upgrade btn_gold / btn_grey (off). Buff .bar already thin via v231. Visual only */
const Y=':is(#_h1,#_h2,span):is(#_h3,#_h4,span)',X=':is(#_h5,#_h6,div):is(#_h7,#_h8,div)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
B=(f,c)=>`background:none!important;border:9px solid transparent!important;border-image:url(${A}${f}) 30 fill/9px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol(c)}!important;filter:drop-shadow(0 2px 2px #0007)`,st=document.createElement('style');
st.textContent=`#screen .ghall .gst em:is(#_h9,#_ha,em):is(#_hb,#_hc,em){position:relative;border:solid transparent!important;border-width:6px 12px 6px 20px!important;border-image:url(${A}hc_name_g3.png) 30 60 30 100 fill/6px 12px 6px 20px stretch!important;background:none!important;border-radius:0!important;box-shadow:none!important;padding:0 2px 0 3px!important;line-height:15px;font:900 12px Maplestory,sans-serif!important;color:#fff!important;text-shadow:${ol('#0a1430')};filter:drop-shadow(0 2px 2px #0009)}
#screen .gbanner${X}{background:none!important;border:solid transparent!important;border-width:12px 14px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/12px 14px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 2px!important;filter:drop-shadow(0 3px 3px #0008)}
#screen .gbanner .gbb${X}{height:0!important;box-sizing:content-box!important;border:6px solid transparent!important;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch!important;background:none!important;border-radius:0!important;overflow:visible!important;position:relative;margin:5px 0 3px!important}
#screen .gbanner .gbb${X}>i{position:absolute!important;left:-6px;top:-6px;height:0!important;max-width:100%;box-sizing:content-box!important;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch;background:none!important;border-radius:0!important}
#screen .gbanner .gbb${X}>i[style^="width:0%"]{display:none}
#screen #gAtt${Y}{${B('btn_green.png','#0b3510')};padding:2px 6px!important}
#screen #gAtt.off${Y}{border-image-source:url(${A}btn_grey.png)!important;text-shadow:${ol('#2a2a2a')}!important}
#screen .gbr [data-gb]${Y}{${B('btn_gold.png','#5a3006')};padding:2px 4px!important;display:flex;align-items:center;justify-content:center;gap:2px}
#screen .gbr [data-gb].off${Y}{border-image-source:url(${A}btn_grey.png)!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important}
#screen :is(#gAtt,.gbr [data-gb])${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}`;document.head.appendChild(st)})();
;(()=>{/* v241 r290: joined-guild lower half — weekly mission buttons btn_grey (진행 중/완료) / btn_gold (받기), mission .bar thin via v231; 헌납 + 주간 상자 btn_green (grey when off, chest art kept); chat input on hc_statplate + 전송 btn_green; 탈퇴 btn_red; member tiles on hc_statplate with ic3_arena power icon. Visual only */
const Y=':is(#_k1,#_k2,span):is(#_k3,#_k4,span)',X=':is(#_k5,#_k6,div):is(#_k7,#_k8,div)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
B=(f,c,w=9)=>`background:none!important;border:${w}px solid transparent!important;border-image:url(${A}${f}) 30 fill/${w}px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol(c)}!important;filter:drop-shadow(0 2px 2px #0007)`,G2=`border-image-source:url(${A}btn_grey.png)!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important`,
P=`background:none!important;border:solid transparent!important;border-width:10px 12px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/10px 12px stretch!important;border-radius:0!important;box-shadow:none!important`,st=document.createElement('style');
st.textContent=`#screen [data-gm]${Y}{${B('btn_gold.png','#5a3006')};padding:2px 6px!important;min-width:58px;text-align:center}
#screen [data-gm].off${Y}{${G2}}
#screen :is(#gco,#gch)${Y}{${B('btn_green.png','#0b3510',10)};padding:2px 4px!important;display:flex!important;align-items:center;justify-content:center;gap:4px;line-height:16px;font-size:14px!important;min-height:44px}
#screen :is(#gco,#gch).off${Y}{${G2}}
#screen #gsend${Y}{${B('btn_green.png','#0b3510')};padding:2px 8px!important}
#screen input#gin:is(#_k9,#_ka,input):is(#_kb,#_kc,input){${P};padding:0 2px!important;color:#fff!important;font-size:13px;outline:none}
#screen input#gin::placeholder{color:#a8b0c8}
#screen #gleave${Y}{${B('btn_red.png','#4a0606',7)};padding:0 6px!important;font-size:11px!important;margin-left:6px}
#screen .gmem .gmc${X}{${P};border-width:9px 10px 12px!important;padding:0 0 7px!important;height:auto!important;filter:drop-shadow(0 2px 2px #0008)}
#screen .gmem .gmc.me${X}{filter:drop-shadow(0 0 4px #ffd77a) drop-shadow(0 2px 2px #0008)}
#screen .gmem .gmc.lead${X}{filter:drop-shadow(0 0 3px #ff9a5a) drop-shadow(0 2px 2px #0008)}
#screen .gmem .gmc em{display:flex!important;align-items:center;justify-content:center;gap:1px}
#screen .gmem .gmc em img.gmpw{width:13px;height:13px;margin:0;border-radius:0;background:none;object-fit:contain;display:inline-block}
#screen :is([data-gm],#gco,#gch,#gsend,#gleave)${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}`;document.head.appendChild(st)})();
;(()=>{/* v242 r291: guild lower cards — 황금룡 토벌 card on r266 panel_stage + gem (boss_dragon art kept), thin red-tinted raid HP gauge (sld_*_s), 토벌 참여 btn_red (btn_grey when out of tries); 일일 기부 tiles on hc_statplate with btn_green 기부 / btn_grey 완료; 협회 상점 .gsc tiles on hc_statplate with btn_gold buy (guild-coin icon) / btn_grey when unaffordable or sold out. Visual only */
const X=':is(#_r1,#_r2,div):is(#_r3,#_r4,div)',Y=':is(#_r5,#_r6,span):is(#_r7,#_r8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
B=(f,c,w=9)=>`background:none!important;border:${w}px solid transparent!important;border-image:url(${A}${f}) 30 fill/${w}px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol(c)}!important;filter:drop-shadow(0 2px 2px #0007)`,G2=`border-image-source:url(${A}btn_grey.png)!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important`,
P=(a,b)=>`background:none!important;border:solid transparent!important;border-width:${a}px ${b}px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/${a}px ${b}px stretch!important;border-radius:0!important;box-shadow:none!important`,
R='#screen .sbody>.card'+X+':has(#raid)',DN='#screen .sbody>.card'+X+':has([data-d])>div>div',SC='#screen .gx .gsc'+X,st=document.createElement('style');
st.textContent=`${R}{background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:4px 2px 2px!important;position:relative;margin-top:24px!important;overflow:visible!important}
${R}::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
${R} b{text-shadow:0 2px 2px #000}${R} small{color:#efe4cc;text-shadow:0 1px 2px #000}
${R} .bar{height:0!important;min-height:0!important;box-sizing:content-box!important;border:6px solid transparent!important;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch!important;background:none!important;border-radius:0!important;overflow:visible!important;position:relative;box-shadow:none!important;margin:8px 0!important}
${R} .bar>i{position:absolute!important;left:-6px;top:-6px;height:0!important;max-width:100%;box-sizing:content-box!important;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch;background:none!important;border-radius:0!important;filter:hue-rotate(-38deg) saturate(1.6)}
${R} #raid${Y}{${B('btn_red.png','#4a0606',10)};padding:4px 6px!important;min-height:44px;display:flex!important;align-items:center;justify-content:center;font-size:15px!important}
${R} #raid.off${Y}{${G2}}
${DN}{${P(10,12)};padding:2px 0!important;color:#efe4cc;filter:drop-shadow(0 2px 2px #0008)}
${DN} small{color:#e8dcc2}${DN} b{text-shadow:0 1px 2px #000}
${DN} [data-d]${Y}{${B('btn_green.png','#0b3510')};padding:1px 14px!important;display:inline-block}
${DN} [data-d].off${Y}{${G2}}
${SC}{${P(10,12)};padding:0 0 2px!important;color:#efe4cc;filter:drop-shadow(0 2px 2px #0008)}
${SC}.sold{opacity:1!important}${SC}.sold>img{filter:grayscale(.8) brightness(.7)}
${SC} b{text-shadow:0 1px 2px #000}${SC} small{opacity:.85!important}
${SC} [data-gs]${Y}{${B('btn_gold.png','#5a3006',8)};padding:0 2px!important;display:flex!important;align-items:center;justify-content:center;gap:2px;min-height:26px;font-size:12px!important}
${SC} [data-gs].off${Y}{${G2}}
${SC} [data-gs] img.ci{height:15px!important;width:15px!important;margin:0!important;vertical-align:middle}
#screen :is(#raid,[data-d],[data-gs])${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}`;document.head.appendChild(st)})();
;(()=>{/* v243 r292: 무한의 탑 — floor markers on new tw_plaque art (3-part: fixed crystal/gold end caps tw_plaque_l/r + stretched stone middle tw_plaque_m, single element multi-background, no pseudo/no per-frame cost), dark readable text; current floor warm gold glow (static, no animation), cleared floors slightly dimmed, locked floors desaturated/dimmed, boss floors red glow; 최고 층 + 일일 탑 보상 cards on r266 panel_stage + gem with ic3_trophy; 도전 btn_green (btn_red when under recommended power — still tappable; btn_grey if .off); 일일 보상 btn_gold / btn_grey. Visual only */
const X=':is(#_w1,#_w2,div):is(#_w3,#_w4,div)',Y=':is(#_w5,#_w6,span):is(#_w7,#_w8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
B=(f,c,w=9)=>`background:none!important;border:${w}px solid transparent!important;border-image:url(${A}${f}) 30 fill/${w}px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol(c)}!important;filter:drop-shadow(0 2px 2px #0007)`,G2=`border-image-source:url(${A}btn_grey.png)!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important`,
F='#screen .twst .tfl'+X,CW=31,st=document.createElement('style');
st.textContent=`${F}{height:46px!important;box-sizing:border-box;padding:0 ${CW-2}px 0 ${CW-4}px!important;border:0!important;border-radius:0!important;box-shadow:none!important;animation:none!important;
background:url(${A}tw_plaque_l.png) left center/auto 100% no-repeat,url(${A}tw_plaque_r.png) right center/auto 100% no-repeat,url(${A}tw_plaque_m.png) center/calc(100% - ${2*CW-6}px) 100% no-repeat!important;color:#2a2418!important;filter:drop-shadow(0 3px 3px #0009)}
${F} b{color:#3a2408!important;text-shadow:0 1px 0 #fff8!important;font-family:Maplestory,sans-serif;font-size:17px!important}
${F} small{color:#2c3446!important;opacity:1!important;font-weight:800;font-size:11px!important;text-shadow:0 1px 0 #fff6}
${F} .ti{height:30px!important}
${F}.done{filter:brightness(.88) saturate(.8) drop-shadow(0 3px 3px #0009)}${F}.done b{color:#24486a!important}
${F}.up{filter:grayscale(.55) brightness(.72) drop-shadow(0 3px 3px #0009)}
${F}.boss b{color:#8a1010!important}${F}.boss:not(.up){filter:drop-shadow(0 0 5px #ff4030) drop-shadow(0 3px 3px #0009)}${F}.boss.up{filter:grayscale(.3) brightness(.78) drop-shadow(0 0 4px #ff4030aa)}
${F}.cur{background:url(${A}tw_plaque_l.png) left center/auto 100% no-repeat,url(${A}tw_plaque_r.png) right center/auto 100% no-repeat,linear-gradient(#ffe7a066,#ffc24a55) center/calc(100% - ${2*CW+2}px) 60% no-repeat,url(${A}tw_plaque_m.png) center/calc(100% - ${2*CW-6}px) 100% no-repeat!important;filter:sepia(.25) saturate(1.3) drop-shadow(0 0 6px #ffd060) drop-shadow(0 0 12px #ffb02088)}
${F}.cur{padding-right:92px!important}${F}.cur b{color:#5a2a00!important}${F}.cur small{color:#4a2400!important}
body.tglite ${F}.cur{filter:drop-shadow(0 0 5px #ffd060)}body.tglite ${F}{filter:none}
#screen .twst #twGo2${Y}{${B('btn_green.png','#0b3510',10)};padding:2px 16px!important;min-width:180px;font-size:18px!important;line-height:1.15}
#screen .twst #twGo2.hard${Y}{border-image-source:url(${A}btn_red.png)!important;text-shadow:${ol('#4a0606')}!important}
#screen .twst #twGo2.off${Y}{${G2}}
#screen .twst #twGo2 small{font-size:10px!important;font-weight:800}
#screen .twst #twGo2${Y}:not(.off):active{transform:translateX(-50%) scale(.94)!important;filter:brightness(.8) drop-shadow(0 1px 1px #0007)!important}
#screen .sbody>:is(.twh,.twd).card${X}{background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px 2px!important;position:relative;margin-top:26px!important;overflow:visible!important}
#screen .sbody>:is(.twh,.twd).card${X}::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
#screen .sbody>:is(.twh,.twd).card${X} small{color:#efe4cc!important;text-shadow:0 1px 2px #000}#screen .sbody>:is(.twh,.twd).card${X} b{text-shadow:0 2px 2px #000}
#screen .twd img.twtr,#screen .twh img.twtr{width:44px!important;height:44px;object-fit:contain;filter:drop-shadow(0 2px 2px #000)}
#screen .twd #twD${Y}{${B('btn_gold.png','#5a3006')};padding:2px 10px!important}
#screen .twd #twD.off${Y}{${G2}}
#screen .twd #twD${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8)!important}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='tower'){const d=document.querySelector('#screen .twd');if(d&&!d.querySelector('.twtr'))d.insertAdjacentHTML('afterbegin',`<img class=twtr src="${A}ic3_trophy.png">`)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* v244 r293: 랭킹 — list rows (.rkrow) on hc_statplate with light text; own row gold glow (same as guild .gmc.me); top-3 rank numbers on ac_medal (gold / silver / bronze via static CSS filter on a ::before layer so the number stays untinted); podium rank badges on ac_medal too + tt_crown over the #1 avatar (rk_laurel kept). No tabs or gauges on this screen; entries/numbers untouched. Visual only */
const X=':is(#_q1,#_q2,div):is(#_q3,#_q4,div)',R='#screen .rkrow'+X,st=document.createElement('style'),
MF=['none','grayscale(1) brightness(1.18) contrast(1.05)','sepia(1) saturate(1.5) hue-rotate(-18deg) brightness(.82)'];
st.textContent=`${R}{background:none!important;border:solid transparent!important;border-width:10px 12px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/10px 12px stretch!important;border-radius:0!important;box-shadow:none!important;padding:0 2px!important;margin:3px 0!important;color:#efe4cc;filter:drop-shadow(0 2px 2px #0008)}
${R} .f{line-height:1.1;padding:3px 0 1px}${R} .f b{color:#fff;text-shadow:0 1px 2px #000}${R} .f small{color:#e8dcc2;opacity:1!important}${R} .rp{text-shadow:0 1px 2px #000}
${R}.me{filter:drop-shadow(0 0 4px #ffd77a) drop-shadow(0 0 3px #ffb03a) drop-shadow(0 2px 2px #0008)}${R}.me .rp{color:#fff2a8}${R}.me .f b{color:#ffe08a}
${R} .rn{color:#fff;text-shadow:0 1px 2px #000}
${[1,2,3].map(n=>`${R}:nth-child(${n}) .rn{position:relative;width:26px;height:40px;line-height:50px;font-size:13px!important;color:#3a2000!important;text-shadow:0 0 2px #fff8!important;z-index:0}
${R}:nth-child(${n}) .rn::before{content:'';position:absolute;inset:0;background:url(${A}ac_medal.png) center/contain no-repeat;filter:${MF[n-1]};z-index:-1}`).join('\n')}
#screen .rkst>.rkp .rno${X.replace(/div/g,'i')}{background:none!important;border:0!important;border-radius:0!important;width:26px;height:40px;top:-18px;left:-10px;line-height:50px;display:block;text-align:center;font-size:13px;color:#3a2000;text-shadow:0 0 2px #fff8;font-style:normal}
#screen .rkst>.rkp .rno::before{content:'';position:absolute;inset:0;background:url(${A}ac_medal.png) center/contain no-repeat;z-index:-1;filter:drop-shadow(0 2px 2px #0009)}
${[2,3].map(n=>`#screen .rkst>.rkp:nth-of-type(${n}) .rno::before{filter:${MF[n-1]} drop-shadow(0 2px 2px #0009)}`).join('\n')}
#screen .rkst>.rttl{left:8px!important;transform:none!important;top:8px!important}#screen .rkst>.rkp:nth-of-type(1) .rav::after{content:'';position:absolute;left:50%;top:-26px;width:46px;height:33px;margin-left:-23px;background:url(${A}tt_crown.png) center/contain no-repeat;filter:drop-shadow(0 2px 2px #0009);z-index:3;pointer-events:none}`;document.head.appendChild(st)})();
;(()=>{/* v245 r294: 펫 — garden name plate + header chips on hc_statplate; 펫 부화 / 펫 보너스 / detail cards on panel_stage + gem; pet tiles on hc_statplate with static rarity glow, equipped tile gold glow + pt_flag, selected tile outline, locked dimmed; bonus header stat icons (st_atk / st_hp / it2_gold) instead of words-only; detail pet stands on pt_pedestal; thin Lv gauge (real Lv / PMAX); 부화 btn_gold, 장착 btn_green, Lv↑ btn_gold, off → btn_grey. Visual only, static, no per-frame work */
const X=':is(#_p1,#_p2,div):is(#_p3,#_p4,div)',Y=':is(#_p5,#_p6,span):is(#_p7,#_p8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
B=(f,c,w=9)=>`background:none!important;border:${w}px solid transparent!important;border-image:url(${A}${f}) 30 fill/${w}px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol(c)}!important;filter:drop-shadow(0 2px 2px #0007)`,G2=`border-image-source:url(${A}btn_grey.png)!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important`,
SP=(v,h)=>`background:none!important;border:solid transparent!important;border-width:${v}px ${h}px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/${v}px ${h}px stretch!important;border-radius:0!important;box-shadow:none!important`,
PS=`background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px!important;position:relative;margin-top:26px!important;overflow:visible!important`,
GEM=`content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none`,
K='#screen .sbody>:is(.pth,.ptd,.ptbn).card'+X,T='#screen .ptg .ptc'+X,st=document.createElement('style');
st.textContent=`#screen .ptst .pnm${X}{${SP(10,12)};padding:1px 8px 2px!important;filter:drop-shadow(0 3px 3px #0009)}
#screen .ptst .pnm${X} b{color:#ffe08a;text-shadow:0 2px 2px #000}#screen .ptst .pnm${X} small{color:#efe4cc;text-shadow:0 1px 2px #000}
#screen .ptst .phs span${Y}{${SP(6,8)};padding:0 4px!important;color:#fff;text-shadow:0 1px 2px #000;filter:drop-shadow(0 2px 2px #0008)}
${K}{${PS}}${K}::after{${GEM}}${K} b{text-shadow:0 2px 2px #000}${K} small{color:#efe4cc!important;opacity:1!important;text-shadow:0 1px 2px #000}
#screen .ptbn .ttl small{display:flex;gap:6px;align-items:center}#screen .ptbn .ttl small img{height:15px;width:15px;object-fit:contain;vertical-align:-3px;margin-right:1px;filter:drop-shadow(0 1px 1px #000)}
${T}{${SP(9,10)};border-width:9px 10px 12px!important;padding:2px 0 4px!important;filter:drop-shadow(0 0 2px var(--rc)) drop-shadow(0 2px 2px #0008)}
${T} b{color:#fff;text-shadow:0 1px 2px #000}${T} small{color:#ffe7a8!important;text-shadow:0 1px 2px #000}
${T}.lock{filter:grayscale(.6) brightness(.72) drop-shadow(0 2px 2px #0008)}${T}.lock small{color:#cfc6b4!important}
${T}.ptsel{filter:drop-shadow(0 0 3px #fff) drop-shadow(0 0 2px var(--rc)) drop-shadow(0 2px 2px #0008)}
${T}.pton{filter:drop-shadow(0 0 4px #ffd77a) drop-shadow(0 0 3px #ffb03a) drop-shadow(0 2px 2px #0008)}
${T}.pton::after{content:'';position:absolute;right:-8px;top:-14px;width:22px;height:32px;background:url(${A}pt_flag.png) center/contain no-repeat;filter:drop-shadow(0 2px 2px #000);pointer-events:none}
${T} .pteq{background:linear-gradient(#ffe48a,#e0a020)!important;color:#4a2600!important;border:1px solid #6a3a00!important;border-radius:8px!important;font-style:normal;font-weight:900;text-shadow:none!important;padding:0 5px!important}
#screen .ptd .ptpd{position:relative;width:112px;height:120px;flex:none}
#screen .ptd .ptpd>img.ppd2{position:absolute;left:50%;bottom:-4px;width:108px;margin-left:-54px;filter:drop-shadow(0 4px 4px #0009)}
#screen .ptd .ptpd>img:not(.ppd2){position:absolute;left:6px;top:-6px;width:100px!important;height:100px!important;z-index:1}
#screen .ptd .ptgg{height:0;box-sizing:content-box;border:6px solid transparent;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch;position:relative;margin:4px 0 2px}
#screen .ptd .ptgg>i{position:absolute;left:-6px;top:-6px;height:0;max-width:100%;box-sizing:content-box;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch}
#screen .pth #ptHatch${Y}{${B('btn_gold.png','#5a3006',10)};padding:4px 10px!important;font-size:15px!important;white-space:nowrap}
#screen .ptd #ptEq${Y}{${B('btn_green.png','#0b3510')};padding:3px 6px!important;font-size:14px!important;line-height:1.2!important;white-space:nowrap;min-height:0!important;height:auto!important}
#screen .ptd #ptUp${Y}{${B('btn_gold.png','#5a3006')};padding:3px 6px!important;font-size:14px!important;line-height:1.2!important;white-space:nowrap;min-height:0!important;height:auto!important}
#screen :is(#ptHatch,#ptEq,#ptUp).off${Y}{${G2}}
#screen :is(#ptHatch,#ptEq,#ptUp)${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8)!important}
#screen .ptd :is(#ptEq,#ptUp)${Y}{display:flex!important;flex-direction:row!important;align-items:center;justify-content:center;gap:2px}#screen .ptb .pill img.ci{height:15px!important;width:15px!important;margin:0!important}
body.tglite ${T},body.tglite ${T}.pton,body.tglite ${T}.ptsel{filter:none}body.tglite #screen .ptst .pnm${X}{filter:none}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='pet')deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen'),g=el.querySelector('.ptg');if(!g||g.dataset.v245)return;g.dataset.v245=1;const p=C.S().pet||{};
 const bn=g.closest('.card');bn&&bn.classList.add('ptbn');const sm=bn&&bn.querySelector('.ttl small');
 if(sm)sm.innerHTML=sm.innerHTML.replace('공격',`<img src="${A}st_atk.png">공격`).replace('체력',`<img src="${A}st_hp.png">체력`).replace('골드',`<img src="${A}it2_gold.png">골드`).replace(/ · /g,' ');
 const sk=G.ptSel;g.querySelectorAll('.ptc[data-pk]').forEach(c=>{if(c.dataset.pk==sk)c.classList.add('ptsel')});
 const d=el.querySelector('.ptd');if(d){const im=d.querySelector(':scope>img');if(im){const w=document.createElement('div');w.className='ptpd';w.innerHTML=`<img class=ppd2 src="${A}pt_pedestal.png">`;im.replaceWith(w);w.appendChild(im)}
  const l=(p.own||{})[sk]||0,s=d.querySelector('.f>small');if(l&&s)s.insertAdjacentHTML('afterend',`<div class=ptgg><i style="width:max(0px,calc(${(Math.min(1,l/20)).toFixed(3)} * (100% + 12px) - 12px))"></i></div>`)}}
})();
;(()=>{/* v246 r295: 낚시터 — 던지기 on btn_green (fs_bobber icon kept), 챔질! btn_red (existing pulse kept), waiting / no tries → btn_grey; tries bar → thin sld_track_s/sld_fill_s gauge with fs_bobber pips + label above (real tries left); 어종 도감 + 요리 cards on panel_stage + gem; fish slots on hc_statplate tiles around the existing fs_plaque ring (rarity glow, locked dimmed); cook rows keep fs_board dish plates; 요리 btn_gold / btn_grey; miss-result 💨 → dimmed fs_bobber. Visual only; static CSS, DOM touch only when the screen re-renders */
const X=':is(#_f1,#_f2,div):is(#_f3,#_f4,div)',Y=':is(#_f5,#_f6,span):is(#_f7,#_f8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
B=(f,c,w=9)=>`background:none!important;border:${w}px solid transparent!important;border-image:url(${A}${f}) 30 fill/${w}px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900;text-shadow:${ol(c)}!important;filter:drop-shadow(0 2px 2px #0007)`,G2=`border-image-source:url(${A}btn_grey.png)!important;color:#eee!important;text-shadow:${ol('#2a2a2a')}!important;opacity:1!important`,
K='#screen.fsx .sbody>.card'+X,T='#screen.fsx .fcol>.fcc'+X,st=document.createElement('style');
st.textContent=`#screen.fsx #fgo${Y}{${B('btn_green.png','#0b3510',10)};width:220px!important;padding:6px 10px!important;font-size:19px!important;line-height:1.2}
#screen.fsx #fgo.hot${Y}{border-image-source:url(${A}btn_red.png)!important;text-shadow:${ol('#4a0606')}!important}
#screen.fsx #fgo.off${Y}{${G2}}#screen.fsx #fgo${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8)!important}
#screen.fsx .fgauge .ch${X}{height:0!important;box-sizing:content-box;border:6px solid transparent!important;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch!important;background:none!important;border-radius:0!important;box-shadow:none!important;margin-top:24px}
#screen.fsx .fgauge .ch${X}>i{left:-6px!important;top:-6px!important;bottom:auto!important;height:0!important;box-sizing:content-box;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch;background:none!important;border-radius:0!important;box-shadow:none!important}
#screen.fsx .fgauge .ch${X}>span{inset:auto 0 auto 0!important;top:-30px!important;height:22px}
#screen.fsx .fgauge .rl{margin-top:2px}
${K}{background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px!important;position:relative;margin-top:28px!important;overflow:visible!important}
${K}::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
${K} .ttl{text-shadow:0 2px 2px #000}${K} small{color:#efe4cc;text-shadow:0 1px 2px #000}
#screen.fsx .fcol{gap:3px!important;grid-template-columns:repeat(5,minmax(0,1fr))!important}
${T}{background:none!important;border:solid transparent!important;border-width:8px 8px 10px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/8px 8px 10px stretch!important;border-radius:0!important;padding:0 0 5px!important;filter:drop-shadow(0 0 2px var(--c)) drop-shadow(0 2px 2px #0008)}
${T} .fpw{zoom:.74;margin:0 auto!important}${T} small{display:block;font-size:8.5px!important;line-height:1.2}${T} b{line-height:1.25}
${T} b{color:#fff;text-shadow:0 1px 2px #000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}${T} small{color:#ffe7a8;text-shadow:0 1px 2px #000;white-space:nowrap}
${T}.lock{filter:grayscale(.5) brightness(.75) drop-shadow(0 2px 2px #0008)!important}${T}.lock b{color:#bfb6a4}
#screen.fsx .ckr{border-bottom:1px solid #ffffff1a!important}#screen.fsx .ckr:last-child{border-bottom:0!important}
#screen.fsx .ckr .ckb${Y}{${B('btn_gold.png','#5a3006')};padding:2px 8px!important;font-size:14px!important}
#screen.fsx .ckr .ckb.off${Y}{${G2}}#screen.fsx .ckr .ckb${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8)!important}
#screen.fsx .catch img.fmi{width:54px;height:54px;object-fit:contain;filter:grayscale(1) brightness(.8);opacity:.8;display:block;margin:0 auto}
body.tglite ${T},body.tglite ${T}.lock{filter:none!important}`;document.head.appendChild(st);
const LIM=5,dec=()=>{if(G.screen!='fish')return;const sb=$('#screen');
 const i=sb.querySelector('.fgauge .ch>i');if(i&&!i.dataset.v246){i.dataset.v246=1;const f=C.S().fish||{n:0},fr=Math.max(0,LIM-(f.n||0))/LIM;i.style.width=`max(0px,calc(${fr.toFixed(3)} * (100% + 12px) - 12px))`;if(!fr)i.style.display='none'}
 const m=sb.querySelector('.catch span.i');if(m&&m.textContent.includes('💨'))m.outerHTML=`<img class="i fmi" src="${A}fs_bobber.png">`};
let busy=0;new MutationObserver(()=>{if(busy)return;busy=1;try{dec()}catch(_){}busy=0}).observe(document.getElementById('screen')||document.body,{childList:true});
const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);try{dec()}catch(_){}return r}})();
;(()=>{/* v247 r296: 코스튬 — dressing-room name plate + 보유 chip on hc_statplate; 리나 코스튬 / 동료 축제 코스튬 cards on panel_stage + gem; costume tiles on hc_statplate (worn = gold glow + sk_star badge, not owned = dimmed + sk_lock); prices wrapped into a btn_gold pill with a small sk_tag (btn_grey when gems < cost, real s.gems); emoji-free. Visual only, static CSS, DOM touch only on render */
const X=':is(#_k1,#_k2,div):is(#_k3,#_k4,div)',Y=':is(#_k5,#_k6,span):is(#_k7,#_k8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
SP=(v,h)=>`background:none!important;border:solid transparent!important;border-width:${v}px ${h}px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/${v}px ${h}px stretch!important;border-radius:0!important;box-shadow:none!important`,
K='#screen.skx .sbody>.card'+X,T='#screen.skx .skg .skn'+X,st=document.createElement('style');
st.textContent=`#screen.skx .skst .knm${X}{${SP(10,12)};padding:1px 10px 2px!important;filter:drop-shadow(0 3px 3px #0009)}
#screen.skx .skst .knm${X} b{text-shadow:0 2px 2px #000}#screen.skx .skst .knm${X} small{color:#efe4cc;text-shadow:0 1px 2px #000}
#screen.skx .skst .kcnt${Y}{${SP(6,8)};padding:0 4px!important;filter:drop-shadow(0 2px 2px #0008);text-shadow:0 1px 2px #000}
${K}{background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px!important;position:relative;margin-top:28px!important;overflow:visible!important}
${K}::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
${K} .ttl{text-shadow:0 2px 2px #000}${K} .ttl small{color:#efe4cc;text-shadow:0 1px 2px #000}
#screen.skx .skstrip{padding:8px 4px 10px!important}
${T}{${SP(9,10)};border-width:9px 10px 12px!important;padding:2px 0 4px!important;filter:drop-shadow(0 2px 2px #0008)}
${T} b{color:#fff;text-shadow:0 1px 2px #000}${T} small{color:#ffe7a8!important;text-shadow:0 1px 2px #000;opacity:1!important}
${T}.on{filter:drop-shadow(0 0 3px #ffe08a) drop-shadow(0 0 5px #ffc040) drop-shadow(0 0 3px #ffb03a) drop-shadow(0 2px 2px #0008)}${T}.on b{color:#ffe08a}
${T}.lk>img:first-child{filter:brightness(.55) saturate(.5)!important}${T}.lk b{color:#cfc6b4}
${T} .klk{position:absolute;right:-2px!important;top:-4px!important;height:24px;z-index:2;filter:drop-shadow(0 2px 2px #000a)}
${T} .kon{position:absolute;left:-4px!important;top:-6px!important;height:24px;z-index:2;filter:drop-shadow(0 1px 2px #000a)}
${T} .skp${Y}{display:inline-flex;align-items:center;gap:2px;margin-top:3px;background:none!important;border:7px solid transparent!important;border-image:url(${A}btn_gold.png) 30 fill/7px stretch!important;color:#fff!important;font:900 12px Maplestory,sans-serif!important;line-height:1!important;padding:0 3px!important;text-shadow:${ol('#5a3006')}!important;white-space:nowrap}
${T} .skp${Y}.off{border-image-source:url(${A}btn_grey.png)!important;text-shadow:${ol('#2a2a2a')}!important;color:#eee!important}
${T} .skp img.kt{height:16px;width:auto;margin:-3px 1px -3px -4px;filter:drop-shadow(0 1px 1px #0008)}${T} .skp img.ci{height:13px!important;width:13px!important;margin:0!important}
${T}:active .skp:not(.off){filter:brightness(.8)}
body.tglite ${T},body.tglite ${T}.on,body.tglite #screen.skx .skst .knm${X}{filter:none}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{deco()}catch(e){console.warn(e)}return r};
function deco(){const el=$('#screen');if(G.screen!='skin'){el.classList.remove('skx');return}el.classList.add('skx');
 const s=C.S(),g=s.gems||0;
 el.querySelectorAll('.skg .skn').forEach(c=>{if(c.dataset.v247)return;c.dataset.v247=1;const sm=c.querySelector('small'),gi=sm&&sm.querySelector('img.ci');
  if(gi){const n=gi.nextSibling,cost=parseInt((n&&n.textContent||'').trim(),10)||0;const p=document.createElement('span');p.className='skp'+(g<cost?' off':'');p.innerHTML=`<img class=kt src="${A}sk_tag.png">`;gi.replaceWith(p);p.appendChild(gi);if(n){p.appendChild(document.createTextNode(String(cost)));n.remove()}}
  if(c.dataset.cs){const o=(s.cown||{})[c.dataset.cs];if(!o&&!c.querySelector('.klk')){c.classList.add('lk');c.insertAdjacentHTML('beforeend',`<img class=klk src="${A}sk_lock.png">`)}if(c.classList.contains('on')&&!c.querySelector('.kon'))c.insertAdjacentHTML('beforeend',`<img class=kon src="${A}sk_star.png">`)}})}
})();
;(()=>{/* v248 r297: (A) job-change costumes (cost 0, unlocked by 전직) show their real unlock condition "N차 전직 시 해금 · Lv.X 전직 시련" (from G.JOB) instead of a gem-0 price, dimmed + sk_lock; (B) 동료 승급 — hero tiles on hc_statplate (rarity glow, selected gold glow, star_gold count), hero + 승급 cards on panel_stage + gem, name on r277 hc_name_g* plate, star_gold stars (empty = dimmed), 공격 배율 row on hc_statplate, thin sld gauge for 조각, 승급/각성 btn_gold (btn_grey when unavailable), ★ glyphs → star_gold; new 성급 효과 card listing the real core.js ladder (★n: 공격·체력 +10%/성, 필요 조각 10×n; 각성 ◆: +15%, 조각 60+40a, 골드 5000×3^a). Visual only; static CSS, DOM touch only on render */
const X=':is(#_s1,#_s2,div):is(#_s3,#_s4,div)',Zb=':is(#_s9,#_sa,b):is(#_sb,#_sc,b)',Zs=':is(#_sd,#_se,small):is(#_sf,#_sg,small)',Y=':is(#_s5,#_s6,span):is(#_s7,#_s8,span)',ol=c=>`-1px 0 ${c},1px 0 ${c},0 -1px ${c},0 1px ${c},0 2px ${c}`,
SP=(v,h)=>`background:none!important;border:solid transparent!important;border-width:${v}px ${h}px!important;border-image:url(${A}hc_statplate.png) 46 52 fill/${v}px ${h}px stretch!important;border-radius:0!important;box-shadow:none!important`,
B=(f,o,w=9)=>`background:none!important;border:${w}px solid transparent!important;border-image:url(${A}${f}) 30 fill/${w}px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;font-family:Maplestory,sans-serif!important;font-weight:900!important;text-shadow:${ol(o)}!important`,
N={g2:[34,55,34,125,.3],g3:[34,55,34,125,.3],g4:[42,75,42,132,.28]},gk=g=>g<=2?'g2':g>=4?'g4':'g3',
K='#screen.stx .sbody>.card'+X,L='#screen.stx .stlist .stc'+X;
let css=`${K}{background:none!important;border:18px solid transparent!important;border-image:url(${A}panel_stage.png) 64 fill/18px stretch!important;border-radius:0!important;box-shadow:none!important;padding:2px!important;position:relative;margin-top:28px!important;overflow:visible!important}
${K}::after{content:'';position:absolute;left:50%;top:-30px;width:26px;height:31px;margin-left:-13px;background:url(${A}panel_stage_gem.png) center/contain no-repeat;pointer-events:none}
${K} .ttl{text-shadow:0 2px 2px #000}${K} small{color:#efe4cc!important;text-shadow:0 1px 2px #000;opacity:1!important}
#screen.stx .sthero${X}{display:flex;gap:6px;align-items:center}#screen.stx .sthero${X}>img{height:132px!important;width:auto!important;flex:none;filter:drop-shadow(0 4px 4px #0009)}
#screen.stx .sthero .f>b${Zb}{display:inline-flex;align-items:center;gap:4px;border:solid transparent;padding:0 6px 0 2px;filter:drop-shadow(0 2px 2px #0008);text-shadow:${ol('#0a1430')};font-family:Maplestory,sans-serif;line-height:18px}
#screen.stx .sthero${X}>.f{flex:1 1 auto!important;min-width:0!important;max-width:100%;overflow:visible}#screen.stx .sthero .f>small:not(.sxr){white-space:normal!important}#screen.stx .sthero .f>b${Zb}{max-width:100%;box-sizing:border-box}#screen.stx .sthero .f>b .fac{background:#0008;text-shadow:none}
#screen.stx .xsk${X}{gap:1px!important;margin:5px 0 4px!important}#screen.stx .xsk${X} i{width:21px!important;height:21px!important}#screen.stx .xsk i .xso{display:none}
#screen.stx .xsk i .xg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 1px 1px #0009)}#screen.stx .xsk i.off .xg{filter:grayscale(1) brightness(.45);opacity:.8}
#screen.stx .sthero .f>small.sxr${Zs}{display:flex;align-items:center;gap:4px;${SP(7,9)};padding:0 4px!important;margin:2px 0;color:#fff!important;font-weight:800;white-space:nowrap;font-size:11.5px!important;width:max-content;max-width:100%;box-sizing:border-box}
#screen.stx .sthero .sxr img{height:18px;margin:-3px 0}#screen.stx .sthero .sxr .up{color:#9dff7a!important;font-style:normal}
${L}{${SP(8,9)};border-width:8px 9px 10px!important;padding:0 0 2px!important;flex:0 0 66px!important;width:66px!important;filter:drop-shadow(0 0 2px var(--rc)) drop-shadow(0 2px 2px #0008)}
${L}.on{filter:drop-shadow(0 0 3px #ffe08a) drop-shadow(0 0 5px #ffc040) drop-shadow(0 2px 2px #0008)}
${L} small{display:flex;align-items:center;gap:1px;color:#fff!important;font:900 11px Maplestory,sans-serif;text-shadow:${ol('#1a1430')}}${L} small img{height:13px}
${L} .dot{top:-6px!important;right:-6px!important}
#screen.stx .card>.bar.xsb${X}{height:0!important;min-height:0!important;box-sizing:content-box!important;border:6px solid transparent!important;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch!important;background:none!important;border-radius:0!important;overflow:visible!important;position:relative;box-shadow:none!important;margin:12px 0 10px 18px!important}
#screen.stx .card>.bar.xsb${X}>i{position:absolute!important;left:-6px;top:-6px;height:0!important;max-width:100%;box-sizing:content-box!important;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch;background:none!important;border-radius:0!important}
#screen.stx .card>.bar.xsb${X}>i.ok{border-image-source:url(${A}sld_fill_green_s.png)}#screen.stx .card>.bar.xsb${X}>img{left:-22px!important;height:26px!important}
#screen.stx :is(#stUp,#stAw)${Y}{${B('btn_gold.png','#5a3006',10)};display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;white-space:nowrap;align-items:center;justify-content:center;gap:2px;min-height:34px;padding:0 4px 0 34px!important;font-size:14px!important}
#screen.stx :is(#stUp,#stAw)${Y}.off{border-image-source:url(${A}btn_grey.png)!important;text-shadow:${ol('#2a2a2a')}!important;color:#e8e2d8!important}
#screen.stx :is(#stUp,#stAw)${Y}:not(.off):active{transform:scale(.94)!important;filter:brightness(.8)!important}
#screen.stx img.sg{flex:none;height:15px;width:15px;vertical-align:-2px}
#screen.stx .slad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px 4px;margin-top:6px}
#screen.stx .slad>div{${SP(7,8)};padding:0!important;display:flex;flex-direction:column;align-items:center;min-width:0;color:#fff;font:800 11px Maplestory,sans-serif;text-shadow:0 1px 2px #000;line-height:14px}
#screen.stx .slad>div>span{display:flex;align-items:center;gap:0;height:16px}#screen.stx .slad>div>span img.sg{height:12px;width:12px}#screen.stx .slad>div>em{font-style:normal;color:#ffe7a8;font-size:10px}#screen.stx .slad>div>u{text-decoration:none;color:#cfe0ff;font-size:9.5px}
#screen.stx .slad>div.sok{opacity:.72}#screen.stx .slad>div.scur{filter:drop-shadow(0 0 3px #ffe08a) drop-shadow(0 0 4px #ffc040)}#screen.stx .slad>div.scur>em{color:#9dff7a}
#screen.stx .slad>div.sno span img{filter:grayscale(1) brightness(.5)}#screen.stx .slad .aw{color:#c8a8ff}
#screen.skx .skg .skn .skj${Y}{display:inline-flex;flex-direction:column;align-items:center;margin-top:3px;${SP(6,8)};padding:0 2px!important;color:#ffe7a8!important;font:900 10.5px Maplestory,sans-serif!important;line-height:12px;text-shadow:${ol('#2a1a08')};white-space:nowrap}
#screen.skx .skg .skn .skj u{text-decoration:none;color:#cfe0ff;font-size:9.5px}
body.tglite ${L},body.tglite ${L}.on,body.tglite #screen.stx .slad>div.scur,body.tglite #screen.stx .sthero${X}>img{filter:none}\n`;
for(const g in N){const [t,r,b,l,k]=N[g];css+=`#screen.stx .sthero.${g} .f>b${Zb}{border-width:${(t*k).toFixed(1)}px ${(r*k).toFixed(1)}px ${(b*k).toFixed(1)}px ${(l*k).toFixed(1)}px;border-image:url(${A}hc_name_${g}.png) ${t} ${r} ${b} ${l} fill/${(t*k).toFixed(1)}px ${(r*k).toFixed(1)}px ${(b*k).toFixed(1)}px ${(l*k).toFixed(1)}px stretch}\n`}
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const SG=`<img class=sg src="${A}star_gold.png">`,star=t=>t.replace(/★/g,SG);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='star')dStar();else if(G.screen=='skin')dSkin()}catch(e){console.warn(e)}return r};
function dSkin(){const el=$('#screen'),s=C.S(),J=G.JOB||[];el.querySelectorAll('.skg .skn[data-sk]').forEach(c=>{if(c.dataset.v248)return;c.dataset.v248=1;const k=c.dataset.sk,sk=D.SKINS.find(x=>x.k==k);if(!sk||!sk.job||(s.skins||{})[k])return;
 const t=parseInt(k.slice(3),10)-1,j=J[t];if(!j)return;const sm=c.querySelector('small');if(sm)sm.innerHTML=`<span class=skj>${t+1}차 전직 시 해금<u>Lv.${j.lv} 전직 시련</u></span>`;c.classList.add('lk');if(!c.querySelector('.klk'))c.insertAdjacentHTML('beforeend',`<img class=klk src="${A}sk_lock.png">`)})}
function dStar(){const el=$('#screen'),s=C.S(),k=G.stSel,c=D.COMPS.find(x=>x.k==k);
 el.querySelectorAll('.stlist .stc').forEach(t=>{if(t.dataset.v248)return;t.dataset.v248=1;const sm=t.querySelector('small');if(sm)sm.innerHTML=star(sm.innerHTML)});
 const h=el.querySelector('.sthero');if(!h||h.dataset.v248||!c)return;h.dataset.v248=1;h.classList.add(gk(c.g));
 h.querySelectorAll('.xsk i').forEach(i=>{const f=i.querySelector('.fl');if(f)f.remove();i.insertAdjacentHTML('beforeend',`<img class=xg src="${A}star_gold.png">`)});
 const sm=h.querySelector('.f>small');if(sm&&/공격 배율/.test(sm.textContent)){sm.classList.add('sxr');sm.insertAdjacentHTML('afterbegin',`<img src="${A}st_atk.png">`)}
 const cards=el.querySelectorAll('.sbody>.card'),c2=cards[1];if(!c2)return;
 const bar=c2.querySelector('.bar'),fi=bar&&bar.querySelector('i');if(fi){const w=parseFloat(fi.style.width)||0,f=Math.min(1,w/100);fi.style.width=`max(0px,calc(${f.toFixed(3)} * (100% + 12px) - 12px))`;if(f>=1)fi.classList.add('ok');if(f<=0)fi.style.display='none'}
 ['#stUp','#stAw'].forEach(q=>{const b=c2.querySelector(q);if(b)b.innerHTML=star(b.innerHTML)});
 const st=s.comps[k]||1,aw=(s.caw||{})[k]||0,m0=C.compMul(k),base=m0/(1+.1*(st-1))/(1+.15*aw),mx=C.STARMAX,AM=C.AWMAX;let rows='';
 for(let n=1;n<=mx;n++){const m=base*(1+.1*(n-1)),cl=n<st||(n==st&&aw)?'sok':n==st?'scur':'sno';rows+=`<div class=${cl}><span>${SG.repeat(n)}</span><em>공격 ×${m.toFixed(2)}</em><u>${n==1?'기본':`체력 +${(n-1)*10}% · 조각 ${10*(n-1)}`}</u></div>`}
 const b6=base*(1+.1*(mx-1));for(let a=1;a<=AM;a++){const m=b6*(1+.15*a),cl=a<aw?'sok':a==aw?'scur':'sno';rows+=`<div class=${cl}><span class=aw>각성 ${'◆'.repeat(a)}</span><em>공격 ×${m.toFixed(2)}</em><u>조각 ${60+40*(a-1)} · 골드 ${fmt(Math.floor(5000*Math.pow(3,a-1)))}</u></div>`}
 c2.insertAdjacentHTML('afterend',`<div class=card><div class=ttl>성급 효과 <small>현재 ${SG}${st}${aw?' · 각성 '+'◆'.repeat(aw):''}</small></div><div class=slad>${rows}</div></div>`)}
})();

;(()=>{/* v249 r298 battle readability (visual only; battle logic / sim untouched):
 (1) boss WARNING queued until the WAVE CLEAR ribbon has lifted - the ribbon keeps its readable first ~0.6s, then lifts (.out .2s) and the WARNING plays its full timeline afterwards (all of its own timers shifted by the same delay);
 (2) damage-number clamp line = bottom of the title / wave pill / buff row HUD, re-measured once a second (render.js lanes + cap + pooled records);
 (3) NICE COMBO in a fixed one-line slot bottom-right of the field (above the fever gauge, right of the 방치보상 chest, below the heroes' feet), hidden while the boss-clear chest moment or the boss duo banner is up */
const st=document.createElement('style');st.textContent=`
.bwarn.bwq{visibility:hidden}.bwarn.bwq,.bwarn.bwq *{animation-play-state:paused!important}
#battle .cmbx:is(#_a,#_b,div):is(#_c,#_d,div){left:308px;top:612px;display:flex;align-items:baseline;justify-content:center;gap:5px;transform-origin:50% 70%}/* centre 308 keeps the box inside x 238-378 (right of the chest 165-225, left of the screen edge) for the longest LEGEND COMBO label */
#battle .cmbx b:is(#_a,#_b,b):is(#_c,#_d,b){display:inline-block;font-size:26px}
#battle .cmbx small:is(#_a,#_b,small):is(#_c,#_d,small){display:inline-block;margin:0;font-size:12px}
#battle.cmbh .cmbx{opacity:0;transition:opacity .12s}/* class toggled 4x/s (no :has() on body = no document-wide style invalidation) */
body.tglite #battle .cmbx b{filter:none}`;document.head.appendChild(st);
document.addEventListener('animationstart',e=>{const t=e.target;if(e.animationName==='wrib'&&t.classList&&t.classList.contains('wrib'))t._t0=performance.now()},true);
const ob=bossWarn;bossWarn=function(i){let rb=null,dl=0;try{rb=document.querySelector('#battle .wvb.wrib');if(rb&&!rb.classList.contains('out')){const age=rb._t0?performance.now()-rb._t0:0;dl=Math.max(0,600-age)+200}}catch(_){}
 const r=ob.apply(this,arguments);if(!dl)return r;
 try{const d=document.querySelector('.bwarn');if(!d||d._q)return r;d._q=1;d.classList.add('bwq');const cl=d.classList,ca=cl.add.bind(cl),rm=d.remove.bind(d);
  const rv=performance.now()+dl;let oT=0,oH=0,od=0;const doOut=()=>{od=1;ca('out');setTimeout(rm,420)};cl.add=(...a)=>{if(a.indexOf('out')<0)return ca(...a);if(od)return;/* the WARNING keeps its full 1.5s on screen after the queue (0.9s minimum when the VS splash hands off), then its own out(.38s)/remove */const now=performance.now(),tg=Math.max(now,rv+(document.querySelector('#battle .vsx')?900:1500));if(oT&&tg>=oT)return;clearTimeout(oH);oT=tg;oH=setTimeout(doOut,tg-now)};d.remove=()=>{};setTimeout(rm,dl+3200)/* safety */;
  setTimeout(()=>{if(rb.isConnected)rb.classList.add('out')},Math.max(0,dl-200));setTimeout(()=>cl.remove('bwq'),dl);R._bwQ=(R._bwQ||0)+1}catch(_){}return r};
let mt=0,ht=0;const of=R.frame;R.frame=function(dt){const r=of.apply(this,arguments);try{ht-=dt||0;if(ht<=0){ht=.25;const b=document.getElementById('battle');if(b){const h=!!document.querySelector('.bchest')||(!!C.B.boss&&!!b.querySelector('.combo.duo'));if(h!==b._cmbh){b._cmbh=h;b.classList.toggle('cmbh',h)}}}mt-=dt||0;{const bb=!!C.B.boss&&document.body.classList.contains('bfon');if(bb!==R._dtB){R._dtB=bb;mt=0}}/* r304: re-measure as soon as the boss frame shows / hides */if(mt<=0){mt=3;R._lite=document.body.classList.contains('tglite')||document.body.classList.contains('nofx');const b=document.getElementById('battle');if(b&&!G.screen){const c0=b.getBoundingClientRect().top;{/* r377: side menu column boxes (battle coords) for normal-wave number placement; Float32Array reused */const sd=R._sd||(R._sd=new Float32Array(16));let n=0;for(const q of ['sideL','sideR','sideR2']){const e=document.getElementById(q);if(!e)continue;const rr=e.getBoundingClientRect();if(rr.width<4||rr.height<4)continue;sd[n*4]=rr.left;sd[n*4+1]=rr.top-c0;sd[n*4+2]=rr.right;sd[n*4+3]=rr.bottom-c0;n++}R._sdN=n}/* battle box, not #cv (the canvas is translated while the screen shakes) */let m=0;for(const q of ['#stagebar','.bossrow','#evrow']){const e=b.querySelector(q);if(!e)continue;const rr=e.getBoundingClientRect();if(rr.height>2&&rr.bottom-c0>m)m=rr.bottom-c0}{/* r304 v255: boss fight - the boss name/HP frame (#bossFr 202-275) joins the clamp line, so numbers rise below it instead of being drawn under it */const bf=C.B.boss&&document.getElementById('bossFr');if(bf){const rr=bf.getBoundingClientRect();if(rr.height>2&&rr.bottom-c0+12>m)m=rr.bottom-c0+12/* +12: the CRITICAL caption + burst sit above the number */}}if(m>0)R._dtTop=Math.min(300,m+6)}}}catch(_){}return r};
})();
;(()=>{/* v250 r299 bottom battle strip spacing (visual only): clear vertical slots between the hero column (ends y582) and the skill row (starts y692) -
 chest 552-621 (timer no longer under the FEVER bar), potions/자동 585-621, FEVER 625-639, 지령 bar 643-689 + AUTO/×1 644-686; NICE COMBO keeps 591-621 right of the chest. #app is a fixed 390px stage scaled to the viewport, so 360-430px widths share this layout */
const S=':is(#_a,#_b,div):is(#_c,#_d,div)';const st=document.createElement('style');st.textContent=`
#battle #idleBtn${S}{top:552px!important;bottom:auto!important}
#battle #potW${S}{top:585px!important;bottom:auto!important}
#battle #fevg${S}{top:625px!important;bottom:auto!important}
#battle #mission${S}{top:643px!important;bottom:auto!important}
#battle #bctl${S}{top:644px!important;bottom:auto!important}`;document.head.appendChild(st);
})();
;(()=>{/* v251 r300 (visual only): (A) hc_statplate backing (navy + gold rim, reads over moving monsters better than the light tt_plate) behind the 방치보상 label + timer;
 (B) top HUD: stage title on an hc_statplate name plate (was cream text straight over the bright field), timer + 웨이브 row on its own plate and moved right of the boss button (x 92-136 used to cover the ⏱ icon / timer bar) */
const S=':is(#_a,#_b,div):is(#_c,#_d,div)',P=`border:solid transparent;border-width:5px 7px;border-image:url(assets/hc_statplate.png) 46 52 fill/5px 7px stretch;filter:drop-shadow(0 1px 2px #0008)`;const st=document.createElement('style');st.textContent=`
#battle #idleBtn${S}::before{content:'';position:absolute;left:-7px;right:-7px;top:40px;height:31px;box-sizing:border-box;z-index:-1;pointer-events:none;${P}}
#battle #idleBtn${S} b,#battle #idleBtn${S} small{position:relative;text-shadow:0 1px 0 #000,0 0 3px #000}
#stagebar #stName:is(#_a,#_b,b):is(#_c,#_d,b){color:#fff;text-shadow:0 1px 0 #000,0 0 3px #000c}
#stagebar #stName:is(#_a,#_b,b):is(#_c,#_d,b)::before{content:'';position:absolute;left:-6px;right:-6px;top:-2px;bottom:-3px;box-sizing:border-box;z-index:-1;pointer-events:none;${P}}
#stagebar .trow${S}{position:relative;z-index:1;margin-left:30px!important;padding-right:4px;width:126px!important;max-width:none!important;flex:none!important;white-space:nowrap}#stagebar #stInfo{white-space:nowrap;flex:1 0 auto!important;max-width:none!important}
#stagebar .trow${S}::before{content:'';position:absolute;left:-6px;right:-2px;top:-3px;bottom:-3px;box-sizing:border-box;z-index:-1;pointer-events:none;${P}}
body.tglite #battle #idleBtn::before,body.tglite #stagebar #stName::before,body.tglite #stagebar .trow::before{filter:none}`;document.head.appendChild(st);
})();
;(()=>{/* v252 r301 (visual only): (A) stage title plate dropped 3px so its top rim clears the HUD bar; (B) #bossBtn = current stage boss portrait (D.BOSSPLAN/D.BOSSES, same pick as core startBoss) in a round gold frame -
 .off dimmed/greyed, ready = CSS pulse ring (static under low graphics / fx off), .fight red ring; no boss art -> keeps the ϟ glyph on the gold frame. Portrait refreshed by a 500ms check that only writes on change (nothing per frame) */
const S=':is(#_a,#_b,span):is(#_c,#_d,span)';const st=document.createElement('style');st.textContent=`
#stagebar #stName:is(#_a,#_b,b):is(#_c,#_d,b){transform:translateY(3px)}
#stagebar #stName:is(#_a,#_b,b):is(#_c,#_d,b)::before{top:-1px!important;bottom:-2px!important}
#battle #bossBtn${S}{border-radius:50%!important;box-sizing:border-box!important;border:2.5px solid #ffd76a!important;background:radial-gradient(circle at 50% 40%,#5a2a3a,#1a0a14)!important;box-shadow:0 0 0 1.5px #7a4a12,inset 0 0 6px #000c,0 2px 5px #000a!important;overflow:hidden!important;filter:none!important;opacity:1!important}
#battle #bossBtn${S}.bsp{background:var(--bsi) 50% 14%/165% auto no-repeat,radial-gradient(circle at 50% 40%,#5a2a3a,#1a0a14)!important}
#battle #bossBtn${S}.bsp>i{display:none!important}
#battle #bossBtn${S}::before,#battle #bossBtn${S}::after{display:none!important}
#battle #bossBtn${S}.off{filter:grayscale(.85) brightness(.62)!important;border-color:#b8a070!important}
#battle #bossBtn${S}:not(.off):not(.fight){animation:bsbp 1.1s ease-in-out infinite alternate!important}
#battle #bossBtn${S}.fight{border-color:#ff6a4a!important;box-shadow:0 0 0 1.5px #7a1a12,0 0 8px #ff5a3a,inset 0 0 6px #000c!important}
@keyframes bsbp{from{box-shadow:0 0 0 1.5px #7a4a12,0 0 4px #ffcf5a,inset 0 0 6px #000c}to{box-shadow:0 0 0 1.5px #7a4a12,0 0 14px 3px #ffcf5a,inset 0 0 6px #000c}}
:is(body.tglite,body.nofx) #battle #bossBtn${S}:not(.off):not(.fight){animation:none!important;box-shadow:0 0 0 1.5px #7a4a12,0 0 9px 2px #ffcf5a,inset 0 0 6px #000c!important}`;document.head.appendChild(st);
let last=null;setInterval(()=>{try{const b=document.getElementById('bossBtn');if(!b)return;const s=C.S(),i=s.si,pl=D.BOSSPLAN[Math.floor(i/7)],bo=pl&&D.BOSSES[pl[i%7==6?1:0]],im=bo&&bo.img?'assets/'+bo.img:'';const k=im+'|'+(b._bk||'');if(im===last&&b._bk===1)return;last=im;b._bk=1;if(im){b.style.setProperty('--bsi',`url("${im}")`);b.classList.add('bsp')}else{b.style.removeProperty('--bsi');b.classList.remove('bsp')}}catch(_){}},500);
})();
;(()=>{/* v253 r302 (visual only): duo / skill-cast banner (.combo, .combo.duo) in a fixed slot at the top of the field (y 238-357, below the 증원 / buff row; 280-399 in boss fights, below #bossFr) instead of mid-field (466) or over the bottom strip in boss fights (548).
 It never shares the screen with the WAVE CLEAR ribbon (244-332) or the boss WARNING: a banner that arrives while either is up waits hidden + paused (max 2.6s, then it is dropped), and a ribbon / WARNING that arrives over a live banner fades it out in .16s.
 The original slide-in (duoIn) is kept; 스킬 연출 / low graphics gating stays with the code that creates the banner */
const st=document.createElement('style');st.textContent=`
#battle .combo:is(#_a,#_b,div):is(#_c,#_d,div){top:238px!important}body.bossfight #battle .combo:is(#_a,#_b,div):is(#_c,#_d,div){top:280px!important}/* boss fight: below the boss name/HP frame #bossFr (202-275) */
#battle .combo.cbq{visibility:hidden!important}#battle .combo.cbq,#battle .combo.cbq *{animation-play-state:paused!important}
#battle .combo.cbo{opacity:0!important;transition:opacity .16s ease-in!important}`;document.head.appendChild(st);
const blk=()=>!!document.querySelector('#battle .wvb.wrib:not(.out),.bwarn:not(.out),.vsx,#battle .bcut');/* + the boss VS card and boss cut-in */
const pos=n=>{const dw=!!(C.B&&C.B.boss&&!C.B.wb&&n.classList.contains('duo'));if(dw&&!n.classList.contains('dlw')){n.classList.add('dlw');n.classList.remove('dlo','dfd')}/* r367: boss-fight duo card goes to the low band (~556-649, under the boss's feet, over the idle/potion row) instead of 280-392 / 362-474, which sat on the boss's crown, face and the above-head crit */const t=C.B&&C.B.boss?(dw?'540px':n.classList.contains('dlo')?'362px':'280px'):'238px';/* r325: .dlo duo banner (boss strip up when it appeared) keeps the 362 slot - this inline !important is why the r324 stylesheet rule never applied live */if(n._tp!==t){n._tp=t;n.style.setProperty('top',t,'important')}};/* boss state read when the banner shows (body.bossfight lands a beat later than C.B.boss) */
const arm=n=>{if(n._cq)return;n._cq=1;pos(n);if(!blk()){if(n.classList.contains('dlo')&&G._dloOn)G._dloOn();return}const rm0=n.remove.bind(n);n._rm0=rm0;n.classList.add('cbq');n.remove=()=>{};/* r326: at most one banner waits - a newer one replaces it; the waiting one is no longer dropped after 2.6s, it shows once the ribbons/VS/cut-in clear */{const o=R._cbW;if(o&&o!==n&&o.isConnected&&o._rm0)o._rm0();R._cbW=n}const w=()=>{if(!n.isConnected||R._cbW!==n)return;if(blk()){setTimeout(w,100);return}R._cbW=null;if(n.classList.contains('duo')&&!n.classList.contains('dlw')&&C.B.boss&&!C.B.wb&&R.ccut&&R.ccut.t<1){n.classList.add('dlo');n.classList.remove('dfd')}if(n.classList.contains('dlo')&&G._dloOn)G._dloOn();/* r325: queued duo banner released while the boss strip is up takes the 362 slot */pos(n);n.classList.remove('cbq');R._cbQ=(R._cbQ||0)+1;setTimeout(rm0,1500)};setTimeout(w,100)};
const hide=()=>document.querySelectorAll('#battle .combo:not(.cbq)').forEach(c=>{if(c._co)return;c._co=1;c.classList.add('cbo');const r=c.remove.bind(c);setTimeout(()=>{try{Element.prototype.remove.call(c)}catch(_){}},180)});
const go=()=>{const b=document.getElementById('battle');if(!b)return setTimeout(go,300);new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(!n.classList)continue;if(n.classList.contains('combo'))arm(n);else if(n.classList.contains('wrib')||n.classList.contains('bcut')||n.classList.contains('vsx'))hide()}}).observe(b,{childList:true});
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&(n.classList.contains('bwarn')||n.classList.contains('vsx')))hide()}).observe(document.body,{childList:true})};go();
})();
;(()=>{/* v254 r303: cast/duo banner 320 -> 275 wide (scale .86 about its centre) so its ends clear the side-menu columns (left 4-56 / right 334-386); independent `scale` keeps the duoIn transform keyframes intact; non-duo text banners capped at 290.
 Battle toasts (#toastQ, y ~283-351, e.g. the groggy notice) sit inside both banner slots (238-340 / 280-382): while a banner is live the toast stack slides 118px down (to ~401-469) and slides back when it ends */
const st=document.createElement('style');st.textContent=`#battle .combo.duo:is(#_a,#_b,div):is(#_c,#_d,div){scale:.86}
#battle .combo:not(.duo):is(#_a,#_b,div):is(#_c,#_d,div){max-width:290px!important;box-sizing:border-box;margin-inline:auto}
#toastQ{transition:transform .2s,translate .2s}body:not(.hs-scr):not(.hs-sh):not(.hs-mp):is(.hs-cb,#_hz1).hs-cb.hs-cb.hs-cb #toastQ{translate:0 118px}
/* r327: a lowered duo banner (362-474) would sit under the slid toast - slide it past the banner instead */body:not(.hs-scr):not(.hs-sh):not(.hs-mp):is(.hs-cbo,#_hz1).hs-cbo.hs-cbo.hs-cbo.hs-cbo #toastQ{translate:0 176px}`;document.head.appendChild(st)})();

;(()=>{/* v256 r306 (visual only): boss-fight mid-field slots - boss frame 202-275 | boss HP notice (.phx) 279-301 | ally skill strip (canvas, ccStrip) 304-356; while either overlay is up the damage-number floor drops to 358 (R._dtTop2, read by render.js lanes) so crits rise below them instead of through them. One flag + one compare per frame, no allocation */
const st=document.createElement('style');st.textContent=`body.bossfight #battle .phx:is(#_a,#_b,div):is(#_c,#_d,div){top:279px!important}
/* r324: duo banner (boss slot 280-399) drops under the skill strip (304-356) while it is up, like .mkb under ccon/lcut */
body.bossfight #battle .combo.duo.dlo:is(#_a,#_b,div):is(#_c,#_d,div){top:362px!important}
#battle .combo.duo.dfd{opacity:.15!important;transition:opacity .12s}
/* r324: battle combo counter hidden while any menu screen is open (body.scron, set in openScreen/closeScreen) */
body.scron #battle .cmbx{visibility:hidden!important}
/* r328: battle overlays never draw over an open menu screen or modal (display only; timers untouched) */
body.scron .bwarn,body.scron #battle .vsx,body.scron #battle .wvb,body.scron #battle .bcut,body.scron #battle .banner,body.scron #battle .combo,body.scron #bubL,body.scron .vic,
body.hs-mod .bwarn,body.hs-mod #battle .vsx,body.hs-mod #battle .wvb,body.hs-mod #battle .bcut,body.hs-mod #battle .banner,body.hs-mod #battle .combo,body.hs-mod #bubL,body.hs-mod .vic{visibility:hidden!important;animation-play-state:running}
/* r328: LEVEL UP banner sits in the low band (numbers there fade via R._dloB), clear of kill banners at 238-300 */
#battle .banner.lvb{top:212px!important}
/* r329: while a lowered duo banner holds 362-474, LEVEL UP takes the upper slot (~238) */
/* r330: boss fight with the upper area full: compact LEVEL UP pill just below the lowered duo banner (478-506), over the party area */
#battle .banner.lvp{top:308px!important;width:fit-content;margin:0 auto;font-size:17px;line-height:24px;height:28px;box-sizing:border-box;padding:0 16px;border-radius:14px;border:2px solid #ffd77a;background:linear-gradient(#7a3a08ee,#3a1a04ee);box-shadow:0 0 0 2px #0b0d0f,0 0 12px #ffb02a99;text-shadow:0 0 6px #ff7a2a,0 2px 0 #5a1a00}
#battle .banner.lvp.rplv img{height:20px}
/* r328: speech bubble faded while it overlaps the ally strip / lowered duo band */
#bubL .bub.bfd{opacity:.15!important}`;document.head.appendChild(st);
const go=()=>{if(!G._phase)return setTimeout(go,300);const op=G._phase;G._phase=function(){R._phT=performance.now();return op.apply(this,arguments)}};go();
const of=R.frame;R.frame=function(dt){const r=of.apply(this,arguments);try{const on=!!C.B.boss&&((R.ccut&&R.ccut.t<1)||(R._phT>0&&performance.now()-R._phT<1150));R._dtTop2=on?358:0;/* r324: ally skill strip up -> body.bsc (flips on change only) lowers the duo banner below it */const sc=!!C.B.boss&&!C.B.wb&&!!R.ccut&&R.ccut.t<1;if(sc!==R._bsc){R._bsc=sc;document.body.classList.toggle('bsc',sc);/* r325: strip starting under an already-shown banner fades it (on flip only) */document.querySelectorAll('#battle .combo.duo:not(.dlo):not(.dlw)').forEach(x=>x.classList.toggle('dfd',sc))}}catch(_){}return r};
})();

/* r307 v257: boss fights — the skill-total readout (.tdmg) sits below the ally skill strip (304–356) instead of on it; status/BREAK!/회피! texts and crit bursts fade inside the strip/HP-notice band (render + v16/v17/v18 patches; visual only) */
;(()=>{const st=document.createElement('style');st.textContent=`body.bossfight #battle .tdmg{top:392px!important}`;document.head.appendChild(st)})();

/* r308 v258: ally portrait 필살 gauge readability — reads only the existing a._ug fill (.ugb i width) and .ugf ready class set by the v-ult tick; thicker framed bar, gold when ready, pulsing ready ring (static under low graphics / fx off). No tap or timing change */
;(()=>{const X=':is(#_u1,#_u2,div):is(#_u3,#_u4,div)',st=document.createElement('style');st.textContent=`
#partycol .pp>.ugb${X}{height:4px!important;background:#0a1430!important;border:1px solid #000!important;border-top:0!important;border-radius:0 0 3px 3px!important;overflow:hidden!important}
#partycol .pp>.ugb${X}>i{background:linear-gradient(90deg,#2a7cff,#7ad8ff 70%,#e0f8ff)!important;box-shadow:0 0 4px #4ab8ff!important;width:100%!important;transform:scaleX(0);transform-origin:0 50%;transition:transform .25s linear;will-change:transform}/* r314: fill via compositor scaleX, was width */
#partycol .pp.ugf>.ugb${X}>i{background:linear-gradient(90deg,#ffb02e,#fff2a0)!important;box-shadow:0 0 6px #ffd25a!important;animation:ugP .6s ease-in-out infinite alternate}
#partycol .pp.ugf::before{content:'';position:absolute;left:-2px;top:-2px;width:44px;height:40px;border-radius:7px;border:2px solid #9ae8ff;box-shadow:0 0 10px 2px #4ab8ff,inset 0 0 8px #4ab8ffaa;pointer-events:none;z-index:2;animation:ugP .6s ease-in-out infinite alternate}
@keyframes ugP{from{opacity:.6}to{opacity:1}}
body:is(.tglite,.nofx) #partycol .pp.ugf::before,body:is(.tglite,.nofx) #partycol .pp.ugf>.ugb${X}>i,body:is(.tglite,.nofx) #partycol .pp.ugf::after{animation:none!important}`;document.head.appendChild(st)})();

;(()=>{/* r312 stutter: pre-decode boss-entry art off the frame path. 4x-throttle trace showed sync 'Decode Image' on the boss VS card / cut-in frame (12 decodes, ~32ms) - now decoded at idle ahead of the fight, plus the neighbouring stage backgrounds. Display only. */
const K={},ric=window.requestIdleCallback||(f=>setTimeout(f,200));
const want=()=>{const s=C.S(),i=s.si|0,L=['assets/vs_bg.jpg','assets/'+((s.job||0)>=3?'cut/lina_ult_job3.png':(s.job||0)>=2?'cut/lina_ult_job2.png':'cut/lina_ult.png')];try{const pl=D.BOSSPLAN[Math.floor(i/7)];if(pl){for(const j of [0,1]){const b=D.BOSSES[pl[j]];if(b&&b.img)L.push('assets/'+b.img)}}}catch(_){}try{const n=D.FIELDS.length;for(const d of [0,1,-1]){const f=D.FIELDS[((i+d)%n+n)%n];if(f)L.push('assets/bg_f_'+f+'.jpg')}}catch(_){}const M=[];try{const n=Math.min(7,Math.max(1,Math.floor(i/7)+1)),P='assets/';/* r313: party + map screen art (menu step showed ~31 sync decodes on open) - queued after the boss/stage art, one per idle callback */
 M.push(P+'bg_war_room.webp',P+'hero_lina.png',P+'pt_pedestal.png',P+'pt_flag.png',P+'gl_plate.png',P+'pp_load.png',P+'pp_save.png',P+'fac_none.png');for(const c of D.COMPS){if(c.img)M.push(P+c.img);if(c.fac)M.push(P+'fac_'+c.fac+'.png')}
 M.push(P+'map_world.jpg',P+'map_ch'+n+'.jpg',P+'chap/ch'+n+'.jpg',P+'node_boss.png',P+'crest_3star.png',P+'ic_map.png',P+'ic3_chest.png');for(const m of MENU)if(m[2])M.push(P+m[2])}catch(_){}
 L.M=M;return L};
let busy=0;const step=()=>{if(busy||document.hidden)return;let u=null,lo=0;const W=want();for(const x of W)if(!K[x]){u=x;break}if(!u){for(const x of W.M)if(!K[x]){u=x;lo=1;break}}if(!u)return;busy=1;ric(()=>{const im=new Image();K[u]=im;im.decoding='async';im.src=u;const done=()=>{busy=0;setTimeout(step,lo?250:50)};(im.decode?im.decode():Promise.reject()).then(done,done)},{timeout:3000})};
G._pdc=()=>Object.keys(K);setTimeout(step,2500);setInterval(step,2000)})();

;(()=>{/* r314: (a) G.bump - HUD bumps as el.animate (no class churn / style invalidation sets), same keyframes as the CSS they replace: gbmp .25s, cpop .25s ease-out + slotglow .45s ease-out on #cGold, xpfl flash (.05s in, lit to 90ms, .35s out). (b) G._post callbacks run after the whole canvas frame so their DOM writes never sit ahead of ctx.font. Display only. */
const st=document.createElement('style');st.textContent='#battle>.hud #cGold{border-radius:10px!important}';document.head.appendChild(st);
const CP=[{easing:'ease-out'},{transform:'scale(1.25)',color:'#fff6a0',offset:.4,easing:'ease-out'},{}],SG=[{boxShadow:'0 0 0 0 #ffd77a00',easing:'ease-out'},{boxShadow:'0 0 10px 3px #ffd77acc',offset:.35,easing:'ease-out'},{boxShadow:'0 0 0 0 #ffd77a00'}],GB=[{easing:'ease'},{transform:'scale(1.18)',filter:'brightness(1.5)',offset:.5,easing:'ease'},{}],XF=[{filter:'none'},{filter:'brightness(1.8) drop-shadow(0 0 4px #7fe3ff)',offset:50/440},{filter:'brightness(1.8) drop-shadow(0 0 4px #7fe3ff)',offset:90/440},{filter:'none'}];
const run=(el,k,kf,o)=>{const m=el._ba||(el._ba={});if(m[k])m[k].cancel();m[k]=el.animate(kf,o)};
G.bump=(el,k)=>{if(!el)return;if(!el.animate)return G.replay(el,k);try{
 if(k==='xpfl'){const m=el._ba,a=m&&m.xpfl;if(a&&a.playState==='running'&&a.currentTime>=50&&a.currentTime<=90){a.currentTime=50;return}run(el,'xpfl',XF,{duration:440});return}
 if(k==='lpop'){el._lp=1;run(el,'cp',CP,{duration:250});if(el.id==='cGold')run(el,'sg',SG,{duration:450});return}
 if(k==='gbump'){if(el._lp)return;/* CSS: #cGold.lpop rule outranked .gbump once lpop was on, so gbmp only showed before the first coin pulse */run(el,'gb',GB,{duration:250});return}
 G.replay(el,k)}catch(_){G.replay(el,k)}};
const of=R.frame;R.frame=function(){const r=of.apply(this,arguments);const P=G._post;if(P)for(let i=0;i<P.length;i++){try{P[i]()}catch(_){}}return r};
})();

;(()=>{/* r315: companion ult cut-in art. If assets/cut/<k>_ult.png is listed in ULT and decoded, the field cut-in (ccFrame, non-boss) draws a Lina-style tilted band with the full art sliding in; otherwise the arch-banner portrait as before. Boss fights keep the slim strip. Off under low graphics / fx off (portrait banner), and R.opt.cut=off already suppresses the cut-in. Art decoded at idle. Display only. */
const ULT={gourry:1,amelia:1,lyra:1,zelgadis:1,xellos:1,pip:1,borin:1,sera:1,rhea:1,kaede:1,noel:1},IM={};/* r319: +xellos; r320: +pip, borin; r321: +sera, rhea, kaede, noel *//* r316: +amelia, lyra; r318: +zelgadis */const ric=window.requestIdleCallback||(f=>setTimeout(f,200));
const low=()=>document.body.classList.contains('tglite')||document.body.classList.contains('nofx')||(R.opt&&R.opt.fx===false);
const get=k=>{let i=IM[k];if(!i){i=IM[k]=new Image();i.decoding='async';i.src=A+'cut/'+k+'_ult.png';i._ok=0;const ok=()=>{i._ok=1;/* r372: build the boss-strip panel at idle once decoded (was built on first ult: 5-7ms) */ric(()=>{try{const c=R._ultStripArt&&R._ultStripArt(k);if(c&&R._wflush)R._wflush(c)}catch(_){}},{timeout:3000})};(i.decode?i.decode():Promise.reject()).then(ok,()=>{if(i.complete&&i.naturalWidth)ok()})}return i};
const pre=Object.keys(ULT);const step=()=>{const k=pre.shift();if(!k)return;ric(()=>{get(k);setTimeout(step,400)},{timeout:4000})};setTimeout(step,3000);
G._ultArt=()=>Object.keys(IM).filter(k=>IM[k]._ok);
/* r322: boss-strip panel — the ult art's upper figure cut once into a small canvas per companion (left edge feathered), cached; R.ccStrip asks once per cut-in and draws it at the strip's right end. null (portrait-only strip) if not listed/decoded or low graphics. */
const PN={};R._ultStripArt=k=>{if(!ULT[k]||low())return null;const i=IM[k];if(!i||!i._ok){get(k);return null}let c=PN[k];if(c)return c;
 c=PN[k]=document.createElement('canvas');const w=c.width=192,h=c.height=96,x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(i,20,0,400,200,0,0,w,h);
 x.globalCompositeOperation='destination-out';const g=x.createLinearGradient(0,0,46,0);g.addColorStop(0,'#000');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,46,h);
 const g2=x.createLinearGradient(0,h-14,0,h);g2.addColorStop(0,'rgba(0,0,0,0)');g2.addColorStop(1,'#000');x.fillStyle=g2;x.fillRect(0,h-14,w,14);return c};
const FN1='bold 14px Maplestory,"Noto Sans KR",sans-serif',FN2='900 28px Maplestory,"Noto Sans KR",sans-serif';
R._ccUlt=(cx,c,t,a,W,H)=>{if(!c||!c.k||!ULT[c.k]||low())return false;const im=get(c.k);if(!im._ok||!im.naturalWidth)return false;
 const e=1-Math.pow(1-Math.min(1,t/.18),3),cy=262,bh=96,h2=bh*1.8,w2=h2*im.naturalWidth/im.naturalHeight;
 cx.save();cx.globalAlpha=a;cx.translate(0,cy);cx.rotate(-.09);
 if(!c._g){const g=cx.createLinearGradient(0,-bh/2,0,bh/2);g.addColorStop(0,'#0a1638');g.addColorStop(.5,'#1d3c86');g.addColorStop(1,'#0a1638');c._g=g}
 cx.fillStyle=c._g;cx.fillRect(-40,-bh/2,W+80,bh);
 cx.strokeStyle='rgba(255,214,120,.95)';cx.lineWidth=3;cx.beginPath();cx.moveTo(-40,-bh/2);cx.lineTo(W+40,-bh/2);cx.moveTo(-40,bh/2);cx.lineTo(W+40,bh/2);cx.stroke();
 cx.strokeStyle='rgba(255,226,150,.32)';cx.lineWidth=2;cx.beginPath();for(let i=0;i<12;i++){const yy=((i*29)%bh)-bh/2+4,xx=W-((t*1300+i*97)%(W+200));cx.moveTo(xx,yy);cx.lineTo(xx+110,yy)}cx.stroke();
 const sx=-w2+e*(w2-36)+t*12;cx.save();cx.beginPath();cx.rect(-40,-bh/2-90,W+80,bh+90);cx.clip();cx.drawImage(im,sx,bh/2-h2+6,w2,h2);cx.restore();
 const tx=W-14+(1-Math.min(1,Math.max(0,(t-.1)/.2)))*120;cx.textAlign='right';cx.textBaseline='alphabetic';
 cx.font=FN1;cx.lineWidth=4;cx.strokeStyle='#050a1c';cx.strokeText(c.n,tx,-8);cx.fillStyle=c.rc||'#ffd77a';cx.fillText(c.n,tx,-8);
 cx.font=FN2;cx.lineWidth=7;cx.strokeStyle='#050a1c';const sk=(c.sk||'')+'!';cx.strokeText(sk,tx,24,W*.55);if(!c._tg){const g=cx.createLinearGradient(0,0,0,26);g.addColorStop(0,'#fff6c8');g.addColorStop(1,'#ffb02e');c._tg=g}cx.fillStyle=c._tg;cx.fillText(sk,tx,24,W*.55);
 cx.restore();return true};
})();

;(()=>{/* r318: Lina's own full-screen cut-in (R.cut, drawn on the battle canvas) also dims the body-level XP orbs; class flips only on change (display only) */
let on=false;const of=R.frame;R.frame=function(dt){const r=of.apply(this,arguments);const n=!!(R.cut&&R.cut.t<1.25);if(n!==on){on=n;document.body.classList.toggle('lcut',n)}return r};
})();

/* r334: 더보기 fold-out - red dot mirrors any folded badge (MutationObserver: runs only when a badge or the panel content changes, never per frame); closes on outside tap */
(()=>{const F=document.getElementById('sideF');if(!F)return;const upd=G._sfDot=()=>{const m=document.querySelector('#sidemore .dot');if(!m)return;let on=false;F.querySelectorAll('.dot').forEach(d=>{if(d.style.display!=='none')on=true});const v=on?'':'none';if(m.style.display!==v)m.style.display=v};
new MutationObserver(upd).observe(F,{subtree:true,childList:true,attributes:true,attributeFilter:['style']});upd();
document.addEventListener('pointerdown',e=>{if(F.classList.contains('on')&&!F.contains(e.target)&&!e.target.closest('#sidemore'))F.classList.remove('on')},true)})();

;(()=>{/* r336 화룡전-style 임무 sheet: 일일/주간/업적 tabs, sld_track_s/sld_fill_s bars, btn_gold glow on claimable, btn_grey otherwise. Same data (D.MISSIONS/D.WMISS/D.ACH) and same claim calls (C.claimMission/C.claimW/C.achClaim). No milestone chests exist in data, so none are drawn. Display only */
try{TITLES.mission='임무'}catch(_){}
const IC={kill:'ic4/skull.png',roll:'it2_exp.png',train:'ic3_train.png',spell:'sk/fire.png',boss:'ic4/crown.png',arena:'ic3_arena.png',donate:'ic3_guild.png',collect:'ic3_castle.png'};
const st=document.createElement('style');st.textContent=`
#panel .mqtabs{display:flex;gap:4px;margin:0 0 8px}
#panel .mqtabs span{flex:1;position:relative;text-align:center;padding:7px 0 6px;font-weight:900;font-size:13px;color:#e8d8b8;border:8px solid transparent;border-image:url(${A}btn_grey.png) 30 fill/8px stretch;filter:drop-shadow(0 2px 2px #0007);cursor:pointer}
#panel .mqtabs span.on{border-image-source:url(${A}btn_green.png);color:#fff;text-shadow:0 1px 0 #1a4a10,0 0 2px #1a4a10}
#panel .mqtabs span .dot{position:absolute;right:-6px;top:-8px;display:block}
#panel .mqsum{display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:8px}
#panel .mqsum>img{width:46px;height:46px;object-fit:contain;filter:drop-shadow(0 2px 2px #0008)}
#panel .mqsum .f{flex:1;min-width:0}#panel .mqsum b{font-size:14px;color:#ffe8b0}#panel .mqsum .f>small{display:block;font-size:10.5px;color:#cbb;white-space:nowrap}
#panel .mqsum .mcall{margin:0;flex:none}
#panel .mqb{height:0;box-sizing:content-box;border:6px solid transparent;border-image:url(${A}sld_track_s.png) 12 fill/6px stretch;position:relative;margin:5px 0 2px}
#panel .mqb>i{position:absolute;left:-6px;top:-6px;height:0;box-sizing:content-box;max-width:100%;border:6px solid transparent;border-image:url(${A}sld_fill_s.png) 12 fill/6px stretch}
#panel .mqb>i.ok{border-image-source:url(${A}sld_fill_green_s.png)}
#panel .mqr{display:flex;align-items:center;gap:9px;padding:7px 9px;margin-bottom:6px}
#panel .mqr.cl{opacity:.55}
#panel .mqr.rd{box-shadow:inset 0 0 0 2px #ffd25a,0 0 10px #ffb03a88}
#panel .mqr>.mqi{width:40px;height:40px;flex:none;border-radius:10px;background:radial-gradient(#5a4024,#2a1a0c);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #c9a25a99;display:flex;align-items:center;justify-content:center}
#panel .mqr>.mqi img{width:30px;height:30px;object-fit:contain;filter:drop-shadow(0 1px 1px #000a)}
#panel .mqr .f{flex:1;min-width:0}#panel .mqr .f b{font-size:12.5px}#panel .mqr .mqv{font-size:10px;color:#ddd;display:flex;justify-content:space-between}
#panel .mqr .mqrw{display:inline-flex;align-items:center;gap:2px;font-size:11px;font-weight:900;color:#fff}#panel .mqr .mqrw img{width:16px;height:16px}
#panel .mqr .btn{flex:none;min-width:58px;text-align:center}
#panel .mqr .btn.off{background:none!important;border:10px solid transparent!important;border-image:url(${A}btn_grey.png) 30 fill/10px stretch!important;border-radius:0!important;box-shadow:none!important;color:#eee!important;padding:0 8px!important;min-height:22px;display:inline-flex;align-items:center;justify-content:center;opacity:1!important}
#panel .mqr .btn[data-ach]:not(.off){background:none!important;border:10px solid transparent!important;border-image:url(${A}btn_gold.png) 30 fill/10px stretch!important;border-radius:0!important;box-shadow:none!important;color:#fff!important;padding:0 8px!important;min-height:22px;display:inline-flex;align-items:center;justify-content:center}
#panel .mqr.rd .btn:not(.off){animation:mqg 1.3s ease-in-out infinite}
@keyframes mqg{0%,100%{filter:drop-shadow(0 2px 2px #0007) drop-shadow(0 0 2px #ffd25a)}50%{filter:drop-shadow(0 2px 2px #0007) drop-shadow(0 0 9px #ffc030)}}
body.tglite #panel .mqr.rd .btn,body.nofx #panel .mqr.rd .btn{animation:none}
#panel .mqmore{display:block;text-align:center;font-size:12px;font-weight:800;color:#ffd77a;padding:6px;cursor:pointer}
#panel .mqnote{font-size:10px;color:#bba;text-align:center;margin:2px 0 6px}
`;document.head.appendChild(st);
const row=(o)=>`<div class="card mqr ${o.cl?'cl':o.done?'rd':''}"><div class=mqi><img src="${A}${o.ic}"></div><div class=f><b>${o.n}</b><div class=mqb><i class="${o.done?'ok':''}" style="width:${Math.min(1,o.v/o.goal)*100}%"></i></div><div class=mqv><span>${fmt(o.v)}/${fmt(o.goal)}</span><span class=mqrw>${o.rw}</span></div></div><span class="btn ${o.cl||!o.done?'p off':''}" ${o.attr}>${o.cl?'완료':o.done?'받기':'진행 중'}</span></div>`;
const gem=n=>`<img src=assets/it2_gem.png>${n}`,tk=n=>n?` <img src=assets/it2_ticket.png>${n}`:'';
const ordr=(a)=>a.map((x,i)=>[x,i]).sort((p,q)=>{const r=x=>x.cl?2:x.done?0:1;return r(p[0])-r(q[0])||p[1]-q[1]}).map(x=>x[0]);
const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab!=='mission')return r;const p=$('#panel'),s=C.S();C.daily();C.weekly();
 const T=G.mqT=G.mqT||'d';
 const D1=D.MISSIONS.map(m=>{const v=Math.min(m.goal,s.mp[m.k]||0);return{n:m.n,ic:IC[m.k]||'ic3_quest.png',v,goal:m.goal,done:v>=m.goal,cl:!!s.mc[m.k],rw:gem(m.gem),attr:`data-m=${m.k}`}});
 const W1=(D.WMISS||[]).map(m=>{const v=Math.min(m.goal,s.wk.p[m.k]||0);return{n:m.n,ic:IC[m.k]||'ic3_quest.png',v,goal:m.goal,done:v>=m.goal,cl:!!s.wk.c[m.k],rw:gem(m.gem)+tk(m.tk),attr:`data-w=${m.k}`}});
 const A1=C.achList?C.achList().map(a=>({n:a.n+(a.done?'':` ${a.lv+1}단계`),ic:a.ic||'ic3_trophy.png',v:Math.min(a.v,a.goal),goal:a.goal,done:a.done||a.can,cl:a.done,rw:a.done?'':gem(a.gem),attr:`data-ach=${a.k}`})):[];
 const dD=D1.some(x=>x.done&&!x.cl),dW=W1.some(x=>x.done&&!x.cl),dA=A1.some(x=>x.done&&!x.cl);
 const L=T=='w'?W1:T=='a'?A1:D1,nd=L.filter(x=>x.cl).length,nr=L.filter(x=>x.done&&!x.cl).length;
 const sub=T=='d'?'매일 05:00 초기화 (KST)':T=='w'?'월요일 초기화':'단계별 영구 보상';
 const ttl=T=='d'?'일일 지령':T=='w'?'주간 임무':'업적';
 const allN=T=='a'?nr:(T=='d'?D1:W1).filter(x=>x.done&&!x.cl).length+0;
 p.innerHTML=`<div class=mqtabs>${[['d','일일',dD],['w','주간',dW],['a','업적',dA]].map(([k,n,d])=>`<span class="${T==k?'on':''}" data-mq=${k}>${n}${d?'<i class=dot></i>':''}</span>`).join('')}</div>
 <div class="card mqsum"><img src="${A}fr_gift.png"><div class=f><b>${ttl}${nr?`<u class=mqrd>받기 대기 ${nr}</u>`:''}</b> <small>${sub}</small><div class=mqb><i class="${nd>=L.length?'ok':''}" style="width:${L.length?nd/L.length*100:0}%"></i>${nr?`<i class=mqrdb style="width:${(nd+nr)/L.length*100}%"></i>`:''}<em>받음 ${nd}/${L.length}${nr?` · 대기 ${nr}`:''}</em></div></div>${T!='a'?`<span class="mcall ${dD||dW?'':'off'}" id=mqAll>모두 받기${(D1.concat(W1)).filter(x=>x.done&&!x.cl).length?` <small>${(D1.concat(W1)).filter(x=>x.done&&!x.cl).length}</small><em class=mqsrc>일일 ${D1.filter(x=>x.done&&!x.cl).length} · 주간 ${W1.filter(x=>x.done&&!x.cl).length}</em>`:''}</span>`:`<span class="mcall ${nr?'':'off'}" id=mqAch>모두 받기${nr?` <small>${nr}</small><em class=mqsrc>${nr}종 · ${G.achSteps?G.achSteps():nr}단계</em>`:''}</span>`}</div>
 ${ordr(L).map(row).join('')}${T=='a'?`<span class=mqmore id=mqAchS>업적의 전당 · 칭호 보기 ›</span>`:''}`;
 p.querySelectorAll('[data-mq]').forEach(b=>b.onclick=()=>{G.mqT=b.dataset.mq;renderPanel()});
 p.querySelectorAll('[data-m]').forEach(el=>el.onclick=()=>{if(el.classList.contains('off'))return;C.claimMission(el.dataset.m);try{updateHud()}catch(_){}renderPanel()});
 p.querySelectorAll('[data-w]').forEach(el=>el.onclick=()=>{if(el.classList.contains('off'))return;C.claimW(el.dataset.w);try{updateHud()}catch(_){}renderPanel()});
 p.querySelectorAll('[data-ach]').forEach(el=>el.onclick=()=>{if(el.classList.contains('off'))return;const sn=resSnap();if(C.achClaim(el.dataset.ach)){try{updateHud()}catch(_){}renderPanel();diffPop(sn,'업적 달성')}});
 const ma=p.querySelector('#mqAll');if(ma)ma.onclick=()=>{G.missionClaimAll&&G.missionClaimAll();renderPanel()};
 const mh=p.querySelector('#mqAch');if(mh)mh.onclick=()=>{const sn=resSnap();let n=0;for(let i=0;i<50;i++){let any=0;C.achList().forEach(a=>{if(a.can&&C.achClaim(a.k)){n++;any=1}});if(!any)break}if(n){try{updateHud()}catch(_){}renderPanel();diffPop(sn,'업적 '+n+'단계 달성')}};
 const ms=p.querySelector('#mqAchS');if(ms)ms.onclick=()=>openScreen('ach');
}catch(e){console.warn(e)}return r};
})();
;(()=>{const st=document.createElement('style');st.textContent=`#panel .mqsum .mcall{background:none;border:10px solid transparent;border-image:url(${A}btn_gold.png) 30 fill/10px stretch;border-radius:0;box-shadow:none;color:#fff;text-shadow:0 1px 0 #5a3006,0 0 2px #5a3006;padding:0 6px;font-size:12px;filter:drop-shadow(0 2px 2px #0007)}#panel .mqsum .mcall.off{border-image-source:url(${A}btn_grey.png);text-shadow:0 1px 0 #3a2a1a}#panel .mqsum .mcall:not(.off){animation:mqg 1.3s ease-in-out infinite}body.tglite #panel .mqsum .mcall,body.nofx #panel .mqsum .mcall{animation:none}#panel .mqsum .mcall small{background:#d02a2a;border-radius:8px;padding:0 5px;margin-left:3px;font-size:10px;color:#fff}`;document.head.appendChild(st)})();
;(()=>{/* r338: 출석 cycle progress card under #attC (n/28 bar, 7/14/21/28 markers, next big day read from the rendered board) + 상점 real tabs (일일 특가 / 패키지 / 보석·골드 상점 = existing sections) with sold-out / limit / unaffordable card states. Display only, existing data only */
const BIG=[7,14,21,28],BXS={7:'s',14:'m',21:'m',28:'l'};
const att=sc=>{const sb=sc.querySelector('.sbody'),bt=sb&&sb.querySelector('#attC'),g=sb&&sb.querySelector('.attg');if(!bt||!g||sb.querySelector('.atcy'))return;const s=C.S(),n=s.att.n||0,MAX=28,can=!bt.classList.contains('off'),cells=g.children;
 const amt=d=>{const c=cells[d-1];return c?{im:c.querySelector('img').getAttribute('src'),b:c.querySelector('b').textContent}:null};
 const nx=BIG.find(d=>d>n),pc=Math.round(n/MAX*100);let nxt='';
 if(nx){const a=amt(nx),need=nx-n,days=can?need-1:need;nxt=`<div class=atnx><img class=atnb src="assets/at_box_${BXS[nx]}.png"><div class=f><small>다음 큰 보상</small><b>${nx}일차 · <img class=ci src="${a.im}"> ${a.b}</b><em>${days<=0?'오늘 출석하면 획득!':`앞으로 ${need}회 출석 (${days}일 후)`}</em></div></div>`}
 else nxt=`<div class=atnx><div class=f><b>이번 사이클 보상을 모두 받았습니다</b></div></div>`;
 bt.insertAdjacentHTML('afterend',`<div class=atcy><div class=atct><b>사이클 ${(s.att.cyc||0)+1} 진행도</b><small>${n} / ${MAX}일 · ${pc}%</small></div><div class=atbar><i style="width:${pc}%"></i>${BIG.map(d=>`<span class="atmk ${n>=d?'got':''} ${d==nx?'nx':''}" style="left:${d/MAX*100}%"><img src="assets/at_box_${BXS[d]}.png"><em>${d}</em></span>`).join('')}</div>${nxt}</div>`)};
const shop=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.shtab2'))return;const s=C.S();
 const dl=sb.querySelector(':scope>.deals'),pk=[...sb.children].find(c=>c.querySelector('[data-pkg]')),tt=[...sb.querySelectorAll(':scope>.ttl')].find(x=>/보석/.test(x.textContent)),gr=tt&&tt.nextElementSibling;
 const G3=[['일일 특가','ic_refresh.png',[dl]],['패키지','sh_chest.png',[pk]],['보석 · 골드','it2_gem.png',[tt,gr]]].filter(x=>x[2].every(Boolean));if(G3.length<2)return;
 if(gr){[...gr.children].forEach(c=>{const bt=c.querySelector('[data-b]');if(!bt)return;const it=D.SHOP.find(x=>x.k==bt.dataset.b);if(!it)return;const b=s.shop.bought[it.k]||0,p=C.shopPrice(it),sold=it.daily&&b>=it.daily,poor=!sold&&((it.cur=='gems'&&s.gems<p)||(it.cur=='gold'&&s.gold<p));
  c.classList.add('shc2');if(sold){c.classList.add('sold');bt.innerHTML='품절';c.insertAdjacentHTML('beforeend','<span class=shst><i>품절</i><em>내일 05시</em></span>')}else if(poor)c.classList.add('poor');
  if(it.cur!='free')c.insertAdjacentHTML('beforeend',`<img class=shcur src="assets/${it.cur=='gems'?'it2_gem':'it2_gold'}.png">`);})}
 if(dl)dl.querySelectorAll('.dcell.sold').forEach(c=>{if(!c.querySelector('.shst'))c.insertAdjacentHTML('beforeend','<span class=shst><i>품절</i><em>내일 05시</em></span>')});
 const free=D.SHOP.some(it=>it.cur=='free'&&it.daily&&(s.shop.bought[it.k]||0)<it.daily),dfree=(C.deals().it||[]).filter(x=>!x.b).length;
 const t=G.shT=Math.min(G.shT||0,G3.length-1);const bar=document.createElement('div');bar.className='entabs shtab2';
 bar.innerHTML=G3.map((x,i)=>`<span class="${i==t?'on':''}" data-st=${i}><img src="assets/${x[1]}">${x[0]}${x[0]=='보석 · 골드'&&free?'<i class=dot></i>':''}${x[0]=='일일 특가'?`<small>${dfree}/${(C.deals().it||[]).length}</small>`:''}</span>`).join('');
 const hh=sb.querySelector(':scope>.shh');(hh||sb.firstChild)&&(hh?hh.after(bar):sb.prepend(bar));sc.classList.add('shop2');
 G3.forEach((x,i)=>x[2].forEach(e=>e.classList.toggle('shhide',i!=t)));
 bar.querySelectorAll('[data-st]').forEach(e=>e.onclick=()=>{if(+e.dataset.st===G.shT)return;G.shT=+e.dataset.st;renderScreen();const b2=document.querySelector('#screen .sbody');if(b2)b2.scrollTop=0})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.querySelector('#screen');if(!sc)return r;if(G.screen=='event')att(sc);if(G.screen=='shop')shop(sc)}catch(e){console.warn(e)}return r}})();
;(()=>{/* r339: 일일 특가 strip (merchant line + existing refresh timer moved into the counter strip) + 가방 tabs 전체/재화/소모품/장비 (filters the existing cards). Display only */
const CUR=/it2_gold|it2_gem|it2_exp|it3_guildcoin|it3_arenatoken|it3_mileagestar/;
const deals=sc=>{const dl=sc.querySelector('.deals.scv');if(!dl||dl.querySelector('.dlst'))return;const tm=dl.querySelector('.dtim'),g=dl.querySelector('.dgrid');if(!tm||!g)return;const d=C.deals(),left=(d.it||[]).filter(x=>!x.b).length;
 const st=document.createElement('div');st.className='dlst';st.innerHTML=`<img class=dlnp src="assets/npc_merchant.png"><div class=dlbb>오늘의 특가는 05시에 바뀌어요.<small>남은 특가 ${left}/${(d.it||[]).length}</small></div>`;st.appendChild(tm);g.before(st)};
const bag=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.bgtab'))return;const cards=[...sb.querySelectorAll(':scope>.card')];if(cards.length<2)return;
 const items=[...cards[0].querySelectorAll('.bagg .bi')].map(b=>({b,c:CUR.test((b.querySelector('img')||{}).getAttribute?.('src')||'')?1:2})),ng=cards[1].querySelectorAll('.bagg .bi').length;
 const T=[['전체','bg_backpack.png',items.length+ng],['재화','it2_gold.png',items.filter(x=>x.c==1).length],['소모품','it2_hp.png',items.filter(x=>x.c==2).length],['장비','it2_armor.png',ng]];
 const t=G.bgT=G.bgT||0;const bar=document.createElement('div');bar.className='entabs bgtab';bar.innerHTML=T.map((x,i)=>`<span class="${i==t?'on':''}" data-bt=${i}><img src="assets/${x[1]}">${x[0]}<small>${x[2]}</small></span>`).join('');
 const h=sb.querySelector(':scope>.bghero');h?h.after(bar):sb.prepend(bar);
 cards[0].classList.toggle('shhide',t==3);cards[1].classList.toggle('shhide',t==1||t==2);items.forEach(x=>x.b.classList.toggle('shhide',(t==1&&x.c!=1)||(t==2&&x.c!=2)));
 const tt=cards[0].querySelector('.ttl');if(tt&&(t==1||t==2)){const n=[...tt.childNodes].find(z=>z.nodeType==3&&z.textContent.trim());if(n)n.textContent=t==1?'재화':'소모품'}
 bar.querySelectorAll('[data-bt]').forEach(e=>e.onclick=()=>{if(+e.dataset.bt===G.bgT)return;G.bgT=+e.dataset.bt;renderScreen();const b2=document.querySelector('#screen .sbody');if(b2)b2.scrollTop=0})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.querySelector('#screen');if(!sc)return r;if(G.screen=='shop')deals(sc);if(G.screen=='bag')bag(sc)}catch(e){console.warn(e)}return r}})();
;(()=>{/* r340: 가방 detail card on 재화/소모품/장비 tabs (selected item; existing item text / gear fields only; defaults to first visible item) */
const OWN=s=>({it2_gold:s.gold,it2_gem:s.gems,it2_exp:s.orbs,it2_ticket:s.tickets||0,it2_hp:s.pot||0,it2_mp:s.mpot||0,it2_stone:s.stone||0,it3_dungeonkey:s.dkey||0,it3_guildcoin:s.gcoin||0,it3_arenatoken:s.atoken||0,it3_mileagestar:s.mile||0});
const chips=L=>L.map(x=>`<span>${x[1]}</span>`).join('');
const det=(sb,t0)=>{sb.querySelectorAll('.bgdt').forEach(x=>x.remove());const s=C.S(),cards=[...sb.querySelectorAll(':scope>.card')];let h='';const t=t0==0&&G.bgAK=='g'?3:t0;/* r341: 전체 tab -> item or gear, whichever was tapped last */
 cards.forEach(c=>c.querySelectorAll('.bgsel').forEach(b=>b.classList.remove('bgsel')));
 if(t==3){const gs=Object.values(s.gear||{}).filter(Boolean);if(!gs.length)return;const i=Math.min(G.bgSelG||0,gs.length-1),x=gs[i],R=D.RAR[x.r]||{},SL=D.SLOTS.find(q=>q.k==x.slot)||{};
  [...cards[1].querySelectorAll('.bagg .bi')].forEach((b,j)=>b.classList.toggle('bgsel',j==i));
  h=`<div class=bgdh><div class=bgdi style="--rc:${R.c}"><img src="${A}${SL.img}"></div><div class=f><b style="color:${R.c}">${x.name}</b><small><em style="background:${R.c}">${R.n}</em>${SL.n||''} · Lv.${x.lv}${x.en?` · 강화 +${x.en}`:''}</small></div></div>
  <div class=bgst><span><small>${x.st=='atk'?'공격력':'체력'}</small><b>+${fmt(x.v)}</b></span><span><small>전투력</small><b>${fmt(C.itemPow(x))}</b></span></div>
  <span class=bggo data-go=enhance>장비 강화 ▶</span>`}
 else{const vis=[...cards[0].querySelectorAll('.bagg .bi:not(.shhide)')];if(!vis.length)return;const key=b=>((b.querySelector('img')||{}).getAttribute?.('src')||'').match(/(it\d_[a-z]+)\.png/)?.[1];
  let sel=vis.find(b=>key(b)==G.bgSel)||vis[0];const k=key(sel),d=(G.itemData||{})[k];vis.forEach(b=>b.classList.toggle('bgsel',b==sel));
  const nm=d?d[0]:(sel.querySelector('small')||{}).textContent||'',own=OWN(s)[k];
  h=`<div class=bgdh><div class=bgdi><img src="${A}${k}.png"></div><div class=f><b>${nm}</b><small>보유 <i>${fmt(own==null?0:own)}</i></small></div></div>${d?`<p class=bgds>${d[1]}</p><div class=bgsec><small>사용처</small><div>${chips(d[2])}</div></div><div class=bgsec><small>획득처</small><div>${chips(d[3])}</div></div><span class=bggo data-ii=${k}>바로 가기 ▶</span>`:''}`}
 const c=document.createElement('div');c.className='card bgdt';c.innerHTML=h;(t==3?cards[1]:cards[0]).after(c);
 const g=c.querySelector('.bggo');if(g)g.onclick=()=>{if(g.dataset.ii)G.itemInfo(g.dataset.ii);else{closeScreen();menuGo(g.dataset.go)}}};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen!='bag')return r;const sb=document.querySelector('#screen .sbody'),t=G.bgT||0;if(!sb||!sb.querySelector('.bgtab')||sb.querySelector('.bgdt'))return r;
 const cards=[...sb.querySelectorAll(':scope>.card')];
 if(t==3||t==0)cards[1].querySelectorAll('.bagg .bi').forEach((b,j)=>b.onclick=()=>{G.bgSelG=j;G.bgAK='g';det(sb,t)});
 if(t!=3)cards[0].querySelectorAll('.bagg .bi').forEach(b=>{const k=((b.querySelector('img')||{}).getAttribute?.('src')||'').match(/(it\d_[a-z]+)\.png/)?.[1];b.onclick=()=>{G.bgSel=k;G.bgAK='i';det(sb,t)}});
 det(sb,t)}catch(e){console.warn(e)}return r}})();
;(()=>{/* r340: 동료 소환 tabs (소환 / 선택 소환 / 확률 정보) + cards; display only, existing data and actions */
const sum=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.sutab'))return;const ch=[...sb.children],rc=ch.find(c=>c.classList.contains('card'));if(!rc||!sb.querySelector('.sumbtns'))return;
 const s=C.S(),mile=s.mile||0,t=G.suT=G.suT||0;
 const T=[['소환','it2_ticket.png',''],['선택 소환','it3_mileagestar.png',mile+'/100'],['확률 정보','it2_gem.png','']];
 const bar=document.createElement('div');bar.className='entabs sutab';bar.innerHTML=T.map((x,i)=>`<span class="${i==t?'on':''}" data-st=${i}><img src="assets/${x[1]}">${x[0]}${x[2]?`<small>${x[2]}</small>`:''}${i==1&&mile>=100?'<i class=dot></i>':''}</span>`).join('');sb.prepend(bar);
 ch.forEach(c=>c.classList.toggle('shhide',t==2||(t==1&&c!==rc)));
 const k=document.createElement('div');k.className='card sucd';
 if(t==0){k.innerHTML=`<div class=ttl>보유 재화</div><div class=sucur><div><img src="assets/it2_ticket.png"><b>${s.tickets||0}</b><small>동료 소환권</small></div><div><img src="assets/it2_gem.png"><b>${fmt(s.gems)}</b><small>다이아</small></div><div><img src="assets/it3_mileagestar.png"><b>${mile}/100</b><small>마일리지</small></div></div>`;
  const sm=ch.filter(c=>c.tagName=='SMALL').pop();if(sm)sm.classList.add('shhide');sb.appendChild(k)}
 if(t==1){k.innerHTML=`<div class=ttl>선택 소환 <small>${mile>=100?'원하는 동료 선택':'마일리지 '+mile+'/100'}</small></div><div class=sugrid>${D.COMPS.map(c=>`<div class="sug ${mile>=100?'':'lock'}" data-sk=${c.k} style="--rc:${D.RAR[c.g].c}"><img src="assets/${c.img}"><b>${c.n}</b><small>${D.RAR[c.g].n}</small></div>`).join('')}</div><small class=sunote>소환 1회당 마일리지 +1 · 100 달성 시 원하는 동료 선택 소환</small>`;
  rc.querySelectorAll('.chips').forEach(x=>x.classList.add('shhide'));rc.after(k);
  k.querySelectorAll('[data-sk]').forEach(e=>e.onclick=()=>{const o=rc.querySelector(`[data-mile="${e.dataset.sk}"]`);if(o)o.click();else toast('마일리지 100 필요')})}
 if(t==2){const r=C.rates();k.innerHTML=`<div class=ttl>소환 확률 정보</div>${[4,3,2].map(g=>{const L=r.filter(x=>x.g==g),tt=L.reduce((a,x)=>a+x.p,0);return `<div class=sug2><div class=surh style="color:${D.RAR[g].c}">${D.RAR[g].n} <span>${tt.toFixed(1)}%</span></div><div class=sugrid>${L.map(x=>{const c=D.COMPS.find(q=>q.k==x.k);return `<div class="sug ${x.up?'up':''}" style="--rc:${D.RAR[g].c}"><img src="assets/${c.img}"><b>${x.n}</b><small>${x.p.toFixed(2)}%</small>${x.up?'<em>UP!</em>':''}</div>`}).join('')}</div></div>`}).join('')}<small class=sunote>${C.PITY}회 소환 내 전설 미획득 시 다음 소환 전설 확정 (50% 확률로 「${(D.COMPS.find(c=>c.k==C.RU)||{}).n}」)</small>`;sb.appendChild(k)}
 bar.querySelectorAll('[data-st]').forEach(e=>e.onclick=()=>{if(+e.dataset.st===G.suT)return;G.suT=+e.dataset.st;renderScreen();const b2=document.querySelector('#screen .sbody');if(b2)b2.scrollTop=0})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='summon'){const sc=document.querySelector('#screen');if(sc)sum(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r342: 기보 screen tabs (전체/공격력/체력) + 효과 summary card + compact cards; display only, existing D.RELICS / save data */
const rel=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.rltab'))return;const g=sb.querySelector('.relgrid');if(!g)return;sc.classList.add('rlx2');
 const s=C.S(),L=D.RELICS,lv=k=>(s.relic||{})[k]||0,t=G.rlT=G.rlT||0,F=[null,'atk','hp'];
 const T=[['전체','rl_tome.png',L],['공격력','st_atk.png',L.filter(r=>r.st=='atk')],['체력','st_hp.png',L.filter(r=>r.st=='hp')]];
 const bar=document.createElement('div');bar.className='entabs rltab';bar.innerHTML=T.map((x,i)=>`<span class="${i==t?'on':''}" data-rt=${i}><img src="assets/${x[1]}">${x[0]}<small>${x[2].filter(r=>lv(r.k)).length}/${x[2].length}</small></span>`).join('');
 const h=sb.querySelector('.relhero');h?h.after(bar):sb.prepend(bar);
 const sm=document.createElement('div');sm.className='card rlsum';sm.innerHTML=`<div class=ttl>기보 효과</div><div class=rlst><div><img src="assets/rl_tome.png"><small>복원</small><b>${L.filter(r=>lv(r.k)).length}/${L.length}</b></div><div><img src="assets/st_atk.png"><small>공격력</small><b>+${Math.round(C.relicB('atk')*100)}%</b></div><div><img src="assets/st_hp.png"><small>체력</small><b>+${Math.round(C.relicB('hp')*100)}%</b></div><div><img src="assets/rl_fragment.png"><small>조각</small><b>${fmt(s.frag||0)}</b></div></div>`;bar.after(sm);
 g.querySelectorAll('.rel').forEach((el,i)=>{const R=L[i];if(!R)return;el.classList.toggle('shhide',!!F[t]&&R.st!=F[t]);el.classList.add(R.st=='atk'?'ratk':'rhp');const bi=el.querySelector('.rimg img');if(bi){bi.src=A+'rl_b'+(i+1)+'.png';bi.style.filter=(lv(R.k)?'':'grayscale(.8) brightness(.55) ')+'drop-shadow(0 3px 3px #000a)'}/* r343 per-relic book art */
  el.insertAdjacentHTML('afterbegin',`<span class=rllv>Lv.${lv(R.k)}</span><span class=rlstp>${R.d}</span>`);
  const sm2=el.querySelector(':scope>small');if(sm2)sm2.insertAdjacentHTML('beforeend',`<em>다음 +${Math.round((lv(R.k)+1)*R.per*100)}%</em>`)});
 bar.querySelectorAll('[data-rt]').forEach(e=>e.onclick=()=>{if(+e.dataset.rt===G.rlT)return;G.rlT=+e.dataset.rt;renderScreen()})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='relic'){const sc=document.querySelector('#screen');if(sc)rel(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r343: 우편함 tabs (전체 / 운영 / 이벤트 = existing D.MAILS name prefixes) + per-tab empty card; display only */
const TY=m=>(m.n.match(/^\[(.+?)\]/)||[])[1]||'';
const mail=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.mltab'))return;const g=sb.querySelector('.mgg');if(!g)return;const s=C.S(),mc=s.mailc||{};
 const LV=D.MAILS.filter(m=>C.mailLeft(m.k)>0),types=[...new Set(D.MAILS.map(TY).filter(Boolean))],t=G.mlT=Math.min(G.mlT||0,types.length);
 const T=[['전체',LV],...types.map(y=>[y,LV.filter(m=>TY(m)==y)])],un=L=>L.filter(m=>!mc[m.k]).length;
 const bar=document.createElement('div');bar.className='entabs mltab';bar.innerHTML=T.map((x,i)=>`<span class="${i==t?'on':''}" data-mt=${i}><img src="assets/${i==0?'ic3_mail.png':i==1?'ic3_settings.png':'ic3_event.png'}">${x[0]}<small>${x[1].length}</small>${un(x[1])?'<i class=dot></i>':''}</span>`).join('');
 const card=g.closest('.card');(card||g).before(bar);
 const vis=T[t][1].map(m=>m.k);g.querySelectorAll('.mgc').forEach(e=>e.classList.toggle('shhide',!vis.includes(e.dataset.mk)));
 if(LV.length&&!vis.length)g.insertAdjacentHTML('beforeend',`<div class=mlemp2><b>도착한 우편이 없습니다</b><small>새 우편이 오면 알려 드릴게요</small></div>`);
 const ma=sb.querySelector('#mailAll');if(ma&&LV.length)ma.classList.toggle('off',!un(T[0][1]));if(ma&&t>0){const w=document.createTreeWalker(ma,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())if(n.textContent.includes('모두 받기')&&!n.textContent.includes('전체 모두 받기')){n.textContent=n.textContent.replace('모두 받기','전체 모두 받기');break}}/* r344 label only; still claims all */
 bar.querySelectorAll('[data-mt]').forEach(e=>e.onclick=()=>{if(+e.dataset.mt===G.mlT)return;G.mlT=+e.dataset.mt;renderScreen()})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='mail'){const sc=document.querySelector('#screen');if(sc)mail(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r344: 업적 status tabs (전체/받기 가능/진행 중/완료 from existing achList state) + summary card + stage chip; display only, no new rewards */
const ach=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.actab'))return;const rows=[...sb.querySelectorAll('.achr')];if(!rows.length)return;const L=C.achList();if(L.length!=rows.length)return;
 const F=[a=>1,a=>a.can,a=>!a.can&&!a.done,a=>a.done],t=G.acT=G.acT||0;
 const T=[['전체','ic3_trophy.png'],['받기 가능','it2_gem.png'],['진행 중','ic3_quest.png'],['완료','ic3_podium.png']];
 const bar=document.createElement('div');bar.className='entabs actab';bar.innerHTML=T.map((x,i)=>{const n=L.filter(F[i]).length;return `<span class="${i==t?'on':''}" data-at=${i}><img src="assets/${x[1]}">${x[0]}<small>${n}</small>${i==1&&n?'<i class=dot></i>':''}</span>`}).join('');
 const lvS=L.reduce((a,x)=>a+x.lv,0),lvT=D.ACH.reduce((a,x)=>a+x.g.length,0),gem=G.achGems?G.achGems():L.filter(a=>a.can).reduce((a,x)=>a+x.gem,0);
 const sm=document.createElement('div');sm.className='card acsum';sm.innerHTML=`<div class=acst2><div><img src="assets/ic3_trophy.png"><small>업적 점수</small><b>${fmt(C.achScore())}</b></div><div><img src="assets/ic3_podium.png"><small>달성 단계</small><b>${lvS}/${lvT}${G.achSteps&&G.achSteps()?`<em class=acrdy>+${G.achSteps()}</em>`:''}</b></div><div><img src="assets/it2_gem.png"><small>받을 보상</small><b>${fmt(gem)}</b></div><div><img src="assets/ic3_quest.png"><small>칭호</small><b>${C.titlesOwned().length}/${D.TITLES.length}</b></div></div>`;
 const first=sb.querySelector('#achAll')||rows[0];first.before(bar);bar.after(sm);
 rows.forEach((r,i)=>{const a=L[i],D0=D.ACH[i];r.classList.toggle('shhide',!F[t](a));const f=r.querySelector('.f>b');if(f&&D0&&!r.querySelector('.acstg'))f.insertAdjacentHTML('beforeend',`<span class=acstg>${Math.min(a.lv+(a.done?0:1),D0.g.length)}/${D0.g.length}단계</span>`)});
 if(!rows.some(r=>!r.classList.contains('shhide')))rows[rows.length-1].insertAdjacentHTML('afterend',`<div class="card acemp"><b>표시할 업적이 없습니다</b></div>`);
 bar.querySelectorAll('[data-at]').forEach(e=>e.onclick=()=>{if(+e.dataset.at===G.acT)return;G.acT=+e.dataset.at;renderScreen()})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='ach'){const sc=document.querySelector('#screen');if(sc)ach(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r345: compact 업적 header (hero strip holds 칭호 row + 모두 받기) and 칭호 status tabs + equipped summary; display only */
const ach=sc=>{const sb=sc.querySelector('.sbody'),h=sb&&sb.querySelector('.acst');if(!h||h.classList.contains('acx'))return;h.classList.add('acx');sc.classList.add('acx2');
 const tr=sb.querySelector('.ttlrow'),aa=sb.querySelector('#achAll'),c0=tr&&tr.closest('.card');const ft=document.createElement('div');ft.className='acft';if(tr)ft.appendChild(tr);if(aa)ft.appendChild(aa);h.appendChild(ft);if(c0&&c0!==h)c0.classList.add('shhide')};
const OWN=()=>C.titlesOwned().map(t=>t.k);
const ttl=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.tttab'))return;const rows=[...sb.querySelectorAll('.ttlr')];if(rows.length!=D.TITLES.length)return;
 const own=OWN(),F=[t=>1,t=>own.includes(t.k),t=>!own.includes(t.k)],i0=G.ttT=G.ttT||0,cur=C.titleCur();
 const T=[['전체','ic3_quest.png'],['보유','ic3_podium.png'],['미해금','tt_locked.png']];
 const bar=document.createElement('div');bar.className='entabs tttab';bar.innerHTML=T.map((x,i)=>`<span class="${i==i0?'on':''}" data-tt=${i}><img src="assets/${x[1]}" onerror="this.remove()">${x[0]}<small>${D.TITLES.filter(F[i]).length}</small></span>`).join('');
 const sm=document.createElement('div');sm.className='card ttsum';sm.innerHTML=`<div class=tts1><small>장착 중</small><span class="tbadge r${cur?cur.r:0}">${cur?cur.n:'칭호 없음'}</span><small class=tts2>${cur?`공격력 +${cur.atk}%${cur.gold?` · 골드 +${cur.gold}%`:''}`:'장착 시 효과 적용'}</small></div><div class=tts3><small>보유</small><b>${own.length}/${D.TITLES.length}</b></div>`;
 const c0=sb.querySelector('.card');(c0||rows[0]).after(bar);bar.after(sm);if(c0)c0.classList.add('ttin');
 rows.forEach((r,i)=>r.classList.toggle('shhide',!F[i0](D.TITLES[i])));
 if(!rows.some(r=>!r.classList.contains('shhide')))rows[rows.length-1].insertAdjacentHTML('afterend',`<div class="card acemp"><b>표시할 칭호가 없습니다</b></div>`);
 bar.querySelectorAll('[data-tt]').forEach(e=>e.onclick=()=>{if(+e.dataset.tt===G.ttT)return;G.ttT=+e.dataset.tt;renderScreen()})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.querySelector('#screen');if(sc){sc.classList.remove('acx2');if(G.screen=='ach')ach(sc);if(G.screen=='title')ttl(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r346: 칭호 hero (bg_title_hall) + 업적 next-stage reward preview (existing gem/t/st arrays) + 업적 caption restored; display only */
const ach=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.accap'))return;const h=sb.querySelector('.acst');const c0=sb.querySelector('.card.shhide'),cap=c0&&c0.querySelector('small');
 if(h&&cap){const d=document.createElement('div');d.className='accap';d.textContent=cap.textContent;h.after(d)}
 const L=C.achList();const rows=[...sb.querySelectorAll('.achr')];if(rows.length!=L.length)return;
 rows.forEach((r,i)=>{const a=D.ACH[i],x=L[i];if(!a||r.querySelector('.acnx'))return;const n=x.lv+1,f=r.querySelector('.f');if(!f)return;
  if(x.done||n>=a.g.length){f.insertAdjacentHTML('beforeend','<div class="acnx last">최종 단계</div>');return}
  f.insertAdjacentHTML('beforeend',`<div class=acnx><span>다음 단계</span><i><img src="assets/it2_gem.png">${fmt(a.gem[n])}</i>${a.t&&a.t[n]?`<i><img src="assets/it2_ticket.png">${fmt(a.t[n])}</i>`:''}${a.st&&a.st[n]?`<i><img src="assets/it2_stone.png">${fmt(a.st[n])}</i>`:''}<em>목표 ${fmt(a.g[n])}</em></div>`)})};
const ttl=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.tthero'))return;const c0=sb.querySelector('.card.ttin');const tx=c0&&c0.textContent.trim();
 const h=document.createElement('div');h.className='tthero';h.innerHTML=`<img class=tbg src="assets/bg_title_hall.jpg">${tx?`<small class=ttcap>${tx}</small>`:''}`;
 (c0||sb.firstElementChild).before(h);if(c0)c0.classList.add('shhide')};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.querySelector('#screen');if(sc){if(G.screen=='ach')ach(sc);if(G.screen=='title')ttl(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r347: 업적 claim-button ticket/stone icons (same a.t/a.st data as achClaim), caption moved into hero; 마도 패스 status tabs + summary card; display only */
const ach=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.acpx,.acx3'))return;const h=sb.querySelector('.acst.acx'),cap=sb.querySelector('.accap');
 if(h&&cap){h.classList.add('acx3');h.appendChild(cap)}
 sb.querySelectorAll('.achr [data-ach]').forEach(b=>{const a=D.ACH.find(x=>x.k==b.dataset.ach);if(!a)return;const lv=C.achLv(a.k);const t=a.t&&a.t[lv],st=a.st&&a.st[lv];if(!t&&!st)return;
  b.insertAdjacentHTML('beforeend',`<span class=acpx>${t?`<i><img src="assets/it2_ticket.png">${fmt(t)}</i>`:''}${st?`<i><img src="assets/it2_stone.png">${fmt(st)}</i>`:''}</span>`)})};
const pas=sc=>{const sb=sc.querySelector('.sbody'),d=sb&&sb.querySelector('.pld');if(!d||sb.querySelector('.patab'))return;const b=C.bp(),T=C.bpTier(),N=D.BP.tiers;
 const rows=[...d.querySelectorAll('.plr')];const cls=(r,t)=>r.querySelector('.plc.can')?1:t<T?2:3;const K=rows.map(cls);
 const i0=G.paT=G.paT||0,TB=[['전체','pass_free.png'],['받기 가능','it2_gem.png'],['수령 완료','pass_check.png'],['미달성','ic3_quest.png']];
 const bar=document.createElement('div');bar.className='entabs patab';bar.innerHTML=TB.map((x,i)=>{const n=i?K.filter(k=>k==i).length:rows.length;return `<span class="${i==i0?'on':''}" data-pa=${i}><img src="assets/${x[1]}">${x[0]}<small>${n}</small>${i==1&&n?'<i class=dot></i>':''}</span>`}).join('');
 const can=d.querySelectorAll('.plc.can').length,got=d.querySelectorAll('.plc.got').length;
 const sm=document.createElement('div');sm.className='card acsum pasum';sm.innerHTML=`<div class=acst2><div><img src="assets/pass_free.png"><small>패스 단계</small><b>${T}/${N}</b></div><div><img src="assets/it2_exp.png"><small>경험치</small><b>${b.xp%D.BP.xp}/${D.BP.xp}</b></div><div><img src="assets/it2_gem.png"><small>받기 가능</small><b>${can}</b></div><div><img src="assets/pass_premium.png"><small>프리미엄</small><b>${b.prem?'활성':'미활성'}</b></div></div><small class=pagot>받은 보상 ${got}개</small>`;
 d.before(bar);bar.after(sm);
 {const c0=sb.querySelector('.card');if(c0&&c0!==sm){const tt=c0.querySelector('.ttl small'),br=c0.querySelector('.bar'),xs=[...c0.children].find(e=>e.tagName=='SMALL');const cap=[tt&&tt.textContent,xs&&(xs.textContent.split('·')[1]||'').trim()].filter(Boolean).join(' · ');
  if(br)sm.insertBefore(br,sm.querySelector('.pagot'));sm.querySelector('.pagot').innerHTML=`<span>${cap}</span><span>받은 보상 ${got}개</span>`;[...c0.children].forEach(e=>{if(!e.matches('#bpb,.pill'))e.classList.add('shhide')});c0.classList.add('pac0');sm.after(bar);c0.before(bar);bar.after(sm);sm.after(c0)}}
 rows.forEach((r,t)=>r.classList.toggle('shhide',!!i0&&K[t]!=i0));
 if(i0&&!K.includes(i0)){d.classList.add('paemp');d.querySelector('.pll').insertAdjacentHTML('afterbegin',`<div class=paempc><img src="assets/${TB[i0][1]}"><b>표시할 보상이 없습니다</b></div>`)}
 bar.querySelectorAll('[data-pa]').forEach(e=>e.onclick=()=>{if(+e.dataset.pa===G.paT)return;G.paT=+e.dataset.pa;renderScreen()})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{const sc=document.querySelector('#screen');if(sc){if(G.screen=='ach')ach(sc);if(G.screen=='pass')pas(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r349 파티 편성 tabs: 동료 / 세력 / 프리셋 (display only, existing DOM data) */
const ptab=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.pttab'))return;const st=sb.querySelector('.pstage'),rg=sb.querySelector('.rgrid'),ps=sb.querySelector('.pset');if(!st||!rg)return;
 const cs=[...sb.querySelectorAll(':scope>.card')],byT=t=>cs.find(c=>{const x=c.querySelector('.ttl');return x&&x.firstChild&&x.firstChild.textContent.trim()==t});const fx=byT('세력 효과'),fw=byT('세력 상성');
 const S=G.C.S(),P=S.pset||[],ns=P.filter(Boolean).length,on=fx?fx.querySelectorAll('.fxr.on').length:0,nf=fx?fx.querySelectorAll('.fxr').length:0,rc=(rg.querySelector('.ttl small')||{}).textContent||'';
 const TB=[['동료','ic3_party.png',rc,[rg]],['세력','fac_human.png',`${on}/${nf}`,[fx,fw]],['프리셋','pp_save.png',`${ns}/${P.length||3}`,[ps]]];
 const i0=G.ptT=TB[G.ptT]?G.ptT:0;const bar=document.createElement('div');bar.className='entabs pttab';
 bar.innerHTML=TB.map((x,i)=>`<span class="${i==i0?'on':''}" data-pt=${i}><img src="assets/${x[1]}">${x[0]}<small>${x[2]}</small></span>`).join('');
 if(ps&&!ns&&!ps.querySelector('.psemp')){const r=ps.querySelector('.psr');if(r)r.insertAdjacentHTML('beforebegin',`<div class=psemp><img src="assets/pp_save.png"><b>저장된 프리셋이 없습니다</b></div>`)}
 st.after(bar);let at=bar;TB.forEach(x=>x[3].forEach(c=>{if(c){at.after(c);at=c}}));
 const ap=i=>{TB.forEach((x,j)=>x[3].forEach(c=>c&&c.classList.toggle('shhide',j!=i)));bar.querySelectorAll('[data-pt]').forEach(e=>e.classList.toggle('on',+e.dataset.pt==i))};ap(i0);
 bar.querySelectorAll('[data-pt]').forEach(e=>e.onclick=()=>{const i=+e.dataset.pt;if(i===G.ptT)return;G.ptT=i;ap(i);if(sb.scrollTop>bar.offsetTop)sb.scrollTop=bar.offsetTop})};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='party'){const sc=document.querySelector('#screen');if(sc)ptab(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r350 협회 가입 hero: guild hall art + receptionist (existing assets), same text */
const gh=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.gjhero'))return;const c=sb.querySelector(':scope>.card');if(!c||!c.querySelector('img[src$="ic3_guild.png"]'))return;
 const t=c.querySelector('.ttl'),m=c.querySelector('small');c.classList.add('gjhero');c.innerHTML=`<img class=gjbg src="assets/bg_guild_hall2.jpg"><img class=gjnpc src="assets/npc_guildgirl.png"><div class=gjtx><img src="assets/ic3_guild.png"><b>${t?t.textContent:''}</b><small>${m?m.textContent:''}</small></div>`};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='guild'&&!G.C.S().gj){const sc=document.querySelector('#screen');if(sc)gh(sc)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r351 월드 보스: 도전 button under the stage, compact stage, next-tier progress on 오늘의 기록 (existing C.WB / wbRef / wbState only) */
const wb=sc=>{const sb=sc.querySelector('.sbody');if(!sb||sb.querySelector('.wbnx'))return;const st=sb.querySelector('.wbst'),go=sb.querySelector('#wbGo');if(!st)return;
 sc.classList.add('wb3');if(go){st.after(go);go.classList.add('wbgo3')}
 const bs=st.querySelector('.wbbest em');const w=C.wbState(),d=w.today||0;if(bs&&!d)bs.style.display='none';
 const tc=[...sb.querySelectorAll('.card')].find(c=>c.querySelector('.wbt'));if(!tc)return;const ref=C.wbRef(),T=C.WB.tiers,cells=[...tc.querySelectorAll('.wbt>div')];
 let ni=T.findIndex(t=>d<ref*t[1]);cells.forEach((c,i)=>{if(i===ni)c.classList.add('nx')});
 const prev=ni<0?ref*T[T.length-1][1]:ni?ref*T[ni-1][1]:0,goal=ni<0?prev:ref*T[ni][1],pc=ni<0?100:Math.max(0,Math.min(100,(d-prev)/(goal-prev)*100));
 const cur=ni<0?T[T.length-1][0]:ni?T[ni-1][0]:'-';
 tc.querySelector('.wbt').insertAdjacentHTML('beforebegin',`<div class=wbnx><span class=wbg>${cur}</span><div class=f><small>${ni<0?'최고 등급 달성':`다음 등급 <b>${T[ni][0]}</b>까지 ${fmt(Math.max(0,goal-d))}`}</small><i><s style="width:${pc.toFixed(1)}%"></s></i></div></div>`)};
const rs0=renderScreen;renderScreen=function(){const r=rs0.apply(this,arguments);try{if(G.screen=='wboss'){const sc=document.querySelector('#screen');if(sc)wb(sc)}}catch(e){console.warn(e)}return r}})();

/* r353 v303: game-wide emoji → existing borderless icon swap (visual only). Text-node swap on body (skips canvas/inputs/chat log),
   deferred to one rAF per mutation burst; glyphs with no matching art yet (⚠ ❓ 🎉) are stripped until icons are generated. */
;(function(){const IM={'💗':'bd_heart_full','💌':'fr_heart_send','🎁':'fr_gift','✔':'pass_check','☑':'pass_check','☐':'dc_off','⚔':'ic3_arena','🔒':'sk_lock','⚡':'ui_bolt','⏱':'ui_timer','💎':'it2_gem','🗺':'ic_map','🎣':'fs_bobber','🧺':'bd_harvest','🥚':'pt_egg','✏':'ic_quill','📢':'ic_horn','🌙':'ic_moon','📋':'ic3_quest','👑':'ic4/crown','🏆':'ic3_trophy','💥':'fx_crit','⏩':'ic_speed','✨':'fx_success','🧳':'npc_merchant','🪙':'it2_gold','💾':'pp_save','📜':'rl_fragment','💪':'st_atk','🌼':'bd_flower','🍪':'bd_cookie','🔥':'st/burn','❄':'st/frz','💫':'st/stun','☠':'st/psn','🍳':'fs_board','💨':'fs_bobber','⚠':'ui_warn','❓':'ui_help','🎉':'ui_confetti'},STRIP='';
const keys=Object.keys(IM).concat([...STRIP]);const src='('+keys.join('|')+')\\uFE0F?',RT=new RegExp(src,'u'),RS=new RegExp(src+'\\s?','gu');
const st=document.createElement('style');st.textContent=`img.emi{height:1.25em;width:auto;vertical-align:-.28em;margin:0 .1em;filter:drop-shadow(0 1px 1px #0008);pointer-events:none;display:inline-block}
.frh .frp img.emi{height:44px;vertical-align:middle}img.emi.e_dc_off{height:1.05em;vertical-align:-.15em;filter:none}
#biGo{flex-direction:row!important;align-items:center;gap:2px}`;document.head.appendChild(st);
const skip=n=>{const p=n.parentNode;return !p||p.nodeType!==1||p.closest('script,style,textarea,input,canvas,.chl,#chatT')};
const conv=n=>{const v=n.nodeValue;if(!v||!RT.test(v)||skip(n))return;const f=document.createDocumentFragment();let last=0;v.replace(RS,(m,g,o)=>{if(o>last)f.appendChild(document.createTextNode(v.slice(last,o)));last=o+m.length;const im=IM[g];if(im){const i=document.createElement('img');i.className='emi e_'+im.replace('/','_');i.src='assets/'+im+'.png';i.alt='';f.appendChild(i);if(m.length>g.length+(m.includes('\uFE0F')?1:0))f.appendChild(document.createTextNode(' '))}return m});if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)};
const walk=r=>{if(r.nodeType===3)return conv(r);if(r.nodeType!==1||!RT.test(r.textContent))return;const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT),L=[];while(w.nextNode())if(RT.test(w.currentNode.nodeValue))L.push(w.currentNode);L.forEach(conv)};
const Q=new Set();let qd=0;const run=()=>{qd=0;Q.forEach(n=>{if(n.isConnected)try{walk(n)}catch(_){}});Q.clear()};
new MutationObserver(ms=>{for(let i=0;i<ms.length;i++){const m=ms[i];if(m.type==='characterData'){if(RT.test(m.target.nodeValue))Q.add(m.target)}else for(let j=0;j<m.addedNodes.length;j++){const a=m.addedNodes[j];if(a.nodeType===3?RT.test(a.nodeValue):a.nodeType===1&&RT.test(a.textContent))Q.add(a)}}if(Q.size&&!qd){qd=1;requestAnimationFrame(run)}}).observe(document.body,{childList:true,subtree:true,characterData:true});
walk(document.body);G.emiSwap=()=>walk(document.body)})();

/* r354 v304: 친구 header point chip (replaces oversized heart; same t.pt text) + emi sizing inside small badges */
;(function(){const st=document.createElement('style');st.textContent=`.ftp b.frchip{display:inline-flex;align-items:center;gap:5px;margin-top:3px;padding:2px 12px 2px 4px;border-radius:14px;background:linear-gradient(#3a1a2ae8,#1e0c16e8);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #ff9ac088,0 2px 4px #0008;font-size:17px;color:#fff;line-height:22px}
.ftp b.frchip img{height:22px!important;width:auto;filter:drop-shadow(0 1px 1px #0009)}.ftp b.frchip em{font-style:normal;font-size:10px;font-weight:800;color:#ffb8d0;margin-right:2px}
.frtv .frx .fok img.emi,i.fok img.emi,.twok img.emi,.ck img.emi{height:.95em!important;width:auto!important;margin:0!important;vertical-align:-.1em}`;document.head.appendChild(st);
const fix=()=>{if(G.screen!='friend')return;const b=document.querySelector('#screen .frst .ftp b');if(!b||b.classList.contains('frchip'))return;const v=(b.textContent||'').replace(/[\u{1F497}\uFE0F\s]/gu,'');b.classList.add('frchip');b.innerHTML=`<img src="assets/bd_heart_full.png" alt=""><em>우정 포인트</em>${v}`};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{fix()}catch(e){console.warn(e)}return r};
const sc=document.getElementById('screen');if(sc)new MutationObserver(()=>{try{fix()}catch(_){}}).observe(sc,{childList:true})})();
;(()=>{// r355 v305 전투력 부족 · 떠돌이 상인 화룡전 스타일 (표시 전용)
const A='assets/',st=document.createElement('style');st.textContent=`
.pwwarn .mbox{position:relative;width:332px;padding:34px 14px 14px;background:linear-gradient(#3a1e22f2,#221216f2);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #b0403a,inset 0 0 0 4px #2a0e10,inset 0 0 40px #ff3a2a33,0 10px 30px #000c;overflow:visible;margin-top:24px}
.pwwarn .pwhd{position:absolute;left:50%;top:-30px;transform:translateX(-50%);width:258px;height:64px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;gap:6px;padding-top:6px;filter:drop-shadow(0 3px 3px #000a)}
.pwwarn .pwhd img{width:26px;height:26px;object-fit:contain}.pwwarn .pwhd b{font:900 19px Maplestory,sans-serif;color:#ffd0c0;text-shadow:0 2px 0 #3a0a08,0 0 8px #ff4a3a88}
.pwwarn .pwcmp{display:flex;align-items:center;gap:6px;margin:6px 0 10px}
.pwwarn .pwc{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:10px;background:#0006;border:1px solid #ffffff1a}
.pwwarn .pwc small{font-size:11px;color:#d8c8c0;display:flex;align-items:center;gap:3px}.pwwarn .pwc small img{width:16px;height:16px}
.pwwarn .pwc b{font:900 20px Maplestory,sans-serif;color:#fff;text-shadow:0 2px 0 #000}.pwwarn .pwc.me b{color:#ff6a5a}
.pwwarn .pwvs{font:900 14px Maplestory,sans-serif;color:#ffb04a;text-shadow:0 2px 0 #000}
.pwwarn .pwbar{position:relative;height:14px;border-radius:7px;background:#120708;border:2px solid #0b0d0f;box-shadow:inset 0 0 0 1px #ff6a5a55;overflow:hidden}
.pwwarn .pwbar i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(#ff9a7a,#e0402a 60%,#a02018);border-radius:5px}
.pwwarn .pwgap{display:flex;justify-content:space-between;font-size:11px;color:#d8c8c0;margin:4px 2px 10px}.pwwarn .pwgap b{color:#ff8a7a;font-weight:900}
.pwwarn .pwnote{display:block;font-size:12px;line-height:1.6;color:#e8dcd4;background:#0005;border-radius:8px;padding:6px 8px}
.pwwarn .pwbtn{margin-top:12px}
.mshop .mbox{position:relative;width:344px;padding:0 10px 12px;background:linear-gradient(#000a,#000c),url(${A}bg_shop_counter.jpg) center/cover;border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #c98a3a,inset 0 0 0 4px #3a2410,0 10px 30px #000c;margin-top:56px;overflow:visible}
.mshop .mshd{position:relative;height:96px;margin:0 -10px 6px}
.mshop .mshd .mnpc{position:absolute;left:2px;bottom:-4px;width:108px;height:118px;object-fit:contain;object-position:bottom;filter:drop-shadow(0 3px 3px #000a)}
.mshop .mshd .mplt{position:absolute;left:112px;top:-16px;width:180px;height:44px;background:url(${A}gl_plate.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;font:900 17px Maplestory,sans-serif;color:#3a2008;text-shadow:0 1px 0 #ffe8b0;filter:drop-shadow(0 2px 2px #000a)}
.mshop .mshd .msub{position:absolute;left:116px;right:12px;top:36px;margin:0;padding:7px 10px;background:#fff8e8;color:#4a3018;font:700 12px/1.45 Maplestory,sans-serif;text-align:left;border-radius:12px;border:2px solid #0b0d0f;box-shadow:0 2px 0 #0006}
.mshop .mshd .msub:before{content:'';position:absolute;left:-9px;top:14px;border:6px solid transparent;border-right:8px solid #0b0d0f}.mshop .mshd .msub:after{content:'';position:absolute;left:-5px;top:15px;border:5px solid transparent;border-right:6px solid #fff8e8}
.mshop .mrow{gap:7px}
.mshop .moff{background:linear-gradient(#4a3420,#2a1a10);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 3px #5a3a14,0 3px 0 #0008;padding:16px 4px 6px;gap:5px;border-radius:12px}
.mshop .moff>img{width:52px;height:52px;object-fit:contain;padding:4px;border-radius:50%;background:radial-gradient(#fff4c055,#ffd24a22 55%,transparent 70%);filter:drop-shadow(0 2px 2px #0008)}
.mshop .moff b{font:900 12px Maplestory,sans-serif;color:#fff;text-shadow:0 1px 2px #000}
.mshop .moff span{align-self:stretch;justify-content:center;margin:2px 2px 0;padding:4px 0;border-radius:9px;border:2px solid #0b0d0f;background:linear-gradient(#ffe27a,#f2a81c 55%,#c77a0a);box-shadow:inset 0 2px 0 #fff4c0,0 2px 0 #7a4a05;color:#fff;font:900 13px Maplestory,sans-serif;text-shadow:0 1px 2px #6a3a00}
.mshop .moff span img{width:18px;height:18px}
.mshop .moff s{top:-10px;background:linear-gradient(#ff7a5a,#d0301e);border:2px solid #0b0d0f;font:900 11px Maplestory,sans-serif;padding:1px 8px}
.mshop .mtmr{display:flex;align-items:center;gap:6px;margin:12px 4px 10px}.mshop .mtmr img{width:20px;height:20px}
.mshop .mtmr .mtb{flex:1;height:10px;border-radius:5px;background:#120a04;border:2px solid #0b0d0f;overflow:hidden}.mshop .mtmr .mtb i{display:block;height:100%;background:linear-gradient(#fff0a0,#ffc23a 60%,#d08a10);border-radius:3px}
.mshop .mtmr .mleft{margin:0;font:900 12px Maplestory,sans-serif;color:#ffe8b0;white-space:nowrap}
.mshop .mone{display:block;text-align:center;font-size:11px;color:#c9b89a;margin:-4px 0 8px}`;document.head.appendChild(st);
const C=G.C;
const orb=G.rbRun;G.rbRun=function(o,done){const pw=C.POW(),r=orb.apply(this,arguments);try{if(o&&pw<o.req){const m=[...document.querySelectorAll('.modal.pwwarn')].pop();if(m&&!m.dataset.r355){m.dataset.r355=1;const bx=m.querySelector('.mbox'),t=bx.querySelector('.ttl'),row=bx.querySelector('.pwrow'),sm=bx.querySelector('small');
 const hd=document.createElement('div');hd.className='pwhd';hd.innerHTML=`<img src="${A}ui_warn.png"><b>전투력 부족</b>`;t.replaceWith(hd);
 const pc=Math.max(3,Math.min(100,pw/o.req*100));const cmp=document.createElement('div');cmp.innerHTML=`<div class=pwcmp><div class=pwc><small><img src="${A}st_atk.png">권장 전투력</small><b>${fmt(o.req)}</b></div><span class=pwvs>VS</span><div class="pwc me"><small><img src="${A}st_atk.png">내 전투력</small><b>${fmt(pw)}</b></div></div><div class=pwbar><i style="width:${pc.toFixed(1)}%"></i></div><div class=pwgap><span>달성률 <b>${Math.floor(pw/o.req*100)}%</b></span><span>부족 <b>${fmt(o.req-pw)}</b></span></div>`;
 row.replaceWith(...cmp.children);if(sm)sm.className='pwnote'}}}catch(_){}return r};
let tmI=0;const deco=m=>{if(m.dataset.r355)return;m.dataset.r355=1;const bx=m.querySelector('.mbox');if(!bx)return;const t=bx.querySelector('.ttl'),sub=bx.querySelector('.msub'),lf=bx.querySelector('.mleft');
 const hd=document.createElement('div');hd.className='mshd';hd.innerHTML=`<img class=mnpc src="${A}${G._merchImg||'merchant.png'}"><div class=mplt>떠돌이 상인</div>`;if(sub){sub.innerHTML=sub.textContent.replace('! ','!<br>');hd.appendChild(sub)}t.replaceWith(hd);
 if(lf){const w=document.createElement('div');w.className='mtmr';w.innerHTML=`<img src="${A}ui_timer.png"><div class=mtb><i></i></div>`;lf.before(w);w.appendChild(lf);const one=document.createElement('small');one.className='mone';one.textContent='방문당 한 가지만 구매할 수 있습니다';w.after(one);
  const bar=w.querySelector('i'),upd=()=>{if(!m.isConnected){clearInterval(tmI);tmI=0;return}const q=document.querySelector('#battle .merch .mtm'),wd=q&&q.style.width?parseFloat(q.style.width):0,off=/마쳤/.test(lf.textContent);bar.style.width=(off?0:wd)+'%';if(!off&&q)lf.textContent='남은 시간 '+Math.max(0,Math.ceil(wd*.6))+'초'};upd();if(tmI)clearInterval(tmI);tmI=setInterval(upd,250)}};
const app=document.getElementById('app');if(app)new MutationObserver(ms=>{for(const x of ms)for(const n of x.addedNodes)if(n.nodeType==1&&n.classList.contains('mshop'))deco(n)}).observe(app,{childList:true});
})();
;(()=>{// r356 v306 던전·탑 결과 팝업 화룡전 스타일 (도전 실패: 리본+전투력 카드 / 도전 성공: 같은 프레임) · 표시 전용
const A='assets/',st=document.createElement('style');st.textContent=`
.modal.rsfail .card.mbox{position:relative;width:332px!important;padding:40px 14px 14px!important;background:linear-gradient(#3a1e22f2,#221216f2)!important;border:2px solid #0b0d0f!important;border-radius:14px!important;box-shadow:inset 0 0 0 2px #b0403a,inset 0 0 0 4px #2a0e10,inset 0 0 40px #ff3a2a33,0 10px 30px #000c!important;overflow:visible;margin-top:24px}
.modal.rsfail .rsst{display:block;font:900 13px Maplestory,sans-serif;color:#ffc8b8;margin:0 0 4px;text-shadow:0 1px 0 #000}
.modal.rsfail .card>.btn{display:flex;justify-content:center;margin-top:12px!important}
.rwpop.rwclr .rwbox{overflow:visible}
.rwpop.rwclr .rwcr{position:absolute;left:50%;top:-86px;width:120px;height:102px;margin-left:-60px;background:url(${A}clear_banner.png) center/contain no-repeat;filter:drop-shadow(0 3px 4px #000a);z-index:2}
.rwpop.rwclr .pwhd{position:absolute;left:50%;top:-22px;transform:translateX(-50%);width:258px;height:60px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;padding-top:6px;filter:drop-shadow(0 3px 3px #000a);z-index:3}
.rwpop.rwclr .pwhd b{font:900 20px Maplestory,sans-serif;color:#ffe08a;text-shadow:0 2px 0 #3a2008,0 0 8px #ffb02e88}
.rwpop.rwclr .rwt{font-size:18px;margin-top:2px}
.rwpop.rwclr .pwcmp{display:flex;align-items:center;gap:4px;margin:8px 8px 2px}
.rwpop.rwclr .pwc{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px;border-radius:10px;background:#0006;border:1px solid #ffffff1a}
.rwpop.rwclr .pwc small{white-space:nowrap;font:700 10px 'Noto Sans KR',sans-serif;color:#e0d4b8;display:flex;align-items:center;gap:3px}.rwpop.rwclr .pwc small img{width:16px;height:16px}
.rwpop.rwclr .pwc b{font:900 17px Maplestory,sans-serif;color:#fff;text-shadow:0 2px 0 #000}.rwpop.rwclr .pwc.me b{color:#7aff8a}
.rwpop.rwclr .pwvs{font:900 13px Maplestory,sans-serif;color:#ffb04a;text-shadow:0 2px 0 #000}`;document.head.appendChild(st);
const C=G.C;let last=null;
const orb=G.rbRun;G.rbRun=function(o,done){if(o&&(o.kind=='dun'||o.kind=='tw')&&typeof done=='function'){const rec={req:o.req,title:o.title||'',won:0,at:0};const d0=done;done=function(won){rec.won=won?1:0;rec.at=Date.now();last=rec;try{return d0.apply(this,arguments)}finally{last=null}};arguments[1]=done}return orb.apply(this,arguments)};
const cards=(req,pw)=>`<div class=pwcmp><div class=pwc><small><img src="${A}st_atk.png">권장 전투력</small><b>${fmt(req)}</b></div><span class=pwvs>VS</span><div class="pwc me"><small><img src="${A}st_atk.png">내 전투력</small><b>${fmt(pw)}</b></div></div>`;
const om=modal;modal=function(html,cb){const m=om.apply(this,arguments);try{const r=last;if(r&&m&&!m.dataset.r356&&/도전 실패<\/div>/.test(html)){m.dataset.r356=1;const cd=m.querySelector('.card'),t=cd.querySelector('.ttl'),sm=cd.querySelector('small');const pw=C.POW(),req=r.req;
 m.classList.add('pwwarn','rsfail');cd.classList.add('mbox');
 const hd=document.createElement('div');hd.className='pwhd';hd.innerHTML=`<img src="${A}ui_warn.png"><b>${t.textContent.trim()||'도전 실패'}</b>`;
 const ti=document.createElement('small');ti.className='rsst';ti.textContent=r.title;
 const pc=Math.max(3,Math.min(100,pw/req*100)),w=document.createElement('div');w.innerHTML=cards(req,pw)+(pw<req?`<div class=pwbar><i style="width:${pc.toFixed(1)}%"></i></div><div class=pwgap><span>달성률 <b>${Math.floor(pw/req*100)}%</b></span><span>부족 <b>${fmt(req-pw)}</b></span></div>`:'');
 t.replaceWith(hd,ti,...w.children);if(sm){sm.className='pwnote';const br=sm.querySelector('br');if(br&&/^권장 전투력/.test(sm.firstChild.textContent||'')){sm.firstChild.remove();br.remove()}}}}catch(_){}return m};
const orp=rewardPop;rewardPop=function(items,sub){const r=last,x=orp.apply(this,arguments);try{if(r&&r.won){const d=[...document.querySelectorAll('.rwpop')].pop(),bx=d&&d.querySelector('.rwbox');if(bx&&!d.dataset.r356){d.dataset.r356=1;d.classList.add('rwclr');
 const cr=document.createElement('div');cr.className='rwcr';const hd=document.createElement('div');hd.className='pwhd';hd.innerHTML='<b>도전 성공!</b>';bx.prepend(cr,hd);
 const w=document.createElement('div');w.innerHTML=cards(r.req,C.POW());const s=bx.querySelector('.rws')||bx.querySelector('.rwt');s.after(...w.children)}}}catch(_){}return x};
})();
;(()=>{// r357 v307 전직 시련 · 보스 러시 결과 화룡전 스타일 (리본 + 카드) · 표시 전용
const A='assets/',st=document.createElement('style');st.textContent=`
.brend.rs357{gap:0}
.brend.rs357 .rsbx{position:relative;width:332px;padding:42px 14px 16px;border-radius:14px;background:linear-gradient(#3a2a14f4,#201608f4);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 4px #3a2410,inset 0 0 40px #ffc24a33,0 10px 30px #000c;text-align:center;margin-top:30px}
.rs357 .pwhd{position:absolute;left:50%;top:-30px;transform:translateX(-50%);width:258px;height:64px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;gap:6px;padding-top:6px;filter:drop-shadow(0 3px 3px #000a)}
.rs357 .pwhd img{width:26px;height:26px;object-fit:contain}.rs357 .pwhd b{font:900 19px Maplestory,sans-serif;color:#ffe08a;text-shadow:0 2px 0 #3a2008,0 0 8px #ffb02e88;font-style:normal}
.rs357 .rsst{display:block;font:900 13px Maplestory,sans-serif;color:#ffe0b0;margin:0 0 8px;text-shadow:0 1px 0 #000}
.rs357 .rscd{display:flex;gap:6px;margin:8px 0}
.rs357 .pwc{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:10px;background:#0006;border:1px solid #ffffff1a}
.rs357 .pwc small{font:700 11px 'Noto Sans KR',sans-serif;color:#e0d4b8;display:flex;align-items:center;gap:3px;white-space:nowrap}.rs357 .pwc small img{width:18px;height:18px;object-fit:contain}
.rs357 .pwc b{font:900 19px Maplestory,sans-serif;color:#fff;text-shadow:0 2px 0 #000}
.rs357 .pwc.big{padding:10px 4px;background:radial-gradient(circle at 50% 40%,#6a4a1acc,#2a1a08cc);border:2px solid #e8b860}.rs357 .pwc.big b{font-size:34px;color:#ffe08a}.rs357 .pwc.big b small{display:inline;font-size:14px;color:#ffe08a}
.brend.rs357 .brnew{display:inline-block;margin:2px 0 4px;padding:2px 12px;border-radius:10px;background:linear-gradient(#ff7a5a,#d0301e);border:2px solid #0b0d0f;font:900 13px Maplestory,sans-serif;color:#fff;animation:none}
.brend.rs357 #brOk{display:flex;justify-content:center;margin-top:10px}
.jobfx .jt.rs357{width:332px;margin-top:36px;padding:40px 14px 14px;border-radius:14px;background:linear-gradient(#3a2a14ee,#201608ee);border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 4px #3a2410,0 10px 30px #000c}
.jobfx .jt.rs357>b{font:900 28px Maplestory,sans-serif}
.modal.rsfail.rs357 .card.mbox{padding-top:40px!important}`;document.head.appendChild(st);
const C=G.C,card=(ic,l,v,c)=>`<div class="pwc ${c||''}"><small>${ic?`<img src="${A}${ic}">`:''}${l}</small><b>${v}</b></div>`;
/* 보스 러시 종료 (.brrun > .brend) */
const deBr=e=>{if(e.dataset.r357)return;e.dataset.r357=1;const vt=e.querySelector('.vt'),sc=e.querySelector('.brsc'),sub=e.querySelector('.brsub'),nw=e.querySelector('.brnew'),ok=e.querySelector('#brOk');if(!vt||!sc||!sub||!ok)return;
 const m=/처치\s*([\d.]+)\s*·\s*(?:주간|순위)\s*([\d,]+)위/.exec(sub.textContent);const bx=document.createElement('div');bx.className='rsbx';
 bx.innerHTML=`<div class=pwhd><img src="${A}ui_timer.png"><b>${vt.textContent}</b></div><small class=rsst>보스 러시 결과</small><div class=rscd>${card('ic_trophy.png','점수',sc.innerHTML,'big')}</div>`+(m?`<div class=rscd>${card('wb_skull.png','처치',m[1])}${card('tt_crown.png','주간 순위',m[2]+'위')}</div>`:'');
 if(!m)bx.appendChild(sub);if(nw)bx.querySelector('.rsst').after(nw);bx.appendChild(ok);e.classList.add('rs357');vt.remove();sc.remove();if(m)sub.remove();e.appendChild(bx)};
/* 전직 완료 (.jobfx .jt) */
const deJob=f=>{if(f.dataset.r357)return;f.dataset.r357=1;const jt=f.querySelector('.jt');if(!jt)return;const s=jt.querySelector('small'),sp=jt.querySelector('span');const J=(G.JOB||[])[G.jobT?G.jobT():0]||{};
 jt.classList.add('rs357');if(s){const h=document.createElement('div');h.className='pwhd';h.innerHTML=`<b>${s.textContent}</b>`;s.replaceWith(h)}
 if(sp){const ps=sp.textContent.split('·').map(x=>x.trim());const w=document.createElement('div');w.className='rscd';w.innerHTML=card('st_atk.png','공격력',ps[0].replace(/^공격력\s*/,''))+(ps[1]?card(J.ic||'',ps[1].replace(/\s*획득$/,''),'획득'):'');sp.replaceWith(w)}};
new MutationObserver(ms=>{for(const r of ms)for(const n of r.addedNodes){if(n.nodeType!==1)continue;if(n.classList.contains('jobfx'))deJob(n);else if(n.classList.contains('brrun')){const e=n.querySelector('.brend');if(e)deBr(e)}else if(n.classList.contains('brend'))deBr(n)}}).observe(document.getElementById('app'),{childList:true});
/* 전직 시련 실패: 기존 토스트 문구를 r356 실패 카드로 표시 */
let sup=0;const ots=toast;toast=function(t){if(sup&&/^시련 실패/.test(String(t)))return;return ots.apply(this,arguments)};
const orb=G.rbRun;G.rbRun=function(o,done){if(o&&/전직 시련/.test(o.title||'')&&typeof done=='function'){const req=o.req,title=o.title,d0=done;arguments[1]=function(won){if(won)return d0.apply(this,arguments);sup=1;let r;try{r=d0.apply(this,arguments)}finally{sup=0}try{const J=(G.JOB||[])[(G.jobT?G.jobT():0)+1]||{},pw=C.POW();
 const m=document.createElement('div');m.className='modal pwwarn rsfail rs357';m.innerHTML=`<div class="card mbox"><div class=pwhd><img src="${A}ui_warn.png"><b>${title} 실패</b></div><small class=rsst>${J.bn||''}</small><div class=pwcmp>${card('st_atk.png','권장 전투력',fmt(req))}<span class=pwvs>VS</span>${card('st_atk.png','내 전투력',fmt(pw),pw<req?'me':'')}</div><small class=pwnote>시련 실패… 더 강해져서 다시 도전하세요</small><span class="btn wide" style="margin-top:12px">확인</span></div>`;
 m.onclick=e=>{if(e.target.closest('.btn')||e.target==m)m.remove()};document.getElementById('app').appendChild(m)}catch(_){}return r}}return orb.apply(this,arguments)};
})();
;(()=>{// r358 v308 스테이지 VICTORY/DEFEAT · 비무대회 승리/패배 · 월드 보스 결과 — 리본 + 카드 (표시 전용, 기존 값만)
const A='assets/',st=document.createElement('style');st.textContent=`
.vic.win,.vic.lose{border-radius:14px;border:2px solid #0b0d0f;padding:14px 6px 12px}
.vic.clr .chcr{white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
.vic.win{background:linear-gradient(#3a2a14f0,#201608f0);box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 4px #3a2410,inset 0 0 40px #ffc24a33,0 10px 30px #000c}
.vic.win.clr{background:linear-gradient(#000a,#000c),url(${A}bg_clear.jpg) center/cover;border:2px solid #0b0d0f;box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 4px #3a2410,0 10px 30px #000c}
.vic.lose{background:linear-gradient(#3a1e22f0,#221216f0);box-shadow:inset 0 0 0 2px #b0403a,inset 0 0 0 4px #2a0e10,inset 0 0 40px #ff3a2a33,0 10px 30px #000c}
.vic.win .vt,.vic.lose .vt{display:block;width:240px;height:58px;margin:-4px auto 2px;padding-top:6px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;-webkit-background-clip:border-box;background-clip:border-box;-webkit-text-fill-color:currentColor;font:italic 900 26px/52px Maplestory,sans-serif;letter-spacing:1px;filter:drop-shadow(0 3px 3px #000a)}
.vic.win .vt{color:#ffe08a;text-shadow:0 2px 0 #3a2008,0 0 10px #ffb02e99}.vic.lose .vt{color:#ffd0c0;text-shadow:0 2px 0 #3a0a08,0 0 8px #ff4a3a88}
.vic.clr .vt{font-size:26px}
.vic.win .vr .rcd,.vic.win .vr>span:not(.up):not(.fcl){display:inline-flex;align-items:center;gap:3px;padding:5px 10px;border-radius:10px;background:radial-gradient(circle at 50% 35%,#6a4a1acc,#2a1a08cc);border:2px solid #e8b860;box-shadow:0 0 8px #ffb02e55}
.vic.win .vr .fcl{display:inline-flex;align-items:center;gap:3px;padding:5px 8px;border-radius:10px;background:#0a2a4acc;border:2px solid #7ac8ff}
.vic.lose .gdhp{background:#0005;border-radius:8px;padding:5px 8px;margin:6px 6px 0}
.arres.rs358{gap:0;background:#000d}
.arres.rs358 .rsbx{position:relative;width:320px;padding:40px 14px 14px;border-radius:14px;border:2px solid #0b0d0f;text-align:center}
.arres.rs358.w .rsbx{background:linear-gradient(#3a2a14f4,#201608f4);box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 4px #3a2410,inset 0 0 40px #ffc24a33,0 10px 30px #000c}
.arres.rs358.l .rsbx{background:linear-gradient(#3a1e22f4,#221216f4);box-shadow:inset 0 0 0 2px #b0403a,inset 0 0 0 4px #2a0e10,inset 0 0 40px #ff3a2a33,0 10px 30px #000c}
.rs358 .pwhd{position:absolute;left:50%;top:-30px;transform:translateX(-50%);width:250px;height:62px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;gap:6px;padding-top:6px;filter:drop-shadow(0 3px 3px #000a)}
.rs358 .pwhd img{width:26px;height:26px;object-fit:contain}
.arres.rs358 .pwhd b{font:900 22px Maplestory,sans-serif!important;text-shadow:0 2px 0 #3a2008,0 0 8px #ffb02e88!important}.arres.rs358.w .pwhd b{color:#ffe08a!important}.arres.rs358.l .pwhd b{color:#ffd0c0!important}
.rs358 .rsst{display:block;font:900 13px Maplestory,sans-serif;color:#ffe0b0;margin:0 0 6px;text-shadow:0 1px 0 #000}
.rs358 .rscd{display:flex;gap:6px;margin:6px 0 10px}
.rs358 .pwc{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 4px;border-radius:10px;background:#0006;border:1px solid #ffffff1a;min-width:0}
.rs358 .pwc small{font:700 11px 'Noto Sans KR',sans-serif!important;color:#e0d4b8!important;display:flex;align-items:center;gap:3px;white-space:nowrap}.rs358 .pwc small img{width:16px;height:16px;object-fit:contain}
.rs358 .pwc b{font:900 17px Maplestory,sans-serif!important;color:#fff!important;text-shadow:0 2px 0 #000!important;white-space:nowrap}.rs358 .pwc b.dn{color:#ff8a7a!important}.rs358 .pwc b.upv{color:#7aff8a!important}
.arres.rs358 #arOk{display:flex;justify-content:center;margin:0 auto;width:220px}
.rwpop.rs358 .rwt{display:none}.rwpop.rs358 .pwhd b{font:900 20px Maplestory,sans-serif;color:#ffe08a;text-shadow:0 2px 0 #3a2008,0 0 8px #ffb02e88;display:flex;align-items:center;gap:6px}
.rwpop.rs358 .pwhd{top:-22px;z-index:3}.rwpop.rs358 .rscd{margin:40px 8px 2px}.rwpop.rs358 .rwbox{overflow:visible}`;document.head.appendChild(st);
const card=(ic,l,v,c)=>`<div class=pwc><small>${ic?`<img src="${A}${ic}">`:''}${l}</small><b class="${c||''}">${v}</b></div>`;
/* 비무대회 결과 (.arres inside .modal.arep) */
const deAr=e=>{if(e.dataset.r358)return;e.dataset.r358=1;const t=e.querySelector('b'),sm=e.querySelector('small'),ok=e.querySelector('#arOk');if(!t||!ok)return;const w=e.classList.contains('w');
 const m=sm&&/점수\s*([+-]?\d+)\s*·\s*<img[^>]*>\s*\+?(\d+)\s*·\s*(.+?)\s*리그\s*([\d,]+)점/.exec(sm.innerHTML);const bx=document.createElement('div');bx.className='rsbx';
 bx.innerHTML=`<div class=pwhd>${w?'':`<img src="${A}ui_warn.png">`}<b>${t.textContent}</b></div><small class=rsst>비무대회 결과</small>`+(m?`<div class=rscd>${card('st_atk.png','점수',(+m[1]>0?'+':'')+(+m[1]),+m[1]<0?'dn':'upv')}${card('it2_gem.png','보석','+'+m[2])}${card('ic_trophy.png',m[3]+' 리그',m[4]+'점')}</div>`:'');
 if(!m&&sm){sm.classList.add('rsst');bx.appendChild(sm)}bx.appendChild(ok);t.remove();if(m&&sm)sm.remove();e.classList.add('rs358');e.appendChild(bx)};
new MutationObserver(ms=>{for(const r of ms)for(const n of r.addedNodes){if(n.nodeType!==1||!n.classList.contains('arep'))continue;const bx=n.querySelector('.arbox');if(!bx)continue;const o=new MutationObserver(()=>{const e=bx.querySelector('.arres');if(e){o.disconnect();deAr(e)}else if(!n.isConnected)o.disconnect()});o.observe(bx,{childList:true})}}).observe(document.getElementById('app'),{childList:true});
/* 월드 보스 결과 (rewardPop, .rwt = 토벌 종료!) */
const deWb=d=>{if(d.dataset.r358)return;const bx=d.querySelector('.rwbox'),t=d.querySelector('.rwt'),s=d.querySelector('.rws');if(!bx||!t||!/토벌 종료/.test(t.textContent)||!s)return;d.dataset.r358=1;
 const m=/^(.+?)\s*·\s*피해\s*(.+?)\s*·\s*오늘\s*(\d+)위$/.exec(s.textContent.trim());if(!m)return;d.classList.add('rwclr','rs358');
 const cr=document.createElement('div');cr.className='rwcr';const hd=document.createElement('div');hd.className='pwhd';hd.innerHTML=`<b>${t.innerHTML}</b>`;bx.prepend(cr,hd);
 const w=document.createElement('div');w.className='rscd';w.innerHTML=card('ic_trophy.png','등급',m[1])+card('wb_sword.png','피해',m[2])+card('tt_crown.png','오늘 순위',m[3]+'위');s.replaceWith(w)};
new MutationObserver(ms=>{for(const r of ms)for(const n of r.addedNodes)if(n.nodeType===1&&n.classList.contains('rwpop'))deWb(n)}).observe(document.body,{childList:true});
})();
;(()=>{// r359 v309 보스 러시 주간 랭킹 popup: ribbon title + framed scrolling list card (layout only) · battle overlays hidden under open sheet · 영지 building card frame
const A='assets/',st=document.createElement('style');st.textContent=`
.brmod .mbox.rs359{position:relative;overflow:visible;padding:40px 12px 12px;border-radius:14px;border:2px solid #0b0d0f;background:linear-gradient(#3a2a14f6,#1e1408f6);box-shadow:inset 0 0 0 2px #e0a84a,inset 0 0 0 4px #3a2410,inset 0 0 40px #ffc24a22,0 10px 30px #000c}
.brmod .rs359>.ttl{position:absolute;left:50%;top:-28px;transform:translateX(-50%);width:270px;height:62px;margin:0;padding-top:6px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;gap:6px;font:900 17px Maplestory,sans-serif;color:#ffe08a;text-shadow:0 2px 0 #3a2008,0 0 8px #ffb02e88;white-space:nowrap;filter:drop-shadow(0 3px 3px #000a)}
.brmod .rs359>.ttl img{width:24px;height:24px;object-fit:contain}
.brmod .rs359 .rsst{display:block;text-align:center;font:700 11px 'Noto Sans KR',sans-serif;color:#e0d4b8;margin:0 0 6px}
.brmod .rs359 .brl{margin:0 0 8px;padding:4px;border-radius:10px;background:#0008;border:2px solid #6a4a1a;box-shadow:inset 0 0 0 1px #000,inset 0 6px 10px -6px #000;scrollbar-width:thin;scrollbar-color:#a07830 #0000}
.brmod .rs359 .brr{border-radius:6px;border-bottom:1px solid #ffffff12;align-items:center}
.brmod .rs359 .brr:nth-child(1) i{color:#ffd84a}.brmod .rs359 .brr:nth-child(2) i{color:#dfe6ee}.brmod .rs359 .brr:nth-child(3) i{color:#e09a5a}
.brmod .rs359 .brr.me{background:linear-gradient(90deg,#8a5a18cc,#5a3a10cc);box-shadow:inset 0 0 0 1px #ffd25a}
.brmod .rs359 .brtier span{background:radial-gradient(circle at 50% 35%,#5a3e18cc,#24180acc);border:1px solid #c9953f;border-radius:8px;padding:3px 7px;color:#ffe8c0;display:inline-flex;align-items:center;gap:2px}
.brmod .rs359 .brtier img{width:13px;height:13px}
body.sheeton #battle .combo,body.sheeton #battle .combo.duo,body.sheeton #battle .cmbx{visibility:hidden!important}
#screen .card.bupc{position:relative;margin-top:24px!important;padding-top:44px!important;border-radius:14px!important;border:2px solid #0b0d0f!important;background:linear-gradient(#3a2a14f0,#1e1408f0)!important;box-shadow:inset 0 0 0 2px #c9953f,inset 0 0 0 4px #3a2410,0 6px 16px #0009!important}
#screen .card.bupc>.ttl{position:absolute;left:50%;top:-24px;transform:translateX(-50%);width:250px;height:54px;padding-top:4px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 3px 3px #000a)}
#screen .card.bupc>.ttl>span{font:900 15px Maplestory,sans-serif;color:#ffe08a;text-shadow:0 2px 0 #3a2008;white-space:nowrap}
#screen .card.bupc>.ttl>span small{color:#e8d0a0;font-size:11px}
#screen .card.bupc>.ttl>small{position:absolute;top:50px;right:-30px;font-size:10px;color:#e0d4b8;white-space:nowrap;display:flex;align-items:center;gap:3px}
#screen .card.bupc .row{border-radius:10px;background:#0006!important;border:1px solid #6a4a24!important}
#screen .card.bupc .row .ic{border-radius:10px;background:radial-gradient(circle at 50% 35%,#6a4a1a,#2a1a08);box-shadow:0 0 6px #ffb02e55}`;document.head.appendChild(st);
const de=m=>{const bx=m.querySelector('.mbox');if(!bx||bx.classList.contains('rs359'))return;bx.classList.add('rs359');const t=bx.querySelector('.ttl');if(t){t.insertAdjacentHTML('afterbegin',`<img src="${A}tt_crown.png" alt="">`);t.insertAdjacentHTML('afterend','<small class=rsst>주간 랭킹 · 월 05:00 정산</small>')}};
new MutationObserver(ms=>{for(const r of ms)for(const n of r.addedNodes)if(n.nodeType===1&&n.classList.contains('brmod'))de(n)}).observe(document.getElementById('app'),{childList:true});
})();
;(()=>{// r360 v310 영지 building strip (real Lv + current output from the existing rows) · empty potion-slot frame · 마력 수련 강화 cost red when gold is short (display only)
const A='assets/',st=document.createElement('style');st.textContent=`
.bstrip{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:10px 0 6px}
.bstrip .bsc{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px 7px;border-radius:12px;border:2px solid #0b0d0f;background:linear-gradient(#3a2a14ee,#1e1408ee);box-shadow:inset 0 0 0 1px #8a6a34,0 4px 10px #0008;cursor:pointer;min-width:0}
.bstrip .bsc.on{box-shadow:inset 0 0 0 2px #ffd25a,0 0 10px #ffb02e66,0 4px 10px #0008}
.bstrip .bsc img{width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 2px 2px #000a)}
.bstrip .bsc b{font:900 12px Maplestory,sans-serif;color:#ffe8c0;white-space:nowrap}
.bstrip .bsc .lv{position:absolute;top:4px;left:5px;font:900 10px Maplestory,sans-serif;color:#fff;background:#000a;border:1px solid #c9953f;border-radius:7px;padding:0 4px}
.bstrip .bsc small{font:700 10px 'Noto Sans KR',sans-serif;color:#e0d4b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;display:flex;align-items:center;gap:2px}
.bstrip .bsc small img{width:12px;height:12px;filter:none}
.bstrip .bsc .sb{width:86%;height:5px;border-radius:3px;background:#0009;overflow:hidden;margin-top:2px}.bstrip .bsc .sb i{display:block;height:100%;background:linear-gradient(90deg,#7aff8a,#2ac04a)}
.bstrip .bsc em{font:900 10px 'Noto Sans KR',sans-serif;font-style:normal;color:#7aff8a}.bstrip .bsc em.up{color:#9fd8ff}
.potb.emp{background:radial-gradient(circle,#0e1116 52%,#1c222a)!important;border-color:transparent!important;box-shadow:inset 0 3px 6px #000c!important}
.potb.emp::after{content:'';position:absolute;inset:-5px;background:url(${A}sk_empty.png) center/100% 100% no-repeat;z-index:3;pointer-events:none}
.potb.emp img{width:20px;height:20px;opacity:.3}.potb.emp b{z-index:4;color:#c8ccd4}
.tcard .pill.off:has(small){filter:none!important;background:linear-gradient(#5a5e66,#3a3d44)!important;border-color:#1a1c20!important;box-shadow:inset 0 1px 0 #ffffff22,0 2px 0 #0008!important;color:#c8ccd4!important;text-shadow:0 1px 0 #000!important}
.tcard .pill.off small{display:inline-flex;align-items:center;gap:2px;margin-top:1px;padding:0 6px;border-radius:7px;background:#0007}.tcard .pill.off small,.tcard .pill.off small *{color:#ff7a6a!important;font-weight:900}
body.sheeton .bwarn,body.sheeton #battle .vsx,body.sheeton #battle .wvb,body.sheeton #battle .bcut,body.sheeton #battle .banner,body.sheeton #bubL{visibility:hidden!important;animation-play-state:running}.tcard .pill.off small img{filter:saturate(.6)}`;document.head.appendChild(st);
const K=[['vault','황금 광산','bd_mine.png'],['mine','마정 농장','bd_farm.png'],['tower','마탑','bd_tower.png']];
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='base')return r;const sb=document.querySelector('#screen .sbody'),card=sb&&sb.querySelector('.card.bupc');if(!card||sb.querySelector('.bstrip'))return r;const s=C.S(),now=C.now(),sel=G.baseSel||'vault';
 const cs=K.map(([k,n,ic])=>{const b=s.bld&&s.bld[k],row=[...card.querySelectorAll('.row')].find(x=>{const d=(x.querySelector('[data-up],[data-sp]')||{}).dataset;return d&&(d.up||d.sp)==k});if(!b||!row)return '';
  const sm=row.querySelector('.f small');let out='';if(sm){const t=sm.textContent.trim();out=k=='tower'?t.replace(/\s*\(.*\)$/,''):(t.split('·')[0]||'').trim()}const bi=row.querySelector('.bar i'),pc=bi?parseFloat(bi.style.width)||0:null;const up=b.up&&b.up>now;
  const ri=k=='vault'?'it2_gold.png':k=='mine'?'it2_exp.png':'';
  return `<div class="bsc ${sel==k?'on':''}" data-bs=${k}><span class=lv>Lv.${b.lv}</span><img src="${A}${ic}" alt=""><b>${n}</b><small>${ri?`<img src="${A}${ri}" alt="">`:''}${out}</small>${pc!=null?`<div class=sb><i style="width:${Math.min(100,pc)}%"></i></div>`:''}${up?'<em class=up>업그레이드 중</em>':k!='tower'&&b.acc>=1?'<em>수확 가능</em>':''}</div>`}).join('');
 if(!cs)return r;const w=document.createElement('div');w.className='bstrip';w.innerHTML=cs;card.after(w);w.querySelectorAll('[data-bs]').forEach(e=>e.onclick=()=>{G.baseSel=e.dataset.bs;renderScreen()})}catch(e){console.warn(e)}return r};
})();
;(()=>{// r361 v311 소환 결과 grade frames + rarity glow reveal (영웅 purple / 전설·신화 gold; flip, or fade on 스킬 연출 off / low graphics; CSS-only, no per-frame JS) · 영지 strip castle + barracks cards (real levels / existing 준비 중 text). Display only
const A='assets/',st=document.createElement('style');st.textContent=`
.srm .srf{--gw:transparent}.srm .srf.g3{--gw:#b07cff}.srm .srf.g4{--gw:#ffc44a}.srm .srf.g5{--gw:#ffb02a}
.srm .srf::before{content:'';position:absolute;inset:-11px;border-radius:14px;background:radial-gradient(closest-side,var(--gw),transparent);opacity:0;z-index:0;pointer-events:none}
.srm .srf.g3.open::before,.srm .srf.g4.open::before,.srm .srf.g5.open::before{animation:gw361 .6s .3s ease-out both,gp361 1.6s 1s ease-in-out infinite alternate}
@keyframes gw361{0%{opacity:0;transform:scale(.6)}60%{opacity:1;transform:scale(1.15)}100%{opacity:.85;transform:scale(1)}}@keyframes gp361{from{opacity:.85}to{opacity:.45}}
.srm .srf .sumcard .gr{display:inline-block;margin-top:2px;padding:0 6px;border-radius:7px;background:linear-gradient(color-mix(in srgb,var(--rc) 80%,#fff),var(--rc));color:#fff!important;text-shadow:0 1px 0 #000a;border:1px solid #0b0d0f;line-height:13px}
.srm .srf.g3 .sumcard{border-color:#c99cff!important;box-shadow:inset 0 0 0 1px #fff8,0 0 0 1px #2a0e4a,0 0 12px #b07cffcc!important}
.srm .srf.g4 .sumcard,.srm .srf.g5 .sumcard{border:3px solid transparent!important;background:radial-gradient(circle at 50% 35%,color-mix(in srgb,var(--rc) 55%,#000),#1a0e08) padding-box,linear-gradient(135deg,#fff6c0,#e8b030 28%,#8a5a10 50%,#ffe08a 72%,#b07010) border-box!important}
.srm .srf.g5 .sumcard{background:radial-gradient(circle at 50% 35%,color-mix(in srgb,var(--rc) 55%,#000),#1a0808) padding-box,linear-gradient(135deg,#fff6c0,#ff8a3a 28%,#8a1a10 50%,#ffe08a 72%,#c03010) border-box!important}
.srm .srf .gm361{position:absolute;left:50%;top:-6px;width:12px;height:12px;margin-left:-6px;transform:rotate(45deg) scale(.2);border:2px solid #0b0d0f;border-radius:2px;z-index:3;opacity:0;transition:opacity .2s .4s,transform .3s .4s;pointer-events:none}
.srm .srf.g3 .gm361{background:linear-gradient(135deg,#f0d8ff,#9a5aff)}.srm .srf.g4 .gm361,.srm .srf.g5 .gm361{background:linear-gradient(135deg,#fff6c0,#e0a020)}
.srm .srf.open .gm361{opacity:1;transform:rotate(45deg) scale(1)}
.srm .srf.g3.open,.srm .srf.g4.open,.srm .srf.g5.open{animation:sp361 .35s .4s ease-out both}@keyframes sp361{0%{transform:scale(1)}45%{transform:scale(1.08)}100%{transform:scale(1)}}
body:is(.nofx,.tglite) .srm .sumcard{transform:none!important;opacity:0;transition:opacity .25s!important}body:is(.nofx,.tglite) .srm .srbk{transform:none!important;opacity:1;transition:opacity .25s!important}
body:is(.nofx,.tglite) .srm .srf.open .sumcard{opacity:1}body:is(.nofx,.tglite) .srm .srf.open .srbk{opacity:0}
body:is(.nofx,.tglite) .srm .srf.open::before{animation:none!important;opacity:.7}body:is(.nofx,.tglite) .srm .srf.open{animation:none!important}body:is(.nofx,.tglite) .srm .srbu{display:none!important}body:is(.nofx,.tglite) .srm .gm361{transition:none}
.bstrip{display:flex!important;flex-wrap:wrap;justify-content:center}.bstrip .bsc{width:calc((100% - 12px)/3);box-sizing:border-box}
.bstrip .bsc.lk{cursor:default;background:linear-gradient(#2a2a2cee,#16161aee);box-shadow:inset 0 0 0 1px #5a5a60,0 4px 10px #0008}.bstrip .bsc.lk b{color:#b8bcc4}.bstrip .bsc.lk small{color:#9a9ea6}.bstrip .bsc.lk img{filter:drop-shadow(0 2px 2px #000a) brightness(.9)}`;document.head.appendChild(st);
const os=summon;summon=function(n){const r=os.apply(this,arguments);try{const got=G._sumGot,m=document.getElementById('sumModal');if(got&&m&&!m.classList.contains('r361'))[...m.querySelectorAll('.srf')].forEach((f,i)=>{const cp=D.COMPS.find(x=>x.k==got[i]);if(!cp)return;f.classList.add('g'+cp.g);if(cp.g>=3)f.insertAdjacentHTML('beforeend','<i class=gm361></i>')}),m.classList.add('r361')}catch(e){console.warn(e)}return r};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='base')return r;const w=document.querySelector('#screen .bstrip');if(!w||w.querySelector('[data-bs=castle]'))return r;const s=C.S(),B=s.bld||{};
 const tot=Object.values(B).reduce((a,x)=>a+(x.lv||0),0),lv=k=>B[k]?B[k].lv:0;
 w.insertAdjacentHTML('beforeend',`<div class=bsc data-bs=castle><span class=lv>Lv.${tot}</span><img src="${A}ic3_castle.png" alt=""><b>영주성</b><small>광산 ${lv('vault')} · 농장 ${lv('mine')} · 마탑 ${lv('tower')}</small></div><div class="bsc lk" data-bs=barracks><img class=bk362 src="${A}bd_barracks.png" alt=""><img class=lk362 src="${A}sk_lock.png" alt=""><b>병영</b><small>준비 중입니다</small></div>`);
 w.querySelector('[data-bs=castle]').onclick=()=>{const p=document.querySelector('#screen [data-bh=castle]');if(p)p.click()};w.querySelector('[data-bs=barracks]').onclick=()=>toast('병영은 준비 중입니다')}catch(e){console.warn(e)}return r};
})();
;(()=>{// r362 v312 병영 art (bd_barracks, locked/greyed + lock badge) · 전설 reveal screen grade frame + name ribbon (matches r361 cards; one pooled frame node re-parented per reveal) · ✦ → CSS gem · 영지 town emoji now real img in source. Display only
const A='assets/',st=document.createElement('style');st.textContent=`
.bstrip .bsc.lk img.bk362{width:44px;height:40px;filter:grayscale(.85) brightness(.62) drop-shadow(0 2px 2px #000a)}
.bstrip .bsc.lk img.lk362{position:absolute;top:22px;left:50%;margin-left:4px;width:16px;height:20px;filter:drop-shadow(0 1px 2px #000)}
.dm362{display:inline-block;width:12px;height:12px;margin:0 10px;vertical-align:2px;transform:rotate(45deg);background:linear-gradient(135deg,#fff6c0,#e0a020);border:2px solid #0b0d0f;border-radius:2px;box-shadow:0 0 8px var(--oc,#ffc44a)}
.sumhero{--f1:#fff6c0;--f2:#e8b030;--f3:#8a5a10}.sumhero.g5{--f2:#ff8a3a;--f3:#8a1a10}
.sumhero .shfr{position:absolute;inset:12px;z-index:2;pointer-events:none;border:5px solid;border-image:linear-gradient(135deg,var(--f1),var(--f2) 28%,var(--f3) 50%,#ffe08a 72%,var(--f2)) 1;box-shadow:inset 0 0 0 2px #0b0d0f,inset 0 0 0 3px #fff4,inset 0 0 40px color-mix(in srgb,var(--oc) 45%,transparent),0 0 0 2px #0b0d0f}
.sumhero .shfr i{position:absolute;width:16px;height:16px;transform:rotate(45deg);background:linear-gradient(135deg,var(--f1),var(--f2));border:2px solid #0b0d0f;border-radius:2px;box-shadow:0 0 10px var(--oc)}
.sumhero .shfr i:nth-child(1){left:-11px;top:-11px}.sumhero .shfr i:nth-child(2){right:-11px;top:-11px}.sumhero .shfr i:nth-child(3){left:-11px;bottom:-11px}.sumhero .shfr i:nth-child(4){right:-11px;bottom:-11px}.sumhero .shfr i:nth-child(5){left:50%;top:-11px;margin-left:-8px}
.sumhero .shn{z-index:3}.sumhero .shn span{background:linear-gradient(color-mix(in srgb,var(--oc) 75%,#fff),var(--oc))!important;border:2px solid #0b0d0f;box-shadow:0 2px 0 #0008;padding:1px 16px!important}
.sumhero .shn b{position:relative;width:310px;height:66px;margin:6px auto 0!important;line-height:60px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;font-size:30px!important;color:#fff8e0!important;text-shadow:0 2px 0 #3a1a00,0 0 10px var(--oc)!important;filter:drop-shadow(0 3px 4px #000a)}
.sumhero.on362 .shfr i{animation:gm362 .4s .3s ease-out both}@keyframes gm362{from{opacity:0;transform:rotate(45deg) scale(.2)}to{opacity:1;transform:rotate(45deg) scale(1)}}
body:is(.nofx,.tglite) .sumhero .shfr i{animation:none!important}body:is(.nofx,.tglite) .sumhero .shr{animation:none!important}`;document.head.appendChild(st);
const FR=document.createElement('div');FR.className='shfr';FR.innerHTML='<i></i><i></i><i></i><i></i><i></i>';
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!==1||!n.classList||!n.classList.contains('sumhero'))continue;try{const nm=(n.querySelector('.shn b')||{}).textContent,c=D.COMPS.find(x=>x.n==nm);n.classList.add('g'+(c?c.g:4));n.classList.remove('on362');n.appendChild(FR);void n.offsetWidth;n.classList.add('on362')}catch(e){console.warn(e)}}}).observe(document.body,{childList:true});
})();

;(()=>{// r363 v313 소환 화면: 천장(전설 확정) 바 + 선택 소환 마일리지 카드 frame-and-ribbon look (matches r361/r362 grade frames). Display only; values are the existing s.pity / C.PITY / s.mile / D.COMPS.
const A='assets/',st=document.createElement('style');st.textContent=`
#screen .smp{position:relative;margin:20px 4px 8px;padding:14px 12px 9px;gap:8px;border:3px solid;border-image:linear-gradient(135deg,#fff6c0,#e8b030 28%,#8a5a10 50%,#ffe08a 72%,#e8b030) 1;background:linear-gradient(#2c1c4c,#140a26);box-shadow:0 0 0 2px #0b0d0f,inset 0 0 0 2px #0b0d0f,inset 0 0 18px #b07cff66,0 3px 6px #0008}
#screen .smp:before{content:'전설 확정';position:absolute;left:50%;top:-17px;transform:translateX(-50%);width:132px;height:30px;line-height:26px;text-align:center;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;font-size:13px;font-weight:900;color:#fff8e0;text-shadow:0 1px 0 #3a1a00,0 0 6px #ffb84a;filter:drop-shadow(0 2px 2px #000a)}
#screen .smp>i.dm363{position:absolute;top:50%;width:11px;height:11px;margin-top:-6px;transform:rotate(45deg);background:linear-gradient(135deg,#fff6c0,#e0a020);border:2px solid #0b0d0f;border-radius:2px;box-shadow:0 0 6px #ffc44a}
#screen .smp>i.dm363.l{left:-8px}#screen .smp>i.dm363.r{right:-8px}
#screen .smp .bar{height:18px;border-radius:10px;border:2px solid #0b0d0f;box-shadow:0 0 0 2px #c8962a,inset 0 2px 3px #0009}
#screen .smp>b{font-size:12px}
#screen .sucd.sel363>.ttl{justify-content:center;height:36px;margin:-4px auto 8px;width:200px;line-height:32px;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;color:#fff8e0;text-shadow:0 1px 0 #3a1a00,0 0 6px #ffb84a;filter:drop-shadow(0 2px 3px #000a)}
#screen .sucd.sel363>.ttl small{display:none}
#screen .sucd.sel363 .sug{position:relative;overflow:visible;border:2px solid transparent!important;border-radius:10px;background:radial-gradient(120% 80% at 50% 30%,color-mix(in srgb,var(--rc) 26%,#1a1d24),#0e1015 70%) padding-box,linear-gradient(135deg,#fff8,var(--rc) 30%,#2a1c08 52%,var(--rc) 78%,#fff8) border-box!important;box-shadow:0 0 0 1px #0b0d0f,0 0 8px color-mix(in srgb,var(--rc) 45%,transparent);padding-bottom:4px}
#screen .sucd.sel363 .sug:before{content:'';position:absolute;left:50%;top:-6px;width:9px;height:9px;margin-left:-6px;transform:rotate(45deg);background:linear-gradient(135deg,#fff,var(--rc));border:2px solid #0b0d0f;border-radius:2px;z-index:2}
#screen .sucd.sel363 .sug>b{display:block;position:relative;align-self:stretch;margin:3px -5px 1px;height:20px;line-height:20px;text-align:center;background:linear-gradient(color-mix(in srgb,var(--rc) 55%,#fff),var(--rc) 50%,color-mix(in srgb,var(--rc) 62%,#000));clip-path:polygon(0 0,100% 0,93% 50%,100% 100%,0 100%,7% 50%);color:#fff;font-size:12px;text-shadow:0 1px 0 #000,0 0 3px #000a;white-space:nowrap}
#screen .sucd.sel363 .sug>small{color:color-mix(in srgb,var(--rc) 80%,#fff)!important;font-weight:900}
#screen .sucd.sel363 .sug.lock{filter:none}#screen .sucd.sel363 .sug.lock>img{filter:grayscale(.85) brightness(.62)}#screen .sucd.sel363 .sug.lock>b,#screen .sucd.sel363 .sug.lock>small{opacity:.85}
#screen .sucd.sel363 .sug.lock:after{content:'';position:absolute;right:4px;top:5px;width:15px;height:18px;background:url(${A}sk_lock.png) center/contain no-repeat;filter:drop-shadow(0 1px 2px #000)}
body.tglite #screen .smp,body.tglite #screen .sucd.sel363 .sug{box-shadow:0 0 0 2px #0b0d0f!important}body.tglite #screen .smp:before,body.tglite #screen .sucd.sel363>.ttl{filter:none}`;document.head.appendChild(st);
const deco=()=>{const sc=document.querySelector('#screen');if(!sc)return;const m=sc.querySelector('.smp');if(m&&!m.querySelector('.dm363'))m.insertAdjacentHTML('beforeend','<i class="dm363 l"></i><i class="dm363 r"></i>');const k=sc.querySelector('.sucd');if(k)k.classList.toggle('sel363',G.suT==1&&!!k.querySelector('[data-sk]'))};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='summon')deco()}catch(e){console.warn(e)}return r};
})();

;(()=>{// r364 v314 확률 정보 탭: grade-framed rate boxes (.sug2) with notched ribbon headers + same grade-frame/ribbon cards as 선택 소환 (r363). Display only; rates are the existing C.rates()/C.PITY text.
const st=document.createElement('style');st.textContent=`
#screen .sucd.rate364 .sug2{position:relative;margin:22px 0 10px;padding:18px 7px 8px;border:2px solid transparent;border-radius:12px;background:linear-gradient(color-mix(in srgb,var(--rc) 14%,#171a21),#0d0f14) padding-box,linear-gradient(135deg,#fff7,var(--rc) 30%,#2a1c08 52%,var(--rc) 78%,#fff7) border-box;box-shadow:0 0 0 1px #0b0d0f,0 0 10px color-mix(in srgb,var(--rc) 35%,transparent)}
#screen .sucd.rate364 .sug2:first-of-type{margin-top:18px}
#screen .sucd.rate364 .surh{position:absolute;left:50%;top:-14px;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;gap:8px;min-width:150px;height:26px;padding:0 22px;margin:0;background:linear-gradient(color-mix(in srgb,var(--rc) 55%,#fff),var(--rc) 50%,color-mix(in srgb,var(--rc) 62%,#000));clip-path:polygon(0 0,100% 0,92% 50%,100% 100%,0 100%,8% 50%);color:#fff!important;font-size:14px;font-weight:900;text-shadow:0 1px 0 #000,0 0 3px #000a;white-space:nowrap}
#screen .sucd.rate364 .surh span{padding:0 7px;height:18px;line-height:18px;border-radius:9px;background:#0b0d0fcc;color:#fff8e0;font-size:12px;text-shadow:none}
#screen .sucd.rate364 .sug>small{font-size:11px}
#screen .sucd.rate364 .sug>em{z-index:3}
body.tglite #screen .sucd.rate364 .sug2{box-shadow:0 0 0 1px #0b0d0f!important}`;document.head.appendChild(st);
const deco=()=>{const k=document.querySelector('#screen .sucd');if(!k)return;const on=G.suT==2&&!!k.querySelector('.sug2');k.classList.toggle('rate364',on);if(!on)return;k.classList.add('sel363');k.querySelectorAll('.sug2').forEach(g=>{const c=g.querySelector('.sug');if(c)g.style.setProperty('--rc',c.style.getPropertyValue('--rc'))})};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='summon')deco()}catch(e){console.warn(e)}return r};
})();

;(()=>{// r365 v315 소환 탭 마감: 소환 확률 카드 gold frame + ribbon title, 마일리지 row framed strip, 보유 재화 tiles framed with ribbon labels. Display only (existing values).
const A='assets/',st=document.createElement('style');st.textContent=`
#screen .card.prc365{position:relative;margin-top:22px!important;border:3px solid transparent!important;border-radius:12px!important;background:linear-gradient(#22183a,#0f0b1a) padding-box,linear-gradient(135deg,#fff6c0,#e8b030 28%,#8a5a10 50%,#ffe08a 72%,#e8b030) border-box!important;box-shadow:0 0 0 2px #0b0d0f,0 3px 8px #0008!important;padding-top:20px!important}
#screen .card.prc365>.ttl,#screen .sucd.cur365>.ttl{position:absolute;left:50%;top:-18px;transform:translateX(-50%);justify-content:center;width:170px;height:34px;line-height:30px;margin:0;padding:0;background:url(${A}ui_ribbon.png) center/100% 100% no-repeat;color:#fff8e0;font-size:14px;text-shadow:0 1px 0 #3a1a00,0 0 6px #ffb84a;filter:drop-shadow(0 2px 3px #000a);white-space:nowrap}
#screen .card.prc365 .milebar{padding:6px 10px;margin-top:6px;border:2px solid transparent;border-radius:9px;background:linear-gradient(#2c1c4c,#140a26) padding-box,linear-gradient(90deg,#8a5a10,#ffe08a 50%,#8a5a10) border-box;box-shadow:0 0 0 1px #0b0d0f}
#screen .card.prc365 .milebar>span{color:#ffe8a0;font-weight:900}
#screen .sucd.cur365{position:relative;margin-top:24px;padding-top:22px;border:3px solid transparent!important;border-radius:12px;background:linear-gradient(#1c1f28,#0e1015) padding-box,linear-gradient(135deg,#fff6c0,#e8b030 28%,#8a5a10 50%,#ffe08a 72%,#e8b030) border-box!important;box-shadow:0 0 0 2px #0b0d0f}
#screen .sucd.cur365 .sucur>div{position:relative;border:2px solid transparent!important;border-radius:10px!important;background:radial-gradient(110% 80% at 50% 30%,#3a2c5a,#120e1c 75%) padding-box,linear-gradient(135deg,#fff8,#c8962a 35%,#3a2a10 55%,#c8962a 80%,#fff8) border-box!important;box-shadow:0 0 0 1px #0b0d0f,0 0 8px #ffc44a33!important;padding:8px 2px 4px!important}
#screen .sucd.cur365 .sucur>div:before{content:'';position:absolute;left:50%;top:-6px;width:9px;height:9px;margin-left:-6px;transform:rotate(45deg);background:linear-gradient(135deg,#fff6c0,#e0a020);border:2px solid #0b0d0f;border-radius:2px}
#screen .sucd.cur365 .sucur>div>small{display:block;align-self:stretch;margin:3px -4px 0;height:19px;line-height:19px;text-align:center;background:linear-gradient(#ffe08a,#c8962a 50%,#7a5010);clip-path:polygon(0 0,100% 0,93% 50%,100% 100%,0 100%,7% 50%);color:#fff!important;font-weight:900;text-shadow:0 1px 0 #000,0 0 3px #000a;opacity:1!important}
body.tglite #screen .card.prc365,body.tglite #screen .sucd.cur365{box-shadow:0 0 0 2px #0b0d0f!important}body.tglite #screen .card.prc365>.ttl,body.tglite #screen .sucd.cur365>.ttl{filter:none}`;document.head.appendChild(st);
const deco=()=>{const sc=document.querySelector('#screen');if(!sc)return;const bn=sc.querySelector('.sumban'),c=bn&&bn.nextElementSibling;if(c&&c.classList.contains('card')&&c.querySelector('.milebar'))c.classList.add('prc365');const k=sc.querySelector('.sucd');if(k)k.classList.toggle('cur365',!!k.querySelector('.sucur'))};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='summon')deco()}catch(e){console.warn(e)}return r};
})();

;(()=>{/* r365 v315 battle readability: the mid-field kill / FEVER / 광폭화 / wave banners (.mkb .fevban .enrb .wclr .wvb) were drawn over by in-flight damage numbers and BLOCK labels (frames 1441_battle_*). While one is up, its own rect (measured once on insert, then re-read every 0.25s so the .mkb top shifts are followed) becomes R._kbB and numbers inside that band fade to .15 like the r306/r327 bands. One pooled 3-slot array, no per-frame allocation, no DOM read per frame. */
const b=document.getElementById('battle');if(!b||!R._kbB)return;const SEL='.mkb:not(.bgone),.fevban:not(.bgone),.enrb:not(.bgone),.wclr:not(.bgone),.wvb:not(.bgone)';const K=R._kbB,DUO='.combo.duo:not(.cbq):not(.dfd):not(.dlo)';let el=null,tm=0;
const upd=()=>{const n=b.querySelector(SEL),u=b.querySelector(DUO)/* r396: the 연계기 duo card (normal-wave slot ~248-350, boss low slot) also joins the band - final waves stacked CRITICAL numbers behind and around it; with a kill/wave banner up too the band spans both */;el=n||u;if(!el){K[2]=0;return}const o=b.getBoundingClientRect();let t=1e9,m=-1e9;for(const x of [n,u]){if(!x)continue;const r=x.getBoundingClientRect();if(!(r.height>0))continue;if(r.top<t)t=r.top;if(r.bottom>m)m=r.bottom}if(m<t){K[2]=0;return}K[0]=t-o.top-4;K[1]=m-o.top+4;K[2]=1};
const tick=()=>{tm=0;upd();if(el)tm=setTimeout(tick,250)};
new MutationObserver(()=>{if(!tm)tick()}).observe(b,{childList:true,subtree:false,attributes:false});
G._kbTest=()=>K.slice()/* console probe only */;
})();

;(()=>{/* r366 v316 boss readability + WAVE CLEAR tidy: when the WAVE CLEAR ribbon goes up, damage numbers still in flight from the cleared wave fade out (render.js R._txtClr, event-driven, no per-frame work). Boss halo/ring/shadow moved off the boss layer, crit / BREAK! numbers above the boss head: render.js + grog hook. Visual only. */
if(!R||typeof R.waveRib!=='function')return;const o=R.waveRib;R.waveRib=function(t){try{if(typeof t==='string'&&t.indexOf('CLEAR')>=0&&R._txtClr)R._txtClr()}catch(_){}return o.apply(this,arguments)};
})();

;(()=>{/* r367 v317: boss-fight duo card in the low band - compact (scale .78) and the toast stack stays put (its 118/176px slide only dodged the old mid-field slots and would now land on the boss) */
const st=document.createElement('style');st.textContent=`body #battle .combo.duo.dlw:is(#_a,#_b,div):is(#_c,#_d,div):is(#_e,#_f,div){scale:.78}
body:not(.hs-scr):not(.hs-sh):not(.hs-mp):is(.hs-cbw,#_hz1).hs-cbw.hs-cbw.hs-cbw.hs-cbw:is(#_a,#_b,body) #toastQ{translate:0 0!important}`;document.head.appendChild(st)})();

;(()=>{/* r372: warm the upcoming stage boss's sprite caches at idle, from the last wave before the boss and again at startBoss (1.2s lock). Display only. */
const C=window.CORE,R=window.RENDER;if(!C||!R)return;const D=C.D,BAL=D.BAL;const bossOf=()=>{try{const si=C.S().si,pl=D.BOSSPLAN[Math.floor(si/7)];return pl&&D.BOSSES[pl[si%7==6?1:0]]}catch(_){return null}};
const w=()=>{const b=bossOf();if(b&&R.warmBoss)R.warmBoss(b.img,b.sc,0)};const sb=C.startBoss;C.startBoss=function(){const r=sb.apply(this,arguments);if(C.B.boss&&!C.B.wb)w();return r};
setInterval(()=>{try{const s=C.S();if(!C.B.boss&&s.wave>=BAL.waves-1)w()}catch(_){}},2000)})();
;(()=>{/* r377 v327 (display only): 보석 · 골드 tab cards like 화룡전 - quantity "×N" as a badge on the item art instead of in the name, the "(n/m)" daily count hidden where the 일일 한정 ribbon already shows it, names wrap by word (keep-all), reset note kept on one line. Same items / prices / limits, nothing added */
const st=document.createElement('style');st.textContent=`#screen .shq{position:relative}#screen .shq>b{word-break:keep-all;line-height:13px}#screen .shq.shl>b small{display:none}
#screen .shqn{position:absolute;right:12px;top:calc(8px + (100% - 16px) * 0 + var(--shw,80px) - 22px);font:800 12px/16px Maplestory,sans-serif;color:#fff;padding:0 6px;border-radius:8px;background:#2a1a10d9;box-shadow:0 0 0 1px #c9953f;text-shadow:0 1px 0 #000;pointer-events:none}
#screen .shgt{margin-right:10px!important;padding-right:0}
/* r378: 보석 · 골드 header + grid in the same framed panel as 패키지 (gold frame, hall banner, title plate) */
#screen .shgk .pkst{height:96px}#screen .shgk .pkst>img{object-position:50% 78%}#screen .shgk .pkt img{height:40px}#screen .shgk .shgg{padding:12px 10px 12px}
/* r378: bought-out cards read 구매 완료 like 화룡전 - dark veil over the card, 구매 완료 stamp, grey 구매 완료 button */
#screen .shc2.sold:before,#screen .dcell.sold:before{content:'';position:absolute;inset:0;border-radius:inherit;background:#0b0d0f8c;z-index:3;pointer-events:none}
#screen .shc2.sold .shst,#screen .dcell.sold .shst{width:auto;height:auto;margin:0;left:6px;right:6px;top:34%;transform:rotate(-8deg);border-radius:8px;padding:4px 2px 3px;background:#fff3e6eb;z-index:5}
#screen .shc2.sold .shst i,#screen .dcell.sold .shst i{font-size:14px;white-space:nowrap}#screen .shc2.sold .shst em,#screen .dcell.sold .shst em{font-size:8px;white-space:nowrap;letter-spacing:-.3px}
#screen .shc2.sold [data-b],#screen .dcell.sold [data-deal]{position:relative;z-index:4;background:#5a5a5a!important;color:#e8e8e8!important;box-shadow:0 2px 0 #2a2a2a!important;filter:none!important}
/* r378: not-enough-currency buttons (화룡전: price stays readable, in red) - was a washed-out grey pill with a near-invisible price */
#screen .shc2.poor [data-b].off,#screen .dcell:not(.sold) [data-deal].off{background:linear-gradient(#5a4232,#33241a)!important;color:#ff8070!important;opacity:1!important;filter:none!important;text-shadow:0 1px 0 #000;box-shadow:0 0 0 1px #c9953f99,0 2px 0 #1a0e08!important}
#screen .shc2.poor [data-b].off img,#screen .dcell:not(.sold) [data-deal].off img{filter:none!important;opacity:1!important}
#screen .dcell.sold{opacity:1}
/* r379: 일일 특가 in the same banner panel (shop counter art) as 패키지 / 보석 · 골드 */
#screen .shdk{padding:0 0 10px!important}#screen .shdk>:not(.pkst){margin-left:10px!important;margin-right:10px!important}#screen .shdk>.dlst{margin-top:10px!important}#screen .shdk .pkst{height:96px}#screen .shdk .pkst>img{object-position:50% 34%}#screen .shdk .pkt img{height:40px}
/* r379: long 일일 특가 names (골드 상자 (4시간분)) wrap by word inside the card instead of running past both edges */
#screen.shin .shdk .dlnp{display:none}#screen.shin .shdk .dlst{min-height:0;padding:5px 8px}#screen.shin .shdk .dlbb{background:none;color:#ffeccc;padding:2px 0;text-shadow:0 1px 0 #000}#screen.shin .shdk .dlbb:before{display:none}#screen.shin .shdk .dlbb small{color:#ffc870}
/* r380: 패키지 contents as icon + quantity chips (화룡전), built from the existing PKG text - gem part uses the gem icon, named reward uses the package art, ×N items use their existing item icon */
#screen .pkm .pkchs{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}html body #screen .swall:is(#_r1,#_r2,div):is(#_r3,#_r4,div).off{filter:grayscale(1) brightness(.6) drop-shadow(0 2px 2px #0007)!important;opacity:.9;box-shadow:0 2px 0 #222}#screen .swall .swwhy{display:block;font:700 10px/1.2 Maplestory,sans-serif;font-style:normal;color:#fff;opacity:.9;margin-top:2px;text-shadow:0 1px 0 #000}#screen .duntr.lock{opacity:1;filter:saturate(.35) brightness(.85)}#screen .duntr.lock .dtr{opacity:.75}#screen .duntr .dlk{width:auto!important;max-width:84px;margin-left:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;min-width:62px;height:44px;padding:2px 6px;line-height:1}#screen .duntr .dlk img{width:16px;height:16px;object-fit:contain;margin:0 0 1px;position:static}#screen .duntr .dlk b{font-size:11px}#screen .duntr .dlk small{font-size:8.5px;opacity:.85;margin-top:1px;white-space:nowrap}#screen .shpk .pkc{gap:7px}#screen .shpk .pkv{width:70px;height:72px}#screen .shpk .pkv img{height:50px}#screen .shpk .pkr{min-width:70px;padding:6px 7px 6px 12px;font-size:12px}#screen .pkm .pkchs{flex-wrap:nowrap;gap:3px;overflow:hidden}#screen .pkm .pkch{height:20px;padding:0 5px 0 2px;gap:2px;font-size:10px;line-height:20px;border-radius:10px;flex:none}#screen .pkm .pkch img{width:15px;height:15px}#screen .pkch{display:inline-flex;align-items:center;gap:3px;height:22px;padding:0 7px 0 3px;border-radius:11px;background:#00000066;box-shadow:inset 0 0 0 1px #c9953f99;font:800 11px/22px Maplestory,sans-serif;color:#fff3d8;white-space:nowrap}#screen .pkch img{width:18px;height:18px;object-fit:contain;filter:drop-shadow(0 1px 1px #000)}
#screen .dcell>b{white-space:normal;word-break:keep-all;justify-content:center;text-align:center;line-height:12px;padding:0 5px;overflow:hidden}
/* r379: compact merchant header once a shop tab was tapped (화룡전) - bust + one-line bubble, 150 -> 62px */
#screen.shin .shh{height:62px;margin:2px 0 6px;transition:height .18s}#screen.shin .shnp{height:96px;bottom:-40px;left:8px;animation:none}#screen.shin .shbb{left:84px;top:12px;padding:6px 10px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#screen.shin .shbb::before{top:9px}#screen .shc2.sold .shqn,#screen .shc2.sold .shlm{opacity:.6}#screen .shgt small{white-space:nowrap;font-size:10.5px}`;document.head.appendChild(st);
const qd=()=>{if(G.screen!='shop')return;const sb=document.querySelector('#screen .sbody');if(!sb)return;
 sb.querySelectorAll('.ttl').forEach(t=>{if(!t.classList.contains('shgt')&&/^보석 · 골드 상점/.test(t.textContent.trim()))t.classList.add('shgt')});
 {const tt=sb.querySelector(':scope>.ttl.shgt'),gr=tt&&tt.nextElementSibling;if(gr&&!sb.querySelector('.shgk')){/* r378: frame - title / note text read from the existing header */const w=document.createElement('div');w.className='card shpk shgk'+(tt.classList.contains('shhide')?' shhide':'');const nt=(tt.querySelector('small')||{}).textContent||'';w.innerHTML=`<div class=pkst><img src="${A}bg_shop_hall.jpg"><div class=pkt><img src="${A}it2_gem.png"><div><b>보석 · 골드 상점</b><small></small></div></div></div>`;w.querySelector('.pkt small').textContent=nt;tt.before(w);w.appendChild(tt);gr.classList.add('shgg');w.appendChild(gr)}}
 {const dl=sb.querySelector(':scope>.deals');if(dl&&!dl.classList.contains('shdk')){dl.classList.add('shpk','shdk');const tt=dl.querySelector(':scope>.ttl'),w=document.createElement('div');w.className='pkst';w.innerHTML=`<img src="${A}bg_shop_counter.jpg"><div class=pkt><img src="${A}ic_refresh.png"><div><b>일일 특가</b><small>매일 05:00 갱신</small></div></div>`;dl.prepend(w)}}
 {const sc=document.getElementById('screen');sc.classList.toggle('shin',!!G._shIn);sb.querySelectorAll('.shtab2 [data-st]').forEach(e=>e.addEventListener('click',()=>{G._shIn=1;sc.classList.add('shin')}))}
 {const bb=sb.querySelector('.shh .shbb');if(bb&&(G.shT|0)>0&&/특가|싸게/.test(bb.textContent))bb.textContent='어서 오세요, 리나 님!'}/* r380: deal-only merchant lines don't show on the 패키지/보석 tabs (existing line reused) */
 sb.querySelectorAll('.shpk .pkc').forEach(c=>{const m=c.querySelector('.pkm small');if(!m||m.dataset.ch)return;m.dataset.ch=1;const pv=c.querySelector('.pkv img'),IC={'강화석':'it2_stone.png','마정구':'it2_exp.png','소환권':'it2_ticket.png','던전 열쇠':'it3_dungeonkey.png','골드':'it2_gold.png','보석':'it2_gem.png'};const hasGem=!!m.querySelector('img[src*="it2_gem"]');const parts=m.textContent.split('·').map(x=>x.trim()).filter(Boolean);if(!parts.length)return;const box=document.createElement('div');box.className='pkchs';parts.forEach((t,i)=>{const ch=document.createElement('span');ch.className='pkch';const im=document.createElement('img');let tx=t;const q=t.match(/^(.*?)\s*×\s*([\d,]+)$/);if(i==0&&hasGem&&/^[\d,]+$/.test(t)){im.src=A+'it2_gem.png';tx='×'+t}else if(q&&IC[q[1]]){im.src=A+IC[q[1]];tx='×'+q[2];ch.title=q[1]}else{im.src=pv?pv.getAttribute('src'):A+'it2_gem.png'}ch.appendChild(im);ch.appendChild(document.createTextNode(tx));box.appendChild(ch)});m.style.display='none';m.after(box)});
 sb.querySelectorAll('.shc2.sold,.dcell.sold').forEach(c=>{const st=c.querySelector('.shst');if(st&&!st._r){st._r=1;st.innerHTML='<i>구매 완료</i><em>내일 05시 초기화</em>'}const b=c.querySelector('[data-b],[data-deal]');if(b&&b.textContent!=='구매 완료')b.textContent='구매 완료';if(getComputedStyle(c).position==='static')c.style.position='relative'});
 sb.querySelectorAll('[data-b]').forEach(bt=>{const c=bt.closest('.card');if(!c||c.classList.contains('shq'))return;c.classList.add('shq');if(c.querySelector('.shlm'))c.classList.add('shl');const nb=c.querySelector(':scope>b'),im=c.querySelector(':scope>img.ic');if(!nb||!im)return;const tn=nb.firstChild;if(!tn||tn.nodeType!==3)return;const mm=tn.nodeValue.match(/^(.*?)\s*×\s*([\d,]+)\s*$/);if(!mm)return;tn.nodeValue=mm[1];const q=document.createElement('span');q.className='shqn';q.textContent='×'+mm[2];c.appendChild(q);c.style.setProperty('--shw',im.offsetHeight+'px')})};
const os=openScreen;openScreen=function(k){if(k==='shop')G._shIn=0;return os.apply(this,arguments)};const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{qd()}catch(e){console.warn(e)}return r}})();
;(()=>{/* r382 v332: 임무 rows like 화룡전 - progress count sits inside a thicker bar, reward shown as a framed slot, 진행 중 de-emphasised so 받기 rows stand out. Uses only the existing row text; display only */
const st=document.createElement('style');st.textContent=`#panel .mqr .mqb,#panel .mqsum .mqb{position:relative;height:13px;border-radius:7px;overflow:hidden}#panel .mqb>em{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:800 9.5px/13px Maplestory,sans-serif;font-style:normal;color:#fff;text-shadow:0 0 2px #000,0 1px 0 #000;z-index:2}#panel .mqr .mqv>span:first-child.mqin{display:none}#panel .mqr .f{position:relative}#panel .mqr .mqv{position:absolute;right:0;top:-1px;margin:0}#panel .mqr .mqrw{display:inline-flex;align-items:center;gap:2px;padding:1px 7px 1px 3px;border-radius:9px;background:#00000059;box-shadow:inset 0 0 0 1px #c9953f88}#panel .mqr .btn.p.off:not(.mqgo){filter:saturate(.3) brightness(.8);opacity:.85}html body #panel .mqr .btn.off.mqgo{border-image:url(${A}btn_green.png) 30 fill/10px stretch!important;filter:none!important;opacity:1!important;color:#fff!important;pointer-events:auto!important;cursor:pointer;text-shadow:0 1px 0 #0a3a10,0 0 2px #0a3a10}`;document.head.appendChild(st);
const orp=renderPanel;renderPanel=function(){const r=orp.apply(this,arguments);try{if(G.tab=='mission'){const p=document.getElementById('panel');if(p)p.querySelectorAll('.mqr').forEach(row=>{const b=row.querySelector('.mqb'),v=row.querySelector('.mqv>span:first-child');if(!b||!v||b.querySelector('em'))return;const e=document.createElement('em');e.textContent=v.textContent;b.appendChild(e);v.classList.add('mqin')});/* r383: 바로가기 on in-progress rows - navigation only via existing openSheet/openScreen; claim handler untouched for ready rows */const GO={train:()=>openSheet('train'),arena:()=>openScreen('arena'),donate:()=>openScreen('guild'),collect:()=>openScreen('base')};if(p)p.querySelectorAll('.mqr .btn.off[data-m],.mqr .btn.off[data-w]').forEach(bt=>{const k=bt.dataset.m||bt.dataset.w,f=GO[k];if(!f||bt.textContent.trim()!='진행 중')return;bt.textContent='바로가기';bt.classList.add('mqgo');bt.onclick=ev=>{ev.stopPropagation();const x=document.getElementById('sheetClose');if(x&&k!='train')x.click();f()}});
const sm=p&&p.querySelector('.mqsum'),sb=sm&&sm.querySelector('.mqb'),t=sm&&sm.querySelector('.f>b');if(sb&&t&&!sb.querySelector('em')){const m=t.textContent.match(/(\d+\/\d+)/);if(m){const e=document.createElement('em');e.textContent=m[1];sb.appendChild(e)}}}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r383 v333: 캐릭터 상세 (전투력 분석) like 화룡전 - hero art + Lv beside the name/power block and an existing-stat strip (공격력/체력 from C.ATK/C.MAXHP). Display only */
const st=document.createElement('style');st.textContent=`.pwhd{display:flex;align-items:center;gap:8px;margin:2px 0 4px}.pwhd>.pwav{flex:none;width:78px;height:86px;border-radius:12px;background:radial-gradient(circle at 50% 70%,#ffe9b8,#c98a3a 70%,#6a3a14);border:2px solid #e8c070;box-shadow:inset 0 0 0 1px #fff6,0 2px 0 #0008;position:relative;overflow:hidden}.pwhd>.pwav img{position:absolute;left:50%;bottom:-2px;transform:translateX(-50%);height:92px;filter:drop-shadow(0 2px 2px #0008)}.pwhd>.pwav i{position:absolute;left:3px;top:3px;font:900 10px/14px Maplestory,sans-serif;font-style:normal;color:#fff;background:#0009;border-radius:7px;padding:0 5px}.pwhd>.pwcol{flex:1;min-width:0}.pwhd .pwnk,.pwhd .pwbig{text-align:left;justify-content:flex-start}.pwl>.pwr.pwlk{position:relative;cursor:pointer;padding-right:22px!important;margin-bottom:3px;border-radius:8px;background:linear-gradient(90deg,#ffffff14,#ffffff06);box-shadow:inset 0 0 0 1px #c9953f55}.pwl>.pwr.pwlk:active{filter:brightness(1.25)}.pwl>.pwr.pwlk.z{background:#00000033;box-shadow:inset 0 0 0 1px #ffffff1a}.pwl>.pwr .pwar{position:absolute;right:9px;top:50%;width:7px;height:7px;margin-top:-4px;border:solid #ffd08a;border-width:2px 2px 0 0;transform:rotate(45deg)}.pwl>.pwr.z .pwar{border-color:#ffffff66}.pwst{display:flex;gap:6px;margin:4px 0 2px}.pwst span{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;height:22px;border-radius:11px;background:#0006;box-shadow:inset 0 0 0 1px #c9953f88;font:800 11px/22px Maplestory,sans-serif;color:#fff3d8}.pwst span small{font-size:9.5px;color:#ffd08a;font-weight:700}`;document.head.appendChild(st);
const op=G.powOpen;if(!op)return;G.powOpen=function(){const r=op.apply(this,arguments);try{const m=[...document.querySelectorAll('.modal')].pop(),nk=m&&m.querySelector('.pwnk'),bg=m&&m.querySelector('.pwbig');if(nk&&bg&&!m.querySelector('.pwhd')){const h=document.createElement('div');h.className='pwhd';const av=document.createElement('div');av.className='pwav';av.innerHTML='<img src="assets/sd_lina.png" alt=""><i>Lv.'+(C.S().lv|0)+'</i>';const col=document.createElement('div');col.className='pwcol';nk.before(h);h.appendChild(av);h.appendChild(col);col.appendChild(nk);col.appendChild(bg);const sr=document.createElement('div');sr.className='pwst';sr.innerHTML='<span><small>공격력</small>'+fmt(C.ATK())+'</span><span><small>체력</small>'+fmt(C.MAXHP())+'</span>';col.appendChild(sr)}/* r384: bonus source rows open their existing screen (navigation only, numbers untouched) */const bon=(G.powInfo()||{}).bon||[];m&&m.querySelectorAll('.pwl>.pwr').forEach((row,i)=>{const k=bon[i]&&bon[i][3];if(!k||row.dataset.go)return;row.dataset.go=k;row.classList.add('pwlk');const a=document.createElement('i');a.className='pwar';row.appendChild(a);/* r385: still-locked feature -> lock + existing unlock stage (G.UNL / C.stageName), display only */if(G.UNL&&k in G.UNL&&!G.isOpen(k)){row.classList.add('pwlock');const nb=row.querySelector('b');if(nb){const h=document.createElement('em');h.className='pwlh';h.innerHTML='<img src="assets/sk_lock.png" alt="">'+C.stageName(G.UNL[k])+' 개방';nb.appendChild(h)}}row.onclick=()=>{document.querySelectorAll('.modal').forEach(x=>x.remove());menuGo(k)}})}catch(e){console.warn(e)}return r}})();
;(()=>{/* r384 v334: 설정 like 화룡전 - every option row gets a one-line description (what the existing toggle already does), header title on a readable plate without the gear icon overlapping. Display only; toggles/handlers untouched */
const st=document.createElement('style');st.textContent=`#screen .stst .sth{gap:8px;padding:4px 14px 4px 6px;border-radius:18px;background:linear-gradient(90deg,#1a0e08d0,#1a0e0860);box-shadow:inset 0 0 0 1px #ffdf9a40}#screen .stst .sth img{width:30px;height:30px;flex:none;object-fit:contain;position:static;margin:0}#screen .row>.f>small.srd{display:block;font-size:10px;opacity:.7;margin-top:1px;font-weight:600}#screen .tog{overflow:visible}#screen .tog::before{content:'OFF';position:absolute;right:calc(100% + 6px);top:50%;transform:translateY(-50%);font:900 10px/1 Maplestory,sans-serif;color:#b8a898;text-shadow:0 1px 0 #000a;pointer-events:none;letter-spacing:.3px}#screen .tog.on::before{content:'ON';color:#8ff07a}.pwl>.pwr.pwlock>b{display:flex;align-items:center;justify-content:center;gap:4px;white-space:nowrap}.pwl>.pwr.pwlock .pwlh{font:700 9px/1 Maplestory,sans-serif;font-style:normal;color:#ffcf6a;background:#0008;border-radius:7px;padding:2px 5px 2px 3px;display:inline-flex;align-items:center;gap:2px}.pwl>.pwr.pwlock .pwlh img{width:10px;height:10px;object-fit:contain}.pwl>.pwr.pwlock>span{opacity:.45}`;document.head.appendChild(st);
const DS={fx:'스킬 이펙트 연출 표시',cut:'궁극기 사용 시 컷인 연출',shake:'전투 중 화면 흔들림 효과',dmg:'전투 중 피해량 숫자 표시',bubble:'전투 중 캐릭터 말풍선 표시',powpop:'전투력이 바뀌면 알림 표시',story:'스토리 대화 장면 표시'};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='settings'){document.querySelectorAll('#screen .row').forEach(row=>{const t=row.querySelector('[data-set]'),f=row.querySelector('.f');let d=t&&DS[t.dataset.set];if(!d&&row.querySelector('#spd2'))d='전투 진행 속도 (탭하여 변경)';if(!d||!f||f.querySelector('small'))return;const sm=document.createElement('small');sm.className='srd';sm.textContent=d;f.appendChild(sm)})}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r386 v336: 화룡전-style polish. (a) 전투력 분석 성장 추천 cards: existing menuGo links get a chevron affordance + panel look, locked ones show lock + unlock stage (G.UNL). (b) 설정 계정 rows get icons + descriptions like the 게임 section. Display only; handlers untouched */
const st=document.createElement('style');st.textContent=`.pwg>.pwgo>em:not(.pwlh){top:4px!important;right:4px!important}.pwg>.pwgo>small{display:block;white-space:nowrap;font-size:9.5px!important;letter-spacing:-.4px}.pwg>.pwgo{padding:6px 15px 6px 5px!important;background:linear-gradient(180deg,#5a3c22e0,#2e1c10e0)!important;border:1px solid #ffd08a66!important;box-shadow:inset 0 1px 0 #ffffff22,0 2px 0 #0007}.pwg>.pwgo:active{transform:translateY(1px);filter:brightness(1.15)}.pwg>.pwgo>.pwar{position:absolute;right:8px;top:50%;width:7px;height:7px;margin-top:-4px;border:solid #ffd08a;border-width:2px 2px 0 0;transform:rotate(45deg)}.pwg>.pwgo.pwlock{background:linear-gradient(180deg,#3a3430e0,#221e1ae0)!important;border-color:#ffffff30!important}.pwg>.pwgo.pwlock>b,.pwg>.pwgo.pwlock>small{opacity:.55}.pwg>.pwgo.pwlock>.pwar{border-color:#ffffff66}.pwg>.pwgo .pwlh{display:inline-flex;align-items:center;gap:2px;margin-top:3px;font:700 9px/1 Maplestory,sans-serif;font-style:normal;color:#ffcf6a;background:#0008;border-radius:7px;padding:2px 5px 2px 3px;position:static;width:auto;height:auto}.pwg>.pwgo .pwlh img{width:10px;height:10px;object-fit:contain}`;document.head.appendChild(st);
const op=G.powOpen;if(op)G.powOpen=function(){const r=op.apply(this,arguments);try{const m=[...document.querySelectorAll('.modal')].pop();m&&m.querySelectorAll('.pwg>.pwgo').forEach(c=>{if(c.querySelector('.pwar'))return;const a=document.createElement('i');a.className='pwar';c.appendChild(a);const k=c.dataset.k;if(G.UNL&&k in G.UNL&&!G.isOpen(k)){c.classList.add('pwlock');const h=document.createElement('em');h.className='pwlh';h.innerHTML='<img src="assets/sk_lock.png" alt="">'+C.stageName(G.UNL[k])+' 개방';c.appendChild(h)}})}catch(e){console.warn(e)}return r};
const AC=[[r=>r.querySelector('.f>b')&&r.querySelector('.f>b').textContent=='계정 정보','ic3_gallery.png',''],[r=>r.querySelector('#cpn'),'ic3_chest.png','쿠폰 코드를 입력해 등록'],[r=>r.querySelector('#rst'),'ic_refresh.png','']];
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='settings'){document.querySelectorAll('#screen .row').forEach(row=>{for(const [t,ic,d] of AC){if(!t(row))continue;const f=row.querySelector('.f');if(f&&!row.querySelector('.sri')){const im=document.createElement('img');im.className='sri';im.src='assets/'+ic;im.alt='';f.before(im)}if(d&&f&&!f.querySelector('small')){const sm=document.createElement('small');sm.className='srd';sm.textContent=d;f.appendChild(sm)}if(f)f.querySelectorAll(':scope>br').forEach(b=>b.remove());f&&f.querySelectorAll(':scope>small').forEach(s=>{s.style.display='block'})}})}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r387 v337: 업적 banner like 화룡전 - title plate (trophy + 업적의 전당 + the existing caption) and banner pushed clear of the top bar. Display only */
const st=document.createElement('style');st.textContent=`html body #screen .sbody .acst.acx.acx3{height:118px;margin-top:8px}html body #screen .acst.acx3 .accap{display:none}html body #screen .acst.acx3 .acpl{position:absolute;left:10px;top:8px;z-index:3;display:flex;align-items:center;gap:7px;max-width:calc(100% - 20px);padding:3px 12px 3px 4px;border-radius:16px;background:linear-gradient(90deg,#1a0e08d8,#1a0e0860);box-shadow:inset 0 0 0 1px #ffdf9a40}html body #screen .acst.acx3 .acpl img{height:34px;width:auto;filter:drop-shadow(0 2px 2px #000a)}html body #screen .acst.acx3 .acpl b{display:block;font:900 17px/1.1 Maplestory,sans-serif;color:#fff3d0;text-shadow:0 2px 0 #000}html body #screen .acst.acx3 .acpl small{display:block;font-size:9.5px;font-weight:800;color:#ffe0a8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='ach'){const b=document.querySelector('#screen .acst.acx3');if(b&&!b.querySelector('.acpl')){const cap=b.querySelector('.accap');const p=document.createElement('div');p.className='acpl';p.innerHTML='<img src="assets/ac_trophy.png" alt=""><div><b>업적의 전당</b><small></small></div>';p.querySelector('small').textContent=cap?cap.textContent:'';b.appendChild(p)}}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r387 v337b: 칭호 banner like 업적 - title plate (crown + 칭호의 전당), banner clear of the top bar. Display only */
const st=document.createElement('style');st.textContent=`html body #screen .sbody .tthero{height:100px;margin-top:8px}html body #screen .tthero .ttpl{position:absolute;left:10px;top:8px;z-index:3;display:flex;align-items:center;gap:7px;padding:3px 12px 3px 4px;border-radius:16px;background:linear-gradient(90deg,#1a0e08d8,#1a0e0860);box-shadow:inset 0 0 0 1px #ffdf9a40}html body #screen .tthero .ttpl img{height:30px;width:auto;filter:drop-shadow(0 2px 2px #000a)}html body #screen .tthero .ttpl b{font:900 17px/1.1 Maplestory,sans-serif;color:#fff3d0;text-shadow:0 2px 0 #000}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen=='title'){const h=document.querySelector('#screen .tthero');if(h&&!h.querySelector('.ttpl')){const p=document.createElement('div');p.className='ttpl';p.innerHTML='<img src="assets/tt_crown.png" alt=""><b>칭호의 전당</b>';h.appendChild(p)}}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r387 v337c: 도감 banner clear of the top bar (book badge/edge no longer hidden). Display only */const st=document.createElement('style');st.textContent=`html body #screen .sbody .cxst{margin-top:8px}`;document.head.appendChild(st)})();
;(()=>{/* r388 v338: 펫 보너스 grid like 화룡전 - locked pets get a clear grey "미보유" plate (lock icon) and a readable name. Display only */const st=document.createElement('style');st.textContent=`html body #screen .ptc.lock>b{opacity:.85;color:#e8e2d8;text-shadow:0 1px 0 #000}html body #screen .ptc.lock>small{opacity:1;display:inline-flex;align-items:center;gap:2px;margin-top:2px;padding:1px 7px 1px 4px;border-radius:8px;background:linear-gradient(#7a7a82,#45454c);border:1px solid #b4b4bc;box-shadow:0 1px 0 #0009;color:#f4f4f4;font-weight:800;font-size:9.5px;line-height:13px;text-shadow:0 1px 0 #0008}html body #screen .ptc.lock>small::before{content:'';width:10px;height:10px;background:url(assets/sk_lock.png) center/contain no-repeat}`;document.head.appendChild(st)})();
;(()=>{/* r388 v338b: 영지 strip - 마탑 card gets the same status line as the other buildings (Lv.0 → 미건설, otherwise 효과 적용 중; 업그레이드 중 untouched). Display only */const st=document.createElement('style');st.textContent=`html body #screen .bstrip .bsc em.tw388{color:#c8ccd4}html body #screen .bstrip .bsc em.tw388.on{color:#8ff07a}`;document.head.appendChild(st);
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='base')return r;const c=document.querySelector('#screen .bstrip [data-bs=tower]');if(!c||c.querySelector('em'))return r;const b=(C.S().bld||{}).tower;if(!b)return r;c.insertAdjacentHTML('beforeend',b.lv>0?'<em class="tw388 on">효과 적용 중</em>':'<em class=tw388>미건설</em>')}catch(e){console.warn(e)}return r}})();
;(()=>{/* r388 v338c: 마법 상점 - the hero speech bubble no longer repeats the 일일 특가 NPC line right below it (falls back to the existing greeting line). Display only */const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='shop')return r;const a=document.querySelector('#screen .shbb'),d=document.querySelector('#screen .dlbb');if(a&&d&&d.firstChild&&a.textContent.trim()==d.firstChild.textContent.trim())a.textContent='어서 오세요, 리나 님!'}catch(e){console.warn(e)}return r}})();
;(()=>{/* r388 v338d: 파티 편성 보유 동료 grid - unowned companions use the same clear grey "미보유" lock plate as the 펫 grid (card no longer fades as a whole; art greyed instead). Display only */const st=document.createElement('style');st.textContent=`html body #screen .rgrid .rcard:not(.own){opacity:1!important}html body #screen .rgrid .rcard:not(.own)>img:first-child{filter:grayscale(1) brightness(.55)}html body #screen .rgrid .rcard:not(.own)>.rg,html body #screen .rgrid .rcard:not(.own)>.fd{opacity:.5}html body #screen .rgrid .rcard:not(.own)>b{color:#c8ccd4}html body #screen .rgrid .rcard:not(.own)>small{display:inline-flex;align-items:center;gap:2px;padding:1px 7px 1px 4px;border-radius:8px;background:linear-gradient(#7a7a82,#45454c);border:1px solid #b4b4bc;box-shadow:0 1px 0 #0009;color:#f4f4f4!important;font-weight:800;font-size:9.5px;line-height:13px;text-shadow:0 1px 0 #0008;opacity:1}html body #screen .rgrid .rcard:not(.own)>small::before{content:'';width:10px;height:10px;background:url(assets/sk_lock.png) center/contain no-repeat}`;document.head.appendChild(st)})();
;(()=>{/* r389 v339: (0) pre-existing bug: the merchant tap adds .pp (pop-in), which also matched the party-portrait rule .pp{width:44px} and squeezed the bubble into a vertical strip - width restored; (a) 영지 마탑 status line sits on the same baseline as 수확 가능 on its neighbours; (b) tapping the 상점 merchant re-rolls its line without repeating the 일일 특가 NPC line below it (and, off the 일일 특가 tab, without deal-only lines, as r380). Same existing lines only. Display only */
const st=document.createElement('style');st.textContent=`html body #screen .bstrip .bsc em.tw388{margin-top:auto;padding-top:9px}html body #screen .shh .shbb.pp{width:auto;position:absolute}`;document.head.appendChild(st);
const L=['어서 오세요, 리나 님!','오늘의 특가는 05시에 바뀌어요.','강화석이 싸게 들어왔어요!','패키지도 한번 보고 가세요~'];
const fix=()=>{const a=document.querySelector('#screen .shbb');if(!a)return;const d=document.querySelector('#screen .dlbb'),dt=d&&d.firstChild?d.firstChild.textContent.trim():'',off=(G.shT|0)>0;
 const bad=t=>t==dt||(off&&/특가|싸게/.test(t));if(!bad(a.textContent.trim()))return;const ok=L.filter(t=>!bad(t)&&t!=a.textContent.trim());a.textContent=ok.length?ok[Math.floor(Math.random()*ok.length)]:L[0]};
const rs=renderScreen;renderScreen=function(){const r=rs.apply(this,arguments);try{if(G.screen!='shop')return r;const n=document.querySelector('#screen .shnp');if(n&&!n.dataset.r389){n.dataset.r389=1;n.addEventListener('click',()=>{try{fix()}catch(e){}})}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r389 v339b: battle HUD event chip row (#evrow) no longer runs under the right-side 성장/장비 buttons when many chips are up - it keeps clear of the side column (x 62-278, single line so the 증원/대기 pill at y 219 stays clear) by shrinking the row slightly only when it would not fit (measured on chip show/hide/text change via MutationObserver, no per-frame work). Display only */const st=document.createElement('style');st.textContent=`html body #battle #evrow{left:62px;width:216px;transform-origin:50% 50%}html body #battle #evrow>*{flex:none}`;document.head.appendChild(st);
let q=0;const fit=()=>{q=0;const r=document.getElementById('evrow');if(!r)return;r.style.transform='';const v=[...r.children].filter(e=>e.offsetWidth);if(!v.length)return;const w=v[v.length-1].getBoundingClientRect().right-v[0].getBoundingClientRect().left;r.style.transform=w>214?`scale(${(214/w).toFixed(3)})`:''};
const go=()=>{const r=document.getElementById('evrow');if(!r)return setTimeout(go,500);new MutationObserver(m=>{if(!q&&m.some(x=>x.target!==r))q=requestAnimationFrame(fit)}).observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class'],characterData:true});fit()};go()})();
;(()=>{/* r389 v339c: 신규 7일 성장 이벤트 popup gets the same ui_ribbon title plate as the other popups (전투 버프 etc.); subtitle stays under it. Display only */const st=document.createElement('style');st.textContent=`html body .modal.nbm .card.nbc{overflow:visible}html body .modal.nbm .card.nbc>.nbh>b{position:relative;display:flex;align-items:center;justify-content:center;height:58px;margin:-50px -6px 2px;padding:10px 20px 0;background:url(assets/ui_ribbon.png) center/100% 100% no-repeat;color:#ffe6b0;text-shadow:0 1px 2px #000,0 0 6px #000;font-size:16px;white-space:nowrap}`;document.head.appendChild(st)})();
;(()=>{/* r390 v340: 전투 버프 +30분 buttons show their real terms from the v38 code (G.bufClaim): free, 3 claims per buff per day (MAXN=3), and a claim is refused once it would pass the 2-hour cap (CAP=120분) - shown as "무료 N/3" or "최대 누적". 소진 state untouched. No cost exists in code, none shown. Display only */
const st=document.createElement('style');st.textContent=`html body .modal .bfr .pill[data-bf]{flex-direction:column;justify-content:center;line-height:1.1;gap:0}html body .modal .bfr .pill[data-bf]>small.bf390{display:block;font:800 9px 'Noto Sans KR',sans-serif;color:#eaffd8;opacity:.95;margin-top:1px;white-space:nowrap}html body .modal .bfr .pill[data-bf]>small.bf390.cap{color:#ffe08a}`;document.head.appendChild(st);
const MAXN=3,DUR=30*60e3,CAP=120*60e3;
const deco=card=>{const s=C.S(),b=s.buf||{},td=b.day===new Date().toDateString(),now=Date.now();card.querySelectorAll('.pill[data-bf]').forEach(p=>{const k=p.dataset.bf,n=td?((b.n||{})[k]||0):0;let sm=p.querySelector('small.bf390');if(n>=MAXN){if(sm)sm.remove();return}const l=Math.max(0,(b[k]||0)-now),cap=l+DUR>CAP,t=cap?'최대 누적':`무료 ${MAXN-n}/${MAXN}`;if(!sm){sm=document.createElement('small');sm.className='bf390';p.appendChild(sm)}if(sm.textContent!==t)sm.textContent=t;sm.classList.toggle('cap',cap)})};
const ob=G.bufOpen;G.bufOpen=function(){const r=ob.apply(this,arguments);try{const card=[...document.querySelectorAll('.modal .card')].reverse().find(c=>c.querySelector('[data-bf]'));if(card){deco(card);card.addEventListener('click',()=>setTimeout(()=>deco(card),0),true);const iv=setInterval(()=>{if(!document.body.contains(card))return clearInterval(iv);deco(card)},1000)}}catch(e){console.warn(e)}return r}})();
;(()=>{/* r390 v340b: 보스 row (보스/자동 ON/상성/DPS) ran under the 성장 side icon (#sideR left 280, row right 293). Shift row 18px left so it ends ~275, clear of the side column. Display only */
const st=document.createElement('style');st.textContent=`html body #battle .bossrow{margin-left:-18px}`;document.head.appendChild(st)})();
;(()=>{/* r390 v340c: battle XP orbs (body-level .xpo) flew over open popups (e.g. 전투 버프) - same hide rule as r375 sheet/screen now also applies while any .modal or the 메뉴 popup (#menuPop.on) is open; flight timing + HUD bar fill unchanged. Display only */
const st=document.createElement('style');st.textContent=`body:has(.modal) .xpo,body:has(#menuPop.on) .xpo{visibility:hidden}`;document.head.appendChild(st)})();
;(()=>{/* r390 v340d: 설정 - the r2315 "알림/푸시 rows get a bell" regex also caught the in-battle 전투력 변화 알림 toggle, so it alone in the battle-display group (말풍선/스토리 등) carried a bell and an indented title. Hide that stray icon so the group aligns. Push/notice rows keep their bell. Display only */
const st=document.createElement('style');st.textContent=`html body #screen .row:has(>[data-set=powpop])>img.sri{display:none}`;document.head.appendChild(st)})();
;(()=>{/* r391 v341: 메뉴 button red dot - BD.menu and the 친구 writer lit it from features that are still locked (탭 shows only a lock toast). Outermost updateHud pass: keep the dot only if an unlocked menu entry has a real action (same BD/frRed conditions). 오늘의 할 일 chips likewise skip locked entries (patched in v65 list). Display only */
const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const d=document.querySelector('#sidemenu .dot');if(d&&d.style.display!=='none'&&G.isOpen){const B=G.BD||{};const on=MENU.some(([k])=>G.isOpen(k)&&(k=='friend'?(C.frRed&&C.frRed()):B[k]));if(!on)d.style.display='none'}}catch(_){}return r}})();
;(()=>{/* r391 v341b: a locked menu/side entry never shows a red dot, even for the instant between a 1s per-feature writer (탑/승급/펫/도감) and the lock pass. Display only */
const st=document.createElement('style');st.textContent=`html body #mgrid a.lk>.dot,html body .side a.lk>.dot{display:none!important}`;document.head.appendChild(st)})();
;(()=>{/* r391 v341c: 우편함 empty state - the empty-mail card ended at y~520 leaving ~250px of bare backdrop above the nav. With no mail, the card now fills down to the bottom (12px gap) and the envelope + text sit centred in it, like 화룡전's empty 우편함 panel. With mail the layout is unchanged. Display only */
const st=document.createElement('style');st.textContent=`html body #screen .sbody.mail3:has(.mlempty){display:flex;flex-direction:column}html body #screen .sbody.mail3:has(.mlempty)>*{flex:none}html body #screen .sbody.mail3:has(.mlempty)>.card:has(.mlempty){flex:1 1 auto;display:flex;flex-direction:column;margin-bottom:12px;min-height:180px}html body #screen .sbody.mail3 .card>.mgg:has(>.mlempty){flex:1;display:flex;align-items:center;justify-content:center}html body #screen .sbody.mail3 .mgg>.mlempty{margin:auto}`;document.head.appendChild(st)})();
;(()=>{/* r391 v341d: 영지 upgrade card - when the store bar is at 100% (보관 = 한도, so collection has stopped growing) the bar carries a small "가득 참" tag, like 화룡전's full-storage state. Based only on the bar the screen already renders. Display only */
const st=document.createElement('style');st.textContent=`html body #screen .card.bupc .row .bar{position:relative}html body #screen .card.bupc .row .bar:has(>i[style*="width:100%"])::after{content:'가득 참';position:absolute;right:2px;top:50%;transform:translateY(-50%);font:900 9px 'Noto Sans KR',sans-serif;color:#fff;background:#d8381e;border-radius:6px;padding:0 5px;line-height:13px;box-shadow:0 1px 2px #0008}`;document.head.appendChild(st)})();
;(()=>{/* r392 v342 field drops: normal kills already roll 마정구 (BAL.orbDrop, kill() o arg) and 강화석 (3%, S.stone +1) but showed nothing in battle - pop the real dropped item from the enemy, then fly it into its counter (화룡전 style pickup). Display only: shows only what core.kill actually added. Pooled DOM (6 nodes), skipped with fx off / nofx, no glow/bounce on low graphics. */
const C=G.C,R=RENDER,A='assets/';const css=document.createElement('style');css.textContent=`
html body #battle .kdrop{position:absolute;z-index:7;width:30px;height:30px;margin:-15px 0 0 -15px;pointer-events:none;display:none}
html body #battle .kdrop.on{display:block;animation:kdj .5s cubic-bezier(.25,.9,.4,1.25) both}
html body #battle .kdrop img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 0 4px var(--kc)) drop-shadow(0 2px 2px #0009)}
html body #battle .kdrop i{position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:radial-gradient(circle,var(--kc) 0,#0000 68%);opacity:.55;animation:kdg .9s ease-in-out infinite alternate}
html body #battle .kdrop b{position:absolute;left:22px;top:-6px;font:900 11px Maplestory,"Noto Sans KR",sans-serif;color:#fff;-webkit-text-stroke:3px #3a1a5a;paint-order:stroke;white-space:nowrap}
html body #battle .kdrop.fly{animation:none;transition:left .45s cubic-bezier(.6,0,.9,.4),top .45s cubic-bezier(.6,0,.9,.4),transform .45s,opacity .45s;transform:scale(.55);opacity:.3}
html body.tglite #battle .kdrop i{display:none}html body.tglite #battle .kdrop.on{animation-duration:.25s}html body.tglite #battle .kdrop img{filter:drop-shadow(0 2px 2px #0009)}
@keyframes kdj{0%{transform:translate(0,22px) scale(.3);opacity:0}60%{transform:translate(0,-6px) scale(1.15);opacity:1}100%{transform:none;opacity:1}}
@keyframes kdg{from{transform:scale(.8)}to{transform:scale(1.1)}}`;document.head.appendChild(css);
const pool=[];const get=b=>{if(!pool.length)for(let i=0;i<6;i++){const d=document.createElement('div');d.className='kdrop';d.innerHTML='<i></i><img alt=""><b></b>';d._busy=0;pool.push(d)}for(const d of pool)if(!d._busy){if(d.parentNode!==b)b.appendChild(d);return d}return null};
const tgOf=k=>{const q=s=>{const e=document.querySelector(s);return e&&e.offsetParent&&e.getBoundingClientRect().width>0?e:null};return k=='orb'?q('#navroll .cnt')||q('#navroll'):q('#sideenhance')||q('#sidemore')};
const drop=(q,k,n)=>{const b=document.getElementById('battle');if(!b||!q)return;const d=get(b);if(!d)return;const im=k=='orb'?'it2_exp.png':'it2_stone.png';const img=d.children[1];if(!img.src.endsWith(im))img.src=A+im;d.children[2].textContent='+'+n;d.style.setProperty('--kc',k=='orb'?'#c07cff':'#a8c8ff');
 const x=Math.max(20,Math.min(370,q.x+(k=='orb'?-10:10))),y=q.y-38;d._busy=1;d.classList.remove('fly');d.style.left=x+'px';d.style.top=y+'px';d.style.transform='';d.style.opacity='';void d.offsetWidth;d.classList.add('on');
 setTimeout(()=>{const t=tgOf(k),br=b.getBoundingClientRect();if(!t||G.screen){d.classList.remove('on');d._busy=0;return}const r=t.getBoundingClientRect();d.classList.add('fly');d.style.left=(r.left-br.left+r.width/2)+'px';d.style.top=(r.top-br.top+r.height/2)+'px';
  setTimeout(()=>{d.classList.remove('on','fly');d._busy=0;if(k=='orb'){R.onCoin&&R.onCoin('orb')}else G.bump&&G.bump(t,'gbump')},460)},document.body.classList.contains('tglite')?520:900)};
let pst=null;const ok=C.ev.kill;C.ev.kill=function(e,g,o){const r=ok&&ok.apply(this,arguments);try{const s=C.S(),st=s.stone||0,dst=pst==null?0:st-pst;pst=st;
 if(!e||e.boss||e.el||e.wb||e.tg||e.shiny||G.screen||G._fin||G.storyOn||(G.saverState&&G.saverState())||(R.opt&&R.opt.fx===false)||document.body.classList.contains('nofx'))return r;
 const q0=R._ES&&R._ES().get(e),q=q0&&{x:q0.x,y:q0.y};if(o>0)drop(q,'orb',o);if(dst===1)setTimeout(()=>drop(q,'stone',1),o>0?90:0)}catch(_){}return r};
})();
;(()=>{/* r393 v343 skill-name tag: with 궁극기 컷인 off (or when the cut-in is skipped because another one is playing / on cooldown) nothing named the skill that just fired. A small pooled tag (skill icon + name) pops above the caster - Lina's spells (C.ev.spell) and companion ultimates (v33 gauge, G.ultN). Skipped when that cast's own cut-in is on screen, with 스킬 연출 (fx) off / nofx, on other screens. Low graphics: no pop/glow animation. Display only. */
const C=G.C,R=RENDER,A='assets/';const css=document.createElement('style');css.textContent=`
html body #battle .sktag{position:absolute;z-index:9;display:none;align-items:center;gap:3px;height:20px;padding:0 7px 0 3px;border-radius:10px;background:linear-gradient(#2a1a3ef0,#140c22f0);border:1.5px solid var(--sc,#ffd77a);box-shadow:0 0 6px var(--sc,#ffd77a),0 2px 3px #0008;transform:translate(-50%,-100%);pointer-events:none;white-space:nowrap}
html body #battle .sktag.on{display:flex;animation:sktI 1.25s ease-out both}
html body #battle .sktag img{width:16px;height:16px;object-fit:contain}
html body #battle .sktag b{font:900 11px/1 Maplestory,"Noto Sans KR",sans-serif;color:#fff6d8;text-shadow:0 1px 0 #000}
html body #battle .sktag.bfd{opacity:.15!important;transition:opacity .15s}
html body.tglite #battle .sktag{box-shadow:0 2px 3px #0008}html body.tglite #battle .sktag.on{animation:sktL 1.25s step-end both}
@keyframes sktI{0%{opacity:0;transform:translate(-50%,-60%) scale(.6)}12%{opacity:1;transform:translate(-50%,-100%) scale(1.08)}20%{transform:translate(-50%,-100%) scale(1)}80%{opacity:1;transform:translate(-50%,-100%)}100%{opacity:0;transform:translate(-50%,-150%)}}
@keyframes sktL{0%{opacity:1}100%{opacity:0}}`;document.head.appendChild(css);
const pool=[];const tag=(key,name,icon,col)=>{try{if(G.screen||G._fin||G.storyOn||(R.opt&&R.opt.fx===false)||document.body.classList.contains('nofx'))return;const b=document.getElementById('battle'),s=R._AS&&R._AS().get(key);if(!b||!s||!name)return;
 if(!pool.length)for(let i=0;i<4;i++){const d=document.createElement('div');d.className='sktag';d.innerHTML='<img alt=""><b></b>';d._k=null;d._t=0;d._x=d._y=-999;d._w=0;d._bf=false;d.addEventListener('animationend',()=>d.classList.remove('on'));pool.push(d)}
 const now=performance.now();let d=pool.find(x=>x._k===key&&now-x._t<1250)||pool.find(x=>now-x._t>=1250)||pool.reduce((a,x)=>x._t<a._t?x:a);
 if(d.parentNode!==b)b.appendChild(d);d._k=key;d._t=now;const im=d.firstChild;if(icon){if(!im.src.endsWith(icon))im.src=A+icon;im.style.display=''}else im.style.display='none';d.lastChild.textContent=name;d.style.setProperty('--sc',col||'#ffd77a');
 d.classList.remove('on','bfd');d._bf=false;d._x=d._y=-999;d._w=0;requestAnimationFrame(()=>requestAnimationFrame(()=>{try{if(d._t!==now)return;place(d,s,b,now)}catch(_){}}))}catch(_){}};
/* r394: placed 2 frames later (after the speech bubble of the same cast has its position) and kept clear of other tags, live speech bubbles and the 정예 출현 plaque (canvas, CY 378 → y 341-415, x 75-315) */
const elOn=()=>R.elT&&R.elT.t<1.6;const OB=[];const place=(d,s,b,now)=>{const tx=Math.max(50,Math.min(340,s.x)),w=d.offsetWidth||90;let ty=s.y-112;OB.length=0;if(elOn())OB.push([75,341,315,415]);const br=b.getBoundingClientRect();document.querySelectorAll('#bubL .bub:not(.out)').forEach(u=>{const r=u.getBoundingClientRect();if(r.width)OB.push([r.left-br.left,r.top-br.top,r.right-br.left,r.bottom-br.top])});pool.forEach(x=>{if(x!==d&&x.classList.contains('on')&&x._x>-999)OB.push([x._x-x._w/2,x._y-20,x._x+x._w/2,x._y])});for(let n=0;n<8;n++){const o=OB.find(o=>tx-w/2<o[2]&&tx+w/2>o[0]&&ty-20<o[3]&&ty>o[1]);if(!o)break;ty=o[1]-2}ty=Math.max(150,ty);d._x=tx;d._y=ty;d._w=w;d.style.left=tx+'px';d.style.top=ty+'px';void d.offsetWidth;d.classList.add('on')};
const os=C.ev.spell;C.ev.spell=function(sp){const r=os&&os.apply(this,arguments);try{if(sp&&sp.n&&!(R.cut&&R.cut.t<.2&&R.cut.n===sp.n))tag('lina',sp.n,sp.img,'#ffb35a')}catch(_){}return r};
let un=G.ultN||0;const of=R.frame;R.frame=dt=>{of(dt);if(pool.length){const e=elOn(),TX=R._TX?R._TX():null;for(let i=0;i<pool.length;i++){const x=pool[i];let f=!!(e&&x._y>341&&x._y-20<415&&x._x+x._w/2>75&&x._x-x._w/2<315);/* r395: also fades under a live big crit burst (number + star + CRITICAL caption, box x±75, baseline-56..+10), like bubbles under banners; no allocation */if(!f&&TX&&x._x>-999&&x.classList.contains('on'))for(let j=0;j<TX.length;j++){const t=TX[j];if(!t.crit||t.label||t.t>=t.life)continue;const k=Math.min(1,t.t/t.life*1.2),uy=t.y-k*(2-k)*(t.nr?8:38);if(Math.abs(t.x-x._x)<75+x._w/2&&x._y>uy-56&&x._y-20<uy+10){f=true;break}}if(x._bf!==f){x._bf=f;x.classList.toggle('bfd',f)}}}if(G.ultN!==un){un=G.ultN;try{const nm=G.lastUlt,CS=D.CSKI||{};const k=Object.keys(CS).find(x=>CS[x][1]===nm);if(k&&!(R.ccut&&R.ccut.t<.6&&R.ccut.k===k)&&!(R.ccQ&&R.ccQ.k===k)){const cp=(D.COMPS||[]).find(x=>x.k==k);tag(k,nm,CS[k][0],cp&&D.RAR&&(D.RAR[cp.g]||{}).c)}}catch(_){}}};
})();
;(()=>{/* r399 장비 doll slot frames (display only): grade-tinted fill + black keyline + inner bevel + top grade gem, matching the r361 소환 card frames (화룡전 slots read their grade from the tile fill, not only a thin outline). CSS only; --rc is the existing grade colour on each .eq */
const st=document.createElement('style');st.textContent=`.eqgrid.doll .eq{background:radial-gradient(circle at 50% 36%,color-mix(in srgb,var(--rc,#888) 34%,#2e2a22),#18150f 80%) padding-box!important;box-shadow:0 0 0 1px #0b0d0f,inset 0 0 0 1px #ffffff2e,inset 0 -12px 14px #0009,0 0 7px color-mix(in srgb,var(--rc,#888) 45%,transparent)!important}
.eqgrid.doll .eq::before{content:'';position:absolute;left:50%;top:-6px;width:9px;height:9px;margin-left:-6px;transform:rotate(45deg);background:linear-gradient(135deg,color-mix(in srgb,var(--rc,#888) 35%,#fff),var(--rc,#888));border:2px solid #0b0d0f;border-radius:2px;z-index:2;pointer-events:none}`;document.head.appendChild(st)})();
;(()=>{/* r400 마정구 뽑기 panel + its result rows (display only): same framed language as the r399 doll slots / r361 소환 cards - dark framed card with black keyline + gold inner line, cream ribbon header, grade-tinted 착용 중/NEW compare cards and item tiles with the top grade gem, grade-tinted filter chips, and grade-framed 일괄 장착 결과 tiles. CSS only, no new nodes */
const st=document.createElement('style');st.textContent=`#sheet .card.mjc,.card.mjc{background:linear-gradient(#2c1e12,#160d07)!important;border:2px solid #0b0d0f!important;border-color:#0b0d0f!important;box-shadow:inset 0 0 0 1px #c9953f77,inset 0 10px 18px #ffffff0a!important;border-radius:12px!important;padding-top:4px!important}
.card.mjc>.ttl{position:relative;isolation:isolate;justify-content:center!important;margin:0 0 8px!important;padding:3px 0!important;font-weight:900;color:#2a2014!important;background:none!important;text-shadow:none!important}
.card.mjc>.ttl::before{content:'';position:absolute;z-index:-1;left:13%;right:13%;top:0;bottom:0;background:linear-gradient(90deg,#0000,#cdb88e 12%,#e3d2a8 50%,#cdb88e 88%,#0000);clip-path:polygon(3% 10%,100% 0,97% 90%,0 100%);pointer-events:none}
.card.mjc>.ttl small{position:absolute;right:2px;top:50%;transform:translateY(-50%);color:#ffe9b0!important;font-weight:900;text-shadow:0 1px 0 #000}
.card.mjc .chip{background:linear-gradient(color-mix(in srgb,currentColor 16%,#2a1a10),#140a06)!important;border:1px solid color-mix(in srgb,currentColor 55%,#0b0d0f)!important;box-shadow:0 0 0 1px #0b0d0f,inset 0 1px 0 #ffffff1a!important;text-shadow:0 1px 0 #000}
.card.mjc .chip.on{background:linear-gradient(color-mix(in srgb,currentColor 48%,#2a1a10),color-mix(in srgb,currentColor 22%,#140a06))!important;border-color:currentColor!important;box-shadow:0 0 0 1px #0b0d0f,0 0 8px color-mix(in srgb,currentColor 75%,transparent),inset 0 0 0 1px #ffffff55!important;font-weight:900;text-shadow:0 1px 0 #000,0 0 4px #000}
.cmpwrap .cmpc{background:linear-gradient(color-mix(in srgb,var(--rc,#555) 22%,#1b2228),#121619 70%)!important;border:2px solid #0b0d0f!important;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--rc,#555) 55%,#ffffff22),0 0 8px color-mix(in srgb,var(--rc,#555) 30%,transparent)!important}
.cmpwrap .cmpc .eq,.mjr{background:radial-gradient(circle at 50% 36%,color-mix(in srgb,var(--rc,#888) 34%,#2e2a22),#18150f 80%) padding-box!important;box-shadow:0 0 0 1px #0b0d0f,inset 0 0 0 1px #ffffff2e,inset 0 -12px 14px #0009,0 0 7px color-mix(in srgb,var(--rc,#888) 45%,transparent)!important}
.cmpwrap .cmpc .eq::before,.mjr::before{content:'';position:absolute;left:50%;top:-6px;width:9px;height:9px;margin-left:-6px;transform:rotate(45deg);background:linear-gradient(135deg,color-mix(in srgb,var(--rc,#888) 35%,#fff),var(--rc,#888));border:2px solid #0b0d0f;border-radius:2px;z-index:2;pointer-events:none}
.skn.mjr{position:relative;flex:initial;border:3px solid var(--rc,#888)!important;border-radius:10px!important;padding:8px 4px 6px!important;margin-top:6px}
.skn.mjr small{display:block;color:#fff;font-weight:900;text-shadow:0 1px 0 #000}
.skn.mjr b{display:block;font-size:10px;color:var(--rc,#888);text-shadow:0 1px 0 #000}`;document.head.appendChild(st)})();
;(()=>{/* r400: the 마정구 뽑기 보유 count and the greyed 뽑기 buttons were baked at sheet render, so orbs dropped by kills while the 장비 sheet was open still read 보유 0 with grey buttons (nav badge already showed the new count). Refresh just that text node + the visual .off class on HUD ticks, only when the value changes; handlers already re-check orbs, so display only */
let lo=-1,lk='';const ou=updateHud;updateHud=function(){const r=ou.apply(this,arguments);try{const c=document.querySelector('.card.mjc>.ttl small');if(c){const s=C.S(),n=s.orbs||0,k=n+'|'+!!G.autoRolling+'|'+!!s.bag;if(c!==lk.el||k!==lk.k){const t=c.lastChild;if(t&&t.nodeType===3)t.nodeValue=' '+fmt(n);const off=n<1||G.autoRolling||!!s.bag;for(const id of ['roll','rollEq']){const e=document.getElementById(id);if(e)e.classList.toggle('off',off)}lk={el:c,k}}}}catch(_){}return r}})();
;(()=>{/* r401 (display only): (a) the auto-roll stop target is S.filter (C.fresh() default 3 = 영웅+, merged on load, so it is never unset); a save whose filter is outside the grade list (e.g. 99 from the sim harness) never stops on grade, so it now shows an extra lit, non-clickable '정지 없음' chip instead of no highlighted chip at all. (b) 일괄 장착 결과 shows a 판매 내역 row with the real per-grade sold counts. */
const st=document.createElement('style');st.textContent=`.card.mjc .chip.mjnf{color:#ffe9b0!important;cursor:default;pointer-events:none}
.mjsr{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:5px;margin:-2px 0 8px}
.mjsr small{color:#cdb88e;font-weight:900;margin-right:2px}
.mjs{font-size:11px;font-weight:900;color:var(--rc);padding:2px 8px;border-radius:9px;background:linear-gradient(color-mix(in srgb,var(--rc) 22%,#2a1a10),#140a06);border:1px solid color-mix(in srgb,var(--rc) 60%,#0b0d0f);box-shadow:0 0 0 1px #0b0d0f;text-shadow:0 1px 0 #000}
.mjs b{color:#fff}`;document.head.appendChild(st)})();
;(()=>{const st=document.createElement('style');st.textContent=`.skn.mjr .mjx{position:absolute;right:3px;top:3px;font-style:normal;font-size:10px;font-weight:900;color:#fff;background:#0b0d0fcc;border:1px solid var(--rc,#888);border-radius:7px;padding:0 4px;line-height:14px}`;document.head.appendChild(st)})();
;(()=>{/* r402 자동 뽑기 stop summary (display only): one pooled .modal node reused for every stop (detached on close, re-attached on the next stop), same 일괄 장착 결과 styling (.skg/.skn.mjr tiles, .mjsr 판매 내역 pills). Shows real counts from autoRoll.T: rolls, equips (final item per slot + ×N), sold by grade + gold, the stop item that reached the target grade (still in the bag for 장착/판매), and 전투력 before/after. Falls back to the old toast when nothing was rolled */
let el=null;const A='assets/';autoRoll.sum=(T,w)=>{if(!el){el=document.createElement('div');el.className='modal arsum';el.onclick=e=>{if(e.target.closest('.btn')||e.target===el)el.remove()}}/* detached (not hidden) on close so the many document.querySelector('.modal') busy-checks stay accurate; the node itself is reused */
const byS={},byC={};T.eq.forEach(x=>{byS[x.slot]=x;byC[x.slot]=(byC[x.slot]||0)+1});const sold=T.sr.reduce((a,b)=>a+(b||0),0);const sl=k=>(D.SLOTS.find(q=>q.k==k)||{});
const tile=(x,tag)=>`<div class="skn mjr${tag?' argot':''}" style="--rc:${(D.RAR[x.r]||{c:'#888'}).c}"><img src="${A}${sl(x.slot).img||''}" style="height:44px"><small>${x.name||x.slot}</small><b>${(D.RAR[x.r]||{n:''}).n} · Lv.${x.lv}</b>${tag?`<i class=mjx>${tag}</i>`:byC[x.slot]>1?`<i class=mjx>×${byC[x.slot]}</i>`:''}</div>`;
const hd=w=='stop'?'목표 등급 획득!':w=='empty'?'마정구 소진':'자동 뽑기 정지';
el.innerHTML=`<div class=card><div class=ttl style="justify-content:center;font-size:18px">자동 뽑기 결과</div><div class=arwhy>${hd}</div><div style="text-align:center;margin:8px 0">${T.n}회 뽑기 · <b class=up>장착 ${T.eq.length}</b> · 판매 ${sold} (<img class=ci src=assets/it2_gold.png>${fmt(T.gold)})</div>${sold?`<div class=mjsr><small>판매 내역</small>${D.RAR.map((r,i)=>T.sr[i]?`<span class=mjs style="--rc:${r.c}">${r.n} <b>${T.sr[i]}</b></span>`:'').join('')}</div>`:''}${T.got?`<div class=mjsr><small>목표 등급 획득 (가방)</small></div><div class="skg argotw">${tile(T.got,'NEW')}</div>`:''}${w=='user'&&C.S().bag?`<div class=mjsr><small>미처리 (가방 · 장착/판매 대기)</small></div><div class="skg argotw">${tile(C.S().bag,'가방')}</div>`:''}${T.eq.length?`${T.got||w=='user'&&C.S().bag?'<div class=mjsr><small>장착</small></div>':''}<div class=skg>${Object.values(byS).map(x=>tile(x)).join('')}</div>`:''}<div style="text-align:center;margin-top:8px">전투력 ${fmt(T.p0)} ▶ <b class=up>${fmt(C.POW())}</b></div><span class="btn wide" style="margin-top:12px">확인</span></div>`;
if(el.parentNode!==$('#app'))$('#app').appendChild(el)};
const st=document.createElement('style');st.textContent=`.arsum .arwhy{text-align:center;font-weight:900;color:#ffd25a;text-shadow:0 1px 0 #000;margin-top:2px}
.arsum .argotw{grid-template-columns:96px;justify-content:center;margin-bottom:8px}
.arsum .argot .mjx{color:#fff;background:#d23a2a;border-color:#0b0d0f}`;document.head.appendChild(st)})();
;(()=>{/* r403: live 'N회 · 장착 N' on the running 자동 뽑기 button, from the r402 autoRoll.T tally; the gear panel is already rebuilt by the autoRoll tick that changes the tally, so the text is part of that render (no extra timer/DOM) */const st=document.createElement('style');st.textContent=`#auto{flex-wrap:wrap;justify-content:center}#auto .arlive{flex-basis:100%;text-align:center;font-size:11px;font-weight:900;color:#ffe9b0;text-shadow:0 1px 0 #000;margin-top:1px}`;document.head.appendChild(st)})();
;(()=>{/* r403 동료 상세 (display only): (a) the 고유 마법 row repeated the skill box subtitle word for word right above it - hidden when identical (kept if a future skill line differs); (b) portrait gets the same black keyline + light inner line + bottom shade as the r399 doll slots / r400 cards */
const oc=compDetail;compDetail=function(){const r=oc.apply(this,arguments);try{const m=[...document.querySelectorAll('.modal')].pop(),sk=m&&m.querySelector('.cxk small');if(sk)m.querySelectorAll('.srow2').forEach(w=>{const a=w.firstElementChild,b=w.lastElementChild;if(a&&b&&a.textContent.trim()=='고유 마법'&&b.textContent.trim()==sk.textContent.trim())w.classList.add('cddup')})}catch(_){}return r};
const st=document.createElement('style');st.textContent=`.cdet .srow2.cddup{display:none}
.cdet .cdimg{box-shadow:0 0 0 2px #0b0d0f,inset 0 0 0 1px #ffffff40,inset 0 -18px 20px #0008,0 0 10px color-mix(in srgb,var(--rc,#888) 45%,transparent)}`;document.head.appendChild(st)})();

;(()=>{/* r404 display-only: 장비 세트 효과 header (title centred, caption pinned right, no overlap), 특성 column n/5 + affordable/insufficient next-node cost, 코스튬 name wrap + owned count */
const st=document.createElement('style');st.textContent=`
#sheet .card.gsc>.ttl,.card.gsc>.ttl{align-self:stretch;position:relative;display:block!important;text-align:center;padding:0 2px;min-height:18px}
.card.gsc>.ttl>small{position:absolute;right:4px;top:50%;transform:translateY(-50%);margin:0!important;font-size:10px;opacity:.8;white-space:nowrap}
.tlc>u.tlq{display:inline-block;text-decoration:none;margin:2px auto 4px;padding:0 7px;border-radius:8px;background:#0009;border:1px solid var(--c);color:#fff;font:900 10px Maplestory,sans-serif}
.tln .cs.ok{background:#1d5a1d;border-color:#7dff7d;color:#d8ffd8}
.tln .cs.no{background:#5a1010;border-color:#ff6a6a;color:#ffd0d0}
.tln.nx.poor .o{animation:none;opacity:.85}
body.nofx .tln.nx .o,body.tglite .tln.nx .o{animation:none}
.skn b{word-break:keep-all;overflow-wrap:anywhere}
.ttl>small.skcnt{float:right;font-size:10px;opacity:.85;margin-top:2px}`;document.head.appendChild(st)})();

;(()=>{/* r405 특성 node detail popup (UI flow only): tap → pooled .modal.tlpop (detached on close) showing tier, this node's effect, path total now → after, cost vs points; 습득 button runs the ORIGINAL node handler (C.talUp unchanged); learned/locked/short → disabled button with reason */
const st=document.createElement('style');st.textContent=`
.modal.tlpop>.card{width:300px;max-width:86vw;text-align:center;border:3px solid var(--c,#c9953f)!important;padding:14px 14px 12px!important;position:relative}
.tlpop .tpi{width:66px;height:66px;margin:4px auto 6px;border-radius:50%;border:3px solid var(--c);background:radial-gradient(#fff8,var(--c) 60%,#0008);display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px var(--c)}
.tlpop .tpi img{width:40px;height:40px;object-fit:contain}
.tlpop.lk .tpi{filter:grayscale(1) brightness(.7);box-shadow:none}
.tlpop .tpn{font:900 17px Maplestory,sans-serif;color:#fff;text-shadow:0 2px 0 #000}
.tlpop .tpb{font:900 11px Maplestory,sans-serif;color:var(--c);margin-top:2px}
.tlpop .tps{display:inline-block;margin:6px 0 4px;padding:1px 9px;border-radius:9px;font:900 11px Maplestory,sans-serif;background:#0009;border:1px solid #fff5;color:#fff}
.tlpop .tps.on{border-color:#7dff7d;color:#bfffbf}.tlpop .tps.can{border-color:#ffe27a;color:#ffe27a}.tlpop .tps.no,.tlpop .tps.lk{border-color:#ff7a7a;color:#ffc0c0}
.tlpop .tpr{display:flex;justify-content:space-between;align-items:center;background:#0006;border-radius:8px;padding:6px 10px;margin-top:5px;font:800 12px Maplestory,sans-serif;color:#ddd}
.tlpop .tpr b{color:#fff}.tlpop .tpr b.up{color:#7dff7d}.tlpop .tpr b.no{color:#ff8a8a}.tlpop .tpr em{font-style:normal;color:#aaa;margin:0 5px}
.tlpop .tpbt{display:flex;gap:8px;margin-top:12px}.tlpop .tpbt .btn{flex:1;margin:0!important}
.tlpop .btn.dis{filter:grayscale(1) brightness(.75);pointer-events:none}.tlpop .btn.tpc{pointer-events:auto}
.tlpop .tpx{font-size:10px;color:#ffc0c0;margin-top:5px;min-height:12px}
@keyframes tlpi{from{transform:scale(.9);opacity:.4}to{transform:none;opacity:1}}
.modal.tlpop>.card{animation:tlpi .16s ease-out}body.nofx .modal.tlpop>.card,body.tglite .modal.tlpop>.card{animation:none}`;document.head.appendChild(st);
let M=null,cur=null;const pc=v=>Math.round(v*100);
const close=()=>{if(M&&M.parentNode)M.remove();cur=null};
const build=()=>{M=document.createElement('div');M.className='modal tlpop';M.innerHTML='<div class=card><div class=tpi><img alt=""></div><div class=tpn></div><div class=tpb></div><span class=tps></span><div class="tpr r1"><span>이 노드 효과</span><b></b></div><div class="tpr r2"><span></span><span><b class=a></b><em>▶</em><b class="b up"></b></span></div><div class="tpr r3"><span>필요 포인트</span><span><b class=c></b><em>/</em><b class=d></b></span></div><div class=tpx></div><div class=tpbt><span class="btn p tpc">닫기</span><span class="btn g tpo">습득</span></div></div>';
 M.onclick=e=>{if(e.target==M||e.target.closest('.tpc'))return close();if(e.target.closest('.tpo')&&cur){const f=cur;close();f()}};
 return M};
G.tlWrap=(el,orig)=>()=>{try{const k=el.dataset.tl,i=+el.dataset.i,s=C.S(),n=(s.tal||{})[k]||0,b=C.TAL.find(x=>x.k==k),P=C.talPts(),cs=C.TALC[i],on=i<n,nx=i==n,ok=nx&&P>=cs;
 if(!M)build();const q=x=>M.querySelector(x);M.style.setProperty('--c',b.c);M.classList.toggle('lk',!on&&!nx);
 q('.tpi img').src=(el.querySelector('.o img')||{}).src||'';q('.tpn').textContent=b.nm[i];q('.tpb').textContent=b.n+' · '+(i+1)+'단계 / '+b.v.length;
 const t=q('.tps');t.className='tps '+(on?'on':ok?'can':nx?'no':'lk');t.textContent=on?'습득 완료':ok?'습득 가능':nx?'포인트 부족':'잠김';
 q('.r1 b').textContent=b.d+' +'+pc(b.v[i])+'%';
 const now=C.talB(k);q('.r2>span').textContent=b.n+' 합계';q('.r2 .a').textContent=b.d+' +'+pc(now)+'%';
 const sh=nx;q('.r2 em').style.display=q('.r2 .b').style.display=sh?'':'none';q('.r2 .b').textContent='+'+pc(now+b.v[i])+'%';
 q('.r3').style.display=on?'none':'';q('.r3 .c').textContent='보유 '+P+'P';q('.r3 .c').className='c '+(P>=cs?'up':'no');q('.r3 .d').textContent='필요 '+cs+'P';
 q('.tpx').textContent=on?'이미 습득한 노드입니다':ok?'':nx?'포인트가 '+(cs-P)+'P 부족해요 · 스테이지 3개 클리어마다 +1':'아래 단계('+b.nm[n]+')를 먼저 습득하세요';
 const o=q('.tpo');o.classList.toggle('dis',!ok);o.textContent=ok?'습득 ('+cs+'P)':on?'습득 완료':nx?'포인트 부족':'잠김';
 cur=ok?orig:null;$('#app').appendChild(M)}catch(e){orig()}};
})();

;(()=>{/* r405 특성 합계 chips (display only, same C.talB values) */const st=document.createElement('style');st.textContent=`
#screen .card.tlsum{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;padding:7px 8px!important}
.tlsum .tlsl{font:900 11px Maplestory,sans-serif;color:#ffe7a8;margin-right:2px}
.tlsum .tlsc{display:inline-flex;align-items:center;gap:3px;padding:2px 9px;border-radius:10px;background:#0009;border:1.5px solid var(--c);color:#ddd;font:800 11px Maplestory,sans-serif}
.tlsum .tlsc b{color:var(--c);font-weight:900}`;document.head.appendChild(st)})();

;(()=>{/* r406 특성 header progress (display only). Mirrors core.js C.talPts exactly: earned=floor(maxSi/3), spent=Σ C.TALC[i] for learned tiers; maxSi only advances on a new-stage boss clear (core.js 78) and stops at D.FIELDS.length-1 */
G.tlInfo=()=>{const s=C.S(),t=s.tal||{},m=s.maxSi||0,E=Math.floor(m/3);let U=0,ALL=0;C.TAL.forEach(b=>{for(let i=0;i<(t[b.k]||0);i++)U+=C.TALC[i];for(let i=0;i<b.v.length;i++)ALL+=C.TALC[i]});
 const nxt=3*(E+1),last=D.FIELDS.length-1,cap=nxt>last;return{m,E,U,P:C.talPts(),ALL,prog:m-3*E,left:nxt-m,cap,full:U>=ALL}};
G.tlHdr=()=>{const I=G.tlInfo();const nx=I.full?'<span class=tlnf>모든 특성 습득 완료</span>':I.cap?'<span class=tlnf>최종 스테이지 도달 · 추가 포인트 없음</span>':`<span class=tlnl>다음 포인트까지 스테이지 <b>${I.left}</b>개</span><span class=tlnb>${[0,1,2].map(i=>`<i class="${i<I.prog?'on':''}"></i>`).join('')}</span><span class=tlnn>${I.prog}/3</span>`;
 return `<div class=tlnx>${nx}</div><div class=tlsp>사용 <b>${I.U}</b> / 획득 <b>${I.E}</b>P<span class=tlsa>전체 습득 ${I.ALL}P</span></div>`};
const st=document.createElement('style');st.textContent=`
.tlh .tlnx{display:flex!important;align-items:center;gap:5px;margin-top:5px;font:800 10.5px Maplestory,sans-serif;color:#ddd}
.tlh .tlnx b{color:#ffe27a}.tlh .f .tlnx b,.tlh .f .tlsp b{display:inline!important}
.tlh .tlnb{display:inline-flex;gap:2px}.tlh .tlnb i{width:16px;height:7px;border-radius:3px;background:#0009;border:1px solid #ffe27a88}.tlh .tlnb i.on{background:linear-gradient(#ffe9a0,#e0a020);border-color:#ffe27a}
.tlh .tlnn{color:#ffe27a;font-weight:900}.tlh .tlnf{color:#bfffbf}
.tlh .tlsp{display:block!important;margin-top:3px;font:800 10.5px Maplestory,sans-serif;color:#ccc}.tlh .tlsp b{color:#fff}
.tlh .tlsa{margin-left:6px;padding:0 6px;border-radius:7px;background:#0007;color:#aaa;font-size:9.5px}`;document.head.appendChild(st)})();

;(()=>{/* r407 특성 path hint (display only): next tier's real effect (C.TAL v[n]) and cost (C.TALC[n]) per path; no reset/refund */
G.tlNext=(b,n,P)=>{if(n>=b.v.length)return `<div class="tlnh done">모두 습득</div>`;const cs=C.TALC[n],ok=P>=cs;return `<div class="tlnh ${ok?'ok':'no'}"><span>다음 · ${b.nm[n]}</span><b>${b.d} +${Math.round(b.v[n]*100)}%</b><em>${cs}P${ok?'':' (부족 '+(cs-P)+'P)'}</em></div>`};
const st=document.createElement('style');st.textContent=`
.tlc>.tlnh{margin:0 3px 6px;padding:3px 2px 4px;border-radius:8px;background:#0008;border:1px solid var(--c);font:800 9.5px Maplestory,sans-serif;color:#ccc;line-height:1.25;text-align:center}
.tlc>.tlnh span,.tlc>.tlnh b,.tlc>.tlnh em{display:block;font-style:normal;white-space:nowrap}
.tlc>.tlnh b{color:var(--c);font-size:11px;font-weight:900}
.tlc>.tlnh.ok em{color:#9dff9d}.tlc>.tlnh.no em{color:#ff9a9a}.tlc>.tlnh.done{color:#bfffbf}`;document.head.appendChild(st)})();

;(()=>{/* r407 임무 모두 받기 source caption (display only): the button claims daily+weekly together (G.missionClaimAll), so show where the pooled count comes from */
const st=document.createElement('style');st.textContent=`.mcall{position:relative}.mcall>em.mqsrc{position:absolute;left:0;right:0;bottom:-13px;text-align:center;font:800 9px Maplestory,sans-serif;font-style:normal;color:#ffe7a8;text-shadow:0 1px 0 #000;white-space:nowrap;pointer-events:none}.card.mqsum{padding-bottom:16px!important}`;document.head.appendChild(st)})();
;(()=>{const st=document.createElement('style');st.textContent=`#panel .mqsum .f>b{display:flex;align-items:center;gap:5px}#panel .mqsum u.mqrd{text-decoration:none;font:800 9.5px/15px Maplestory,sans-serif;color:#fff;background:#d02a2a;border-radius:8px;padding:0 6px;white-space:nowrap}#panel .mqsum .mqb>i{z-index:1}#panel .mqsum .mqb>i.mqrdb{z-index:0;border-image-source:url(assets/sld_fill_green_s.png);opacity:.6}body:not(.tglite):not(.nofx) #panel .mqsum .mqb>i.mqrdb{animation:mqrdp 1.4s ease-in-out infinite}@keyframes mqrdp{50%{opacity:.85}}`;document.head.appendChild(st)})();
;(()=>{/* r409: group repeated non-numeric reward cells (칭호/코스튬) into one expandable cell; display only */
const st=document.createElement('style');st.textContent=`.rwpop .rwi{max-height:calc(100vh - 300px);overflow-y:auto;overscroll-behavior:contain}.rwpop .rwc.rwg{position:relative;cursor:pointer}.rwpop .rwc.rwg>small.rwgh{display:block;margin-top:1px;font:800 9px Maplestory,sans-serif;color:#ffe08a}.rwpop .rwc.rwg.on{box-shadow:0 0 0 2px #ffe08a,0 0 12px #ffb02e88}.rwpop .rwgl{display:none;margin:-2px 14px 8px;max-height:min(180px,calc(100vh - 420px));overflow-y:auto;overscroll-behavior:contain;padding:6px 8px;border-radius:10px;background:#0008;border:1px solid #e8b86066;text-align:left}.rwpop .rwgl.on{display:block}.rwpop .rwgl>b{display:block;font:800 11px Maplestory,sans-serif;color:#ffe08a;margin-bottom:3px}.rwpop .rwgl>span{display:block;font:700 11.5px/1.6 Maplestory,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`;document.head.appendChild(st);
const orp=rewardPop;rewardPop=function(items,sub){let it=items,G2=[];try{const by={};items.forEach(x=>{if(typeof x[1]!='number'){const k=x[1]+'|'+(x[1]=='NEW'?'skin':x[0]);(by[k]=by[k]||[]).push(x)}});const out=[],done={};items.forEach(x=>{if(typeof x[1]=='number')return out.push(x);const k=x[1]+'|'+(x[1]=='NEW'?'skin':x[0]),L=by[k];if(L.length<2)return out.push(x);if(done[k])return;done[k]=1;const lab=x[1]=='NEW'?'코스튬':x[1];G2.push({lab,names:L.map(y=>y[2])});out.push([x[0],'×'+L.length,'#g'+(G2.length-1)])});if(G2.length)it=out}catch(e){console.warn(e);it=items;G2=[]}
 if(!G2.length)return orp.call(this,it,sub);
 const T0=window.setTimeout,ids=[];window.setTimeout=function(f,ms){const id=T0.apply(window,arguments);if(ms===4000)ids.push(id);return id};let r;try{r=orp.call(this,it,sub)}finally{window.setTimeout=T0}
 try{const d=[...document.querySelectorAll('.rwpop')].pop(),bx=d&&d.querySelector('.rwbox'),ri=bx&&bx.querySelector('.rwi');if(ri){const gl=document.createElement('div');gl.className='rwgl';ri.after(gl);gl.onclick=e=>e.stopPropagation();
  ri.querySelectorAll('.rwc').forEach(c=>{const sm=c.querySelector('small');const m=sm&&sm.textContent.match(/^#g(\d+)$/);if(!m)return;const g=G2[+m[1]];c.classList.add('rwg');sm.textContent=g.lab;sm.insertAdjacentHTML('afterend','<small class=rwgh>탭하여 목록</small>');
   c.onclick=e=>{e.stopPropagation();ids.splice(0).forEach(clearTimeout);const on=!c.classList.contains('on');ri.querySelectorAll('.rwg').forEach(x=>x.classList.remove('on'));c.classList.toggle('on',on);gl.classList.toggle('on',on);if(on){gl.innerHTML='';const h=document.createElement('b');h.textContent=g.lab+' '+g.names.length+'개';gl.appendChild(h);g.names.forEach(n=>{const s=document.createElement('span');s.textContent=n;gl.appendChild(s)})}}})}}catch(e){console.warn(e)}
 return r};
})();
;(()=>{const st=document.createElement('style');st.textContent=`.acsum b>em.acrdy{font:800 9.5px Maplestory,sans-serif;font-style:normal;color:#9dff7a;margin-left:2px;vertical-align:1px;text-shadow:0 1px 0 #000}`;document.head.appendChild(st)})();
