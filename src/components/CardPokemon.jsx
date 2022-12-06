import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import { overgrow, pokemonTypes } from "../utils/constants";

const CardPokemon = () => {
  {
    overgrow.types.map((type) => {
      console.log(type);
    });
  }
  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <img
        style={{ maxWidth: "200px" }}
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography>{overgrow.name.charAt(0).toUpperCase() + overgrow.name.slice(1)}</Typography>
        <Box sx={{ display: "flex", flexDirection: "column",gap:'5px' }}>
          {overgrow.types.map((element) => (
            <Button
              sx={{
                backgroundColor: pokemonTypes[element.type.name].color,
                borderRadius: "30px",
                padding: "0 10px",
                color: "#fff",
              }}
            >
              {element.type.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default CardPokemon;
