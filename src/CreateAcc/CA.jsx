import React, { useState } from 'react';
import './CreateAccount.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function CA() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, idNumber, contactNumber, lvEmail, selectedRole } = location.state || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleCA = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, lvEmail, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, "users", userId), {
        name,
        idNumber,
        contactNumber,
        email: lvEmail,
        selectedRole,
      });

      console.log("User successfully registered and added to Firestore.");
      navigate('/StudentDashboard');
    } catch (error) {
      setError(`Failed to sign up: ${error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bd">
      <div className="container" id="container">
        <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
        <form onSubmit={handleCA}>
          <h1 className="CA">Create Account</h1>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button id="btn" type="submit">
            Submit
          </button>
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CA;
