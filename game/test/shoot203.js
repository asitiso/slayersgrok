const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s203');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await ev(()=>{const s=G.S();s.party=['gourry','xellos','borin'];s.comps={gourry:1,xellos:1,borin:1};G.C.buildAllies()});
await until(()=>G.C.alive().length>=4&&G.C.alive().filter(e=>{const q=(G.R||window.RENDER)._ES().get(e);return q&&q.x<285}).length>=3&&G.C.alive().filter(e=>e.fac=='chaos'||e.fac=='human').length>=3,60000);await clr();await sl(400);
console.log(await ev(()=>{const R=G.R||window.RENDER,ES=R._ES();return G.C.alive().map(e=>e.fac+'@'+Math.round((ES.get(e)||{}).x)).join()+' scr='+G.screen+' fin='+G._fin+' q='+!!document.querySelector('.vic,.bwarn')+' err='+G._wkErr+' fac='+[...(G.C.B.allies||[])].map(a=>G.C.allyFac(a))}));await sh('939-weak-mark-swarm');
let got=false;for(let tryN=0;tryN<8&&!got;tryN++){await until(()=>G.C.alive().length>=4&&!G.C.B.boss&&!document.querySelector('.vic'),60000);
console.log('cast',await ev(()=>{const C=G.C;const sp=D.SPELLS.find(x=>x.k=='ice');C.B.cds[sp.k]=0;C.B.lock=0;return C.castSpell(sp)}));
for(let i=0;i<30;i++){if(await ev(()=>!!document.querySelector('.tdmg'))){got=true;break}await sl(100)}}
await sl(250);await sh('940-skill-total-dmg');console.log('got',got,await ev(()=>JSON.stringify(G._tdDbg)));
console.log('td',await ev(()=>G._tdLast),await ev(()=>JSON.stringify(G._tdDbg)),await ev(()=>[...document.querySelectorAll('.vic,.bwarn,.wvb,.wclr,.mkb,.fevban,.enrb,.bsht,.stban,.banner')].map(n=>n.className+':'+getComputedStyle(n).opacity+':'+getComputedStyle(n).display+':'+n.textContent.slice(0,20)).join('|')));
console.log('ERR',JSON.stringify(errs));stop();await b.close()})();
