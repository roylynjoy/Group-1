import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 

function Login() {
    const [error, setError] = useState(null);

    // States for Create Account form
    const [name, setName] = useState('');
    const [lvEmail, setLvEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    
    const [isActive, setIsActive] = useState(false); 
    const navigate = useNavigate();

    // Handle sign-in with email and password
    
    // Toggle the "active" class for switching forms
    const handleRegisterToggle = () => setIsActive(true);
    const handleLoginToggle = () => setIsActive(false);

    // Handle Next Button Click
    const handleNext = (e) => {
        e.preventDefault();

        // Navigate to different pages based on selected role
        if (selectedRole === 'Student') {
            navigate('/Login/Welcome');
        } else if (selectedRole === 'Supervisor') {
            navigate('/');
        } else if (selectedRole === 'Coordinator') {
            navigate('/');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Company");

    const options = ["ABC Company", "XYZ Company"];

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option, e) => {
        e.stopPropagation();
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (!event.target.closest(".dropdown")) {
            setIsOpen(false);
        }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <body className="body">
            <i class="fa-solid fa-arrow-left back" onClick={handleBack}></i>
            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                {/* Create Account Form */}
                <div className="form-container sign-up">
                    <form id="CA">
                        <h1 className="CA">Create Account</h1>

                        {/* Role selection buttons */}
                        <div className="role">
                            <button id='rl'
                                type="button"
                                className={selectedRole === 'Student' ? 'active' : ''}
                                onClick={() => setSelectedRole('Student')}
                            >
                                Student
                            </button>
                            <button id='rl'
                                type="button"
                                className={selectedRole === 'Supervisor' ? 'active' : ''}
                                onClick={() => setSelectedRole('Supervisor')}
                            >
                                Supervisor
                            </button>
                            <button id='rl'
                                type="button"
                                className={selectedRole === 'Coordinator' ? 'active' : ''}
                                onClick={() => setSelectedRole('Coordinator')}
                            >
                                Coordinator
                            </button>
                        </div>

                        {/* Form inputs */}
                        <div className='name'>
                        <input id='input'
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input id='input'
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <input id='input1'
                            type="number"
                            placeholder="Supervisor Number"
                        />
                        <input id='input1'
                            type="email"
                            placeholder="LV Email"
                            onChange={(e) => setLvEmail(e.target.value)}
                        />
                        <div className="dropdown">
                        <button className="dropdown-toggle" onClick={toggleDropdown}>
                            {selectedOption} <span className="arrow">&#9662;</span>
                        </button>
                        
                        {isOpen && (
                            <ul className="dropdown-menu">
                            {options.map((option, index) => (
                                <li
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleOptionClick(option)}
                                >
                                {option}
                                </li>
                            ))}
                            </ul>
                        )}
                        </div>
                        <input id='input1'
                            type="password"
                            placeholder="Password"
                        />
                        <input id='input1'
                            type="password"
                            placeholder="Confirm Password"
                        />
                        

                        {/* Next Button */}
                        <button id='SU'
                            type="button" 
                            onClick={handleNext}
                        >
                            SIGN UP
                        </button>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div>

                {/* Log In Form */}
                <div className="form-container sign-in">
                    <form>
                        <h1 className="signin">Log In</h1>
                        <input
                            className="input"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className="input"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <a href="#">Forgot Your Password?</a>
                        <button id="sgn">
                            Log In
                        </button>
                        <p>or</p>
                        <button id="google">
                            <img src="src\pictures\GOOGLE.webp" alt="" /> Sign in with Google
                        </button>
                        {error && <p>{error}</p>}
                    </form>
                    
                    <div>
                        
                    </div>
                    
                </div>

                {/* Toggle Panels */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of the site's features</p>
                            <button id="login" onClick={handleLoginToggle}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Join Us!</h1>
                            <p>Register with your personal details to use all of the site's features</p>
                            <button id="register" onClick={handleRegisterToggle}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Login;
