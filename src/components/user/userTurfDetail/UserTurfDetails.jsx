import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "react-calendar/dist/Calendar.css";
import Booking from "./Components/Booking";
import ImageManage from "./Components/ImageManage";
import CardReview from "./Components/CardReview";
import UserNavbar from "../userHeader/UserNavbar";
import { AxiosUser } from "../../../api/AxiosInstance";
import { toast } from "react-toastify";
import UserFooter from "../userFooter/UserFooter";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { FaBackward } from "react-icons/fa";
import LoadingFootball from "../../LoadingFootball";
// import ReviewModal from "./Components/Review";
// import './userTurfDetail.css'
// import { TfiWrite } from "react-icons/tfi";

export default function UserTurfDetails() {
  const token = localStorage.getItem("user");
  const Location = useLocation();
  const ID = Location.state;
  const [data, setData] = useState({});
  const [showCalender, setShowCalender] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let [selectedPrice, setSelectedPrice] = useState();
  const [selectedSlot, setSelectedSlot] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTurf = async () => {
    try {
      const response = await AxiosUser.get(`viewTurf/${ID}`);
      setData(response.data.turf);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const { "5s": price5s, "7s": price7s } = data.prices || {};

  useEffect(() => {
    fetchTurf();
  }, []);

  // const toggleModal = () => {
  //   setModalIsOpen(!modalIsOpen);
  // };

  return (
    <>
      <UserNavbar />
      <section className="text-gray-600 body-font">
      {isLoading ? ( 
          <div className="mt-[140px]  content-center"><LoadingFootball/></div> 
        ) : showCalender ? (
          <Booking
            closingTime={data.closingTime}
            openingTime={data.openingTime}
            ID={data._id}
            price={selectedPrice}
            slot={selectedSlot}
            setShowCalender={setShowCalender}
          />
        ) : (
          <>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center sm:px-5 sm:py-10">
              <div className="mb-10 sm:mb-0 flex justify-center">
                <ImageManage photos={data?.images || []} />
              </div>

              <div className="md:w-1/2 md:pl-10">
                <h1 className="text-3xl flex justify-center items-center sm:text-4xl font-medium text-customGreen sm:mt-5  mb-4">
                  <span className="font-bold ">{data?.courtName}</span>
                </h1>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.description}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.mobileNumber}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.location}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.district}
                </span>
                <span className="flex justify-center items-center text-gray-600 p-1">
                  {data?.state}
                </span>
                <div className="flex justify-center items-center mb-4">
                  <span className="text-yellow-500 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 fill-current"
                    >
                      <path d="M499.267,198.052c-2.944-9.024-11.008-15.04-20.544-15.04H327.523L277.931,54.308C273.707,43.876,264.611,37,255.491,37    s-18.213,6.876-22.443,17.308L184.479,183.012H32.277c-9.536,0-17.6,6.016-20.544,15.04c-2.944,9.024-0.64,18.816,6.912,25.472    l122.88,122.88L87.043,457.348c-2.368,7.424-1.536,15.36,2.368,22.016c3.904,6.656,10.56,10.624,17.856,10.624    c2.688,0,5.376-0.48,7.936-1.472l143.808-60.48l143.808,60.48c4.352,1.824,8.96,2.752,13.504,2.752c7.68,0,15.36-2.944,21.184-8.832    c3.904-6.656,4.736-14.592,2.368-22.016l-38.912-122.88l122.88-122.88C499.907,216.868,502.211,207.076,499.267,198.052z" />
                    </svg>
                  </span>
                  <span className="text-gray-600 font-bold">
                    {Math.round((data?.rating * 100) / 100)}
                  </span>
                  <span className="text-gray-600 mx-2"> </span>
                  <span className="text-gray-600"></span>
                </div>

                <h3
                  className={`text-2xl font-semibold flex justify-center items-center `}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrice === price5s}
                    onChange={() => {
                      setSelectedPrice(price5s);
                      setSelectedSlot("5 v 5"); 
                    }}
                  />
                  <span className="text-base mr-3 ml-1">5 v 5</span>
                  <span
                    className={`${
                      selectedPrice === price5s
                        ? "bg-customGreen text-white"
                        : "bg-text-white"
                    } px-2 py-2 rounded-md`}
                  >
                    ₹ {price5s}
                  </span>
                </h3>

                <h3
                  className={`text-2xl font-semibold flex justify-center items-center`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrice === price7s}
                    onChange={() => {
                      setSelectedPrice(price7s);
                      setSelectedSlot("7 v 7"); 
                    }}
                  />
                  <span className="text-base mr-3 ml-1">7 v 7</span>
                  <span
                    className={`${
                      selectedPrice === price7s
                        ? "bg-customGreen text-white"
                        : "bg-text-white"
                    } px-2 py-2 rounded-md`}
                  >
                    ₹ {price7s}
                  </span>
                </h3>

                <div className="flex justify-center items-center mb-4 mt-4">
                 

                  <button
                    className="px-6 py-2 text-lg font-bold rounded-md text-white bg-customGreen hover:bg-green-800  border-none focus:outline-none"
                    onClick={() => {
                      if (!selectedPrice) {
                        toast.error("Please select a slot before booking.", {
                          position: "top-center",
                        });
                      } else {
                        setShowCalender(true);
                      }
                    }}
                  >
                    <BsFillJournalBookmarkFill className="w-5 h-5 inline-block mr-1" />{" "}
                    Book Now
                  </button>
            
                </div>
              </div>
            </div>
          </>
        )}  
      </section>

      
      {!showCalender && <CardReview refresh={refresh} id={ID} />}

      <div className="flex justify-center items-center mb-3">
          {!showCalender && (
            <button
              type="button"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex", 
                alignItems: "center",
              }}
              onClick={() => navigate(-1)}
              className="p-[10px] py-2 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              <FaBackward style={{ marginRight: "5px" }} /> Go Back
            </button>
          )}
        </div>

      <UserFooter />
    </>
  );
}
