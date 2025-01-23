import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SD.css';
import Header from '../comp/header';
import Calendar from "./calendar";
import { IoIosArrowUp } from "react-icons/io";





const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <body className="bd1">
      <div className="dashboard">
        <Header />

        <div className="SD-container">

          <div className="grid">
            <div className="col-span-3 perf ">
              <div id="perf">
              <h1>Welcome Back, Joanna!</h1>
              <span>Always stay connected in your Fieldmate</span>
              </div>
              <img src="../src/pictures/user1.1.png" alt="" />
            </div>

            

            <div className="date col-span-1 row-span-1">
              <Calendar/>
            </div>

            <div className="performance col-span-1">
              <h3>Total Hours Rendered</h3>
              <img src="../src/pictures/perf.png" alt="" />
            </div>

            <div className="col-span-1 readings">
              <h3>Recent Readings</h3>
              <img src="../src/pictures/readings.png" alt="" />
              <p>Major Subject Title</p>
              <p>Module x - Chapter Title</p>
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

export default Dashboard

