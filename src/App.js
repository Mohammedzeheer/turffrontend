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


function App() {
  return (

    <BrowserRouter>
      <Routes>

        {/* admin */}
        <Route path="/admin/login" element={<Login />}> </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminProtectRoute><AdminDashboardPage /></AdminProtectRoute>}></Route>
          <Route path='managers' element={<VenueManager />}></Route>
          <Route path='users' element={<AdminProtectRoute><AdminUsers /></AdminProtectRoute>}></Route>
          <Route path='turfs' element={<Turfs />}></Route>
          <Route path='bookings' element={<AdminBookings />}></Route>
        </Route>
          
          
        <Route path='/*' element={<UserRouter/>}> </Route>
        <Route  path='/partner/*' element={<PartnerRouter/>}> </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
