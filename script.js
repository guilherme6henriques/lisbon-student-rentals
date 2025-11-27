/* ===========================================================
   script.js — full logic: map, language toggle, image loading
=========================================================== */
const app = document.getElementById("app");
const langBtns = document.querySelectorAll(".lang-btn");
let lang = "en";

langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lang = btn.id === "lang-pt" ? "pt" : "en";
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

// helper: build image paths from naming scheme
function getImagePaths(prefix, count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(`Images/${prefix}${i}F.jpg`);
  }
  return arr;
}

// Data structure for your two buildings, floors, rooms, and photo counts
const data = {
  "avenida_de_roma": {
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    coords: [38.74651115662008, -9.143217726509699],
    floors: [
      {
        number: 1,
        priceRange: [700, 850],
        commonPhotos: getImagePaths("AR1AZC", 7),
        rooms: [
          { id: "2Q", code: "AR1A2Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR1A2Q1F.jpg`, photos: getImagePaths("AR1A2Q", 8),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "4Q", code: "AR1A4Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR1A4Q1F.jpg`, photos: getImagePaths("AR1A4Q", 3),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "5Q", code: "AR1A5Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR1A5Q1F.jpg`, photos: getImagePaths("AR1A5Q", 2),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      },
      {
        number: 2,
        priceRange: [650, 800],
        commonPhotos: getImagePaths("AR2AZC", 3),
        rooms: [
          { id: "3Q", code: "AR2A3Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR2A3Q1F.jpg`, photos: getImagePaths("AR2A3Q", 6),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "5Q", code: "AR2A5Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR2A5Q1F.jpg`, photos: getImagePaths("AR2A5Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      },
      {
        number: 3,
        priceRange: [600, 780],
        commonPhotos: getImagePaths("AR3AZC", 5),
        rooms: [
          { id: "2Q", code: "AR3A2Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR3A2Q1F.jpg`, photos: getImagePaths("AR3A2Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "3Q", code: "AR3A3Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AR3A3Q1F.jpg`, photos: getImagePaths("AR3A3Q", 6),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      }
    ]
  },
  "alcantara": {
    name: { en: "Alcântara", pt: "Alcântara" },
    coords: [38.70496170446613, -9.16909158174067],
    floors: [
      {
        number: 1,
        priceRange: [550, 750],
        commonPhotos: getImagePaths("AL1AZC", 7),
        rooms: [
          { id: "1Q", code: "AL1A1Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AL1A1Q1F.jpg`, photos: getImagePaths("AL1A1Q", 6),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "2Q", code: "AL1A2Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AL1A2Q1F.jpg`, photos: getImagePaths("AL1A2Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "3Q", code: "AL1A3Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AL1A3Q1F.jpg`, photos: getImagePaths("AL1A3Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "4Q", code: "AL1A4Q", name: { en: "", pt: "" }, price: null,
            thumb: `Images/AL1A4Q1F.jpg`, photos: getImagePaths("AL1A4Q", 5),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      }
    ]
  }
};

// Full university list, with consistent hex-colours
const uniLocations = [
  { id: "ist",       name: { en: "IST",       pt: "IST" },        coords: [38.7353,   -9.1367],        color: "#f1c40f" },
  { id: "nova_ims",  name: { en: "NOVA IMS",  pt: "NOVA IMS" },   coords: [38.732462, -9.159921],      color: "#e74c3c" },
  { id: "iseg",      name: { en: "ISEG",      pt: "ISEG" },       coords: [38.7099,   -9.1556],        color: "#2ecc71" },
  { id: "nova_sbe",  name: { en: "NOVA SBE",  pt: "NOVA SBE" },   coords: [38.678458, -9.325998],      color: "#8e44ad" },
  { id: "nova_law",  name: { en: "NOVA LAW",  pt: "NOVA LAW" },   coords: [38.732591, -9.160372],      color: "#3498db" },
  { id: "fcul",      name: { en: "FCUL",      pt: "FCUL" },       coords: [38.7563,   -9.1564],        color: "#f39c12" },
  { id: "iscte",     name: { en: "ISCTE-IUL", pt: "ISCTE-IUL" },  coords: [38.74889,  -9.15389],       color: "#1abc9c" },
  { id: "fmul",      name: { en: "FMUL",      pt: "FMUL" },       coords: [38.7463469531953, -9.161155141126354], color: "#e84393" },
  { id: "ucp_cat",   name: { en: "UCP",       pt: "UCP" },        coords: [38.74893443978093, -9.164949511475601], color: "#a04000" }
];

function distKm(a, b) {
  const R = 6371;
  const [lat1, lon1] = a.map(d => d * Math.PI / 180);
  const [lat2, lon2] = b.map(d => d * Math.PI / 180);
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const x = dLon * Math.cos((lat1 + lat2)/2);
  const y = dLat;
  return Math.sqrt(x*x + y*y) * R;
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

function render() {
  const h = location.hash.slice(1);
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return renderMap();
  if (parts[0] === "location") return renderFloors(parts[1]);
  if (parts[0] === "floor")    return renderFloor(parts[1], +parts[2]);
  if (parts[0] === "room")     return renderRoom(parts[1], +parts[2], parts[3]);
  renderMap();
}

function renderMap() {
  app.innerHTML = `
    <div class="map-caption-container">
      <div class="caption-box" id="caption-left">
        <h3>${lang === "en" ? "Near Alcântara" : "Perto de Alcântara"}</h3>
        <ul id="list-alcantara"></ul>
      </div>
      <div class="map-container"><div id="map"></div></div>
      <div class="caption-box" id="caption-right">
        <h3>${lang === "en" ? "Near Avenida de Roma" : "Perto da Avenida de Roma"}</h3>
        <ul id="list-roma"></ul>
      </div>
    </div>
  `;

  const map = L.map("map").setView([38.7369, -9.1427], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const rentalIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35]
  });

  uniLocations.forEach(uni => {
    // Add map circle marker
    L.circleMarker(uni.coords, {
      radius: 9,
      fillColor: uni.color,
      color: "#000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);

    // Add to side caption list
    const dA = distKm(uni.coords, data.alcantara.coords);
    const dR = distKm(uni.coords, data.avenida_de_roma.coords);
    const side = dA < dR ? "alcantara" : "roma";
    const listEl = document.getElementById(side === "roma" ? "list-roma" : "list-alcantara");
    const li = document.createElement("li");
    li.innerHTML = `<span class="dot" style="background: ${uni.color};"></span>${uni.name[lang]}`;
    listEl.appendChild(li);
  });

  // Rental property markers
  Object.entries(data).forEach(([key, loc]) => {
    const marker = L.marker(loc.coords, { icon: rentalIcon }).addTo(map);
    const popup = L.popup({ closeOnClick: false, autoClose: false, closeButton: false })
      .setContent(`
        <div class="popup-wrap" id="popup-${key}">
          <strong>${loc.name[lang]}</strong><br>
          <button class="popup-btn" onclick="location.hash='#/location/${key}'">
            ${lang === "en" ? "See rooms" : "Ver quartos"}
          </button>
        </div>
      `);

    let overMarker = false, overPopup = false;
    marker.on("mouseover", () => { overMarker = true; marker.openPopup(); });
    marker.on("mouseout", () => {
      overMarker = false;
      setTimeout(() => { if (!overMarker && !overPopup) marker.closePopup(); }, 200);
    });
    marker.on("popupopen", () => {
      const el = document.getElementById(`popup-${key}`);
      if (!el) return;
      el.addEventListener("mouseenter", () => overPopup = true);
      el.addEventListener("mouseleave", () => {
        overPopup = false;
        setTimeout(() => { if (!overMarker && !overPopup) marker.closePopup(); }, 200);
      });
    });

    marker.bindPopup(popup);
  });
}

function renderFloors(locKey) {
  const loc = data[locKey];
  if (!loc) return renderMap();
  if (loc.floors.length === 1) return renderFloor(locKey, loc.floors[0].number);

  let html = `<h2>${loc.name[lang]}</h2><div class="building">`;
  loc.floors.slice().reverse().forEach(f => {
    html += `
      <div class="floor" onclick="location.hash='#/floor/${locKey}/${f.number}'">
        <strong>${lang === "en" ? "Floor" : "Andar"} ${f.number}</strong>
        <p>€${f.priceRange[0]} - €${f.priceRange[1]}</p>
      </div>`;
  });
  html += `</div><a href="#/" class="back-link">← ${lang === "en" ? "Back to map" : "Voltar ao mapa"}</a>`;
  app.innerHTML = html;
}

function renderFloor(locKey, floorNum) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  if (!floor) return renderMap();

  let html = `<h2>${data[locKey].name[lang]} — ${lang === "en" ? "Floor" : "Andar"} ${floorNum}</h2>`;

  if (floor.commonPhotos && floor.commonPhotos.length) {
    html += `<div class="section-title">${lang === "en" ? "Common areas" : "Áreas comuns"}</div>`;
    floor.commonPhotos.forEach(src => {
      html += `<img src="${src}" class="common-photo">`;
    });
  }

  html += `<div class="section-title">${lang === "en" ? "Rooms" : "Quartos"}</div>`;
  html += `<div class="rooms-list">`;
  floor.rooms.slice().sort((a,b)=> (b.price||0) - (a.price||0)).forEach(room => {
    html += `
      <div class="room-card" onclick="location.hash='#/room/${locKey}/${floorNum}/${room.id}'">
        <img src="${room.thumb}" alt="">
        <div class="room-info">
          <h3>${room.name[lang] || ''}</h3>
          <p>${room.price ? '€' + room.price : ''}</p>
        </div>
      </div>`;
  });
  html += `</div>`;
  html += `<a href="#/location/${locKey}" class="back-link">← ${lang === "en" ? "Back to building" : "Voltar ao imóvel"}</a>`;
  app.innerHTML = html;
}

function renderRoom(locKey, floorNum, roomId) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  if (!floor) return renderMap();
  const room = floor.rooms.find(r => r.id === roomId);
  if (!room) return renderMap();

  let html = `<div class="room-detail">`;
  html += `<h2>${room.name[lang] || ''}${room.price ? ' — €' + room.price : ''}</h2>`;

  room.photos.forEach(src => {
    html += `<img src="${src}" alt="">`;
  });

  if (room.description && (room.description.en || room.description.pt)) {
    html += `<p>${room.description[lang] || ''}</p>`;
  }
  if (room.availableFrom) {
    html += `<p><strong>${lang === "en" ? "Available from:" : "Disponível a partir de:"}</strong> ${room.availableFrom}</p>`;
  }

  html += `</div>`;
  html += `<a href="#/floor/${locKey}/${floorNum}" class="back-link">← ${lang === "en" ? "Back to floor" : "Voltar ao andar"}</a>`;
  app.innerHTML = html;
}

