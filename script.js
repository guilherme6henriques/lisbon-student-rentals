const app = document.getElementById("app");
const langBtns = document.querySelectorAll(".lang-btn");
let lang = "en";

// Language switcher that persists wherever you are (doesn't reset page)
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const oldHash = location.hash;
    lang = btn.id === "lang-pt" ? "pt" : "en";
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    // re-render current route without resetting to map
    render();
  });
});

// Data (demo / placeholder) — rooms & universities
const data = {
  "avenida_de_roma": {
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    coords: [38.7436, -9.1354],
    floors: [
      { number: 1, priceRange: [700, 850], commonPhotos: ["images/placeholder1.jpg"], rooms: [ { id: "adr1_interior", name: { en: "Interior Room", pt: "Quarto Interior" }, price: 700, thumb: "images/placeholder2.jpg", photos: ["images/placeholder2.jpg"], description: { en: "Quiet interior room with shared amenities.", pt: "Quarto interior silencioso com comodidades partilhadas." }, availableFrom: "2026-02-01" } ] },
      { number: 2, priceRange: [650, 800], commonPhotos: ["images/placeholder3.jpg"], rooms: [ { id: "adr2_balcony", name: { en: "Balcony Room", pt: "Quarto com Varanda" }, price: 800, thumb: "images/placeholder4.jpg", photos: ["images/placeholder4.jpg"], description: { en: "Room with balcony, great view.", pt: "Quarto com varanda e vista agradável." }, availableFrom: "2026-03-01" } ] }
    ]
  },
  "alcantara": {
    name: { en: "Alcântara", pt: "Alcântara" },
    coords: [38.7038, -9.1783],
    floors: [
      { number: 1, priceRange: [600, 750], commonPhotos: ["images/placeholder4.jpg"], rooms: [ { id: "alc1_studio", name: { en: "Studio Room", pt: "Quarto Estúdio" }, price: 750, thumb: "images/placeholder2.jpg", photos: ["images/placeholder2.jpg"], description: { en: "Compact studio near public transport.", pt: "Estúdio compacto perto de transportes públicos." }, availableFrom: "2026-04-01" } ] }
    ]
  }
};

// Universities / landmarks
const uniLocations = [
  { id: "ist", name: { en: "Instituto Superior Técnico", pt: "Instituto Superior Técnico" }, coords: [38.7357, -9.1351] },
  { id: "fdul", name: { en: "Faculdade de Direito ULisboa", pt: "Faculdade de Direito ULisboa" }, coords: [38.7523, -9.1840] },
  // add more as needed
];

// Router & render
window.addEventListener("hashchange", render);
window.addEventListener("load", render);

function render() {
  const hash = location.hash.slice(1);
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) {
    renderMap();
  } else if (parts[0] === "location" && parts[1]) {
    renderFloors(parts[1]);
  } else if (parts[0] === "floor" && parts[1] && parts[2]) {
    renderFloor(parts[1], parseInt(parts[2], 10));
  } else if (parts[0] === "room" && parts[1] && parts[2] && parts[3]) {
    renderRoom(parts[1], parseInt(parts[2], 10), parts[3]);
  } else {
    renderMap();
  }
}

function renderMap() {
  app.innerHTML = `<div id="map"></div>`;
  const map = L.map("map").setView([38.7369, -9.1427], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add property locations (your rentals)
  Object.entries(data).forEach(([key, loc]) => {
    const m = L.marker(loc.coords).addTo(map);
    m.bindPopup(`<strong>${loc.name[lang]}</strong><br><button onclick="location.hash='#/location/${key}'">${lang === "en" ? "See rooms" : "Ver quartos"}</button>`);
    m.on("mouseover", () => m.openPopup());
    m.on("mouseout", () => m.closePopup());
  });

  // Add university / landmark pins with always-visible labels
  uniLocations.forEach(uni => {
    // Create a transparent or custom red icon — simpler: use default marker but bind permanent tooltip
    const marker = L.marker(uni.coords, {
      icon: L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
      })
    }).addTo(map);
    marker.bindTooltip(uni.name[lang], {
      permanent: true,
      direction: 'top',
      className: 'uni-label'
    });
  });
}

function renderFloors(locKey) {
  const loc = data[locKey];
  let html = `<h2>${loc.name[lang]}</h2>`;
  if (loc.floors.length === 1) {
    renderFloor(locKey, loc.floors[0].number);
    return;
  }
  html += `<div class="building">`;
  loc.floors.slice().reverse().forEach(f => {
    html += `
      <div class="floor" onclick="location.hash='#/floor/${locKey}/${f.number}'">
        <strong>${lang === "en" ? "Floor" : "Andar"} ${f.number}</strong>
        <p>€${f.priceRange[0]} - €${f.priceRange[1]}</p>
      </div>
    `;
  });
  html += `</div>`;
  html += `<a href="#/" class="back-link">← ${lang === "en" ? "Back to map" : "Voltar ao mapa"}</a>`;
  app.innerHTML = html;
}

function renderFloor(locKey, floorNum) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  let html = `<h2>${data[locKey].name[lang]} — ${lang === "en" ? "Floor" : "Andar"} ${floorNum}</h2>`;

  if (floor.commonPhotos && floor.commonPhotos.length) {
    html += `<div class="section-title">${lang === "en" ? "Common areas" : "Áreas comuns"}</div>`;
    floor.commonPhotos.forEach(src => {
      html += `<img src="${src}" class="common-photo">`;
    });
  }

  html += `<div class="section-title">${lang === "en" ? "Rooms" : "Quartos"}</div>`;
  html += `<div class="rooms-list">`;
  floor.rooms.slice().sort((a,b)=> b.price - a.price).forEach(room => {
    html += `
      <div class="room-card" onclick="location.hash='#/room/${locKey}/${floorNum}/${room.id}'">
        <img src="${room.thumb}" alt="${room.name[lang]}">
        <div class="room-info">
          <h3>${room.name[lang]}</h3>
          <p>€${room.price}</p>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  html += `<a href="#/location/${locKey}" class="back-link">← ${lang === "en" ? "Back to building" : "Voltar ao imóvel"}</a>`;
  app.innerHTML = html;
}

function renderRoom(locKey, floorNum, roomId) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  const room = floor.rooms.find(r => r.id === roomId);
  let html = `<div class="room-detail">`;
  html += `<h2>${room.name[lang]} — €${room.price}</h2>`;
  room.photos.forEach(src => {
    html += `<img src="${src}" alt="${room.name[lang]}">`;
  });
  html += `<p>${room.description[lang]}</p>`;
  html += `<p><strong>${lang === "en" ? "Available from:" : "Disponível a partir de:"}</strong> ${room.availableFrom}</p>`;
  html += `</div>`;
  html += `<a href="#/floor/${locKey}/${floorNum}" class="back-link">← ${lang === "en" ? "Back to floor" : "Voltar ao andar"}</a>`;
  app.innerHTML = html;
}

