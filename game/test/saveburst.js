const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();const U='http://127.0.0.1:18791/index.html';
await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s)},fs.readFileSync('/tmp/bigsave.json','utf8'));await p.goto(U);await sl(2000);
const cdp=await p.target().createCDPSession();await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
const r=[];for(const n of [1,10,50]){r.push([n,await p.evaluate(n=>{const t=performance.now();for(let i=0;i<n;i++)G.save();return +(performance.now()-t).toFixed(2)},n)]);await sl(3000)}
console.log('burst sync ms (4x):',JSON.stringify(r));await b.close()})();
