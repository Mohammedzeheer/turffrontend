import React from 'react';
import {Routes, Route } from 'react-router-dom';

import Login from '../components/admin/login/AdminLogin'
import AdminLayout from '../pages/admin/AdminLayout';
import VenueManager from '../components/admin/manager/VenueManager';
import AdminDashboardPage from '../pages/admin/adminDashboardPage';
import AdminUsers from '../components/admin/users/AdminUsers';
import Turfs from '../components/admin/turfs/AdminTurfs';
import AdminBookings from '../components/admin/Bookings/AdminBookings';
import SalesReport from '../components/admin/SalesReport/SalesReport';
import AdminChat from '../components/admin/chat/AdminChat';
import PageNotFound from '../components/404';


function AdminRouter() {
  return (
      <Routes>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/chat" element={<AdminChat />}> </Route>
        <Route path="*" element={<PageNotFound/>} /> 

        <Route path='/' element={<AdminLayout />}>
          <Route path='' element={<AdminDashboardPage />}></Route>
          <Route path='dashboard' element={<AdminDashboardPage />}></Route>
          <Route path='managers' element={<VenueManager />}></Route>
          <Route path='users' element={<AdminUsers />}></Route>
          <Route path='turfs' element={<Turfs />}></Route>
          <Route path='bookings' element={<AdminBookings />}></Route>
          <Route path='SalesReport' element={<SalesReport />}></Route>  
        </Route>
      </Routes>
  );
}

export default AdminRouter;