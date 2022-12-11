import { useQuery } from '@apollo/client'
import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COUNT_POKEMON, POKEMONS_WITH_TYPES } from '../apollo/pokemons'
import { CardsContainer } from '../components/CardsContainer/CardsContainer'
import { Paginator } from '../components/Paginator/Paginator'
import { Search } from '../components/Search/Search'
import { SelectTypes } from '../components/SelectTypes/SelectTypes'

const Home = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const { data: pokemons, loading: isLoadingPokemons } = useQuery(POKEMONS_WITH_TYPES, {
    variables: {
      offset: itemsPerPage * (currentPage - 1),
      limit: itemsPerPage,
      type: `(${selectedTypes.join('|')})`,
      name: `(${searchValue.toLowerCase()})`
    }
  })

  const { data: allPokemons, loading: isLoadingCountPokemons } = useQuery(COUNT_POKEMON, {
    variables: {
      type: `(${selectedTypes.join('|')})`,
      name: `(${searchValue})`
    }
  })

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({
      types: selectedTypes,
      currentPage: currentPage || 1,
      itemsPerPage: itemsPerPage || 10,
      searchValue: searchValue || []
    })
  }, [selectedTypes, itemsPerPage, searchValue, currentPage])

  useEffect(() => {
    const types = searchParams.getAll('types')
    const currentPage = Number(searchParams.get('currentPage'))
    const itemsPerPage = Number(searchParams.get('itemsPerPage'))
    const search = searchParams.get('searchValue') || ''
    setCurrentPage(currentPage)
    setItemsPerPage(itemsPerPage)
    setSearchValue(search)
    setSelectedTypes(types)
  }, [])

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
        <SelectTypes selectedTypes={selectedTypes} onSelectTypes={setSelectedTypes} />
        <Search searchValue={searchValue} onChangeSearchValue={setSearchValue} />
      </Box>
      <Paginator totalPages={allPokemons && Math.ceil(allPokemons.pokemons.length / itemsPerPage)} currentPage={currentPage} onChangeItemsPerPage={setItemsPerPage} onChangeCurrentPage={setCurrentPage} />
      <CardsContainer totalCount={allPokemons && allPokemons.pokemons.length} itemsPerPage={itemsPerPage} pokemons={pokemons} isLoading={isLoadingCountPokemons || isLoadingPokemons}/>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center'
        }}
      >
      </Box>
    </Container>
  )
}

export { Home }
