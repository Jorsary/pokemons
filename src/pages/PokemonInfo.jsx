import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Card,
  Container, IconButton, LinearProgress, linearProgressClasses, Skeleton, Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POKEMON } from '../apollo/pokemons'
import pokeball from '../images/Pokeball.png'
import { PokemonStats, pokemonTypes } from '../utils/constants'

const BorderLinearProgress = styled(LinearProgress)(({ theme, props }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: props.main
  }
}))

export const Subtitle = styled(Typography)(() => ({
  fontWeight: 500,
  fontFamily: 'Roboto Mono',
  fontSize: 16,
  justifySelf: 'start',
  '@media (max-width: 600px)': {
    fontSize: 10
  }
}))

const PokemonInfo = () => {
  const { id } = useParams()
  const [isLoadingImg, setIsLoadingImg] = useState(true)

  const { data, loading, error } = useQuery(POKEMON, {
    variables: {
      name: id
    }
  })

  const push = useNavigate()

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ margin: '20px auto 20px auto' }}>
    <Skeleton
          sx={{
            borderRadius: '15px'
          }}
          variant="rectangular"
          width={'100%'}
          height={'800px'}
        ></Skeleton>
        </Container>)
  }

  if (data.pokemon.length === 0 || error) {
    return (
      <Typography variant='h5' sx={{ textAlign: 'center', padding: '30px' }}>Error,try again</Typography>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ margin: '20px auto 20px auto' }}>
        <>
          <Box
            sx={{
              display: 'flex',
              padding: '15px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <IconButton
            onClick={() => push(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                gap: '5px'
              }}
            >
              {data &&
                data.pokemon[0].types.map((element, i) => (
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
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontFamily: 'Roboto Mono',
                fontSize: 20,
                textTransform: 'uppercase'
              }}
            >
              {data.pokemon[0].name}
            </Typography>
            <img
              style={{
                maxWidth: '400px',
                maxHeight: '400px',
                width: '100%',
                display: isLoadingImg ? 'none' : 'block'
              }}
              onLoad={() => { setIsLoadingImg(false) }}
              onError={(e) => (e.target.src = pokeball)}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokemon[0].id}.png`}
            />
              <Skeleton
                sx={{
                  borderRadius: '15px',
                  display: !isLoadingImg ? 'none' : 'block'
                }}
                variant="rectangular"
                width={'100%'}
                height={'400px'}
              ></Skeleton>
            <Box sx={{ display: 'flex', alignSelf: 'stretch', gap: '20px' }}>
              <Box
                sx={{
                  width: '30%'
                }}
              >
                <Subtitle>Abilities:</Subtitle>
                {data.pokemon[0].abilities.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      fontFamily: 'Roboto Mono',
                      fontSize: { xs: 10, sm: 16 },
                      '::first-letter': {
                        textTransform: 'uppercase'
                      }
                    }}
                  >
                    {item.ability.name}
                  </Box>
                ))}
                <Subtitle sx={{ paddingTop: '10px' }}>Other:</Subtitle>
                <Box
                  sx={{ gap: '10px', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Roboto Mono',
                      fontSize: { xs: 10, sm: 16 },
                      border: '1px solid gray',
                      borderRadius: '15px',
                      textAlign: 'center'
                    }}
                  >
                    {'Height ' + data.height}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto Mono',
                      fontSize: { xs: 10, sm: 16 },
                      border: '1px solid gray',
                      borderRadius: '15px',
                      textAlign: 'center'
                    }}
                  >
                    {'Weight ' + data.weight}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: '70%'
                }}
              >
                <Subtitle>Stats:</Subtitle>
                {data.pokemon[0].stats.map((item, i) => (
                  <Box key={i}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: 10, sm: 16 },
                          fontFamily: 'Roboto Mono',
                          '::first-letter': {
                            textTransform: 'uppercase'
                          }
                        }}
                      >
                        {item.stat.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 10, sm: 16 },
                          fontFamily: 'Roboto Mono',
                          '::first-letter': {
                            textTransform: 'uppercase'
                          }
                        }}
                      >
                        {item.base_stat}
                      </Typography>
                    </Box>
                    <BorderLinearProgress
                      props={{ main: PokemonStats[item.stat.name] }}
                      variant="determinate"
                      value={item.base_stat}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </>
    </Container>
  )
}

export { PokemonInfo }
