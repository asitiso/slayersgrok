const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});const mode=process.argv[2]||'shots';
await ev(()=>{const s=G.S();s.maxSi=20;s.lv=30;s.gold=5e6;s.gems=3000;s.gcoin=40;s.stl.hp=200;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,borin:1};s.party=['gourry','zelgadis','amelia','xellos'];s.skins={base:1,summer:1,winter:1,ice:1};s.skin='summer';RENDER.skinImg='skin/lina_summer.png';s.gj={n:'붉은 마도사 협회',at:Date.now()};G.C.buildAllies();s.autoBoss=false});
const spawn=imgs=>ev(imgs=>{const B=G.C.B;B.enemies.forEach((e,j)=>{e.img=imgs[j%imgs.length];e.sc=1});},imgs);
if(mode=='shots'){
 await ev(()=>G.C.selectStage(9));await sl(600);await spawn(['mon_wolf.png','mon_scorpion.png','mon_imp.png','mon_harpy.png']);await sl(2600);await sh('150-new-enemies-a');
 await ev(()=>G.C.selectStage(14));await sl(600);await spawn(['mon_treant.png','mon_ghost.png','mon_bat.png','mon_golem.png']);await sl(2600);await sh('151-new-enemies-b');
 await ev(()=>G.open('skin'));await sl(500);await sh('152-costume-real');await ev(()=>G.close());
 await ev(()=>{const s=G.S();s.skin='winter';RENDER.skinImg='skin/lina_winter.png'});await sl(1200);await sh('153-battle-winter');
 await ev(()=>G.open('guild'));await sl(600);await sh('154-guild-frames');await ev(()=>document.querySelector('#gchat').scrollIntoView());await sl(300);await sh('155-guild-chat-bubble');await ev(()=>G.close());
 await ev(()=>{G.C.bp().xp=95;G.C.mAdd('boss')});await sl(400);await sh('156-pass-toast');
 await ev(()=>G.open('pass'));await sl(400);await sh('157-pass-icons');await ev(()=>G.close());
 await ev(()=>G.open('dungeon'));await sl(400);await sh('158-dungeon-gate');await ev(()=>G.close());
 await ev(()=>{document.querySelector('#menuBtn')?.click()});await sl(400);await sh('159-menu-newicons');
}else{const dir='/tmp/v_'+mode;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);let n=0;const t0=Date.now();
 if(mode=='enemies'){await ev(()=>G.C.selectStage(9));await sl(500);await spawn(['mon_wolf.png','mon_scorpion.png','mon_imp.png','mon_harpy.png','mon_treant.png','mon_ghost.png','mon_bat.png','mon_golem.png'])}
 if(mode=='gameplay')await ev(()=>{const s=G.S();s.autoSpell=true;s.autoBoss=true;G.C.selectStage(9)});
 const dur=14000;while(Date.now()-t0<dur){await p.screenshot({path:`${dir}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:80,clip:{x:0,y:mode=='gameplay'?0:150,width:390,height:mode=='gameplay'?844:470,scale:1}})}
 fs.writeFileSync(dir+'/fps',String(n/(dur/1000)))}
console.log(mode,'ERR',JSON.stringify(errs));await b.close()})();
