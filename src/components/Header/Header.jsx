import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import logo from '../../images/logo.png'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '100px' }} src={logo} />
      </Toolbar>
    </AppBar>
  )
}

export { Header }
