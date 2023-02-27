import React from 'react'
import { Card, Col, Form } from 'react-bootstrap'

const ProductCard = ({ sku, name, price, attribute }) => {
   return (
      <Col>
         <Card style={{ maxWidth: '18rem' }}>
            <Card.Header>
               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <input type="checkbox" className='delete-checkbox' value={sku} />
                  {/* <Form.Check className='delete-checkbox' type="checkbox" value={sku} /> */}
               </Form.Group>
            </Card.Header>
            <Card.Body className='text-center'>
               <Card.Subtitle>{sku}</Card.Subtitle>
               <Card.Title>{name}</Card.Title>
               <Card.Subtitle>{price}$</Card.Subtitle>
               <Card.Text>{attribute}</Card.Text>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default ProductCard