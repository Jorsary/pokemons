import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect } from "react";
import { AppRouter } from "./components/AppRouter";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchPokemons } from "./redux/slices/pokemons/asyncActions";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
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
        <CircularProgress />
      </Backdrop>
      <AppRouter />
    </ThemeProvider>
  );
}

export { App };
