const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await clr();await ev(()=>{const s=G.S();s.maxSi=34;s.autoBoss=false;s.lv=60;G.C.buildAllies();G.C.selectStage(20);window._bb=[];window._bbx=1});
for(let k=0;k<2;k++){await sl(6000);await clr();await ev(()=>G.C.startBoss());await sl(9000);await clr()}
console.log(await ev(()=>{const b=window._bb.filter(q=>q[0]<1e6);const m=[1e9,-1e9,1e9,-1e9];b.forEach(q=>{m[0]=Math.min(m[0],q[0]);m[1]=Math.max(m[1],q[1]);m[2]=Math.min(m[2],q[2]);m[3]=Math.max(m[3],q[3])});const hi=b.filter(q=>q[3]>150);return 'hi '+hi.length+' '+JSON.stringify(hi.slice(0,5).map(q=>q.map(Math.round)))+' '+b.length+' '+JSON.stringify(m.map(Math.round))+' tg:'+b.filter(q=>q[5]).length+' boss:'+b.filter(q=>q[4]).length}));
stop();await b.close()})();
