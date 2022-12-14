import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  selectType, unselectType
} from '../../redux/slices/pokemons/pokemonsSlice'

const TypeTag = ({ color, name }) => {
  const { selectedTypes } = useAppSelector((state) => state.pokemon)

  const isSelect = selectedTypes.includes(name)
  const dispatch = useAppDispatch()

  const toggleType = () => {
    if (!isSelect) {
      dispatch(selectType(name))
    } else {
      dispatch(unselectType(name))
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
TypeTag.propTypes = { name: PropTypes.string, color: PropTypes.string }

export { TypeTag }
