// src/components/BookingHistory.js
import React, { useEffect, useState } from 'react';
import { AxiosPartner } from '../../../api/AxiosInstance';
import BookingDetailsModal from './BookingDetailsModal'; 
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingFootball from '../../LoadingFootball';


const BookingHistoryPartner = () => {

const partnerToken = localStorage.getItem('partner')
const headers = { authorization: partnerToken }

const [bookingData,setBookingData]=useState()
const [selectedBooking, setSelectedBooking] = useState(null);
const [isModalOpen, setModalOpen] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const handleCardClick = (booking) => {
  setSelectedBooking(booking);
  setModalOpen(true);
};



const fetchData = async () => {
  try {
    const response = await AxiosPartner.get('bookingsData', { headers });
    setBookingData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('An error occurred while fetching booking data.');
    setIsLoading(false);
  }
};

useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="p-4">
      {isLoading ? (
        <div className="mt-[140px]  content-center"><LoadingFootball/></div> 
      ) : (
        <React.Fragment>
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>
     
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bookingData ? (
          bookingData.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleCardClick(booking)}
            >
              <p className="text-gray-500">Booking ID: {booking._id}</p>
              <p className="font-bold">{booking.turf.courtName}</p>
              <p>{booking.location}</p>
              <p>
                Date:{' '}
                {new Date(booking.bookDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p>Time: {booking.time}</p>
              <p>Slot: {booking.slot}</p>
              <p>Price: {booking.price}</p>
              <p
                className={`text-${
                  booking.payment === 'Success' ? 'green' : 'red'
                }-500 font-bold mb-2`}
                >
                Payment: {booking.payment}
              </p>
              {booking.cancelBooking && 
                    <p className="text-red-500 font-bold mb-2">
                      Status: booking canceled
                    </p>}
            </div>
            ))
            ) : (
              <div className="flex items-center justify-content-center m-10">
               Data Not found. !
              </div>
            )}
   
        
      </div>
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        isOpen={isModalOpen}
      />

        </React.Fragment>
      )}
    </div>
  );
};

export default BookingHistoryPartner;