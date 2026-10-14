const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
await p.evaluate(()=>{G.S().idleAt=G.C.now()-3*3600*1000});await sl(500);
await p.evaluate(()=>document.querySelector('#idleBtn').click());await sl(700);await p.screenshot({path:'screenshots/262-idle-popup.jpg',type:'jpeg',quality:85});
const g0=await p.evaluate(()=>G.S().gold);await p.evaluate(()=>document.querySelector('#idleClaim').click());await sl(250);await p.screenshot({path:'screenshots/263-idle-coin-burst.jpg',type:'jpeg',quality:85});
await sl(500);await p.screenshot({path:'screenshots/264-idle-coins-fly.jpg',type:'jpeg',quality:85});
console.log('gold',g0,await p.evaluate(()=>G.S().gold),'ERR',JSON.stringify(errs));await b.close()})();
