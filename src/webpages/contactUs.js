import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ContactForm from '../components/contactUs/contactUs'


function contact(){
    return(
        <div>
                <Header/>
                <ContactForm/>
                <Footer/>
        </div>
    )
}

export default contact