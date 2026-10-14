const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:120000,protocolTimeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:150000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:150000});await sl(1500);
await p.evaluate(()=>{const s=G.S();s.gold=2e6;s.stone=60;s.lv=30;s.maxSi=20;s.orbs=999;for(let i=0;i<60;i++){G.C.rollOnce();if(G.S().bag)G.C.equipBag()}});
await p.evaluate(k=>G.open(k),process.argv[2]);await sl(800);await p.screenshot({path:'screenshots/206-enhance-before.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('#enAll').click());await sl(700);await p.screenshot({path:'screenshots/207-enhance-all-result.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
