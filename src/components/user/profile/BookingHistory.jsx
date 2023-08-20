import React, { useEffect, useState } from "react";
import { AxiosUser } from "../../../api/AxiosInstance";
import UserNavbar from "../userHeader/UserNavbar";
import { MdCancel } from "react-icons/md";
import UserFooter from "../userFooter/UserFooter";
import { TfiWrite } from "react-icons/tfi";
import ReviewModal from "../userTurfDetail/Components/Review";
import CancelBookingModal from "./CancelBookingModal"; 
import LoadingFootball from "../../LoadingFootball";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const BookingHistory = () => {
  const usertoken=localStorage.getItem('user')
  const [bookingData, setBookingData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedTurfId, setSelectedTurfId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isLoading,setIsLoading]=useState(true)


  const headers = { authorization: usertoken }

  const fetchData = async () => {
    try {
      const response = await AxiosUser.get(`bookings_user`,{headers});
      setBookingData(response.data);
      setIsLoading(false)
    } catch (error) {
      toast.error(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = (turfId) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedTurfId(turfId); // Set the selected turf ID when opening the review modal
  };


  const toggleCancelModal = (BookingId) => {
    setCancelModalIsOpen(!cancelModalIsOpen);
    setSelectedBookingId(BookingId); // Set the selected turf ID when opening the cancel booking modal
  };

 

  // const handleCancelBooking = async (bookingId) => {
  //   try {
  //     const response = await AxiosUser.post(`cancelbooking/${bookingId}`);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const isFutureBooking = (bookingDate) => {
    const currentDate = new Date();
    return new Date(bookingDate) > currentDate;
  };

  // const isFutureBooking1 = (bookingDate) => {
  //   const currentDate = new Date();
  //   const futureDate = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000); 
  //   return new Date(bookingDate) > futureDate;
  // };

  const isBookingTimePassed = (bookingDate) => {
    const currentDate = new Date();
    return new Date(bookingDate) < currentDate;
  };

  return (
    <>
      <UserNavbar />
      {/* <div className="p-4 md:mb-[10rem] "> */}
      <div className="min-h-screen  p-4 ">
      {isLoading ? (
        <div className="my-[200px] sm:my-[170px] content-center"><LoadingFootball/></div> 
      ) : (
        <React.Fragment>
        <h1 className="text-2xl font-bold mb-4">Booking History</h1>
        {bookingData && bookingData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookingData &&
              bookingData.map((booking) => (
                <div key={booking._id} className="border rounded-lg p-4">
                  <div className="flex justify-center space-x-4">
                    {booking.turf.images[0] && (
                      <img
                        src={booking.turf.images[0]}
                        alt={booking.turf.courtName}
                        className="w-20 h-20 object-cover mb-2"
                      />
                    )}
                    {booking.turf.images[1] && (
                      <img
                        src={booking.turf.images[1]}
                        alt={booking.turf.courtName}
                        className="w-20 h-20 object-cover mb-2"
                      />
                    )}
                    {booking.turf.images[2] && (
                      <img
                        src={booking.turf.images[2]}
                        alt={booking.turf.courtName}
                        className="w-20 h-20 object-cover mb-2"
                      />
                    )}
                   
                  </div>
                  <p className="text-gray-500 mb-2">
                    Booking ID: {booking._id}
                  </p>
                 
                  <p className="font-bold mb-2">{booking.turf.courtName}</p>
                  <p className="text-sm mb-2">{booking.turf.location}</p>
                  <p className="text-sm mb-2">
                    Date:{" "}
                    {new Date(booking.bookDate).toLocaleDateString("en-US", {weekday: "short", month: "short",day: "numeric",year: "numeric",
                    })}
                  </p>
                  <p className="text-sm mb-2">Time: {booking.time}</p>
                  <p className="text-sm mb-2">Slot: {booking.slot}</p>
                  <p className="text-sm mb-2">Price: {booking.price}</p>
                  <p
                    className={`text-${
                      booking.payment === "Success" ? "green" : "red"
                    }-500 font-bold mb-2`}
                  >
                    Payment: {booking.payment}
                  </p>

                  {/* <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white"
                  >
                    Cancel Booking{" "}
                    <MdCancel className="w-4 h-4 inline-block mr-1" />
                  </button> */}

            

{isFutureBooking(booking.bookDate) && !booking.cancelBooking ? (
        <button
          onClick={() => toggleCancelModal(booking._id)}
          className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white"
        >
          Cancel Booking <MdCancel className="w-4 h-4 inline-block mr-1" />
        </button>
      ) : (
        ""
      )}

                  {/* <button
                    onClick={() => toggleModal(booking.turf._id)} // Pass the turf ID to the toggleModal function
                    className="m-1 text-sm text-grey-500 border border-gray-500 px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white"
                  >
                    <TfiWrite className="w-4 h-4 inline-block mr-1" /> Add
                    Review
                  </button> */}

                  {/*  {booking.cancelBooking ? (
                    <p className="text-red-500 font-bold mb-2">Status: booking canceled</p>
                  ) : (
                    <button
                      onClick={() => toggleModal(booking.turf._id)}
                      className="m-1 text-sm text-grey-500 border border-gray-500 px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white"
                    >
                      <TfiWrite className="w-4 h-4 inline-block mr-1" /> Add
                      Review
                    </button>
                  )} */}

                  {booking.cancelBooking ? (
                    <p className="text-red-500 font-bold mb-2">
                      Status: booking canceled
                    </p>
                  ) : isBookingTimePassed(booking.bookDate) ? (
                    <button
                      onClick={() => toggleModal(booking.turf._id)}
                      className="m-1 text-sm text-grey-500 border border-gray-500 px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white"
                    >
                      <TfiWrite className="w-4 h-4 inline-block mr-1" /> Add
                      Review
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center my-[200px] sm:my-50">         
            No Booking Found .......
          </div>
        )}
         </React.Fragment>
      )}
      </div>
      <ReviewModal
        isOpen={modalIsOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        toggle={toggleModal}
        turfId={selectedTurfId} // Pass the selected turf ID to the ReviewModal
      />

      <CancelBookingModal
        isOpen={cancelModalIsOpen}
        bookingId={selectedBookingId}
        toggle={() => toggleCancelModal(null)}
        // onCancelBooking={handleCancelBooking}
      />

      <UserFooter />
    </>
  );
};

export default BookingHistory;






















//   return (
//     <>
//       <UserNavbar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Booking History</h1>
//         <div className="space-y-4">
//           {bookingData &&
//             bookingData.map((booking) => (
//               <div key={booking._id} className="border rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <img
//                     src={booking.turf.images[0]} // Replace 'imageUrl' with the key for the image URL in your booking data
//                     alt={booking.turf.courtName}
//                     className="w-20 h-20 object-cover rounded-full mr-4"
//                   />
//                   <div className="flex-1">
//                     <p className="text-gray-500">Booking ID: {booking._id}</p>
//                     <p className="font-bold">{booking.turf.courtName}</p>
//                     <p>{booking.turf.location}</p>
//                     <p>
//                       Date:{' '}
//                       {new Date(booking.bookDate).toLocaleDateString('en-US', {
//                         weekday: 'short',
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric',
//                       })}
//                     </p>
//                     <p>Time: {booking.time}</p>
//                     <p>price: {booking.price}</p>
//                     <p
//                       className={`text-${
//                         booking.payment === 'Success' ? 'green' : 'red'
//                       }-500 font-bold`}
//                     >
//                       Payment: {booking.payment}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleCancelBooking(booking._id)}
//                     className="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
//                   >
//                     Cancel Booking  <MdCancel className="w-4 h-4 inline-block mr-1"/>
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// // src/components/BookingHistory.js
// import React, { useEffect, useState } from 'react';
// import { AxiosUser } from '../../../api/AxiosInstance';
// import { useSelector } from 'react-redux';
// import UserNavbar from "../userHeader/UserNavbar";

// const BookingHistory = () => {

// const {userId}=useSelector((state)=>state.user)
// const [bookingData,setBookingData]=useState()

// const fetchData = async()=>{
//    try {
//     const response=await AxiosUser.get(`bookings_user/${userId}`)
//     console.log(response,'-------------------------response user booking history')
//     setBookingData(response.data)
//    } catch (error) {
//     console.log(error)
//    }
// }

// useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <UserNavbar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Booking History</h1>
//         <div className="space-y-4">
//           {bookingData &&
//             bookingData.map((booking) => (
//               <div key={booking.id} className="border rounded-lg p-4">
//                 <p className="text-gray-500">Booking ID: {booking.id}</p>
//                 <p className="font-bold">{booking.turf.courtName}</p>
//                 <p>{booking.location}</p>
//                 <p>
//                   Date:{" "}
//                   {new Date(booking.bookDate).toLocaleDateString("en-US", {
//                     weekday: "short",
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p>Time: {booking.time}</p>
//                 <p>Number of Players: {booking.numberOfPlayers}</p>
//                 <p
//                   className={`text-${
//                     booking.payment === "Success" ? "green" : "red"
//                   }-500 font-bold`}
//                 >
//                   Payment: {booking.payment}
//                 </p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingHistory;
