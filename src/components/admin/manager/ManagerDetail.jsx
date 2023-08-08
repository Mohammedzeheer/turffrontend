// ManagerDetailsModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BiSolidUserCircle } from "react-icons/bi";

const ManagerDetail = ({ open, onClose, manager }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2 id="modal-title">Manager Details</h2>
        {manager && (
         <div className="p-4 bg-gray-100 rounded-lg shadow-md">
         <img src={manager.image ? manager.image : <BiSolidUserCircle/>} className="mx-auto mb-4 rounded-full w-20 h-20" />
         <p id="modal-description" className="text-lg font-semibold">Username: {manager.username}</p>
         <p className="text-gray-600">Email: {manager.email}</p>
         <p className="text-gray-600">Turf Name: {manager.turfname}</p>
         <p className="text-gray-600">Phone Number: {manager.phonenumber}</p>
         <p className="text-gray-600">isApprove:   {manager.isApprove ? "Yes" : "No"}</p>
       </div>
     
        )}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ManagerDetail;
