import React from 'react'
import './Login.js'
import './Login.css'
import { Link } from "react-router-dom";


function Login() {
  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form id='CA'>
          <h1 className="CA">Create Account</h1>
          <div className='role'>
            <p>Student</p>
            <p>Supervisor</p>
            <p>Coordinator</p>
          </div>
          <span>or use your email for registeration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="ID Number" />
          <input type="tel" placeholder="Contact Number" />
          <input type="email" placeholder="LV email" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1 className='signin'>Log In</h1> 
          <span id='spn'>using your laverdad email </span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button id='sgn' >log In</button>
          <p>or</p>
          <button id='google'  ><i class="fa-brands fa-google"></i> Sign in with Google</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login">
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Join Us!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login