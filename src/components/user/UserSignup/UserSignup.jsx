import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AxiosUser } from '../../../api/AxiosInstance';
import './userSignup.css';

function UserSignup() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, []);

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    phonenumber: '',
  });

  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  const passwordRegex1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /\d{10}/;

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    phonenumber: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    // Username validation
    if (!usernameRegex.test(user.username)) {
      newErrors.username = 'Enter a valid username';
      isValid = false;
    }
  
    // Password validation
    if (!passwordRegex.test(user.password)) {
      const passwordErrors = [];
      if (user.password.length < 8) {
        passwordErrors.push('Password must be at least 8 characters long');
      }
      if (!/\d/.test(user.password)) {
        passwordErrors.push('Password must contain at least one number');
      }
      if (!/[a-z]/.test(user.password)) {
        passwordErrors.push('Password must contain at least one lowercase letter');
      }
      if (!/[A-Z]/.test(user.password)) {
        passwordErrors.push('Password must contain at least one uppercase letter');
      }
      newErrors.password = passwordErrors;
      isValid = false;
    }
  
     
  
    // Email validation
    if (!emailRegex.test(user.email)) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }
  
    // Phone number validation
    if (!phoneNumberRegex.test(user.phonenumber)) {
      newErrors.phonenumber = 'Enter a valid phone number';
      isValid = false;
    }

    // // Password validation
    // if (!passwordRegex.test(user.password)) {
    //     // newErrors.password = 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number';
    //     newErrors.password = 'Enter a valid password';   
    //     isValid = false;
    //   }
  
    setErrors(newErrors);
    return isValid;
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await AxiosUser.post(`signup`, { ...user }, { withCredentials: true });
        console.log(data, '---hello iam data------');
        if (data) {
          if (data.errors) {
            const { username, password, email, phonenumber } = data.errors;
            if (username) generateError(username);
            else if (phonenumber) generateError(phonenumber);
            else if (password) generateError(password);
            else if (email) generateError(email);
          } else if (data.otp) {
            navigate('/userotp');
          } else {
            navigate('/userotp');
            // navigate("/login");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const generateError = (err) =>
    toast.error(err, {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    });

  return (
    <Fragment>
      <section>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex  bg-light">
              <img
                src="/image/turf7.png"
                style={{ width: '55vw', height: '100vh', paddingTop: '70px' }}
                alt=""
              />
            </div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Aone Turf</h3>
                      <p className="text-muted mb-4">Register Here</p>
                      <form>
                        <div className="form-group mb-3">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                [e.target.name]: e.target.value,
                              })
                            }
                            autoFocus=""
                            className={`form-control rounded-pill border-2 shadow-sm px-4 ${
                              errors.email ? 'is-invalid' : ''
                            }`}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>


                        <div className="form-group mb-3">
                          <input
                            type="text"
                            placeholder="User Name"
                            name="username"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                [e.target.name]: e.target.value,
                              })
                            }
                            className={`form-control rounded-pill border-2 shadow-sm px-4 ${
                              errors.username ? 'is-invalid' : ''
                            }`}
                          />
                          {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                          )}
                        </div>


                        <div className="form-group mb-3">
                          <input
                            type="text"
                            name="phonenumber"
                            placeholder="Phone Number"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                [e.target.name]: e.target.value,
                              })
                            }
                            className={`form-control rounded-pill border-2 shadow-sm px-4 ${
                              errors.phonenumber ? 'is-invalid' : ''
                            }`}
                          />
                          {errors.phonenumber && (
                            <div className="invalid-feedback">{errors.phonenumber}</div>
                          )}
                        </div>

                        <div className="form-group mb-3">
                        {errors.password &&
                  errors.password.map((error, index) => (
                    <div key={index} className="invalid-feedback">
                      {error}
                    </div>
                  ))}
                          <div className="position-relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              name="password"
                              value={user.password}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              autoFocus=""
                              className={`form-control rounded-pill border-2 shadow-sm px-4 pr-5 ${
                                errors.password ? 'is-invalid' : ''
                              }`}
                            />           
                            <span
                              className="position-absolute top-50 translate-middle-y cursor-pointer"
                              style={{ right: '10px' }}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                            
                          </div>                          
                        </div>


                        
                       

                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                          onClick={handleSubmit}
                        >
                          Sign up
                        </button>
                        <div className="text-center d-flex justify-content-between mt-4">
                          <p>
                            have an account?
                            <a
                              onClick={() => navigate('/login')}
                              className="font-italic text-muted no-underline cursor-pointer ml-1"
                            >
                              Login
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </Fragment>
  );
}

export default UserSignup;



























// import React, { useState, useEffect, Fragment } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'  // for error npm 
// import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import {AxiosUser} from '../../../api/AxiosInstance'
// import './userSignup.css'


// function UserSignup() {

//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(()=>{
//         const user= localStorage.getItem('user')
//         if(user){
//             navigate('/')
//         }
//     },[])

//     const [user, setUser] = useState({
//         username: "",
//         password: "",
//         email: "",
//         phonenumber: '',
//     })
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const { data } = await AxiosUser.post(`signup`, { ...user }, { withCredential: true })
//             console.log(data, "---hello iam data------")
//             if (data) {
//                 if (data.errors) {
//                     const { username, password, email, phonenumber } = data.errors
//                     if (username) generateError(username)
//                     else if (phonenumber) generateError(phonenumber)
//                     else if (password) generateError(password)
//                     else if (email) generateError(email)
//                 }
//                 else if(data.otp){
//                     navigate("/userotp")
//                 }
//                 else {
//                     navigate("/userotp")
//                     // navigate("/login")
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }




//     const generateError = (err) => toast.error(err, {
//         autoClose: 2000,
//         position: toast.POSITION.TOP_CENTER
//     })


//     return (
//       <Fragment>
//         <section>
//           <div className="container-fluid">
//             <div className="row no-gutter">
//               <div className="col-md-6 d-none d-md-flex  bg-light">
//                 <img
//                   src="/image/turf7.png"
//                   style={{ width: "55vw", height: "100vh", paddingTop: "70px" }}
//                   alt=""
//                 />
//               </div>

//               <div className="col-md-6 bg-light">
//                 <div className="login d-flex align-items-center py-5">
//                   <div className="container">
//                     <div className="row">
//                       <div className="col-lg-10 col-xl-7 mx-auto">
//                         <h3 className="display-4">Aone Turf</h3>
//                         <p className="text-muted mb-4">Register Here</p>
//                         <form action="/userlogin" method="post">
//                           <div className="form-group mb-3">
//                             <input
//                               type="email"
//                               placeholder="Email"
//                               name="email"
//                               onChange={(e) =>
//                                 setUser({
//                                   ...user,
//                                   [e.target.name]: e.target.value,
//                                 })
//                               }
//                               autofocus=""
//                               className="form-control rounded-pill border-2 shadow-sm px-4"
//                             />
//                           </div>
//                           <div className="form-group mb-3">
//                             <input
//                               type="text"
//                               placeholder="User Name"
//                               name="username"
//                               onChange={(e) =>
//                                 setUser({
//                                   ...user,
//                                   [e.target.name]: e.target.value,
//                                 })
//                               }
//                               className="form-control rounded-pill border-2 shadow-sm px-4 "
//                             />
//                           </div>
//                           <div className="form-group mb-3">
//                             <input
//                               type="text"
//                               name="phonenumber"
//                               placeholder="Phone Number"
//                               onChange={(e) =>
//                                 setUser({
//                                   ...user,
//                                   [e.target.name]: e.target.value,
//                                 })
//                               }
//                               className="form-control rounded-pill border-2 shadow-sm px-4 text-primary"
//                             />
//                           </div>

//                           {/* <div className="form-group mb-3 cursor-pointer">
//                                                     <div className="input-group">
//                                                         <input type={showPassword ? "text" : "password"}
//                                                             name="password" placeholder="Password"
//                                                             value={user.password}
//                                                             onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
//                                                             className="form-control rounded-pill border-2 shadow-sm px-4"
//                                                         />
//                                                         <div className="input-group-append">
//                                                             <span className="input-group-text rounded-pill border-2 shadow-sm pt-3" onClick={() => setShowPassword(!showPassword)}>
//                                                                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                 </div> */}

//                           <div className="form-group mb-3">
//                             <div className="position-relative">
//                               <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Password"
//                                 name="password"
//                                 value={user.password}
//                                 onChange={(e) =>
//                                   setUser({
//                                     ...user,
//                                     [e.target.name]: e.target.value,
//                                   })
//                                 }
//                                 autoFocus=""
//                                 className="form-control rounded-pill border-2 shadow-sm px-4 pr-5"
//                               />
//                               <span
//                                 className="position-absolute top-50 translate-middle-y cursor-pointer"
//                                 style={{ right: "10px" }}
//                                 onClick={() => setShowPassword(!showPassword)}
//                               >
//                                 <FontAwesomeIcon
//                                   icon={showPassword ? faEyeSlash : faEye}
//                                 />
//                               </span>
//                             </div>
//                           </div>

//                           <button
//                             type="submit"
//                             className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
//                             onClick={handleSubmit}
//                           >
//                             Sign up
//                           </button>
//                           <div className="text-center d-flex justify-content-between mt-4">
//                             <p>
//                               have an account?
//                               <a
//                                 onClick={() => navigate("/login")}
//                                 className="font-italic text-muted no-underline cursor-pointer ml-1"
//                               >
//                                 Login
//                               </a>
//                             </p>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ToastContainer />
//         </section>
//       </Fragment>  
//     );
// }

// export default UserSignup




