import React from 'react'
import { Navigate } from 'react-router-dom'

function UserProtectedRoute({children}) {
    
    const user = JSON.parse(localStorage.getItem("user"))?.user || false;
  return   user ? children : Navigate({to:'/login'});
  
}

export default  UserProtectedRoute
