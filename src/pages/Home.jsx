import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CardPokemon } from "../components/CardPokemon";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import { SelectTypes } from "../components/SelectTypes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  searchByName,
  selectType,
  setCurrentPage,
  setItemsPerPage,
  setSearchValue,
} from "../redux/slices/pokemons/pokemonsSlice";

const Home = () => {
  const { pokemons, result, selectedTypes, itemsPerPage, currentPage, data,searchValue } =
    useAppSelector((state) => state.pokemon);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (result) {
      setSearchParams({
        types: selectedTypes,
        currentPage: currentPage ? currentPage : 1,
        itemsPerPage: itemsPerPage ? itemsPerPage : 10,
        searchValue
      });
    }
  }, [result]);

  useEffect(() => {
    const types = searchParams.getAll("types");
    const currentPage = Number(searchParams.get("currentPage"));
    const itemsPerPage = Number(searchParams.get("itemsPerPage"));
    const search = searchParams.get("searchValue") || ''
    console.log(search)
    types.forEach((type) => {
      dispatch(selectType(type));
    });
    if (pokemons) {
      dispatch(setItemsPerPage(itemsPerPage));
      dispatch(setSearchValue(search));
      dispatch(searchByName())
      dispatch(setCurrentPage(currentPage));
    }
    // if (pokemons) {
    //   dispatch(urlParce({currentPage,itemsPerPage,search}));

    // }
  }, [data]);

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
