import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ProductMain from '../components/product/ProductMain'

function Product() {
    const { id } = useParams();
    return (
        <div>
            <Header />
            <ProductMain id={id}/>
            <Footer />
        </div>
    );
}

export default Product;
