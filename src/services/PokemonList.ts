export async function testeFetch() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const dados = await response.json();
  console.log(dados);
}

export async function fetchPokemonNames() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  const guardarNomes = data.results;
  return guardarNomes;
}

export async function fetchPokemonDetails(
  lista: { name: string; url: string }[],
) {
  const resultados = await Promise.all(
    lista.map(async (item) => {
      const response = await fetch(item.url); // 1. fetch usando item.url
      const dados = await response.json(); // 2. await .json() pra pegar o objeto completo
      return {
        id: dados.id,
        name: dados.name,
        types: dados.types.map((t: { type: { name: string } }) => t.type.name),
        image: dados.sprites.front_default,
      }; // 3. montar e devolver só {id, name, types, image} — usando o interface Pokemon
    }),
  );

  return resultados;
}
