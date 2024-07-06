import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CartMain from '../components/cart/CartMain';

function UserCart() {
  return (
    <div style={{overflowX:'hidden'}}>
      <Header/>
      <CartMain/>
      <Footer/>
    </div>
  )
}

export default UserCart