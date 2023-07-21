import React, { useState } from 'react'
import './userProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateUser } from '../../../redux/userSlice'
import { AdminPort, UserPort, PartnerPort } from '../../../store/port';
import UserNavbar from '../userHeader/UserNavbar'


const  UserProfile =() => {
  const dispatch=useDispatch()
  const [imageUrl,setImageUrl]=useState(null)
  const { username, userId, image } = useSelector(state => state.user)
  console.log(username, userId, image);

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
        const { data } = await axios.post(`${UserPort}userprofile`, formData, config)
        dispatch(updateUser({ image: data.imageurl, username, userId }))
        console.log(data);
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    <UserNavbar/>
      <div className='profilePage mt-5'>
        <div className="card-client">
          <div className="user-picture">
            {!image ? <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
            </svg> :
            <img className='imgP' src={`/Photos/${image}`} alt="" width={250}/>}
          </div>
          <p className="name-client"> {username}
            <span>Developer </span>
          </p>
        </div>
      </div>
     
     
      <div class="containerP">
		<form onSubmit={imageUpload}>
			<label for="arquivo">Choose a file:</label>
			<input accept=".jpg, .jpeg, .png, .gif, .pdf" class="inpdddut" name="arquivo" id="arquivo" type="file" onChange={(e)=>setImageUrl(e.target.files[0])}/>
			{imageUrl&&<input value="Send" type="submit" class="inpdddut"/>}
		</form>
	</div>


    </>
  )
}

export default UserProfile