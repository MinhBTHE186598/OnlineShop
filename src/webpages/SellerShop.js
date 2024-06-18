import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SellerShop from '../components/sellerShop/sellerShopManager'


function SellerShopManage(){
    return(
        <div>
                <Header/>
                <SellerShop/>
                <Footer/>
        </div>
    )
}

export default SellerShopManage