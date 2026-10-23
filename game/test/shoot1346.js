// r269: v220 settings top-card label fix + slider art. 1346: settings top (cards + sliders at real saved values). Logs label colours, slider geometry; arrow-key test (restored).
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('settings')});await sl(800);
console.log('labels',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#screen :is(#nkRow,#svRow,#ntRow) .f :is(b,small)')].map(e=>e.textContent.slice(0,10)+' '+getComputedStyle(e).color))));
const g=()=>p.evaluate(()=>[...document.querySelectorAll('#screen .sldw')].map(w=>{const i=w.querySelector('input'),r=w.getBoundingClientRect(),f=w.querySelector('.sldf').getBoundingClientRect();return i.dataset.vol+'='+i.value+' vv'+w.parentElement.querySelector('.vv').textContent+' set'+G.set[i.dataset.vol]+' w'+Math.round(r.width)+' fill'+Math.round(f.width)+' expect'+Math.round(13+(r.width-26)*i.value/100)}));
console.log('sliders',JSON.stringify(await g()));
await p.screenshot({path:'../screenshots/1346_settings_sliders.jpg',type:'jpeg',quality:86});
await p.focus('#screen input[data-vol=bgmV]');await p.keyboard.press('ArrowRight');await sl(50);console.log('after →',JSON.stringify((await g())[0]));
await p.keyboard.press('ArrowLeft');await sl(50);console.log('restored',JSON.stringify((await g())[0]));
await p.evaluate(()=>renderScreen());await sl(200);console.log('rerender',JSON.stringify(await g()));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
