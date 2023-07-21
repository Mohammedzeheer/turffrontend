import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
// import { userUrl } from "../../../../API/API"
// import axios from "axios"
// import { AdminPort, UserPort, PartnerPort } from '../../../store/port';
import { UserPort } from '../../../../store/port';

import Nav from "../../../User/Layout/Nav"
import { toast, Toaster } from 'react-hot-toast'

const SuccessPage = () => {
    const [details, setDetails] = useState({})
    const { id } = useParams()
    useEffect(() => {
        updateSuccess()
    }, [])

    const updateSuccess = async () => {
        try {
          const response = await UserPort.post(`booking-success/${id}`);
          if (response?.status === 200) {
            setDetails(response.data);
            toast.success("Payment Success")
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    return (
      <>
      <Nav/>
      <Toaster/>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl">
                <svg className="w-16 h-16 text-green-500 mb-6 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18.707 5.293a1 1 0 00-1.414 0L8 14.586 3.707 10.293A1 1 0 102.293 11.707l5 5a1 1 0 001.414 0l11-11a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Your booking is confirmed!</h1>
                <div className="bg-gray-200 p-4 mx-5 text-center shadow-2xl  text-lg justify-center rounded-lg mb-6">
                    {/* <p>Booking ID: <span className="font-bold">{details._id}</span></p> */}
                    <p>Booked Date: <span className="font-bold">{new Date(details.bookDate).toLocaleDateString()}</span></p>
                    <p>Booked Time: <span className="font-bold">{details.time}</span></p>
                </div>
                <Link to={'/'}>   <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg block mx-auto">Go Back to Home</button></Link>
            </div>
        </div>
      </>
    );

}

export default SuccessPage