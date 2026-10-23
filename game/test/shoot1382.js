// r305: real battle heal-number shot - real save (bigsave read-only, G.noSave). Wraps C.ev.heal in page memory only to timestamp real heals (counts per burst), shoots ~.25s after a multi-hero heal burst with no banner/cut-in up
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();
await p.evaluate(()=>{window._hb=[];const C=G.C,oh=C.ev.heal;C.ev.heal=function(){const now=performance.now(),l=_hb[_hb.length-1];if(l&&now-l.t<300)l.n++;else{_hb.push({t:now,n:1});if(_hb.length>20)_hb.shift()}return oh.apply(this,arguments)}});
let shot=0;for(let i=0;i<3000&&!shot;i++){const s=await p.evaluate(()=>{const l=_hb[_hb.length-1];if(!l||l.n<2)return null;const age=performance.now()-l.t;if(age<200||age>450)return null;if(document.querySelector('.vsx,#battle .bcut,#battle .combo:not(.cbq):not(.cbo),#battle .wrib,#toastQ .toast'))return null;return {n:l.n,age:Math.round(age),boss:!!C.B.boss}});
 if(s){await p.screenshot({path:'../screenshots/'+(process.argv[2]||'1382_heals')+'.jpg',type:'jpeg',quality:88});console.log('shot',JSON.stringify(s));shot=1}else await sl(30)}
if(!shot)console.log('no shot');console.log('INFO',JSON.stringify(await p.evaluate(()=>_hb.slice(-6).map(x=>x.n))));console.log('ERRS',JSON.stringify(errs));await b.close()})();
