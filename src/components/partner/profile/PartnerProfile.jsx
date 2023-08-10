import React, { useState, useEffect } from "react";
import TopBar from "../sidebar/TopBar";
import PartnerNavbar from "../header/partnerNavbar";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import {AxiosPartner} from '../../../api/AxiosInstance'
import Loading from '../Loading'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const PartnerProfile = () => {
  const partnerToken= localStorage.getItem('partner')
  const headers={authorization:partnerToken}

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUserName] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [turfname, setTurfName] = useState();
  const [address, setAddress] = useState();

  const fetchData = async () => {
    try {
        const response = await AxiosPartner.get('partnerprofile/', { headers });
        const { data } = response;

        setUserData(data.data);
        setUserName(data.data.username);
        setAddress(data.data.address);
        setTurfName(data.data.turfname);
        setPhonenumber(data.data.phonenumber);

    } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
    }
};

  useEffect(() => {
    fetchData();
  }, []);



  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const formData = { username, phonenumber, address, turfname };
      const response = await AxiosPartner.post(`updateprofile`, {formData}, { headers });
      const responseData = response.data;

      if (responseData.status) {
        setUserData(responseData.data);
        toast.success('Updated Succesfully')
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  }



  //Uploading Image
  const imageUpload = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("image", imageUrl);
  
      const config = {
        headers: {
          "content-type": "multipart/form-data",
           authorization: partnerToken,
        },
      };
  
      const response = await AxiosPartner.post(`photoupload`, formData, config);
      const responseData = response.data;
      console.log(responseData);
      toast.success('Image uploaded successfully');
      
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
    maxWidth: "600px", 
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
      <PartnerNavbar />
      <TopBar />
      <div className="m-4 sm:pt-10">
        <div
          className="container mx-auto px-4 py-8 pt-30"
          style={containerStyle}
        >
          {userData ? (
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
                          className="imgP"
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
                        className="inpdddut"
                        name="arquivo"
                        id="arquivo"
                        type="file"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                      />
                      {imageUrl && (
                        <input
                          value="Send"
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
                      className="border rounded-md px-2 py-1 w-full"
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
                  <label className="font-bold text-green-700">Email:</label>
                  <span className="ml-2">{userData.email}</span>
                </div>

                <div className="mb-2">
                  <label className="font-bold text-green-700">Address:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 w-full"
                      defaultValue={userData.address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  ) : (
                    <span className="ml-2">{userData.address}</span>
                  )}
                </div>

                <div className="mb-2">
                  <label className="font-bold text-green-700">Turf Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 w-full"
                      //   value={userData.phonenumber}
                      defaultValue={userData.turfname}
                      onChange={(e) => setTurfName(e.target.value)}
                    />
                  ) : (
                    <span className="ml-2">{userData.turfname}</span>
                  )}
                </div>

                <div className="mb-2">
                  <label className="font-bold text-green-700">Mobile:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 w-full"
                      //   value={userData.phonenumber}
                      defaultValue={userData.phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                  ) : (
                    <span className="ml-2">{userData.phonenumber}</span>
                  )}
                </div>

                {/* <div className="mb-4">
                  <label className="font-bold text-green-700">Wallet:</label>
                  <span className="m-2 px-2 py-1 bg-customGreen text-white rounded-md">
                    {userData.wallet}
                  </span>
                </div> */}

                {isEditing ? (
                  <div className="flex flex-col md:flex-row">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-2 py-1 rounded mb-2 md:mr-2 md:mb-0"
                      onClick={handleSaveClick}
                    >
                      <span className="text-[14px]"> Save</span>
                    </button>

                    {/* <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded mb-2"
                      onClick={handleCancelClick}
                    >
                      <span className="text-[14px]">Cancel</span>
                    </button> */}
                    <button onClick={handleCancelClick} style={editButtonStyle}>
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
          ) : (
            <div><Loading/>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PartnerProfile;
