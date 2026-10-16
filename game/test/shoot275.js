const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
const rm=()=>ev(()=>document.querySelectorAll('#notice,.modal,.unl,.chap,.tut,.rwpop').forEach(x=>x.remove()));
await sl(1500);await rm();
await ev(()=>{const s=C.S();s.wave=99;document.querySelector('#bossBtn').click()});await sl(2600);await ev(()=>document.querySelectorAll('.vsx').forEach(x=>x.remove()));await sl(800);
await ev(()=>{const b=C.alive().find(e=>e.boss);b.max*=40;b.hp=b.max*.76});await sl(300);await ev(()=>{const b=C.alive().find(e=>e.boss);b.hp=b.max*.72});await sl(250);await sh('1196-boss-phase');
await ev(()=>{const b=C.alive().find(e=>e.boss);b.grog=0;b.brk=0;C.B.tele={e:b,t:C.TELE.wind,T:C.TELE.wind};C.ev.tele(b)});await sl(500);await rm();await sh('1197-boss-telegraph');
await ev(()=>{C.B.tele=null;C.ev.teleCancel&&C.ev.teleCancel(null,false)});await sl(800);
await ev(()=>{const b=C.alive().find(e=>e.boss);b.brk=0.999});let g=false;for(let i=0;i<100&&!g;i++){await sl(30);g=await ev(()=>{const b=C.alive().find(e=>e.boss);return b&&b.grog>0})}
await sl(80);await sh('1198-boss-break');console.log('grog',g);
console.log('ERRS',errs);stop();await b.close()})();
