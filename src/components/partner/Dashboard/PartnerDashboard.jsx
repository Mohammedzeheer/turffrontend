import { useEffect, useState } from "react";
// import { AxiosTurfOwner } from "../../../API/AxiosInstance";
import Barchart from "./BarChart";
import CountStatus from "./Counts";
import { useNavigate } from "react-router-dom";
import PartnerSidebar from "../sidebar/PartnerSidebar";
import PartnerNavbar2 from "../header/PartnerNavbar2";
import TopBar from "../sidebar/TopBar";
import TopBar2 from "../sidebar/TopBar2";
import PartnerNavbar from "../header/partnerNavbar";


const PartnerDashboard = () => {
    // const token = localStorage.getItem('turfToken');
    const [data, setData] = useState([]);
    const [counts, setCounts] = useState("");
    const Navigate=useNavigate()
    
    // const fetchData = async () => {
    //   try {
    //     const headers = { authorization: token }
    //     const response = await AxiosTurfOwner.get(`getCounts`, {headers});
    //     if (response.status === 200) {
    //       setCounts(response.data); 
    //       setData(response.data.dayWiseBookings)
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // useEffect(() => {
    //   fetchData();
    // }, []);
 
   
  return (
    <div>
     {/* <PartnerNavbar2 /> */}
     <PartnerNavbar />


     <TopBar/>
     <TopBar2/>
     
    </div>
  );
};
export default PartnerDashboard;


