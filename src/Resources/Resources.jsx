import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Resources.css';
import Footer from '../comp/footer';


const Resources = () => {;
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
            <img src="src/pictures/logo.png" alt="Logo" />
          <h1>Fieldmate</h1>
          </div>
          
          <div className="user-profile">
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-bell"></i>
            <i class="fa-solid fa-envelope"></i>
            <img 
              src="src\pictures\user1.png" 
              alt="User" 
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            />
            {showLogoutBox && (
              <div className="logout-box">
                <button id="edit">Edit Profile</button>
                <button id="edit">Settings</button>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="dash">
            <span>Student Resources</span>
            <div id="img">
              <img src="src\pictures\icon2.png" alt="" />
              <img src="src\pictures\icon1.png" alt="" />
              <img src="src\pictures\icon3.png" alt="" />
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
                <div id="ST-cont3">
                  <p id="sub">Subject Title</p>
                </div>
                <div id="ST-cont4">
                  <p id="sub">Subject Title</p>
                </div>
            </div>
            <h5 className="title1">Fourth</h5>
            <h5 className="title2">Third</h5>
            <h5 className="title3">Second</h5>
            <h5 className="title4">First</h5>
            
          </div>

        </div>
      </div>
    </body>
    <Footer />
  </>
  );
};

export default Resources

