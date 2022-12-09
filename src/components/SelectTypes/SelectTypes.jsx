import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Subtitle } from '../../pages/PokemonInfo'
import {
  fetchPokemons,
  fetchPokemonsWithTypes
} from '../../redux/slices/pokemons/asyncActions'
import {
  clearTypes,
  setCurrentPage
} from '../../redux/slices/pokemons/pokemonsSlice'
import { pokemonTypes } from '../../utils/constants'
import { TypeTag } from '../TypeTag/TypeTag'

const SelectTypes = () => {
  const { selectedTypes } = useAppSelector((state) => state.pokemon)
  const dispatch = useAppDispatch()

  useEffect(() => {
    selectedTypes.length ? dispatch(fetchPokemonsWithTypes({ selectedTypes })) : dispatch(fetchPokemons())
  }, [selectedTypes])

  return (
    <Box sx={{ maxWidth: '800px' }}>
      <Subtitle sx={{ paddingBottom: '10px' }}>Filter by type:</Subtitle>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}
      >
        {Object.entries(pokemonTypes).map((type, i) => (
          <TypeTag key={i} name={type[1].name} color={type[1].color}/>
        ))}
        <Box
          onClick={() => {
            dispatch(clearTypes())
            dispatch(fetchPokemons())
            dispatch(setCurrentPage(1))
          }}
          sx={{
            background: 'gray',
            width: '70px',
            textAlign: 'center',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: 13,
            '::first-letter': {
              textTransform: 'uppercase'
            }
          }}
        >
          Reset
        </Box>
      </Box>
    </Box>
  )
}

export { SelectTypes }
