const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844});const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('http://127.0.0.1:18791/index.html',{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.maxSi=9;G.C.selectStage(8)});await sl(1500);console.log('a',errs);
await p.evaluate(()=>G.open('map'));await sl(800);console.log('b',errs);await b.close()})();
