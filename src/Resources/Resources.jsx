import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Resources.css';
import Header from '../comp/header';
import NavStudent from '../comp/navStudent';
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { TiHome } from "react-icons/ti";
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

const Resources = () => {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
            <div className="resources-container">
                <div id="ST-cont1">
                  <p id="sub"><Link to="/Resources/ResourcesBook" >Management Accounting</Link></p>
                </div>
                <div id="ST-cont2">
                  <p id="sub">Accounting Essentials for Small Businesses</p>
                </div>
                <div id="ST-cont3">
                  <p id="sub">Business Advice For Accounting</p>
                </div>
                <div id="ST-cont4">
                  <p id="sub">Financial Accounting</p>
                </div>
            </div>
            <h5 className="title1"><Link to="/Resources">Fourth</Link></h5>
            <h5 className="title2"><Link to="/Resources/Third"> Third</Link></h5>
            <h5 className="title3"><Link to="/Resources/Second">Second</Link></h5>
            <h5 className="title4"><Link to="/Resources/First">First</Link></h5>
          </div>
        </div>
      </div>
    </body>
    <div>
    <footer className="foot1 ">
      <p>&copy; 2025 LVCC Inc... All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
    </footer>
    </div>
  </>
  );
};

export default Resources;
