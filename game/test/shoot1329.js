// r260: v211 region banner. 1329: world map — ch5 gate-break then banner (fixture: ch5 removed from slayers_gateseen + the banner seen-set on the real bigsave). 1330: real unlock — kill the 제5장 boss (si 34, maxSi 34→35 opens 제6장) and log the boss-clear flow timing; shot when the banner is up.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=C.S();s.autoBoss=false;openScreen('map')});await sl(500);
await p.evaluate(()=>document.querySelector('#wBtn').click());await sl(500);
const LOG=()=>p.evaluate(()=>{window._log=[];const t0=performance.now();window._t0=t0;const K=['.vic:not(.out)','.bchest','.chap','.unl','.wgo','.rgb'];let k='';window._iv=setInterval(()=>{const v=K.map(s=>document.querySelector(s)?1:0).join('');if(v!=k){k=v;window._log.push([Math.round(performance.now()-t0),v])}},16)});
const rb=()=>p.evaluate(()=>{const e=document.querySelector('.rgb');if(!e)return null;const q=e.getBoundingClientRect();return {t:Math.round(performance.now()-window._t0),cls:e.className,txt:e.innerText.replace(/\n/g,' | '),r:[q.left,q.top,q.width,q.height].map(Math.round)}});
const dump=async tag=>console.log(tag,'log',JSON.stringify(await p.evaluate(()=>{clearInterval(window._iv);return window._log})),'keys vic,bchest,chap,unl,wgo,rgb');
// --- 1329: map gate-break → banner
await p.evaluate(()=>{for(const k of ['slayers_gateseen']){const o=JSON.parse(localStorage.getItem(k));delete o[4];localStorage.setItem(k,JSON.stringify(o))}});
await p.reload();await sl(4000);await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;C.S().autoBoss=false;openScreen('map')});await sl(300);
await LOG();await p.evaluate(()=>{delete G._rbSeen[4];document.querySelector('#wBtn').click();document.querySelector('#mapw').scrollLeft=640});
for(let i=0;i<60;i++){const r=await rb();if(r&&r.t>window_t(r)){} if(r&&r.t>0){await sl(1150);break}await sl(50)}
console.log('map rb',JSON.stringify(await rb()));await p.screenshot({path:'../screenshots/1329_region_banner.jpg',type:'jpeg',quality:88});await sl(2600);await dump('map');
// --- 1330: real boss kill → chapter 6 opens
await p.evaluate(()=>{closeScreen&&closeScreen();});await sl(300);
await p.evaluate(()=>{if(G.screen)openScreen(null)});await sl(300);
console.log('pre',JSON.stringify(await p.evaluate(()=>({si:C.S().si,maxSi:C.S().maxSi,scr:G.screen,rb:localStorage.getItem('slayers_rbseen')}))));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());const s=C.S();s.wave=BAL.waves;s.failPow=0;C.startBoss()});
for(let i=0;i<80;i++){if(await p.evaluate(()=>C.alive().some(e=>e.boss)&&!document.querySelector('#battle .vsx')&&!(G._vsT&&performance.now()<G._vsT)))break;await sl(100)}await sl(600);
await LOG();await p.evaluate(()=>{C.alive().find(e=>e.boss).hp=1});
let shot=0;for(let i=0;i<400;i++){const r=await rb();if(r&&r.t&&!shot){await sl(1100);console.log('boss rb',JSON.stringify(await rb()));await p.screenshot({path:'../screenshots/1330_region_banner_after_boss.jpg',type:'jpeg',quality:88});shot=1;await sl(2000);break}await sl(50)}
await dump('boss');console.log('post',JSON.stringify(await p.evaluate(()=>({si:C.S().si,maxSi:C.S().maxSi,rb:localStorage.getItem('slayers_rbseen'),log:G._rbLog}))));
// --- lite: re-open ch6 banner on the map path with 스킬 연출 off
await p.evaluate(()=>{const s=G.loadSet();s.fx=0;G.applySet&&G.applySet();R.opt&&(R.opt.fx=false);G.regionBanner(5)});await sl(400);console.log('lite',JSON.stringify(await p.evaluate(()=>document.querySelector('.rgb')&&document.querySelector('.rgb').className)));
console.log('errs',JSON.stringify(errs));await b.close()})();
function window_t(){return 0}
