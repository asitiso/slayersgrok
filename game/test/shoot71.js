const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const W=()=>p.waitForFunction(()=>G.C.alive().filter(e=>!e.boss).length>=2,{timeout:15000}).catch(()=>console.log('wait timeout'));
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s71');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await sl(4000);await W();
await ev(()=>{const L=G.C.alive().filter(e=>!e.boss);const e=L[0];G.C.hitEnemy(e,e.max*.05,true);for(let i=0;i<4;i++)setTimeout(()=>G.C.hitEnemy(L[1]||e,(L[1]||e).max*.03,false),i*40);const f=L[2]||e;G.C.hitEnemy(f,f.max*.04,false,{sp:'ice'});const g=L[3]||e;G.C.hitEnemy(g,g.max*.04,false,{sp:'fire'})});
await sl(120);await sh('480-dmg-crit-burst');await sl(200);await sh('481-dmg-stack-colors');
await ev(()=>G.comboTest('gourry','zelgadis'));await sl(700);await sh('482-dmg-combo-purple');
await ev(()=>{G.C.startBoss()});await p.waitForFunction(()=>G.C.alive().some(e=>e.boss),{timeout:15000}).catch(()=>console.log('noboss'));await sl(3000);
await ev(()=>{const bo=G.C.alive().find(e=>e.boss);G.C.aliveAllies().forEach(a=>G.C.ev.dmgAlly(a,a.max*.15,''))});await sl(120);await sh('483-ally-knockback-boss');
await ev(()=>{const bo=G.C.alive().find(e=>e.boss);G.C.ev.teleHit(bo,G.C.aliveAllies().map(a=>[a,a.max*.1]))});await sl(250);await sh('484-ally-launch-aoe');
await sl(1200);await ev(()=>{const e=G.C.alive().find(e=>e.boss);if(e){e.brk=0.99;G.C.hitEnemy(e,e.max*5,true)}});await sl(300);await sh('485-boss-death-novictory-yet');
const tl=[];for(let i=0;i<12;i++){await sl(250);tl.push(await ev(()=>[+(RENDER.slowT||0).toFixed(2),!!document.querySelector('.vic')]))}
await p.waitForSelector('.vic',{timeout:5000}).catch(()=>console.log('novic'));await sl(300);await sh('486-victory-after-slowmo');
await sl(12000);const n=await ev(()=>G.haN);await sh('487-natural');
const fps=await ev(()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)};requestAnimationFrame(f)}));
stop();console.log('timeline',JSON.stringify(tl),'haN',n,'fps',fps,'ERR',errs);await b.close()})();
