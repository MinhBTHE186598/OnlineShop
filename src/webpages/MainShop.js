import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import MainShopTitle from '../components/mainShop/MainShopTitle'
import MainShopItemList from '../components/mainShop/MainShopItemList'
import { useParams } from 'react-router-dom'

function MainShop() {
    const { id } = useParams();
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Header />
            <MainShopTitle />
            <MainShopItemList id={id} />
            <Footer />
        </div>
    )
}

export default MainShop