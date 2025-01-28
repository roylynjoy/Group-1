import React, { useState, useEffect } from 'react';
import './Att.css';
import Header from '../components/header';
import NavStudent from '../components/navStudent';
import Footer from '../components/footer';
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
  const [isSubmitted, setIsSubmitted] = useState(false);


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

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
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
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const attendanceRef = collection(db, 'Attendance');
        const q = query(
          attendanceRef,
          where('Date', '==', Timestamp.fromDate(new Date(currentDate))),
          where('userEmail', '==', userEmail)
        );
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          setTimeIn('00:00');
          setTimeOut('00:00');
          setTimeInStatus('Pending');
          setTimeOutStatus('Pending');
          setIsTimeInSubmitted(false);
          setIsTimeOutSubmitted(false);
          setIsSubmitted(false); // No record, so it's not submitted
        } else {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            setTimeIn(data.TimeIn ? data.TimeIn.toDate().toLocaleTimeString() : '00:00');
            setTimeOut(data.TimeOut ? data.TimeOut.toDate().toLocaleTimeString() : '00:00');
  
            if (data.DenyIn) {
              setTimeInStatus('Denied');
            } else if (data.TimeInStatus) {
              setTimeInStatus('Approved');
            } else {
              setTimeInStatus('Pending');
            }
  
            if (data.DenyOut) {
              setTimeOutStatus('Denied');
            } else if (data.TimeOutStatus) {
              setTimeOutStatus('Approved');
            } else {
              setTimeOutStatus('Pending');
            }
  
            setIsTimeInSubmitted(!!data.TimeIn);
            setIsTimeOutSubmitted(!!data.TimeOut);
            
            // Set the Submit status from Firestore
            setIsSubmitted(data.Submit || false); // If Submit is true, set isSubmitted to true, else false
          });
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    if (currentDate && userEmail) {
      fetchAttendanceData();
    }
  }, [currentDate, userEmail]); // Add dependencies so it refetches on these changes
  
  

  const getStudentDetails = async () => {
    try {
      const studentsRef = collection(db, 'Students');
      const q = query(studentsRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0].data();
        return {
          name: studentDoc.firstName,
          company: studentDoc.company,
          idNumber: studentDoc.idNumber,
        };
      } else {
        setMessage('Student details not found.');
        return {};
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      setMessage('An error occurred while fetching student details.');
      return {};
    }
  };
  

  const handleAttendanceSubmit = async (type) => {
    try {
      const now = Timestamp.fromDate(new Date());
      const { name, company, idNumber } = await getStudentDetails();
  
      if (!name || !company || !idNumber) return;
  
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
          Submit: false,  // Initially false
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
        setTimeIn(now.toDate().toLocaleTimeString());
        setTimeInStatus('Pending');
      } else if (!snapshot.empty && type === 'TimeOut') {
        const attendanceDocRef = snapshot.docs[0].ref;
        await updateDoc(attendanceDocRef, { TimeOut: now });
        setIsTimeOutSubmitted(true);
        setMessage('Time-Out recorded successfully!');
        setTimeOut(now.toDate().toLocaleTimeString());
        setTimeOutStatus('Pending');
      } else if (!snapshot.empty && type === 'SubmitAll') {
        const recordRef = snapshot.docs[0].ref;
        const recordData = snapshot.docs[0].data();
  
        if (recordData.TimeIn && recordData.TimeOut) {
          await updateDoc(recordRef, { Submit: true }); // Set Submit to true after both TimeIn and TimeOut are recorded
          setIsSubmitAllPressed(true);
          setMessage('Attendance submitted successfully!');
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
  console.log('Current Time In:', timeIn);

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
                  disabled={!isTimeInSubmitted || !isTimeOutSubmitted || isSubmitAllPressed || isSubmitted} // Disable if already submitted
                  style={{ display: isSubmitted || !(isTimeInSubmitted && isTimeOutSubmitted) ? 'none' : 'block' }} // Hide if already submitted
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
                  <p style={{ color: timeInStatus === 'Pending' ? 'orange' : timeInStatus === 'Approved' ? 'green' : 'red', }}>
                    {timeInStatus}
                  </p>
                </div>
                <button
                  onClick={() => handleAttendanceSubmit('TimeIn')}
                  disabled={isTimeInSubmitted || isSubmitAllPressed || timeIn !== '00:00' || timeInStatus !== 'Pending'}
                  style={{
                    backgroundColor: isTimeInSubmitted ? '#00428d' : '', // Dark blue when submitted
                    color: isTimeInSubmitted ? 'white' : '', // White text when submitted
                    filter: isTimeInSubmitted ? 'brightness(0.7)' : 'brightness(1)',
                  }}
                >
                  {isTimeInSubmitted ? 'Submitted' : 'Submit'}
                </button>
  
              </div>
              <div className="attendance-container">
                <div className="att-text">
                  <label>Time Out:</label>
                  <p>{timeOut}</p>
                </div>
                <div className="att-text">
                  <label>Status:</label>
                  <p style={{ color: timeOutStatus === 'Pending' ? 'orange' : timeOutStatus === 'Approved' ? 'green' : 'red', }}>
                    {timeOutStatus}
                  </p>
                </div>
                <button
                  className="submit-time-out"
                  onClick={() => handleAttendanceSubmit('TimeOut')}
                  disabled={!isTimeInSubmitted || isTimeOutSubmitted || isSubmitAllPressed}
                  style={{
                    backgroundColor: isTimeOutSubmitted ? '#00428d' : '', // Dark blue when submitted
                    color: isTimeOutSubmitted ? 'white' : '', // White text when submitted
                    filter: isTimeOutSubmitted ? 'brightness(0.7)' : 'brightness(1)',
                  }}
                >
                  {isTimeOutSubmitted ? 'Submitted' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default Attendance;
