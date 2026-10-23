// r304: real boss fight damage-number shot - real save (bigsave read-only, G.noSave). Waits for the boss frame (body.bfon), then shoots a moment with no VS card / cut-in / cast banner; logs the clamp line R._dtTop
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();
let t0=0,shot=0,out=[];for(let i=0;i<4000&&!shot;i++){const s=await p.evaluate(()=>{const on=!!C.B.boss&&document.body.classList.contains('bfon');const f=document.getElementById('bossFr');const r=f&&f.getBoundingClientRect();return {on,dt:R._dtTop,fb:r?Math.round(r.bottom):0,busy:!!document.querySelector('.vsx,#battle .bcut,#battle .combo:not(.cbq):not(.cbo)')}});
 if(!s.on){t0=0;await sl(60);continue}if(!t0)t0=i;if(out.length<3)out.push(s);if(i-t0>40&&!s.busy&&s.dt>=s.fb){await p.screenshot({path:'../screenshots/'+(process.argv[2]||'1381_boss_dmg')+'.jpg',type:'jpeg',quality:88});console.log('shot',JSON.stringify(s));shot=1}else await sl(60)}
if(!shot)console.log('no shot');console.log('INFO',JSON.stringify(out));console.log('ERRS',JSON.stringify(errs));await b.close()})();
