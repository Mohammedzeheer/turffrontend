import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './topbar.css';

const TopBar = () => {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const checkToken = localStorage.getItem('partner');
      if (checkToken) {
        setLogin(true);
      }
    };
    checkLogin();
  }, []);

  const handleNavLinkClick = (path) => {
    if (!isLogin) {
      navigate('/partner/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-customBlue">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div
              className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
              onClick={() => handleNavLinkClick('/partner')}
            >
              Dashboard
            </div>
            <div
              className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
              onClick={() => handleNavLinkClick('/partner/venuehome')}
            >
              Venues
            </div>
            <div
              className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
              onClick={() => handleNavLinkClick('/partner/booking')}
            >
              Bookings
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;









// import React,{useState,useEffect} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import './topbar.css';

// const TopBar = () => {

//   const [isLogin, setLogin] = useState(false);
//   const navigate= useNavigate()

//   useEffect(() => {
//     const checkLogin = () => {
//       const checkToken = localStorage.getItem("partner");
//       if (checkToken) {
//         setLogin(true);
//       }
//     };
//     checkLogin();
//   }, []);

//   const handleNavLinkClick = (path) => {
//     if (!isLogin) {
//       navigate('/partner/login');
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <nav className="bg-customBlue">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//           {isLogin && ( 
//             <>
//             <NavLink
//               to="/partner"
//               exact
//               activeClassName="active-link" // Add the class name for the active link
//               className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
//               >
//               Dashboard
//             </NavLink>
//             <NavLink
//               to="/partner/venuehome"
//               activeClassName="active-link" // Add the class name for the active link
//               className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
//               >
//               Venues
//             </NavLink>
//             <NavLink
//               to="/partner/booking"
//               activeClassName="active-link" // Add the class name for the active link
//               className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
//               >
//               Bookings
//             </NavLink>
//           </>
//           )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default TopBar;









// import React from 'react';
// import { Link } from 'react-router-dom';
// import './topbar.css';

// const TopBar = () => {
//   return (
//     <nav className="bg-customBlue">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link
//               to="/partner"
//               className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/partner/venuehome"
//               className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
//             >
//               Venues
//             </Link>
//             <Link
//               to="/partner/booking"
//               className="text-white font-medium cursor-pointer no-underline px-3 py-2 rounded-md hover:bg-customGreen"
//             >
//              Bookings
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default TopBar;
