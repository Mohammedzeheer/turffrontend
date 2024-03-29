import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AxiosUser } from '../../../../api/AxiosInstance';
import UserNavbar from "../../userHeader/UserNavbar";
import { toast } from 'react-toastify'
import UserFooter from "../../userFooter/UserFooter";

const SuccessPage = () => {
    const [details, setDetails] = useState({})
    const { id } = useParams()
    const [loading, setLoading] = useState(true);

  
    const updateSuccess = async () => {
        try {
          const response = await AxiosUser.post(`booking-success/${id}`);
          if (response?.status === 200) {
            setDetails(response.data);
            setLoading(false);
            toast.success("Payment Success")
            
          }
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        updateSuccess()
    }, [])   

    return (
      <>
      <UserNavbar/>
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl">
                <svg className="w-16 h-16 text-green-500 mb-6 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18.707 5.293a1 1 0 00-1.414 0L8 14.586 3.707 10.293A1 1 0 102.293 11.707l5 5a1 1 0 001.414 0l11-11a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Your booking is confirmed!</h1>
                {loading ? <p>loading...</p> : (
                <div className="bg-gray-200 p-4 mx-5 text-center shadow-2xl  text-lg justify-center rounded-lg mb-6">
                    <p>Booked Date: <span className="font-bold">{new Date(details.bookDate).toLocaleDateString()}</span></p>
                    <p>Booked Time: <span className="font-bold">{details.time}</span></p>
                </div>
                )}
                <Link className="no-underline" to={'/'}>   <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg block mx-auto">Go Back to Home</button></Link>
            </div>
        </div>
        <UserFooter/>
      </>
    );

}

export default SuccessPage