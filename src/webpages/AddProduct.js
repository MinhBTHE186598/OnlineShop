import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
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