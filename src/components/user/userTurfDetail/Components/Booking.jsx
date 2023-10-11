import { useNavigate } from "react-router-dom";
import { getTimeSlot } from "./TimeSlot";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { AxiosUser } from "../../../../api/AxiosInstance";
import "./calander.css";
import { FaBackward } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Booking = ({ID,openingTime,closingTime,price, slot, setShowCalender,}) => {
  const token = localStorage.getItem("user");
  const headers={authorization:token}
  const {email } = useSelector((state) => state.user);
  const [date, setDate] = useState(new Date());
  const [bookedTime, setBookedTime] = useState([]);
  const [serverTime, setServerTime] = useState(null);
  const Navigate = useNavigate();


  const getServerTime = async () => {
    try {
      const response = await AxiosUser.get(`getservertime`);
      if (response.status === 200) {
        // setServerTime(new Date(response.data.serverTime));
        setServerTime(response.data.serverTime);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServerTime();
  }, []);


  const handleTimeClick = async (date, time) => {
    try {
      if (!token) return Navigate("/login");
      navigateToBookingDetail(ID, date, time, price, slot, email);
    } catch (error) {
      console.log(error);
    }
  };

  
  const navigateToBookingDetail = (ID, date,time,price,slot,email) => {
    Navigate("/booking-detail", { state: { ID, date, time, price, slot, email },});
  };


  const slots = getTimeSlot(openingTime, closingTime, 60);
  // const slots = getTimeSlot(openingTime, closingTime, 60, serverTime);

  const getSlots = async (date) => {
    try {
      const response = await AxiosUser.get(`bookingslots/${date}/${ID}`,{headers});
      if (response.status === 200) {
        const bookedTimes = response?.data.map((x) => x.time);
        setBookedTime(bookedTimes);
      }
    } catch (error) {
      toast.error(error);
    }
  };


  const isDateDisabled = ({ date }) => {
    return date.getDay() === 0;
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() + 1,
    today.getMonth() - 1,
    today.getDate()
  );


  const machineTime = new Date().getTime();
  const currentTime = serverTime ? serverTime : machineTime;
  // const currentTime =serverTime 

  useEffect(() => {
    ID && getSlots(date);
  }, [ID, date]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap px-5 py-1 mb-5 sm:py-0 items-center justify-center">
          {/* Calendar */}

          <div className="w-full lg:w-1/2 px-2 flex justify-center items-center">
            <div className="text-center">
              <h2 className="font-sans font-bold p-5">Select Date</h2>
              <div
                className="react-calendar"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Calendar
                  maxDate={maxDate}
                  // tileDisabled={isDateDisabled}
                  minDate={new Date()}
                  onChange={setDate}
                />
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full lg:w-1/2 px-2">
            <div className="text-center">
              <h2 className="font-sans font-bold p-5 ">Select Your Slots</h2>
              <div className="flex flex-wrap justify-center">
                {slots.map((time, index) => (
                  <div className="m-2" key={index}>
                    {new Date(`${date.toDateString()} ${time}`).getTime() <
                    currentTime ? (
                      <button
                        type="button"
                        className="w-[100px] h-8 p-0 font-semibold bg-gray-500 text-white "
                        disabled
                      >
                        {time}
                      </button>
                    ) : bookedTime.includes(time) ? (
                      <button
                        type="button"
                        className="w-[100px] h-8 p-0 font-semibold bg-red-500 text-white"
                        disabled
                      >
                        Booked
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTimeClick(date, time)}
                        className="w-[100px] h-8 p-0 font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                      >
                        {time}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {bookedTime.length === slots.length && (
                <p className="text-red-500 font-medium mt-4">
                  Sorry, all slots for this date are already booked.
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCalender(false)}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex", 
              alignItems: "center",
            }}
            className="p-[10px] py-2 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
          >
            <FaBackward style={{ marginRight: "5px" }} /> Go Back
          </button>
        </div>
      </section>
    </>
  );
};

export default Booking;


 // const handleTimeClick = async (date, time) => {
  //   try {
  //     if (!token) return Navigate("/login");
  //     const serverDate = serverTime || new Date();
  //     const serverTimezoneOffset = serverDate.getTimezoneOffset();
  //     const clientTimezoneOffset = new Date().getTimezoneOffset();
  //     const timeOffset = clientTimezoneOffset - serverTimezoneOffset;
  //     const serverTimeInClientTimezone = new Date(serverDate.getTime() + (timeOffset * 60 * 1000));
      
  //     if (serverTimeInClientTimezone > new Date()) {
  //       navigateToBookingDetail(ID, serverTimeInClientTimezone, time, price, slot, email);
  //     } else {
  //       console.error("Server time is earlier than client time");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };