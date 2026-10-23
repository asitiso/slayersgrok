// r246: v197 swarm cut-in frame — 1301 frame alone, 1302 with DOUBLE KILL callout (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(2500);
const cut=k=>p.evaluate(k=>{const cp=D.COMPS.find(x=>x.k==k),ci=D.CSKI&&D.CSKI[k];R.ccut={t:0,bust:1,img:'cutc/'+k+'.png',n:cp.n,sk:ci?ci[1]:'스킬',rc:(D.RAR[cp.g]||{}).c};R.ccCd=6},k);
await clr();await cut(process.env.K||'amelia');await sl(420);
const s1=await p.evaluate(()=>({boss:C.B.boss,t:R.ccut&&R.ccut.t,on:document.getElementById('battle').classList.contains('ccon')}));await p.screenshot({path:'../screenshots/1301_swarm_cutin_frame.jpg',type:'jpeg',quality:85});
await sl(1500);await clr();await cut(process.env.K2||'gourry');await sl(200);await p.evaluate(()=>{const b=document.getElementById('battle');b.querySelectorAll('.mkb').forEach(x=>x.remove());const d=document.createElement('div');d.className='mkb k3';d.innerHTML='<b>TRIPLE KILL</b>';b.appendChild(d)});await sl(220);
const s2=await p.evaluate(()=>{const m=document.querySelector('#battle .mkb'),r=m&&m.getBoundingClientRect();return{t:R.ccut&&R.ccut.t,mkTop:r&&Math.round(r.top),mkBot:r&&Math.round(r.bottom)}});await p.screenshot({path:'../screenshots/1302_cutin_with_callout.jpg',type:'jpeg',quality:85});
await sl(1200);const s3=await p.evaluate(()=>({on:document.getElementById('battle').classList.contains('ccon'),t:R.ccut&&R.ccut.t,n:R.ccut&&R.ccut.n}));
console.log(JSON.stringify({s1,s2,s3,errs}));await b.close()})();
