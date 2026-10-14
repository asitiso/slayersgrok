const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=40;s.maxSi=10;s.comps={gourry:1,sera:1};s.party=['gourry','sera'];G.C.buildAllies();G.C.selectStage(8);RENDER.opt=Object.assign({},RENDER.opt,{cut:false})});
await sl(4500);let e=0;for(let i=0;i<200&&!e;i++){await sl(200);e=await p.evaluate(()=>{const L=G.C.alive().filter(e=>!e.boss&&RENDER._ES().get(e)&&RENDER._ES().get(e).enter>=1);if(L.length){L[0].el=1;return 1}return 0})}await sl(500);
await p.evaluate(()=>G.C.alive().filter(e=>e.el).forEach(e=>e.hp=1));let k=0;for(let i=0;i<60&&!k;i++){await sl(50);k=await p.evaluate(()=>!!(RENDER.ekT&&RENDER.ekT.t>.25))}
await p.screenshot({path:'screenshots/312-elite-kill-callout.jpg',type:'jpeg',quality:88});console.log(e,k,'ERR',JSON.stringify(errs));await b.close()})();
