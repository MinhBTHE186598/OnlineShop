import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import MainShopTitle from '../components/mainShop/MainShopTitle'
import MainShopItemList from '../components/mainShop/MainShopItemList'

function MainShop() {
    return (
        <div>
            <Header />
            <MainShopTitle/>
            <MainShopItemList />
            <Footer />
        </div>
    )
}

export default MainShop