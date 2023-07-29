import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserSignup from '../components/user/UserSignup/UserSignup';
import UserHomePage from '../pages/user/UserHomePage';
import UserLogin from '../components/user/UserLogin/UserLogin';
import UserTurfPage from '../pages/user/UserTurfPage';
import UserProfile from '../components/user/profile/UserProfile';
import UserProfile2 from '../components/user/profile/UserProfile2';
import UserTurfDetail from '../components/user/userTurfDetail/UserTurfDetails';
import UserOtp from '../components/user/UserSignup/UserOtp';
import SuccessPage from '../components/user/userTurfDetail/Components/Success';
import BookingHistory from '../components/user/profile/BookingHistory';
import BookingHistory2 from '../components/user/profile/BookingHistory2';



function UserRouter() {
  return (
   
      <Routes>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/userturf" element={<UserTurfPage />} />
        <Route path="/userprofile" element={<UserProfile2 />} />
        <Route path="/turfs-details" element={<UserTurfDetail />} />
        <Route path="/userotp" element={<UserOtp />} />
        <Route path='/success/:id' element={<SuccessPage/>} />
        <Route path='/userprofile/bookinghistory' element={<BookingHistory/>} />
      </Routes>
  );
}

export default UserRouter;
