import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminProtectRoute({children}) {
    
    const admin = JSON.parse(localStorage.getItem("admin"))?.admin || false;
  return   admin ? children : Navigate({to:'/admin/login'});
  
}

export default  AdminProtectRoute
