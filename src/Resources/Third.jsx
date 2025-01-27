import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Resources.css'
import Header from '../comp/header';
import NavStudent from '../comp/navStudentResources';
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";





const Third = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
      <Header />
      <NavStudent />              

        <div className="SD-container">
        <div id="perfAtt"></div>
          <div className="welcome">
            <div className="resources-container rc">
                <div id="ST-cont1">
                  <p id="sub">Subject Title</p>
                </div>
                <div id="ST-cont2">
                  <p id="sub">Subject Title</p>
                </div>
                <div id="ST-cont3">
                  <p id="sub ">Subject Title</p>
                </div>
                
            </div>
            <h5 className="fourth"><Link to="/Resources">Fourth</Link></h5>
            <h5 className="third">Third</h5>
            <h5 className="title3"><Link to="/Resources/Second">Second</Link></h5>
            <h5 className="title4"><Link to="/Resources/First">First</Link></h5>
            
          </div>
          <IoSearchSharp className="search"/>
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

export default Third

