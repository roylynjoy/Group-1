import React, { useState, useEffect } from 'react';
import './Att.css';
import Header from '../comp/header';
import NavStudent from '../comp/navStudent';
import { IoIosArrowUp } from "react-icons/io";
import { db } from '../firebase';
import { collection, addDoc, updateDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitAllPressed, setIsSubmitAllPressed] = useState(false);
  const [isTimeInSubmitted, setIsTimeInSubmitted] = useState(false);
  const [isTimeOutSubmitted, setIsTimeOutSubmitted] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const [timeIn, setTimeIn] = useState('00:00');
  const [timeOut, setTimeOut] = useState('00:00');
  const [timeInStatus, setTimeInStatus] = useState('Pending');
  const [timeOutStatus, setTimeOutStatus] = useState('Pending');
  

  const auth = getAuth();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email || '';

  useEffect(() => {
    if (userEmail) {
      verifyStudentEmail();
    }
  }, [userEmail]);

  const verifyStudentEmail = async () => {
    try {
      const studentsRef = collection(db, 'Students');
      const q = query(studentsRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        navigate('/login'); 
        setIsStudent(false);
        return;
      }

      setIsStudent(true);
    } catch (error) {
      console.error('Error verifying student email:', error);
      setMessage('An error occurred while verifying your email.');
      setIsStudent(false);
    }
  };

  // Clear local storage for a new day
  useEffect(() => {
    const now = new Date();
    const today = now.toDateString();

    const savedSession = JSON.parse(localStorage.getItem(userEmail));

    if (savedSession && savedSession.date !== today) {
      localStorage.removeItem(userEmail);
      setIsTimeInSubmitted(false);
      setIsTimeOutSubmitted(false);
      setIsSubmitAllPressed(false);
    }
  }, [userEmail]);

  // Load saved session data
  useEffect(() => {
    const savedSession = JSON.parse(localStorage.getItem(userEmail));

    if (savedSession) {
      setIsTimeInSubmitted(savedSession.isTimeInSubmitted);
      setIsTimeOutSubmitted(savedSession.isTimeOutSubmitted);
      setIsSubmitAllPressed(savedSession.isSubmitAllPressed);
    }
  }, [userEmail]);

  // Save session data to localStorage
  useEffect(() => {
    const now = new Date();
    const today = now.toDateString();

    const sessionData = {
      isTimeInSubmitted,
      isTimeOutSubmitted,
      isSubmitAllPressed,
      date: today,
    };

    localStorage.setItem(userEmail, JSON.stringify(sessionData));
  }, [isTimeInSubmitted, isTimeOutSubmitted, isSubmitAllPressed, userEmail]);

  const getStudentDetails = async () => {
    try {
      const studentsRef = collection(db, 'Students');
      const q = query(studentsRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('No student found with this email');
        return { name: null, company: null, idNumber: null }; // Return null if no student is found
      }
  
      const studentDoc = querySnapshot.docs[0].data();
      return {
        name: studentDoc.firstName, 
        company: studentDoc.company,
        idNumber: studentDoc.idNumber,
      };
    } catch (error) {
      console.error('Error fetching student details:', error);
      return { name: null, company: null, idNumber: null}; // Return null if there's an error
    }
  };

  useEffect(() => {
    if (isStudent) {
      const updateDateTime = () => {
        const now = new Date();

        // Extract weekday
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);

        // Extract formatted date (Month Day, Year)
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          timeZone: 'Asia/Manila',
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);

        setCurrentDate(formattedDate);
        setCurrentDay(weekday);
        setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      };

      updateDateTime();
      const intervalId = setInterval(updateDateTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isStudent]);

  // Fetching attendance data based on current date
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        if (isSubmitAllPressed || isTimeInSubmitted) {
          // Skip fetching if "Submit All" was pressed or Time-In is already submitted
          return;
        }
  
        const attendanceRef = collection(db, 'Attendance');
        const q = query(
          attendanceRef,
          where('Date', '==', Timestamp.fromDate(new Date(currentDate))),
          where('userEmail', '==', userEmail)
        );
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          // If no data is found, set default values
          setTimeIn('00:00');
          setTimeOut('00:00');
          setTimeInStatus('Pending');
          setTimeOutStatus('Pending');
        } else {
          // Data exists, update the state accordingly
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Set TimeIn and TimeOut values
            setTimeIn(data.TimeIn ? data.TimeIn.toDate().toLocaleTimeString() : '00:00');
            setTimeOut(data.TimeOut ? data.TimeOut.toDate().toLocaleTimeString() : '00:00');
            
            // Determine TimeInStatus
            if (data.DenyIn) {
              setTimeInStatus('Denied');
            } else if (data.TimeInStatus) {
              setTimeInStatus('Approved');
            } else {
              setTimeInStatus('Pending');
            }
  
            // Determine TimeOutStatus
            if (data.DenyOut) {
              setTimeOutStatus('Denied');
            } else if (data.TimeOutStatus) {
              setTimeOutStatus('Approved');
            } else {
              setTimeOutStatus('Pending');
            }
          });
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    if (currentDate && userEmail && !isSubmitAllPressed) {
      fetchAttendanceData();
    }
  }, [currentDate, userEmail, isSubmitAllPressed]);
  

  const handleAttendanceSubmit = async (type) => {
    try {
      const now = Timestamp.fromDate(new Date());
      const { name, company, idNumber } = await getStudentDetails();  // Get both name and company
  
      if (!name || !company || !idNumber) return;  // Ensure both name and company are available
  
      const attendanceRef = collection(db, 'Attendance');
      const q = query(attendanceRef, where('userEmail', '==', userEmail), where('Submit', '==', false));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty && type === 'TimeIn') {
        await addDoc(attendanceRef, {
          Date: Timestamp.fromDate(new Date(currentDate)),
          TimeIn: now,
          TimeOut: null,
          TimeInStatus: false,
          TimeOutStatus: false,
          Submit: false,
          Record: false,
          DenyIn: false,
          DenyOut: false,
          userEmail,
          name,
          company,
          idNumber,
        });
        setIsTimeInSubmitted(true);
        setMessage('Time-In recorded successfully!');
        setTimeIn(now.toDate().toLocaleTimeString()); // Update state directly
        setTimeInStatus('Pending'); // Update status
      } else if (!snapshot.empty && type === 'TimeOut') {
        const attendanceDocRef = snapshot.docs[0].ref;
        await updateDoc(attendanceDocRef, { TimeOut: now });
        setIsTimeOutSubmitted(true);
        setMessage('Time-Out recorded successfully!');
        setTimeOut(now.toDate().toLocaleTimeString()); // Update state directly
        setTimeOutStatus('Pending'); // Update status
      } else if (!snapshot.empty && type === 'SubmitAll') {
        const recordRef = snapshot.docs[0].ref;
        const recordData = snapshot.docs[0].data();
  
        if (recordData.TimeIn && recordData.TimeOut) {
          await updateDoc(recordRef, { Submit: true });
          setIsSubmitAllPressed(true);
          setMessage('Attendance submitted successfully!');
  
          // Reset flags for the next day
          setIsTimeInSubmitted(false);
          setIsTimeOutSubmitted(false);
          setIsSubmitAllPressed(false);
  
          // Optionally clear local storage flags
          localStorage.removeItem(userEmail);
        } else {
          setMessage('Please submit both Time-In and Time-Out before submitting attendance.');
        }
      } else {
        throw new Error('Invalid action or record already exists.');
      }
  
    } catch (error) {
      console.error('Error handling attendance submission:', error);
      setMessage('Attendance submission failed.');
    }
  };
  

  if (!currentUser) {
    return <p>Please log in to submit attendance.</p>;
  }

  if (!isStudent) {
    return (
      <div className="error-message">
        <p>{message}</p>
      </div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="bd2"> {/* Changed from <body> to <div> */}
        <div className="dashboard">
          <Header />
          <NavStudent />

          <div className="SD-container">
            <div className="">
 
                <div id="perfAtt">
                  <h1>Date: {currentDate} | {currentDay}</h1>
                  <button
                    className="submit-all"
                    onClick={() => handleAttendanceSubmit('SubmitAll')}
                    disabled={!isTimeInSubmitted || !isTimeOutSubmitted || isSubmitAllPressed}
                    style={{ display: isTimeInSubmitted && isTimeOutSubmitted ? 'block' : 'none' }}
                  >
                    Submit Attendance
                  </button>
                </div>

            </div>
            <div className="prompt">
              {message && <p>{message}</p>}
            </div>
            <div className="att-wrapper">
              <div className="attendance-container">
                <div className="att-text">
                  <label>Time In:</label>
                  <p>{timeIn}</p>
                </div>
                <div className="att-text">
                  <label>Status:</label>
                  <p style={{color: timeInStatus === 'Pending' ? 'orange' : timeInStatus === 'Approved' ? 'green' : 'red',}}>{timeInStatus}</p>
                </div>
                <button
                  onClick={() => handleAttendanceSubmit('TimeIn')}
                  disabled={isTimeInSubmitted || isSubmitAllPressed || timeIn !== '00:00'}
                >
                  Submit
                </button>
              </div>
              <div className="attendance-container">
                <div className="att-text">
                  <label>Time Out:</label>
                  <p>{timeOut}</p>
                </div>
                <div className="att-text">
                  <label>Status:</label>
                  <p style={{color: timeInStatus === 'Pending' ? 'orange' : timeInStatus === 'Approved' ? 'green' : 'red',}}>{timeOutStatus}</p>
                </div>
                <button
                  onClick={() => handleAttendanceSubmit('TimeOut')}
                  disabled={!isTimeInSubmitted || isTimeOutSubmitted || isSubmitAllPressed}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="foot2">
        <p>&copy; 2025 LVCC INC... All rights reserved.</p>
        <p>Privacy Policy | Terms of Service </p>
        <IoIosArrowUp id="arrow-up-icon" onClick={scrollToTop} style={{ cursor: 'pointer' }}/>
      </footer>
    </>
  );
};

export default Attendance;
