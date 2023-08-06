import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { AiFillEye } from "react-icons/ai";
import { AiOutlinePullRequest } from "react-icons/ai";
import "../users/AdminUsers.css";
import Pagination from "../pagination";
import { AxiosAdmin } from "../../../api/AxiosInstance";
import BookingModal from "./BookingModal";
import LoadingFootball from "../../LoadingFootball";


function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const FetchData = async () => {
    try {
      const response = await AxiosAdmin.get(`bookingList`, {
        withCredentials: true,
      });
      setBookings(response.data.response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  // Function to handle opening and closing the modal
  const handleModalOpen = (booking) => {
    setSelectedBooking(booking);
  };

  const handleModalClose = () => {
    setSelectedBooking(null);
  };

  //pagination    ----------------start--------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Change this number to adjust the number of items per page

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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  //pagination    ----------------end--------------------

  return (
    <div>
       {isLoading ? (
        <div className="mt-[140px]  content-center"><LoadingFootball/></div> // Display a loading message while data is being fetched
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
            <th>User</th>
            <th>Status</th>
            <th>view</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentItems()
            // .filter((user) => user.courtName.toLowerCase().includes(query))
            .map((booking, index) => (
              <tr key={index}>
                {/* <td>
                  {booking.turf.images ? (
                    <img src={booking.turf.images[0]} alt="loading" width={100} />
                  ) : (
                    <img
                      src="https://static-00.iconduck.com/assets.00/profile-minor-icon-256x256-6u3v5w0z.png"
                      alt="placeholder"
                      width={30}
                    />
                  )}
                </td> */}
                <td>{booking.turf.courtName}</td>
                <td>{booking.turf.district}</td>
                <td>{booking.turf.location}</td>
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
      />
      </React.Fragment>
      )}
    </div>
  );
}

export default AdminBookings;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Button from "@mui/material/Button";
// import { AiFillEye } from "react-icons/ai";
// import { AiOutlinePullRequest } from "react-icons/ai";
// import "../users/AdminUsers.css";
// import Pagination from "../pagination";
// import { AxiosAdmin } from "../../../api/AxiosInstance";
// import BookingModal from "./BookingModal";
// import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
// import TimePicker from "@mui/lab/TimePicker";

// function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const FetchData = async () => {
//     try {
//       const response = await AxiosAdmin.get(`bookingList`, {
//         withCredentials: true,
//       });
//       console.log(
//         response,
//         "--------------------booking list in admin -------------"
//       );
//       setBookings(response.data.response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     FetchData();
//   }, []);

//   // Function to handle opening and closing the modal
//   const handleModalOpen = (booking) => {
//     setSelectedBooking(booking);
//   };

//   const handleModalClose = () => {
//     setSelectedBooking(null);
//   };

//   // Filtering logic based on booking date and time
//   const filteredBookings = bookings.filter((booking) => {
//     if (!selectedDate || !selectedTime) return true; // If no date or time is selected, show all bookings
//     const bookingDateTime = new Date(booking.bookDate);
//     bookingDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
//     const selectedDateTime = new Date(selectedDate);
//     selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
//     return bookingDateTime.getTime() === selectedDateTime.getTime();
//   });

//   //pagination    ----------------start--------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3; // Change this number to adjust the number of items per page

//   const getTotalPages = () => Math.ceil(filteredBookings.length / itemsPerPage);

//   const getCurrentItems = () => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };
//   //pagination    ----------------end--------------------

//   return (
//     <div>
//       {/* Date picker */}
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//           label="Select Booking Date"
//           value={selectedDate}
//           onChange={(newValue) => setSelectedDate(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <TimePicker
//           label="Select Booking Time"
//           value={selectedTime}
//           onChange={(newValue) => setSelectedTime(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>

//       <h2 className="userHead">Bookings</h2>
//       <table>
//         <thead>
//           <tr>
//             {/* <th>Image</th> */}
//             <th>Name</th>
//             <th>District</th>
//             <th>Location</th>
//             <th>Booking Date</th>
//             <th>User</th>
//             <th>Detail</th>
//             {/* <th>Status</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {getCurrentItems().map((booking, index) => (
//             <tr key={index}>
//               {/* <td>
//                 {booking.images ? (
//                   <img src={booking.images[0]} alt="loading" width={100} />
//                 ) : (
//                   <img
//                     src="https://static-00.iconduck.com/assets.00/profile-minor-icon-256x256-6u3v5w0z.png"
//                     alt="placeholder"
//                     width={30}
//                   />
//                 )}
//               </td> */}
//               <td>{booking.turf.courtName}</td>
//               <td>{booking.turf.district}</td>
//               <td>{booking.turf.location}</td>
//               <td>
//                 {new Date(booking.bookDate).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </td>

//               <td>{booking.user.username}</td>

//               <td>
//                 <button
//                   onClick={() => handleModalOpen(booking)}
//                   // variant="outlined"
//                   className="bg-customeBlue hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
//                 >
//                   <AiFillEye />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedBooking && (
//         <BookingModal
//           open={Boolean(selectedBooking)}
//           onClose={handleModalClose}
//           booking={selectedBooking}
//         />
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={getTotalPages}
//         handlePrevPage={handlePrevPage}
//         handleNextPage={handleNextPage}
//       />
//     </div>
//   );
// }

// export default AdminBookings;
