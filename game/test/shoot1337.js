// r264: v215. 1337: world-map header with real gold/젬/강화석/티켓 + a real ★7 star-chest claim (ch5) mid-flight: 젬 → gem chip, 강화석 → stone chip. 1338: chapter view, tap stage 5-3 → stage info panel (real 권장/내 전투력, monsters, boss, rewards).
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false});
await p.evaluate(()=>{openScreen('map');document.querySelector('#wBtn').click();const w=document.querySelector('#mapw');w.scrollLeft=520;const r=document.querySelector('.wpin[data-ch="4"]').getBoundingClientRect();w.scrollLeft+=r.x+r.width/2-250});await sl(1000);
const hd=()=>p.evaluate(()=>{const s=C.S();return {chips:[...document.querySelectorAll('#screen .mc')].map(e=>e.dataset.k+'='+e.textContent),real:[fmt(s.gold),fmt(s.gems),fmt(s.stone||0),fmt(s.tickets||0)],title:document.querySelector('#screen .shead b').textContent,oldChip:getComputedStyle(document.querySelector('#screen .shead>.chip')).display}});
console.log('header',JSON.stringify(await hd()));
const pt=await p.evaluate(()=>{const r=document.querySelector('.wpin[data-ch="4"] .wsc i[data-sc="0"]').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});
const before=await p.evaluate(()=>[...document.querySelectorAll('#screen .mc')].map(e=>e.textContent));
await p.mouse.click(pt[0],pt[1]);await sl(520);
console.log('mid',JSON.stringify(await p.evaluate(()=>({fl:[...document.querySelectorAll('.scfly')].map(c=>[c.getAttribute('src'),c.style.getPropertyValue('--dx'),c.style.getPropertyValue('--dy')]),tg:['gems','stone'].map(k=>{const r=G.curTarget(k).getBoundingClientRect();return k+'→'+G.curTarget(k).dataset.k+'@'+Math.round(r.x+r.width/2)+','+Math.round(r.y)}),chips:[...document.querySelectorAll('#screen .mc')].map(e=>e.textContent)}))),'before',JSON.stringify(before));
await p.screenshot({path:'../screenshots/1337_map_header.jpg',type:'jpeg',quality:86});
await sl(700);console.log('arrived',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#screen .mc')].map(e=>e.dataset.k+'='+e.textContent+(e.classList.contains('pz')?'*':'')))));
console.log('targets',await p.evaluate(()=>['gold','gems','stone','tk','orbs','zzz'].map(k=>k+'→'+(G.curTarget(k).id||G.curTarget(k).dataset.k)).join(' ')));
// chapter view + stage panel
await p.evaluate(()=>{G.mapCh=4;renderScreen()});await sl(800);console.log('ch header',JSON.stringify(await hd()));
const np=await p.evaluate(()=>{const r=document.querySelector('.snode[data-n="30"]').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});
await p.mouse.click(np[0],np[1]);await sl(600);
console.log('panel',JSON.stringify(await p.evaluate(()=>{const d=document.querySelector('.spv');const s=C.S();return {txt:d&&d.innerText.replace(/\n/g,' | '),imgs:d&&[...d.querySelectorAll('.mons img')].map(i=>i.getAttribute('src').replace('assets/','')+(i.naturalWidth?'':'!')),real:{req:C.stageReq(30),pow:C.POW(),gk:C.goldKill(30),fcl:s.fcl,maxSi:s.maxSi,field:D.FIELDS[30],mons:D.FIELDMON[D.FIELDS[30]]},si:s.si,screen:G.screen}})));
await p.screenshot({path:'../screenshots/1338_stage_panel.jpg',type:'jpeg',quality:86});
// close then 이동
await p.evaluate(()=>document.querySelector('.spv .no').click());console.log('closed',await p.evaluate(()=>[!document.querySelector('.spv'),G.screen]));
console.log('locked node',await p.evaluate(()=>{G.mapCh=5;renderScreen();return 1}));await sl(300);console.log('locked tap',await p.evaluate(()=>{const n=document.querySelector('.snode[data-n="36"]');n&&n.click();return [!!document.querySelector('.spv'),[...document.querySelectorAll('.toast')].map(t=>t.innerText).pop()]}));
await p.evaluate(()=>{G.mapCh=4;renderScreen()});await sl(300);await p.evaluate(()=>document.querySelector('.snode[data-n="30"]').click());await sl(300);
await p.evaluate(()=>document.querySelector('.spv .ok').click());await sl(300);console.log('moved',await p.evaluate(()=>[C.S().si,G.screen,!!document.querySelector('.spv')]));
// lite
console.log('lite',await p.evaluate(()=>{R.opt.fx=false;const d=G.stagePanel(30);const r=[d.className,getComputedStyle(d.querySelector('.sp')).animationName];d.remove();R.opt.fx=true;return r}));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
