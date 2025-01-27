import React from "react";
import { TiHome } from "react-icons/ti";
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { NavLink } from "react-router-dom";

const navStudent = () => {
  return (
    <>
      <div className="dash">
        <span>Student Dashboard</span>
        <div id="img">
          <NavLink
            to="/StudentDashboard"
            id="icon"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <TiHome />
          </NavLink>
          <NavLink
            to="/Attendance"
            id="icon"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaUserCheck />
          </NavLink>
          <NavLink
            to="/Resources"
            id="icon"
            className={({ isActive }) => (isActive ? "active-link3" : "")}
          >
            <ImBooks />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default navStudent;
