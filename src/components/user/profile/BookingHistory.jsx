import React, { useEffect, useState } from 'react';
import { AxiosUser } from '../../../api/AxiosInstance';
import { useSelector } from 'react-redux';
import UserNavbar from '../userHeader/UserNavbar';
import { MdCancel } from "react-icons/md";
import RingLoader from "react-spinners/RingLoader";
import UserFooter from "../userFooter/UserFooter";
import Loading from '../../Loading'


const BookingHistory = () => {
  const { userId } = useSelector((state) => state.user);
  const [bookingData, setBookingData] = useState();

  const fetchData = async () => {
    try {
      const response = await AxiosUser.get(`bookings_user/${userId}`);
      console.log(response, '-------------------------response user booking history');
      setBookingData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      console.log(`Cancel booking with ID: ${bookingId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <UserNavbar />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>
      {bookingData && bookingData.length > 0 ? ( 
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookingData &&
          bookingData.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4">
              <img
                src={booking.turf.images[0]}
                alt={booking.turf.courtName}
                className="w-20 h-20 object-cover rounded-full mb-2 mx-auto"
                />
              <p className="text-gray-500 mb-2">Booking ID: {booking._id}</p>
              <p className="font-bold mb-2">{booking.turf.courtName}</p>
              <p className="text-sm mb-2">{booking.turf.location}</p>
              <p className="text-sm mb-2">
                Date:{' '}
                {new Date(booking.bookDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="text-sm mb-2">Time: {booking.time}</p>
              <p className="text-sm mb-2">Slot: {booking.slot}</p>
              <p className="text-sm mb-2">Price: {booking.price}</p>
              <p
                className={`text-${
                  booking.payment === 'Success' ? 'green' : 'red'
                }-500 font-bold mb-2`}
                >
                Payment: {booking.payment}
              </p>
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white"
                >
                Cancel Booking <MdCancel className="w-3 h-3 inline-block mr-1" />
              </button>
            </div>
          ))}
      </div>
      ) : (
        <div class="flex justify-center my-40">
        <Loading/>Loading.....
      </div>
          // <p className="text-lg font-bold">No bookings found.</p>
        )}
    </div>
    <UserFooter/>
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
