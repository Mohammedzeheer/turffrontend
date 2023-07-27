import React from 'react'
import UserHome from '../../components/user/userHome/UserHome'
import UserHeader from '../../components/user/userHeader/UserHeader'
import UserNavbar from '../../components/user/userHeader/UserNavbar'
import UserHome2 from '../../components/user/userHome/UserHome2'
import UserHome3 from '../../components/user/userHome/UserHome3'


function UserHomePage() {
  return (
    <div>
      <UserNavbar/>
      {/* <UserHeader></UserHeader> */}
      <UserHome></UserHome>
      <UserHome3/>
      <UserHome2/>
    </div>
  )
}

export default UserHomePage
