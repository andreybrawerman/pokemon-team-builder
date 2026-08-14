import { useDroppable } from "@dnd-kit/core";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../types/pokemon";

interface TeamSlotProps {
  index: number;
  pokemon: Pokemon | null;
  onRemove?: () => void;
}

function TeamSlot({ index, pokemon, onRemove }: TeamSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: index,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-44 w-36 items-center justify-center rounded-lg transition-colors ${
        pokemon
          ? ""
          : isOver
            ? "border-2 border-dashed border-amber-400 bg-amber-400/10"
            : "border-2 border-dashed border-zinc-800 bg-zinc-900/40"
      }`}
    >
      {pokemon ? (
        <PokemonCard pokemon={pokemon} onRemove={onRemove} />
      ) : (
        <span className="text-xs text-zinc-600">Slot vazio</span>
      )}
    </div>
  );
}

export default TeamSlot;
