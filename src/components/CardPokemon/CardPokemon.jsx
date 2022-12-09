import { Box, Card, Skeleton, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImgPokeball from '../../images/Pokeball.png'
import { pokemonTypes } from '../../utils/constants'

const CardPokemon = ({ name, types, sprites }) => {
  const [isLoading, setIsLoading] = useState(true)

  const push = useNavigate()

  return (
  <>
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        minWidth: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 10
        }
      }}
      onClick={() => {
        push(`pokemon/${name}`)
      }}
    >
      <img
        alt={name}
        style={{
          maxWidth: '200px',
          maxHeight: '200px',
          display: isLoading ? 'none' : 'block'
        }}
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={(e) => {
          setIsLoading(false)
          e.target.src = ImgPokeball
        }}
        src={sprites.other['official-artwork'].front_default}
      />
      <Skeleton

      sx={{ borderRadius: '5px', display: !isLoading ? 'none' : 'block' }}
      variant="rectangular"
      width={'100%'}
      height={200}
    />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          width: '100%',
          paddingTop: '15px'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Roboto Mono',
            '::first-letter': {
              textTransform: 'uppercase'
            }
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {
            types.map((element, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: pokemonTypes[element.type.name].color,
                  borderRadius: '30px',
                  color: '#fff',
                  width: '70px',
                  textAlign: 'center',
                  fontFamily: 'Roboto Mono',
                  fontSize: 13,
                  '::first-letter': {
                    textTransform: 'uppercase'
                  }
                }}
              >
                {element.type.name}
              </Box>
            ))}
        </Box>
      </Box>
    </Card>
  </>)
}

CardPokemon.propTypes = { name: PropTypes.string, types: PropTypes.object, sprites: PropTypes.object }

export { CardPokemon }
