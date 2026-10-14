const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844});
await p.goto('http://127.0.0.1:18791/index.html',{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=30;s.maxSi=6;s.si=6;s.wave=3;G.C.startBoss()});await sl(3500);
console.log(await p.evaluate(()=>{const B=G.C.B,e=B.enemies[0];if(e)e.hp=e.max*.47;return JSON.stringify({boss:B.boss,n:B.enemies.length,e0:e&&[e.n,e.boss,e.hp,e.max]})}));await sl(400);
console.log(await p.evaluate(()=>[document.querySelector('#stBar').style.cssText,document.querySelector('#stBar').parentElement.style.cssText,document.querySelector('#stInfo').textContent]));await b.close()})();
