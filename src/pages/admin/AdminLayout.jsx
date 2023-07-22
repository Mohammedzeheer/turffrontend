import React from 'react'
import Navbar from '../../components/admin/navbar/Navbar'
import Sidebar from '../../components/admin/sidebar/Sidebar'
import { Outlet} from 'react-router-dom'

function AdminLayout() {

  // const Navigate = useNavigate()

  // useEffect(() => {
  //   const checkLocalStorage = () => {
  //     const checkToken = localStorage.getItem("admin");
  //     if (checkToken) {
  //      Navigate('/admin')
  //     }else{
  //       Navigate('/adminlogin')
  //     }
  //   };
  //   checkLocalStorage();
  // },[]);

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
