const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
const kn=()=>ev(()=>document.querySelectorAll('#notice,.chap,.sty,.unl,.rwpop,.rpop,.modal').forEach(x=>x.remove()));
await ev(()=>{const s=G.S();s.maxSi=20;s.autoBoss=false;G.C.selectStage(14)});await sl(2500);await kn();await sh('1226_snow');
await ev(()=>{G.C.selectStage(8)});await sl(2500);await kn();await sh('1227_darkwood');
const boss=async(pre,nm)=>{await ev(()=>{G.C.selectStage(2)});await sl(1500);await kn();await ev(pre);await ev(()=>G.C.startBoss());
 for(let i=0;i<100&&!(await ev(()=>G.C.alive().some(e=>e.boss)));i++)await sl(40);
 for(let i=0;i<80&&!(await ev(()=>!!document.querySelector('.vsx')));i++)await sl(40);for(let i=0;i<100&&await ev(()=>!!document.querySelector('.vsx'));i++)await sl(40);
 const log=[];let L1=0;const t0=Date.now();for(let i=0;i<44;i++){log.push([Date.now()-t0,await ev(()=>[+(R.bHold||0).toFixed(2),!!R.ccQ,!!(R.ccut&&R.ccut.t<1)])]);if(!L1&&log[log.length-1][1][0]<.8&&log[log.length-1][1][0]>0){L1=1;await sh(nm+'_land')}if(i==40)await sh(nm+'_after');await sl(60)}
 if(!L1)await sh(nm+'_land');console.log(nm,JSON.stringify(log.filter((x,i)=>i%3==0)))};
await boss(()=>{R.opt.cut=true;R.opt.fx=true},'1228_boss');
await boss(()=>{R.opt.cut=false;R.opt.fx=true},'1229_cutoff');
await boss(()=>{R.opt.cut=true;R.opt.fx=false},'1230_fxoff');
console.log('ERRS',errs);stop();await b.close()})();
