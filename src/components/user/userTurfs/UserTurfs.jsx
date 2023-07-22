import TurfCard from "./TurfCard";
import { useEffect, useState } from "react";
import { UserPort } from '../../../store/port';
import axios from 'axios'
import Pagination from "./Pagination";

const UserTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);


  useEffect(() => {
    axios.get(`${UserPort}allturfs`, { withCredentials: true })
      .then((res) => {
        console.log(res, '-------------turf page response------------');
        setTurfs(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = turfs
    .filter((turf) =>
      turf.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
      turf.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      turf.district.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-[20px]">
        <section className="py-16 sm:py-16 bg-gray-100 text-black">
          <div className="container p-6 mx-auto space-y-8 relative">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Let's Play Together</h2>
              <p className="font-serif text-sm text-black ">
                Select your playspots and book your playtime by a tap...
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
              {currentItems.map((turf) => (
                <TurfCard key={turf._id} {...turf} />
              ))}
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={turfs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default UserTurfs;







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
