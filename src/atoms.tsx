import { atom, selector } from "recoil";
import { getPokemonId } from "./methods";
import { Result } from "./types/Common";
import { Pokemon, PokemonDetail } from "./types/Pokemon";
export const API_REST = "https://pokeapi.co/api/v2";

// ReadAndWrite Atoms
export const pokemonFilters = atom({
  key: "pokemonFilters",
  default: {
    offset: 0,
    limit: 10
  }
});

export const pokemonAtom = atom<Pokemon[]>({
  key: "pokemonList",
  default: []
});

// ReadOnly Atom
const filterParams = selector({
  key: "filters",
  get: ({ get }) => {
    const { offset, limit } = get(pokemonFilters);
    return `?limit=${limit}&offset=${offset}`;
  }
});

// Async Atom
export const pokemonDataFetch = selector<Pokemon[]>({
  key: "dataList",
  get: async ({ get }) => {
    const response = await fetch(`${API_REST}/pokemon${get(filterParams)}`);
    const data = await response.json();
    return data.results.map((result: Result) => ({
      id: getPokemonId(result.url),
      ...result
    }));
  }
});

// Pokemon

export const currentPokemonId = atom<number>({
  key: "currentPokemon",
  default: 0
});

export const currentPokemonFetch = selector({
  key: "pokemonInfo",
  get: async ({ get }) => {
    if (get(currentPokemonId) === 0) return;
    const response = await fetch(
      `${API_REST}/pokemon/${get(currentPokemonId)}`
    );
    const data = await response.json();
    return data as PokemonDetail;
  }
});

// Ability

export const currentAbilityId = atom<number>({
  key: "currentAbility",
  default: 0
});

export const currentAbilityFetch = selector({
  key: "abilityInfo",
  get: async ({ get }) => {
    if (get(currentAbilityId) === 0) return;
    const response = await fetch(
      `${API_REST}/ability/${get(currentAbilityId)}`
    );
    const data = await response.json();
    return data;
  }
});
