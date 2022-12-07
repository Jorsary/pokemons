import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchPokemons,
  fetchPokemonsWithTypes,
} from "../redux/slices/pokemons/asyncActions";
import { pokemonTypes } from "../utils/constants";
import TypeTag from "./TypeTag";

const SelectTypes = () => {
  const { result, selectedTypes } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    selectedTypes.length && dispatch(fetchPokemonsWithTypes({ selectedTypes }));
  }, [selectedTypes]);
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "20px",justifyContent: { xs: "center", sm: "flex-start" } }}
    >
      {Object.entries(pokemonTypes).map((type, i) => (
        <TypeTag key={i} props={type[1]} />
      ))}
      <Box
        onClick={() => {
          dispatch(fetchPokemons());
        }}
        sx={{
          background: "gray",
          width: "70px",
          textAlign: "center",
          borderRadius: "30px",
          cursor: "pointer",
          "::first-letter": {
            textTransform: "uppercase",
          },
        }}
      >
        Reset
      </Box>
    </Box>
  );
};

export default SelectTypes;
