import CloseIcon from '@mui/icons-material/Close'
import { IconButton, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  resetSearch,
  searchByName, setSearchValue
} from '../../redux/slices/pokemons/pokemonsSlice'
const Search = () => {
  const dispatch = useAppDispatch()
  const { searchValue } = useAppSelector((state) => state.pokemon)
  const [searchParams, setSearchParams] = useSearchParams()

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
    searchParams.delete('searchValue')
    setSearchParams(searchParams)
  }

  return (
    <TextField
      value={searchValue}
      onChange={(e) => {
        if (e.target.value === '') {
          dispatch(resetSearch())
          searchParams.delete('searchValue')
          setSearchParams(searchParams)
        }
        dispatch(setSearchValue(e.target.value))
        searchParams.set('searchValue', e.target.value)
        setSearchParams(searchParams)
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
