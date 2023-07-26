import React from 'react'
import {Routes,Route} from 'react-router-dom';

import PartnerLogin from '../components/partner/login/PartnerLogin';
import PartnerSignup from '../components/partner/signup/PartnerSignup';
import PartnerDashboard from '../components/partner/Dashboard/PartnerDashboard';
import PartnerNavbar from '../components/partner/header/partnerNavbar'
import AddTurf from '../components/partner/addTurf/AddTurf';
import PartnerTurfs from '../components/partner/Turf/PartnerTurfs';
import VenueHome from '../components/partner/venue/VenueHome';
import RegTurf from '../components/partner/addTurf/RegTurf';
import TurfPorfile from '../components/partner/Turf/TurfProfile';
import Bookings from '../components/partner/bookings/Bookings';
import PartnerOtp from '../components/partner/signup/partnerOtp';
import PartnerProfile from '../components/partner/profile/PartnerProfile';
import VenueDetail from '../components/partner/venue/VenueDetail';

function PartnerRouter() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<PartnerLogin/>}>  </Route>
        <Route path='/signup' element={<PartnerSignup/>}>  </Route>
        <Route path='/' element={<PartnerDashboard/>}>  </Route>
        <Route path='/partnernavbar' element={<PartnerNavbar/>}>  </Route>
        <Route path='/addturf' element={<AddTurf/>}>  </Route>
        <Route path='/partnerturfs' element={<PartnerTurfs/>}>  </Route>
        <Route path='/venuehome' element={<VenueHome/>}>  </Route>
        <Route path='/regturf' element={<RegTurf/>}>  </Route>
        <Route path='/turfprofile' element={<TurfPorfile/>}>  </Route>
        <Route path='/booking' element={<Bookings/>}>  </Route>
        <Route path='/otp' element={<PartnerOtp/>}>  </Route>
        <Route path='/profile' element={<PartnerProfile/>}>  </Route>

        {/* <Route path="/venue-details/:turfId" component={VenueDetail} /> */}
        <Route path="/venue-details/:turfId"  element={<VenueDetail/>} />
     
    </Routes>
    </>
  )
}

export default PartnerRouter

