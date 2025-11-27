const app = document.getElementById("app");
const langBtns = document.querySelectorAll(".lang-btn");
let lang = "en";

/* ========== LANGUAGE SWITCHER (does not reset page) ========== */
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lang = btn.id === "lang-pt" ? "pt" : "en";
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

/* ========== DATA ========== */
const data = {
  "avenida_de_roma": {
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    coords: [38.74651115662008, -9.143217726509699],
    floors: [
      {
        number: 1,
        priceRange: [700, 850],
        commonPhotos: ["images/placeholder1.jpg"],
        rooms: [
          {
            id: "adr1_interior",
            name: { en: "Interior Room", pt: "Quarto Interior" },
            price: 700,
            thumb: "images/placeholder2.jpg",
            photos: ["images/placeholder2.jpg"],
            description: {
              en: "Quiet interior room with shared amenities.",
              pt: "Quarto interior silencioso com comodidades partilhadas."
            },
            availableFrom: "2026-02-01"
          }
        ]
      },
      {
        number: 2,
        priceRange: [650, 800],
        commonPhotos: ["images/placeholder3.jpg"],
        rooms: [
          {
            id: "adr2_balcony",
            name: { en: "Balcony Room", pt: "Quarto com Varanda" },
            price: 800,
            thumb: "images/placeholder4.jpg",
            photos: ["images/placeholder4.jpg"],
            description: {
              en: "Room with balcony and great view.",
              pt: "Quarto com varanda e ótima vista."
            },
            availableFrom: "2026-03-01"
          }
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
        priceRange: [600, 750],
        commonPhotos: ["images/placeholder4.jpg"],
        rooms: [
          {
            id: "alc1_studio",
            name: { en: "Studio Room", pt: "Quarto Estúdio" },
            price: 750,
            thumb: "images/placeholder2.jpg",
            photos: ["images/placeholder2.jpg"],
            description: {
              en: "Compact studio near public transport.",
              pt: "Estúdio compacto perto de transportes."
            },
            availableFrom: "2026-04-01"
          }
        ]
      }
    ]
  }
};

/* ========== UNIVERSITIES ========== */
const uniLocations = [
  {
    id: "ist",
    name: { en: "Instituto Superior Técnico", pt: "Instituto Superior Técnico" },
    coords: [38.736197, -9.138794]
  },
  {
    id: "fdul",
    name: { en: "Faculdade de Direito ULisboa", pt: "Faculdade de Direito ULisboa" },
    coords: [38.72725679, -9.150371]
  }
];

/* ========== ROUTER ========== */
window.addEventListener("hashchange", render);
window.addEventListener("load", render);

function render() {
  const hash = location.hash.slice(1);
  const p = hash.split("/").filter(Boolean);

  if (p.length === 0) return renderMap();
  if (p[0] === "location") return renderFloors(p[1]);
  if (p[0] === "floor") return renderFloor(p[1], +p[2]);
  if (p[0] === "room") return renderRoom(p[1], +p[2], p[3]);

  renderMap();
}

/* ============================================================
   ===============  RENDER MAP WITH POPUPS  ====================
   ============================================================ */
function renderMap() {
  app.innerHTML = `<div id="map"></div>`;

  const map = L.map("map").setView([38.7369, -9.1427], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const rentalIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [0, -35]
  });

  const redIcon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-red.png",
    iconSize: [25,41],
    iconAnchor: [12,41]
  });

  /* --- RENTAL MARKERS WITH STICKY POPUPS --- */
  Object.entries(data).forEach(([key, loc]) => {
    const marker = L.marker(loc.coords, { icon: rentalIcon }).addTo(map);

    const popup = L.popup({
      closeOnClick: false,
      autoClose: false,
      closeButton: false
    }).setContent(`
      <div class="popup-wrap" id="popup-${key}">
        <strong>${loc.name[lang]}</strong><br>
        <button class="popup-btn" onclick="location.hash='#/location/${key}'">
          ${lang === "en" ? "See rooms" : "Ver quartos"}
        </button>
      </div>
    `);

    let overMarker = false;
    let overPopup = false;

    marker.on("mouseover", () => {
      overMarker = true;
      marker.openPopup();
    });

    marker.on("mouseout", () => {
      overMarker = false;
      setTimeout(() => {
        if (!overMarker && !overPopup) marker.closePopup();
      }, 200);
    });

    marker.on("popupopen", () => {
      const popupEl = document.querySelector(`#popup-${key}`);
      if (!popupEl) return;

      popupEl.addEventListener("mouseenter", () => {
        overPopup = true;
      });

      popupEl.addEventListener("mouseleave", () => {
        overPopup = false;
        setTimeout(() => {
          if (!overMarker && !overPopup) marker.closePopup();
        }, 200);
      });
    });

    marker.bindPopup(popup);
  });

  /* --- UNIVERSITY MARKERS WITH LABELS --- */
  uniLocations.forEach(uni => {
    const m = L.marker(uni.coords, { icon: redIcon }).addTo(map);
    m.bindTooltip(uni.name[lang], {
      permanent: true,
      direction: "top",
      className: "uni-label"
    });
  });
}

/* ========== FLOORS PAGE ========== */
function renderFloors(locKey) {
  const loc = data[locKey];

  if (loc.floors.length === 1) return renderFloor(locKey, loc.floors[0].number);

  let html = `<h2>${loc.name[lang]}</h2>`;

  html += `<div class="building">`;
  loc.floors.slice().reverse().forEach(f => {
    html += `
      <div class="floor" onclick="location.hash='#/floor/${locKey}/${f.number}'">
        <strong>${lang === "en" ? "Floor" : "Andar"} ${f.number}</strong>
        <p>€${f.priceRange[0]} - €${f.priceRange[1]}</p>
      </div>`;
  });
  html += `</div>`;

  html += `<a href="#/" class="back-link">← ${lang === "en" ? "Back to map" : "Voltar ao mapa"}</a>`;

  app.innerHTML = html;
}

/* ========== FLOOR PAGE ========== */
function renderFloor(locKey, floorNum) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);

  let html = `<h2>${data[locKey].name[lang]} — ${lang === "en" ? "Floor" : "Andar"} ${floorNum}</h2>`;

  html += `<div class="section-title">${lang === "en" ? "Common areas" : "Áreas comuns"}</div>`;
  floor.commonPhotos.forEach(src => {
    html += `<img src="${src}" class="common-photo">`;
  });

  html += `<div class="section-title">${lang === "en" ? "Rooms" : "Quartos"}</div>`;
  html += `<div class="rooms-list">`;

  floor.rooms.sort((a,b)=>b.price - a.price).forEach(room => {
    html += `
      <div class="room-card" onclick="location.hash='#/room/${locKey}/${floorNum}/${room.id}'">
        <img src="${room.thumb}">
        <div class="room-info">
          <h3>${room.name[lang]}</h3>
          <p>€${room.price}</p>
        </div>
      </div>`;
  });

  html += `</div>`;
  html += `<a href="#/location/${locKey}" class="back-link">← ${lang === "en" ? "Back to building" : "Voltar ao imóvel"}</a>`;

  app.innerHTML = html;
}

/* ========== ROOM PAGE ========== */
function renderRoom(locKey, floorNum, roomId) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  const room = floor.rooms.find(r => r.id === roomId);

  let html = `<div class="room-detail">`;
  html += `<h2>${room.name[lang]} — €${room.price}</h2>`;
  room.photos.forEach(src => html += `<img src="${src}">`);
  html += `<p>${room.description[lang]}</p>`;
  html += `<p><strong>${lang === "en" ? "Available from:" : "Disponível a partir de:"}</strong> ${room.availableFrom}</p>`;
  html += `</div>`;

  html += `<a href="#/floor/${locKey}/${floorNum}" class="back-link">← ${lang === "en" ? "Back to floor" : "Voltar ao andar"}</a>`;

  app.innerHTML = html;
}

