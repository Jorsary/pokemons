import { gql } from '@apollo/client'


export const POKEMONS_WITH_TYPES= gql`
  query MyQuery($offset: Int = 0,$limit: Int = 10,$type: String! = "",$name: String ="") {
    pokemons:pokemon_v2_pokemon(where: {name: {_regex: $name},pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_regex: $type}}}} ,offset: $offset, limit: $limit) {
      id
      name
      is_default
      order
      pokemon_species_id
      height
      base_experience
      types:pokemon_v2_pokemontypes {
      slot
      type:pokemon_v2_type {
        name
      }
    }
    sprites:pokemon_v2_pokemonsprites {
      sprites
    }
    }
  }
`
export const COUNT_POKEMON = gql`
  query MyQuery($type: String! = "",$name: String ="") {
    pokemons:pokemon_v2_pokemon(where: {name: {_regex: $name},pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_regex: $type}}}}) {
      id
    }
  }
`





