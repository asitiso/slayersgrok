const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
const sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,type:'jpeg',quality:85});
await p.evaluate(()=>{const s=G.S();s.gems=99999;G.open('summon')});await sl(800);await p.evaluate(()=>document.querySelector('#su10').click());await sl(100);
await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=100}));await sl(300);await p.screenshot({path:'screenshots/230-summon-backs-fixed.jpg',type:'jpeg',quality:90,clip:{x:20,y:150,width:350,height:300}});
await p.goto(U,{timeout:200000});await sl(2000);
await p.evaluate(()=>{const s=G.S();s.lv=30;s.maxSi=6;s.si=6;s.wave=3;s.autoSpell=false;G.C.startBoss()});await sl(3500);
for(const [fr,nm] of [[.93,'231-boss-hp-x10'],[.47,'232-boss-hp-x5'],[.06,'233-boss-hp-x1']]){await p.evaluate(fr=>{const e=G.C.B.enemies[0];if(e)e.hp=e.max*fr},fr);await sl(500);await p.screenshot({path:`screenshots/${nm}.jpg`,type:'jpeg',quality:90,clip:{x:40,y:60,width:320,height:110}})}
console.log('ERR',JSON.stringify(errs));await b.close()})();
