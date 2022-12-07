import { Box } from "@mui/system";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPokemons } from "../redux/slices/pokemons/asyncActions";
import { selectType } from "../redux/slices/pokemons/pokemonsSlice";

const TypeTag = ({ props }) => {
  const { color, name } = props;
  const { selectedTypes } = useAppSelector((state) => state.pokemon);

  const isSelect = selectedTypes.includes(name)

  const dispatch = useAppDispatch();
  return (
    <Box
      onClick={() => {
        dispatch(selectType(name));
      }}
      sx={{
        outline:isSelect ? '1px solid white' : '',
        background: color,
        width: "70px",
        textAlign: "center",
        borderRadius: "30px",
        cursor: "pointer",
        "::first-letter": {
          textTransform: "uppercase",
        },
      }}
    >
      {name}
    </Box>
  );
};

export default TypeTag;
