import React from 'react'
import './CreateAccount.css'


function CA() {
  return (
    <div className="container" id="container">
    <i class="fa-solid fa-arrow-left"></i>
        <form>
          
          <h1 className='CA'>Create Account</h1>
          <span className='spn'>Lorem ipsum dolor sit amet</span>
          <input type="password" placeholder="Admin code"/>
          <input type="password" placeholder="Password" />
          <input type="confirm password"  placeholder="Confirm Password" />
          <button id='btn'>Submit</button>
        </form>
      
    </div>

  )
}

export default CA