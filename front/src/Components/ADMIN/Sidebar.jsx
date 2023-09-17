import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillPlusSquareFill,
  BsFileEarmarkPlusFill,
  BsFileEarmarkText,
  BsFileEarmarkCheck,
  BsPersonFill ,
  BsFillGearFill,
} from 'react-icons/bs';
import logo from '../../images/logo.png';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const closeSidebar = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
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
            <BsGrid1X2Fill className='icon' /> Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/createcertificate" onClick={closeSidebar}>
            <BsFillPlusSquareFill className='icon' /> Add Certificate
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/CustomizableForm" onClick={closeSidebar}>
            <BsFileEarmarkPlusFill className='icon' /> Add Request Form
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/RequestedCertificate" onClick={closeSidebar}>
            <BsFileEarmarkText className='icon' /> Requested Certificate
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin/UploadedCertificate" onClick={closeSidebar}>
            <BsFileEarmarkCheck className='icon' /> Uploaded Certificate
          </NavLink>
        </li>
        
        <li className='sidebar-list-item'>
          <a href="" onClick={closeSidebar}>
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
