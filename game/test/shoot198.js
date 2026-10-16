const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s97');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={kaede:1,pip:1,xellos:1};s.party=['kaede','pip','xellos'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await sl(1500);await clr();
await ev(()=>{G.S().fish={day:'',n:0,col:{f1:{n:4,max:13},f2:{n:2,max:38},f3:{n:1,max:44},f4:{n:1,max:74}},inv:{f1:3,f2:1,f3:0,f4:1}};openScreen('fish')});await sl(800);
await ev(()=>{document.querySelector('#screen .sbody').scrollTop=9999});await sl(400);await sh('922-cook-list-art');
await ev(()=>document.querySelector('[data-ck=r4]').click());await sl(500);await ev(()=>{document.querySelector('#screen .sbody').scrollTop=9999});await sl(150);await sh('923-cook-done-art');

console.log(await ev(()=>JSON.stringify(C.S().buf)));
stop();console.log('ERR',errs);await b.close()})();
