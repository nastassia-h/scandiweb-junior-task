import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const { Title } = Card

const Header = () => {
   return (
      <div className='header'>
         <Title>
            <Link to='/'>Scandiweb</Link>
         </Title>
      </div>
   )
}

export default Header