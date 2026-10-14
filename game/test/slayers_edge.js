const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=40;s.maxSi=10;s.comps={gourry:1,sera:1,zelgadis:1};s.party=['gourry','sera','zelgadis'];G.C.buildAllies();G.C.selectStage(8);RENDER.opt=Object.assign({},RENDER.opt,{cut:false})});await sl(3000);
let mx=0,hist=[];for(let i=0;i<120;i++){await sl(150);const v=await p.evaluate(()=>{let m=0;G.C.alive().forEach(e=>{const s=RENDER._ES().get(e);if(s&&s.enter>=1&&!e.boss)m=Math.max(m,s.x)});return m});hist.push(Math.round(v));mx=Math.max(mx,v)}
console.log('max enemy center x',Math.round(mx),'p90',hist.sort((a,b)=>a-b)[Math.floor(hist.length*.9)]);
let shot=0;for(let i=0;i<100&&!shot;i++){await sl(200);shot=await p.evaluate(()=>G.C.alive().filter(e=>!e.res).length>=5&&!G.C.B.boss)}await p.screenshot({path:'screenshots/305-full-wave-btns.jpg',type:'jpeg',quality:86});
let e2=0;for(let i=0;i<150&&!e2;i++){await sl(200);e2=await p.evaluate(()=>{let ok=0;RENDER._ES().forEach((s,e)=>{if(e.el&&e.hp>0&&s.enter>=1)ok=1});return ok})}await sl(600);await p.screenshot({path:'screenshots/306-elite-btns-visible.jpg',type:'jpeg',quality:86});
console.log('elite',e2,'ERR',JSON.stringify(errs));await b.close()})();
