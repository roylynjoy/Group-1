import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Dashboard from './dashboard/studentDashboard';
import Homepage from './homepage/homepage';
import Login from './login_signup/login';
import Welcome from './login_signup/welcomePage'
import Resources from './student_resources/Resources';
import Third from './student_resources/Third';
import Second from './student_resources/Second';
import First from'./student_resources/First';
import ResourcesBook from './student_resources/ResourcesBook';
import Chapter1 from './student_resources/chapter1.1';
import Chapter102 from './student_resources/chapter1.2';
import Chapter103 from './student_resources/chapter1.3';
import Chapter2 from './student_resources/chapter2.1';
import Chapter202 from './student_resources/chapter2.2';
import Chapter203 from './student_resources/chapter2.3';
import SupervisorResources from './supervisor-resources/SupervisorResources';
import SResourcesBook from './supervisor-resources/SResourcesBook';
import SThird from './supervisor-resources/SThird';
import SSecond from './supervisor-resources/SSecond';
import SFirst from './supervisor-resources/SFirst';
import AddBooks from './supervisor-resources/AddBooks'
import Attendance from './attendance/studentAtt';
import SupervisorAtt from './attendance/supervisorAtt';
import CompanyAtt from './attendance/companyAtt';
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
        <Route path="Supervisor/SupervisorResources" element={<SupervisorResources />} />
        <Route path="Supervisor/SResourcesBook" element={<SResourcesBook />} />
        <Route path="Supervisor/SThird" element={<SThird />} />
        <Route path="Supervisor/SSecond" element={<SSecond />} />
        <Route path="Supervisor/SFirst" element={<SFirst />} />
        <Route path="Supervisor/AddBooks" element={<AddBooks />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/SupervisorAtt" element={<SupervisorAtt />} />
        <Route path="/CompanyAtt" element={<CompanyAtt />} />
      </Routes>
    </Router>
  );
}

export default App;

