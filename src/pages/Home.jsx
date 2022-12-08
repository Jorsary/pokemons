import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CardPokemon } from "../components/CardPokemon";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import { SelectTypes } from "../components/SelectTypes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  searchByName,
  selectType,
  setType,
} from "../redux/slices/pokemons/pokemonsSlice";

const Home = () => {
  const { result, selectedTypes } = useAppSelector((state) => state.pokemon);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!selectedTypes.legnth) {
      setSearchParams({
        types: selectedTypes,
      });
    }
  }, [selectedTypes]);

  useEffect(() => {
    const types = searchParams.getAll("types");
    types.forEach((type) => {
      dispatch(selectType(type));
    });
  }, []);

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
        <SelectTypes />
        <Search />
      </Box>
      <Paginator />
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
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Paginator />
      </Box>
    </Container>
  );
};

export { Home };
