const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--js-flags=--expose-gc'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:1});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);await sl(900);
await p.evaluate(()=>{const s=G.S();s.maxSi=20;s.lv=30;s.stl.hp=300;s.comps={gourry:1,zelgadis:1,rhea:1,borin:1};s.party=['gourry','zelgadis','rhea','borin'];s.autoSpell=true;G.C.buildAllies();DATA.BAL.swarm=[12,12];G.C.selectStage(2)});
await sl(1500);
await p.evaluate(()=>{window.__f=[];window.__js=[];const of=RENDER.frame;RENDER.frame=function(){const t=performance.now();const r=of.apply(this,arguments);__js.push(performance.now()-t);return r};let l=performance.now();const f=t=>{__f.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f);
 window.__lt=[];try{new PerformanceObserver(l=>l.getEntries().forEach(e=>__lt.push([e.name,Math.round(e.duration)]))).observe({entryTypes:['longtask']})}catch(e){}});
await sl(10000);
console.log(await p.evaluate(()=>{const a=__f.slice(5),s=[...a].sort((x,y)=>x-y),j=[...__js].sort((x,y)=>x-y);return JSON.stringify({fps:+(1000*a.length/a.reduce((x,y)=>x+y,0)).toFixed(1),hitch:a.filter(x=>x>25).length,n:a.length,js50:j[j.length>>1].toFixed(2),js99:j[Math.floor(j.length*.99)].toFixed(2),jsmax:j[j.length-1].toFixed(1),lt:__lt.slice(0,10),mem:performance.memory&&Math.round(performance.memory.usedJSHeapSize/1e6)})}));await b.close()})();
