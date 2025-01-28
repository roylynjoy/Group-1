import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import Footer from '../components/footer';
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
                <img className='logo-home' src="/images/logo.png" alt="Logo" />
                <h1>FieldMate</h1>
                <h6 id='home'>HOME</h6>
                <h6><a href='#about'>ABOUT</a></h6>
                <h6><a href='#contact'>CONTACT</a></h6>
              </header>

              <div className='fm-container'   >
                <span className='deer'>
                  <img src="/images/deer.png" alt="" />
                </span>
                <div id='fm'>
                  <h1>FieldMate:</h1>
                  <h2>BSA/BSAIS FIELD PRACTICUM ATTENDANCE TRACKING + RESOURCES COMPILATION SYSTEM</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.  
                  </p>
                  <button id='cta-button'><Link to="/Login">GET STARTED</Link></button>
                </div>
              </div>

              <section className="about-container" id='about'>
                <h2>ABOUT US</h2>
                <div className="content">
                  <div className="card-1">
                    <img src="/images/lv.png" alt="La Verdad Christian College" />
                    <div className='LV'>
                    <h3>La Verdad Christian College</h3>
                    <p>Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla. Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc. Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.</p>
                  </div></div>
                  <div className="card-2">
                    
                    <div className='LV'>
                    <h3>Accountancy Course</h3>
                    <p>Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla. Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc. Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.</p>
                    </div>
                    <img src="/images/course.png" alt="Accountancy Course" />
                  </div>
                  <div className="card-3">
                    <img src="/images/JPIA.png" alt="Junior Philippine Institute of Accountancy" />
                    <div className='LV'>
                    <h3>Junior Philippine Institute of Accountancy</h3>
                    <p>Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla. Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc. Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.</p>
                  </div></div>
                </div>
              </section>

              <section className="contact-section" id='contact'>
                <h2>Contact Us</h2>
                <img src="/images/phone.png" id='img1' alt="" />
                <img src="/images/email.png" id='img2' alt="" />
                <img src="/images/location.png" id='img3' alt="" />
                <p  id='p1'> +1 234 567 890</p>
                <p id='p2'>info@laverdad.edu.ph</p>
                <p id='p3'>La Verdad Christian College, Apalit, Pampanga, Philippines</p>

                <div className="map">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123347.40710675181!2d120.61418624335936!3d14.959002300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33965634a341dc6f%3A0x17091aa8b0043f89!2sLa%20Verdad%20Christian%20College!5e0!3m2!1sen!2sph!4v1737910779201!5m2!1sen!2sph"    
                    width="50%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
                <Footer></Footer>
              </section>
    </div>
  );

};

export default homepage;