import React from "react";
import { UserPort } from "../../../store/port";
import ImageGallery from "react-image-gallery";
import './modal.css'

function VenueDetailModal({ turf, onClose }) {
  const images = turf.images.map((image) => ({
    original: `${UserPort}images/${image}`,
    thumbnail: `${UserPort}images/${image}`,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold text-center mt-4">{turf.courtName}</h2>
        <p className="text-center font-medium mt-2">District: {turf.district}</p>
        <p className="text-center font-medium mt-2">Mobile Number: {turf.mobileNumber}</p>
        {/* Add other turf details here as needed */}

        {/* Close button */}
        <button
          className="mt-4 bg-customBlue text-white py-2 px-4 rounded-md w-full"
          onClick={onClose}
        >
          Close
        </button>
        
        {images.length > 0 ? (
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            slideDuration={100}
            renderItem={(item) => (
              <div className="image-gallery-image">
                <img
                  src={item.original}
                  alt={turf.courtName}
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>
            )}
          />
        ) : (
          <p className="text-center text-red-500 mt-4">No photos available for this turf.</p>
        )}
      </div>
    </div>
  );
}

export default VenueDetailModal;





// import React from "react";
// import { UserPort } from "../../../store/port";

// function VenueDetailModal({ turf, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md">
//         <img
//           src={`${UserPort}images/${turf.images[0]}`}
//           alt="/"
//           style={{ width: "100%", height: "auto" }}
//         />
//         <h2 className="text-2xl font-bold text-center mt-4">{turf.courtName}</h2>
//         <p className="text-center font-medium mt-2">District: {turf.district}</p>
//         <p className="text-center font-medium mt-2">Mobile Number: {turf.mobileNumber}</p>
//         {/* Add other turf details here as needed */}

//         {/* Close button */}
//         <button
//           className="mt-4 bg-customBlue text-white py-2 px-4 rounded-md w-full"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VenueDetailModal;
