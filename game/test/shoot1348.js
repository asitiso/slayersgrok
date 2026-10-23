// r271: v222 인연 screen icons. 1348: bond screen top (portrait badges, level hearts, gift cards); 1348b: dialogue unlock list.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('bond')});await sl(900);
const info=()=>p.evaluate(()=>{const sc=document.querySelector('#screen'),t=sc.innerText,m=t.match(/\p{Extended_Pictographic}|[♥♡]/gu)||[];const imgs=[...sc.querySelectorAll('img')].filter(i=>/bd_|it2_|sk_lock/.test(i.src));return {emojiLeft:m.join(''),broken:imgs.filter(i=>!(i.complete&&i.naturalWidth)).map(i=>i.src),badges:[...sc.querySelectorAll('.bdc .bl')].map(e=>e.textContent).join(','),hearts:sc.querySelectorAll('.bh img[src*=heart_full]').length+'/'+sc.querySelectorAll('.bh').length,lvl:(sc.querySelector('.bdcard .ttl')||{}).textContent,lines:[...sc.querySelectorAll('.bdln')].map(e=>e.className+':'+e.querySelector('img').src.split('/').pop()+':'+e.textContent.slice(0,14)),gifts:[...sc.querySelectorAll('.bdgi')].map(e=>e.querySelector('.i img').src.split('/').pop()+' '+e.innerText.replace(/\n/g,' '))}});
console.log('INFO',JSON.stringify(await info()));
await p.screenshot({path:'../screenshots/1348_bond_icons.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{const t=[...document.querySelectorAll('#screen .bdln')].pop();t&&t.scrollIntoView({block:'center'})});await sl(300);
await p.screenshot({path:'../screenshots/1348b_bond_lines.jpg',type:'jpeg',quality:86});
console.log('ERRS',JSON.stringify(errs));await b.close()})();
