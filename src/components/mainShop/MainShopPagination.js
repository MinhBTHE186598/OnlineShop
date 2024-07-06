import React from 'react'
import ProductCardSmall from '../common/ProductCardSmall'

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
                    id={product.ProductID}
                    name={product.ProductName}
                    pic={product.ProductPic}
                    description={product.ProductDescription}
                    price={product.ProductPrice}
                    seller={product.SellerID}
                    star={product.ProductID}
                    category={product.CategoryID}
                    quantity={product.ProductQuantity} />
            ))}
        </div>
    )
}

export default MainShopPagination