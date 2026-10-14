const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
await p.evaluate(()=>{const s=G.S();s.gold=5e5;s.stone=20;s.orbs=50;for(let i=0;i<10;i++){G.C.rollOnce();if(s.bag)G.C.equipBag()}G.C.bpAdd&&G.C.bpAdd(400)});await sl(800);
console.log('BD',await p.evaluate(()=>JSON.stringify(G.BD)));await p.screenshot({path:'screenshots/211-reddots-hub.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('#sidemenu').click());await sl(600);await p.screenshot({path:'screenshots/212-reddots-menu.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{G.close&&G.close();document.querySelector('#menuPop')?.classList.remove('on');const d=G.C.dunDaily();for(const k in d.t)while(d.t[k]>0)G.C.dunRun(k);const s=G.S();s.gold=0;});await sl(600);
console.log('BD2',await p.evaluate(()=>JSON.stringify(G.BD)));await p.screenshot({path:'screenshots/213-reddots-cleared.jpg',type:'jpeg',quality:85});
console.log('ERR',JSON.stringify(errs));await b.close()})();
