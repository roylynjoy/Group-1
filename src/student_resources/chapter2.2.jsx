import React from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/bookFooter';

function chapter202() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
};
  return (
    <>
    <body className="bd1">
      <i class="fa-solid fa-arrow-left back" onClick={handleBack}></i>
        <header className='module-header'>
            <h1>Management Accounting</h1>
            <h3>Module 1 : Lorem Ipsum Dolor Sit Amet: Consectetur Adipiscing Elit</h3>
        </header>

        <div className='chapter'>
            <h1>Chapter 2.2 </h1>
            <h2>Suspendisse Etiam Condimentum Nibh Sit Amet Ultricies</h2>
            <p><span>Lorem Ipsum</span> - Placeholder text commonly used in the graphic and typesetting industry to demonstrate the visual form of a document or font without relying on meaningful content.</p>
            <p><span>Dolor Sit Amet</span> - A phrase used in placeholder text that means "pain is the goal" when translated literally, but has no real meaning in the context of placeholder content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
            <p><span>Consectetur Adipiscing Elit</span> - A Latin phrase that refers to a generic description or set of words used in the absence of real content.</p>
            <p>Cras felis nulla, gravida eget mauris et, malesuada lacinia lectus. Nulla varius congue sem, non eleifend eros pretium et. Phasellus auctor tempor purus, non auctor felis iaculis sed. Nulla facilisi.</p>
        </div>
    </body>
    <Footer/>
    </>
  )
}

export default chapter202