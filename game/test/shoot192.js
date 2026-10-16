const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s92');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,noel:1,amelia:1,xellos:1,pip:1};s.party=['gourry','noel','amelia'];G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
for(const [k,n] of [['xellos','902'],['kaede','903'],['pip','904']]){await ev(k=>{const b=G.S().bond={x:{xellos:160,kaede:450,pip:30},day:'',n:{},sel:k};G.S().comps.kaede=1;closeScreen();openScreen('bond')},k);await sl(900);await sh(n+'-bond-'+k)}
await ev(()=>{closeScreen();const s=G.S();s.comps={gourry:1,amelia:1,sera:1,kaede:1};s.party=['gourry','amelia','sera','kaede'];G.C.buildAllies()});await clr();await sl(4500);await clr();await sh('905-resonance-label');
stop();console.log('ERR',errs);await b.close()})();
