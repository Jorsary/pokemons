import {
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import React from 'react'
import { AppRouter } from '../AppRouter/AppRouter'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App () {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export { App }
