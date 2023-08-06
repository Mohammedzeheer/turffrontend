import React from 'react'
import './otp.css'

function UserOtp1() {
  return (
    <>
    <div className="otp-Form">
 
 <span className="mainHeading">Enter OTP</span>
 <p className="otpSubheading">We have sent a verification code to your mobile number</p>
 <div className="inputContainer">
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input1"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input2"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input3"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input4"/> 
  {/* <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input5"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input6"/>  */}
 </div>

  <button className="verifyButton" type="submit">Verify</button>
    <button className="exitBtn">×</button>
    <p className="resendNote">Didn't receive the code? <button className="resendBtn">Resend Code</button></p>
    
</div>
</>
  )
}

export default UserOtp1