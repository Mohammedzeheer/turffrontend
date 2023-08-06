import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import {AddAdmin} from '../../../redux/adminSlice'
import {AxiosAdmin} from '../../../api/AxiosInstance'
// import {AdminPort,UserPort} from '../../../store/port'


function AdminLogin() {
    const navigate= useNavigate()

    const dispatch =useDispatch()
    useEffect(()=>{
        const admin= localStorage.getItem('admin')
        if(admin){
            navigate('/admin')
        }
    },[])
    
  

    const [admin,setAdmin]= useState({})

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await AxiosAdmin.post(`adminLogin`, { ...admin }, { withCredentials: true });
            console.log(data,"------datat");
            if (data) {
                if (data.errors) {
                    const { username, password } = data.errors;
                    if (username) generateError(username);
                    else if(password) generateError(password);
                } else {
                    if (data.token) {
                        localStorage.setItem('admin', JSON.stringify(data.token));
                        dispatch(AddAdmin({AdminToken:data.token}))
                        navigate('/admin');
                    }
                }
            }
        } catch (error) {
            toast.error(error);
        }
    };
    

    const generateError = (err) => toast.error(err, {
        autoClose: 1000, 
        position: toast.POSITION.TOP_CENTER
    })


    return (
        <div className='bodyAdminLogin'>
            <div className="login-container">
                <div class="admin-symbol">&#9812;</div>
                <h1 className="login-header">Admin Login</h1>   
                <form className="login-form">
                    <input type="text" name="username" placeholder="Username" className="input-field" onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})} required />
                    <input type="password" name="password" placeholder="Password" className="input-field" onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})} required />
                    <button type="submit" onClick={handleLogin} className="login-button" >Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminLogin
















// import React from 'react';
// import './Login.css';
// import  { useState } from 'react';

// function Login() {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add your login logic here
//     console.log('Username:', username);
//     console.log('Password:', password);
//   };

//   return (
//     <>
//   <div className="signin">
//   <div className="login-container">
//       <h1>Admin Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={handleUsernameChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input type="submit" value="Login" />
//         </div>
//       </form>
//     </div>
//   </div>

//     </>
//   );
// }

// export default Login;
