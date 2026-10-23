// r299 probe: dump bottom battle strip rects (real save read-only, G.noSave)
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const W=+process.argv[2]||390;const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:W,height:Math.round(W*844/390),deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const clr=()=>p.evaluate(()=>{G.noSave=1;document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};try{closeScreen()}catch(_){}});
await clr();await sl(1500);await clr();await sl(1500);
const o=await p.evaluate(()=>{const A=document.getElementById('app').getBoundingClientRect();const out=[];document.querySelectorAll('#app *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||r.top<540||r.top>700)return;const cs=getComputedStyle(e);if(cs.visibility=='hidden'||cs.opacity=='0'||cs.display=='none')return;if(e.children.length>6)return;out.push([e.tagName+(e.id?'#'+e.id:'')+(e.className&&typeof e.className=='string'?'.'+e.className.split(' ').join('.'):''),...[r.left-A.left,r.top-A.top,r.right-A.left,r.bottom-A.top].map(v=>Math.round(v)),(e.childElementCount?'':e.textContent.slice(0,20))].join(' '))});return {A:[A.width,A.height],out}});
console.log(JSON.stringify(o.A));console.log(o.out.join('\n'));
if(process.argv[3])await p.screenshot({path:process.argv[3],type:'jpeg',quality:85});
console.log('ERRS',JSON.stringify(errs));await b.close()})();
