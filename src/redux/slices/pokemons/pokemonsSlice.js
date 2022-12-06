import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "./asyncActions";

const initialState = {
  pokemons: null,
  isLoading: false,
  error: "",
};

const elementsSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    searchPokemonByName: (state, action) => {
      state.pokemons.results.filter((item) => {
        console.log(Boolean(item.name.includes(action.payload)));
        Boolean(item.name.includes(action.payload));
      });
    },
  },
  extraReducers: {
    [fetchPokemons.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      if (action.payload.results) {
        state.pokemons = action.payload.results;
      } else {
        state.pokemons = action.payload.forms;
      }
    },
    [fetchPokemons.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemons.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.pokemons = null
      state.error = action.payload;
      console.log(action.payload)
    },
  },
});

export const { searchPokemonByName } = elementsSlice.actions;

export default elementsSlice.reducer;
