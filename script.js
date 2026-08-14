/* ---------------- DATA ---------------- */
const CAT_COLORS = {
  meat: 'var(--c-meat)', dairy: 'var(--c-dairy)', grains: 'var(--c-grains)',
  legumes: 'var(--c-legumes)', veg: 'var(--c-veg)', other: 'var(--c-other)'
};
const CAT_LABELS = {
  meat: 'Meat', dairy: 'Dairy', grains: 'Grains', legumes: 'Legumes & nuts',
  veg: 'Vegetables & fruit', other: 'Other'
};

// approximate kg CO2e per typical serving
const FOODS = [
  { id:'rice', name:'Rice', image:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80', co2:0.5, cat:'grains' },
  { id:'butterchicken', name:'Butter Chicken', image:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80', co2:3.8, cat:'meat' },
  { id:'dal', name:'Dal (Lentils)', image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80', co2:0.3, cat:'legumes' },
  { id:'bhindi', name:'Bhindi Masala', image:'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80', co2:0.25, cat:'veg' },
  { id:'mushroom', name:'Mushroom', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80', co2:0.15, cat:'veg' },
  { id:'paneer', name:'Paneer', image:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80', co2:2.1, cat:'dairy' },
  { id:'beef', name:'Beef Curry', image:'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80', co2:6.2, cat:'meat' },
  { id:'lentils', name:'Lentils', image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', co2:0.3, cat:'legumes' },
  { id:'beans', name:'Beans', image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80', co2:0.4, cat:'legumes' },
  { id:'tofu', name:'Tofu', image:'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80', co2:0.35, cat:'legumes' },
  { id:'vegetables', name:'Mixed Vegetables', image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80', co2:0.3, cat:'veg' },
  { id:'chicken', name:'Chicken', image:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80', co2:2.4, cat:'meat' },
  { id:'milk', name:'Milk', image:'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80', co2:0.5, cat:'dairy' },
  { id:'bread', name:'Bread', image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80', co2:0.3, cat:'grains' },
  { id:'egg', name:'Egg', image:'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80', co2:0.4, cat:'other' },
];

const COUNTRIES = [
  { name:'Australia', animal:84, plant:16 },
  { name:'United States', animal:71, plant:29 },
  { name:'Canada', animal:64, plant:36 },
  { name:'United Kingdom', animal:63, plant:37 },
  { name:'France', animal:60, plant:40 },
  { name:'Germany', animal:62, plant:38 },
  { name:'Brazil', animal:54, plant:46 },
  { name:'South Africa', animal:41, plant:59 },
  { name:'China', animal:35, plant:65 },
  { name:'India', animal:24, plant:76 },
  { name:'Japan', animal:31, plant:69 },
  { name:'Indonesia', animal:12, plant:88 },
];

const MAP_COUNTRIES = [
  { name:'United States', id:840, animal:71, plant:29 },
  { name:'Canada', id:124, animal:64, plant:36 },
  { name:'Brazil', id:76, animal:54, plant:46 },
  { name:'United Kingdom', id:826, animal:63, plant:37 },
  { name:'France', id:250, animal:60, plant:40 },
  { name:'Germany', id:276, animal:62, plant:38 },
  { name:'South Africa', id:710, animal:41, plant:59 },
  { name:'India', id:356, animal:24, plant:76 },
  { name:'China', id:156, animal:35, plant:65 },
  { name:'Japan', id:392, animal:31, plant:69 },
  { name:'Indonesia', id:360, animal:12, plant:88 },
  { name:'Australia', id:36, animal:84, plant:16 },
];

const MAP_COLORS = {
  animal: ['#E9E1D3', '#E6C38A', '#D79D4A', '#BE6E2D', '#8B3E1D'],
  plant: ['#E4F1EA', '#BFE2D0', '#90C8A7', '#4FA57F', '#2B6C4F']
};
const MAP_NODATA_COLOR = '#E7E0D2';

const MAP_INSIGHTS = {
  animal: `The deepest browns cluster over North America, Europe and Australia — wealthier, meat-heavy diets where more
    than six in ten dietary emissions come from animal foods. The lightest tones sit across South and Southeast
    Asia, where plant staples still carry most of the plate. Income and agricultural tradition, not a single
    "bad" food, explain most of the map.`,
  plant: `Flip the view and the pattern flips with it: Indonesia and India lead the deep-green end, where plant-based
    foods dominate both diet and emissions, while the same high-income nations that topped the animal view now
    sit at the pale end. "Eat less meat" is already the norm in large parts of the world — it's a shift mostly
    being asked of the countries currently furthest from it.`
};

function getMapColor(value, mode){
  const palette = MAP_COLORS[mode];
  const idx = Math.min(palette.length - 1, Math.max(0, Math.floor((value / 100) * (palette.length - 1))));
  return palette[idx];
}

/* ---------------- PLATE RENDERER ---------------- */
function renderPlateItems(container, items){
  if(!container) return;
  if(!items.length){
    container.innerHTML = '';
    return;
  }

  const maxItems = 6;
  const visibleItems = items.slice(-maxItems);
  const arcStart = -90;

  container.innerHTML = visibleItems.map((item, index) => {
    const total = visibleItems.length;
    const angle = arcStart + (360 / Math.max(total, 1)) * index;
    const radius = total === 1 ? 0 : total >= 4 ? 68 : 82;
    const radians = angle * Math.PI / 180;
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;

    return `
      <div class="plate-food" style="--x:${x}px; --y:${y}px; background-image:url('${item.image}')" title="${item.name}">
        <span class="plate-food-label">${item.name}</span>
      </div>
    `;
  }).join('');
}

function renderPlate(ringEl, numEl, legendEl, items, foodsEl){
  const totals = {};
  let grandTotal = 0;

  items.forEach(it=>{
    totals[it.cat] = (totals[it.cat]||0) + it.co2;
    grandTotal += it.co2;
  });

  numEl.textContent = grandTotal.toFixed(1);
  renderPlateItems(foodsEl, items);

  if(grandTotal === 0){
    ringEl.style.background = 'var(--soil-2)';
    legendEl.innerHTML = '<span class="item" style="opacity:.5">Add a dish to fill the plate</span>';
    return;
  }

  let acc = 0;
  const stops = [];
  Object.keys(totals).forEach(cat=>{
    const pct = totals[cat]/grandTotal*100;
    stops.push(`${CAT_COLORS[cat]} ${acc}% ${acc+pct}%`);
    acc += pct;
  });
  ringEl.style.background = `conic-gradient(${stops.join(',')})`;

  legendEl.innerHTML = Object.keys(totals).map(cat=>{
    const pct = Math.round(totals[cat]/grandTotal*100);
    return `<span class="item"><span class="dot" style="background:${CAT_COLORS[cat]}"></span>${CAT_LABELS[cat]} · ${pct}%</span>`;
  }).join('');
}

/* ---------------- SECTION 1: BUILD YOUR MEAL ---------------- */
const foodGrid = document.getElementById('foodGrid');
const foodSearch = document.getElementById('foodSearch');
const mealTray = document.getElementById('mealTray');
let myMeal = [];

function drawFoodGrid(filter=''){
  const f = filter.trim().toLowerCase();
  const list = FOODS.filter(x=>x.name.toLowerCase().includes(f));
  foodGrid.innerHTML = list.map(x=>
    `<button class="food-chip" data-id="${x.id}">
      <img class="food-image" src="${x.image}" alt="${x.name}" loading="lazy">
      <span class="fname">${x.name}</span>
      <span class="fco2">${x.co2.toFixed(2)} kg CO₂e</span>
    </button>`
  ).join('') || '<span style="color:var(--paper-dim); font-size:13px;">No dishes match.</span>';
}
drawFoodGrid();

foodSearch.addEventListener('input', e=> drawFoodGrid(e.target.value));

foodGrid.addEventListener('click', e=>{
  const btn = e.target.closest('.food-chip');
  if(!btn) return;
  const food = FOODS.find(x=>x.id===btn.dataset.id);
  myMeal.push({...food, uid: Date.now()+Math.random()});
  updateMealTray();
});

function updateMealImpactSummary(){
  const impactValue = document.getElementById('impactValue');
  const impactMeta = document.getElementById('impactMeta');
  const impactRankings = document.getElementById('impactRankings');

  if(!myMeal.length || !impactValue || !impactMeta || !impactRankings){
    if(impactValue) impactValue.textContent = 'Add dishes to your plate';
    if(impactMeta) impactMeta.textContent = 'Your biggest emissions driver will appear here.';
    if(impactRankings) impactRankings.innerHTML = '';
    return;
  }

  const ranked = [...myMeal]
    .map(item => ({ ...item, co2: Number(item.co2) }))
    .sort((a, b) => b.co2 - a.co2);

  const highest = ranked[0];
  const total = myMeal.reduce((sum, item) => sum + item.co2, 0);
  const share = total > 0 ? ((highest.co2 / total) * 100).toFixed(0) : 0;

  impactValue.textContent = `${highest.name} · ${highest.co2.toFixed(1)} kg CO₂e`;
  impactMeta.textContent = `${share}% of your plate's emissions comes from this dish.`;

  impactRankings.innerHTML = ranked.map((item, index) => {
    const isTop = index === 0;
    return `
      <div class="impact-row ${isTop ? 'highlighted' : ''}">
        <div class="left">
          <span class="impact-rank">${index + 1}</span>
          <span class="impact-name">${item.name}</span>
        </div>
        <span class="impact-score">${item.co2.toFixed(1)} kg</span>
      </div>
    `;
  }).join('');
}

function updateMealTray(){
  if(myMeal.length===0){
    mealTray.innerHTML = '<span class="empty-msg">Nothing yet — add a dish above.</span>';
  } else {
    mealTray.innerHTML = myMeal.map(it=>
      `<span class="tag">
        <img class="tag-image" src="${it.image}" alt="${it.name}" loading="lazy">
        <span class="tag-name">${it.name}</span>
        <button data-uid="${it.uid}">✕</button>
      </span>`
    ).join('');
  }
  renderPlate(
    document.getElementById('plateRing1'),
    document.getElementById('plateNum1'),
    document.getElementById('plateLegend1'),
    myMeal,
    document.getElementById('plateFoods1')
  );
  updateMealImpactSummary();
}
mealTray.addEventListener('click', e=>{
  const btn = e.target.closest('button[data-uid]');
  if(!btn) return;
  myMeal = myMeal.filter(x=> String(x.uid) !== btn.dataset.uid);
  updateMealTray();
});
updateMealTray();

/* ---------------- SECTION 2: COUNTRIES ---------------- */
const countryList = document.getElementById('countryList');
countryList.innerHTML = COUNTRIES.map(c => {
  const animalShare = Number(c.animal ?? 0);
  const plantShare = Number(c.plant ?? 100 - animalShare);
  return `
    <div class="country-row">
      <div class="clabel">
        <span class="cname">${c.name}</span>
        <span class="cdetail">${animalShare}% animal-based · ${plantShare}% plant-based</span>
      </div>
      <div class="split-bar" aria-label="${c.name} dietary emissions split">
        <div class="animal" style="width:${animalShare}%"></div>
        <div class="plant" style="width:${plantShare}%"></div>
      </div>
    </div>
  `;
}).join('');

/* ---------------- SECTION 5: CHANGE ONE INGREDIENT ---------------- */
const baseMeal = [
  { name:'Rice', emoji:'🍚', co2:0.5, cat:'grains' },
  { name:'Chicken', emoji:'🍗', co2:2.4, cat:'meat' },
  { name:'Vegetables', emoji:'🥕', co2:0.3, cat:'veg' },
  { name:'Sauce', emoji:'🥣', co2:0.2, cat:'other' },
];
const alternatives = {
  lentils: { name:'Lentils', emoji:'🫘', co2:0.3, cat:'legumes' },
  beans:   { name:'Beans',   emoji:'🫛', co2:0.4, cat:'legumes' },
  tofu:    { name:'Tofu',    emoji:'🧊', co2:0.35, cat:'legumes' },
};

const ring2 = document.getElementById('plateRing2');
const num2 = document.getElementById('plateNum2');
const legend2 = document.getElementById('plateLegend2');
renderPlate(ring2, num2, legend2, baseMeal, document.getElementById('plateFoods2'));

const swapTarget = document.getElementById('swapTarget');
const swapOptions = document.getElementById('swapOptions');
const beforeAfter = document.getElementById('beforeAfter');
const insightBox = document.getElementById('insightBox');
const baBefore = document.getElementById('baBefore');
const baAfter = document.getElementById('baAfter');
const baDelta = document.getElementById('baDelta');

const beforeTotal = baseMeal.reduce((s,x)=>s+x.co2,0);

swapTarget.addEventListener('click', ()=>{
  swapTarget.classList.add('chosen');
  swapOptions.style.display = 'flex';
});

swapOptions.addEventListener('click', e=>{
  const btn = e.target.closest('button[data-alt]');
  if(!btn) return;
  [...swapOptions.children].forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');

  const alt = alternatives[btn.dataset.alt];
  const newMeal = baseMeal.filter(x=>x.name!=='Chicken').concat([alt]);
  const afterTotal = newMeal.reduce((s,x)=>s+x.co2,0);
  const pctChange = Math.round((1 - afterTotal/beforeTotal)*100);

  renderPlate(ring2, num2, legend2, newMeal, document.getElementById('plateFoods2'));

  baBefore.textContent = `${beforeTotal.toFixed(1)} kg`;
  baAfter.textContent = `${afterTotal.toFixed(1)} kg`;
  baDelta.textContent = `↓ ${pctChange}%`;
  beforeAfter.style.display = 'flex';
  insightBox.style.display = 'block';
  insightBox.classList.add('in-view');
});

/* ---------------- SCROLL REVEAL ---------------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting) en.target.classList.add('in-view');
  });
}, { threshold: 0.15 });
let worldGeoPromise = null;
function loadWorldGeo(){
  if(!worldGeoPromise){
    worldGeoPromise = fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(topo => {
        const geo = topojson.feature(topo, topo.objects.countries);
        geo.features = geo.features.filter(f => f.id !== '010'); // drop Antarctica
        return geo;
      });
  }
  return worldGeoPromise;
}

function renderMapLegend(view){
  const legend = document.getElementById('mapLegend');
  if(!legend) return;
  const palette = MAP_COLORS[view];
  const title = view === 'animal'
    ? 'Share of dietary emissions from animal-based foods'
    : 'Share of dietary emissions from plant-based foods';
  const swatches = palette.map(c => `<span style="background:${c}"></span>`).join('');
  legend.innerHTML = `
    <div class="map-legend-title">${title}</div>
    <div class="map-legend-row">
      <span class="map-legend-caption">Low</span>
      <div class="map-legend-scale">${swatches}</div>
      <span class="map-legend-caption">High</span>
      <span class="map-legend-nodata"><span class="map-legend-swatch" style="background:${MAP_NODATA_COLOR}"></span>No data</span>
    </div>
  `;
}

function renderMapInsight(view){
  const el = document.getElementById('mapInsight');
  if(!el) return;
  el.innerHTML = `<p>${MAP_INSIGHTS[view]}</p>`;
}

async function renderWorldMap(view = 'animal'){
  const svg = document.getElementById('worldMapSvg');
  if(!svg) return;

  renderMapLegend(view);
  renderMapInsight(view);

  const width = 1000, height = 470, margin = 12;
  let geo;
  try{
    geo = await loadWorldGeo();
  }catch(err){
    svg.innerHTML = `<text x="500" y="235" text-anchor="middle" class="map-country-label">Map data unavailable — check your connection.</text>`;
    return;
  }

  const projection = d3.geoNaturalEarth1().fitSize([width - margin * 2, height - margin * 2], geo);
  const path = d3.geoPath(projection);
  const dataByCountry = new Map(MAP_COUNTRIES.map(c => [Number(c.id), c]));

  const countryPaths = geo.features.map(feature => {
    const match = dataByCountry.get(Number(feature.id));
    const value = match ? (view === 'animal' ? match.animal : match.plant) : null;
    const fill = value !== null ? getMapColor(value, view) : MAP_NODATA_COLOR;
    const name = match ? match.name : ((feature.properties && feature.properties.name) || 'Unknown');
    return `<path d="${path(feature)}" class="map-country-path" fill="${fill}"
      data-name="${name}" data-value="${value === null ? '' : value}" />`;
  }).join('');

  const labels = MAP_COUNTRIES.map(country => {
    const feature = geo.features.find(f => Number(f.id) === Number(country.id));
    if(!feature) return '';
    const [cx, cy] = path.centroid(feature);
    if(Number.isNaN(cx) || Number.isNaN(cy)) return '';
    return `<text x="${cx + 10}" y="${cy + 4}" class="map-country-label">${country.name}</text>`;
  }).join('');

  svg.innerHTML = `<g transform="translate(${margin},${margin})">${countryPaths}${labels}</g>`;

  const tooltip = document.getElementById('mapTooltip');
  const label = view === 'animal' ? 'animal-based share' : 'plant-based share';
  svg.querySelectorAll('.map-country-path').forEach(el => {
    const name = el.dataset.name;
    const value = el.dataset.value;

    const showTooltip = event => {
      tooltip.hidden = false;
      tooltip.innerHTML = value === ''
        ? `<strong>${name}</strong><br>No data`
        : `<strong>${name}</strong><br>${value}% ${label}`;
      const cardRect = event.currentTarget.ownerSVGElement.getBoundingClientRect();
      const x = event.clientX - cardRect.left;
      const y = event.clientY - cardRect.top;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    };

    const hideTooltip = () => {
      tooltip.hidden = true;
    };

    el.addEventListener('pointermove', showTooltip);
    el.addEventListener('pointerleave', hideTooltip);
  });
}

const mapButtons = document.querySelectorAll('.map-view-btn');
let activeMapView = 'animal';

mapButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeMapView = button.dataset.view;
    mapButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    renderWorldMap(activeMapView);
  });
});

renderWorldMap(activeMapView);

document.querySelectorAll('.fade').forEach(el=> io.observe(el));
