// r247: v198 elite plaque — 1303 plaque + callout above, 1304 with cut-in banner + callout below (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(2500);
const cut=k=>p.evaluate(k=>{const cp=D.COMPS.find(x=>x.k==k),ci=D.CSKI&&D.CSKI[k];R.ccut={t:0,bust:1,img:'cutc/'+k+'.png',n:cp.n,sk:ci?ci[1]:'스킬',rc:(D.RAR[cp.g]||{}).c};R.ccCd=6},k);
const mk=()=>p.evaluate(()=>{const b=document.getElementById('battle');b.querySelectorAll('.mkb').forEach(x=>x.remove());const d=document.createElement('div');d.className='mkb k3';d.innerHTML='<b>TRIPLE KILL</b>';d.style.animationDelay='-.3s';b.appendChild(d);setTimeout(()=>d.style.animationPlayState='paused',60)});
const el=()=>p.evaluate(()=>{R.elT={t:.02,n:'독기 서리 정령'}});
const box=()=>p.evaluate(()=>{const m=document.querySelector('#battle .mkb'),r=m&&m.getBoundingClientRect(),b=document.getElementById('battle');return{elon:b.classList.contains('elon'),ccon:b.classList.contains('ccon'),elt:R.elT&&+R.elT.t.toFixed(2),mk:r&&[Math.round(r.top),Math.round(r.bottom)]}});
await clr();await p.evaluate(()=>{R.ccut=null;R.ccCd=99});await el();await sl(250);await mk();await sl(120);
const s1=await box();await p.screenshot({path:'../screenshots/1303_elite_plaque.jpg',type:'jpeg',quality:85});
await sl(2200);await clr();await p.evaluate(()=>{R.ccCd=0});await cut('amelia');await el();await sl(330);await mk();await sl(120);
const s2=await box();await p.screenshot({path:'../screenshots/1304_elite_with_callout.jpg',type:'jpeg',quality:85});
await sl(2000);const s3=await box();
console.log(JSON.stringify({s1,s2,s3,errs}));await b.close()})();
