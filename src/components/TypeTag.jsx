import { Box } from "@mui/system";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectType, setCurrentPage } from "../redux/slices/pokemons/pokemonsSlice";

const TypeTag = ({ props }) => {
  const { color, name } = props;
  const { selectedTypes } = useAppSelector((state) => state.pokemon);

  const isSelect = selectedTypes.includes(name);
  const dispatch = useAppDispatch();
  return (
    <Box
      onClick={() => {
        dispatch(selectType(name));
        dispatch(setCurrentPage(1));
      }}
      sx={{
        outline: isSelect ? "1px solid white" : "",
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
      }}
    >
      {name}
    </Box>
  );
};

export { TypeTag };
