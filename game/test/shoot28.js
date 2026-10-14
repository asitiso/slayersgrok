const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000,protocolTimeout:240000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2500);
await p.evaluate(()=>{const s=G.S();s.lv=30;G.C.gainExp(G.C.needExp()*1.01);RENDER.lvT=.5;const L=RENDER._AS().get('lina');for(let i=0;i<6;i++)RENDER.dmgText?RENDER.dmgText(L.x,L.y-80,123,{label:'BLOCK'}):0});await sl(250);
await p.evaluate(()=>{RENDER.lvT=.6});await sl(150);await p.screenshot({path:'screenshots/x242.jpg',type:'jpeg',quality:90,clip:{x:0,y:250,width:300,height:330}});
await p.evaluate(()=>{const s=G.S(),m=DATA.MISSIONS[0];s.mp[m.k]=m.goal});await sl(600);
await p.evaluate(()=>document.getAnimations().forEach(a=>{if(a.animationName=='mshine'){a.pause();a.currentTime=600}if(a.animationName=='mready'){a.pause();a.currentTime=550}}));await sl(200);
await p.screenshot({path:'screenshots/243-mission-ready.jpg',type:'jpeg',quality:85});await p.screenshot({path:'screenshots/244-mission-ready-crop.jpg',type:'jpeg',quality:90,clip:{x:0,y:600,width:390,height:110}});
console.log('ready',await p.evaluate(()=>document.querySelector('#mission').className+' '+getComputedStyle(document.querySelector('#mission')).borderTopWidth),'ERR',JSON.stringify(errs));await b.close()})();
