// r255: v206 boss KO stamp — 1319 stamp just after the real boss kill, 1320 chest moment following; logs the boss-clear timeline (stamp / vic / chest)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');const SHOT=process.argv[2]!='measure';
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(2500);
const run=async(tag,t1,t2)=>{await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());const s=C.S();s.wave=BAL.waves;s.failPow=0;C.startBoss()});
 for(let i=0;i<80;i++){if(await p.evaluate(()=>C.alive().some(e=>e.boss)&&!document.querySelector('#battle .vsx')&&!(G._vsT&&performance.now()<G._vsT)))break;await sl(100)}await sl(600);
 await p.evaluate(()=>{window._log=[];const t0=performance.now();window._t0=t0;const K=['.bsht.ko2','.bsht','.vic','.bchest','.chap'];let k='';const ck=()=>{const v=K.map(s=>{const e=document.querySelector(s);return e?(e.classList.contains('out')?'o':1):0}).join('');if(v!=k){k=v;window._log.push([Math.round(performance.now()-t0),v])}};window._iv=setInterval(ck,16);const bo=C.alive().find(e=>e.boss);bo.hp=1;});
 const t0=Date.now();if(t1!=null){await sl(t1);console.log(tag,'a',JSON.stringify(await info()));if(SHOT&&tag=='main')await p.screenshot({path:`../screenshots/1319_ko_stamp.jpg`,type:'jpeg',quality:88})}
 if(t2!=null){await sl(t2);console.log(tag,'b',JSON.stringify(await info()));if(SHOT)await p.screenshot({path:`../screenshots/1320_ko_stamp_chest.jpg`,type:'jpeg',quality:88})}
 await sl(4500);console.log(tag,'log',JSON.stringify(await p.evaluate(()=>{clearInterval(window._iv);return window._log})),'keys .ko2,.bsht,.vic,.bchest,.chap')};
const info=()=>p.evaluate(()=>{const r=e=>{if(!e)return null;const q=e.getBoundingClientRect();return [Math.round(q.top),Math.round(q.bottom),Math.round(q.left),Math.round(q.right)]};const k=document.querySelector('.bsht.ko2');return {t:Math.round(performance.now()-window._t0),ko:r(k&&k.querySelector('.kb')),txt:k&&k.innerText,sh:document.querySelectorAll('.bsht.ko2 .ks').length,bsht:!!document.querySelector('.bsht'),vic:r(document.querySelector('.vic .vbox,.vic')),ch:r(document.querySelector('.bchest'))}});
// kill is detected ~ at first frame after hp=1 hit; shots at stamp hold and at chest
await run('main',1000,1900);
await p.evaluate(()=>{const s=G.loadSet();s.fx=0;G.applySet()});await sl(3000);await p.evaluate(()=>document.querySelectorAll('.modal').forEach(m=>m.remove()));
await run('lite',400,null);
console.log('errs',JSON.stringify(errs));await b.close()})();
