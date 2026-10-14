const p=require('puppeteer-core');;(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const pg=await b.newPage();await pg.setViewport({width:390,height:844});const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>m.type()=='error'&&errs.push(m.text()));
await pg.goto('http://127.0.0.1:18791/index.html');await pg.evaluate(()=>{const s=CORE.S();s.comps={gourry:3,amelia:2,xellos:1,zelgadis:2};s.party=['gourry','amelia'];CORE.buildAllies()});await new Promise(r=>setTimeout(r,2500));
await pg.screenshot({path:'screenshots/20-fullscreen-battle.png'});
await pg.evaluate(()=>G.open('party'));await new Promise(r=>setTimeout(r,400));await pg.screenshot({path:'screenshots/21-party.png'});
await pg.click('[data-c=xellos]');await new Promise(r=>setTimeout(r,300));await pg.screenshot({path:'screenshots/22-party-assigned.png'});
await pg.evaluate(()=>{G.close&&G.close()});await pg.click('#navroll');await new Promise(r=>setTimeout(r,700));await pg.screenshot({path:'screenshots/23-overlay-gear.png'});
await pg.evaluate(()=>{CORE.S().gold=5e4;G.setTab('train')});await new Promise(r=>setTimeout(r,500));await pg.screenshot({path:'screenshots/24-overlay-train.png'});
await pg.evaluate(()=>{G.setTab('train')});await pg.click('#menuBtn');await new Promise(r=>setTimeout(r,300));await pg.screenshot({path:'screenshots/25-menu.png'});
console.log('ERR',errs);await b.close()})();
