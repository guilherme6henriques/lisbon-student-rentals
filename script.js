const app = document.getElementById("app");
const langBtns = document.querySelectorAll(".lang-btn");
let lang = "en";

// Language switching
langBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    lang = btn.id === "lang-pt" ? "pt" : "en";
    langBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    location.hash = "#";
  })
);

// Sample data
const data = {
  "avenida_de_roma": {
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    floors: [
      {
        number: 2,
        priceRange: [650, 800],
        commonPhotos: ["images/placeholder1.jpg"],
        rooms: [
          {
            id: "adr2_premium",
            name: { en: "Premium Balcony", pt: "Varanda Premium" },
            price: 800,
            thumb: "images/placeholder2.jpg",
            photos: ["images/placeholder2.jpg", "images/placeholder3.jpg"],
            description: {
              en: "Spacious room with balcony and natural light.",
              pt: "Quarto espaçoso com varanda e luz natural."
            },
            availableFrom: "2026-01-01"
          }
        ]
      },
      {
        number: 1,
        priceRange: [700, 850],
        commonPhotos: ["images/placeholder4.jpg"],
        rooms: [
          {
            id: "adr1_interior",
            name: { en: "Interior Room", pt: "Quarto Interior" },
            price: 700,
            thumb: "images/placeholder1.jpg",
            photos: ["images/placeholder1.jpg"],
            description: {
              en: "Quiet interior room with all amenities.",
              pt: "Quarto interior silencioso com todas as comodidades."
            },
            availableFrom: "2026-02-01"
          }
        ]
      }
    ]
  },
  "alcantara": {
    name: { en: "Alcântara", pt: "Alcântara" },
    floors: [
      {
        number: 1,
        priceRange: [600, 750],
        commonPhotos: ["images/placeholder3.jpg"],
        rooms: [
          {
            id: "alc1_premium",
            name: { en: "Studio Room", pt: "Quarto Estúdio" },
            price: 750,
            thumb: "images/placeholder4.jpg",
            photos: ["images/placeholder4.jpg"],
            description: {
              en: "Bright studio room in Alcântara.",
              pt: "Quarto estúdio luminoso em Alcântara."
            },
            availableFrom: "2026-03-01"
          }
        ]
      }
    ]
  }
};

// --- Routing ---
window.addEventListener("hashchange", router);
router();

function router() {
  const path = location.hash.slice(1).split("/").filter(Boolean);

  if (path.length === 0) return renderMap();

  const [section, locationKey, param] = path;

  if (section === "floor") return renderFloor(locationKey, +param);
  if (section === "location") return renderFloors(locationKey);
  if (section === "room") return renderRoom(locationKey, +param, path[3]);

  renderMap();
}

// --- Render map view ---
function renderMap() {
  app.innerHTML = `<div id="map"></div>`;
  app.classList.add("fade-in");

  const map = L.map("map").setView([38.7369, -9.1427], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const locations = {
    "avenida_de_roma": [38.7436, -9.1354],
    "alcantara": [38.7038, -9.1783]
  };

  Object.entries(locations).forEach(([key, coords]) => {
    const marker = L.marker(coords).addTo(map);
    marker.bindPopup(
      `<button onclick="location.hash='#/location/${key}'">${data[key].name[lang]}</button>`
    );
  });
}

// --- Render building/floors view ---
function renderFloors(locationKey) {
  const loc = data[locationKey];
  const title = loc.name[lang];

  if (loc.floors.length === 1) {
    renderFloor(locationKey, loc.floors[0].number);
    return;
  }

  const html = `
    <h2>${title}</h2>
    <div class="building">
      ${loc.floors
        .slice()
        .reverse()
        .map(
          (floor) => `
        <div class="floor" onclick="location.hash='#/floor/${locationKey}/${floor.number}'">
          <strong>Floor ${floor.number}</strong>
          <p>€${floor.priceRange[0]} - €${floor.priceRange[1]}</p>
        </div>
      `
        )
        .join("")}
    </div>
    <a href="#/" class="back-link">← Back to map</a>
  `;
  app.innerHTML = `<div class="fade-in">${html}</div>`;
}

// --- Render floor view (common + rooms) ---
function renderFloor(locationKey, floorNumber) {
  const floor = data[locationKey].floors.find((f) => f.number === floorNumber);
  const rooms = floor.rooms.slice().sort((a, b) => b.price - a.price);

  let html = `<h2>${data[locationKey].name[lang]} - Floor ${floor.number}</h2>`;

  html += floor.commonPhotos
    .map((src) => `<img src="${src}" class="common-photo">`)
    .join("");

  html += `<div class="rooms-list">`;
  html += rooms
    .map(
      (room, i) => `
    <div class="room-card" onclick="location.hash='#/room/${locationKey}/${floor.number}/${room.id}'">
      <img src="${room.thumb}" alt="${room.name[lang]}">
      <div class="room-info">
        <h3>${room.name[lang]}</h3>
        <p>€${room.price}</p>
      </div>
    </div>
  `
    )
    .join("");
  html += `</div>`;

  html += `<a href="#/location/${locationKey}" class="back-link">← Back to building</a>`;
  app.innerHTML = `<div class="fade-in">${html}</div>`;
}

// --- Render room view (detail) ---
function renderRoom(locationKey, floorNumber, roomId) {
  const floor = data[locationKey].floors.find((f) => f.number === floorNumber);
  const room = floor.rooms.find((r) => r.id === roomId);

  let html = `
    <div class="room-detail">
      <h2>${room.name[lang]} — €${room.price}</h2>
      ${room.photos.map((src) => `<img src="${src}">`).join("")}
      <p>${room.description[lang]}</p>
      <p><strong>${lang === "pt" ? "Disponível a partir de" : "Available from"}:</strong> ${room.availableFrom}</p>
    </div>
    <a href="#/floor/${locationKey}/${floorNumber}" class="back-link">← Back to floor</a>
  `;

  app.innerHTML = `<div class="fade-in">${html}</div>`;
}

