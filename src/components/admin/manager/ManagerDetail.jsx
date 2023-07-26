// ManagerDetailsModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
          <div>
            <p id="modal-description">Username: {manager.username}</p>
            <p>Email: {manager.email}</p>
            <p>Turf Name: {manager.turfname}</p>
            <p>Phone Number: {manager.phonenumber}</p>
            <p>isApprove:   {manager.isApprove ? "Yes" : "No"}</p>
          
            
          </div>
        )}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ManagerDetail;
