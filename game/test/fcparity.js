// r237: field scroll-cache parity - same frame rendered with R.noFC=1 (direct) vs cache, compare field pixels
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync(process.argv[2]||'/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0});
for(let k=0;k<5;k++){await sl(1500);console.log(await p.evaluate(()=>{return new Promise(res=>{R.__cmp=(A,B)=>{R.__cmp=null;let mx=0,sum=0,n=0,big=0;for(let i=0;i<A.length;i+=4){for(let c=0;c<3;c++){const d=Math.abs(A[i+c]-B[i+c]);sum+=d;n++;if(d>mx)mx=d;if(d>24)big++}}res('FC '+JSON.stringify({n:R._FC.n,full:R._FC.full,fr:R._FC.fr,up:R._FC.up})+' meanAbs '+(sum/n).toFixed(3)+' max '+mx+' px>24 '+big+' of '+(A.length/4))}})}))}
await b.close()})();
