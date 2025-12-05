import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getGameById, addToWishlist } from "../services/gameService"; 
const FX = {
  "EE.UU (USD)": 1,
  "Chile (CLP)": 950,
  "Europa (EUR)": 0.92,
};

export default function Detail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados UI
  const [selectedStoreName, setSelectedStoreName] = useState("");
  const [country, setCountry] = useState("EE.UU (USD)");
  
  // Modal y Toast
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [toast, setToast] = useState(null);

  // --- EFECTO DE CARGA Y LIMPIEZA ---
  useEffect(() => {
    // 1. Resetear estados al cambiar de juego 
    setGame(null);
    setSelectedStoreName("");
    setLoading(true);

    async function load() {
      if (!slug) return;
      
      try {
        const data = await getGameById(slug);
        
        if (data) {
          setGame(data);
          // Seleccionar primera tienda por defecto si existe
          if (data.precios?.length > 0) {
            setSelectedStoreName(data.precios[0].tienda?.nombre);
          }
        } else {
          console.error("Juego no encontrado (slug inválido)");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]); // Se ejecuta cada vez que cambia la URL

  // --- LÓGICA DE PRECIOS ---
  const { currentPrice, currentLink } = useMemo(() => {
    if (!game || !game.precios) return { currentPrice: 0, currentLink: "#" };
    
    const priceObj = game.precios.find(p => p.tienda?.nombre === selectedStoreName);
    return {
      currentPrice: priceObj ? priceObj.precio : 0,
      currentLink: priceObj ? priceObj.urlProducto : "#"
    };
  }, [game, selectedStoreName]);

  const priceFmt = useMemo(() => {
    const fx = FX[country] ?? 1;
    const amount = currentPrice * fx;
    if (currentPrice === 0) return "Free";
    const currency = country.includes("CLP") ? "CLP" : country.includes("EUR") ? "EUR" : "USD";
    return new Intl.NumberFormat("es-CL", { style: "currency", currency }).format(amount);
  }, [currentPrice, country]);

  // --- MANEJO DE WISHLIST ---
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const confirmAddToWishlist = async () => {
    try {
      await addToWishlist(game.id, noteText);
      setShowModal(false);
      setNoteText("");
      showToast("¡Juego guardado en tu colección!", "success");
    } catch (error) {
      setShowModal(false);
      // Mensaje de error amigable
      const msg = typeof error === 'string' ? error : (error.message || "Error al guardar");
      showToast(msg.includes("ya existe") ? "¡Ya tienes este juego guardado!" : "Error al guardar", "error");
    }
  };

  // --- RENDERIZADO ---
  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-info" style={{width: "3rem", height: "3rem"}} role="status"></div>
    </div>
  );
  
  if (!game) return (
    <div className="container-narrow text-center mt-5">
        <h2 className="text-light mb-3 text-neon-cyan">GAME OVER</h2>
        <p className="text-secondary mb-4">No pudimos encontrar el juego que buscas.</p>
        <button onClick={() => navigate('/')} className="btn btn-outline-neon px-4 rounded-pill">
            Volver al Catálogo
        </button>
    </div>
  );

  return (
    <main className="container-narrow position-relative">
      {/* Toast */}
      {toast && (
        <div className="custom-toast" style={{ borderColor: toast.type === 'error' ? '#ff4d6d' : 'var(--brand-2)' }}>
          <i className={`bi ${toast.type === 'error' ? 'bi-x-circle-fill text-danger' : 'bi-check-circle-fill text-success'}`}></i>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ zIndex: 2000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="card glass p-4 shadow-lg animate-pop" style={{ width: "400px", border: "1px solid var(--brand-2)" }}>
            <div className="text-center mb-2">
                <i className="bi bi-bookmark-heart fs-1" style={{color: "var(--brand-2)"}}></i>
            </div>
            <h4 className="text-center text-light fw-bold mb-3">Agregar a Colección</h4>
            
            <textarea 
              className="form-control bg-dark text-light mb-4" 
              rows="3" 
              placeholder="Nota personal (opcional)..."
              value={noteText} 
              onChange={(e) => setNoteText(e.target.value)}
              style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px" }}
            />
            
            <div className="d-flex gap-2">
              <button onClick={() => setShowModal(false)} className="btn btn-outline-light w-50 rounded-pill">Cancelar</button>
              <button onClick={confirmAddToWishlist} className="btn btn-gradient w-50 rounded-pill fw-bold">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="row g-4 align-items-start">
        <div className="col-12 col-lg-8">
          <div className="card glass shadow-lg rounded-4 p-3 p-md-4 detail-card">
            
            <div className="ratio ratio-16x9 rounded-4 overflow-hidden mb-3 shadow-lg">
              <img src={game.detail || "/assets/img/placeholder.jpg"} alt={game.nombre} className="w-100 h-100 object-fit-cover" />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="h2 fw-extrabold text-white m-0 text-truncate pe-3" 
                    style={{ textShadow: "0 0 15px rgba(159, 107, 255, 0.5)", maxWidth: "85%" }}>
                  {game.nombre}
                </h1>
                
                {/* BOTÓN NEÓN PERSONALIZADO */}
                <button 
                    onClick={() => setShowModal(true)} 
                    className="btn-action-neon"
                    title="Agregar a Deseados"
                >
                    <i className="bi bi-heart-fill"></i>
                </button>
            </div>

            <div className="row gy-3 text-light border-top border-white border-opacity-10 pt-3">
              <div className="col-sm-6">
                <div className="text-secondary small text-uppercase ls-1 mb-1">Desarrollador</div>
                <div className="fs-5 fw-medium text-truncate" title={game.desarrollador?.nombre}>
                    {game.desarrollador?.nombre || "N/A"}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="text-secondary small text-uppercase ls-1 mb-1">Editor</div>
                <div className="fs-5 fw-medium text-truncate" title={game.editor?.nombre}>
                    {game.editor?.nombre || "N/A"}
                </div>
              </div>
              <div className="col-sm-6">
                 <div className="text-secondary small text-uppercase ls-1 mb-1">Jugadores Online</div>
                 <div className="text-info fw-bold d-flex align-items-center">
                    <i className="bi bi-person-fill me-2"></i>
                    {game.jugadoresActivos ? game.jugadoresActivos.toLocaleString() : "N/A"}
                 </div>
              </div>
              <div className="col-sm-6">
                 <div className="text-secondary small text-uppercase ls-1 mb-1">Mejor Precio</div>
                 <div className="text-success fw-bold fs-4">{priceFmt}</div>
              </div>
            </div>

            <a href={currentLink} target="_blank" rel="noreferrer" 
               className="btn btn-gradient btn-lg w-100 mt-4 py-3 rounded-pill shadow-lg text-uppercase fw-bold ls-1 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-cart-fill" /> Ir a {selectedStoreName || "Tienda"}
            </a>
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="col-12 col-lg-4">
          <div className="card glass shadow-lg rounded-4 p-4 sticky-top" style={{ top: 100 }}>
            <h5 className="text-neon-cyan mb-4 text-center">
                <i className="bi bi-tags-fill me-2"></i>COMPARADOR
            </h5>
            
            <div className="mb-3">
                <label className="text-secondary small mb-1 fw-semibold">TIENDA DISPONIBLE</label>
                <select className="form-select bg-dark text-white border-secondary shadow-sm"
                  value={selectedStoreName} onChange={e => setSelectedStoreName(e.target.value)}>
                  {game.precios?.map((p, idx) => (
                    <option key={idx} value={p.tienda?.nombre}>
                      {p.tienda?.nombre} - ${p.precio}
                    </option>
                  ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="text-secondary small mb-1 fw-semibold">MONEDA</label>
                <select className="form-select bg-dark text-white border-secondary shadow-sm"
                  value={country} onChange={e => setCountry(e.target.value)}>
                  {Object.keys(FX).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            
            <div className="alert alert-info bg-opacity-10 border-info text-info small mt-4 d-flex align-items-start gap-2">
                <i className="bi bi-info-circle-fill fs-5 mt-1"></i>
                <div>Precios actualizados en tiempo real desde CheapShark & Steam API.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}