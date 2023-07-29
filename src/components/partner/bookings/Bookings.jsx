import React from 'react'
import PartnerNavbar from '../header/partnerNavbar'
import TopBar from '../sidebar/TopBar'
import BookingHistoryPartner from './BookingHistoryPartner'


function Bookings() {
  return (
    <>
    <PartnerNavbar />
    <TopBar/>
    <BookingHistoryPartner/>
    <div>Bookings</div>

    </>

  )
}

export default Bookings