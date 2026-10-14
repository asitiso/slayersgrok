const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=35;s.maxSi=6;s.si=6;s.wave=3;s.autoSpell=false;s.autoBoss=false;G.C.startBoss()});await sl(3000);
await p.evaluate(()=>{G.C.B.enemies[0].hp=1});for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('.vic')))break;await sl(100)}await sl(300);await p.screenshot({path:'screenshots/x245.jpg',type:'jpeg',quality:85});
for(let i=0;i<60;i++){if(await p.evaluate(()=>!!document.querySelector('.chap')))break;await sl(100)}
await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=1200}));await sl(200);await p.screenshot({path:'screenshots/248-chapter2-clean.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{document.querySelectorAll('.chap,.vic').forEach(x=>x.remove());G.chapterCard(2,14)});await sl(100);await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=1200}));await sl(200);await p.screenshot({path:'screenshots/249-chapter3-clean.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
