import React, { useState, useEffect } from "react";
import UserNavbar from "../userHeader/UserNavbar";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { AxiosUser } from "../../../api/AxiosInstance";
import ButtonBooking from "./ButtonBooking";
import UserFooter from "../userFooter/UserFooter";
import LoadingFootball from "../../LoadingFootball";
import { toast } from 'react-toastify'
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './userProfile.css'

const UserProfile2 = () => {
  
  const usertoken=localStorage.getItem('user')
  const headers = { authorization: usertoken }
  const Navigate=useNavigate()
  
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUserName] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [address, setAddress] = useState(); 
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    try {    
      const { data } = await AxiosUser.get(`userdata`,{headers});
      setUserData(data.data);
      setUserName(data.data.username);
      setAddress(data.data.address);
      setPhonenumber(data.data.phonenumber);
      setIsLoading(false); 
     
    } catch (error) {
      toast.error(error);
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const formData = { username, phonenumber, address }; 
      const response = await AxiosUser.post('userprofile', formData, { headers });
  
      if (response.status === 200) {
        toast.success('Profile added successfully');
      } else {
        toast.error('An error occurred while updating the profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile');
    }
    setIsEditing(false);
  };
  
  
  //Uploading Image
  const imageUpload = async (e) => {
    e.preventDefault();
    try {    
    const formData = new FormData();
    formData.append("image", imageUrl); 
    const config = {
      headers: {
        "content-type": "multipart/form-data",
         authorization: usertoken
      },
    };
 
      const response = await AxiosUser.post(`photoupload`,formData,config);
      const responseData = response.data;
      console.log(responseData);
      toast.success('Image uploaded successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error('Error uploading image');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const containerStyle = {
    backgroundColor: "#f0f4f8",
    padding: "20px",
    borderRadius: "8px",
    fontWeight: "bold",
    maxWidth: "700px", 
    margin: "0 auto", 
    position: "relative", 
  };

  const editButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#3182CE",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    zIndex: "999",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen mx-10 my-10 sm:m-2">
        <ButtonBooking />
        {isLoading ? (
          <div className="my-[178px] sm:my-[160px] content-center">
            <LoadingFootball />
          </div>
        ) : (
          <React.Fragment>
            {userData ? (
              <div
                className="container mx-auto px-4 py-8 pt-30"
                style={containerStyle}
              >
                <div className="flex flex-col items-center md:flex-row md:items-start">
                  <div className="w-1/2 pr-8 md:pr-16 md:mb-0 mt-6">
                    <div className="profilePage">
                      <div className="card-client">
                        <div className="user-picture">
                          {!userData.image ? (
                            <svg
                              viewBox="0 0 448 512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                            </svg>
                          ) : (
                            <img
                              className="w-120 h-120 object-cover rounded-full"
                              src={userData.image}
                              alt=""
                              width={250}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditing ? (
                      <form onSubmit={imageUpload}>
                        <div>
                          <input
                            accept=".jpg, .jpeg, .png, .gif, .pdf"
                            className="inptfile"
                            name="arquivo"
                            id="arquivo"
                            type="file"
                            onChange={(e) => setImageUrl(e.target.files[0])}
                          />
                          {imageUrl && (
                            <input
                              value="Save"
                              type="submit"
                              className="inpdddut"
                            />
                          )}
                        </div>
                      </form>
                    ) : (
                      ""
                    )}

                    <h2 className="text-xl font-bold text-center md:text-left">
                      {isEditing ? (
                        <input
                          type="text"
                          className="border rounded-md px-2 py-1 w-full text-sm"
                          defaultValue={userData.username}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      ) : (
                        userData.username
                      )}
                    </h2>
                  </div>

                  <div className="pt-10 w-2/2 md:w-3/4">
                    <div className="mb-2">
                      <label className="font-bold text-green-700">
                        Email :
                      </label>
                      <span className="ml-2">{userData.email}</span>
                    </div>

                    <div className="mb-2">
                      <label className="font-bold text-green-700">
                        Address:
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          // className="border rounded-md px-2 py-1 w-full"
                          className="border rounded-md px-2 py-1 w-full input-field"
                          defaultValue={userData.address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      ) : (
                        <span className="ml-2">{userData.address}</span>
                        //                     <div className="max-w-[10%]">
                        //   <span className="ml-2">{userData.address}</span>
                        // </div>
                      )}
                    </div>

                    <div className="mb-2">
                      <label className="font-bold text-green-700">
                        Mobile :
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="border rounded-md px-2 py-1 w-full"
                          defaultValue={userData.phonenumber}
                          onChange={(e) => setPhonenumber(e.target.value)}
                        />
                      ) : (
                        <span className="ml-2">{userData.phonenumber}</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="font-bold text-green-700">
                        Wallet :
                      </label>
                      <span className="m-2 px-2 py-1 bg-customGreen text-white rounded-md">
                        {userData.wallet}
                      </span>
                    </div>

                    {isEditing ? (
                      <div className="flex flex-col md:flex-row">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold px-2 py-1 rounded mb-2 md:mr-2 md:mb-0"
                          onClick={handleSaveClick}
                        >
                          <span className="text-[14px]"> Save</span>
                        </button>

                        <button
                          onClick={handleCancelClick}
                          style={editButtonStyle}
                        >
                          <IoClose className="text-customGreen text-[1.5rem]" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={handleEditClick} style={editButtonStyle}>
                        <BiSolidEditAlt className="text-customGreen text-[1.5rem]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex sm:font-extrabold justify-center my-[200px]">
                Data Not Found .......
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => Navigate(-1)}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
                className="p-[10px] py-2 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
              >
                <FaBackward style={{ marginRight: "5px" }} /> Go Back
              </button>
            </div>

          </React.Fragment>
        )}
      </div>
      <UserFooter />
    </>
  );
};

export default UserProfile2;







//   const handleSaveClick = async (e) => {
//         e.preventDefault()
//         const formData = new FormData()
//             formData.append('image', imageUrl)
//             formData.append("userId", userId)

//             const config = {
//               header: {
//                   "content-type": "multipart/form-data",
//                    userId: userId
//               },
//               withCredentials: true
//           }

//           try {
//             const { data } = await axios.post(`${UserPort}userprofile`, formData, config)
//             dispatch(updateUser({ image: data.imageurl, username, userId }))
//             console.log(data);
//         } catch (error) {
//             console.log(error)
//         }
//     setIsEditing(false);
//   };



// {isEditing ? (
//   <form onSubmit={imageUpload}>
//     <div>
//       <input
//         accept=".jpg, .jpeg, .png, .gif, .pdf"
//          className="inpdddut"
//         name="arquivo"
//         id="arquivo"
//         type="file"
//         onChange={(e) => setImageUrl(e.target.files[0])}
//       />
//       {imageUrl && (
//         <input
//           value="Save"
//           type="submit"
//           className="inpdddut"
//         />
//       )}
//     </div>
//   </form>
// ) : (
//   ""
// )}