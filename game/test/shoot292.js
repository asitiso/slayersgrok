const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
const kn=()=>ev(()=>document.querySelectorAll('#notice,.chap,.sty,.unl,.rpop,.modal').forEach(x=>x.remove()));
await sl(1500);await kn();
await ev(()=>{const b=document.querySelector('#battle');const mk=(c,t)=>{const d=document.createElement('div');d.className=c;d.innerHTML=t;b.appendChild(d);setTimeout(()=>d.remove(),1300)};mk('mkb','<b>MULTI KILL</b>');
 R.elT={t:0,n:'고블린 대장',c:{n:'고블린 대장'}};R.ekT={t:0,x:300,y:500,g:1234};const f=document.createElement('div');f.className='wclr';f.style.left='250px';f.style.top='450px';f.innerHTML='<i></i><b style="left:-40px">WAVE CLEAR</b>';b.appendChild(f);setTimeout(()=>f.remove(),1000)});
for(let i=0;i<10;i++){await sh('_s'+i);await sl(350)}
// backlog test: 6 MULTI KILL in a row behind a long stban
await ev(()=>{const b=document.querySelector('#battle');const mk=(c,t)=>{const d=document.createElement('div');d.className=c;d.innerHTML=t;b.appendChild(d);setTimeout(()=>d.remove(),1300)};mk('stban','<b>STAGE</b>');mk('wvb','<b>WAVE 2</b>');mk('fevban','<b>FEVER</b>');for(let i=0;i<5;i++)mk('mkb','<b>MULTI KILL</b>')});
const lg=[];for(let i=0;i<30;i++){lg.push(await ev(()=>{const m=document.querySelector('.mkb');return m?m.textContent:'-'}));if(lg[lg.length-1].includes('×')&&!lg.saved){lg.saved=1;await sh('_m')}await sl(300)}console.log(lg.join('|'));
console.log('ERRS',errs);stop();await b.close()})();
