import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SellerShopForUserMain from '../components/sellerShopForUser/SellerShopForUserMain';
import { useParams } from 'react-router-dom';

function SellerShopForUser() {
  const { id } = useParams();

  return (
    <div>
        <Header />
        <SellerShopForUserMain id={id} />
        <Footer />
    </div>
  )
}

export default SellerShopForUser