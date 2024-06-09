import React, { useEffect, useState } from 'react'

function ProductMain(props) {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/product/get")
            .then(response => response.json())
            .then(data => setProductList(data))
            .catch(error => console.error(error));
    }, []);

    const product = productList.find(product => product.ProductID.toString() === props.id);
    return (
        product ? (
            <div style={{margin:'200px 0'}}>
                <h1>{product.ProductName}</h1>
                <img src={product.ProductPic} alt={product.ProductName} />
                <p>{product.ProductDescription}</p>
                <p>${product.ProductPrice}</p>
            </div>
        ) : null
    );
}

export default ProductMain

