import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Resources/Resources.css'
import Header from '../comp/header';
import Footer from "../comp/footer";
import NavSupervisor from '../comp/navSupervisor';
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { TiHome } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";





const Third = () => {

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
      <Header/>
      <NavSupervisor />

        <div className="SD-container">
        <div id="perfAtt"></div>
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
            <h5 className="fourth"><Link to="/Supervisor/SupervisorResources">Fourth</Link></h5>
            <h5 className="third">Third</h5>
            <h5 className="title3"><Link to="/Supervisor/SSecond">Second</Link></h5>
            <h5 className="title4"><Link to="/Supervisor/SFirst">First</Link></h5>
            
          </div>

        </div>
      </div>
    </body>
    <Footer/>
  </>
  );
};

export default Third

