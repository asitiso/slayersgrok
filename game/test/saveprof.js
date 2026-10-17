const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
const TH=+(process.argv[2]||1),DUR=+(process.argv[3]||20000);
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:60000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.evaluateOnNewDocument(()=>{const W=window.__SP={w:[],lt:[]};const si=Storage.prototype.setItem,js=JSON.stringify;
 JSON.stringify=function(...a){const t=performance.now(),r=js.apply(this,a);const d=performance.now()-t;if(d>0.3&&r&&r.length>2000)W.w.push({k:'str',ms:d,n:r.length,st:(new Error).stack.split('\n')[2]||''});return r};
 Storage.prototype.setItem=function(k,v){const t=performance.now();si.call(this,k,v);const d=performance.now()-t;W.w.push({k,ms:d,n:(v||'').length,at:t});};
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())W.lt.push({at:e.startTime,ms:e.duration})}).observe({type:'longtask',buffered:true})}catch(_){}
 let lf=0;W.fr=[];const f=t=>{if(lf)W.fr.push([t,t-lf]);lf=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>{G.noSave=1;localStorage.clear()});
if(process.env.BIG){const s=require('fs').readFileSync(process.env.BIG,'utf8');await p.evaluate(s=>{G.noSave=1;localStorage.setItem('slayers_save_v2',s)},s)}
await p.goto(U);await sl(3000);await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice').forEach(x=>x.remove());__SP.w.length=0;__SP.fr.length=0;__SP.lt.length=0});
const cdp=await p.target().createCDPSession();await cdp.send('Emulation.setCPUThrottlingRate',{rate:TH});
const t0=Date.now();await sl(DUR/2);
await p.evaluate(()=>{document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new Event('pagehide'))});await sl(DUR/2);
const r=await p.evaluate(()=>{const W=__SP;const sv=W.w.filter(x=>x.k=='slayers_save_v2');const st=W.w.filter(x=>x.k=='str');
 // frames that contain a save write
 const hit=W.fr.filter(([t,d])=>sv.some(s=>s.at<=t&&s.at>=t-d));
 const mx=a=>a.length?Math.max(...a).toFixed(2):'-',av=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2):'-';
 return {writes:sv.length,bytes:sv[0]&&sv[0].n,setItem_avg:av(sv.map(x=>x.ms)),setItem_max:mx(sv.map(x=>x.ms)),stringify_n:st.length,stringify_avg:av(st.map(x=>x.ms)),stringify_max:mx(st.map(x=>x.ms)),saveFrameMax:mx(hit.map(x=>x[1])),saveFrames:hit.map(x=>x[1].toFixed(1)).join(','),frameMedian:(W.fr.map(x=>x[1]).sort((a,b)=>a-b)[W.fr.length>>1]||0).toFixed(1),frames:W.fr.length,other:[...new Set(W.w.filter(x=>x.k!='str'&&x.k!='slayers_save_v2').map(x=>x.k))].join(',')}});
r.SV=await p.evaluate(()=>G._SV?{n:G._SV.n,bytes:G._SV.bytes,ms:G._SV.ms.slice(-12).map(x=>x.join(":")).join(" "),err:G._SV.err}:null);r.secs=(Date.now()-t0)/1000;if(process.env.OUT)require("fs").writeFileSync(process.env.OUT,JSON.stringify(await p.evaluate(()=>({fr:__SP.fr,sv:__SP.w.filter(x=>x.k=="slayers_save_v2").map(x=>[x.at,x.ms]),sm:G._SV?G._SV.ms:[]}))));r.throttle=TH;console.log(JSON.stringify(r));console.log('ERRS',errs.slice(0,3));await b.close()})();
