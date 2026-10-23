// r259: v210 locked-region gate — real bigsave (maxSi 34 → ch1-5 open, ch6 next-locked, ch7 far). 1327 world map with gates; 1328 one-time gate-break on ch5's pin (seen-set fixture: ch5 un-marked).
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;openScreen('map')});await sl(500);
await p.evaluate(()=>document.querySelector('#wBtn').click());await sl(300);
const inf=()=>p.evaluate(()=>({seen:localStorage.getItem('slayers_gateseen'),maxSi:C.S().maxSi,pins:[...document.querySelectorAll('.wpin')].map(x=>{const g=x.querySelector('.wgt'),q=(g||x).getBoundingClientRect();return [x.dataset.ch,x.className,g?g.innerText.replace(/\n/g,' '):'',!!x.querySelector('.wgo'),Math.round(q.left),Math.round(q.top),Math.round(q.width)]})}));
await p.evaluate(()=>{document.querySelector('#mapw').scrollLeft=760});await sl(1200);console.log('locked',JSON.stringify(await inf()));
await p.screenshot({path:'../screenshots/1327_locked_gate.jpg',type:'jpeg',quality:88});
await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('slayers_gateseen'));delete s[4];localStorage.setItem('slayers_gateseen',JSON.stringify(s));G.mapCh=-1;renderScreen()});await sl(100);
await p.evaluate(()=>{document.querySelector('#mapw').scrollLeft=640});await sl(820);console.log('unlock',JSON.stringify(await inf()),await p.evaluate(()=>JSON.stringify(document.querySelector('.wgo').getBoundingClientRect())));
await p.screenshot({path:'../screenshots/1328_gate_unlock.jpg',type:'jpeg',quality:88});await sl(1500);console.log('after',JSON.stringify((await inf()).pins.filter(x=>x[3])));
await p.evaluate(()=>{const s=G.loadSet();s.fx=0;G.applySet();const o=JSON.parse(localStorage.getItem('slayers_gateseen'));delete o[4];localStorage.setItem('slayers_gateseen',JSON.stringify(o));G.mapCh=-1;renderScreen()});await sl(100);console.log('lite',JSON.stringify((await inf()).pins.filter(x=>x[3]||x[1].includes('lk')).map(x=>x.slice(0,4))),await p.evaluate(()=>document.querySelector('.wgt').className));
console.log('errs',JSON.stringify(errs));await b.close()})();
