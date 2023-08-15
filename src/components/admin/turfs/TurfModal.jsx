import React from 'react';

function TurfModal({ open, onClose, user }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        open ? '' : 'hidden'
      }`}
    >
       <div className="bg-black opacity-50 h-full w-full absolute" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-4 z-10 max-w-md">
        <h2 className="text-xl font-bold mb-4">Turf Details</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <p className="text-sm">
            <span className="font-bold">Court Name:</span> {user.courtName}
          </p>
          <p className="text-sm">
            <span className="font-bold">Mobile Number:</span> {user.mobileNumber}
          </p>
          <p className="text-sm">
            <span className="font-bold">State:</span> {user.state}
          </p>
          <p className="text-sm">
            <span className="font-bold">District:</span> {user.district}
          </p>
          <p className="text-sm">
            <span className="font-bold">Description:</span> {user.description}
          </p>
          <p className="text-sm">
            <span className="font-bold">Location:</span> {user.location}
          </p>
          <p className="text-sm">
            <span className="font-bold">Venue Types:</span> {user.venueTypes.join(', ')}
          </p>
          <p className="text-sm">
            <span className="font-bold">Prices:</span>{' '}
            {Object.keys(user.prices).map((venueType) => (
              <span key={venueType}>
                {venueType}: {user.prices[venueType]} |{' '}
              </span>
            ))}
          </p>
        </div>
             <div className="mb-2">
          <span className="font-bold">Images:</span>
         <div className="flex flex-wrap justify-center">
             {user.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-16 h-16 m-1 border border-gray-400 rounded"
              />
            ))}
          </div>
        </div>
        <button
          className="bg-customBlue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TurfModal;




















// import React from 'react';
// import { AdminPort, UserPort, PartnerPort } from "../../../store/port";

// function TurfModal({ open, onClose, user }) {
//   return (
//     <div
//       className={`fixed inset-0 flex items-center justify-center z-50 ${
//         open ? '' : 'hidden'
//       }`}
//     >
//       <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
//       <div className="bg-white rounded-lg p-4 z-10 border border-gray-300">
//         <h2 className="text-lg font-bold mb-2">Turf Details</h2>
//         <p className="mb-1">
//           <span className="font-bold">Court Name:</span> {user.courtName}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">Mobile Number:</span> {user.mobileNumber}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">State:</span> {user.state}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">District:</span> {user.district}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">Description:</span> {user.description}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">Location:</span> {user.location}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">Venue Types:</span> {user.venueTypes.join(', ')}
//         </p>
//         <p className="mb-1">
//           <span className="font-bold">Prices:</span>{' '}
//           {Object.keys(user.prices).map((venueType) => (
//             <span key={venueType}>
//               {venueType}: {user.prices[venueType]} |{' '}
//             </span>
//           ))}
//         </p>
//         <div className="mb-2">
//           <span className="font-bold">Images:</span>
//           <div className="flex flex-wrap">
//             {user.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`${UserPort}images/${image}`}
//                 alt={`Image ${index + 1}`}
//                 className="w-16 h-16 m-1 border border-gray-400 rounded"
//               />
//             ))}
//           </div>
//         </div>
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TurfModal;













// import React from 'react';
// import { AdminPort, UserPort, PartnerPort } from "../../../store/port";

// function TurfModal({ open, onClose, user }) {
//   return (
//     <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? '' : 'hidden'}`}>
//       <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
//       <div className="bg-white rounded-lg p-8 z-10">
//         <h2 className="text-2xl font-bold mb-4">Turf Details</h2>
//         <p className="mb-2">
//           <span className="font-bold">Court Name:</span> {user.courtName}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Mobile Number:</span> {user.mobileNumber}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">State:</span> {user.state}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">District:</span> {user.district}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Description:</span> {user.description}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Location:</span> {user.location}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Venue Types:</span> {user.venueTypes.join(', ')}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Prices:</span>
//           {Object.keys(user.prices).map((venueType) => (
//             <span key={venueType}>
//               {venueType}: {user.prices[venueType]} |{' '}
//             </span>
//           ))}
//         </p>
//         <div className="mb-4">
//           <span className="font-bold">Images:</span>
//           <div className="flex flex-wrap">
//             {user.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`${UserPort}images/${image}`}
//                 alt={`Image ${index + 1}`}
//                 className="w-24 h-24 m-2"
//               />
//             ))}
//           </div>
//         </div>
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TurfModal;


















// import React from 'react';

// function TurfModal({ open, onClose, user }) {
//   return (
//     <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? '' : 'hidden'}`}>
//       <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
//       <div className="bg-white rounded-lg p-8 z-10">
//         <h2 className="text-2xl font-bold mb-4">Turf Details</h2>
//         <p className="mb-2">
//           <span className="font-bold">Name:</span> {user.courtName}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Mobile:</span> {user.mobileNumber}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">District:</span> {user.district}
//         </p>
//         <p className="mb-2">
//           <span className="font-bold">Location:</span> {user.location}
//         </p>
//         {/* Add other turf details as needed */}
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TurfModal;
