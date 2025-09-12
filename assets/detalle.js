const gamesData = {
  "cs2": {
    id: "001",
    name: "Counter-Strike 2",
    dev: "Valve",
    pub: "Valve",
    release: "27 Septiembre 2023",
    players: "1,230,000",
    detail: "assets/img/detail/cs2.jpg",
    platforms: ["Steam"],
    versions: ["Standard"],
    prices: { "steam": 0 },
    links: { "steam": "https://store.steampowered.com/app/730/CounterStrike_2/" }
  },
  "silksong": {
    id: "002",
    name: "Hollow Knight: Silksong",
    dev: "Team Cherry",
    pub: "Team Cherry",
    release: "04 Septiembre 2025",
    players: "215,345",
    detail: "assets/img/detail/silksong.jpg",
    platforms: ["Steam", "Playstation", "Switch"],
    versions: ["Standard", "Deluxe"],
    prices: { "steam": 10.500, "playstation": 19.99, "switch": 10.500 },
    links: {
      "steam": "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/",
      "playstation": "https://www.playstation.com/es-cl/games/hollow-knight-silksong/",
      "switch": "https://www.nintendo.com/es-cl/store/products/hollow-knight-silksong-switch/"
    }
  },
  "daybydaylight": {
    id: "003",
    name: "Dead by Daylight",
    dev: "Behaviour Interactive",
    pub: "Behaviour Interactive",
    release: "14 Junio 2016",
    players: "50,000",
    detail: "assets/img/detail/daybydaylight.jpeg",
    platforms: ["Steam", "PlayStation", "Xbox"],
    versions: ["Standard", "Ultimate"],
    prices: { "steam": 11.994, "playstation": 29.99, "xbox": 17.994 },
    links: {
      "steam": "https://store.steampowered.com/app/381210/Dead_by_Daylight/",
      "playstation": "https://www.playstation.com/es-cl/games/dead-by-daylight/",
      "xbox": "https://www.xbox.com/es-cl/games/store/dead-by-daylight/c0n22p73qz60"
    }
  },
  "hollowknight": {
    id: "004",
    name: "Hollow Knight",
    dev: "Team Cherry",
    pub: "Team Cherry",
    release: "24 Febrero 2017",
    players: "40,000",
    detail: "assets/img/detail/hollow.jpg",
    platforms: ["Steam", "Playstation", "Switch"],
    versions: ["Standard"],
    prices: { "steam": 8.300, "playstation": 14.99, "switch": 15.00 },
    links: {
      "steam": "https://store.steampowered.com/app/367520/Hollow_Knight/",
      "playstation": "https://www.playstation.com/es-cl/games/hollow-knight-voidheart-edition/",
      "switch": "https://www.nintendo.com/store/products/hollow-knight-switch/"
    }
  },
  "gta5": {
    id: "005",
    name: "Grand Theft Auto V",
    dev: "Rockstar North",
    pub: "Rockstar Games",
    release: "14 Abril 2015",
    players: "150,000",
    detail: "assets/img/detail/gta5.jpg",
    platforms: ["Steam","Epic Games", "Xbox", "PlayStation"],
    versions: ["Standard", "Deluxe", "Ultimate"],
    prices: { "steam": 26.990, "epic games": 13.495, "xbox": 13.495, "playstation": 9.99},
    links: {
      "steam": "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/",
      "epic games": "https://store.epicgames.com/es-ES/p/grand-theft-auto-v",
      "xbox": "https://www.xbox.com/es-cl/games/store/grand-theft-auto-v-enhanced-pc/9nxfx68znkk0",
      "playstation": "https://store.playstation.com/es-cl/product/UP1004-PPSA03420_00-GTAOSTANDALONE01"
    }
  },
  "rust": {
    id: "006",
    name: "Rust",
    dev: "Facepunch Studios",
    pub: "Facepunch Studios",
    release: "8 Febrero 2018",
    players: "70,000",
    detail: "assets/img/detail/rust.jpg",
    platforms: ["Steam"],
    versions: ["Standard"],
    prices: { "steam": 0 },
    links: { "steam": "https://store.steampowered.com/app/252490/Rust/" }
  },
  "2k26": {
    id: "007",
    name: "NBA 2K26",
    dev: "Visual Concepts",
    pub: "2K Games",
    release: "2026",
    players: "TBA",
    detail: "assets/img/detail/2k26.jpg",
    platforms: ["Steam", "Xbox", "PlayStation"],
    versions: ["Standard", "Deluxe", "Ultimate"],
    prices: { "steam": 69.99, "xbox": 69.99, "playstation": 69.99 },
    links: {
      "steam": "https://store.steampowered.com/app/3472040/NBA_2K26/",
      "xbox": "https://www.xbox.com/es-cl/games/store/nba-2k26-edici%C3%B3n-est%C3%A1ndar/9pj2rvrc0l1x",
      "playstation": "https://store.playstation.com/es-cl/product/UP1001-PPSA28420_00-NBA2K26000000000"
    }
  },
  "borderlands4": {
    id: "008",
    name: "Borderlands 4",
    dev: "Gearbox Software",
    pub: "2K Games",
    release: "11 Septiembre 2025",
    players: "TBA",
    detail: "assets/img/detail/borderlands4.jpg",
    platforms: ["Steam", "Epic Games", "Xbox", "PlayStation"],
    versions: ["Standard", "Deluxe"],
    prices: { "steam": 62.99, "epic games": 62.99, "xbox": 62.99, "playstation": 69.99 },
    links: {
      "steam": "https://store.steampowered.com/app/1285190/Borderlands_4/",
      "epic games": "https://store.epicgames.com/es-ES/p/borderlands-4",
      "xbox": "https://www.xbox.com/es-cl/games/store/borderlands-4/9mx6hkf5647g",
      "playstation": "https://store.playstation.com/es-cl/product/UP1001-PPSA01494_00-000000000000OAK2"
    }
  }
};

// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Cargar juego
document.addEventListener("DOMContentLoaded", () => {
  const gameId = getQueryParam("id");
  const game = gamesData[gameId];

  if (!game) {
    document.querySelector(".detalle-container").innerHTML = "<p style='color:red'>Juego no encontrado</p>";
    return;
  }

  // Rellenar datos
  document.getElementById("game-cover").src = game.detail;
  document.getElementById("game-title").textContent = game.name;
  document.getElementById("game-id").textContent = game.id;
  document.getElementById("game-dev").textContent = game.dev;
  document.getElementById("game-pub").textContent = game.pub;
  document.getElementById("game-release").textContent = game.release;
  document.getElementById("game-players").textContent = game.players;

  const platformSelect = document.getElementById("platform");
  const editionSelect = document.getElementById("edition");

  // Llenar plataformas
  platformSelect.innerHTML = "";
  game.platforms.forEach(p => {
    const option = document.createElement("option");
    option.value = p.toLowerCase();
    option.textContent = p;
    platformSelect.appendChild(option);
  });

  // Llenar versiones
  editionSelect.innerHTML = "";
  game.versions.forEach(v => {
    const option = document.createElement("option");
    option.value = v.toLowerCase();
    option.textContent = v;
    editionSelect.appendChild(option);
  });

  // Contenedor del link
  const linkContainer = document.getElementById("game-link");
  linkContainer.innerHTML = "";

  function updatePriceAndLink() {
    const platform = platformSelect.value;
    let price = game.prices?.[platform] ?? 0;

    if (price === 0) {
      document.getElementById("game-price").textContent = "FREE";
    } else {
      let countryPrice = price;
      const country = document.getElementById("country").value;
      switch(country){
        case "cl": countryPrice *= 950; break;
        case "mx": countryPrice *= 18; break;
        case "es": countryPrice *= 0.92; break;
      }
      document.getElementById("game-price").textContent = countryPrice.toFixed(2);
    }

    // Actualizar link
    const storeLink = game.links?.[platform];
    if (storeLink) {
      linkContainer.innerHTML = `<a href="${storeLink}" target="_blank">Ir a la tienda (${platformSelect.options[platformSelect.selectedIndex].text})</a>`;
    } else {
      linkContainer.innerHTML = "";
    }
  }

  platformSelect.addEventListener("change", updatePriceAndLink);
  document.getElementById("country").addEventListener("change", updatePriceAndLink);

  // Inicializar precio y link
  updatePriceAndLink();
});
