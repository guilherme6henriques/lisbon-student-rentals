// --- Data — demo with placeholder images ---
const data = {
  "avenida": {
    id: "avenida",
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    coords: [38.751953, -9.142066],
    floors: {
      "1": {
        priceRange: { en: "€700 - €850", pt: "€700 - €850" },
        commonPhotos: ["images/placeholder1.jpg", "images/placeholder2.jpg"],
        rooms: [
          {
            id: "room-1a",
            name: { en: "Premium Balcony", pt: "Premium Varanda" },
            price: 850,
            thumb: "images/placeholder3.jpg",
            photos: ["images/placeholder3.jpg", "images/placeholder4.jpg"],
            description: {
              en: "Bright room with balcony, desk, bed, wardrobe.",
              pt: "Quarto luminoso com varanda, secretária, cama, roupeiro."
            },
            availableFrom: "2026-01-15"
          },
          {
            id: "room-1b",
            name: { en: "Interior Room", pt: "Quarto Interior" },
            price: 750,
            thumb: "images/placeholder4.jpg",
            photos: ["images/placeholder4.jpg"],
            description: {
              en: "Calm interior room with shared kitchen and common areas.",
              pt: "Quarto interior tranquilo com cozinha partilhada e áreas comuns."
            },
            availableFrom: "2025-12-01"
          }
        ]
      },
      "2": {
        priceRange: { en: "€650 - €800", pt: "€650 - €800" },
        commonPhotos: ["images/placeholder1.jpg"],
        rooms: [
          {
            id: "room-2a",
            name: { en: "Standard Room", pt: "Quarto Standard" },
            price: 800,
            thumb: "images/placeholder3.jpg",
            photos: ["images/placeholder3.jpg"],
            description: {
              en: "Comfortable standard room on second floor.",
              pt: "Quarto standard confortável no segundo andar."
            },
            availableFrom: "2026-02-01"
          }
        ]
      }
    }
  },
  "alcantara": {
    id: "alcantara",
    name: { en: "Alcântara", pt: "Alcântara" },
    coords: [38.714, -9.169],
    floors: {
      "1": {
        priceRange: { en: "€650 - €820", pt: "€650 - €820" },
        commonPhotos: ["images/placeholder2.jpg"],
        rooms: [
          {
            id: "alc-1a",
            name: { en: "Alcântara Room A", pt: "Quarto Alcântara A" },
            price: 820,
            thumb: "images/placeholder3.jpg",
            photos: ["images/placeholder3.jpg"],
            description: {
              en: "Nice room near public transport.",
              pt: "Quarto agradável perto de transportes públicos."
            },
            availableFrom: "2025-11-20"
          }
        ]
      }
    }
  }
};

// --- i18n strings ---
const i18n = {
  en: {
    backToMap: "← Back to map",
    backToFloors: "← Back to floors",
    backToRooms: "← Back to rooms",
    commonAreas: "Common areas",
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

let lang = "en";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-en").addEventListener("click", () => switchLang("en"));
  document.getElementById("lang-pt").addEventListener("click", () => switchLang("pt"));
});

function switchLang(l) {
  lang = l;
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-pt").classList.toggle("active", lang === "pt");
  render();
}

function router() {
  const hash = window.location.hash || "#/";
  const parts = hash.slice(2).split("/");
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
  const map = L.map("map", { zoomControl: false }).setView([38.75, -9.15], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  Object.values(data).forEach(loc => {
    const marker = L.marker(loc.coords).addTo(map);
    marker.bindPopup(
      `<strong>${loc.name[lang]}</strong><br>` +
      `<button class="popup-btn" onclick="window.location.hash='#/location/${loc.id}'">` +
      (lang === 'en' ? 'See rooms' : 'Ver quartos') +
      `</button>`
    );
  });
}

function renderFloors(locationId) {
  const loc = data[locationId];
  const floors = loc.floors;
  const app = document.getElementById("app");
  let html = `<h2>${loc.name[lang]}</h2>`;
  html += '<div class="building">';
  Object.keys(floors).sort().forEach(f => {
    html += `
      <div class="floor" data-floor="${f}">
        <strong>${lang === 'en' ? 'Floor' : 'Andar'} ${f}</strong><br>
        ${floors[f].priceRange[lang]}
      </div>
    `;
  });
  html += '</div>';
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
  let html = `<h2>${data[locationId].name[lang]} — ${lang === 'en' ? 'Floor' : 'Andar'} ${floorId}</h2>`;

  if (floor.commonPhotos && floor.commonPhotos.length) {
    html += `<section><div class="section-title">${i18n[lang].commonAreas}</div>`;
    floor.commonPhotos.forEach(src => {
      html += `<img src="${src}" class="common-photo">`;
    });
    html += `</section>`;
  }

  html += `<section><div class="section-title">${i18n[lang].rooms}</div>`;
  html += `<div class="rooms-list">`;
  const sorted = floor.rooms.slice().sort((a, b) => b.price - a.price);
  sorted.forEach(room => {
    html += `
      <div class="room-card" data-room="${room.id}">
        <img src="${room.thumb}" alt="${room.name[lang]}">
        <div class="room-info">
          <h3>${room.name[lang]}</h3>
          <p>${i18n[lang].price}: €${room.price}</p>
        </div>
      </div>
    `;
  });
  html += `</div></section>`;
  html += `<p><a class="back-link" href="#/location/${locationId}">${i18n[lang].backToFloors}</a></p>`;
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

  let html = `<div class="room-detail"><h2>${room.name[lang]}</h2>`;
  room.photos.forEach(src => {
    html += `<img src="${src}" alt="${room.name[lang]}">`;
  });
  html += `<p><strong>${i18n[lang].price}:</strong> €${room.price}</p>`;
  html += `<p><strong>${i18n[lang].availableFrom}:</strong> ${room.availableFrom}</p>`;
  html += `<p>${room.description[lang]}</p>`;
  html += `<p><a class="back-link" href="#/floor/${locationId}/${floorId}">${i18n[lang].backToRooms}</a></p>`;
  html += `</div>`;
  app.innerHTML = html;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
