const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s73');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
const seen={};let shots=0;const t0=Date.now();
while(Date.now()-t0<40000&&shots<2){await sl(400);const r=await ev(()=>{const L=G.C.alive();const rg=L.filter(e=>/garcher|dmage/.test(e.img));const ES=RENDER._ES();return {n:rg.length,imgs:rg.map(e=>e.img),xs:L.map(e=>{const q=ES.get(e);return q?Math.round(q.x):null}),en:L.every(e=>{const q=ES.get(e);return q&&q.enter>=1})}});
 r.imgs.forEach(i=>seen[i]=1);if(r.n&&r.en){await sl(900);await sh(String(497+shots)+'-11-ranged-swarm');shots++;console.log('xs',r.xs.join(','));await sl(3000)}}
console.log('seen 1-1',Object.keys(seen));
await ev(()=>{G.C.alive().filter(e=>!e.boss).forEach((e,i)=>{e.img=i%2?'mon_dmage.png':'mon_garcher.png';e.max=e.hp=5e5})});await sl(1500);
await ev(()=>G.pjTest('arrow'));await sl(350);await sh('499-garcher-arrow');await ev(()=>G.pjTest('orb'));await sl(350);await sh('500-dmage-orb');
await sl(2500);const mx=await ev(()=>Math.max(...G.C.alive().map(e=>{const q=RENDER._ES().get(e);return q?q.x:0})));await sh('501-kite-hangback');
await ev(()=>G.eskTest('mon_dmage.png'));await sl(450);await sh('502-elite-warn-declutter');await sl(600);await sh('503-elite-hex');
await ev(()=>{const s=G.S();s.cdx=s.cdx||{};});
await sl(15000);const n=await ev(()=>[G.pjN,G.eskN]);await sh('504-natural');
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
stop();console.log('maxX',mx,'pj/esk',n,'fps',fps,'ERR',errs);await b.close()})();
