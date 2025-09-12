document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSignUpIn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // evita que se recargue la página

      // Obtenemos los inputs
      const inputs = form.querySelectorAll("input[required]");
      let allFilled = true;

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          allFilled = false;
          input.style.border = "2px solid red"; // marcar en rojo si está vacío
        } else {
          input.style.border = "none"; // limpiar borde si está bien
        }
      });

      if (allFilled) {
        alert("✅ Formulario enviado correctamente");
        window.location.href = "inicio.html"; // redirigir al inicio
      } else {
        alert("⚠️ Por favor, complete todos los campos.");
      }
    });
  }
});
