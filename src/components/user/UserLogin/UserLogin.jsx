import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'  
import {toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {AxiosUser} from '../../../api/AxiosInstance'
import './UserLogin.css'
import 'react-toastify/dist/ReactToastify.css';

function UserLogin() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  let userToken=localStorage.getItem('user')

  const  checkUser=()=>{
    if(userToken){
      Navigate('/')
    }
  }

  useEffect(()=>{
    checkUser()
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await AxiosUser.post('userlogin', user, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data.token));
      const userData = response.data.user;
      dispatch(
        updateUser({
          username: userData.username,
          userId: userData._id,
          image: userData.image,
          token: response.data.token,
          email: userData.email
        })
      );
      Navigate('/');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        generateError(errorMessage);
      }else{
        generateError(error.message);
      }
    }
  };
  

  const generateError = (err) => toast.error(err, {
    autoClose: 1000,
    position: toast.POSITION.TOP_CENTER,
    className:'rounded',
    style: {
      fontSize: '14px',   
      maxWidth: '200px',
    }
  });
  

  return (
    <Fragment>
      <section>
        <div className="container">
          <div className="row no-gutter">
            <div className="col-md-6 d-md-flex pt-5 bg-hh">
              <img
                src="/image/turf6.png"
                className="sm:pb-3 sm:pt-[70px]"
                // style={{ width: "55vw", height: "90vh", paddingTop: "40px" }}
                alt=""
              />
            </div>

            <div className="col-md-6 bg-hh">
              {/* <div className="login d-flex align-items-center "> */}
              <div className="mt-10 sm:mt-[8rem]">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">A-one Turf</h3>

                      <p className="text-muted mb-4">Please a login </p>
                      <form action="/userlogin" method="post">
                        <div className="form-group mb-3">
                          <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                [e.target.name]: e.target.value,
                              })
                            }
                            autofocus=""
                            className="form-control rounded-pill border-2 shadow-sm px-4"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <div className="position-relative">
                            <input
                              type={showPassword ? "text" : "password"}
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
                              className="form-control rounded-pill border-2 shadow-sm px-4 pr-5"
                            />
                            <span
                              className="position-absolute top-50 translate-middle-y cursor-pointer"
                              style={{ right: "10px" }}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                          onClick={handleLogin}
                        >
                          Sign in
                        </button>
                        <div className="text-center d-flex justify-content-between mt-4">
                          <p>
                            Don't have an account?
                            <span
                              onClick={() => Navigate("/Signup")}
                              className="font-italic cursor-pointer ml-1
                              no-underline text-blue-600"> Sign up
                            </span>
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
      </section>
    </Fragment>
  );
}

export default UserLogin




