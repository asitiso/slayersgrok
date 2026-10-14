const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844});
await p.goto('http://127.0.0.1:18791/index.html',{timeout:200000});await sl(2000);
await p.evaluate(()=>{G.S().idleAt=G.C.now()-2.5*3600*1000});await sl(600);
console.log(await p.evaluate(()=>{const e=document.querySelector('#idleBtn'),sm=e.querySelector('small'),im=e.querySelector('img'),bf=getComputedStyle(e,'::before');return {cls:e.className,col:getComputedStyle(sm).color,imgAnim:getComputedStyle(im).animationName,imgFilter:getComputedStyle(im).filter,bfContent:bf.content,bfW:bf.width,bfAnim:bf.animationName,z:getComputedStyle(e).zIndex}}));await b.close()})();
