import { useState } from "react";
import { fetchPokemonNames } from "./services/PokemonList";
import { fetchPokemonDetails } from "./services/PokemonList";
import PokemonCard from "./components/PokemonCard";
import TeamSlot from "./components/TeamSlot";
import type { Pokemon } from "./types/pokemon";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [time, setTime] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [busca, setBusca] = useState("");
  const [tiposFiltrados, setTiposFiltrados] = useState<string[]>([]);

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
    const novoTime = time.map((slot, index) =>
      index === indiceVazio ? pokemon : slot,
    );
    setTime(novoTime);
  };

  const removerDoTime = (pokemonId: number) => {
    const novoTime = time.map((slot) =>
      slot !== null && slot.id === pokemonId ? null : slot,
    );
    setTime(novoTime);
  };

  const inventarioDisponivel = pokemons.filter(
    (pokemon) => !time.some((slot) => slot !== null && slot.id === pokemon.id),
  );

  const toggleTipo = (tipo: string) => {
    const jaEstaSelecionado = tiposFiltrados.some((t) => t === tipo);
    setTiposFiltrados(
      jaEstaSelecionado
        ? tiposFiltrados.filter((t) => t !== tipo)
        : [...tiposFiltrados, tipo],
    );
  };

  const pokemonsFiltrados = inventarioDisponivel.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busca.toLowerCase()),
  );

  const todosOsTiposComRepeticao = pokemons.flatMap((p) => p.types);
  const tiposUnicos = [...new Set(todosOsTiposComRepeticao)];

  const pokemonsComFiltroDeTipo = pokemonsFiltrados.filter(
    (pokemon) =>
      tiposFiltrados.length === 0 ||
      pokemon.types.some((tipo) => tiposFiltrados.includes(tipo)),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) return;

    const draggedPokemon = pokemons.find((p) => p.id === Number(active.id));
    const targetIndex = Number(over.id);

    if (draggedPokemon) {
      const novoTime = [...time];
      novoTime[targetIndex] = draggedPokemon;
      setTime(novoTime);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-2xl font-black tracking-wide text-amber-400">
          TEAM BUILDER
        </h1>
      </header>

      <div className="flex flex-wrap items-center gap-3 px-6 py-4">
        <button
          onClick={handleFetchPokemons}
          className="rounded bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
        >
          Buscar Pokémons
        </button>

        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-400"
        />
      </div>

      <div className="flex flex-wrap gap-2 px-6 pb-4">
        {tiposUnicos.map((tipo) => (
          <label
            key={tipo}
            className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs capitalize text-zinc-300"
          >
            <input
              type="checkbox"
              checked={tiposFiltrados.some((t) => t === tipo)}
              onChange={() => toggleTipo(tipo)}
              className="accent-amber-400"
            />
            {tipo}
          </label>
        ))}
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 px-6 pb-10 lg:grid-cols-[2fr_1fr]">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Inventário
            </h2>
            <div className="flex flex-wrap gap-3">
              {pokemonsComFiltroDeTipo.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onAdd={() => adicionarNoTime(pokemon)}
                />
              ))}
            </div>
          </section>

          <section className="sticky top-4 mx-auto self-start">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Seu Time ({time.filter((s) => s !== null).length}/6)
            </h2>
            <div className="grid grid-cols-[repeat(3,9rem)] gap-2">
              {time.map((pokemon, index) => (
                <TeamSlot
                  key={index}
                  index={index}
                  pokemon={pokemon}
                  onRemove={
                    pokemon ? () => removerDoTime(pokemon.id) : undefined
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </DndContext>
    </div>
  );
}

export default App;
