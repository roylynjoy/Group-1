import React, { useState, useEffect } from 'react';
import './Att.css';
import '../index.css';
import HeaderComp from '../comp/headerComp';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const CompanyAtt = () => {
  const [filterDate, setFilterDate] = useState('');
  const [timeInRecords, setTimeInRecords] = useState([]);
  const [timeOutRecords, setTimeOutRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email || '';

  useEffect(() => {
    if (userEmail) {
      verifyCompanyEmail();
    }
  }, [userEmail]);

  const verifyCompanyEmail = async () => {
    try {
      const companiesRef = collection(db, 'Companies');
      const q = query(companiesRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        navigate('/login'); 
        setIsCompany(false);
        return;
      }

      setIsCompany(true);
    } catch (error) {
      console.error('Error verifying student email:', error);
      setMessage('An error occurred while verifying your email.');
      setIsCompany(false);
    }
  };
  useEffect(() => {
    fetchAttendanceRecords();
  }, [filterDate]); // Re-fetch when filterDate changes

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const attendanceCollectionRef = collection(db, 'Attendance');
      const companiesRef = collection(db, 'Companies');
      const companyQuery = query(companiesRef, where('email', '==', userEmail));
      const companySnapshot = await getDocs(companyQuery);
  
      if (companySnapshot.empty) {
        setMessage('No company found for this email.');
        setLoading(false);
        return;
      }
  
      // Get the company value from the company document
      const companyData = companySnapshot.docs[0].data();
      const companyName = companyData.company;  // assuming 'company' is the field name
  
      // Query for Time In records that match the company
      const timeInQuery = filterDate
        ? query(
            attendanceCollectionRef,
            where('TimeInStatus', '==', false),
            where('DenyIn', '==', false),
            where('Date', '==', new Date(filterDate)), // Filter by Date
            where('company', '==', companyName) // Match company field
          )
        : query(
            attendanceCollectionRef,
            where('TimeInStatus', '==', false),
            where('DenyIn', '==', false),
            where('company', '==', companyName) // Match company field
          );
  
      const timeInSnapshot = await getDocs(timeInQuery);
      const timeInData = timeInSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((record) => record.TimeIn !== null); // Exclude records with null TimeIn
  
      // Add the student's first name to each record
      const timeInRecordsWithName = await Promise.all(timeInData.map(async (record) => {
        const studentRef = collection(db, 'Students');
        const studentQuery = query(studentRef, where('email', '==', record.userEmail));
        const studentSnapshot = await getDocs(studentQuery);
        const studentData = studentSnapshot.docs[0]?.data();
        return {
          ...record,
          name: studentData?.firstName || 'Unknown', // Default to 'Unknown' if name is not found
        };
      }));
  
      setTimeInRecords(timeInRecordsWithName);
  
      // Query for Time Out records that match the company
      const timeOutQuery = filterDate
        ? query(
            attendanceCollectionRef,
            where('TimeOutStatus', '==', false),
            where('DenyOut', '==', false),
            where('Date', '==', new Date(filterDate)), // Filter by Date
            where('company', '==', companyName) // Match company field
          )
        : query(
            attendanceCollectionRef,
            where('TimeOutStatus', '==', false),
            where('DenyOut', '==', false),
            where('company', '==', companyName) // Match company field
          );
  
      const timeOutSnapshot = await getDocs(timeOutQuery);
      const timeOutData = timeOutSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((record) => record.TimeOut !== null); // Exclude records with null TimeOut
  
      // Add the student's first name to each record for Time Out
      const timeOutRecordsWithName = await Promise.all(timeOutData.map(async (record) => {
        const studentRef = collection(db, 'Students');
        const studentQuery = query(studentRef, where('email', '==', record.userEmail));
        const studentSnapshot = await getDocs(studentQuery);
        const studentData = studentSnapshot.docs[0]?.data();
        return {
          ...record,
          name: studentData?.firstName || 'Unknown', // Default to 'Unknown' if name is not found
        };
      }));
  
      setTimeOutRecords(timeOutRecordsWithName);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setMessage('Failed to fetch attendance records.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleApprove = async (recordId, isTimeIn) => {
    try {
      const attendanceDocRef = doc(db, 'Attendance', recordId);

      if (isTimeIn) {
        await updateDoc(attendanceDocRef, { TimeInStatus: true });
        setTimeInRecords(timeInRecords.filter((record) => record.id !== recordId));
      } else {
        await updateDoc(attendanceDocRef, { TimeOutStatus: true });
        setTimeOutRecords(timeOutRecords.filter((record) => record.id !== recordId));
      }
      setMessage('Attendance approved successfully!');
    } catch (error) {
      console.error('Error approving attendance:', error);
      setMessage('Failed to approve attendance.');
    }
  };

  const handleDeny = async (recordId, isTimeIn) => {
    try {
      const attendanceDocRef = doc(db, 'Attendance', recordId);

      if (isTimeIn) {
        await updateDoc(attendanceDocRef, { DenyIn: true });
        setTimeInRecords(timeInRecords.filter((record) => record.id !== recordId));
      } else {
        await updateDoc(attendanceDocRef, { DenyOut: true });
        setTimeOutRecords(timeOutRecords.filter((record) => record.id !== recordId));
      }
      setMessage('Attendance denied successfully!');
    } catch (error) {
      console.error('Error denying attendance:', error);
      setMessage('Failed to deny attendance.');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="bd1">
        <div className="dashboard">
          <HeaderComp />
  
          <div className="SD-container">
            <div className="grid">
              <div className="col-span-3 perf">
                <div id="perf">
                  <h1>Welcome Back, Coordinator!</h1>
                  <span>Always stay connected in your Fieldmate</span>
                </div>
                <img src="../src/pictures/Coordinator.png" alt="" />
              </div>
            </div>
  
            <div className="company-attendance-management">
              {message && <p className="company-message">{message}</p>}
  
              {/* Date Filter */}
              <div className="company-filter-date">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
  
              {loading && <p className="company-loading">Loading...</p>}
  
              {/* Time In Section */}
              <div className="company-time-in-section">
                <h3>Pending Student Time In</h3>
                <div className="company-attendance-list-section">
                  <div className="company-attendance-header-row">
                    <div className="company-attendance-header"></div>
                    <div className="company-attendance-header">ID Number</div>
                    <div className="company-attendance-header">Name</div>
                    <div className="company-attendance-header">Time In</div>
                    <div className="company-attendance-header"></div>
                  </div>
  
                  {timeInRecords.length > 0 ? (
                    timeInRecords.map((record) => (
                      <div className="company-attendance-row-wrapper" key={record.id}>
                        <div className="company-attendance-row">
                          <div className="company-attendance-cell"><img src="../src/pictures/blank-profile.jpg" alt="" /></div>
                          <div className="company-attendance-cell">{record.idNumber}</div>
                          <div className="company-attendance-cell">{record.name}</div>
                          <div className="company-attendance-cell">
                            {formatTimestamp(record.TimeIn)}
                          </div>
                        </div>
                        <div className="approve-deny-buttons">
                            <button
                              className="company-approve"
                              onClick={() => handleApprove(record.id, true)}
                            >
                              Approve
                            </button>
                            <button
                              className="company-deny"
                              onClick={() => handleDeny(record.id, true)}
                            >
                              Deny
                            </button>
                          </div>
                      </div>
                    ))
                  ) : (
                    <p className="company-no-records">No Time In records to display.</p>
                  )}
                </div>
              </div>
  
              <div className='line-boundary'></div>
              
              {/* Time Out Section */}
              <div className="company-time-out-section">
                <h3>Pending Student Time Out</h3>
                <div className="company-attendance-list-section">
                  <div className="company-attendance-header-row">
                    <div className="company-attendance-header"></div>
                    <div className="company-attendance-header">ID Number</div>
                    <div className="company-attendance-header">Name</div>
                    <div className="company-attendance-header">Time Out</div>
                    <div className="company-attendance-header"></div>
                  </div>
  
                  {timeOutRecords.length > 0 ? (
                    timeOutRecords.map((record) => (
                      <div className="company-attendance-row-wrapper" key={record.id}>
                        <div className="company-attendance-row">
                          <div className="company-attendance-cell"><img src="../src/pictures/blank-profile.jpg" alt="" /></div>
                          <div className="company-attendance-cell">{record.idNumber}</div>
                          <div className="company-attendance-cell">{record.name}</div>
                          <div className="company-attendance-cell">
                            {formatTimestamp(record.TimeOut)}
                          </div>
                          
                        </div>
                        <div className="approve-deny-buttons">
                            <button
                              className="company-approve"
                              onClick={() => handleApprove(record.id, false)}
                            >
                              Approve
                            </button>
                            <button
                              className="company-deny"
                              onClick={() => handleDeny(record.id, false)}
                            >
                              Deny
                            </button>
                          </div>
                      </div>
                    ))
                  ) : (
                    <p className="company-no-records">No Time Out records to display.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
  
};

export default CompanyAtt;
