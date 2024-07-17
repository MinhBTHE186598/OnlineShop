import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import CheckOutMain from '../components/checkOut/CheckOutMain'

function CheckOut() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <CheckOutMain />
      <Footer />
    </div>
  )
}

export default CheckOut