import React, { useState, useEffect } from 'react';
import './Att.css';
import '../index.css';
import HeaderSup from '../comp/headerSup';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SupervisorAtt = () => {
  const [date, setDate] = useState(new Date()); // Default to current date
  const [attendances, setAttendances] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState('attendance');
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email || '';

  useEffect(() => {
    if (userEmail) {
      verifySupervisorEmail();
    }
  }, [userEmail]);

  const verifySupervisorEmail = async () => {
    try {
      const studentsRef = collection(db, 'Supervisors');
      const q = query(studentsRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setIsSupervisor(false);
        navigate('/login'); 
        return;
      }
      setIsSupervisor(true);
    } catch (error) {
      console.error('Error verifying supervisor email:', error);
      setMessage('An error occurred while verifying your email.');
      setIsSupervisor(false);
    }
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      setDate(newDate);
    } else {
      setMessage('Invalid date selected');
    }
    setIsCalendarOpen(false); // Close calendar
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const formatDateDisplay = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      const selectedDate = new Date(date) || new Date();  // Ensure the date is a valid Date object
      selectedDate.setHours(0, 0, 0, 0);  // Set the start of the day
      const startOfDay = new Date(selectedDate); // Make a copy for start
      selectedDate.setHours(23, 59, 59, 999); // Set the end of the day
      const endOfDay = new Date(selectedDate); // Make a copy for end
  
      setIsLoading(true);
      setMessage('');
  
      try {
        const attendanceCollectionRef = collection(db, 'Attendance');
        const q = query(
          attendanceCollectionRef,
          where('Date', '>=', startOfDay),
          where('Date', '<=', endOfDay)
        );
  
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          setMessage('No attendance records found for the selected date.');
          setAttendances([]);
        } else {
          const fetchedAttendances = querySnapshot.docs
            .map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                // Ensure that TimeIn and TimeOut are converted to Date objects if they're Firestore timestamps
                TimeIn: data.TimeIn ? data.TimeIn.toDate() : null,
                TimeOut: data.TimeOut ? data.TimeOut.toDate() : null,
              };
            })
            .filter(
              (attendance) =>
                attendance.Submit === true &&
                attendance.Record === false &&
                attendance.DenyIn !== true &&
                attendance.DenyOut !== true
            );
  
          if (fetchedAttendances.length === 0) {
            setMessage('No records to mark as recorded.');
            setAttendances([]);
          } else {
            setAttendances(fetchedAttendances);
          }
        }
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        setMessage('Failed to fetch attendance records.');
        setAttendances([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAttendanceRecords();
  }, [date]);

  const handleRecordAttendance = async (attendanceId) => {
    try {
      const attendanceDocRef = doc(db, 'Attendance', attendanceId);
      await updateDoc(attendanceDocRef, {
        Record: true,
      });
      setAttendances((prevAttendances) =>
        prevAttendances.filter((att) => att.id !== attendanceId)
      );
    } catch (error) {
      console.error('Error marking attendance record:', error);
      setMessage('Failed to mark attendance as recorded.');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || !(timestamp instanceof Date) || isNaN(timestamp)) return '-';
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const getAttendanceStatus = (attendance) => {
    if (attendance.TimeInStatus && attendance.TimeOutStatus) {
      return 'Approved';
    }
    return 'Pending';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="bd1">
        <div className="dashboard">
          <HeaderSup />
  
          <div className="SD-container">
            <div className="grid">
              <div className="col-span-3 perf">
                <div id="perf">
                  <h1>Welcome Back, Supervisor!</h1>
                  <span>Always stay connected in your Fieldmate</span>
                </div>
                <img src="../src/pictures/Supervisor.png" alt="" />
              </div>

            </div>
            <div className="supervisor-container">
                {message && <p>{message}</p>} 
  
                {selectedView === 'attendance' ? (
                  <div className="attendance-section">
                    <div className="attendance-filter">
                      <div className="date-display">
                        <span>{formatDateDisplay(date)}</span>
                        <button
                          className="calendar-toggle-button"
                          onClick={toggleCalendar} // Toggle calendar visibility
                        >
                          <IoIosArrowDown />
                        </button>
                      </div>

                      {/* Position the calendar relative to the container */}
                      {isCalendarOpen && (
                        <div className="calendar-popup-container">
                          <input
                            id="calendar-input"
                            type="date"
                            value={date.toISOString().substring(0, 10)}
                            onChange={handleDateChange}
                            className="date-input-popup"
                          />
                        </div>
                      )}
                    </div>

                    <div className="attendance-list-section">
                      {attendances.length > 0 ? (
                        <>
                          {/* Attendance Headers */}
                          <div className="attendance-header-row">
                            <div className="attendance-header"></div> {/* Blank for profile */}
                            <div className="attendance-header">Name</div>
                            <div className="attendance-header">Company</div>
                            <div className="attendance-header">Time In</div>
                            <div className="attendance-header">Time Out</div>
                            <div className="attendance-header">Status</div>
                            <div className="attendance-header"></div> {/* Blank for Record button */}
                          </div>

                          {/* Attendance Rows */}
                          {attendances.map((attendance) => (
                            <div className="attendance-row-wrapper" key={attendance.id}>
                              <div className="attendance-row">
                                <div className="attendance-cell">
                                  <img
                                    className="profile"
                                    src="../src/pictures/blank-profile.jpg"
                                    alt="Profile"
                                  />
                                </div>
                                <div className="attendance-cell">{attendance.name}</div>
                                <div className="attendance-cell">{attendance.company}</div>
                                <div className="attendance-cell">{formatTimestamp(attendance.TimeIn)}</div>
                                <div className="attendance-cell">{formatTimestamp(attendance.TimeOut)}</div>
                                <div className="attendance-cell">{getAttendanceStatus(attendance)}</div>
                              </div>
                              <div className="attendance-record-button">
                                <button
                                  onClick={() => handleRecordAttendance(attendance.id)}
                                  disabled={getAttendanceStatus(attendance) === "Pending"}
                                  className="record-button"
                                >
                                  Record
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>No records to display.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>Please select an option to view.</p>
                )}
              </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default SupervisorAtt;
