import React from 'react'
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { Link } from "react-router-dom";

const navSupervisor = () => {
  return (
    <>
      <div className="dash">
        <span>Supervisor Dashboard</span>
        <div id="img">
          <Link to="/SupervisorAtt">
            <FaUserCheck id="icon" />
          </Link>
          <Link to="/Supervisor/SupervisorResources">
            <ImBooks id="icon" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default navSupervisor;
