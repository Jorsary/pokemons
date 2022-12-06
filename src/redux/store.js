import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './slices/pokemons/pokemonsSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonsReducer
  },
});
