const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=f=>p.evaluate(f);const clr=()=>ev(()=>document.querySelectorAll('.rwpop,.modal').forEach(x=>x.remove()));
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(2000);
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=30;s.maxSi=14;s.gold=2e5;s.gems=5000;s.mile=200;s.comps.gourry=1;G.C.buildAllies();document.querySelector('#menuBtn').click()});await sl(500);await sh('437-menu-staricon-pet');
const m=await ev(()=>{const a=G.S().csh?.gourry||0,st=G.S().comps.gourry;G.C.mileSummon('gourry');return [a,G.S().csh.gourry,st,G.S().comps.gourry]});console.log('mile',m);
await ev(()=>{document.querySelector('#menuClose').click();G.open('pet')});await sl(600);await sh('438-pet-screen');
await ev(()=>document.querySelector('#ptHatch').click());await sl(400);await sh('439-pet-hatch-anim');await sl(1200);await sh('440-pet-hatch-result');await clr();
for(let i=0;i<5;i++){await ev(()=>document.querySelector('#ptHatch').click());await sl(150);await clr()}
await ev(()=>G.open('pet'));await sl(300);await ev(()=>{const u=document.querySelector('#ptUp');u&&u.click()});await sl(300);await sh('441-pet-collection');
const pw=await ev(()=>[G.C.POW(),JSON.stringify(G.S().pet)]);console.log(pw);
await ev(()=>G.close());await sl(2500);await sh('442-pet-in-battle');
await p.screenshot({path:'screenshots/443-pet-battle-crop.jpg',type:'jpeg',quality:90,clip:{x:0,y:380,width:250,height:300}});
console.log('ERR',errs);await b.close()})();
