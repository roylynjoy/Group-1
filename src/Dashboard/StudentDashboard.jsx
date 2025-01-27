import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SD.css';
import Header from '../comp/header';
import Footer from "../comp/footer";
import NavStudent from '../comp/navStudent';
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
        <NavStudent/>
        <div className="SD-container">

          <div className="grid">
            <div className="col-span-3 perf ">
              <div id="perf">
              <h1>Welcome, Joanna!</h1>
              <span>Always stay connected in your Fieldmate</span>
              </div>
              <img src="/images/user1.1.png" alt="" />
            </div>

            

            <div className="date col-span-1 row-span-1">
              <Calendar/>
            </div>

            <div className="performance col-span-1">
              <h3>Total Hours Rendered</h3>
              <img src="/images/perf.png" alt="" />
            </div>

            <div className="col-span-1 readings">
              <h3>Recent Readings</h3>
              <img src="/images/readings.png" alt="" />
              <p>Major Subject Title</p>
              <p>Module x - Chapter Title</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  <Footer/>

  </>
  );
};

export default Dashboard

