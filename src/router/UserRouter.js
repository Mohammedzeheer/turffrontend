import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserSignup from '../components/user/UserSignup/UserSignup';
import UserHomePage from '../pages/user/UserHomePage';
import UserLogin from '../components/user/UserLogin/UserLogin';
import UserTurfPage from '../pages/user/UserTurfPage';
import UserProfile2 from '../components/user/profile/UserProfile2';
import UserTurfDetail from '../components/user/userTurfDetail/UserTurfDetails';
import UserOtp from '../components/user/UserSignup/UserOtp';
import SuccessPage from '../components/user/userTurfDetail/Components/Success';
import BookingHistory from '../components/user/profile/BookingHistory';
// import UserProtectedRoute from './protectedRouter/UserProtectRouter';
// import Booking from '../components/user/userTurfDetail/Components/Booking';
import BookingDetail from '../components/user/userTurfDetail/Components/BookingDetail';
import UserChat from '../components/user/chat/UserChat';





function UserRouter() {
  return (
   
      <Routes>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/turfs" element={<UserTurfPage />} />
        <Route path="/profile" element={<UserProfile2 />} />
        {/* <Route path="/turfs-details" element={<UserProtectedRoute><UserTurfDetail /></UserProtectedRoute>} /> */}
        <Route path="/turfs-details" element={<UserTurfDetail />} />
        <Route path="/booking-detail" element={<BookingDetail />} />
        {/* <Route path="/booking" element={<UserProtectedRoute><Booking /></UserProtectedRoute>} />        */}
        <Route path="/userotp" element={<UserOtp />} />
        <Route path='/success/:id' element={<SuccessPage/>} />
        
        <Route path='/booking/history' element={<BookingHistory/>} />

        <Route path="/message" element={<UserChat />} />
        
        
      </Routes>
  );
}

export default UserRouter;



























// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import UserBlockedRoute from '../router/UserBlockRoute';

// import UserSignup from '../components/user/UserSignup/UserSignup';
// import UserHomePage from '../pages/user/UserHomePage';
// import UserLogin from '../components/user/UserLogin/UserLogin';
// import UserTurfPage from '../pages/user/UserTurfPage';
// import UserProfile from '../components/user/profile/UserProfile';
// import UserProfile2 from '../components/user/profile/UserProfile2';
// import UserTurfDetail from '../components/user/userTurfDetail/UserTurfDetails';
// import UserOtp from '../components/user/UserSignup/UserOtp';
// import SuccessPage from '../components/user/userTurfDetail/Components/Success';
// import BookingHistory from '../components/user/profile/BookingHistory';
// import BookingHistory2 from '../components/user/profile/BookingHistory2';

// function UserRouter() {
//   return (
//     <Routes>
//       <Route path="/signup" element={<UserBlockedRoute element={<UserSignup />} />} />
//       <Route path="/login" element={<UserBlockedRoute element={<UserLogin />} />} />
//       <Route path="/" element={<UserHomePage />} />
//       <Route path="/userturf" element={<UserBlockedRoute element={<UserTurfPage />} />} />
//       <Route path="/userprofile" element={<UserBlockedRoute element={<UserProfile2 />} />} />
//       <Route path="/turfs-details" element={<UserBlockedRoute element={<UserTurfDetail />} />} />
//       <Route path="/userotp" element={<UserBlockedRoute element={<UserOtp />} />} />
//       <Route path='/success/:id' element={<UserBlockedRoute element={<SuccessPage />} />} />
//       <Route path='/userprofile/bookinghistory' element={<UserBlockedRoute element={<BookingHistory />} />} />
//     </Routes>
//   );
// }

// export default UserRouter;







