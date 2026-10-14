const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
console.log(await p.evaluate(()=>{const s=G.S();s.gems=1e9;const c={};let N=0,pz=0;for(let i=0;i<10000;i++){G.C.summon(10).forEach(k=>{c[k]=(c[k]||0)+1;N++})}const o={};for(const k in c)o[k]=(c[k]/N*100).toFixed(2);const pc={};for(let i=0;i<4000;i++){s.pity=79;const k=G.C.summon(1)[0];pc[k]=(pc[k]||0)+1}return JSON.stringify({o,pc})}));
await p.evaluate(()=>{const s=G.S();s.gems=5000;s.comps={gourry:1};s.party=['gourry'];s.pity=0;G.C.buildAllies();G.open('summon')});await sl(800);
await p.evaluate(()=>{const o=G.C.gpick,X=G.C.rates();let n=0;G.C.gpick=()=>{n++;return n==2?{k:'xellos',g:4}:o()}});
await p.evaluate(()=>document.querySelector('#su10').click());await sl(2800);await p.screenshot({path:'screenshots/284-summon-new-up.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{document.querySelectorAll('#sumModal').forEach(x=>x.remove());document.querySelector('#suRate').click()});await sl(400);await p.screenshot({path:'screenshots/285-rates-rateup.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
