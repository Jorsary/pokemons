import { Box, Skeleton } from '@mui/material'
import React from 'react'
import { CardPokemon } from '../CardPokemon/CardPokemon'
import PropTypes from 'prop-types'

const CardsContainer = ({ totalCount, itemsPerPage, isLoading, pokemons }) => {
  return (
    <Box sx={{ paddingBottom: '20px' }}>
    <Box
        sx={{
          display: ' grid',
          gap: '15px',
          gridTemplateColumns: {
            lg: 'repeat(5,1fr)',
            md: 'repeat(3, 1fr)',
            sm: 'repeat(2, 1fr)',
            xs: '1fr'
          }
        }}
      >
        {pokemons &&
        pokemons.pokemons.map((item) => <CardPokemon key={item.name} {...item} />)}

      {[...Array(itemsPerPage)].map((value, i) => (
        <Skeleton
        key={i}
        sx={{ borderRadius: '5px', display: !isLoading ? 'none' : 'block' }}
        variant="rectangular"
        width={'100%'}
        height={300}
        />))}
    </Box>
        <Box sx={{ textAlign: 'center', display: !totalCount && !isLoading ? 'block' : 'none' }}>No such pokemon found</Box>
    </Box>
  )
}

CardsContainer.propTypes = { totalCount: PropTypes.number, itemsPerPage: PropTypes.number, isLoading: PropTypes.bool, pokemons: PropTypes.object }

export { CardsContainer }
