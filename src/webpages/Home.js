import React from 'react'
import Header from '../components/common/Header'
import HomeTItle from '../components/home/HomeTItle'
import HomeCarousel from '../components/home/HomeCarousel'
import HomeItemList from '../components/home/HomeItemList'
import Footer from '../components/common/Footer'

function home() {
    return (
        <div style={{overflowX:'hidden'}}>
            <Header/>
            <HomeTItle/>
            <HomeCarousel/>
            <HomeItemList/>
            <Footer/>
        </div>       
    )
}

export default home