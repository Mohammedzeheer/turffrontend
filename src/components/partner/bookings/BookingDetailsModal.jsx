// BookingDetailsModal.js
import React from 'react';
import './booking.css'

const BookingDetailsModal = ({ booking, onClose, isOpen }) => {
  if (!booking || !isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 h-full w-full absolute" onClick={onClose}></div>

      <div className="modal-content relative p-4 m-10 bg-white rounded-lg shadow-lg max-w-md">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>




        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Booking Information</h2>
          {booking.cancelBooking && (
            <p className="text-red-500 font-bold">Status: Booking canceled</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm">
              <strong>Book Date:</strong> {new Date(booking?.bookDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm">
              <strong>Cancel Booking:</strong> {booking?.cancelBooking.toString()}
            </p>
            <p className="text-sm">
              <strong>Payment:</strong> {booking?.payment}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <strong>Slot:</strong> {booking?.slot}
            </p>
            <p className="text-sm">
              <strong>Price:</strong> {booking?.price}
            </p>
            <p className="text-sm">
              <strong>Time:</strong> {booking?.time}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Turf Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <strong>Court Name:</strong> {booking?.turf.courtName}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {booking?.turf.location}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <strong>State:</strong> {booking?.turf.state}
              </p>
              <p className="text-sm">
                <strong>District:</strong> {booking?.turf.district}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <strong>Name:</strong> {booking?.user.username}
              </p>
              <p className="text-sm">
                <strong>Mobile Number:</strong> {booking?.user.phonenumber}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <strong>Email:</strong> {booking?.user.email}
              </p>
              <p className="text-sm">
                <strong>Address:</strong> {booking?.user.address}
              </p>
            </div>
          </div>
        </div>

        {/* <button
          className="block mx-auto bg-customBlue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          onClick={onClose}
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default BookingDetailsModal;







// // BookingDetailsModal.js
// import React from 'react';

// const BookingDetailsModal = ({booking, onClose,isOpen}) => {
//   if (!booking) return null;

//   return (
//     <>
//         <div
//         className={`fixed inset-0 flex items-center justify-center z-50 ${
//           isOpen ? "" : "hidden"
//         }`}
//       >

//       <div
//           className="bg-black  opacity-50 h-full w-full absolute"
//           onClick={onClose}
//         ></div>
//       <div className="modal-content p-4 m-10 bg-white rounded-lg shadow-lg max-w-md">
//       {/* <div className="modal-content p-4 bg-white rounded-lg shadow-lg max-w-md transform -translate-x-1/2 -translate-y-1/2"> */}
      
//         <h2 className="text-xl font-bold mb-4">Booking Information</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             {/* <p className="text-sm mb-2">
//               <strong>Book Date:</strong> {booking.bookDate}
//             </p> */}

//             <p className="text-sm mb-2">
//               <strong>Book Date:</strong>{" "}
//               {new Date(booking?.bookDate).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
            
//             <p className="text-sm mb-2">
//               <strong>Cancel Booking:</strong>{" "}
//               {booking?.cancelBooking.toString()}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>Payment:</strong> {booking?.payment}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm mb-2">
//               <strong>Slot:</strong> {booking?.slot}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>Price:</strong> {booking?.price}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>Time:</strong> {booking?.time}
//             </p>
//           </div>

//           <div>
//           {booking.cancelBooking && 
//                     <p className="text-red-500 font-bold">
//                       Status: booking canceled
//                     </p>}        
//           </div>

//         </div>

//         <h2 className="text-xl font-bold mb-4 mt-8">Turf Information</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm mb-2">
//               <strong>Court Name:</strong> {booking?.turf.courtName}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>Location:</strong> {booking?.turf.location}
//             </p>
//           </div>
//           <div>
//           <p className="text-sm mb-2">
//               <strong>State:</strong> {booking?.turf.state}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>District:</strong> {booking?.turf.district}
//             </p>
//           </div>
//         </div>

//         <h2 className="text-xl font-bold mb-4 mt-8">User Information</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm mb-2">
//               <strong>Name:</strong> {booking?.user.username}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>Mobile Number:</strong> {booking?.user.phonenumber}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm mb-2">
//               <strong>Email:</strong> {booking?.user.email}
//             </p>
//             <p className="text-sm mb-2">
//               <strong>Address:</strong> {booking?.user.address}
//             </p>
//           </div>
//         </div>

//         <button
//           className="mt-8 bg-customBlue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
//           onClick={onClose}
//         >
//           Close
//         </button>

        

//       </div>
//     </div>
//     </>
//   );
// };

// export default BookingDetailsModal;
