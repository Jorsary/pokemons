import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchAll",
  async function (thunkAPI) {
    try {
      const responce = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000`
      ).then((res) => res.json());
      return responce;
    } catch (e) {
      return thunkAPI.rejectWithValue("Nothing found");
    }
  }
);

export const fetchPokemonsWithTypes = createAsyncThunk(
  "pokemonsType/fetchAll",
  async function ({ selectedTypes }, thunkAPI) {
    try {
      const result = [];
      for (const type of selectedTypes) {
        const responce = await fetch(
          `https://pokeapi.co/api/v2/type/${type}`
        ).then((res) => res.json());
        result.push(...responce.pokemon);
      }
      console.log(result);
      return result
    } catch (e) {
      return thunkAPI.rejectWithValue("Nothing found");
    }
  }
);
