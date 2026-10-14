const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});
await ev(()=>{const s=G.S();s.maxSi=9;s.lv=22;s.gold=5e6;s.stone=60;s.orbs=40;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,rhea:2,lyra:1,borin:1,kaede:1,pip:1};s.party=['rhea','sera','kaede','borin'];for(let i=0;i<30;i++){G.C.rollOnce();if(s.bag)G.C.equipBag()}G.C.buildAllies();G.C.selectStage(9)});await sl(2500);
await sh('81-home-frameless');
await ev(()=>{G.open('enhance')});await sl(500);await sh('82-enhance-gear');
for(let i=0;i<4;i++){await ev(()=>document.querySelector('#enGo')&&document.querySelector('#enGo').click());await sl(450)}await sh('83-enhance-gear-after');
await ev(()=>document.querySelector('[data-et=comp]').click());await sl(300);await ev(()=>document.querySelector('[data-sk]').click());await sl(300);await sh('84-enhance-companions');
await ev(()=>{document.querySelector('#sBack').click()});await sl(300);await ev(()=>document.querySelector('#menuBtn').click());await sl(400);await sh('85-menu-frameless');await ev(()=>document.querySelector('#menuPop').classList.remove('on'));await sl(300);
// icons tap clip
fs.rmSync('/tmp/ic',{recursive:true,force:true});fs.mkdirSync('/tmp/ic');const cdp=await p.target().createCDPSession();let n=0;cdp.on('Page.screencastFrame',async f=>{fs.writeFileSync(`/tmp/ic/f${String(n++).padStart(4,'0')}.jpg`,Buffer.from(f.data,'base64'));await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})});
await cdp.send('Page.startScreencast',{format:'jpeg',quality:90,everyNthFrame:1});
const tap=async sel=>{const q=await p.$eval(sel,e=>{const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});await p.mouse.move(q[0],q[1]);await p.mouse.down();await sl(140);await p.mouse.up();await sl(420)};
for(const s of ['#sideevent','#sidemail','#sideenhance','#sidemission','#sideguild'])await tap(s);
let shot=false;{const q=await p.$eval('#sideevent',e=>{const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});await p.mouse.move(q[0],q[1]);await p.mouse.down();await sl(60);await sh('86-icon-press-burst');await p.mouse.up();await sl(400)}
await cdp.send('Page.stopScreencast');console.log('frames',n,'ERR',JSON.stringify(errs));await b.close()})();
