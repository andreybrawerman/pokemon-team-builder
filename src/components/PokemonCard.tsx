import { useDraggable } from "@dnd-kit/core";
import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onAdd?: () => void;
  onRemove?: () => void;
}

function PokemonCard({ pokemon, onAdd, onRemove }: PokemonCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: pokemon.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="pokemon-card"
      {...(onAdd ? listeners : {})}
      {...(onAdd ? attributes : {})}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>

      <div>
        {pokemon.types.map((tipo) => (
          <span key={tipo}>{tipo}</span>
        ))}
      </div>

      {onAdd && <button onClick={onAdd}>Adicionar ao Time</button>}
      {onRemove && <button onClick={onRemove}>Remover do Time</button>}
    </div>
  );
}

export default PokemonCard;
