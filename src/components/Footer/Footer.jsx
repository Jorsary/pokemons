import { Link } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: 'Roboto Mono',
        marginBottom: '-1'

      }}
    >
      © 2022.{' '}
      <Link
        underline="hover"
        target="_blank"
        rel="noopener"
        color="inherit"
        href="https://github.com/Jorsary"
      >
        Eduard Kluchnikov
      </Link>
    </Box>
  )
}

export { Footer }
