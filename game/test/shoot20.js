const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
await p.evaluate(()=>{const s=G.S();s.orbs=200;s.lv=30;s.maxSi=20;G.setTab('gear')});await sl(1200);await p.screenshot({path:'screenshots/208-gear-before.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('#rollEq').click());await sl(250);await p.screenshot({path:'screenshots/209-autoequip-result.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('.modal button,.modal .pill')?.click());await sl(400);await p.screenshot({path:'screenshots/210-gear-after.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
