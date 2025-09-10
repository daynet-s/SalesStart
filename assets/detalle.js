// Simulación de base de datos
const gamesData = {
  "cs2": {
    id: "001",
    name: "Counter-Strike 2",
    dev: "Valve",
    pub: "Valve",
    release: "27 Septiembre 2023",
    players: "1,230,000",
    price: 0,
    cover: "assets/img/icons/cs2.jpg"
  },
  "silksong": {
    id: "002",
    name: "Hollow Knight: Silksong",
    dev: "Team Cherry",
    pub: "Team Cherry",
    release: "Por anunciar",
    players: "N/A",
    price: 10.99,
    cover: "assets/img/icons/silksong.jpg"
  },
  "gta5": {
    id: "003",
    name: "Grand Theft Auto V",
    dev: "Rockstar North",
    pub: "Rockstar Games",
    release: "14 Abril 2015",
    players: "150,000",
    price: 13.99,
    cover: "assets/img/icons/gta5.jpg"
  }
};

// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Cargar juego
document.addEventListener("DOMContentLoaded", () => {
  const gameId = getQueryParam("id"); // ?id=cs2
  const game = gamesData[gameId];

  if (!game) {
    document.querySelector(".detalle-container").innerHTML = "<p style='color:red'>Juego no encontrado</p>";
    return;
  }

  // Rellenar datos
  document.getElementById("game-cover").src = game.cover;
  document.getElementById("game-title").textContent = game.name;
  document.getElementById("game-id").textContent = game.id;
  document.getElementById("game-dev").textContent = game.dev;
  document.getElementById("game-pub").textContent = game.pub;
  document.getElementById("game-release").textContent = game.release;
  document.getElementById("game-players").textContent = game.players;
  document.getElementById("game-price").textContent = game.price === 0 ? "FREE" : game.price.toFixed(2);

  // Filtros - país (cambio de moneda simulado)
  document.getElementById("country").addEventListener("change", e => {
    const country = e.target.value;
    let price = game.price;

    if (price === 0) {
      document.getElementById("game-price").textContent = "FREE";
      return;
    }

    switch (country) {
      case "cl": price = price * 950; break; // CLP
      case "mx": price = price * 18; break;  // MXN
      case "es": price = price * 0.92; break; // EUR
      default: break; // USD
    }

    document.getElementById("game-price").textContent = price.toFixed(2);
  });
});
