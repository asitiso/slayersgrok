const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=f=>p.evaluate(f);const clr=()=>ev(()=>document.querySelectorAll('.rwpop,.modal').forEach(x=>x.remove()));
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(2000);
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=30;s.maxSi=14;s.comps={gourry:2,amelia:2,xellos:1};s.party=['gourry','amelia','xellos'];G.C.buildAllies();G.open('arena')});await sl(900);await sh('420-arena-newbg');
await ev(()=>document.querySelector('[data-f="2"]').click());await sl(1800);await sh('421-arena-replay-newbg');await ev(()=>{document.querySelector('#arSkip')&&document.querySelector('#arSkip').click()});await sl(400);await ev(()=>document.querySelector('#arOk').click());
await ev(()=>{G.close();document.querySelector('#menuBtn').click()});await sl(500);await sh('422-menu-tower');
await ev(()=>document.querySelector('#mgrid a[data-s=tower]').click());await sl(800);await sh('423-tower-main');
await ev(()=>document.querySelector('#twGo').click());await sl(700);await sh('424-tower-fight');await sl(1000);await sh('425-tower-clear');await clr();
await ev(()=>{G.C.tower().f=8});await ev(()=>G.open('tower'));await sl(300);
for(let i=0;i<3;i++){await ev(()=>document.querySelector('#twGo').click());await sl(1500);await clr()}
await sh('426-tower-floor10-done-or-fail');
await ev(()=>document.querySelector('#twD').click());await sl(1000);await sh('427-tower-daily');await clr();await sl(300);await sh('428-tower-list');
console.log('tw',await ev(()=>JSON.stringify([G.C.tower(),G.C.POW(),G.C.T.req(10)])),'ERR',errs);await b.close()})();
