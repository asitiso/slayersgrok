const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s205');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await ev(()=>{const s=G.S();s.party=['gourry','xellos','borin'];s.comps={gourry:1,xellos:1,borin:1};G.C.buildAllies()});
const seen={};const snap=async()=>{const k=await ev(()=>{const m=document.querySelector('.mkb .tdm'),t=document.querySelector('.tdmg'),R=G.R||window.RENDER;return m?'merge':t?'plaque':''});if(k&&!seen[k]){seen[k]=1;await sh(k=='merge'?'944-total-merged-multikill':'945-total-plaque-solo')}};
for(let tryN=0;tryN<12&&!(seen.merge&&seen.plaque);tryN++){await until(()=>G.C.alive().length>=3&&!G.C.B.boss&&!document.querySelector('.vic'),60000);await clr();
await ev(()=>{const C=G.C;const sp=D.SPELLS.find(x=>x.k=='ice');C.B.cds[sp.k]=0;C.B.lock=0;return C.castSpell(sp)});
for(let i=0;i<40;i++){await snap();await sl(80)}}
console.log('seen',JSON.stringify(seen));
console.log('ERR',JSON.stringify(errs));stop();await b.close()})();
