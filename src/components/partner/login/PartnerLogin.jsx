import React,{useState,useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './partnerLogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer , toast } from 'react-toastify'  // for error npm 
import 'react-toastify/dist/ReactToastify.css';
import { updatePartner } from '../../../redux/partnerSlice';
import { useDispatch } from 'react-redux';
import { PartnerPort } from '../../../store/port';
import {AxiosPartner} from '../../../api/AxiosInstance'

function PartnerLogin() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [partner, setPartner] = useState({})
    const [showPassword, setShowPassword] = useState(false);

    useEffect(()=>{
        const partner= localStorage.getItem('partner')
        if(partner){
            navigate('/partner')
        }
    },[])

    const handleLogin =async(e)=>{
        const {data}=await AxiosPartner.post(`partnerlogin`,{...partner},{withCredentials:true})
        console.log(data,"----------response");
        if(data){          
            if(data.errors){
              const{email,password,approval}= data.errors
              if (email) generateError(email)
              else if (password) generateError(password)
              else if (approval)generateError(approval)
            }else{
             localStorage.setItem('partner',JSON.stringify(data))
             dispatch(updatePartner({partnername:data.partner.username,partnerId:data.partner._id,token:data.token}))
             navigate('/partner')
            }
          }      
      }

      const generateError = (err) => toast.error(err, {
        autoClose: 2000, 
        position: toast.POSITION.TOP_CENTER
    })
  return (
    <section>
     <div className="container-fluid">
    <div className="row no-gutter">

        <div className="col-md-6 d-none d-md-flex">
 
        <img src="/image/turf12.png" style={{ width:'55vw' , height:'100vh', paddingTop:'70px'}} alt="" />
        </div>
  
        <div className="col-md-6" >
            <div className="login d-flex align-items-center py-5">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 mx-auto">
                            <h3 className="display-4">Aone Turf</h3>
                            <p className="text-muted mb-4">Please a login </p>
                            {/* <form  method="post"> */}
                                          <div className="form-group mb-3" style={{ backgroundColor: " white;" }}>
                                              <input type="text" name="email" placeholder="Email" autofocus="" onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })}  className="form-control rounded-pill border-0 shadow-sm px-4" />
                                          </div>

                                                 <div className="form-group mb-3">
                                                    <div className="input-group">
                                                        <input type={showPassword ? "text" : "password"}
                                                            name="password" placeholder="Password"
                                                            value={partner.password}
                                                            onChange={(e) => setPartner({ ...partner, [e.target.name]: e.target.value })}
                                                            className="form-control rounded-pill border-2 shadow-sm px-4 text-primary"
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text rounded-pill border-2 shadow-sm pt-3" onClick={() => setShowPassword(!showPassword)}>
                                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                  
                                <button type="submit" onClick={handleLogin} className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                <div className="text-center d-flex justify-content-between mt-4"><p>Don't have an account?<a onClick={()=>{navigate('/partner/signup')}} class="font-italic text-muted"> 
                                        <u>Sign up</u></a></p></div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<ToastContainer/>
    </section>
  )
}

export default PartnerLogin

