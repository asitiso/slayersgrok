// r262: v213. 1333: world map, tap the locked 제6장 pin → region preview with the real 제6장 end-boss silhouette. 1334: map open while the background boss fight fires a skill cut-in (.bcut) — no test-only hide; the cut-in must be display:none under the map. Also "?" fallback + lite.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false});
console.log('plan',JSON.stringify(await p.evaluate(()=>D.CH.map((n,c)=>{const pl=D.BOSSPLAN[c];const bo=pl&&D.BOSSES[pl[1]];return [c+1,n,bo&&bo.n,bo&&bo.img]}))));
// 1333
await p.evaluate(()=>{openScreen('map');document.querySelector('#wBtn').click();document.querySelector('#mapw').scrollLeft=700});await sl(900);
const pin=await p.evaluate(()=>{const n=document.querySelector('.wpin[data-ch="5"]');const r=n.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});
await p.mouse.click(pin[0],pin[1]);await sl(1700);
console.log('rpv',JSON.stringify(await p.evaluate(()=>{const d=document.querySelector('.rpv');if(!d)return null;const im=d.querySelector('.win img');return {txt:d.querySelector('.pt').innerText.replace(/\n/g,' | '),img:im&&im.getAttribute('src'),ok:im&&im.complete&&im.naturalWidth>0,filter:im&&getComputedStyle(im).filter.slice(0,60),anim:im&&getComputedStyle(im).animationName,toast:[...document.querySelectorAll('.toast')].map(t=>t.innerText)}})));
await p.screenshot({path:'../screenshots/1333_region_preview.jpg',type:'jpeg',quality:86});
// close: tap outside
await p.mouse.click(30,780);await sl(300);console.log('closed outside',await p.evaluate(()=>!document.querySelector('.rpv')));
// ✕ close
await p.mouse.click(pin[0],pin[1]);await sl(600);await p.evaluate(()=>document.querySelector('.rpv .x').click());await sl(200);console.log('closed x',await p.evaluate(()=>!document.querySelector('.rpv')));
// unlocked pin still navigates
console.log('unlocked tap',await p.evaluate(()=>{document.querySelector('.wpin[data-ch="2"]').click();return [G.mapCh,!!document.querySelector('.rpv')]}));
// "?" fallback: chapter with a missing art file
console.log('fallback',await p.evaluate(async()=>{const pl=D.BOSSPLAN[6],bo=D.BOSSES[pl[1]],o=bo.img;bo.img='nope_missing.png';G.regionPreview(6);await new Promise(r=>setTimeout(r,600));bo.img=o;const d=document.querySelector('.rpv');const r=[!!d.querySelector('.win .q'),!!d.querySelector('.win img')];d.remove();return r}));
// lite
console.log('lite',await p.evaluate(()=>{const o=R.opt.fx;R.opt.fx=false;const d=G.regionPreview(5);const r=[d.className,getComputedStyle(d.querySelector('.rc')).animationName,getComputedStyle(d.querySelector('.win img')).animationName];d.remove();R.opt.fx=o;return r}));
// 1334: close map, start the boss fight, wait for a real .bcut, then open the world map while it plays
await p.evaluate(()=>{closeScreen&&closeScreen();if(G.screen)openScreen(G.screen)});await sl(300);
await p.evaluate(()=>{if(G.screen){document.querySelector('#screen').classList.remove('on');G.screen=null}});await p.evaluate(()=>C.startBoss());
let got=0;for(let i=0;i<120&&!got;i++){await sl(250);got=await p.evaluate(()=>!!document.querySelector('#battle .bcut'))}
if(!got){console.log('no natural cut-in in 30s → firing the real tele hook');await p.evaluate(()=>{const e=C.alive().find(e=>e.boss);C.ev.tele(e)});got=await p.evaluate(()=>!!document.querySelector('#battle .bcut'))}
console.log('bcut before map',await p.evaluate(()=>{const c=document.querySelector('#battle .bcut');return c&&[getComputedStyle(c).display,c.innerText.replace(/\n/g,' ')]}));
await p.evaluate(()=>{openScreen('map');document.querySelector('#wBtn').click();document.querySelector('#mapw').scrollLeft=700});await sl(250);
console.log('bcut under map',await p.evaluate(()=>[...document.querySelectorAll('.bcut')].map(c=>[getComputedStyle(c).display,c.getBoundingClientRect().height]),),await p.evaluate(()=>[document.body.className,!!C.B.boss]));
await p.screenshot({path:'../screenshots/1334_map_no_cutin.jpg',type:'jpeg',quality:86});
// battle keeps running + cut-ins come back when the map closes
await p.evaluate(()=>{document.querySelector('#screen').classList.remove('on');G.screen=null});await sl(200);
console.log('after close',await p.evaluate(()=>{const e=C.alive().find(e=>e.boss);if(e)C.ev.tele(e);const c=document.querySelector('#battle .bcut');return [!!C.B.boss,c&&getComputedStyle(c).display,document.body.className]}));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
