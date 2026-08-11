import { useState } from "react";
import "./App.css";
import { fetchPokemonNames } from "./services/PokemonList";
import { fetchPokemonDetails } from "./services/PokemonList";
import PokemonCard from "./components/PokemonCard";
import type { Pokemon } from "./types/pokemon";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import TeamSlot from "./components/TeamSlot";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [time, setTime] = useState<(Pokemon | null)[]>(Array(6).fill(null));

  const handleFetchPokemons = async () => {
    const data = await fetchPokemonNames();
    const detalhes = await fetchPokemonDetails(data);
    setPokemons(detalhes);
  };

  const adicionarNoTime = (pokemon: Pokemon) => {
    const indiceVazio = time.findIndex((slot) => slot === null);

    if (indiceVazio === -1) {
      alert("Seu time já está cheio!");
      return;
    }

    const novoTime = time.map((slot, index) => {
      if (index === indiceVazio) {
        return pokemon;
      }
      return slot;
    });

    setTime(novoTime);
  };

  const removerDoTime = (pokemonId: number) => {
    const novoTime = time.map((slot) => {
      if (slot !== null && slot.id === pokemonId) {
        return null;
      }
      return slot;
    });
    setTime(novoTime);
  };

  const inventarioDisponivel = pokemons.filter((pokemon) => {
    return !time.some((slot) => slot !== null && slot.id === pokemon.id);
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over === null) {
      return;
    }

    const draggedPokemon = pokemons.find(
      (pokemon) => pokemon.id === Number(active.id),
    );
    const targetIndex = Number(over.id);

    if (draggedPokemon) {
      const novoTime = [...time];
      novoTime[targetIndex] = draggedPokemon;
      setTime(novoTime);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <>
      <button onClick={handleFetchPokemons}>Buscar Pokémons</button>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <section id="center">
          {inventarioDisponivel.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onAdd={() => adicionarNoTime(pokemon)}
            />
          ))}
        </section>

        <section id="team">
          {time.map((pokemon, index) => (
            <TeamSlot
              key={index}
              index={index}
              pokemon={pokemon}
              onRemove={pokemon ? () => removerDoTime(pokemon.id) : undefined}
            />
          ))}
        </section>
      </DndContext>
    </>
  );
}

export default App;
