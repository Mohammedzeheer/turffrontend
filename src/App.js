import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './components/admin/login/AdminLogin'
// import AdminHome from './components/admin/adminHome/AdminHome';
import UserSignup from './components/user/UserSignup/UserSignup';
import UserHomePage from './pages/user/UserHomePage'
import UserLogin from './components/user/UserLogin/UserLogin'
import UserTurfPage from './pages/user/UserTurfPage';
import UserProfile from './components/user/profile/UserProfile';
import UserProfile2 from './components/user/profile/UserProfile2';
import UserTurfDetail from './components/user/userTurfDetail/UserTurfDetails';
import UserOtp from './components/user/UserSignup/UserOtp';


import AdminLayout from './pages/admin/AdminLayout';
import VenueManager from './components/admin/manager/VenueManager';
import AdminDashboardPage from './pages/admin/adminDashboardPage';
import AdminVenueManagerPage from './pages/admin/AdminVenueManagerPage';
import AdminUsersPage from './pages/admin/adminUsersPage';
import Sidebar from './components/admin/sidebar/Sidebar';
import Navbar from './components/admin/navbar/Navbar';
import AdminUsers from './components/admin/users/AdminUsers';
import Turfs from './components/admin/turfs/AdminTurfs';

import PartnerLogin from './components/partner/login/PartnerLogin';
import PartnerSignup from './components/partner/signup/PartnerSignup';
import PartnerDashboard from './components/partner/Dashboard/PartnerDashboard';
import PartnerNavbar from './components/partner/header/partnerNavbar'
import AddTurf from './components/partner/addTurf/AddTurf';
import PartnerTurfs from './components/partner/Turf/PartnerTurfs';
import VenueHome from './components/partner/venue/VenueHome';
import RegTurf from './components/partner/addTurf/RegTurf';
import TurfPorfile from './components/partner/Turf/TurfProfile';
import Bookings from './components/partner/bookings/Bookings';
import PartnerOtp from './components/partner/signup/partnerOtp';
import PartnerProfile from './components/partner/profile/PartnerProfile';


// import Otp from './components/user/otp/Otp';



function App() {
  return (

    <BrowserRouter>
      <Routes>

        {/* admin */}
        <Route path="/adminlogin" element={<Login />}> </Route>
        {/* <Route path='/users' element={<AdminUsers />}></Route> */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboardPage />}></Route>
          <Route path='managers' element={<VenueManager />}></Route>
          <Route path='users' element={<AdminUsers />}></Route>
          <Route path='turfs' element={<Turfs />}></Route>
        </Route>
        
        
        {/* user */}
        <Route path='/signup' element={<UserSignup/>}>  </Route>
        <Route path='/login' element={<UserLogin/>}>  </Route>
        <Route path='/' element={<UserHomePage/>}></Route>
        <Route path='/userturf' element={<UserTurfPage/>}></Route>
        {/* <Route path='/userprofile' element={<UserProfile/>}>  </Route> */}
          <Route path='/userprofile' element={<UserProfile2/>}>  </Route>
          <Route path='/turfs-details' element={<UserTurfDetail/>}>  </Route>

          <Route path='/userotp' element={<UserOtp/>}>  </Route>
          {/* <Route path='/otp' element={<Otp/>}>  </Route> */}
          
          

        

        {/* partner */}
        <Route path='/partnerlogin' element={<PartnerLogin/>}>  </Route>
        <Route path='/partnersignup' element={<PartnerSignup/>}>  </Route>
        <Route path='/partner' element={<PartnerDashboard/>}>  </Route>
        <Route path='/partnernavbar' element={<PartnerNavbar/>}>  </Route>
        <Route path='/addturf' element={<AddTurf/>}>  </Route>
        <Route path='/partnerturfs' element={<PartnerTurfs/>}>  </Route>
        <Route path='/partner/venuehome' element={<VenueHome/>}>  </Route>
        <Route path='/regturf' element={<RegTurf/>}>  </Route>

        <Route path='/turfprofile' element={<TurfPorfile/>}>  </Route>
        <Route path='/partner/booking' element={<Bookings/>}>  </Route>
        <Route path='/partnerotp' element={<PartnerOtp/>}>  </Route>
        <Route path='/partner/profile' element={<PartnerProfile/>}>  </Route>
        
        


        
        
        
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
