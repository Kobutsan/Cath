/* =========================================================
   100-vh iOS fix
   ========================================================= */
function updateVh () {
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
}
updateVh();
window.addEventListener('resize', updateVh);

/* =========================================================
   Burger
   ========================================================= */
const nav    = document.querySelector('.nav');
const burger = document.querySelector('.burger');

burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

/* =========================================================
   HOTSPOTS – section RESULTS
   ========================================================= */
const graphCfg = [
  { img:'graph0.jpg',
    title:'Discover how Nova-X protect you',
    desc :'Initial clinical evaluation (Nova-X closed, no aprons).' },
  { img:'graph1.jpg',
    title:'Operator 1',
    desc :'Nova-X deployed • Staff without aprons.' },
  { img:'graph2.jpg',
    title:'Operator 2',
    desc :'Real-time Dosicath® monitoring (procedure XYZ).' },
  { img:'graph3.jpg',
    title:'Operator 3',
    desc :'Open positions – comparison over 25 cases.' }
];

const resHotspots = document.querySelectorAll('.results .Hotspot');
if (resHotspots.length){
  const layer  = document.querySelector('.graph-layer');
  const img    = layer.querySelector('.graph-img');
  const title  = layer.querySelector('.graph-title');
  const desc   = layer.querySelector('.graph-desc');

  /* helper pour changer la vue -------------------------------- */
  const showGraph = idx => {
    const g = graphCfg[idx];
    img.src         = `images/${g.img}`;
    img.alt         = g.title;
    title.textContent = g.title;
    desc.textContent  = g.desc;
    layer.classList.add('show-graph');          // animation
  };

  /* --- état initial (index 0) --- */
  showGraph(0);

  /* --- interaction hotspots --- */
  resHotspots.forEach(btn=>{
    const core  = btn.querySelector('.Hotspot__core');
    const idx   = +btn.dataset.graph;           // 1-3

    core.addEventListener('click',()=>{
      const isActive = !btn.classList.contains('is-active');

      /* reset tous les boutons */
      resHotspots.forEach(b=>{
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed','false');
      });

      /* si on active */
      if (isActive){
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed','true');
        showGraph(idx);                         // 1,2,3
      } else {
        /* si on désactive ⇒ on revient au graph 0 */
        showGraph(0);
      }
    });
  });
}


/* =========================================================
   HOTSPOTS – section ALT
   ========================================================= */
document.querySelectorAll('.alt-block').forEach(block => {

  const buttons = block.querySelectorAll('.Hotspot');
  const panels  = block.querySelectorAll('.alt-reveal');

  buttons.forEach(btn => {
    const core = btn.querySelector('.Hotspot__core');
    const id   = btn.dataset.hs;                 // 1,2,3…

    core.addEventListener('click', () => {

      const willOpen = !btn.classList.contains('is-active');

      /* ── reset complet du bloc ─────────────────────────── */
      buttons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed','false');
      });
      panels.forEach(p => p.classList.remove('is-show'));
      block.classList.remove('show-graph');

      /* ── ouverture éventuelle ───────────────────────────── */
      if (willOpen){
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed','true');

        const panel = block.querySelector(`.alt-reveal[data-reveal="${id}"]`);
        if (panel){
          panel.classList.add('is-show');   // <- donne opacity:1 + display:flex
          block.classList.add('show-graph');/* cache alt-text via CSS           */
        }
      }
    });
  });
});

/* =========================================================
   Testimonials – navigation
   ========================================================= */
const view = document.querySelector('.testi-window');
if (view){
  const track = view.querySelector('.testi-track');
  const cards = [...track.children];
  const dots  = [...document.querySelectorAll('.testi-dots .dot')];

  const goTo = idx => {
    const offset = cards[idx].offsetLeft;
    track.style.transform = `translateX(-${offset}px)`;
    dots.forEach(d=>d.classList.toggle('is-active', +d.dataset.index===idx));
  };

  dots.forEach(d=>d.addEventListener('click', ()=>goTo(+d.dataset.index)));
  window.addEventListener('load',   ()=>goTo(0));
  window.addEventListener('resize', ()=>{
    const active = dots.findIndex(d=>d.classList.contains('is-active'));
    goTo(active>=0 ? active : 0);
  });
}

/* =========================================================
   STORY – “Read more” toggle
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.querySelector('.story-toggle');
  const story = document.querySelector('.story');

  if (btn && story){
    btn.addEventListener('click', () => {
      const open = story.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
      btn.innerHTML = open ? 'Show less&nbsp;▲' : 'Read more&nbsp;▼';
    });
  }
});

/* =========================================================
   CONTACT – champ “Other” conditionnel
   ========================================================= */
const chkOther   = document.getElementById('chk-other');
const otherField = document.getElementById('other-field');
const otherInput = document.getElementById('role-other');

if (chkOther){
  chkOther.addEventListener('change', () => {
    const on = chkOther.checked;
    otherField.classList.toggle('is-hidden', !on);
    if (otherInput) otherInput.required = on;
  });
}
