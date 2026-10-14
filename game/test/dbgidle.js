const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});
await p.goto('http://127.0.0.1:18791/index.html',{timeout:200000});await sl(2000);
await p.evaluate(()=>{G.S().idleAt=G.C.now()-2.5*3600*1000});await sl(600);
const r=await p.evaluate(()=>{const e=document.querySelector('#idleBtn'),q=e.getBoundingClientRect();return [q.x,q.y,q.width,q.height,getComputedStyle(e).display,e.className]});console.log(r);
await p.evaluate(()=>document.getAnimations().forEach(a=>{if(a.animationName=='ibob'||a.animationName=='irot'){a.pause();a.currentTime=250}}));await sl(200);
await p.screenshot({path:'screenshots/257-idle-ready.jpg',type:'jpeg',quality:90,clip:{x:r[0]-30,y:r[1]-20,width:r[2]+60,height:r[3]+30}});
await p.evaluate(()=>{G.S().idleAt=G.C.now()-9*3600*1000});await sl(600);await p.screenshot({path:'screenshots/258-idle-max.jpg',type:'jpeg',quality:90,clip:{x:r[0]-30,y:r[1]-20,width:r[2]+60,height:r[3]+30}});await b.close()})();
