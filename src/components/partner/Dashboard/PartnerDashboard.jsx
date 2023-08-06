import { useEffect, useState } from "react";
import Barchart from "./BarChart";
import CountStatus from "./Counts";
import { useNavigate } from "react-router-dom";
import TopBar from "../sidebar/TopBar";
import TopBar2 from "../sidebar/TopBar2";
import PartnerNavbar from "../header/partnerNavbar";
import { AxiosPartner } from "../../../api/AxiosInstance";


const PartnerDashboard = () => {
    const token = localStorage.getItem('partner');
    const [data, setData] = useState([]);
    const [counts, setCounts] = useState("");
   
    const Navigate=useNavigate()
    
    // !token ? Navigate('/partner/login') : ''

    
    const fetchData = async () => {
      try {
        const headers = { authorization: token }
        const response = await AxiosPartner.get(`getCounts`, {headers});
        if (response.status === 200) {
          setCounts(response.data); 
          setData(response.data.dayWiseBookings)
          console.log(response.data.dayWiseBookings)
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
 

    const blockedUser = "50";
   
  return (
    <div>
     <PartnerNavbar />
     <TopBar/>
     <TopBar2/>
     <div className="m-5">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center px-5">
            <div>
              <p className="mb-2 text-gray-500">Total Revenue</p>
              <div className="flex items-center">
                <h5 className="mb-0 font-bold text-2xl">{counts.TotalRevenue}</h5>
                {/* <p className="mb-0 ml-3 text-green-500 font-bold">+3.55%</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center px-5">
            <div>
              <p className="mb-2 text-gray-500">Total Bookings</p>
              <div className="flex items-center">
                <h5 className="mb-0 font-bold text-2xl">{counts.bookingCount}</h5>
                {/* <p className="mb-0 ml-3 text-green-500 font-bold">+2.67%</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center px-5">
            <div>
              <p className="mb-2 text-gray-500">Users</p>
              <div className="flex items-center">
                <h5 className="mb-0 font-bold text-2xl">{counts.userCount}</h5>
                {/* <p className="mb-0 ml-3 text-red-500 font-bold">-9.98%</p> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center">
            <div>
              <p className="mb-2 text-gray-500">Blocked User</p>
              <div className="flex items-center">
                <h5 className="mb-0 font-bold text-2xl">{blockedUser}</h5>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>


      <div className="flex justify-between ">
        <Barchart  data={data}  />
        {/* <LineGraph data={data} /> */}   
      </div>



    </div>




  );
};
export default PartnerDashboard;





