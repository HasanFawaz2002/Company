import React from 'react'
import { NavLink } from 'react-router-dom';
import 
{BsCart3, BsGrid1X2Fill, BsFillPlusSquareFill, BsFileEarmarkPlusFill, BsFileEarmarkText, 
    BsFileEarmarkCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> Zidyia
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <NavLink to="/admin">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </NavLink>
            </li>
            <li className='sidebar-list-item'>
               <NavLink to="/admin/createcertificate">
                    <BsFillPlusSquareFill className='icon'/> Add Certificate
                </NavLink>
            </li>
            <li className='sidebar-list-item'>
                <NavLink to="/admin/CustomizableForm">
                    <BsFileEarmarkPlusFill className='icon'/> Add Request Form
                </NavLink>
            </li>
            <li className='sidebar-list-item'>
                <NavLink to="/admin/RequestedCertificate">
                    <BsFileEarmarkText className='icon'/> Requested Certificate
                </NavLink>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFileEarmarkCheck className='icon'/> Uploaded Certificate
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar