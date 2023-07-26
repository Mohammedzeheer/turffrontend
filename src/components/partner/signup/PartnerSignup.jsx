import React, { Fragment, useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer , toast } from 'react-toastify'  // for error npm 
import { PartnerPort } from "../../../store/port";
import 'react-toastify/dist/ReactToastify.css';


function PartnerSignup() {

    const [partner, setPartner] = useState({})
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
        const partner= localStorage.getItem('partner')
        if(partner){
            navigate('/partner')
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${PartnerPort}partnersignup`, { ...partner }, { withCredential: true })
            console.log(data,"---------")
            if (data) {     
                if (data.errors) {
                    const { username, password, email, phonenumber } = data.errors
                    if (username) generateError(username)
                    else if (phonenumber) generateError(phonenumber)
                    else if (password) generateError(password)
                    else if (email) generateError(email)
                }
                else if(data.otp){
                    navigate("/partner/otp")
                }
                else {
                    navigate("/partner/otp")
                    // navigate("/login")
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
        <Fragment>
            <section>
                <div className="container-fluid">
                    <div className="row no-gutter">

                        <div className="col-md-6 d-none d-md-flex bg-light">

                            <img src="/image/turf9.png" style={{ width: '55vw', height: '100vh', paddingTop: '70px' }} alt="" />
                        </div>

                        <div className="col-md-6 bg-light" >
                            <div className="login d-flex align-items-center py-5">


                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-7 mx-auto">
                                            <h3 className="display-4">Aone Turf</h3>
                                            <p className="text-muted mb-4">Manager Register here </p>
                                            <form method="post">
                                                <div className="form-group mb-3" style={{ backgroundColor: " white;" }}>
                                                    <input type="text" name="email" placeholder="Email" autofocus="" onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })} className="form-control rounded-pill border-2 shadow-sm px-4" />
                                                </div>
                                                <div className="form-group mb-3" >
                                                    <input type="text" name="phonenumber" placeholder="PhoneNumber" autofocus="" onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })} className="form-control rounded-pill border-2 shadow-sm px-4" />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <input type="text" name="turfname" placeholder="Turf Name" onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })} className="form-control rounded-pill border-2 shadow-sm px-4 " />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input type="text" name="username" placeholder="User Name" onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })} className="form-control rounded-pill border-2 shadow-sm px-4" />
                                                </div>                                         

                                                <div className="form-group mb-3">
                                                    <div className="input-group">
                                                        <input type={showPassword ? "text" : "password"}
                                                            name="password" placeholder="Password"
                                                            value={partner.password}
                                                            onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })}
                                                            className="form-control rounded-pill border-2 shadow-sm px-4"
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text rounded-pill border-2 shadow-sm pt-3" onClick={() => setShowPassword(!showPassword)}>
                                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={handleSubmit}>Sign up</button>
                                                <div className="text-center d-flex justify-content-between mt-4"><p>have an account?<a onClick={() => { navigate('/partner/login') }} class="font-italic text-muted">
                                                    <u>Login</u></a></p></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <ToastContainer/>
            </section>

        </Fragment>
    )
}

export default PartnerSignup
