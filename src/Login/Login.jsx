import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
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

    // Function to navigate based on the email
    const navigateToDashboard = async (email) => {
        try {
            // Check Students collection for email match
            const studentQuerySnapshot = await getDocs(query(collection(db, 'Students'), where("email", "==", email)));
            if (!studentQuerySnapshot.empty) {
                navigate('/StudentDashboard');
                return;
            }

            // Check Supervisors collection for email match
            const supervisorQuerySnapshot = await getDocs(query(collection(db, 'Supervisors'), where("email", "==", email)));
            if (!supervisorQuerySnapshot.empty) {
                navigate('/SupervisorAtt');
                return;
            }

            // Check Companies collection for email match
            const companyQuerySnapshot = await getDocs(query(collection(db, 'Companies'), where("email", "==", email)));
            if (!companyQuerySnapshot.empty) {
                navigate('/CompanyAtt');
                return;
            }

            // If no match found
            setError('No matching account found. Please contact support.');
        } catch (error) {
            console.error('Error navigating:', error);
            setError(`Error navigating: ${error.message}`);
        }
    };

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
            await signInWithEmailAndPassword(auth, email, password);
            await navigateToDashboard(email);  // Call the function to navigate based on matching collection
        } catch (error) {
            console.error('Error signing in:', error);
            setError(`Error signing in: ${error.message}`);
        }
    };

    // Handle sign-in with Google
    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await navigateToDashboard(user.email); // Navigate based on the user's email
        } catch (error) {
            console.error('Error signing in with Google:', error);
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
                        <button
                            type="button"
                            className={selectedRole === 'Student' ? 'active' : ''}
                            onClick={() => setSelectedRole('Student')}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            className={selectedRole === 'Supervisor' ? 'active' : ''}
                            onClick={() => setSelectedRole('Supervisor')}
                        >
                            Supervisor
                        </button>
                        <button
                            type="button"
                            className={selectedRole === 'Coordinator' ? 'active' : ''}
                            onClick={() => setSelectedRole('Coordinator')}
                        >
                            Coordinator
                        </button>
                    </div>

                    {/* Common fields */}
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

                    {/* Role-specific fields */}
                    {selectedRole === 'Student' && (
                        <>
                            <input
                                type="text"
                                placeholder="Student Major"
                                onChange={(e) => setMajor(e.target.value)} // Example for student-specific field
                            />
                        </>
                    )}
                    {selectedRole === 'Supervisor' && (
                        <>
                            <input
                                type="text"
                                placeholder="Department"
                                onChange={(e) => setDepartment(e.target.value)} // Example for supervisor-specific field
                            />
                        </>
                    )}
                    {selectedRole === 'Coordinator' && (
                        <>
                            <input
                                type="text"
                                placeholder="Coordinator Office"
                                onChange={(e) => setOffice(e.target.value)} // Example for coordinator-specific field
                            />
                        </>
                    )}

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
                        <button id="sgn" onClick={handleSignIn}>
                            Log In
                        </button>
                        <p>or</p>
                        <button id="google" onClick={handleSignInWithGoogle}>
                            <img src="/images/GOOGLE.webp" alt="" /> Sign in with Google
                        </button>
                        {error && <p>{error}</p>}
                    </form>
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
