// r302: cast/duo banner slot shot - real save (bigsave read-only, G.noSave), real battle; logs banner vs ribbon/WARNING overlap
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();
await p.evaluate(()=>{window._ov=0;window._nb=0;window._lg=[];const t0=performance.now();setInterval(()=>{const c=document.querySelector('#battle .combo:not(.cbq):not(.cbo)');if(!c)return;const v=document.querySelector('#battle .wvb.wrib:not(.out)')||document.querySelector('.bwarn:not(.bwq):not(.out)');if(v)_ov++},50);new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&n.classList.contains('combo')){_nb++;_lg.push(Math.round(performance.now()-t0)+' banner q='+n.classList.contains('cbq'))}}).observe(document.getElementById('battle'),{childList:true})});
let shot=0;for(let i=0;i<1500&&!shot;i++){const s=await p.evaluate(()=>{const c=document.querySelector('#battle .combo.duo:not(.cbq):not(.cbo)')||document.querySelector('#battle .combo:not(.cbq):not(.cbo)');if(!c)return null;const r=c.getBoundingClientRect();return {l:Math.round(r.left),r:Math.round(r.right),t:Math.round(r.top),b:Math.round(r.bottom),boss:!!C.B.boss}});
 if(s){let op=0;for(let k=0;k<30&&op<.95;k++){await sl(30);op=await p.evaluate(()=>{const c=document.querySelector('#battle .combo');return c?+getComputedStyle(c).opacity:-1})}await p.screenshot({path:'../screenshots/'+(process.argv[2]||'1379_cast_banner')+'.jpg',type:'jpeg',quality:88});console.log('shot',i,JSON.stringify(s));shot=1}else await sl(40)}
if(!shot)console.log('no banner');await sl(12000);
console.log('INFO',JSON.stringify(await p.evaluate(()=>({banners:_nb,overlapTicks:_ov,cbQ:R._cbQ||0,log:_lg.slice(-12)}))));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
