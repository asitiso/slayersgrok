// r253: v204 전설/신화 loot card — 1315 alone (mythic via real C.rollOnce, rarity roll forced), 1316 busy (3 drops queued behind a duo → 외 2건, quest scroll + plaque + callout), s3 achievement plate waits for the card
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(2500);
const cut=k=>p.evaluate(k=>{const cp=D.COMPS.find(x=>x.k==k),ci=D.CSKI&&D.CSKI[k];R.ccut={t:0,bust:1,img:'cutc/'+k+'.png',n:cp.n,sk:ci?ci[1]:'스킬',rc:(D.RAR[cp.g]||{}).c};R.ccCd=6},k);
await p.evaluate(()=>{setInterval(()=>{if(!window._ac)R.ccut=null},16);const or=Element.prototype.remove;Element.prototype.remove=function(){if(window._hold&&this.classList&&(this.classList.contains('combo')||this.classList.contains('mkb')))return;return or.call(this)}});
const mk=()=>p.evaluate(()=>{const b=document.getElementById('battle');b.querySelectorAll('.mkb').forEach(x=>x.remove());const d=document.createElement('div');d.className='mkb k3';d.innerHTML='<b>TRIPLE KILL</b>';d.style.animationDelay='-.3s';b.appendChild(d);setTimeout(()=>d.style.animationPlayState='paused',60)});
const el=()=>p.evaluate(()=>{R.elT={t:.02,n:'독기 서리 정령'}});
const ready=async()=>{for(let i=0;i<60;i++){if(await p.evaluate(()=>C.alive().length>=3&&!document.querySelector('#battle .wrib')&&!C.B.boss))return;await sl(100)}};
const aw=async()=>{for(let i=0;i<80;i++){if(await p.evaluate(()=>!!document.querySelector('#battle .acp')))break;await sl(100)}await sl(1300)};
const af=()=>p.evaluate(()=>{R._acHold=1;document.querySelectorAll('#battle .acp,#battle .acp *').forEach(d=>d.style.animationPlayState='paused')});
const qw=async()=>{for(let i=0;i<60;i++){if(await p.evaluate(()=>!!document.querySelector('#battle .qsc')))break;await sl(100)}await sl(1150)};
const qf=()=>p.evaluate(()=>{R._qsHold=1;document.querySelectorAll('#battle .qsc,#battle .qsc *').forEach(d=>d.style.animationPlayState='paused')});
const nocombo=()=>p.evaluate(()=>document.querySelectorAll('#battle .combo').forEach(x=>x.remove()));
const bx=()=>p.evaluate(()=>{const q=s=>{const m=document.querySelector(s),r=m&&m.getBoundingClientRect();return r&&[Math.round(r.top),Math.round(r.bottom),Math.round(r.left),Math.round(r.right)]};const b=document.getElementById('battle');return{ac:q('#battle .acp'),n:document.querySelectorAll('#battle .acp').length,txt:(document.querySelector('#battle .acp .tx')||{}).innerText,out:!!document.querySelector('#battle .acp.out'),qs:q('#battle .qsc'),duo:q('#battle .combo.duo'),mk:q('#battle .mkb'),cmbx:q('#cmbx'),idle:q('#idleBtn'),side:q('#sideR2'),fev:q('#fevg'),el:b.classList.contains('elon')}});

const lw=async()=>{for(let i=0;i<80;i++){if(await p.evaluate(()=>!!document.querySelector('#battle .lcd')))break;await sl(100)}await sl(1000)};
const lf=()=>p.evaluate(()=>{R._lcHold=1;document.querySelectorAll('#battle .lcd,#battle .lcd *').forEach(d=>d.style.animationPlayState='paused')});
const roll=rs=>p.evaluate(rs=>{const s=C.S(),o=C.rollRarity;s.orbs=Math.max(s.orbs||0,rs.length);const out=[];rs.forEach(r=>{C.rollRarity=()=>r;const it=C.rollOnce();out.push(it&&[it.r,it.name])});C.rollRarity=o;s.bag=null;return out},rs);
const lb=()=>p.evaluate(()=>{const q=s=>{const m=document.querySelector(s),r=m&&m.getBoundingClientRect();return r&&[Math.round(r.top),Math.round(r.bottom),Math.round(r.left),Math.round(r.right)]};const b=document.getElementById('battle');return{lc:q('#battle .lcd'),n:document.querySelectorAll('#battle .lcd').length,txt:(document.querySelector('#battle .lcd')||{}).innerText,nmfs:(document.querySelector('#battle .lcd .nm')||{style:{}}).style.fontSize,ac:q('#battle .acp'),qs:q('#battle .qsc'),duo:q('#battle .combo.duo'),mk:q('#battle .mkb'),pot:q('#potW'),party:q('#partycol'),idle:q('#idleBtn'),el:b.classList.contains('elon')}});
await p.evaluate(()=>{window._nc=setInterval(()=>{if(!window._dc)document.querySelectorAll('#battle .combo').forEach(x=>x.remove())},30)});
await clr();await ready();
const r1=await roll([5]);await lw();await lf();await p.evaluate(()=>{R.elT=null;R.ekT=null;document.querySelectorAll('#battle .mkb').forEach(x=>x.remove())});await sl(80);
const s1=await lb();await p.screenshot({path:'../screenshots/1315_loot_card.jpg',type:'jpeg',quality:85});await p.evaluate(()=>{R._lcHold=0;R._lcq()});await sl(600);
await clr();await ready();await p.evaluate(()=>{const s=C.S();D.MISSIONS.forEach(m=>{s.mc[m.k]=1})});await sl(600);
await ready();await p.evaluate(()=>{window._dc=1;G.comboTest('gourry','zelgadis')});await sl(100);
const r2=await roll([4,5,4]);await p.evaluate(()=>{const s=C.S();s.mc.train=0;s.mp.train=D.MISSIONS.find(x=>x.k=='train').goal});await sl(700);await p.evaluate(()=>{window._dc=0});
await qw();await qf();await lw();await lf();await el();await sl(250);await mk();await sl(120);
const s2=await lb();await p.screenshot({path:'../screenshots/1316_loot_card_busy.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{R._lcHold=0;R._lcq();R._qsHold=0;R._qsq();document.querySelectorAll('#battle .mkb').forEach(x=>x.remove())});await sl(800);
// s3: card up → achievement reached → plate waits until card leaves
await ready();await roll([4]);await lw();await p.evaluate(()=>{C.S().ac.summon=Math.max(C.S().ac.summon||0,100)});await sl(700);const s3a=await lb();await sl(1600);const s3b=await lb();
console.log(JSON.stringify({r1,r2,s1,s2,s3a,s3b,errs}));await b.close()})();
