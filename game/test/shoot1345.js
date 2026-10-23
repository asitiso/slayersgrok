// r268: v219 toggle art. 1345: real settings screen (states as saved). Then click-test slide transition (restored after), lite check.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('settings')});await sl(600);
const info=()=>p.evaluate(()=>[...document.querySelectorAll('#screen .tog')].map(t=>{const r=t.getBoundingClientRect(),k=t.querySelector('i').getBoundingClientRect();return t.dataset.set+':'+(t.classList.contains('on')?'ON':'off')+' '+Math.round(r.width)+'x'+Math.round(r.height)+' knob'+Math.round(k.height)+' kx'+Math.round(k.left-r.left)}));
console.log('toggles',JSON.stringify(await info()));await p.evaluate(()=>{const t=document.querySelector('#screen .tog:not(.on)');t&&t.scrollIntoView({block:'center'})});await sl(300);console.log('offInView',await p.evaluate(()=>{const r=document.querySelector('#screen .tog:not(.on)').getBoundingClientRect();return Math.round(r.top)}),await p.evaluate(()=>[...document.querySelectorAll('#screen .tog')].filter(t=>{const r=t.getBoundingClientRect();return r.top>60&&r.bottom<760}).map(t=>t.dataset.set+(t.classList.contains('on')?':ON':':off')).join(',')));
await p.screenshot({path:'../screenshots/1345_toggles.jpg',type:'jpeg',quality:86});
const k=await p.evaluate(()=>document.querySelector('#screen .tog[data-set]').dataset.set);
const tx=()=>p.evaluate(k=>{const t=document.querySelector(`#screen .tog[data-set="${k}"]`);return new DOMMatrix(getComputedStyle(t.querySelector('i')).transform).m41.toFixed(1)},k);
await p.click(`#screen .tog[data-set="${k}"]`);const a=[];for(const d of [20,60,60,200]){await sl(d);a.push(await tx())}console.log('slide',k,a.join(' → '));
await p.click(`#screen .tog[data-set="${k}"]`);await sl(300);console.log('restored',JSON.stringify((await info())[0]));
await p.evaluate(()=>{G.loadSet().gq='save';renderScreen()});await sl(100);
await p.click(`#screen .tog[data-set="${k}"]`);await sl(30);console.log('lite',await p.evaluate(()=>document.body.classList.contains('tglite')),await tx());
await p.click(`#screen .tog[data-set="${k}"]`);
console.log('ERRS',JSON.stringify(errs));await b.close()})();
