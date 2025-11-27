// script.js — full logic + gallery + fixed nav + translations

const app = document.getElementById("app");
const langBtns = document.querySelectorAll(".lang-btn");
let lang = "en";

const i18n = {
  en: {
    contact: "Contact",
    seeRooms: "See rooms",
    backToMap: "← Back to map",
    backToBuilding: "← Back to building",
    backToFloor: "← Back to floor",
    floorLabel: "Floor",
    commonAreas: "Common areas",
    roomsLabel: "Rooms",
    billsIncludedLabel: "Bills included:",
    billsGasExcludedLabel: "Bills included (excluding gas):",
    aboutUsTitle: "About us",
    aboutUsText: `Welcome to Lisbon Student Rentals! We are dedicated to providing safe, comfortable, and well‑located rooms for students coming to Lisbon. With properties in central neighborhoods like Avenida de Roma and Alcântara, we ensure easy access to public transport and local universities.

Our mission is to make the student renting experience as simple and stress‑free as possible. If you have any questions, feel free to contact us via email or WhatsApp. We look forward to helping you find your home in Lisbon!`,
    nearAlcantara: "Near Alcântara",
    nearRoma: "Near Avenida de Roma"
  },
  pt: {
    contact: "Contacto",
    seeRooms: "Ver quartos",
    backToMap: "← Voltar ao mapa",
    backToBuilding: "← Voltar ao imóvel",
    backToFloor: "← Voltar ao andar",
    floorLabel: "Andar",
    commonAreas: "Áreas comuns",
    roomsLabel: "Quartos",
    billsIncludedLabel: "Contas incluídas:",
    billsGasExcludedLabel: "Contas incluídas (gás excluído):",
    aboutUsTitle: "Sobre nós",
    aboutUsText: `Bem‑vindo aos Quartos de Estudantes Lisboa! Dedicamo‑nos a oferecer quartos seguros, confortáveis e bem localizados para estudantes que vêm para Lisboa. Com propriedades em bairros centrais como Avenida de Roma e Alcântara, garantimos fácil acesso a transportes públicos e às principais universidades.

A nossa missão é tornar a experiência de arrendar para estudantes o mais simples e tranquila possível. Se tiver alguma dúvida, contacte‑nos por email ou WhatsApp. Estamos ansiosos por ajudar‑lo a encontrar o seu lar em Lisboa!`,
    nearAlcantara: "Perto de Alcântara",
    nearRoma: "Perto da Avenida de Roma"
  }
};

function applyTranslations() {
  document.querySelectorAll("[data-i18n-key]").forEach(el => {
    const key = el.getAttribute("data-i18n-key");
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });
  document.querySelectorAll(".i18n-contact").forEach(el => {
    el.textContent = i18n[lang].contact;
  });
}
applyTranslations();

langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lang = btn.id === "lang-pt" ? "pt" : "en";
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyTranslations();
    render();
  });
});

function getImagePaths(prefix, count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(`Images/${prefix}${i}F.jpg`);
  }
  return arr;
}

// (Your data … same as before)  
const data = { /* … as in your previous data object … */ };
// universities etc same …  

// UTILS
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

// GLOBAL GALLERY STATE
let galleryImages = [];
let galleryIndex = 0;

function openGallery(imagesArray, startIndex) {
  galleryImages = imagesArray;
  galleryIndex = startIndex;

  updateModalImage();
  document.getElementById("image-modal").classList.remove("hidden");
}

function updateModalImage() {
  const modalImg = document.getElementById("modal-img");
  modalImg.src = galleryImages[galleryIndex];
}

function closeGallery() {
  document.getElementById("image-modal").classList.add("hidden");
}

function showNextImage() {
  if (galleryImages.length === 0) return;
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
  updateModalImage();
}
function showPrevImage() {
  if (galleryImages.length === 0) return;
  galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  updateModalImage();
}

// RENDER FUNCTIONS (map, floors, rooms, about) — similar to your original logic
function render() {
  const h = location.hash.slice(1);
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) {
    toggleBackBtn(false);
    return renderMap();
  }
  if (parts[0] === "location") {
    toggleBackBtn(false);
    return renderFloors(parts[1]);
  }
  if (parts[0] === "floor") {
    toggleBackBtn(true);
    return renderFloor(parts[1], +parts[2]);
  }
  if (parts[0] === "room") {
    toggleBackBtn(true);
    return renderRoom(parts[1], +parts[2], parts[3]);
  }
  if (parts[0] === "about") {
    toggleBackBtn(false);
    return renderAbout();
  }
  toggleBackBtn(false);
  renderMap();
}

function toggleBackBtn(show) {
  const btn = document.getElementById("btn-back-to-map");
  if (show) btn.classList.remove("hidden");
  else btn.classList.add("hidden");
}

/* --- renderMap, renderFloors, renderFloor — same as before, but when generating thumbnails, add data attributes --- */

function renderMap() {
  app.innerHTML = `
    <div class="map-caption-container">
      <div class="caption-box" id="caption-left">
        <h3>${i18n[lang].nearAlcantara}</h3>
        <ul id="list-alcantara"></ul>
      </div>
      <div class="map-container"><div id="map"></div></div>
      <div class="caption-box" id="caption-right">
        <h3>${i18n[lang].nearRoma}</h3>
        <ul id="list-roma"></ul>
      </div>
    </div>
    <div style="text-align:center; margin: 20px 0;">
      <button id="btn-about">${i18n[lang].aboutUsTitle}</button>
    </div>
  `;
  document.getElementById("btn-about").addEventListener("click", () => {
    location.hash = "#/about";
  });

  const map = L.map("map").setView([38.7369, -9.1427], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // markers & uni logic (same as before) …

  Object.entries(data).forEach(([key, loc]) => {
    const marker = L.marker(loc.coords).addTo(map);
    const popup = L.popup({ closeOnClick: false, autoClose: false, closeButton: false })
      .setContent(`
        <div class="popup-wrap" id="popup-${key}">
          <strong>${loc.name[lang]}</strong><br>
          <button class="popup-btn" onclick="location.hash='#/location/${key}'">
            ${i18n[lang].seeRooms}
          </button>
        </div>
      `);

    marker.bindPopup(popup);
  });
}

function renderFloors(locKey) {
  applyTranslations();
  const loc = data[locKey];
  if (!loc) return renderMap();

  if (loc.floors.length === 1) return renderFloor(locKey, loc.floors[0].number);

  let html = `<h2>${loc.name[lang]}</h2><div class="building">`;
  loc.floors.slice().reverse().forEach(f => {
    const prices = f.rooms.map(r => r.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);

    html += `
      <div class="floor" onclick="location.hash='#/floor/${locKey}/${f.number}'">
        <strong>${i18n[lang].floorLabel} ${f.number}</strong>
        <p>€${minP} - €${maxP}</p>
      </div>`;
  });
  html += `</div>`;
  app.innerHTML = html;
}

function renderFloor(locKey, floorNum) {
  applyTranslations();
  const loc = data[locKey];
  const floor = loc.floors.find(f => f.number === floorNum);
  if (!floor) return renderMap();

  let html = `<h2>${loc.name[lang]} — ${i18n[lang].floorLabel} ${floorNum}</h2>`;
  if (floor.commonDesc) {
    html += `<p class="common-desc">${floor.commonDesc[lang]}</p>`;
  }

  if (floor.commonPhotos && floor.commonPhotos.length) {
    html += `<div class="section-title">${i18n[lang].commonAreas}</div>`;
    html += `<div class="common-photos-container">`;
    floor.commonPhotos.forEach((src, idx) => {
      html += `<div class="photo-wrapper"><img src="${src}" alt="" data-gallery="common" data-loc="${locKey}" data-floor="${floorNum}" data-index="${idx}"></div>`;
    });
    html += `</div>`;
  }

  html += `<div class="section-title">${i18n[lang].roomsLabel}</div>`;
  html += `<div class="rooms-list">`;
  floor.rooms.slice().sort((a,b)=> b.price - a.price).forEach(room => {
    html += `
      <div class="room-card" onclick="location.hash='#/room/${locKey}/${floorNum}/${room.id}'">
        <img src="${room.thumb}" alt="">
        <div class="room-info">
          <h3>${room.label[lang]}</h3>
          <p>€${room.price}</p>
        </div>
      </div>`;
  });
  html += `</div>`;
  app.innerHTML = html;
}

function renderRoom(locKey, floorNum, roomId) {
  applyTranslations();
  const floor = data[locKey].floors.find(f => f.number === floorNum);
  if (!floor) return renderMap();
  const room = floor.rooms.find(r => r.id === roomId);
  if (!room) return renderMap();

  let html = `<div class="room-detail">`;
  html += `<h2>${room.label[lang]} — €${room.price}</h2>`;

  const billsText = room.bills[lang] || "";
  if (billsText) {
    html += `<p><strong>${i18n[lang].billsIncludedLabel}</strong> ${billsText}</p>`;
  }

  const desc = (room.description && room.description[lang]) ? room.description[lang] : "";
  if (desc) {
    html += `<p class="room-description">${desc}</p>`;
  }

  // Photos (with data attributes)
  room.photos.forEach((src, idx) => {
    html += `<div class="photo-wrapper"><img src="${src}" alt="" data-gallery="room" data-loc="${locKey}" data-floor="${floorNum}" data-room="${roomId}" data-index="${idx}"></div>`;
  });

  html += `</div>`;
  app.innerHTML = html;
}

// --- GALLERY / LIGHTBOX HANDLING ---

const modal = document.getElementById("image-modal");
const prevBtn = document.querySelector(".prev-arrow");
const nextBtn = document.querySelector(".next-arrow");
const closeBtn = document.querySelector(".close-btn");

// Click on thumbnail → open gallery
document.body.addEventListener("click", (e) => {
  const img = e.target;
  if (img.tagName === "IMG" && img.dataset.gallery) {
    const galleryType = img.dataset.gallery;
    let imagesArr = [];

    if (galleryType === "common") {
      const loc = img.dataset.loc;
      const floor = img.dataset.floor;
      imagesArr = data[loc].floors.find(f => f.number == floor).commonPhotos;
    } else if (galleryType === "room") {
      const loc = img.dataset.loc;
      const floor = img.dataset.floor;
      const roomId = img.dataset.room;
      const room = data[loc].floors.find(f => f.number == floor).rooms.find(r => r.id === roomId);
      imagesArr = room.photos;
    }

    const startIndex = Number(img.dataset.index) || 0;
    openGallery(imagesArr, startIndex);
  }
});

// Close on close button
closeBtn.addEventListener("click", closeGallery);
// Prev / Next
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

// Click outside image (backdrop) closes
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeGallery();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("hidden")) {
    if (e.key === "Escape") {
      closeGallery();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    }
  }
});

