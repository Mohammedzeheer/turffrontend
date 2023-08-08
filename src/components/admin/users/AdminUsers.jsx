import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../../redux/adminSlice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { CgUnblock } from "react-icons/cg";
import { AdminPort } from "../../../store/port";
import "./AdminUsers.css";
import UserDetailsModal from "./UserDetailsModal";
import Pagination from "../pagination"; 
import LoadingFootball from "../../LoadingFootball";
import { AxiosAdmin } from "../../../api/AxiosInstance";
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function AdminUsers() {
  const adminToken= localStorage.getItem('admin')
  const headers={authorization:adminToken}
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  ////for view  user datail modaal   ----------------start--------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);//for modaal

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


////for view  user datail modaal   ---------------end-------------

  // const getCurrentItems = () => {
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   return users.slice(indexOfFirstItem, indexOfLastItem);
  // };


 //pagination    ----------------start--------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Change this number to adjust the number of items per page

  const filteredUsers = users.filter(
    (user) => user.username.toLowerCase().includes(query.toLowerCase())
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


   const Fetchdata = async () => {
     try {
       const response = await AxiosAdmin.get("users", { headers });
       setUsers(response.data.data);
       setIsLoading(false);
     } catch (error) {
       toast.error(error);
       setIsLoading(false);
     }
   };


  useEffect(() => {
    Fetchdata();
  },[refreshFlag]);

 

  const blockUser = async (userId) => {
    try {
      const response = await AxiosAdmin.post(`blockuser`, { userId }, {headers});   
      console.log(response.data);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while blocking the user.");
    }
  };
  
  

  const UnblockUser = async(userId) => {
    try {
      const response = await AxiosAdmin.post(`unblockuser`, { userId }, {headers }); 
      console.log(response.data);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while unblocking the user.");
    }
  };
  

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
      <h2 className="userHead">USERS</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentItems()
            // .filter((user) => user.username.toLowerCase().includes(query))
            .map((user, index) => (
              <tr key={index}>
                <td>
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="placeholder"
                      width={30}
                    />
                  ) : (
                    <img
                      src="https://static-00.iconduck.com/assets.00/profile-minor-icon-256x256-6u3v5w0z.png"
                      alt="placeholder"
                      width={30}
                    />
                  )}
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><Button
                    onClick={() => handleViewUser(user)}
                    variant="outlined"
                  >
                    View
                  </Button></td>
                <td>
                  {user.isBlock == false ? (
                    <Button
                      onClick={() => blockUser(user._id)}
                      variant="outlined"
                      startIcon={<BlockIcon />}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      onClick={() => UnblockUser(user._id)}
                      variant="outlined"
                      startIcon={<CgUnblock />}
                    >
                      Unblock
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <div className="flex justify-center mt-5">
        <div className="flex gap-4">
       
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === getTotalPages()}
          >
            Next Page
          </Button>
        </div>
      </div> */}
      
      <Pagination
      currentPage={currentPage}
      totalPages={getTotalPages}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
    />

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />

     </React.Fragment>
      )}
    </div>
  );
}

export default AdminUsers;
