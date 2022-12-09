import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '100px' }} src={'../logo.svg'} />
      </Toolbar>
    </AppBar>
  )
}

export { Header }
