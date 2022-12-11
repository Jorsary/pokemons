import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import React from 'react'

const TypeTag = ({ selectedTypes, onSelectTypes, color, name }) => {
  const isSelect = selectedTypes.includes(name)
  const toggleType = () => {
    if (isSelect) {
      onSelectTypes(prev => prev.filter((type) => type !== name))
    } else {
      onSelectTypes(prev => [...prev, name])
    }
  }

  return (
    <Box
      onClick={toggleType}
      sx={{
        outline: isSelect ? '2px inset white' : '',
        background: color,
        width: '70px',
        textAlign: 'center',
        borderRadius: '30px',
        cursor: 'pointer',
        fontFamily: 'Roboto Mono',
        fontSize: 13,
        '::first-letter': {
          textTransform: 'uppercase'
        },
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      {name}
    </Box>
  )
}
TypeTag.propTypes = { selectedTypes: PropTypes.array, onSelectTypes: PropTypes.func, name: PropTypes.string, color: PropTypes.string }

export { TypeTag }
