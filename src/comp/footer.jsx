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
        <p>&copy; 2025 LVCC INC... All rights reserved.</p>
        <p>Privacy Policy | Terms of Service </p>
    </footer>
  )
}

export default Footer