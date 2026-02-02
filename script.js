// ... (Keep your i18n, uniLocations, and data objects exactly as they are) ...

function render() {
  const h = location.hash.slice(1);
  const parts = h.split("/").filter(Boolean);

  if (parts.length === 0) {
    toggleBackBtn(false);
    return renderHome();
  }
  if (parts[0] === "location") return renderFloors(parts[1]);
  if (parts[0] === "floor") return renderFloor(parts[1], +parts[2]);
  if (parts[0] === "room") return renderRoom(parts[1], +parts[2], parts[3]);
  if (parts[0] === "about") return renderAbout();
}

function renderHome() {
  app.innerHTML = `
    <section class="hero-search">
      <h2>${lang === 'en' ? 'Find your home in Lisbon' : 'Encontra a tua casa em Lisboa'}</h2>
      <div class="search-bar">
        <div class="search-group">
          <label>Location</label>
          <select id="search-location">
            <option value="all">All Locations</option>
            <option value="avenida_de_roma">Avenida de Roma</option>
            <option value="alcantara">Alcântara</option>
          </select>
        </div>
        <div class="search-group">
          <label>Arrival Date</label>
          <input type="date" id="search-date">
        </div>
        <button class="search-btn-main" onclick="performSearch()">${lang === 'en' ? 'Search' : 'Procurar'}</button>
      </div>
    </section>

    <div id="search-results" class="results-container"></div>

    <div class="container" style="max-width: 1100px; margin: 0 auto; padding: 0 20px;">
      <p style="text-align: center; margin-bottom: 20px;">${i18n[lang].mapIntro}</p>
      <div id="map"></div>
    </div>
  `;

  renderMap(); // Your existing map function remains the same
}

function performSearch() {
  const locVal = document.getElementById("search-location").value;
  const dateVal = document.getElementById("search-date").value;
  const resultsDiv = document.getElementById("search-results");
  
  resultsDiv.innerHTML = `<h2 style="margin-bottom:20px;">${lang === 'en' ? 'Available Rooms' : 'Quartos Disponíveis'}</h2><div class="rooms-list"></div>`;
  const grid = resultsDiv.querySelector(".rooms-list");
  let found = 0;

  const inputDate = dateVal ? new Date(dateVal) : null;

  Object.entries(data).forEach(([key, loc]) => {
    if (locVal !== "all" && key !== locVal) return;

    loc.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        // Date parsing logic for "DD/MM/YYYY" format
        let available = true;
        if (inputDate && room.availableFrom !== "NOT AVAILABLE") {
            const [d, m, y] = room.availableFrom.split('/');
            const roomAvailDate = new Date(y, m - 1, d);
            if (roomAvailDate > inputDate) available = false;
        } else if (room.availableFrom === "NOT AVAILABLE") {
            available = false;
        }

        if (available) {
          found++;
          grid.innerHTML += `
            <div class="room-card" onclick="location.hash='#/room/${key}/${floor.number}/${room.id}'">
              <img src="${room.thumb}" alt="">
              <div class="room-info">
                <h3>${room.label[lang].split(' - ')[0]}</h3>
                <p>€${room.price} - ${loc.name[lang]}</p>
              </div>
            </div>`;
        }
      });
    });
  });

  if (found === 0) {
    resultsDiv.innerHTML = `<div class="no-results">${lang === 'en' ? 'No rooms available for these criteria.' : 'Não existem quartos disponíveis para estes critérios.'}</div>`;
  }
}
