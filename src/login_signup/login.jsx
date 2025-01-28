import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';  // Import necessary functions
import { db } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    // Sign-up state fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
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
            console.log(error);
        } catch (error) {
            console.log(error);
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
// Handle Google Sign-In (only for login)
    const handleGoogleSignIn = async () => {
        try {
            // Sign in with Google without automatically creating a Firebase account
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if the user already exists in Firestore
            const userEmail = user.email.toLowerCase(); // Normalize email to lowercase for comparison

            // Check if the user exists in Students, Supervisors, or Companies collections
            const studentQuerySnapshot = await getDocs(query(collection(db, 'Students'), where("email", "==", userEmail)));
            const supervisorQuerySnapshot = await getDocs(query(collection(db, 'Supervisors'), where("email", "==", userEmail)));
            const companyQuerySnapshot = await getDocs(query(collection(db, 'Companies'), where("email", "==", userEmail)));

            // If the user does not exist in Firestore, show an error and sign out the user
            if (studentQuerySnapshot.empty && supervisorQuerySnapshot.empty && companyQuerySnapshot.empty) {
                setError('No matching account found.');
                console.log(error);
                await auth.signOut(); // Sign the user out immediately to avoid Firebase Auth account creation
            } else {
                // User exists in Firestore, proceed to the respective dashboard
                if (!studentQuerySnapshot.empty) {
                    navigate('/StudentDashboard');
                } else if (!supervisorQuerySnapshot.empty) {
                    navigate('/SupervisorAtt');
                } else if (!companyQuerySnapshot.empty) {
                    navigate('/CompanyAtt');
                }
            }
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };




    // Handle Sign-Up
    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            console.log(error);
            return;
        }
    
        if (selectedRole === 'Supervisor' && adminCode !== 'admin123') {
            setError("Invalid admin code.");
            console.log(error);
            return;
        }

        if (selectedRole === 'Coordinator' && adminCode !== 'admin123') {
            setError("Invalid admin code.");
            console.log(error);
            return;
        }
    
        if (
            (selectedRole !== "Coordinator" && !firstName) || // First Name is required for all roles except Coordinator
            (selectedRole !== "Coordinator" && !lastName) || // Last Name is required for all roles except Coordinator
            (selectedRole !== "Coordinator" && !idNumber) || // ID Number is required for all roles except Coordinator
            !lvEmail || // LV Email is required for all roles
            (selectedRole === "Student" && !company) || // Company is required for Student role
            !password || // Password is required for all roles
            !confirmPassword || // Confirm Password is required for all roles
            (selectedRole === "Supervisor" && !adminCode) || // Admin code is required for Supervisor role
            (selectedRole === "Supervisor" && adminCode !== 'admin123') ||
            (selectedRole === "Coordinator" && adminCode !== 'admin123') || 
            (selectedRole === "Coordinator" && !companyName) // Company name is required for Coordinator role
        ) {
            setError("Please fill in all required fields.");
            return;
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, lvEmail, password);
            const user = userCredential.user;
    
            const normalizedEmail = lvEmail.toLowerCase();
    
            if (selectedRole === 'Student') {
                await addDoc(collection(db, 'Students'), {
                    firstName,
                    lastName,
                    idNumber,
                    email: normalizedEmail,
                    company,
                });
            } else if (selectedRole === 'Supervisor') {
                await addDoc(collection(db, 'Supervisors'), {
                    firstName,
                    lastName,
                    idNumber,
                    email: normalizedEmail,
                });
            } else if (selectedRole === 'Coordinator') {
                await addDoc(collection(db, 'Companies'), {
                    company: companyName,
                    email: normalizedEmail,
                });
            }
    
            setFirstName('');
            setLastName('');
            setIdNumber('');
            setLvEmail('');
            setCompany('');
            setConfirmPassword('');
            setSelectedRole(''); 
            setAdminCode('');
            setError(null);
            setIsActive(false);
            navigate('/Login/Welcome');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };
    

    const handleBack = () => {
        navigate('/Homepage');
    };

    const handleRegisterToggle = () => {
        setIsActive(true);
        setError(null);
    };
    const handleLoginToggle = () => {
        setIsActive(false);
        setError(null);
    };

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
                        <div className="field-container">
                            {selectedRole !== 'Coordinator' && (
                                <input
                                    className='field'
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    disabled={!selectedRole}
                                />
                            )}

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
                        </div>
            
                        {selectedRole === 'Coordinator' && (
                            <input
                                className='field'
                                type="text"
                                placeholder="Company Name"
                                onChange={(e) => setCompanyName(e.target.value)}
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
                            placeholder="Email"
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
                        <input
                            className='field'
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={!selectedRole}
                        />
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
                        {error && !message && <p className="error">{error}</p>}
                        {message && !error && <p className="message">{message}</p>}
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
                        <p id='forgot'>Forgot your password?</p>
                        <button id='sgn' onClick={handleSignIn}>Log In</button>
                        <p id='decoy'>────────── or ──────────</p>
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
                            <p>Access your account to continue your journey!</p>
                            <button id="login" onClick={handleLoginToggle}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Join Us!</h1>
                            <p>Register to get the most out of your experience.</p>
                            <button id="register" onClick={handleRegisterToggle}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Login;
