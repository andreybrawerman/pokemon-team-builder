# Pokémon Team Builder

Monte seu time de Pokémon arrastando cards do inventário para os slots do time — ou clicando, se preferir. Um projeto de portfólio construído do zero para praticar fetch assíncrono, tipagem em TypeScript, gerenciamento de estado em React e drag-and-drop.

## Funcionalidades

- **Inventário completo** — busca os 151 Pokémon da primeira geração via [PokéAPI](https://pokeapi.co/), com nome, sprite e tipos.
- **Time de até 6 slots** — adicione Pokémon por clique ou arrastando; remova a qualquer momento.
- **Drag-and-drop** — arraste um card do inventário direto para um slot do time, com feedback visual ao passar por cima de um slot vazio.
- **Busca por nome** — filtra o inventário em tempo real.
- **Filtro por tipo** — checkboxes para um ou mais tipos ao mesmo tempo (lógica "OU": mostra quem tem pelo menos um dos tipos marcados).
- **Sem duplicação** — um Pokémon que já está no time some automaticamente do inventário.

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@dnd-kit](https://dndkit.com/) — drag-and-drop
- [PokéAPI](https://pokeapi.co/) — dados dos Pokémon

## Rodando localmente

```bash
git clone https://github.com/SEU-USUARIO/pokemon-team-builder.git
cd pokemon-team-builder
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Estrutura do projeto

```
src/
├── components/
│   ├── PokemonCard.tsx   # card individual, arrastável no inventário
│   └── TeamSlot.tsx      # slot do time, área de soltar (droppable)
├── services/
│   └── PokemonList.ts    # fetch e transformação dos dados da PokéAPI
├── types/
│   └── pokemon.ts        # tipos TypeScript compartilhados
└── App.tsx               # estado global, filtros e layout
```
