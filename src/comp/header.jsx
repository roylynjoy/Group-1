import React, { useState} from "react";
import { useNavigate } from "react-router-dom";


function header() {
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
    <div>
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
            <span>Student Dashboard</span>
            <div id="img">
              <img src="src\pictures\icon2.png" alt="" />
              <img src="src\pictures\icon1.png" alt="" />
              <img src="src\pictures\icon3.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default header