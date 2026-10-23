// r263: v214 world-map star chests (real v42 system: ★7/14/21, G.starClaim). bigsave: ch1-4 ★21, ch5 ★18. Pre-claim ch1 all + ch4 ★7 through the real claim to show mixed states. 1335: map overview. 1336: tap ch5 ★7 chest (claimable) → open + fly mid-animation.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false});
console.log('stars',await p.evaluate(()=>JSON.stringify([[0,1,2,3,4,5,6].map(c=>G.chStars(c)),C.S().schest||{}])));
console.log('preclaim',await p.evaluate(()=>JSON.stringify([G.starClaim(0,0),G.starClaim(0,1),G.starClaim(0,2),G.starClaim(3,0)])));
await p.evaluate(()=>{openScreen('map');document.querySelector('#wBtn').click();const w=document.querySelector('#mapw');w.scrollLeft=520;const r=document.querySelector('.wpin[data-ch="4"]').getBoundingClientRect();w.scrollLeft+=r.x+r.width/2-250});await sl(1200);
const st=()=>p.evaluate(()=>[...document.querySelectorAll('.wpin')].map(x=>[x.dataset.ch,[...x.querySelectorAll('.wsc i')].map(i=>i.className+':'+i.innerText).join(',')]));
console.log('rows',JSON.stringify(await st()));
await p.screenshot({path:'../screenshots/1335_star_chests.jpg',type:'jpeg',quality:86});
// locked tap → toast with real counts
const lo=await p.evaluate(()=>{const i=document.querySelector('.wpin[data-ch="4"] .wsc i.lo');i.click();return [G.mapCh,[...document.querySelectorAll('.toast')].map(t=>t.innerText).pop()]});console.log('locked tap',lo);
await sl(1500);
const before=await p.evaluate(()=>{const s=C.S();return [s.gems,s.stone||0,s.orbs,s.tickets||0]});
const pt=await p.evaluate(()=>{const r=document.querySelector('.wpin[data-ch="4"] .wsc i[data-sc="0"]').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});
await p.mouse.click(pt[0],pt[1]);await sl(330);
await p.screenshot({path:'../screenshots/1336_star_chest_claim.jpg',type:'jpeg',quality:86});
console.log('claim',await p.evaluate(b=>{const s=C.S();return JSON.stringify({before:b,after:[s.gems,s.stone||0,s.orbs,s.tickets||0],last:G.lastSC,key:s.schest['4_0'],fly:document.querySelectorAll('.scfly').length,mapCh:G.mapCh,toast:[...document.querySelectorAll('.toast')].map(t=>t.innerText).pop()})},before));
await sl(1200);console.log('rows after',JSON.stringify((await st()).filter(r=>r[0]=='4')),'fly left',await p.evaluate(()=>document.querySelectorAll('.scfly').length));
// double claim refused
console.log('again',await p.evaluate(()=>G.starClaim(4,0)));
// existing modal agrees
console.log('modal',await p.evaluate(()=>{G.starOpen(4);const m=document.querySelector('.schm');const r=[...m.querySelectorAll('[data-sc]')].map(x=>x.innerText);m.closest('.modal').remove();return r}));
// re-render keeps state; lite
await p.evaluate(()=>{R.opt.fx=false;renderScreen()});await sl(200);console.log('lite',await p.evaluate(()=>{const i=document.querySelector('.wpin[data-ch="4"] .wsc i.ok img');const r=[document.querySelector('#screen').classList.contains('lite-sc'),i&&getComputedStyle(i).animationName,document.querySelector('.wpin[data-ch="4"] .wsc').innerText.replace(/\n/g,',')];R.opt.fx=true;return r}));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
