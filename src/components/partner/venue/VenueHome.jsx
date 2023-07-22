import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../sidebar/TopBar";
import PartnerNavbar from "../header/partnerNavbar";
import axios from "axios";
import { UserPort, PartnerPort } from "../../../store/port";
import { useSelector } from "react-redux";
import Spinner from '../../spinner'



function VenueHome() {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState();
  const [loading, setLoading] = useState(true);

  const { userId } = useSelector((state) => state.partner);
  console.log(userId, ": --------------- partner id ");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${PartnerPort}partnerturfview/${userId}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log(response.data.data);
  //       setTurfs(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // },[]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${PartnerPort}partnerturfview/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setTurfs(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error as well
      }
    };

    fetchData();
  }, []);

  
  return (
    <>
 
      <PartnerNavbar />
      <TopBar />
      <div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-white rounded-full shadow-md p-4 cursor-pointer hover:shadow-lg transition flex items-center justify-center"
          onClick={() => navigate("/addturf")}
        >
          <h2 className="font-bold text-2xl text-customBlue">Add Turf</h2>
        </button>
      </div>

      <div className="w-70 py-[3rem] mt-[20px] px-4 bg-white h-[100vh]  pb-52">
        <div className="max-w-[1240px] mx-auto grid sm:grid-cols-3 gap-8 ">
          {turfs?.map((turf, index) => {
            return (
              <div className="w-fit h-fit shadow-2xl flex flex-col p-4  rounded-lg hover:scale-105 duration-300 text-center">
                <img
                  onClick={() => navigate(turf._id)}
                  className="mx-auto  bg-customGreen"
                  src={`${UserPort}images/${turf.images[0]}`}
                  alt="/"
                  style={{ width: "400px", height: "200px" }}
                />
                <h2
                  onClick={() => navigate(turf._id)}
                  className="text-2xl font-bold text-center py-2"
                >
                  {turf?.courtName}
                </h2>
                {/* <p className="text-center text-3xl font-bold">
                    $ {turf?.prices}
                  </p> */}
                <div className="text-center font-medium">
                  <p className=" border-b mx-6 mt-6">{turf.district}</p>
                  <p className=" border-b mx-6 mt-6">{turf.mobileNumber}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
}

export default VenueHome;

{
  /* <div className='flex flex-wrap justify-center'> */
}
{
  /* <div
          className='bg-white rounded-lg shadow-md p-4 m-4 cursor-pointer w-64 flex items-center justify-center flex-col hover:bg-gray-100 transition'
          onClick={() => navigate('/addturf')}
        >
          <h2 className='font-bold text-2xl mb-2'>Add Turf</h2>
          <img
            src='/path/to/addturf-image.jpg'
            alt='Add Turf'
            className='w-24 h-24 object-cover rounded-full'
          />
        </div> */
}

{
  /* Fetch Turf in Map Card */
}
{
  /* <div
          className='bg-white rounded-lg shadow-md p-4 m-4 cursor-pointer w-64 flex items-center justify-center flex-col hover:bg-gray-100 transition'
          onClick={() => navigate('/fetchturf')}
        >
          <h2 className='font-bold text-2xl mb-2'>Fetch Turf in Map</h2>
          <img
            src='/path/to/fetchturf-image.jpg'
            alt='Fetch Turf'
            className='w-24 h-24 object-cover rounded-full'
          />
        </div> */
}
// </div>
