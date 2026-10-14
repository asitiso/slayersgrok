const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s77');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies();s.dun.t={gold:0,exp:0,stone:0,frag:0}});
await sl(1500);await sh('524-dojeon-reddot');
await ev(()=>menuGo('dungeon'));await sl(700);await sh('525-rush-card');await p.click('#brGo');
await sl(3000);await sh('526-rush-real-boss1');const k1=[];for(let i=0;i<10;i++){await sl(2000);k1.push(await ev(()=>G.C.B.br?G.C.B.br.kills:-1))}
await sh('527-rush-real-mid');await ev(()=>{G.toastTest=1;});
for(let i=0;i<70&&!(await ev(()=>!!document.querySelector('.brfin')));i++)await sl(1000);await sl(600);await sh('528-rush-timeup');
await p.click('#brOk');await sl(900);await sh('529-rush-reward');
const st=await ev(()=>JSON.stringify([G.S().br,G.S().si,G.C.B.boss,G.C.B.br]));
await ev(()=>document.querySelectorAll('.rwpop').forEach(x=>x.remove()));await sl(5000);await sh('530-back-to-normal');
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
stop();console.log('kills',k1.join(','),'st',st,'fps',fps,'ERR',errs);await b.close()})();
