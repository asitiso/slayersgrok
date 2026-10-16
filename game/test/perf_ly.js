const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:30000});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));p.on('requestfailed',r=>errs.push('RF '+r.url()));
const U='http://127.0.0.1:18791/index.html';const sh=n=>p.screenshot({path:'screenshots/'+n+'.jpg',type:'jpeg',quality:85});const ev=(f,a)=>p.evaluate(f,a);
await p.goto(U);await ev(()=>localStorage.clear());await p.goto(U);await sl(1500);const stop=await wd(p,'s256');
await ev(()=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=14;s.maxSi=6;s.gold=99999;s.gems=5000;s.comps={gourry:1,xellos:1,borin:1};s.party=['gourry','xellos','borin'];s.bond={x:{kaede:450,pip:80,xellos:160},day:'',n:{}};G.C.buildAllies()});
await sl(1500);const clr=()=>ev(()=>{document.querySelectorAll('#notice,.modal,.sty,.unl,.chap,.bwarn,.vic').forEach(x=>x.remove());G.storyOn=0;G.loadSet().story=0});await clr();
const until=async(f,ms)=>{for(let i=0;i<ms/500;i++){if(await ev(f))return true;await sl(500)}return false};
await clr();await sl(2000);await clr();
const cdp=await p.target().createCDPSession();let L=null;cdp.on('LayerTree.layerTreeDidChange',e=>{if(e.layers)L=e.layers});await cdp.send('DOM.enable');await cdp.send('LayerTree.enable');await sl(1500);
console.log('layers',L&&L.length);const big=L.filter(l=>l.drawsContent).map(l=>({w:Math.round(l.width),h:Math.round(l.height),n:l.backendNodeId,pc:l.paintCount}));
for(const x of big.sort((a,b)=>b.pc-a.pc).slice(0,15)){let d='';if(x.n){try{const r=await cdp.send('DOM.describeNode',{backendNodeId:x.n});d=r.node.nodeName+' '+(r.node.attributes||[]).join(' ').slice(0,60)}catch(_){}}console.log(x.w+'x'+x.h,'paints',x.pc,d)}
stop();await b.close()})();
