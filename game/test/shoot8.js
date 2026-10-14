const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'}),cl=()=>ev(()=>{document.querySelectorAll('.modal').forEach(m=>m.remove());G.close&&G.close();const bk=document.querySelector('#sBack');bk&&bk.click()});
await ev(()=>{const s=G.S();s.maxSi=15;s.lv=22;s.stl.atk=28;s.stl.hp=40;s.tickets=2;s.gems=900;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,rhea:2,lyra:1,borin:1,kaede:1,pip:1};s.party=['rhea','sera','kaede','borin'];G.C.buildAllies();s.autoBoss=false});
for(const [i,n] of [[0,'61-field-meadow'],[2,'62-field-town'],[4,'63-field-autumn'],[7,'64-field-beach'],[9,'65-field-desert'],[14,'66-field-snow']]){await ev(i=>{G.C.selectStage(i);G.S().autoBoss=false},i);await sl(3200);await sh(n)}
await ev(()=>{G.C.selectStage(7);const s=G.S();s.wave=3;G.C.startBoss()});await sl(1500);await sh('67-boss-intro');await sl(2800);await sh('68-boss-ogre');
await ev(()=>G.C.selectStage(4));await sl(1500);
// pressed state on nav summon + selected tab + badges
const bx=await p.$eval('#navsummon',e=>{const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});await p.mouse.move(bx[0],bx[1]);await p.mouse.down();await sl(120);await sh('69-states-home-pressed');await p.mouse.up();await sl(300);
await ev(()=>G.open('menu')||document.querySelector('#menuBtn').click());await sl(400);await sh('70-menu-grid');await ev(()=>document.querySelector('#menuPop').classList.remove('on'));
for(const [k,n] of [['party','71-party'],['summon','72-summon'],['shop','73-shop'],['event','74-event'],['mail','75-mail'],['bag','76-bag'],['codex','77-codex']]){await ev(k=>G.open(k),k);await sl(500);await sh(n);await cl();await sl(150)}
await ev(()=>G.open('event'));await sl(300);await ev(()=>document.querySelector('#attC').click());await sl(300);await sh('78-event-claimed');await cl();
const f=await ev(()=>document.fonts.check('700 16px Maplestory'));console.log('font',f,'ERR',JSON.stringify(errs));await b.close()})();
