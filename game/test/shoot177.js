const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s88');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,noel:1,amelia:1};s.party=['gourry','noel','amelia'];G.C.buildAllies()});
await sl(3000);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
for(let k=0;k<2;k++){await until(()=>C.B.enemies.some(e=>!e.boss&&e.hp>0),30000);await ev(()=>{const E=(C.B.enemies||[]).filter(e=>!e.boss&&e.hp>0);const e=E[0];if(e){e.el=1;e.hp=Math.min(e.hp,1)}});await until(()=>document.querySelector('.ech'),15000);await sl(k?1300:250);await clr();await sh(k?'825-chest-open':'824-chest-drop');if(!k)await sl(3200);}
stop();console.log('ERR',errs);await b.close()})();
