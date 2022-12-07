import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchAll",
  async function (thunkAPI) {

    try {
      const responce = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000`
      ).then((res)=> res.json())
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue("Nothing found");
    }
  }
);
