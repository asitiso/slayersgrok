// r250: v201 level-up emblem — 1309 alone (merged double level-up), 1310 with plaque + callout + duo banner (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(2500);
const cut=k=>p.evaluate(k=>{const cp=D.COMPS.find(x=>x.k==k),ci=D.CSKI&&D.CSKI[k];R.ccut={t:0,bust:1,img:'cutc/'+k+'.png',n:cp.n,sk:ci?ci[1]:'스킬',rc:(D.RAR[cp.g]||{}).c};R.ccCd=6},k);
await p.evaluate(()=>{setInterval(()=>{if(!window._ac)R.ccut=null},16);const or=Element.prototype.remove;Element.prototype.remove=function(){if(window._hold&&this.classList&&(this.classList.contains('combo')||this.classList.contains('mkb')))return;return or.call(this)}});
const mk=()=>p.evaluate(()=>{const b=document.getElementById('battle');b.querySelectorAll('.mkb').forEach(x=>x.remove());const d=document.createElement('div');d.className='mkb k3';d.innerHTML='<b>TRIPLE KILL</b>';d.style.animationDelay='-.3s';b.appendChild(d);setTimeout(()=>d.style.animationPlayState='paused',60)});
const el=()=>p.evaluate(()=>{R.elT={t:.02,n:'독기 서리 정령'}});
const frz=()=>p.evaluate(()=>{window._hold=1;document.querySelectorAll('#battle .combo,#battle .combo *').forEach(d=>d.style.animationPlayState='paused')});
const unf=()=>p.evaluate(()=>{window._hold=0;document.querySelectorAll('#battle .combo').forEach(x=>x.remove())});
const ready=async()=>{for(let i=0;i<60;i++){if(await p.evaluate(()=>C.alive().length>=3&&!document.querySelector('#battle .wrib')&&!C.B.boss))return;await sl(100)}};
const box=()=>p.evaluate(()=>{const q=s=>{const m=document.querySelector(s),r=m&&m.getBoundingClientRect();return r&&[Math.round(r.top),Math.round(r.bottom),Math.round(r.left),Math.round(r.right)]};const ims=[...document.querySelectorAll('#battle .combo.duo img')].map(i=>i.naturalWidth);return{duo:q('#battle .combo.duo'),txt:(document.querySelector('#battle .combo.duo .pl')||{}).innerText,ims,mk:q('#battle .mkb'),rib:q('#battle .wrib'),elon:document.getElementById('battle').classList.contains('elon'),ccon:document.getElementById('battle').classList.contains('ccon')}});
const lvw=async()=>{for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('#battle .lvem')))break;await sl(100)}await sl(560)};
const lvf=()=>p.evaluate(()=>{R._lvHold=1;document.querySelectorAll('#battle .lvem,#battle .lvem *').forEach(d=>d.style.animationPlayState='paused')});
const lvu=()=>p.evaluate(()=>{R._lvHold=0;R._lvq()});
const bx=()=>p.evaluate(()=>{const q=s=>{const m=document.querySelector(s),r=m&&m.getBoundingClientRect();return r&&[Math.round(r.top),Math.round(r.bottom),Math.round(r.left),Math.round(r.right)]};const b=document.getElementById('battle');return{lv:q('#battle .lvem'),n:document.querySelectorAll('#battle .lvem').length,txt:(document.querySelector('#battle .lvem .tx')||{}).innerText,ban:document.querySelectorAll('#battle .banner').length,pow:document.querySelectorAll('.powup').length,duo:q('#battle .combo.duo'),mk:q('#battle .mkb'),rib:q('#battle .wrib'),out:!!document.querySelector('#battle .lvem.out'),lvon:b.classList.contains('lvon'),elon:b.classList.contains('elon')}});
const lvup=()=>p.evaluate(()=>{for(let i=0;i<3;i++)setTimeout(()=>C.gainExp(C.needExp()*1.01),i*180)});
// s0: moved duo banner vs callouts (plaque up → callout 236; cut-in+plaque → 424)
await clr();await ready();await p.evaluate(()=>{R.ccut=null;R.ccCd=99});await el();await sl(200);await mk();await p.evaluate(()=>G.comboTest('lyra','amelia'));await sl(450);await frz();const s0=await bx();await unf();await sl(1300);
await clr();await ready();await p.evaluate(()=>{R.ccut=null;R.ccCd=99;R._lvq()});await lvup();await lvw();await lvf();
const s1=await bx();await p.screenshot({path:'../screenshots/1309_levelup_emblem.jpg',type:'jpeg',quality:85});await lvu();await sl(1200);
await clr();await ready();await lvup();await sl(300);await el();await sl(200);await p.evaluate(()=>G.comboTest('gourry','zelgadis'));await lvw();await mk();await sl(120);await lvf();await frz();
const s2=await bx();await p.screenshot({path:'../screenshots/1310_levelup_busy.jpg',type:'jpeg',quality:85});await unf();await lvu();await sl(1200);
// s3: ribbon queued while emblem up waits; cut-in during emblem → emblem yields
await ready();await lvup();await sl(500);await p.evaluate(()=>{R._wrq&&R._wrq();R.waveRib('WAVE CLEAR')});await sl(300);const s3a=await bx();await p.evaluate(()=>{R._lvq()});await sl(500);const s3b=await bx();
await p.evaluate(()=>{R._wrq&&R._wrq()});await sl(300);await lvup();await sl(700);await p.evaluate(()=>{R.ccCd=0;window._ac=1});await cut('amelia');await sl(150);const s4=await bx();
console.log(JSON.stringify({s0,s1,s2,s3a,s3b,s4,errs}));await b.close()})();
