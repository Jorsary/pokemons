import { MenuItem, Pagination, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  setCurrentPage,
  setItemsPerPage
} from '../../redux/slices/pokemons/pokemonsSlice'

const Paginator = () => {
  const { itemsPerPage, totalPages, currentPage } = useAppSelector(
    (state) => state.pokemon
  )
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value))
  }

  const handleItemsPerPageChange = (event) => {
    console.log(event.target.value)
    dispatch(setItemsPerPage(event.target.value))
    searchParams.set('itemsPerPage', event.target.value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    searchParams.set('currentPage', currentPage)
    setSearchParams(searchParams)
  }, [currentPage])

  useEffect(() => {
    if (currentPage > totalPages) { dispatch(setCurrentPage(1)) }
  }, [totalPages, currentPage, itemsPerPage])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '10px',
        padding: { xs: '20px 0', sm: '20px' }
      }}
    >
      <Select
        variant="standard"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
      <Pagination
        size="small"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  )
}

export { Paginator }
