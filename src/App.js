import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useAppDispatch } from "./hooks/redux";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PokemonInfo } from "./pages/PokemonInfo";
import { fetchPokemons } from "./redux/slices/pokemons/asyncActions";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
