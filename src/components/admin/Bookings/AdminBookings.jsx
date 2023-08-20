import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import "../users/AdminUsers.css";
import Pagination from "../pagination";
import { AxiosAdmin } from "../../../api/AxiosInstance";
import BookingModal from "./BookingModal";
import LoadingFootball from "../../LoadingFootball";
import { toast } from 'react-toastify'


function AdminBookings() {

  const admintoken= localStorage.getItem('admin')
  const headers = {authorization:admintoken}
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true); 

  const FetchData = async () => {
    try {
      const response = await AxiosAdmin.get(`bookingList`, { headers });
      setBookings(response.data.response);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message) 
      } else {
        console.log("An error occurred:", error);
      }
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    FetchData();
  }, []);


  const handleModalOpen = (booking) => {
    setSelectedBooking(booking);
  };

  const handleModalClose = () => {
    setSelectedBooking(null);
  };

  //pagination    ----------------start--------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  const filteredUsers = bookings.filter((booking) =>
    booking.bookDate.toLowerCase().includes(query.toLowerCase())
  );

  const getTotalPages = () => Math.ceil(filteredUsers.length / itemsPerPage);

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handleNextPage = () => {
    if (currentPage < getTotalPages() && hasMoreData) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  //pagination    ----------------end--------------------

  function formatDate(timestamp) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, options);
  }



  return (
    <div>
       {isLoading ? (
        <div className="mt-[140px]  content-center"><LoadingFootball/></div> 
      ) : (
        <React.Fragment>
      <div className="input-container">
        <input
          placeholder="Search something..."
          className="input-s"
          name="text"
          type="text"
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="icon"
        >
          <g strokeWidth="0" id="SVGRepo_bgCarrier" />
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            id="SVGRepo_tracerCarrier"
          />
          <g id="SVGRepo_iconCarrier">
            <rect fill="white" />
            <path
              d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </g>
        </svg>
      </div>
      <h2 className="userHead">Bookings</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Image</th> */}
            <th>Name</th>
            <th>District</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>User</th>
            <th>Status</th>
            <th>view</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentItems()
            .map((booking, index) => (
              <tr key={index}>
                <td>{booking.turf.courtName}</td>
                <td>{booking.turf.district}</td>
                <td>{booking.turf.location}</td>
                {/* <td>{booking.bookDate}</td>  */}
                <td>{formatDate(booking.bookDate)}</td> 
                <td>{booking.time}</td>
                <td>{booking.user.username}</td>

                <td>
                  {booking.cancelBooking ? (
                    <span className="text-red">booking canceled</span>
                  ) : (
                    "booked"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleModalOpen(booking)}
                    className="bg-customBlue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    <AiFillEye />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        {selectedBooking && (
          <BookingModal
            open={Boolean(selectedBooking)}
            onClose={handleModalClose}
            booking={selectedBooking}
          />
        )}
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={getTotalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        hasMoreData={hasMoreData}
      />
      </React.Fragment>
      )}
    </div>
  );
}

export default AdminBookings;