const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s84');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(3000);await until(()=>document.querySelectorAll('.lootc:not(.fly)').length>1,15000);await sl(150);await sh('559-coin-pop');await until(()=>document.querySelector('.lootc.fly'),5000);await sl(300);await sh('560-coin-fly');
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
await sl(2000);stop();console.log('lootN',await ev(()=>G.lootN),'left',await ev(()=>document.querySelectorAll('.lootc').length),'fps',fps,'ERR',errs);await b.close()})();
