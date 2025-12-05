import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// ===== Bootstrap =====
// 1️⃣ CSS primero (estructura visual)
import "bootstrap/dist/css/bootstrap.min.css";
// 2️⃣ JS bundle (incluye Popper para tooltips y menús)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// 3️⃣ Íconos (opcional pero útil)
import "bootstrap-icons/font/bootstrap-icons.css";

// ===== Tus estilos propios (van al final para sobrescribir Bootstrap) =====
import "./index.css";

// ===== Render raíz =====
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
