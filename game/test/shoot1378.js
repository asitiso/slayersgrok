// r301: boss portrait button shots - real save (bigsave read-only, G.noSave). 1378_boss_btn = current battle; 1378b_boss_btn_ready = first moment the button is ready (not off, not fight)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();await sl(800);
const st=()=>p.evaluate(()=>{const e=document.getElementById('bossBtn');return {cls:e.className,bsi:e.style.getPropertyValue('--bsi'),wave:C.S().wave,auto:C.S().autoBoss,boss:!!C.B.boss}});
console.log('now',JSON.stringify(await st()));if(process.argv[2]!='manual')await p.screenshot({path:'../screenshots/1378_boss_btn.jpg',type:'jpeg',quality:88});
if(process.argv[2]=='manual'){await p.evaluate(()=>{C.S().autoBoss=false;const d=document.createElement('div');d.textContent='TEST DATA · 메모리 전용 (자동 보스 OFF)';d.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:96px;z-index:99999;background:#c00;color:#fff;font:bold 12px sans-serif;padding:3px 8px;border-radius:4px;pointer-events:none';document.body.appendChild(d)})}
let got=0;for(let i=0;i<900&&!got;i++){const s=await st();if(!/off|fight/.test(s.cls)){await sl(450);await p.screenshot({path:'../screenshots/1378b_boss_btn_ready.jpg',type:'jpeg',quality:88});console.log('ready',i,JSON.stringify(s));got=1}else await sl(40)}
if(!got)console.log('no ready moment',JSON.stringify(await st()));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
