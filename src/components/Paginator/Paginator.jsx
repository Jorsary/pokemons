import { MenuItem, Pagination, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Paginator = ({ totalPages, currentPage, onChangeItemsPerPage, onChangeCurrentPage }) => {
  const handleChangeItemsPerPage = (e) => {
    onChangeItemsPerPage(e.target.value)
  }
  const handleChangeCurrentPage = (e, value) => {
    onChangeCurrentPage(value)
  }

  useEffect(() => {
    onChangeCurrentPage(totalPages < currentPage ? 1 : currentPage)
  }, [totalPages, currentPage])

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
        onChange={handleChangeItemsPerPage}
        defaultValue={10}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
      <Pagination
        size="small"
        count={totalPages}
        page={currentPage}
        onChange={handleChangeCurrentPage}
      />
    </Box>
  )
}

Paginator.propTypes = { totalPages: PropTypes.number, currentPage: PropTypes.number, onChangeItemsPerPage: PropTypes.func, onChangeCurrentPage: PropTypes.func }

export { Paginator }
