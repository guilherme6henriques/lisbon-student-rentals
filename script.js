const app = document.getElementById("app");
const langBtns = document.querySelectorAll(".lang-btn");
let lang = "en";

// ... (Keep your i18n object and data object exactly as they were) ...
// ADD these keys to i18n
i18n.en.heroTitle = "Find your home in Lisbon";
i18n.pt.heroTitle = "Encontra a tua casa em Lisboa";
i18n.en.searchAction = "Search";
i18n.pt.searchAction = "Procurar";

function render() {
  const h = location.hash.slice(1);
  const parts = h.split("/").filter(Boolean);

  window.scrollTo(0,0);

  if (parts.length === 0) {
    toggleBackBtn(false);
    return renderHome();
  }
  // (Keep your other routes: about, floor, room)
  if (parts[0] === "location") return renderFloors(parts[1]);
  if (parts[0] === "floor") return renderFloor(parts[1], +parts[2]);
  if (parts[0] === "room") return renderRoom(parts[1], +parts[2], parts[3]);
  if (parts[0] === "about") return renderAbout();
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <h1 class="i18n-hero-title">${i18n[lang].heroTitle}</h1>
      <div class="search-container">
        <div class="search-field">
          <label>Location</label>
          <select id="search-loc">
            <option value="all">All of Lisbon</option>
            <option value="avenida_de_roma">Avenida de Roma</option>
            <option value="alcantara">Alcântara</option>
          </select>
        </div>
        <div class="search-field">
          <label>Move-in Date</label>
          <input type="date" id="search-date">
        </div>
        <button class="search-btn" onclick="executeSearch()">${i18n[lang].searchAction}</button>
      </div>
    </section>

    <div class="container" style="max-width:1200px; margin: 0 auto; padding: 0 20px;">
      <div class="section-header">
        <h2 id="results-title">${lang === 'en' ? 'Featured Rooms' : 'Quartos em Destaque'}</h2>
      </div>
      <div id="results-grid" class="results-grid"></div>
      
      <h2 class="section-title" style="margin-top:40px">${lang === 'en' ? 'Explore the Area' : 'Explorar a Zona'}</h2>
      <div id="map"></div>
    </div>
  `;

  initMap();
  executeSearch(); // Load initial rooms
}

function executeSearch() {
  const locVal = document.getElementById("search-loc").value;
  const dateVal = document.getElementById("search-date").value;
  const grid = document.getElementById("results-grid");
  grid.innerHTML = "";

  const searchDate = dateVal ? new Date(dateVal) : null;

  Object.entries(data).forEach(([locKey, locData]) => {
    if (locVal !== "all" && locKey !== locVal) return;

    locData.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        // Simple Date Filter
        let isAvailableByDate = true;
        if (searchDate && room.availableFrom !== "NOT AVAILABLE") {
            const [d, m, y] = room.availableFrom.split('/');
            const roomAvail = new Date(y, m - 1, d);
            if (roomAvail > searchDate) isAvailableByDate = false;
        }

        if (isAvailableByDate) {
            const isTaken = room.label[lang].includes("INDISPONÍVEL") || room.label[lang].includes("NOT AVAILABLE");
            
            const card = document.createElement("div");
            card.className = "room-card";
            card.onclick = () => location.hash = `#/room/${locKey}/${floor.number}/${room.id}`;
            card.innerHTML = `
              <div class="badge ${isTaken ? 'taken' : 'available'}">
                ${isTaken ? (lang === 'en' ? 'Taken' : 'Ocupado') : (lang === 'en' ? 'Available' : 'Livre')}
              </div>
              <img src="${room.thumb}" alt="">
              <div class="room-content">
                <div class="room-tag">${locData.name[lang]} - Floor ${floor.number}</div>
                <div class="room-price">€${room.price} <span>/ month</span></div>
              </div>
            `;
            grid.appendChild(card);
        }
      });
    });
  });
}

// Keep your existing Map Init logic but wrap it in initMap()
function initMap() {
    const map = L.map("map", { center: [38.7369, -9.1427], zoom: 12, scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    
    // ... (rest of your marker and uniLocations logic) ...
}

// Ensure popups work on the new map
window.addEventListener("hashchange", render);
window.addEventListener("load", render);
