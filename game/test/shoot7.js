const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844});const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});
await ev(()=>{const s=G.S();s.maxSi=15;s.lv=22;s.stl.atk=28;s.stl.hp=40;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,rhea:2,lyra:1,borin:1,kaede:1,pip:1};s.party=['rhea','sera','lyra','borin'];G.C.buildAllies();s.autoBoss=false});
for(const [i,n] of [[4,'50-field-autumn'],[9,'51-field-desert'],[14,'52-field-snow'],[2,'53-field-town'],[7,'54-field-beach']]){await ev(i=>{G.C.selectStage(i);G.S().autoBoss=false},i);await sl(i==4?4200:2600);await sh(n)}
// death mid-sequence
await ev(()=>{G.C.alive().slice(0,3).forEach(e=>G.C.hitEnemy(e,1e9,true))});await sl(250);await sh('55-death-anim');await sl(200);await sh('55b-death-anim');
await ev(()=>{G.C.selectStage(7);const s=G.S();s.wave=3;G.C.startBoss()});await sl(1500);await sh('56-boss-intro');await sl(2600);await sh('57-boss-ogre');
await ev(()=>G.open('party'));await sl(500);await sh('58-party-new');
await ev(()=>{document.querySelectorAll('.modal').forEach(m=>m.remove());G.S().gems=9999;G.open('summon')});await sl(300);await ev(()=>document.querySelector('#su10').click());await sl(700);await sh('59-summon-new');
await ev(()=>document.querySelectorAll('.modal').forEach(m=>m.remove()));await ev(()=>G.open('party'));await sl(200);await ev(()=>{const e=document.querySelector('[data-det=kaede]')||document.querySelector('[data-det]');e.click()});await sl(300);await sh('60-detail-new');
const f=await ev(()=>document.fonts.check('700 16px Maplestory'));console.log('font',f,'ERR',JSON.stringify(errs));await b.close()})();
