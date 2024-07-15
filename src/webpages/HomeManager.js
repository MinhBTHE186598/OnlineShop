import React from 'react'
import Header from '../components/common/Header'
import ManagerAction from '../components/homeManager/ManagerAction'
import Footer from '../components/common/Footer'
import { useUser } from '../components/context/UserContext'
import {Navigate } from "react-router-dom";

function HomeManager() {
  const { userRole,isLogin } = useUser();
  if(isLogin&&userRole==='SellManager'){
  return (
    <div>
        <Header/>
        <ManagerAction/>
        <Footer/>
    </div>
  )
}else{
  return(
      <Navigate to="/"/>
  )
}
}
export default HomeManager