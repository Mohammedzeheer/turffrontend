import React,{useState,useEffect, Fragment} from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { updatePartner } from '../../../redux/partnerSlice';
import { useDispatch } from 'react-redux';
import {AxiosPartner} from '../../../api/AxiosInstance'
import {toast} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './partnerLogin.css'

function PartnerLogin() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [partner, setPartner] = useState({})
    const [showPassword, setShowPassword] = useState(false);
     const token= localStorage.getItem('partner')

    const checkPartner = ()=>{  
      if(token){
          navigate('/partner')
      }
    }
    
    useEffect(()=>{
        checkPartner();
    },[])


    const handleLogin =async(e)=>{
      try{
          const response=await AxiosPartner.post(`partnerlogin`,{...partner},{withCredentials:true})
           const partnerData = response.data.partner;
           localStorage.setItem('partner',JSON.stringify(response.data.token))
           dispatch(updatePartner({partnername:partnerData.username,partnerId:partnerData._id,token:partnerData.token}))
           navigate('/partner')
      }
      catch(error){
       const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        generateError(errorMessage);
      }else{
        generateError(error.message);
      }
      }    
    }


      const generateError = (err) => toast.error(err, {
        autoClose: 2000, 
        position: toast.POSITION.TOP_CENTER,
        className:'rounded',
    style: {
      fontSize: '12px',   
      maxWidth: '200px',
    }
    })
  return (


<Fragment>
      <section>
        <div className="container">
          <div className="row no-gutter">
            <div className="col-md-6 d-md-flex pt-5 bg-hh">
              <img
                src="/image/imgfootball.png"
                //style={{ width: "65vw", height: "90vh" }}
                className="sm:w-65vw,sm:h-90vh m:pb-3 sm:pt-[0px]"
                alt=""
              />
            </div>

            <div className="col-md-6 bg-hh">
              <div className="mt-10 sm:mt-[8rem]">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">A-one Turf</h3>

  <p className="text-muted mb-4">Please a login </p>
                  <div
                      className="form-group mb-3"
                      style={{ backgroundColor: " white;" }}
                    >
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autofocus=""
                        onChange={(e) =>
                          setPartner({
                            ...partner,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="form-control rounded-pill border-2 shadow-sm px-4"
                      />
                    </div>

           <div className="form-group mb-3">
         <div className="position-relative">
                      <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          value={partner.password}
                          onChange={(e) =>
                            setPartner({
                              ...partner,
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
                              onClick={() => {navigate("/partner/signup")}}
                              className="font-italic cursor-pointer ml-1
                              no-underline text-blue-600"> Sign up
                            </span>
                          </p>
                        </div>
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

export default PartnerLogin



    // <section>
    //   <div className="container-fluid">
    //     <div className="row no-gutter">
    //       <div className="col-md-6 d-none d-md-flex">
    //         <img
    //           src="/image/turf12.png"
    //           style={{ width: "55vw", height: "100vh", paddingTop: "70px" }}
    //           alt=""
    //         />
    //       </div>

    //       <div className="col-md-6">
    //         <div className="login d-flex align-items-center py-5">
    //           <div className="container">
    //             <div className="row">
    //               <div className="col-lg-10 col-xl-7 mx-auto">
    //                 <h3 className="display-4">A-one Turf</h3>
    //                 <p className="text-muted mb-4">Please a login </p>
    //                 {/* <form  method="post"> */}
    //                 <div
    //                   className="form-group mb-3"
    //                   style={{ backgroundColor: " white;" }}
    //                 >
    //                   <input
    //                     type="text"
    //                     name="email"
    //                     placeholder="Email"
    //                     autofocus=""
    //                     onChange={(e) =>
    //                       setPartner({
    //                         ...partner,
    //                         [e.target.name]: e.target.value,
    //                       })
    //                     }
    //                     className="form-control rounded-pill border-0 shadow-sm px-4"
    //                   />
    //                 </div>

                  

    //                 <div className="form-group mb-3">
    //                   <div className="position-relative">
    //                     <input
    //                       type={showPassword ? "text" : "password"}
    //                       placeholder="Password"
    //                       name="password"
    //                       value={partner.password}
    //                       onChange={(e) =>
    //                         setPartner({
    //                           ...partner,
    //                           [e.target.name]: e.target.value,
    //                         })
    //                       }
    //                       autoFocus=""
    //                       className="form-control rounded-pill border-2 shadow-sm px-4 pr-5"
    //                     />
    //                     <span
    //                       className="position-absolute top-50 translate-middle-y cursor-pointer"
    //                       style={{ right: "10px" }}
    //                       onClick={() => setShowPassword(!showPassword)}
    //                     >
    //                       <FontAwesomeIcon
    //                         icon={showPassword ? faEyeSlash : faEye}
    //                       />
    //                     </span>
    //                   </div>
    //                 </div>

    //                 <button
    //                   type="submit"
    //                   onClick={handleLogin}
    //                   className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
    //                 >
    //                   Sign in
    //                 </button>
    //                 <div className="text-center d-flex justify-content-between mt-4">
    //                   <p>
    //                     Don't have an account?
    //                     <a
    //                       onClick={() => {
    //                         navigate("/partner/signup");
    //                       }}
    //                       className="font-italic text-muted no-underline ml-1 cursor-pointer"
    //                     >
    //                       Sign up
    //                     </a>
    //                   </p>
    //                 </div>
    //                 {/* </form> */}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>







  {/* <div className="form-group mb-3">
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={partner.password}
                          onChange={(e) =>
                            setPartner({
                              ...partner,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className="form-control rounded-pill border-2 shadow-sm px-4 text-primary"
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text rounded-pill border-2 shadow-sm pt-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </span>
                        </div>
                      </div>
                    </div> */}





                    // const handleLogin1 = async (e) => {
                    //   try {
                    //     e.preventDefault();
                    //     const partnerData = { ...partner };     
                    //     const response = await AxiosPartner.post('partnerlogin', partnerData, {
                    //       withCredentials: true,
                    //     }); 
                    //     if (response.data) {
                    //       const { errors, token, partner: partnerInfo } = response.data;
                    
                    //       if (errors) {
                    //         handleLoginErrors(errors);
                    //       } else {
                    //         handleSuccessfulLogin(token, partnerInfo);
                    //       }
                    //     }
                    //   } catch (error) {
                    //     console.error('An error occurred during login:', error);
                    //     toast.error(error)
                    //   }
                    // };