// Headless test: node test/run.js  (needs: python3 -m http.server 18791 --bind 127.0.0.1 in game/)
const puppeteer=require('puppeteer-core');const fs=require('fs');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});
const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const U='http://127.0.0.1:18791/index.html',D=__dirname+'/../screenshots/';const shot=n=>p.screenshot({path:D+n+'.png'});
await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sleep(2500);await shot('01-battle');
// strong mid-game state
await p.evaluate(()=>{const s=G.S();s.comps={gourry:3,zelgadis:2,amelia:2,xellos:1};s.party=['gourry','zelgadis','xellos'];s.maxSi=15;s.si=15;s.lv=38;s.stl.atk=60;s.stl.hp=55;s.stl.crit=20;s.gold=5e5;s.gems=3000;s.orbs=80;G.C.buildAllies();G.C.selectStage(15)});
await sleep(3500);await shot('02-battle-party');
// boss
await p.evaluate(()=>{const s=G.S();s.wave=3;s.failPow=0;G.C.startBoss()});await sleep(2600);await shot('03-boss');
await p.evaluate(()=>{G.speed=2});for(let i=0;i<80;i++){if(await p.evaluate(()=>!!G.C.lastClear))break;await sleep(250)}await sleep(200);await shot('04-boss-clear');await p.evaluate(()=>{G.speed=1});
console.log('boss result',await p.evaluate(()=>G.C.lastClear||'none'));
// gear
await p.evaluate(()=>G.setTab('gear'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#roll');await sleep(300);await shot('05-roll-result');await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#eq');
await p.evaluate(()=>{G.S().filter=4});await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#auto');await sleep(3500);await shot('06-auto-roll');await p.evaluate(()=>{if(G.autoRolling)document.querySelector('#auto').click()});
await p.evaluate(()=>G.setTab('train'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'[data-s=atk]');await sleep(300);await shot('07-train');
await p.evaluate(()=>G.setTab('comp'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#sm10');await sleep(600);await shot('08-summon');await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#sumModal .btn');
await p.evaluate(()=>G.setTab('mission'));await sleep(1200);await shot('09-missions');
for(const [n,k] of [['10-map','map'],['11-base','base'],['12-guild','guild'],['13-arena','arena'],['14-shop','shop']]){await p.evaluate(k=>G.open(k),k);await sleep(500);await shot(n)}
await p.evaluate(()=>G.open('guild'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#raid');await sleep(300);await shot('15-raid-result');await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'.modal .btn');
await p.evaluate(()=>G.open('arena'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'[data-f="2"]');await sleep(300);await shot('16-arena-result');await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'.modal .btn');
await p.evaluate(()=>G.open('base'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'[data-up=mine]');await sleep(300);await shot('17-base-upgrading');
await p.evaluate(()=>G.open('shop'));await sleep(200);await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'[data-pkg="0"]');await sleep(300);await shot('18-shop-notice');await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'.modal .btn');
await p.evaluate(()=>G.close());await p.evaluate(()=>G.setTab('battle'));
// offline
await p.evaluate(()=>{const s=G.S();s.last=Date.now()-8*3600e3;G.noSave=1;localStorage.setItem('slayers_save_v2',JSON.stringify(s))});await p.goto(U);await sleep(1200);await shot('19-offline');
await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},'#offModal .btn');
await p.evaluate(()=>{const s=G.S();s.maxSi=15;s.lv=22;s.stl.atk=28;s.stl.hp=40;s.gear={};s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1};s.party=['gourry','amelia','xellos'];G.C.buildAllies();G.C.selectStage(10);s.autoBoss=false;G.C.B.cds.ds=4;G.C.B.cds.giga=8;G.C.B.cds.ragna=2});await sleep(400);console.log('ttk-check',await p.evaluate(()=>({dps:G.C.estDPS(),mob:G.C.mobHP(8)})));
// video: battle area 10 s
await p.setViewport({width:390,height:844,deviceScaleFactor:1});fs.rmSync('/tmp/frames',{recursive:true,force:true});fs.mkdirSync('/tmp/frames');
const cdp=await p.target().createCDPSession();let n=0;cdp.on('Page.screencastFrame',async f=>{fs.writeFileSync(`/tmp/frames/f${String(n++).padStart(4,'0')}.jpg`,Buffer.from(f.data,'base64'));await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})});
await cdp.send('Page.startScreencast',{format:'jpeg',quality:85,everyNthFrame:1});await sleep(11000);await cdp.send('Page.stopScreencast');console.log('frames',n);
console.log('ERRORS',JSON.stringify(errs));await b.close()})();
