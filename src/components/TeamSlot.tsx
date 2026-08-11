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
    <div ref={setNodeRef} className="pokemon-slot">
      {pokemon ? (
        <PokemonCard pokemon={pokemon} onRemove={onRemove} />
      ) : (
        <span>Slot vazio</span>
      )}
    </div>
  );
}

export default TeamSlot;
