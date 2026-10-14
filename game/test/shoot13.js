const puppeteer=require('puppeteer-core');const fs=require('fs');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()=='error'&&errs.push(m.text()));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(1000);
const ev=(f,...a)=>p.evaluate(f,...a),sh=n=>p.screenshot({path:`screenshots/${n}.jpg`,quality:85,type:'jpeg'});const mode=process.argv[2]||'shots';
await ev(()=>{const s=G.S();s.maxSi=15;s.lv=22;s.gold=5e6;s.gems=900;s.gcoin=40;s.stl.atk=2;s.stl.hp=200;s.comps={gourry:1,zelgadis:1,amelia:1,xellos:1,sera:1,rhea:1,lyra:1,borin:1,kaede:1,pip:1};s.party=['lyra','pip','kaede','xellos'];s.autoSpell=false;s.load=['bolt','poison','charm','bash','dark','holy'];s.gj={n:'붉은 마도사 협회',at:Date.now()};G.C.buildAllies();G.C.selectStage(2);s.autoBoss=false});await sl(3000);
const csk=(k)=>ev(k=>RENDER.csk(k,RENDER._AS().get(k),1),k);
if(mode=='shots'){await sh('117-enemy-formation');
 for(const [k,t,n] of [['lyra',300,'118-vfx-lightning'],['pip',900,'119-vfx-poison'],['kaede',600,'120-vfx-charm'],['xellos',420,'121-vfx-dark']]){await sl(900);await csk(k);await sl(t);await sh(n)}
 await ev(()=>{const s=G.S();s.party=['gourry','zelgadis','sera','borin'];G.C.buildAllies();G.C.selectStage(2)});await sl(3000);
 for(const [k,t,n] of [['sera',380,'122-vfx-holy'],['borin',300,'123-vfx-bash'],['gourry',250,'124-cast-gourry'],['zelgadis',250,'125-cast-zel']]){await sl(900);await csk(k);await sl(t);await sh(n)}
 await ev(()=>{const s=G.S();s.party=['gourry','zelgadis','rhea','kaede'];G.C.buildAllies();G.C.selectStage(7);s.wave=3;G.C.startBoss()});await sl(5000);await sh('126-boss-ally-spacing');
 for(const [k,n] of [['dungeon','127-dungeon-bglight'],['arena','128-arena-bglight'],['guild','129-guild-bglight']]){await ev(k=>G.open(k),k);await sl(600);await sh(n);if(k=='guild'){await ev(()=>{const i=document.querySelector('#gin');for(const t of ['안녕하세요!','레이드 같이 가요']){i.value=t;document.querySelector('#gsend').click()}});await sl(300);await ev(()=>{const c=document.querySelector('#gchat');c.scrollIntoView()});await sl(300);await sh('130-guild-chat-ts')}await ev(()=>G.close())}
}else{const dir='/tmp/v_'+mode;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);let n=0;const t0=Date.now();
 const plan=mode=='skills'?[[200,'s:fire'],[1800,'s:bolt'],[3400,'s:poison'],[5200,'s:charm'],[7000,'s:dark'],[8600,'s:holy'],[10200,'s:bash'],[11800,'s:ds'],[14200,'c:gourry'],[15500,'c:pip']]:[];
 const dur=mode=='skills'?17000:18000;if(mode=='gameplay')await ev(()=>{const s=G.S();s.autoSpell=true;s.autoBoss=true});
 while(Date.now()-t0<dur){const el=Date.now()-t0;while(plan.length&&el>=plan[0][0]){const [_,a]=plan.shift();const [ty,k]=a.split(':');if(ty=='s')await ev(k=>{const B=G.C.B;B.cds[k]=0;B.lock=0;G.C.castSpell(DATA.SPELLS.find(x=>x.k==k))},k);else if(ty=='p')await ev(()=>{const s=G.S();s.party=['gourry','zelgadis','sera','borin'];G.C.buildAllies()});else await csk(k)}
  await p.screenshot({path:`${dir}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:80,clip:{x:0,y:mode=='gameplay'?0:150,width:390,height:mode=='gameplay'?844:470,scale:1}})}
 fs.writeFileSync(dir+'/fps',String(n/(dur/1000)))}
console.log(mode,'ERR',JSON.stringify(errs));await b.close()})();
