const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
const sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,type:'jpeg',quality:85});
for(const [c,si,nm] of [[0,0,'250-chap1-art'],[1,7,'251-chap2-art'],[2,14,'252-chap3-art']]){await p.evaluate(([c,si])=>{document.querySelectorAll('.chap').forEach(x=>x.remove());G.chapterCard(c,si)},[c,si]);await sl(150);await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=1300}));await sl(250);await sh(nm)}
await p.evaluate(()=>{document.querySelectorAll('.chap').forEach(x=>x.remove());document.body.classList.remove('chapon');const s=G.S();s.maxSi=9;G.C.selectStage(8)});await sl(6000);await p.evaluate(()=>{document.querySelectorAll('.chap').forEach(x=>x.remove());document.body.classList.remove('chapon')});await sl(300);await sh('253-ch2-darkwood-battle');
await p.evaluate(()=>G.C.selectStage(7));await sl(5000);await sh('254-ch2-forest-battle');
await p.evaluate(()=>G.open('map'));await sl(1200);await sh('255-map-chapter-strip');
console.log('ERR',JSON.stringify(errs));await b.close()})();
