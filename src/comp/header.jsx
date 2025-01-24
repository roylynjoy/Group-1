import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import eye icons for toggling visibility
import { useNavigate } from "react-router-dom";

function Header() {
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const [showBellModal, setShowBellModal] = useState(false);
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false); // State for settings modal
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  }); // State for password visibility
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleProfileClick = () => {
    setShowLogoutBox(!showLogoutBox);
    if (!showLogoutBox) {
      setShowBellModal(false);
      setShowEnvelopeModal(false);
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
      setShowEnvelopeModal(false);
      setShowLogoutBox(false);
    }
    resetModalState();
  };

  const toggleEnvelopeModal = () => {
    setShowEnvelopeModal(!showEnvelopeModal);
    if (!showEnvelopeModal) {
      setShowBellModal(false);
      setShowLogoutBox(false);
    }
    resetModalState();
  };

  const handleMsgClick = (message) => {
    setSelectedMessage(message);
    setIsDetailsView(true); // Switch to details view
  };

  const handleBackClick = () => {
    setIsDetailsView(false); // Switch back to list view
    setSelectedMessage(null);
  };

  const resetModalState = () => {
    setIsDetailsView(false);
    setSelectedMessage(null);
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
    setShowLogoutBox(false); // Close logout box when settings modal is open
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const messages = [
    { id: 1, name: "Mr. John", content: "Important announcement about classes." },
    { id: 2, name: "Ms. Smith", content: "Meeting scheduled for tomorrow." },
    { id: 3, name: "Admin", content: "Your account has been updated." },
  ];

  const listView = (
    <>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="msg-cont"
          onClick={() => handleMsgClick(msg)}
          style={{ cursor: "pointer" }}
        >
          <img
            className="msg-img"
            src="/images/blank-profile.jpg"
            alt="Profile"
          />
          <div className="msg">
            <p className="name">{msg.name}</p>
            <p className="announce">{msg.content}</p>
          </div>
        </div>
      ))}
    </>
  );

  const detailsView = selectedMessage && (
    <div className="details-view">
      <button onClick={handleBackClick} className="back-button"><IoMdArrowRoundBack /></button>
      <div className="msg-details">
        <h3>{selectedMessage.name}</h3>
        <p>{selectedMessage.content}</p>
      </div>
    </div>
  );

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
              <h3 className="modal-title">Notifications</h3>
              {isDetailsView ? detailsView : listView}
            </div>
          )}

          <button className="fa-solid fa-envelope" onClick={toggleEnvelopeModal}></button>
          {showEnvelopeModal && (
            <div className="modal-envelop">
              <h3 className="modal-title">Messages</h3>
              {isDetailsView ? detailsView : listView}
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
              <div className="edit-profile">
                <h3>Profile</h3>
                <div className="profile-cont">
                  <img
                    src="/images/user1.png"
                    alt="User"
                  />
                  <p>Joana Diane Doe</p>
                </div>
              </div>
              <hr />
              <button id="edit" onClick={handleSettingsClick}>Settings</button>
              <hr />
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal-settings">
          <div className="modal-settings-cont">
            <button onClick={handleCloseSettingsModal} className="back-button">
              <IoMdArrowRoundBack />
            </button>

            <div className="settings-form">
              <h1>Settings</h1>

              <div className="password-field">
                <input
                  type={passwordVisibility.oldPassword ? "text" : "password"}
                  placeholder="Old Password"
                />
                <button
                  className="eye-button"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                >
                  {passwordVisibility.oldPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>

              <div className="password-field">
                <input
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  placeholder="New Password"
                />
                <button
                  className="eye-button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {passwordVisibility.newPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>

              <div className="password-field">
                <input
                  type={passwordVisibility.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  className="eye-button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>

              <button className="change-button">Change</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
