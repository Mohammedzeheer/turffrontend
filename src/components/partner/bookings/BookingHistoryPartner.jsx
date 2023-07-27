// // src/components/BookingHistory.js
// import React, { useEffect, useState } from 'react';
// import { AxiosUser } from '../../../api/AxiosInstance';
// import { useSelector } from 'react-redux';


// const BookingHistoryPartner = () => {

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


//   const bookingHistory = [
//     {
//       id: 'TB123456',
//       turfName: 'Greenfield Sports Club',
//       location: '123 Main Street, Cityville',
//       date: '2023-07-15',
//       time: '10:00 AM - 12:00 PM',
//       numberOfPlayers: 8,
//       status: 'Completed',
//     },
//     {
//       id: 'TB789012',
//       turfName: 'All-Star Sports Arena',
//       location: '456 Oak Avenue, Townsville',
//       date: '2023-07-20',
//       time: '3:00 PM - 5:00 PM',
//       numberOfPlayers: 10,
//       status: 'Cancelled',
//     },
//     // Add more booking history data here
//   ];

//   return (
//     <>
//     <UserNavbar/>
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Booking History</h1>
//       <div className="space-y-4">
//         {bookingData && bookingData.map((booking) => (
//           <div key={booking.id} className="border rounded-lg p-4">
//             <p className="text-gray-500">Booking ID: {booking.id}</p>
//             <p className="font-bold">{booking.turfName}</p>
//             <p>{booking.location}</p>
//             <p>Date: {booking.bookDate}</p>
//             <p>Time: {booking.time}</p>
//             <p>Number of Players: {booking.numberOfPlayers}</p>
//             <p className={`text-${booking.status === 'Completed' ? 'green' : 'red'}-500 font-bold`}>
//               Status: {booking.status}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default BookingHistoryPartner;