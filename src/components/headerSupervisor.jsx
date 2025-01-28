import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import eye icons for toggling visibility
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const [showBellModal, setShowBellModal] = useState(false);
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
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
    setIsDetailsView(true);
  };

  const handleBackClick = () => {
    setIsDetailsView(false);
    setSelectedMessage(null);
  };

  const resetModalState = () => {
    setIsDetailsView(false);
    setSelectedMessage(null);
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
    setShowLogoutBox(false);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  // Separate message data for easier manipulation
  const bellMessages = [
    { id: 1, name: "Admin Notification", content: "To all users of FieldMate, your accounts have been updated." },
    { id: 2, name: "System Notification", content: "Attention!!! We are reminding all users." },
    { id: 3, name: "System Updates", content: "Attention!!! New updates were implemented." },
  ];

  const envelopeMessages = [
    { id: 4, name: "Mr. John", content: "Important announcement about classes." },
    { id: 5, name: "Mr. John", content: "Meeting schedule for tomorrow." },
    { id: 6, name: "Mr. John", content: "Announcement to all students." },
  ];

  const bellListView = (bellMsgList) => (
    <>
      {bellMsgList.map((msg) => (
        <div
          key={msg.id}
          className="msg-cont"
          onClick={() => handleMsgClick(msg)}
          style={{ cursor: "pointer" }}
        >
          <img
            id="bell"
            className="msg-img"
            src="/images/notif.png"
            alt="Bell Profile"
          />
          <div className="msg">
            <p className="name">{msg.name}</p>
            <p className="announce">{msg.content}</p>
          </div>
        </div>
      ))}
    </>
  );
  
  const envelopeListView = (envelopeMsgList) => (
    <>
      {envelopeMsgList.map((msg) => (
        <div
          key={msg.id}
          className="msg-cont"
          onClick={() => handleMsgClick(msg)}
          style={{ cursor: "pointer" }}
        >
          <img
            className="msg-img"
            src="/images/blank-profile.jpg" // Image specific to envelope messages
            alt="Envelope Profile"
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
      <button onClick={handleBackClick} className="back-button">
        <IoMdArrowRoundBack />
      </button>
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
          <h1>FieldMate</h1>
        </div>

        <div className="user-profile">
          <button
            className="fa-solid fa-bell"
            onClick={toggleBellModal}
          ></button>
          {showBellModal && (
            <div className="modal-bell">
              <h3 className="modal-title">Notifications</h3>
              {isDetailsView ? detailsView : bellListView(bellMessages)}
            </div>
          )}

          <button
            className="fa-solid fa-envelope"
            onClick={toggleEnvelopeModal}
          ></button>
          {showEnvelopeModal && (
            <div className="modal-envelop">
              <h3 className="modal-title">Messages</h3>
              {isDetailsView ? detailsView : envelopeListView(envelopeMessages)}
            </div>
          )}

          <img
            src="/images/supervisor-profile.png"
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
                    src="/images/supervisor-profile.png"
                    alt="User"
                  />
                  <p>Company</p>
                </div>
              </div>
              <hr />
              <button id="edit" onClick={handleSettingsClick}>
                Change Password
              </button>
              <hr />
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {showSettingsModal && (
        <div className="modal-settings">
          <div className="modal-settings-cont">
            <button onClick={handleCloseSettingsModal} className="back-button">
              <IoMdArrowRoundBack />
            </button>

            <div className="settings-form">
              <h1>Change Password</h1>
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
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm Password"
                />
                <button
                  className="eye-button"
                  onClick={() =>
                    togglePasswordVisibility("confirmPassword")
                  }
                >
                  {passwordVisibility.confirmPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>

              <button
                onClick={handleCloseSettingsModal}
                className="change-button"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
