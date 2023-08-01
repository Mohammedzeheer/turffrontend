import React, { useEffect, useState } from "react";
import { UserPort } from "../../../store/port";
import { AxiosPartner } from "../../../api/AxiosInstance";
import TopBar from "../sidebar/TopBar";
import PartnerNavbar from "../header/partnerNavbar";
import { useParams, useNavigate } from "react-router-dom";
import Loading from '../Loading'


function VenueDetail() {
  const { turfId } = useParams();
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosPartner.get(`turfDetailview/${turfId}`, {
          withCredentials: true,
        });
        setSelectedTurf(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [turfId]);


  const handleEditClick = () => {
    // Replace the path with the appropriate route for editing the venue details
    navigate(`/edit-venue/${turfId}`);
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) {
   
    return <div> <span className="mr-1"><Loading/></span> Loading...</div>;
  
  }

  if (!selectedTurf) {
    return <div>No turf found with the specified ID.</div>;
  }

  if (!selectedTurf.images || !Array.isArray(selectedTurf.images)) {
    return <div>No photos available for this turf.</div>;
  }

  const pricesArray = Object.values(selectedTurf.prices);

  return (
    <>
    <PartnerNavbar />
    <TopBar />
    <div className="container mx-auto p-4">
      <div className="rounded-lg shadow-lg bg-white p-4 md:p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">{selectedTurf.courtName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {selectedTurf.images.slice(0, 4).map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md">
              <img
                src={image}
                alt={selectedTurf.courtName}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
        <div className="text-center mb-4">
          <p className="text-xl font-semibold">District: {selectedTurf.district}</p>
          <p>Mobile Number: {selectedTurf.mobileNumber}</p>
          <p>State: {selectedTurf.state}</p>
          <p>Description: {selectedTurf.description}</p>
          <p>Location: {selectedTurf.location}</p>
          <p>Venue Types: {selectedTurf.venueTypes.join(", ")}</p>
          <p>Prices: {pricesArray.join(", ")}</p>
          <p>Is Approved: {selectedTurf.isApprove ? "Yes" : "No"}</p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  </>
);
}


export default VenueDetail;







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
