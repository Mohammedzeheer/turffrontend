import React from 'react';
import { FaBookOpen } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const ButtonBooking = () => {
  const navigate= useNavigate()
  return (
    <div>
    <button onClick={()=>navigate('/booking/history')} className="flex items-center justify-center mx-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-grey-600 hover:bg-customGreen  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 mt-5">
      <FaBookOpen className="mr-2" />
      My Bookings
    </button>
  </div>
  );
};

export default ButtonBooking;
