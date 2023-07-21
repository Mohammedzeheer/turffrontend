import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../sidebar/TopBar'
import PartnerNavbar from '../header/partnerNavbar'


function VenueHome() {
    const navigate = useNavigate()
  return (
    <>
    <PartnerNavbar/>
     <TopBar />
      <div>VenueHome</div>

       <div className='font-bold text-2xl' onClick={()=>navigate('/addturf')}>
        Add Turf
      </div>
    </>
  
  )
}

export default VenueHome