const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
const sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,type:'jpeg',quality:85});
await p.evaluate(()=>{const s=G.S();s.lv=40;s.maxSi=10;s.autoSpell=false;G.C.selectStage(6)});await sl(2500);
await p.evaluate(()=>{RENDER.cutPin=.55;RENDER.cut={t:.55,n:'드래곤 슬레이브'}});await sl(700);null;await p.evaluate(()=>{RENDER.cutPin=null;RENDER.cut=null});
const fire=async(fx,name)=>{await p.evaluate(fx=>{G.set=null;localStorage.setItem('slayers_set',JSON.stringify({fx}));G.applySet();const B=G.C.B;B.cds.fire=0;B.lock=0;G.C.castSpell(DATA.SPELLS.find(x=>x.k=='fire'))},fx);await sl(450);console.log(name,await p.evaluate(()=>RENDER._dbgCounts?RENDER._dbgCounts():null));await sh(name)};

await p.evaluate(()=>{G.set=null;localStorage.setItem('slayers_set','{}');G.applySet();const s=G.S();s.gems=99999;G.open('summon')});await sl(800);
await p.evaluate(()=>document.querySelector('#su10').click());await sl(100);
for(const [ms,nm] of [[100,'227-summon-backs'],[900,'228-summon-flipping'],[2600,'229-summon-revealed']]){await p.evaluate(ms=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=ms}),ms);await sl(300);await sh(nm)}
console.log('ERR',JSON.stringify(errs));await b.close()})();
