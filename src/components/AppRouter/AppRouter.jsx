import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../../pages/Home'
import { NotFound } from '../../pages/NotFound'
import { PokemonInfo } from '../../pages/PokemonInfo'
import { Layout } from '../Layout/Layout'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<Home />}></Route>
        <Route path="/pokemon/:id" element={<PokemonInfo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  )
}

export { AppRouter }
