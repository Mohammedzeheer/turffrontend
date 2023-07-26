import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
// import axios from "axios";
import { UserPort } from "../../../store/port";
import "react-calendar/dist/Calendar.css";
import Booking from "./Components/Booking";
import ImageManage from "./Components/ImageManage";
import ReviewModal from "./Components/Review";
import CardReview from "./Components/CardReview";
import UserNavbar from "../userHeader/UserNavbar";
import {AxiosUser} from '../../../api/AxiosInstance'
import { toast } from "react-toastify";


export default function UserTurfDetails() {
  const token = localStorage.getItem("user");
  const Location = useLocation();
  const ID = Location.state;
  const [data, setData] = useState({});
  const [showCalender, setShowCalender] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let [selectedPrice,setSelectedPrice] = useState()
  const [isLogin, setLogin] = useState(false);



  const fetchTurf = async () => {
    try {
      console.log(ID, "id");
      const response = await AxiosUser.get(`viewTurf/${ID}`);
      console.log(response, "response of detail page");
      setData(response.data.turf);
    } catch (error) {
      console.error(error);
    }
  };

  const { "5s": price5s, "7s": price7s } = data.prices || {};

  useEffect(() => {
    fetchTurf();
  }, []);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <UserNavbar />
      <section className="text-gray-600 body-font">
        {showCalender ? (
          <Booking        
            closingTime={data.closingTime}
            openingTime={data.openingTime}
            ID={data._id}
            price ={selectedPrice}
            setShowCalender={setShowCalender}
          />
        ) : (
          <>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-5 py-10">
              <div className="mb-10 md:mb-0 flex justify-center">
                {/* <ImageManage photos={data?.images} className="w-full h-auto" /> */}
                {/* <ImageManage photos={`${UserPort}images/${data.images}`} className="w-full h-auto" /> */}

                <ImageManage
                  photos={
                    data?.images?.map(
                      (image) => `${UserPort}images/${image}`
                    ) || []
                  }
                  // className="w-full h-auto"
                  style={{ width: "40px", height: "300px" }}
                />
              </div>
              <div className="md:w-1/2 md:pl-10">
                <h1 className="text-3xl flex justify-center items-center sm:text-4xl font-medium text-customGreen mt-10  mb-4">
                  <span className="font-bold">{data?.courtName}</span>
                </h1>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.description}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.mobileNumber}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.location}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.district}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.state}
                </span>
                <div className="flex justify-center items-center mb-4">
                  <span className="text-yellow-500 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 fill-current"
                    >
                      <path d="M499.267,198.052c-2.944-9.024-11.008-15.04-20.544-15.04H327.523L277.931,54.308C273.707,43.876,264.611,37,255.491,37    s-18.213,6.876-22.443,17.308L184.479,183.012H32.277c-9.536,0-17.6,6.016-20.544,15.04c-2.944,9.024-0.64,18.816,6.912,25.472    l122.88,122.88L87.043,457.348c-2.368,7.424-1.536,15.36,2.368,22.016c3.904,6.656,10.56,10.624,17.856,10.624    c2.688,0,5.376-0.48,7.936-1.472l143.808-60.48l143.808,60.48c4.352,1.824,8.96,2.752,13.504,2.752c7.68,0,15.36-2.944,21.184-8.832    c3.904-6.656,4.736-14.592,2.368-22.016l-38.912-122.88l122.88-122.88C499.907,216.868,502.211,207.076,499.267,198.052z" />
                    </svg>
                  </span>
                  <span className="text-gray-600 font-bold">
                    {Math.round((data?.rating * 100) / 100)}
                  </span>
                  <span className="text-gray-600 mx-2"> </span>
                  <span className="text-gray-600"></span>
                </div>

                {/* <h3 className="text-2xl font-semibold flex justify-center items-center p-2">
                  ₹{data?.price}
                </h3> */}

                {/* <h3 className="text-2xl font-semibold flex justify-center items-center p-2">
                 5 v 5  ₹{price5s}
                </h3>

                <h3 className="text-2xl font-semibold flex justify-center items-center p-2">
                 7 v 7  ₹{price7s}
                </h3> */}

                {/* <h3 className="text-2xl font-semibold flex justify-center items-center p-2">
                  <input
                    type="checkbox"
                    checked={selectedPrice === price5s}
                    onChange={() => setSelectedPrice(price5s)}
                  />
                 <span className="text-base mr-3 ml-1">5 v 5</span>  ₹ {price5s}
                </h3>

                <h3 className="text-2xl font-semibold flex justify-center items-center p-2">
                  <input
                    type="checkbox"
                    checked={selectedPrice === price7s}
                    onChange={() => setSelectedPrice(price7s)}
                  />
                   <span className="text-base mr-3 ml-1">7 v 7</span> ₹ {price7s}
                </h3> */}


<h3 className={`text-2xl font-semibold flex justify-center items-center `}>
      <input
        type="checkbox"
        checked={selectedPrice === price5s}
        onChange={() => setSelectedPrice(price5s)}
      />
      <span className="text-base mr-3 ml-1">5 v 5</span><span className={`${selectedPrice === price5s ? 'bg-customGreen text-white' : 'bg-text-white'} px-2 py-2 rounded-md`}>₹ {price5s}</span> 
    </h3>

    <h3 className={`text-2xl font-semibold flex justify-center items-center`}>
      <input
        type="checkbox"
        checked={selectedPrice === price7s}
        onChange={() => setSelectedPrice(price7s)}
      />
      <span className="text-base mr-3 ml-1">7 v 7</span> <span className={`${selectedPrice === price7s ? 'bg-customGreen text-white' : 'bg-text-white'} px-2 py-2 rounded-md`}>₹ {price7s}</span> 
    </h3>


                <div className="flex justify-center items-center mb-4 mt-4">
                  <button
                    className="px-6 py-2 text-lg font-bold rounded-md text-white bg-indigo-500 hover:bg-indigo-600 border-none focus:outline-none"
                    // onClick={() => setShowCalender(true)}
                    onClick={() => {
                      if (!selectedPrice) {
                        // toast.error("Please select a slots before booking.");
                        toast.error("Please select a slot before booking.", {
                          position: "top-center",
                          // autoClose: 2000,
                        });
                      } else {
                        setShowCalender(true);
                      }
                    }}
                  
                  >
                    Book Now
                  </button>
                  {token && (
                    <button
                      className="px-6 py-2 text-lg font-bold rounded-md text-white bg-gray-500 hover:bg-gray-600 border-none focus:outline-none ml-4"
                      onClick={toggleModal}
                    >
                      Add Review
                    </button>
                  )}

                </div>
             
              </div>
            </div>
          </>
        )}
      </section>
      <ReviewModal
        isOpen={modalIsOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        toggle={toggleModal}
        id={ID}
      />
      {/* <CardReview refresh={refresh} id={ID} /> */}
      {!showCalender && <CardReview refresh={refresh} id={ID} />}
    </>
  );
}















// import React from 'react';
// import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation
// import UserTurfs from '../userTurfs/UserTurfs'
// import UserNavbar from '../userHeader/UserNavbar'

// const UserTurfDetail = () => {
//   const { turfId } = useParams(); // Accessing the turfId from the URL

//   // Sample data for demonstration (replace with your actual data)
//   const turfs = [
//     {
//       id: 1,
//       name: 'Turf 1',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       location: 'City, State',
//       photos: [
//         '/path/to/image1.jpg',
//         '/path/to/image2.jpg',
//         '/path/to/image3.jpg',
//       ],
//     },
//     // Add more turf objects as needed
//   ];

//   // Find the turf with the matching ID
//   const selectedTurf = turfs.find((turf) => turf.id === parseInt(turfId));

//   // If the selectedTurf is not found, you can handle it accordingly, e.g., show a "Turf not found" message or redirect back to the turf listing page.

//   return (
//     <>
//     <UserNavbar/>
//      <UserTurfs/>
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="bg-gray-200 bg-opacity-50 px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               {selectedTurf.name}
//             </h3>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               {selectedTurf.location}
//             </p>
//           </div>
//           <div className="border-t border-gray-200">
//             <dl>
//               <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Description</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {selectedTurf.description}
//                 </dd>
//               </div>
//               {/* Add more turf details here, like price, facilities, etc. */}
//             </dl>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//               {selectedTurf.photos.map((photo) => (
//                 <div key={photo} className="rounded-lg overflow-hidden">
//                   <img
//                     src={photo}
//                     alt="Turf"
//                     className="w-full h-32 object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default UserTurfDetail;
