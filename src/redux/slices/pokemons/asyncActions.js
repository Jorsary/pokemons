import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchAll",
  async function ({ id, limit, offset }, thunkAPI) {
    const name = id ? id + "/" : "";
    try {
      const responce = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
        {
          params: {
            limit,
            offset,
          },
        }
      )
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Nothing found");
    }
  }
);
