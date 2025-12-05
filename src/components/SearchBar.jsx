import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  // Esta función maneja el cambio y busca al mismo tiempo
  const handleInput = (e) => {
    const val = e.target.value;
    setQ(val);
    onSearch?.(val); // Llama a la búsqueda inmediatamente
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar, aunque ya buscó al escribir
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-3"
      style={{ maxWidth: 560, position: "relative" }}
    >
      <input
        type="text"
        className="form-control form-control-lg bg-dark text-light rounded-pill ps-3 pe-5 shadow-sm"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        placeholder="Buscar videojuego..."
        value={q}
        onChange={handleInput} 
      />

      <button
        type="submit"
        className="position-absolute end-0 top-50 translate-middle-y me-2 btn text-light"
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-search fs-5"></i>
      </button>
    </form>
  );
}
