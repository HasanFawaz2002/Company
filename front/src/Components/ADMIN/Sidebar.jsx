import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillPlusSquareFill,
  BsFileEarmarkPlusFill,
  BsFileEarmarkText,
  BsFileEarmarkCheck,
  BsBoxArrowLeft,
} from 'react-icons/bs';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const closeSidebar = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    navigate('/');

  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={logo} alt="" /> Zidyia
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink to="/admin" onClick={closeSidebar}>
            <BsGrid1X2Fill id='first-svg' className='icon' /> 
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/createcertificate" onClick={closeSidebar}>
            <BsFillPlusSquareFill className='icon' /> 
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/CustomizableForm" onClick={closeSidebar}>
            <BsFileEarmarkPlusFill className='icon' /> 
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/RequestedCertificate" onClick={closeSidebar}>
            <BsFileEarmarkText className='icon' /> 
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/UploadedCertificate" onClick={closeSidebar}>
            <BsFileEarmarkCheck className='icon' /> 
          </NavLink>
        </li>
        
        <li className='sidebar-list-item' onClick={handleLogout}>
          <a href="" onClick={closeSidebar}>
            <BsBoxArrowLeft className='icon' /> 
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
