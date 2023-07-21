import React from 'react';
import './partnerSidebar.css'
import { useNavigate } from 'react-router-dom';

const PartnerSidebar = () => {

    const navigate=useNavigate()
  return (
    <div className="sidebar">
      <div className="sidebar-header">Menu</div>
      <div className="sidebar-content">
        <ul>
          <li onClick={() => navigate('/addturf')}>Turfs</li>
          <ul className="sub-menu">
            <li onClick={() => navigate('/addturf')}>Add Turfs</li>
            <li onClick={() => navigate('/partnerturfs')}>Turfs Details</li>
          </ul>
          <li>User</li>
        </ul>
      </div>
    </div>
  );
};

export default PartnerSidebar;
