import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';

import UserRouter from './router/UserRouter';
import PartnerRouter from './router/PartnerRouter';

import Login from './components/admin/login/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout';
import VenueManager from './components/admin/manager/VenueManager';
import AdminDashboardPage from './pages/admin/adminDashboardPage';
import AdminUsers from './components/admin/users/AdminUsers';
import Turfs from './components/admin/turfs/AdminTurfs';
import AdminBookings from './components/admin/Bookings/AdminBookings';
import AdminProtectRoute from './router/protectedRouter/AdminProtectRouter';
import SalesReport from './components/admin/SalesReport/SalesReport';
import AdminChat from './components/admin/chat/AdminChat';
import AdminDashboard from './components/admin/chat/AdminDashboard';




function App() {
  return (

    <BrowserRouter>
      <Routes>

        {/* admin */}

        <Route path="/admin/login" element={<Login />}> </Route>
        <Route path="/admin/chat" element={<AdminChat />}> </Route>
        {/* <Route path="/admin/chat" element={<AdminDashboard />}> </Route> */}
        
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboardPage />}></Route>
          <Route path='managers' element={<VenueManager />}></Route>
          <Route path='users' element={<AdminUsers />}></Route>
          <Route path='turfs' element={<Turfs />}></Route>
          <Route path='bookings' element={<AdminBookings />}></Route>
          <Route path='SalesReport' element={<SalesReport />}></Route>    
        </Route>
          
          
        <Route path='/*' element={<UserRouter/>}> </Route>
        <Route  path='/partner/*' element={<PartnerRouter/>}> </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
