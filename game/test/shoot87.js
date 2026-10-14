const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s87');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(1500);await ev(()=>{G.C.B.allies.forEach(a=>a._ug=.99)});await sl(1200);await ev(()=>G.ultN=0);await p.click('#partycol .pp:nth-child(4)');await until(()=>G.ultN>0,8000);await sl(350);await sh('565-ult-manual-tap');const lu=await ev(()=>G.lastUlt);
await ev(()=>{G.screen=null;G.C.startBoss()});await until(()=>document.querySelector('.grogfl,.bkflash'),25000).then(async ok=>{if(!ok)await ev(()=>{const e=G.C.alive().find(e=>e.boss);if(e)G.C.ev.grog(e)})});await sl(120);await sh('566-break-flash-toned');
stop();console.log('manual',lu,'ERR',errs);await b.close()})();
