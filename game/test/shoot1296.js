// r244: v195 boss skill strip — 1296 boss strip, 1297 swarm normal banner (High)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);const clr=()=>p.evaluate(()=>document.querySelectorAll('#notice,.tut,.sty,.modal').forEach(x=>x.remove()));
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};const s=G.S();s.autoBoss=false;C.selectStage(s.si)});await sl(1500);
const cut=k=>p.evaluate(k=>{const cp=D.COMPS.find(x=>x.k==k),ci=D.CSKI&&D.CSKI[k];R.ccut={t:0,bust:1,img:'cutc/'+k+'.png',n:cp.n,sk:ci?ci[1]:'스킬',rc:(D.RAR[cp.g]||{}).c};R.ccCd=6},k);
await p.evaluate(()=>C.startBoss());await sl(7500);await clr();await cut(process.env.K||'amelia');await sl(380);
const s1=await p.evaluate(()=>({boss:C.B.boss,t:R.ccut&&R.ccut.t}));await p.screenshot({path:'../screenshots/1296_boss_skill_strip.jpg',type:'jpeg',quality:85});
await sl(1200);await p.evaluate(()=>{const s=G.S();C.selectStage(s.si)});await sl(2500);await clr();await cut('amelia');await sl(380);
const s2=await p.evaluate(()=>({boss:C.B.boss,t:R.ccut&&R.ccut.t,n:C.alive().length}));await p.screenshot({path:'../screenshots/1297_swarm_skill_banner.jpg',type:'jpeg',quality:85});
console.log(JSON.stringify({s1,s2,errs}));await b.close()})();
