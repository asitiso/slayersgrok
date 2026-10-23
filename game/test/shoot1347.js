// r270: v221 settings button icons + ribbon section titles. 1347: settings top (cards with icons + 게임 ribbon); 1347b: scrolled to 계정 ribbon.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('settings')});await sl(800);
console.log('btns',JSON.stringify(await p.evaluate(()=>['nkBtn','svGo','ntGo'].map(id=>{const b=document.getElementById(id),i=b.querySelector('img.sbi');return id+' "'+b.textContent+'" '+(i?i.getAttribute('src')+' '+(i.complete&&i.naturalWidth>0)+' '+Math.round(i.getBoundingClientRect().width):'NOIMG')}))));
console.log('titles',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#screen .stpaper .card>.ttl')].map(t=>{const r=t.getBoundingClientRect(),c=t.closest('.card').getBoundingClientRect(),s=getComputedStyle(t);return t.textContent.trim()+' '+s.color+' w'+Math.round(r.width)+' centreOff'+Math.round((r.left+r.width/2)-(c.left+c.width/2))+' vis:'+s.display}))));
await p.screenshot({path:'../screenshots/1347_settings_icons.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{const t=[...document.querySelectorAll('#screen .stpaper .card>.ttl')].pop();t&&t.scrollIntoView({block:'center'})});await sl(300);
await p.screenshot({path:'../screenshots/1347b_settings_account.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{document.querySelector('#screen .tog[data-set=story]').click()});await sl(300);console.log('after toggle rerender',await p.evaluate(()=>document.querySelectorAll('#screen img.sbi').length));await p.evaluate(()=>{document.querySelector('#screen .tog[data-set=story]').click()});
console.log('ERRS',JSON.stringify(errs));await b.close()})();
