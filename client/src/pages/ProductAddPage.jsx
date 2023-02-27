import React, { useState, } from 'react'
import { Button, Stack, Card, Form } from 'react-bootstrap'
import Stripe from '../components/Stripe'
import { Link } from 'react-router-dom'

const ProductAddPage = () => {

   const [type, setType] = useState('Type Switcher');
   const [message, setMessage] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const sku = document.getElementById('sku').value
      const name = document.getElementById('name').value
      const price = document.getElementById('price').value
      const height = document.getElementById('height')?.value ?? null
      const width = document.getElementById('width')?.value ?? null
      const length = document.getElementById('length')?.value ?? null
      const size = document.getElementById('size')?.value ?? null
      const weight = document.getElementById('weight')?.value ?? null

      let formData = new FormData()
      formData.append('sku', sku)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('type', type)
      height && formData.append('height', height)
      width && formData.append('width', width)
      length && formData.append('length', length)
      size && formData.append('size', size)
      weight && formData.append('weight', weight)

      const res = await fetch('https://scandiwebjuniortesttask.000webhostapp.com/addproduct', {
         method: "POST",
         body: formData
      })

      const data = await res.json();

      if (!data?.status) {
         setMessage(data?.message);
      }
      document.getElementById('product_form').reset();
      setType('Type Switcher')
   }

   return (
      <div className='container'>
         <Form id="product_form" onSubmit={handleSubmit} >
            <Stack direction="horizontal" gap={3} style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
               <Card.Title>Product Add</Card.Title>
               <Button size={'sm'} className="ms-auto" type='submit'>Save</Button>
               <Link reloadDocument={false} to='/'>
                  <Button size={'sm'} variant='outline-danger'>Cancel</Button>
               </Link>
            </Stack>
            <Stripe />
            <div className='form-container'>
               <Form.Group className="mb-3" >
                  <Form.Label>SKU</Form.Label>
                  <Form.Control id='sku' name='sku' type="text" required />
               </Form.Group>
               <Form.Group className="mb-3" >
                  <Form.Label>Name</Form.Label>
                  <Form.Control id='name' name='name' type="text" required />
               </Form.Group>
               <Form.Group className="mb-3" >
                  <Form.Label>{'Price ($)'}</Form.Label>
                  <Form.Control id='price' name='price' type="number" required />
               </Form.Group>
               <Form.Group className="mb-3" >
                  <Form.Label>Type Switcher</Form.Label>
                  <Form.Select id="productType" name='type' value={type} onChange={(e) => setType(e.target.value)} required>
                     <option value='Type Switcher'>Type Switcher</option>
                     <option id='DVD' value='DVD'>DVD</option>
                     <option id='Furniture' value='Furniture'>Furniture</option>
                     <option id='Book' value='Book'>Book</option>
                  </Form.Select>
               </Form.Group>
               {type === 'DVD' &&
                  <>
                     <Card.Text>Please provide a size in MB</Card.Text>
                     <Form.Group className="mb-3" >
                        <Form.Label>{'Size (MB)'}</Form.Label>
                        <Form.Control id='size' name='size' type="number" step='0.01' min='1' required />
                     </Form.Group>
                  </>
               }
               {type === 'Book' &&
                  <>
                     <Card.Text>Please provide a weight in KG</Card.Text>
                     <Form.Group className="mb-3" >
                        <Form.Label>{'Weight (KG)'}</Form.Label>
                        <Form.Control id='weight' name='weight' type="number" step='0.01' min='0.01' required />
                     </Form.Group>
                  </>
               }
               {type === 'Furniture' &&
                  <>
                     <Card.Text>Please provide a description in HxWxL format</Card.Text>
                     <Form.Group className="mb-3" >
                        <Form.Label>{'Height (CM)'}</Form.Label>
                        <Form.Control id='height' name='height' type="number" step='0.1' min='1' required />
                     </Form.Group>
                     <Form.Group className="mb-3" >
                        <Form.Label>{'Width (CM)'}</Form.Label>
                        <Form.Control id='width' name='width' type="number" step='0.1' min='1' required />
                     </Form.Group>
                     <Form.Group className="mb-3" >
                        <Form.Label>{'Length (CM)'}</Form.Label>
                        <Form.Control id='length' name='length' type="number" step='0.1' min='1' required />
                     </Form.Group>
                  </>
               }
            </div>
         </Form>
         {message &&
            <Card className='border-danger mb-3'>
               <Card.Body className='text-center'>
                  <Card.Text className='text-danger'>{message}</Card.Text>
               </Card.Body>
            </Card>
         }
      </div>
   )
}

export default ProductAddPage