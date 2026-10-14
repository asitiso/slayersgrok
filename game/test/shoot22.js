const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
await p.evaluate(()=>{const s=G.S();s.lv=40;s.maxSi=10;s.autoSpell=false;G.C.selectStage(6)});await sl(3000);
await p.evaluate(()=>{const B=G.C.B;B.cds.ds=0;B.lock=0;G.C.castSpell(DATA.SPELLS.find(x=>x.k=='ds'))});
await sl(1500);let n=219;for(const [pin,nm] of [[.12,'ult-enter'],[.5,'ult-hold'],[.95,'ult-late']]){await p.evaluate(v=>{RENDER.cutPin=v;RENDER.cut={t:v,n:'드래곤 슬레이브'}},pin);console.log(await p.evaluate(()=>document.body.className+' '+JSON.stringify(RENDER.cut)));await sl(600);await p.screenshot({path:`screenshots/${n++}-${nm}.jpg`,type:'jpeg',quality:85})}
await p.evaluate(()=>{RENDER.cutPin=null});
console.log('ERR',JSON.stringify(errs));await b.close()})();
