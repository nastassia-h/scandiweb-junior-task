import React, { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import Stripe from '../components/Stripe'
import { Link } from 'react-router-dom'

const { Title } = Card

const ProductList = () => {

   const [products, setProducts] = useState([]);

   const getProducts = async () => {
      const res = await fetch('https://scandiwebjuniortesttask.000webhostapp.com')
      const data = await res.json()
      setProducts(data)
   }

   useEffect(() => {
      getProducts()
   }, [])

   const handleSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData()

      let selectedCheckBoxes = document.querySelectorAll('.delete-checkbox');
      Array.from(selectedCheckBoxes).filter(cb => cb.checked).map(cb => formData.append('sku[]', cb.value))

      await fetch(`https://scandiwebjuniortesttask.000webhostapp.com`, {
         method: "POST",
         body: formData
      })

      getProducts()
   }

   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <Stack direction="horizontal" gap={3} style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
               <Title>Product List</Title>
               <Link className="ms-auto" to='/addproduct'>
                  <Button id="add-product-btn" size={'sm'} >ADD</Button>
               </Link>
               <Button id="delete-product-btn" size={'sm'} variant='outline-danger' type='submit'>MASS DELETE</Button>
            </Stack>
            <Stripe />
            <div className='product-grid'>
               {products?.map(product =>
                  <ProductCard key={product.id} sku={product.sku} price={product.price} name={product.name} attribute={product.attribute} />
               )}
            </div>
         </form>
      </div>
   )
}

export default ProductList