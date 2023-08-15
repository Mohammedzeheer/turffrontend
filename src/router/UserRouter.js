import React from "react";
import { Routes, Route } from "react-router-dom";

import UserSignup from "../components/user/UserSignup/UserSignup";
import UserHomePage from "../pages/user/UserHomePage";
import UserLogin from "../components/user/UserLogin/UserLogin";
import UserTurfPage from "../pages/user/UserTurfPage";
import UserProfile2 from "../components/user/profile/UserProfile2";
import UserTurfDetail from "../components/user/userTurfDetail/UserTurfDetails";
import UserOtp from "../components/user/UserSignup/UserOtp";
import SuccessPage from "../components/user/userTurfDetail/Components/Success";
import BookingHistory from "../components/user/profile/BookingHistory";
import BookingDetail from "../components/user/userTurfDetail/Components/BookingDetail";
import UserChat from "../components/user/chat/UserChat";
import PageNotFound from "../components/404";
// import UserProtectedRoute from './protectedRouter/UserProtectRouter';
// import Booking from '../components/user/userTurfDetail/Components/Booking';

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserHomePage />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/turfs" element={<UserTurfPage />} />
      <Route path="/profile" element={<UserProfile2 />} />
      <Route path="/turfs-details" element={<UserTurfDetail />} />
      <Route path="/booking-detail" element={<BookingDetail />} />
      <Route path="/userotp" element={<UserOtp />} />
      <Route path="/success/:id" element={<SuccessPage />} />
      <Route path="/booking/history" element={<BookingHistory />} />
      <Route path="/message" element={<UserChat />} />
      <Route path="*" element={<PageNotFound />} />
      {/* <Route path="/turfs-details" element={<UserProtectedRoute><UserTurfDetail /></UserProtectedRoute>} /> */}
      {/* <Route path="/booking" element={<UserProtectedRoute><Booking /></UserProtectedRoute>} />*/}
    </Routes>
  );
}

export default UserRouter;
