import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 

function Login() {
    // States for Login form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // States for Create Account form
    const [name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [lvEmail, setLvEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    
    const [isActive, setIsActive] = useState(false); 
    const navigate = useNavigate();

    // Handle sign-in with email and password
    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email.includes('laverdad.edu.ph')) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!email || !password) {
            setError('Both email and password are required.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/StudentDashboard')
            
            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', userId));
            console.log('Fetching user data from Firestore...');

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User data retrieved:', userData);
                
                // Check user role and navigate accordingly
                if (userData.role === 'Student') {
                    navigate('/student-dashboard'); // Adjust the path as necessary
                } else if (userData.role === 'Supervisor') {
                    navigate('/supervisor-dashboard'); // Adjust the path as necessary
                } else {
                    navigate('/'); // Default redirect
                }
            } else {
                console.error('No user data found in Firestore.');
                setError('No account data found. Please contact support.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError(`Error signing in: ${error.message}`);
        }
    };

    // Handle sign-in with Google
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/studentDashboard');
        } catch (error) {
            setError(`Error signing in with Google: ${error.message}`);
        }
    };

    // Toggle the "active" class for switching forms
    const handleRegisterToggle = () => setIsActive(true);
    const handleLoginToggle = () => setIsActive(false);

    // Handle Next Button Click
    const handleNext = (e) => {
        e.preventDefault();
        
        // Validate the form and selected role
        if (!name || !idNumber || !contactNumber || !lvEmail || !selectedRole) {
            setError("Please fill out all fields and select a role.");
            return;
        }

        // Navigate to different pages based on selected role
        if (selectedRole === 'Student') {
            navigate('/CA');
        } else if (selectedRole === 'Supervisor') {
            navigate('/CA1'); // Or any other page for Supervisor
        } else if (selectedRole === 'Coordinator') {
            navigate('/CA1'); // Or any other page for Coordinator
        }
    };

    // Check if Next button should be enabled (role selected and form filled)
    const isNextEnabled = name && idNumber && contactNumber && lvEmail && selectedRole;

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <body className="body">
            <i class="fa-solid fa-arrow-left back" onClick={handleBack}></i>
            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                {/* Create Account Form */}
                <div className="form-container sign-up">
                    <form id="CA">
                        <h1 className="CA">Create Account</h1>
                        <span>or use your email for registration</span>

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
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="ID Number"
                            onChange={(e) => setIdNumber(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Contact Number"
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="LV email"
                            onChange={(e) => setLvEmail(e.target.value)}
                        />

                        {/* Next Button */}
                        <button 
                            type="button" 
                            onClick={handleNext}
                            disabled={!isNextEnabled}  // Disable if form is incomplete or no role selected
                        >
                            Next
                        </button>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div>

                {/* Log In Form */}
                <div className="form-container sign-in">
                    <form>
                        <h1 className="signin">Log In</h1>
                        <span id="spn">using your La Verdad email</span>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <a href="#">Forgot Your Password?</a>
                        <button id="sgn" onClick={handleSignIn}>
                            Log In
                        </button>
                        <p>or</p>
                        <button id="google" onClick={handleSignInWithGoogle}>
                            <i className="fa-brands fa-google"></i> Sign in with Google
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
