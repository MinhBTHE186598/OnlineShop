import React, { useEffect, useState }from 'react'

function ProductReview(props) {
    const [productReview, setProductReview] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/productReview/get").then(
            response => response.json()
        ).then(
            data => {
                setProductReview(data)
            }
        )
    }, [])

    const item = productReview.filter((item) => item.ProductID === props.id)

  return (
    item ? item.map((item) => (
        <div className="product-review">
            <p style={{width:'100%', height:'10vh', backgroundColor: '#333'}}>{item.ProductReviewText}</p>
        </div>
    )) : <p>Not found</p>
  )
}

export default ProductReview