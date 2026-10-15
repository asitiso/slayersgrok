const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s106');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.comps={gourry:1,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
await ev(()=>{const s=G.S();s.lv=150;s.maxSi=12;s.autoSpell=false;G.C.selectStage(12);G.jobPromote()});await sl(600);await ev(()=>document.querySelectorAll('.jobfx,.chap').forEach(x=>x.remove()));
let n=615;
for(const J of [1,2]){
 if(J==2){await ev(()=>{G.jobPromote()});await sl(500);await ev(()=>document.querySelectorAll('.jobfx').forEach(x=>x.remove()))}
 await until(()=>C.alive().length>=3,15000);await sl(800);
 const L=await ev(()=>{const s=R._AS().get('lina');return s?{x:s.x,y:s.y}:null});
 for(let q=0;q<14;q++){await sl(110);await p.screenshot({path:`/tmp/slayers_r51_j${J}_${q}.png`,clip:{x:Math.max(0,L.x-90),y:Math.max(0,L.y-110),width:200,height:130}})}
 await until(()=>C.alive().length>=2&&C.B.lock<=0,15000);
 const dmg0=await ev(()=>{const ds=D.SPELLS.find(x=>x.k=='ds');C.B.cds.ds=0;window.__h0=C.alive().reduce((a,e)=>a+e.hp,0);return C.castSpell(ds)});
 await sl(500);await sh(`${n++}-job${J+1}-ds-cast`);await sl(800);await sh(`${n++}-job${J+1}-ds-impact`);await sl(500);await sh(`${n++}-job${J+1}-ds-after`);
 console.log('J',J,'cast',dmg0);await sl(2500);
}
await ev(()=>{const s=G.S();s.skin='job2';});
const fps=await ev(()=>window.__fps||0);stop();console.log('fps',fps,'ERR',errs);await b.close()})();
