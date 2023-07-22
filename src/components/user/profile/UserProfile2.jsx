import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../userHeader/UserNavbar";
import { useSelector } from "react-redux";
import { UserPort } from "../../../store/port";

const UserProfile2 = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl,setImageUrl]=useState(null) 
  const [username,setUserName]=useState()
  const [phonenumber,setPhonenumber]=useState()
  const [address,setAddress]=useState()
  const {userId} = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${UserPort}userdata/${userId}`);
        console.log(data);
        setUserData(data.data);
        setUserName(data.data.username)
        setAddress(data.data.address)
        setPhonenumber(data.data.phonenumber)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);




    //saving address
  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const formData ={username,phonenumber,address,userId}
      const { data } = await axios.post(`${UserPort}userprofile`,{formData});
      console.log(data)
    //   dispatch(updateUser({}));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };
  

  //Uploading Image
  const imageUpload = async(e) =>{
    e.preventDefault()
    const formData = new FormData()
        
        formData.append('image', imageUrl)
        formData.append("userId", userId)

        const config = {
          header: {
              "content-type": "multipart/form-data",
               userId: userId
          },
          withCredentials: true
      }
      try {
        const { data } = await axios.post(`${UserPort}photoupload`, formData, config)
        dispatch(updateUser({ image: data.imageurl, userId }))
        console.log(data);
    } catch (error) {
        console.log(error)
    }
  }


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
  };

  return (
    <>
      <UserNavbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 pt-30" style={containerStyle}>
          {userData ? (
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="w-1/3 pr-8 md:w-1/4 md:pr-16 md:mb-0">       
                {/* <img
                  src={""}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 mx-auto"
                /> */}


<div className='profilePage'>
        <div className="card-client">
          <div className="user-picture">
            {!userData.image ? <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
            </svg> :
            <img className='imgP' src={`/Photos/${userData.image}`} alt="" width={250}/>}
          </div>
        </div>
      </div>
     



      {/* {isEditing ? (
                   <div>
                   <input accept=".jpg, .jpeg, .png, .gif, .pdf" class="inpdddut" name="arquivo" id="arquivo" type="file" onChange={(e)=>setImageUrl(e.target.files[0])}/>
                    {userData.imageUrl&&<input value="Send" type="submit" class="inpdddut"/>}
                 </div>
                  ) : (
                    ''
                  )} */}



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
      {userData.image && <input value="Send" type="submit" className="inpdddut" />}
    </div>
  </form>
) : (
  ''
)}




                <h2 className="text-xl font-bold text-center md:text-left">
                  {isEditing ? (
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 w-full"
                      defaultValue={userData.username}
                      onChange={(e)=>setUserName(e.target.value)}
                    />
                  ) : (
                    userData.username
                  )}
                </h2>
              </div>

              <div className="w-2/3 md:w-3/4">
                <div className="mb-4">
                  <label className="font-bold text-green-700">Email:</label>
                  <span>{userData.email}</span>
                </div>


                <div className="mb-4">
                  <label className="font-bold text-green-700">Address:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 w-full"
                      defaultValue={userData.address}
                      onChange={(e)=>setAddress(e.target.value)}
                    />
                  ) : (
                    <span>{userData.address}</span>
                  )}
                </div>




                <div className="mb-4">
                  <label className="font-bold text-green-700">Mobile:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1 w-full"
                    //   value={userData.phonenumber}
                      defaultValue={userData.phonenumber}
                      onChange={(e)=>setPhonenumber(e.target.value)}
                    />
                  ) : (
                    <span>{userData.phonenumber}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-bold text-green-700">Wallet:</label>
                  <span className="px-2 py-1 bg-purple-300 text-purple-800 rounded-md">
                    {userData.wallet}
                  </span>
                </div>

                {isEditing ? (
                  <div className="flex flex-col md:flex-row">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded mb-2 md:mr-2 md:mb-0"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded mb-2"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
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