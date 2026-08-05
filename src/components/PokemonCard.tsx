import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <div>
        {pokemon.types.map((tipo) => (
          <span key={tipo}> {tipo}</span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
