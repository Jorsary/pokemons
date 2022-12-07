import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "./asyncActions";

const initialState = {
  isLoading: false,
  error: "",
  pokemons: null,
  countPokemons: 0,
  totalPages: 0,
  result: null,
  itemsPerPage: 10,
  currentPage: 1,
};

const elementsSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
      state.result = state.pokemons.slice(state.itemsPerPage*state.currentPage-state.itemsPerPage, state.itemsPerPage*state.currentPage)
    },
    setItemsPerPage: (state, action) => {
      state.currentPage = 1
      state.itemsPerPage = action.payload;
      state.totalPages = Math.ceil(state.countPokemons / state.itemsPerPage);
      state.result = state.pokemons.slice(0, state.itemsPerPage);
    },
  },
  extraReducers: {
    [fetchPokemons.fulfilled.type]: (state, action) => {
      state.countPokemons = action.payload.count;
      state.totalPages = Math.ceil(state.countPokemons / state.itemsPerPage);
      state.isLoading = false;
      state.error = "";
      state.pokemons = action.payload.results;
      state.result = state.pokemons.slice(0, state.itemsPerPage);
    },
    [fetchPokemons.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemons.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.pokemons = null;
      state.error = action.payload;
    },
  },
});

export const { setItemsPerPage, setCurrentPage } =
  elementsSlice.actions;

export default elementsSlice.reducer;
