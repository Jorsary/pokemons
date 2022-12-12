import { gql } from '@apollo/client'

export const POKEMONS_WITH_TYPES = gql`
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

export const POKEMON = gql`
  query MyQuery($name: String ="") {
    pokemon:pokemon_v2_pokemon(where: {name: {_eq: $name}}){
      name
      id
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats:pokemon_v2_pokemonstats {
        base_stat
        stat:pokemon_v2_stat {
          name
        }
      }
      abilities:pokemon_v2_pokemonabilities {
      ability:pokemon_v2_ability {
        name
      }
    }
    }
  }
`
