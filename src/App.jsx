import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Dashboard from './Dashboard/StudentDashboard';
import Homepage from './Homepage/homepage';
import Login from './Login/Login';
import Welcome from './Login/Welcome'
import Resources from './Resources/Resources';
import Third from './Resources/Third';
import Second from './Resources/Second';
import First from'./Resources/First';
import ResourcesBook from './Resources/ResourcesBook';
import Chapter1 from './Resources/chapter1.1';
import Chapter102 from './Resources/chapter1.2';
import Chapter103 from './Resources/chapter1.3';
import Chapter2 from './Resources/chapter2.1';
import Chapter202 from './Resources/chapter2.2';
import Chapter203 from './Resources/chapter2.3';
import Attendance from './Attendance/Attendance';
import SupervisorAtt from './Attendance/SupervisorAtt';
import CompanyAtt from './Attendance/CompanyAtt';
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
        <Route path="/Login/Welcome" element={<Welcome />} />
        <Route path="/StudentDashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="Resources/Third" element={<Third />} />
        <Route path="Resources/Second" element={<Second />} />
        <Route path="Resources/First" element={<First />} />
        <Route path="Resources/ResourcesBook" element={<ResourcesBook />} />
        <Route path="Resources/Chapter1.1" element={<Chapter1 />} />
        <Route path="Resources/Chapter1.2" element={<Chapter102 />} />
        <Route path="Resources/Chapter1.3" element={<Chapter103 />} />
        <Route path="Resources/Chapter2.1" element={<Chapter2 />} />
        <Route path="Resources/Chapter2.2" element={<Chapter202 />} />
        <Route path="Resources/Chapter2.3" element={<Chapter203 />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/SupervisorAtt" element={<SupervisorAtt />} />
        <Route path="/CompanyAtt" element={<CompanyAtt />} />
      </Routes>
    </Router>
  );
}

export default App;

