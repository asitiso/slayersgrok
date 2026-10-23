// A/B real frame cost (no forced flush) by toggling one feature per phase at 4x
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');const TH=+(process.argv[2]||4),PH=+(process.argv[3]||8000);
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:120000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});
await p.evaluateOnNewDocument(()=>{let lf=0;window.__FR=[];const f=t=>{if(lf)__FR.push(t-lf);lf=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate((s)=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));await p.goto(U);await sl(3000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.S().tut=9});
const cdp=await p.target().createCDPSession();await cdp.send('Emulation.setCPUThrottlingRate',{rate:TH});await sl(6000);
const ph=(process.env.PH||'base').split('§');
for(const c of ph){await p.evaluate(c=>{window.__RST&&__RST();if(c!=='base')(0,eval)(c);__FR.length=0},c);await sl(PH);const r=await p.evaluate(()=>{const a=__FR.slice().sort((x,y)=>x-y);return [a[a.length>>1],a[Math.floor(a.length*.9)],a.length,G.C.B.boss?1:0]});console.log(c.slice(0,60).padEnd(60),'med',r[0].toFixed(1),'p90',r[1].toFixed(1),'n',r[2],'boss',r[3])}
await b.close()})();
