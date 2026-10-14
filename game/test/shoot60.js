const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=f=>p.evaluate(f);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(2000);
console.log('week',await ev(()=>G.C.week()));
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=30;s.maxSi=14;s.comps={gourry:2,amelia:2,xellos:1};s.party=['gourry','amelia','xellos'];G.C.buildAllies();s.arena.pend={league:'실버',gem:100};G.open('arena')});await sl(900);await sh('412-arena-main');
await ev(()=>document.querySelector('#wk').click());await sl(1200);await sh('413-arena-season-reward');await ev(()=>document.querySelectorAll('.rwpop').forEach(x=>x.remove()));
await ev(()=>document.querySelector('[data-f="2"]').click());await sl(1500);await sh('414-arena-replay-mid');await sl(1800);await sh('415-arena-replay-late');await sl(3500);await sh('416-arena-result');
await ev(()=>document.querySelector('#arOk').click());await sl(400);
for(let i=0;i<4;i++){await ev(()=>document.querySelector('[data-f="0"]').click());await sl(300);await ev(()=>document.querySelector('#arSkip').click());await sl(500);await ev(()=>document.querySelector('#arOk').click());await sl(300)}
const t=await ev(()=>G.S().arena.tickets);await ev(()=>document.querySelector('[data-f="0"]').click());await sl(500);await sh('417-arena-no-tries');
await ev(()=>document.querySelector('.arlogc').scrollIntoView());await sl(300);await sh('418-arena-log');
await ev(()=>document.querySelector('[data-rp="0"]').click());await sl(1600);await sh('419-arena-rewatch');
console.log('tickets',t,await ev(()=>JSON.stringify(G.S().arena.log.map(x=>[x.win,x.d]))),'ERR',errs);await b.close()})();
