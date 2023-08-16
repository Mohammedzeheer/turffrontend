import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import {AxiosAdmin} from '../../../api/AxiosInstance'
import {toast} from 'react-toastify' 

function AdminDashboard() {
  const token=localStorage.getItem('admin')
  const [data,setData]=useState([])
  const [dailyRevenue,setDailyRevenue]=useState({})


  const headers = { authorization: token }
  const fetchData=async()=>{
    try {
       const response= await AxiosAdmin.get(`allCounts`,{headers})
       console.log(response,'------------------------------')  
       setData(response.data)
       setDailyRevenue(response.data.dailyRevenue)
       console.log(response.data.dailyRevenue,'------------------------------') 
    } catch (error) {
      toast.error(error);
    }
      
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (  
    <>
      <div>
        <div className="m-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <div>
                  <p className="mb-2 text-gray-500">Total Revenue</p>
                  <div className="flex items-center">
                    <h5 className="mb-0 font-bold text-2xl">{data.TotalRevenue}</h5>
                    {/* <p className="mb-0 ml-3 text-green-500 font-bold">+3.55%</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <div>
                  <p className="mb-2 text-gray-500">Total Bookings</p>
                  <div className="flex items-center">
                    <h5 className="mb-0 font-bold text-2xl">{data.BookingCount}</h5>
                    {/* <p className="mb-0 ml-3 text-green-500 font-bold">+2.67%</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <div>
                  <p className="mb-2 text-gray-500">Users</p>
                  <div className="flex items-center">
                    <h5 className="mb-0 font-bold text-2xl">{data.UserCounts}</h5>
                    {/* <p className="mb-0 ml-3 text-red-500 font-bold">-9.98%</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <div>
                  <p className="mb-2 text-gray-500">Partners</p>
                  <div className="flex items-center">
                    <h5 className="mb-0 font-bold text-2xl">{data.PartnerCounts}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4 mt-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <BarChart 
          dailyRevenue={dailyRevenue} 
          />
          <PieChart 
          totaluser={data.UserCounts}
          totalpartner={data.PartnerCounts} 
          totalbookings={data.BookingCount}
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
