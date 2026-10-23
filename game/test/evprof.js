// event-path profiler at CPU throttle: sync handler ms, long tasks and worst frame in the 1.2s after each event
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');const TH=+(process.argv[2]||4),OUT=process.argv[3];
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.evaluateOnNewDocument(()=>{const W=window.__EP={lt:[],fr:[]};try{new PerformanceObserver(l=>{for(const e of l.getEntries())W.lt.push([e.startTime,e.duration])}).observe({type:'longtask',buffered:true})}catch(_){}let lf=0;const f=t=>{if(lf)W.fr.push([t,t-lf]);lf=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0,bubble:1}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());const s=G.S();s.gems=1e6;s.gold=1e12;s.tickets=999;G.storyOn=0});
const cdp=await p.target().createCDPSession();await cdp.send('Emulation.setCPUThrottlingRate',{rate:TH});await sl(3000);
const clean=`document.querySelectorAll('.modal,#notice,.sty,.unl,.chap,.vic,.gres,.res').forEach(x=>x.remove())`;
const EV=[
 ['open party',`openScreen('party')`],['close',`closeScreen()`],
 ['open bag',`openScreen('bag')`],['gear equip',`(()=>{const e=[...document.querySelectorAll('#screen [data-eq],#screen [data-bag],#screen .gi,#screen .bagi')][0];if(!e)return 'nogear';e.click();const q=[...document.querySelectorAll('.modal .pill,.modal .btn,#screen .pill')].find(x=>/장착/.test(x.textContent));q&&q.click();return q?'eq':'noeqbtn'})()`],['close',`closeScreen()`],
 ['open summon',`openScreen('summon')`],['gacha x10',`(()=>{const q=[...document.querySelectorAll('#screen .pill,#screen .btn,#screen [data-sm],#screen button')].filter(x=>/10/.test(x.textContent)&&!/off/.test(x.className));if(!q[0])return 'nobtn';q[0].click();return q[0].textContent.trim().slice(0,12)})()`],['gacha close',clean+`;closeScreen()`],
 ['open shop',`openScreen('shop')`],['close',`closeScreen()`],
 ['open mission',`openScreen('ach')`],['claim',`(()=>{const q=[...document.querySelectorAll('#screen .pill,#screen .btn')].filter(x=>/받기|수령/.test(x.textContent)&&!/off/.test(x.className));if(!q[0])return 'none';q[0].click();return 'ok'})()`],['close',`closeScreen()`],
 ['open settings',`openScreen('settings')`],['close',`closeScreen()`],
 ['level-up',`C.gainExp(C.needExp()*1.05)`],
 ['stage clear',`(()=>{try{C.startBoss()}catch(e){};setTimeout(()=>{for(const e of C.alive())e.hp=0},50);return 'boss'})()`],
];
const res=[];for(const [n,code] of EV){const r=await p.evaluate(code=>{const t=performance.now();let o;try{o=(0,eval)(code)}catch(e){o='ERR '+e.message}return [t,performance.now()-t,String(o||'')]},code);await sl(n=='stage clear'?4000:1400);
 const w=await p.evaluate(t0=>{const lt=__EP.lt.filter(x=>x[0]>=t0-5&&x[0]<t0+3500),fr=__EP.fr.filter(x=>x[0]>t0&&x[0]<t0+1400);return [lt.length,lt.length?Math.max(...lt.map(x=>x[1])):0,fr.length?Math.max(...fr.map(x=>x[1])):0]},r[0]);
 res.push({ev:n,sync:+r[1].toFixed(1),lt:w[0],ltMax:+w[1].toFixed(0),frMax:+w[2].toFixed(0),note:r[2]});await p.evaluate(clean)}
// battle frame median at 4x, 20s
await p.evaluate(()=>{closeScreen&&G.screen&&closeScreen();__EP.fr.length=0});await sl(20000);const bm=await p.evaluate(()=>{const a=__EP.fr.map(x=>x[1]).sort((x,y)=>x-y);return {n:a.length,med:+a[a.length>>1].toFixed(1),p90:+a[Math.floor(a.length*.9)].toFixed(1),dpr:R.dprLvl(),q:R.qLvl,mode:R.qMode}});
console.table(res);console.log('battle',JSON.stringify(bm));if(OUT)fs.writeFileSync(OUT,JSON.stringify({res,bm}));console.log('ERRS',errs.slice(0,4));await b.close()})();
