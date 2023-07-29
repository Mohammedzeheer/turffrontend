import React, { useEffect } from 'react'
import Navbar from '../../components/admin/navbar/Navbar'
import Sidebar from '../../components/admin/sidebar/Sidebar'
import { Outlet, useNavigate} from 'react-router-dom'

function AdminLayout() {

  const Navigate = useNavigate()

  const checkLocalStorage = () => {
    const checkToken = localStorage.getItem("admin");
    if (checkToken) {
     Navigate('/admin')
    }else{
      Navigate('/admin/login')
    }
  };

  useEffect(() => {
    checkLocalStorage();
  },[]);

  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      <div className="grow">
          <Outlet/>
      </div>
      </div>

    </div>
  )
}

export default AdminLayout
