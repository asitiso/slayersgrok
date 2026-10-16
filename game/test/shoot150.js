const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s88');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(3000);await ev(()=>{const u=document.querySelector('.unl .ung');u&&u.click();document.querySelectorAll('#notice,.modal,.sty').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0;const s=G.S();s.maxSi=34;s.lv=120;G.C.refreshMax()});
let n=750;for(const si of [6,13,27]){await ev(si=>{G.C.B.boss=false;G.C.selectStage(si)},si);await sl(3000);await ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap').forEach(x=>x.remove());G.S().wave=3;G.C.startBoss()});
 await until(()=>{const e=G.C.alive().find(e=>e.boss);const q=e&&R._ES().get(e);return q&&q.enter>=1},10000);await sl(1500);await ev(()=>document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn').forEach(x=>x.remove()));await sh(`${n++}-boss-old-${si}`)}
stop();console.log('ERR',errs);await b.close()})();
