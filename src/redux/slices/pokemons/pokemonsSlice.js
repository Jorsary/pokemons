import { createSlice, current } from '@reduxjs/toolkit'
import { fetchPokemons, fetchPokemonsWithTypes } from './asyncActions'

const initialState = {
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

const pokemonsSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonsFromData: (state) => {
      state.pokemons = state.data
      state.totalPages = Math.ceil(state.pokemons.length / state.itemsPerPage)
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    searchByName: (state) => {
      const founded = current(state.pokemons).filter((item) =>
        item.name.includes(state.searchValue.toLowerCase())
      )
      state.pokemons = founded
      state.totalPages = Math.ceil(state.pokemons.length / state.itemsPerPage)
      if (state.totalPages < state.currentPage) {
        state.currentPage = 1
      }
      state.result = state.pokemons.slice(
        state.itemsPerPage * state.currentPage - state.itemsPerPage,
        state.itemsPerPage * state.currentPage
      )
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
      if (state.result) {
        state.result = state.pokemons.slice(
          state.itemsPerPage * state.currentPage - state.itemsPerPage,
          state.itemsPerPage * state.currentPage
        )
      }
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      state.totalPages = Math.ceil(state.pokemons.length / state.itemsPerPage)
      state.result = state.pokemons.slice(0, state.itemsPerPage)
      if (state.currentPage > state.totalPages) {
        state.currentPage = 1
      }
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
    },
    clearTypes: (state) => {
      state.selectedTypes = []
    },
    resetSearch: (state) => {
      state.searchValue = ''
      state.pokemons = state.data
      state.totalPages = Math.ceil(state.pokemons.length / state.itemsPerPage)
      state.result = state.pokemons.slice(
        state.itemsPerPage * state.currentPage - state.itemsPerPage,
        state.itemsPerPage * state.currentPage
      )
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
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
      state.data = state.pokemons
      state.result = state.pokemons.slice(0, state.itemsPerPage)
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
  setPokemonsFromData,
  setType,
  selectType,
  clearTypes,
  setSearchValue,
  resetSearch,
  setLoading, unselectType
} = pokemonsSlice.actions

export const pokemonsReducer = pokemonsSlice.reducer
