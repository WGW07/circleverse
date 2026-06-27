/* =====================================================
   SAFETY GUARD — jika CDN gagal/lambat load, jangan sampai
   konten hilang (opacity:0 permanen). Stub minimal dibuat
   agar semua gsap.* tetap aman dipanggil & elemen tetap terlihat.
   ===================================================== */
if(typeof gsap === 'undefined'){
  window.gsap = {
    to:(target,vars)=>{ applyEndState(target,vars); return {}; },
    from:(target,vars)=>{ /* abaikan initial state agar elemen tidak hilang */ return {}; },
    fromTo:(target,from,to)=>{ applyEndState(target,to); return {}; },
    timeline:()=>{
      const chain = {
        to(target,vars){ applyEndState(target,vars); return chain; },
        from(target,vars){ /* abaikan initial state agar elemen tidak hilang */ return chain; },
        fromTo(target,from,to){ applyEndState(target,to); return chain; }
      };
      return chain;
    },
    utils:{ toArray:(sel)=> Array.from(document.querySelectorAll(sel)) },
    registerPlugin:()=>{}
  };
  function applyEndState(target, vars){
    if(!vars) return;
    const els = typeof target === 'string' ? document.querySelectorAll(target) : (target.length ? target : [target]);
    els.forEach(el=>{
      if(!el || !el.style) return;
      if('opacity' in vars) el.style.opacity = vars.opacity;
      if('y' in vars) el.style.transform = `translateY(${vars.y}px)`;
      if('x' in vars) el.style.transform = `translateX(${vars.x}px)`;
      if('scale' in vars) el.style.transform = (el.style.transform||'') + ` scale(${vars.scale})`;
      if(typeof vars.onComplete === 'function') vars.onComplete();
      if(typeof vars.onUpdate === 'function') vars.onUpdate.call({targets:()=>[{val:vars.val||0}]});
    });
  }
}
if(typeof ScrollTrigger === 'undefined'){ window.ScrollTrigger = { create:()=>{} }; }
if(typeof Typed === 'undefined'){
  window.Typed = function(sel, opts){
    const el = document.querySelector(sel);
    if(el && opts && opts.strings && opts.strings[0]) el.textContent = opts.strings[0];
  };
}
if(typeof VanillaTilt === 'undefined'){ window.VanillaTilt = { init:()=>{} }; }
if(typeof particlesJS === 'undefined'){ window.particlesJS = ()=>{}; }
if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && gsap.registerPlugin){
  gsap.registerPlugin(ScrollTrigger);
}

/* =====================================================
   DATA
   ===================================================== */
const MEMBERS = {
  kevin:{
    name:"Kevin", fullName:"Robby Kevin", nick:"@kev.codes", color:"var(--kevin)", icon:"fa-laptop-code",
    major:"Teknik Informatika", uni:"Universitas Brawijaya",
    hobby:"Coding, Gaming, Nonton anime", food:"Mie Goreng & Kopi Hitam",
    colorFav:"Biru Neon", song:"Starboy — The Weeknd",
    motto:"Code never lies, bugs just hide.",
    quote:"\"Logika boleh dingin, tapi circle ini selalu hangat.\"",
    skills:[["JavaScript",88],["Backend",82],["UI Logic",75]],
    timeline:["2024 — Gabung circle lewat tugas kelompok","2025 — Magang sebagai backend dev","2026 — Lulus dengan predikat cumlaude"],
    theme:"code", tagline:"im Just COOL", tagsub:"idgaf!"
  },
  anas:{
    name:"Anas", fullName:"Narul Anas", nick:"@anasdunks", color:"var(--anas)", icon:"fa-basketball",
    major:"Teknik Informatika", uni:"Universitas Negeri Surabaya",
    hobby:"Basket, Vlogging, Futsal", food:"Mie Ayam & Es Teh",
    colorFav:"Oranye Cerah", song:"Sunday Best — Surfaces",
    motto:"Effort beats talent kalau talent gak effort.",
    quote:"\"Hidup itu kayak basket, kadang miss kadang masuk — yang penting terus shoot.\"",
    skills:[["Public Speaking",80],["Leadership",85],["Editing Video",70]],
    timeline:["2024 — Jadi MC acara kampus pertama kali","2025 — Juara 2 turnamen basket fakultas","2026 — Lulus & jadi koordinator alumni"],
    theme:"geo", tagline:"stay LOUD", tagsub:"no cap!"
  },
  nia:{
    name:"Nia", fullName:"Imada Nathania", nick:"@nia.draws", color:"var(--nia)", icon:"fa-palette",
    major:"Teknik Informatika", uni:"Institut Teknologi Sepuluh Nopember",
    hobby:"Menggambar, K-Pop, Jurnal", food:"Matcha Latte & Dessert",
    colorFav:"Pink Pastel", song:"Butterfly — BTS",
    motto:"Warna boleh lembut, tekad harus kuat.",
    quote:"\"Setiap goresan punya cerita, sama seperti setiap hari yang kita lewati bersama.\"",
    skills:[["Illustration",90],["Branding",78],["Motion Graphic",65]],
    timeline:["2024 — Ikut kompetisi ilustrasi nasional","2025 — Freelance desainer untuk UMKM","2026 — Pameran tugas akhir solo pertama"],
    theme:"butterfly", tagline:"soft but SHARP", tagsub:"sweet asf!"
  },
  novel:{
    name:"Novel", fullName:"Novelia Putri", nick:"@novel.writes", color:"var(--rohi)", icon:"fa-book-open",
    major:"Teknik Informatika", uni:"Universitas Airlangga",
    hobby:"Menulis, Membaca, Senja", food:"Thai Tea & Roti Bakar",
    colorFav:"Ungu Lavender",  song:"Liability — Lorde",
    motto:"Kata-kata adalah rumah bagi perasaan yang tak terucap.",
    quote:"\"Aku menulis bukan untuk dibaca semua orang, tapi untuk diingat oleh yang tepat.\"",
    skills:[["Creative Writing",92],["Translation",80],["Public Reading",60]],
    timeline:["2024 — Naskah pertama dimuat di majalah kampus","2025 — Jadi volunteer perpustakaan kota","2026 — Wisuda sambil menyusun buku puisi pertama"],
    theme:"stars", tagline:"quiet but DEEP", tagsub:"dreamer!"
  }
};

const QUOTES = [
  "\"Kenangan tak pernah tamat, ia hanya pindah halaman.\"",
  "\"Circle ini bukan soal selalu dekat, tapi selalu kembali.\"",
  "\"Empat kepala, sejuta cerita, satu ikatan.\"",
  "\"Kita bukan sempurna, tapi kita selalu lengkap berempat.\"",
  "\"Setiap drama kampus selalu lebih ringan kalau dilewati bareng.\""
];

/* =====================================================
   LOADER
   ===================================================== */
window.addEventListener('DOMContentLoaded', ()=>{
  let pct = 0;
  const fill = document.getElementById('loaderFill');
  const pctEl = document.getElementById('loaderPct');
  const iv = setInterval(()=>{
    pct += Math.random()*18 + 6;
    if(pct >= 100){ pct = 100; clearInterval(iv); setTimeout(finishLoad, 350); }
    fill.style.width = pct + '%';
    pctEl.textContent = Math.floor(pct) + '%';
  }, 220);
});
function finishLoad(){
  document.getElementById('loader').classList.add('hide');
  initParticles();
  playEntranceAnimation();
}

/* =====================================================
   CUSTOM CURSOR + TRAIL
   ===================================================== */
const cdot = document.getElementById('cursor-dot');
const cring = document.getElementById('cursor-ring');
let trailPool = [];
document.addEventListener('mousemove', e=>{
  cdot.style.left = e.clientX+'px'; cdot.style.top = e.clientY+'px';
  cring.style.left = e.clientX+'px'; cring.style.top = e.clientY+'px';
  if(Math.random() > 0.7){
    const t = document.createElement('div');
    t.className='cursor-trail';
    t.style.left = e.clientX+'px'; t.style.top = e.clientY+'px';
    document.body.appendChild(t);
    gsap.to(t, {opacity:0, scale:0, duration:.6, onComplete:()=>t.remove()});
  }
});
document.addEventListener('mousedown', ()=>{ gsap.to(cring,{scale:.7,duration:.15}); });
document.addEventListener('mouseup', ()=>{ gsap.to(cring,{scale:1,duration:.15}); });
document.querySelectorAll('a,button,.member-card,.masonry-item,.memory-card,.quiz-opt,.gallery-filter,.game-tab').forEach(el=>{
  el.addEventListener('mouseenter', ()=>{ cring.style.width='52px'; cring.style.height='52px'; cring.style.background='rgba(224,184,75,.15)'; });
  el.addEventListener('mouseleave', ()=>{ cring.style.width='32px'; cring.style.height='32px'; cring.style.background='transparent'; });
});

/* Magnetic buttons */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    gsap.to(btn, {x:x*0.3, y:y*0.3, duration:.3});
  });
  btn.addEventListener('mouseleave', ()=> gsap.to(btn,{x:0,y:0,duration:.4,ease:'elastic.out(1,0.4)'}));
});

/* =====================================================
   NAVBAR — scroll spy, mobile burger, smooth nav, theme
   ===================================================== */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
function scrollSpy(){
  let current = sections[0].id;
  sections.forEach(sec=>{
    const top = sec.offsetTop - 140;
    if(window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(l=> l.classList.toggle('active', l.dataset.target === current));
}
window.addEventListener('scroll', scrollSpy);

document.getElementById('navBurger').addEventListener('click', ()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
navLinks.forEach(l=> l.addEventListener('click', e=>{
  e.preventDefault();
  document.getElementById(l.dataset.target).scrollIntoView({behavior:'smooth'});
  document.getElementById('navLinks').classList.remove('open');
}));
document.querySelectorAll('[data-goto]').forEach(b=> b.addEventListener('click', ()=>{
  document.getElementById(b.dataset.goto).scrollIntoView({behavior:'smooth'});
}));

document.getElementById('themeToggle').addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  const icon = document.querySelector('#themeToggle i');
  icon.className = document.body.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

/* Page transition on internal nav clicks (visual flourish) */
function pageTransitionFlash(){
  const ov = document.getElementById('page-transition');
  gsap.timeline()
    .to(ov, {scaleY:1, duration:.35, ease:'power2.in'})
    .to(ov, {scaleY:0, duration:.35, ease:'power2.out', transformOrigin:'bottom', delay:.05});
}
document.querySelectorAll('.nav-link,[data-goto]').forEach(el=> el.addEventListener('click', pageTransitionFlash));

/* =====================================================
   LIVE CLOCK + DATE + TYPED + QUOTE ROTATE
   ===================================================== */
function updateClock(){
  const now = new Date();
  document.getElementById('liveClock').textContent = now.toLocaleTimeString('id-ID');
  document.getElementById('liveDate').textContent = now.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
}
setInterval(updateClock, 1000); updateClock();

new Typed('#typedTarget', {
  strings:['Selamat datang di dunia kami','Four souls, one story','Sebuah circle, sejuta cerita'],
  typeSpeed:45, backSpeed:25, backDelay:1800, loop:true
});

let qIdx = 0;
setInterval(()=>{
  qIdx = (qIdx+1) % QUOTES.length;
  const q = document.getElementById('dashQuote');
  gsap.to(q,{opacity:0,y:10,duration:.4,onComplete:()=>{
    q.textContent = QUOTES[qIdx]; gsap.to(q,{opacity:1,y:0,duration:.4});
  }});
}, 4500);

/* count up members */
gsap.to({val:0}, {
  val:4, duration:1.4, delay:.3,
  onUpdate(){ document.getElementById('memberCountUp').textContent = Math.floor(this.targets()[0].val); }
});

/* =====================================================
   PARTICLES.JS (dashboard background)
   ===================================================== */
function initParticles(){
  if(typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    particles:{
      number:{value:55,density:{enable:true,value_area:800}},
      color:{value:["#3D9DFF","#FF8A3D","#FF6FA5","#9B6BFF"]},
      shape:{type:'circle'},
      opacity:{value:.4,random:true},
      size:{value:3,random:true},
      line_linked:{enable:true,distance:140,color:'#E0B84B',opacity:.2,width:1},
      move:{enable:true,speed:1.3,out_mode:'out'}
    },
    interactivity:{
      events:{onhover:{enable:true,mode:'grab'},onclick:{enable:true,mode:'push'}},
      modes:{grab:{distance:140,line_linked:{opacity:.5}},push:{particles_nb:3}}
    },
    retina_detect:true
  });
}

function playEntranceAnimation(){
  gsap.timeline()
    .from('.dash-eyebrow', {opacity:0,y:-20,duration:.6})
    .from('.dash-title', {opacity:0,scale:.7,duration:.7,ease:'back.out(1.6)'},'-=.3')
    .from('.dash-subtitle', {opacity:0,y:20,duration:.6},'-=.3')
    .from('.dash-meta', {opacity:0,y:20,duration:.6},'-=.3')
    .from('.dash-quote', {opacity:0,duration:.6},'-=.2')
    .from('.dash-buttons', {opacity:0,y:20,duration:.6},'-=.2');

  /* Memory board entrance — banner turun, polaroid masuk satu-satu, sticky+pin nyusul */
  gsap.timeline({delay:.3})
    .to('.memory-board-bg', {opacity:1, duration:.01})
    .from('.memory-board-bg', {opacity:0, y:-20, rotation:-8, duration:.6, ease:'power2.out'})
    .to('#mbBanner', {opacity:1, y:0, duration:.55, ease:'back.out(1.8)'}, '-=.2')
    .fromTo('#mb1', {opacity:0,scale:.6,rotation:-20}, {opacity:1,scale:1,rotation:-6,duration:.5,ease:'back.out(1.5)'}, '-=.1')
    .fromTo('#mb2', {opacity:0,scale:.6,rotation:20}, {opacity:1,scale:1,rotation:5,duration:.5,ease:'back.out(1.5)'}, '-=.25')
    .fromTo('#mb3', {opacity:0,scale:.6,rotation:-20}, {opacity:1,scale:1,rotation:-3,duration:.5,ease:'back.out(1.5)'}, '-=.25')
    .fromTo('#mb4', {opacity:0,scale:.6,rotation:20}, {opacity:1,scale:1,rotation:7,duration:.5,ease:'back.out(1.5)'}, '-=.25')
    .fromTo('#mbSticky1', {opacity:0,scale:.5,rotation:-8}, {opacity:1,scale:1,rotation:-8,duration:.4,ease:'back.out(2)'}, '-=.1')
    .fromTo('#mbSticky2', {opacity:0,scale:.5,rotation:6}, {opacity:1,scale:1,rotation:6,duration:.4,ease:'back.out(2)'}, '-=.25')
    .fromTo('#mbPin1, #mbPin2, #mbPin3, #mbPin4', {opacity:0,scale:0}, {opacity:1,scale:1,duration:.3,stagger:.08}, '-=.2');
}

/* =====================================================
   MEMBERS — tilt + GSAP reveal + modal
   ===================================================== */
VanillaTilt.init(document.querySelectorAll('.tilt-card'), { max:10, speed:400, glare:true, 'max-glare':.25 });

gsap.utils.toArray('.member-card').forEach((card,i)=>{
  gsap.from(card, {
    opacity:0, y:60, duration:.7, delay:i*0.12,
    scrollTrigger:{ trigger:card, start:'top 88%' }
  });
});

function themeFxSvg(theme, color){
  if(theme==='code'){
    return `<svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      ${Array.from({length:8}).map((_,i)=>`<text x="${i*38}" y="0" fill="${color}" font-family="monospace" font-size="13" opacity=".5">
        <animate attributeName="y" from="-20" to="320" dur="${2+Math.random()*2}s" repeatCount="indefinite" begin="${Math.random()*2}s"/>
        01${i}10
      </text>`).join('')}
    </svg>`;
  }
  if(theme==='geo'){
    return `<svg viewBox="0 0 300 300" width="100%" height="100%">
      ${Array.from({length:6}).map((_,i)=>`<polygon points="0,-14 12,7 -12,7" fill="none" stroke="${color}" stroke-width="2" opacity=".5"
        transform="translate(${30+i*45},${40+ (i%3)*80})">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="${6+i}s" repeatCount="indefinite" additive="sum"/>
      </polygon>`).join('')}
    </svg>`;
  }
  if(theme==='butterfly'){
    return `<svg viewBox="0 0 300 300" width="100%" height="100%">
      ${Array.from({length:7}).map((_,i)=>`<text x="${20+i*38}" y="${40+(i%4)*60}" font-size="18" opacity=".6">
        <animate attributeName="y" values="${40+(i%4)*60};${20+(i%4)*60};${40+(i%4)*60}" dur="${3+Math.random()*2}s" repeatCount="indefinite"/>
        🦋
      </text>`).join('')}
    </svg>`;
  }
  if(theme==='stars'){
    return `<svg viewBox="0 0 300 300" width="100%" height="100%">
      ${Array.from({length:30}).map(()=>`<circle cx="${Math.random()*300}" cy="${Math.random()*300}" r="${1+Math.random()*2}" fill="${color}">
        <animate attributeName="opacity" values="0;1;0" dur="${1.5+Math.random()*2}s" repeatCount="indefinite" begin="${Math.random()*2}s"/>
      </circle>`).join('')}
    </svg>`;
  }
  return '';
}

/* =====================================================
   ANIME PORTRAIT POSTER — ilustrasi original per anggota
   (sticky note nama + scribble neon + siluet rambut anime)
   ===================================================== */
function hairPathForTheme(theme){
  // siluet rambut anime, digambar di kanvas 0-300 (x) / 0-300 (y), bagian atas kepala
  switch(theme){
    case 'code': // cowok - rambut spike acak2an, gelap
      return "M86,140 C78,72 108,28 150,26 C194,28 224,72 216,140 C212,108 210,80 196,62 C200,80 192,96 182,82 C182,100 170,70 162,86 C158,68 148,100 142,84 C136,100 124,70 122,90 C112,78 104,108 100,140 C96,116 90,116 86,140 Z";
    case 'geo': // cowok - rambut pendek rapi, sedikit miring
      return "M84,135 C80,78 112,30 150,28 C190,30 222,78 218,135 C214,98 198,72 150,70 C104,72 88,98 84,135 Z";
    case 'butterfly': // cewek - rambut panjang lurus poni rata
      return "M70,150 C62,84 96,30 150,28 C206,30 240,84 232,150 C228,110 216,86 150,84 C86,86 74,110 70,150 Z M68,150 C66,210 70,260 78,300 L96,300 C90,250 88,200 92,155 Z M234,150 C236,210 232,260 224,300 L206,300 C212,250 214,200 210,155 Z";
    case 'stars': // cewek - rambut panjang bergelombang dengan jambul samping
      return "M68,148 C58,80 94,28 150,26 C208,28 244,80 234,148 C228,104 212,80 150,78 C90,80 74,104 68,148 Z M64,148 C58,205 62,255 70,295 L90,295 C82,248 80,198 86,152 Z M238,148 C244,205 240,255 232,295 L212,295 C220,248 222,198 216,152 Z";
    default:
      return "M84,140 C78,80 110,30 150,28 C192,30 224,80 218,140 C214,104 198,80 150,78 C104,80 88,104 84,140 Z";
  }
}

function animePortraitSvg(m){
  const c = m.color; // CSS var string e.g. var(--kevin)
  const isGirl = (m.theme === 'butterfly' || m.theme === 'stars');
  const hair = hairPathForTheme(m.theme);
  const hairColor = m.theme==='code' ? '#1b1820' : (m.theme==='geo' ? '#2b1c12' : (m.theme==='butterfly' ? '#3a2230' : '#241c30'));
  const jacketColor = m.theme==='code' ? '#1f2a4a' : (m.theme==='geo' ? '#4a3322' : (m.theme==='butterfly' ? '#5c3a4a' : '#3a3050'));
  const tagline = (m.tagline || "IM JUST COOL").toUpperCase();
  const tagsub = m.tagsub || "idgaf!";

  return `
  <svg viewBox="0 0 300 480" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGlow-${m.theme}" cx="50%" cy="28%" r="70%">
        <stop offset="0%" stop-color="${c}" stop-opacity=".5"/>
        <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- base dark backdrop -->
    <rect width="300" height="480" fill="#15131c"/>
    <rect width="300" height="480" fill="url(#bgGlow-${m.theme})"/>

    <!-- neon scribble loop (drawn first, behind figure) -->
    <path class="anime-scribble" d="M-20,270 C50,235 110,310 170,265 C225,225 255,270 320,245"
      fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" opacity=".95"/>
    <path class="anime-scribble" d="M10,330 C80,300 150,345 220,310" style="animation-delay:.35s"
      fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" opacity=".7"/>

    <!-- figure group floats gently -->
    <g class="anime-figure">
      <!-- jacket / shoulders -->
      <path d="M68,318 C72,278 108,250 150,250 C192,250 228,278 232,318 L244,480 L56,480 Z" fill="${jacketColor}"/>
      <path d="M70,320 C100,338 200,338 230,320" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="3"/>
      <!-- collar -->
      <path d="M120,255 L150,290 L180,255" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="3"/>

      <!-- neck -->
      <rect x="133" y="185" width="34" height="42" rx="12" fill="#f4c8a0"/>

      <!-- face -->
      <ellipse cx="150" cy="155" rx="62" ry="68" fill="#ffdcb8"/>
      <!-- ears -->
      <ellipse cx="90" cy="158" rx="9" ry="14" fill="#ffdcb8"/>
      <ellipse cx="210" cy="158" rx="9" ry="14" fill="#ffdcb8"/>

      <!-- blush -->
      <ellipse cx="114" cy="178" rx="11" ry="6" fill="${c}" opacity=".3"/>
      <ellipse cx="186" cy="178" rx="11" ry="6" fill="${c}" opacity=".3"/>

      <!-- eyebrows -->
      <path d="M100,128 Q116,120 134,127" stroke="#2a1d14" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M166,127 Q184,120 200,128" stroke="#2a1d14" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- sleepy anime eyes -->
      <path d="M102,148 Q118,142 136,149" stroke="#241a12" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M164,149 Q182,142 198,148" stroke="#241a12" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M108,151 Q118,155 128,151" stroke="#241a12" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
      <path d="M172,151 Q182,155 192,151" stroke="#241a12" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>

      <!-- nose -->
      <path d="M150,158 L146,172" stroke="#e8b888" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
      <!-- mouth -->
      <path d="M136,188 Q150,195 164,188" stroke="#3a261a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>

      <!-- hair (on top of face edges, behind front fringe) -->
      <path d="${hair}" fill="${hairColor}"/>

      <!-- accessory per theme, sits on hair/neck area -->
      ${m.theme==='code' ? `<rect x="118" y="222" width="64" height="7" rx="3.5" fill="${c}" opacity=".85"/>` : ''}
      ${m.theme==='geo' ? `<circle cx="150" cy="226" r="6" fill="${c}"/>` : ''}
      ${m.theme==='butterfly' ? `<text x="196" y="108" font-size="26">🦋</text>` : ''}
      ${m.theme==='stars' ? `<text x="86" y="96" font-size="18" fill="${c}">✦</text><text x="208" y="118" font-size="13" fill="${c}">✦</text>` : ''}
    </g>

    <!-- sticky note: HELLO I'M ... -->
    <g transform="translate(160,52)">
      <g class="anime-sticky" transform="rotate(-4)">
        <rect x="-58" y="-17" width="116" height="30" rx="4" fill="#ff4d4d"/>
        <rect x="-58" y="-17" width="116" height="30" rx="4" fill="#000" opacity=".08"/>
        <text x="0" y="4" text-anchor="middle" font-family="Poppins, sans-serif" font-size="11.5" font-weight="700" fill="#fff">HELLO, I'M</text>
      </g>
    </g>
    <text x="150" y="108" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="26" fill="#fff" style="paint-order:stroke; stroke:#15131c; stroke-width:6px;">${m.name}</text>
  </svg>`;
}


function openMemberModal(key){
  const m = MEMBERS[key];
  document.getElementById('modalCard').style.setProperty('--mc', m.color);
  document.getElementById('modalGrid').innerHTML = `
    <div class="modal-left">
      <div class="modal-theme-fx">${themeFxSvg(m.theme, '#fff')}</div>
      <div class="anime-portrait-wrap">${animePortraitSvg(m)}</div>
      <div class="modal-left-caption">
        <p class="anime-tagline">${(m.tagline || '').toUpperCase()}</p>
        <span class="anime-badge-html">${m.tagsub || ''}</span>
        <h2>${m.fullName || m.name}</h2>
        <span class="nick">${m.nick}</span>
      </div>
    </div>
    <div class="modal-mid">
      <h4>Biodata</h4>
      <div class="bio-row"><span>Jurusan</span><b>${m.major}</b></div>
      <div class="bio-row"><span>Universitas</span><b>${m.uni}</b></div>
      <div class="bio-row"><span>Hobi</span><b>${m.hobby}</b></div>
      <div class="bio-row"><span>Makanan Favorit</span><b>${m.food}</b></div>
      <div class="bio-row"><span>Warna Favorit</span><b>${m.colorFav}</b></div>
      <p class="modal-quote">${m.quote}</p>
      <p class="modal-motto">Motto: ${m.motto}</p>
    </div>
    <div class="modal-right">
      <h4>Skill</h4>
      ${m.skills.map(s=>`
        <div class="skill-row">
          <span><span>${s[0]}</span><span>${s[1]}%</span></span>
          <div class="skill-bar-track"><div class="skill-bar-fill" data-w="${s[1]}"></div></div>
        </div>`).join('')}
      <h4 style="margin-top:18px;">Timeline</h4>
      <div class="mini-timeline">
        ${m.timeline.map(t=>`<div class="mini-timeline-item"><i class="fa-solid fa-circle-dot"></i><span>${t}</span></div>`).join('')}
      </div>
      <h4 style="margin-top:18px;">Playlist</h4>
      <div class="playlist-row"><i class="fa-solid fa-music"></i><span>${m.song}</span></div>
    </div>
  `;
  document.getElementById('memberModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(()=>{
    document.querySelectorAll('.skill-bar-fill').forEach(b=> b.style.width = b.dataset.w + '%');
  }, 200);
  gsap.fromTo('.modal-left, .modal-mid, .modal-right', {opacity:0,y:20},{opacity:1,y:0,duration:.5,stagger:.08,delay:.15});
}
function closeMemberModal(){
  document.getElementById('memberModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.member-card').forEach(c=> c.addEventListener('click', ()=> openMemberModal(c.dataset.member)));
document.getElementById('modalClose').addEventListener('click', closeMemberModal);
document.getElementById('modalBackdrop').addEventListener('click', closeMemberModal);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMemberModal(); });

/* =====================================================
   GALLERY — masonry, filter, shuffle, lightbox
   ===================================================== */
const PHOTOS = [
  {id:1, cat:'wisuda', seed:'grad1', cap:'Hari kelulusan Kevin 🎓', h:280},
  {id:2, cat:'cafe', seed:'cafe1', cap:'Ngopi sambil bahas skripsi ☕', h:220},
  {id:3, cat:'belajar', seed:'study1', cap:'Belajar bareng di perpus 📚', h:260},
  {id:4, cat:'nongkrong', seed:'hang1', cap:'Nongkrong sore di taman kampus', h:240},
  {id:5, cat:'healing', seed:'beach1', cap:'Healing trip ke pantai 🌊', h:300},
  {id:6, cat:'wisuda', seed:'grad2', cap:'Foto bareng toga lengkap', h:230},
  {id:7, cat:'cafe', seed:'cafe2', cap:'Cafe favorit langganan kita', h:280},
  {id:8, cat:'belajar', seed:'study2', cap:'Diskusi tugas akhir', h:220},
  {id:9, cat:'nongkrong', seed:'hang2', cap:'Malam seru di rooftop', h:260},
  {id:10, cat:'healing', seed:'mountain1', cap:'Healing ke gunung sejuk', h:240},
  {id:11, cat:'wisuda', seed:'grad3', cap:'Wisuda Nia & Novel', h:300},
  {id:12, cat:'cafe', seed:'cafe3', cap:'Latte art kesukaan Nia', h:220},
  {id:13, cat:'belajar', seed:'study3', cap:'Begadang revisi laporan', h:280},
  {id:14, cat:'nongkrong', seed:'hang3', cap:'Karaoke malam minggu', h:230},
  {id:15, cat:'healing', seed:'sunset1', cap:'Nonton sunset bareng', h:260},
];

let currentGalleryList = PHOTOS;
let currentLbIndex = 0;

function renderMasonry(list){
  const grid = document.getElementById('masonryGrid');
  grid.innerHTML = list.map(p=>`
    <div class="masonry-item" data-id="${p.id}" style="height:${p.h}px;">
      <div class="pin-deco pin"></div>
      <img src="https://picsum.photos/seed/${p.seed}/500/${p.h*2}" alt="${p.cap}" loading="lazy">
      <div class="cap">${p.cap}</div>
    </div>
  `).join('');
  gsap.utils.toArray('.masonry-item').forEach((el,i)=>{
    gsap.from(el, {opacity:0, y:30, duration:.5, delay:i*0.05, scrollTrigger:{trigger:el, start:'top 95%'}});
  });
  attachLightboxHandlers(list);
}
renderMasonry(PHOTOS);

document.querySelectorAll('.gallery-filter[data-filter]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.gallery-filter[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    renderMasonry(f==='all' ? PHOTOS : PHOTOS.filter(p=>p.cat===f));
  });
});
document.getElementById('shuffleBtn').addEventListener('click', ()=>{
  const shuffled = [...PHOTOS].sort(()=>Math.random()-0.5);
  renderMasonry(shuffled);
});

function attachLightboxHandlers(list){
  currentGalleryList = list;
  document.querySelectorAll('.masonry-item').forEach((item,idx)=>{
    item.addEventListener('click', ()=> openLightbox(idx));
  });
}
function openLightbox(idx){
  currentLbIndex = idx;
  const p = currentGalleryList[idx];
  document.getElementById('lbImg').src = `https://picsum.photos/seed/${p.seed}/1000/700`;
  document.getElementById('lbCap').textContent = p.cap;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', e=>{ if(e.target.id==='lightbox') closeLightbox(); });
document.getElementById('lbPrev').addEventListener('click', ()=> openLightbox((currentLbIndex-1+currentGalleryList.length)%currentGalleryList.length));
document.getElementById('lbNext').addEventListener('click', ()=> openLightbox((currentLbIndex+1)%currentGalleryList.length));

/* =====================================================
   TIMELINE — scroll reveal
   ===================================================== */
gsap.utils.toArray('.timeline-item').forEach((item,i)=>{
  gsap.to(item, {
    opacity:1, y:0, duration:.7, ease:'power2.out',
    scrollTrigger:{ trigger:item, start:'top 85%' }
  });
});
gsap.from('.timeline-line', {
  scaleY:0, transformOrigin:'top', duration:1.4,
  scrollTrigger:{ trigger:'.timeline-wrap', start:'top 80%' }
});

/* =====================================================
   MINI GAMES — tab switcher
   ===================================================== */
document.querySelectorAll('.game-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.game-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.game-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-'+tab.dataset.game).classList.add('active');
    if(tab.dataset.game==='wheel' && !wheelDrawn){ drawWheel(); wheelDrawn=true; }
  });
});

/* ---------- MEMORY CARD GAME ---------- */
const memIcons = ['💻','🏀','🎨','📖','☕','🦋','⭐','🎓'];
let memCards = [], memFlipped = [], memMatched = 0, memLock = false;

function buildMemoryGame(){
  memCards = [...memIcons, ...memIcons].sort(()=>Math.random()-0.5);
  memFlipped = []; memMatched = 0; memLock = false;
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = memCards.map((icon,i)=>`<div class="memory-card" data-i="${i}" data-icon="${icon}"></div>`).join('');
  document.getElementById('memoryStatus').textContent = 'Cocokkan semua pasangan kartu!';
  grid.querySelectorAll('.memory-card').forEach(card=>{
    card.addEventListener('click', ()=> flipMemoryCard(card));
  });
}
function flipMemoryCard(card){
  if(memLock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  card.textContent = card.dataset.icon;
  memFlipped.push(card);
  if(memFlipped.length === 2){
    memLock = true;
    const [a,b] = memFlipped;
    if(a.dataset.icon === b.dataset.icon){
      a.classList.add('matched'); b.classList.add('matched');
      memMatched++;
      memFlipped = []; memLock = false;
      if(memMatched === memIcons.length){
        document.getElementById('memoryStatus').textContent = '🎉 Selesai! Semua pasangan ketemu!';
        fireConfetti();
      }
    } else {
      setTimeout(()=>{
        a.classList.remove('flipped'); b.classList.remove('flipped');
        a.textContent=''; b.textContent='';
        memFlipped = []; memLock = false;
      }, 700);
    }
  }
}
document.getElementById('memoryReset').addEventListener('click', buildMemoryGame);
buildMemoryGame();

/* ---------- SPIN WHEEL GAME ---------- */
const wheelSegments = [
  {label:'Traktir Boba', color:'#3D9DFF'},
  {label:'Cerita Rahasia', color:'#FF8A3D'},
  {label:'Nyanyi 1 Lagu', color:'#FF6FA5'},
  {label:'Joget 10 Detik', color:'#9B6BFF'},
  {label:'Pilih Tempat Healing', color:'#E0B84B'},
  {label:'Spill Crush', color:'#5cb85c'},
];
let wheelDrawn = false, wheelSpinning = false, wheelRotation = 0;

function drawWheel(){
  const svg = document.getElementById('spinWheel');
  const n = wheelSegments.length, cx=150, cy=150, r=145, anglePer = 360/n;
  let html = '';
  wheelSegments.forEach((seg,i)=>{
    const startA = i*anglePer, endA = (i+1)*anglePer;
    const x1 = cx + r*Math.cos(Math.PI*(startA-90)/180);
    const y1 = cy + r*Math.sin(Math.PI*(startA-90)/180);
    const x2 = cx + r*Math.cos(Math.PI*(endA-90)/180);
    const y2 = cy + r*Math.sin(Math.PI*(endA-90)/180);
    const midA = startA + anglePer/2;
    const tx = cx + (r*0.62)*Math.cos(Math.PI*(midA-90)/180);
    const ty = cy + (r*0.62)*Math.sin(Math.PI*(midA-90)/180);
    html += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z" fill="${seg.color}" stroke="#fff" stroke-width="2"/>`;
    html += `<text x="${tx}" y="${ty}" fill="#fff" font-size="11" font-weight="700" font-family="Poppins, sans-serif"
      text-anchor="middle" transform="rotate(${midA},${tx},${ty})">${seg.label}</text>`;
  });
  html += `<circle cx="${cx}" cy="${cy}" r="14" fill="var(--ink)"/>`;
  svg.innerHTML = html;
}

document.getElementById('spinBtn').addEventListener('click', ()=>{
  if(wheelSpinning) return;
  wheelSpinning = true;
  const n = wheelSegments.length, anglePer = 360/n;
  const winnerIdx = Math.floor(Math.random()*n);
  const targetAngle = 360*5 + (360 - (winnerIdx*anglePer + anglePer/2));
  wheelRotation += targetAngle;
  const svg = document.getElementById('spinWheel');
  svg.style.transform = `rotate(${wheelRotation}deg)`;
  document.getElementById('wheelResult').textContent = '';
  setTimeout(()=>{
    document.getElementById('wheelResult').textContent = '🎉 ' + wheelSegments[winnerIdx].label + '!';
    wheelSpinning = false;
    fireConfetti();
  }, 3600);
});

/* ---------- QUIZ CIRCLE ---------- */
const quizData = [
  {q:'Nama lengkap Kevin di circle ini adalah...', opts:['Kevin Robby','Robby Kevin','Kevin Narul','Robby Novel'], correct:1},
  {q:'Makanan favorit Anas adalah...', opts:['Matcha Latte','Thai Tea','Mie Ayam & Es Teh','Mie Goreng'], correct:2},
  {q:'Tahun berapa circle ini pertama kali kenal?', opts:['2023','2024','2025','2026'], correct:1},
  {q:'Warna tema Nia di CircleVerse adalah...', opts:['Biru Neon','Oranye','Pink','Ungu'], correct:2},
  {q:'Keempat anggota circle ini satu jurusan, yaitu...', opts:['Desain Komunikasi Visual','Sastra Inggris','Teknik Informatika','Manajemen Olahraga'], correct:2},
];
let quizIdx = 0, quizScore = 0;

function renderQuiz(){
  if(quizIdx >= quizData.length){
    document.getElementById('quizProgress').textContent = 'Selesai!';
    document.getElementById('quizQ').textContent = `Skor kamu: ${quizScore} / ${quizData.length} 🎉`;
    document.getElementById('quizOpts').innerHTML = `<button class="btn-magnetic btn-primary magnetic" id="quizRestart" style="width:100%;">Main Lagi</button>`;
    document.getElementById('quizRestart').addEventListener('click', ()=>{ quizIdx=0; quizScore=0; renderQuiz(); });
    if(quizScore === quizData.length) fireConfetti();
    return;
  }
  const item = quizData[quizIdx];
  document.getElementById('quizProgress').textContent = `Soal ${quizIdx+1} / ${quizData.length}`;
  document.getElementById('quizQ').textContent = item.q;
  const optsEl = document.getElementById('quizOpts');
  optsEl.innerHTML = item.opts.map((o,i)=>`<button class="quiz-opt" data-i="${i}">${o}</button>`).join('');
  optsEl.querySelectorAll('.quiz-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      optsEl.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
      const i = parseInt(btn.dataset.i);
      if(i === item.correct){ btn.classList.add('correct'); quizScore++; }
      else {
        btn.classList.add('wrong');
        optsEl.children[item.correct].classList.add('correct');
      }
      setTimeout(()=>{ quizIdx++; renderQuiz(); }, 1100);
    });
  });
}
renderQuiz();

/* ---------- CONFETTI ---------- */
function fireConfetti(){
  const colors = ['#3D9DFF','#FF8A3D','#FF6FA5','#9B6BFF','#E0B84B'];
  for(let i=0;i<60;i++){
    const c = document.createElement('div');
    c.style.position='fixed'; c.style.top='-10px'; c.style.left = Math.random()*100+'vw';
    c.style.width='8px'; c.style.height='14px'; c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.zIndex='9500'; c.style.opacity='.9'; c.style.borderRadius='2px';
    document.body.appendChild(c);
    gsap.to(c, {
      y: window.innerHeight + 40, x: (Math.random()-0.5)*200, rotation: Math.random()*720,
      duration: 2 + Math.random()*1.5, ease:'power1.in', onComplete:()=>c.remove()
    });
  }
}

/* =====================================================
   GUESTBOOK
   ===================================================== */
let gbMessages = [
  {name:'Kevin', text:'Circle ini rumah kedua aku selama kuliah. Makasih buat semua momennya!', emoji:'❤️', time:'2 hari lalu', likes:4, liked:false},
  {name:'Nia', text:'Gak nyangka bakal selangkah lagi wisuda bareng kalian semua 🥹', emoji:'🥹', time:'1 hari lalu', likes:6, liked:false},
];
let selectedEmoji = '❤️';

function renderGuestbook(){
  const list = document.getElementById('gbList');
  list.innerHTML = gbMessages.map((m,i)=>`
    <div class="gb-msg">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="gb-name">${m.name} ${m.emoji}</span>
        <span class="gb-time">${m.time}</span>
      </div>
      <p class="gb-text">${m.text}</p>
      <button class="gb-like ${m.liked?'liked':''}" data-i="${i}"><i class="fa-solid fa-heart"></i> ${m.likes}</button>
    </div>
  `).join('');
  list.querySelectorAll('.gb-like').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const i = parseInt(btn.dataset.i);
      gbMessages[i].liked = !gbMessages[i].liked;
      gbMessages[i].likes += gbMessages[i].liked ? 1 : -1;
      renderGuestbook();
    });
  });
}
renderGuestbook();

document.querySelectorAll('.gb-emoji').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.gb-emoji').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedEmoji = btn.dataset.emoji;
  });
});
document.querySelector('.gb-emoji').classList.add('selected');

document.getElementById('gbSubmit').addEventListener('click', ()=>{
  const name = document.getElementById('gbName').value.trim();
  const text = document.getElementById('gbText').value.trim();
  if(!name || !text){
    gsap.fromTo('.gb-form', {x:-8}, {x:0, duration:.4, ease:'elastic.out(1,0.3)'});
    return;
  }
  gbMessages.unshift({name, text, emoji:selectedEmoji, time:'Baru saja', likes:0, liked:false});
  renderGuestbook();
  document.getElementById('gbName').value='';
  document.getElementById('gbText').value='';
  gsap.from('.gb-msg', {opacity:0, y:-20, duration:.5});
});

/* =====================================================
   MUSIC TOGGLE (visual only — tidak ada file audio eksternal sesuai batasan single-file)
   ===================================================== */
let musicPlaying = false;
document.getElementById('music-toggle').addEventListener('click', function(){
  musicPlaying = !musicPlaying;
  const icon = document.getElementById('musicIcon');
  if(musicPlaying){
    icon.outerHTML = `<span class="eq-bars" id="musicIcon"><span></span><span></span><span></span></span>`;
  } else {
    document.getElementById('musicIcon').outerHTML = `<i class="fa-solid fa-play" id="musicIcon"></i>`;
  }
});

/* Init scroll spy on load */
scrollSpy();