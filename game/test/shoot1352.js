// r275: hero audit. 1352 enhance>comp hero gallery+detail (selected hero), 1352b detail scrolled, 1352c gallery screen; plus wave ribbon opacity probe
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false});
// ribbon probe on battle
const op=await p.evaluate(async()=>{R.waveRib('FINAL WAVE',1);const o=[];for(const t of [300,600,800,1000]){await new Promise(r=>setTimeout(r,t-(o.length?[300,600,800,1000][o.length-1]:0)));const d=document.querySelector('.wvb.wrib');o.push(d?(+getComputedStyle(d).opacity).toFixed(2):'gone')}return o});console.log('ribbon opacity @0.3/0.6/0.8/1.0s',op.join(' '));
await p.evaluate(()=>{openScreen('enhance');G.enTab='comp';const s=C.S();G.trSel=Object.keys(s.comps).find(k=>s.comps[k])||'gourry';renderScreen()});await sl(1200);
const info=await p.evaluate(()=>{const sc=document.getElementById('screen');const imgs=[...sc.querySelectorAll('img')].map(i=>i.src.split('/assets/')[1]).filter(Boolean);const cnt={};imgs.forEach(n=>{const k=n.replace(/_[a-z0-9]+\.png$/,'_*');cnt[n]=(cnt[n]||0)+1});const bg=[...sc.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(x=>x&&x!='none'&&x.includes('assets')).map(x=>x.split('/assets/')[1].replace(/["')]/g,''));const bc={};bg.forEach(n=>bc[n]=(bc[n]||0)+1);return {sel:G.trSel,img:cnt,bg:bc,trv:!!sc.querySelector('.trv'),trvText:(sc.querySelector('.trv')||{}).innerText?.slice(0,300)}});console.log(JSON.stringify(info));
await p.screenshot({path:'../screenshots/1352_hero_audit.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{const e=document.querySelector('#screen .trv');e&&e.scrollIntoView({block:'start'})});await sl(400);await p.screenshot({path:'../screenshots/1352b_hero_detail.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{closeScreen();openScreen('gallery')});await sl(1200);await p.screenshot({path:'../screenshots/1352c_gallery.jpg',type:'jpeg',quality:86});
console.log('ERRS',JSON.stringify(errs));await b.close()})();
