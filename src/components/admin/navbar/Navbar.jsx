import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/adminlogin');
  };

  return (
    <nav className="flex items-center justify-between p-1 bg-white text-dark-purple shadow-lg">
      <div className="flex items-center">
        <img src="/image/logoBlue.png" alt="Your Logo" style={{ width: "150px" }} />
        {/* <span className="font-semibold text-lg">Aone TURF</span> */}
      </div>

      <div className="flex items-center ml-auto">
        <button onClick={handleLogout} className="text-dark-purple hover:text-gray-300">Logout</button>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Adjust styles for screens smaller than 768px */
          .flex {
            flex-direction: column;
            align-items: center;
          }

          /* Optional: Add margin between logo and logout button */
          .flex > div:not(:first-child) {
            margin-top: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

















// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {

//   let navigate=useNavigate()

//   const handleLogout =()=>{
//     localStorage.removeItem('admin')
//     navigate('/adminlogin')
// }

//   return (
//     <nav className="flex items-center justify-between p-1 bg-dark-purple text-white shadow-lg">
//   <div className="flex items-center">
//     <img src="/image/AONE.png" alt="Your Logo" style={{ width: "150px" }} />
//     {/* <span className="font-semibold text-lg">Aone TURF</span> */}
//   </div>

//   <div className="flex items-center ml-auto">
//     <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
//   </div>
// </nav>

  
  

//   );
// };

// export default Navbar;
