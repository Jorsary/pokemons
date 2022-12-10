import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { CardPokemon } from '../CardPokemon/CardPokemon'

const CardsContainer = () => {
  const [pokemonsData, setPokemonsData] = useState([])
  const { result } = useAppSelector(state => state.pokemon)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchPokemons () {
      setIsLoading(true)
      setPokemonsData([])
      const res = []
      for (const item of result) {
        const responce = await fetch(item.url)
        const { name, types, sprites } = await responce.json()
        res.push({ name, types, sprites })
      }
      setIsLoading(false)
      return res
    }

    if (result) {
      fetchPokemons().then(setPokemonsData)
    }
  }, [result])

  return (
    <>
    <Box
        sx={{
          display: ' grid',
          gap: '15px',
          paddingBottom: '20px',
          gridTemplateColumns: {
            lg: 'repeat(5,1fr)',
            md: 'repeat(3, 1fr)',
            sm: 'repeat(2, 1fr)',
            xs: '1fr'
          }
        }}
      >{pokemonsData &&
      pokemonsData.map((item) => <CardPokemon key={item.name} {...item} />)}
      {[...Array(10)].map((value, i) => (
      <Skeleton
      key={i}
      sx={{ borderRadius: '5px', display: !isLoading ? 'none' : 'block' }}
      variant="rectangular"
      width={'100%'}
      height={300}
    />))}
    </Box>
    {<Box sx={{ textAlign: 'center', display: result && !result.length ? 'block' : 'none' }}>No such pokemon found</Box>}</>
  )
}

export { CardsContainer }
