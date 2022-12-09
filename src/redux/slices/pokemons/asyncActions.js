import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchAll",
  async function () {
    const responce = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000`
    ).then((res) => res.json());
    return responce;
  }
);

export const fetchPokemonsWithTypes = createAsyncThunk(
  "pokemonsType/fetchAll",
  async function ({ selectedTypes }) {
    const result = [];
    for (const type of selectedTypes) {
      const responce = await fetch(
        `https://pokeapi.co/api/v2/type/${type}`
      ).then((res) => res.json());
      result.push(...responce.pokemon);
    }
    return result;
  }
);
