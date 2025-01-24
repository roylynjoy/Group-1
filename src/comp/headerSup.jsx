import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { Link } from "react-router-dom";



function header() {
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const [showBellModal, setShowBellModal] = useState(false);
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowLogoutBox(!showLogoutBox);
    if (!showLogoutBox) {
      setShowBellModal(false); // Close bell modal when opening logout box
      setShowEnvelopeModal(false); // Close envelope modal when opening logout box
    }
  };

  const handleLogout = () => {
    navigate("/homepage");
    console.log("User logged out");
    setShowLogoutBox(false);
  };

  const toggleBellModal = () => {
    setShowBellModal(!showBellModal);
    if (!showBellModal) {
      setShowEnvelopeModal(false); // Close envelope modal when opening bell modal
      setShowLogoutBox(false); // Close logout box when opening bell modal
    }
  };

  const toggleEnvelopeModal = () => {
    setShowEnvelopeModal(!showEnvelopeModal);
    if (!showEnvelopeModal) {
      setShowBellModal(false); // Close bell modal when opening envelope modal
      setShowLogoutBox(false); // Close logout box when opening envelope modal
    }
  };

  return (
    <div>
      <header className="header">
        <div id="logo">
          <img src="/images/logo.png" alt="Logo" />
          <h1>Fieldmate</h1>
        </div>

        <div className="user-profile">
          <button className="fa-solid fa-bell" onClick={toggleBellModal}></button>
          {showBellModal && (
            <div className="modal-bell">
              <h3>Messages</h3>
              <div className="msg-cont">
                <img className="img-modal" src="/images/blank-profile.jpg" alt="" />
                <div className="msg">
                  <p className="name">Mr. John</p>
                  <p className="announce">Announcement...</p>
                </div>
              </div>
              <p>Bell notifications</p>
              <button onClick={toggleBellModal}>Close</button>
            </div>
          )}

          <button className="fa-solid fa-envelope" onClick={toggleEnvelopeModal}></button>
          {showEnvelopeModal && (
            <div className="modal-envelop">
              <h3>Messages</h3>
              <div className="msg-cont">
                <img className="img-modal"  src="/images/blank-profile.jpg" alt="" />
                <div className="msg">
                  <p className="name">Mr. John</p>
                  <p className="announce">Announcement...</p>
                </div>
              </div>
              <div className="msg-cont">
                <img className="img-modal"  src="/images/blank-profile.jpg" alt="" />
                <div className="msg">
                  <p className="name">Mr. John</p>
                  <p className="announce">Announcement...</p>
                </div>
              </div>
              <div className="msg-cont">
                <img className="img-modal"  src="/images/blank-profile.jpg" alt="" />
                <div className="msg">
                  <p className="name">Mr. John</p>
                  <p className="announce">Announcement...</p>
                </div>
              </div>
              <button onClick={toggleEnvelopeModal}>Close</button>
            </div>
          )}

          <img
            src="/images/user1.png"
            alt="User"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
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
            <span>Supervisor Dashboard</span>
            <div id="img">
              <Link to="/SupervisorAtt"><FaUserCheck id="icon"/></Link>
              <Link to="/Supervisor/SupervisorResources" ><ImBooks id="icon"/></Link>
            </div>
        </div>
    </div>
  )
}

export default header