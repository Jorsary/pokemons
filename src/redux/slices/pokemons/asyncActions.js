import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchPokemons = createAsyncThunk("pokemons/fetchAll", 
async function ({ limit }, thunkAPI) {
  try {
    const responce = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/",
      {
        params: {
          limit,
          offset
        },
      }
    );
    return responce.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Не удалось загрузить товары");
  }
})