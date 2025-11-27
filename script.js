// script.js

// --------------------- TRANSLATION SETUP ---------------------
const i18n = {
  en: {
    title: "Lisbon Student Rentals",
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
    aboutUsTitle: "About Us",
    aboutUsText: `Welcome to Lisbon Student Rentals! We are dedicated to providing safe, comfortable, and well‑located rooms for students coming to Lisbon. With properties in central neighborhoods like Avenida de Roma and Alcântara, we ensure easy access to public transport and local universities.
    
Our mission is to make the student renting experience as simple and stress‑free as possible. If you have any questions, feel free to contact us via email or WhatsApp. We look forward to helping you find your home in Lisbon!`,
    aboutUsLink: "About us",
  },
  pt: {
    title: "Quartos de Estudantes Lisboa",
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
    aboutUsTitle: "Sobre Nós",
    aboutUsText: `Bem‑vindo aos Quartos de Estudantes Lisboa! Dedicamo‑nos a oferecer quartos seguros, confortáveis e bem localizados para estudantes que vêm para Lisboa. Com propriedades em bairros centrais como Avenida de Roma e Alcântara, garantimos fácil acesso a transportes públicos e às principais universidades.

A nossa missão é tornar a experiência de arrendar para estudantes o mais simples e tranquila possível. Se tiver alguma dúvida, contacte‑nos por email ou WhatsApp. Estamos ansiosos para ajudar‑lo a encontrar o seu lar em Lisboa!`,
    aboutUsLink: "Sobre nós",
  }
};

let lang = "en";

function applyTranslations() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
}

const langBtns = document.querySelectorAll(".lang-btn");
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lang = btn.id === "lang‑pt" ? "pt" : "en";
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyTranslations();
    render();
  });
});

// --------------------- DATA + MAP & PAGES logic ---------------------

function getImagePaths(prefix, count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(`Images/${prefix}${i}F.jpg`);
  }
  return arr;
}

const data = {
  "avenida_de_roma": {
    name: { en: "Avenida de Roma", pt: "Avenida de Roma" },
    coords: [38.74651115662008, -9.143217726509699],
    floors: [
      {
        number: 1,
        commonDesc: {
          en: "1 Kitchen with full utilities, 2 Bathrooms, 1 Living room",
          pt: "1 Cozinha com todas as utilidades, 2 Casas de banho, 1 Sala"
        },
        rooms: [
          { id: "2Q", code: "AR1A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 700,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
            thumb: `Images/AR1A2Q1F.jpg`, photos: getImagePaths("AR1A2Q", 8),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "4Q", code: "AR1A4Q", label: { en: "Room 4", pt: "Quarto 4" }, price: 600,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
            thumb: `Images/AR1A4Q1F.jpg`, photos: getImagePaths("AR1A4Q", 3),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "5Q", code: "AR1A5Q", label: { en: "Room 5", pt: "Quarto 5" }, price: 570,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
            thumb: `Images/AR1A5Q1F.jpg`, photos: getImagePaths("AR1A5Q", 2),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      },
      {
        number: 2,
        commonDesc: {
          en: "1 Kitchen with full utilities, 1 Bathroom",
          pt: "1 Cozinha com todas as utilidades, 1 Casa de banho"
        },
        rooms: [
          { id: "3Q", code: "AR2A3Q", label: { en: "Room 3", pt: "Quarto 3" }, price: 650,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
            thumb: `Images/AR2A3Q1F.jpg`, photos: getImagePaths("AR2A3Q", 6),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "5Q", code: "AR2A5Q", label: { en: "Room 5", pt: "Quarto 5" }, price: 600,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
            thumb: `Images/AR2A5Q1F.jpg`, photos: getImagePaths("AR2A5Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      },
      {
        number: 3,
        commonDesc: {
          en: "1 Kitchen with full utilities, 1 Bathroom",
          pt: "1 Cozinha com todas as utilidades, 1 Casa de banho"
        },
        rooms: [
          { id: "2Q", code: "AR3A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 700,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
            thumb: `Images/AR3A2Q1F.jpg`, photos: getImagePaths("AR3A2Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "3Q", code: "AR3A3Q", label: { en: "Room 3", pt: "Quarto 3" }, price: 650,
            bills: { en: "All bills included", pt: "Todas as contas incluídas" },
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
        commonDesc: {
          en: "1 Kitchen with full utilities, 2 Bathrooms, 1 Living room and 1 Patio",
          pt: "1 Cozinha com todas as utilidades, 2 Casas de banho, 1 Sala e 1 Pátio"
        },
        rooms: [
          { id: "1Q", code: "AL1A1Q", label: { en: "Room 1", pt: "Quarto 1" }, price: 750,
            bills: { en: "All bills included (excluding gas)", pt: "Contas incluídas (gás excluído)" },
            thumb: `Images/AL1A1Q1F.jpg`, photos: getImagePaths("AL1A1Q", 6),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "2Q", code: "AL1A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 700,
            bills: { en: "All bills included (excluding gas)", pt: "Contas incluídas (gás excluído)" },
            thumb: `Images/AL1A2Q1F.jpg`, photos: getImagePaths("AL1A2Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "3Q", code: "AL1A3Q", label: { en: "Room 3", pt: "Quarto 3" }, price: 600,
            bills: { en: "All bills included (excluding gas)", pt: "Contas incluídas (gás excluído)" },
            thumb: `Images/AL1A3Q1F.jpg`, photos: getImagePaths("AL1A3Q", 4),
            description: { en: "", pt: "" }, availableFrom: "" },
          { id: "4Q", code: "AL1A4Q", label: { en: "Room 4", pt: "Quarto 4" }, price: 750,
            bills: { en: "All bills included (excluding gas)", pt: "Contas incluídas (gás excluído)" },
            thumb: `Images/AL1A4Q1F.jpg`, photos: getImagePaths("AL1A4Q", 5),
            description: { en: "", pt: "" }, availableFrom: "" }
        ]
      }
    ]
  }
};

// University list remains unchanged — omitted here for brevity
// … uniLocations, distKm, leaflet markers code stay the same …

// --------------------- RENDER LOGIC ---------------------
window.addEventListener("hashchange", handleHash);
window.addEventListener("load", handleHash);

function handleHash() {
  const h = location.hash.slice(1);
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return renderMap();
  if (parts[0] === "location") return renderFloors(parts[1]);
  if (parts[0] === "floor")    return renderFloor(parts[1], +parts[2]);
  if (parts[0] === "room")     return renderRoom(parts[1], +parts[2], parts[3]);
  if (parts[0] === "about")    return renderAbout();
  renderMap();
}

function renderMap() {
  applyTranslations();

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
    <div style="text-align:center; margin: 20px 0;">
      <button id="btn-about">${i18n[lang].aboutUsLink}</button>
    </div>
  `;

  document.getElementById("btn-about").addEventListener("click", () => {
    location.hash = "#/about";
  });

  // --- Leaflet map + markers + uni circles + rentals (same as before) ---
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

  // universities circles and captions (unchanged)
  uniLocations.forEach(uni => {
    L.circleMarker(uni.coords, {
      radius: 9,
      fillColor: uni.color,
      color: "#000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);

    const dA = distKm(uni.coords, data.alcantara.coords);
    const dR = distKm(uni.coords, data.avenida_de_roma.coords);
    const side = dA < dR ? "alcantara" : "roma";
    const listEl = document.getElementById(side === "roma" ? "list-roma" : "list-alcantara");
    const li = document.createElement("li");
    li.innerHTML = `<span class="dot" style="background: ${uni.color};"></span>${uni.name[lang]}`;
    listEl.appendChild(li);
  });

  // rental properties markers
  Object.entries(data).forEach(([key, loc]) => {
    const marker = L.marker(loc.coords, { icon: rentalIcon }).addTo(map);
    const popup = L.popup({ closeOnClick: false, autoClose: false, closeButton: false })
      .setContent(`
        <div class="popup-wrap" id="popup-${key}">
          <strong>${loc.name[lang]}</strong><br>
          <button class="popup-btn" onclick="location.hash='#/location/${key}'">
            ${i18n[lang].seeRooms}
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
  applyTranslations();
  const loc = data[locKey];
  if (!loc) return renderMap();
  if (loc.floors.length === 1) return renderFloor(locKey, loc.floors[0].number);

  let html = `<h2>${loc.name[lang]}</h2><div class="building">`;
  loc.floors.slice().reverse().forEach(f => {
    // compute min/max for this floor
    const prices = f.rooms.map(r => r.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);

    html += `
      <div class="floor" onclick="location.hash='#/floor/${locKey}/${f.number}'">
        <strong>${i18n[lang].floorLabel} ${f.number}</strong>
        <p>€${minP} - €${maxP}</p>
      </div>`;
  });
  html += `</div><a href="#/" class="back-link">${i18n[lang].backToMap}</a>`;
  app.innerHTML = html;
}

function renderFloor(locKey, floorNum) {
  applyTranslations();

  const floor = data[locKey].floors.find(f => f.number === floorNum);
  if (!floor) return renderMap();

  let html = `<h2>${data[locKey].name[lang]} — ${i18n[lang].floorLabel} ${floorNum}</h2>`;

  if (floor.commonDesc) {
    html += `<p class="common-desc">${floor.commonDesc[lang]}</p>`;
  }

  if (floor.commonPhotos && floor.commonPhotos.length) {
    html += `<div class="section-title">${i18n[lang].commonAreas}</div>`;
    html += `<div class="common-photos-container">`;
    floor.commonPhotos.forEach(src => {
      html += `<img src="${src}" alt="">`;
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
  html += `<a href="#/location/${locKey}" class="back-link">${i18n[lang].backToBuilding}</a>`;
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

  html += `<p><strong>${i18n[lang].billsIncludedLabel}</strong> ${room.bills[lang]}</p>`;

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
  html += `<a href="#/floor/${locKey}/${floorNum}" class="back-link">${i18n[lang].backToFloor}</a>`;
  app.innerHTML = html;
}

function renderAbout() {
  applyTranslations();

  const html = `
    <div class="about-page" style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h2>${i18n[lang].aboutUsTitle}</h2>
      <p style="white-space: pre-line; margin-top: 16px;">${i18n[lang].aboutUsText}</p>
      <a href="#/" class="back-link">${i18n[lang].backToMap}</a>
    </div>
  `;
  app.innerHTML = html;
}


