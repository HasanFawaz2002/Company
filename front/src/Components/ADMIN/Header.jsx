// Header.jsx

import React, { useEffect, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle,  BsJustify } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

function Header({ OpenSidebar, onStatusChange }) {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const location = useLocation();
  const isRequestedCertificateRoute = location.pathname === '/admin/RequestedCertificate' || location.pathname === '/admin/UploadedCertificate';

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    // Call the callback function to pass the selected status
    onStatusChange(event.target.value);
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        {isRequestedCertificateRoute && (
          <>
              <select name="" id="" value={selectedStatus} onChange={handleStatusChange}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              
            
          </>
        )}
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
