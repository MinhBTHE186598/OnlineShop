import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import FormReg from '../components/addSeller/FormAddSeller'
import AddProductForm from '../components/addProduct/AddProductForm'

function AddSeller() {
    return (
        <div>
                <Header/>
                <AddProductForm/>
                <Footer/>
        </div>
    )
}
export default AddSeller