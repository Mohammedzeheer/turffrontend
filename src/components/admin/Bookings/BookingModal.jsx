// BookingModal.js
import React from "react";

function BookingModal({ open, onClose, booking }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        open ? "" : "hidden"
      }`}
    >
      <div className="bg-black opacity-50 h-full w-full absolute" onClick={onClose}></div>
      <div className="modal-content p-4 bg-white rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Booking Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2">
              <strong>Book Date:</strong>{" "}
              {new Date(booking.bookDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            
            <p className="text-sm mb-2">
              <strong>Cancel Booking:</strong>{" "}
              {booking.cancelBooking.toString()}
            </p>
            <p className="text-sm mb-2">
              <strong>Payment:</strong> {booking.payment}
            </p>
          </div>
          <div>
            <p className="text-sm mb-2">
              <strong>Slot:</strong> {booking.slot}
            </p>
            <p className="text-sm mb-2">
              <strong>Price:</strong> {booking.price}
            </p>
            <p className="text-sm mb-2">
              <strong>Time:</strong> {booking.time}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 mt-8">Turf Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2">
              <strong>Court Name:</strong> {booking.turf.courtName}
            </p>
            <p className="text-sm mb-2">
              <strong>Location:</strong> {booking.turf.location}
            </p>
          </div>
          <div>
            <p className="text-sm mb-2">
              <strong>District:</strong> {booking.turf.district}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 mt-8">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2">
              <strong>Name:</strong> {booking.user.username}
            </p>
            <p className="text-sm mb-2">
              <strong>Mobile Number:</strong> {booking.user.phonenumber}
            </p>
          </div>
          <div>
            <p className="text-sm mb-2">
              <strong>Email:</strong> {booking.user.email}
            </p>
            <p className="text-sm mb-2">
              <strong>Address:</strong> {booking.user.address}
            </p>
          </div>
        </div>

        <button
          className="mt-8 bg-customBlue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default BookingModal;