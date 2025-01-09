import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Ensure Firebase auth is imported

function CA1() {
  const navigate = useNavigate();
  
  // State management for form inputs
  const [adminCode, setAdminCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (adminCode !== '123') { // Replace with actual admin code check
      setError('Invalid admin code.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Here you can add logic to create a user or perform any other action
      // For example, creating a user in Firebase or any other service

      // Navigate to the Student Dashboard upon successful submission
      navigate('/StudentDashboard');
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bd">
      <div className="container" id="container">
        <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
        <form onSubmit={handleSubmit}>
          <h1 className='CA'>Create Account</h1>
          <input
            type="text"
            placeholder="Admin code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button id='btn' type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CA1;

