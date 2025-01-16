import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className='WC'>
        <h1>Welcome to Fieldmate!</h1>
        <p>Thank you for joining us!</p>
        <button><Link to='/Login'>BACK TO LOGIN</Link></button>
    </div>
  )
}

export default Welcome