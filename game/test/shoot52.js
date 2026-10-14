const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(2500);
await p.evaluate(()=>G.open('enhance'));await sl(600);await p.screenshot({path:'screenshots/361-enhance-empty-fixed.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('#goRoll').click());await sl(600);await p.screenshot({path:'screenshots/362-goroll-gear-sheet.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
