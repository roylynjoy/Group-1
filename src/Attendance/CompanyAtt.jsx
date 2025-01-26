import React, { useState, useEffect } from 'react';
import './Att.css';
import '../index.css';
import Header from '../comp/header';
import NavCompany from '../comp/navCompany';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const CompanyAtt = () => {
  const [filterDate, setFilterDate] = useState('');
  const [timeInRecords, setTimeInRecords] = useState([]);
  const [timeOutRecords, setTimeOutRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, action: null, recordId: null, isTimeIn: true });

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
      if (!userEmail) {
        setMessage('No user is logged in.');
        return;
      }
      
      const companiesRef = collection(db, 'Companies');
      // Normalize both the Firestore email and userEmail to lowercase for case-insensitive comparison
      const q = query(companiesRef, where('email', '==', userEmail.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setMessage('No company found for this email.');
        setIsCompany(false);
        console.log(email);
        // navigate('/login');
        return;
      }      

      setIsCompany(true);
    } catch (error) {
      console.error('Error verifying company email:', error);
      setMessage('An error occurred while verifying your email.');
      setIsCompany(false);
    }
  };

  useEffect(() => {
    if (isCompany) {
      fetchAttendanceRecords();
    }
  }, [filterDate, isCompany]);

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

      const companyData = companySnapshot.docs[0].data();
      const companyName = companyData.company;

      const timeInQuery = query(
        attendanceCollectionRef,
        where('TimeInStatus', '==', false),
        where('DenyIn', '==', false),
        where('company', '==', companyName)
      );

      const timeInSnapshot = await getDocs(timeInQuery);
      const timeInData = timeInSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const timeOutQuery = query(
        attendanceCollectionRef,
        where('TimeOutStatus', '==', false),
        where('DenyOut', '==', false),
        where('company', '==', companyName)
      );

      const timeOutSnapshot = await getDocs(timeOutQuery);
      const timeOutData = timeOutSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (filterDate) {
        const filterDateObj = new Date(filterDate).setHours(0, 0, 0, 0);
        const filteredTimeIn = timeInData.filter((record) => {
          const recordDate = new Date(record.Date.seconds * 1000).setHours(0, 0, 0, 0);
          return recordDate === filterDateObj;
        });

        const filteredTimeOut = timeOutData.filter((record) => {
          const recordDate = new Date(record.Date.seconds * 1000).setHours(0, 0, 0, 0);
          return recordDate === filterDateObj;
        });

        setTimeInRecords(filteredTimeIn);
        setTimeOutRecords(filteredTimeOut);
      } else {
        setTimeInRecords(timeInData);
        setTimeOutRecords(timeOutData);
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setMessage('Failed to fetch attendance records.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAction = (recordId, isTimeIn, action) => {
    // Open the modal and set its state (type of action, record details)
    setModal({ isVisible: true, action, recordId, isTimeIn });
  };
  
  const confirmAction = () => {
    // Destructure the modal state to determine what to do
    const { action, recordId, isTimeIn } = modal;
  
    if (action === 'approve') {
      handleApprove(recordId, isTimeIn); // Call the actual approve function
    } else if (action === 'deny') {
      handleDeny(recordId, isTimeIn); // Call the actual deny function
    }
  
    // Close the modal after performing the action
    setModal({ isVisible: false, action: null, recordId: null, isTimeIn: true });
  };
  
  const closeModal = () => {
    // Simply close the modal without performing any action
    setModal({ isVisible: false, action: null, recordId: null, isTimeIn: true });
  };
  
  const handleApprove = async (recordId, isTimeIn) => {
    try {
      const attendanceDocRef = doc(db, 'Attendance', recordId);
  
      if (isTimeIn) {
        // Update TimeInStatus to true for Time In
        await updateDoc(attendanceDocRef, {
          TimeInStatus: true,
        });
        console.log(`Approved Time In for record ID: ${recordId}`);
      } else {
        // Update TimeOutStatus to true for Time Out
        await updateDoc(attendanceDocRef, {
          TimeOutStatus: true,
        });
        console.log(`Approved Time Out for record ID: ${recordId}`);
      }
  
      // Refresh the attendance records
      fetchAttendanceRecords();
    } catch (error) {
      console.error(`Error approving record ID ${recordId}:`, error);
    }
  };
  
  const handleDeny = async (recordId, isTimeIn) => {
    try {
      const attendanceDocRef = doc(db, 'Attendance', recordId);
  
      if (isTimeIn) {
        // Update DenyIn to true for Time In
        await updateDoc(attendanceDocRef, {
          DenyIn: true,
        });
        console.log(`Denied Time In for record ID: ${recordId}`);
      } else {
        // Update DenyOut to true for Time Out
        await updateDoc(attendanceDocRef, {
          DenyOut: true,
        });
        console.log(`Denied Time Out for record ID: ${recordId}`);
      }
  
      // Refresh the attendance records
      fetchAttendanceRecords();
    } catch (error) {
      console.error(`Error denying record ID ${recordId}:`, error);
    }
  };

  return (
    <>
      <div className="bd1">
        <div className="dashboard">
          <Header />
          <NavCompany />
          <div className="SD-container">
            <div className="grid">
              <div className="col-span-3 perf">
                <div id="perf">
                  <h1>Welcome Back, Coordinator!</h1>
                  <span>Always stay connected in your Fieldmate</span>
                </div>
                <img src="/images/Coordinator.png" alt="" />
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
                <p className="time-sections">Pending Student Time In</p>
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
                      <div
                        className="company-attendance-row-wrapper"
                        key={record.id}
                      >
                        <div className="company-attendance-row">
                          <div className="company-attendance-cell">
                            <img
                              src="/images/blank-profile.jpg"
                              alt=""
                            />
                          </div>
                          <div className="company-attendance-cell">
                            {record.idNumber}
                          </div>
                          <div className="company-attendance-cell">
                            {record.name}
                          </div>
                          <div className="company-attendance-cell">
                            {formatTimestamp(record.TimeIn)}
                          </div>
                        </div>
                        <div className="approve-deny-buttons">
                          <button
                            className="company-approve"
                            onClick={() => handleAction(record.id, true, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="company-deny"
                            onClick={() => handleAction(record.id, true, "deny")}
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="company-no-records">
                      No Time In records to display.
                    </p>
                  )}
                </div>
              </div>
  
              <div className="line-boundary"></div>
  
              {/* Time Out Section */}
              <div className="company-time-out-section">
                <p className="time-sections">Pending Student Time Out</p>
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
                      <div
                        className="company-attendance-row-wrapper"
                        key={record.id}
                      >
                        <div className="company-attendance-row">
                          <div className="company-attendance-cell">
                            <img
                              src="/images/blank-profile.jpg"
                              alt=""
                            />
                          </div>
                          <div className="company-attendance-cell">
                            {record.idNumber}
                          </div>
                          <div className="company-attendance-cell">
                            {record.name}
                          </div>
                          <div className="company-attendance-cell">
                            {formatTimestamp(record.TimeOut)}
                          </div>
                        </div>
                        <div className="approve-deny-buttons">
                          <button
                            className="company-approve"
                            onClick={() => handleAction(record.id, false, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="company-deny"
                            onClick={() => handleAction(record.id, false, "deny")}
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="company-no-records">
                      No Time Out records to display.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Confirmation Modal */}
      {modal.isVisible && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <p>
              Are you sure you want to{' '}
              <strong>{modal.action === 'approve' ? 'approve' : 'deny'}</strong> this{' '}
              {modal.isTimeIn ? 'Time In' : 'Time Out'} record?
            </p>
            <div className="custom-modal-buttons">
              {/* Confirm Button */}
              <button
                className="custom-modal-yes"
                onClick={confirmAction} // Triggers the actual approve/deny function
              >
                Yes
              </button>

              {/* Close Modal */}
              <button className="custom-modal-no" onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default CompanyAtt;
