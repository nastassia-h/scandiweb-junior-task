import React from 'react'
import { Route, Navigate, Routes } from 'react-router'
import ProductList from '../pages/ProductList'
import ProductAddPage from '../pages/ProductAddPage'

const AppRouter = () => {
   return (
      <Routes>
         <Route path={'/'} element={<ProductList />} />
         <Route path={'/addproduct'} element={<ProductAddPage />} />
         <Route path={'*'} element={< Navigate to={'/'} />} />
         <Route />
      </Routes>
   )
}

export default AppRouter