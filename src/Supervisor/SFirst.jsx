import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Resources/Resources.css'
import { Link } from 'react-router-dom';
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { TiHome } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";




const First = () => {
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowLogoutBox(!showLogoutBox);
  };

  const handleLogout = () => {
    navigate('/homepage');
    console.log("User logged out");
    setShowLogoutBox(false);
  };

  return (
    <>
    <body className="bd1">
      <div className="Resources">
      <header className="header">
          <div id="logo">
            <img src="/images/logo.png" alt="Logo" />
            <h1>Fieldmate</h1>
          </div>
                
          <div className="user-profile">
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-envelope"></i>
            <img src="/images/user1.png" alt="User" onClick={handleProfileClick} style={{ cursor: 'pointer' }}/>
            {showLogoutBox && (
              <div className="logout-box">
                <button id="edit">Edit Profile</button>
                <button id="edit">Settings</button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            )}
          </div>
        </header>
      
        <div className="dash">
          <span>Supervisor Resources</span>
            <div id="img">
              <Link to="/" ><TiHome id="icon"/></Link>
              <FaUserCheck id="icon"/>
              <ImBooks id="icon"/>
            </div>
        </div>

        <div className="SD-container">
          <div className="welcome">
            <div className="resources-container">
                <div id="ST-cont1">
                  <p id="sub">Subject Title</p>
                </div>
                <div id="ST-cont2">
                  <p id="sub">Subject Title</p>
                </div>
                <div id="add">
                  <Link to="/Supervisor/AddBooks"><FaPlus /></ Link>
                </div>
            </div>
            <h5 className="title1"><Link to="/Supervisor/SupervisorResources">Fourth</Link></h5>
            <h5 className="title2"><Link to="/Supervisor/SThird"> Third</Link></h5>
            <h5 className="title3"><Link to="/Supervisor/SSecond">Second</Link></h5>
            <h5 className="title4"><Link to="/Supervisor/SFirst">First</Link></h5>
          </div>
        </div>
      </div>
    </body>
    <footer className="foot1">
      <p>&copy; 2025 LVCC inc... All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
    </footer>
  </>
  );
};

export default First

