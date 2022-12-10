import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { CardPokemon } from '../CardPokemon/CardPokemon'

const CardsContainer = () => {
  const [pokemonsData, setPokemonsData] = useState([])
  const { result, error } = useAppSelector(state => state.pokemon)

  useEffect(() => {
    async function fetchPokemons () {
      const res = []
      for (const item of result) {
        const responce = await fetch(item.url)
        const { name, types, sprites } = await responce.json()
        res.push({ name, types, sprites })
      }
      return res
    }

    if (result) {
      fetchPokemons().then(setPokemonsData)
    }
  }, [result])

  return (
    <>{pokemonsData &&
      pokemonsData.map((item) => <CardPokemon key={item.name} {...item} />)}
      {[...Array(10)].map((value, i) => (
      <Skeleton
      key={i}
      sx={{ borderRadius: '5px', display: pokemonsData.length ? 'none' : 'block' }}
      variant="rectangular"
      width={'100%'}
      height={300}
    />))}
    {error && <div>{error}</div>}</>
  )
}

export { CardsContainer }