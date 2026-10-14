const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(1000);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});
const mode=process.argv[2]||'shots';
await ev(()=>{const s=G.S();s.maxSi=15;s.lv=22;s.gold=5e6;s.gems=900;s.stone=80;s.stl.atk=2;s.stl.hp=80;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,rhea:1,lyra:1,borin:1,kaede:1,pip:1};s.party=['amelia','xellos','sera','borin'];s.autoSpell=false;s.seen={'mon_goblin.png':1,'mon_slime.png':1,'mon_orc.png':1,'mon_bandit.png':1,'mon_wolf.png':1,'mon_bat.png':1};s.att={n:9,last:'',cyc:0};G.C.buildAllies();G.C.selectStage(0);s.autoBoss=false});await sl(2600);
const cast=k=>ev(k=>{const B=G.C.B;B.cds[k]=0;B.lock=0;const sp=G.D?G.D.SPELLS.find(x=>x.k==k):DATA.SPELLS.find(x=>x.k==k);return G.C.castSpell(sp)},k);
if(mode=='shots'){
 await sh('94-battle-idle-new');
 for(const [k,t,n] of [['fire',330,'95-skill-fireball'],['heal',350,'96-skill-heal'],['ds',800,'97-skill-ds-beam'],['ds',1250,'98-skill-ds-blast']]){await sl(1600);await cast(k);await sl(t);await sh(n)}
 await ev(()=>{const s=G.S();s.party=['gourry','zelgadis','rhea','lyra'];G.C.buildAllies();G.C.selectStage(7);s.wave=3;G.C.startBoss()});await sl(4500);await sh('99-boss-flank');
 await ev(()=>{const s=G.S();s.party=['kaede','pip','xellos','amelia'];G.C.buildAllies();G.C.selectStage(0)});await sl(2500);await sh('100-battle-idle-set2');
 await ev(()=>G.setTab('mission'));await sl(500);await sh('101-missions-weekly');await ev(()=>G.setTab('battle'));
 for(const [k,n] of [['event','102-attendance28'],['arena','103-arena-rank'],['codex','104-codex-bonus'],['guild','105-guild-bg'],['dungeon','106-dungeon-bg']]){await ev(k=>G.open(k),k);await sl(600);await sh(n);await ev(()=>G.close())}
}else{
 const dir='/tmp/v_'+mode;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);let n=0;const t0=Date.now();
 const plan=mode=='skills'?[[300,'fire'],[2600,'heal'],[4800,'ragna'],[7000,'ds'],[10500,'ice'],[12500,'fire']]:mode=='attacks'?[]:[[5000,'fire'],[9000,'ds']];
 const dur=mode=='skills'?14000:mode=='attacks'?9000:16000;
 if(mode=='attacks')await ev(()=>{const s=G.S();s.party=['gourry','zelgadis','rhea','pip'];G.C.buildAllies();G.C.selectStage(2)});
 if(mode=='gameplay')await ev(()=>{G.S().autoSpell=true;G.S().autoBoss=true});
 while(Date.now()-t0<dur){const el=Date.now()-t0;while(plan.length&&el>=plan[0][0]){await cast(plan.shift()[1])}await p.screenshot({path:`${dir}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:80,clip:{x:0,y:mode=='gameplay'?0:150,width:390,height:mode=='gameplay'?844:470,scale:1}})}
 fs.writeFileSync(dir+'/fps',String(n/(dur/1000)));
}
console.log(mode,'ERR',JSON.stringify(errs));await b.close()})();
