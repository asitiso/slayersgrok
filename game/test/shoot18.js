const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});const mode=process.argv[2]||'shots';
const skin=k=>ev(k=>{const s=G.S();s.skins=s.skins||{base:1};s.skins[k]=1;G.C.skinSet(k);const sk=DATA.SKINS.find(x=>x.k==k);RENDER.skinImg=k=='base'?null:sk.img;RENDER.skinAtk=sk.atk||null;RENDER.skinCast=sk.cast||null},k);
await ev(()=>{const s=G.S();s.maxSi=20;s.lv=30;s.stl.hp=300;s.stl.atk=1;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,rhea:1,kaede:1};s.party=['gourry','zelgadis','rhea','borin'];s.comps.borin=1;s.autoSpell=false;s.autoBoss=false;G.C.buildAllies()});
const big=()=>ev(()=>{DATA.BAL.swarm=[12,12];G.C.selectStage(2)});
if(mode=='shots'){
 await big();await sl(1800);console.log('alive/res',await ev(()=>[G.C.alive().length,G.C.reserve(),G.C.B.enemies.length]));await sh('202-melee-start');
 await sl(2500);await sh('203-melee-mid');await ev(()=>{G.S().autoSpell=true});
 for(let i=0;i<14;i++){await sl(250);const r=await ev(()=>[G.C.alive().length,G.C.reserve(),G.C.B.enemies.filter(e=>e.rf&&e.hp>0).length]);if(r[2]>0&&r[1]>0){await sh('204-melee-runin');console.log('rf',r);break}}
 await sl(1200);await sh('205-melee-late');
 await ev(()=>{G.S().autoSpell=false;DATA.BAL.swarm=[8,15];G.C.selectStage(2)});await sl(2500);
 await ev(()=>{const s=G.S();s.gems=5000;s.party=['gourry','zelgadis','amelia','xellos'];G.C.buildAllies()});
 await ev(()=>G.open('skin'));await sl(500);await sh('x193');
 await p.evaluate(()=>{const c=document.querySelectorAll('[data-cs]');c.forEach(x=>x.click())});await sl(300);await p.evaluate(()=>{const e=document.querySelector('[data-cs]');e&&e.scrollIntoView()});await sl(300);await sh('x194');
 await ev(()=>{G.close()});console.log('cskin',await ev(()=>JSON.stringify(RENDER.cskin)));
 await sl(2500);await sh('x195');await sl(900);await p.screenshot({path:'screenshots/x196.jpg',type:'jpeg',quality:90,clip:{x:0,y:250,width:390,height:330}});
 await ev(()=>{const s=G.S();s.party=['sera','borin','gourry','zelgadis'];s.cown.sera=1;s.cskin.sera=1;s.cown.borin=1;s.cskin.borin=1;s.comps.sera=1;s.comps.borin=1;RENDER.applyCskin(s.cskin);G.C.buildAllies()});await sl(2500);await p.screenshot({path:'screenshots/x197.jpg',type:'jpeg',quality:90,clip:{x:0,y:250,width:390,height:330}});
}else{const dir='/tmp/v_'+mode;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);let n=0;await skin('summer');await ev(()=>{G.S().autoSpell=true});await big();
 const t0=Date.now(),dur=14000;while(Date.now()-t0<dur){await p.screenshot({path:`${dir}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:80})}fs.writeFileSync(dir+'/fps',String(n/(dur/1000)))}
console.log(mode,'ERR',JSON.stringify(errs));await b.close()})();
