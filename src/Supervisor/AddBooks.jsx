import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Resources/Resources.css';
import { Link } from 'react-router-dom';
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { TiHome } from "react-icons/ti";
import { FiFilePlus } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";




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
          <span>Supervisor Resources</span>
            <div id="img">
              <Link to="/" ><TiHome id="icon"/></Link>
              <FaUserCheck id="icon"/>
              <Link to="/" ><ImBooks id="icon"/></Link>
            </div>
        </div>
        
        <div className="bg">   
            <img src="/images/bg2.png" alt="" /> 
            <div className="bag">
            <div className="Book-container add-container">
                <FaArrowLeft  className="addarrow" onClick={handleBack}/>
                <div className="plus">
                    <FiFilePlus />
                </div>
                <p>Subject Title : ______________</p>
                <p>Instructor Name : ______________</p> 
                <h5>Course Description</h5>   
                <i>Description...</i>
                <h5>Table of Content</h5>
                <p>Module 1: ___________________</p>
                <div className="add2">
                    <p><LuPenLine /> Chapter 1.1 : __________________</p>
                    <h6><IoMdAddCircleOutline />Add Chapter</h6>
                </div>
                <p><IoMdAddCircleOutline />Add Module</p>
            </div>
            </div>
          </div>
        </div>
    </body>
    <footer className="foot">
      <p>&copy; 2025 LVCC inc... All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
    </footer>
  </>
  );
};

export default ResourcesBook;
