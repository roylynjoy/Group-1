import React from 'react'
import { TiHome } from "react-icons/ti";
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { Link } from "react-router-dom";

const navStudent = () => {
  return (
    <>
      <div className="dash">
        <span>Resources</span>
        <div id="img">
          <Link to="/StudentDashboard">
            <TiHome id="icon" />
          </Link>
          <Link to="/Attendance">
            <FaUserCheck id="icon" />
          </Link>
          <Link to="/Resources">
            <ImBooks id="icon" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default navStudent;
