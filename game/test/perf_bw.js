const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await clr();await ev(()=>{const s=G.S();s.maxSi=48;s.autoBoss=false;s.lv=80;G.C.buildAllies();window._bbx=1;window._bbs=[]});
for(const si of [2,6,13,20,27,34,41,48]){await ev(si=>{G.C.selectStage(si)},si);await sl(1500);await clr();await ev(()=>G.C.startBoss());await sl(5000);await clr();console.log(si,await ev(()=>'fu '+R._BFu+' E '+JSON.stringify(R._BE)+' ov '+(R._BOv||0)+'/'+R._BW+' BL '+R._BL.width+'x'+R._BL.height+' BS '+(R._BS?R._BS.width+'x'+R._BS.height:'-')+' bad '+(window._bbad||0)+'/'+(window._bbn||0)+JSON.stringify(window._bbs)))}
console.log('ERRS',errs.slice(0,3));stop();await b.close()})();
