import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import RegisterBoard from '../components/register/FormRegister'


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