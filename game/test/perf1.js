const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.evaluateOnNewDocument(()=>{const o=window.requestAnimationFrame.bind(window);window._rw=[];window.requestAnimationFrame=cb=>o(t=>{const a=performance.now();cb(t);window._rw.push(performance.now()-a)})});await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await clr();await ev(()=>{const s=G.S();s.maxSi=34;s.autoBoss=false;s.lv=60;G.C.buildAllies();G.C.selectStage(20)});await sl(3000);await clr();
const meas=async(lab,setup,ms)=>{await ev(setup);await sl(400);
 const r=await ev(ms=>new Promise(res=>{const ft=[];let l=performance.now(),s=l;let lt=0;const ob=new PerformanceObserver(e=>e.getEntries().forEach(x=>lt+=x.duration));try{ob.observe({entryTypes:['longtask']})}catch(_){}
  window._rw.length=0;const f=t=>{const n=performance.now();ft.push(n-l);l=n;if(n-s<ms)requestAnimationFrame(f);else{ob.disconnect();ft.sort((a,b)=>a-b);const avg=ft.reduce((a,b)=>a+b,0)/ft.length;const w=window._rw.slice().sort((a,b)=>a-b);res({work:+(w.reduce((a,b)=>a+b,0)/Math.max(1,ft.length)).toFixed(2),wp95:+(w[Math.floor(w.length*.95)]||0).toFixed(2),fps:+(1000/avg).toFixed(1),avg:+avg.toFixed(2),p95:+ft[Math.floor(ft.length*.95)].toFixed(1),max:+ft[ft.length-1].toFixed(1),longtask:Math.round(lt),en:G.C.B.enemies.length,P:typeof P!=='undefined'?P.length:-1,dom:document.getElementsByTagName('*').length,heap:Math.round(performance.memory.usedJSHeapSize/1e6)})}};requestAnimationFrame(f)}),ms);
 console.log(lab,JSON.stringify(r));return r};
const prof=process.env.PROF;const cdp=await p.target().createCDPSession();
if(prof){await cdp.send('Profiler.enable');await cdp.send('Profiler.setSamplingInterval',{interval:200});await cdp.send('Profiler.start')}
await cdp.send('Emulation.setCPUThrottlingRate',{rate:+(process.env.THR||4)});const swarm=()=>{const C=G.C;const all=[];for(let k=0;k<4;k++){C.spawn();all.push(...C.B.enemies)}all.forEach(e=>{e.hp*=1e4;e.mhp=(e.mhp||e.hp)});C.B.enemies=all;R.opt.fx=true};
await meas('swarm',swarm,8000);
await ev(()=>{G.C.startBoss()});await sl(2500);await clr();
await meas('boss',()=>{R.opt.fx=true},8000);
await meas('idle',()=>{},4000);
if(prof){const {profile}=await cdp.send('Profiler.stop');const self={};const byId={};profile.nodes.forEach(n=>byId[n.id]=n);const dt=profile.timeDeltas;const cnt={};profile.samples.forEach((id,i)=>cnt[id]=(cnt[id]||0)+(dt[i]||0));
 for(const id in cnt){const n=byId[id].callFrame;const k=(n.functionName||'(anon)')+' '+n.url.split('/').pop()+':'+n.lineNumber+':'+n.columnNumber;self[k]=(self[k]||0)+cnt[id]}
 const tot=Object.values(self).reduce((a,b)=>a+b,0);Object.entries(self).sort((a,b)=>b[1]-a[1]).slice(0,25).forEach(([k,v])=>console.log((v/tot*100).toFixed(1)+'%',k))}
console.log('ERRS',errs.slice(0,5));stop();await b.close()})();
