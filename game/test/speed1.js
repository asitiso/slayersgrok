const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const U='http://127.0.0.1:18791/index.html';
const errs=[];
// 1) cold load on simulated 4G
{const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message));const cdp=await p.target().createCDPSession();await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:9e6/8,uploadThroughput:3e6/8});
 let bytes=0,n=0,bytesL=0,nL=0,loaded=false;const big=[];cdp.on('Network.loadingFinished',e=>{bytes+=e.encodedDataLength;n++;if(!loaded){bytesL+=e.encodedDataLength;nL++}});
 await p.evaluateOnNewDocument(()=>{const f=()=>{try{const cv=document.querySelector('#cv');if(cv&&cv.width>10){const c=cv.getContext('2d').getImageData(cv.width/2,cv.height*.6,1,1).data;if(c[3]>0){window._fb=performance.now();return}}}catch(e){}setTimeout(f,30)};setTimeout(f,30);const g=()=>{try{const R=window.RENDER;if(R&&R.bgCache&&Object.keys(R.bgCache).length){window._bg=performance.now();return}}catch(e){}setTimeout(g,30)};setTimeout(g,30);const h=()=>{try{if([...document.images].length>5&&[...document.querySelectorAll('#nav img,.side img')].every(i=>i.complete)&&document.querySelector('#nav img')){window._hud=performance.now();return}}catch(e){}setTimeout(h,30)};setTimeout(h,30)});const t0=Date.now();await p.goto(U,{waitUntil:'load',timeout:180000});loaded=true;const tLoad=Date.now()-t0;
 const nav=await p.evaluate(()=>{const e=performance.getEntriesByType('navigation')[0];return{dcl:Math.round(e.domContentLoadedEventEnd),load:Math.round(e.loadEventEnd)}});
 const tBattle=Math.round(await p.evaluate(()=>window._fb||-1)),tBg=Math.round(await p.evaluate(()=>window._bg||-1)),tHud=Math.round(await p.evaluate(()=>window._hud||-1));
 await sl(3000);
 console.log('LOAD4G',JSON.stringify({dcl:nav.dcl,load:nav.load,firstCanvasPx:tBattle,battleBgReady:tBg,hudIconsReady:tHud,reqAtLoad:nL,MBAtLoad:+(bytesL/1e6).toFixed(2),req5s:n,MB5s:+(bytes/1e6).toFixed(2)}));await p.close()}
// 2) screens + 3) tick
{const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message));await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(2500);
 await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice').forEach(x=>x.remove());const s=G.S();s.tut=9;s.lv=40;s.maxSi=34;s.gold=1e7;s.gems=5000;G.storyOn=0});await sl(800);
 const keys=await p.evaluate(()=>['mail','event','map','base','guild','arena','dungeon','relic','explore','summon','party','enhance','bag','codex','ach','title','wboss','rank','pass','skin','settings','shop']);
 const cdp=await p.target().createCDPSession();
 for(const thr of (process.env.NOSCR?[]:[1,4])){await cdp.send('Emulation.setCPUThrottlingRate',{rate:thr});const res={};
  for(const k of keys){const t=await p.evaluate(k=>new Promise(r=>{document.querySelectorAll('.modal,#notice,.unl').forEach(x=>x.remove());const a=performance.now();try{menuGo(k)}catch(e){}const s1=performance.now()-a;requestAnimationFrame(()=>setTimeout(()=>{const t=performance.now()-a;try{if(G.screen)closeScreen();if(G.tab&&G.tab!='battle')openSheet(G.tab)}catch(e){}r([+s1.toFixed(1),+t.toFixed(1)])},0))}),k);res[k]=t;await sl(150)}
  const tot=Object.values(res).reduce((a,v)=>a+v[1],0);const worst=Object.entries(res).sort((a,b)=>b[1][1]-a[1][1]).slice(0,5);
  console.log('SCREENS x'+thr,JSON.stringify({avgMs:+(tot/keys.length).toFixed(1),worst}));
  const tk=await p.evaluate(()=>{const C=G.C;const all=[];for(let k=0;k<3;k++){C.spawn();all.push(...C.B.enemies)}C.B.enemies=all;const N=600;const a=performance.now();for(let i=0;i<N;i++)C.tick(1/60);const t=(performance.now()-a)/N;return{msPerTick:+t.toFixed(3),en:C.B.enemies.length}});
  console.log('TICK x'+thr,JSON.stringify(tk))}
 await p.close()}
console.log('ERRS',errs.slice(0,3));await b.close()})();
