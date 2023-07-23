import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';

const TopBar = () => {
  return (
    <nav className="bg-customBlue">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/partner"
              className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
            >
              Dashboard
            </Link>
            <Link
              to="/partner/venuehome"
              className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
            >
              Venues
            </Link>
            <Link
              to="/partner/booking"
              className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
            >
             Bookings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
