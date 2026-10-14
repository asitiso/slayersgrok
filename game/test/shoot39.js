const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
console.log(await p.evaluate(()=>{const s=G.S();s.gems=1e8;const D=G.C.rates();const g={2:0,3:0,4:0};let maxGap=0,gap=0;for(let i=0;i<2000;i++){G.C.summon(10).forEach(k=>{const c=D.find(x=>x.k==k).g;g[c]++;gap=c==4?0:gap+1;maxGap=Math.max(maxGap,gap)})}return JSON.stringify({g,maxGap})}));
await p.evaluate(()=>{const s=G.S();s.gems=5000;s.pity=57;G.open('summon')});await sl(1000);await p.screenshot({path:'screenshots/281-summon-pity.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('#suRate').click());await sl(400);await p.screenshot({path:'screenshots/282-summon-rates-new.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
