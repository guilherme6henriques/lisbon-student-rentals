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

/* Universities with correct coordinates + colors */
const uniLocations = [
  {
    id: "ist",
    name: { en: "IST", pt: "IST" },
    coords: [38.73676, -9.13871],  // from reliable source :contentReference[oaicite:1]{index=1}
    color: "yellow"
  },
  {
    id: "novalisboa",
    name: { en: "NOVA", pt: "NOVA" },
    coords: [38.7335, -9.1562],  // from source :contentReference[oaicite:2]{index=2}
    color: "red"
  },
  {
    id: "fdul",
    name: { en: "Direito ULisboa", pt: "Direito ULisboa" },
    coords: [38.7273, -9.1504],  // approximate main campus area :contentReference[oaicite:3]{index=3}
    color: "green"
  },
  {
    id: "novaims",
    name: { en: "NOVA IMS", pt: "NOVA IMS" },
    coords: [38.7325, -9.1600],  // Campus Campolide / IMS location :contentReference[oaicite:4]{index=4}
    color: "purple"
  }
];

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

function render() {
  const hash = location.hash.slice(1);
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) return renderMap();
  if (parts[0] === "location") return renderFloors(parts[1]);
  if (parts[0] === "floor") return renderFloor(parts[1], +parts[2]);
  if (parts[0] === "room") return renderRoom(parts[1], +parts[2], parts[3]);
  renderMap();
}

function renderMap() {
  app.innerHTML = `
    <div class="map-caption-container">
      <div class="caption-box caption-left" id="caption-left">
        <h3>${lang === "en" ? "Near Alcântara" : "Perto de Alcântara"}</h3>
        <ul id="list-alcantara"></ul>
      </div>
      <div class="map-container"><div id="map"></div></div>
      <div class="caption-box caption-right" id="caption-right">
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
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [0, -35]
  });

  /* Universities — circleMarker with black border (ring) */
  uniLocations.forEach(uni => {
    const circle = L.circleMarker(uni.coords, {
      radius: 10,
      fillColor: uni.color,
      color: "#000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);

    // caption list: decide side based on house areas:
    // e.g. for simplicity: if longitude > -9.165 → belongs to Roma, else Alcântara
    const listEl = (uni.coords[1] > -9.165) ? document.getElementById("list-roma") : document.getElementById("list-alcantara");
    const li = document.createElement("li");
    li.innerHTML = `<span class="dot ${uni.color}"></span>${uni.name[lang]}`;
    listEl.appendChild(li);
  });

  /* Rental markers with sticky popups */
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
      const popupEl = document.getElementById(`popup-${key}`);
      if (!popupEl) return;
      popupEl.addEventListener("mouseenter", () => overPopup = true);
      popupEl.addEventListener("mouseleave", () => {
        overPopup = false;
        setTimeout(() => {
          if (!overMarker && !overPopup) marker.closePopup();
        }, 200);
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
  floor.rooms.sort((a,b)=>b.price - a.price).forEach(room => {
    html += `
      <div class="room-card" onclick="location.hash='#/room/${locKey}/${floorNum}/${room.id}'">
        <img src="${room.thumb}" alt="${room.name[lang]}">
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

function renderRoom(locKey, floorNum, roomId) {
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  if (!floor) return renderMap();
  const room = floor.rooms.find(r => r.id === roomId);
  if (!room) return renderMap();

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

