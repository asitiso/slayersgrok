// r265: v216 themed stage nodes. 1339: 제5장 (ice) chapter view; 1340: 제1장 (leaf). Logs node srcs per chapter + boss/locked unchanged + crest/label geometry.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('map')});await sl(300);
const info=()=>p.evaluate(()=>[...document.querySelectorAll('#screen .snode')].map(n=>{const im=n.querySelector('img:not(.sbimg)'),r=im.getBoundingClientRect(),c=n.querySelector('.ncr'),cr=c&&c.getBoundingClientRect(),l=n.querySelector('b').getBoundingClientRect();return [n.querySelector('b').textContent,im.getAttribute('src').replace('assets/',''),im.complete&&im.naturalWidth>0,Math.round(r.width)+'x'+Math.round(r.height),cr?'crest dx'+Math.round(cr.left-r.left)+' dy'+Math.round(cr.top-r.top):'-','lbl dy'+Math.round(l.top-r.bottom)]}));
for(const c of [4,0,1,2,3,5,6]){await p.evaluate(c=>{G.mapCh=c;renderScreen()},c);await sl(c==4||c==0?1400:300);const r=await info();console.log('ch'+(c+1),JSON.stringify(r.map(x=>x.slice(0,3).join(' '))));
 if(c==4){console.log('geom',JSON.stringify(r));await p.screenshot({path:'../screenshots/1339_nodes_ch5.jpg',type:'jpeg',quality:86})}
 if(c==0){console.log('geom',JSON.stringify(r));await p.screenshot({path:'../screenshots/1340_nodes_ch1.jpg',type:'jpeg',quality:86})}}
console.log('theme fn',await p.evaluate(()=>[0,1,2,3,4,5,6,7,8].map(c=>G.nodeTheme(c)).join(',')));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
