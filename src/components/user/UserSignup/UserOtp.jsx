import React, { useState,useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'  // for error npm 
import 'react-toastify/dist/ReactToastify.css';
import { UserPort } from '../../../store/port';

const UserOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate=useNavigate()
  const [showResendButton, setShowResendButton] = useState(false); // New state variable
 

  const handleChange = (e) => {
    const value = e.target.value;
    // Limit input to 6 digits and only allow numeric values
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  useEffect(() => {
    // When the component mounts, set a timeout to show the "Resend" button after 30 SECONDS
    const timer = setTimeout(() => {
      setShowResendButton(true);
    }, 30000); // 30SECONDS
    return () => clearTimeout(timer);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Do something with the OTP, e.g., send it to the server for verification
        console.log("OTP entered:", otp);
        const { data } = await axios.post(`${UserPort}otpcheck`, {otp}, { withCredential: true })
          console.log(data, "---hello iam data of otp signup------")
         if (data) {
             if (data.errors) {
                 generateError(data.errors)
             }
             if (data.errors) {
              generateError(data.errors)
            }
             else {
                 navigate("/login")
             }
         }
     } catch (error) {
         console.log(error)
     }
   }

   const resendOtp = async (e) => {
    e.preventDefault();
    try {
        console.log("OTP entered:", otp);
        const { data } = await axios.post(`${UserPort}resendotp`, {otp}, { withCredential: true })
         if (data) {
          if(data.otp){
            navigate("/userotp")
           }
         }
     } catch (error) {
         console.log(error)
     }
   }
   


 


const generateError = (err) => toast.error(err, {
    autoClose: 2000,
    position: toast.POSITION.TOP_CENTER
})

  return (
    <>
    <ToastContainer/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-80">
        <h2 className="text-2xl font-bold mb-4">Enter the OTP</h2>
        <div className="mb-2"><span className="text-sm">Code has been sent to</span><small>*****@gmail.com</small></div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            maxLength="6"
            minLength="6"
            pattern="\d{6}"
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
            />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
            >
            Submit
          </button>
        </form>

        {showResendButton && (
            <div className="card-2">
              <div className="content d-flex justify-content-center align-items-center">
                <span>Didn't get the code</span>
                <button onClick={resendOtp} className="text-decoration-none ms-3 text-blue-500">Resend</button>
              </div>
            </div>
          )}


        {/* <div class="card-2">
            <div class="content d-flex justify-content-center align-items-center"> <span>Didn't get the code</span> 
              <button onClick={resendOtp} class="text-decoration-none ms-3 text-blue-500">Resend</button> 
            </div>
        </div> */}

      </div>  
    </div>
 </>
  );
};

export default UserOtp;
