import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CardsContainer } from '../components/CardsContainer/CardsContainer'
import { Paginator } from '../components/Paginator/Paginator'
import { Search } from '../components/Search/Search'
import { SelectTypes } from '../components/SelectTypes/SelectTypes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { searchByName, selectType, setCurrentPage, setItemsPerPage, setSearchValue } from '../redux/slices/pokemons/pokemonsSlice'

const Home = () => {
  const {
    allPokemons
  } = useAppSelector((state) => state.pokemon)

  const [searchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  useEffect(() => {
    const types = searchParams.getAll('types')
    const page = Number(searchParams.get('currentPage'))
    const item = Number(searchParams.get('itemsPerPage'))
    const search = searchParams.get('searchValue') || ''
    types.length && types.join('').split(',').forEach((item) => {
      dispatch(selectType(item))
    })
    if (allPokemons) {
      item && dispatch(setItemsPerPage(item))
      dispatch(setSearchValue(search))
      dispatch(searchByName())
      page && dispatch(setCurrentPage(page))
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
