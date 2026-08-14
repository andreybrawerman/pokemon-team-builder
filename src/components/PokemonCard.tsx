import { useDraggable } from "@dnd-kit/core";
import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onAdd?: () => void;
  onRemove?: () => void;
}

const corPorTipo: Record<string, string> = {
  fire: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  water: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  grass: "bg-green-500/20 text-green-300 border-green-500/40",
  electric: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  psychic: "bg-pink-500/20 text-pink-300 border-pink-500/40",
  ice: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  dragon: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
  normal: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  fighting: "bg-red-600/20 text-red-300 border-red-600/40",
  poison: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  ground: "bg-amber-700/20 text-amber-400 border-amber-700/40",
  flying: "bg-sky-500/20 text-sky-300 border-sky-500/40",
  bug: "bg-lime-500/20 text-lime-300 border-lime-500/40",
  rock: "bg-stone-500/20 text-stone-300 border-stone-500/40",
  ghost: "bg-violet-600/20 text-violet-300 border-violet-600/40",
};
const corPadrao = "bg-zinc-500/20 text-zinc-300 border-zinc-500/40";

function PokemonCard({ pokemon, onAdd, onRemove }: PokemonCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: pokemon.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(onAdd ? listeners : {})}
      {...(onAdd ? attributes : {})}
      className="flex h-44 w-36 flex-col items-center justify-between gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-center shadow-sm transition-colors hover:border-amber-400/40"
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="h-16 w-16 object-contain"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "data:image/svg+xml;utf8," +
            encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#27272a" stroke="#facc15" stroke-width="2"/><text x="32" y="40" font-size="24" text-anchor="middle" fill="#facc15">?</text></svg>',
            );
        }}
      />

      <h3 className="text-sm font-semibold capitalize text-zinc-100">
        {pokemon.name}
      </h3>

      <div className="flex flex-nowrap justify-center gap-1">
        {pokemon.types.map((tipo) => (
          <span
            key={tipo}
            className={`whitespace-nowrap rounded border px-1 py-0.5 text-[9px] uppercase tracking-wide ${
              corPorTipo[tipo] ?? corPadrao
            }`}
          >
            {tipo}
          </span>
        ))}
      </div>

      {onAdd && (
        <button
          onClick={onAdd}
          className="mt-1 w-full rounded bg-amber-400 py-1 text-xs font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
        >
          Adicionar
        </button>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="mt-1 w-full rounded border border-red-500/40 py-1 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
        >
          Remover
        </button>
      )}
    </div>
  );
}

export default PokemonCard;
