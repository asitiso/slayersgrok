const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>errs.push(m.type()+':'+m.text()));
await p.goto('http://127.0.0.1:18791/index.html',{timeout:200000});await sl(2500);
await p.evaluate(()=>{RENDER.cutPin=.5;RENDER.cut={t:.5,n:'x'}});await sl(800);
console.log(await p.evaluate(()=>[JSON.stringify(RENDER.cut),document.body.className,typeof RENDER.frame]),errs.slice(0,5));await b.close()})();
