const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s92');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(1500);await ev(()=>{G.C.B.allies.forEach(a=>a._ug=0)});
for(const [i,n] of [[2,'571-cutin-zelgadis'],[3,'572-cutin-amelia-check']]){await sl(1500);await ev(i=>{G.ultN=0;G.C.B.allies[i]._ug=1},i);await until(()=>G.ultN>0,8000);await sl(330);await sh(n)}
await sl(1500);await ev(()=>{G.C.alive().forEach(e=>{e.max*=60;e.hp=e.max});const a=G.C.B.allies[1];a.hp=0;a.dead=true;G.C.ev.allyDead&&G.C.ev.allyDead(a)});await sl(2000);await sh('573-ally-down-countdown');await ev(()=>{G.C.B.allies[1]._rv=7.2});await until(()=>G.revN>0,16000);await sl(400);await sh('574-ally-revived');
stop();console.log('rev',await ev(()=>[G.revN,G.C.B.allies[1].dead,G.C.B.allies[1]._rv]),'ERR',errs);await b.close()})();
