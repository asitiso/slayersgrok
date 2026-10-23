// r245: v196 boss-clear chest — 1298 drop, 1299 open, 1300 loot fly (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(1500);
await p.evaluate(()=>C.startBoss());await sl(7500);await clr();
const t0=await p.evaluate(()=>{const e=C.alive().find(x=>x.boss);C.hitEnemy(e,e.hp*10+1);return performance.now()});
const wch=()=>p.waitForFunction(()=>document.querySelector('.bchest'),{timeout:4000}).then(()=>p.evaluate(()=>performance.now()));const tc=await wch();
const shot=async(ms,f)=>{const now=await p.evaluate(()=>performance.now());await sl(Math.max(0,tc+ms-now));await clr();const s=await p.evaluate(()=>({ch:!!document.querySelector('.bchest'),op:!!document.querySelector('.bchest.op'),loot:document.querySelectorAll('.bcl').length,vic:!!document.querySelector('.vic')}));await p.screenshot({path:'../screenshots/'+f,type:'jpeg',quality:85});return s};
const s1=await shot(330,'1298_chest_drop.jpg'),s2=await shot(1080,'1299_chest_open.jpg'),s3=await shot(1930,'1300_loot_fly.jpg');
await sl(1500);const s4=await p.evaluate(()=>({left:document.querySelectorAll('.bchest,.bcl').length,n:G._chestN}));
// effects off: no chest
await p.evaluate(()=>{G.set.fx=0;G.applySet();C.startBoss()});await sl(7500);await p.evaluate(()=>{const e=C.alive().find(x=>x.boss);e&&C.hitEnemy(e,e.hp*10+1)});await sl(1500);const s5=await p.evaluate(()=>({ch:document.querySelectorAll('.bchest').length,n:G._chestN}));
console.log(JSON.stringify({delay:Math.round(tc-t0),s1,s2,s3,s4,s5,errs}));await b.close()})();
