// r276: hero card rarity frames (g2/g3/g4) + wave ribbon timing probe in real battle
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';const save=fs.readFileSync('/tmp/bigsave.json','utf8');
const boot=async(s)=>{await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},s);await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false})};
await boot(save);
// observer: sample each ribbon's opacity every 50ms from creation until removal
await p.evaluate(()=>{window._rb=[];const t0=performance.now();new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&n.classList.contains('wrib')){const rec={txt:n.textContent,at:Math.round(performance.now()-t0),s:[]};window._rb.push(rec);const c=performance.now();const iv=setInterval(()=>{const t=Math.round(performance.now()-c);if(!n.isConnected){rec.gone=t;clearInterval(iv);return}rec.s.push(t+':'+(+getComputedStyle(n).opacity).toFixed(2))},50)}}).observe(document.getElementById('battle'),{childList:true,subtree:true})});
const st=await p.evaluate(()=>({boss:!!C.B.boss,scr:G.screen||'',lvb:!!document.querySelector('#battle .lvem,#battle .qsc'),cut:!!(R.ccut&&R.ccut.t<1),wcsl:!!document.querySelector('.wcsl')}));console.log('state',JSON.stringify(st));
await p.evaluate(()=>{R._wrq&&R._wrq();R.waveRib('FINAL WAVE',1)});await sl(2000);
await sl(16000);// natural waves
const rb=await p.evaluate(()=>window._rb);rb.forEach(r=>console.log('ribbon',r.txt,'@'+r.at,'gone',r.gone,r.s.filter((_,i)=>i%3==0).join(' ')));
const card=async(k,f)=>{await p.evaluate(k=>{if(G.screen)closeScreen();openScreen('enhance');G.enTab='comp';G.trSel=k;renderScreen();},k);await sl(1000);
const i=await p.evaluate(()=>{const e=document.querySelector('#screen .trv');const sb=document.querySelector('#screen .sbody');sb.scrollTop+=e.getBoundingClientRect().top-sb.getBoundingClientRect().top-58;const fr=e.querySelector('.hcfr');return {cls:e.className,w:e.offsetWidth,h:e.offsetHeight,bi:fr&&getComputedStyle(fr).borderImageSource.slice(-24)}});await p.evaluate(()=>{window._cutEls=[...document.querySelectorAll('body *')].filter(x=>!x.closest('#screen')&&/독날|연격/.test(x.textContent)&&x.children.length<6).map(x=>x.className).slice(0,5);document.querySelectorAll('.wcsl,.ccut,.cutin,.ccin').forEach(x=>x.remove());document.body.classList.add('hs-sh');G.paused=1});await sl(500);console.log(await p.evaluate(()=>JSON.stringify(window._cutEls)));console.log(k,JSON.stringify(i));await p.screenshot({path:'../screenshots/'+f,type:'jpeg',quality:86})};
await card('gourry','1353b_hero_card_g3.jpg');await card('pip','1353c_hero_card_g2.jpg');
// g4: none owned in bigsave -> TEST-ONLY save copy with xellos added at 1 star (shot fixture, not player data)
const o=JSON.parse(save);o.comps.xellos=1;await boot(JSON.stringify(o));await card('xellos','1353_hero_card_g4.jpg');
console.log('ERRS',JSON.stringify(errs));await b.close()})();
