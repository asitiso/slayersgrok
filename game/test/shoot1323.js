// r257: v208 3-star crest on stage-map nodes — 1323 map overview (real s.stars data: some ★3, some ★1-2), 1324 close-up incl. first-time ★3 pop
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');const MODE=process.argv[2]||'shot';
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
const info=await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;const s=C.S();s.stars=s.stars||{};const before=JSON.stringify(s.stars);localStorage.removeItem('slayers_s3seen');
 // bigsave has every cleared stage at ★3; fixture for a readable mix in chapter 5 (stages 28-33): ★3,★3,★2,★1→★3 later (fresh pop),★3,★2; 34 = current boss (uncleared)
 Object.assign(s.stars,{28:3,29:3,30:2,31:1,32:3,33:2});window._fresh=31;return {si:s.si,maxSi:s.maxSi,stars:before}});console.log('save',JSON.stringify(info));
await p.evaluate(()=>openScreen('map'));await sl(1500);
const nodes=()=>p.evaluate(()=>[...document.querySelectorAll('#screen .snode[data-n]')].map(n=>{const q=n.getBoundingClientRect(),c=n.querySelector('.ncr'),b=(n.querySelector('b')||n).getBoundingClientRect(),cr=c&&c.getBoundingClientRect();return [+n.dataset.n,G.stStar(+n.dataset.n),c?c.className:'-',cr&&(cr.bottom>b.top&&cr.left<b.right&&cr.right>b.left&&cr.top<b.bottom)?'OVERLAP':'',Math.round(q.left),Math.round(q.top)]}));
console.log('nodes1',JSON.stringify(await nodes()));
await p.evaluate(()=>{C.S().stars[window._fresh]=3;G.mapCh=-1;document.querySelector('#wBtn').click()});await sl(400);await p.evaluate(()=>document.querySelector('.wpin[data-ch="4"]').click());await sl(750);
console.log('nodes2',JSON.stringify(await nodes()),'seen',await p.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('slayers_s3seen'))).length));
if(MODE=='shot'){await p.screenshot({path:'../screenshots/1323_stage_crest.jpg',type:'jpeg',quality:88});
 const n=await p.evaluate(()=>{const e=document.querySelector(`.snode[data-n="${window._fresh}"]`).getBoundingClientRect();return [e.left+e.width/2,e.top+e.height/2]});
 await p.screenshot({path:'../screenshots/1324_stage_crest_close.jpg',type:'jpeg',quality:92,clip:{x:Math.max(0,n[0]-120),y:Math.max(0,n[1]-110),width:240,height:220}})}
console.log('errs',JSON.stringify(errs));await b.close()})();
