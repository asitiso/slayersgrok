const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=40;s.maxSi=10;s.comps={gourry:1,sera:1,zelgadis:1};s.party=['gourry','sera','zelgadis'];G.C.buildAllies();G.C.selectStage(8)});
let maxX=0,n=294;const t0=Date.now();let al=0,shotE=0;
while(Date.now()-t0<26000){await sl(150);const r=await p.evaluate(()=>{const W=390;let m=0;RENDER._ES&&0;return {el:!!(RENDER.elT&&RENDER.elT.t<.5),has:G.C.alive().some(e=>e.el)}});
 if(r.el&&!al){al=1;await p.evaluate(()=>document.querySelectorAll('.chap').forEach(x=>x.remove()));await p.screenshot({path:`screenshots/${n++}-elite-alert.jpg`,type:'jpeg',quality:86})}
 if(r.has&&!shotE&&Date.now()-t0>6000){shotE=1;await sl(800);await p.screenshot({path:`screenshots/${n++}-elite-visible-btns.jpg`,type:'jpeg',quality:86})}}
await p.screenshot({path:`screenshots/${n++}-battle-right-edge.jpg`,type:'jpeg',quality:86});
console.log('al',al,'shotE',shotE,'ERR',JSON.stringify(errs));await b.close()})();
