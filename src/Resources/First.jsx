import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Resources.css'
import Header from '../comp/header';
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';




const First = () => {
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
            <h5 className="fourth"><Link to="/Resources">Fourth</Link></h5>
            <h5 className="title2"><Link to="/Resources/Third">Third</Link></h5>
            <h5 className="title3"><Link to="/Resources/Second">Second</Link></h5>
            <h5 className="first"><Link to="/Resources/First">First</Link></h5>
            
          </div>

        </div>
      </div>
    </body>
    <footer className="foot1">
      <p>&copy; 2025 LVCC inc... All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
      <IoIosArrowUp id="arrow-up-icon" onClick={scrollToTop} style={{ cursor: 'pointer' }}/>
    </footer>
  </>
  );
};

export default First

