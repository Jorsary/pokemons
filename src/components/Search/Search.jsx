import CloseIcon from '@mui/icons-material/Close'
import { IconButton, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const Search = ({ searchValue, onChangeSearchValue }) => {
  const onReset = () => {
    onChangeSearchValue('')
  }

  return (
    <TextField
      value={searchValue}
      onChange={(e) => { onChangeSearchValue(e.target.value) }}
      placeholder="Search"
      variant="standard"
      type='text'
      InputProps={{
        endAdornment: (
          <IconButton sx={{ padding: 0 }}
           onClick={onReset}
           >
            <CloseIcon fontSize="small" />
          </IconButton>
        )
      }}
    />
  )
}

Search.propTypes = { searchValue: PropTypes.string, onChangeSearchValue: PropTypes.func }

export { Search }
