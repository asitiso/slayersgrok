// r248: v199 wave ribbon — 1305 ribbon alone, 1306 ribbon + elite plaque (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(2500);
const cut=k=>p.evaluate(k=>{const cp=D.COMPS.find(x=>x.k==k),ci=D.CSKI&&D.CSKI[k];R.ccut={t:0,bust:1,img:'cutc/'+k+'.png',n:cp.n,sk:ci?ci[1]:'스킬',rc:(D.RAR[cp.g]||{}).c};R.ccCd=6},k);
const el=()=>p.evaluate(()=>{R.elT={t:.02,n:'독기 서리 정령'}});
const box=()=>p.evaluate(()=>{const q=s=>{const m=document.querySelector(s),r=m&&m.getBoundingClientRect();return r&&[Math.round(r.top),Math.round(r.bottom),Math.round(r.left),Math.round(r.right)]};return{rib:q('#battle .wrib'),txt:(document.querySelector('#battle .wrib span')||{}).textContent,mk:q('#battle .mkb'),elon:document.getElementById('battle').classList.contains('elon'),elt:R.elT&&+R.elT.t.toFixed(2),cc:R.ccut&&+R.ccut.t.toFixed(2)}});
const frz=()=>p.evaluate(()=>{R._wrHold=1;document.querySelectorAll('#battle .wrib').forEach(d=>d.style.animationPlayState='paused')});const unf=()=>p.evaluate(()=>{R._wrHold=0;document.querySelectorAll('#battle .wrib').forEach(d=>d.style.animationPlayState='')});
await p.evaluate(()=>setInterval(()=>{if(!window._ac)R.ccut=null},16));
/* natural wave flow: count ribbons appearing */
await clr();await p.evaluate(()=>{R.ccut=null;R.ccCd=99;window._rb=[];new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>n.classList&&n.classList.contains('wrib')&&_rb.push(n.textContent)))).observe(document.getElementById('battle'),{childList:true})});
await sl(9000);const nat=await p.evaluate(()=>_rb.slice());
await clr();await p.evaluate(()=>{R.ccut=null;R.ccCd=99;R._wrq();R.waveRib('WAVE CLEAR')});await sl(420);await frz();
const s1=await box();s1.dbg=await p.evaluate(()=>{const d=document.querySelector('#battle .wrib');const cs=getComputedStyle(d);const e=document.elementFromPoint(195,288);return [d.className,cs.animationName,cs.animationDuration,cs.animationPlayState,JSON.stringify(d.getAnimations().map(a=>[a.animationName,a.currentTime,a.playState])),cs.opacity,cs.transform,cs.zIndex,cs.visibility,e&&(e.tagName+'.'+e.className+'#'+e.id),d.querySelector('img').naturalWidth,d.parentElement.id]});await p.screenshot({path:'../screenshots/1305_wave_ribbon.jpg',type:'jpeg',quality:85});
await unf();await sl(1500);await clr();await p.evaluate(()=>{R.ccut=null;R.ccCd=99;R._wrq()});await el();await sl(150);await p.evaluate(()=>R.waveRib('WAVE 2<small>/3</small>'));await sl(400);await frz();
const s2=await box();await p.screenshot({path:'../screenshots/1306_wave_ribbon_busy.jpg',type:'jpeg',quality:85});
/* cut-in wait check */
await unf();await sl(1500);await p.evaluate(()=>{R._wrq();R.ccCd=0;window._ac=1});await cut('amelia');await p.evaluate(()=>R.waveRib('FINAL WAVE',1));await sl(300);const s3=await box();await sl(2600);const s4=await box();
console.log(JSON.stringify({nat,s1,s2,s3_duringCut:s3,s4_afterCut:s4,errs}));await b.close()})();
