import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RegisterBoard from '../components/FormRegister'


function register(){
    return(
        <div>
                <Header/>
                <RegisterBoard/>
                <Footer/>
        </div>
    )
}

export default register