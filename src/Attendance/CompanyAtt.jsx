import React, { useState, useEffect } from 'react';
import './Att.css';
import '../index.css';
import HeaderComp from '../comp/headerComp';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
      if (!userEmail) {
        setMessage('No user is logged in.');
        return;
      }

      const companiesRef = collection(db, 'Companies');
      const q = query(companiesRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('No company found for this email.');
        setIsCompany(false);
        navigate('/login');
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
    // Only fetch data if the company is verified
    if (isCompany) {
      fetchAttendanceRecords();
    }
  }, [filterDate, isCompany]); // Fetch whenever filterDate or isCompany changes

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
      const companyName = companyData.company; // Assuming 'company' is the field name

      // Fetch Time In records without filtering by date in Firestore
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

      // Fetch Time Out records without filtering by date in Firestore
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

      // If filterDate is set, filter the records in JavaScript
      if (filterDate) {
        const filterDateObj = new Date(filterDate).setHours(0, 0, 0, 0);
        
        // Filter Time In records by date
        const filteredTimeIn = timeInData.filter((record) => {
          const recordDate = new Date(record.Date.seconds * 1000).setHours(0, 0, 0, 0);
          return recordDate === filterDateObj;
        });

        // Filter Time Out records by date
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
                <p className='time-sections'>Pending Student Time In</p>
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
                <p className='time-sections'>Pending Student Time Out</p>
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
