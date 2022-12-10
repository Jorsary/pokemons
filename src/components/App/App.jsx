import {
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { fetchPokemons } from '../../redux/slices/pokemons/asyncActions'
import { AppRouter } from '../AppRouter/AppRouter'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App () {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPokemons())
  }, [])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export { App }
