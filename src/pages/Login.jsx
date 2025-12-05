// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", pass: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.pass) {
      setError("Completa todos los campos antes de continuar");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Por favor ingresa un correo electrónico válido");
      return;
    }

    setError("");
    localStorage.setItem("session", JSON.stringify({ email: form.email }));
    nav("/");
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card glass shadow-lg rounded-4 p-4">
        <h1 className="mb-3 fw-bold text-center text-glow">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className={`form-control bg-dark text-light border-0 rounded-pill px-3 py-2 ${
                error.includes("correo") ? "is-invalid" : ""
              }`}
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="pass"
              className={`form-control bg-dark text-light border-0 rounded-pill px-3 py-2 ${
                error && !form.pass ? "is-invalid" : ""
              }`}
              placeholder="********"
              value={form.pass}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center rounded-3">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-neon w-100 mb-3">
            Iniciar sesión
          </button>

          <button
            type="button"
            className="btn btn-outline-neon w-100"
            onClick={() => nav("/registro")}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
