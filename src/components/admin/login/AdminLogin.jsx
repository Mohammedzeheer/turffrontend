import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import {AddAdmin} from '../../../redux/adminSlice'
import {AxiosAdmin} from '../../../api/AxiosInstance'
import './Login.css'

function AdminLogin() {
    const navigate= useNavigate()
    const dispatch =useDispatch()    
    const [admin,setAdmin]= useState({})

    const fetchAdmin = () => {
      const admin = localStorage.getItem("admin");
      if (admin) {
        navigate("/admin");
      }
    };

    useEffect(()=>{
        fetchAdmin();
    },[])
    
     const handleLogin = async (e) => {
       e.preventDefault();
       try {
         const response = await AxiosAdmin.post(`adminLogin`, { ...admin });
         if (response?.data.token) {
           localStorage.setItem("admin", response.data.token);
           dispatch(AddAdmin({ AdminToken: response.data.token }));
           navigate("/admin");
         }
       } catch (error) {
         const errorMessage = error?.response?.data?.message;
         if (errorMessage) {
           generateError(errorMessage);
         } else {
           generateError(error.message);
         }
       }
     };
      

    const generateError = (err) =>
      toast.error(err, {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
        className: "rounded",
        style: {
          fontSize: "14px",
          maxWidth: "200px",
        },
      });


    return (
      <div className="bg-gray-200 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          {/* <div className="admin-symbol">&#9812;</div> */}

          <div class="flex justify-center items-center">
            <img
              class="w-[130px] h-[60px]"
              src="/image/logoBlue.png"
              alt="Logo"
            />
          </div>

          {/* <h1 className="login-header">Admin Login</h1>    */}
          <h1 className="mt-0 mb-4 text-3xl font-semibold text-gray-800">
            Admin Login
          </h1>
          {/* <form className="login-form"> */}
          <form className="flex flex-col">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-field"
              onChange={(e) =>
                setAdmin({ ...admin, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              onChange={(e) =>
                setAdmin({ ...admin, [e.target.name]: e.target.value })
              }
              required
            />
            <button
              type="submit"
              onClick={handleLogin}
              className="login-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}

export default AdminLogin




