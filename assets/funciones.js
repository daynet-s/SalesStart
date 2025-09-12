document.addEventListener("DOMContentLoaded", function() {
  const h2 = document.querySelector("h2");
  const text = h2.textContent;
  h2.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "wave";
    span.textContent = text[i];
    span.style.animationDelay = (i * 0.1) + "s";
    h2.appendChild(span);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todas las tarjetas
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const gameId = card.getAttribute("data-id");
      if (gameId) {
        // Redirigir con el id en la URL
        window.location.href = `detalle.html?id=${gameId}`;
      }
    });
  });

  // Input de búsqueda
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");

  const keywordMap = {
    "cs2": ["counter", "strike", "cs2", "counter-strike", "counter-strike 2"],
    "silksong": ["hollow", "knight", "silksong", "hollow knight", "hollow knight silksong"],
    "daybydaylight": ["dead", "daylight", "day by daylight", "dbd", "daybydaylight"],
    "hollowknight": ["hollow", "knight", "hollow knight"],
    "gta5": ["gta", "grand theft auto", "grand theft auto 5", "gta5"],
    "rust": ["rust"],
    "2k26": ["nba", "2k26", "nba 2k26"],
    "borderlands4": ["borderlands", "borderlands 4", "bl4"]
  };

  function findGameId(value) {
    value = value.toLowerCase().trim();
    for (const [gameId, keywords] of Object.entries(keywordMap)) {
      for (const kw of keywords) {
        if (value.includes(kw)) return gameId;
      }
    }
    return null;
  }

  // Evento del botón
  searchButton.addEventListener("click", () => {
    const value = searchInput.value;
    if (value) {
      const gameId = findGameId(value);
      if (gameId) {
        window.location.href = `detalle.html?id=${gameId}`;
      } else {
        alert("Juego no encontrado");
      }
    }
  });

  // Enter en input también dispara búsqueda
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchButton.click();
  });

});

