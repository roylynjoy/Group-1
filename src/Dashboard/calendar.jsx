import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths } from "date-fns";

function calendar() {
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
            <h2>{format(currentDate, "MMMM yyyy")}</h2>
            <button onClick={handlePrevMonth}>❮</button>
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

    
  return (
    <div></div>
  )
}

export default calendar