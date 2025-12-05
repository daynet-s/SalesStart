import GameCard from "./GameCard";

export default function GameList({ games=[] }){
  if (!games.length) {
    return <p className="text-center text-secondary m-0">No hay resultados.</p>;
  }
  return (
    <div className="d-flex flex-column gap-3">
      {games.map(g => <GameCard key={g.slug} game={g} />)}
    </div>
  );
}
