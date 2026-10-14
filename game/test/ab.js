const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
await p.evaluate(()=>{const s=G.S();s.maxSi=20;s.lv=30;s.stl.hp=300;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1};s.party=['gourry','zelgadis','amelia','xellos'];s.autoSpell=true;s.autoBoss=false;G.C.buildAllies();G.C.selectStage(14);const f=RENDER.frame;window.__t=[];RENDER.frame=function(){const t=performance.now();const r=f.apply(this,arguments);__t.push(performance.now()-t);return r}});await sl(2000);
const m=()=>p.evaluate(()=>new Promise(r=>{__t=[];let n=0;const t0=performance.now();(function l(){n++;if(performance.now()-t0<4000)requestAnimationFrame(l);else{const a=__t.slice().sort((x,y)=>x-y);r({fps:(n/4).toFixed(1),avg:(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2),p95:a[Math.floor(a.length*.95)].toFixed(2)})}})()}));
for(const ns of [false,true,false,true]){await p.evaluate(v=>RENDER.noScale=v,ns);await sl(500);console.log(ns?'noCache':'cache',JSON.stringify(await m()))}
await b.close()})();
