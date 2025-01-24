import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Resources.css';
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { TiHome } from "react-icons/ti";


const ResourcesBook = () => {
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

  const handleBack = () => {
    navigate(-1);
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
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-envelope"></i>
            <img 
              src="/images/user1.png" 
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
          <span>Resources</span>
            <div id="img">
              <Link to="/StudentDashboard" ><TiHome id="icon"/></Link>
              <FaUserCheck id="icon"/>
              <Link to="/Resources" ><ImBooks id="icon"/></Link>
            </div>
        </div>
        
        <div className="bg">   
            <img src="/images/bg2.png" alt="" /> 
            <div className="bag">
            <div className="Book-container">
              <div className="MA">
                <i class="fa-solid fa-arrow-left bookback" onClick={handleBack}></i>
                <h2>Management Accounting</h2>
              </div>
                <div>
                    <p>Course Description</p>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                    <p>Table of Content</p>
                    <div className="TOC">
                    <h6>Module 1: Lorem Ipsum Dolor Sit Amet: Consectetur Adipiscing Elit</h6>
                    <p><Link to="/Resources/chapter1.1">Chapter 1.1 Curabitur Vehicula Arcu Et Egestas Facilisis</Link></p>
                    <p><Link to="/Resources/chapter1.2">Chapter 1.2 Suspendisse Etiam Condimentum Nibh Sit Amet Ultricies</Link></p>
                    <p><Link to="/Resources/chapter1.3">Chapter 1.3 Mauris Dhui Ligula, Vulputate Sit Amet Nulla Ne</Link></p>
                    <h6>Module 2: Sed Ut Perspiciatis Unde Omnis Iste Natus Error</h6>
                    <p><Link to="/Resources/chapter2.1">Chapter 2.1 Curabitur Vehicula Arcu Et Egestas Facilisis</Link></p>
                    <p><Link to="/Resources/chapter2.2">Chapter 2.2 Suspendisse Etiam Condimentum Nibh Sit Amet Ultricies</Link></p>
                    <p><Link to="/Resources/chapter2.3">Chapter 2.3 Mauris Dui Ligula, Vulputate Sit Amet Nulla Ne</Link></p>
                    </div>
                </div>
            </div>
            </div>
          </div>
        </div>
    </body>
    <footer className="foot">
      <p>&copy; 2025 LVCC inc... All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
      <IoIosArrowUp id="arrow-up-icon" onClick={scrollToTop} style={{ cursor: 'pointer' }}/>
    </footer>
  </>
  );
};

export default ResourcesBook;
