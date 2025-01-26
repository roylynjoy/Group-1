import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';  // Import necessary functions
import { db } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Sign-up state fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [lvEmail, setLvEmail] = useState('');
    const [company, setCompany] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('Student'); // Set default role to 'Student'
    const [adminCode, setAdminCode] = useState('');
    const [companies, setCompanies] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [roleMessageVisible, setRoleMessageVisible] = useState(true); // New state for role message visibility

    const navigate = useNavigate();


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
            setError('No matching account found.');
        } catch (error) {
            console.error('Error navigating:', error);
            setError(`Error navigating: ${error.message}`);
        }
    };

    // Fetch companies from Firestore
    useEffect(() => {
        const fetchCompanies = async () => {
            const querySnapshot = await getDocs(collection(db, 'Companies'));
            const companiesList = querySnapshot.docs.map(doc => doc.data().company);
            setCompanies(companiesList);
        };
        fetchCompanies();
    }, []);  

    // Handle Sign-In
// Handle Sign-In
    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both email and password are required.');
            return;
        }

        // Convert email to lowercase before signing in
        const normalizedEmail = email.toLowerCase();

        try {
            // Sign in using the lowercase email
            await signInWithEmailAndPassword(auth, normalizedEmail, password);

            // Call the function to navigate based on matching collection
            await navigateToDashboard(normalizedEmail); 
        } catch (error) {
            setError(error.message);
        }
    };


    // Handle Google Sign-In
// Handle Google Sign-In (only for login)
    const handleGoogleSignIn = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user already exists in Firebase Authentication (by checking the email)
            const userEmail = user.email.toLowerCase(); // Normalize email to lowercase for comparison

            // Check if the user exists in Firestore (Students, Supervisors, or Companies)
            const studentQuerySnapshot = await getDocs(query(collection(db, 'Students'), where("email", "==", userEmail)));
            const supervisorQuerySnapshot = await getDocs(query(collection(db, 'Supervisors'), where("email", "==", userEmail)));
            const companyQuerySnapshot = await getDocs(query(collection(db, 'Companies'), where("email", "==", userEmail)));

            // If the user exists in any of the collections, proceed to the respective dashboard
            if (!studentQuerySnapshot.empty) {
                navigate('/StudentDashboard');
            } else if (!supervisorQuerySnapshot.empty) {
                navigate('/SupervisorAtt');
            } else if (!companyQuerySnapshot.empty) {
                navigate('/CompanyAtt');
            } else {
                setError('No matching account found.');
                // Optionally sign the user out if no matching account is found in Firestore
                await auth.signOut();
            }
        } catch (error) {
            setError(`Error Signing In: ${error.message}`);
        }
    };

    // Handle Sign-Up
    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        if (selectedRole === 'Supervisor' || selectedRole === 'Coordinator') {
            if (adminCode !== 'admin123') {
                setError("Invalid admin code.");
                return;
            }
        }
    
        try {
            // Create user in Firebase Authentication with the original email
            const userCredential = await createUserWithEmailAndPassword(auth, lvEmail, password);
            const user = userCredential.user;
    
            // Add user data to Firestore with the email stored as lowercase
            const normalizedEmail = lvEmail.toLowerCase();
    
            if (selectedRole === 'Student') {
                await addDoc(collection(db, 'Students'), {
                    firstName,
                    lastName,
                    idNumber,
                    email: normalizedEmail, // Store lowercase email in Firestore
                    company,
                });
            } else if (selectedRole === 'Supervisor') {
                await addDoc(collection(db, 'Supervisors'), {
                    firstName,
                    lastName,
                    idNumber,
                    email: normalizedEmail, // Store lowercase email in Firestore
                });
            } else if (selectedRole === 'Coordinator') {
                await addDoc(collection(db, 'Companies'), {
                    company: firstName,
                    email: normalizedEmail, // Store lowercase email in Firestore
                });
            }
    
            // Clear the fields after successful signup
            setFirstName('');
            setLastName('');
            setIdNumber('');
            setLvEmail('');
            setCompany('');
            setConfirmPassword('');
            setSelectedRole(''); // Optionally reset the role
            setAdminCode('');
            setError(null); // Clear error message
            setIsActive(false); // Optionally close the sign-up form
            navigate('/Login/Welcome'); // Adjust as needed
        } catch (error) {
            setError(`Error signing up: ${error.message}`);
        }
    };
    

    const handleBack = () => {
        navigate(-1);
    };

    const handleRegisterToggle = () => setIsActive(true);
    const handleLoginToggle = () => setIsActive(false);

    // Handle role selection
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    return (
        <body className="body">
            <i className="fa-solid fa-arrow-left back" onClick={handleBack}></i>
            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                {/* Create Account Form */}
                <div className="form-container sign-up">
                    <form id="CA" onSubmit={handleSignUp}>
                        <h1 className='CA'>Create Account</h1>

                        <div className="role">
                            <button
                                id='rl'
                                type="button"
                                className={selectedRole === 'Student' ? 'active' : ''} 
                                onClick={() => handleRoleSelect('Student')}
                            >
                                Student
                            </button>
                            <button
                                id='rl'
                                type="button"
                                className={selectedRole === 'Supervisor' ? 'active' : ''} 
                                onClick={() => handleRoleSelect('Supervisor')}
                            >
                                Supervisor
                            </button>
                            <button
                                id='rl'
                                type="button"
                                className={selectedRole === 'Coordinator' ? 'active' : ''} 
                                onClick={() => handleRoleSelect('Coordinator')}
                            >
                                Coordinator
                            </button>
                        </div>

                        <input
                            className='field'
                            type="text"
                            placeholder={selectedRole === 'Coordinator' ? "Name" : "First Name"}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            disabled={!selectedRole}
                        />
                        {selectedRole !== 'Coordinator' && (
                            <input
                                className='field'
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                disabled={!selectedRole}
                            />
                        )}
                        {selectedRole !== 'Coordinator' && (
                            <input
                                className='field'
                                type="text"
                                placeholder="ID Number"
                                onChange={(e) => setIdNumber(e.target.value)}
                                required
                                disabled={!selectedRole}
                            />
                        )}
                        <input
                            className='field'
                            type="email"
                            placeholder="LV Email"
                            onChange={(e) => setLvEmail(e.target.value)}
                            required
                            disabled={!selectedRole}
                        />
                        {selectedRole === 'Student' && (
                            <select
                                className='field'
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                disabled={!selectedRole}
                            >
                                <option value="">Select Company</option>
                                {companies.map((company, index) => (
                                    <option key={index} value={company}>{company}</option>
                                ))}
                            </select>
                        )}
                        {selectedRole !== 'Coordinator' && (
                            <input
                                className='field'
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={!selectedRole}
                            />
                        )}
                        <input
                            className='field'
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={!selectedRole}
                        />
                        {selectedRole === 'Supervisor' || selectedRole === 'Coordinator' ? (
                            <input
                                className='field'
                                type="password"
                                placeholder="Admin Code"
                                onChange={(e) => setAdminCode(e.target.value)}
                                required
                                disabled={!selectedRole}
                            />
                        ) : null}
                        <button
                            id='SU'
                            onClick={handleSignUp}
                            type="submit"
                            disabled={!selectedRole} // Disable the button if no role is selected
                        >
                            Sign Up
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>

                {/* Log In Form */}
                <div className="form-container sign-in">
                    <form>
                        <h1 className='signin'>Log In</h1>
                        <input
                            className='em-log'
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className='pass-log'
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p>Forgot your password?</p>
                        <button id='sgn' onClick={handleSignIn}>Log In</button>
                        <p>────────── or ──────────</p>
                        <button id='google' type="button" onClick={handleGoogleSignIn}>
                            <img id='google-logo' src="/images/GOOGLE.webp" alt="" /> Sign in with Google
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>

                {/* Toggle Panels */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us, please log in with your personal info</p>
                            <button id="login" onClick={handleLoginToggle}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button id="register" onClick={handleRegisterToggle}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Login;
