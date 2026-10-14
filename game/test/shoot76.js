const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s76');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(1000);await ev(()=>menuGo('dungeon'));await sl(800);await sh('515-dungeon-bossrush-card');
await p.click('#brGo');await sl(1500);await sh('516-rush-fight');await sl(3500);await sh('517-rush-later');
await p.click('.brskip');await p.waitForSelector('.brend',{timeout:30000});await sl(600);await sh('518-rush-timeup');
await p.click('#brOk');await sl(900);await sh('519-rush-reward');await ev(()=>document.querySelectorAll('.rwpop').forEach(x=>x.remove()));await sl(400);await sh('520-card-after');
await p.click('#brRk');await sl(700);await sh('521-rush-ranking');await ev(()=>document.querySelector('.brmod').remove());
// weekly rollover
await ev(()=>{const b=G.S().br;b.w=b.w-1;});await ev(()=>{renderScreen()});await sl(600);await sh('522-weekly-pending');await p.click('#brPend');await sl(900);await sh('523-weekly-claim');
const st=await ev(()=>JSON.stringify(G.S().br));
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
stop();console.log('br',st,'last',await ev(()=>G.brLast),'fps',fps,'ERR',errs);await b.close()})();
