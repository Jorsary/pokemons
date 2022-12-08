import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  searchByName,
  setCurrentPage,
  setPokemonsFromData,
  setSearchValue,
} from "../redux/slices/pokemons/pokemonsSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.pokemon);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        dispatch(searchByName());
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchValue]);

  return (
    <TextField
      value={searchValue}
      onChange={(e) => {
        if (e.target.value === "") {
          dispatch(setPokemonsFromData());
          dispatch(setCurrentPage(1));
        }
        dispatch(setSearchValue(e.target.value));
      }}
      placeholder="Search"
      variant="standard"
    />
  );
};

export { Search };
