import React from 'react'
import { IoIosArrowUp } from "react-icons/io";


function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="foot">
      <p>&copy; 2025 FieldMate. All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
      <IoIosArrowUp id="arrow-up-icon" onClick={scrollToTop} style={{ cursor: 'pointer' }}/>
    </footer>
  )
}

export default Footer