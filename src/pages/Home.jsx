import { Box, MenuItem, Pagination, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import CardPokemon from "../components/CardPokemon";
import Paginator from "../components/Paginator";
import { useAppDispatch, useAppSelector } from "../hooks/redux";


const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { result } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();



  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          padding: { xs: "20px 0", sm: "20px" },
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: {xs:'column', sm:'row'},
          gap: "15px",
        }}
      >
        <Paginator />
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          variant="standard"
        />
      </Box>
      <Box
        display="grid"
        sx={{
          gap: "15px",
          gridTemplateColumns: {
            lg: "repeat(4,1fr)",
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "1fr",
          },
        }}
      >
        {result &&
          result.map((item) => <CardPokemon key={item.name} props={item} />)}
      </Box>
    </Container>
  );
};

export default Home;
