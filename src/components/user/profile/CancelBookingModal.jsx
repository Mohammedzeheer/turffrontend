import React, { useState } from "react";
import { AxiosUser } from "../../../api/AxiosInstance";
import { useSelector } from "react-redux";


const CancelBookingModal = ({ isOpen, toggle,bookingId }) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
 
  const {userId} = useSelector((state)=>state.user)

  const handleCancelBooking = async () => {
    try {
      const response = await AxiosUser.post(`cancelbooking/${bookingId}`, {reason: reason,userId});
      console.log(response);
      // onCancelBooking(reason);
    } catch (error) {
      console.log(error);
    }
    toggle();
  };



  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <span
          className="close absolute top-2 right-2 text-gray-500 cursor-pointer"
          onClick={toggle}
        >
          &times;
        </span>
        <h2 className="text-xl font-semibold mb-4">Cancel Booking</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Reason for Cancellation:
          </label>
          <textarea
            value={reason}
            onChange={handleReasonChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your reason here"
          />
        </div>
        <div className="flex justify-content-center">
          <button
            onClick={handleCancelBooking}
            className="mt-2 mr-1 px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={toggle}
            className="mt-2 ml-1 px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
