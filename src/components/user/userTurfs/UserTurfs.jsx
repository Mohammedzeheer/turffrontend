import TurfCard from "./TurfCard";
import React,{ useEffect, useState ,memo} from "react";
import Pagination from "./Pagination";
import { AxiosUser } from "../../../api/AxiosInstance";
import UserFooter from "../userFooter/UserFooter";
import LoadingFootball from "../../LoadingFootball";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const UserTurfs = memo(() => {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);


  const Fetchdata = async ()=>{
    try {
      const response= await AxiosUser.get(`allturfs`)
        setTurfs(response.data.data);
        setIsLoading(false);
      }
     catch (error) {
          toast.error(error);
        setIsLoading(false);
    }
  }


  useEffect(() => {
    Fetchdata()
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = turfs
    .filter(
      (turf) =>
        turf.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.district.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="min-h-screen pt-[20px]">
      {isLoading ? (
        <div className="mt-[140px] content-center"><LoadingFootball/></div> 
      ) : (
        <React.Fragment>
        <section className="py-16 sm:py-16 text-black">
          <div className="container p-6 mx-auto space-y-8 relative">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Let's Play Together</h2>
              <p className="font-sans text-thin text-black ">
                {/* Select your playspots and book your playtime by a tap... */}
                "Tap to explore playspots and book playtime - fun at your
                fingertips!"
              </p>
            </div>

            <div className="my-4 flex items-center justify-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" border border-gray-300 rounded-md py-2 px-3 w-full md:w-60 lg:w-80"
              />
            </div>

           

            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ">

            {isLoading ? (
              <div className="grid justify-center items-center h-52">
                <span className="animate-spin rounded-full border-t-2 border-b-2 border-indigo-500 h-12 w-12"></span>
              </div>
            ) : (
              currentItems.map((turf) => <TurfCard key={turf._id} {...turf} />)
            )}

              {/* {currentItems.map((turf) => (
                <TurfCard key={turf._id} {...turf} />
              ))} */}
            </div>

            
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={turfs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
        </React.Fragment>
      )}
      </div>
      <UserFooter />
    </>
  );
})

export default UserTurfs;







{
  /* <div className="my-4 flex items-center justify-center">
  <input
    type="text"
    placeholder="Search by location..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="border rounded-md py-2 px-3 w-full md:w-60 lg:w-80 shadow-md focus:outline-none focus:ring focus:border-blue-300"
    style={{
      borderColor: "#A0AEC0",
      borderRadius: "0.375rem",
      fontFamily: "Arial, sans-serif",
      fontSize: "1rem",
      fontWeight: "normal",
      lineHeight: "1.5",
      color: "#2D3748",
      backgroundColor: "#EDF2F7",
    }}
  />
</div> */
}

// useEffect(() => {
//   const fetchTurfs = async () => {
//     try {
//       const response = await Axiosuser.get(`turfs`);
//       setTurfs(response.data.turfs);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchTurfs();
// }, []);

// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Import Axios library

// const UserTurfs = () => {
//   const [allTurfData, setAllTurfData] = useState([]);
//   const [filteredTurfData, setFilteredTurfData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Simulating asynchronous data fetch using Axios (replace with your actual API call)
//   const fetchAllTurfData = async () => {
//     try {
//       const response = await axios.get('your_api_endpoint'); // Replace 'your_api_endpoint' with the actual API endpoint
//       setAllTurfData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching Turf data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllTurfData();
//   }, []);

//   useEffect(() => {
//     // Filter the turf data based on the search query
//     const filteredData = allTurfData.filter((turfData) =>
//       turfData.place.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredTurfData(filteredData);
//   }, [searchQuery, allTurfData]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="px-4 py-8">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search Turf..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//       </div>
//       {filteredTurfData.length === 0 ? (
//         <div>No matching Turf data found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredTurfData.map((turfData) => (
//             <div key={turfData.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img src={turfData.turfPhoto} alt="Turf" className="w-full h-64 object-cover" />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{turfData.place}</h2>
//                 <p className="text-gray-600 mb-4">${turfData.amount}</p>
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserTurfs;
