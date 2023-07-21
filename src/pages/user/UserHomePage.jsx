import React from 'react'
import UserHome from '../../components/user/userHome/UserHome'
import UserHeader from '../../components/user/userHeader/UserHeader'
import UserNavbar from '../../components/user/userHeader/UserNavbar'


function UserHomePage() {
  return (
    <div>
      <UserNavbar/>
      {/* <UserHeader></UserHeader> */}
      <UserHome></UserHome>
    </div>
  )
}

export default UserHomePage
