import React from 'react'
import ProductCardSmall from './ProductCardSmall'

const itemsStyle = {
    width: '100%',
    padding: '0 20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2em',
}

const MainShopPagination = ({ products }) => {
    return (
        <div style={itemsStyle}>
            {products.map((product) => (
                <ProductCardSmall
                    key={product.ProductID}
                    name={product.ProductName}
                    pic={product.ProductPic}
                    description={product.ProductDescription}
                    price={product.ProductPrice}
                    seller={product.SellerID}
                    star={product.ProductID} />
            ))}
        </div>
    )
}

export default MainShopPagination