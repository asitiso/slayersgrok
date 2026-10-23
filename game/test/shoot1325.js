// r258: v209 chapter conquest seal — real bigsave data (stages 0-33 ★3 → ch1-4 conquered, ch5 not). Seen-set seeded silently, then ch4 un-marked so its first-time stamp pop can be shot. 1325 chapter-4 banner, 1326 world map pins.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;openScreen('map')});await sl(800);
console.log('seed',await p.evaluate(()=>[localStorage.getItem('slayers_ch3seen'),[0,1,2,3,4,5,6].map(c=>G.chConq(c)),!!document.querySelector('.cban .csl')]));
const inf=()=>p.evaluate(()=>{const r=e=>{if(!e)return null;const q=e.getBoundingClientRect();return [Math.round(q.left),Math.round(q.top),Math.round(q.right),Math.round(q.bottom)]};return {ban:r(document.querySelector('.cban')),seal:r(document.querySelector('.cban .csl')),lab:r(document.querySelector('.cban .cslb')),title:r(document.querySelector('.cban b')),cls:(document.querySelector('.cban .csl')||{}).className,pins:[...document.querySelectorAll('.wpin')].map(x=>[x.dataset.ch,(x.querySelector('.wsl')||{}).className||'-'])}});
await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('slayers_ch3seen'));delete s[3];localStorage.setItem('slayers_ch3seen',JSON.stringify(s));G.mapCh=-1;document.querySelector('#wBtn').click()});await sl(400);
await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('slayers_ch3seen'));delete s[3];localStorage.setItem('slayers_ch3seen',JSON.stringify(s));document.querySelector('.wpin[data-ch="3"]').click()});await sl(1300);
console.log('ch4',JSON.stringify(await inf()));await p.screenshot({path:'../screenshots/1325_chapter_seal.jpg',type:'jpeg',quality:88});await sl(900);
await p.evaluate(()=>document.querySelector('#wBtn').click());await sl(300);await p.evaluate(()=>{document.querySelector('#mapw').scrollLeft=760});await sl(400);console.log('world',JSON.stringify(await inf()));
await p.screenshot({path:'../screenshots/1326_worldmap_seal.jpg',type:'jpeg',quality:88});
await p.evaluate(()=>{const s=G.loadSet();s.fx=0;G.applySet();localStorage.removeItem('slayers_ch3seen');G.mapCh=3;renderScreen()});await sl(300);
await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('slayers_ch3seen'));delete s[2];localStorage.setItem('slayers_ch3seen',JSON.stringify(s));G.mapCh=2;renderScreen()});await sl(200);console.log('lite',JSON.stringify(await inf()));
console.log('errs',JSON.stringify(errs));await b.close()})();
