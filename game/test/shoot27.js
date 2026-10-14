const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=30;s.maxSi=6;s.si=6;s.wave=3;s.autoSpell=false;s.autoBoss=false;G.C.startBoss()});await sl(3000);
await p.evaluate(()=>{G.C.B.timer=0.05});for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('.vic.lose')))break;await sl(100)}await sl(400);
console.log('toast',await p.evaluate(()=>[...document.querySelectorAll('.toast')].map(x=>x.textContent)));await p.screenshot({path:'screenshots/239-defeat-no-notice.jpg',type:'jpeg',quality:85});
await sl(3000);await p.evaluate(()=>{G.C.gainExp(G.C.needExp()*1.01)});await sl(250);await p.screenshot({path:'screenshots/240-levelup-pillar.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{RENDER.lvT=.6});await sl(200);await p.screenshot({path:'screenshots/241-levelup-crop.jpg',type:'jpeg',quality:90,clip:{x:0,y:250,width:300,height:330}});
console.log('ERR',JSON.stringify(errs));await b.close()})();
