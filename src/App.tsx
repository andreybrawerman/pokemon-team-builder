import { useState } from "react";
import "./App.css";
import { fetchPokemonNames } from "./services/PokemonList";
import { fetchPokemonDetails } from "./services/PokemonList";
import PokemonCard from "./components/PokemonCard";
import type { Pokemon } from "./types/pokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [time, setTime] = useState<(Pokemon | null)[]>(Array(6).fill(null));

  const handleFetchPokemons = async () => {
    const data = await fetchPokemonNames();
    const detalhes = await fetchPokemonDetails(data);
    setPokemons(detalhes);
  };

  return (
    <>
      <button onClick={handleFetchPokemons}>Buscar Pokémons</button>

      <section id="center">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>

      <section id="team">
        {time.map((pokemon, index) => (
          <div key={index} className="pokemon-slot">
            {pokemon ? (
              <PokemonCard pokemon={pokemon} />
            ) : (
              <span>Slot vazio</span>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
