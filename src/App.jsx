import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Dashboard from './Dashboard/StudentDashboard';
import Homepage from './Homepage/homepage';
import Login from './Login/Login';
import CA from './CreateAcc/CA';
import CA1 from './CreateAcc/CA1';  
import Resources from './Resources/Resources';
import Subject2 from './Resources/subject2';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CA" element={<CA />} />
        <Route path="/CA1" element={<CA1 />} /> 
        <Route path="/StudentDashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/subject2" element={<Subject2 />} />
      </Routes>
    </Router>
  );
}

export default App;

