import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Resources/Resources.css';
import { Link } from 'react-router-dom';
import { LuPenLine } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../comp/header";
import NavSupervisorResources from '../comp/navSupervisorResources';




const ResourcesBook = () => {
  const navigate = useNavigate();  

  const handleBack = () => {
    navigate(-1);
};

  return (
    <>
    <body className="bd1">
      <div className="Resources">
        <Header />
        <NavSupervisorResources />
        <div id="perfAtt"></div>
        <div className="bg">    
            <div className="bag">
            <div className="Book-container add-container">
                <FaArrowLeft  className="addarrow" onClick={handleBack}/>
                <p>Subject Title : ______________</p>
                <p>Instructor Name : ______________</p> 
                <h5>Course Description</h5>   
                <i>Description...</i>
                <h5>Table of Content</h5>
                <p>Module 1: ___________________</p>
                <div className="add2">
                    <p><LuPenLine />Chapter 1.1 : __________________</p>
                    <h6><IoMdAddCircleOutline />Add Chapter</h6>
                </div>
                <p><IoMdAddCircleOutline />Add Module</p>
            </div>
            </div>
          </div>
        </div>
    </body>
    <footer className="foot">
      <p>&copy; 2025 LVCC inc... All rights reserved.</p>
      <p>Privacy Policy | Terms of Service </p>
    </footer>
  </>
  );
};

export default ResourcesBook;
