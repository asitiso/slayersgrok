const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});const mode=process.argv[2]||'shots';
const skin=k=>ev(k=>{const s=G.S();s.skins=s.skins||{base:1};s.skins[k]=1;G.C.skinSet(k);const sk=DATA.SKINS.find(x=>x.k==k);RENDER.skinImg=k=='base'?null:sk.img;RENDER.skinAtk=sk.atk||null;RENDER.skinCast=sk.cast||null},k);
await ev(()=>{const s=G.S();s.maxSi=20;s.lv=30;s.gold=5e6;s.gems=3000;s.stl.hp=300;s.stl.atk=3;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,borin:1,rhea:1,kaede:1};s.party=['gourry','zelgadis','rhea','kaede'];s.autoSpell=false;s.autoBoss=false;G.C.buildAllies();G.C.selectStage(2)});await sl(2500);
const lina=()=>ev(()=>RENDER.dbg('lina'));
const crop=async(n)=>{const q=await lina();await p.screenshot({path:`screenshots/${n}.jpg`,type:'jpeg',quality:88,clip:{x:Math.max(0,Math.min(190,q.x-100)),y:Math.max(0,q.y-150),width:200,height:190}})};
if(mode=='shots'){
 let i=160;for(const k of ['ice','shadow','gold','forest','summer','winter']){await skin(k);await sl(300);
  // attack pose
  await ev(()=>{const s=RENDER._AS().get('lina');s.ps={t:0,w:.14}});await sl(240);await crop(`${i++}-skin-${k}-atk`);
  await ev(()=>{const B=G.C.B;B.cds.fire=0;B.lock=0;G.C.castSpell(DATA.SPELLS.find(x=>x.k=='fire'))});await sl(330);await crop(`${i++}-skin-${k}-cast`)}
 // bosses
 await skin('base');
 await ev(()=>{const s=G.S();G.C.selectStage(15);s.wave=3;G.C.startBoss()});await sl(4200);await sh('172-boss-demon');await sl(700);await sh('172b-boss-demon2');
 await ev(()=>{const s=G.S();G.C.selectStage(20);s.wave=3;G.C.startBoss()});await sl(4200);await sh('173-boss-dragon');await sl(700);await sh('173b-boss-dragon2');
 // crowd
 await ev(()=>{const s=G.S();s.party=['gourry','zelgadis','rhea','kaede'];G.C.buildAllies();G.C.selectStage(14)});await sl(3200);await sh('174-crowd-spread');await sl(1500);await sh('175-crowd-spread2');
 await ev(()=>{G.S().autoSpell=true});await sl(2500);await sh('176-coins-to-hud');
}else{const dir='/tmp/v_'+mode;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);let n=0;
 await skin('winter');await ev(()=>{const s=G.S();s.autoSpell=true;s.autoBoss=true;G.C.selectStage(14)});await sl(1500);
 const t0=Date.now(),dur=14000;let bossed=0;while(Date.now()-t0<dur){if(!bossed&&Date.now()-t0>8000){bossed=1;await ev(()=>{const s=G.S();G.C.selectStage(20);s.wave=3;G.C.startBoss()})}await p.screenshot({path:`${dir}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:80,clip:{x:0,y:0,width:390,height:844,scale:1}})}
 fs.writeFileSync(dir+'/fps',String(n/(dur/1000)))}
console.log(mode,'ERR',JSON.stringify(errs));await b.close()})();
