// r274: battle frame-time probe for hit-burst sprites. Busy field swarm (8-15 mobs) with bigsave; measures R.frame CPU cost + rAF interval over 12s.
// usage: node test/perf1351.js [label] [shot]
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty,.bwarn').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;try{closeScreen()}catch(_){}});
await clr();await sl(3000);await clr();
const lab=process.argv[2]||'run';
const r=await p.evaluate(async()=>{let BAL0=null;const of=R.frame;const ft=[],ra=[];let ne=0,nb=0,nbm=0,n=0;R.frame=dt=>{if(n%30==0&&!C.B.boss&&C.B.enemies.filter(e=>e.hp>0).length<8){BAL0=BAL0||D.BAL;C.spawn()}const t=performance.now();of(dt);ft.push(performance.now()-t);n++;ne+=C.B.enemies.filter(e=>e.hp>0).length;if(R._hbN){const a=R._hbN();nb+=a;nbm=Math.max(nbm,a)}};let last=performance.now();let go=1;const raf=()=>{const t=performance.now();ra.push(t-last);last=t;if(go)requestAnimationFrame(raf)};requestAnimationFrame(raf);
 await new Promise(r=>setTimeout(r,12000));go=0;R.frame=of;const s=a=>{const q=[...a].sort((x,y)=>x-y);return {avg:+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2),p95:+q[Math.floor(q.length*.95)].toFixed(2),max:+q[q.length-1].toFixed(2)}};return {frames:n,frameCPU:s(ft),raf:s(ra.slice(5)),fps:+(1000/s(ra.slice(5)).avg).toFixed(1),avgEnemies:+(ne/n).toFixed(1),avgBursts:+(nb/n).toFixed(2),maxBursts:nbm,pool:R._hbP?R._hbP():null}});
console.log(lab,JSON.stringify(r));
if(process.argv[3]){await clr();
 // wait for a frame with a live crit burst + several hit bursts, then shoot
 for(let i=0;i<80;i++){const ok=await p.evaluate(()=>R._hbN&&R._hbN()>=3&&R._hbCrit&&R._hbCrit()>0);if(ok)break;await sl(60)}
 await p.screenshot({path:'../screenshots/'+process.argv[3]+'.jpg',type:'jpeg',quality:88});
 for(let i=0;i<120;i++){const ok=await p.evaluate(()=>R._hbCrit&&R._hbCrit()>0);if(ok)break;await sl(40)}
 const cr=await p.evaluate(()=>R._hbCritXY&&R._hbCritXY());console.log('critXY',JSON.stringify(cr));
 if(cr){await p.screenshot({path:'../screenshots/'+process.argv[3]+'b_closeup.jpg',type:'jpeg',quality:92,clip:{x:Math.max(0,Math.min(390-200,cr.x-100)),y:Math.max(0,cr.y-130),width:200,height:200}})}
}
console.log('ERRS',JSON.stringify(errs));await b.close()})();
