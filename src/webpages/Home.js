import React from 'react'
import Header from '../components/Header'
import HomeTItle from '../components/HomeTItle'
import HomeCarousel from '../components/HomeCarousel'
import HomeItemList from '../components/HomeItemList'
import Footer from '../components/Footer'

function home() {
    return (
        <div>
            <Header/>
            <HomeTItle/>
            <HomeCarousel/>
            <HomeItemList/>
            <Footer/>
        </div>
        
    )
}

export default home