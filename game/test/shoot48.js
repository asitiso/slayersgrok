const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
await p.evaluate(()=>{G.C.bpAdd(99999);G.C.bp().prem=1;G.open('pass')});await sl(700);await p.screenshot({path:'/tmp/slayers_x.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>document.querySelector('#bpAll').click());await sl(1100);await p.screenshot({path:'screenshots/325-pass-claimall-reward.jpg',type:'jpeg',quality:85});
await p.evaluate(()=>{document.querySelectorAll('.rwpop').forEach(x=>x.remove());G.S().gt=G.S().gt;G.open('guild')});await sl(700);
const gm=await p.evaluate(()=>{const x=document.querySelector('[data-gm]');return x?x.outerHTML.slice(0,80):null});console.log('gm',gm);
console.log('bpAll gone',await p.evaluate(()=>!document.querySelector('#bpAll')),'ERR',JSON.stringify(errs));await b.close()})();
