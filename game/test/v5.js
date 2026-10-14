const p=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const pg=await b.newPage();await pg.setViewport({width:390,height:844});const errs=[];pg.on('pageerror',e=>errs.push(e.stack));pg.on('response',r=>{if(r.status()>=400)errs.push(r.url())});pg.on('console',m=>m.type()=='error'&&errs.push(m.text()));
await pg.goto('http://127.0.0.1:18791/index.html');await pg.evaluate(()=>{localStorage.clear()});await pg.reload();await sl(500);
await pg.evaluate(()=>{const s=CORE.S();s.comps={gourry:3,amelia:2,xellos:1,zelgadis:2};s.party=['gourry','amelia','xellos'];s.gold=2e5;s.gems=5000;s.frag=40;s.mile=100;s.maxSi=9;s.relic={r1:2,r2:1};s.idleAt=Date.now()-3*3600e3;CORE.buildAllies()});await sl(2500);
const sh=async n=>{await sl(450);await pg.screenshot({path:'screenshots/'+n+'.png'})};const ev=(f,...a)=>pg.evaluate(f,...a);
await sh('30-battle-bright');
await ev(()=>G.open('summon'));await sh('31-summon');await ev(()=>document.querySelector('#su10').click());await sh('32-summon-result');await ev(()=>document.querySelectorAll('.modal').forEach(m=>m.remove()));
await ev(()=>G.open('party'));await sl(200);await ev(()=>document.querySelector('[data-det]').click());await sh('33-companion-detail');await ev(()=>document.querySelectorAll('.modal').forEach(m=>m.remove()));
await ev(()=>G.open('relic'));await sh('34-relic');await ev(()=>G.open('dungeon'));await sh('35-dungeon');await ev(()=>document.querySelector('[data-dun=frag]').click());await sh('36-dungeon-result');await ev(()=>document.querySelectorAll('.modal').forEach(m=>m.remove()));
await ev(()=>G.open('explore'));await sh('40-explore');await ev(()=>document.querySelector('[data-go=e1]').click());await ev(()=>{CORE.S().expd.e1.end=Date.now()-1});await ev(()=>G.open('explore'));await sh('41-explore-done');
for(const [i,n] of [[8,'42-stage-beach'],[10,'43-stage-desert'],[15,'44-stage-snow'],[2,'45-stage-town'],[4,'46-stage-autumn']]){await ev(i=>{G.close();CORE.S().maxSi=20;CORE.selectStage(i)},i);await sl(2600);await sh(n)}
await ev(()=>{CORE.S().wave=3;CORE.startBoss()});await sl(2500);await sh('47-boss-bright');
await ev(()=>G.open('mail'));await sh('37-mail');await ev(()=>G.open('settings'));await sh('38-settings');await ev(()=>G.close());
await ev(()=>document.querySelector('#idleBtn').click());await sh('39-idle-reward');await ev(()=>document.querySelectorAll('.modal').forEach(m=>m.remove()));
await ev(()=>document.querySelector('#menuBtn').click());await sh('25-menu');await ev(()=>document.querySelector('#menuClose').click());
await ev(()=>{G.setTab('mission')});await sh('09-missions');await ev(()=>G.setTab('mission'));
console.log('ERR',errs);await b.close()})();
