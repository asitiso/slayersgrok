const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s254');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await ev(()=>{const s=G.S();s.lv=30});
await ev(()=>G.open('friend'));await sl(1200);await ev(()=>document.querySelectorAll('#notice,.modal,.unl,.chap,.banner,.tut').forEach(x=>x.remove()));await sh('1100-friend-tavern');
await ev(()=>{const r=document.querySelectorAll('.frr [data-s]');r[0].click()});await sl(600);await ev(()=>document.querySelector('.frr').scrollIntoView({block:'center'}));await sl(300);await sh('1101-friend-heart-sent');
const cl=()=>ev(()=>document.querySelectorAll('#notice,.unl,.chap,.banner,.tut,.rwpop,.modal').forEach(x=>x.remove()));
await ev(()=>{const s=G.S();s.comps={gourry:2,xellos:1,borin:1,amelia:6};s.csh={gourry:14,xellos:6,borin:12,amelia:3};G.enTab='comp';G.trSel='xellos';G.open('enhance')});await sl(1000);await cl();await sh('1129-gallery-legend-glow');
await ev(()=>document.querySelector('.trstage').scrollIntoView({block:'start'}));await sl(300);await ev(()=>document.querySelector('#screen .sbody').scrollTop+=2000);await sl(400);await sh('1130-comp-no-dup-rows');
const L=['bag','relic','talent','bond','fish','gallery','sim','star','idle','kill','barracks','castle','party','menu','title','speed','nb','ol','town','battle','stage','comp'];
for(const k of L){await ev(k=>{try{G.close&&G.close()}catch(e){}try{G.open(k)}catch(e){window._e=k+':'+e.message}},k);await sl(700);await cl();await p.screenshot({path:'/tmp/aud_'+k+'.jpg',type:'jpeg',quality:60})}
await ev(()=>{G.close();G.enTab='skill';G.open('enhance')});await sl(700);await cl();await p.screenshot({path:'/tmp/aud_enskill.jpg',type:'jpeg',quality:60});
console.log('ERRS',JSON.stringify(errs),await ev(()=>window._e||''),await ev(()=>[document.querySelectorAll('.trlist').length,getComputedStyle(document.querySelector('.trlist')||document.body).display]));stop();await b.close()})();
