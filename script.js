// script.js — Lisbon Student Rentals — Modern redesign

// ── Language ─────────────────────────────────────────────
const langBtns = document.querySelectorAll('.lang-btn');
let lang = 'en';

const i18n = {
  en: {
    heroTitle: 'Find your perfect room in Lisbon',
    heroSubtitle: 'Affordable student rooms with bills included',
    labelLocation: 'Location',
    anyLocation: 'Any location',
    labelMoveIn: 'Move-in date',
    searchBtn: 'Search',
    aboutLink: 'About Us',
    locationsLink: 'Locations',
    contactLink: 'Contact',
    footerTagline: 'Helping students find home in Lisbon',
    footerContactTitle: 'Get in touch',
    allRooms: 'All Rooms',
    showMap: '🗺 Show map',
    hideMap: '🗺 Hide map',
    floorLabel: 'Floor',
    commonAreas: 'Common Areas',
    billsTag: 'Bills included',
    billsExclGasTag: 'Bills incl. (excl. gas)',
    availNow: 'Available now',
    availFrom: d => `Available ${d}`,
    notAvailable: 'Not Available',
    viewRoom: 'View room →',
    backToAll: '← All rooms',
    perMonth: '/ month',
    infoLocation: 'Location',
    infoFloor: 'Floor',
    infoAvailFrom: 'Available from',
    infoBills: 'Bills',
    whatsIncluded: "What's included",
    contactEmail: 'Send an email',
    contactWA: 'WhatsApp us',
    calTitle: 'Availability Calendar',
    calAvail: 'Available',
    calNotYet: 'Not yet available',
    calUnavail: 'Unavailable',
    calPast: 'Past',
    houseRulesTitle: 'House Rules',
    houseRules: [
      { icon: '🚭', title: 'No open flames', text: 'Candles and smoking are not permitted inside the apartment.' },
      { icon: '💡', title: 'Utility fair-use limit', text: 'Bills are fully included in the rent, subject to a €40/person monthly cap. This limit exists to encourage mindful use of electricity and water.' },
      { icon: '👤', title: 'Individual use only', text: 'The room is for the individual use of the tenant. We do not rent rooms to couples.' },
      { icon: '👥', title: 'Guests', text: 'Visitors are warmly welcome. Overnight guests may stay for up to 3 consecutive nights and notice the landlord of that.' },
      { icon: '🔓', title: 'No security deposit', text: 'No deposit is required to move in.' },
      { icon: '📅', title: 'Payment schedule', text: 'Rent is due on the first business day of the month preceding the rental period. In practice: on move-in you pay two months upfront; from then on you pay monthly and your final month is already covered.' },
    ],
    aboutTitle: 'About Us',
    noResultsTitle: 'No rooms found',
    noResultsText: 'Try adjusting your search — change the date or location.',
    clearSearch: 'Clear search',
    searchResults: n => `${n} room${n !== 1 ? 's' : ''} found`,
    nearAlcantara: 'Near Alcântara',
    nearRoma: 'Near Avenida de Roma / Entrecampos',
    mapIntro: 'Click the blue markers to explore each property.',
    seeRooms: 'See rooms',
    dayLabels: ['Su','Mo','Tu','We','Th','Fr','Sa'],
  },
  pt: {
    heroTitle: 'Encontra o teu quarto em Lisboa',
    heroSubtitle: 'Quartos para estudantes com contas incluídas',
    labelLocation: 'Localização',
    anyLocation: 'Qualquer localização',
    labelMoveIn: 'Data de entrada',
    searchBtn: 'Pesquisar',
    aboutLink: 'Sobre nós',
    locationsLink: 'Localizações',
    contactLink: 'Contacto',
    footerTagline: 'A ajudar estudantes a encontrar casa em Lisboa',
    footerContactTitle: 'Entra em contacto',
    allRooms: 'Todos os quartos',
    showMap: '🗺 Ver mapa',
    hideMap: '🗺 Ocultar mapa',
    floorLabel: 'Andar',
    commonAreas: 'Áreas comuns',
    billsTag: 'Contas incluídas',
    billsExclGasTag: 'Contas incl. (gás excluído)',
    availNow: 'Disponível agora',
    availFrom: d => `Disponível a partir de ${d}`,
    notAvailable: 'Indisponível',
    viewRoom: 'Ver quarto →',
    backToAll: '← Todos os quartos',
    perMonth: '/ mês',
    infoLocation: 'Localização',
    infoFloor: 'Andar',
    infoAvailFrom: 'Disponível a partir de',
    infoBills: 'Contas',
    whatsIncluded: 'O que está incluído',
    contactEmail: 'Enviar email',
    contactWA: 'WhatsApp',
    calTitle: 'Calendário de disponibilidade',
    calAvail: 'Disponível',
    calNotYet: 'Ainda não disponível',
    calUnavail: 'Indisponível',
    calPast: 'Passado',
    houseRulesTitle: 'Regras da casa',
    houseRules: [
      { icon: '🚭', title: 'Sem chamas abertas', text: 'Não é permitido o uso de velas nem fumar dentro do apartamento.' },
      { icon: '💡', title: 'Limite de consumo de utilidades', text: 'As contas estão totalmente incluídas na renda, sujeitas a um limite mensal de €40 por pessoa. Este limite existe para encorajar um consumo responsável de eletricidade e água.' },
      { icon: '👤', title: 'Uso individual', text: 'O quarto destina-se ao uso individual do inquilino. Não arrendamos quartos a casais.' },
      { icon: '👥', title: 'Visitas', text: 'As visitas são bem-vindas. As estadias de hóspedes estão limitadas a 3 noites consecutivas e o senhorio deve ser informado.' },
      { icon: '🔓', title: 'Sem caução', text: 'Não é exigida qualquer caução para a entrada.' },
      { icon: '📅', title: 'Pagamento', text: 'A renda é paga no primeiro dia útil do mês anterior ao mês a que respeita. Na prática: no primeiro mês paga-se o equivalente a dois meses; a partir daí paga-se mensalmente e o último mês já está coberto.' },
    ],
    aboutTitle: 'Sobre nós',
    noResultsTitle: 'Nenhum quarto encontrado',
    noResultsText: 'Tenta ajustar a pesquisa — muda a data ou a localização.',
    clearSearch: 'Limpar pesquisa',
    searchResults: n => `${n} quarto${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''}`,
    nearAlcantara: 'Perto de Alcântara',
    nearRoma: 'Perto da Avenida de Roma / Entrecampos',
    mapIntro: 'Clica nos marcadores azuis para explorar cada imóvel.',
    seeRooms: 'Ver quartos',
    dayLabels: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    aboutUsText: '',
  }
};

// ── Data ─────────────────────────────────────────────────
function getImagePaths(prefix, count) {
  const arr = [];
  for (let i = 1; i <= count; i++) arr.push(`Images/${prefix}${i}F.jpg`);
  return arr;
}
function getImagePaths2(prefix, count) {
  const arr = [];
  for (let i = 1; i <= count; i++) arr.push(`Images/${prefix}${i}F.jpeg`);
  return arr;
}

const data = {
  "avenida_de_roma": {
    name: { en: "Avenida de Roma / Entrecampos", pt: "Avenida de Roma / Entrecampos" },
    coords: [38.74651115662008, -9.143217726509699],
    floors: [
      {
        number: 0,
        commonDesc: { en: "Ground floor · 5 bedrooms · 1 Kitchen · 2 Bathrooms", pt: "Rés do chão · 5 quartos · 1 Cozinha · 2 Casas de banho" },
        commonPhotos: getImagePaths2("AR0AZC", 10),
        rooms: [
          { id: "2Q", code: "AR1A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 640,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR0A2Q1F.jpg`, photos: getImagePaths("AR0A2Q", 5),
            description: { en: "", pt: "" }, availableFrom: "01/01/2027", bookedFrom: "01/08/2026", bookedUntil: "01/01/2027" }
        ]
      },
      {
        number: 1,
        commonDesc: { en: "1st floor · 5 bedrooms · 1 Kitchen · 2 Bathrooms · 1 Living room", pt: "1.º Andar · 5 quartos · 1 Cozinha · 2 Casas de banho · 1 Sala" },
        commonPhotos: getImagePaths2("AR1AZC", 14),
        rooms: [
          { id: "1Q", code: "AR1A1Q", label: { en: "Room 1", pt: "Quarto 1" }, price: 550,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR1A1Q1F.jpg`, photos: getImagePaths("AR1A1Q", 2),
            description: { en: "", pt: "" }, availableFrom: "01/01/2027" },
          { id: "2Q", code: "AR1A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 650,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR1A2Q1F.jpg`, photos: getImagePaths("AR1A2Q", 8),
            description: { en: "", pt: "" }, availableFrom: "01/07/2026", bookedFrom: "01/09/2026", bookedUntil: "01/02/2027", note: { en: "Booked 01/09/2026 to 01/02/2027", pt: "Reservado 01/09/2026 a 01/02/2027" } },
          { id: "4Q", code: "AR1A4Q", label: { en: "Room 4", pt: "Quarto 4" }, price: 540,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR1A4Q1F.jpg`, photos: getImagePaths("AR1A4Q", 3),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" },
          { id: "5Q", code: "AR1A5Q", label: { en: "Room 5", pt: "Quarto 5" }, price: 520,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR1A5Q1F.jpg`, photos: getImagePaths("AR1A5Q", 4),
            description: { en: "", pt: "" }, availableFrom: "01/02/2027" }
        ]
      },
      {
        number: 2,
        commonDesc: { en: "2nd floor · 5 bedrooms · 1 Kitchen · 1 Bathroom · 1 Washroom", pt: "2.º Andar · 5 quartos · 1 Cozinha · 1 Casa de banho · 1 Lavabo" },
        commonPhotos: getImagePaths2("AR2AZC", 15),
        rooms: [
          { id: "2Q", code: "AR2A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 650,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR2A2Q1F.jpeg`, photos: getImagePaths2("AR2A2Q", 5),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" },
          { id: "3Q", code: "AR2A3Q", label: { en: "Room 3", pt: "Quarto 3" }, price: 580,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR2A3Q1F.jpg`, photos: getImagePaths("AR2A3Q", 6),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" },
          { id: "5Q", code: "AR2A5Q", label: { en: "Room 5", pt: "Quarto 5" }, price: 550,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR2A5Q1F.jpg`, photos: getImagePaths("AR2A5Q", 4),
            description: { en: "", pt: "" }, availableFrom: "01/07/2026", bookedFrom: "15/08/2026", bookedUntil: "01/02/2027" }
        ]
      },
      {
        number: 3,
        commonDesc: { en: "3rd floor · 4 bedrooms for students/young workers · 1 Kitchen · 1 Bathroom · 1 Washroom", pt: "3.º Andar · 4 quartos para estudantes ou jovens trabalhadores · 1 Cozinha · 1 Casa de banho · 1 Lavabo" },
        landlordNotice: { en: "The landlord has his private space in the attic and stays there frequently — the kitchen and bathroom are shared.", pt: "O senhorio tem o seu espaço privado no sótão e fica lá frequentemente — a cozinha e a casa de banho são partilhadas." },
        commonPhotos: getImagePaths("AR3AZC", 5),
        rooms: [
          { id: "1Q", code: "AR3A1Q", label: { en: "Room 1", pt: "Quarto 1" }, price: 540,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR3A1Q1F.jpeg`, photos: getImagePaths2("AR3A1Q", 5),
            description: { en: "", pt: "" }, availableFrom: "01/02/2027", bookedFrom: "01/08/2026", bookedUntil: "01/02/2027" },
          { id: "2Q", code: "AR3A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 640,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR3A2Q1F.jpg`, photos: getImagePaths("AR3A2Q", 6),
            description: { en: "", pt: "" }, availableFrom: "01/09/2026" },
          { id: "3Q", code: "AR3A3Q", label: { en: "Room 3", pt: "Quarto 3" }, price: 570,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR3A3Q1F.jpg`, photos: getImagePaths("AR3A3Q", 6),
            description: { en: "", pt: "" }, availableFrom: "01/07/2026" },
          { id: "4Q", code: "AR3A4Q", label: { en: "Room 4", pt: "Quarto 4" }, price: 550,
            bills: { en: "All bills included <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Todas as contas incluídas. <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AR3A4Q1F.jpeg`, photos: getImagePaths2("AR3A4Q", 3),
            description: { en: "", pt: "" }, availableFrom: "21/07/2026" }
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
        commonDesc: { en: "1st floor · 4 bedrooms · 1 Kitchen · 2 Bathrooms · 1 Living room · 1 Patio", pt: "1.º Andar · 4 quartos · 1 Cozinha · 2 Casas de banho · 1 Sala · 1 Pátio" },
        commonPhotos: getImagePaths("AL1AZC", 7),
        rooms: [
          { id: "1Q", code: "AL1A1Q", label: { en: "Room 1", pt: "Quarto 1" }, price: 600,
            bills: { en: "All bills included (excluding gas) <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Contas incluídas (gás excluído). <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AL1A1Q1F.jpg`, photos: getImagePaths("AL1A1Q", 6),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" },
          { id: "2Q", code: "AL1A2Q", label: { en: "Room 2", pt: "Quarto 2" }, price: 550,
            bills: { en: "All bills included (excluding gas) <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Contas incluídas (gás excluído). <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AL1A2Q1F.jpg`, photos: getImagePaths("AL1A2Q", 4),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" },
          { id: "3Q", code: "AL1A3Q", label: { en: "Room 3", pt: "Quarto 3" }, price: 500,
            bills: { en: "All bills included (excluding gas) <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Contas incluídas (gás excluído). <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AL1A3Q1F.jpg`, photos: getImagePaths("AL1A3Q", 4),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" },
          { id: "4Q", code: "AL1A4Q", label: { en: "Room 4", pt: "Quarto 4" }, price: 600,
            bills: { en: "All bills included (excluding gas) <br> The room includes a pillow, a duvet, bed sheets, and a towel. <br> It is lockable for your privacy.", pt: "Contas incluídas (gás excluído). <br> O quarto inclui uma almofada, um edredão, lençóis de cama e uma toalha. <br> Tem fechadura para sua privacidade." },
            thumb: `Images/AL1A4Q1F.jpg`, photos: getImagePaths("AL1A4Q", 5),
            description: { en: "", pt: "" }, availableFrom: "01/08/2026" }
        ]
      }
    ]
  }
};

const uniLocations = [
  { id: "ist",               name: { en: "IST", pt: "IST" },                                             coords: [38.7353, -9.1367],    color: "#f1c40f" },
  { id: "nova_ims",          name: { en: "NOVA IMS", pt: "NOVA IMS" },                                   coords: [38.732462, -9.159921], color: "#e74c3c" },
  { id: "iseg",              name: { en: "ISEG", pt: "ISEG" },                                           coords: [38.7099, -9.1556],    color: "#2ecc71" },
  { id: "nova_sbe",          name: { en: "NOVA SBE", pt: "NOVA SBE" },                                   coords: [38.678458, -9.325998], color: "#8e44ad" },
  { id: "iscte",             name: { en: "ISCTE-IUL", pt: "ISCTE-IUL" },                                 coords: [38.74889, -9.15389],  color: "#1abc9c" },
  { id: "fcul",              name: { en: "FCUL", pt: "FCUL" },                                           coords: [38.7563, -9.1564],    color: "#3498db" },
  { id: "fmul",              name: { en: "FMUL", pt: "FMUL" },                                           coords: [38.7463469531953, -9.161155141126354], color: "#e84393" },
  { id: "ucp_cat",           name: { en: "UCP", pt: "UCP" },                                             coords: [38.74893443978093, -9.164949511475601], color: "#a04000" },
  { id: "isa",               name: { en: "ISA", pt: "ISA" },                                             coords: [38.707804917614304, -9.18041829943341], color: "#ff6600" },
  { id: "universidade_europeia", name: { en: "Universidade Europeia", pt: "Universidade Europeia" },    coords: [38.70830724760151, -9.15303831282159], color: "#0077ff" },
  { id: "fmv",               name: { en: "FMV", pt: "FMV" },                                             coords: [38.71446887487367, -9.19299249625838], color: "#22aa55" },
  { id: "faul",              name: { en: "FAUL", pt: "FAUL" },                                           coords: [38.71339732566229, -9.193335818974514], color: "#993399" },
  { id: "lusofona",          name: { en: "Universidade Lusófona", pt: "Universidade Lusófona" },         coords: [38.758500744490426, -9.151230966127313], color: "#dd3333" }
];

// ── Utilities ─────────────────────────────────────────────
function parseDate(str) {
  if (!str) return null;
  const [d, m, y] = str.split('/').map(Number);
  const date = new Date(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  return date;
}

function parseDateInput(str) {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isUnavailable(room) {
  return room.label.en.toUpperCase().includes('NOT AVAILABLE');
}

function cleanLabel(room) {
  return room.label[lang].replace(/[-–]\s*(NOT AVAILABLE|INDISPONÍVEL)/gi, '').trim();
}

function getBillsTag(room) {
  return room.bills.en.includes('excluding gas')
    ? i18n[lang].billsExclGasTag
    : i18n[lang].billsTag;
}

function getAvailInfo(room) {
  if (isUnavailable(room)) return { text: i18n[lang].notAvailable, cls: 'unavail', pillCls: 'never' };
  const today = new Date(); today.setHours(0,0,0,0);
  const avail = parseDate(room.availableFrom);
  if (!avail || avail <= today) return { text: i18n[lang].availNow, cls: 'avail', pillCls: 'now' };
  const days = Math.ceil((avail - today) / 86400000);
  const cls = days <= 45 ? 'soon' : 'later';
  const pillCls = days <= 45 ? 'soon' : 'later';
  return { text: i18n[lang].availFrom(room.availableFrom), cls, pillCls };
}

function getAllRooms() {
  const rooms = [];
  Object.entries(data).forEach(([locKey, loc]) => {
    loc.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        rooms.push({ locKey, locName: loc.name, floorNum: floor.number, floorCommonDesc: floor.commonDesc, floorCommonPhotos: floor.commonPhotos, ...room });
      });
    });
  });
  return rooms;
}

function distKm(a, b) {
  const R = 6371;
  const [lat1, lon1] = a.map(d => d * Math.PI / 180);
  const [lat2, lon2] = b.map(d => d * Math.PI / 180);
  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = lat2 - lat1;
  return Math.sqrt(x * x + y * y) * R;
}

// ── Search State ──────────────────────────────────────────
let searchActive = false;
let searchLocKey = '';
let searchDate = null;
let mapVisible = false;
let leafletMap = null;

// ── Router ────────────────────────────────────────────────
const app = document.getElementById('app');
const hero = document.getElementById('hero');

window.addEventListener('hashchange', render);
window.addEventListener('load', render);

function render() {
  const h = location.hash.slice(1);
  const parts = h.split('/').filter(Boolean);

  if (parts.length === 0 || parts[0] === '') {
    hero.classList.remove('hidden');
    renderHome();
  } else if (parts[0] === 'room') {
    hero.classList.add('hidden');
    renderRoom(parts[1], +parts[2], parts[3]);
  } else if (parts[0] === 'about') {
    hero.classList.add('hidden');
    renderAbout();
  } else if (parts[0] === 'locations') {
    hero.classList.add('hidden');
    renderLocations();
  } else if (parts[0] === 'contact') {
    hero.classList.add('hidden');
    renderContact();
  } else {
    hero.classList.remove('hidden');
    renderHome();
  }
  applyTranslations();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Apply Translations ────────────────────────────────────
function applyTranslations() {
  document.querySelectorAll('.i18n-hero-title').forEach(el => el.textContent = i18n[lang].heroTitle);
  document.querySelectorAll('.i18n-hero-subtitle').forEach(el => el.textContent = i18n[lang].heroSubtitle);
  document.querySelectorAll('.i18n-label-location').forEach(el => el.textContent = i18n[lang].labelLocation);
  document.querySelectorAll('.i18n-label-movein').forEach(el => el.textContent = i18n[lang].labelMoveIn);
  document.querySelectorAll('.i18n-search-btn').forEach(el => el.textContent = i18n[lang].searchBtn);
  document.querySelectorAll('.i18n-about-link').forEach(el => el.textContent = i18n[lang].aboutLink);
  document.querySelectorAll('.i18n-locations-link').forEach(el => el.textContent = i18n[lang].locationsLink);
  document.querySelectorAll('.i18n-contact-link').forEach(el => el.textContent = i18n[lang].contactLink);
  document.querySelectorAll('.i18n-footer-tagline').forEach(el => el.textContent = i18n[lang].footerTagline);
  document.querySelectorAll('.i18n-footer-contact-title').forEach(el => el.textContent = i18n[lang].footerContactTitle);
  const anyOpt = document.querySelector('#search-location option[value=""]');
  if (anyOpt) anyOpt.textContent = i18n[lang].anyLocation;
}

// ── Render Home ───────────────────────────────────────────
function renderHome() {
  // Sync search inputs from state
  const locEl = document.getElementById('search-location');
  const dateEl = document.getElementById('search-date');
  if (locEl && searchLocKey) locEl.value = searchLocKey;

  const allRooms = getAllRooms();
  let rooms = allRooms;
  let titleText = i18n[lang].allRooms;
  let metaText = '';

  if (searchActive) {
    rooms = allRooms.filter(r => {
      if (isUnavailable(r)) return false;
      if (searchLocKey && r.locKey !== searchLocKey) return false;
      if (searchDate) {
        const avail = parseDate(r.availableFrom);
        if (avail && avail > searchDate) return false;
      }
      return true;
    });
    titleText = i18n[lang].searchResults(rooms.length);
    const parts = [];
    if (searchLocKey) parts.push(data[searchLocKey].name[lang]);
    if (searchDate) parts.push(searchDate.toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
    metaText = parts.join(' · ');
  }

  // Group by location (only for "all rooms" view)
  let html = '<div class="page-content">';



  // Section header
  html += `<div class="section-header">
    <div>
      <div class="section-title">${titleText}</div>
      ${metaText ? `<div class="section-meta">${metaText}</div>` : ''}
    </div>
    ${searchActive ? `<button class="clear-btn" id="btn-clear">${i18n[lang].clearSearch}</button>` : ''}
  </div>`;

  if (rooms.length === 0) {
    html += `<div class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3>${i18n[lang].noResultsTitle}</h3>
      <p>${i18n[lang].noResultsText}</p>
      <button class="btn-outline" id="btn-clear-nores">${i18n[lang].clearSearch}</button>
    </div>`;
  } else if (!searchActive) {
    // Group by location
    Object.entries(data).forEach(([locKey, loc]) => {
      const locRooms = rooms.filter(r => r.locKey === locKey);
      if (!locRooms.length) return;
      html += `<div class="loc-group">
        <div class="loc-group-header">
          <div class="loc-group-title">${loc.name[lang]}</div>
          <div class="loc-group-meta">${locRooms.filter(r => !isUnavailable(r)).length} ${lang === 'pt' ? 'quartos disponíveis' : 'rooms available'}</div>
        </div>
        <div class="rooms-grid">
          ${locRooms.map(r => renderCard(r)).join('')}
        </div>
      </div>`;
    });
  } else {
    html += `<div class="rooms-grid">${rooms.map(r => renderCard(r)).join('')}</div>`;
  }

  html += renderReviews();
  html += '</div>';
  leafletMap = null;
  app.innerHTML = html;

  // Bind events
  document.getElementById('btn-clear')?.addEventListener('click', clearSearch);
  document.getElementById('btn-clear-nores')?.addEventListener('click', clearSearch);

  // Star picker
  const picker = document.getElementById('star-picker');
  const ratingInput = document.getElementById('rating-input');
  if (picker) {
    const btns = picker.querySelectorAll('.star-btn');
    function setStars(val) {
      ratingInput.value = val;
      btns.forEach(b => b.classList.toggle('active', +b.dataset.val <= val));
    }
    setStars(5);
    btns.forEach(b => {
      b.addEventListener('click', () => setStars(+b.dataset.val));
      b.addEventListener('mouseenter', () => btns.forEach(b2 => b2.classList.toggle('hover', +b2.dataset.val <= +b.dataset.val)));
      b.addEventListener('mouseleave', () => btns.forEach(b2 => b2.classList.remove('hover')));
    });
  }

  requestAnimationFrame(() => requestAnimationFrame(initMap));
}

function renderCard(room) {
  const unavail = isUnavailable(room);
  const nav = `#/room/${room.locKey}/${room.floorNum}/${room.id}`;
  const avail = getAvailInfo(room);
  const bills = getBillsTag(room);
  const floorTxt = `${i18n[lang].floorLabel} ${room.floorNum} · ${room.locName[lang]}`;

  return `
    <div class="room-card" onclick="location.hash='${nav}'">
      <div class="room-card-img-wrap">
        <img src="${room.thumb}" alt="${cleanLabel(room)}" loading="lazy" onerror="this.style.opacity='0'" />
${unavail ? `<div class="card-unavail-overlay"><span class="card-unavail-label">${i18n[lang].notAvailable}</span></div>` : ''}
      </div>
      <div class="room-card-body">
        <div class="room-card-floor">${floorTxt}</div>
        <div class="room-card-name">${cleanLabel(room)}</div>
        <div class="room-card-price-row">
          <span class="room-card-price">€${room.price}</span>
          <span class="room-card-price-unit">${i18n[lang].perMonth}</span>
        </div>
        <div class="room-card-tags">
          <span class="tag tag-bills">${bills}</span>
          <span class="tag tag-${avail.cls}">${avail.text}</span>
          ${room.note ? `<span class="tag tag-note">${room.note[lang]}</span>` : ''}
        </div>
        <div class="room-card-cta">
          <button class="btn-view-room" onclick="event.stopPropagation();location.hash='${nav}'">${i18n[lang].viewRoom}</button>
        </div>
      </div>
    </div>`;
}

// ── Render Room Detail ────────────────────────────────────
function renderRoom(locKey, floorNum, roomId) {
  const loc = data[locKey];
  if (!loc) return (location.hash = '#/');
  const floor = loc.floors.find(f => f.number === floorNum);
  if (!floor) return (location.hash = '#/');
  const room = floor.rooms.find(r => r.id === roomId);
  if (!room) return (location.hash = '#/');

  const unavail = isUnavailable(room);
  const avail = getAvailInfo(room);
  const bills = getBillsTag(room);
  const billItems = room.bills[lang].split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);

  // Gallery
  const photos = room.photos || [];
  const mainPhoto = photos[0] || room.thumb;
  const roomSetKey = `room-${locKey}-${floorNum}-${roomId}`;
  photoSets.set(roomSetKey, photos.length ? photos : [mainPhoto]);

  let galleryHtml = `<div class="gallery" data-photos='${JSON.stringify(photos)}' data-set-key="${roomSetKey}" data-current="0">
    <div class="gallery-main">
      <img id="gallery-main-img" src="${mainPhoto}" alt="" />
      ${photos.length > 1 ? `
      <button class="gallery-arrow gallery-arrow-prev" aria-label="Previous photo">&#8249;</button>
      <button class="gallery-arrow gallery-arrow-next" aria-label="Next photo">&#8250;</button>
      ` : ''}
    </div>`;
  if (photos.length > 1) {
    galleryHtml += `<div class="gallery-thumbs">`;
    photos.forEach((src, i) => {
      galleryHtml += `<div class="gallery-thumb${i === 0 ? ' active' : ''}" data-src="${src}" data-index="${i}"><img src="${src}" alt="" loading="lazy" /></div>`;
    });
    galleryHtml += `</div>`;
  }
  galleryHtml += `</div>`;

  // Common area photos
  let commonHtml = '';
  if (floor.commonPhotos && floor.commonPhotos.length) {
    const commonSetKey = `common-${locKey}-${floorNum}`;
    photoSets.set(commonSetKey, floor.commonPhotos);
    commonHtml = `<div class="detail-card">
      <div class="detail-card-title">${i18n[lang].commonAreas} — ${i18n[lang].floorLabel} ${floorNum}</div>
      ${floor.commonDesc ? `<p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:14px;">${floor.commonDesc[lang]}</p>` : ''}
      ${floor.landlordNotice ? `<div class="landlord-notice">${floor.landlordNotice[lang]}</div>` : ''}
      <div class="common-photos-grid">
        ${floor.commonPhotos.map((src, i) => `<div class="common-photo" data-set-key="${commonSetKey}" data-modal-index="${i}"><img src="${src}" alt="" loading="lazy" /></div>`).join('')}
      </div>
    </div>`;
  }

  // Availability calendar
  const calHtml = `<div class="detail-card">
    <div class="detail-card-title">${i18n[lang].calTitle}</div>
    ${renderCalendar(room)}
  </div>`;

  // What's included
  const includesHtml = `<div class="detail-card">
    <div class="detail-card-title">${i18n[lang].whatsIncluded}</div>
    <ul class="includes-list">
      ${billItems.map(item => `<li>${item}</li>`).join('')}
    </ul>
  </div>`;

  // Info panel
  const infoPanelHtml = `<div class="info-panel">
    <div class="panel-price">€${room.price}</div>
    <div class="panel-price-unit">${i18n[lang].perMonth}</div>
    <div class="panel-divider"></div>
    <div class="info-row">
      <span class="info-label">${i18n[lang].infoAvailFrom}</span>
      <span class="info-value"><span class="avail-pill ${avail.pillCls}">${avail.text}</span></span>
    </div>
    <div class="info-row">
      <span class="info-label">${i18n[lang].infoBills}</span>
      <span class="info-value">${bills}</span>
    </div>
    <div class="info-row">
      <span class="info-label">${i18n[lang].infoLocation}</span>
      <span class="info-value">${loc.name[lang]}</span>
    </div>
    <div class="info-row">
      <span class="info-label">${i18n[lang].infoFloor}</span>
      <span class="info-value">${i18n[lang].floorLabel} ${floorNum}</span>
    </div>
    <div class="panel-divider"></div>
    ${unavail ? `<p style="font-size:0.85rem;color:var(--text-secondary);text-align:center;padding:8px 0;">${i18n[lang].notAvailable}</p>` : `
    <div class="contact-btns">
      <a class="btn-email" href="mailto:matildersbarros@gmail.com?subject=${encodeURIComponent(cleanLabel(room) + ' — ' + loc.name[lang])}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        ${i18n[lang].contactEmail}
      </a>
      <a class="btn-wa" href="https://wa.me/351924488081" target="_blank">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M5.14 0C2.298 0 0 2.252 0 5.038c0 .968.275 1.87.755 2.636L.265 10.5l2.938-.773A5.06 5.06 0 0 0 5.14 10.08c2.841 0 5.139-2.252 5.139-5.038C10.279 2.252 7.981 0 5.14 0z" transform="translate(6.5 5)"/></svg>
        ${i18n[lang].contactWA}
      </a>
    </div>`}
  </div>`;

  app.innerHTML = `
    <div class="room-detail-page">
      <div class="breadcrumb">
        <a href="#/">${i18n[lang].backToAll.replace('← ', '')}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${loc.name[lang]}</span>
        <span class="breadcrumb-sep">›</span>
        <span>${cleanLabel(room)}</span>
      </div>
      <div class="detail-top">
        <div>
          <div class="detail-title">${cleanLabel(room)}</div>
          <div class="detail-location">${loc.name[lang]} · ${i18n[lang].floorLabel} ${floorNum}</div>
        </div>
        <div class="detail-price-block">
          <div class="detail-price">€${room.price}</div>
          <div class="detail-price-unit">${i18n[lang].perMonth}</div>
        </div>
      </div>
      ${galleryHtml}
      <div class="detail-grid">
        <div class="detail-left">
          ${includesHtml}
          ${calHtml}
          ${renderHouseRules()}
          ${commonHtml}
        </div>
        ${infoPanelHtml}
      </div>
    </div>`;
}

// ── House Rules ───────────────────────────────────────────
function renderHouseRules() {
  const rules = i18n[lang].houseRules;
  return `<div class="detail-card">
    <div class="detail-card-title">${i18n[lang].houseRulesTitle}</div>
    <ul class="rules-list">
      ${rules.map(r => `
        <li class="rule-item">
          <span class="rule-icon">${r.icon}</span>
          <div>
            <div class="rule-title">${r.title}</div>
            <div class="rule-text">${r.text}</div>
          </div>
        </li>`).join('')}
    </ul>
  </div>`;
}

// ── Availability Calendar ─────────────────────────────────
function renderCalendar(room) {
  const unavail = isUnavailable(room);
  const availFrom = parseDate(room.availableFrom);
  const bookedFrom = room.bookedFrom ? parseDate(room.bookedFrom) : null;
  const bookedUntil = room.bookedUntil ? parseDate(room.bookedUntil) : null;
  const today = new Date(); today.setHours(0, 0, 0, 0);

  let html = `<div class="cal-legend">
    <div class="cal-legend-item"><div class="cal-dot dot-avail"></div>${lang === 'pt' ? 'Disponível' : 'Available'}</div>
    <div class="cal-legend-item"><div class="cal-dot dot-booked"></div>${lang === 'pt' ? 'Ocupado' : 'Booked'}</div>
    <div class="cal-legend-item"><div class="cal-dot dot-past"></div>${lang === 'pt' ? 'Passado' : 'Past'}</div>
  </div>
  <div class="calendars-row">`;

  for (let m = 0; m < 12; m++) {
    const d = new Date(today.getFullYear(), today.getMonth() + m, 1);
    html += renderMonth(d, availFrom, unavail, today, bookedFrom, bookedUntil);
  }
  html += '</div>';
  return html;
}

function renderMonth(monthDate, availFrom, unavail, today, bookedFrom, bookedUntil) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const monthName = monthDate.toLocaleString(lang === 'pt' ? 'pt-PT' : 'en-US', { month: 'long' });
  const monthLabel = monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + year;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const labels = i18n[lang].dayLabels;

  let html = `<div class="cal-month">
    <div class="cal-month-header">${monthLabel}</div>
    <div class="cal-grid">`;

  labels.forEach(l => { html += `<div class="cal-day-label">${l}</div>`; });
  for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    let cls = 'cal-day';
    if (date < today) {
      cls += ' past';
    } else if (unavail) {
      cls += ' booked';
    } else if (bookedFrom && bookedUntil && date >= bookedFrom && date < bookedUntil) {
      cls += ' booked';
    } else if (availFrom && date < availFrom) {
      cls += ' booked';
    } else {
      cls += ' avail';
    }
    html += `<div class="${cls}">${d}</div>`;
  }

  html += '</div></div>';
  return html;
}

// ── Render About ──────────────────────────────────────────
const aboutText = {
  en: `Hi! I'm Matilde, born and raised in Portugal and currently doing my Master's in Aerospace Engineering in Delft.

These rooms belong to my father, and I'm the one managing the rentals online, handling everything from enquiries to bookings so the process is smooth and transparent for everyone.

Before moving abroad, I spent three years living in one of these very rooms while studying at IST. I know what it means to arrive in a new city and need a place that feels like home, and that's exactly what we want to offer.

If you're looking for comfort, good vibes, and a place where your best stories might begin…
Welcome. 😊`,
  pt: `Olá! Sou a Matilde, sou de Portugal e estou atualmente a fazer o Mestrado em Engenharia Aeroespacial em Delft.

Estes quartos são do meu pai, e sou eu quem trata dos arrendamentos online, desde os contactos iniciais até à marcação, para que tudo seja simples e transparente.

Antes de vir para o estrangeiro, vivi três anos num destes quartos enquanto estudava no IST. Sei o que é chegar a uma cidade nova e precisar de um sítio que pareça casa, e é exatamente isso que queremos oferecer.

Se procuras conforto, boas vibes e um lugar onde possam começar algumas das tuas melhores histórias…
Bem-vindo(a). 😊`
};

function renderLocations() {
  const t = lang === 'pt';
  const locs = [
    {
      name: 'Avenida de Roma / Entrecampos',
      vibe: t ? 'Bairro estudantil e familiar' : 'Student & family neighbourhood',
      categories: t ? [
        { label: 'Transportes', items: [
          'Estações de metro de Entrecampos (linha Amarela) e Roma (linha Verde), 5 min a pé',
          'Estações de comboio de Entrecampos e Roma/Areeiro, 5 min a pé',
          'Várias paragens de autocarro na zona',
          'Estação GIRA de bicicletas elétricas mesmo à porta',
        ] },
        { label: 'Universidades', items: ['IST', 'ISCTE', 'FCUL', 'FMUL', 'NOVA IMS', 'UCP', 'Universidade Lusófona', 'Todas as faculdades da Universidade de Lisboa'] },
        { label: 'À volta', items: ['Campo Grande e Campo Pequeno por perto', 'Saldanha com comércio e restauração', 'Jardim Gulbenkian para estar ao ar livre', 'El Corte Inglés'] },
        { label: 'Ambiente', items: ['Bairro estudantil e familiar', 'Central, animado e seguro'] },
      ] : [
        { label: 'Transport', items: [
          'Entrecampos (Yellow line) and Roma (Green line) metro stations, 5 min walk',
          'Entrecampos and Roma/Areeiro train stations, 5 min walk',
          'Multiple bus stops in the area',
          'GIRA electric bike station on the doorstep',
        ] },
        { label: 'Universities', items: ['IST', 'ISCTE', 'FCUL', 'FMUL', 'NOVA IMS', 'UCP', 'Universidade Lusófona', 'All Universidade de Lisboa faculties'] },
        { label: 'Around you', items: ['Campo Grande and Campo Pequeno nearby', 'Saldanha shopping and dining', 'Jardim Gulbenkian for outdoor time', 'El Corte Inglés'] },
        { label: 'Vibe', items: ['Student & family neighbourhood', 'Central, lively and safe'] },
      ]
    },
    {
      name: 'Alcântara',
      vibe: t ? 'Bairro trendy e ribeirinho' : 'Trendy riverside neighbourhood',
      categories: t ? [
        { label: 'Transportes', items: ['Estação de Alcântara-Terra (linha de Cascais), 8 min a pé', 'Estação de Alcântara-Mar, 10 min a pé', 'Várias paragens de autocarro na zona'] },
        { label: 'Universidades', items: ['ISEG', 'NOVA SBE', 'ISA', 'FMV', 'FAUL', 'NOVA FCT', 'Universidade Europeia de Lisboa', 'ISCSP'] },
        { label: 'À volta', items: ['LX Factory, mercado, restaurantes e bares', 'Vistas para a Ponte 25 de Abril e o Rio Tejo', 'Escapadinhas fáceis a Cascais e Estoril ao fim de semana', 'Jardim das Necessidades e zonas verdes'] },
        { label: 'Ambiente', items: ['Bairro trendy e ribeirinho', 'Moderno, criativo e cheio de vida'] },
      ] : [
        { label: 'Transport', items: ['Alcântara-Terra train station (Cascais line), 8 min walk', 'Alcântara-Mar train station, 10 min walk', 'Multiple bus stops in the area'] },
        { label: 'Universities', items: ['ISEG', 'NOVA SBE', 'ISA', 'FMV', 'FAUL', 'NOVA FCT', 'Universidade Europeia de Lisboa', 'ISCSP'] },
        { label: 'Around you', items: ['LX Factory, market, restaurants and bars', 'Views of the 25 de Abril bridge and the Tagus river', 'Easy weekend trips to Cascais and Estoril beaches', 'Jardim das Necessidades and green spaces'] },
        { label: 'Vibe', items: ['Trendy riverside neighbourhood', 'Modern, creative and buzzing'] },
      ]
    }
  ];

  app.innerHTML = `
    <div class="page-content">
      <div class="about-header">
        <h1 class="about-title">${t ? 'Escolhe a tua localização' : 'Choose your location'}</h1>
      </div>
      <div class="map-section"><div id="map" class="visible"></div></div>
      <div class="locations-page-grid">
        ${locs.map(loc => `
          <div class="locations-page-card">
            <div class="locations-page-name">${loc.name}</div>
            ${loc.categories.map(cat => `
              <div class="loc-category">
                <div class="loc-category-label">${cat.label}</div>
                <ul class="location-perk-list">
                  ${cat.items.map(item => `<li><span>${item}</span></li>`).join('')}
                </ul>
              </div>
            `).join('')}

          </div>
        `).join('')}
      </div>
    </div>`;
  leafletMap = null;
  requestAnimationFrame(() => requestAnimationFrame(initMap));
}

function renderContact() {
  const t = lang === 'pt';
  app.innerHTML = `
    <div class="contact-page">
      <h2>${t ? 'Contacto' : 'Contact'}</h2>
      <p class="contact-intro">${t ? 'Tens alguma questão sobre os quartos ou queres fazer uma reserva? Fala connosco por e-mail ou WhatsApp.' : 'Have a question about the rooms or want to book? Reach out by email or WhatsApp.'}</p>
      <div class="contact-options">
        <a href="mailto:matildersbarros@gmail.com" class="contact-card">
          <div class="contact-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <div class="contact-card-body">
            <div class="contact-card-label">Email</div>
            <div class="contact-card-value">matildersbarros@gmail.com</div>
          </div>
        </a>
        <a href="https://wa.me/351924488081" target="_blank" class="contact-card contact-card-wa">
          <div class="contact-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </div>
          <div class="contact-card-body">
            <div class="contact-card-label">WhatsApp</div>
            <div class="contact-card-value">+351 924 488 081</div>
          </div>
        </a>
      </div>
    </div>`;
}

function renderAbout() {
  app.innerHTML = `
    <div class="about-page">
      <h2>${i18n[lang].aboutTitle}</h2>
      <p>${aboutText[lang]}</p>
    </div>`;
}

// ── Reviews ───────────────────────────────────────────────
// To display real reviews once received, add objects to this array:
// { name, age, country:{en,pt}, property:{en,pt}, stars:1-5, text:{en,pt} }
const reviews = [
  {
    name: 'Marin',
    age: 22,
    country: { en: 'France', pt: 'França' },
    property: { en: 'Avenida de Roma / Entrecampos', pt: 'Avenida de Roma / Entrecampos' },
    stars: 5,
    text: { en: 'The room was amazing: very spacious and really clean! The location is great and very convenient, especially for public transportation. The landlord is very trustworthy and always willing to help. If you need anything, he\'s quick to respond and happy to assist. That was really appreciated!', pt: 'The room was amazing: very spacious and really clean! The location is great and very convenient, especially for public transportation. The landlord is very trustworthy and always willing to help. If you need anything, he\'s quick to respond and happy to assist. That was really appreciated!' }
  },
  {
    name: 'Rein',
    age: 24,
    country: { en: 'Tanzania', pt: 'Tanzânia' },
    property: { en: 'Avenida de Roma / Entrecampos', pt: 'Avenida de Roma / Entrecampos' },
    stars: 5,
    text: { en: 'I had a nice stay, the room was nice, large with a cute balcony 🌟 most of all the Landlord was very nice. Inteally enjoyed my stay 🔥 Highly recommended', pt: 'I had a nice stay, the room was nice, large with a cute balcony 🌟 most of all the Landlord was very nice. Inteally enjoyed my stay 🔥 Highly recommended' }
  }
];

// Replace the placeholder below with your Formspree form ID.
// Sign up free at https://formspree.io → New Form → copy the ID (e.g. "xpwzkyrd").
const FORMSPREE_ID = 'mdarwdbp';

function renderReviews() {
  const t = lang === 'pt';
  const avatarColors = ['#2563EB','#059669','#D97706','#7C3AED','#DC2626','#0891B2'];

  let reviewsHtml = '';
  if (reviews.length === 0) {
    reviewsHtml = `<div class="reviews-empty">
      <div class="reviews-empty-icon">💬</div>
      <p>${t ? 'Ainda não há avaliações. Sê o primeiro a partilhar a tua experiência!' : 'No reviews yet. Be the first to share your experience!'}</p>
    </div>`;
  } else {
    reviewsHtml = `<div class="reviews-grid">${reviews.map((r, i) => {
      const initials = r.name.split(' ').map(w => w[0]).join('').slice(0, 2);
      const stars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
      const color = avatarColors[i % avatarColors.length];
      return `<div class="review-card">
        <div class="review-stars">${stars}</div>
        <p class="review-text">"${r.text[lang]}"</p>
        <div class="review-author">
          <div class="review-avatar" style="background:${color}">${initials}</div>
          <div>
            <div class="review-name">${r.name}, ${r.age}</div>
            <div class="review-meta">${r.country[lang]} · ${r.property[lang]}</div>
          </div>
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  const useFormspree = FORMSPREE_ID !== 'YOUR_FORMSPREE_ID';
  const formAction = useFormspree
    ? `https://formspree.io/f/${FORMSPREE_ID}`
    : '#';
  const formOnSubmit = useFormspree ? '' : `onsubmit="event.preventDefault();this.querySelector('.review-form-success').classList.remove('hidden');this.querySelector('.review-form-fields').classList.add('hidden')"`;

  return `
    <div class="reviews-section">
      <div class="reviews-header">
        <div class="section-title">${t ? 'O que dizem os nossos inquilinos' : 'What our tenants say'}</div>
      </div>
      ${reviewsHtml}
      <div class="review-form-wrap">
        <div class="review-form-title">${t ? 'Deixa a tua avaliação' : 'Leave a review'}</div>
        <form class="review-form" action="${formAction}" method="POST" ${formOnSubmit}>
          <div class="review-form-fields">
            <div class="review-form-row">
              <div class="review-form-field">
                <label>${t ? 'Nome' : 'Name'}</label>
                <input type="text" name="name" required placeholder="${t ? 'O teu nome' : 'Your name'}" />
              </div>
              <div class="review-form-field review-form-field--sm">
                <label>${t ? 'Idade' : 'Age'}</label>
                <input type="number" name="age" min="16" max="99" required placeholder="22" />
              </div>
              <div class="review-form-field">
                <label>${t ? 'País' : 'Country'}</label>
                <input type="text" name="country" required placeholder="${t ? 'O teu país' : 'Your country'}" />
              </div>
            </div>
            <div class="review-form-row">
              <div class="review-form-field">
                <label>${t ? 'Apartamento' : 'Property'}</label>
                <select name="property">
                  <option value="Avenida de Roma">Avenida de Roma / Entrecampos</option>
                  <option value="Alcântara">Alcântara</option>
                </select>
              </div>
              <div class="review-form-field">
                <label>${t ? 'Classificação' : 'Rating'}</label>
                <div class="review-star-picker" id="star-picker">
                  ${[1,2,3,4,5].map(n => `<button type="button" class="star-btn" data-val="${n}">★</button>`).join('')}
                  <input type="hidden" name="rating" id="rating-input" value="5" />
                </div>
              </div>
            </div>
            <div class="review-form-field review-form-field--full">
              <label>${t ? 'A tua experiência' : 'Your experience'}</label>
              <textarea name="message" rows="4" required placeholder="${t ? 'Conta-nos a tua experiência...' : 'Tell us about your stay...'}" maxlength="600"></textarea>
            </div>
            <button type="submit" class="review-submit-btn">${t ? 'Enviar avaliação' : 'Submit review'}</button>
          </div>
          <div class="review-form-success hidden">
            <div class="review-success-icon">✓</div>
            <p>${t ? 'Obrigada pela tua avaliação! Iremos publicá-la em breve.' : 'Thanks for your review! We\'ll publish it shortly.'}</p>
          </div>
        </form>
      </div>
    </div>`;
}

// ── Lisbon Metro Lines ────────────────────────────────────

// ── Map ───────────────────────────────────────────────────

function initMap() {
  if (leafletMap) { leafletMap.invalidateSize(); return; }
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  leafletMap = L.map('map', {
    center: [38.726, -9.155], zoom: 12,
    scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false,
    maxBounds: L.latLngBounds([38.60, -9.30], [38.82, -9.00]),
    maxBoundsViscosity: 0.9
  });

  // Base layer — CartoDB Voyager (cleaner, labels metro stations)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(leafletMap);

  const propertyLabels = {
    avenida_de_roma: 'Avenida de Roma / Entrecampos',
    alcantara: 'Alcântara',
  };

  const pinIcon = L.divIcon({
    className: '',
    html: `<div class="map-pin-wrap"><div class="map-pin-dot"></div></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  Object.entries(data).forEach(([key, loc]) => {
    const label = propertyLabels[key] || loc.name[lang];
    L.marker(loc.coords, { icon: pinIcon })
      .addTo(leafletMap)
      .bindTooltip(label, { permanent: true, direction: 'right', className: 'property-label' });
  });
}

// ── Search ────────────────────────────────────────────────
function clearSearch() {
  searchActive = false;
  searchLocKey = '';
  searchDate = null;
  const locEl = document.getElementById('search-location');
  const dateEl = document.getElementById('search-date');
  if (locEl) locEl.value = '';
  if (dateEl) dateEl.value = '';
  renderHome();
}

document.getElementById('btn-search')?.addEventListener('click', () => {
  const locEl = document.getElementById('search-location');
  const dateEl = document.getElementById('search-date');
  searchLocKey = locEl ? locEl.value : '';
  searchDate = dateEl ? parseDateInput(dateEl.value) : null;
  searchActive = !!(searchLocKey || searchDate);
  location.hash = '#/';
  renderHome();
});

// ── Language Switching ────────────────────────────────────
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    lang = btn.id === 'lang-pt' ? 'pt' : 'en';
    langBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    leafletMap = null; // reset map so it re-renders with new lang
    render();
  });
});

// ── Mobile Nav ────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
mobileMenuBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('hidden') === false;
  mobileMenuBtn.classList.toggle('open', open);
});
mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    mobileMenuBtn.classList.remove('open');
  });
});

// ── Gallery Navigation ────────────────────────────────────
function setGalleryPhoto(gallery, photos, index) {
  gallery.dataset.current = index;
  const src = photos[index];
  const mainImg = gallery.querySelector('#gallery-main-img');
  if (mainImg) { mainImg.src = src; mainImg.closest('.gallery-main').dataset.modalSrc = src; }
  gallery.querySelectorAll('.gallery-thumb').forEach(t => {
    t.classList.toggle('active', parseInt(t.dataset.index, 10) === index);
  });
  // scroll active thumb into view
  const activeThumb = gallery.querySelector(`.gallery-thumb.active`);
  activeThumb?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

// ── Global Click Handler ──────────────────────────────────
document.addEventListener('click', e => {
  // Gallery arrows
  const arrow = e.target.closest('.gallery-arrow');
  if (arrow) {
    const gallery = arrow.closest('.gallery');
    const photos = JSON.parse(gallery.dataset.photos);
    let current = parseInt(gallery.dataset.current, 10);
    if (arrow.classList.contains('gallery-arrow-next')) {
      current = (current + 1) % photos.length;
    } else {
      current = (current - 1 + photos.length) % photos.length;
    }
    setGalleryPhoto(gallery, photos, current);
    return;
  }

  // Gallery thumbnail
  const thumb = e.target.closest('.gallery-thumb');
  if (thumb) {
    const gallery = thumb.closest('.gallery');
    const photos = JSON.parse(gallery.dataset.photos);
    const index = parseInt(thumb.dataset.index, 10);
    setGalleryPhoto(gallery, photos, index);
    return;
  }

  // Modal arrows
  if (e.target.closest('.modal-nav-prev')) { modalStep(-1); return; }
  if (e.target.closest('.modal-nav-next')) { modalStep(+1); return; }

  // Gallery main → open modal at current index
  const galleryMain = e.target.closest('.gallery-main');
  if (galleryMain) {
    const gallery = galleryMain.closest('.gallery');
    const setKey  = gallery?.dataset.setKey;
    const index   = parseInt(gallery?.dataset.current || '0', 10);
    openModal(galleryMain.querySelector('img')?.src, setKey, index);
    return;
  }

  // Common photo → open modal
  const commonPhoto = e.target.closest('.common-photo');
  if (commonPhoto) {
    const setKey = commonPhoto.dataset.setKey;
    const index  = parseInt(commonPhoto.dataset.modalIndex || '0', 10);
    openModal(commonPhoto.querySelector('img')?.src, setKey, index);
    return;
  }

  // Modal close
  if (e.target.matches('.close-btn') || e.target.matches('.modal-backdrop')) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (!imageModal || imageModal.classList.contains('hidden')) return;
  if (e.key === 'Escape')     closeModal();
  if (e.key === 'ArrowRight') modalStep(+1);
  if (e.key === 'ArrowLeft')  modalStep(-1);
});

// ── Image Modal ───────────────────────────────────────────
const imageModal  = document.getElementById('image-modal');
const modalImg    = document.getElementById('modal-img');
const modalPrev   = document.querySelector('.modal-nav-prev');
const modalNext   = document.querySelector('.modal-nav-next');
const modalCounter= document.getElementById('modal-counter');

const photoSets = new Map();   // key → string[]
let modalSet   = [];
let modalIndex = 0;

function openModal(src, setKey, index) {
  if (!src || !imageModal) return;
  modalSet   = photoSets.get(setKey) || [src];
  modalIndex = (index !== undefined) ? index : Math.max(0, modalSet.indexOf(src));
  updateModalUI();
  imageModal.classList.remove('hidden');
}

function updateModalUI() {
  modalImg.src = modalSet[modalIndex] || '';
  const multi = modalSet.length > 1;
  modalPrev?.classList.toggle('visible', multi);
  modalNext?.classList.toggle('visible', multi);
  if (modalCounter) {
    modalCounter.textContent = multi ? `${modalIndex + 1} / ${modalSet.length}` : '';
  }
}

function closeModal() {
  imageModal?.classList.add('hidden');
}

function modalStep(dir) {
  modalIndex = (modalIndex + dir + modalSet.length) % modalSet.length;
  updateModalUI();
}
