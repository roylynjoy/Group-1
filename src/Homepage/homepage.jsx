import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import { IoIosArrowUp } from "react-icons/io";

const homepage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
        <div className="homepage"> 
              <header className="hp-header">
                <h1>Fieldmate</h1>
                <h6 id='home'>HOME</h6>
                <h6><a href='#about'>ABOUT</a></h6>
                <h6><a href='#contact'>CONTACT</a></h6>
              </header>

              <div className='fm-container'   >
                <span className='deer'>
                  <img src="src\pictures\deer.png" alt="" />
                </span>
                <div id='fm'>
                  <h1>Fieldmate:</h1>
                  <h2>BSA/BSAIS FIELD PRACTICUM</h2>
                  <p>Your guide to success in accountancy field practicums.</p>
                  <button id='cta-button'><Link to="/Login">GET STARTED</Link></button>
                </div>
              </div>

              <section className="about-container" id='about'>
                <h2>About Us</h2>
                <div className="content">
                  <div className="card-1">
                    <img src="../src/pictures/lv.png" alt="La Verdad Christian College" />
                    <h3>La Verdad Christian College</h3>
                    <p>Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla. Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc. Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.</p>
                  </div>
                  <div className="card-2">
                    <img src="src\pictures\course.png" alt="Accountancy Course" />
                    <h3>Accountancy Course</h3>
                    <p>Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla. Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc. Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.</p>
                  </div>
                  <div className="card-3">
                    <img src="src\pictures\JPIA.png" alt="Junior Philippine Institute of Accountancy" />
                    <h3>Junior Philippine Institute of Accountancy</h3>
                    <p>Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla. Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc. Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.</p>
                  </div>
                </div>
              </section>

              <section className="contact-section" id='contact'>
                <h2>Contact Us</h2>
                <img src="src\pictures\phone.png" id='img1' alt="" />
                <img src="src\pictures\email.png" id='img2' alt="" />
                <img src="src\pictures\location.png" id='img3' alt="" />
                <p  id='p1'> +1 234 567 890</p>
                <p id='p2'>info@laverdad.edu.ph</p>
                <p id='p3'>La Verdad Christian College, Apalit, Pampanga, Philippines</p>

                <div className="map">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.738389918356!2d120.75888491550549!3d14.957033276029794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f6237d8bfb61%3A0x7765d4b70c087d36!2sLa%20Verdad%20Christian%20College!5e0!3m2!1sen!2sph!4v1697229383065!5m2!1sen!2sph"
                    width="50%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </section>

      <footer className="footer">
        <p>&copy; 2025 LVCC inc... All rights reserved.</p>
        <p>Privacy Policy | Terms of Service </p>
        <IoIosArrowUp id="arrow-up-icon" onClick={scrollToTop} style={{ cursor: 'pointer' }}/>
      </footer>
    </div>
  );

};

export default homepage;