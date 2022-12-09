import { Box } from "@mui/system";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  selectType,
  setCurrentPage,
  unselectType
} from "../redux/slices/pokemons/pokemonsSlice";

const TypeTag = ({ props }) => {
  const { color, name } = props;
  const { selectedTypes } = useAppSelector((state) => state.pokemon);

  const isSelect = selectedTypes.includes(name);
  const dispatch = useAppDispatch();

  const toggleType = () => {
    if (!isSelect) {
      dispatch(selectType(name));
    } else {
      dispatch(unselectType(name));
    }
    dispatch(setCurrentPage(1));
  };

  return (
    <Box
      onClick={toggleType}
      sx={{
        outline: isSelect ? "2px inset white" : "",
        background: color,
        width: "70px",
        textAlign: "center",
        borderRadius: "30px",
        cursor: "pointer",
        fontFamily: "Roboto Mono",
        fontSize: 13,
        "::first-letter": {
          textTransform: "uppercase",
        },
        transition: "all .2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {name}
    </Box>
  );
};

export { TypeTag };

