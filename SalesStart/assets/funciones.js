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