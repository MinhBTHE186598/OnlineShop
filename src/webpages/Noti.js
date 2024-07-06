import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Notification from '../components/notification/notification'

function noti(){
    return(
        <div>
                <Header/>
                <Notification/>
                <Footer/>
        </div>
    )
}

export default noti