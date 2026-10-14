const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const W=()=>p.waitForFunction(()=>G.C.alive().filter(e=>!e.boss).length>=3,{timeout:15000}).catch(()=>console.log('wait timeout'));
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s72');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(3000);await W();
// force all enemies ranged images for shot
const kinds=['mon_skeleton.png','mon_cultist.png','mon_imp.png','mon_ghost.png','mon_bandit.png','mon_harpy.png'];
await ev(k=>{G.C.alive().filter(e=>!e.boss).forEach((e,i)=>{e.img=k[i%k.length];e.max=e.hp=1e7});},kinds);
await p.waitForFunction(()=>G.pjN>=3,{timeout:15000}).catch(()=>console.log('few pj'));
for(const [i,k] of [[0,'arrow'],[1,'orb'],[2,'fire']]){await ev(k=>G.pjTest(k),k);await sl(380);await sh(String(488+i)+'-ranged-'+k)}
await W();const im=await ev(()=>{G.C.alive().forEach(e=>{e.max=e.hp=1e7});return G.eskTest('mon_orc.png')});await sl(400);await sh('491-elite-warn');await sl(600);await sh('492-elite-slam');
await W();await ev(()=>G.eskTest('mon_cultist.png'));await sl(400);await sh('493-elite-hex-warn');await sl(600);await sh('494-elite-hex-hit');
await W();await ev(()=>{const e=G.C.alive().find(e=>!e.boss);if(!e)return;e.el=1;e.esk=0});await sl(300);await ev(()=>{const e=G.C.alive().find(e=>e.eskW!=null);if(e)G.C.stApply(e,'stun')});await sl(250);await sh('495-elite-interrupted');
await sl(20000);const n=await ev(()=>[G.pjN,G.eskN]);await sh('496-natural');
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
stop();console.log('img',im,'pj/esk',n,'fps',fps,'ERR',errs);await b.close()})();
