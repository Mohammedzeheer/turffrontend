import React,{useEffect,useState} from 'react'
// import './userHome.css'
import { useNavigate } from 'react-router-dom'
import UserHome2 from './UserHome2';


function UserHome() {

  let navigate = useNavigate()
  const [isLogin, setLogin] = useState(false);

  // useEffect(() => {
  //   const checkLocalStorage = () => {
  //     const checkToken = localStorage.getItem("user");
  //     if (checkToken) {
  //       setLogin(true);
  //     }
  //   };
  //   checkLocalStorage();
  // }, []);

  // const handleBookSlotClick = () => {
  //   if (isLogin) {
  //     navigate("/userturf");
  //   } else {
  //     navigate("/signup");
  //   }
  // };

  const handleBookSlotClick = () => {
      navigate("/userturf"); 
  };

  return (


<div class="banner relative">
<img src="/image/TURF3.jpg" alt="Turf Booking Banner" class="w-full h-auto object-cover" />
<div class="button-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
  <button onClick={handleBookSlotClick} class="bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer text-sm sm:text-lg m-2 outline-none">Book Your Slot</button>
  <button onClick={() => navigate('/partner/signup')} class="bg-gray-300 text-black px-4 py-2 rounded-full cursor-pointer text-sm sm:text-lg m-2 outline-none">Partner with Us</button>
</div>
</div>

  )
}

export default UserHome









// import React,{useEffect,useState} from 'react'
// // import './userHome.css'
// import { useNavigate } from 'react-router-dom'
// import UserHome2 from './UserHome2';


// function UserHome() {

//   let navigate = useNavigate()
//   const [isLogin, setLogin] = useState(false);

//   // useEffect(() => {
//   //   const checkLocalStorage = () => {
//   //     const checkToken = localStorage.getItem("user");
//   //     if (checkToken) {
//   //       setLogin(true);
//   //     }
//   //   };
//   //   checkLocalStorage();
//   // }, []);

//   // const handleBookSlotClick = () => {
//   //   if (isLogin) {
//   //     navigate("/userturf");
//   //   } else {
//   //     navigate("/signup");
//   //   }
//   // };

//   const handleBookSlotClick = () => {
//       navigate("/userturf"); 
//   };

//   return (
// <div className="banner relative">
//   <img src="/image/TURF3.jpg" alt="Turf Booking Banner" className="w-full h-auto object-cover" />
//   <div className="button-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//     <button onClick={handleBookSlotClick} className="bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer text-sm m-2 outline-none">Book Your Slot</button>
//     <button onClick={() => navigate('/partner/signup')} className="bg-gray-300 text-black px-4 py-2 rounded-full cursor-pointer m-2 text-sm outline-none">Partner with Us</button>
//   </div>
// </div>
  

//   )
// }

// export default UserHome
