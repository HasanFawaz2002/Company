import React,{ useState } from 'react';
import './Dropdown.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DropDown = ({ closeMenu,className }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    
    const institutionLogin = () => {
      navigate('/Institutionlogin')
      toggleDropdown();
      if (typeof closeMenu === 'function') {
        closeMenu(); 
      }
    }

    const userLogin = () => {
      navigate('/login')
      toggleDropdown();
      if (typeof closeMenu === 'function') {
        closeMenu();
      }
    }

   
  return (
    <>
      <label
        className={`popup ${isOpen ? 'open' : ''}`}
        onMouseEnter={() => setIsOpen(true)} // Open on hover
        onMouseLeave={() => setIsOpen(false)} // Close on mouse leave
      >
        <input type="checkbox" checked={isOpen} onChange={toggleDropdown} />
        <div className={`burger ${className}`} tabIndex="0">
            Login
        </div>
        <nav className='popup-window'>
          <ul>
          
            <li>
              <button onClick={institutionLogin}>
              <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      height="14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="8" y1="9" x2="16" y2="9"></line>
      <line x1="8" y1="13" x2="14" y2="13"></line>
      <line x1="8" y1="17" x2="12" y2="17"></line>
    </svg>
                <span>As an Institution</span>
              </button>
            </li>
              <li>
              <button onClick={userLogin}>
              <svg
    strokeLinejoin="round"
    strokeLinecap="round"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
    height="14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="8" y1="12" x2="16" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="16"></line>
  </svg>
                <span>As a  User</span>
              </button>
            </li>
            
              
          </ul>
        </nav>
      </label>
    </>
  );
};

export default DropDown;
