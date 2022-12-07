import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CardPokemon from "../components/CardPokemon";
import Paginator from "../components/Paginator";
import Search from "../components/Search";
import SelectTypes from "../components/SelectTypes";
import { useAppSelector } from "../hooks/redux";

const Home = () => {
  const { result } = useAppSelector((state) => state.pokemon);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          padding: { xs: "20px 0", sm: "20px" },
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: "15px",
        }}
      >
        <Paginator />
        <Search />
      </Box>
      <SelectTypes />
      <Box
        display="grid"
        sx={{
          gap: "15px",
          gridTemplateColumns: {
            lg: "repeat(5,1fr)",
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "1fr",
          },
        }}
      >
        {result &&
          result.map((item) => <CardPokemon key={item.name} props={item} />)}
      </Box>
      <Box
        sx={{
          padding: { xs: "20px 0", sm: "20px" },
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          width: "100%",
          justifyContent:'center'
        }}
      >
        <Paginator />
      </Box>
    </Container>
  );
};

export default Home;
