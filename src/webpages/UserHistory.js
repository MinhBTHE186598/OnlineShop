import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import UserAction from '../components/userHistory/UserAction'
function HomeManager() {
  return (
    <div>
        <Header/>
        <UserAction/>
        <Footer/>
    </div>
  )
}

export default HomeManager