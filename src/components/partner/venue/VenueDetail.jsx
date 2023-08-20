import React, { useEffect, useState } from "react";
import { AxiosPartner } from "../../../api/AxiosInstance";
import TopBar from "../sidebar/TopBar";
import PartnerNavbar from "../header/partnerNavbar";
import { useParams, useNavigate } from "react-router-dom";
import LoadingFootball from "../../LoadingFootball";
// import Loading from '../Loading'


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


  // const handleEditClick = () => {
  //   navigate(`/edit-venue/${turfId}`);
  // };

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) {
    <div className="my-[200px] content-center"><LoadingFootball/></div> 
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
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleEditClick}
          >
            Edit
          </button> */}
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