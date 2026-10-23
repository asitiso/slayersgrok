// r252: v203 업적 달성 / 칭호 획득 plate — 1313 alone (real spell tier 5), 1314 busy (title unlocks folded 외 N건 + quest scroll + plaque + callout), s3 duo makes plate yield
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
// keep natural duo banners out of the way until s3
await p.evaluate(()=>{window._nc=setInterval(()=>{if(!window._dc)document.querySelectorAll('#battle .combo').forEach(x=>x.remove())},30)});
await clr();await ready();const pre=await p.evaluate(()=>C.achList().map(a=>a.k+':'+a.v));
// s1: spell tier 5 (10000) reached
await p.evaluate(()=>{const s=C.S();s.ac.spell=9999});await sl(700);await p.evaluate(()=>{C.S().ac.spell=10000});await aw();await af();await p.evaluate(()=>{R.elT=null;R.ekT=null;document.querySelectorAll('#battle .mkb').forEach(x=>x.remove())});await sl(80);
const s1=await bx();await p.screenshot({path:'../screenshots/1313_achv_plate.jpg',type:'jpeg',quality:85});await p.evaluate(()=>{R._acHold=0;R._acq()});await sl(600);
// s2: claim kill tiers 1–2 (real C.achClaim) → titles t1 견습 마도사 (score 10) + t2 고블린 학살자 (kill Lv2) unlock; enh tier 6 reached the same tick → 1 shown + 외 2건
await clr();await ready();await p.evaluate(()=>{const s=C.S();D.MISSIONS.forEach(m=>{s.mc[m.k]=1})});await sl(600);
await ready();await p.evaluate(()=>{window._dc=1;G.comboTest('gourry','zelgadis')});await sl(100);
await p.evaluate(()=>{C.achClaim('kill');C.achClaim('kill');C.S().ac.enh=500;const s=C.S();s.mc.train=0;s.mp.train=D.MISSIONS.find(x=>x.k=='train').goal});await sl(700);await p.evaluate(()=>{window._dc=0});
await qw();await qf();await aw();await af();await el();await sl(250);await mk();await sl(120);
const s2=await bx();const ttl=await p.evaluate(()=>C.titlesOwned().map(t=>t.n));await p.screenshot({path:'../screenshots/1314_achv_plate_busy.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{R._acHold=0;R._acq();R._qsHold=0;R._qsq();document.querySelectorAll('#battle .mkb').forEach(x=>x.remove())});await sl(800);
// s3: plate up → duo banner starts → plate slides out; plate waits while duo up
await ready();await p.evaluate(()=>{C.S().ac.summon=Math.max(C.S().ac.summon||0,100)});await sl(300);const dbg=await p.evaluate(()=>({v:C.achVal('summon'),scr:G.screen,sty:G.storyOn,cb:document.querySelectorAll('#battle .combo').length,vic:!!document.querySelector('.vic,.bsht')}));await aw();const s3a=await bx();await p.evaluate(()=>{window._dc=1;G.comboTest('gourry','zelgadis')});await sl(150);const s3b=await bx();
await p.evaluate(()=>{C.S().ac.boss=Math.max(C.S().ac.boss||0,200)});await sl(700);const s3c=await bx();
console.log(JSON.stringify({dbg,pre,ttl,s1,s2,s3a,s3b,s3c,errs}));await b.close()})();
