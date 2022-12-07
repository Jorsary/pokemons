import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { searchByName, setCurrentPage, setPokemonsFromData } from "../redux/slices/pokemons/pokemonsSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        dispatch(searchByName(searchValue.toLowerCase()));
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
        setSearchValue(e.target.value);
      }}
      placeholder="Search"
      variant="standard"
    />
  );
};

export default Search;
