import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../components/404';


const NotFoundRoute = () => {
  return (
    <Routes>
       <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default NotFoundRoute;
