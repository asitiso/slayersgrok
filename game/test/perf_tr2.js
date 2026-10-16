const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await clr();await ev(()=>{const s=G.S();s.maxSi=34;s.autoBoss=false;s.lv=60;G.C.buildAllies();G.C.selectStage(20)});await sl(3000);await clr();
const SC=process.env.SC||'boss';
if(SC=='boss'){await ev(()=>G.C.startBoss());await sl(3500);await clr()}else{await ev(()=>{const C=G.C;const all=[];for(let k=0;k<4;k++){C.spawn();all.push(...C.B.enemies)}C.B.enemies=all;R.opt.fx=true});await sl(300)}
await p.tracing.start({path:'/tmp/tr2.json',categories:['devtools.timeline']});await sl(5000);await p.tracing.stop();
const T=JSON.parse(require('fs').readFileSync('/tmp/tr2.json')).traceEvents;const thr={};T.filter(e=>e.name=='thread_name').forEach(e=>thr[e.pid+':'+e.tid]=e.args.name);
const M=T.filter(e=>e.ph=='X'&&thr[e.pid+':'+e.tid]=='CrRendererMain');const top=M.filter(e=>e.name=='RunTask');const busy=top.reduce((a,e)=>a+e.dur,0)/1000;
const fr=M.filter(e=>e.name=='FireAnimationFrame').length;const s={};['FireAnimationFrame','UpdateLayoutTree','Layout','Paint','Commit','TimerFire','ParseHTML'].forEach(n=>s[n]=+(M.filter(e=>e.name==n).reduce((a,e)=>a+e.dur,0)/1000/Math.max(1,fr)).toFixed(2));
console.log(SC,JSON.stringify({frames:fr,fps:+(fr/5).toFixed(1),busyPerFrame:+(busy/fr).toFixed(2),...s}));
stop();await b.close()})();
