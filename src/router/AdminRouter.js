import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../components/admin/login/AdminLogin';
import AdminLayout from '../pages/admin/AdminLayout';
import VenueManager from '../components/admin/manager/VenueManager';
import AdminDashboardPage from '../pages/admin/adminDashboardPage';
import AdminUsers from '../components/admin/users/AdminUsers';
import Turfs from '../components/admin/turfs/AdminTurfs';

function AdminRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />} />
        {/* <Route path="/admin" element={<AdminLayout />}> */}
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="managers" element={<VenueManager />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="turfs" element={<Turfs />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AdminRouter;
