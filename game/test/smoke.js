const puppeteer=require('puppeteer-core');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader'],headless:'new'});
const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(()=>localStorage.clear());await p.goto(U);
await p.evaluate(()=>{const s=G.S();s.comps={gourry:2,zelgadis:1,amelia:1};s.party=['gourry','zelgadis','amelia'];G.C.buildAllies()});
for(let i=0;i<6;i++){await sleep(700);await p.screenshot({path:`/tmp/sm${i}.png`,clip:{x:0,y:0,width:390,height:440}})}
const fps=await p.evaluate(()=>new Promise(r=>{let n=0,t0=performance.now();function f(){n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2)}requestAnimationFrame(f)}));
console.log('fps',fps,'ERR',JSON.stringify(errs));await b.close()})();
