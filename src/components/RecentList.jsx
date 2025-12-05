import { Link } from "react-router-dom";

export default function RecentList({ items = [] }) {
  return (
    <div>
      {items.map((it) => {
        const pVal = it.precios?.find(p => p.tienda?.nombre === "Steam")?.precio ?? it.precios?.[0]?.precio ?? 0;
        
        return (
          <Link
            key={it.id}
            to={`/detalle/${encodeURIComponent(it.id)}`}
            className="recent-item"
          >
            <img src={it.detail || "https://placehold.co/100?text=Game"} alt={it.nombre} />
            <div className="flex-grow-1">
              <div className="t">{it.nombre}</div>
              <div className="p">
                {pVal === 0
                  ? "Free"
                  : new Intl.NumberFormat("es-CL", {
                      style: "currency",
                      currency: "USD",
                    }).format(pVal)}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}