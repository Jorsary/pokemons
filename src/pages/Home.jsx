import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CardsContainer } from '../components/CardsContainer/CardsContainer'
import { Paginator } from '../components/Paginator/Paginator'
import { Search } from '../components/Search/Search'
import { SelectTypes } from '../components/SelectTypes/SelectTypes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  searchByName,
  selectType,
  setCurrentPage,
  setItemsPerPage,
  setSearchValue
} from '../redux/slices/pokemons/pokemonsSlice'

const Home = () => {
  const {
    result,
    selectedTypes,
    itemsPerPage,
    currentPage,
    allPokemons,
    searchValue
  } = useAppSelector((state) => state.pokemon)

  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (result) {
      setSearchParams({
        types: selectedTypes,
        currentPage: currentPage || 1,
        itemsPerPage: itemsPerPage || 10,
        searchValue: searchValue || []
      })
    }
  }, [selectedTypes, itemsPerPage, searchValue, currentPage])

  useEffect(() => {
    const types = searchParams.getAll('types')
    const currentPage = Number(searchParams.get('currentPage'))
    const itemsPerPage = Number(searchParams.get('itemsPerPage'))
    const search = searchParams.get('searchValue') || ''
    types.forEach((type) => {
      dispatch(selectType(type))
    })
    if (allPokemons) {
      itemsPerPage && dispatch(setItemsPerPage(itemsPerPage))
      search && dispatch(setSearchValue(search))
      dispatch(searchByName())
      currentPage && dispatch(setCurrentPage(currentPage))
    }
  }, [allPokemons])

  return (
    <Container maxWidth="lg" >
      <Box
        sx={{
          padding: { xs: '20px 0', lg: '20px' },
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: '15px'
        }}
      >
        <SelectTypes />
        <Search />
      </Box>
      <Paginator />

        <CardsContainer />

      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <Paginator />
      </Box>
    </Container>
  )
}

export { Home }
