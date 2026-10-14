const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
const shot=async n=>{await sl(900);await p.screenshot({path:`screenshots/${n}.jpg`,type:'jpeg',quality:85});await p.evaluate(()=>document.querySelectorAll('.rwpop').forEach(x=>x.remove()))};
// mission bar
await p.evaluate(()=>{const s=G.S();const m=DATA.MISSIONS?DATA.MISSIONS[0]:null});
const mk=await p.evaluate(()=>{const k=document.querySelector('#mission').dataset.m;const s=G.S();return k});
await p.evaluate(k=>{const s=G.S();const M=(window.DATA||{}).MISSIONS;s.mp[k]=1e9;},mk).catch(e=>console.log('mp',e.message));
await sl(400);await p.evaluate(()=>document.querySelector('#mission').click());await shot('320-reward-mission');
// attendance
await p.evaluate(()=>G.open('event'));await sl(700);await p.evaluate(()=>document.querySelector('#attC').click());await shot('321-reward-attendance');
// pass
await p.evaluate(()=>{G.C.bpAdd(99999);G.open('pass')});await sl(700);await p.evaluate(()=>document.querySelector('.bpc.can').click());await shot('322-reward-pass');
// weekly
await p.evaluate(()=>{const s=G.S();});
console.log('mission key',mk,'ERR',JSON.stringify(errs));await b.close()})();
