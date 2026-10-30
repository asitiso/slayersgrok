// lean growth sim: active play + daily offline/gems/summons. usage: node test/sim_grow.js [activeHoursPerDay=2] [maxHours=60]
const puppeteer=require('puppeteer-core');const wd=require('./watchdog');const SEED=+(process.env.SEED||12345);const AH=+(process.argv[2]||2),MH=+(process.argv[3]||60),NB=+(process.argv[4]??3000),MODE=process.argv[5]||'new';
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',protocolTimeout:60000});const p=await b.newPage();await p.setViewport({width:390,height:844});await p.evaluateOnNewDocument((sd)=>{let st=sd>>>0;Math.random=()=>{st=st+0x6D2B79F5|0;let t=Math.imul(st^st>>>15,1|st);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.requestAnimationFrame=()=>0},SEED);
await p.goto('http://127.0.0.1:18791/index.html');await p.evaluate(()=>localStorage.clear());await p.goto('http://127.0.0.1:18791/index.html');await new Promise(r=>setTimeout(r,1500));/* r435: each chunk is one long synchronous evaluate, so the page heartbeat cannot tick while it runs; on a loaded box a chunk can pass the 6s default and the watchdog killed the run silently (its message went to stdout, hidden by grep). Sim gets a 30s limit and loud stderr. */const stop=await wd(p,'grow',+(process.env.WD_MS||30000));let _done=0;process.on('exit',c=>{if(!_done)console.error('SIM INCOMPLETE exit',c)});
await p.evaluate((AH)=>{document.querySelectorAll('.modal,.tut').forEach(x=>x.remove());let s=G.S();s.tut=9;s.autoBoss=true;s.autoSpell=true;G.noSave=1;G.save=()=>{};G.screen='sim';R.frame=()=>{};
 const C=G.C;window._t=0;window._rows=[];window._last=-1;window._day=0;const T0=1790000000000;window._T0=T0;C.now=()=>T0+window._t*1000+window._day*86400e3*0;window.AH=AH[0];{let a=AH[3]>>>0,b=(AH[3]*7+1)>>>0;const mk=st=>()=>{st|=0;st=st+0x6D2B79F5|0;let t=Math.imul(st^st>>>15,1|st);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window._RA=(()=>{let st=a;return()=>{st=st+0x6D2B79F5|0;let t=Math.imul(st^st>>>15,1|st);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})();window._RB=(()=>{let st=b;return()=>{st=st+0x6D2B79F5|0;let t=Math.imul(st^st>>>15,1|st);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})();C.rand=window._RA;G.speed=0;window._MR=Math.random;window._DN=Date.now;Math.random=window._RB;Date.now=()=>T0;C.load(null);s=G.S();s.tut=9;s.autoBoss=true;s.autoSpell=true;try{G.C.buildAllies();C.selectStage(0);const B=C.B;for(const k in B.cds)B.cds[k]=0;B.rT=0;C.spawn()}catch(_){}Math.random=window._MR;Date.now=window._DN;window._PN=performance.now.bind(performance)}window.NB=AH[1];window._dl=[];s.gems+=window.NB;// one-time newbie mail+achievements+attendance approx
if(AH[2]=='base'){C.gearSet=()=>({atk:0,hp:0})}window.MODE=AH[2];
return JSON.stringify([G.S(),Object.keys(G.C.B||{}).map(k=>[k,typeof G.C.B[k]=='object'?JSON.stringify(G.C.B[k]).slice(0,300):G.C.B[k]])])},[AH,NB,MODE,SEED]).then(x=>require('fs').writeFileSync('/tmp/init'+process.pid+'.json',x));
for(let chunk=0;chunk<6000;chunk++){const r=await p.evaluate((MH)=>{const C=G.C,S=G.S();const t0=window._PN();Math.random=window._RB;performance.now=()=>1e9+window._t*1000;const _T0=window._T0;const _OD=window.Date;window.Date=class extends _OD{constructor(...a){super(...(a.length?a:[_T0+window._t*1000]))}static now(){return _T0+window._t*1000}};try{
 if(window._t<1)while(S.gems>=2700)C.summon(10);
 while(window._PN()-t0<50000){for(let k=0;k<40;k++){C.tick(.1);window._t+=.1}
  for(let k=0;k<30;k++){if(!C.train(C.cheapestStat().k))break}
  if(C.talUp)for(let g=0;g<15;g++){const o=['atk','hp','gold'].sort((x,y)=>((S.tal||{})[x]||0)-((S.tal||{})[y]||0));if(!o.some(q=>C.talUp(q)))break}
  if(S.orbs>0){S.filter=99;for(let k=0;k<8&&S.orbs>0;k++){C.rollOnce();C.autoRollStep()}}
  for(const sl in S.gear){for(let k=0;k<3;k++){const r=C.enhance(sl);if(r!==true&&r!=='ok'&&r!=='fail'&&typeof r=='string')break}}
  for(const k of S.party){for(let j=0;j<3;j++)if(!C.compUp(k))break;try{C.starUp(k)}catch(_){}}
  while((S.tickets||0)>=10)C.summon(10);while((S.tickets||0)>=1)C.summon(1);if(S.wave>=3&&!C.B.boss&&C.canAutoBoss&&C.canAutoBoss())C.startBoss();
  // day boundary every AH active hours: offline (rest of day, capped), daily gems ~300, quick hunts x2, summons
  const day=Math.floor(window._t/(window.AH*3600));if(day>window._day){window._day=day;const off=C.offlineCalc(24*3600);C.addGold(off.g);C.gainExp(off.x);S.orbs+=off.o;S.stone=(S.stone||0)+Math.floor(off.sec/900);
   for(let q=0;q<2;q++){const o2=C.offlineCalc(7200);C.addGold(o2.g);C.gainExp(o2.x);S.orbs+=o2.o;S.stone+=8}
   if(window.MODE!='base'&&window.MODE!='nofr'&&G.frSendAll){if(S.fr)S.fr.day='';G.frSendAll();G.frGetAll();for(const k of ['tk','st','st','st','ob','ob','ob','gm','gm'])G.frBuy(k)}
   if(window.MODE!='base'&&window.MODE!='nofr'&&G.olClaimAll){S.ol=null;G.olAdd(3600);G.olClaimAll()}
   S.gems+=600;let n=0;while(S.gems>=2700){C.summon(10);n+=10}window._dl.push([day,Math.round(off.g),Math.round(off.x),off.o,n])}
  if(window.MODE!='base'&&S.nb&&G.nbClaim){S.nb.t0=C.now()-window._day*864e5;for(let d=0;d<7;d++)for(let i=0;i<3;i++)G.nbClaim(d,i);G.nbFin&&G.nbFin()}
  if(S.maxSi>window._last){window._last=S.maxSi;window._rows.push([C.stageName(S.maxSi),Math.round(window._t/60),window._day,S.lv,C.POW(),C.stageReq(S.maxSi)])}
  if(S.maxSi>=34||S.done||window._t>MH*3600)break}
 }finally{Math.random=window._MR;window.Date=_OD;performance.now=window._PN}
 return {t:window._t,last:window._rows.slice(-1),done:S.maxSi>=34||S.done||window._t>MH*3600,rows:window._rows,dl:window._dl}},MH);
 if(chunk%25==0)console.log('chunk',chunk,Math.round(r.t/60),JSON.stringify(r.last));if(r.done){console.log('stage min day lv POW req');r.rows.forEach(x=>console.log(x.join(' '),(x[4]/x[5]).toFixed(2)));console.log('SEED',SEED);console.log('daily',JSON.stringify(r.dl.slice(0,3)),JSON.stringify(r.dl.slice(-2)));_done=1;break}}
stop();await b.close()})();
