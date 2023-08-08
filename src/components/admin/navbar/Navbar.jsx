import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdLogOut, IoMdMail,IoMdChatboxes  } from "react-icons/io";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <nav className="flex items-center justify-between p-1 bg-white text-dark-purple shadow-lg">
      <div className="flex items-center">
        <img
          src="/image/logoBlue.png"
          alt="Your Logo"
          style={{ width: "150px" }}
          onClick={()=>navigate('/admin/dashboard')}
        />
      </div>

      <div className="flex items-center ml-auto">
        <button
          onClick={handleLogout}
          className="text-dark-purple hover:text-gray-300 inline-flex items-center mr-4"
        >
          <IoMdLogOut className="w-5 h-5 mr-2" />
          Logout
        </button>

        <button
          onClick={() => {
            navigate('/admin/chat')
          }}
          className="text-dark-purple hover:text-gray-300 inline-flex items-center"
        >
          <IoMdChatboxes  className="w-5 h-5 mr-2" />
          chat
        </button>
      </div>
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





// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { IoMdLogOut } from "react-icons/io";

// const Navbar = () => {
//   let navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     navigate("/admin/login");
//   };

//   return (
//     <nav className="flex items-center justify-between p-1 bg-white text-dark-purple shadow-lg">
//       <div className="flex items-center">
//         <img
//           src="/image/logoBlue.png"
//           alt="Your Logo"
//           style={{ width: "150px" }}
//         />
//       </div>   

//       <div class="flex items-center ml-auto">
//         <button
//           onClick={handleLogout}
//           class="text-dark-purple hover:text-gray-300 inline-flex items-center"
//         >
//           <IoMdLogOut class="w-5 h-5 mr-2" />
//           Logout
//         </button>
//       </div>



//       <style jsx>{`
//         @media (max-width: 768px) {
//           /* Adjust styles for screens smaller than 768px */
//           .flex {
//             flex-direction: column;
//             align-items: center;
//           }

//           /* Optional: Add margin between logo and logout button */
//           .flex > div:not(:first-child) {
//             margin-top: 10px;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;










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
