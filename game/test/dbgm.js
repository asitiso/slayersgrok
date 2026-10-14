const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844});
await p.goto('http://127.0.0.1:18791/index.html',{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S(),m=DATA.MISSIONS[0];s.mp[m.k]=m.goal});await sl(600);
console.log(await p.evaluate(()=>{const e=document.querySelector('#mission'),c=getComputedStyle(e);return [e.className,c.borderTopWidth,c.borderTopColor,c.backgroundImage.slice(0,60),c.animationName,document.querySelectorAll('.mission').length,[...document.styleSheets].map(s=>s.href)]}));await b.close()})();
