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

  // --- Búsqueda ---
  const searchInput = document.querySelector(".search-bar input");
  const searchBtn = document.querySelector(".search-bar button");

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", () => {
      const value = searchInput.value.trim().toLowerCase();
      if (value) {
        // Buscar coincidencia básica con los ids
        // (ejemplo: "counter-strike 2" -> "cs2")
        let gameId = null;
        if (value.includes("counter")) gameId = "cs2";
        else if (value.includes("silksong")) gameId = "silksong";
        else if (value.includes("gta")) gameId = "gta5";

        if (gameId) {
          window.location.href = `detalle.html?id=${gameId}`;
        } else {
          alert("Juego no encontrado");
        }
      }
    });
  }
});

