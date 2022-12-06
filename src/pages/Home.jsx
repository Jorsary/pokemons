import { Box, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import CardPokemon from "../components/CardPokemon";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPokemons } from "../redux/slices/pokemons/asyncActions";
import { searchPokemonByName } from "../redux/slices/pokemons/pokemonsSlice";

const Home = () => {
  const [searchValue, setSearchValue] = useState();

  const { pokemons } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPokemons({ limit: 20, offset: 20}));
  }, []);
 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchPokemons({ id:searchValue.toLowerCase() }));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);
  

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <TextField value={searchValue} onChange={e=>setSearchValue(e.target.value)} placeholder="Search" variant="standard" />
      </Box>
      <Box
        display="grid"
        sx={{
          gap: "15px",
          gridTemplateColumns: {
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "1fr",
          },
        }}
      >
        {pokemons &&
          pokemons.map((item) => (
            <CardPokemon key={item.name} props={item} />
          ))}
      </Box>
    </Container>
  );
};

export default Home;
