// r242: v194 uncluttered boss field — 1294 boss (clean), 1295 swarm after (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});
// let an elite spawn, then start the boss while its banner would still play
for(let i=0;i<40;i++){await sl(150);if(await p.evaluate(()=>C.alive().some(e=>e.el)))break}
await p.evaluate(()=>C.startBoss());await sl(7500);await clr();
const st1=await p.evaluate(()=>({elT:!!R.elT,el:C.alive().filter(e=>e.el).length,boss:C.B.boss,wk:document.getElementById('bossWk').classList.contains('on'),mvp:document.querySelectorAll('#partycol .mvpB').length,syn:document.querySelectorAll('#evrow .synChip').length,mvpK:G._mvpK}));
await p.screenshot({path:'../screenshots/1294_boss_clean.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(1500);await clr();
let n=0;for(let i=0;i<80;i++){await sl(200);n=await p.evaluate(()=>C.alive().length);if(n>=6&&await p.evaluate(()=>!!R.elT||C.alive().some(e=>e.el)))break}await sl(300);await clr();
const st2=await p.evaluate(()=>({boss:C.B.boss,n:C.alive().length,el:C.alive().filter(e=>e.el).length,elT:!!R.elT,mvp:document.querySelectorAll('#partycol .mvpB').length,wkOn:getComputedStyle(document.getElementById('bossWk')).display}));
await p.screenshot({path:'../screenshots/1295_swarm_after.jpg',type:'jpeg',quality:85});
console.log(JSON.stringify({st1,st2,errs}));await b.close()})();
