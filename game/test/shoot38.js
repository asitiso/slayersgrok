const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
console.log(await p.evaluate(()=>{const s=G.S();s.gems=1e7;const c={};for(let i=0;i<200;i++){const g=G.C.summon(10);g.forEach(k=>c[k]=(c[k]||0)+1)}return JSON.stringify(c)}));
await p.evaluate(()=>{const s=G.S();s.comps={gourry:1};s.party=['gourry'];s.gems=5000;G.C.buildAllies()});
await p.evaluate(()=>G.open('summon'));await sl(1200);
let got=null;for(let i=0;i<30&&!(got||[]).includes('borin');i++){got=await p.evaluate(()=>{const s=G.S();s.gems=5000;s.comps={};return G.C.summon(10)})}
console.log('got',got);
// show real result containing borin via forced pick
await p.evaluate(()=>{const o=G.C.gpick;let n=0;G.C.gpick=()=>n++%3==0?DATA.COMPS.find(c=>c.k=='borin'):o();});
await p.evaluate(()=>{document.querySelectorAll('#sumModal').forEach(x=>x.remove());G.S().gems=5000;document.querySelector('#su10').click()});await sl(2600);await p.screenshot({path:'screenshots/279-summon-borin.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{document.querySelectorAll('#sumModal').forEach(x=>x.remove());document.querySelector('#suRate').click()});await sl(400);await p.screenshot({path:'screenshots/280-summon-rates.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
