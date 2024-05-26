import React from 'react'
import Header from '../components/Header'
import HeaderTrim from '../components/HeaderTrim'
import HomeTItle from '../components/HomeTItle'
import HomeCarousel from '../components/HomeCarousel'
import HomeItemList from '../components/HomeItemList'
import Footer from '../components/Footer'

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