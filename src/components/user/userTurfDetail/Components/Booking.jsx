import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from "react-router-dom";
import { getTimeSlot } from "./TimeSlot";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import {stripeKey} from '../../../../helpers/StripeKey'
import { AxiosUser } from '../../../../api/AxiosInstance';
import './calander.css'
import { FaBackward } from "react-icons/fa";
import { useSelector } from 'react-redux';



const Booking = ({ ID, openingTime, closingTime,price,slot, setShowCalender }) => {
    const token = localStorage.getItem('user')
    const { userId } = useSelector((state) => state.user);
    const [date, setDate] = useState(new Date());
    const [bookedTime, setBookedTime] = useState([]);
    const Navigate = useNavigate();

    const stripePromise = loadStripe( `${stripeKey}`);

    const Time = async (time) => {
        if (!token) return Navigate("/login");
        try {
            const response = await AxiosUser.post(`booking`,{ ID, date, time,userId,price,slot},
            { headers: { authorization: token } }
            );
            console.log(response ,"iam time function of booking")
            if (response && response.status === 200) {
                const stripe = await stripePromise;
                const result = await AxiosUser.get(`payment/${response.data._id}`);
                console.log(result,'payments --------- response' )
                if (result && result.status === 200) {
                    await stripe.redirectToCheckout({ sessionId: result.data.response });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleTimeClick1 = async (time) => {
        await Time(time);
        await getSlots(date, time);
    };


    const handleTimeClick = (date,time) => {
      return new Promise((resolve, reject) => {
        Time(time)
          .then(() => {
            return getSlots(date, time);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    

    const slots = getTimeSlot(openingTime, closingTime, 60);
    const getSlots = async (date) => {
        try {
            const response = await AxiosUser.get(`bookingslots/${date}/${ID}`)
            console.log(response,'responce booking slots')
            if (response.status === 200) {
                const bookedTimes = response?.data.map((x) => x.time);
                setBookedTime(bookedTimes);
            }
        } catch (error) {
            console.error(error)
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

    const currentTime = new Date().getTime();

    useEffect(() => {
        ID && getSlots(date);
    }, [ID, date]);

    return (
        <>
           



<section className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap px-5 py-1 mb-5 sm:py-0 items-center justify-center">

        <div className="w-full lg:w-1/2 px-2">
          <div className="text-center">
            <h2 className="font-sans font-bold p-5">Select Date</h2>
            <div className="react-calendar" style={{ display: 'flex', justifyContent: 'center' }}>
              <Calendar
                maxDate={maxDate}
                tileDisabled={isDateDisabled}
                minDate={new Date()}
                onChange={setDate}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-2">
          <div className="text-center">
            <h2 className="font-sans font-bold p-5 ">Select Your Slots</h2>
            <div className="flex flex-wrap justify-center">
       
              
{slots.map((time, index) => (
    <div class="m-2" key={index}>
      {new Date(`${date.toDateString()} ${time}`).getTime() < currentTime ? (
        <button
          type="button"
          class="w-[100px] h-8 p-0 font-semibold bg-gray-500 text-white "
          disabled
        >
          {time}
        </button>
      ) : bookedTime.includes(time) ? (
        <button
          type="button"
          // class="w-[100px] h-8 p-0 font-semibold rounded-full bg-red-500 text-white"
          class="w-[100px] h-8 p-0 font-semibold  bg-red-500 text-white"
          disabled
        >
          Booked
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handleTimeClick(date,time)}
          class="w-[100px] h-8 p-0 font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
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
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex', // Use flex display to align items in the same row
                 alignItems: 'center',
              }}
              className="p-[10px] py-2 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
             >
              <FaBackward style={{ marginRight: '5px' }}/> Go Back
            </button>
      </div>
    </section>





        </>
    );
};
export default Booking;





















 {/* <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <h2 className="font-sans font-bold p-5">Select Date</h2>

                    <Calendar
                        maxDate={maxDate}
                        tileDisabled={isDateDisabled}
                        minDate={new Date()}
                        onChange={setDate}
                    />
                    <div class="text-center lg:w-2/3 w-full">
                        <h2 className="font-sans font-bold p-5">Select Your Slots</h2>

                        <div class="flex justify-center flex-wrap">
                            {slots.map((time, index) => (
                                <div className="flex justify-center" key={index}>
                                    <div className="m-2">
                                        {new Date(`${date.toDateString()} ${time}`).getTime() < currentTime ? (
                                            <button
                                                type="button"
                                                className="px-3 py-1 font-semibold  bg-gray-500 text-white"
                                                disabled
                                            >
                                                {time}
                                            </button>
                                        ) : bookedTime.includes(time)? (
                                            <button
                                                type="button"
                                                className="px-3 py-1 font-semibold rounded-full bg-red-500 text-white"
                                                disabled
                                            >
                                                Booked
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleTimeClick(time)}
                                                className="px-3 py-1 font-semibold rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                            >
                                                {time}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button
                            type="button"
                            onClick={() => setShowCalender(false)}
                            className="px-8 py-3 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
                        >
                            Go Back
                        </button>
                        {bookedTime.length === slots.length && (
                            <p className="text-red-500 font-medium mt-4">
                                Sorry, all slots for this date are already booked.
                            </p>
                        )}
                    </div>
                </div>
            </section> */}