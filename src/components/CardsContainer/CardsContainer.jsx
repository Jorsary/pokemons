import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { CardPokemon } from '../CardPokemon'

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
    {error && <div>{error}</div>}</>
  )
}

export { CardsContainer }
