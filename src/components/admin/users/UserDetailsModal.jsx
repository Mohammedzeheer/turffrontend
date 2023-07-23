import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles"; // Import styled from @mui/material/styles

const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  textAlign: "center",
}));

const UserImage = styled("img")({
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "0 auto",
    //marginBottom: spacing(2),
});

const CloseButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function UserDetailsModal({ isOpen, onClose, user }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContainer>
        <Typography variant="h6" component="h2">
          User Details
        </Typography>
        {user && (
          <div>
            <UserImage
              src={
                user.image
                  ? `/Photos/${user.image}`
                  : "https://static-00.iconduck.com/assets.00/profile-minor-icon-256x256-6u3v5w0z.png"
              }
              alt="User Profile"
            />
            <Typography variant="body1">
              <strong>Name:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Is Blocked:</strong> {user.isBlock ? "Yes" : "No"}
            </Typography>
          </div>
        )}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    </Modal>
  );
}

export default UserDetailsModal;




  


// import React from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";

// function UserDetailsModal({ isOpen, onClose, user }) {
//   return (
//     <Modal
//       open={isOpen}
//       onClose={onClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <Box sx={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: 400,
//         bgcolor: "background.paper",
//         boxShadow: 24,
//         p: 4
//       }}>
//         <Typography id="modal-title" variant="h6" component="h2">
//           User Details
//         </Typography>
//         {user && (
//           <div>
//             <p><strong>Name:</strong> {user.username}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             {/* Add more user details here as needed */}
//             {/* ... */}
//           </div>
//         )}
//         <Button onClick={onClose}>Close</Button>
//       </Box>
//     </Modal>
//   );
// }

// export default UserDetailsModal;
