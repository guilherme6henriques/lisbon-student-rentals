// --- Data: fill in with real values ---
const data = {
  "avenida_de_roma": {
    id: "avenida_de_roma",
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    coords: [38.751953, -9.142066],  // <-- replace with real coords
    floors: {
      "1": {
        priceRange: { en: "€700 - €850", pt: "€700 - €850" },
        commonPhotos: ["images/common_floor1_1.jpg", "images/common_floor1_2.jpg"],
        rooms: [
          {
            id: "adr-1-premium-balcony",
            name: { en: "Premium Balcony", pt: "Premium Varanda" },
            price: 850,
            thumb: "images/adr1_balcony_thumb.jpg",
            photos: ["images/adr1_balcony_1.jpg", "images/adr1_balcony_2.jpg"],
            description: {
              en: "Bright room with balcony, desk, bed, wardrobe. Excellent for studying.",
              pt: "Quarto luminoso com varanda, secretária, cama, roupeiro. Excelente para estudar."
            },
            availableFrom: "2026-01-15"
          },
          {
            id: "adr-1-interior",
            name: { en: "Interior Room", pt: "Quarto Interior" },
            price: 750,
            thumb: "images/adr1_interior_thumb.jpg",
            photos: ["images/adr1_interior_1.jpg"],
            description: {
              en: "Quiet interior room, shared common area and kitchen.",
              pt: "Quarto interior silencioso, área comum e cozinha partilhada."
            },
            availableFrom: "2025-12-01"
          }
        ]
      },
      "2": {
        priceRange: { en: "€650 - €800", pt: "€650 - €800" },
        commonPhotos: ["images/common_floor2_1.jpg"],
        rooms: [
          // more rooms...
        ]
      },
      "3": {
        priceRange: { en: "€600 - €780", pt: "€600 - €780" },
        commonPhotos: ["images/common_floor3_1.jpg"],
        rooms: [
          // more rooms...
        ]
      }
    }
  },
  "alcantara": {
    id: "alcantara",
    name: { en: "Alcântara", pt: "Alcântara" },
    coords: [38.714, -9.169],  // replace with real coords
    floors: {
      "1": {
        priceRange: { en: "€650 - €820", pt: "€650 - €820" },
        commonPhotos: ["images/alc1_common_1.jpg"],
        rooms: [
          {
            id: "alc-1-room-a",
            name: { en: "Alcântara Room A", pt: "Quarto Alcântara A" },
            price: 820,
            thumb: "images/alc1_a_thumb.jpg",
            photos: ["images/alc1_a_1.jpg"],
            description: {
              en: "Comfortable room near central Lisbon transport, with student-friendly amenities.",
              pt: "Quarto confortável perto de transportes centrais de Lisboa, com comodidades para estudantes."
            },
            availableFrom: "2025-11-20"
          }
          // more rooms...
        ]
      }
    }
  }
};

// --- Internationalization strings ---
const i18n = {
  en: {
    backToMap: "← Back to map",
    backToFloors: "← Back to floors",
    backToRooms: "← Back to rooms",
    commonAreas: "Common Areas",
    rooms: "Rooms",
    price: "Price",
    availableFrom: "Available from",
    contact: "Contact"
  },
  pt: {
    backToMap: "← Voltar ao mapa",
    backToFloors: "← Voltar aos andares",
    backToRooms: "← Voltar aos quartos",
    commonAreas: "Áreas comuns",
    rooms: "Quartos",
    price: "Preço",
    availableFrom: "Disponível a partir de",
    contact: "Contacto"
  }
};

// Current language (default)
let lang = "en";

// Setup language switcher
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-en").addEventListener("click", () => switchLang("en"));
  document.getElementById("lang-pt").addEventListener("click", () => switchLang("pt"));
});

function switchLang(l) {
  lang = l;
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-pt").classList.toggle("active", lang === "pt");
  render(); // re-render current view
}

// Simple router + render
function router() {
  const hash = window.location.hash || "#/";
  const parts = hash.slice(2).split("/"); // remove "#/"
  const view = parts[0];
  const locationId = parts[1];
  const floorId = parts[2];
  const roomId = parts[3];
  if (!view || view === "") {
    renderMap();
  } else if (view === "location" && locationId) {
    renderFloors(locationId);
  } else if (view === "floor" && locationId && floorId) {
    renderFloor(locationId, floorId);
  } else if (view === "room" && locationId && floorId && roomId) {
    renderRoom(locationId, floorId, roomId);
  } else {
    renderMap();
  }
}

function render() {
  router();
}

function renderMap() {
  const app = document.getElementById("app");
  app.innerHTML = '<div id="map"></div>';
  const map = L.map("map").setView([38.75, -9.15], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  Object.values(data).forEach(loc => {
    const marker = L.marker(loc.coords).addTo(map);
    marker.bindTooltip(`<button class="map-btn">${loc.name[lang]}</button>`, {
      permanent: false,
      direction: "top",
      offset: [0, -10],
      className: 'leaflet-tooltip-button'
    });
    marker.on("click", () => {
      window.location.hash = `#/location/${loc.id}`;
    });
  });
}

function renderFloors(locationId) {
  const loc = data[locationId];
  const floors = loc.floors;
  const app = document.getElementById("app");
  let html = `<h1>${loc.name[lang]}</h1>`;
  html += `<div class="building">`;
  Object.keys(floors).sort().forEach(f => {
    html += `
      <div class="floor" data-floor="${f}">
        <strong>${lang === "en" ? "Floor" : "Andar"} ${f}</strong><br>
        ${floors[f].priceRange[lang]}
      </div>`;
  });
  html += `</div>`;
  html += `<p><a class="back-link" href="#">${i18n[lang].backToMap}</a></p>`;
  app.innerHTML = html;

  document.querySelectorAll(".floor").forEach(el => {
    el.addEventListener("click", () => {
      const f = el.getAttribute("data-floor");
      window.location.hash = `#/floor/${locationId}/${f}`;
    });
  });
}

function renderFloor(locationId, floorId) {
  const floor = data[locationId].floors[floorId];
  const app = document.getElementById("app");
  let html = `<h1>${data[locationId].name[lang]} — ${lang === "en" ? "Floor" : "Andar"} ${floorId}</h1>`;

  if (floor.commonPhotos && floor.commonPhotos.length) {
    html += `<h2>${i18n[lang].commonAreas}</h2>`;
    floor.commonPhotos.forEach(src => {
      html += `<img src="${src}" alt="Common area" class="common-photo">`;
    });
  }

  html += `<h2>${i18n[lang].rooms}</h2>`;
  html += `<div class="rooms-list">`;
  const sorted = floor.rooms.slice().sort((a, b) => b.price - a.price);
  sorted.forEach(room => {
    html += `
      <div class="room-card" data-room="${room.id}">
        <img src="${room.thumb}" alt="${room.name[lang]}">
        <h3>${room.name[lang]}</h3>
        <p>${i18n[lang].price}: €${room.price}</p>
      </div>`;
  });
  html += `</div>`;
  html += `<p><a class="back-link" href="#/location/${locationId}">${iloorBack(linkFloor = i18n[lang].backToFloors)}</a></p>`;
  app.innerHTML = html;

  document.querySelectorAll(".room-card").forEach(el => {
    el.addEventListener("click", () => {
      const r = el.getAttribute("data-room");
      window.location.hash = `#/room/${locationId}/${floorId}/${r}`;
    });
  });
}

function renderRoom(locationId, floorId, roomId) {
  const room = data[locationId].floors[floorId].rooms.find(r => r.id === roomId);
  const app = document.getElementById("app");
  if (!room) {
    app.innerHTML = `<p>Room not found.</p><p><a class="back-link" href="#">${i18n[lang].backToMap}</a></p>`;
    return;
  }
  let html = `<h1>${room.name[lang]}</h1>`;
  room.photos.forEach(src => {
    html += `<img src="${src}" alt="${room.name[lang]}" class="room-detail-photo">`;
  });
  html += `<p><strong>${i18n[lang].price}:</strong> €${room.price}</p>`;
  html += `<p><strong>${i18n[lang].availableFrom}:</strong> ${room.availableFrom}</p>`;
  html += `<p>${room.description[lang]}</p>`;
  html += `<p><a class="back-link" href="#/floor/${locationId}/${floorId}">${i18n[lang].backToRooms}</a></p>`;
  app.innerHTML = html;
}

// Utility to avoid encoding issues
function iloorBack(linkFloor) {
  return linkFloor;  
}

// Router & listeners
window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
  router();
});
