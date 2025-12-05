import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import GameList from "../components/GameList";
import RecentList from "../components/RecentList";
import { getAllGames, syncGames } from "../services/gameService";

export default function Home() {
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20); // Límite inicial

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getAllGames();
    
    // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
    // 1. Filtramos los que tienen precio > 0
    const paidGames = data.filter(g => {
        const p = g.precios?.[0]?.precio || 0;
        return p > 0;
    });

  
    paidGames.sort((a, b) => {
        if (a.detail && !b.detail) return -1;
        if (!a.detail && b.detail) return 1;
        return b.id - a.id; // Luego por ID descendente (más nuevos)
    });

    setAll(paidGames);
    setFiltered(paidGames);
    setLoading(false);
  };

  const handleSync = async () => {
    if(!confirm("⚠️ ¿Sincronizar con APIs externas?")) return;
    setLoading(true);
    try {
      const msg = await syncGames();
      alert(msg);
      await loadData();
    } catch (e) {
      alert("Error en sincronización.");
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (term) => {
    const q = term.trim().toLowerCase();
    if (!q) {
      setFiltered(all);
      return;
    }
    const result = all.filter(
      (g) =>
        g.nombre.toLowerCase().includes(q) ||
        (g.desarrollador?.nombre && g.desarrollador.nombre.toLowerCase().includes(q))
    );
    setFiltered(result);
    setVisibleCount(20); 
  };

  const recentSorted = all.slice(0, 3);
  
  const visibleGames = filtered.slice(0, visibleCount);

  return (
    <main className="container-narrow">
      <div className="text-center mt-3 mb-4">
        <h1 className="wave-title mb-2">¡¡Bienvenido a SalesStart!!</h1>
        <p className="wave-subtitle">
          Comparador de precios Multi-Tienda (Steam, Epic, GOG)
        </p>
        
        <button onClick={handleSync} className="btn btn-sm btn-outline-light mt-2 opacity-50 hover-opacity-100 transition">
          <i className="bi bi-arrow-repeat me-1"></i> Sincronizar (Admin)
        </button>
      </div>

      <SearchBar onSearch={onSearch} />

      {loading ? (
        <div className="text-center text-light mt-5">
          <div className="spinner-border text-info" role="status"></div>
          <p className="mt-2">Cargando catálogo...</p>
        </div>
      ) : (
        <div className="row g-4 mt-2">
          {/* Panel izquierdo */}
          <div className="col-12 col-lg-4">
            <div className="card glass rounded-4 shadow-lg sticky-top" style={{ top: '20px', zIndex: 1 }}>
              <div className="card-body">
                <h3 className="card-title fw-bold mb-3 text-center text-light">
                  <i className="bi bi-fire text-warning me-2"></i>Destacados
                </h3>
                <RecentList items={recentSorted} />
              </div>
            </div>
          </div>

          {/* Lista de juegos */}
          <div className="col-12 col-lg-8">
            <div className="card glass games-panel rounded-4 shadow-lg p-3">
              <div className="d-flex align-items-center mb-3 ms-2">
                <i className="bi bi-controller fs-3 me-2" style={{color: "var(--brand-2)"}}></i>
                <h4 className="m-0 fw-bold text-neon-cyan">
                  CATÁLOGO DE OFERTAS <span className="opacity-50 fs-6 ms-2">({filtered.length})</span>
                </h4>
              </div>
              
              <GameList games={visibleGames} />
              
              {/* Botón Ver Más */}
              {visibleCount < filtered.length && (
                <div className="text-center mt-4">
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 20)}
                        className="btn btn-outline-neon px-5 rounded-pill"
                    >
                        Ver más juegos
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}