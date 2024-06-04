import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import AddProductForm from '../components/addProduct/AddProductForm'

function AddProduct() {
    return (
        <div>
                <Header/>
                <AddProductForm/>
                <Footer/>
        </div>
    )
}
export default AddProduct