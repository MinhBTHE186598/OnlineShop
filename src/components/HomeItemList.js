import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import ProductCardBig from './ProductCardBig';


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
  return (
    <div style={{ padding: '50px 0' }}>
      <div className='title' style={TitleStyle}>
        <h1>Sản phẩm mới nhất</h1>
        <p>Những mặt hàng mới lên kệ vô cùng hấp dẫn</p>
      </div>
      <Carousel data-bs-theme="dark" style={{ paddingBottom: '7.5vh' }}>
        <Carousel.Item>
          <div style={ListItem}>
            <ProductCardBig />
            <ProductCardBig />
            <ProductCardBig />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ListItem}>
            <ProductCardBig />
            <ProductCardBig />
            <ProductCardBig />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ListItem}>
            <ProductCardBig />
            <ProductCardBig />
            <ProductCardBig />
          </div>
        </Carousel.Item>
      </Carousel>
      <Button variant='secondary' size='lg' style={MakeCenter}>Xem thêm</Button>
    </div>
  )
}

export default HomeItemList