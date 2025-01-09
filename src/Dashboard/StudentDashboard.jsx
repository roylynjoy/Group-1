import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SD.css';
import '../index.css';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths } from "date-fns";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>❮</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth}>❯</button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];
    return (
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div className="calendar-day-name" key={day}>
            {day} 
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = startOfWeek(addDays(monthEnd, 6));
  
    const today = new Date(); // Get today's date
    const todayDay = format(today, "d");
    const todayMonthYear = format(today, "MMMM yyyy");
  
    const rows = [];
    let days = [];
    let day = startDate;
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = day >= monthStart && day <= monthEnd;
        const isToday =
          format(day, "d") === todayDay && format(day, "MMMM yyyy") === todayMonthYear;
  
        days.push(
          <div
            className={`calendar-cell ${isCurrentMonth ? "current-month" : "other-month"} ${
              isToday ? "today" : ""
            }`}
            key={day}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
  
    return <div className="calendar-body">{rows}</div>;
  };
  

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-PH", {
      weekday: "long", 
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <body className="bd1">
      <div className="dashboard">
        <header className="header">
          <div id="logo">
            <img src="src/pictures/logo.png" alt="Logo" />
          <h1>Fieldmate</h1>
          </div>
          
          <div className="user-profile">
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-bell"></i>
            <i class="fa-solid fa-envelope"></i>
            <img 
              src="src\pictures\user1.png" 
              alt="User" 
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            />
            {showLogoutBox && (
              <div className="logout-box">
                <button id="edit">Edit Profile</button>
                <button id="edit">Settings</button>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="dash">
            <span>Student Dashboard</span>
            <div id="img">
              <img src="src\pictures\icon2.png" alt="" />
              <img src="src\pictures\icon1.png" alt="" />
              <img src="src\pictures\icon3.png" alt="" />
            </div>
        </div>

        <div className="SD-container">

          <div className="grid">
            <div className="col-span-3 perf ">
              
            </div>

            

            <div className="date col-span-1 row-span-1">
              <Calendar/>
            </div>

            <div className="performance col-span-1">
              <h3>Overall Performance</h3>
              <div className="performance-circle">90.3%</div>
            </div>

            <div className="col-span-1 readings">
              <h3>Recent Readings</h3>
              <p>Major Subject Title</p>
              <p>Module x - Chapter Title</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Dashboard

