import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainShopTitle from '../components/MainShopTitle'
import MainShopItemList from '../components/MainShopItemList'

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