// r298: battle readability shot - real battle (bigsave read-only, G.noSave) - waits for a WAVE CLEAR ribbon with a live crit; logs ribbon/WARNING timing
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();
await p.evaluate(()=>{window._lg=[];const t0=performance.now(),L=m=>_lg.push(Math.round(performance.now()-t0)+' '+m);new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes)if(n.classList){if(n.classList.contains('wrib'))L('ribbon+ '+n.textContent);if(n.classList.contains('bwarn'))L('warn+ q='+n.classList.contains('bwq'));if(n.classList.contains('vsx'))L('vs+')}for(const n of m.removedNodes)if(n.classList){if(n.classList.contains('wrib'))L('ribbon-');if(n.classList.contains('bwarn'))L('warn-')}if(m.type=='attributes'&&m.target.classList){const c=m.target.classList;if(c.contains('wrib')&&c.contains('out'))L('ribbon out');if(c.contains('bwarn'))L('warn cls='+m.target.className)}}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})});
const out=process.argv[2]||'1375_battle_readable';let shot=0,i=0;
for(;i<2600&&!shot;i++){const s=await p.evaluate(()=>{const r=document.querySelector('#battle .wvb.wrib:not(.out)');const cb=document.querySelector('#battle .cmbx');return {rib:!!r,rt:r?r.textContent:'',crit:R._critLow?R._critLow(358):0,cmb:!!cb,boss:!!C.B.boss}});
 if(s.rib&&s.crit>0&&s.cmb&&/CLEAR/.test(s.rt)){await p.screenshot({path:'../screenshots/'+out+'.jpg',type:'jpeg',quality:88});shot=1;console.log('shot at',i,JSON.stringify(s))}else await sl(40)}
if(!shot)console.log('no ribbon+crit+combo moment');
// keep watching for a boss start to log WARNING queue timing
for(let k=0;k<400;k++){const w=await p.evaluate(()=>!!document.querySelector('.bwarn:not(.bwq)'));if(w){await sl(700);await p.screenshot({path:'../screenshots/'+out+'b_warn.jpg',type:'jpeg',quality:85});break}await sl(50)}
await p.evaluate(()=>{}).then(()=>sl(1500));const info=await p.evaluate(()=>{const o={dtTop:R._dtTop,bwQ:R._bwQ||0,txt:R._cnt&&R._cnt().TXT};const c=document.querySelector('#battle .cmbx');if(c){const r=c.getBoundingClientRect();o.cmbx=[r.left,r.top,r.right,r.bottom].map(Math.round)}return o});
console.log('INFO',JSON.stringify(info));console.log((await p.evaluate(()=>_lg)).slice(-30).join('\n'));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
