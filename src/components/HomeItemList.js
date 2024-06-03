import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import ProductCardBig from './ProductCardBig';
import { useState, useEffect } from 'react';


const ListItem = {
  margin: "auto",
  width: '80vw',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const TitleStyle = {
  textAlign: 'center',
  paddingBottom: '5vh',
  fontSize: 'x-large'
}

const MakeCenter = {
  marginTop: '10px',
  display: 'block',
  margin: 'auto'
}


function HomeItemList() {
  const [productList, setProductList] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/product/get").then(
      response => response.json()
    ).then(
      data => {
        setProductList(data)
      }
    )
  }, [])

  return (
    <div style={{ padding: '50px 0' }}>
      <div className='title' style={TitleStyle}>
        <h1>Sản phẩm mới nhất</h1>
        <p>Những mặt hàng mới lên kệ vô cùng hấp dẫn</p>
      </div>
      <Carousel data-bs-theme="dark" style={{ paddingBottom: '7.5vh' }}>
        <Carousel.Item>
          <div style={ListItem}>
            {productList.slice(0, 3).map((product, index) => (
              <ProductCardBig key={index}
                name={product.ProductName}
                pic={product.ProductPic}
                description={product.ProductDescription}
                price={product.ProductPrice} 
                seller={product.SellerID}
                star={product.ProductID}
                />
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ListItem}>
            {productList.slice(3, 6).map((product, index) => (
              <ProductCardBig key={index}
                name={product.ProductName}
                pic={product.ProductPic}
                description={product.ProductDescription}
                price={product.ProductPrice}
                seller={product.SellerID} 
                star={product.ProductID}
                />
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ListItem}>
            {productList.slice(6, 9).map((product, index) => (
              <ProductCardBig key={index}
                name={product.ProductName}
                pic={product.ProductPic}
                description={product.ProductDescription}
                price={product.ProductPrice}
                seller={product.SellerID} 
                star={product.ProductID}
                />
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
      <Button variant='secondary' size='lg' style={MakeCenter}><a href='/mainShop' style={{ textDecoration: 'none', color: 'white' }}>Xem thêm</a></Button>
    </div>
  )
}

export default HomeItemList