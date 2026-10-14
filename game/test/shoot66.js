const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=f=>p.evaluate(f);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p);
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=4;s.si=4;s.comps={lyra:1,pip:1,zelgadis:1};s.party=['lyra','pip','zelgadis'];G.C.buildAllies()});
await p.waitForFunction(()=>G.C.alive().length>=3&&[...RENDER._ES()].filter(([e,q])=>e.hp>0&&q.x<330).length>=3,{timeout:20000}).catch(()=>{});
await ev(()=>{const L=G.C.alive();L.forEach((e,i)=>{G.C.stApply(e,['burn','frz','stun','psn'][i%4],6);e.hp=e.max*50;e.max*=50})});await sl(600);
await p.screenshot({path:'screenshots/456-status-icons-art.jpg',type:'jpeg',quality:90,clip:{x:120,y:250,width:270,height:420}});await sh('457-status-full');
await ev(()=>{const s=G.S();s.wave=9;G.C.startBoss&&G.C.startBoss()});await sl(3500);await sh('458-boss-break-gauge');
await ev(()=>{const bo=G.C.alive().find(e=>e.boss);if(bo)bo.brk=.97});await p.waitForFunction(()=>{const bo=G.C.alive().find(e=>e.boss);return bo&&bo.grog>0},{timeout:8000}).catch(()=>console.log('no grog'));await sl(150);await sh('459-boss-break-pop');await sl(700);await sh('460-boss-grog');
const st=await ev(()=>{const bo=G.C.alive().find(e=>e.boss);return bo?[bo.grog,bo.brk,Object.keys(bo.st||{})]:null});console.log('boss',st);
for(let i=0;i<6;i++){await sl(2000);await ev(()=>1)}
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
stop();console.log('fps',fps,'ERR',errs);await b.close()})();
