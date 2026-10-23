// trace one event at 4x, aggregate main-thread timeline events: node test/evtrace.js "<setup>" "<event>" [ms]
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');const SETUP=process.argv[2]||'',EVT=process.argv[3]||'0',MS=+(process.argv[4]||1500);
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0});const cdp=await p.target().createCDPSession();await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
if(SETUP){await p.evaluate(SETUP);await sl(2500)}
await p.tracing.start({path:'/tmp/ev.trace.json',categories:['devtools.timeline','disabled-by-default-devtools.timeline','blink','cc','gpu','v8.execute']});await p.evaluate(EVT);await sl(MS);await p.tracing.stop();
const T=JSON.parse(fs.readFileSync('/tmp/ev.trace.json','utf8'));const ev=(T.traceEvents||T);const mainTid=(()=>{const c={};ev.filter(e=>e.name=='FunctionCall'||e.name=='Paint').forEach(e=>c[e.pid+':'+e.tid]=(c[e.pid+':'+e.tid]||0)+1);return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0]})();
const agg={},th={};ev.filter(e=>e.ph=='X'&&e.dur).forEach(e=>{const k=e.pid+':'+e.tid;th[k]=th[k]||{};th[k][e.name]=(th[k][e.name]||0)+e.dur/1000});
const tn={};ev.filter(e=>e.name=='thread_name').forEach(e=>tn[e.pid+':'+e.tid]=e.args.name);
for(const k in th){const tot=th[k];const top=Object.entries(tot).sort((a,b)=>b[1]-a[1]).slice(0,10);if(top[0][1]<30)continue;console.log('==',tn[k]||k,k==mainTid?'(main)':'');top.forEach(([n,v])=>console.log(v.toFixed(1).padStart(8),n))}
const tasks=ev.filter(e=>e.ph=='X'&&e.pid+':'+e.tid==mainTid&&(e.name=='RunTask'||e.name=='ThreadControllerImpl::RunTask')&&e.dur>50000).map(e=>(e.dur/1000).toFixed(0));console.log('main long tasks',tasks.length,tasks.join(','));await b.close()})();
