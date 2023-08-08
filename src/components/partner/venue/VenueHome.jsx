import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../sidebar/TopBar";
import PartnerNavbar from "../header/partnerNavbar";
import { AxiosPartner } from "../../../api/AxiosInstance";
import LoadingFootball from "../../LoadingFootball";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function VenueHome() {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const partnerToken=localStorage.getItem('partner')
  const headers={authorization:partnerToken}

  const fetchData = async () => {
    try {
      const response = await AxiosPartner.get(`partnerturfview`,{headers});
      console.log(response.data.data);
      setTurfs(response.data.data);
      setIsLoading(false); 
    } catch (error) {
      toast.error("Error fetching data:", error);
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTurfClick = (turfId) => {
    navigate(`/partner/venue-details/${turfId}`);
  };

  return (
    <>
      <PartnerNavbar />
      <TopBar />
      <div>
      {isLoading ? (
        <div className="mt-[140px]  content-center"><LoadingFootball/></div> 
      ) : (
        <React.Fragment>
        <div className="flex justify-center mt-10">
          <button
            className="bg-white rounded-full shadow-md p-4 cursor-pointer hover:shadow-lg transition flex items-center justify-center"
            onClick={() => navigate("/partner/addturf")}
          >
            <h2 className="font-bold text-2xl text-customBlue">Add Turf</h2>
          </button>
        </div>

        <div className="w-70 py-[3rem] mt-[20px] px-4 bg-white h-[100vh] pb-52">
          <div className="max-w-[1240px] mx-auto grid sm:grid-cols-3 gap-8">
            {turfs ? (
              turfs.map((turf, index) => (
                <div
                  key={index}
                  className="w-fit h-fit shadow-2xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300 text-center cursor-pointer"
                >
                  <img
                    onClick={() => handleTurfClick(turf._id)}
                    className="mx-auto bg-customGreen"
                    // src={`${UserPort}images/${turf.images[0]}`}
                    src={turf.images[0]}
                    alt="/"
                    style={{ width: "400px", height: "200px" }}
                  />
                  <h2 className="text-2xl font-bold text-center py-2">
                    {turf?.courtName}
                  </h2>
                  <div className="text-center font-medium">
                    <p className="border-b mx-6 mt-6">{turf.district}</p>
                    <p className="border-b mx-6 mt-6">{turf.mobileNumber}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-content-center">
                   Data Not Found!
              </div>
            )}
          </div>
        </div>
        </React.Fragment>
      )}
      </div>
    </>
  );
}

export default VenueHome;








// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TopBar from "../sidebar/TopBar";
// import PartnerNavbar from "../header/partnerNavbar";
// import { UserPort } from "../../../store/port";
// import { useSelector } from "react-redux";
// import { AxiosPartner } from "../../../api/AxiosInstance";
// import Modal from "./VenueDetailModal"; // Import the Modal component

// function VenueHome() {
//   const navigate = useNavigate();
//   const [turfs, setTurfs] = useState();
//   const [loading, setLoading] = useState(true);
//   const [selectedTurf, setSelectedTurf] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { partnerId } = useSelector((state) => state.partner);
//   console.log(partnerId, ": --------------- partner id ");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AxiosPartner.get(`partnerturfview/${partnerId}`, {
//           withCredentials: true,
//         });
//         console.log(response.data.data);
//         setTurfs(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTurfClick = (turf) => {
//     setSelectedTurf(turf);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <PartnerNavbar />
//       <TopBar />
//       <div>
//         <div className="flex justify-center mt-10">
//           <button
//             className="bg-white rounded-full shadow-md p-4 cursor-pointer hover:shadow-lg transition flex items-center justify-center"
//             onClick={() => navigate("/partner/addturf")}
//           >
//             <h2 className="font-bold text-2xl text-customBlue">Add Turf</h2>
//           </button>
//         </div>

//         <div className="w-70 py-[3rem] mt-[20px] px-4 bg-white h-[100vh] pb-52">
//           <div className="max-w-[1240px] mx-auto grid sm:grid-cols-3 gap-8">
//             {turfs ? (
//               turfs.map((turf, index) => (
//                 <div
//                   key={index}
//                   className="w-fit h-fit shadow-2xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300 text-center"
//                 >
//                   <img
//                     onClick={() => handleTurfClick(turf)}
//                     className="mx-auto bg-customGreen"
//                     src={`${UserPort}images/${turf.images[0]}`}
//                     alt="/"
//                     style={{ width: "400px", height: "200px" }}
//                   />
//                   <h2
//                     // onClick={() => navigate(turf._id)}
//                     className="text-2xl font-bold text-center py-2"
//                   >
//                     {turf?.courtName}
//                   </h2>
//                   <div className="text-center font-medium">
//                     <p className="border-b mx-6 mt-6">{turf.district}</p>
//                     <p className="border-b mx-6 mt-6">{turf.mobileNumber}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="flex items-center justify-center h-[calc(100vh-200px)]">
//                 Loading...
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Popup modal */}
//         {isModalOpen && selectedTurf && (
//           <Modal turf={selectedTurf} onClose={closeModal} />
//         )}
//       </div>
//     </>
//   );
// }

// export default VenueHome;










///first one this
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TopBar from "../sidebar/TopBar";
// import PartnerNavbar from "../header/partnerNavbar";
// // import axios from "axios";
// import { UserPort } from "../../../store/port";
// import { useSelector } from "react-redux";
// // import Spinner from '../../spinner'
// import {AxiosPartner} from '../../../api/AxiosInstance'



// function VenueHome() {
//   const navigate = useNavigate();
//   const [turfs, setTurfs] = useState();
//   const [loading, setLoading] = useState(true);

//   const { partnerId } = useSelector((state) => state.partner);
//   console.log(partnerId, ": --------------- partner id ");




//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AxiosPartner.get(`partnerturfview/${partnerId}`,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(response.data.data);
//         setTurfs(response.data.data);
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false); // Set loading to false in case of an error as well
//       }
//     };

//     fetchData();
//   }, []);

  
//   return (
//     <>
 
//       <PartnerNavbar />
//       <TopBar />
//       <div>
//       <div className="flex justify-center mt-10">
//         <button
//           className="bg-white rounded-full shadow-md p-4 cursor-pointer hover:shadow-lg transition flex items-center justify-center"
//           onClick={() => navigate("/partner/addturf")}
//         >
//           <h2 className="font-bold text-2xl text-customBlue">Add Turf</h2>
//         </button>
//       </div>

//       <div className="w-70 py-[3rem] mt-[20px] px-4 bg-white h-[100vh] pb-52">
//       <div className="max-w-[1240px] mx-auto grid sm:grid-cols-3 gap-8">
//         {turfs ? (
//           turfs.map((turf, index) => (
//             <div
//               key={index}
//               className="w-fit h-fit shadow-2xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300 text-center"
//             >
//               <img
//                 onClick={() => navigate(turf._id)}
//                 className="mx-auto bg-customGreen"
//                 src={`${UserPort}images/${turf.images[0]}`}
//                 alt="/"
//                 style={{ width: "400px", height: "200px" }}
//               />
//               <h2 onClick={() => navigate(turf._id)} className="text-2xl font-bold text-center py-2">
//                 {turf?.courtName}
//               </h2>
//               {/* <p className="text-center text-3xl font-bold">
//                 $ {turf?.prices}
//               </p> */}
//               <div className="text-center font-medium">
//                 <p className="border-b mx-6 mt-6">{turf.district}</p>
//                 <p className="border-b mx-6 mt-6">{turf.mobileNumber}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex items-center justify-center h-[calc(100vh-200px)]">
//           Loading...
//         </div>
//         )}
//       </div>
//     </div>

//       </div>
//     </>
//   );
// }

// export default VenueHome;










// {
//   /* <div className='flex flex-wrap justify-center'> */
// }
// {
//   /* <div
//           className='bg-white rounded-lg shadow-md p-4 m-4 cursor-pointer w-64 flex items-center justify-center flex-col hover:bg-gray-100 transition'
//           onClick={() => navigate('/addturf')}
//         >
//           <h2 className='font-bold text-2xl mb-2'>Add Turf</h2>
//           <img
//             src='/path/to/addturf-image.jpg'
//             alt='Add Turf'
//             className='w-24 h-24 object-cover rounded-full'
//           />
//         </div> */
// }

// {
//   /* Fetch Turf in Map Card */
// }
// {
//   /* <div
//           className='bg-white rounded-lg shadow-md p-4 m-4 cursor-pointer w-64 flex items-center justify-center flex-col hover:bg-gray-100 transition'
//           onClick={() => navigate('/fetchturf')}
//         >
//           <h2 className='font-bold text-2xl mb-2'>Fetch Turf in Map</h2>
//           <img
//             src='/path/to/fetchturf-image.jpg'
//             alt='Fetch Turf'
//             className='w-24 h-24 object-cover rounded-full'
//           />
//         </div> */
// }
// // </div>
