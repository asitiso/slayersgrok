const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.maxSi=9;G.C.selectStage(8)});await sl(4500);await p.evaluate(()=>{document.querySelectorAll('.chap').forEach(x=>x.remove());document.body.classList.remove('chapon')});await sl(300);
await p.screenshot({path:'screenshots/256-ch2-purpleforest.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{G.S().idleAt=G.C.now()-2.5*3600*1000});await sl(500);await p.evaluate(()=>document.getAnimations().forEach(a=>{if(a.animationName=='ibob'){a.pause();a.currentTime=250}}));await sl(200);


console.log('cls',await p.evaluate(()=>document.querySelector('#idleBtn').className),'ERR',JSON.stringify(errs));await b.close()})();
