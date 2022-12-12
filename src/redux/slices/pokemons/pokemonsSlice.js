import { createSlice, current } from '@reduxjs/toolkit'
import { fetchPokemons, fetchPokemonsWithTypes } from './asyncActions'

const initialState = {
  allPokemons: null,
  isLoading: false,
  data: null,
  error: '',
  pokemons: null,
  countPokemons: 0,
  totalPages: 0,
  result: null,
  itemsPerPage: 10,
  currentPage: 1,
  selectedTypes: [],
  searchValue: ''
}

function getTotalPages (pokemonsAmount, itemsPerPage) {
  return Math.ceil(pokemonsAmount / itemsPerPage)
}

function getCurrentPokemons (pokemons, itemsPerPage, currentPage) {
  return pokemons.slice(
    itemsPerPage * currentPage - itemsPerPage,
    itemsPerPage * currentPage
  )
}

const pokemonsSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    searchByName: (state) => {
      const founded = current(state.pokemons).filter((item) =>
        item.name.includes(state.searchValue.toLowerCase())
      )
      state.pokemons = founded
      state.totalPages = getTotalPages(state.pokemons.length, state.itemsPerPage)
      state.result = getCurrentPokemons(state.pokemons, state.itemsPerPage, state.currentPage)
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
      if (state.pokemons) {
        state.result = getCurrentPokemons(state.pokemons, state.itemsPerPage, state.currentPage)
      }
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      state.totalPages = getTotalPages(state.pokemons.length, state.itemsPerPage)
      state.result = state.pokemons.slice(0, state.itemsPerPage)
    },
    selectType: (state, action) => {
      if (!current(state.selectedTypes).includes(action.payload)) {
        state.selectedTypes.push(action.payload)
      }
    },
    unselectType: (state, action) => {
      if (current(state.selectedTypes).includes(action.payload)) {
        state.selectedTypes = current(state.selectedTypes).filter((item) => item !== action.payload)
      }
      if (state.selectedTypes.length === 0) {
        state.pokemons = state.allPokemons
        state.countPokemons = state.allPokemons.length
        state.totalPages = getTotalPages(state.pokemons.length, state.itemsPerPage)
      }
    },
    clearTypes: (state) => {
      state.selectedTypes = []
      state.pokemons = state.allPokemons
      state.data = state.allPokemons
      state.totalPages = getTotalPages(state.pokemons.length, state.itemsPerPage)
    },
    resetSearch: (state) => {
      state.searchValue = ''
      state.pokemons = state.data
      state.totalPages = getTotalPages(state.pokemons.length, state.itemsPerPage)
      state.result = getCurrentPokemons(state.pokemons, state.itemsPerPage, state.currentPage)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.allPokemons = action.payload.results
      state.countPokemons = action.payload.count
      state.totalPages = Math.ceil(state.countPokemons / state.itemsPerPage)
      state.isLoading = false
      state.error = ''
      state.pokemons = action.payload.results
      state.data = action.payload.results
      state.result = state.pokemons.slice(0, state.itemsPerPage)
    })
    builder.addCase(fetchPokemons.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.isLoading = false
      state.pokemons = null
      state.error = 'Error, unable to get data'
    })

    builder.addCase(fetchPokemonsWithTypes.fulfilled, (state, action) => {
      state.pokemons = []
      state.countPokemons = action.payload.length
      state.totalPages = Math.ceil(state.countPokemons / state.itemsPerPage)
      state.isLoading = false
      state.error = ''
      action.payload.forEach((item) => {
        state.pokemons.push(item.pokemon)
      })
      state.pokemons = state.pokemons.reduce((o, i) => {
        if (!o.find(v => v.name === i.name)) {
          o.push(i)
        }
        return o
      }, [])
      state.data = state.pokemons
      state.result = getCurrentPokemons(state.pokemons, state.itemsPerPage, state.currentPage)
    })
    builder.addCase(fetchPokemonsWithTypes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPokemonsWithTypes.rejected, (state, action) => {
      state.isLoading = false
      state.pokemons = null
      state.error = 'Error, unable to get data'
    })
  }
})

export const {
  setItemsPerPage,
  setCurrentPage,
  searchByName,
  setType,
  selectType,
  clearTypes,
  setSearchValue,
  resetSearch,
  unselectType
} = pokemonsSlice.actions

export const pokemonsReducer = pokemonsSlice.reducer
