const screens=[...document.querySelectorAll('.screen')];
const order=screens.map(s=>s.id);
let currentIndex=Math.max(0,screens.findIndex(s=>s.classList.contains('is-active')));

function show(id,direction=1){
  const nextIndex=order.indexOf(id);
  if(nextIndex<0||nextIndex===currentIndex)return;
  const current=screens[currentIndex];
  const next=screens[nextIndex];

  current.classList.remove('slide-out-left','slide-out-right');
  next.classList.remove('slide-out-left','slide-out-right');

  current.classList.add(direction>0?'slide-out-left':'slide-out-right');
  current.classList.remove('is-active');
  next.classList.add('is-active');
  currentIndex=nextIndex;

  setTimeout(()=>current.classList.remove('slide-out-left','slide-out-right'),650);

  if(id==='page-3') startSurveillanceLoop();
  else stopSurveillanceLoop();

  if(id==='page-5') setTimeout(updateHorizontalRoulette,50);
}

document.querySelectorAll('[data-next]').forEach(b=>{
  b.addEventListener('click',()=>show(b.dataset.next,1));
});
document.querySelectorAll('[data-prev]').forEach(b=>{
  b.addEventListener('click',()=>show(b.dataset.prev,-1));
});

function step(dir){
  const nextIndex=(currentIndex+dir+screens.length)%screens.length;
  show(order[nextIndex],dir);
}

window.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight') step(1);
  if(e.key==='ArrowLeft') step(-1);
});

let pageTouchX=0;
window.addEventListener('touchstart',e=>{
  pageTouchX=e.changedTouches[0].clientX;
},{passive:true});

window.addEventListener('touchend',e=>{
  const target=e.target.closest?.('#rouletteWindow');
  if(target) return;
  const delta=e.changedTouches[0].clientX-pageTouchX;
  if(Math.abs(delta)>55) step(delta<0?1:-1);
},{passive:true});

/* Página 03 */
const surveillanceWords=['FILMADO','OBSERVADO','OUVIDO','RASTREADO'];
let surveillanceTimer=null;
let surveillanceIndex=0;

function startSurveillanceLoop(){
  const el=document.getElementById('surveillanceWord');
  if(!el) return;
  clearInterval(surveillanceTimer);
  surveillanceIndex=0;
  el.textContent=surveillanceWords[0];
  surveillanceTimer=setInterval(()=>{
    el.classList.add('swap');
    setTimeout(()=>{
      surveillanceIndex=(surveillanceIndex+1)%surveillanceWords.length;
      el.textContent=surveillanceWords[surveillanceIndex];
      el.classList.remove('swap');
    },140);
  },760);
}
function stopSurveillanceLoop(){
  clearInterval(surveillanceTimer);
  surveillanceTimer=null;
}

/* Página 04 */
const moodToggle=document.getElementById('moodToggle');
const page4=document.getElementById('page-4');
if(moodToggle&&page4){
  let bad=false;
  page4.classList.remove('mood-good','mood-bad-state');
  moodToggle.addEventListener('click',()=>{
    bad=!bad;
    page4.classList.toggle('mood-bad-state',bad);
  });
}

/* Página 05 */
const rouletteCards=[...document.querySelectorAll('.roulette-card')];
const rouletteTrack=document.getElementById('rouletteTrack');
const rouletteWindow=document.getElementById('rouletteWindow');
let rouletteIndex=0;

function updateHorizontalRoulette(){
  if(!rouletteTrack||!rouletteCards.length||!rouletteWindow) return;
  const cardWidth=rouletteCards[0].getBoundingClientRect().width;
  const gap=16;
  const centerOffset=Math.max(0,(rouletteWindow.clientWidth-cardWidth)/2);
  rouletteTrack.style.transform='translateX('+(centerOffset-rouletteIndex*(cardWidth+gap))+'px)';

  rouletteCards.forEach((el,i)=>{
    el.classList.toggle('is-active',i===rouletteIndex);
    el.classList.toggle('is-near',Math.abs(i-rouletteIndex)===1);
  });
}

function moveHorizontalRoulette(dir){
  if(!rouletteCards.length)return;
  rouletteIndex=(rouletteIndex+dir+rouletteCards.length)%rouletteCards.length;
  updateHorizontalRoulette();
}

document.getElementById('rouletteLeft')?.addEventListener('click',()=>moveHorizontalRoulette(-1));
document.getElementById('rouletteRight')?.addEventListener('click',()=>moveHorizontalRoulette(1));

rouletteWindow?.addEventListener('wheel',e=>{
  e.preventDefault();
  moveHorizontalRoulette((e.deltaX>0||e.deltaY>0)?1:-1);
},{passive:false});

let rouletteTouchX=0;
rouletteWindow?.addEventListener('touchstart',e=>{
  rouletteTouchX=e.changedTouches[0].clientX;
},{passive:true});

rouletteWindow?.addEventListener('touchend',e=>{
  const delta=e.changedTouches[0].clientX-rouletteTouchX;
  if(Math.abs(delta)>35) moveHorizontalRoulette(delta<0?1:-1);
},{passive:true});

window.addEventListener('resize',updateHorizontalRoulette);
updateHorizontalRoulette();
