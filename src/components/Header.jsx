import React from 'react'
import { AppBar, Toolbar } from '@mui/material';

const Header = () => {

  return (
    <AppBar><Toolbar sx={{ display: 'flex', justifyContent: 'center' }}><img style={{ width: '10%' }} src={'./logo.svg'} /></Toolbar></AppBar>
  )
}

export default Header;