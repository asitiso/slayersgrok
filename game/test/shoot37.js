const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=60;s.maxSi=20;s.comps={gourry:2,borin:1};s.party=['gourry','borin'];G.C.buildAllies();G.C.selectStage(13)});await sl(2500);
await p.evaluate(()=>{const s=G.S();s.wave=99;s.failPow=0;G.C.startBoss()});await sl(700);await p.screenshot({path:'screenshots/276-warning-quote.jpg',type:'jpeg',quality:85});
await sl(2500);await p.evaluate(()=>{G.C.B.enemies.filter(e=>e.boss).forEach(e=>{e.hp=1})});let ok=0;for(let i=0;i<60&&!ok;i++){await sl(50);ok=await p.evaluate(()=>!!document.querySelector('.bkflash'))}await p.screenshot({path:'screenshots/277-boss-ko-flash.jpg',type:'jpeg',quality:85});await sl(1500);await p.screenshot({path:'screenshots/278-boss-clear.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{const s=G.S();s.gems=9999});console.log('borin pool',await p.evaluate(()=>G.D?1:0));
console.log(ok,'ERR',JSON.stringify(errs));await b.close()})();
