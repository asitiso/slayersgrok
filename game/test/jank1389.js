// r312: phone-like stutter probe. 4x CPU throttle, real save (page memory only, G.noSave=1), scripted session, Chrome trace -> long frames attributed.
const puppeteer=require('/workspace/slayers-game/game/test/node_modules/puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
const U=process.env.PU||'http://127.0.0.1:18791/index.html',lab=process.argv[2]||'run';
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty,.bwarn').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;try{closeScreen()}catch(_){}});
await clr();await sl(2500);await clr();
const cdp=await p.target().createCDPSession();await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await sl(1500);
const mk=n=>p.evaluate(n=>{performance.mark('step:'+n)},n);
// save replica: same work as saveNow (stringify + setItem x2 + remove) on a scratch key so the real save path stays off (G.noSave)
const sv=(idle)=>p.evaluate(idle=>{const f=()=>{performance.mark('sv0');const j=JSON.stringify(C.S());localStorage.setItem('_probe_tmp',j);localStorage.setItem('_probe',j);localStorage.removeItem('_probe_tmp');performance.measure('probe-save','sv0')};if(idle)requestIdleCallback(f,{timeout:1000});else f()},idle);
await p.tracing.start({path:(process.env.TR||'/workspace/tmpv')+'/tr_'+lab+'.json',categories:['devtools.timeline','disabled-by-default-devtools.timeline','v8','v8.execute','blink.user_timing','disabled-by-default-v8.gc','blink','loading']});
const t0=Date.now();
await mk('field');await sl(6000);
await mk('swarm');for(let i=0;i<12;i++){await p.evaluate(()=>{if(!C.B.boss&&C.B.enemies.filter(e=>e.hp>0).length<15)C.spawn()});await sl(500)}
await mk('save');await sv(1);await sl(1500);await sv(0);await sl(1500);
await mk('menu');await p.evaluate(()=>openScreen('party'));await sl(1500);await p.evaluate(()=>closeScreen());await sl(1200);await p.evaluate(()=>openScreen('map'));await sl(1500);await p.evaluate(()=>closeScreen());await sl(1500);
await mk('boss');await p.evaluate(()=>C.startBoss());await sl(9000);
await mk('stage');const si=await p.evaluate(()=>{const s=C.S(),n=s.si>0?s.si-1:Math.min(s.maxSi,s.si+1);C.selectStage(n);return [s.si,s.maxSi]});await sl(6000);
await mk('stage2');await p.evaluate(()=>{const s=C.S();const n=s.si>1?s.si-1:Math.min(s.maxSi,s.si+1);C.selectStage(n)});await sl(6000);
await mk('end');await p.tracing.stop();
console.log(lab,'session_s',((Date.now()-t0)/1000).toFixed(1),'si',JSON.stringify(si),'ERRS',JSON.stringify(errs));await b.close()})();
