// r303: real boss battle shot - real save (bigsave read-only, G.noSave). Waits for C.B.boss, shoots the first fully faded-in cast banner in the fight; logs banner/side-menu clearance and groggy-toast vs banner overlap
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();
await p.evaluate(()=>{window._gt=[];window._ov=0;const ov=(a,c)=>a.top<c.bottom&&c.top<a.bottom&&a.left<c.right&&c.left<a.right;setInterval(()=>{const c=document.querySelector('#battle .combo:not(.cbq):not(.cbo)');const ts=[...document.querySelectorAll('#toastQ .toast')].filter(t=>/그로기/.test(t.textContent));for(const t of ts){const r=t.getBoundingClientRect();if(_gt.length<4||c&&_gt.length<8)_gt.push([Math.round(r.top),Math.round(r.bottom),c?1:0]);if(c&&ov(r,c.getBoundingClientRect()))_ov++}},50)});
const mode=process.argv[3]||'boss';let shot=0,i=0;for(;i<3000&&!shot;i++){const s=await p.evaluate(m=>{if(m=='boss'&&!(C.B.boss&&document.body.classList.contains('bossfight')))return null;if(document.querySelector('.vsx,#battle .bcut'))return null;const c=document.querySelector('#battle .combo:not(.cbq):not(.cbo)');if(!c||+getComputedStyle(c).opacity<.95)return null;const r=c.getBoundingClientRect();return {l:Math.round(r.left),r:Math.round(r.right),t:Math.round(r.top),b:Math.round(r.bottom),boss:!!C.B.boss}},mode);
 if(s){await p.screenshot({path:'../screenshots/'+(process.argv[2]||'1380_boss_cast')+'.jpg',type:'jpeg',quality:88});console.log('shot',JSON.stringify(s));shot=1}else await sl(40)}
if(!shot)console.log('no banner');await sl(15000);
console.log('INFO',JSON.stringify(await p.evaluate(()=>({grogToast:_gt,grogOverlapTicks:_ov,cbQ:R._cbQ||0}))));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
