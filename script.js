// script.js — full logic + top‑nav + translated nav + improved room layout + image modal

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

function applyTranslationsText() {
  // Footer contact
  document.querySelectorAll(".i18n-contact").forEach(el => {
    el.textContent = i18n[lang].contact;
  });
  // Top‑nav buttons
  const btnBack = document.getElementById("btn-back-to-map");
  const btnAbout = document.getElementById("btn-about-global");
  if (btnBack) btnBack.textContent = i18n[lang].backToMap;
  if (btnAbout) btnAbout.textContent = i18n[lang].aboutUsTitle;
}
applyTranslationsText();

langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lang = btn.id === "lang-pt" ? "pt" : "en";
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyTranslationsText();
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
        commonPhotos: getImagePaths("AR1AZC", 7),
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
        commonPhotos: getImagePaths("AR2AZC", 3),
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
        commonPhotos: getImagePaths("AR3AZC", 5),
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
        commonPhotos: getImagePaths("AL1AZC", 7),
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

const uniLocations = [
  { id: "ist", name: { en: "IST", pt: "IST" }, coords: [38.7353, -9.1367], color: "#f1c40f" },
  { id: "nova_ims", name: { en: "NOVA IMS", pt: "NOVA IMS" }, coords: [38.732462, -9.159921], color: "#e74c3c" },
  { id: "iseg", name: { en: "ISEG", pt: "ISEG" }, coords: [38.7099, -9.1556], color: "#2ecc71" },
  { id: "nova_sbe", name: { en: "NOVA SBE", pt: "NOVA SBE" }, coords: [38.678458, -9.325998], color: "#8e44ad" },
  { id: "iscte", name: { en: "ISCTE-IUL", pt: "ISCTE-IUL" }, coords: [38.74889, -9.15389], color: "#1abc9c" },
  { id: "fcul", name: { en: "FCUL", pt: "FCUL" }, coords: [38.7563, -9.1564], color: "#3498db" },
  { id: "fmul", name: { en: "FMUL", pt: "FMUL" }, coords: [38.7463469531953, -9.161155141126354], color: "#e84393" },
  { id: "ucp_cat", name: { en: "UCP", pt: "UCP" }, coords: [38.74893443978093, -9.164949511475601], color: "#a04000" }
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

  if (parts.length === 0) {
    toggleBackBtn(false);
    return renderMap();
  }
  if (parts[0] === "location") {
    toggleBackBtn(true);
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
    toggleBackBtn(true);
    return renderAbout();
  }
  toggleBackBtn(false);
  renderMap();

  // Clear accidental text selection
if (window.getSelection) {
  const sel = window.getSelection();
  if (sel && sel.removeAllRanges) sel.removeAllRanges();
}

}

function toggleBackBtn(show) {
  const btn = document.getElementById("btn-back-to-map");
  if (show) btn.classList.remove("hidden");
  else btn.classList.add("hidden");
}

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
  applyTranslationsText();
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
  html += `</div><a href="#/" class="back-link">${i18n[lang].backToMap}</a>`;
  app.innerHTML = html;
}

function renderFloor(locKey, floorNum) {
  applyTranslationsText();
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
      html += `<div class="photo-wrapper"><img src="${src}" alt=""></div>`;
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
  applyTranslationsText();  
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

  html += `<div class="common-photos-container">`;
  room.photos.forEach(src => {
    html += `<div class="photo-wrapper"><img src="${src}" alt=""></div>`;
  });
  html += `</div>`;

  html += `</div>`;
  html += `<a href="#/floor/${locKey}/${floorNum}" class="back-link">${i18n[lang].backToFloor}</a>`;
  app.innerHTML = html;
}

function renderAbout() {
  applyTranslationsText();
  const html = `
    <div class="about-page" style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h2>${i18n[lang].aboutUsTitle}</h2>
      <p style="white-space: pre-line; margin-top: 16px;">${i18n[lang].aboutUsText}</p>
    </div>`;
  app.innerHTML = html;
}

// === IMAGE MODAL LOGIC ===
const imageModal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");

document.body.addEventListener("click", function (e) {
  if (e.target.matches(".photo-wrapper img")) {
    modalImg.src = e.target.src;
    imageModal.classList.remove("hidden");
  }
  if (e.target.matches(".close-btn")) {
    imageModal.classList.add("hidden");
  }
});

imageModal.addEventListener("click", function (e) {
  if (e.target === imageModal) {
    imageModal.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    imageModal.classList.add("hidden");
  }
});


