import CloseIcon from '@mui/icons-material/Close'
import { IconButton, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  resetSearch,
  searchByName,
  setCurrentPage,
  setPokemonsFromData,
  setSearchValue
} from '../../redux/slices/pokemons/pokemonsSlice'
const Search = () => {
  const dispatch = useAppDispatch()
  const { searchValue } = useAppSelector((state) => state.pokemon)

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        dispatch(searchByName())
      }, 1000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [searchValue])

  const handleReset = (e) => {
    dispatch(resetSearch())
  }

  return (
    <TextField
      value={searchValue}
      onChange={(e) => {
        if (e.target.value === '') {
          dispatch(setPokemonsFromData())
          dispatch(setCurrentPage(1))
        }
        dispatch(setSearchValue(e.target.value))
      }}
      placeholder="Search"
      variant="standard"
      type='text'
      InputProps={{
        endAdornment: (
          <IconButton sx={{ padding: 0 }} onClick={handleReset}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )
      }}
    />
  )
}

export { Search }
