import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from "../comp/header";
import NavSupervisoResources from '../comp/navSupervisorResources';
import { FaPlus } from "react-icons/fa";

const SThird = () => {
  return (
    <>
    <body className="bd1">
      <div className="Resources">
      <Header/>
      <NavSupervisoResources />
      <div className="SD-container">
          <div id="perfAtt"></div>
          <div className="welcome">
            <div className="resources-container rc">
                <div id="ST-cont1">
                  <p id="sub"><Link to="/Resources/ResourcesBook" >Management Accounting</Link></p>
                </div>
                <div id="ST-cont2">
                  <p id="sub">Accounting Essentials for Small Businesses</p>
                </div>
                <div id="add">
                  <Link to="/Supervisor/AddBooks"><FaPlus /></ Link>
                </div>
            </div>
            <h5 className="fourth"><Link to="/Supervisor/SupervisorResources">Fourth</Link></h5>
            <h5 className="third"><Link to="/Supervisor/SThird"> Third</Link></h5>
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

export default SThird;
