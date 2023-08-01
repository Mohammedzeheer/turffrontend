import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'  //naviagete page path
import { ToastContainer, toast } from 'react-toastify'  // for error npm 
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {AxiosUser} from '../../../api/AxiosInstance'
import './UserLogin.css'

function UserLogin() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    let user=localStorage.getItem('user')
    if(user){
      Navigate('/')
    }
  },[])


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await AxiosUser.post('userlogin', { ...user }, { withCredentials: true });
      const data = res.data;
      console.log(data,'iam login data');

      if (data.message) {
        generateError(data.message);
      } else if (data.errors) {
        const { email, password } = data.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
      } else {
        localStorage.setItem('user', JSON.stringify(data.token));
        dispatch(
          updateUser({
            username: data.user.username,
            userId: data.user._id,
            image: data.user.image,
            token: data.token,
            email:data.user.email
            
          })
        );
        Navigate('/');
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404 && data.message === 'User not found') {
          generateError('User not found');
        } else if (status === 403 && data.message === 'User is blocked') {
          generateError('User is blocked');
        } else {
          generateError('Internal server error');
        }
      } else {
        generateError('Something went wrong');
      }
    }
  };




  // const handleLogin = (e) => {
  //   e.preventDefault() // for make render 
  //   AxiosUser.post(`userlogin`,  { ...user }, { withCredentials: true }).then((res) => {
  //     res = res.data
  //     if (res) {
  //       console.log(res);
  //       if(res.message){
  //         generateError(res.message)
  //       }
  //       if (res.errors) {
  //         const { email, password } = res.errors
  //         if (email) generateError(email)
  //         else if (password) generateError(password)
  //       } else {
  //         localStorage.setItem('user', JSON.stringify(res))
  //         console.log(res.user, "username-----------");
  //         dispatch(updateUser({ username: res.user.username, userId: res.user._id, image: res.user.image, token: res.token }))
  //         Navigate('/')
  //       }
  //     }
  //   })
  // }





  const generateError = (err) => toast.error(err, {
    autoClose: 1000,
    position: toast.POSITION.TOP_CENTER
  })


  return (
    <Fragment>

      <section>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex  bg-light">
              <img src="/image/turf6.png" style={{ width: '55vw', height: '100vh', paddingTop: '70px' }} alt="" />
            </div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">


                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Aone Turf</h3>
                      <p className="text-muted mb-4">Please a login </p>
                      <form action="/userlogin" method="post">

                        <div className="form-group mb-3">
                          <input type="text" placeholder="Email" name="email" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} autofocus="" className="form-control rounded-pill border-2 shadow-sm px-4" />
                        </div>


                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input type={showPassword ? "text" : "password"}
                              name="password" placeholder="Password"
                              value={user.password}
                              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                              className="form-control rounded-pill border-2 shadow-sm px-4"
                            />
                            <div className="input-group-append">
                              <span className="input-group-text rounded-pill border-2 shadow-sm pt-3" onClick={() => setShowPassword(!showPassword)}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                              </span>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={handleLogin}>Sign in</button>
                        <div className="text-center d-flex justify-content-between mt-4"><p>Don't have an account?<a onClick={() => Navigate('/Signup')} class="font-italic text-muted">
                          <u>Sign up</u></a></p></div>
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

  )
}

export default UserLogin









{/* <div className="bodyLogin">
              <div className="containerL">
                  <h2>Login</h2>

                  <input type="text" placeholder="Username" name="username" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} className="input" />
                  <input type="password" placeholder="Password" name="password" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} className="input" />
                  <button type="submit" className="button" onClick={handleLogin}>Login</button>
                  <br />  
                 
                  <p><span className='doyouhave'>Don't have an account?</span><a className='navigateSignup' onClick={() => Navigate('/Signup')}> Sign up</a></p>
                
              </div>             
              <ToastContainer />
          </div> */}