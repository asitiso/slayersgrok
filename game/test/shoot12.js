const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(1000);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});
await ev(()=>{const s=G.S();s.maxSi=15;s.lv=22;s.gold=5e6;s.gems=900;s.stone=80;s.gcoin=40;s.stl.atk=2;s.stl.hp=80;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,rhea:1,lyra:1,borin:1,kaede:1,pip:1};s.party=['gourry','zelgadis','amelia','xellos'];s.autoSpell=false;G.C.buildAllies();G.C.selectStage(0);s.autoBoss=false});await sl(3200);
await sh('107-fodder-spread');
await ev(()=>{G.C.selectStage(2)});await sl(3200);await sh('108-enemies-newidle');
await ev(()=>{G.C.selectStage(9)});await sl(3200);await sh('109-enemies-desert');
await ev(()=>{const s=G.S();G.C.selectStage(7);s.wave=3;G.C.startBoss()});await sl(4500);await sh('110-ogre-flank');
await ev(()=>G.open('guild'));await sl(500);await sh('111-guild-join');
await ev(()=>document.querySelector('[data-gj="0"]').click());await sl(500);
await ev(()=>{G.C.S().gm.p.gkill=1200;});await ev(()=>{G.close();G.open('guild')});await sl(400);
await ev(()=>{const i=document.querySelector('#gin');i.value='안녕하세요 리나입니다!';document.querySelector('#gsend').click()});await sl(400);await sh('112-guild-hall');
await ev(()=>document.querySelector('.sbody').scrollTop=600);await sl(300);await sh('113-guild-chat-roster');
await ev(()=>G.close());await ev(()=>G.open('arena'));await sl(500);await sh('114-arena-bg');await ev(()=>G.close());
await ev(()=>G.open('enhance'));await sl(300);await ev(()=>document.querySelector('[data-et=comp]').click());await sl(300);await sh('115-comp-skillicons');await ev(()=>G.close());
await sl(300);await p.screenshot({path:'screenshots/116-skillbar.jpg',type:'jpeg',quality:90,clip:{x:0,y:640,width:390,height:204}});
if(process.argv[2]=='video'){const dir='/tmp/v_gp';fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);await ev(()=>{const s=G.S();s.autoSpell=true;s.autoBoss=true;G.C.selectStage(2)});let n=0;const t0=Date.now();while(Date.now()-t0<18000){await p.screenshot({path:`${dir}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:80});}fs.writeFileSync(dir+'/fps',String(n/18))}
console.log('ERR',JSON.stringify(errs));await b.close()})();
