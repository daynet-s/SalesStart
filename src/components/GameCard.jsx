import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  // 1. Buscamos precio en Steam dentro del array 'precios'
  const steamPrice = game.precios?.find(p => p.tienda?.nombre === "Steam")?.precio;
  // 2. Si no hay Steam, tomamos el primero que haya
  const anyPrice = game.precios?.[0]?.precio;
  
  const finalPrice = steamPrice ?? anyPrice ?? 0;

  const priceDisplay =
    finalPrice === 0
      ? "Free"
      : new Intl.NumberFormat("es-CL", { style: "currency", currency: "USD" })
          .format(finalPrice);

  return (
    <Link
      // (Usa el ID):
      to={`/detalle/${game.id}`}
      className="game-card card bg-transparent border-0 text-decoration-none text-light"
    >
      <div className="card-body">
        <div className="flex-grow-1">
          <h5 className="title mb-1">{game.nombre}</h5>
          <div className="price">{priceDisplay}</div>
        </div>
        {/* Backend envía la URL en 'detail'. Si es null, ponemos placeholder */}
        <img 
          src={game.detail || "https://placehold.co/400x200?text=No+Image"} 
          alt={game.nombre} 
          onError={(e) => e.target.src = "https://placehold.co/400x200?text=Error"}
        />
      </div>
    </Link>
  );
}