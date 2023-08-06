import React, { useEffect, useState, useRef } from "react";
import "../users/AdminUsers.css";
import Pagination from "../pagination";
import { AxiosAdmin } from "../../../api/AxiosInstance";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { BsFiletypePdf } from "react-icons/bs";
import LoadingFootball from "../../LoadingFootball";


function SalesReport() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const tableRef = useRef(); // Reference to the table element
  const [isLoading, setIsLoading] = useState(true);

  const FetchData = async () => {
    try {
      const response = await AxiosAdmin.get(`salesReport`, {
        withCredentials: true,
      });
      console.log(response);
      setBookings(response.data.response);
      setIsLoading(false); 
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  //pagination    ----------------start--------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  function formatDate(dateString) {
    const createdAtDate = new Date(dateString);
    const day = createdAtDate.getDate().toString().padStart(2, "0");
    const month = (createdAtDate.getMonth() + 1).toString().padStart(2, "0");
    const year = createdAtDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Function to generate the PDF and trigger the download
  const generatePDF = () => {
    const input = tableRef.current;
    const opt = {
      margin: 10,
      filename: "sales_report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(input).set(opt).save();
  };


  return (
    <div>
      {isLoading ? (
        <div className="mt-[140px]  content-center"><LoadingFootball/></div> // Display a loading message while data is being fetched
      ) : (
        <React.Fragment>
          <div className="input-container mr-10 ">
            <button onClick={generatePDF} className="flex items-center">
              <span className="mr-2">
                <BsFiletypePdf />
              </span>
              Generate PDF
            </button>
          </div>

          <h2 className="userHead">Sales Report</h2>
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Turf</th>
                <th>District</th>
                <th>Location</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentItems().map((booking, index) => (
                <tr key={index}>
                  <td>{formatDate(booking.createdAt)}</td>
                  <td>{booking.user.username}</td>
                  <td>{booking.turf.courtName}</td>
                  <td>{booking.turf.district}</td>
                  <td>{booking.turf.location}</td>
                  <td>{booking.price}</td>
                </tr>
              ))}
            </tbody>
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


export default SalesReport;
























// import React, { useEffect, useState } from "react";
// import "../users/AdminUsers.css";
// import Pagination from "../pagination";
// import { AxiosAdmin } from "../../../api/AxiosInstance";

// function SalesReport() {
//   const [bookings, setBookings] = useState([]);
//   const [query, setQuery] = useState("");

//   const FetchData = async () => {
//     try {
//       const response = await AxiosAdmin.get(`bookingList`, {
//         withCredentials: true,
//       });
//       console.log( response);
//       setBookings(response.data.response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     FetchData();
//   }, []);

//   //pagination    ----------------start--------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4; // Change this number to adjust the number of items per page

//   const filteredUsers = bookings.filter((booking) =>
//     booking.bookDate.toLowerCase().includes(query.toLowerCase())
//   );

//   const getTotalPages = () => Math.ceil(filteredUsers.length / itemsPerPage);

//   const getCurrentItems = () => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };
//   //pagination    ----------------end--------------------

//   function formatDate1(dateString) {
//     const createdAtDate = new Date(dateString);
//     return createdAtDate.toLocaleString("en-US", {   day: "2-digit",
//       year: "numeric",
//       month: "2-digit",

//     //   hour: "2-digit",
//     //   minute: "2-digit",
//     //   second: "2-digit",
//     //   timeZoneName: "short",
//     });
//   }
//   function formatDate(dateString) {
//     const createdAtDate = new Date(dateString);
//     const day = createdAtDate.getDate().toString().padStart(2, "0");
//     const month = (createdAtDate.getMonth() + 1).toString().padStart(2, "0");
//     const year = createdAtDate.getFullYear();
//     // const hour = createdAtDate.getHours().toString().padStart(2, "0");
//     // const minute = createdAtDate.getMinutes().toString().padStart(2, "0");
//     // const second = createdAtDate.getSeconds().toString().padStart(2, "0");
//     // const ampm = createdAtDate.getHours() >= 12 ? "PM" : "AM";

//     return `${day}/${month}/${year}`;
//   }

//   return (
//     <div>
//       <div className="input-container">
//         <input
//           placeholder="Search something..."
//           className="input-s"
//           name="text"
//           type="text"
//           autoComplete="off"
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <svg
//           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon"
//         >
//           <g strokeWidth="0" id="SVGRepo_bgCarrier" />
//           <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"/>
//           <g id="SVGRepo_iconCarrier"><rect fill="white" />
//             <path
//               d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
//               clipRule="evenodd"
//               fillRule="evenodd"
//             />
//           </g>
//         </svg>
//       </div>
//       <h2 className="userHead">Sales Report</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Turf</th>
//             <th>District</th>
//             <th>Location</th>
//             <th>Price</th>

//           </tr>
//         </thead>
//         <tbody>
//           {getCurrentItems()
//             .map((booking, index) => (
//               <tr key={index}>
//                  <td>{formatDate(booking.createdAt)}</td>
//                 <td>{booking.user.username}</td>
//                 <td>{booking.turf.courtName}</td>
//                 <td>{booking.turf.district}</td>
//                 <td>{booking.turf.location}</td>
//                 <td>{booking.price}</td>

//               </tr>
//             ))}
//         </tbody>
//       </table>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={getTotalPages}
//         handlePrevPage={handlePrevPage}
//         handleNextPage={handleNextPage}
//       />

//     </div>
//   );
// }

// export default SalesReport;
