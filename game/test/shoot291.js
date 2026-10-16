const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
const kn=()=>ev(()=>document.querySelectorAll('#notice,.chap,.sty,.unl,.rpop,.modal').forEach(x=>x.remove()));
await sl(1500);await kn();
// fire several centre banners at once (test-only triggers of existing visuals)
await ev(()=>{const b=document.querySelector('#battle');for(const [c,t] of [['wvb','<i></i><b>WAVE 2<small>/3</small></b><i></i>'],['mkb','<b>DOUBLE KILL</b>'],['fevban','<b>FEVER!</b>']]){const d=document.createElement('div');d.className=c;d.innerHTML=t;b.appendChild(d);setTimeout(()=>d.remove(),1300)}});
const log=[];for(let i=0;i<12;i++){log.push(await ev(()=>['.wvb','.mkb','.fevban'].map(s=>document.querySelectorAll(s).length).join('')));if(i==1)await sh('_q0');if(i==7)await sh('_q1');await sl(300)}
console.log(log.join(' '));
await sl(500);for(let i=0;i<40;i++){await kn();await sl(250);if(i==20)await sh('_q2')}
console.log('ERRS',errs);stop();await b.close()})();
