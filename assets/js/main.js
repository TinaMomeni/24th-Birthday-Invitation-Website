/* Tina's 24th Birthday - behavior (all features, one file).
   To change the party date edit CFG below. */
const CFG={date:new Date('2026-10-22T18:00:00')};
const $=s=>document.querySelector(s),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const pick=a=>a[Math.floor(Math.random()*a.length)];


/* date, time, links */
$('#dDate').textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(CFG.date);
$('#dTime').textContent=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',hour12:true}).format(CFG.date);


/* countdown */
const iv=setInterval(tick,1000);tick();
function tick(){
  const t=CFG.date-Date.now();
  if(t<=0){$('#cd').innerHTML='<p class="now">It\'s party day! 🎉</p>';clearInterval(iv);return}
  const v=[Math.floor(t/864e5),Math.floor(t/36e5)%24,Math.floor(t/6e4)%60,Math.floor(t/1e3)%60];
  document.querySelectorAll('#cd b').forEach((e,i)=>e.textContent=v[i]);
}

/* confetti */
const cv=$('#cf'),cx=cv.getContext('2d');let ps=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
const cols=['#ffc9dd','#e3d9ff','#cdeee0','#cfe5ff','#fff0b8','#ffd6c9'];
function burst(x,y,n=90){
  if(rm)return;
  for(let i=0;i<n;i++){const a=Math.random()*6.28,s=4+Math.random()*9;ps.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,w:6+Math.random()*6,h:4+Math.random()*5,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%cols.length],l:120+Math.random()*60})}
  if(!run){run=true;requestAnimationFrame(loop)}
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);ps=ps.filter(q=>q.l>0);
  for(const q of ps){q.vy+=.28;q.vx*=.99;q.x+=q.vx;q.y+=q.vy;q.r+=q.vr;q.l--;cx.save();cx.translate(q.x,q.y);cx.rotate(q.r);cx.globalAlpha=Math.min(1,q.l/40);cx.fillStyle=q.c;cx.fillRect(-q.w/2,-q.h/2,q.w,q.h);cx.restore()}
  if(ps.length)requestAnimationFrame(loop);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}
$('#n24').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,140)};
setTimeout(()=>burst(innerWidth/2,innerHeight*.4,120),2100);

/* balloons + cursor hearts */
const nb=innerWidth>=900?22:innerWidth>=600?14:9;for(let i=0;i<nb;i++){const b=document.createElement('span');b.className='bl';b.setAttribute('aria-hidden','true');b.style.cssText=`left:${5+Math.random()*88}%;--c:${cols[i%cols.length]};--d:${14+Math.random()*10}s;animation-delay:-${Math.random()*20}s,-${Math.random()*3}s;scale:${.8+Math.random()*.7}`;$('#hero').append(b)}
const hc=[['#ffc9dc','#ff8fba'],['#ffeaa8','#ffd34d'],['#d9ccff','#b49cff'],['#bdeedd','#6fe0b8'],['#c4e0ff','#7fbcff'],['#ffd6c4','#ffab8a']];let last=0;
addEventListener('pointermove',e=>{
  if(rm||e.pointerType==='touch'||e.timeStamp-last<70)return;last=e.timeStamp;
  const s=document.createElement('i');s.className='sp';s.textContent='♥';const c=hc[Math.floor(Math.random()*hc.length)];s.style.color=c[0];s.style.setProperty('--st',c[1]);s.style.fontSize=(1+Math.random()*.8)+'rem';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.append(s);setTimeout(()=>s.remove(),1700);
});

/* outfit ideas: each idea sets the three emojis */
const IDEAS=[
 {n:'Graduation',d:'Dress like it is your graduation day.',e:['🎓','🥼','👠']},
 {n:'Halloween',d:'Come as something spooky for Halloween.',e:['🎃','🦇','🕷️']},
 {n:'Funeral',d:'Dress in black like you are going to a funeral.',e:['🖤','🕯️','🥀']},
 {n:'Christmas',d:'Dress like it is Christmas morning.',e:['🎅','🧣','🧦']},
 {n:'Pajama Party',d:'Wear your coziest pajamas.',e:['😴','🧸','🩴']},
 {n:'Gym',d:'Dress like you are heading to the gym.',e:['🎧','🏋️','👟']}
];
let idx=0;
function mix(){
  const x=IDEAS[idx];idx=(idx+1)%IDEAS.length;
  ['#s1','#s2','#s3'].forEach((id,k)=>{const el=$(id);el.textContent=x.e[k];el.classList.remove('flip');void el.offsetWidth;el.style.animationDelay=k*.08+'s';el.classList.add('flip')});
  $('#it').textContent=x.n;$('#idd').textContent=x.d;
  const b=$('#idea');b.classList.remove('flip');void b.offsetWidth;b.classList.add('flip');
}
$('#mixBtn').onclick=()=>{mix();const r=$('#mixBtn').getBoundingClientRect();burst(r.left+r.width/2,r.top,30)};


mix();

/* upgrades: progress bar, floating nav, scroll reveal, ticket tilt, guest greeting */
const prog=$('#prog'),dock=$('#dock');
function onScroll(){
  const h=document.documentElement.scrollHeight-innerHeight;
  prog.style.width=(h>0?scrollY/h*100:0)+'%';
  dock.classList.toggle('show',scrollY>innerHeight*.6);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver' in window){
  const links=[...dock.querySelectorAll('a')];
  const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('#hero,#count,#info,#dress,#mystery').forEach(x=>spy.observe(x));
  if(!rm){
    const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('section .wrap').forEach(x=>{x.classList.add('rv');rv.observe(x)});
  }
}
const tk=$('.ticket');
if(tk&&!rm){
  tk.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=tk.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tk.style.transform=`perspective(900px) rotateY(${x*9}deg) rotateX(${-y*9}deg)`});
  tk.addEventListener('pointerleave',()=>tk.style.transform='');
}
const guest=new URLSearchParams(location.search).get('guest');
if(guest){const g=$('#greet');g.textContent='Hi '+guest.trim().slice(0,30)+'! 💌';g.hidden=false}
/* ===== v2: inspired by lusion.co ===== */
// loader with counter
(()=>{const pre=$('#pre');if(rm){pre.remove();return}
const n=$('.pn'),bar=$('.pb i'),t0=performance.now();
(function f(t){const k=Math.min(1,(t-t0)/1500);n.textContent=Math.round(k*100);bar.style.width=k*100+'%';if(k<1)requestAnimationFrame(f);else{pre.classList.add('done');setTimeout(()=>pre.remove(),1000)}})(t0)})();

// interactive glossy spheres in the hero (they run away from the pointer and bump into each other)
(()=>{if(rm)return;const hr=$('#hero'),c=$('#phys'),x=c.getContext('2d');let W,H,mx=-999,my=-999,B=[];
const cl=['#ffc9dc','#e3d9ff','#cdeee0','#d4e8ff','#fff0b8','#ffdccf'];
function rs(){const r=hr.getBoundingClientRect();W=c.width=r.width;H=c.height=r.height;if(!B.length)for(let i=0;i<11;i++)B.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2,r:20+Math.random()*30,c:cl[i%6]})}
rs();addEventListener('resize',rs);
hr.addEventListener('pointermove',e=>{const r=hr.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
hr.addEventListener('pointerleave',()=>{mx=my=-999});
(function tick(){x.clearRect(0,0,W,H);
 for(const a of B){const dx=a.x-mx,dy=a.y-my,d=Math.hypot(dx,dy)||1;if(d<150){const f=(150-d)/150*1.4;a.vx+=dx/d*f;a.vy+=dy/d*f}
  a.vx*=.985;a.vy*=.985;a.x+=a.vx;a.y+=a.vy;
  if(a.x<a.r){a.x=a.r;a.vx*=-1}if(a.x>W-a.r){a.x=W-a.r;a.vx*=-1}if(a.y<a.r){a.y=a.r;a.vy*=-1}if(a.y>H-a.r){a.y=H-a.r;a.vy*=-1}}
 for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],b=B[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),m=a.r+b.r;
  if(d<m&&d>0){const nx=dx/d,ny=dy/d,p=(m-d)/2;a.x-=nx*p;a.y-=ny*p;b.x+=nx*p;b.y+=ny*p;const k=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;a.vx-=k*nx;a.vy-=k*ny;b.vx+=k*nx;b.vy+=k*ny}}
 for(const a of B){const g=x.createRadialGradient(a.x-a.r*.35,a.y-a.r*.4,a.r*.1,a.x,a.y,a.r);g.addColorStop(0,'#fff');g.addColorStop(.3,a.c);g.addColorStop(1,a.c);x.globalAlpha=.92;x.fillStyle=g;x.beginPath();x.arc(a.x,a.y,a.r,0,6.283);x.fill()}
 requestAnimationFrame(tick)})()})();


// magnetic buttons
if(!rm)document.querySelectorAll('.btn').forEach(b=>{
 b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',(e.clientX-r.left-r.width/2)*.25+'px');b.style.setProperty('--my',(e.clientY-r.top-r.height/2)*.35+'px')});
 b.addEventListener('pointerleave',()=>{b.style.setProperty('--mx','0px');b.style.setProperty('--my','0px')});
});

// big headings: letters rise one by one when the section appears
if('IntersectionObserver' in window&&!rm)document.querySelectorAll('section h2').forEach(h=>{
 const t=h.textContent;h.setAttribute('aria-label',t);h.textContent='';let n=0;const ws=t.split(' ');
 ws.forEach((w,wi)=>{const k=document.createElement('span');k.className='kw';k.setAttribute('aria-hidden','true');
  [...w].forEach(ch=>{const l=document.createElement('span');l.textContent=ch;l.style.setProperty('--i',n++);k.append(l)});
  h.append(k);if(wi<ws.length-1)h.append(' ')});
});

// sound toggle with soft chimes
let ac=null,snd=false;
function chime(f){if(!snd||!ac)return;const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.5);o.connect(g).connect(ac.destination);o.start();o.stop(t+.55)}
$('#snd').onclick=e=>{snd=!snd;if(snd&&!ac)ac=new (window.AudioContext||window.webkitAudioContext)();if(ac&&ac.state==='suspended')ac.resume();e.currentTarget.textContent=snd?'Sound On':'Sound Off';e.currentTarget.setAttribute('aria-pressed',snd);chime(880)};
const burst0=burst;burst=function(px,py,n){chime(520+Math.random()*400);burst0(px,py,n)};
// hero numbers drift slightly with the pointer
(()=>{if(rm)return;const h=$('#hero'),n=$('#n24');h.addEventListener('pointermove',e=>{const r=h.getBoundingClientRect();n.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*2);n.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*2)})})();
// hero decoration: bunting flags, drifting clouds, floating confetti shapes
(()=>{const hr=$('#hero'),ns='http://www.w3.org/2000/svg',cl=['#ffb3cf','#cdbcff','#a8e3cb','#fff0b8','#ffd6c4','#bcd9ff'];
 const sv=hr.querySelector('.bunt'),pa=sv.querySelector('path'),L=pa.getTotalLength();
 for(let i=0;i<15;i++){const pt=pa.getPointAtLength(L*(i+.5)/15),g=document.createElementNS(ns,'polygon');
  g.setAttribute('points',`${pt.x-30},${pt.y-2} ${pt.x+30},${pt.y-2} ${pt.x},${pt.y+60}`);g.setAttribute('fill',cl[i%6]);
  if(!rm)g.style.cssText=`transform-origin:${pt.x}px ${pt.y}px;animation:fsw 3.4s ease-in-out ${(-i*.3).toFixed(1)}s infinite alternate`;sv.append(g)}
 for(let i=0;i<3;i++){const c=document.createElement('div');c.className='cloud';c.setAttribute('aria-hidden','true');c.style.cssText=`top:${14+i*17}%;transform:scale(${.8+i*.25});animation-duration:${50+i*18}s;animation-delay:-${i*19}s`;if(rm)c.style.animation='none';hr.append(c)}
 const sh=['\u2665','\u2726','\u2726','ring','\u2665','ring'];
 for(let i=0;i<18;i++){const e=document.createElement('i'),k=sh[i%sh.length],c=cl[(i*5)%6];e.className='cf';e.setAttribute('aria-hidden','true');
  if(k==='ring'){e.classList.add('ring');e.style.borderColor=c}else{e.textContent=k;e.style.color=c;e.style.fontSize=(.9+Math.random()*1.1)+'rem'}
  e.style.cssText+=`;left:${Math.random()*94+2}%;top:${14+Math.random()*68}%;animation-duration:${4+Math.random()*4}s;animation-delay:-${Math.random()*6}s`;if(rm)e.style.animation='none';hr.append(e)}
})();
