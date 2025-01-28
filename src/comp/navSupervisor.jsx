import React from 'react'
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { NavLink } from "react-router-dom";

const navSupervisor = () => {
  return (
    <>
      <div className="dash">
        <span>Supervisor Dashboard</span>
        <div id="img">
          <NavLink
            to="/SupervisorAtt"
            id="icon"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaUserCheck />
          </NavLink>
          <NavLink
            to="/Supervisor/SupervisorResources"
            id="icon"
            className={({ isActive }) =>
              isActive || 
              ['/Supervisor/SSecond', '/Supervisor/SFirst', '/Supervisor/SThird', '/Supervisor/SResourcesBook'].includes(window.location.pathname)
                ? "active-link3"
                : ""
            }
          >
            <ImBooks />
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default navSupervisor;
