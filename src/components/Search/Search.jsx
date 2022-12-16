import CloseIcon from '@mui/icons-material/Close'
import { IconButton, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'

const Search = ({ searchValue, onChangeSearchValue }) => {
  const [search, setSearch] = useState('')
  const [debouncedValue] = useDebounce(search, 500)
  const onReset = () => {
    onChangeSearchValue('')
  }

  useEffect(() => {
    setSearch(searchValue)
  }, [searchValue])

  useEffect(() => {
    if (debouncedValue) {
      onChangeSearchValue(debouncedValue)
    } else {
      onChangeSearchValue('')
    }
  }, [debouncedValue])

  return (
    <TextField
      value={search}
      onChange={(e) => { setSearch(e.target.value) }}
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
