import React from 'react'
import UserHome from '../../components/user/userHome/UserHome'
import UserNavbar from '../../components/user/userHeader/UserNavbar'
import UserHome2 from '../../components/user/userHome/UserHome2'
import UserHome3 from '../../components/user/userHome/UserHome3'
import UserFooter from '../../components/user/userFooter/UserFooter'



function UserHomePage() {
  return (
    <div>
      <UserNavbar/>
      <UserHome></UserHome>
      <UserHome3/>
      <UserHome2/>
      <UserFooter/>
    </div>
  )
}

export default UserHomePage
