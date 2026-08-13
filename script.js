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
  { id:'rice', name:'Rice', emoji:'🍚', co2:0.5, cat:'grains' },
  { id:'butterchicken', name:'Butter Chicken', emoji:'🍗', co2:3.8, cat:'meat' },
  { id:'dal', name:'Dal (Lentils)', emoji:'🥣', co2:0.3, cat:'legumes' },
  { id:'bhindi', name:'Bhindi Masala', emoji:'🥗', co2:0.25, cat:'veg' },
  { id:'mushroom', name:'Mushroom', emoji:'🍄', co2:0.15, cat:'veg' },
  { id:'paneer', name:'Paneer', emoji:'🧀', co2:2.1, cat:'dairy' },
  { id:'beef', name:'Beef Curry', emoji:'🥩', co2:6.2, cat:'meat' },
  { id:'lentils', name:'Lentils', emoji:'🫘', co2:0.3, cat:'legumes' },
  { id:'beans', name:'Beans', emoji:'🫛', co2:0.4, cat:'legumes' },
  { id:'tofu', name:'Tofu', emoji:'🧊', co2:0.35, cat:'legumes' },
  { id:'vegetables', name:'Mixed Vegetables', emoji:'🥕', co2:0.3, cat:'veg' },
  { id:'chicken', name:'Chicken', emoji:'🍗', co2:2.4, cat:'meat' },
  { id:'milk', name:'Milk', emoji:'🥛', co2:0.5, cat:'dairy' },
  { id:'bread', name:'Bread', emoji:'🍞', co2:0.3, cat:'grains' },
  { id:'egg', name:'Egg', emoji:'🥚', co2:0.4, cat:'other' },
];

const COUNTRIES = [
  { name:'Australia', animal:84 },
  { name:'United States', animal:71 },
  { name:'Southeast Asia', animal:27 },
  { name:'Indonesia', animal:8 },
];

/* ---------------- PLATE RENDERER ---------------- */
function renderPlate(ringEl, numEl, legendEl, items){
  const totals = {};
  let grandTotal = 0;
  items.forEach(it=>{
    totals[it.cat] = (totals[it.cat]||0) + it.co2;
    grandTotal += it.co2;
  });

  numEl.textContent = grandTotal.toFixed(1);

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
      <span class="fname">${x.emoji} ${x.name}</span>
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

function updateMealTray(){
  if(myMeal.length===0){
    mealTray.innerHTML = '<span class="empty-msg">Nothing yet — add a dish above.</span>';
  } else {
    mealTray.innerHTML = myMeal.map(it=>
      `<span class="tag">${it.emoji} ${it.name} <button data-uid="${it.uid}">✕</button></span>`
    ).join('');
  }
  renderPlate(
    document.getElementById('plateRing1'),
    document.getElementById('plateNum1'),
    document.getElementById('plateLegend1'),
    myMeal
  );
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
countryList.innerHTML = COUNTRIES.map(c=>`
  <div class="country-row">
    <div class="clabel">
      <span class="cname">${c.name}</span>
      <span class="cdetail">${c.animal}% animal-based · ${100-c.animal}% plant-based</span>
    </div>
    <div class="split-bar">
      <div class="animal" style="width:${c.animal}%"></div>
      <div class="plant" style="width:${100-c.animal}%"></div>
    </div>
  </div>
`).join('');

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
renderPlate(ring2, num2, legend2, baseMeal);

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

  renderPlate(ring2, num2, legend2, newMeal);

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
document.querySelectorAll('.fade').forEach(el=> io.observe(el));
