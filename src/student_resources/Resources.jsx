import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Resources.css';
import Header from '../components/header';
import NavStudent from '../components/navStudentResources';
import Footer from "../components/footer";
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";



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
          <IoSearchSharp className="search"/>
        </div>
      </div>
    </body>
    <div>
      <Footer/>
    </div>
  </>
  );
};

export default Resources;