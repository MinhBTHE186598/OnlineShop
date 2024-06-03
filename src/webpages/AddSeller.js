import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderTrim from '../components/HeaderTrim'
import Footer from '../components/Footer'
import FormReg from '../components/addSeller/FormAddSeller'

function AddSeller() {
    return (
        <div>
                <HeaderTrim/>
                <FormReg/>
                <Footer/>
        </div>
    )
}
export default AddSeller