import { Box } from '@mui/system'
import React from 'react'
import { Subtitle } from '../../pages/PokemonInfo'
import { pokemonTypes } from '../../utils/constants'
import { TypeTag } from '../TypeTag/TypeTag'
import PropTypes from 'prop-types'

const SelectTypes = ({ selectedTypes, onSelectTypes }) => {
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
          <TypeTag selectedTypes={selectedTypes} onSelectTypes={onSelectTypes} key={i} name={type[1].name} color={type[1].color}/>
        ))}
        <Box
          onClick={() => {
            onSelectTypes([])
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

SelectTypes.propTypes = { selectedTypes: PropTypes.array, onSelectTypes: PropTypes.func }

export { SelectTypes }
