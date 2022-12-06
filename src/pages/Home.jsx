import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CardPokemon from "../components/CardPokemon";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="grid"
        sx={{
          gap: "15px",
          gridTemplateColumns: {
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "1fr",
          },
          padding:'30px 0'
        }}
      >
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
        <CardPokemon />
      </Box>
    </Container>
  );
};

export default Home;
