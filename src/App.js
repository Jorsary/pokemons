import styled from "@emotion/styled";
import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PokemonInfo } from "./pages/PokemonInfo";
import { fetchPokemons } from "./redux/slices/pokemons/asyncActions";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Pokeball = styled("img")({
  "@keyframes pulsate": {
    "0%": {
      transform: "translateY(0px) rotate(0deg)",
    },
    "50%": {
      transform: "translateY(-30px) rotate(360deg)",
    },
    "100%": {
      transform: "translateY(0px) rotate(0deg)",
    },
  },
  width: "20vh",
  animation: "pulsate .5s infinite  linear",
});

function App() {
  const { isLoading } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress/>
      </Backdrop>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<Home />}></Route>
          <Route path="/pokemon/:id" element={<PokemonInfo />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export { App };
