const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';const ev=f=>p.evaluate(f);await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(2000);
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;const d=G.C.dunDaily();d.clr.exp=1;G.open('dungeon')});await sl(800);await ev(()=>document.querySelector('[data-dk=exp]').click());await sl(300);
await ev(()=>document.querySelector('[data-ch="1"]').click());await sl(1900);await p.screenshot({path:'screenshots/396-dungeon-fail.jpg',type:'jpeg',quality:85});
console.log('tries',await ev(()=>G.C.dunDaily().t.exp),'ERR',errs);await b.close()})();
