// r266: v217 stage-panel frame. 1341: 제5장 5-3 stage panel with 9-slice frame + gem; 1342: 제5장 chapter view with ic_map 월드맵 button + 5-6 crest nudged off 5-7 label.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('map')});await sl(300);
await p.evaluate(()=>{G.mapCh=4;renderScreen()});await sl(1200);
const crest=()=>p.evaluate(()=>[...document.querySelectorAll('#screen .snode')].filter(n=>!n.classList.contains('bs')).map(n=>{const c=n.querySelector('.ncr');if(!c)return null;const r=c.getBoundingClientRect();const hit=[...document.querySelectorAll('#screen .snode')].filter(m=>m!=n).some(m=>[...m.querySelectorAll('b,small,em')].some(e=>{const q=e.getBoundingClientRect();return q.width&&r.left<q.right&&r.right>q.left&&r.top<q.bottom&&r.bottom>q.top}));return n.querySelector('b').textContent+(c.classList.contains('ncl')?' L':' R')+(hit?' HIT':' ok')}).filter(Boolean));
console.log('crests ch5',JSON.stringify(await crest()));
console.log('wBtn',await p.evaluate(()=>{const i=document.querySelector('#wBtn img.wmi');return i&&[i.complete&&i.naturalWidth>0,document.querySelector('#wBtn').textContent,Math.round(i.getBoundingClientRect().width)]}));
await p.screenshot({path:'../screenshots/1342_chapter_mapbtn.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>G.stagePanel(30));await sl(700);
console.log('panel',await p.evaluate(()=>{const s=document.querySelector('.spv .sp'),cs=getComputedStyle(s),g=getComputedStyle(s,'::before'),r=s.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),bi:cs.borderImageSource.slice(-24),bw:cs.borderTopWidth,gem:g.backgroundImage.slice(-26),gemW:g.width,title:s.querySelector('.h b').textContent}}));
await p.screenshot({path:'../screenshots/1341_stage_panel_frame.jpg',type:'jpeg',quality:86});
// region-preview untouched / lite
await p.evaluate(()=>{document.querySelectorAll('.spv').forEach(x=>x.remove());G.loadSet().gq='save';G.stagePanel(30)});await sl(300);
console.log('lite',await p.evaluate(()=>{const s=document.querySelector('.spv');return [s.classList.contains('lite'),getComputedStyle(s.querySelector('.sp')).borderImageSource!='none']}));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
